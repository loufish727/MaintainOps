const assert = require("node:assert/strict");

function createElement({ value = "", selectorMap = {}, formValues = {} } = {}) {
  const listeners = {};
  return {
    value,
    formValues,
    focused: false,
    selectionRange: null,
    scrollOptions: null,
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
    scrollIntoView(options) {
      this.scrollOptions = options;
    },
    querySelector(selector) {
      return selectorMap[selector] || null;
    },
  };
}

function createDocument(selectors) {
  return {
    querySelector(selector) {
      return selectors[selector] || null;
    },
  };
}

global.window = {};
global.document = createDocument({});

require("../../src/utils/workspacePartSearchEvents.js");

const { bindWorkspacePartSearchEvents } = window.MaintainOpsWorkspacePartSearchEvents;

let partSearchQuery = "";
let resetCount = 0;
let renderCount = 0;
const storage = {
  values: {},
  setItem(key, value) {
    this.values[key] = value;
  },
};

const input = createElement({ value: "hose" });
const form = createElement({
  selectorMap: {
    "input[name='part_search']": input,
  },
  formValues: {
    part_search: "filter",
  },
});
const nextInput = createElement({ value: "hose" });
const partsList = createElement();
const doc = createDocument({
  "#part-search-form": form,
  "#part-search": nextInput,
  "#parts-list": partsList,
});

class FormDataRef {
  constructor(formElement) {
    this.formElement = formElement;
  }

  get(name) {
    return this.formElement.formValues[name] || "";
  }
}

bindWorkspacePartSearchEvents({
  documentRef: doc,
  storage,
  FormDataRef,
  state: {
    setPartSearchQuery: (value) => {
      partSearchQuery = value;
    },
  },
  resetPartsPage: () => {
    resetCount += 1;
  },
  renderWorkspace: () => {
    renderCount += 1;
  },
});

input.dispatch("input");
assert.equal(partSearchQuery, "hose");
assert.equal(storage.values["maintainops.partSearchQuery"], "hose");
assert.equal(resetCount, 1);
assert.equal(renderCount, 1);
assert.equal(nextInput.focused, true);
assert.deepEqual(nextInput.selectionRange, [4, 4]);

let prevented = false;
form.dispatch("submit", {
  preventDefault: () => {
    prevented = true;
  },
});
assert.equal(prevented, true);
assert.equal(partSearchQuery, "filter");
assert.equal(storage.values["maintainops.partSearchQuery"], "filter");
assert.equal(resetCount, 2);
assert.equal(renderCount, 2);
assert.deepEqual(partsList.scrollOptions, { behavior: "smooth", block: "start" });

bindWorkspacePartSearchEvents({
  documentRef: doc,
  state: null,
  resetPartsPage: () => {
    throw new Error("missing state should not reset");
  },
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace part search events smoke passed");
