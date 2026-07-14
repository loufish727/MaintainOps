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
const deleteError = { textContent: "" };
const form = {
  dataset: { financialAsset: "asset-1" },
  querySelector(selector) {
    if (selector === "button[type='submit']") return createField("Save Financial Info");
    return null;
  },
};

const workflow = createAssetFinancialWorkflow({
  documentRef: {
    querySelector: (selector) => selector === '[data-financial-delete-error="finance-archived"]' ? deleteError : ({ textContent: "" }),
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
        update(payload) {
          calls.push(["update", payload]);
          return {
            eq(column, value) {
              calls.push(["update-eq", column, value]);
              return this;
            },
            is(column, value) {
              calls.push(["update-is", column, value]);
              return this;
            },
            select() {
              return {
                single: async () => ({ data: { id: "finance-archived" }, error: null }),
              };
            },
          };
        },
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
        delete() {
          calls.push(["delete", table]);
          return {
            eq(column, value) {
              calls.push(["eq", table, column, value]);
              return this;
            },
            is(column, value) {
              calls.push(["is", table, column, value]);
              return Promise.resolve({ error: null });
            },
          };
        },
      };
    },
  }),
  withOperationTimeout: async (promise) => promise,
  loadAssetFinancials: async () => calls.push(["loadAssetFinancials"]),
  clearActiveFinancialAssetId: () => calls.push(["clearActiveFinancialAssetId"]),
  renderWorkspace: () => calls.push(["renderWorkspace"]),
  showNotice: (message) => calls.push(["notice", message]),
  confirmRef: () => true,
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

  const archivedForm = {
    dataset: {
      financialAsset: "financial:finance-archived",
      financialRecord: "finance-archived",
      financialArchived: "true",
    },
    querySelector: form.querySelector,
  };
  await workflow.saveAssetFinancial({ preventDefault() {}, currentTarget: archivedForm });
  const update = calls.find((call) => call[0] === "update");
  assert.ok(update, "archived financial records should be updated");
  assert.equal(update[1].asset_tag, "FA-100");
  assert.equal(Object.hasOwn(update[1], "asset_id"), false);
  assert.equal(Object.hasOwn(update[1], "company_id"), false);
  assert.equal(calls.some((call) => call[0] === "update-eq" && call[1] === "id" && call[2] === "finance-archived"), true);
  assert.equal(calls.some((call) => call[0] === "update-is" && call[1] === "asset_id" && call[2] === null), true);

  await workflow.deleteFinancialRecord("finance-archived");
  assert.equal(calls.some((call) => call[0] === "delete" && call[1] === "asset_financials"), true);
  assert.equal(calls.some((call) => call[0] === "eq" && call[2] === "id" && call[3] === "finance-archived"), true);
  assert.equal(calls.some((call) => call[0] === "is" && call[2] === "asset_id" && call[3] === null), true);
  assert.equal(calls.some((call) => call[0] === "clearActiveFinancialAssetId"), true);
  assert.ok(calls.some((call) => call[0] === "notice" && call[1] === "Archived financial record deleted."));

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

  await readOnlyWorkflow.deleteFinancialRecord("finance-archived");
  assert.equal(readOnlyCalls.some((call) => call[0] === "from"), false);

  console.log("asset financial workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
