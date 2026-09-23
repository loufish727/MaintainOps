const { test, expect } = require("@playwright/test");

function snapshot(value = 12) {
  return {
    sampledAt: new Date().toISOString(), sampling: { status: "current", message: "Isolated browser fixture" },
    systems: ["Public Intake", "Order Throughput", "Process Flow", "Data Vault", "Platform Footprint"].map((label, index) => ({ id: String(index), label, value: `${value + index} records`, detail: "Browser fixture only" })),
    timeline: Array.from({ length: 12 }, (_, index) => ({ day: `2026-09-${index + 10}`, label: `Sep ${index + 10}`, requests: index === 10 ? 0 : index, ordersReceived: index === 10 ? 0 : index * 2 })),
    signals: [{ title: "Fixture signal", value: String(value), detail: "Browser fixture only", kind: "active" }],
  };
}

for (const mobile of [false, true]) {
  test.describe(mobile ? "mobile motion" : "desktop motion", () => {
    test.use({ viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 }, hasTouch: mobile, isMobile: mobile });
    test("room animates, updates in place, inspects and pauses without leaks", async ({ page, baseURL }, testInfo) => {
      test.setTimeout(180000);
      const errors = [];
      page.on("pageerror", (error) => { errors.push(error.message); console.error(error.message); });
      const resources = [];
      page.on("request", (request) => { if (/performance-spatial\/|platformSpatial\./.test(request.url())) resources.push(request.url()); });
      await page.goto(`${baseURL}performance-spatial.html?lfes_canvas_probe=motion`, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => window.__MAINTAIN_OPS_PLATFORM_SPATIAL_READY && window.__STORAGE_WORLD_DEBUG().travelT === 1, null, { timeout: 45000 });
      const debug = () => page.evaluate(() => window.__STORAGE_WORLD_DEBUG());
      const post = (value) => page.evaluate((data) => window.postMessage({ type: "maintainops-platform-spatial-snapshot", snapshot: data }, location.origin), snapshot(value));
      expect((await debug()).renderer.pixels.nonBlack).toBeGreaterThan(100);
      await expect(page.locator(".timeline-days button")).toHaveCount(0);
      await post(12);
      await expect(page.locator(".timeline-days button")).toHaveCount(12);
      await page.locator(".timeline-days button").nth(10).click();
      await expect(page.locator(".timeline-detail")).toContainText("0 intake / 0 orders / 0 total");
      expect(await page.locator(".timeline-days button").nth(10).locator("i").evaluateAll((bars) => bars.map((bar) => bar.style.getPropertyValue("--activity-scale")))).toEqual(["0", "0"]);
      await page.locator(".timeline-days button").nth(11).click();
      await expect(page.locator(".timeline-detail")).toContainText("11 intake / 22 orders / 33 total");
      const first = await debug();
      const imageA = await page.locator("#storage-world").screenshot();
      await page.waitForTimeout(700);
      expect((await debug()).motion.elapsed).toBeGreaterThan(first.motion.elapsed);
      expect((await page.locator("#storage-world").screenshot()).equals(imageA)).toBe(false);
      await page.screenshot({ path: testInfo.outputPath("overview.png") });

      async function selectBucket() {
        const target = (await debug()).targets.find((target) => target.type === "bucket" && target.index === 2);
        if (mobile) await page.locator('[data-spatial-type="bucket"][data-spatial-index="2"]').click();
        else await page.mouse.click(target.x, target.y);
        await expect(page.locator(".spatial-inspector h2")).toHaveText("Process Flow");
        await page.waitForFunction(() => window.__STORAGE_WORLD_DEBUG().travelT === 1);
      }
      await selectBucket();
      await page.screenshot({ path: testInfo.outputPath("inspection.png") });
      const selected = await debug();
      const fetched = resources.length;
      await post(24);
      await expect(page.locator(".spatial-inspector")).toContainText("26 records");
      expect((await debug()).selected).toEqual(selected.selected);
      expect((await debug()).cameraPos).toEqual(selected.cameraPos);
      expect(resources.length).toBe(fetched);
      await page.getByRole("button", { name: "Close inspection" }).click();
      await page.waitForFunction(() => window.__STORAGE_WORLD_DEBUG().travelT === 1);
      // Freeze ambient motion so newly visible rotating meshes cannot skew the leak comparison.
      await page.locator("#motion-button").click();
      await expect(page.locator("#motion-button")).toHaveText("Motion off");
      await page.waitForTimeout(250);
      const memory = (await debug()).renderer;
      for (let index = 0; index < 3; index += 1) {
        await selectBucket();
        await page.getByRole("button", { name: "Close inspection" }).click();
        await page.waitForFunction(() => window.__STORAGE_WORLD_DEBUG().travelT === 1);
      }
      expect((await debug()).renderer.geometries).toBeLessThanOrEqual(memory.geometries + 1);
      expect((await debug()).renderer.textures).toBeLessThanOrEqual(memory.textures + 1);
      await expect(page.locator("#motion-button")).toHaveText("Motion off");
      await page.waitForTimeout(250);
      const paused = (await debug()).motion;
      const staticImage = await page.locator("#storage-world").screenshot();
      await page.waitForTimeout(600);
      expect((await debug()).motion.elapsed).toBe(paused.elapsed);
      expect((await debug()).motion.renderedFrames).toBe(paused.renderedFrames);
      expect((await page.locator("#storage-world").screenshot()).equals(staticImage)).toBe(true);
      await selectBucket();
      expect((await debug()).travelT).toBe(1);
      await page.getByRole("button", { name: "Close inspection" }).click();
      await page.locator("#motion-button").click();
      await page.emulateMedia({ reducedMotion: "reduce" });
      await expect(page.locator("#motion-button")).toHaveText("Reduced motion");
      await expect(page.locator("#motion-button")).toBeDisabled();
      expect((await debug()).motion.enabled).toBe(false);
      await selectBucket();
      expect((await debug()).travelT).toBe(1);
      await page.screenshot({ path: testInfo.outputPath("reduced-motion-inspection.png") });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      expect(overflow).toBe(false);
      expect(errors).toEqual([]);
      console.log(JSON.stringify({ device: mobile ? "mobile" : "desktop", renderer: (await debug()).renderer }));
    });
  });
}
