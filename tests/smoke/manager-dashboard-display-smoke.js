const assert = require("node:assert/strict");

global.window = {};
require("../../src/render/managerDashboardDisplay.js");

const { createManagerDashboardDisplayHelpers } = window.MaintainOpsManagerDashboardDisplay;

const helpers = createManagerDashboardDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char])),
  getAssets: () => [
    { id: "asset-1", name: "Forklift 4", status: "offline", location_id: "loc-1" },
    { id: "asset-2", name: "ASC Line", status: "degraded", location_id: "loc-1" },
    { id: "asset-3", name: "Panel Saw", status: "watch", location_id: "loc-1" },
  ],
  getPreventiveSchedules: () => [
    { id: "pm-1", name: "Forklift inspection", next_due_at: "2026-06-01", location_id: "loc-1" },
    { id: "pm-2", name: "ASC weekly PM", next_due_at: new Date().toISOString().slice(0, 10), location_id: "loc-1" },
  ],
  getWorkOrders: () => [
    { id: "wo-1", assigned_to: "tech-1", status: "open", priority: "critical", follow_up_needed: true, created_at: "2026-05-20T12:00:00Z", location_id: "loc-1" },
    { id: "wo-2", assigned_to: "tech-1", status: "in_progress", priority: "medium", created_at: new Date().toISOString(), due_at: "2026-06-03", location_id: "loc-1" },
    { id: "wo-4", assigned_to: null, status: "open", created_at: "2026-06-04T12:00:00Z", location_id: "loc-1" },
  ],
  getManagerCompletedWorkOrders: () => [
    { id: "wo-3", assigned_to: "tech-2", status: "completed", completed_at: new Date().toISOString(), completed_by: "tech-2", location_id: "loc-1" },
  ],
  getManagerCompletedWorkReady: () => true,
  getMaintenanceRequests: () => [
    { id: "req-1", status: "submitted", created_at: "2026-05-30T12:00:00Z", location_id: "loc-1" },
    { id: "req-2", status: "converted", converted_work_order_id: "wo-3", converted_by: "tech-1", title: "Converted repair", equipment_note: "Line 2", requested_by_name: "Lee", location_id: "loc-1" },
  ],
  getCompanyMembers: () => [
    { user_id: "tech-1", role: "technician" },
    { user_id: "tech-2", role: "manager" },
  ],
  getWorkOrderDashboardCounts: () => ({ activeWork: 3, overdue: 1, completedWeek: 1, completedMonth: 1 }),
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
assert.equal(cards.find(([label]) => label === "Stale Requests")[1], 1);
assert.match(String(cards.find(([label]) => label === "7d Completion Rate")[1]), /%/);
assert.equal(cards.find(([label]) => label === "Completed Week")[1], 1);
assert.equal(cards.find(([label]) => label === "Completed Month")[1], 1);
assert.equal(cards.find(([label]) => label === "Critical Open")[1], 1);
assert.equal(cards.find(([label]) => label === "Stale 7d+")[1], 1);
assert.equal(cards.find(([label]) => label === "Follow-up Needed")[1], 1);

const rows = helpers.technicianRows();
assert.equal(rows[0].name, "Taylor Tech");
assert.equal(rows[0].open, 2);
assert.equal(rows[0].inProgress, 1);
assert.equal(rows[0].overdue, 1);
assert.equal(rows[0].critical, 1);
assert.equal(rows[0].followUp, 1);
assert.equal(rows[0].convertedRequests, 1);
assert.equal(rows[0].overloadLevel, "high");
assert.equal(helpers.metricWorkOrders("tech-1", "critical").length, 1);
assert.equal(helpers.metricWorkOrders("tech-1", "follow_up").length, 1);
assert.equal(helpers.metricRequests("tech-1", "converted_requests").length, 1);
assert.equal(helpers.managerCompletionRate() > 0, true);
assert.equal(helpers.managerAttentionItems()[0].count >= 1, true);
assert.equal(helpers.equipmentHealthSummary().down.length, 1);
assert.equal(helpers.equipmentHealthSummary().degraded.length, 1);
assert.equal(helpers.preventiveSummary().overdue.length, 1);
assert.equal(helpers.requestFunnel().converted, 1);
assert.equal(helpers.workAgeBuckets().old >= 1, true);

const html = helpers.renderManagerDashboard();
assert.match(html, /Manager Beta Dashboard/);
assert.match(html, /Technician Workload/);
assert.match(html, /Taylor Tech/);
assert.match(html, /Completed metrics include recent manager history/);
assert.match(html, /Manager Trends/);
assert.match(html, /Manager Report/);
assert.match(html, /Operations Intelligence/);
assert.match(html, /Equipment Risk/);
assert.match(html, /PM Risk/);
assert.match(html, /Request Flow/);
assert.match(html, /Aging Load/);
assert.match(html, /Forklift 4/);
assert.match(html, /ASC Line/);
assert.match(html, /Forklift inspection/);
assert.match(html, /data-manager-drill-user="tech-1"/);
assert.match(html, /data-manager-drill-metric="overdue"/);
assert.match(html, /data-manager-drill-in/);
assert.match(html, /Overdue . 1 loaded item/);
assert.match(html, /data-mini-work-order="wo-2"/);
assert.match(html, /Manager Attention/);
assert.match(html, /data-manager-drill-metric="summary_critical"/);
assert.match(html, /data-manager-drill-metric="critical"/);
assert.match(html, /data-manager-drill-metric="follow_up"/);
assert.match(html, /data-manager-drill-metric="converted_requests"/);
assert.match(html, /<span>Converted<\/span><strong>1<\/strong>/);
assert.match(html, /workload-high/);
assert.match(html, /Needs manager review/);
assert.match(html, /critical/);

const summaryHelpers = createManagerDashboardDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char])),
  getAssets: () => [],
  getPreventiveSchedules: () => [],
  getWorkOrders: () => [
    { id: "wo-5", assigned_to: "", status: "open", title: "Unassigned repair", created_at: "2026-06-05T12:00:00Z", location_id: "loc-1" },
  ],
  getManagerCompletedWorkOrders: () => [],
  getManagerCompletedWorkReady: () => true,
  getMaintenanceRequests: () => [
    { id: "req-3", title: "Mouse request", status: "submitted", priority: "critical", equipment_note: "Salem office", requested_by_name: "Louie", created_at: "2026-06-05T12:00:00Z", location_id: "loc-1" },
  ],
  getCompanyMembers: () => [],
  getWorkOrderDashboardCounts: () => null,
  getRequestDashboardCounts: () => null,
  getManagerDashboardUserId: () => "__summary__",
  getManagerDashboardMetric: () => "summary_requests",
  matchesActiveLocation: (row) => row.location_id === "loc-1",
  isConvertedRequest: (request) => request.status === "converted" || Boolean(request.converted_work_order_id),
  getDueState: () => ({ className: "" }),
  teamMemberName: () => "Summary",
  roleLabel: (role) => role,
  normalizeRole: (role) => role,
  statusLabel: (status) => status,
});

const summaryHtml = summaryHelpers.renderManagerDashboard();
assert.match(summaryHtml, /data-manager-drill-user="__summary__"/);
assert.match(summaryHtml, /data-manager-drill-metric="summary_requests"/);
assert.match(summaryHtml, /Manager snapshot - 1 loaded item/);
assert.match(summaryHtml, /Mouse request/);
assert.match(summaryHtml, /Salem office - Louie/);
assert.match(summaryHtml, /data-manager-request-jump="active"/);

const completedHelpers = createManagerDashboardDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char])),
  getAssets: () => [],
  getPreventiveSchedules: () => [],
  getWorkOrders: () => [],
  getManagerCompletedWorkOrders: () => [
    { id: "wo-done", title: "Completed repair", assigned_to: "tech-1", completed_by: "tech-2", status: "completed", completed_at: new Date().toISOString(), created_at: "2026-06-01T12:00:00Z", location_id: "loc-1" },
  ],
  getManagerCompletedWorkReady: () => true,
  getMaintenanceRequests: () => [],
  getCompanyMembers: () => [{ user_id: "tech-2", role: "manager" }],
  getWorkOrderDashboardCounts: () => ({}),
  getRequestDashboardCounts: () => ({}),
  getManagerDashboardUserId: () => "__summary__",
  getManagerDashboardMetric: () => "summary_completed_week",
  matchesActiveLocation: (row) => row.location_id === "loc-1",
  isConvertedRequest: () => false,
  getDueState: () => ({ className: "" }),
  teamMemberName: (userId) => userId === "tech-2" ? "QA Manager" : "Taylor Tech",
  roleLabel: (role) => role,
  normalizeRole: (role) => role,
  statusLabel: (status) => status,
});

const completedHtml = completedHelpers.renderManagerDashboard();
assert.match(completedHtml, /Completed by QA Manager/);
assert.match(completedHtml, /data-mini-work-order="wo-done"/);

const convertedDrillHelpers = createManagerDashboardDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char])),
  getAssets: () => [],
  getPreventiveSchedules: () => [],
  getWorkOrders: () => [],
  getManagerCompletedWorkOrders: () => [],
  getManagerCompletedWorkReady: () => true,
  getMaintenanceRequests: () => [
    { id: "req-converted", title: "Converted request", status: "converted", converted_work_order_id: "wo-new", converted_by: "tech-1", priority: "high", equipment_note: "Forklift 4", requested_by_name: "Luis", created_at: "2026-06-06T12:00:00Z", location_id: "loc-1" },
  ],
  getCompanyMembers: () => [{ user_id: "tech-1", role: "technician" }],
  getWorkOrderDashboardCounts: () => ({}),
  getRequestDashboardCounts: () => ({}),
  getManagerDashboardUserId: () => "tech-1",
  getManagerDashboardMetric: () => "converted_requests",
  matchesActiveLocation: (row) => row.location_id === "loc-1",
  isConvertedRequest: (request) => request.status === "converted" || Boolean(request.converted_work_order_id),
  getDueState: () => ({ className: "" }),
  teamMemberName: () => "Taylor Tech",
  roleLabel: (role) => role,
  normalizeRole: (role) => role,
  statusLabel: (status) => status,
});

const convertedDrillHtml = convertedDrillHelpers.renderManagerDashboard();
assert.match(convertedDrillHtml, /Converted Requests - 1 loaded item/);
assert.match(convertedDrillHtml, /Converted request/);
assert.match(convertedDrillHtml, /Forklift 4 - Luis/);
assert.match(convertedDrillHtml, /data-manager-request-jump="converted"/);

console.log("manager dashboard display smoke passed");
