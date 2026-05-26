const assert = require("node:assert/strict");

function createButton(dataset) {
  const listeners = {};
  return {
    dataset,
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    async dispatch(type) {
      for (const handler of listeners[type] || []) await handler();
    },
  };
}

function createDocument(groups) {
  return {
    querySelectorAll(selector) {
      return groups[selector] || [];
    },
  };
}

global.window = {};
global.document = createDocument({});

require("../../src/utils/workspaceMessageThreadEvents.js");

const { bindWorkspaceMessageThreadEvents } = window.MaintainOpsWorkspaceMessageThreadEvents;

const threadButton = createButton({ messageThread: "thread-1" });
const workThreadButton = createButton({ openWorkMessageThread: "thread-2" });
const storage = {
  values: {},
  setItem(key, value) {
    this.values[key] = value;
  },
};
const stateValues = {
  activeMessageThreadId: "",
  activeSection: "work",
  messageComposerOpen: true,
};
const readCalls = [];
let renderCount = 0;

bindWorkspaceMessageThreadEvents({
  documentRef: createDocument({
    "[data-message-thread]": [threadButton],
    "[data-open-work-message-thread]": [workThreadButton],
  }),
  storage,
  state: {
    setActiveMessageThreadId: (value) => { stateValues.activeMessageThreadId = value; },
    setActiveSection: (value) => { stateValues.activeSection = value; },
    setMessageComposerOpen: (value) => { stateValues.messageComposerOpen = value; },
  },
  markMessageThreadRead: async (threadId) => { readCalls.push(threadId); },
  renderWorkspace: () => { renderCount += 1; },
});

(async () => {
  await threadButton.dispatch("click");
  assert.equal(stateValues.activeMessageThreadId, "thread-1");
  assert.equal(storage.values["maintainops.activeMessageThreadId"], "thread-1");
  assert.deepEqual(readCalls, ["thread-1"]);
  assert.equal(renderCount, 1);

  await workThreadButton.dispatch("click");
  assert.equal(stateValues.activeMessageThreadId, "thread-2");
  assert.equal(stateValues.messageComposerOpen, false);
  assert.equal(stateValues.activeSection, "messages");
  assert.equal(storage.values["maintainops.activeMessageThreadId"], "thread-2");
  assert.equal(storage.values["maintainops.activeSection"], "messages");
  assert.deepEqual(readCalls, ["thread-1", "thread-2"]);
  assert.equal(renderCount, 2);

  bindWorkspaceMessageThreadEvents({
    documentRef: createDocument({ "[data-message-thread]": [threadButton] }),
    state: null,
    markMessageThreadRead: async () => {
      throw new Error("missing state should not mark read");
    },
    renderWorkspace: () => {
      throw new Error("missing state should not render");
    },
  });

  console.log("workspace message thread events smoke passed");
})();
