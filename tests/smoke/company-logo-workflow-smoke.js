const assert = require("node:assert/strict");

global.window = {};

const { createCompanyLogoWorkflow } = require("../../src/workflows/companyLogoWorkflow.js");

class FakeFormData {
  constructor(form) {
    this.values = form.formValues || {};
  }

  get(name) {
    return this.values[name] || "";
  }
}

(async () => {
  const calls = [];
  const errorTarget = { textContent: "" };
  const company = { id: "company-1", name: "QA" };
  const { uploadCompanyLogo } = createCompanyLogoWorkflow({
    documentRef: {
      querySelector(selector) {
        return selector === "#company-logo-error" ? errorTarget : null;
      },
      createElement() {
        throw new Error("optimizeLogoOverride should avoid canvas in this smoke");
      },
    },
    FormDataCtor: FakeFormData,
    cryptoRef: { randomUUID: () => "uuid-1" },
    URLRef: { createObjectURL: () => "blob://logo" },
    consoleRef: { warn: (...args) => calls.push(["warn", ...args]) },
    supabaseClient: () => ({
      storage: {
        from(bucket) {
          return {
            upload(path, blob, options) {
              calls.push(["upload", bucket, path, options.contentType]);
              return Promise.resolve({ error: null });
            },
          };
        },
      },
      rpc(name, payload) {
        calls.push(["rpc", name, payload]);
        return Promise.resolve({ error: null });
      },
    }),
    withOperationTimeout: async (operation) => await operation,
    removeUploadedObject: async (bucket, path) => calls.push(["remove", bucket, path]),
    getActiveCompanyId: () => "company-1",
    getCompanies: () => [company],
    safeFileName: (name) => String(name).replace(/\s+/g, "-"),
    fileBaseName: (name) => String(name).replace(/\.[^.]+$/, ""),
    isColumnSchemaError: () => false,
    showNotice: (message, tone) => calls.push(["notice", message, tone || "success"]),
    render: async () => calls.push(["render"]),
    optimizeLogoOverride: async () => ({
      blob: { name: "optimized-logo", size: 123 },
      fileName: "logo.png",
      contentType: "image/png",
    }),
  });

  const button = { disabled: false, textContent: "Upload Logo" };
  await uploadCompanyLogo({
    preventDefault() {},
    currentTarget: {
      formValues: { logo: { name: "logo source.gif", type: "image/gif" } },
      querySelector(selector) {
        return selector === "button[type='submit']" ? button : null;
      },
    },
  });

  assert.equal(calls.some((call) => call[0] === "upload" && call[1] === "company-logos"), true);
  assert.equal(calls.some((call) => call[0] === "rpc" && call[1] === "set_company_logo"), true);
  assert.equal(company.logo_path, "company-1/logo-uuid-1-logo.png");
  assert.equal(company.logoUrl, "blob://logo");
  assert.equal(button.disabled, false);

  const uploadCount = calls.filter((call) => call[0] === "upload").length;
  await uploadCompanyLogo({
    preventDefault() {},
    currentTarget: {
      formValues: { logo: { name: "logo.pdf", type: "application/pdf" } },
      querySelector(selector) {
        return selector === "button[type='submit']" ? button : null;
      },
    },
  });
  assert.equal(calls.filter((call) => call[0] === "upload").length, uploadCount);
  assert.equal(errorTarget.textContent, "Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images.");

  const oversizedWorkflow = createCompanyLogoWorkflow({
    documentRef: {
      querySelector(selector) {
        return selector === "#company-logo-error" ? errorTarget : null;
      },
    },
    FormDataCtor: FakeFormData,
    optimizeLogoOverride: async () => ({
      blob: { name: "oversized-logo", size: 26 * 1024 * 1024 },
      fileName: "logo.png",
      contentType: "image/png",
    }),
  });
  await oversizedWorkflow.uploadCompanyLogo({
    preventDefault() {},
    currentTarget: {
      formValues: { logo: { name: "logo.png", type: "image/png" } },
      querySelector(selector) {
        return selector === "button[type='submit']" ? button : null;
      },
    },
  });
  assert.equal(errorTarget.textContent, "This logo is still over 25 MB after processing. Try a smaller logo image.");

  console.log("company logo workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
