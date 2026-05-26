const assert = require("node:assert/strict");

global.window = {};
global.localStorage = null;

const { createWorkspaceUiState } = require("../../src/utils/workspaceUiState.js");
require("../../src/utils/workspaceInventoryFilterEvents.js");

const { bindWorkspaceInventoryFilterEvents } = window.MaintainOpsWorkspaceInventoryFilterEvents;

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

const storage = createStorage({
  "maintainops.partsPage": "4",
  "maintainops.assetsPage": "3",
});
const state = createWorkspaceUiState({ storage });
const lowPartsButton = createButton({ partInventoryFilter: "low" });
const runningAssetButton = createButton({ assetStatusFilter: "running" });
const doc = {
  querySelectorAll(selector) {
    if (selector === "[data-part-inventory-filter]") return [lowPartsButton];
    if (selector === "[data-asset-status-filter]") return [runningAssetButton];
    return [];
  },
};

let renderCount = 0;

bindWorkspaceInventoryFilterEvents({
  documentRef: doc,
  storage,
  state,
  resetPartsPage: () => state.resetPartsPage(),
  resetAssetsPage: () => state.resetAssetsPage(),
  renderWorkspace: () => {
    renderCount += 1;
  },
});

lowPartsButton.dispatch("click");
assert.equal(state.getPartInventoryFilter(), "low");
assert.equal(state.getPartsPage(), 1);
assert.equal(storage.values["maintainops.partInventoryFilter"], "low");
assert.equal(storage.values["maintainops.partsPage"], "1");
assert.equal(renderCount, 1);

runningAssetButton.dispatch("click");
assert.equal(state.getAssetStatusFilter(), "running");
assert.equal(state.getAssetsPage(), 1);
assert.equal(storage.values["maintainops.assetStatusFilter"], "running");
assert.equal(storage.values["maintainops.assetsPage"], "1");
assert.equal(renderCount, 2);

runningAssetButton.dispatch("click");
assert.equal(state.getAssetStatusFilter(), "all");
assert.equal(storage.values["maintainops.assetStatusFilter"], "all");
assert.equal(renderCount, 3);
