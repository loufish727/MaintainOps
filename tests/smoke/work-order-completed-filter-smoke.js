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
const { statusLabel, sundayWeekRange } = window.MaintainOpsFormatting;

const calendarWeek = sundayWeekRange(new Date(2026, 6, 21, 15, 30));
assert.equal(calendarWeek.start.getDay(), 0);
assert.equal(calendarWeek.start.getDate(), 19);
assert.equal(calendarWeek.start.getHours(), 0);
assert.equal(calendarWeek.end.getDay(), 0);
assert.equal(calendarWeek.end.getDate(), 26);
assert.equal(calendarWeek.end.getHours(), 0);

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
let workOrderTypeFilter = "all";
let workOrderPriorityFilter = "all";
const queryHelpers = createWorkOrderQueryFilterHelpers({
  activeCompanyId: () => "company-1",
  activeLocationId: () => "loc-1",
  locationsReady: () => true,
  activeSection: () => "work",
  activeStatusFilter: () => activeStatusFilter,
  workOrderAssigneeFilter: () => "",
  workOrderFilter: () => "all",
  workOrderTypeFilter: () => workOrderTypeFilter,
  workOrderPriorityFilter: () => workOrderPriorityFilter,
  myWorkFilter: () => "assigned",
  session: () => ({ user: { id: "user-1" } }),
  searchQuery: () => "",
  workOrderRelatedSearch: () => ({ assetIds: [], procedureIds: [], workOrderIds: [] }),
  workSort: () => workSort,
  postgrestSearchTerm: () => "",
  isoDate: () => "2026-07-01",
  isoDateTime: (value) => value.toISOString(),
  monthStartDate: () => new Date("2026-07-01T00:00:00Z"),
  sundayWeekRange: () => ({
    start: new Date("2026-07-19T07:00:00Z"),
    end: new Date("2026-07-26T07:00:00Z"),
  }),
  startOfToday: () => new Date("2026-07-01T00:00:00Z"),
  OUTSIDE_VENDOR_NOTE: "OUTSIDE VENDOR",
});

const query = createQuery();
queryHelpers.applyWorkOrderStatusFilter(query, "completed");
assert.deepEqual(query.calls, [["eq", "status", "completed"]]);

const completedWeekQuery = createQuery();
queryHelpers.applyWorkOrderStatusFilter(completedWeekQuery, "completed_week");
assert.deepEqual(completedWeekQuery.calls, [
  ["gte", "completed_at", "2026-07-19T07:00:00.000Z"],
  ["lt", "completed_at", "2026-07-26T07:00:00.000Z"],
]);

workOrderTypeFilter = "preventive";
workOrderPriorityFilter = "critical";
const attributeFiltered = createQuery();
queryHelpers.applyWorkOrderFilters(attributeFiltered, {
  statusFilter: "active",
  includeQueue: false,
  includeSearch: false,
});
assert.deepEqual(attributeFiltered.calls, [
  ["eq", "company_id", "company-1"],
  ["eq", "location_id", "loc-1"],
  ["eq", "type", "preventive"],
  ["eq", "priority", "critical"],
  ["neq", "status", "completed"],
]);

const attributesExcluded = createQuery();
queryHelpers.applyWorkOrderFilters(attributesExcluded, {
  statusFilter: "active",
  includeQueue: false,
  includeSearch: false,
  includeAttributeFilters: false,
});
assert.doesNotMatch(JSON.stringify(attributesExcluded.calls), /preventive|critical/);

const myWorkAttributesExcluded = createQuery();
queryHelpers.applyWorkOrderFilters(myWorkAttributesExcluded, {
  statusFilter: "active",
  section: "mywork",
  includeQueue: false,
  includeSearch: false,
});
assert.doesNotMatch(JSON.stringify(myWorkAttributesExcluded.calls), /preventive|critical/);

const sorted = createQuery();
queryHelpers.applyWorkOrderSort(sorted);
assert.deepEqual(sorted.calls, [
  ["order", "completed_at", { ascending: false, nullsFirst: false }],
  ["order", "created_at", { ascending: false }],
]);

activeStatusFilter = "active";
workSort = "priority";
const prioritySorted = createQuery();
queryHelpers.applyWorkOrderSort(prioritySorted);
assert.deepEqual(prioritySorted.calls, [
  ["order", "priority_rank", { ascending: false }],
  ["order", "due_at", { ascending: true, nullsFirst: false }],
  ["order", "created_at", { ascending: false }],
]);

workSort = "type";
const typeSorted = createQuery();
queryHelpers.applyWorkOrderSort(typeSorted);
assert.deepEqual(typeSorted.calls, [
  ["order", "type", { ascending: true }],
  ["order", "created_at", { ascending: false }],
]);

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

const typeSortHelpers = createWorkOrderSortDisplayHelpers({
  getActiveStatusFilter: () => "active",
  getWorkSort: () => "type",
});
const typeOrder = [
  { id: "preventive", type: "preventive", created_at: "2026-07-01T00:00:00Z" },
  { id: "fabrication", type: "fabrication", created_at: "2026-07-02T00:00:00Z" },
  { id: "corrective", type: "corrective", created_at: "2026-07-03T00:00:00Z" },
].sort(typeSortHelpers.compareWorkOrders);
assert.deepEqual(typeOrder.map((workOrder) => workOrder.id), ["corrective", "fabrication", "preventive"]);

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
  sundayWeekRange: () => ({
    start: new Date("2026-07-19T07:00:00Z"),
    end: new Date("2026-07-26T07:00:00Z"),
  }),
});
const dashboardHtml = dashboard.renderWorkOrderGaugeDashboard();
assert.match(dashboardHtml, /All Completed/);
assert.match(dashboardHtml, /data-status-filter="completed"/);
assert.match(dashboardHtml, />12<\/strong>/);

const weekBoundaryDashboard = createDashboardDisplayHelpers({
  getWorkOrders: () => [
    { id: "before", completed_at: "2026-07-19T06:59:59.999Z" },
    { id: "start", completed_at: "2026-07-19T07:00:00.000Z" },
    { id: "end-before", completed_at: "2026-07-26T06:59:59.999Z" },
    { id: "next-week", completed_at: "2026-07-26T07:00:00.000Z" },
  ],
  sundayWeekRange: () => ({
    start: new Date("2026-07-19T07:00:00Z"),
    end: new Date("2026-07-26T07:00:00Z"),
  }),
});
assert.deepEqual(weekBoundaryDashboard.completedThisWeek().map((workOrder) => workOrder.id), ["start", "end-before"]);

assert.equal(statusLabel("completed"), "All Completed");

console.log("work order completed filter smoke passed");
