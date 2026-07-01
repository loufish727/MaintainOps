const assert = require("node:assert/strict");

global.window = {};

const { createAssetFinancialWorkflow } = require("../../src/workflows/assetFinancialWorkflow.js");

function createField(value) {
  return { value };
}

const fields = {
  asset_tag: "FA-100",
  acquisition_date: "2024-01-15",
  acquisition_cost: "25000.50",
  depreciation_method: "Straight-line",
  useful_life_years: "10",
  current_book_value: "21000.25",
  tax_jurisdiction: "Marion County",
  ownership_status: "owned",
  in_service_date: "2024-02-01",
  disposal_date: "",
  disposal_notes: "",
  gl_account_code: "1600",
  cost_center: "Salem Production",
  finance_notes: "Reviewed",
  needs_review: "",
};

class FakeFormData {
  constructor() {}
  get(key) {
    return fields[key] ?? "";
  }
}

const calls = [];
const form = {
  dataset: { financialAsset: "asset-1" },
  querySelector(selector) {
    if (selector === "button[type='submit']") return createField("Save Financial Info");
    return null;
  },
};

const workflow = createAssetFinancialWorkflow({
  documentRef: {
    querySelector: () => ({ textContent: "" }),
    querySelectorAll: () => [],
  },
  FormDataCtor: FakeFormData,
  CSSRef: { escape: (value) => value },
  getActiveCompanyId: () => "company-1",
  getSession: () => ({ user: { id: "user-1" } }),
  supabaseClient: () => ({
    from(table) {
      calls.push(["from", table]);
      return {
        upsert(payload, options) {
          calls.push(["upsert", payload, options]);
          return {
            select() {
              return {
                single: async () => ({ data: { id: "finance-1" }, error: null }),
              };
            },
          };
        },
      };
    },
  }),
  withOperationTimeout: async (promise) => promise,
  loadAssetFinancials: async () => calls.push(["loadAssetFinancials"]),
  renderWorkspace: () => calls.push(["renderWorkspace"]),
  showNotice: (message) => calls.push(["notice", message]),
  canEditFinancialRecords: () => true,
});

(async () => {
  await workflow.saveAssetFinancial({ preventDefault() {}, currentTarget: form });
  const upsert = calls.find((call) => call[0] === "upsert");
  assert.ok(upsert, "upsert should be called");
  assert.equal(upsert[1].company_id, "company-1");
  assert.equal(upsert[1].asset_id, "asset-1");
  assert.equal(upsert[1].asset_tag, "FA-100");
  assert.equal(upsert[1].acquisition_cost, 25000.5);
  assert.equal(upsert[1].current_book_value, 21000.25);
  assert.equal(upsert[1].needs_review, false);
  assert.equal(upsert[1].reviewed_by, "user-1");
  assert.equal(upsert[2].onConflict, "asset_id");
  assert.ok(calls.some((call) => call[0] === "loadAssetFinancials"));
  assert.ok(calls.some((call) => call[0] === "renderWorkspace"));
  assert.ok(calls.some((call) => call[0] === "notice" && call[1] === "Financial info saved."));

  const readOnlyCalls = [];
  const readOnlyError = { textContent: "" };
  const readOnlyWorkflow = createAssetFinancialWorkflow({
    documentRef: {
      querySelector: () => readOnlyError,
      querySelectorAll: () => [],
    },
    FormDataCtor: FakeFormData,
    CSSRef: { escape: (value) => value },
    supabaseClient: () => ({
      from() {
        readOnlyCalls.push(["from"]);
        throw new Error("Read-only financial users must not write.");
      },
    }),
    withOperationTimeout: async (promise) => promise,
    canEditFinancialRecords: () => false,
    showNotice: (message, tone) => readOnlyCalls.push(["notice", message, tone]),
  });
  await readOnlyWorkflow.saveAssetFinancial({ preventDefault() {}, currentTarget: form });
  assert.equal(readOnlyCalls.some((call) => call[0] === "from"), false);
  assert.equal(readOnlyError.textContent, "Managers can view financial records, but only admins and accounting can edit financial info.");

  console.log("asset financial workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
