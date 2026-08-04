const assert = require("node:assert/strict");

global.window = {};
require("../../src/services/workOrdersService.js");

const { scopedTeamWorkloadQuery } = window.MaintainOpsWorkOrdersService;

function createQueryRecorder() {
  const calls = [];
  return {
    calls,
    select(value) { calls.push(["select", value]); return this; },
    eq(column, value) { calls.push(["eq", column, value]); return this; },
    in(column, value) { calls.push(["in", column, value]); return this; },
    or(value) { calls.push(["or", value]); return this; },
    not(column, operator, value) { calls.push(["not", column, operator, value]); return this; },
    order(column, options) { calls.push(["order", column, options]); return this; },
  };
}

const query = createQueryRecorder();
const supabaseClient = {
  from(table) {
    query.calls.push(["from", table]);
    return query;
  },
};

const result = scopedTeamWorkloadQuery(supabaseClient, {
  companyId: "company-1",
  locationId: "location-1",
  locationsReady: true,
});

assert.equal(result, query);
assert.deepEqual(query.calls.slice(0, 5), [
  ["from", "work_orders"],
  ["select", "id, assigned_to, production_action_assigned_to, production_action_status, status, due_at, location_id"],
  ["eq", "company_id", "company-1"],
  ["in", "status", ["open", "in_progress", "blocked", "completed"]],
  ["or", "assigned_to.not.is.null,and(production_action_assigned_to.not.is.null,production_action_status.eq.open)"],
]);
assert.ok(query.calls.some((call) => call[0] === "eq" && call[1] === "location_id" && call[2] === "location-1"));
assert.ok(query.calls.some((call) => call[0] === "order" && call[1] === "id"));

console.log("team workload service smoke passed");
