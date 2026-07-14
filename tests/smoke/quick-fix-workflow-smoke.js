const assert = require("node:assert/strict");

global.window = { alert() {} };

const { createQuickFixWorkflow } = require("../../src/workflows/quickFixWorkflow.js");

function fakeFormData(values) {
  return {
    get(name) {
      return Object.prototype.hasOwnProperty.call(values, name) ? values[name] : "";
    },
  };
}

function createWorkflow(formValues = {}) {
  const localCalls = [];
  const localErrorTarget = { textContent: "" };
  const localSubmitButton = { disabled: false, textContent: "Log Quick Fix", isConnected: true };
  const { createQuickFix } = createQuickFixWorkflow({
  documentRef: {
    querySelector(selector) {
      return selector === "#quick-fix-error" ? localErrorTarget : null;
    },
  },
  FormDataCtor: function FormDataCtor() {
    return fakeFormData({
      title: "QA quick fix workflow",
      description: "QA quick fix description",
      resolution_summary: "",
      mark_completed: "",
      machine_down: "",
      asset_id: "",
      new_asset_name: "",
      safety_devices_checked: "",
      procedure_template_id: "",
      assigned_to: "",
      priority: "medium",
      type: "corrective",
      due_at: "",
      failure_cause: "",
      follow_up_needed: "",
      completion_notes: "",
      part_id: "",
      quantity_used: "1",
      photo: { name: "" },
      asset_status: "",
      ...formValues,
    });
  },
  withOperationTimeout: async (operation) => operation,
  createQuickFixAsset: async () => ({ data: { id: "asset-new" }, error: null }),
  getMaintenanceRequests: () => [],
  getQuickFixRequestId: () => null,
  getActiveCompanyId: () => "company-1",
  getSession: () => ({ user: { id: "user-1" } }),
  getParts: () => [],
  getRequestsReady: () => true,
  getSupabaseClient: () => null,
  confirmAssetLocationRouting: () => true,
  assetRequiresSafety: () => false,
  blocksProcedureCompletion: () => "",
  setWorkOrderActionWarning: (...args) => localCalls.push(["setWorkOrderActionWarning", ...args]),
  locationIdForAsset: (assetId) => `location-${assetId || "none"}`,
  descriptionWithRequestPhotoNote: (description) => description,
  descriptionWithAssignmentNote: (description) => description,
  assignedUserFromForm: () => "user-1",
  procedureColumn: () => ({}),
  workOrderDateValue: (value) => value || null,
  applySafetyRequirementPayload: (payload) => {
    payload.safety_check_required = false;
  },
  applySafetyCheckPayload: (payload, checked) => {
    payload.safety_devices_checked = checked;
  },
  insertWithOptionalProcedure: async (table, payload, options) => {
    localCalls.push(["insert", table, payload, options.returnSingle]);
    return { data: { id: "wo-1" }, error: null };
  },
  friendlyWorkOrderSaveError: (error) => error.message,
  addPartUsageToWorkOrder: async () => null,
  addPhotoToWorkOrder: async () => null,
  updateAssetStatus: async () => null,
  recordWorkOrderEvent: async (id, type, summary) => {
    localCalls.push(["event", id, type, summary]);
  },
  setActiveWorkOrderIdState: (value) => localCalls.push(["activeWorkOrderId", value]),
  setActiveAssetIdState: (value) => localCalls.push(["activeAssetId", value]),
  setCreateWorkOrderMode: (value) => localCalls.push(["createWorkOrderMode", value]),
  setQuickFixMode: (value) => localCalls.push(["quickFixMode", value]),
  setQuickFixAssetId: (value) => localCalls.push(["quickFixAssetId", value]),
  setQuickFixRequestId: (value) => localCalls.push(["quickFixRequestId", value]),
  showNotice: (message, tone) => localCalls.push(["notice", message, tone || "success"]),
  render: async () => localCalls.push(["render"]),
});
  return { createQuickFix, calls: localCalls, errorTarget: localErrorTarget, submitButton: localSubmitButton };
}

(async () => {
  const defaultRun = createWorkflow();
  await defaultRun.createQuickFix({
    preventDefault: () => defaultRun.calls.push(["preventDefault"]),
    currentTarget: {
      querySelector(selector) {
        return selector === "button[type='submit']" ? defaultRun.submitButton : null;
      },
    },
  });

  assert.equal(defaultRun.errorTarget.textContent, "");
  assert.equal(defaultRun.submitButton.disabled, false);
  assert.equal(defaultRun.submitButton.textContent, "Log Quick Fix");
  assert.deepEqual(defaultRun.calls.filter((call) => call[0] === "insert").map((call) => [call[1], call[2].title, call[2].status, call[3]]), [["work_orders", "QA quick fix workflow", "open", true]]);
  assert.equal(defaultRun.calls.find((call) => call[0] === "insert")[2].description, "QA quick fix description");
  assert.deepEqual(defaultRun.calls.filter((call) => call[0] === "activeWorkOrderId"), [["activeWorkOrderId", "wo-1"]]);
  assert.deepEqual(defaultRun.calls.filter((call) => call[0] === "quickFixMode"), [["quickFixMode", false]]);
  assert.equal(defaultRun.calls.some((call) => call[0] === "event" && call[2] === "quick_fix"), true);
  assert.equal(defaultRun.calls.at(-1)[0], "render");

  const assetRun = createWorkflow({ asset_id: "asset-1" });
  await assetRun.createQuickFix({
    preventDefault: () => assetRun.calls.push(["preventDefault"]),
    currentTarget: {
      querySelector(selector) {
        return selector === "button[type='submit']" ? assetRun.submitButton : null;
      },
    },
  });
  const assetInsert = assetRun.calls.find((call) => call[0] === "insert");
  assert.equal(assetInsert[2].asset_id, "asset-1");
  assert.equal(assetInsert[2].location_id, "location-asset-1");

  const newAssetRun = createWorkflow({ asset_id: "", new_asset_name: "New Press" });
  await newAssetRun.createQuickFix({
    preventDefault: () => newAssetRun.calls.push(["preventDefault"]),
    currentTarget: {
      querySelector(selector) {
        return selector === "button[type='submit']" ? newAssetRun.submitButton : null;
      },
    },
  });
  assert.equal(newAssetRun.calls.find((call) => call[0] === "insert")[2].asset_id, "asset-new");

  const conflictingEquipment = createWorkflow({ asset_id: "asset-1", new_asset_name: "New Press" });
  await conflictingEquipment.createQuickFix({
    preventDefault: () => conflictingEquipment.calls.push(["preventDefault"]),
    currentTarget: {
      querySelector(selector) {
        return selector === "button[type='submit']" ? conflictingEquipment.submitButton : null;
      },
    },
  });
  assert.match(conflictingEquipment.errorTarget.textContent, /Choose existing equipment or create new equipment, not both/);
  assert.equal(conflictingEquipment.calls.some((call) => call[0] === "insert"), false);

  const deadlineRun = createWorkflow({ due_at: "2026-06-14" });
  await deadlineRun.createQuickFix({
    preventDefault: () => deadlineRun.calls.push(["preventDefault"]),
    currentTarget: {
      querySelector(selector) {
        return selector === "button[type='submit']" ? deadlineRun.submitButton : null;
      },
    },
  });
  const deadlineInsert = deadlineRun.calls.find((call) => call[0] === "insert");
  assert.equal(deadlineInsert[2].due_at, "2026-06-14");

  const fallbackRun = createWorkflow({ description: "" });
  await fallbackRun.createQuickFix({
    preventDefault: () => fallbackRun.calls.push(["preventDefault"]),
    currentTarget: {
      querySelector(selector) {
        return selector === "button[type='submit']" ? fallbackRun.submitButton : null;
      },
    },
  });
  const fallbackInsert = fallbackRun.calls.find((call) => call[0] === "insert");
  assert.equal(fallbackInsert[2].description, "QA quick fix workflow");

  console.log("quick fix workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
