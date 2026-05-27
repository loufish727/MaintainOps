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

const submitButton = { disabled: false, textContent: "Log Quick Fix", isConnected: true };
const errorTarget = { textContent: "" };
const calls = [];

const { createQuickFix } = createQuickFixWorkflow({
  documentRef: {
    querySelector(selector) {
      return selector === "#quick-fix-error" ? errorTarget : null;
    },
  },
  FormDataCtor: function FormDataCtor() {
    return fakeFormData({
      title: "QA quick fix workflow",
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
  setWorkOrderActionWarning: (...args) => calls.push(["setWorkOrderActionWarning", ...args]),
  locationIdForAsset: () => "location-1",
  descriptionWithRequestPhotoNote: (description) => description,
  descriptionWithAssignmentNote: (description) => description,
  assignedUserFromForm: () => "user-1",
  procedureColumn: () => ({}),
  workOrderDateValue: () => null,
  applySafetyRequirementPayload: (payload) => {
    payload.safety_check_required = false;
  },
  applySafetyCheckPayload: (payload, checked) => {
    payload.safety_devices_checked = checked;
  },
  insertWithOptionalProcedure: async (table, payload, options) => {
    calls.push(["insert", table, payload.title, payload.status, options.returnSingle]);
    return { data: { id: "wo-1" }, error: null };
  },
  friendlyWorkOrderSaveError: (error) => error.message,
  addPartUsageToWorkOrder: async () => null,
  addPhotoToWorkOrder: async () => null,
  updateAssetStatus: async () => null,
  recordWorkOrderEvent: async (id, type, summary) => {
    calls.push(["event", id, type, summary]);
  },
  setActiveWorkOrderIdState: (value) => calls.push(["activeWorkOrderId", value]),
  setActiveAssetIdState: (value) => calls.push(["activeAssetId", value]),
  setCreateWorkOrderMode: (value) => calls.push(["createWorkOrderMode", value]),
  setQuickFixMode: (value) => calls.push(["quickFixMode", value]),
  setQuickFixAssetId: (value) => calls.push(["quickFixAssetId", value]),
  setQuickFixRequestId: (value) => calls.push(["quickFixRequestId", value]),
  showNotice: (message, tone) => calls.push(["notice", message, tone || "success"]),
  render: async () => calls.push(["render"]),
});

(async () => {
  await createQuickFix({
    preventDefault: () => calls.push(["preventDefault"]),
    currentTarget: {
      querySelector(selector) {
        return selector === "button[type='submit']" ? submitButton : null;
      },
    },
  });

  assert.equal(errorTarget.textContent, "");
  assert.equal(submitButton.disabled, false);
  assert.equal(submitButton.textContent, "Log Quick Fix");
  assert.deepEqual(calls.filter((call) => call[0] === "insert"), [["insert", "work_orders", "QA quick fix workflow", "open", true]]);
  assert.deepEqual(calls.filter((call) => call[0] === "activeWorkOrderId"), [["activeWorkOrderId", "wo-1"]]);
  assert.deepEqual(calls.filter((call) => call[0] === "quickFixMode"), [["quickFixMode", false]]);
  assert.equal(calls.some((call) => call[0] === "event" && call[2] === "quick_fix"), true);
  assert.equal(calls.at(-1)[0], "render");

  console.log("quick fix workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
