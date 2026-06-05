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
        delete() {
          calls.push(["delete", table]);
          return this;
        },
        eq(column, value) {
          calls.push(["eq", table, column, value]);
          return this;
        },
        then(resolve) {
          resolve({ error: null });
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
    '[data-asset-document-error="asset-1"]': { textContent: "" },
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
    getAssetDocumentsReady: () => options.assetDocumentsReady !== false,
    setAssetDocumentsReady: (value) => calls.push(["assetDocumentsReady", value]),
    getPartDocumentsReady: () => options.partDocumentsReady !== false,
    setPartDocumentsReady: (value) => calls.push(["partDocumentsReady", value]),
    setPhotosReady: (value) => calls.push(["photosReady", value]),
    setRequestPhotosReady: (value) => calls.push(["requestPhotosReady", value]),
    showNotice: (message, tone) => calls.push(["notice", message, tone || "success"]),
    render: async () => calls.push(["render"]),
    optimizePhotoOverride: async (file) => String(file.type || "").startsWith("image/")
      ? ({
        blob: { name: "optimized", size: 123 },
        fileName: "optimized.jpg",
        contentType: "image/jpeg",
      })
      : ({
        blob: file,
        fileName: String(file.name || "file").replace(/\s+/g, "-"),
        contentType: file.type || "application/octet-stream",
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
      formValues: { document: { name: "receipt.pdf", type: "application/pdf", size: 456 }, document_type: "receipt" },
      querySelector(selector) {
        return selector === "button[type='submit']" ? button : null;
      },
    },
  });
  assert.equal(partDoc.calls.some((call) => call[0] === "upload" && call[1] === "part-documents"), true);
  assert.equal(partDoc.calls.some((call) => call[0] === "insert" && call[1] === "part_documents" && call[2].document_type === "receipt" && call[2].original_file_name === "receipt.pdf"), true);
  assert.equal(button.disabled, false);

  const largePartDoc = createWorkflow();
  await largePartDoc.workflow.uploadPartDocument({
    preventDefault() {},
    currentTarget: {
      dataset: { partDocument: "part-1" },
      formValues: { document: { name: "manual.pdf", type: "application/pdf", size: 30 * 1024 * 1024 }, document_type: "manual" },
      querySelector(selector) {
        return selector === "button[type='submit']" ? button : null;
      },
    },
  });
  assert.match(largePartDoc.errors['[data-part-document-error="part-1"]'].textContent, /over 25 MB/);
  assert.equal(largePartDoc.calls.some((call) => call[0] === "upload"), false);

  const mediumPartDoc = createWorkflow();
  await mediumPartDoc.workflow.uploadPartDocument({
    preventDefault() {},
    currentTarget: {
      dataset: { partDocument: "part-1" },
      formValues: { document: { name: "manual-small.pdf", type: "application/pdf", size: 10 * 1024 * 1024 }, document_type: "manual" },
      querySelector(selector) {
        return selector === "button[type='submit']" ? button : null;
      },
    },
  });
  assert.equal(mediumPartDoc.calls.some((call) => call[0] === "upload" && call[1] === "part-documents"), true);

  const partPhoto = createWorkflow();
  await partPhoto.workflow.uploadPartDocument({
    preventDefault() {},
    currentTarget: {
      dataset: { partDocument: "part-1" },
      formValues: { document: { name: "Part label.png", type: "image/png", size: 999 }, document_type: "part_photo" },
      querySelector(selector) {
        return selector === "button[type='submit']" ? button : null;
      },
    },
  });
  assert.equal(partPhoto.calls.some((call) => call[0] === "upload" && call[1] === "part-documents" && call[2] === "company-1/part-1/uuid-1-optimized.jpg"), true);
  assert.equal(partPhoto.calls.some((call) => call[0] === "insert" && call[1] === "part_documents" && call[2].document_type === "part_photo" && call[2].file_size_bytes === 123), true);

  const assetDocument = createWorkflow();
  await assetDocument.workflow.uploadAssetDocument({
    preventDefault() {},
    currentTarget: {
      dataset: { assetDocument: "asset-1" },
      formValues: { document: { name: "Controller settings.pdf", type: "application/pdf", size: 789 }, document_type: "settings" },
      querySelector(selector) {
        return selector === "button[type='submit']" ? button : null;
      },
    },
  });
  assert.equal(assetDocument.calls.some((call) => call[0] === "upload" && call[1] === "asset-documents"), true);
  assert.equal(assetDocument.calls.some((call) => call[0] === "insert" && call[1] === "asset_documents" && call[2].document_type === "settings" && call[2].original_file_name === "Controller-settings.pdf"), true);

  const largeAssetDocument = createWorkflow();
  await largeAssetDocument.workflow.uploadAssetDocument({
    preventDefault() {},
    currentTarget: {
      dataset: { assetDocument: "asset-1" },
      formValues: { document: { name: "Large manual.pdf", type: "application/pdf", size: 30 * 1024 * 1024 }, document_type: "manual" },
      querySelector(selector) {
        return selector === "button[type='submit']" ? button : null;
      },
    },
  });
  assert.match(largeAssetDocument.errors['[data-asset-document-error="asset-1"]'].textContent, /over 25 MB/);
  assert.equal(largeAssetDocument.calls.some((call) => call[0] === "upload"), false);

  const mediumAssetDocument = createWorkflow();
  await mediumAssetDocument.workflow.uploadAssetDocument({
    preventDefault() {},
    currentTarget: {
      dataset: { assetDocument: "asset-1" },
      formValues: { document: { name: "Controller backup.pdf", type: "application/pdf", size: 10 * 1024 * 1024 }, document_type: "settings" },
      querySelector(selector) {
        return selector === "button[type='submit']" ? button : null;
      },
    },
  });
  assert.equal(mediumAssetDocument.calls.some((call) => call[0] === "upload" && call[1] === "asset-documents"), true);

  const assetImageDocument = createWorkflow();
  await assetImageDocument.workflow.uploadAssetDocument({
    preventDefault() {},
    currentTarget: {
      dataset: { assetDocument: "asset-1" },
      formValues: { document: { name: "Name plate.png", type: "image/png", size: 999 }, document_type: "nameplate" },
      querySelector(selector) {
        return selector === "button[type='submit']" ? button : null;
      },
    },
  });
  assert.equal(assetImageDocument.calls.some((call) => call[0] === "upload" && call[1] === "asset-documents" && call[2] === "company-1/asset-1/uuid-1-optimized.jpg"), true);
  assert.equal(assetImageDocument.calls.some((call) => call[0] === "insert" && call[1] === "asset_documents" && call[2].document_type === "nameplate" && call[2].file_size_bytes === 123), true);

  const deletedAssetDocument = createWorkflow();
  await deletedAssetDocument.workflow.deleteAssetDocument("asset-document-1", "company-1/asset-1/nameplate.jpg");
  assert.equal(deletedAssetDocument.calls.some((call) => call[0] === "remove" && call[1] === "asset-documents" && call[2][0] === "company-1/asset-1/nameplate.jpg"), true);
  assert.equal(deletedAssetDocument.calls.some((call) => call[0] === "delete" && call[1] === "asset_documents"), true);
  assert.equal(deletedAssetDocument.calls.some((call) => call[0] === "eq" && call[1] === "asset_documents" && call[2] === "id" && call[3] === "asset-document-1"), true);
  assert.equal(deletedAssetDocument.calls.some((call) => call[0] === "notice" && call[1] === "Machine file deleted."), true);

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

  const optimizerCalls = [];
  const optimizerWorkflow = createMediaStorageWorkflow({
    documentRef: {
      createElement() {
        return {
          width: 0,
          height: 0,
          getContext() {
            return { drawImage() {} };
          },
          toBlob(resolve, type, quality) {
            optimizerCalls.push({ width: this.width, height: this.height, type, quality });
            const size = quality === 0.82 ? 2 * 1024 * 1024 : 1.2 * 1024 * 1024;
            resolve({ size, type });
          },
        };
      },
    },
    createImageBitmapRef: async () => ({
      width: 4000,
      height: 3000,
      close() {
        optimizerCalls.push({ closed: true });
      },
    }),
    safeFileName: (name) => String(name),
    fileBaseName: (name) => String(name).replace(/\.[^.]+$/, ""),
    consoleRef: { warn: (...args) => optimizerCalls.push(["warn", ...args]) },
  });
  const optimizedPhoto = await optimizerWorkflow.optimizePhoto({ name: "plate.png", type: "image/png", size: 5 * 1024 * 1024 });
  assert.equal(optimizedPhoto.fileName, "plate.jpg");
  assert.equal(optimizedPhoto.contentType, "image/jpeg");
  assert.equal(optimizedPhoto.blob.size <= 1.5 * 1024 * 1024, true);
  assert.deepEqual(optimizerCalls.slice(0, 2).map((call) => [call.width, call.quality]), [[2000, 0.82], [1800, 0.78]]);
  assert.equal(optimizerCalls.some((call) => call.closed), true);

  console.log("media storage workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
