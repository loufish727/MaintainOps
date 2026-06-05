const assert = require("node:assert/strict");

function createElement({ dataset = {}, value = "", selectorMap = {} } = {}) {
  const listeners = {};
  const element = {
    dataset,
    value,
    textContent: "",
    disabled: false,
    focused: false,
    selectionRange: null,
    classList: {
      values: new Set(),
      toggle(name, force) {
        if (force) this.values.add(name);
        else this.values.delete(name);
      },
      remove(name) {
        this.values.delete(name);
      },
      contains(name) {
        return this.values.has(name);
      },
    },
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    dispatch(type, event = {}) {
      (listeners[type] || []).forEach((handler) => handler(event));
    },
    focus() {
      this.focused = true;
    },
    setSelectionRange(start, end) {
      this.selectionRange = [start, end];
    },
    querySelector(selector) {
      return selectorMap[selector] || null;
    },
  };
  return element;
}

function createDocument(selectors) {
  return {
    querySelector(selector) {
      const value = selectors[selector];
      return Array.isArray(value) ? value[0] || null : value || null;
    },
    querySelectorAll(selector) {
      const value = selectors[selector];
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    },
  };
}

global.window = {};
global.document = createDocument({});

require("../../src/utils/workspaceMessageUiEvents.js");

const { bindWorkspaceMessageUiEvents } = window.MaintainOpsWorkspaceMessageUiEvents;

const storage = {
  values: {},
  setItem(key, value) {
    this.values[key] = value;
  },
};

let stateValues = {
  activeAssetId: "asset-1",
  activePartId: "part-1",
  activeSection: "messages",
  activeWorkOrderId: null,
  createWorkOrderMode: true,
  messageComposerWorkOrderId: "wo-linked",
  messageSearchQuery: "",
  messageThreadFilter: "all",
  quickFixMode: true,
};
let renderCount = 0;
let autoGrowCount = 0;

const filterButton = createElement({ dataset: { messageFilter: "unread" } });
const linkedWorkButton = createElement({ dataset: { openLinkedWorkOrder: "wo-1" } });
const clearWorkLinkButton = createElement();
const searchInput = createElement({ value: "pump" });
const directSelect = createElement();
const directField = createElement({ selectorMap: { select: directSelect } });
const scopeNote = createElement();
const typeSelect = createElement({ value: "direct" });
const composerDetails = createElement();
const subjectField = createElement();
const threadForm = createElement({
  selectorMap: {
    details: composerDetails,
    "#message-thread-type": typeSelect,
    ".message-direct-field": directField,
    "#message-scope-note": scopeNote,
    "select[name='direct_user_id']": directSelect,
    "input[name='title']": subjectField,
  },
});
const replyField = createElement({ value: "Existing" });
const replyForm = createElement({ selectorMap: { "textarea[name='body']": replyField } });
const quickReplyButton = createElement({ dataset: { quickReply: "On it" } });
const personButton = createElement({ dataset: { messagePerson: "user-2" } });

const doc = createDocument({
  "[data-message-filter]": [filterButton],
  "[data-open-linked-work-order]": [linkedWorkButton],
  "[data-clear-message-work-link]": clearWorkLinkButton,
  "#message-search": searchInput,
  "#message-thread-form": threadForm,
  "#message-reply-form": replyForm,
  "[data-quick-reply]": [quickReplyButton],
  "[data-message-person]": [personButton],
});

bindWorkspaceMessageUiEvents({
  documentRef: doc,
  storage,
  state: {
    setActiveAssetId: (value) => { stateValues.activeAssetId = value; },
    setActivePartId: (value) => { stateValues.activePartId = value; },
    setActiveSection: (value) => { stateValues.activeSection = value; },
    setActiveWorkOrderId: (value) => { stateValues.activeWorkOrderId = value; },
    setCreateWorkOrderMode: (value) => { stateValues.createWorkOrderMode = value; },
    setMessageComposerWorkOrderId: (value) => { stateValues.messageComposerWorkOrderId = value; },
    setMessageSearchQuery: (value) => { stateValues.messageSearchQuery = value; },
    setMessageThreadFilter: (value) => { stateValues.messageThreadFilter = value; },
    setQuickFixMode: (value) => { stateValues.quickFixMode = value; },
  },
  autoGrowTextarea: () => { autoGrowCount += 1; },
  messageComposerScopeNote: (type) => `scope:${type}`,
  renderWorkspace: () => { renderCount += 1; },
});

assert.equal(directField.classList.contains("hidden-section"), false);
assert.equal(directSelect.disabled, false);
assert.equal(scopeNote.textContent, "scope:direct");

filterButton.dispatch("click");
assert.equal(stateValues.messageThreadFilter, "unread");
assert.equal(storage.values["maintainops.messageThreadFilter"], "unread");
assert.equal(renderCount, 1);

linkedWorkButton.dispatch("click");
assert.equal(stateValues.activeWorkOrderId, "wo-1");
assert.equal(stateValues.activeAssetId, null);
assert.equal(stateValues.activePartId, null);
assert.equal(stateValues.quickFixMode, false);
assert.equal(stateValues.createWorkOrderMode, false);
assert.equal(stateValues.activeSection, "work");
assert.equal(storage.values["maintainops.activeSection"], "work");
assert.equal(renderCount, 2);

clearWorkLinkButton.dispatch("click");
assert.equal(stateValues.messageComposerWorkOrderId, "");
assert.equal(storage.values["maintainops.messageComposerWorkOrderId"], "");
assert.equal(renderCount, 3);

searchInput.dispatch("input");
assert.equal(stateValues.messageSearchQuery, "pump");
assert.equal(storage.values["maintainops.messageSearchQuery"], "pump");
assert.equal(searchInput.focused, true);
assert.deepEqual(searchInput.selectionRange, [4, 4]);
assert.equal(renderCount, 4);

typeSelect.value = "work_order";
typeSelect.dispatch("change");
assert.equal(directField.classList.contains("hidden-section"), true);
assert.equal(directSelect.disabled, true);
assert.equal(scopeNote.textContent, "scope:work_order");

personButton.dispatch("click");
assert.equal(composerDetails.open, true);
assert.equal(typeSelect.value, "direct");
assert.equal(directSelect.value, "user-2");
assert.equal(directSelect.disabled, false);
assert.equal(directField.classList.contains("hidden-section"), false);
assert.equal(scopeNote.textContent, "scope:direct");
assert.equal(subjectField.focused, true);

quickReplyButton.dispatch("click");
assert.equal(replyField.value, "Existing\nOn it");
assert.equal(replyField.focused, true);
assert.equal(autoGrowCount, 1);

bindWorkspaceMessageUiEvents({
  documentRef: doc,
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not bind or render");
  },
});

console.log("workspace message UI events smoke passed");
