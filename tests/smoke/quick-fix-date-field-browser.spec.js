const { test, expect } = require("@playwright/test");

global.window = {};
const { createQuickFixDisplayHelpers } = require("../../src/render/quickFixDisplay.js");
const { createCreateWorkOrderDisplayHelpers } = require("../../src/render/createWorkOrderDisplay.js");

test("Quick Fix complete-by date is browser editable", async ({ page }) => {
  const { renderQuickFixForm } = createQuickFixDisplayHelpers({
    TYPE_OPTIONS: ["corrective", "preventive", "fabrication"],
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
  await expect(dueField).toHaveAttribute("type", "date");
  await expect(dueField).toHaveValue(/\d{4}-\d{2}-\d{2}/);
  await expect(page.locator("#quick-fix-form [data-open-date-picker]")).toBeVisible();
  await dueField.fill("2026-06-14");

  await expect(dueField).toHaveValue("2026-06-14");
});

test("Create Work Order due date is browser editable", async ({ page }) => {
  const { renderCreateWorkOrder } = createCreateWorkOrderDisplayHelpers({
    STATUS_OPTIONS: ["open", "in_progress", "blocked", "completed"],
    TYPE_OPTIONS: ["corrective", "preventive", "fabrication"],
    getParts: () => [],
    renderAssetOptions: () => '<option value="asset-1">Press 1</option>',
    statusLabel: (status) => status,
    renderAssignmentSelect: () => '<option value="user-1">Assign to me</option>',
    renderProcedureOptions: () => '<option value="">No checklist</option>',
    escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  });

  await page.setContent(renderCreateWorkOrder());
  const dueField = page.locator("#create-work-order-form input[name='due_at']");

  await expect(dueField).toBeVisible();
  await expect(dueField).toHaveAttribute("type", "date");
  await expect(dueField).toHaveValue(/\d{4}-\d{2}-\d{2}/);
  await expect(page.locator("#create-work-order-form [data-open-date-picker]")).toBeVisible();
  await dueField.fill("2026-06-15");

  await expect(dueField).toHaveValue("2026-06-15");
});
