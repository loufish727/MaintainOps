const { expect, test } = require("@playwright/test");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");

test("equipment choice modes prevent existing and new equipment from being submitted together", async ({ page }) => {
  await page.setContent('<main id="root"></main>');
  await page.addScriptTag({ path: path.join(root, "src/render/createWorkOrderDisplay.js") });
  await page.addScriptTag({ path: path.join(root, "src/render/quickFixDisplay.js") });
  await page.addScriptTag({ path: path.join(root, "src/render/requestDisplay.js") });
  await page.addScriptTag({ path: path.join(root, "src/utils/workspaceEquipmentChoiceEvents.js") });

  await page.evaluate(() => {
    const renderAssetOptions = () => '<option value="asset-1">Press 1</option>';
    const escapeHtml = (value) => String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
    const workOrderDisplay = window.MaintainOpsCreateWorkOrderDisplay.createCreateWorkOrderDisplayHelpers({
      STATUS_OPTIONS: ["open"],
      TYPE_OPTIONS: ["reactive"],
      getParts: () => [],
      renderAssetOptions,
      statusLabel: (status) => status,
      renderAssignmentSelect: () => "",
      renderProcedureOptions: () => "",
      escapeHtml,
    });
    const quickFixDisplay = window.MaintainOpsQuickFixDisplay.createQuickFixDisplayHelpers({
      TYPE_OPTIONS: ["corrective"],
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
    const requestDisplay = window.MaintainOpsRequestDisplay.createRequestDisplayHelpers({
      segmentIcon: () => "",
      escapeHtml,
      renderAssetOptions,
      renderMaintenanceRequestPhoto: () => "",
      isConvertedRequest: () => false,
      canDeleteOperationalRecords: () => false,
      canEditOperationalRecords: () => true,
      getPendingDeleteRequestId: () => "",
      getProfilesByUserId: () => ({}),
    });

    document.querySelector("#root").innerHTML = `
      <section id="work-order-test">${workOrderDisplay.renderCreateWorkOrder()}</section>
      <section id="quick-fix-test">${quickFixDisplay.renderQuickFixForm()}</section>
      <section id="request-test">${requestDisplay.renderRequestFormContent()}</section>
    `;
    window.MaintainOpsWorkspaceEquipmentChoiceEvents.bindWorkspaceEquipmentChoiceEvents({
      documentRef: document,
      updateAssetLocationWarning: (select) => {
        const warning = select.closest("form")?.querySelector("[data-asset-location-warning]");
        if (warning) warning.textContent = select.value ? `Selected ${select.value}` : "";
      },
    });
  });

  const workOrder = page.locator("#create-work-order-form");
  const workExisting = workOrder.locator('[data-equipment-choice-existing]');
  const workNew = workOrder.locator('[data-equipment-choice-new]');
  await expect(workExisting).toBeEnabled();
  await expect(workNew).toBeDisabled();
  await workExisting.selectOption("asset-1");
  await expect(workOrder.locator("[data-asset-location-warning]")).toHaveText("Selected asset-1");
  await workOrder.locator('[data-equipment-choice-mode][value="new"]').check();
  await expect(workExisting).toBeDisabled();
  await expect(workExisting).toHaveValue("");
  await expect(workNew).toBeEnabled();
  await expect(workNew).toHaveAttribute("required", "");
  await expect(workOrder.locator("[data-asset-location-warning]")).toHaveText("");
  await workNew.fill("New Press");
  await workOrder.locator('[data-equipment-choice-mode][value="existing"]').check();
  await expect(workNew).toBeDisabled();
  await expect(workNew).toHaveValue("");
  await expect(workExisting).toBeEnabled();

  const quickFix = page.locator("#quick-fix-form");
  const quickExisting = quickFix.locator('[data-equipment-choice-existing]');
  const quickNew = quickFix.locator('[data-equipment-choice-new]');
  await quickExisting.selectOption("asset-1");
  await quickFix.locator('[data-equipment-choice-mode][value="new"]').check();
  await expect(quickExisting).toBeDisabled();
  await expect(quickExisting).toHaveValue("");
  await expect(quickNew).toBeEnabled();

  const request = page.locator("#request-form");
  const requestExisting = request.locator('[data-equipment-choice-existing]');
  const requestUnlisted = request.locator('[data-equipment-choice-new]');
  await expect(requestExisting).toBeDisabled();
  await expect(requestUnlisted).toBeEnabled();
  await requestUnlisted.fill("Saw area");
  await request.locator('[data-equipment-choice-mode][value="existing"]').check();
  await expect(requestUnlisted).toBeDisabled();
  await expect(requestUnlisted).toHaveValue("");
  await expect(requestExisting).toBeEnabled();
  await expect(requestExisting).toHaveAttribute("required", "");
  await requestExisting.selectOption("asset-1");
  await expect(requestExisting).toHaveValue("asset-1");
});
