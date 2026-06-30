const assert = require("node:assert/strict");

global.window = {};

const { createAssetWorkflow } = require("../../src/workflows/assetWorkflow.js");

function createElement({ formValues = {}, buttonText = "Submit", dataset = {} } = {}) {
  const button = { disabled: false, textContent: buttonText };
  return {
    dataset,
    formValues,
    querySelector(selector) {
      return selector === "button[type='submit']" ? button : null;
    },
    button,
  };
}

function createDocument(selectors = {}) {
  const elements = new Map(Object.entries(selectors));
  return {
    querySelector(selector) {
      if (elements.has(selector)) return elements.get(selector);
      return null;
    },
  };
}

class FakeFormData {
  constructor(form) {
    this.values = form.formValues || {};
  }

  get(name) {
    return this.values[name] || "";
  }
}

function createSupabase(calls, responses = {}) {
  function query(table) {
    const state = { table, action: "", payload: null };
  const api = {
      insert(payload) {
        state.action = "insert";
        state.payload = payload;
        calls.push(["insert", table, payload]);
        return api;
      },
      update(payload) {
        state.action = "update";
        state.payload = payload;
        calls.push(["update", table, payload]);
        return api;
      },
      delete() {
        state.action = "delete";
        calls.push(["delete", table]);
        return api;
      },
      select(_columns, options) {
        state.action = state.action || "select";
        calls.push(["select", table, _columns || null, options || null]);
        return api;
      },
      eq(column, value) {
        calls.push(["eq", table, column, value]);
        return api;
      },
      single() {
        calls.push(["single", table]);
        return api;
      },
      then(resolve) {
        const key = `${state.action}:${table}`;
        resolve(responses[key] || { data: { id: "asset-new" }, count: 0, error: null });
      },
    };
    return api;
  }

  return {
    from(table) {
      return query(table);
    },
  };
}

function createWorkflow(options = {}) {
  const calls = [];
  const errors = {
    "#asset-create-error": { textContent: "" },
    "#asset-edit-error": { textContent: "" },
    "#asset-delete-error": { textContent: "" },
    '[data-asset-part-error="asset-1"]': { textContent: "" },
    '[data-confirm-delete-asset="asset-1"]': { disabled: false, textContent: "Permanently Delete" },
  };
  const workflow = createAssetWorkflow({
    documentRef: createDocument(errors),
    FormDataCtor: FakeFormData,
    alertRef: (message) => calls.push(["alert", message]),
    CSSRef: { escape: (value) => value },
    supabaseClient: () => createSupabase(calls, options.responses),
    withOperationTimeout: async (operation) => await operation,
    withSetupError: (response, message) => ({ ...response, setupMessage: message }),
    getSession: () => ({ user: { id: "user-1" } }),
    getAssets: () => [{ id: "asset-1", name: "Pump 1", status: "running", location: "Line 1", location_id: "location-1", asset_type: "machine", safety_devices_required: true }],
    getActiveCompanyId: () => "company-1",
    getActiveAssetId: () => "asset-1",
    getWorkOrders: () => [{ id: "wo-1", asset_id: "asset-2" }],
    getPreventiveSchedules: () => [],
    getMaintenanceRequests: () => [],
    getAssetDocumentStoragePaths: () => options.assetDocumentPaths || [],
    removeAssetDocumentStorage: async (paths) => {
      calls.push(["storageRemove", "asset-documents", paths]);
      return { error: null };
    },
    activeLocationDatabaseId: () => "location-1",
    childAssetsFor: (id) => (id === "parent-1" ? [{ id: "child-1" }] : []),
    requiredText: (value, label) => {
      const text = String(value || "").trim();
      if (!text) throw new Error(`${label} is required.`);
      return text;
    },
    isMissingColumnError: () => false,
    isMissingTableError: () => false,
    isAssetHierarchySchemaError: () => false,
    databaseSetupRequiredMessage: (label) => `setup ${label}`,
    equipmentSchemaMessage: () => "equipment schema missing",
    assetDeleteBlockerMessage: (blockers) => Object.values(blockers).some(Boolean) ? "Equipment has linked records." : "",
    canDeleteEquipment: () => options.canDeleteEquipment !== false,
    setAssetPartsReady: (value) => calls.push(["assetPartsReady", value]),
    setLocationsReady: (value) => calls.push(["locationsReady", value]),
    setPendingDeleteAssetId: (value) => calls.push(["pendingDeleteAssetId", value]),
    setActiveAssetId: (value) => calls.push(["activeAssetId", value]),
    setActiveSection: (value) => calls.push(["activeSection", value]),
    showNotice: (message, tone) => calls.push(["notice", message, tone || "success"]),
    recordAssetEvent: async (assetId, eventType, summary) => calls.push(["assetEvent", assetId, eventType, summary]),
    render: async () => calls.push(["render"]),
    renderWorkspace: () => calls.push(["renderWorkspace"]),
  });

  return { workflow, calls, errors };
}

(async () => {
  const create = createWorkflow();
  const createForm = createElement({
    buttonText: "Add Equipment",
    formValues: {
      name: "Pump 1",
      location_id: "",
      asset_code: "P-1",
      location_existing: "Line 1",
      location_new: "",
      parent_asset_id: "",
      asset_type: "tooling",
      safety_devices_required: "on",
    },
  });
  await create.workflow.createAsset({ preventDefault() {}, currentTarget: createForm });
  assert.equal(create.calls.some((call) => call[0] === "insert" && call[1] === "assets" && call[2].name === "Pump 1" && call[2].asset_type === "tooling"), true);
  assert.equal(create.calls.some((call) => call[0] === "insert" && call[1] === "assets" && call[2].created_by === "user-1"), true);
  assert.equal(create.calls.some((call) => call[0] === "insert" && call[1] === "assets" && call[2].location === "Line 1"), true);
  assert.equal(create.calls.some((call) => call[0] === "assetEvent" && call[2] === "created"), true);
  assert.equal(create.calls.some((call) => call[0] === "notice" && call[1] === "Equipment added."), true);
  assert.equal(createForm.button.disabled, false);
  assert.equal(createForm.button.textContent, "Add Equipment");

  const continued = createWorkflow();
  const continueForm = createElement({
    buttonText: "Save Equipment and Continue",
    formValues: {
      name: "Press 2",
      location_id: "location-1",
      asset_code: "P-2",
      location_existing: "Bay 2",
      location_new: "",
      parent_asset_id: "",
      asset_type: "machine",
      safety_devices_required: "on",
    },
  });
  await continued.workflow.createAsset({
    preventDefault() {},
    currentTarget: continueForm,
    submitter: { dataset: { assetContinue: "true" } },
  });
  assert.equal(continued.calls.some((call) => call[0] === "select" && call[1] === "assets" && call[2] === "id"), true);
  assert.equal(continued.calls.some((call) => call[0] === "single" && call[1] === "assets"), true);
  assert.equal(continued.calls.some((call) => call[0] === "activeAssetId" && call[1] === "asset-new"), true);
  assert.equal(continued.calls.some((call) => call[0] === "notice" && call[1].includes("Equipment saved. Add PM")), true);

  const update = createWorkflow();
  const editForm = createElement({
    buttonText: "Save Equipment",
    formValues: {
      name: "Pump 2",
      location_id: "location-2",
      location_existing: "Line 1",
      location_new: "Line 2",
      status: "watch",
    },
  });
  await update.workflow.updateAsset({ preventDefault() {}, currentTarget: editForm });
  assert.equal(update.calls.some((call) => call[0] === "update" && call[1] === "assets" && call[2].status === "watch"), true);
  assert.equal(update.calls.some((call) => call[0] === "update" && call[1] === "assets" && call[2].location === "Line 2"), true);
  assert.equal(update.calls.some((call) => call[0] === "assetEvent" && call[2] === "updated" && call[3].includes("status")), true);
  assert.equal(update.calls.some((call) => call[0] === "eq" && call[2] === "id" && call[3] === "asset-1"), true);

  const status = createWorkflow();
  const statusError = await status.workflow.updateAssetStatus("asset-1", "offline");
  assert.equal(statusError, null);
  assert.equal(status.calls.some((call) => call[0] === "update" && call[2].status === "offline"), true);
  assert.equal(status.calls.some((call) => call[0] === "assetEvent" && call[2] === "status_changed"), true);

  const attached = createWorkflow();
  const attachForm = createElement({
    buttonText: "Attach Part",
    dataset: { attachAssetPart: "asset-1" },
    formValues: {
      part_id: "part-1",
      quantity_recommended: "3",
      note: "drive belt",
    },
  });
  await attached.workflow.attachAssetPart({ preventDefault() {}, currentTarget: attachForm });
  assert.equal(attached.calls.some((call) => call[0] === "insert" && call[1] === "asset_parts" && call[2].part_id === "part-1" && call[2].quantity_recommended === 3), true);
  assert.equal(attached.calls.some((call) => call[0] === "notice" && call[1] === "Part linked to equipment."), true);

  const removed = createWorkflow();
  await removed.workflow.removeAssetPart("asset-part-1");
  assert.equal(removed.calls.some((call) => call[0] === "delete" && call[1] === "asset_parts"), true);
  assert.equal(removed.calls.some((call) => call[0] === "eq" && call[2] === "id" && call[3] === "asset-part-1"), true);
  assert.equal(removed.calls.some((call) => call[0] === "notice" && call[1] === "Part link removed."), true);

  const blocked = createWorkflow();
  assert.equal(blocked.workflow.assetHasDeleteBlockers("asset-2"), true);
  assert.equal(blocked.workflow.assetHasDeleteBlockers("asset-clear"), false);

  const requested = createWorkflow();
  await requested.workflow.requestDeleteAsset("asset-1");
  assert.deepEqual(requested.calls.filter((call) => call[0] === "pendingDeleteAssetId"), [["pendingDeleteAssetId", "asset-1"]]);
  assert.equal(requested.calls.some((call) => call[0] === "renderWorkspace"), true);

  const deleted = createWorkflow({ assetDocumentPaths: ["company-1/asset-1/photo.jpg", "company-1/asset-1/settings.pdf"] });
  await deleted.workflow.deleteAsset("asset-1");
  assert.equal(deleted.calls.some((call) => call[0] === "storageRemove" && call[1] === "asset-documents" && call[2].length === 2), true);
  assert.equal(deleted.calls.some((call) => call[0] === "delete" && call[1] === "assets"), true);
  assert.equal(deleted.calls.some((call) => call[0] === "activeAssetId" && call[1] === null), true);
  assert.equal(deleted.calls.some((call) => call[0] === "activeSection" && call[1] === "assets"), true);

  const quickFix = createWorkflow();
  const response = await quickFix.workflow.createQuickFixAsset("New machine", "running");
  assert.equal(response.error, null);
  assert.equal(quickFix.calls.some((call) => call[0] === "insert" && call[2].name === "New machine"), true);
  assert.equal(quickFix.calls.some((call) => call[0] === "assetEvent" && call[2] === "created"), true);

  console.log("asset workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
