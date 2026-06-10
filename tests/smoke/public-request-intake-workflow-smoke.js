const assert = require("node:assert/strict");

global.window = {};

const { createPublicRequestIntakeWorkflow } = require("../../src/workflows/publicRequestIntakeWorkflow.js");

const calls = [];
const appState = { html: "" };
let submitHandler = null;
let anotherHandler = null;
let formPhoto = { name: "request.jpg" };

const workflow = createPublicRequestIntakeWorkflow({
  FormDataCtor: function FormDataStub() {
    return {
      get(name) {
        return {
          title: "Oil leak",
          equipment_note: "Press 1",
          description: "Oil on floor near press.",
          requester_name: "Louie",
          requester_contact: "louie@example.test",
          priority: "high",
          photo: formPhoto,
        }[name] || "";
      },
    };
  },
  addPhotoToMaintenanceRequest: async (requestId, photo) => {
    calls.push(["addPhotoToMaintenanceRequest", requestId, photo.name]);
    return null;
  },
  bindPublicQrPrintEvents: () => calls.push(["bindPublicQrPrintEvents"]),
  bodyRef: {
    classList: {
      add: (name) => calls.push(["bodyAdd", name]),
      remove: (name) => calls.push(["bodyRemove", name]),
    },
  },
  documentRef: {
    querySelector(selector) {
      if (selector === "#public-request-form") {
        return {
          addEventListener(eventName, handler) {
            calls.push(["bindForm", eventName]);
            submitHandler = handler;
          },
        };
      }
      if (selector === "#public-request-error") return { textContent: "" };
      if (selector === "#public-request-another") {
        return {
          addEventListener(eventName, handler) {
            calls.push(["bindAnother", eventName]);
            anotherHandler = handler;
          },
        };
      }
      return null;
    },
  },
  getPublicRequestIntake: async (token) => {
    calls.push(["getPublicRequestIntake", token]);
    return { data: { company_name: "Taylor Metal", location_name: "Salem" }, error: null };
  },
  loadingQrPage: () => "<p>QR loading</p>",
  loadingRequestForm: () => "<p>Form loading</p>",
  notifyRequestEmailer: async (requestId) => {
    calls.push(["notifyRequestEmailer", requestId]);
    return { error: null };
  },
  publicRequestError: (message) => `<p>${message}</p>`,
  publicRequestForm: () => "<form id=\"public-request-form\"></form>",
  publicRequestQrPage: (_intake, requestUrl) => `<section>${requestUrl}</section>`,
  publicRequestSuccess: (_intake, warning) => `<button id=\"public-request-another\">Another</button><span>${warning}</span>`,
  publicRequestUrl: (token) => `https://example.test/?request=${token}`,
  requiredText: (value, label) => {
    const text = String(value || "").trim();
    if (!text) throw new Error(`${label} is required.`);
    return text;
  },
  setAppHtml: (html) => {
    appState.html = html;
  },
  submitPublicLocationRequest: async (payload) => {
    calls.push(["submitPublicLocationRequest", payload]);
    return { data: "request-1", error: null };
  },
  warn: (...args) => calls.push(["warn", ...args]),
  withOperationTimeout: (promise) => promise,
});

(async () => {
  await workflow.renderPublicRequestQrPage("qr-token");
  assert.equal(calls.some((call) => call[0] === "bodyAdd" && call[1] === "public-qr-mode"), true);
  assert.equal(appState.html.includes("request=qr-token"), true);
  assert.equal(calls.some((call) => call[0] === "bindPublicQrPrintEvents"), true);

  await workflow.renderPublicRequestIntake("request-token");
  assert.equal(calls.some((call) => call[0] === "bodyRemove" && call[1] === "public-qr-mode"), true);
  assert.equal(typeof submitHandler, "function");

  const submitButton = { disabled: false, textContent: "Send Request", isConnected: true };
  await submitHandler({
    preventDefault() {},
    currentTarget: {
      querySelector(selector) {
        return selector === "button[type='submit']" ? submitButton : null;
      },
    },
  });

  const submitCall = calls.find((call) => call[0] === "submitPublicLocationRequest");
  assert.equal(submitCall[1].request_token, "request-token");
  assert.equal(submitCall[1].request_title, "Oil leak");
  assert.equal(submitCall[1].equipment_note, "Press 1");
  assert.equal(submitCall[1].request_priority, "high");
  assert.equal(calls.some((call) => call[0] === "addPhotoToMaintenanceRequest" && call[1] === "request-1"), true);
  assert.equal(calls.some((call) => call[0] === "notifyRequestEmailer" && call[1] === "request-1"), true);
  assert.equal(typeof anotherHandler, "function");
  assert.equal(submitButton.disabled, false);
  assert.equal(submitButton.textContent, "Send Request");

  console.log("public request intake workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
