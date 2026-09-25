const { expect, test } = require("@playwright/test");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");

for (const width of [320, 390, 1440]) {
  test(`QR actions keep their colors and fit at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.setContent('<main class="panel" id="qr-test"></main>');
    await page.addStyleTag({ path: path.join(root, "styles.css") });
    await page.addScriptTag({ path: path.join(root, "src/render/publicRequestDisplay.js") });
    await page.evaluate(() => {
      const helpers = window.MaintainOpsPublicRequestDisplay.createPublicRequestDisplayHelpers({
        escapeHtml: (value) => String(value),
        qrSvgFor: () => '<div class="qr-fallback">QR preview</div>',
        getLocations: () => [{ id: "active", name: "Active facility" }, { id: "disabled", name: "Disabled facility" }],
        getPublicRequestLinks: () => [
          { id: "link-active", location_id: "active", token: "active", is_active: true },
          { id: "link-disabled", location_id: "disabled", token: "disabled", is_active: false },
        ],
        canManageTeam: () => true,
        canAdministerPublicRequestLinks: () => true,
        publicAppBaseUrl: () => "https://example.test/",
        publicRequestUrl: (token) => `https://example.test/?request=${token}`,
        publicRequestQrUrl: (token) => `https://example.test/?qr=${token}`,
      });
      window.qrTestHelpers = helpers;
      document.querySelector("#qr-test").innerHTML = helpers.publicRequestLinkManager();
    });

    const print = page.getByRole("link", { name: "Print QR Code", exact: true });
    const replace = page.getByRole("button", { name: "Regenerate/Replace QR Code", exact: true });
    await expect(print).toHaveAttribute("href", "https://example.test/?qr=active");
    await expect(page.getByRole("link", { name: "See Request Form", exact: true })).toHaveAttribute("href", "https://example.test/?request=active");
    await expect(page.locator("[data-copy-public-request-link], [data-disable-public-request-link]")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Test Form", exact: true })).toHaveCount(0);
    await expect(page.locator(".public-request-link-card").first().locator(".button-row > a, .button-row > button")).toHaveCount(3);
    await expect(replace).toHaveCount(2);

    async function checkColor(control, variable, textVariable = "--on-light-highlight") {
      await expect(control).toBeVisible();
      const colors = await control.evaluate((element, { token, textToken }) => {
        const style = getComputedStyle(element);
        const probe = document.createElement("span");
        element.append(probe);
        probe.style.color = `var(${token})`;
        const expectedBackground = getComputedStyle(probe).color;
        probe.style.color = `var(${textToken})`;
        const expectedText = getComputedStyle(probe).color;
        probe.remove();
        return { background: style.backgroundColor, text: style.color, expectedBackground, expectedText };
      }, { token: variable, textToken: textVariable });
      expect(colors.background).toBe(colors.expectedBackground);
      expect(colors.text).toBe(colors.expectedText);
      await control.hover();
      await expect(control).toHaveCSS("color", colors.expectedText);
      await page.mouse.move(0, 0);
    }

    await checkColor(print, "--green");
    for (const button of await replace.all()) await checkColor(button, "--qr-replace-bg", "--qr-replace-ink");
    const layout = await page.locator(".qr-print-button, .qr-replace-button").evaluateAll((buttons) => buttons.map((button) => {
      const bounds = button.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(button);
      return { height: bounds.height, fits: [...range.getClientRects()].every((r) => r.left >= bounds.left && r.right <= bounds.right && r.top >= bounds.top && r.bottom <= bounds.bottom) };
    }));
    for (const button of layout) {
      expect(button.height).toBeGreaterThanOrEqual(44);
      expect(button.fits).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`qr-actions-${width}.png`), fullPage: true });

    await page.evaluate(() => {
      document.body.classList.add("public-qr-mode");
      document.querySelector("#qr-test").innerHTML = window.qrTestHelpers.publicRequestQrPage({ location_name: "Active facility", company_name: "QA" }, "https://example.test/?request=active");
    });
    await checkColor(page.getByRole("button", { name: "Print QR Code", exact: true }), "--green");
    await expect(page.getByRole("link", { name: "See Request Form", exact: true })).toHaveAttribute("href", "https://example.test/?request=active");
  });
}

async function mountWarning(page) {
  await page.setContent('<p id="public-request-link-error"></p><button data-regenerate-public-request-link="link-1">Regenerate/Replace QR Code</button>');
  await page.addStyleTag({ path: path.join(root, "styles.css") });
  for (const file of ["src/workflows/publicRequestLinkWorkflow.js", "src/utils/workspacePublicRequestLinkAdminEvents.js"]) {
    await page.addScriptTag({ path: path.join(root, file) });
  }
  await page.evaluate(() => {
    const state = window.qrWarningState = {
      tokens: 0, writes: [], notices: [], filters: [], renders: 0,
      company: "company-1", scope: "user-1:company-1:settings", admin: true, defer: false, error: null,
    };
    const query = {
      update(patch) { window.qrWarningState.writes.push(patch); return this; },
      eq(column, value) { window.qrWarningState.filters.push([column, value]); return this; },
      async select() {
        if (state.defer) await new Promise((resolve) => { window.finishQrWrite = resolve; });
        return { data: [{ id: "link-1" }], error: state.error };
      },
    };
    const workflow = window.MaintainOpsPublicRequestLinkWorkflow.createPublicRequestLinkWorkflow({
      documentRef: document, windowRef: window,
      canAdministerPublicRequestLinks: () => state.admin,
      getActiveCompanyId: () => state.company,
      getScope: () => state.scope,
      getPublicRequestLinks: () => [{ id: "link-1", location_id: "loc-1" }],
      getLocations: () => [{ id: "loc-1", name: 'QA <b>Salem</b> & Warehouse' }],
      generatePublicRequestToken: () => { window.qrWarningState.tokens += 1; return "replacement-token"; },
      supabaseClient: () => ({ from: () => query }),
      withOperationTimeout: (result) => result,
      showNotice: (message) => window.qrWarningState.notices.push(message),
      render: async () => { state.renders += 1; },
    });
    window.qrWorkflow = workflow;
    window.MaintainOpsWorkspacePublicRequestLinkAdminEvents.bindWorkspacePublicRequestLinkAdminEvents({
      documentRef: document,
      regeneratePublicRequestLink: workflow.regeneratePublicRequestLink,
    });
  });
}

for (const width of [320, 390, 1440]) {
  test(`red replacement warning is readable and safely cancellable at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 740 });
    await mountWarning(page);
    const button = page.getByRole("button", { name: "Regenerate/Replace QR Code", exact: true });
    await button.focus();
    await button.click();
    const dialog = page.getByRole("alertdialog", { name: "WARNING" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Cancel", exact: true })).toBeFocused();
    await expect(dialog.locator(".qr-warning-symbol")).toHaveCount(2);
    await expect(dialog.locator(".qr-warning-title")).toHaveCSS("color", "rgb(255, 146, 153)");
    await expect(dialog.locator(".qr-warning-impact")).toHaveCSS("color", "rgb(255, 146, 153)");
    await expect(dialog.locator(".qr-warning-facility")).toHaveText('Location: QA <b>Salem</b> & Warehouse');
    await expect(dialog.locator(".qr-warning-facility b")).toHaveCount(0);
    await expect(dialog).toContainText("stop working immediately");
    await expect(dialog).toContainText("replace EVERY posted copy");
    await expect(dialog).toContainText("Existing requests are not deleted");
    await expect(dialog).toContainText("Other locations' QR codes are not affected");
    await expect(dialog).toContainText("Select Cancel, then Print QR Code");
    const layout = await dialog.evaluate((element) => {
      const box = element.getBoundingClientRect();
      return { fits: box.left >= 0 && box.right <= innerWidth && box.top >= 0 && box.bottom <= innerHeight, overflow: element.scrollWidth > element.clientWidth };
    });
    expect(layout).toEqual({ fits: true, overflow: false });
    await page.screenshot({ path: testInfo.outputPath(`qr-warning-${width}.png`), fullPage: true });
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(button).toBeFocused();
    await button.click();
    await dialog.getByRole("button", { name: "Cancel", exact: true }).click();
    await expect(dialog).toHaveCount(0);
    await button.click();
    await page.keyboard.press("Enter");
    await expect(dialog).toHaveCount(0);
    await button.click();
    await page.mouse.click(2, 2);
    await expect(dialog).toHaveCount(0);
    const state = await page.evaluate(() => window.qrWarningState);
    expect(state.tokens).toBe(0);
    expect(state.writes).toEqual([]);
    expect(state.notices).toEqual([]);
  });
}

test("replacement requires explicit confirmation and ignores duplicate clicks", async ({ page }) => {
  await mountWarning(page);
  const button = page.getByRole("button", { name: "Regenerate/Replace QR Code", exact: true });
  await button.click();
  await page.evaluate(() => { window.qrWorkflow.regeneratePublicRequestLink("link-1"); });
  await expect(page.getByRole("alertdialog")).toHaveCount(1);
  expect(await page.evaluate(() => window.qrWarningState.tokens)).toBe(0);
  await page.evaluate(() => { window.qrWarningState.defer = true; });
  await page.getByRole("button", { name: "Replace QR Code", exact: true }).click();
  await expect(button).toBeDisabled();
  await page.evaluate(() => { window.qrWorkflow.regeneratePublicRequestLink("link-1"); window.finishQrWrite(); });
  await expect.poll(() => page.evaluate(() => window.qrWarningState.notices)).toEqual(["Request QR regenerated."]);
  await expect(button).toBeEnabled();
  const result = await page.evaluate(() => window.qrWarningState);
  expect(result.tokens).toBe(1);
  expect(result.writes).toHaveLength(1);
  expect(result.writes[0]).toMatchObject({ token: "replacement-token", is_active: true });
  expect(result.filters).toEqual([["id", "link-1"], ["company_id", "company-1"]]);
});

test("short mobile screens can scroll the warning and reach Cancel", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 320, height: 480 });
  await mountWarning(page);
  await page.getByRole("button", { name: "Regenerate/Replace QR Code", exact: true }).click();
  const dialog = page.getByRole("alertdialog");
  expect(await dialog.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);
  await dialog.evaluate((element) => { element.scrollTop = element.scrollHeight; });
  const cancel = dialog.getByRole("button", { name: "Cancel", exact: true });
  await expect(cancel).toBeInViewport();
  await expect(dialog.getByRole("button", { name: "Replace QR Code", exact: true })).toBeInViewport();
  await page.screenshot({ path: testInfo.outputPath("qr-warning-short-mobile.png") });
  await cancel.click();
  await expect(dialog).toHaveCount(0);
  expect(await page.evaluate(() => window.qrWarningState.writes)).toEqual([]);
});

for (const change of ["company", "scope", "admin"]) {
  test(`replacement is blocked when ${change} changes during confirmation`, async ({ page }) => {
    await mountWarning(page);
    await page.getByRole("button", { name: "Regenerate/Replace QR Code", exact: true }).click();
    await page.evaluate((key) => { window.qrWarningState[key] = key === "admin" ? false : "changed"; }, change);
    await page.getByRole("button", { name: "Replace QR Code", exact: true }).click();
    const state = await page.evaluate(() => window.qrWarningState);
    expect(state.tokens).toBe(0);
    expect(state.writes).toEqual([]);
    expect(state.notices).toEqual(["Your workspace or access changed. Reopen the QR code before replacing it."]);
  });
}

test("replacement failures are visible and allow a new deliberate attempt", async ({ page }) => {
  await mountWarning(page);
  const button = page.getByRole("button", { name: "Regenerate/Replace QR Code", exact: true });
  await page.evaluate(() => {
    window.originalShowModal = HTMLDialogElement.prototype.showModal;
    HTMLDialogElement.prototype.showModal = () => { throw new Error("Unavailable"); };
  });
  await button.click();
  await expect(page.getByRole("alertdialog")).toHaveCount(0);
  expect(await page.evaluate(() => window.qrWarningState.tokens)).toBe(0);
  expect(await page.evaluate(() => window.qrWarningState.notices)).toEqual(["Could not open the QR replacement warning. No changes were made."]);
  await page.evaluate(() => {
    HTMLDialogElement.prototype.showModal = window.originalShowModal;
    window.qrWarningState.error = { message: "Connection failed" };
  });
  await button.click();
  await page.getByRole("button", { name: "Replace QR Code", exact: true }).click();
  await expect(page.locator("#public-request-link-error")).toHaveText("Connection failed");
  await expect(button).toBeEnabled();
  await button.click();
  await expect(page.getByRole("alertdialog")).toBeVisible();
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  expect(await page.evaluate(() => window.qrWarningState.tokens)).toBe(1);
});

test("completed writes do not refresh a different workspace", async ({ page }) => {
  await mountWarning(page);
  await page.evaluate(() => { window.qrWarningState.defer = true; });
  await page.getByRole("button", { name: "Regenerate/Replace QR Code", exact: true }).click();
  await page.getByRole("button", { name: "Replace QR Code", exact: true }).click();
  await page.evaluate(() => { window.qrWarningState.scope = "new-user:company-1:settings"; window.finishQrWrite(); });
  await expect(page.getByRole("button", { name: "Regenerate/Replace QR Code", exact: true })).toBeEnabled();
  const state = await page.evaluate(() => window.qrWarningState);
  expect(state.writes).toHaveLength(1);
  expect(state.notices).toEqual([]);
  expect(state.renders).toBe(0);
});
