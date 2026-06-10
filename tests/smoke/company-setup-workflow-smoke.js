const assert = require("node:assert/strict");

global.window = {};

const { createCompanySetupWorkflow } = require("../../src/workflows/companySetupWorkflow.js");

const calls = [];
const state = {
  appHtml: "",
  activeCompanyId: "",
  companies: [{ id: "existing-1", name: "Taylor Metal Products" }],
};
let submitHandler = null;
let signOutHandler = null;
let nextCompanyName = "Taylor Metal Products";

const workflow = createCompanySetupWorkflow({
  FormDataCtor: function FormDataStub() {
    return {
      get(name) {
        return name === "name" ? nextCompanyName : "";
      },
    };
  },
  companyCreateForm: (error) => `<form id="company-form"><span>${error}</span></form><button id="sign-out"></button>`,
  createCompanyRecord: async (name) => {
    calls.push(["createCompanyRecord", name]);
    return { data: "new-company-1", error: null };
  },
  documentRef: {
    querySelector(selector) {
      if (selector === "#company-form") {
        return {
          addEventListener(eventName, handler) {
            calls.push(["bindCompanyForm", eventName]);
            submitHandler = handler;
          },
        };
      }
      if (selector === "#sign-out") {
        return {
          addEventListener(eventName, handler) {
            calls.push(["bindSignOut", eventName]);
            signOutHandler = handler;
          },
        };
      }
      if (selector === "#company-error") return { textContent: "" };
      return null;
    },
  },
  ensureProfileForActiveCompany: async () => {
    calls.push(["ensureProfileForActiveCompany"]);
    return true;
  },
  getAppError: () => "",
  getCompanies: () => state.companies,
  persistActiveCompanyId: (companyId) => calls.push(["persistActiveCompanyId", companyId]),
  render: async () => calls.push(["render"]),
  seedStarterAssets: async () => calls.push(["seedStarterAssets"]),
  setActiveCompanyId: (companyId) => {
    state.activeCompanyId = companyId;
  },
  setAppHtml: (html) => {
    state.appHtml = html;
  },
  signOut: () => calls.push(["signOut"]),
  withOperationTimeout: (promise) => promise,
});

(async () => {
  workflow.renderCompanyCreate();
  assert.equal(state.appHtml.includes("company-form"), true);
  assert.equal(typeof submitHandler, "function");
  assert.equal(typeof signOutHandler, "function");

  const submitButton = { disabled: false, textContent: "Create Company", isConnected: true };
  await submitHandler({
    preventDefault() {},
    target: {
      querySelector(selector) {
        return selector === "button[type='submit']" ? submitButton : null;
      },
    },
  });
  assert.equal(state.activeCompanyId, "existing-1");
  assert.equal(calls.some((call) => call[0] === "createCompanyRecord"), false);

  nextCompanyName = "QA Company";
  await submitHandler({
    preventDefault() {},
    target: {
      querySelector(selector) {
        return selector === "button[type='submit']" ? submitButton : null;
      },
    },
  });

  assert.equal(state.activeCompanyId, "new-company-1");
  assert.equal(calls.some((call) => call[0] === "createCompanyRecord" && call[1] === "QA Company"), true);
  assert.equal(calls.some((call) => call[0] === "ensureProfileForActiveCompany"), true);
  assert.equal(calls.some((call) => call[0] === "seedStarterAssets"), true);
  assert.equal(submitButton.disabled, false);
  assert.equal(submitButton.textContent, "Create Company");

  signOutHandler();
  assert.equal(calls.some((call) => call[0] === "signOut"), true);

  console.log("company setup workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
