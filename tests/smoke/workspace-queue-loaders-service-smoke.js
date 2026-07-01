const assert = require("node:assert/strict");

global.window = {};

const { createWorkspaceQueueLoaders } = require("../../src/services/workspaceQueueLoadersService.js");

const calls = [];
const requestPageResponses = [
  { data: [], count: 0, error: { code: "PGRST200", message: "location relation missing" } },
  { data: [{ id: "request-fallback" }], count: 1, error: null },
  { data: [], count: 15, error: null },
  { data: [{ id: "request-page-reset" }], count: 15, error: null },
];
const requestCountResponses = [
  { count: 3, error: null },
  { count: 1, error: null },
  { count: 4, error: null },
];
const workOrderPageResponses = [
  { data: [], count: 13, error: null },
  { data: [{ id: "work-page-reset" }], count: 13, error: null },
];
const workOrderCountResponses = [
  { count: 9, error: null },
  { count: 2, error: null },
  { count: 3, error: null },
  { count: 1, error: null },
  { count: 4, error: null },
  { count: 5, error: null },
  { count: 6, error: null },
  { count: 7, error: null },
  { count: 8, error: null },
  { count: 9, error: null },
  { count: 10, error: null },
  { count: 11, error: null },
  { count: 12, error: null },
  { count: 13, error: null },
  { count: 14, error: null },
  { count: 15, error: null },
];

let requestsPage = 1;
let workOrderPage = 2;
let workOrderSearchMode = false;
let searchQuery = "";

const workspaceUiState = {
  getRequestViewFilter: () => "active",
  getRequestsPage: () => requestsPage,
  setRequestsPage: (value) => {
    calls.push(["setRequestsPage", value]);
    requestsPage = value;
  },
  getWorkOrderPage: () => workOrderPage,
  setWorkOrderPage: (value) => {
    calls.push(["setWorkOrderPage", value]);
    workOrderPage = value;
  },
  getWorkOrderSearchMode: () => workOrderSearchMode,
  getSearchQuery: () => searchQuery,
};

const supabaseClient = {
  from(tableName) {
    return {
      select(selectClause, options = {}) {
        calls.push(["select", tableName, selectClause, options]);
        return { tableName, selectClause, options };
      },
    };
  },
};

let exactSearchCalled = false;
const loaders = createWorkspaceQueueLoaders({
  supabaseClient: () => supabaseClient,
  workspaceUiState,
  applyRequestQueryFilters(query, filter) {
    calls.push(["requestFilter", filter, query.selectClause]);
    if (query.options.head) {
      return Promise.resolve(requestCountResponses.shift());
    }
    return {
      order(column, options) {
        calls.push(["requestOrder", column, options]);
        return {
          async range(from, to) {
            calls.push(["requestRange", from, to]);
            return requestPageResponses.shift();
          },
        };
      },
    };
  },
  applyWorkOrderListFilters(query) {
    calls.push(["workOrderListFilter", query.selectClause]);
    return {
      async range(from, to) {
        calls.push(["workOrderRange", from, to]);
        return workOrderPageResponses.shift();
      },
    };
  },
  applyWorkOrderFilters(query, options) {
    calls.push(["workOrderCount", options.statusFilter, options.section || "workspace"]);
    return Promise.resolve(workOrderCountResponses.shift());
  },
  selectWorkOrders(_client, selectClause, options) {
    calls.push(["selectWorkOrders", selectClause, options]);
    return { selectClause, options };
  },
  countWorkOrdersQuery() {
    return { countQuery: true };
  },
  async fetchExactSearchedWorkOrderPage(options) {
    exactSearchCalled = true;
    calls.push(["exactSearch", options.includeLocationRelation !== false]);
    return { data: [{ id: "exact" }], count: 1, error: null };
  },
  isColumnSchemaError: (error, columns) => Boolean(error?.code === "PGRST200" && columns.includes("locations")),
  warn: (...args) => calls.push(["warn", ...args]),
  LIST_ITEMS_PER_PAGE: 10,
  WORK_ORDERS_PER_PAGE: 10,
  REQUEST_RELATION_SELECT: "request relation",
  REQUEST_ASSET_FALLBACK_SELECT: "request asset fallback",
  REQUEST_FALLBACK_SELECT: "request fallback",
  WORK_ORDER_RELATION_SELECT: "work relation",
  WORK_ORDER_FALLBACK_SELECT: "work fallback",
});

(async () => {
  const fallbackRequestPage = await loaders.fetchRequestPage("active");
  assert.equal(fallbackRequestPage.data[0].id, "request-fallback");
  assert(calls.some((call) => call[0] === "requestFilter" && call[2] === "request asset fallback"));

  requestsPage = 3;
  const resetRequestPage = await loaders.fetchRequestPage("active");
  assert.equal(resetRequestPage.data[0].id, "request-page-reset");
  assert(calls.some((call) => call[0] === "setRequestsPage" && call[1] === 2));

  const requestCounts = await loaders.loadRequestDashboardCounts();
  assert.deepEqual(requestCounts, { active: 3, converted: 1, all: 4 });

  workOrderPage = 3;
  const workOrderPageResult = await loaders.fetchWorkOrderPage();
  assert.equal(workOrderPageResult.data[0].id, "work-page-reset");
  assert(calls.some((call) => call[0] === "setWorkOrderPage" && call[1] === 2));

  const dashboardCounts = await loaders.loadWorkOrderDashboardCounts();
  assert.equal(dashboardCounts.activeWork, 9);
  assert.equal(dashboardCounts.completedAll, 5);
  assert.equal(dashboardCounts.completedWeek, 7);
  assert(calls.some((call) => call[0] === "workOrderCount" && call[1] === "completed" && call[2] === "workspace"));

  const myCounts = await loaders.loadMyWorkDashboardCounts();
  assert.equal(myCounts.activeWork, 8);
  assert.equal(myCounts.completedAll, 13);
  assert.equal(myCounts.completedWeek, 15);
  assert(calls.some((call) => call[0] === "workOrderCount" && call[1] === "completed" && call[2] === "mywork"));

  workOrderSearchMode = true;
  searchQuery = "pump";
  const exactPage = await loaders.fetchWorkOrderPage({ includeLocationRelation: false });
  assert.equal(exactSearchCalled, true);
  assert.equal(exactPage.data[0].id, "exact");

  console.log("workspace queue loaders service smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
