const { test, expect } = require("@playwright/test");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");

test("equipment history screen does not lock or force scroll", async ({ page }) => {
  await page.setContent(`
    <!doctype html>
    <html>
      <body>
        <main id="workspace">
          <div style="height: 900px">before</div>
          <button data-open-asset-history="asset-1" type="button">View Equipment History</button>
          <div style="height: 1600px">after</div>
        </main>
      </body>
    </html>
  `);

  await page.addScriptTag({ path: path.join(root, "src/utils/workspaceDetailNavigationEvents.js") });
  await page.evaluate(() => {
    window.__scrollToCalls = [];
    const originalScrollTo = window.scrollTo.bind(window);
    window.scrollTo = (...args) => {
      window.__scrollToCalls.push(args);
      return originalScrollTo(...args);
    };

    window.MaintainOpsWorkspaceDetailNavigationEvents.bindWorkspaceDetailNavigationEvents({
      documentRef: document,
      storage: { setItem() {} },
      state: {
        getActiveSection: () => "assets",
        setActiveAssetId() {},
        setActivePartId() {},
        setActiveSection() {},
        setActiveWorkOrderId() {},
        setCreateWorkOrderMode() {},
        setPendingDeleteAssetId() {},
        setQuickFixAssetId() {},
        setQuickFixMode() {},
        setQuickFixRequestId() {},
        setReportIssueMode() {},
      },
      loadAssetEventsForAssetIds: () => new Promise((resolve) => setTimeout(resolve, 30)),
      renderWorkspace: () => {
        document.querySelector('[data-open-asset-history="asset-1"]').dataset.rendered = "true";
      },
      setActiveAssetHistoryId(value) {
        window.__activeAssetHistoryId = value;
      },
      setAssetRelationshipOpen() {},
      scrollToDetailTop: () => window.scrollTo(0, 0),
      windowRef: window,
    });
  });

  await page.evaluate(() => window.scrollTo(0, 850));
  await page.locator('[data-open-asset-history="asset-1"]').click();
  await expect(page.locator('[data-open-asset-history="asset-1"][data-rendered="true"]')).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.__activeAssetHistoryId)).toBe("asset-1");

  await page.evaluate(() => {
    window.__scrollToCalls = [];
    window.scrollTo(0, 1450);
  });
  await page.waitForTimeout(150);

  const result = await page.evaluate(() => ({
    y: window.scrollY,
    calls: window.__scrollToCalls.length,
  }));

  expect(result.y).toBeGreaterThan(1300);
  expect(result.calls).toBe(1);
});
