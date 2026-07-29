const assert = require("node:assert/strict");
const { performance } = require("node:perf_hooks");

const observerCallbacks = new Map();
const observerOptions = new Map();
const timers = new Map();
let nextTimerId = 1;

function setTimer(callback, delay = 0) {
  const id = nextTimerId;
  nextTimerId += 1;
  timers.set(id, { callback, delay });
  return id;
}

function clearTimer(id) {
  timers.delete(id);
}

async function runTimersThrough(maxDelay) {
  while (true) {
    const next = [...timers.entries()]
      .filter(([, timer]) => timer.delay <= maxDelay)
      .sort((left, right) => left[1].delay - right[1].delay)[0];
    if (!next) return;
    timers.delete(next[0]);
    next[1].callback();
    await Promise.resolve();
  }
}

global.performance = performance;
global.window = {
  innerWidth: 1280,
  matchMedia: () => ({ matches: false }),
  setTimeout: setTimer,
  clearTimeout: clearTimer,
  addEventListener() {},
};
global.document = {
  visibilityState: "visible",
  addEventListener() {},
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
  static supportedEntryTypes = ["event"];

  constructor(callback) {
    this.callback = callback;
  }

  observe(options) {
    observerCallbacks.set(options.type, this.callback);
    observerOptions.set(options.type, options);
  }
};
global.window.PerformanceObserver = global.PerformanceObserver;

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
  telemetry.beginWorkspaceLoad();
  telemetry.markWorkspaceReady("company-a");

  const eventObserver = observerCallbacks.get("event");
  assert.equal(typeof eventObserver, "function");
  assert.equal(observerOptions.get("event").durationThreshold, 16);

  eventObserver({ getEntries: () => [{ interactionId: 1, duration: 24 }] });
  await runTimersThrough(1600);
  await telemetry.flush();

  eventObserver({ getEntries: () => [{ interactionId: 2, duration: 80 }] });
  await runTimersThrough(1600);
  await telemetry.flush();

  const inpSamples = calls
    .flatMap((call) => call.args.samples)
    .filter((sample) => sample.metric === "inp_ms");
  assert.deepEqual(inpSamples.map((sample) => sample.value), [24, 80]);
  assert.ok(inpSamples.every((sample) => sample.context.measurement_version === 2));
  assert.equal(global.document.visibilityState, "visible");

  console.log("app telemetry active INP smoke passed");
})();
