const assert = require("node:assert/strict");

function createButton(dataset) {
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

function createDocument(buttons) {
  return {
    querySelectorAll(selector) {
      return selector === "[data-start-work-message]" ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument([]);

require("../../src/utils/workspaceWorkMessageStartEvents.js");

const { bindWorkspaceWorkMessageStartEvents } = window.MaintainOpsWorkspaceWorkMessageStartEvents;

const startButton = createButton({ startWorkMessage: "wo-1" });
const storage = {
  values: {},
  setItem(key, value) {
    this.values[key] = value;
  },
};
const stateValues = {
  messageComposerWorkOrderId: "",
  messageComposerOpen: false,
  activeMessageThreadId: "thread-1",
  activeSection: "work",
};
let renderCount = 0;

bindWorkspaceWorkMessageStartEvents({
  documentRef: createDocument([startButton]),
  storage,
  state: {
    setActiveMessageThreadId: (value) => { stateValues.activeMessageThreadId = value; },
    setActiveSection: (value) => { stateValues.activeSection = value; },
    setMessageComposerOpen: (value) => { stateValues.messageComposerOpen = value; },
    setMessageComposerWorkOrderId: (value) => { stateValues.messageComposerWorkOrderId = value; },
  },
  renderWorkspace: () => { renderCount += 1; },
});

startButton.dispatch("click");
assert.equal(stateValues.messageComposerWorkOrderId, "wo-1");
assert.equal(stateValues.messageComposerOpen, true);
assert.equal(stateValues.activeMessageThreadId, "");
assert.equal(stateValues.activeSection, "messages");
assert.equal(storage.values["maintainops.messageComposerWorkOrderId"], "wo-1");
assert.equal(storage.values["maintainops.activeSection"], "messages");
assert.equal(storage.values["maintainops.activeMessageThreadId"], "");
assert.equal(renderCount, 1);

bindWorkspaceWorkMessageStartEvents({
  documentRef: createDocument([startButton]),
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace work message start events smoke passed");
