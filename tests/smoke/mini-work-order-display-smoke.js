const assert = require("node:assert/strict");

global.window = {};

const { createMiniWorkOrderDisplayHelpers } = require("../../src/render/miniWorkOrderDisplay.js");

const helpers = createMiniWorkOrderDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
  statusLabel: (status) => status.replaceAll("_", " "),
  relationshipIcon: (type) => `<i>${type}</i>`,
  getPartsUsedByWorkOrder: () => ({ "wo-1": [{ id: "part-usage-1" }] }),
  getPhotosByWorkOrder: () => ({ "wo-1": [{ id: "photo-1" }] }),
  teamMemberName: (userId) => userId === "user-1" ? "QA Completer" : userId === "user-2" ? "Assigned Owner" : userId,
});

const completed = helpers.renderAssetMiniWorkOrder({
  id: "wo-1",
  title: "Guard fixed",
  status: "completed",
  completed_at: "2026-06-04T16:00:00Z",
  completed_by: "user-1",
  resolution_summary: "Guard adjusted",
});

assert.match(completed, /data-mini-work-order="wo-1"/);
assert.match(completed, /completed-history/);
assert.match(completed, /Completed .* by QA Completer/);
assert.match(completed, /Guard adjusted/);

const assignedFallback = helpers.renderAssetMiniWorkOrder({
  id: "wo-2",
  title: "Older completion",
  status: "completed",
  completed_at: "2026-06-04T16:00:00Z",
  assigned_to: "user-2",
});

assert.match(assignedFallback, /Completed .* - owner Assigned Owner/);
assert.doesNotMatch(assignedFallback, /by Assigned Owner/);

console.log("mini work order display smoke passed");
