const assert = require("node:assert/strict");

global.window = {};
global.localStorage = null;

const { createWorkspaceUiState } = require("../../src/utils/workspaceUiState.js");
require("../../src/utils/workspaceSearchEvents.js");
require("../../src/utils/globalSearchNavigationEvents.js");

const { bindWorkspaceSearchEvents } = window.MaintainOpsWorkspaceSearchEvents;
const { bindGlobalSearchNavigationEvents } = window.MaintainOpsGlobalSearchNavigationEvents;

function createStorage(initial = {}) {
  return {
    values: { ...initial },
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(this.values, key) ? this.values[key] : null;
    },
    setItem(key, value) {
      this.values[key] = String(value);
    },
    removeItem(key) {
      delete this.values[key];
    },
  };
}

function createElement({ id = "", value = "", dataset = {} } = {}) {
  const listeners = {};
  return {
    id,
    value,
    dataset,
    focused: false,
    focusOptions: null,
    selectionStart: value.length,
    selectionEnd: value.length,
    selectionRange: null,
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    async dispatch(type) {
      for (const handler of listeners[type] || []) {
        await handler();
      }
    },
    focus(options) {
      this.focused = true;
      this.focusOptions = options || null;
    },
    setSelectionRange(start, end) {
      this.selectionRange = [start, end];
    },
  };
}

const storage = createStorage({
  "maintainops.searchQuery": "",
});
const state = createWorkspaceUiState({ storage });
const searchInput = createElement({ id: "workspace-search", value: "pump" });
const viewWorkSearch = createElement({});
const closeWorkSearch = createElement({});
const globalResult = createElement({ dataset: { searchWorkOrder: "wo-1" } });

const doc = {
  querySelector(selector) {
    if (selector === "#workspace-search") return searchInput;
    return null;
  },
  getElementById(id) {
    if (id === "workspace-search") return searchInput;
    return null;
  },
  querySelectorAll(selector) {
    if (selector === ".workspace-search-input") return [searchInput];
    if (selector === "[data-view-work-search]") return [viewWorkSearch];
    if (selector === "[data-close-work-search]") return [closeWorkSearch];
    if (selector === "[data-search-work-order]") return [globalResult];
    return [];
  },
};

let invalidateCount = 0;
let workReloadCount = 0;
let requestReloadCount = 0;
let renderCount = 0;
let pendingSearchTask = null;
let clearedSearchTimers = 0;
const scrollCalls = [];

bindWorkspaceSearchEvents({
  documentRef: doc,
  storage,
  state: {
    ...state,
    setQuickFixMode() {},
    setCreateWorkOrderMode() {},
    setQuickFixAssetId() {},
    setQuickFixRequestId() {},
  },
  invalidateExactWorkOrderSearchCache: () => {
    invalidateCount += 1;
  },
  reloadWorkOrderQueue: async () => {
    workReloadCount += 1;
  },
  reloadRequestQueue: async () => {
    requestReloadCount += 1;
  },
  renderWorkspace: () => {
    renderCount += 1;
  },
  resetWorkOrderPage: () => state.resetWorkOrderPage(),
  resetPartsPage: () => state.resetPartsPage(),
  resetRequestsPage: () => state.resetRequestsPage(),
  setWorkOrderSearchMode: (value) => state.setWorkOrderSearchMode(Boolean(value && state.getSearchQuery().trim())),
  setTimeoutRef: (callback) => {
    pendingSearchTask = callback;
    return 1;
  },
  clearTimeoutRef: () => {
    pendingSearchTask = null;
    clearedSearchTimers += 1;
  },
  searchDelayMs: 300,
  windowRef: {
    scrollX: 0,
    scrollY: 640,
    scrollTo(x, y) {
      scrollCalls.push([x, y]);
    },
  },
});

bindGlobalSearchNavigationEvents({
  documentRef: doc,
  storage,
  state,
  renderWorkspace: () => {
    renderCount += 1;
  },
  setWorkOrderSearchMode: (value) => state.setWorkOrderSearchMode(Boolean(value && state.getSearchQuery().trim())),
});

(async () => {
  searchInput.value = "pu";
  searchInput.selectionStart = 2;
  searchInput.selectionEnd = 2;
  await searchInput.dispatch("input");
  searchInput.value = "pump";
  searchInput.selectionStart = 4;
  searchInput.selectionEnd = 4;
  await searchInput.dispatch("input");
  assert.equal(state.getSearchQuery(), "pump");
  assert.equal(storage.values["maintainops.searchQuery"], "pump");
  assert.equal(state.getWorkOrderPage(), 1);
  assert.equal(state.getPartsPage(), 1);
  assert.equal(state.getRequestsPage(), 1);
  assert.equal(invalidateCount, 2);
  assert.equal(clearedSearchTimers, 1);
  assert.equal(workReloadCount, 0);
  assert.equal(requestReloadCount, 0);
  assert.equal(typeof pendingSearchTask, "function");

  await pendingSearchTask();
  assert.equal(workReloadCount, 1);
  assert.equal(requestReloadCount, 1);
  assert.equal(renderCount, 1);
  assert.deepEqual(searchInput.selectionRange, [4, 4]);
  assert.deepEqual(searchInput.focusOptions, { preventScroll: true });
  assert.deepEqual(scrollCalls, [[0, 640]]);

  await viewWorkSearch.dispatch("click");
  assert.equal(state.getActiveSection(), "work");
  assert.equal(state.getWorkOrderSearchMode(), true);
  assert.equal(storage.values["maintainops.activeSection"], "work");
  assert.equal(storage.values["maintainops.workOrderSearchMode"], "true");
  assert.equal(workReloadCount, 2);

  await closeWorkSearch.dispatch("click");
  assert.equal(state.getWorkOrderSearchMode(), false);
  assert.equal(storage.values["maintainops.workOrderSearchMode"], "false");
  assert.equal(workReloadCount, 3);

  await globalResult.dispatch("click");
  assert.equal(state.getSearchQuery(), "");
  assert.equal(state.getActiveWorkOrderId(), "wo-1");
  assert.equal(state.getActiveSection(), "work");
  assert.equal(state.getWorkOrderSearchMode(), false);
  assert.equal(renderCount, 2);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
