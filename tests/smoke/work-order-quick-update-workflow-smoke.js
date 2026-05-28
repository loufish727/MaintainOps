const assert = require("node:assert/strict");

global.window = {};

const { createWorkOrderQuickUpdateWorkflow } = require("../../src/workflows/workOrderQuickUpdateWorkflow.js");

function fakeFormData(values) {
  return {
    get(name) {
      return Object.prototype.hasOwnProperty.call(values, name) ? values[name] : "";
    },
    entries() {
      return Object.entries(values)[Symbol.iterator]();
    },
  };
}

function createSubmitButton() {
  return { disabled: false, textContent: "Save Quick Update" };
}

function createForm(button) {
  return {
    querySelector(selector) {
      return selector === "button[type='submit']" ? button : null;
    },
  };
}

function createWorkflow(overrides = {}) {
  const calls = [];
  const errorTarget = { textContent: "" };
  let activeWorkOrderId = "wo-1";
  const baseValues = {
    title: "Bearing noise",
    asset_id: "asset-1",
    new_asset_name: "",
    assigned_to: "",
    due_at: "",
    status: "in_progress",
    priority: "high",
    resolution_summary: "Inspected",
    safety_devices_checked: "",
    machine_down: "",
  };
  const values = { ...baseValues, ...(overrides.values || {}) };
  const workOrders = overrides.workOrders || [{ id: "wo-1", description: "Existing description", status: "open" }];

  const workflow = createWorkOrderQuickUpdateWorkflow({
    documentRef: {
      querySelector(selector) {
        return selector === "#quick-update-error" ? errorTarget : null;
      },
    },
    FormDataCtor: function FormDataCtor() {
      return fakeFormData(values);
    },
    consoleRef: { error: (...args) => calls.push(["consoleError", ...args]) },
    getWorkOrders: () => workOrders,
    getActiveWorkOrderId: () => activeWorkOrderId,
    createQuickFixAsset: async (name, status) => {
      calls.push(["createAsset", name, status]);
      return { data: { id: "asset-new" }, error: null };
    },
    confirmAssetLocationRouting: () => true,
    requiredText: (value) => {
      const text = String(value || "").trim();
      if (!text) throw new Error("Issue is required.");
      return text;
    },
    descriptionWithAssignmentNote: (description) => description,
    locationIdForAsset: (assetId) => `location-${assetId || "none"}`,
    workOrderDateValue: () => null,
    assignedUserFromForm: () => "user-1",
    applySafetyRequirementPayload: (payload) => {
      payload.safety_check_required = overrides.safetyRequired || false;
    },
    blocksProcedureCompletion: () => overrides.procedureBlockMessage || "",
    setWorkOrderActionWarning: (...args) => calls.push(["warning", ...args]),
    applySafetyCheckPayload: (payload, checked) => {
      payload.safety_devices_checked = checked;
    },
    requiresSafetyDeviceCheck: (payload) => payload.safety_check_required,
    hasCompletedSafetyDeviceCheck: () => false,
    withOperationTimeout: async (operation) => operation,
    updateWorkOrderSafely: async (payload, id) => {
      calls.push(["update", id, payload]);
      return { error: overrides.updateError || null };
    },
    friendlyWorkOrderSaveError: (error) => error.message,
    updateAssetStatus: async (assetId, status) => {
      calls.push(["assetStatus", assetId, status]);
      return overrides.assetError || null;
    },
    recordWorkOrderEvent: async (id, type, summary) => {
      calls.push(["event", id, type, summary]);
      if (overrides.logError) throw overrides.logError;
    },
    describeWorkOrderChanges: () => "Changed fields.",
    showNotice: (message, tone) => calls.push(["notice", message, tone || "success"]),
    render: async () => calls.push(["render"]),
  });

  return {
    calls,
    errorTarget,
    values,
    run: async () => {
      const button = createSubmitButton();
      await workflow.updateWorkOrderQuickView({
        preventDefault: () => calls.push(["preventDefault"]),
        target: createForm(button),
      });
      return button;
    },
  };
}

(async () => {
  const success = createWorkflow();
  const successButton = await success.run();
  const updateCall = success.calls.find((call) => call[0] === "update");
  assert.equal(updateCall[1], "wo-1");
  assert.equal(updateCall[2].title, "Bearing noise");
  assert.equal(updateCall[2].completed_at, null);
  assert.equal(success.calls.some((call) => call[0] === "event" && call[2] === "quick_update"), true);
  assert.equal(success.calls.at(-1)[0], "render");
  assert.equal(successButton.disabled, true);

  const completed = createWorkflow({
    values: { status: "completed", safety_devices_checked: "on" },
    safetyRequired: true,
  });
  await completed.run();
  assert.equal(completed.calls.find((call) => call[0] === "update")[2].safety_devices_checked, true);
  assert.equal(typeof completed.calls.find((call) => call[0] === "update")[2].completed_at, "string");

  const blocked = createWorkflow({
    values: { status: "completed" },
    procedureBlockMessage: "Complete checklist first.",
  });
  const blockedButton = await blocked.run();
  assert.equal(blocked.errorTarget.textContent, "Complete checklist first.");
  assert.equal(blocked.calls.some((call) => call[0] === "update"), false);
  assert.equal(blockedButton.disabled, false);
  assert.equal(blockedButton.textContent, "Save Quick Update");

  const down = createWorkflow({ values: { machine_down: "on" } });
  await down.run();
  assert.equal(down.calls.some((call) => call[0] === "assetStatus" && call[2] === "offline"), true);

  console.log("work order quick update workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
