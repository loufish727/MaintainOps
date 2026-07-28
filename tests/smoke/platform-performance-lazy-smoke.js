const assert = require("node:assert/strict");

const service = require("../../src/performance/platformPerformanceService.js");
const display = require("../../src/performance/platformPerformanceDisplay.js");

function createQueryResponse(table, companyRows, calls) {
  const state = { filters: [], head: false };
  const api = {
    select(_columns, options = {}) {
      state.head = Boolean(options.head);
      return api;
    },
    eq(column, value) {
      state.filters.push(["eq", column, value]);
      return api;
    },
    neq(column, value) {
      state.filters.push(["neq", column, value]);
      return api;
    },
    in(column, values) {
      state.filters.push(["in", column, values]);
      return api;
    },
    lt(column, value) {
      state.filters.push(["lt", column, value]);
      return api;
    },
    gte(column, value) {
      state.filters.push(["gte", column, value]);
      return api;
    },
    order() { return api; },
    range() {
      return Promise.resolve(response());
    },
    then(resolve, reject) {
      return Promise.resolve(response()).then(resolve, reject);
    },
  };

  function response() {
    const rows = companyRows[table] || [];
    calls.push({ table, filters: state.filters.slice(), head: state.head });
    if (!state.head) return { data: rows, error: null };
    const filtered = rows.filter((row) => state.filters.every(([operator, column, value]) => {
      if (operator === "eq") return row[column] === value;
      if (operator === "neq") return row[column] !== value;
      if (operator === "in") return value.includes(row[column]);
      if (operator === "lt") return !row[column] || String(row[column]) < String(value);
      return true;
    }));
    return { count: filtered.length, error: null };
  }

  return api;
}

(async () => {
  const calls = [];
  const companyId = "company-1";
  const rows = {
    work_orders: [
      {
        id: "work-open",
        company_id: companyId,
        location_id: "plant-1",
        created_at: "2026-07-13T11:00:00.000Z",
      },
      {
        id: "work-done",
        company_id: companyId,
        location_id: "plant-2",
        created_at: "2026-07-14T10:00:00.000Z",
      },
    ],
    maintenance_requests: [
      {
        id: "request-1",
        company_id: companyId,
        location_id: "plant-1",
        converted_work_order_id: "work-done",
        created_at: "2026-07-14T09:00:00.000Z",
        updated_at: "2026-07-14T10:00:00.000Z",
      },
    ],
  };
  const supabaseClient = {
    from(table) {
      return createQueryResponse(table, rows, calls);
    },
    rpc(name, args) {
      assert.equal(args.target_company_id, companyId);
      if (name === "get_storage_dashboard") {
        return Promise.resolve({ data: { total_bytes: 1048576, file_count: 4, usage_percent: 0.001 }, error: null });
      }
      assert.equal(name, "get_app_performance_dashboard");
      return Promise.resolve({
        data: {
          status: "current",
          window_days: 30,
          sample_count: 20,
          session_count: 4,
          metrics: {
            lcp_ms: { count: 4, p75: 2100 },
            inp_ms: { count: 4, p75: 180 },
            query_latency_ms: { count: 8, p75: 620 },
            client_error: { count: 1, average: 1 },
          },
          daily: [],
        },
        error: null,
      });
    },
  };

  const snapshot = await service.loadPlatformPerformanceSnapshot(supabaseClient, {
    companyId,
    now: "2026-07-14T16:00:00.000Z",
    locations: [{ id: "plant-1", name: "Salem" }, { id: "plant-2", name: "Auburn" }],
    assets: [{ id: "asset-1" }],
    parts: [{ id: "part-1" }, { id: "part-2" }],
    companyMembers: [{ user_id: "user-1" }, { user_id: "user-2" }],
    canViewStorage: true,
    localTelemetry: {
      latest: {
        lcp_ms: { value: 640 },
      },
      connection: {
        viewport_class: "desktop",
        connection_type: "4g",
      },
    },
  });

  assert.equal(snapshot.summary.teamSeats, 2);
  assert.equal(snapshot.summary.requestsToday, 1);
  assert.equal(snapshot.summary.ordersReceivedToday, 1);
  assert.equal(snapshot.summary.publicIntakeTotal, 1);
  assert.equal(snapshot.summary.ordersReceivedTotal, 2);
  assert.equal(snapshot.summary.processEventsToday, 2);
  assert.equal(snapshot.summary.storage.totalBytesText, "1.0 MB");
  assert.equal(snapshot.timeline.length, 14);
  assert.equal(snapshot.plants[0].name, "Salem");
  assert.equal(snapshot.sampling.status, "current");
  assert.equal(snapshot.telemetry.status, "current");
  const lcpMetric = snapshot.health.metrics.find((metric) => metric.metric === "lcp_ms");
  assert.equal(lcpMetric.status, "good");
  assert.equal(lcpMetric.statisticLabel, "30-day p75");
  assert.equal(lcpMetric.currentComparisonLabel, "This visit 640 ms");
  assert.equal(snapshot.health.metrics.find((metric) => metric.metric === "query_latency_ms").status, "watch");
  assert.equal(snapshot.health.metrics.find((metric) => metric.metric === "client_error_rate").status, "poor");
  assert.ok(calls.every((call) => call.filters.some(([operator, column, value]) => (
    operator === "eq" && column === "company_id" && value === companyId
  ))), "every performance query must be scoped to the active company");

  const renderer = display.createPlatformPerformanceDisplayHelpers({
    escapeHtml: (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;"),
  });
  const html = renderer.renderPlatformPerformancePanel({ snapshot, ready: true, error: "" });
  assert.match(html, /App Performance/);
  assert.match(html, /performance-spatial\.html\?sample=\d+/);
  assert.match(html, /data-platform-spatial-frame/);
  assert.doesNotMatch(html, /platform-spatial-exit/);

  const timeoutHtml = renderer.renderPlatformPerformancePanel({ snapshot, ready: true, error: "", timedOut: true });
  assert.match(timeoutHtml, /Performance view timed out/);
  assert.match(timeoutHtml, /data-retry-spatial-performance/);

  const updatingHtml = renderer.renderPlatformPerformancePanel({ snapshot, ready: false, error: "" });
  assert.match(updatingHtml, /performance-spatial\.html/);

  const frameSource = require("node:fs").readFileSync(require("node:path").resolve(__dirname, "../../src/performance/platformSpatialFrame.js"), "utf8");
  assert.match(frameSource, /createStorageWorld/);
  assert.match(frameSource, /maintainops-platform-spatial-snapshot/);
  assert.match(frameSource, /maintainops-platform-spatial-rendered/);
  assert.match(frameSource, /maintainops-platform-spatial-exit/);
  assert.match(frameSource, /localStorage\.setItem\("maintainops\.activeSection", "mywork"\)/);
  assert.match(frameSource, /platform-spatial-standalone/);
  assert.match(frameSource, /App Health/);
  assert.match(frameSource, /health-metric-period/);
  assert.match(frameSource, /directionLabel/);
  assert.match(frameSource, /platform-spatial-degraded/);
  assert.match(frameSource, /Unavailable/);
  assert.match(frameSource, /refresh\.classList\.remove\("refreshing"\)/);

  const worldSource = require("node:fs").readFileSync(require("node:path").resolve(__dirname, "../../src/performance/platformSpatialWorld.js"), "utf8");
  assert.doesNotMatch(worldSource, /["']\/assets\/performance-spatial\//, "spatial assets must remain project-relative");
  assert.match(worldSource, /touch: 44/);
  assert.match(worldSource, /TOUCH_PICK_RADIUS/);
  assert.match(worldSource, /touch-nearest/);
  assert.match(worldSource, /pointercancel/);
  assert.match(worldSource, /completeTouchTap = drag\.pointerType === "touch" && !drag\.moved/);
  assert.match(worldSource, /function clearToOverview\(\) \{\s*lastPickMode = "miss";\s*clearSelection\(\);\s*travelToZone\("overview"\);/);
  assert.match(worldSource, /if \(pointerType === "touch" && touchTargetEntries\.length\) \{\s*clearToOverview\(\);\s*return;/);
  assert.match(worldSource, /if \(touchTargetEntries\.length\) \{\s*clearToOverview\(\);\s*return;/);
  assert.match(worldSource, /lastPickMode = "touch-dom"/);
  assert.match(worldSource, /function updateTouchTargets\(force = false\)/);
  assert.match(worldSource, /QUALITY_SETTINGS/);
  assert.match(worldSource, /onPerformanceSample/);
  assert.match(worldSource, /CircleGeometry\(0\.76, 56\)/, "silo caps should use round geometry");
  assert.doesNotMatch(worldSource, /\[1\.42, 1\.42\]/, "square silo cap planes should stay removed");

  function createFailingQuery(table) {
    const response = { data: null, count: null, error: { message: `${table} unavailable` } };
    const api = {
      select() { return api; },
      eq() { return api; },
      gte() { return api; },
      order() { return api; },
      range() { return Promise.resolve(response); },
      then(resolve, reject) { return Promise.resolve(response).then(resolve, reject); },
    };
    return api;
  }

  const degradedSnapshot = await service.loadPlatformPerformanceSnapshot({
    from(table) { return createFailingQuery(table); },
  }, {
    companyId,
    now: "2026-07-14T16:00:00.000Z",
    canViewStorage: false,
  });
  assert.equal(degradedSnapshot.sampling.status, "degraded");
  assert.equal(degradedSnapshot.summary.publicIntakeTotal, null);
  assert.equal(degradedSnapshot.summary.ordersReceivedTotal, null);
  assert.equal(degradedSnapshot.summary.requestsToday, null);
  assert.equal(degradedSnapshot.summary.totalRecords, null);
  assert.match(degradedSnapshot.sampling.message, /Unavailable values are not reported as zero/);
  assert.equal(degradedSnapshot.signals[0].title, "Partial data sample");

  const appSource = require("node:fs").readFileSync(require("node:path").resolve(__dirname, "../../app.js"), "utf8");
  assert.match(appSource, /platformPerformanceThresholds\.js\?v=platform-performance-health-2/);
  assert.match(appSource, /platformPerformanceService\.js\?v=platform-performance-health-2/);
  assert.match(appSource, /platformPerformanceDisplay\.js\?v=platform-performance-health-2/);
  assert.match(appSource, /function armPlatformSpatialFrameWatchdog\(\)/);
  assert.match(appSource, /\}, 10000\);/);
  assert.match(appSource, /platformPerformanceTimedOut = true/);
  assert.match(appSource, /spatialFrame\?\.addEventListener\("load", postPlatformPerformanceSnapshotToSpatialFrame/);
  assert.doesNotMatch(appSource, /if \(spatialFrame\) armPlatformSpatialFrameWatchdog\(\)/);
  assert.match(appSource, /if \(platformPerformanceError\) clearPlatformSpatialFrameWatchdog\(\)/);
  assert.match(appSource, /function reloadPlatformSpatialFrame\(\)/);
  assert.match(appSource, /performance-spatial\.html\?sample=\$\{Date\.now\(\)\}/);
  assert.match(appSource, /loadPlatformPerformance\(\{ force: true \}\)\.then\(reloadPlatformSpatialFrame\)/);
  assert.match(appSource, /function exitPlatformPerformance\(\)/);
  assert.match(appSource, /maintainops-platform-spatial-exit/);

  const frameHtml = require("node:fs").readFileSync(require("node:path").resolve(__dirname, "../../performance-spatial.html"), "utf8");
  assert.match(frameHtml, /performance-header-exit/);
  assert.match(frameHtml, /data-performance-exit/);
  assert.match(frameHtml, /aria-label="Back to My Work"/);
  assert.match(frameHtml, /data-spatial-touch-targets/);
  assert.match(frameHtml, /data-quality-tier="auto"/);
  assert.doesNotMatch(frameHtml, /12 months/i);

  const spatialStyles = require("node:fs").readFileSync(require("node:path").resolve(__dirname, "../../src/performance/platformSpatial.css"), "utf8");
  assert.doesNotMatch(spatialStyles, /direct-performance-exit/);
  assert.doesNotMatch(spatialStyles, /\.performance-header-exit\s*\{[^}]*position:\s*(?:fixed|absolute)/s);
  assert.match(spatialStyles, /#storage-world\s*\{[^}]*touch-action:\s*none/s);
  assert.doesNotMatch(spatialStyles, /#storage-world\s*\{[^}]*touch-action:\s*pan-y/s);
  assert.match(spatialStyles, /\.spatial-touch-targets\s*\{[^}]*pointer-events:\s*none/s);
  assert.match(spatialStyles, /@media \(pointer: coarse\), \(hover: none\)/);
  assert.match(spatialStyles, /\.metric-scale/);

  console.log("platform performance lazy smoke passed");
})();
