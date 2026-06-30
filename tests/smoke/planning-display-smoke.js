const assert = require("node:assert/strict");

global.window = {};

require("../../src/render/planningDisplay.js");

const { createPlanningDisplayHelpers } = window.MaintainOpsPlanningDisplay;

const helpers = createPlanningDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]),
  LIST_ITEMS_PER_PAGE: 12,
  getPlanningPage: () => 1,
  renderListPagination: (kind, totalCount, currentPage, totalPages) => `<nav data-page-kind="${kind}">${totalCount}:${currentPage}:${totalPages}</nav>`,
  statusLabel: (status) => status,
  renderRelationshipChips: () => "",
});
const { renderPlanningGroup, renderPlanningItem } = helpers;

const html = renderPlanningItem({
  id: "work-1",
  kind: "follow_up",
  title: "Inspect Thalmann",
  assetName: "Thalmann",
  completedAt: "2026-06-02",
  resolution: "Needs a second look",
});

assert.match(html, /data-follow-up-create/);
assert.match(html, /data-mini-work-order="work-1"/);
assert.match(html, /Open Original/);
assert.match(html, /name="follow_up_days"/);
assert.match(html, /value="7"/);
assert.match(html, /data-create-follow-up="work-1"/);

const manyItems = Array.from({ length: 13 }, (_, index) => ({
  id: `work-${index + 1}`,
  kind: "work",
  priority: "medium",
  status: "open",
  title: `Planning ${index + 1}`,
  assetName: "Line",
  dueAt: "2026-07-01",
  workOrder: {},
}));
const groupHtml = renderPlanningGroup("Follow-up Needed", manyItems, "blocked", "follow-up");
assert.match(groupHtml, /Planning 12/);
assert.doesNotMatch(groupHtml, /Planning 13/);
assert.match(groupHtml, /data-page-kind="planning-follow-up">13:1:2/);

console.log("planning display smoke passed");
