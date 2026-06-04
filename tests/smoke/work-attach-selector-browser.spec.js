const { expect, test } = require("@playwright/test");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");

test("work order and quick fix equipment selectors ignore equipment board filters", async ({ page }) => {
  await page.setContent("<main id=\"root\"></main>");
  await page.addScriptTag({ path: path.join(root, "src/render/optionDisplay.js") });
  await page.addScriptTag({ path: path.join(root, "src/render/createWorkOrderDisplay.js") });
  await page.addScriptTag({ path: path.join(root, "src/render/quickFixDisplay.js") });

  await page.evaluate(() => {
    const assets = [
      { id: "asset-visible", name: "Visible Filtered Machine", location_id: "loc-1", status: "running" },
      { id: "asset-hidden", name: "Hidden By Equipment Filter Machine", location_id: "loc-1", status: "offline" },
      { id: "asset-other", name: "Other Location Machine", location_id: "loc-2", status: "running" },
    ];
    const escapeHtml = (value) => String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\"", "&quot;");
    const { renderAssetOptions } = window.MaintainOpsOptionDisplay.createOptionDisplayHelpers({
      escapeHtml,
      getLocations: () => [],
      getActiveLocationId: () => "loc-1",
      getAssets: () => assets,
      matchesActiveLocation: (asset) => asset.location_id === "loc-1",
      isAssetDescendantOf: () => false,
      parentAssetFor: () => null,
    });

    const createDisplay = window.MaintainOpsCreateWorkOrderDisplay.createCreateWorkOrderDisplayHelpers({
      STATUS_OPTIONS: ["open", "completed"],
      TYPE_OPTIONS: ["reactive", "request"],
      getParts: () => [],
      renderAssetOptions,
      statusLabel: (status) => status,
      renderAssignmentSelect: () => "",
      renderProcedureOptions: () => "",
      escapeHtml,
    });
    const quickFixDisplay = window.MaintainOpsQuickFixDisplay.createQuickFixDisplayHelpers({
      TYPE_OPTIONS: ["corrective", "request"],
      getQuickFixAssetId: () => "",
      getQuickFixRequestId: () => "",
      getMaintenanceRequests: () => [],
      getSession: () => ({ user: { id: "user-1" } }),
      getParts: () => [],
      renderAssetOptions,
      assetLocationRoutingMessage: () => "",
      renderAssignmentSelect: () => "",
      renderProcedureOptions: () => "",
      assetStatusLabel: (status) => status,
      escapeHtml,
    });

    document.querySelector("#root").innerHTML = `
      <section id="work-order">${createDisplay.renderCreateWorkOrder()}</section>
      <section id="quick-fix">${quickFixDisplay.renderQuickFixForm()}</section>
    `;
  });

  const workOrderOptions = page.locator("#create-work-order-form select[name='asset_id'] option");
  await expect(workOrderOptions.filter({ hasText: "Visible Filtered Machine" })).toHaveCount(1);
  await expect(workOrderOptions.filter({ hasText: "Hidden By Equipment Filter Machine" })).toHaveCount(1);
  await expect(workOrderOptions.filter({ hasText: "Other Location Machine" })).toHaveCount(0);

  const quickFixOptions = page.locator("#quick-fix-form select[name='asset_id'] option");
  await expect(quickFixOptions.filter({ hasText: "Visible Filtered Machine" })).toHaveCount(1);
  await expect(quickFixOptions.filter({ hasText: "Hidden By Equipment Filter Machine" })).toHaveCount(1);
  await expect(quickFixOptions.filter({ hasText: "Other Location Machine" })).toHaveCount(0);

  await page.locator("#create-work-order-form select[name='asset_id']").selectOption("asset-hidden");
  await page.locator("#quick-fix-form select[name='asset_id']").selectOption("asset-hidden");

  await expect(page.locator("#create-work-order-form select[name='asset_id']")).toHaveValue("asset-hidden");
  await expect(page.locator("#quick-fix-form select[name='asset_id']")).toHaveValue("asset-hidden");
});
