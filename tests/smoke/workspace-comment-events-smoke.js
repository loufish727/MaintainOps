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
      return selector === "#comment-form" ? form : null;
    },
  };
}

global.window = {};
global.document = createDocument(null);

require("../../src/utils/workspaceCommentEvents.js");

const { bindWorkspaceCommentEvents } = window.MaintainOpsWorkspaceCommentEvents;

const form = createForm();
let submittedEvent = null;

bindWorkspaceCommentEvents({
  documentRef: createDocument(form),
  createComment: (event) => {
    submittedEvent = event;
  },
});

assert.equal(form.listenerCount("submit"), 1);
const event = { type: "submit" };
form.dispatch("submit", event);
assert.equal(submittedEvent, event);

const unboundForm = createForm();
bindWorkspaceCommentEvents({
  documentRef: createDocument(unboundForm),
  createComment: null,
});

assert.equal(unboundForm.listenerCount("submit"), 0);

bindWorkspaceCommentEvents({
  documentRef: createDocument(null),
  createComment: () => {},
});

console.log("workspace comment events smoke passed");
