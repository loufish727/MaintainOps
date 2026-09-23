const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
global.window = {};
require("../../src/render/workCommandDisplay.js");
const { renderWorkOrderCommandSummary } = window.MaintainOpsWorkCommandDisplay.createWorkCommandDisplayHelpers({
  escapeHtml: value => String(value ?? ""), statusLabel: value => value, assignmentLabel: () => "Unassigned",
  isVendorAssigned: () => false, hasCompletedSafetyDeviceCheck: order => order.safety_devices_checked === true,
  requiresSafetyDeviceCheck: order => order.safety_check_required === true,
  renderEmailHelperCommandCard: () => "", getMessageThreads: () => [], getPartsUsedByWorkOrder: () => ({}),
});
for (const [asset_id, safety_check_required, safety_devices_checked, label] of [
  ["asset", false, false, "Not Required"], ["asset", true, false, "Required"],
  ["asset", true, true, "Checked"], [null, false, false, "General"],
  [null, true, false, "Required"],
]) {
  const html = renderWorkOrderCommandSummary({ id: "work", status: "completed", asset_id, safety_check_required, safety_devices_checked });
  assert.ok(html.includes(`<strong>${label}</strong>`));
}
const app = fs.readFileSync(path.resolve(__dirname, "../../app.js"), "utf8");
assert.match(app, /createWorkCommandDisplayHelpers\(\{[^}]*requiresSafetyDeviceCheck/);
console.log("Work command safety display smoke: 5 states and app wiring passed");
