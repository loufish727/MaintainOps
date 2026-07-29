(function () {
  /*
   * Module contract: reads an aggregate, company-scoped platform snapshot for the
   * Performance workspace. It never writes records, never changes auth/RLS, and
   * does not claim infrastructure telemetry that MaintainOps does not collect.
   */
  const DAY_MS = 24 * 60 * 60 * 1000;
  const DEFAULT_HISTORY_DAYS = 45;
  const DEFAULT_TIMELINE_DAYS = 14;
  const PAGE_SIZE = 1000;

  function thresholds() {
    if (typeof window !== "undefined" && window.MaintainOpsPlatformPerformanceThresholds) {
      return window.MaintainOpsPlatformPerformanceThresholds;
    }
    if (typeof require === "function") return require("./platformPerformanceThresholds.js");
    throw new Error("Platform performance thresholds are unavailable.");
  }

  function startOfLocalDay(date = new Date()) {
    const next = new Date(date);
    next.setHours(0, 0, 0, 0);
    return next;
  }

  function daysBefore(date, days) {
    return new Date(date.getTime() - (days * DAY_MS));
  }

  function dayKey(value) {
    const date = value ? new Date(value) : null;
    if (!date || Number.isNaN(date.getTime())) return "";
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
  }

  function formatShortDay(value) {
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
  }

  function number(value) {
    return Number(value) || 0;
  }

  function countText(value, suffix = "") {
    return value === null ? "Unavailable" : `${number(value)}${suffix}`;
  }

  async function fetchCompanyRows(supabaseClient, options) {
    const {
      table,
      select,
      fallbackSelect = "",
      companyId,
      cutoffIso,
    } = options;

    async function fetchWithSelect(selectClause) {
      const rows = [];
      let from = 0;
      while (true) {
        const { data, error } = await supabaseClient
          .from(table)
          .select(selectClause)
          .eq("company_id", companyId)
          .gte("created_at", cutoffIso)
          .order("created_at", { ascending: true })
          .range(from, from + PAGE_SIZE - 1);
        if (error) throw error;
        const page = data || [];
        rows.push(...page);
        if (page.length < PAGE_SIZE) return rows;
        from += PAGE_SIZE;
      }
    }

    try {
      return await fetchWithSelect(select);
    } catch (error) {
      const message = String(error?.message || "").toLowerCase();
      const missingLocationColumn = fallbackSelect && message.includes("location_id");
      if (!missingLocationColumn) throw error;
      return fetchWithSelect(fallbackSelect);
    }
  }

  async function readOptional(label, load) {
    try {
      return { label, data: await load(), error: null };
    } catch (error) {
      return { label, data: null, error: error?.message || `Could not read ${label}.` };
    }
  }

  function buildTimeline({ now, days, workOrders, requests }) {
    const start = daysBefore(startOfLocalDay(now), days - 1);
    const rows = Array.from({ length: days }, (_, index) => {
      const date = new Date(start.getTime() + (index * DAY_MS));
      const key = dayKey(date);
      return {
        key,
        label: formatShortDay(key),
        requests: 0,
        ordersReceived: 0,
      };
    });
    const byKey = new Map(rows.map((row) => [row.key, row]));
    requests.forEach((request) => {
      const row = byKey.get(dayKey(request.created_at));
      if (row) row.requests += 1;
    });
    workOrders.forEach((workOrder) => {
      const created = byKey.get(dayKey(workOrder.created_at));
      if (created) created.ordersReceived += 1;
    });
    return rows;
  }

  function buildPlantFootprint({ locations, workOrders, requests }) {
    const names = new Map((locations || []).map((location) => [location.id, location.name || "Unnamed plant"]));
    const activity = new Map();
    function register(locationId, kind) {
      const key = locationId || "unassigned";
      const current = activity.get(key) || { locationId: key, workOrders: 0, requests: 0 };
      current[kind] += 1;
      activity.set(key, current);
    }
    workOrders.forEach((row) => register(row.location_id, "workOrders"));
    requests.forEach((row) => register(row.location_id, "requests"));

    const knownLocations = (locations || []).map((location) => ({
      locationId: location.id,
      name: location.name || "Unnamed plant",
      ...(activity.get(location.id) || { workOrders: 0, requests: 0 }),
    }));
    if (activity.has("unassigned")) {
      knownLocations.push({
        locationId: "unassigned",
        name: "Unassigned location",
        ...activity.get("unassigned"),
      });
    }
    return knownLocations
      .map((row) => ({
        ...row,
        total: number(row.workOrders) + number(row.requests),
      }))
      .sort((left, right) => right.total - left.total || left.name.localeCompare(right.name));
  }

  function buildSignals({ summary, storage, sampling }) {
    const signals = [
      {
        kind: "active",
        title: "Public intake total",
        value: countText(summary.publicIntakeTotal, " total"),
        detail: summary.requestsToday === null ? "Today's intake sample is unavailable" : `${summary.requestsToday} received today`,
        system: "Public Intake",
      },
      {
        kind: "active",
        title: "Orders through system",
        value: countText(summary.ordersReceivedTotal, " total"),
        detail: summary.ordersReceivedToday === null ? "Today's order sample is unavailable" : `${summary.ordersReceivedToday} received today`,
        system: "Order Throughput",
      },
      {
        kind: "active",
        title: "Process data flow",
        value: countText(summary.processEventsToday, " events today"),
        detail: "Public intake and order throughput activity",
        system: "Today's Process Flow",
      },
      {
        kind: "stable",
        title: "Platform footprint",
        value: countText(summary.totalRecords, " records"),
        detail: `${summary.locations} plants across the active company`,
        system: "Platform Footprint",
      },
    ];
    if (storage?.available) {
      signals.push({
        kind: "stable",
        title: "Stored data footprint",
        value: storage.totalBytesText,
        detail: `${storage.fileCount} linked files stored`,
        system: "Data Vault",
      });
    }
    if (sampling?.status === "degraded") {
      signals.unshift({
        kind: "attention",
        title: "Partial data sample",
        value: "Review",
        detail: sampling.message,
        system: "Sampling Status",
      });
    }
    return signals;
  }

  function telemetryMetricValue(telemetry, localTelemetry, metric, percentile = "p75") {
    const aggregate = telemetry?.metrics?.[metric];
    const aggregateValue = Number(aggregate?.[percentile]);
    const localValue = localTelemetry?.latest?.[metric]?.value;
    const currentValue = localValue === null || localValue === undefined || localValue === ""
      ? null
      : Number(localValue);
    const validCurrentValue = Number.isFinite(currentValue) ? currentValue : null;
    if (Number.isFinite(aggregateValue)) {
      return {
        value: aggregateValue,
        sampleCount: Number(aggregate.count) || 0,
        currentValue: validCurrentValue,
        statisticLabel: `${Math.max(1, Number(telemetry?.window_days) || 30)}-day ${percentile}`,
      };
    }
    if (validCurrentValue !== null) {
      return { value: validCurrentValue, sampleCount: 1, currentValue: null, statisticLabel: "Latest this visit" };
    }
    return { value: null, sampleCount: 0, currentValue: null, statisticLabel: "Collecting" };
  }

  function buildHealth({ telemetry, localTelemetry, storage }) {
    const grade = thresholds().gradeMetric;
    const connection = localTelemetry?.connection || {};
    const viewportClass = connection.viewport_class || "desktop";
    const connectionType = connection.connection_type || "unknown";
    const definitions = [
      ["lcp_ms", "p75"],
      ["inp_ms", "p75"],
      ["cls", "p75"],
      ["workspace_ready_ms", "p75"],
      ["section_navigation_ms", "p75"],
      ["query_latency_ms", "p75"],
      ["spatial_ready_ms", "p75"],
      ["spatial_fps", "p50"],
      ["connection_downlink_mbps", "p50"],
    ];
    const metrics = definitions.map(([metric, percentile]) => {
      const sampled = telemetryMetricValue(telemetry, localTelemetry, metric, percentile);
      return grade(metric, sampled.value, {
        sampleCount: sampled.sampleCount,
        viewportClass,
        connectionType,
        currentValue: sampled.currentValue,
        statisticLabel: sampled.statisticLabel,
      });
    });

    const sessions = Number(telemetry?.session_count) || 0;
    const telemetryWindowDays = Math.max(1, Number(telemetry?.window_days) || 30);
    const errors = telemetry?.metrics?.client_error;
    const errorTotal = Number(errors?.average) * Number(errors?.count);
    const errorRate = sessions > 0 && Number.isFinite(errorTotal) ? (errorTotal / sessions) * 100 : null;
    metrics.push(grade("client_error_rate", errorRate, {
      sampleCount: Number(errors?.count) || 0,
      statisticLabel: `${telemetryWindowDays}-day events / 100 visits`,
    }));
    metrics.push(grade("storage_usage_percent", storage.available ? storage.usagePercent : null, {
      sampleCount: storage.available ? 1 : 0,
      statisticLabel: "Current company-linked usage",
    }));

    const measuredCount = metrics.filter((metric) => metric.status !== "collecting").length;
    const scored = thresholds().overallHealth(metrics);
    const overall = measuredCount >= 3
      ? scored
      : { score: null, status: "collecting", label: "Collecting" };
    return {
      ...overall,
      metrics,
      measuredCount,
      totalCount: metrics.length,
      viewportClass,
      connectionType,
    };
  }

  function buildHealthSystems(health) {
    const preferred = ["lcp_ms", "inp_ms", "query_latency_ms", "client_error_rate", "spatial_fps"];
    return preferred.map((metricName) => {
      const metric = health.metrics.find((entry) => entry.metric === metricName);
      return {
        id: metricName,
        label: metric?.shortLabel || metricName,
        value: metric?.valueText || "Collecting",
        detail: metric ? `${metric.statusLabel} - ${metric.target}` : "Collecting browser samples",
        tone: metric?.status === "poor" ? "amber" : metric?.status === "watch" ? "amber" : "cyan",
        grade: metric?.status || "collecting",
        basis: metric?.basis || "MaintainOps instrumentation",
      };
    });
  }

  function buildHealthSignals(health) {
    return health.metrics
      .filter((metric) => metric.status !== "collecting")
      .sort((left, right) => (
        ({ poor: 0, watch: 1, good: 2 }[left.status] ?? 3)
        - ({ poor: 0, watch: 1, good: 2 }[right.status] ?? 3)
      ))
      .slice(0, 6)
      .map((metric) => ({
        kind: metric.status === "poor" ? "attention" : metric.status === "watch" ? "active" : "stable",
        title: metric.shortLabel,
        value: metric.valueText,
        detail: `${metric.statusLabel} - ${metric.target}`,
        system: metric.label,
        basis: metric.basis,
      }));
  }

  async function loadPlatformPerformanceSnapshot(supabaseClient, options = {}) {
    const companyId = options.companyId;
    if (!companyId) throw new Error("Choose a company before loading platform performance.");

    const now = options.now ? new Date(options.now) : new Date();
    const historyDays = Math.max(14, number(options.historyDays) || DEFAULT_HISTORY_DAYS);
    const timelineDays = Math.max(7, number(options.timelineDays) || DEFAULT_TIMELINE_DAYS);
    const historyCutoff = daysBefore(now, historyDays).toISOString();
    const today = startOfLocalDay(now);
    const canViewStorage = Boolean(options.canViewStorage);

    const [workOrdersResult, requestsResult, ordersReceivedResult, publicIntakeResult, storageResult, telemetryResult] = await Promise.all([
      readOptional("work orders", () => fetchCompanyRows(supabaseClient, {
        table: "work_orders",
        select: "id, created_at, location_id",
        companyId,
        cutoffIso: historyCutoff,
      })),
      readOptional("maintenance requests", () => fetchCompanyRows(supabaseClient, {
        table: "maintenance_requests",
        select: "id, created_at, location_id",
        fallbackSelect: "id, created_at",
        companyId,
        cutoffIso: historyCutoff,
      })),
      readOptional("order count", async () => {
        const { count, error } = await supabaseClient
          .from("work_orders")
          .select("id", { count: "exact", head: true })
          .eq("company_id", companyId);
        if (error) throw error;
        return count || 0;
      }),
      readOptional("public intake count", async () => {
        const { count, error } = await supabaseClient
          .from("maintenance_requests")
          .select("id", { count: "exact", head: true })
          .eq("company_id", companyId);
        if (error) throw error;
        return count || 0;
      }),
      canViewStorage
        ? readOptional("storage dashboard", async () => {
          const { data, error } = await supabaseClient.rpc("get_storage_dashboard", { target_company_id: companyId });
          if (error) throw error;
          return data || {};
        })
        : Promise.resolve({ label: "storage dashboard", data: null, error: "Storage detail is available to managers and admins." }),
      readOptional("app telemetry", async () => {
        const { data, error } = await supabaseClient.rpc("get_app_performance_dashboard", {
          target_company_id: companyId,
          window_days: Math.max(1, Math.min(number(options.telemetryDays) || 30, 90)),
        });
        if (error) throw error;
        return data || {};
      }),
    ]);

    const workOrders = workOrdersResult.data || [];
    const requests = requestsResult.data || [];
    const storageDashboard = storageResult.data || {};
    const totalBytes = number(storageDashboard.total_bytes);
    const storage = {
      available: Boolean(storageResult.data),
      totalBytes,
      totalBytesText: totalBytes ? formatByteText(totalBytes) : "0 B",
      fileCount: number(storageDashboard.file_count),
      allowanceBytes: number(storageDashboard.allowance_bytes),
      remainingBytes: number(storageDashboard.remaining_bytes),
      usagePercent: number(storageDashboard.usage_percent),
      note: storageResult.error || "",
    };
    const telemetryDashboard = telemetryResult.data || {};
    const health = buildHealth({
      telemetry: telemetryDashboard,
      localTelemetry: options.localTelemetry || null,
      storage,
    });
    const ordersReceivedTotal = ordersReceivedResult.error ? null : number(ordersReceivedResult.data);
    const publicIntakeTotal = publicIntakeResult.error ? null : number(publicIntakeResult.data);
    const members = Array.isArray(options.companyMembers) ? options.companyMembers : [];
    const assets = Array.isArray(options.assets) ? options.assets : [];
    const parts = Array.isArray(options.parts) ? options.parts : [];
    const locations = Array.isArray(options.locations) ? options.locations : [];
    const todayKey = dayKey(today);
    const requestsToday = requestsResult.error
      ? null
      : requests.filter((row) => dayKey(row.created_at) === todayKey).length;
    const ordersReceivedToday = workOrdersResult.error
      ? null
      : workOrders.filter((row) => dayKey(row.created_at) === todayKey).length;
    const processEventsToday = requestsToday === null || ordersReceivedToday === null
      ? null
      : requestsToday + ordersReceivedToday;
    const recentErrors = [workOrdersResult, requestsResult, ordersReceivedResult, publicIntakeResult]
      .filter((result) => result.error)
      .map((result) => result.label);
    const samplingNotices = recentErrors.map((label) => `${label} could not be sampled.`);
    const sampling = {
      status: samplingNotices.length ? "degraded" : "current",
      message: samplingNotices.length
        ? `${samplingNotices.join(" ")} Unavailable values are not reported as zero.`
        : "All requested company data sources were sampled.",
      notices: samplingNotices,
    };
    const totalRecords = ordersReceivedTotal === null || publicIntakeTotal === null
      ? null
      : assets.length + parts.length + ordersReceivedTotal + publicIntakeTotal;

    return {
      sampledAt: now.toISOString(),
      historyDays,
      sampling,
      telemetry: {
        ...telemetryDashboard,
        status: telemetryResult.error ? "unavailable" : (telemetryDashboard.status || "collecting"),
        message: telemetryResult.error
          ? "App telemetry is unavailable until the performance migration is applied. Operational counts remain current."
          : Number(telemetryDashboard.sample_count) > 0
            ? `${number(telemetryDashboard.sample_count)} privacy-limited browser samples across ${number(telemetryDashboard.session_count)} sessions.`
            : "Instrumentation is connected and collecting its first browser sessions.",
        error: telemetryResult.error || "",
      },
      health,
      summary: {
        teamSeats: members.length,
        requestsToday,
        ordersReceivedToday,
        processEventsToday,
        publicIntakeTotal,
        ordersReceivedTotal,
        totalRecords,
        assets: assets.length,
        parts: parts.length,
        locations: locations.length,
        storage,
      },
      operationalSystems: [
        {
          id: "intake",
          label: "Public Intake",
          value: countText(publicIntakeTotal, " total"),
          detail: requestsToday === null ? "Today's sample is unavailable" : `${requestsToday} received today`,
          tone: publicIntakeTotal === null || requestsToday === null ? "amber" : "cyan",
        },
        {
          id: "orders",
          label: "Order Throughput",
          value: countText(ordersReceivedTotal, " total"),
          detail: ordersReceivedToday === null ? "Today's sample is unavailable" : `${ordersReceivedToday} received today`,
          tone: ordersReceivedTotal === null || ordersReceivedToday === null ? "amber" : "cyan",
        },
        {
          id: "flow",
          label: "Today's Process Flow",
          value: countText(processEventsToday, " events"),
          detail: "Today across public intake and order throughput",
          tone: processEventsToday === null ? "amber" : "cyan",
        },
        {
          id: "vault",
          label: "Data Vault",
          value: storage.available ? storage.totalBytesText : countText(totalRecords, " records"),
          detail: storage.available ? `${storage.fileCount} linked files` : "Storage detail needs manager access",
          tone: "cyan",
        },
        {
          id: "footprint",
          label: "Platform Footprint",
          value: countText(totalRecords, " records"),
          detail: `${locations.length} active plant${locations.length === 1 ? "" : "s"} / ${members.length} team members`,
          tone: "cyan",
        },
      ],
      systems: buildHealthSystems(health),
      signals: [
        ...buildHealthSignals(health),
        ...buildSignals({
        summary: {
          requestsToday,
          ordersReceivedToday,
          processEventsToday,
          publicIntakeTotal,
          ordersReceivedTotal,
          totalRecords,
          locations: locations.length,
        },
        storage,
        sampling,
        }),
      ].slice(0, 10),
      timeline: buildTimeline({ now, days: timelineDays, workOrders, requests }),
      performanceTimeline: Array.isArray(telemetryDashboard.daily) ? telemetryDashboard.daily : [],
      plants: buildPlantFootprint({ locations, workOrders, requests }),
      notices: [
        ...samplingNotices,
        ...(storage.note ? [storage.note] : []),
      ],
    };
  }

  function formatByteText(bytes) {
    if (!bytes) return "0 B";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${Math.round(bytes / 1024)} KB`;
    if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(bytes >= 10485760 ? 0 : 1)} MB`;
    return `${(bytes / 1073741824).toFixed(bytes >= 10737418240 ? 0 : 1)} GB`;
  }

  const api = { loadPlatformPerformanceSnapshot };
  if (typeof window !== "undefined") window.MaintainOpsPlatformPerformanceService = api;
  if (typeof module !== "undefined") module.exports = api;
})();
