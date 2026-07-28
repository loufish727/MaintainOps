const { expect, test } = require("@playwright/test");
const { gradeMetric } = require("../../src/performance/platformPerformanceThresholds.js");

test.use({ viewport: { width: 1440, height: 900 } });

test("desktop Performance renders measured scales and adaptive 3D output", async ({ page, baseURL }) => {
  test.setTimeout(180000);
  await page.goto(`${baseURL}performance-spatial.html?qa_bust=desktop-health-${Date.now()}`, {
    waitUntil: "domcontentloaded",
  });
  await page.waitForFunction(() => (
    window.__MAINTAIN_OPS_PLATFORM_SPATIAL_READY === true
    && typeof window.__STORAGE_WORLD_DEBUG === "function"
    && window.__STORAGE_WORLD_DEBUG().travelT >= 0.99
  ));

  const debug = await page.evaluate(() => window.__STORAGE_WORLD_DEBUG());
  expect(debug.quality.preference).toBe("auto");
  expect(["balanced", "performance"]).toContain(debug.quality.effective);
  expect(debug.renderer.drawCalls).toBeGreaterThan(0);
  expect(debug.renderer.triangles).toBeGreaterThan(1000);
  expect(debug.renderer.pixels.nonBlack).toBeGreaterThan(100);
  expect(debug.renderer.pixels.range).toBeGreaterThan(8);

  await expect(page.locator(".page-header")).toBeVisible();
  await expect(page.locator(".quality-control")).toBeVisible();
  await expect(page.locator(".timeline-console-head small")).toContainText("day activity view");
  await expect(page.locator("body")).not.toContainText("12 Months");

  const healthMetrics = [
    gradeMetric("lcp_ms", 3704, { sampleCount: 44, statisticLabel: "30-day p75", currentValue: 584 }),
    gradeMetric("inp_ms", 72, { sampleCount: 32, statisticLabel: "30-day p75", currentValue: 64 }),
    gradeMetric("cls", 0.018, { sampleCount: 40, statisticLabel: "30-day p75", currentValue: 0.006 }),
    gradeMetric("workspace_ready_ms", 4481, { sampleCount: 42, statisticLabel: "30-day p75", currentValue: 990 }),
    gradeMetric("section_navigation_ms", 701, { sampleCount: 142, statisticLabel: "30-day p75", currentValue: 86 }),
    gradeMetric("query_latency_ms", 245, { sampleCount: 11868, statisticLabel: "30-day p75", currentValue: 90 }),
    gradeMetric("spatial_ready_ms", 3200, { sampleCount: 15, statisticLabel: "30-day p75", currentValue: 2800 }),
    gradeMetric("spatial_fps", 53, { sampleCount: 25, statisticLabel: "30-day p50", currentValue: 58 }),
    gradeMetric("connection_downlink_mbps", 10, { sampleCount: 32, statisticLabel: "30-day p50", currentValue: 10 }),
    gradeMetric("client_error_rate", 2.2, { sampleCount: 1, statisticLabel: "30-day rate" }),
    gradeMetric("storage_usage_percent", 0.2, { sampleCount: 1, statisticLabel: "Current capacity" }),
  ];
  await page.evaluate((metrics) => window.postMessage({
    type: "maintainops-platform-spatial-snapshot",
    snapshot: {
      sampledAt: new Date().toISOString(),
      sampling: { status: "current", message: "Browser test sample" },
      health: {
        score: 82,
        status: "watch",
        label: "Watch",
        measuredCount: metrics.length,
        totalCount: metrics.length,
        metrics,
      },
    },
  }, window.location.origin), healthMetrics);
  await expect(page.locator(".summary-source > summary")).toBeVisible();
  await page.locator(".summary-source > summary").click();
  await expect(page.locator(".health-metric-card")).toHaveCount(11);
  await expect(page.locator(".metric-scale[role='meter']")).toHaveCount(11);
  await expect(page.locator(".health-metric-card").first()).toContainText("Core Web Vitals threshold");
  await expect(page.locator(".health-metric-card").first()).toContainText("Page render (LCP)");
  await expect(page.locator(".health-metric-card").first()).toContainText("30-day p75");
  await expect(page.locator(".health-metric-card").first()).toContainText("This visit 584 ms");
  await expect(page.locator(".health-metric-card").first()).toContainText("Lower is better");
  await expect(page.locator(".health-metric-card").filter({ hasText: "3D smoothness" })).toContainText("Higher is better");
  const overflowingCards = await page.locator(".health-metric-card").evaluateAll((cards) => cards.filter((card) => (
    card.scrollWidth > card.clientWidth + 1 || card.scrollHeight > card.clientHeight + 1
  )).length);
  expect(overflowingCards).toBe(0);

  await page.locator('[data-quality-tier="cinematic"]').click();
  await expect(page.locator('[data-quality-tier="cinematic"]')).toHaveAttribute("aria-pressed", "true");
  await expect.poll(
    () => page.evaluate(() => window.__STORAGE_WORLD_DEBUG().quality.effective),
    { timeout: 30000 },
  ).toBe("cinematic");
  expect(await page.evaluate(() => window.__STORAGE_WORLD_DEBUG().renderer.drawingWidth)).toBeGreaterThanOrEqual(1944);
});
