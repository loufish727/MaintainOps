const assert = require("node:assert/strict");

global.window = {};
global.FormData = class {
  constructor(form) {
    this.values = form.values;
  }
  get(name) {
    return this.values[name] || "";
  }
};

const { createProductionActionWorkflow } = require("../../src/workflows/productionActionWorkflow.js");

function button(text = "Save") {
  return { textContent: text, disabled: false, isConnected: true };
}

(async () => {
  const updates = [];
  const refreshes = [];
  const notices = [];
  const errorTarget = { textContent: "" };
  const submitButton = button("Assign Production Action");
  const form = {
    dataset: { productionActionForm: "wo-1" },
    values: { production_action: "Clear line", production_action_assigned_to: "prod-1" },
    querySelector: () => submitButton,
    closest: () => ({ querySelector: () => errorTarget }),
  };
  const workflow = createProductionActionWorkflow({
    documentRef: { querySelector: () => errorTarget },
    confirmRef: () => true,
    getWorkOrderById: () => ({ id: "wo-1", production_action: null }),
    updateProductionActionRecord: async (id, payload) => {
      updates.push([id, payload]);
      return { data: { id, ...payload, production_action_status: payload.production_action_status || "open" }, error: null };
    },
    afterProductionActionMutation: async (row, id) => refreshes.push([row, id]),
    withOperationTimeout: (promise) => promise,
    friendlyWorkOrderSaveError: (error) => error.message,
    showNotice: (message, tone) => notices.push([message, tone]),
  });

  await workflow.saveProductionAction({ preventDefault() {}, stopPropagation() {}, currentTarget: form });
  assert.deepEqual(updates[0], ["wo-1", { production_action: "Clear line", production_action_assigned_to: "prod-1" }]);
  assert.equal(refreshes.length, 1);
  assert.deepEqual(notices[0], ["Production Action assigned.", "success"]);
  assert.equal(submitButton.disabled, false);
  assert.equal(submitButton.textContent, "Assign Production Action");

  const statusButton = button("Complete Production Action");
  statusButton.dataset = { workOrderId: "wo-1", productionActionStatus: "completed" };
  statusButton.closest = () => ({ querySelector: () => errorTarget });
  await workflow.setProductionActionStatus({ preventDefault() {}, stopPropagation() {}, currentTarget: statusButton });
  assert.deepEqual(updates[1], ["wo-1", { production_action_status: "completed" }]);

  const removeButton = button("Remove");
  removeButton.dataset = { productionActionRemove: "wo-1" };
  removeButton.closest = () => ({ querySelector: () => errorTarget });
  await workflow.removeProductionAction({ preventDefault() {}, stopPropagation() {}, currentTarget: removeButton });
  assert.deepEqual(updates[2], ["wo-1", { production_action: null }]);

  const invalidForm = { ...form, values: { production_action: "", production_action_assigned_to: "" } };
  await workflow.saveProductionAction({ preventDefault() {}, stopPropagation() {}, currentTarget: invalidForm });
  assert.match(errorTarget.textContent, /Enter an action/);
  assert.equal(updates.length, 3);

  console.log("production action workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
