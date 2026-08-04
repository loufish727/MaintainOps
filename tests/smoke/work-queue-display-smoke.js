const assert = require("node:assert/strict");

global.window = {};

const { createWorkQueueDisplayHelpers } = require("../../src/render/workQueueDisplay.js");

const helpers = createWorkQueueDisplayHelpers({
  statusLabel: (status) => status === "active" ? "Active" : status.replaceAll("_", " "),
  workOrderTypeLabel: (type) => type === "reactive" ? "Corrective" : type,
  teamMemberName: (userId) => userId === "user-2" ? "Morgan Manager" : userId,
  getWorkOrderAssigneeFilter: () => "",
  getWorkOrderFilter: () => "all",
  getWorkOrderTypeFilter: () => "all",
  getWorkOrderPriorityFilter: () => "all",
  getWorkSort: () => "newest",
  getWorkGroup: () => "none",
  getActiveStatusFilter: () => "active",
  getMyWorkFilter: () => "assigned",
  getActiveSection: () => "work",
  getDueState: () => ({ className: "overdue", label: "Overdue" }),
  getProcedureTemplates: () => [{ id: "proc-1", name: "Daily Check" }],
  getActiveWorkOrderId: () => "wo-1",
  getProfilesByUserId: () => ({
    "user-1": { full_name: "Taylor Tech" },
    "user-2": { full_name: "Morgan Manager" },
  }),
  getSession: () => ({ user: { id: "user-1" } }),
  STATUS_OPTIONS: ["open", "in_progress", "blocked", "completed"],
  TYPE_OPTIONS: ["corrective", "preventive", "fabrication"],
  OUTSIDE_VENDOR_VALUE: "__outside_vendor__",
  escapeHtml: (value) => String(value ?? "").replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
  cleanWorkOrderDescription: (value) => String(value || "").replace("Generated from public request:", "").trim(),
  relationshipIcon: (type) => `<i>${type}</i>`,
  segmentIcon: (type) => `<b>${type}</b>`,
  isVendorAssigned: (workOrder) => workOrder.assigned_to === "__outside_vendor__",
  assignmentLabel: (workOrder) => workOrder.assigned_to || "Unassigned",
  renderRelationshipChips: () => '<div class="relationship-chips"></div>',
  canAssignWorkOrderToMe: () => true,
  canManageTeam: () => true,
  renderProductionActionCard: (workOrder) => `<section data-test-production-action="${workOrder.id}"></section>`,
  hasOpenProductionAction: (workOrder) => workOrder.production_action_status === "open",
});

assert.equal(helpers.workQueuePanelTitle(), "Active Work Orders");
assert.equal(helpers.workQueuePanelSubtitle(4), "4 shown");

const toolbar = helpers.renderWorkOrderFilterToolbar([
  { userId: "user-1", name: "Taylor Tech" },
  { userId: "user-2", name: "Morgan Manager" },
]);
assert.match(toolbar, /Current view/);
assert.match(toolbar, /Status: Active/);
assert.match(toolbar, /Assignment: Any assignment/);
assert.match(toolbar, /data-work-status-filter/);
assert.match(toolbar, /data-work-assignment-filter/);
assert.match(toolbar, /data-work-assignee-filter/);
assert.match(toolbar, /data-work-type-filter/);
assert.match(toolbar, /data-work-priority-filter/);
assert.match(toolbar, /data-work-sort-filter/);
assert.match(toolbar, /data-work-group-filter/);
assert.match(toolbar, /Morgan Manager/);
assert.match(toolbar, /Highest priority/);
assert.match(toolbar, /Work type A-Z/);
assert.match(toolbar, /data-clear-work-filters type="button" disabled/);
assert.doesNotMatch(toolbar, /data-work-assignee-sort-filter/);

const workOrder = {
  id: "wo-1",
  priority: "high",
  type: "reactive",
  status: "open",
  title: "Pump <jam>",
  description: "Generated from public request: Seal leak",
  asset_id: "asset-1",
  assets: { name: "Pump A" },
  assigned_to: "user-2",
  created_at: "2026-05-01T12:00:00Z",
  due_at: "2026-06-01",
  procedure_template_id: "proc-1",
};

const card = helpers.renderWorkOrderCard(workOrder);
assert.match(card, /work-card status-card status-open selected/);
assert.match(card, /Pump &lt;jam&gt;/);
assert.match(card, /Seal leak/);
assert.match(card, /Daily Check/);
assert.match(card, /Created/);
assert.match(card, /Corrective/);
assert.doesNotMatch(card, />reactive</i);
assert.match(card, /data-id="wo-1"/);
assert.match(card, /data-assign-me="wo-1"/);
assert.match(card, /data-card-assign="wo-1"/);
assert.match(card, /data-test-production-action="wo-1"/);
assert.match(card, /data-quick-status="in_progress"/);
assert.match(card, /data-quick-status="blocked"/);
assert.match(card, /data-quick-status="completed"[^>]*>Complete<\/button>/);
assert.doesNotMatch(card, />All Completed<\/button>/);
assert.doesNotMatch(card, /data-quick-status="open"/);

const productionActionCard = helpers.renderWorkOrderCard({
  ...workOrder,
  production_action: "Clear line",
  production_action_status: "open",
});
assert.doesNotMatch(productionActionCard, /data-quick-status="completed"/);

const grouped = helpers.renderWorkOrderCollection([
  workOrder,
  { ...workOrder, id: "wo-2", title: "Unassigned press", assigned_to: null },
], { groupBy: "assignee" });
assert.match(grouped, /work-order-groups/);
assert.match(grouped, /Morgan Manager/);
assert.match(grouped, /Unassigned/);

const ungrouped = helpers.renderWorkOrderCollection([workOrder], { groupBy: "none" });
assert.match(ungrouped, /class="work-list" id="work-order-list"/);
assert.doesNotMatch(ungrouped, /work-order-group-heading/);

const assignmentField = helpers.renderWorkOrderAssignmentField(workOrder, "assign-target");
assert.match(assignmentField, /id="assign-target"/);
assert.match(assignmentField, /name="assigned_to"/);
assert.match(assignmentField, /Morgan Manager/);

const completedWorkOrder = {
  ...workOrder,
  id: "wo-complete",
  status: "completed",
  completed_at: "2026-06-02T12:00:00Z",
};
const completedCard = helpers.renderWorkOrderCard(completedWorkOrder);
assert.doesNotMatch(completedCard, /data-assign-me="wo-complete"/);
assert.doesNotMatch(completedCard, /data-card-assign="wo-complete"/);

const completedAssignmentField = helpers.renderWorkOrderAssignmentField(completedWorkOrder, "completed-owner");
assert.match(completedAssignmentField, /id="completed-owner"/);
assert.match(completedAssignmentField, /Completed by \/ assigned to/);
assert.match(completedAssignmentField, /disabled/);
assert.doesNotMatch(completedAssignmentField, /<select name="assigned_to"/);

console.log("work queue display smoke passed");
