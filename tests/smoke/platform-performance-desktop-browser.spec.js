const { expect, test } = require("@playwright/test");

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

  await page.evaluate(() => window.postMessage({
    type: "maintainops-platform-spatial-snapshot",
    snapshot: { sampledAt: new Date().toISOString(), sampling: { status: "current", message: "Browser test sample" } },
  }, window.location.origin));
  await expect(page.locator(".summary-source > summary")).toBeVisible();
  await page.locator(".summary-source > summary").click();
  await expect(page.locator(".health-metric-card")).toHaveCount(4);
  await expect(page.locator(".metric-scale[role='meter']")).toHaveCount(4);
  await expect(page.locator(".health-metric-card").first()).toContainText("Core Web Vitals threshold");

  await page.locator('[data-quality-tier="cinematic"]').click();
  await expect.poll(() => page.evaluate(() => window.__STORAGE_WORLD_DEBUG().quality.effective)).toBe("cinematic");
  expect(await page.evaluate(() => window.__STORAGE_WORLD_DEBUG().renderer.drawingWidth)).toBeGreaterThanOrEqual(1944);
});
