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

test("replacement warning blocks writes until confirmed through the QR button", async ({ page }) => {
  await page.setContent('<p id="public-request-link-error"></p><button data-regenerate-public-request-link="link-1">Regenerate/Replace QR Code</button>');
  for (const file of ["src/workflows/publicRequestLinkWorkflow.js", "src/utils/workspacePublicRequestLinkAdminEvents.js"]) {
    await page.addScriptTag({ path: path.join(root, file) });
  }
  await page.evaluate(() => {
    window.qrWarningState = { tokens: 0, writes: [], notices: [], filters: [] };
    const query = {
      update(patch) { window.qrWarningState.writes.push(patch); return this; },
      eq(column, value) { window.qrWarningState.filters.push([column, value]); return this; },
      async select() { return { data: [{ id: "link-1" }], error: null }; },
    };
    const workflow = window.MaintainOpsPublicRequestLinkWorkflow.createPublicRequestLinkWorkflow({
      documentRef: document, windowRef: window,
      canAdministerPublicRequestLinks: () => true,
      getActiveCompanyId: () => "company-1",
      generatePublicRequestToken: () => { window.qrWarningState.tokens += 1; return "replacement-token"; },
      supabaseClient: () => ({ from: () => query }),
      withOperationTimeout: (result) => result,
      showNotice: (message) => window.qrWarningState.notices.push(message),
      render: async () => {},
    });
    window.MaintainOpsWorkspacePublicRequestLinkAdminEvents.bindWorkspacePublicRequestLinkAdminEvents({
      documentRef: document,
      regeneratePublicRequestLink: workflow.regeneratePublicRequestLink,
    });
  });
  const button = page.getByRole("button", { name: "Regenerate/Replace QR Code", exact: true });
  const cancelledDialog = page.waitForEvent("dialog");
  const cancelledClick = button.click();
  const warning = await cancelledDialog;
  expect(warning.type()).toBe("confirm");
  expect(warning.message()).toContain("WARNING: THIS WILL BREAK THE CURRENT QR CODE FOR THIS LOCATION.");
  expect(warning.message()).toContain("replace EVERY posted copy");
  expect(warning.message()).toContain("Select Cancel, then Print QR Code");
  await warning.dismiss();
  await cancelledClick;
  expect(await page.evaluate(() => window.qrWarningState)).toEqual({ tokens: 0, writes: [], notices: [], filters: [] });

  const confirmedDialog = page.waitForEvent("dialog");
  const confirmedClick = button.click();
  await (await confirmedDialog).accept();
  await confirmedClick;
  await expect.poll(() => page.evaluate(() => window.qrWarningState.notices)).toEqual(["Request QR regenerated."]);
  const result = await page.evaluate(() => window.qrWarningState);
  expect(result.tokens).toBe(1);
  expect(result.writes).toHaveLength(1);
  expect(result.writes[0]).toMatchObject({ token: "replacement-token", is_active: true });
  expect(result.filters).toEqual([["id", "link-1"], ["company_id", "company-1"]]);
});
