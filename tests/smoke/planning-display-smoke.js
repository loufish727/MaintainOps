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
  getPlanningGroupOpen: (_kind, fallback) => fallback,
  renderListPagination: (kind, totalCount, currentPage, totalPages) => `<nav data-page-kind="${kind}">${totalCount}:${currentPage}:${totalPages}</nav>`,
  statusLabel: (status) => status,
  renderRelationshipChips: () => "",
});
const { renderPlanningBoard, renderPlanningGroup, renderPlanningItem } = helpers;

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

const noDueHtml = renderPlanningItem({
  id: "work-no-due",
  kind: "no_due",
  priority: "high",
  status: "open",
  title: "Schedule bearing repair",
  assetName: "Roll Former",
  assignedTo: "Taylor Tech",
  createdAt: "2026-07-01T12:00:00Z",
});
assert.match(noDueHtml, /data-planning-due-form="work-no-due"/);
assert.match(noDueHtml, /name="planning_due_at"/);
assert.match(noDueHtml, /Set Due Date/);
assert.match(noDueHtml, /data-mini-work-order="work-no-due"/);

const readOnlyHelpers = createPlanningDisplayHelpers({
  escapeHtml: (value) => String(value ?? ""),
  LIST_ITEMS_PER_PAGE: 12,
  getPlanningPage: () => 1,
  renderListPagination: () => "",
  statusLabel: (status) => status,
  renderRelationshipChips: () => "",
  canEditOperationalRecords: () => false,
});
const readOnlyNoDueHtml = readOnlyHelpers.renderPlanningItem({
  id: "work-read-only",
  kind: "no_due",
  priority: "medium",
  status: "open",
  title: "Read only work",
  assetName: "Press",
  assignedTo: "Taylor Tech",
});
assert.match(readOnlyNoDueHtml, /View only/);
assert.doesNotMatch(readOnlyNoDueHtml, /data-planning-due-form/);

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
assert.match(groupHtml, /<details class="planning-group"/);
assert.doesNotMatch(groupHtml, /<section class="planning-group"/);

const boardHtml = renderPlanningBoard({
  noDue: [],
  followUp: [],
  overdue: [],
  today: [],
  soon: [],
  pm: [],
});
assert.match(boardHtml, /Needs action/);
assert.match(boardHtml, /No Due Date/);
assert.match(boardHtml, /Current schedule/);
assert.match(boardHtml, /Upcoming/);

console.log("planning display smoke passed");
