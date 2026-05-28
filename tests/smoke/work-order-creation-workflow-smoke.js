const assert = require("node:assert/strict");

global.window = {};

const { createWorkOrderCreationWorkflow } = require("../../src/workflows/workOrderCreationWorkflow.js");

function fakeFormData(values) {
  return {
    get(name) {
      return Object.prototype.hasOwnProperty.call(values, name) ? values[name] : "";
    },
  };
}

function createForm(button, values) {
  return {
    formValues: values,
    querySelector(selector) {
      return selector === "button[type='submit']" ? button : null;
    },
  };
}

function createWorkflow(overrides = {}) {
  const calls = [];
  const errorTarget = { textContent: "" };
  const values = {
    title: "Create work order",
    description: "Description",
    assigned_to: "",
    status: "open",
    asset_id: "asset-1",
    new_asset_name: "",
    safety_devices_checked: "",
    procedure_template_id: "",
    priority: "medium",
    type: "reactive",
    due_at: "",
    actual_minutes: "",
    failure_cause: "",
    resolution_summary: "",
    follow_up_needed: "",
    completion_notes: "",
    part_id: "",
    quantity_used: "1",
    photo: { name: "" },
    initial_comment: "",
    ...(overrides.values || {}),
  };

  const { createWorkOrder } = createWorkOrderCreationWorkflow({
    documentRef: {
      querySelector(selector) {
        return selector === "#create-work-order-error" ? errorTarget : null;
      },
    },
    FormDataCtor: function FormDataCtor(form) {
      return fakeFormData(form.formValues);
    },
    alertRef: (message) => calls.push(["alert", message]),
    withOperationTimeout: async (operation) => await operation,
    createQuickFixAsset: async (name, status) => {
      calls.push(["createAsset", name, status]);
      return { data: { id: "asset-new" }, error: null };
    },
    getActiveCompanyId: () => "company-1",
    getSession: () => ({ user: { id: "user-1" } }),
    getParts: () => [{ id: "part-1", name: "Bearing" }],
    confirmAssetLocationRouting: () => true,
    assetRequiresSafety: () => overrides.assetRequiresSafety || false,
    blocksProcedureCompletion: () => overrides.procedureBlockMessage || "",
    setWorkOrderActionWarning: (...args) => calls.push(["warning", ...args]),
    locationIdForAsset: (assetId) => `location-${assetId || "none"}`,
    requiredText: (value, label) => {
      const text = String(value || "").trim();
      if (!text) throw new Error(`${label} is required.`);
      return text;
    },
    descriptionWithAssignmentNote: (description) => description,
    assignedUserFromForm: () => "user-1",
    procedureColumn: (value) => value ? { procedure_template_id: value } : {},
    workOrderDateValue: () => null,
    applySafetyRequirementPayload: (payload) => {
      payload.safety_check_required = overrides.safetyRequired || false;
    },
    applySafetyCheckPayload: (payload, checked) => {
      payload.safety_devices_checked = checked;
    },
    insertWithOptionalProcedure: async (table, payload) => {
      calls.push(["insert", table, payload]);
      return { data: { id: "wo-1" }, error: overrides.insertError || null };
    },
    friendlyWorkOrderSaveError: (error) => error.message,
    recordWorkOrderEvent: async (id, type, summary) => calls.push(["event", id, type, summary]),
    addPartUsageToWorkOrder: async (id, part, quantity) => {
      calls.push(["part", id, part?.name, quantity]);
      return overrides.partError || null;
    },
    addPhotoToWorkOrder: async (id, photo) => {
      calls.push(["photo", id, photo.name]);
      return overrides.photoError || null;
    },
    addCommentToWorkOrder: async (id, body) => {
      calls.push(["comment", id, body]);
      return overrides.commentError || null;
    },
    setActiveWorkOrderId: (value) => calls.push(["activeWorkOrderId", value]),
    setCreateWorkOrderMode: (value) => calls.push(["createWorkOrderMode", value]),
    showNotice: (message, tone) => calls.push(["notice", message, tone || "success"]),
    render: async () => calls.push(["render"]),
  });

  return {
    calls,
    errorTarget,
    run: async () => {
      const button = { disabled: false, textContent: "Create Work Order" };
      await createWorkOrder({
        preventDefault: () => calls.push(["preventDefault"]),
        target: createForm(button, values),
      });
      return button;
    },
  };
}

(async () => {
  const normal = createWorkflow();
  const normalButton = await normal.run();
  assert.equal(normal.calls.some((call) => call[0] === "insert" && call[2].title === "Create work order"), true);
  assert.equal(normal.calls.some((call) => call[0] === "event" && call[2] === "created"), true);
  assert.deepEqual(normal.calls.filter((call) => call[0] === "activeWorkOrderId"), [["activeWorkOrderId", "wo-1"]]);
  assert.equal(normalButton.disabled, false);

  const withExtras = createWorkflow({
    values: {
      new_asset_name: "New pump",
      part_id: "part-1",
      quantity_used: "2",
      photo: { name: "photo.jpg" },
      initial_comment: "Initial note",
    },
  });
  await withExtras.run();
  assert.equal(withExtras.calls.some((call) => call[0] === "createAsset" && call[1] === "New pump"), true);
  assert.equal(withExtras.calls.some((call) => call[0] === "part" && call[3] === 2), true);
  assert.equal(withExtras.calls.some((call) => call[0] === "photo" && call[2] === "photo.jpg"), true);
  assert.equal(withExtras.calls.some((call) => call[0] === "comment" && call[2] === "Initial note"), true);

  const safetyBlocked = createWorkflow({
    assetRequiresSafety: true,
    values: { status: "completed", safety_devices_checked: "" },
  });
  const safetyButton = await safetyBlocked.run();
  assert.equal(safetyBlocked.errorTarget.textContent, "Check safety devices before creating completed work tied to equipment.");
  assert.equal(safetyBlocked.calls.some((call) => call[0] === "insert"), false);
  assert.equal(safetyButton.textContent, "Create Work Order");

  const procedureBlocked = createWorkflow({
    values: { status: "completed", safety_devices_checked: "on" },
    procedureBlockMessage: "Checklist incomplete.",
  });
  await procedureBlocked.run();
  assert.equal(procedureBlocked.errorTarget.textContent, "Checklist incomplete. Create the work order first, then complete the checklist before marking it complete.");
  assert.equal(procedureBlocked.calls.some((call) => call[0] === "insert"), false);

  console.log("work order creation workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
