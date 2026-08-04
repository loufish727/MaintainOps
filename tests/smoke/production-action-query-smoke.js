const assert = require("node:assert/strict");

global.window = {};

require("../../src/utils/workOrderQueryFilters.js");
const { createWorkOrderQueryFilterHelpers } = window.MaintainOpsWorkOrderQueryFilters;

function queryRecorder() {
  const calls = [];
  const query = new Proxy({}, {
    get(_target, property) {
      return (...args) => {
        calls.push([String(property), ...args]);
        return query;
      };
    },
  });
  return { calls, query };
}

const values = {
  activeCompanyId: "company-1",
  activeLocationId: "location-1",
  locationsReady: true,
  activeSection: "mywork",
  activeStatusFilter: "active",
  myWorkFilter: "assigned",
  workOrderAssigneeFilter: "",
  workOrderFilter: "all",
  workOrderTypeFilter: "all",
  workOrderPriorityFilter: "all",
  workSort: "newest",
  searchQuery: "",
  workOrderRelatedSearch: { assetIds: [], procedureIds: [], workOrderIds: [] },
  session: { user: { id: "production-1" } },
};
const deps = Object.fromEntries(Object.keys(values).map((key) => [key, () => values[key]]));
Object.assign(deps, {
  OUTSIDE_VENDOR_NOTE: "[Assignment: Outside vendor]",
  postgrestSearchTerm: (value) => value,
  isoDate: () => "2026-08-04",
  isoDateTime: () => "2026-08-04T00:00:00Z",
  startOfToday: () => new Date("2026-08-04T00:00:00Z"),
  monthStartDate: () => new Date("2026-08-01T00:00:00Z"),
  sundayWeekRange: () => ({ start: new Date("2026-08-02T00:00:00Z"), end: new Date("2026-08-09T00:00:00Z") }),
});

const helpers = createWorkOrderQueryFilterHelpers(deps);
const assigned = queryRecorder();
helpers.applyWorkOrderQueueFilters(assigned.query, "mywork");
assert.deepEqual(assigned.calls, [[
  "or",
  "assigned_to.eq.production-1,and(production_action_assigned_to.eq.production-1,production_action_status.eq.open)",
]]);

values.myWorkFilter = "created";
const created = queryRecorder();
helpers.applyWorkOrderQueueFilters(created.query, "mywork");
assert.deepEqual(created.calls, [["eq", "created_by", "production-1"]]);

values.activeSection = "work";
values.workOrderAssigneeFilter = "production-1";
const teamDrill = queryRecorder();
helpers.applyWorkOrderQueueFilters(teamDrill.query, "work");
assert.deepEqual(teamDrill.calls, [[
  "or",
  "assigned_to.eq.production-1,and(production_action_assigned_to.eq.production-1,production_action_status.eq.open)",
]]);

console.log("production action query smoke passed");
