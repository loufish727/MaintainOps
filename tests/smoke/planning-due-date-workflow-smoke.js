const assert = require("node:assert/strict");

global.window = {};

const { createPlanningDueDateWorkflow } = require("../../src/workflows/planningDueDateWorkflow.js");

function createHarness(options = {}) {
  let planningWorkOrders = [{ id: "work-1", status: "open", due_at: null }];
  let workOrders = [{ id: "work-1", status: "open", due_at: null }];
  const calls = [];
  const workflow = createPlanningDueDateWorkflow({
    canEditOperationalRecords: () => options.canEdit !== false,
    getPlanningWorkOrders: () => planningWorkOrders,
    setPlanningWorkOrders: (value) => { planningWorkOrders = value; },
    getWorkOrders: () => workOrders,
    setWorkOrders: (value) => { workOrders = value; },
    workOrderDateValue: (value) => value || null,
    withOperationTimeout: async (promise) => promise,
    updateWorkOrderSafely: async (payload, id) => {
      calls.push(["update", id, payload]);
      return options.updateError ? { error: new Error("update denied") } : { error: null };
    },
    resetNoDuePage: () => calls.push(["resetPage"]),
    recordWorkOrderEvent: async (...args) => calls.push(["event", ...args]),
    showNotice: (...args) => calls.push(["notice", ...args]),
    renderWorkspace: () => calls.push(["render"]),
  });
  return {
    workflow,
    calls,
    getPlanningWorkOrders: () => planningWorkOrders,
    getWorkOrders: () => workOrders,
  };
}

(async () => {
  const success = createHarness();
  const result = await success.workflow.savePlanningDueDate("work-1", "2026-07-31");
  assert.deepEqual(result, { saved: true, dueAt: "2026-07-31" });
  assert.equal(success.getPlanningWorkOrders()[0].due_at, "2026-07-31");
  assert.equal(success.getWorkOrders()[0].due_at, "2026-07-31");
  assert(success.calls.some((call) => call[0] === "event" && call[3].includes("2026-07-31")));
  assert(success.calls.some((call) => call[0] === "render"));

  const readOnly = createHarness({ canEdit: false });
  const readOnlyResult = await readOnly.workflow.savePlanningDueDate("work-1", "2026-07-31");
  assert.equal(readOnlyResult.reason, "read_only");
  assert.doesNotMatch(JSON.stringify(readOnly.calls), /update/);

  const failed = createHarness({ updateError: true });
  const failedResult = await failed.workflow.savePlanningDueDate("work-1", "2026-07-31");
  assert.equal(failedResult.reason, "save_failed");
  assert.equal(failed.getPlanningWorkOrders()[0].due_at, null);
  assert.doesNotMatch(JSON.stringify(failed.calls), /"render"/);

  console.log("planning due date workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
