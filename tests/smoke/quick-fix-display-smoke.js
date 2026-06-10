const assert = require("node:assert/strict");

global.window = {};

const { createQuickFixDisplayHelpers } = require("../../src/render/quickFixDisplay.js");

const { renderQuickFixForm } = createQuickFixDisplayHelpers({
  TYPE_OPTIONS: ["corrective", "preventive", "request"],
  getQuickFixAssetId: () => "asset-1",
  getQuickFixRequestId: () => "req-1",
  getMaintenanceRequests: () => [{ id: "req-1", title: "Guard loose", description: "Operator reported a loose guard.", asset_id: "asset-1" }],
  getSession: () => ({ user: { id: "user-1" } }),
  getParts: () => [{ id: "part-1", name: "Guard Bolt", quantity_on_hand: 6 }],
  renderAssetOptions: (selected) => `<option value="asset-1" ${selected === "asset-1" ? "selected" : ""}>Press 1</option>`,
  assetLocationRoutingMessage: () => "Selected equipment is in this location.",
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  renderAssignmentSelect: () => '<option value="user-1">Assign to me</option>',
  renderProcedureOptions: () => '<option value="proc-1">Lockout</option>',
  assetStatusLabel: (status) => status,
});

const html = renderQuickFixForm();

assert.match(html, /id="quick-fix-form"/);
assert.match(html, /Resolving request: Guard loose/);
assert.match(html, /name="title"/);
assert.match(html, /value="Guard loose"/);
assert.match(html, /name="description"/);
assert.match(html, /Operator reported a loose guard\./);
assert.match(html, /data-location-sensitive-asset/);
assert.match(html, /Selected equipment is in this location\./);
assert.match(html, /name="new_asset_name"/);
assert.match(html, /name="photo"/);
assert.match(html, /Optional image only/);
assert.match(html, /PDF quotes\/documents are attached from equipment or parts/);
assert.doesNotMatch(html, /capture="environment"/);
assert.match(html, /name="machine_down"/);
assert.match(html, /name="mark_completed"/);
assert.match(html, /name="safety_devices_checked"/);
assert.match(html, /name="assigned_to"/);
assert.match(html, /name="procedure_template_id"/);
assert.match(html, /name="asset_status"/);
assert.match(html, /name="part_id"/);
assert.match(html, /Guard Bolt \(6 on hand\)/);
assert.match(html, /name="follow_up_needed"/);
assert.match(html, /name="due_at" type="date"/);
assert.match(html, /id="quick-fix-error"/);
assert.doesNotMatch(html, /<option value="request" selected>request<\/option>/);

console.log("quick fix display smoke passed");
