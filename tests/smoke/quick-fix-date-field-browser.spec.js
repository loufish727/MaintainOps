const { test, expect } = require("@playwright/test");

global.window = {};
const { createQuickFixDisplayHelpers } = require("../../src/render/quickFixDisplay.js");

test("Quick Fix complete-by date is browser editable", async ({ page }) => {
  const { renderQuickFixForm } = createQuickFixDisplayHelpers({
    TYPE_OPTIONS: ["corrective", "preventive", "request"],
    getQuickFixAssetId: () => "",
    getQuickFixRequestId: () => "",
    getMaintenanceRequests: () => [],
    getSession: () => ({ user: { id: "user-1" } }),
    getParts: () => [],
    renderAssetOptions: () => '<option value="asset-1">Press 1</option>',
    assetLocationRoutingMessage: () => "",
    escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
    renderAssignmentSelect: () => '<option value="user-1">Assign to me</option>',
    renderProcedureOptions: () => '<option value="">No checklist</option>',
    assetStatusLabel: (status) => status,
  });

  await page.setContent(renderQuickFixForm());
  const dueField = page.locator("#quick-fix-form input[name='due_at']");

  await expect(dueField).toBeVisible();
  await expect(dueField).toHaveAttribute("type", "text");
  await expect(dueField).toHaveAttribute("inputmode", "numeric");
  await dueField.fill("2026-06-14");

  await expect(dueField).toHaveValue("2026-06-14");
});
