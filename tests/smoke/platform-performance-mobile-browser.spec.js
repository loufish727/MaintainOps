const { expect, test } = require("@playwright/test");

test.use({
  hasTouch: true,
  isMobile: true,
  viewport: { width: 390, height: 844 },
});

async function findBlankCanvasPoint(page) {
  return page.evaluate(() => {
    const canvas = document.querySelector("#storage-world");
    const targets = window.__STORAGE_WORLD_DEBUG().targets;
    let best = null;
    for (let y = 190; y <= window.innerHeight - 190; y += 24) {
      for (let x = 18; x <= window.innerWidth - 18; x += 24) {
        if (document.elementFromPoint(x, y) !== canvas) continue;
        const clearance = Math.min(...targets.map((target) => Math.hypot(x - target.x, y - target.y)));
        if (!best || clearance > best.clearance) best = { x, y, clearance };
      }
    }
    return best;
  });
}

test("mobile Performance supports object and empty-space taps and keeps Back inside the header", async ({ page, baseURL }) => {
  test.setTimeout(180000);

  await page.goto(`${baseURL}performance-spatial.html?qa_bust=mobile-controls-${Date.now()}`, {
    waitUntil: "domcontentloaded",
  });

  await page.waitForFunction(() => (
    window.__MAINTAIN_OPS_PLATFORM_SPATIAL_READY === true
    && typeof window.__STORAGE_WORLD_DEBUG === "function"
    && window.__STORAGE_WORLD_DEBUG().travelT >= 0.99
  ));

  const initialRendering = await page.evaluate(() => window.__STORAGE_WORLD_DEBUG());
  expect(initialRendering.quality.preference).toBe("auto");
  expect(initialRendering.quality.effective).toBe("performance");
  expect(initialRendering.renderer.drawCalls).toBeGreaterThan(0);
  expect(initialRendering.renderer.triangles).toBeGreaterThan(0);
  expect(initialRendering.renderer.drawingWidth).toBeLessThanOrEqual(392);
  expect(initialRendering.renderer.pixels.nonBlack).toBeGreaterThan(100);
  expect(initialRendering.renderer.pixels.range).toBeGreaterThan(8);

  await expect(page.locator('[data-quality-tier="auto"]')).toContainText("Auto");
  await page.locator('[data-quality-tier="cinematic"]').click();
  await expect.poll(() => page.evaluate(() => window.__STORAGE_WORLD_DEBUG().quality.effective)).toBe("cinematic");
  expect(await page.evaluate(() => window.__STORAGE_WORLD_DEBUG().renderer.drawingWidth)).toBeGreaterThanOrEqual(526);
  await page.locator('[data-quality-tier="auto"]').click();
  await expect.poll(() => page.evaluate(() => window.__STORAGE_WORLD_DEBUG().quality.effective)).toBe("performance");

  const visibleObjectHits = await page.evaluate(() => (
    window.__STORAGE_WORLD_DEBUG().targets
      .filter((target) => ["bucket", "file"].includes(target.type))
      .filter((target) => target.x >= 0 && target.x < window.innerWidth && target.y >= 0 && target.y < window.innerHeight)
      .map((target) => {
        const element = document.elementFromPoint(target.x, target.y);
        return {
          expected: `${target.type}:${target.index}`,
          actual: `${element?.dataset?.spatialType || "none"}:${element?.dataset?.spatialIndex || "none"}`,
        };
      })
  ));
  expect(visibleObjectHits.length).toBeGreaterThan(8);
  expect(visibleObjectHits.every(({ expected, actual }) => expected === actual)).toBe(true);

  const bucketTarget = await page.evaluate(() => {
    const debug = window.__STORAGE_WORLD_DEBUG();
    return debug.targets.find((item) => item.type === "bucket" && item.index === 2);
  });
  expect(bucketTarget).toBeTruthy();

  await page.waitForFunction(({ x, y }) => {
    const element = document.elementFromPoint(x, y - 42);
    return element?.matches('[data-spatial-type="bucket"][data-spatial-index="2"]');
  }, bucketTarget);

  await page.touchscreen.tap(bucketTarget.x, bucketTarget.y - 42);

  await expect.poll(() => page.evaluate(() => window.__STORAGE_WORLD_DEBUG().pointerGesture)).toBe("tap");
  await expect.poll(() => page.evaluate(() => window.__STORAGE_WORLD_DEBUG().selected?.type || "")).toBe("bucket");
  expect(await page.evaluate(() => window.__STORAGE_WORLD_DEBUG().lastPickMode)).toBe("touch-dom");

  const blankPoint = await findBlankCanvasPoint(page);
  expect(blankPoint).toBeTruthy();
  expect(blankPoint.clearance).toBeGreaterThan(72);
  await page.touchscreen.tap(blankPoint.x, blankPoint.y);
  await expect.poll(() => page.evaluate(() => window.__STORAGE_WORLD_DEBUG().selected?.type || "")).toBe("");
  await expect.poll(() => page.evaluate(() => window.__STORAGE_WORLD_DEBUG().zone)).toBe("overview");
  expect(await page.evaluate(() => window.__STORAGE_WORLD_DEBUG().travelT)).toBeLessThan(0.99);

  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => (
    window.__MAINTAIN_OPS_PLATFORM_SPATIAL_READY === true
    && typeof window.__STORAGE_WORLD_DEBUG === "function"
    && window.__STORAGE_WORLD_DEBUG().travelT >= 0.99
  ));

  const fileTarget = await page.evaluate(() => (
    window.__STORAGE_WORLD_DEBUG().targets.find((item) => item.type === "file" && item.index === 5)
  ));
  expect(fileTarget).toBeTruthy();
  await page.waitForFunction(({ x, y }) => {
    const element = document.elementFromPoint(x + 22, y - 17);
    return element?.matches('[data-spatial-type="file"][data-spatial-index="5"]');
  }, fileTarget);
  await page.touchscreen.tap(fileTarget.x + 22, fileTarget.y - 17);
  await expect.poll(() => page.evaluate(() => window.__STORAGE_WORLD_DEBUG().selected?.type || "")).toBe("file");
  expect(await page.evaluate(() => window.__STORAGE_WORLD_DEBUG().lastPickMode)).toBe("touch-dom");

  const cancelledTapPoint = await findBlankCanvasPoint(page);
  expect(cancelledTapPoint).toBeTruthy();
  expect(cancelledTapPoint.clearance).toBeGreaterThan(72);
  await page.evaluate(({ x, y }) => {
    const canvas = document.querySelector("#storage-world");
    const pointer = {
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
      isPrimary: true,
      pointerId: 71,
      pointerType: "touch",
    };
    canvas.dispatchEvent(new PointerEvent("pointerdown", { ...pointer, buttons: 1 }));
    canvas.dispatchEvent(new PointerEvent("pointercancel", pointer));
  }, cancelledTapPoint);
  await expect.poll(() => page.evaluate(() => window.__STORAGE_WORLD_DEBUG().selected?.type || "")).toBe("");
  await expect.poll(() => page.evaluate(() => window.__STORAGE_WORLD_DEBUG().zone)).toBe("overview");
  expect(await page.evaluate(() => window.__STORAGE_WORLD_DEBUG().lastPickMode)).toBe("miss");
  expect(await page.evaluate(() => window.__STORAGE_WORLD_DEBUG().travelT)).toBeLessThan(0.99);

  const header = page.locator(".page-header");
  const back = page.locator(".performance-header-exit");
  const notice = page.locator("#sampling-notice");
  const quality = page.locator(".quality-control");
  await expect(back).toBeVisible();
  await expect(back).toHaveAttribute("aria-label", "Back to My Work");
  await expect(quality).toBeVisible();

  await page.evaluate(() => window.postMessage({
    type: "maintainops-platform-spatial-snapshot",
    snapshot: { sampledAt: new Date().toISOString(), sampling: { status: "current", message: "Browser test sample" } },
  }, window.location.origin));
  await expect(page.locator(".summary-source > summary")).toBeVisible();
  await page.locator(".summary-source > summary").click();
  await expect(page.locator(".health-metric-card")).toHaveCount(4);
  await expect(page.locator(".metric-scale")).toHaveCount(4);

  const { headerBox, backBox, noticeBox } = await page.evaluate(() => {
    const rect = (selector) => {
      const box = document.querySelector(selector)?.getBoundingClientRect();
      return box ? { x: box.x, y: box.y, width: box.width, height: box.height } : null;
    };
    return {
      headerBox: rect(".page-header"),
      backBox: rect(".performance-header-exit"),
      noticeBox: rect("#sampling-notice"),
    };
  });
  expect(headerBox).toBeTruthy();
  expect(backBox).toBeTruthy();
  expect(noticeBox).toBeTruthy();
  expect(backBox.x).toBeGreaterThanOrEqual(headerBox.x);
  expect(backBox.y).toBeGreaterThanOrEqual(headerBox.y);
  expect(backBox.x + backBox.width).toBeLessThanOrEqual(headerBox.x + headerBox.width);
  expect(backBox.y + backBox.height).toBeLessThanOrEqual(headerBox.y + headerBox.height);
  expect(backBox.y + backBox.height).toBeLessThanOrEqual(noticeBox.y);
});
