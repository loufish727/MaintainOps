const assert = require("node:assert/strict");

(async () => {
  const {
    fetchWorkspaceWorkOrderCounts,
    normalizeWorkspaceWorkOrderCounts,
  } = await import("../../src/services/workspaceWorkOrderCountsService.mjs");

  const calls = [];
  const client = {
    rpc(name, parameters) {
      calls.push([name, parameters]);
      return Promise.resolve({
        data: {
          workOrders: { activeWork: "4", completedAll: 3 },
          myWork: { newWork: 2, overdue: null },
        },
        error: null,
      });
    },
  };
  const parameters = {
    target_company_id: "company-1",
    target_location_id: "location-1",
    target_my_work_filter: "assigned",
    target_today: "2026-07-27",
    target_month_start: "2026-07-01T00:00:00.000Z",
    target_week_start: "2026-07-26T00:00:00.000Z",
    target_week_end: "2026-08-02T00:00:00.000Z",
  };
  const response = await fetchWorkspaceWorkOrderCounts(client, parameters);

  assert.deepEqual(calls, [["get_workspace_work_order_counts", parameters]]);
  assert.equal(response.error, null);
  assert.deepEqual(response.data.workOrders, {
    activeWork: 4,
    newWork: 0,
    inProgress: 0,
    blocked: 0,
    overdue: 0,
    completedAll: 3,
    completedMonth: 0,
    completedWeek: 0,
  });
  assert.deepEqual(response.data.myWork, {
    activeWork: 0,
    newWork: 2,
    inProgress: 0,
    blocked: 0,
    overdue: 0,
    completedAll: 0,
    completedMonth: 0,
    completedWeek: 0,
  });
  assert.equal(normalizeWorkspaceWorkOrderCounts(null), null);

  console.log("workspace work-order counts service smoke passed");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
