const assert = require("node:assert/strict");

global.window = {};

const { createProcedureChecklistWorkflow } = require("../../src/workflows/procedureChecklistWorkflow.js");

const calls = [];
const notices = [];
const summary = { textContent: '' };
const chip = { textContent: '' };
const recorded = { textContent: '' };
const completedAt = '2026-09-18T12:00:00.000Z';
const field = {
  isConnected: true,
  closest: (selector) => selector === '.detail-stack'
    ? { querySelector: (target) => target === '[data-checklist-summary]' ? summary : chip }
    : { querySelector: () => recorded },
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
  getWorkOrders: () => [{ id: "wo-1", company_id: "company-1", procedure_template_id: 'procedure-1' }],
  getProcedureTemplates: () => [{
    id: 'procedure-1',
    company_id: "company-1",
    procedure_steps: [{ id: "step-1", company_id: "company-1", procedure_template_id: "procedure-1", response_type: "checkbox" }],
  }],
  checklistProgress: () => ({ done: 2, total: 3 }),
  requiredChecklistProgress: () => ({ done: 1, total: 1 }),
  getStepResultsByWorkOrder: () => ({ 'wo-1': { 'step-1': { completed_at: completedAt } } }),
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
  assert.equal(calls.some((call) => call[0] === "renderWorkspace"), false, "Checklist save must not replace other unsaved forms");
  assert.equal(field.disabled, false);
  assert.equal(summary.textContent, '2 of 3 complete - required 1/1');
  assert.equal(chip.textContent, '2/3');
  assert.equal(recorded.textContent, `Recorded ${new Date(completedAt).toLocaleString()}`);
  assert.deepEqual(notices, [], 'Connected checklist readout must not fail silently');

  field.isConnected = false;
  summary.textContent = 'A different screen';
  await workflow.saveStepResult({ target: field });
  assert.equal(summary.textContent, 'A different screen', 'A detached field must not update another screen');
  assert.equal(calls.some((call) => call[0] === 'renderWorkspace'), false);
  assert.deepEqual(notices, []);

  console.log("procedure checklist workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
