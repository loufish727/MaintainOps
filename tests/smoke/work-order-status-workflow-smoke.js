const assert = require("node:assert/strict");

global.window = {};

const { createWorkOrderStatusWorkflow } = require("../../src/workflows/workOrderStatusWorkflow.js");

function createWorkflow(overrides = {}) {
  const calls = [];
  const notices = [];
  let activeWorkOrderId = "wo-1";
  const workOrders = overrides.workOrders || [{ id: "wo-1", status: "open", asset_id: "asset-1" }];
  const workflow = createWorkOrderStatusWorkflow({
    applySafetyCheckPayload: (payload, checked) => {
      payload.safety_devices_checked = checked;
    },
    applySafetyRequirementPayload: (payload) => {
      payload.safety_check_required = true;
    },
    blocksProcedureCompletion: overrides.blocksProcedureCompletion || (() => ""),
    productionActionCompletionMessage: overrides.productionActionCompletionMessage || (() => ""),
    currentSafetyCheckboxCheckedForWorkOrder: overrides.currentSafetyCheckboxCheckedForWorkOrder || (() => true),
    friendlyWorkOrderSaveError: (error) => error.message || String(error),
    getActiveWorkOrderId: () => activeWorkOrderId,
    getWorkOrders: () => workOrders,
    hasCompletedSafetyDeviceCheck: overrides.hasCompletedSafetyDeviceCheck || (() => false),
    recordWorkOrderEvent: async (id, type, summary) => calls.push(["recordWorkOrderEvent", id, type, summary]),
    render: async () => calls.push(["render"]),
    requiresSafetyDeviceCheck: overrides.requiresSafetyDeviceCheck || (() => true),
    setActiveWorkOrderId: (id) => {
      activeWorkOrderId = id;
      calls.push(["setActiveWorkOrderId", id]);
    },
    setWorkOrderActionWarning: (id, message) => calls.push(["setWorkOrderActionWarning", id, message]),
    showNotice: (message, tone = "success") => notices.push([message, tone]),
    statusLabel: (status) => status,
    updateWorkOrderSafely: async (payload, id) => {
      calls.push(["updateWorkOrderSafely", id, payload]);
      return { error: overrides.updateError || null };
    },
    withOperationTimeout: (promise) => promise,
  });
  return { calls, notices, workflow };
}

(async () => {
  const success = createWorkflow();
  const saved = await success.workflow.setWorkOrderStatus("wo-1", "completed");
  assert.equal(saved, true);
  const updateCall = success.calls.find((call) => call[0] === "updateWorkOrderSafely");
  assert.equal(updateCall[1], "wo-1");
  assert.equal(updateCall[2].status, "completed");
  assert.equal(typeof updateCall[2].completed_at, "string");
  assert.equal(updateCall[2].safety_devices_checked, true);
  assert.equal(success.calls.some((call) => call[0] === "recordWorkOrderEvent" && call[2] === "status_changed"), true);
  assert.deepEqual(success.notices.at(-1), ["Status changed to completed.", "success"]);

  const blocked = createWorkflow({ currentSafetyCheckboxCheckedForWorkOrder: () => false });
  const blockedSaved = await blocked.workflow.setWorkOrderStatus("wo-1", "completed");
  assert.equal(blockedSaved, false);
  assert.equal(blocked.calls.some((call) => call[0] === "updateWorkOrderSafely"), false);
  assert.equal(blocked.calls.some((call) => call[0] === "setWorkOrderActionWarning" && call[1] === "wo-1"), true);

  const productionBlocked = createWorkflow({
    productionActionCompletionMessage: () => "Complete Production Action first.",
  });
  const productionBlockedSaved = await productionBlocked.workflow.setWorkOrderStatus("wo-1", "completed");
  assert.equal(productionBlockedSaved, false);
  assert.equal(productionBlocked.calls.some((call) => call[0] === "updateWorkOrderSafely"), false);
  assert.deepEqual(productionBlocked.notices.at(-1), ["Complete Production Action first.", "warning"]);

  const selectTarget = { value: "completed", disabled: false };
  const selectBlocked = createWorkflow({ currentSafetyCheckboxCheckedForWorkOrder: () => false });
  await selectBlocked.workflow.updateWorkOrderStatus({ target: selectTarget });
  assert.equal(selectTarget.value, "open");
  assert.equal(selectTarget.disabled, false);

  console.log("work order status workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
