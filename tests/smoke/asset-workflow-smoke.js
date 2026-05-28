const assert = require("node:assert/strict");

global.window = {};

const { createAssetWorkflow } = require("../../src/workflows/assetWorkflow.js");

function createElement({ formValues = {}, buttonText = "Submit" } = {}) {
  const button = { disabled: false, textContent: buttonText };
  return {
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
        calls.push(["select", table, options || null]);
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
    getActiveCompanyId: () => "company-1",
    getActiveAssetId: () => "asset-1",
    getWorkOrders: () => [{ id: "wo-1", asset_id: "asset-2" }],
    getPreventiveSchedules: () => [],
    getMaintenanceRequests: () => [],
    activeLocationDatabaseId: () => "location-1",
    childAssetsFor: (id) => (id === "parent-1" ? [{ id: "child-1" }] : []),
    requiredText: (value, label) => {
      const text = String(value || "").trim();
      if (!text) throw new Error(`${label} is required.`);
      return text;
    },
    isMissingColumnError: () => false,
    isAssetHierarchySchemaError: () => false,
    databaseSetupRequiredMessage: (label) => `setup ${label}`,
    equipmentSchemaMessage: () => "equipment schema missing",
    assetDeleteBlockerMessage: (blockers) => Object.values(blockers).some(Boolean) ? "Equipment has linked records." : "",
    canDeleteEquipment: () => options.canDeleteEquipment !== false,
    setLocationsReady: (value) => calls.push(["locationsReady", value]),
    setPendingDeleteAssetId: (value) => calls.push(["pendingDeleteAssetId", value]),
    setActiveAssetId: (value) => calls.push(["activeAssetId", value]),
    setActiveSection: (value) => calls.push(["activeSection", value]),
    showNotice: (message, tone) => calls.push(["notice", message, tone || "success"]),
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
      location: "Line 1",
      parent_asset_id: "",
      asset_type: "pump",
      safety_devices_required: "on",
    },
  });
  await create.workflow.createAsset({ preventDefault() {}, currentTarget: createForm });
  assert.equal(create.calls.some((call) => call[0] === "insert" && call[1] === "assets" && call[2].name === "Pump 1"), true);
  assert.equal(create.calls.some((call) => call[0] === "notice" && call[1] === "Equipment added."), true);
  assert.equal(createForm.button.disabled, false);
  assert.equal(createForm.button.textContent, "Add Equipment");

  const update = createWorkflow();
  const editForm = createElement({
    buttonText: "Save Equipment",
    formValues: {
      name: "Pump 2",
      location_id: "location-2",
      status: "watch",
    },
  });
  await update.workflow.updateAsset({ preventDefault() {}, currentTarget: editForm });
  assert.equal(update.calls.some((call) => call[0] === "update" && call[1] === "assets" && call[2].status === "watch"), true);
  assert.equal(update.calls.some((call) => call[0] === "eq" && call[2] === "id" && call[3] === "asset-1"), true);

  const status = createWorkflow();
  const statusError = await status.workflow.updateAssetStatus("asset-1", "offline");
  assert.equal(statusError, null);
  assert.equal(status.calls.some((call) => call[0] === "update" && call[2].status === "offline"), true);

  const blocked = createWorkflow();
  assert.equal(blocked.workflow.assetHasDeleteBlockers("asset-2"), true);
  assert.equal(blocked.workflow.assetHasDeleteBlockers("asset-clear"), false);

  const requested = createWorkflow();
  await requested.workflow.requestDeleteAsset("asset-1");
  assert.deepEqual(requested.calls.filter((call) => call[0] === "pendingDeleteAssetId"), [["pendingDeleteAssetId", "asset-1"]]);
  assert.equal(requested.calls.some((call) => call[0] === "renderWorkspace"), true);

  const deleted = createWorkflow();
  await deleted.workflow.deleteAsset("asset-1");
  assert.equal(deleted.calls.some((call) => call[0] === "delete" && call[1] === "assets"), true);
  assert.equal(deleted.calls.some((call) => call[0] === "activeAssetId" && call[1] === null), true);
  assert.equal(deleted.calls.some((call) => call[0] === "activeSection" && call[1] === "assets"), true);

  const quickFix = createWorkflow();
  const response = await quickFix.workflow.createQuickFixAsset("New machine", "running");
  assert.equal(response.error, null);
  assert.equal(quickFix.calls.some((call) => call[0] === "insert" && call[2].name === "New machine"), true);

  console.log("asset workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
