const assert = require("node:assert/strict");

global.window = {};

const { createProcedureChecklistWorkflow } = require("../../src/workflows/procedureChecklistWorkflow.js");

const calls = [];
const notices = [];
const field = {
  checked: true,
  dataset: {
    stepResult: "step-1",
    workOrderId: "wo-1",
  },
  disabled: false,
  type: "checkbox",
};

const workflow = createProcedureChecklistWorkflow({
  blocksProcedureCompletion: () => "",
  getActiveCompanyId: () => "company-1",
  getSession: () => ({ user: { id: "user-1" } }),
  getWorkOrderActionWarningId: () => "wo-1",
  getWorkOrders: () => [{ id: "wo-1" }],
  loadStepResults: async () => {
    calls.push(["loadStepResults"]);
  },
  recordWorkOrderEvent: async (workOrderId, type, summary) => {
    calls.push(["recordWorkOrderEvent", workOrderId, type, summary]);
  },
  renderWorkspace: () => calls.push(["renderWorkspace"]),
  setWorkOrderActionWarning: (id, message) => calls.push(["setWorkOrderActionWarning", id, message]),
  showNotice: (message, tone = "success") => notices.push([message, tone]),
  upsertStepResult: async (payload) => {
    calls.push(["upsertStepResult", payload]);
    return { error: null };
  },
  withOperationTimeout: (promise) => promise,
});

(async () => {
  await workflow.saveStepResult({ target: field });

  const upsertCall = calls.find((call) => call[0] === "upsertStepResult");
  assert.equal(upsertCall[1].company_id, "company-1");
  assert.equal(upsertCall[1].work_order_id, "wo-1");
  assert.equal(upsertCall[1].procedure_step_id, "step-1");
  assert.equal(upsertCall[1].completed_by, "user-1");
  assert.equal(upsertCall[1].value, "checked");
  assert.equal(typeof upsertCall[1].completed_at, "string");
  assert.equal(calls.some((call) => call[0] === "recordWorkOrderEvent" && call[2] === "checklist_updated"), true);
  assert.equal(calls.some((call) => call[0] === "loadStepResults"), true);
  assert.deepEqual(calls.find((call) => call[0] === "setWorkOrderActionWarning"), ["setWorkOrderActionWarning", "", ""]);
  assert.equal(calls.some((call) => call[0] === "renderWorkspace"), true);

  console.log("procedure checklist workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
