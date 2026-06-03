const assert = require("node:assert/strict");

global.window = {};

const { createCreateWorkOrderDisplayHelpers } = require("../../src/render/createWorkOrderDisplay.js");

const { renderCreateWorkOrder } = createCreateWorkOrderDisplayHelpers({
  STATUS_OPTIONS: ["open", "in_progress", "blocked", "completed"],
  TYPE_OPTIONS: ["reactive", "preventive", "request"],
  getParts: () => [{ id: "part-1", name: "Hydraulic Hose", quantity_on_hand: 4 }],
  renderAssetOptions: () => '<option value="asset-1">Press 1</option>',
  statusLabel: (status) => status,
  renderAssignmentSelect: () => '<option value="user-1">Assign to me</option>',
  renderProcedureOptions: () => '<option value="proc-1">Lockout</option>',
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
});

const html = renderCreateWorkOrder();

assert.match(html, /id="create-work-order-form"/);
assert.match(html, /data-location-sensitive-asset/);
assert.match(html, /name="new_asset_name"/);
assert.match(html, /name="due_at"/);
assert.match(html, /name="due_at" type="date"/);
assert.match(html, /name="assigned_to"/);
assert.match(html, /name="procedure_template_id"/);
assert.match(html, /name="follow_up_needed"/);
assert.match(html, /name="safety_devices_checked"/);
assert.match(html, /name="part_id"/);
assert.match(html, /Hydraulic Hose \(4 on hand\)/);
assert.match(html, /name="photo"/);
assert.match(html, /Choose a saved photo or take a new one/);
assert.doesNotMatch(html, /capture="environment"/);
assert.match(html, /name="initial_comment"/);
assert.match(html, /id="create-work-order-error"/);
assert.match(html, /Create Work Order/);
assert.doesNotMatch(html, /<option value="request">request<\/option>/);

console.log("create work order display smoke passed");
