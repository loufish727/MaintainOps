const { expect, test } = require("@playwright/test");
const path = require("node:path");
const manifest = require("../../src/bundles/manifest.json");

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
      TYPE_OPTIONS: ["corrective", "preventive", "fabrication"],
      getParts: () => [],
      renderAssetOptions,
      statusLabel: (status) => status,
      renderAssignmentSelect: () => "",
      renderProcedureOptions: () => "",
      escapeHtml,
    });
    const quickFixDisplay = window.MaintainOpsQuickFixDisplay.createQuickFixDisplayHelpers({
      TYPE_OPTIONS: ["corrective", "preventive", "fabrication"],
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

test("full work order details cannot clear a machine field the form does not own", async ({ page }) => {
  await page.setContent(`
    <select id="status-select"><option value="in_progress" selected>In progress</option></select>
    <p id="work-order-save-error"></p>
    <form id="edit-work-order-form">
      <input name="title" value="Edited work">
      <textarea name="description">Updated description</textarea>
      <input name="due_at" value="">
      <input name="priority" value="high">
      <input name="type" value="corrective">
      <input name="assigned_to" value="">
      <input name="procedure_template_id" value="">
      <input name="failure_cause" value="">
      <input name="resolution_summary" value="Fixed">
      <input name="actual_minutes" value="15">
      <button type="submit">Save Work Order</button>
    </form>
  `);
  await page.addScriptTag({ path: path.join(root, "src/bundles", manifest.runtime) });

  await page.evaluate(() => {
    window.detailSaveEvidence = { payload: null, safetyAssetId: null, routingChecks: 0 };
    const { updateWorkOrderDetails } = window.MaintainOpsWorkOrderDetailEditWorkflow.createWorkOrderDetailEditWorkflow({
      documentRef: document,
      FormDataCtor: FormData,
      consoleRef: console,
      getActiveWorkOrderId: () => "wo-1",
      getWorkOrders: () => [{ id: "wo-1", asset_id: "asset-1", status: "open", description: "Old" }],
      requiredText: (value) => String(value || "").trim(),
      descriptionWithAssignmentNote: (description) => description,
      workOrderDateValue: () => null,
      locationIdForAsset: (assetId) => `location-${assetId || "none"}`,
      assignedUserFromForm: () => null,
      procedureColumn: () => ({}),
      confirmAssetLocationRouting: () => {
        window.detailSaveEvidence.routingChecks += 1;
        return true;
      },
      assetRequiresSafety: (assetId) => {
        window.detailSaveEvidence.safetyAssetId = assetId;
        return false;
      },
      hasCompletedSafetyDeviceCheck: () => false,
      blocksProcedureCompletion: () => "",
      productionActionCompletionMessage: () => "",
      setWorkOrderActionWarning: () => {},
      applySafetyCheckPayload: (payload, checked) => { payload.safety_devices_checked = checked; },
      withOperationTimeout: async (operation) => operation,
      updateWorkOrderSafely: async (payload) => {
        window.detailSaveEvidence.payload = { ...payload };
        return { error: null };
      },
      friendlyWorkOrderSaveError: (error) => error.message,
      recordWorkOrderEvent: async () => null,
      describeWorkOrderChanges: () => "Changed fields.",
      showNotice: () => {},
      render: async () => {},
    });
    document.querySelector("#edit-work-order-form").addEventListener("submit", updateWorkOrderDetails);
  });

  await page.locator("#edit-work-order-form button[type='submit']").click();
  await expect.poll(() => page.evaluate(() => window.detailSaveEvidence.payload?.title)).toBe("Edited work");

  const evidence = await page.evaluate(() => window.detailSaveEvidence);
  expect(Object.hasOwn(evidence.payload, "asset_id")).toBe(false);
  expect(Object.hasOwn(evidence.payload, "location_id")).toBe(false);
  expect(evidence.safetyAssetId).toBe("asset-1");
  expect(evidence.routingChecks).toBe(0);
});
