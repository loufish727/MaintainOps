const path = require("node:path");
const { test, expect } = require("@playwright/test");

global.window = {};

const { createFinancialDisplayHelpers } = require("../../src/render/financialDisplay.js");

test("archived equipment financial details remain editable and save as archived", async ({ page }) => {
  const financialRows = [{
    id: "finance-archived",
    company_id: "company-1",
    asset_id: null,
    archived_asset_id: "asset-deleted",
    archived_asset_name: "Sold Press Brake",
    archived_asset_type: "machine",
    archived_location_id: "loc-1",
    archived_location: "Bay 2",
    asset_tag: "FA-SOLD",
    ownership_status: "disposed",
    needs_review: false,
    operational_deleted_at: "2026-07-01T12:00:00Z",
  }];
  const helpers = createFinancialDisplayHelpers({
    escapeHtml: (value) => String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    assetTypeLabel: () => "Primary",
    parentAssetFor: () => null,
    getAssets: () => [],
    getAssetDocumentsByAssetId: () => ({}),
    getAssetFinancialsByAssetId: () => ({}),
    getAssetFinancials: () => financialRows,
    getAssetFinancialsReady: () => true,
    getProfilesByUserId: () => ({}),
    getLocations: () => [{ id: "loc-1", name: "Salem, OR" }],
    canEditFinancialRecords: () => true,
  });

  await page.setContent(helpers.renderFinancialDetail("financial:finance-archived"));
  await page.addScriptTag({ path: path.resolve(__dirname, "../../src/workflows/assetFinancialWorkflow.js") });
  await page.evaluate(() => {
    const constraints = [];
    const updateQuery = {
      eq(column, value) {
        constraints.push(["eq", column, value]);
        return this;
      },
      is(column, value) {
        constraints.push(["is", column, value]);
        return this;
      },
      select() {
        return this;
      },
      single() {
        document.body.dataset.savedConstraints = JSON.stringify(constraints);
        return Promise.resolve({ data: { id: "finance-archived" }, error: null });
      },
    };
    const workflow = window.MaintainOpsAssetFinancialWorkflow.createAssetFinancialWorkflow({
      documentRef: document,
      FormDataCtor: FormData,
      CSSRef: CSS,
      supabaseClient: () => ({
        from: () => ({
          update(payload) {
            document.body.dataset.savedPayload = JSON.stringify(payload);
            return updateQuery;
          },
        }),
      }),
      withOperationTimeout: async (promise) => promise,
      canEditFinancialRecords: () => true,
      loadAssetFinancials: async () => {},
      renderWorkspace: () => {},
      showNotice: (message) => {
        document.body.dataset.savedNotice = message;
      },
    });
    workflow.bindFinancialEvents();
  });

  const assetTag = page.getByLabel("Asset tag / fixed asset number");
  const saveButton = page.getByRole("button", { name: "Save Financial Info" });
  await expect(assetTag).toHaveValue("FA-SOLD");
  await expect(page.getByText("Operational equipment deleted", { exact: false })).toBeVisible();
  await assetTag.fill("FA-SOLD-UPDATED");
  await saveButton.click();

  await expect(page.locator("body")).toHaveAttribute("data-saved-notice", "Financial info saved.");
  const saved = await page.evaluate(() => ({
    payload: JSON.parse(document.body.dataset.savedPayload),
    constraints: JSON.parse(document.body.dataset.savedConstraints),
  }));
  expect(saved.payload.asset_tag).toBe("FA-SOLD-UPDATED");
  expect(saved.payload).not.toHaveProperty("asset_id");
  expect(saved.payload).not.toHaveProperty("company_id");
  expect(saved.constraints).toEqual([
    ["eq", "id", "finance-archived"],
    ["is", "asset_id", null],
  ]);
});
