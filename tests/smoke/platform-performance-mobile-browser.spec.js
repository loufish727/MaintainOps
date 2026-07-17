const { expect, test } = require("@playwright/test");

test.use({
  hasTouch: true,
  isMobile: true,
  viewport: { width: 390, height: 844 },
});

test("mobile Performance accepts real off-center touch taps and keeps Back inside the header", async ({ page, baseURL }) => {
  test.setTimeout(180000);

  await page.goto(`${baseURL}performance-spatial.html?qa_bust=mobile-controls-${Date.now()}`, {
    waitUntil: "domcontentloaded",
  });

  await page.waitForFunction(() => (
    window.__MAINTAIN_OPS_PLATFORM_SPATIAL_READY === true
    && typeof window.__STORAGE_WORLD_DEBUG === "function"
    && window.__STORAGE_WORLD_DEBUG().travelT >= 0.99
  ));

  const bucketTarget = await page.evaluate(() => {
    const debug = window.__STORAGE_WORLD_DEBUG();
    return debug.targets.find((item) => item.type === "bucket" && item.index === 2);
  });
  expect(bucketTarget).toBeTruthy();

  await page.touchscreen.tap(bucketTarget.x, bucketTarget.y - 42);

  await expect.poll(() => page.evaluate(() => window.__STORAGE_WORLD_DEBUG().pointerGesture)).toBe("tap");
  await expect.poll(() => page.evaluate(() => window.__STORAGE_WORLD_DEBUG().selected?.type || "")).toBe("bucket");
  expect(await page.evaluate(() => window.__STORAGE_WORLD_DEBUG().lastPickMode)).toBe("touch-nearest");

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
  await page.touchscreen.tap(fileTarget.x + 22, fileTarget.y - 17);
  await expect.poll(() => page.evaluate(() => window.__STORAGE_WORLD_DEBUG().selected?.type || "")).toBe("file");
  expect(await page.evaluate(() => window.__STORAGE_WORLD_DEBUG().lastPickMode)).toBe("touch-nearest");

  const header = page.locator(".page-header");
  const back = page.locator(".performance-header-exit");
  const notice = page.locator("#sampling-notice");
  await expect(back).toBeVisible();
  await expect(back).toHaveAttribute("aria-label", "Back to My Work");

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
