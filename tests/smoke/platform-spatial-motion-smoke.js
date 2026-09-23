const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

(async () => {
  const source = fs.readFileSync(path.join(__dirname, "../../src/performance/platformSpatialMotion.js"), "utf8");
  const { createSpatialMotionState, timelineActivity } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
  const clock = createSpatialMotionState();
  assert.ok(clock.tick(0).delta > 0);
  assert.equal(clock.tick(2), null, "Frame limiter skips unnecessary work");
  const before = clock.tick(20).elapsed;
  assert.equal(clock.tick(5000, { hidden: true }), null);
  assert.ok(clock.tick(10000).elapsed - before < 0.02, "Hidden time must not advance motion");
  clock.invalidate();
  const paused = clock.tick(11000, { enabled: false });
  assert.equal(paused.delta, 0);
  assert.equal(clock.tick(12000, { enabled: false }), null, "Paused room renders only on demand");
  clock.invalidate();
  assert.equal(clock.tick(13000, { enabled: false }).elapsed, paused.elapsed);
  const days = timelineActivity([
    { label: "Quiet", requests: 0, ordersReceived: 0 },
    { label: "Busy", requests: 2, ordersReceived: 4 },
    { label: "Invalid", requests: -5, ordersReceived: Infinity },
    { label: "Legacy", workCreated: 1 },
  ]);
  assert.equal(days[0].requestScale, 0);
  assert.equal(days[1].total, 6);
  assert.equal(days[1].requestScale, 0.5);
  assert.equal(days[1].orderScale, 1);
  assert.equal(days[2].total, 0);
  assert.equal(days[3].total, 1);
  assert.equal(timelineActivity(Array.from({ length: 20 }, (_, index) => ({ label: String(index) }))).length, 12);
  const app = fs.readFileSync(path.join(__dirname, "../../app.js"), "utf8");
  const refresh = app.split('if (event.data?.type === "maintainops-platform-spatial-refresh")')[1].split("\n  }")[0];
  assert.ok(refresh.includes("loadPlatformPerformance({ force: true })"));
  assert.ok(!refresh.includes("reloadPlatformSpatialFrame"), "Sampling must preserve the room");
  console.log("platform spatial motion smoke passed");
})().catch((error) => { console.error(error); process.exitCode = 1; });
