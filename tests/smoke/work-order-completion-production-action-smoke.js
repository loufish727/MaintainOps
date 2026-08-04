const assert = require("node:assert/strict");

global.window = {};

const { createWorkspaceWorkOrderCompletionEvents } = require("../../src/utils/workspaceWorkOrderCompletionEvents.js");

(async () => {
  const calls = [];
  const errorTarget = { textContent: "" };
  const button = { disabled: false, textContent: "Complete Work Order" };
  const form = {
    querySelector: () => button,
    values: {},
  };
  const handlers = createWorkspaceWorkOrderCompletionEvents({
    documentRef: {
      querySelector: (selector) => selector === "#completion-error" ? errorTarget : null,
      querySelectorAll: () => [],
    },
    FormDataRef: class {
      constructor(target) { this.values = target.values; }
      get(name) { return this.values[name] || ""; }
    },
    getActiveWorkOrderId: () => "wo-1",
    getWorkOrderById: () => ({ id: "wo-1", production_action_status: "open" }),
    getProcedureById: () => null,
    requiredChecklistProgress: () => ({ done: 0, total: 0 }),
    productionActionCompletionMessage: () => "Complete or remove the open Production Action first.",
    setWorkOrderActionWarning: (...args) => calls.push(["warning", ...args]),
    showNotice: (...args) => calls.push(["notice", ...args]),
    requiresSafetyDeviceCheck: () => false,
    hasCompletedSafetyDeviceCheck: () => false,
    applySafetyRequirementPayload() {},
    applySafetyCheckPayload() {},
    updateWorkOrderSafely: async () => {
      calls.push(["update"]);
      return { error: null };
    },
    recordWorkOrderEvent: async () => {},
    friendlyWorkOrderSaveError: (error) => error.message,
    withOperationTimeout: (promise) => promise,
    render: async () => {},
    alertRef() {},
  });

  await handlers.completeWorkOrder({ preventDefault() {}, target: form });
  assert.equal(errorTarget.textContent, "Complete or remove the open Production Action first.");
  assert.equal(calls.some((call) => call[0] === "update"), false);
  assert.equal(button.disabled, false);

  console.log("work order completion Production Action smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
