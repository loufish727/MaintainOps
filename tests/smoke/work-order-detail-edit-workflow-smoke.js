const assert = require("node:assert/strict");

global.window = {};

const { createWorkOrderDetailEditWorkflow } = require("../../src/workflows/workOrderDetailEditWorkflow.js");

function createFormData(values) {
  return {
    get(name) {
      return Object.prototype.hasOwnProperty.call(values, name) ? values[name] : "";
    },
    has(name) {
      return Object.prototype.hasOwnProperty.call(values, name);
    },
    entries() {
      return Object.entries(values)[Symbol.iterator]();
    },
  };
}

function createWorkflow(overrides = {}) {
  const calls = [];
  const errorTarget = { textContent: "" };
  const statusSelect = { value: overrides.statusValue || "in_progress" };
  const values = {
    title: "Edited work",
    description: "Updated description",
    assigned_to: "",
    due_at: "",
    priority: "high",
    type: "reactive",
    procedure_template_id: "",
    asset_id: "asset-1",
    failure_cause: "",
    resolution_summary: "Fixed",
    follow_up_needed: "",
    actual_minutes: "15",
    safety_devices_checked: "",
    ...(overrides.values || {}),
  };
  const workOrders = overrides.workOrders || [{ id: "wo-1", asset_id: "asset-1", status: "open", description: "Old" }];
  const { updateWorkOrderDetails } = createWorkOrderDetailEditWorkflow({
    documentRef: {
      querySelector(selector) {
        if (selector === "#work-order-save-error") return errorTarget;
        if (selector === "#status-select") return statusSelect;
        return null;
      },
    },
    FormDataCtor: function FormDataCtor() {
      return createFormData(values);
    },
    consoleRef: { error: (...args) => calls.push(["consoleError", ...args]) },
    getActiveWorkOrderId: () => "wo-1",
    getWorkOrders: () => workOrders,
    requiredText: (value, label) => {
      const text = String(value || "").trim();
      if (!text) throw new Error(`${label} is required.`);
      return text;
    },
    descriptionWithAssignmentNote: (description) => description,
    workOrderDateValue: () => null,
    locationIdForAsset: (assetId) => `location-${assetId || "none"}`,
    assignedUserFromForm: () => "user-1",
    procedureColumn: (value) => value ? { procedure_template_id: value } : {},
    confirmAssetLocationRouting: (assetId, actionLabel) => {
      calls.push(["confirmAssetLocationRouting", assetId, actionLabel]);
      return overrides.confirmAssetLocationRouting ?? true;
    },
    assetRequiresSafety: (assetId) => {
      calls.push(["assetRequiresSafety", assetId]);
      return overrides.assetRequiresSafety || false;
    },
    hasCompletedSafetyDeviceCheck: () => overrides.hasCompletedSafety || false,
    blocksProcedureCompletion: () => overrides.procedureBlockMessage || "",
    setWorkOrderActionWarning: (...args) => calls.push(["warning", ...args]),
    applySafetyCheckPayload: (payload, checked) => { payload.safety_devices_checked = checked; },
    withOperationTimeout: async (operation) => operation,
    updateWorkOrderSafely: async (payload, id) => {
      calls.push(["update", id, payload]);
      return { error: overrides.updateError || null };
    },
    friendlyWorkOrderSaveError: (error) => error.message,
    recordWorkOrderEvent: async (id, type, summary) => calls.push(["event", id, type, summary]),
    describeWorkOrderChanges: () => "Changed fields.",
    showNotice: (message, tone) => calls.push(["notice", message, tone || "success"]),
    render: async () => calls.push(["render"]),
  });

  return {
    calls,
    errorTarget,
    run: async () => {
      const button = { disabled: false, textContent: "Save Work Order", isConnected: true };
      await updateWorkOrderDetails({
        preventDefault: () => calls.push(["preventDefault"]),
        target: {
          querySelector(selector) {
            return selector === "button[type='submit']" ? button : null;
          },
        },
      });
      return button;
    },
  };
}

(async () => {
  const normal = createWorkflow();
  const button = await normal.run();
  assert.equal(normal.calls.some((call) => call[0] === "update" && call[2].title === "Edited work"), true);
  assert.equal(normal.calls.some((call) => call[0] === "update" && call[2].asset_id === "asset-1"), true);
  assert.equal(normal.calls.some((call) => call[0] === "update" && call[2].location_id === "location-asset-1"), true);
  assert.equal(normal.calls.some((call) => call[0] === "assetRequiresSafety" && call[1] === "asset-1"), true);
  assert.equal(normal.calls.some((call) => call[0] === "event" && call[2] === "updated"), true);
  assert.equal(normal.calls.at(-1)[0], "render");
  assert.equal(button.disabled, false);
  assert.equal(button.textContent, "Save Work Order");

  const safetyBlocked = createWorkflow({
    assetRequiresSafety: true,
    statusValue: "completed",
  });
  await safetyBlocked.run();
  assert.equal(safetyBlocked.errorTarget.textContent, "Use Complete Work and check safety devices before completing equipment work.");
  assert.equal(safetyBlocked.calls.some((call) => call[0] === "update"), false);

  const attachToMissingMachine = createWorkflow({
    workOrders: [{ id: "wo-1", asset_id: null, status: "open", description: "Old" }],
    values: { asset_id: "asset-2" },
  });
  await attachToMissingMachine.run();
  const attachUpdate = attachToMissingMachine.calls.find((call) => call[0] === "update");
  assert.equal(attachUpdate[2].asset_id, "asset-2");
  assert.equal(attachUpdate[2].location_id, "location-asset-2");
  assert.equal(attachToMissingMachine.calls.some((call) => call[0] === "assetRequiresSafety" && call[1] === "asset-2"), true);

  const completedAttachBlocked = createWorkflow({
    workOrders: [{ id: "wo-1", asset_id: null, status: "completed", description: "Old" }],
    statusValue: "completed",
    values: { asset_id: "asset-2", safety_devices_checked: "" },
    assetRequiresSafety: true,
  });
  await completedAttachBlocked.run();
  assert.equal(completedAttachBlocked.errorTarget.textContent, "Use Complete Work and check safety devices before completing equipment work.");
  assert.equal(completedAttachBlocked.calls.some((call) => call[0] === "update"), false);

  const procedureBlocked = createWorkflow({
    statusValue: "completed",
    values: { procedure_template_id: "proc-1" },
    procedureBlockMessage: "Checklist incomplete.",
  });
  await procedureBlocked.run();
  assert.equal(procedureBlocked.errorTarget.textContent, "Checklist incomplete.");
  assert.equal(procedureBlocked.calls.some((call) => call[0] === "warning" && call[1] === "wo-1"), true);

  console.log("work order detail edit workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
