const assert = require("node:assert/strict");

global.window = {};

const { createWorkQueueDisplayHelpers } = require("../../src/render/workQueueDisplay.js");

const helpers = createWorkQueueDisplayHelpers({
  statusLabel: (status) => status.replaceAll("_", " "),
  teamMemberName: (userId) => userId === "user-2" ? "Morgan Manager" : userId,
  getWorkOrderAssigneeFilter: () => "",
  getWorkOrderFilter: () => "all",
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
});

assert.equal(helpers.workQueuePanelTitle(), "All Work Orders");
assert.equal(helpers.workQueuePanelSubtitle(4), "4 shown");

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
  due_at: "2026-06-01",
  procedure_template_id: "proc-1",
};

const card = helpers.renderWorkOrderCard(workOrder);
assert.match(card, /work-card status-card status-open selected/);
assert.match(card, /Pump &lt;jam&gt;/);
assert.match(card, /Seal leak/);
assert.match(card, /Daily Check/);
assert.match(card, /data-id="wo-1"/);
assert.match(card, /data-assign-me="wo-1"/);
assert.match(card, /data-card-assign="wo-1"/);
assert.match(card, /data-quick-status="in_progress"/);
assert.match(card, /data-quick-status="blocked"/);
assert.doesNotMatch(card, /data-quick-status="open"/);

const assignmentField = helpers.renderWorkOrderAssignmentField(workOrder, "assign-target");
assert.match(assignmentField, /id="assign-target"/);
assert.match(assignmentField, /name="assigned_to"/);
assert.match(assignmentField, /Morgan Manager/);

console.log("work queue display smoke passed");
