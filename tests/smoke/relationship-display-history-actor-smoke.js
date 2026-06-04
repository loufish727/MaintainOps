const assert = require("node:assert/strict");

global.window = {};

const { createRelationshipDisplayHelpers } = require("../../src/render/relationshipDisplay.js");

const helpers = createRelationshipDisplayHelpers({
  getProfilesByUserId: () => ({
    "user-1": { full_name: "QA User" },
    "user-2": { full_name: "Parts Tech" },
  }),
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
  photoMetaText: (photo) => new Date(photo.created_at).toLocaleString(),
  partUsageUnitCost: (row) => Number(row.unit_cost_at_use || row.unit_cost || 0),
  money: (value) => `$${Number(value).toFixed(2)}`,
  getProcedureTemplates: () => [],
  getPartsUsedByWorkOrder: () => ({}),
  getCommentsByWorkOrder: () => ({}),
  getPhotosByWorkOrder: () => ({}),
  getMessageThreads: () => [],
  checklistProgress: () => ({ done: 0, total: 0 }),
});

const partHistory = helpers.renderActivityItem({
  type: "part",
  created_at: "2026-06-04T12:00:00Z",
  created_by: "user-2",
  quantity_used: 3,
  unit_cost_at_use: 4,
  parts: { name: "Bearing" },
});
assert.match(partHistory, /Parts Tech/);
assert.match(partHistory, /Bearing - 3 used - \$12\.00/);

const photoHistory = helpers.renderActivityItem({
  type: "photo",
  created_at: "2026-06-04T12:00:00Z",
  uploaded_by: "user-1",
  file_name: "before.jpg",
});
assert.match(photoHistory, /QA User/);
assert.match(photoHistory, /before\.jpg/);

console.log("relationship display history actor smoke passed");
