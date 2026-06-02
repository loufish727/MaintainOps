const assert = require("node:assert/strict");

global.window = {};

const { createRequestLifecycleWorkflow } = require("../../src/workflows/requestLifecycleWorkflow.js");

function createElement({ formValues = {}, buttonText = "Submit" } = {}) {
  const button = { disabled: false, textContent: buttonText };
  return {
    formValues,
    innerHTML: "",
    querySelector(selector) {
      return selector === "button[type='submit']" ? button : null;
    },
    button,
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

function createDocument(elements) {
  return {
    querySelector(selector) {
      return elements[selector] || null;
    },
  };
}

function createSupabase(calls) {
  function query(table) {
    let action = "";
    const api = {
      insert(payload) {
        action = "insert";
        calls.push(["insert", table, payload]);
        return api;
      },
      update(payload) {
        action = "update";
        calls.push(["update", table, payload]);
        return api;
      },
      delete() {
        action = "delete";
        calls.push(["delete", table]);
        return api;
      },
      select(columns) {
        calls.push(["select", table, columns || null]);
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
      maybeSingle() {
        calls.push(["maybeSingle", table]);
        return Promise.resolve({ data: null, error: null });
      },
      then(resolve) {
        if (action === "delete") resolve({ data: [{ id: "request-1" }], error: null });
        else if (action === "insert" && table === "maintenance_requests") resolve({ data: { id: "request-new" }, error: null });
        else resolve({ data: null, error: null });
      },
    };
    return api;
  }

  return {
    from(table) {
      return query(table);
    },
    storage: {
      from(bucket) {
        return {
          remove(paths) {
            calls.push(["storageRemove", bucket, paths]);
            return Promise.resolve({ error: null });
          },
        };
      },
    },
  };
}

function createWorkflow(options = {}) {
  const calls = [];
  const elements = {
    "#request-error": { textContent: "" },
    "#detail-panel": { innerHTML: "" },
    '[data-convert-request="request-1"]': { disabled: false, textContent: "Convert to Work Order" },
    '[data-confirm-delete-request="request-1"]': { disabled: false, textContent: "Permanently Delete" },
  };
  const requests = options.requests || [{
    id: "request-1",
    title: "Pump leaking",
    description: "Water on floor",
    asset_id: "asset-1",
    location_id: "location-1",
    priority: "high",
    photo_storage_path: "company/request.jpg",
  }];

  const workflow = createRequestLifecycleWorkflow({
    documentRef: createDocument(elements),
    FormDataCtor: FakeFormData,
    alertRef: (message) => calls.push(["alert", message]),
    CSSRef: { escape: (value) => value },
    supabaseClient: () => createSupabase(calls),
    withOperationTimeout: async (operation) => await operation,
    getActiveCompanyId: () => "company-1",
    getSession: () => ({ user: { id: "user-1" } }),
    getRequestsReady: () => options.requestsReady !== false,
    getMaintenanceRequests: () => requests,
    renderRequestFormContent: () => "<form>request</form>",
    confirmAssetLocationRouting: () => true,
    locationIdForAsset: (assetId) => assetId ? "location-1" : null,
    requiredText: (value, label) => {
      const text = String(value || "").trim();
      if (!text) throw new Error(`${label} is required.`);
      return text;
    },
    isMissingColumnError: () => false,
    databaseSetupRequiredMessage: (label) => `setup ${label}`,
    addPhotoToMaintenanceRequest: async (id, photo) => {
      calls.push(["photo", id, photo.name]);
      return null;
    },
    setLocationsReady: (value) => calls.push(["locationsReady", value]),
    setActiveSection: (value) => calls.push(["activeSection", value]),
    setActiveWorkOrderId: (value) => calls.push(["activeWorkOrderId", value]),
    setActiveAssetId: (value) => calls.push(["activeAssetId", value]),
    setRequestViewFilter: (value) => calls.push(["requestViewFilter", value]),
    resetRequestsPage: () => calls.push(["resetRequestsPage"]),
    descriptionWithRequestPhotoNote: (description) => `${description} photo-note`,
    applySafetyRequirementPayload: (payload) => { payload.safety_check_required = false; },
    applySafetyCheckPayload: (payload, checked) => { payload.safety_devices_checked = checked; },
    insertWithOptionalProcedure: async (table, payload) => {
      calls.push(["insertWorkOrder", table, payload]);
      return { data: { id: "wo-1" }, error: null };
    },
    recordWorkOrderEvent: async (id, type) => calls.push(["event", id, type]),
    setQuickFixRequestId: (value) => calls.push(["quickFixRequestId", value]),
    setQuickFixAssetId: (value) => calls.push(["quickFixAssetId", value]),
    setQuickFixMode: (value) => calls.push(["quickFixMode", value]),
    setCreateWorkOrderMode: (value) => calls.push(["createWorkOrderMode", value]),
    setPendingDeleteRequestId: (value) => calls.push(["pendingDeleteRequestId", value]),
    canDeleteOperationalRecords: () => options.canDelete !== false,
    showNotice: (message, tone) => calls.push(["notice", message, tone || "success"]),
    render: async () => calls.push(["render"]),
    renderWorkspace: () => calls.push(["renderWorkspace"]),
  });

  return { workflow, calls, elements };
}

(async () => {
  const created = createWorkflow();
  const requestForm = createElement({
    buttonText: "Submit Request",
    formValues: {
      title: "Request title",
      requester_name: "Lee Requester",
      equipment_note: "Thalmann line",
      description: "Request description",
      asset_id: "asset-1",
      priority: "medium",
      photo: { name: "request.jpg" },
    },
  });
  await created.workflow.createRequest({ preventDefault() {}, target: requestForm });
  assert.equal(created.calls.some((call) => call[0] === "insert" && call[1] === "maintenance_requests"), true);
  assert.equal(created.calls.some((call) => call[0] === "insert" && call[1] === "maintenance_requests" && call[2].requested_by_name === "Lee Requester"), true);
  assert.equal(created.calls.some((call) => call[0] === "insert" && call[1] === "maintenance_requests" && /Machine \/ area: Thalmann line/.test(call[2].description)), true);
  assert.equal(created.calls.some((call) => call[0] === "photo" && call[1] === "request-new"), true);
  assert.equal(created.calls.some((call) => call[0] === "activeSection" && call[1] === "requests"), true);
  assert.equal(requestForm.button.disabled, false);

  const converted = createWorkflow();
  await converted.workflow.convertRequestToWorkOrder("request-1");
  assert.equal(converted.calls.some((call) => call[0] === "insertWorkOrder" && call[2].title === "Pump leaking"), true);
  assert.equal(converted.calls.some((call) => call[0] === "update" && call[1] === "maintenance_requests"), true);
  assert.equal(converted.calls.some((call) => call[0] === "activeWorkOrderId" && call[1] === "wo-1"), true);

  const quickFix = createWorkflow();
  quickFix.workflow.openQuickFixForRequest("request-1");
  assert.deepEqual(quickFix.calls.filter((call) => call[0].startsWith("quickFix")), [
    ["quickFixRequestId", "request-1"],
    ["quickFixAssetId", "asset-1"],
    ["quickFixMode", true],
  ]);

  const requestedDelete = createWorkflow();
  requestedDelete.workflow.requestDeleteMaintenanceRequest("request-1");
  assert.equal(requestedDelete.calls.some((call) => call[0] === "pendingDeleteRequestId" && call[1] === "request-1"), true);

  const deleted = createWorkflow();
  await deleted.workflow.deleteMaintenanceRequest("request-1");
  assert.equal(deleted.calls.some((call) => call[0] === "storageRemove"), true);
  assert.equal(deleted.calls.some((call) => call[0] === "delete" && call[1] === "maintenance_requests"), true);
  assert.equal(deleted.calls.some((call) => call[0] === "pendingDeleteRequestId" && call[1] === null), true);

  const renderForm = createWorkflow();
  renderForm.workflow.renderRequestForm();
  assert.equal(renderForm.elements["#detail-panel"].innerHTML, "<form>request</form>");

  console.log("request lifecycle workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
