const assert = require("node:assert/strict");

function createButton(dataset = {}) {
  const listeners = {};
  return {
    dataset,
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    dispatch(type) {
      (listeners[type] || []).forEach((handler) => handler());
    },
  };
}

function createDocument(buttons = []) {
  return {
    querySelectorAll(selector) {
      return selector === "[data-convert-request]" ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument();

require("../../src/utils/workspaceRequestConversionEvents.js");

const { bindWorkspaceRequestConversionEvents } = window.MaintainOpsWorkspaceRequestConversionEvents;

const convertButton = createButton({ convertRequest: "request-1" });
let convertedRequestId = null;

bindWorkspaceRequestConversionEvents({
  documentRef: createDocument([convertButton]),
  convertRequestToWorkOrder: (id) => {
    convertedRequestId = id;
  },
});

convertButton.dispatch("click");
assert.equal(convertedRequestId, "request-1");

const unboundButton = createButton({ convertRequest: "request-2" });

bindWorkspaceRequestConversionEvents({
  documentRef: createDocument([unboundButton]),
  convertRequestToWorkOrder: null,
});

convertedRequestId = null;
unboundButton.dispatch("click");
assert.equal(convertedRequestId, null);

console.log("workspace request conversion events smoke passed");
