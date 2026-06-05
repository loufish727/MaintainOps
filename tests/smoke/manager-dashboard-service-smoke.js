const assert = require("node:assert/strict");

global.window = {};
require("../../src/services/managerDashboardService.js");

const { fetchRecentCompletedWorkOrders } = window.MaintainOpsManagerDashboardService;

function createQueryRecorder() {
  const calls = [];
  const query = {
    calls,
    select(value) { calls.push(["select", value]); return this; },
    eq(column, value) { calls.push(["eq", column, value]); return this; },
    gte(column, value) { calls.push(["gte", column, value]); return this; },
    order(column, options) { calls.push(["order", column, options]); return this; },
    limit(value) { calls.push(["limit", value]); return this; },
  };
  return query;
}

const query = createQueryRecorder();
const supabaseClient = {
  from(table) {
    query.calls.push(["from", table]);
    return query;
  },
};

const result = fetchRecentCompletedWorkOrders(supabaseClient, {
  companyId: "company-1",
  locationId: "loc-1",
  locationsReady: true,
  selectClause: "id,status,completed_at",
  cutoffIso: "2026-05-06T00:00:00.000Z",
  limit: 50,
});

assert.equal(result, query);
assert.deepEqual(query.calls.slice(0, 5), [
  ["from", "work_orders"],
  ["select", "id,status,completed_at"],
  ["eq", "company_id", "company-1"],
  ["eq", "status", "completed"],
  ["gte", "completed_at", "2026-05-06T00:00:00.000Z"],
]);
assert.ok(query.calls.some((call) => call[0] === "eq" && call[1] === "location_id" && call[2] === "loc-1"));
assert.ok(query.calls.some((call) => call[0] === "limit" && call[1] === 50));

console.log("manager dashboard service smoke passed");
