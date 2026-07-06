const assert = require("node:assert/strict");

global.window = {};

require("../../src/utils/workOrderQueryFilters.js");
require("../../src/render/workOrderStatusFilterDisplay.js");
require("../../src/render/workOrderSortDisplay.js");
require("../../src/render/dashboardDisplay.js");
require("../../src/utils/formatting.js");

const { createWorkOrderQueryFilterHelpers } = window.MaintainOpsWorkOrderQueryFilters;
const { createWorkOrderStatusFilterDisplayHelpers } = window.MaintainOpsWorkOrderStatusFilterDisplay;
const { createWorkOrderSortDisplayHelpers } = window.MaintainOpsWorkOrderSortDisplay;
const { createDashboardDisplayHelpers } = window.MaintainOpsDashboardDisplay;
const { statusLabel } = window.MaintainOpsFormatting;

function createQuery() {
  const calls = [];
  const query = {
    calls,
    eq(column, value) {
      calls.push(["eq", column, value]);
      return query;
    },
    neq(column, value) {
      calls.push(["neq", column, value]);
      return query;
    },
    gte(column, value) {
      calls.push(["gte", column, value]);
      return query;
    },
    lt(column, value) {
      calls.push(["lt", column, value]);
      return query;
    },
    order(column, options) {
      calls.push(["order", column, options]);
      return query;
    },
  };
  return query;
}

let activeStatusFilter = "completed";
let workSort = "newest";
const queryHelpers = createWorkOrderQueryFilterHelpers({
  activeCompanyId: () => "company-1",
  activeLocationId: () => "loc-1",
  locationsReady: () => true,
  activeSection: () => "work",
  activeStatusFilter: () => activeStatusFilter,
  workOrderAssigneeFilter: () => "",
  workOrderFilter: () => "all",
  myWorkFilter: () => "assigned",
  session: () => ({ user: { id: "user-1" } }),
  searchQuery: () => "",
  workOrderRelatedSearch: () => ({ assetIds: [], procedureIds: [], workOrderIds: [] }),
  workSort: () => workSort,
  postgrestSearchTerm: () => "",
  isoDate: () => "2026-07-01",
  isoDateTime: (value) => value.toISOString(),
  monthStartDate: () => new Date("2026-07-01T00:00:00Z"),
  daysAgoDate: () => new Date("2026-06-24T00:00:00Z"),
  startOfToday: () => new Date("2026-07-01T00:00:00Z"),
  OUTSIDE_VENDOR_NOTE: "OUTSIDE VENDOR",
});

const query = createQuery();
queryHelpers.applyWorkOrderStatusFilter(query, "completed");
assert.deepEqual(query.calls, [["eq", "status", "completed"]]);

const sorted = createQuery();
queryHelpers.applyWorkOrderSort(sorted);
assert.deepEqual(sorted.calls, [
  ["order", "completed_at", { ascending: false, nullsFirst: false }],
  ["order", "created_at", { ascending: false }],
]);

activeStatusFilter = "active";
workSort = "assigned";
const assignedSorted = createQuery();
queryHelpers.applyWorkOrderSort(assignedSorted);
assert.deepEqual(assignedSorted.calls, [
  ["order", "assigned_to", { ascending: true, nullsFirst: false }],
  ["order", "created_at", { ascending: false }],
]);

const filterHelpers = createWorkOrderStatusFilterDisplayHelpers({
  getActiveStatusFilter: () => activeStatusFilter,
  getDueState: () => ({ className: "" }),
  isCompletedThisMonth: () => false,
  isCompletedThisWeek: () => false,
});
activeStatusFilter = "completed";
assert.equal(filterHelpers.workOrderMatchesStatusFilter({ status: "completed" }), true);
assert.equal(filterHelpers.workOrderMatchesStatusFilter({ status: "open" }), false);

const sortHelpers = createWorkOrderSortDisplayHelpers({
  getActiveStatusFilter: () => activeStatusFilter,
  getWorkSort: () => "newest",
});
const ordered = [
  { id: "old", status: "completed", completed_at: "2026-06-01T00:00:00Z", created_at: "2026-05-01T00:00:00Z" },
  { id: "new", status: "completed", completed_at: "2026-07-01T00:00:00Z", created_at: "2026-06-01T00:00:00Z" },
].sort(sortHelpers.compareWorkOrders);
assert.equal(ordered[0].id, "new");

const assignedSortHelpers = createWorkOrderSortDisplayHelpers({
  getActiveStatusFilter: () => "active",
  getWorkSort: () => "assigned",
  assignmentLabel: (workOrder) => workOrder.label,
});
const assignedOrder = [
  { id: "z", label: "Zoey", created_at: "2026-07-01T00:00:00Z" },
  { id: "a", label: "Alex", created_at: "2026-06-01T00:00:00Z" },
].sort(assignedSortHelpers.compareWorkOrders);
assert.equal(assignedOrder[0].id, "a");

const dashboard = createDashboardDisplayHelpers({
  getWorkOrderDashboardCounts: () => ({ activeWork: 1, newWork: 1, inProgress: 0, blocked: 0, overdue: 0, completedAll: 12, completedMonth: 4, completedWeek: 2 }),
  getRequestsReady: () => true,
  openMaintenanceRequests: () => [],
  matchesActiveLocation: () => true,
  getActiveStatusFilter: () => "completed",
  escapeHtml: (value) => String(value ?? ""),
  getWorkOrders: () => [],
  getPreventiveSchedules: () => [],
  getDueState: () => ({ className: "" }),
});
const dashboardHtml = dashboard.renderWorkOrderGaugeDashboard();
assert.match(dashboardHtml, /All Completed/);
assert.match(dashboardHtml, /data-status-filter="completed"/);
assert.match(dashboardHtml, />12<\/strong>/);

assert.equal(statusLabel("completed"), "All Completed");

console.log("work order completed filter smoke passed");
