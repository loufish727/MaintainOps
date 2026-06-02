const assert = require("node:assert/strict");

global.window = {};

require("../../src/render/planningDisplay.js");

const { createPlanningDisplayHelpers } = window.MaintainOpsPlanningDisplay;

const { renderPlanningItem } = createPlanningDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]),
  statusLabel: (status) => status,
  renderRelationshipChips: () => "",
});

const html = renderPlanningItem({
  id: "work-1",
  kind: "follow_up",
  title: "Inspect Thalmann",
  assetName: "Thalmann",
  completedAt: "2026-06-02",
  resolution: "Needs a second look",
});

assert.match(html, /data-follow-up-create/);
assert.match(html, /name="follow_up_days"/);
assert.match(html, /value="7"/);
assert.match(html, /data-create-follow-up="work-1"/);

console.log("planning display smoke passed");
