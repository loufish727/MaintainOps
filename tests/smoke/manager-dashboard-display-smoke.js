const assert = require("node:assert/strict");

global.window = {};
require("../../src/render/managerDashboardDisplay.js");

const { createManagerDashboardDisplayHelpers } = window.MaintainOpsManagerDashboardDisplay;

const helpers = createManagerDashboardDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char])),
  getWorkOrders: () => [
    { id: "wo-1", assigned_to: "tech-1", status: "open", created_at: "2026-06-01T12:00:00Z", location_id: "loc-1" },
    { id: "wo-2", assigned_to: "tech-1", status: "in_progress", created_at: "2026-06-02T12:00:00Z", due_at: "2026-06-03", location_id: "loc-1" },
    { id: "wo-3", assigned_to: "tech-2", status: "completed", completed_at: new Date().toISOString(), completed_by: "tech-2", location_id: "loc-1" },
    { id: "wo-4", assigned_to: null, status: "open", created_at: "2026-06-04T12:00:00Z", location_id: "loc-1" },
  ],
  getMaintenanceRequests: () => [
    { id: "req-1", status: "submitted", location_id: "loc-1" },
    { id: "req-2", status: "converted", converted_work_order_id: "wo-3", location_id: "loc-1" },
  ],
  getCompanyMembers: () => [
    { user_id: "tech-1", role: "technician" },
    { user_id: "tech-2", role: "manager" },
  ],
  getWorkOrderDashboardCounts: () => ({ activeWork: 3, overdue: 1, completedWeek: 1 }),
  getRequestDashboardCounts: () => ({ active: 1, converted: 1 }),
  getManagerDashboardUserId: () => "tech-1",
  getManagerDashboardMetric: () => "overdue",
  matchesActiveLocation: (row) => row.location_id === "loc-1",
  isConvertedRequest: (request) => request.status === "converted" || Boolean(request.converted_work_order_id),
  getDueState: (workOrder) => workOrder.id === "wo-2" ? { className: "overdue" } : { className: "" },
  teamMemberName: (userId) => userId === "tech-1" ? "Taylor Tech" : "QA Manager",
  roleLabel: (role) => role === "manager" ? "Manager" : "Technician",
  normalizeRole: (role) => role,
  statusLabel: (status) => status === "in_progress" ? "In Progress" : status,
});

const cards = helpers.managerSummaryCards();
assert.equal(cards.find(([label]) => label === "Open Work")[1], 3);
assert.equal(cards.find(([label]) => label === "New Requests")[1], 1);
assert.equal(cards.find(([label]) => label === "Converted Requests")[1], 1);

const rows = helpers.technicianRows();
assert.equal(rows[0].name, "Taylor Tech");
assert.equal(rows[0].open, 2);
assert.equal(rows[0].inProgress, 1);
assert.equal(rows[0].overdue, 1);

const html = helpers.renderManagerDashboard();
assert.match(html, /Manager Beta Dashboard/);
assert.match(html, /Technician Workload/);
assert.match(html, /Taylor Tech/);
assert.match(html, /Phase 1 uses current loaded workspace data/);
assert.match(html, /data-manager-drill-user="tech-1"/);
assert.match(html, /data-manager-drill-metric="overdue"/);
assert.match(html, /data-manager-drill-in/);
assert.match(html, /Overdue . 1 loaded item/);
assert.match(html, /data-mini-work-order="wo-2"/);

console.log("manager dashboard display smoke passed");
