const assert = require("node:assert/strict");

function createButton(dataset = {}) {
  const listeners = {};
  return {
    dataset,
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    dispatch(type, event = {}) {
      (listeners[type] || []).forEach((handler) => handler(event));
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

require("../../src/utils/workspacePartDetailEvents.js");

const { bindWorkspacePartDetailEvents } = window.MaintainOpsWorkspacePartDetailEvents;

let activePartId = null;
let showPartSourceManager = false;
let renderCount = 0;

const openButton = createButton({ openPart: "part-1" });
const closeButton = createButton({});
const toggleButton = createButton({});
const doc = createDocument({
  "[data-open-part]": [openButton],
  "[data-close-part-detail]": [closeButton],
  "[data-toggle-part-sources]": [toggleButton],
});

bindWorkspacePartDetailEvents({
  documentRef: doc,
  state: {
    getShowPartSourceManager: () => showPartSourceManager,
    setActivePartId: (value) => {
      activePartId = value;
    },
    setShowPartSourceManager: (value) => {
      showPartSourceManager = value;
    },
  },
  renderWorkspace: () => {
    renderCount += 1;
  },
});

openButton.dispatch("click");
assert.equal(activePartId, "part-1");
assert.equal(renderCount, 1);

let prevented = false;
activePartId = null;
openButton.dispatch("keydown", { key: "Enter", preventDefault: () => { prevented = true; } });
assert.equal(prevented, true);
assert.equal(activePartId, "part-1");
assert.equal(renderCount, 2);

activePartId = null;
openButton.dispatch("keydown", { key: "Tab", preventDefault: () => { throw new Error("should not prevent Tab"); } });
assert.equal(activePartId, null);
assert.equal(renderCount, 2);

toggleButton.dispatch("click");
assert.equal(showPartSourceManager, true);
assert.equal(renderCount, 3);

closeButton.dispatch("click");
assert.equal(activePartId, null);
assert.equal(showPartSourceManager, false);
assert.equal(renderCount, 4);

bindWorkspacePartDetailEvents({
  documentRef: doc,
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not bind or render");
  },
});

console.log("workspace part detail events smoke passed");
