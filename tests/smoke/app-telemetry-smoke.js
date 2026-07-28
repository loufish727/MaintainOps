const assert = require("node:assert/strict");
const { performance } = require("node:perf_hooks");

const windowListeners = new Map();
const documentListeners = new Map();
global.performance = performance;
global.window = {
  innerWidth: 1280,
  matchMedia: () => ({ matches: false }),
  setTimeout,
  addEventListener(type, listener) { windowListeners.set(type, listener); },
};
global.document = {
  visibilityState: "visible",
  addEventListener(type, listener) { documentListeners.set(type, listener); },
};
Object.defineProperty(global, "navigator", {
  configurable: true,
  value: {
    onLine: true,
    deviceMemory: 8,
    hardwareConcurrency: 8,
  },
});
global.PerformanceObserver = class PerformanceObserver {
  static supportedEntryTypes = [];
};

const telemetry = require("../../src/performance/appTelemetry.js");

(async () => {
  const calls = [];
  const client = {
    async rpc(name, args) {
      calls.push({ name, args });
      return { data: args.samples.length, error: null };
    },
  };

  telemetry.configure({ client, companyId: "company-a" });
  assert.equal(telemetry.record("lcp_ms", 1800, { source: "test" }, { persist: false }), true);
  assert.equal(telemetry.record("unsupported", 1), false);
  telemetry.markWorkspaceReady("company-a");
  global.document.visibilityState = "hidden";
  documentListeners.get("visibilitychange")();
  documentListeners.get("visibilitychange")();
  telemetry.recordSpatial({ fps: 42, frameMs: 23, contextLosses: 0, qualityTier: "performance" });
  assert.equal(await telemetry.flush(), true);

  const samples = calls.flatMap((call) => call.args.samples);
  assert.ok(calls.every((call) => call.name === "record_app_performance_samples"));
  assert.ok(calls.every((call) => call.args.target_company_id === "company-a"));
  assert.ok(samples.some((sample) => sample.metric === "session_start" && sample.unit === "count"));
  assert.ok(samples.some((sample) => sample.metric === "workspace_ready_ms" && sample.unit === "ms"));
  assert.equal(samples.filter((sample) => sample.metric === "lcp_ms").length, 1);
  assert.ok(samples.some((sample) => sample.metric === "spatial_fps" && sample.unit === "fps"));
  assert.ok(!samples.some((sample) => sample.metric === "webgl_context_loss"));
  assert.equal(telemetry.snapshot().connection.device_tier, "standard");

  console.log("app telemetry smoke passed");
})();
