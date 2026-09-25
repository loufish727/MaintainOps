const assert = require("node:assert/strict");

global.window = {};

const { createPublicRequestLinkWorkflow } = require("../../src/workflows/publicRequestLinkWorkflow.js");

function createElement() {
  return {
    disabled: false,
    textContent: "",
  };
}

function createDocument(selectors = {}) {
  const elements = new Map(Object.entries(selectors));
  return {
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, { textContent: "" });
      return elements.get(selector);
    },
  };
}

function createQuery(calls) {
  return {
    payload: null,
    update(payload) {
      this.payload = payload;
      calls.push(["update", payload]);
      return this;
    },
    eq(column, value) {
      calls.push(["eq", column, value]);
      return this;
    },
    select() {
      calls.push(["select"]);
      return Promise.resolve({ data: [{ id: "link-1" }], error: null });
    },
  };
}

(async () => {
  const createButton = createElement();
  const errorElement = { textContent: "" };
  const documentRef = createDocument({
    "#public-request-link-error": errorElement,
    '[data-create-public-request-link="loc-1"]': createButton,
  });
  const calls = [];
  const state = {
    publicRequestLinksReady: true,
    notices: [],
    renders: 0,
    confirms: [],
    confirmResult: true,
    canAdminister: true,
    tokensGenerated: 0,
  };

  const workflow = createPublicRequestLinkWorkflow({
    documentRef,
    windowRef: {
      confirm(message) {
        state.confirms.push(message);
        return state.confirmResult;
      },
    },
    CSSRef: { escape: (value) => value },
    supabaseClient: () => ({
      rpc: (name, payload) => {
        calls.push(["rpc", name, payload]);
        return Promise.resolve({ error: null });
      },
      from: (table) => {
        calls.push(["from", table]);
        return createQuery(calls);
      },
    }),
    withOperationTimeout: (value) => value,
    generatePublicRequestToken: () => { state.tokensGenerated += 1; return "token-new"; },
    canAdministerPublicRequestLinks: () => state.canAdminister,
    getActiveCompanyId: () => "company-1",
    setPublicRequestLinksReady: (value) => { state.publicRequestLinksReady = value; },
    showNotice: (message, tone = "success") => { state.notices.push([message, tone]); },
    render: async () => { state.renders += 1; },
  });

  await workflow.createPublicRequestLink("loc-1");
  assert.deepEqual(calls[0], ["rpc", "ensure_location_request_link", { target_location_id: "loc-1" }]);
  assert.equal(state.notices.at(-1)[0], "Location request QR link ready.");
  assert.equal(createButton.textContent, "Create QR Link");

  await workflow.disablePublicRequestLink("link-1");
  assert.equal(state.notices.at(-1)[0], "Request link disabled.");
  assert.ok(calls.some((call) => call[0] === "update" && call[1].is_active === false));

  await workflow.setPublicRequestLinkActive("link-1", true);
  assert.equal(state.notices.at(-1)[0], "Request link reactivated.");
  assert.ok(calls.some((call) => call[0] === "update" && call[1].is_active === true));

  await workflow.regeneratePublicRequestLink("link-1");
  const warning = state.confirms.at(-1);
  assert.match(warning, /^WARNING: THIS WILL BREAK THE CURRENT QR CODE FOR THIS LOCATION\./);
  assert.match(warning, /stop working immediately/);
  assert.match(warning, /replace EVERY posted copy/);
  assert.match(warning, /Existing requests are not deleted/);
  assert.match(warning, /Other locations' QR codes are not affected/);
  assert.match(warning, /Select Cancel, then Print QR Code/);
  assert.match(warning, /Select OK only if you intend to replace the current code/);
  assert.equal(warning.split("\n\n").length, 6);
  assert.equal(state.notices.at(-1)[0], "Request QR regenerated.");
  assert.ok(calls.some((call) => call[0] === "update" && call[1].token === "token-new"));

  state.confirmResult = false;
  const callsBeforeCancel = calls.length;
  const noticesBeforeCancel = state.notices.length;
  await workflow.regeneratePublicRequestLink("link-1");
  assert.equal(calls.length, callsBeforeCancel, "Cancelling replacement must not write to the database");
  assert.equal(state.notices.length, noticesBeforeCancel);
  assert.equal(state.tokensGenerated, 1, "Cancelling must not even generate a replacement token");
  assert.equal(state.renders, 4);

  state.canAdminister = false;
  state.confirmResult = true;
  const confirmsBeforeDenied = state.confirms.length;
  await workflow.regeneratePublicRequestLink("link-1");
  assert.equal(state.confirms.length, confirmsBeforeDenied);
  assert.equal(calls.length, callsBeforeCancel);
  assert.equal(state.tokensGenerated, 1);
  assert.match(errorElement.textContent, /Only admins can replace/);
  console.log("public request link workflow smoke passed");
})();
