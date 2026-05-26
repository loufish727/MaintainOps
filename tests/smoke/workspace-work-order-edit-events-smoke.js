const assert = require("node:assert/strict");

function createForm() {
  const listeners = {};
  return {
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    dispatch(type, event = {}) {
      (listeners[type] || []).forEach((handler) => handler(event));
    },
    listenerCount(type) {
      return (listeners[type] || []).length;
    },
  };
}

function createDocument(form) {
  return {
    querySelector(selector) {
      return selector === "#edit-work-order-form" ? form : null;
    },
  };
}

global.window = {};
global.document = createDocument(null);

require("../../src/utils/workspaceWorkOrderEditEvents.js");

const { bindWorkspaceWorkOrderEditEvents } = window.MaintainOpsWorkspaceWorkOrderEditEvents;

const form = createForm();
let submittedEvent = null;

bindWorkspaceWorkOrderEditEvents({
  documentRef: createDocument(form),
  updateWorkOrderDetails: (event) => {
    submittedEvent = event;
  },
});

assert.equal(form.listenerCount("submit"), 1);
const event = { type: "submit" };
form.dispatch("submit", event);
assert.equal(submittedEvent, event);

const unboundForm = createForm();
bindWorkspaceWorkOrderEditEvents({
  documentRef: createDocument(unboundForm),
  updateWorkOrderDetails: null,
});

assert.equal(unboundForm.listenerCount("submit"), 0);

bindWorkspaceWorkOrderEditEvents({
  documentRef: createDocument(null),
  updateWorkOrderDetails: () => {},
});

console.log("workspace work-order edit events smoke passed");
