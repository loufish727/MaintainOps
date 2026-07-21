(function () {
  const ALLOWED_METRICS = new Set([
    "session_start", "fcp_ms", "lcp_ms", "inp_ms", "cls", "workspace_ready_ms",
    "section_navigation_ms", "query_latency_ms", "client_error", "offline_event", "reconnect_ms",
    "connection_downlink_mbps", "connection_rtt_ms", "spatial_ready_ms", "spatial_fps",
    "spatial_frame_ms", "spatial_slow_frame_pct", "spatial_draw_calls", "spatial_triangles",
    "spatial_geometries", "spatial_textures", "webgl_context_loss",
  ]);
  const UNIT_BY_METRIC = {
    session_start: "count",
    fcp_ms: "ms",
    lcp_ms: "ms",
    inp_ms: "ms",
    cls: "score",
    workspace_ready_ms: "ms",
    section_navigation_ms: "ms",
    query_latency_ms: "ms",
    client_error: "count",
    offline_event: "count",
    reconnect_ms: "ms",
    connection_downlink_mbps: "mbps",
    connection_rtt_ms: "ms",
    spatial_ready_ms: "ms",
    spatial_fps: "fps",
    spatial_frame_ms: "ms",
    spatial_slow_frame_pct: "percent",
    spatial_draw_calls: "count",
    spatial_triangles: "count",
    spatial_geometries: "count",
    spatial_textures: "count",
    webgl_context_loss: "count",
  };
  const browserWindow = typeof window !== "undefined" ? window : null;
  const browserDocument = typeof document !== "undefined" ? document : null;
  const browserNavigator = typeof navigator !== "undefined" ? navigator : {};
  const now = () => typeof performance !== "undefined" && typeof performance.now === "function"
    ? performance.now()
    : Date.now();
  const pageStartedAt = now();
  const state = {
    client: null,
    companyId: "",
    pending: [],
    latest: {},
    flushTimer: null,
    disabledUntil: 0,
    configuredCompanyId: "",
    workspaceCompanies: new Set(),
    workspaceStartedAt: pageStartedAt,
    navigationStartedAt: now(),
    offlineStartedAt: 0,
  };
  const interactionDurations = new Map();
  let clsValue = 0;

  function finite(value) {
    if (value === null || value === undefined || value === "") return null;
    const number = Number(value);
    return Number.isFinite(number) && number >= 0 ? number : null;
  }

  function connectionContext() {
    const connection = browserNavigator.connection || browserNavigator.mozConnection || browserNavigator.webkitConnection;
    const coarse = browserWindow?.matchMedia?.("(pointer: coarse)")?.matches;
    const memory = finite(browserNavigator.deviceMemory);
    const cores = finite(browserNavigator.hardwareConcurrency);
    const deviceTier = ((memory !== null && memory <= 4) || (cores !== null && cores <= 4) || coarse) ? "constrained" : "standard";
    const viewportWidth = finite(browserWindow?.innerWidth);
    return {
      source: "browser",
      device_tier: deviceTier,
      viewport_class: viewportWidth !== null && viewportWidth < 720 ? "mobile" : viewportWidth !== null && viewportWidth < 1100 ? "tablet" : "desktop",
      connection_type: String(connection?.effectiveType || "unknown").slice(0, 24),
      online: browserNavigator.onLine !== false,
      save_data: Boolean(connection?.saveData),
    };
  }

  function cleanContext(context = {}) {
    const base = { ...connectionContext(), ...context };
    return Object.fromEntries(Object.entries(base).filter(([, value]) => value !== undefined && value !== null && value !== ""));
  }

  function scheduleFlush(delay = 12000) {
    if (!state.client || !state.companyId || state.flushTimer || Date.now() < state.disabledUntil) return;
    if (typeof browserWindow?.setTimeout !== "function") return;
    state.flushTimer = browserWindow.setTimeout(() => {
      state.flushTimer = null;
      void flush();
    }, delay);
  }

  function record(metric, value, context = {}, options = {}) {
    if (!ALLOWED_METRICS.has(metric)) return false;
    const numeric = finite(value);
    if (numeric === null) return false;
    const rounded = Number(numeric.toFixed(metric === "cls" ? 4 : 2));
    state.latest[metric] = {
      metric,
      value: rounded,
      unit: UNIT_BY_METRIC[metric],
      context: cleanContext(context),
      measuredAt: new Date().toISOString(),
    };
    if (options.persist !== false) {
      state.pending.push({
        metric,
        value: rounded,
        unit: UNIT_BY_METRIC[metric],
        context: cleanContext(context),
      });
      if (state.pending.length > 60) state.pending.splice(0, state.pending.length - 60);
      scheduleFlush(options.immediate ? 250 : 12000);
    }
    return true;
  }

  async function flush() {
    if (!state.client || !state.companyId || !state.pending.length || Date.now() < state.disabledUntil) return false;
    const companyId = state.companyId;
    const batch = state.pending.splice(0, 20);
    let error = null;
    try {
      const response = await state.client.rpc("record_app_performance_samples", {
        target_company_id: companyId,
        samples: batch,
      });
      error = response.error || null;
    } catch (failure) {
      error = failure;
    }
    if (!error) {
      if (state.pending.length) scheduleFlush(1000);
      return true;
    }
    if (state.companyId === companyId) state.pending.unshift(...batch);
    const message = String(error.message || error).toLowerCase();
    state.disabledUntil = Date.now() + (message.includes("could not find") || message.includes("does not exist") ? 300000 : 60000);
    return false;
  }

  function configure({ client, companyId }) {
    state.client = client || null;
    state.companyId = companyId || "";
    if (!state.client || !state.companyId) return;
    if (state.configuredCompanyId !== state.companyId) {
      if (state.configuredCompanyId) state.workspaceStartedAt = now();
      state.configuredCompanyId = state.companyId;
      record("session_start", 1, { source: "workspace" }, { immediate: true });
      const connection = browserNavigator.connection || browserNavigator.mozConnection || browserNavigator.webkitConnection;
      if (finite(connection?.downlink) !== null) record("connection_downlink_mbps", connection.downlink, { source: "browser-estimate" });
      if (finite(connection?.rtt) !== null) record("connection_rtt_ms", connection.rtt, { source: "browser-estimate" });
    }
    scheduleFlush(250);
  }

  function markWorkspaceReady(companyId) {
    if (!companyId || state.workspaceCompanies.has(companyId)) return;
    state.workspaceCompanies.add(companyId);
    record("workspace_ready_ms", now() - state.workspaceStartedAt, { source: "app-shell" }, { immediate: true });
    browserWindow?.setTimeout?.(captureVitals, 1000);
  }

  function captureVitals() {
    Object.values(state.latest)
      .filter((sample) => ["fcp_ms", "lcp_ms", "inp_ms", "cls"].includes(sample.metric))
      .forEach((sample) => record(sample.metric, sample.value, { source: "performance-observer" }));
  }

  function markNavigationStart() {
    state.navigationStartedAt = now();
  }

  function recordSectionNavigation(section, startedAt = state.navigationStartedAt) {
    record("section_navigation_ms", now() - startedAt, { source: String(section || "workspace").slice(0, 48) });
  }

  function recordQueryLatency(source, startedAt, error = null) {
    record("query_latency_ms", now() - startedAt, { source: String(source || "query").slice(0, 48) });
    if (error) record("client_error", 1, { source: `query:${String(source || "unknown").slice(0, 36)}` }, { immediate: true });
  }

  function recordSpatial(sample = {}) {
    const context = { source: "performance-room", quality_tier: sample.qualityTier || "unknown" };
    Object.entries({
      spatial_ready_ms: sample.readyMs,
      spatial_fps: sample.fps,
      spatial_frame_ms: sample.frameMs,
      spatial_slow_frame_pct: sample.slowFramePercent,
      spatial_draw_calls: sample.drawCalls,
      spatial_triangles: sample.triangles,
      spatial_geometries: sample.geometries,
      spatial_textures: sample.textures,
      webgl_context_loss: Number(sample.contextLosses) > 0 ? sample.contextLosses : undefined,
    }).forEach(([metric, value]) => {
      if (finite(value) !== null) record(metric, value, context);
    });
    scheduleFlush(500);
  }

  function snapshot() {
    return {
      latest: { ...state.latest },
      connection: connectionContext(),
      pendingCount: state.pending.length,
    };
  }

  function observe(type, callback, options = { buffered: true }) {
    if (!browserWindow || !("PerformanceObserver" in browserWindow) || !PerformanceObserver.supportedEntryTypes?.includes(type)) return;
    try {
      const observer = new PerformanceObserver((list) => callback(list.getEntries()));
      observer.observe({ type, ...options });
    } catch (_error) {
      // Older browsers may advertise a type but reject buffered observation.
    }
  }

  observe("paint", (entries) => {
    const fcp = entries.find((entry) => entry.name === "first-contentful-paint");
    if (fcp) record("fcp_ms", fcp.startTime, { source: "performance-observer" }, { persist: false });
  });
  observe("largest-contentful-paint", (entries) => {
    const latest = entries.at(-1);
    if (latest) record("lcp_ms", latest.startTime, { source: "performance-observer" }, { persist: false });
  });
  observe("layout-shift", (entries) => {
    entries.forEach((entry) => { if (!entry.hadRecentInput) clsValue += entry.value; });
    record("cls", clsValue, { source: "performance-observer" }, { persist: false });
  });
  observe("event", (entries) => {
    entries.forEach((entry) => {
      if (!entry.interactionId) return;
      interactionDurations.set(entry.interactionId, Math.max(interactionDurations.get(entry.interactionId) || 0, entry.duration));
    });
    const ranked = [...interactionDurations.values()].sort((left, right) => right - left);
    if (ranked.length) record("inp_ms", ranked[Math.min(Math.floor(ranked.length / 50), 10)], { source: "performance-observer" }, { persist: false });
  }, { buffered: true, durationThreshold: 40 });

  browserWindow?.addEventListener?.("error", () => record("client_error", 1, { source: "window-error" }, { immediate: true }));
  browserWindow?.addEventListener?.("unhandledrejection", () => record("client_error", 1, { source: "unhandled-rejection" }, { immediate: true }));
  browserWindow?.addEventListener?.("offline", () => {
    state.offlineStartedAt = now();
    record("offline_event", 1, { source: "network" }, { immediate: true });
  });
  browserWindow?.addEventListener?.("online", () => {
    if (state.offlineStartedAt) record("reconnect_ms", now() - state.offlineStartedAt, { source: "network" }, { immediate: true });
    state.offlineStartedAt = 0;
  });
  browserDocument?.addEventListener?.("visibilitychange", () => {
    if (browserDocument.visibilityState === "hidden") {
      captureVitals();
      void flush();
    }
  });

  const api = {
    configure,
    flush,
    markNavigationStart,
    markWorkspaceReady,
    record,
    recordQueryLatency,
    recordSectionNavigation,
    recordSpatial,
    snapshot,
  };
  if (typeof window !== "undefined") window.MaintainOpsAppTelemetry = api;
  if (typeof module !== "undefined") module.exports = api;
})();
