const assert = require("node:assert/strict");

global.window = {};

const { createCreateWorkOrderDisplayHelpers } = require("../../src/render/createWorkOrderDisplay.js");

const { renderCreateWorkOrder } = createCreateWorkOrderDisplayHelpers({
  STATUS_OPTIONS: ["open", "in_progress", "blocked", "completed"],
  TYPE_OPTIONS: ["corrective", "preventive", "fabrication"],
  getParts: () => [{ id: "part-1", name: "Hydraulic Hose", quantity_on_hand: 4 }],
  renderAssetOptions: () => '<option value="asset-1">Press 1</option>',
  statusLabel: (status) => status,
  workOrderTypeLabel: (type) => type[0].toUpperCase() + type.slice(1),
  renderAssignmentSelect: () => '<option value="user-1">Assign to me</option>',
  renderProcedureOptions: () => '<option value="proc-1">Lockout</option>',
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
});

const html = renderCreateWorkOrder();

assert.match(html, /id="create-work-order-form"/);
assert.match(html, /data-location-sensitive-asset/);
assert.match(html, /data-equipment-choice/);
assert.match(html, /value="existing" data-equipment-choice-mode checked/);
assert.match(html, /value="new" data-equipment-choice-mode/);
assert.match(html, /Create new equipment/);
assert.match(html, /name="new_asset_name"/);
assert.match(html, /name="new_asset_name"[^>]*disabled/);
assert.match(html, /name="due_at"/);
assert.match(html, /Complete by \/ due date/);
assert.match(html, /name="due_at" type="date" value="\d{4}-\d{2}-\d{2}"/);
assert.match(html, /Defaults to today\. Use the calendar to choose a different deadline\./);
assert.match(html, /data-date-picker-field/);
assert.match(html, /data-open-date-picker/);
assert.match(html, />Calendar<\/button>/);
assert.match(html, /name="assigned_to"/);
assert.match(html, /name="procedure_template_id"/);
assert.match(html, /name="follow_up_needed"/);
assert.match(html, /name="safety_devices_checked"/);
assert.match(html, /name="part_id"/);
assert.match(html, /Hydraulic Hose \(4 on hand\)/);
assert.match(html, /name="photo"/);
assert.match(html, /Optional image only/);
assert.match(html, /PDF quotes\/documents are attached from equipment or parts/);
assert.doesNotMatch(html, /capture="environment"/);
assert.match(html, /name="initial_comment"/);
assert.match(html, /id="create-work-order-error"/);
assert.match(html, /Create Work Order/);
assert.match(html, /<option value="corrective">Corrective<\/option>/);
assert.match(html, /<option value="preventive">Preventive<\/option>/);
assert.match(html, /<option value="fabrication">Fabrication<\/option>/);
assert.doesNotMatch(html, /reactive|inspection|value="request"/i);

console.log("create work order display smoke passed");
