const assert = require("node:assert/strict");

global.window = {};

const { createMediaStorageWorkflow } = require("../../src/workflows/mediaStorageWorkflow.js");

class FakeFormData {
  constructor(form) {
    this.values = form.formValues || {};
  }

  get(name) {
    return this.values[name] || "";
  }
}

function createSupabase(calls) {
  return {
    storage: {
      from(bucket) {
        return {
          upload(path, file, options) {
            calls.push(["upload", bucket, path, file.name || file.type, options.contentType]);
            return Promise.resolve({ error: null });
          },
          remove(paths) {
            calls.push(["remove", bucket, paths]);
            return Promise.resolve({ error: null });
          },
        };
      },
    },
    from(table) {
      return {
        insert(payload) {
          calls.push(["insert", table, payload]);
          return Promise.resolve({ error: null });
        },
      };
    },
    rpc(name, payload) {
      calls.push(["rpc", name, payload]);
      return Promise.resolve({ error: null });
    },
  };
}

function createWorkflow(options = {}) {
  const calls = [];
  const errors = {
    "#photo-error": { textContent: "" },
    '[data-part-document-error="part-1"]': { textContent: "" },
  };
  const workflow = createMediaStorageWorkflow({
    documentRef: {
      querySelector(selector) {
        return errors[selector] || null;
      },
      createElement() {
        throw new Error("optimizePhotoOverride should avoid canvas in this smoke");
      },
    },
    FormDataCtor: FakeFormData,
    cryptoRef: { randomUUID: () => "uuid-1" },
    consoleRef: { warn: (...args) => calls.push(["warn", ...args]) },
    supabaseClient: () => createSupabase(calls),
    withOperationTimeout: async (operation) => await operation,
    getActiveCompanyId: () => "company-1",
    getActiveWorkOrderId: () => "wo-1",
    getSession: () => ({ user: { id: "user-1" } }),
    safeFileName: (name) => String(name).replace(/\s+/g, "-"),
    fileBaseName: (name) => String(name).replace(/\.[^.]+$/, ""),
    isColumnSchemaError: () => false,
    ensureProfileForActiveCompany: async () => options.hasProfile !== false,
    getAppError: () => "Profile unavailable",
    recordWorkOrderEvent: async (id, type, summary) => calls.push(["event", id, type, summary]),
    getPartDocumentsReady: () => options.partDocumentsReady !== false,
    setPartDocumentsReady: (value) => calls.push(["partDocumentsReady", value]),
    setPhotosReady: (value) => calls.push(["photosReady", value]),
    setRequestPhotosReady: (value) => calls.push(["requestPhotosReady", value]),
    showNotice: (message, tone) => calls.push(["notice", message, tone || "success"]),
    render: async () => calls.push(["render"]),
    optimizePhotoOverride: async (file) => ({
      blob: { name: "optimized", size: 123 },
      fileName: "optimized.jpg",
      contentType: "image/jpeg",
    }),
  });
  return { workflow, calls, errors };
}

(async () => {
  const workPhoto = createWorkflow();
  const workError = await workPhoto.workflow.addPhotoToWorkOrder("wo-1", { name: "raw photo.png", type: "image/png", size: 999 });
  assert.equal(workError, null);
  assert.equal(workPhoto.calls.some((call) => call[0] === "upload" && call[1] === "work-order-photos" && call[2] === "company-1/wo-1/uuid-1-optimized.jpg"), true);
  assert.equal(workPhoto.calls.some((call) => call[0] === "insert" && call[1] === "work_order_photos" && call[2].file_size_bytes === 123), true);

  const requestPhoto = createWorkflow();
  const requestError = await requestPhoto.workflow.addPhotoToMaintenanceRequest("request-1", { name: "request.png", type: "image/png", size: 321 });
  assert.equal(requestError, null);
  assert.equal(requestPhoto.calls.some((call) => call[0] === "upload" && call[1] === "maintenance-request-photos" && call[2] === "request-1/uuid-1-optimized.jpg"), true);
  assert.equal(requestPhoto.calls.some((call) => call[0] === "rpc" && call[1] === "attach_maintenance_request_photo" && call[2].target_request_id === "request-1"), true);

  const partDoc = createWorkflow();
  const button = { disabled: false, textContent: "Attach File" };
  await partDoc.workflow.uploadPartDocument({
    preventDefault() {},
    currentTarget: {
      dataset: { partDocument: "part-1" },
      formValues: { document: { name: "receipt.pdf", type: "application/pdf" } },
      querySelector(selector) {
        return selector === "button[type='submit']" ? button : null;
      },
    },
  });
  assert.equal(partDoc.calls.some((call) => call[0] === "upload" && call[1] === "part-documents"), true);
  assert.equal(partDoc.calls.some((call) => call[0] === "insert" && call[1] === "part_documents"), true);
  assert.equal(button.disabled, false);

  const upload = createWorkflow();
  const uploadButton = { disabled: false, textContent: "Upload Photo" };
  await upload.workflow.uploadPhoto({
    preventDefault() {},
    currentTarget: {
      formValues: { photo: { name: "work.jpg", type: "image/jpeg", size: 99 } },
      querySelector(selector) {
        return selector === "button[type='submit']" ? uploadButton : null;
      },
    },
  });
  assert.equal(upload.calls.some((call) => call[0] === "event" && call[2] === "photo_uploaded"), true);
  assert.equal(upload.calls.some((call) => call[0] === "notice" && call[1] === "Photo uploaded."), true);

  console.log("media storage workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
