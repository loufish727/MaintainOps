const { expect, test } = require("@playwright/test");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");

test("workspace search preserves uninterrupted typing, focus, and scroll", async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 700 });
  await page.setContent('<main id="workspace"></main>');
  await page.addScriptTag({ path: path.join(root, "src/utils/workspaceSearchEvents.js") });
  await page.evaluate(() => {
    const state = {
      searchQuery: "",
      getSearchQuery() {
        return this.searchQuery;
      },
      setSearchQuery(value) {
        this.searchQuery = value;
      },
      setActiveWorkOrderId() {},
      setActiveAssetId() {},
      setActivePartId() {},
      setActiveSection() {},
      setQuickFixMode() {},
      setCreateWorkOrderMode() {},
      setQuickFixAssetId() {},
      setQuickFixRequestId() {},
    };
    const storage = { setItem() {} };
    window.__searchFixture = {
      renderCount: 0,
      requestReloadCount: 0,
      workReloadCount: 0,
      reloadOptions: [],
      state,
    };

    const escapeAttribute = (value) => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;");
    window.__renderSearchFixture = () => {
      window.__searchFixture.renderCount += 1;
      document.querySelector("#workspace").innerHTML = `
        <div style="height: 900px">Search fixture spacer</div>
        <label for="workspace-search">Search workspace</label>
        <input id="workspace-search" class="workspace-search-input" type="search" value="${escapeAttribute(state.searchQuery)}">
        <p id="search-result">${escapeAttribute(state.searchQuery)}</p>
        <div style="height: 1400px">Search fixture tail</div>
      `;
      window.MaintainOpsWorkspaceSearchEvents.bindWorkspaceSearchEvents({
        documentRef: document,
        storage,
        state,
        windowRef: window,
        searchDelayMs: 120,
        invalidateExactWorkOrderSearchCache() {},
        resetWorkOrderPage() {},
        resetPartsPage() {},
        resetRequestsPage() {},
        setWorkOrderSearchMode() {},
        reloadWorkOrderQueue: async (options) => {
          window.__searchFixture.workReloadCount += 1;
          window.__searchFixture.reloadOptions.push(options);
          await new Promise((resolve) => setTimeout(resolve, 70));
        },
        reloadRequestQueue: async (options) => {
          window.__searchFixture.requestReloadCount += 1;
          window.__searchFixture.reloadOptions.push(options);
          await new Promise((resolve) => setTimeout(resolve, 45));
        },
        renderWorkspace: window.__renderSearchFixture,
      });
    };

    window.__renderSearchFixture();
  });

  const searchInput = page.locator("#workspace-search");
  await searchInput.click();
  await page.evaluate(() => window.scrollTo(0, 700));
  const initialScrollY = await page.evaluate(() => window.scrollY);

  await searchInput.type("color chip sharpening", { delay: 20 });
  await expect(searchInput).toHaveValue("color chip sharpening");
  expect(await page.evaluate(() => window.__searchFixture.renderCount)).toBe(1);

  await expect.poll(() => page.evaluate(() => ({
    requests: window.__searchFixture.requestReloadCount,
    work: window.__searchFixture.workReloadCount,
    renders: window.__searchFixture.renderCount,
  }))).toEqual({ requests: 1, work: 1, renders: 2 });

  const result = await page.evaluate(() => ({
    activeElementId: document.activeElement?.id,
    reloadOptions: window.__searchFixture.reloadOptions,
    scrollY: window.scrollY,
    searchQuery: window.__searchFixture.state.searchQuery,
    selectionEnd: document.querySelector("#workspace-search").selectionEnd,
    value: document.querySelector("#workspace-search").value,
  }));

  expect(result.value).toBe("color chip sharpening");
  expect(result.searchQuery).toBe("color chip sharpening");
  expect(result.selectionEnd).toBe("color chip sharpening".length);
  expect(result.activeElementId).toBe("workspace-search");
  expect(result.reloadOptions).toEqual([{ render: false }, { render: false }]);
  expect(Math.abs(result.scrollY - initialScrollY)).toBeLessThanOrEqual(1);
});
