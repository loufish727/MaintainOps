const assert = require("node:assert/strict");
const { gradeMetric, overallHealth } = require("../../src/performance/platformPerformanceThresholds.js");

const goodLcp = gradeMetric("lcp_ms", 2500, { sampleCount: 12 });
assert.equal(goodLcp.status, "good");
assert.match(goodLcp.basis, /separate from workspace readiness/);
assert.equal(goodLcp.sampleCount, 12);
assert.equal(goodLcp.directionLabel, "Lower is better");
assert.equal(goodLcp.statisticLabel, "Current");
assert.equal(Number(goodLcp.goodPosition.toFixed(1)), 41.7);
assert.equal(Number(goodLcp.watchPosition.toFixed(1)), 66.7);

assert.equal(gradeMetric("lcp_ms", 2501).status, "watch");
assert.equal(gradeMetric("lcp_ms", 4001).status, "poor");
assert.equal(gradeMetric("inp_ms", 200).status, "good");
assert.equal(gradeMetric("inp_ms", 500).status, "watch");
assert.equal(gradeMetric("cls", 0.251).status, "poor");
assert.equal(gradeMetric("storage_usage_percent", 70).status, "good");
assert.equal(gradeMetric("storage_usage_percent", 85).status, "watch");
assert.equal(gradeMetric("storage_usage_percent", 70).goodPosition, 70);
assert.equal(gradeMetric("spatial_fps", 40, { viewportClass: "mobile" }).status, "good");
assert.equal(gradeMetric("spatial_fps", 40, { viewportClass: "desktop" }).status, "good");
assert.equal(gradeMetric("spatial_fps", 39).status, "watch");
assert.equal(gradeMetric("spatial_fps", 40).directionLabel, "Higher is better");
assert.equal(gradeMetric("connection_downlink_mbps", 1.9).status, "poor");
assert.equal(gradeMetric("query_latency_ms", null).status, "collecting");
assert.equal(gradeMetric("client_error_rate", 0.8).valueText, "0.8 / 100");
assert.equal(gradeMetric("client_error_rate", 0).valueText, "0 / 100");

const historicalLcp = gradeMetric("lcp_ms", 3704, {
  currentValue: 584,
  sampleCount: 44,
  statisticLabel: "30-day p75",
});
assert.equal(historicalLcp.shortLabel, "Page paint (LCP)");
assert.equal(historicalLcp.currentValueText, "584 ms");
assert.equal(historicalLcp.currentComparisonLabel, "Latest this visit 584 ms");

const overall = overallHealth([
  gradeMetric("lcp_ms", 2100),
  gradeMetric("inp_ms", 270),
  gradeMetric("cls", 0.05),
]);
assert.equal(overall.status, "good");
assert.equal(overall.score, 87);

console.log("platform performance thresholds smoke passed");
