const { expect, test } = require("@playwright/test");

test.use({
  hasTouch: true,
  isMobile: true,
  viewport: { width: 390, height: 844 },
});

test("mobile Performance accepts touch taps and keeps Back inside the header", async ({ page, baseURL }) => {
  test.setTimeout(60000);

  await page.goto(`${baseURL}performance-spatial.html?qa_bust=mobile-controls-${Date.now()}`, {
    waitUntil: "domcontentloaded",
  });

  await page.waitForFunction(() => (
    window.__MAINTAIN_OPS_PLATFORM_SPATIAL_READY === true
    && typeof window.__STORAGE_WORLD_DEBUG === "function"
    && window.__STORAGE_WORLD_DEBUG().travelT >= 0.99
  ));

  const target = await page.evaluate(() => {
    const debug = window.__STORAGE_WORLD_DEBUG();
    return debug.targets.find((item) => item.type === "bucket" && item.index === 2);
  });
  expect(target).toBeTruthy();

  const startX = target.x - 5;
  const endX = target.x + 5;
  const pointer = {
    bubbles: true,
    clientY: target.y,
    isPrimary: true,
    pointerId: 41,
    pointerType: "touch",
  };
  await page.dispatchEvent("#storage-world", "pointerdown", { ...pointer, clientX: startX });
  await page.dispatchEvent("#storage-world", "pointermove", { ...pointer, clientX: endX });
  await page.dispatchEvent("#storage-world", "pointerup", { ...pointer, clientX: endX });

  await expect.poll(() => page.evaluate(() => window.__STORAGE_WORLD_DEBUG().pointerGesture)).toBe("tap");
  await expect.poll(() => page.evaluate(() => window.__STORAGE_WORLD_DEBUG().selected?.type || "")).toBe("bucket");

  await page.dispatchEvent("#storage-world", "pointerdown", { ...pointer, pointerId: 42, clientX: target.x });
  await page.dispatchEvent("#storage-world", "pointercancel", { ...pointer, pointerId: 42, clientX: target.x });
  await expect.poll(() => page.evaluate(() => window.__STORAGE_WORLD_DEBUG().pointerGesture)).toBe("cancel");
  expect(await page.evaluate(() => window.__STORAGE_WORLD_DEBUG().pointerActive)).toBe(false);

  const header = page.locator(".page-header");
  const back = page.locator(".performance-header-exit");
  const notice = page.locator("#sampling-notice");
  await expect(back).toBeVisible();
  await expect(back).toHaveAttribute("aria-label", "Back to My Work");

  const headerBox = await header.boundingBox();
  const backBox = await back.boundingBox();
  const noticeBox = await notice.boundingBox();
  expect(headerBox).toBeTruthy();
  expect(backBox).toBeTruthy();
  expect(noticeBox).toBeTruthy();
  expect(backBox.x).toBeGreaterThanOrEqual(headerBox.x);
  expect(backBox.y).toBeGreaterThanOrEqual(headerBox.y);
  expect(backBox.x + backBox.width).toBeLessThanOrEqual(headerBox.x + headerBox.width);
  expect(backBox.y + backBox.height).toBeLessThanOrEqual(headerBox.y + headerBox.height);
  expect(backBox.y + backBox.height).toBeLessThanOrEqual(noticeBox.y);
});
