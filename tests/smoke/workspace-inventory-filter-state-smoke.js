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
const sourceSortSelect = createButton({ partSort: "" });
sourceSortSelect.value = "source";
const runningAssetButton = createButton({ assetStatusFilter: "running" });
const degradedAssetButton = createButton({ assetStatusFilter: "degraded" });
const toolingAssetButton = createButton({ assetTypeFilter: "tooling" });
const areaSelect = createButton({ assetAreaFilter: "Bay 1" });
areaSelect.value = "Bay 1";
const doc = {
  querySelectorAll(selector) {
    if (selector === "[data-part-inventory-filter]") return [lowPartsButton];
    if (selector === "[data-part-sort]") return [sourceSortSelect];
    if (selector === "[data-asset-status-filter]") return [runningAssetButton, degradedAssetButton];
    if (selector === "[data-asset-type-filter]") return [toolingAssetButton];
    if (selector === "[data-asset-area-filter]") return [areaSelect];
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

state.setPartsPage(3);
sourceSortSelect.dispatch("change");
assert.equal(state.getPartSort(), "source");
assert.equal(state.getPartsPage(), 1);
assert.equal(storage.values["maintainops.partSort"], "source");
assert.equal(storage.values["maintainops.partsPage"], "1");
assert.equal(renderCount, 2);

runningAssetButton.dispatch("click");
assert.equal(state.getAssetStatusFilter(), "running");
assert.equal(state.getAssetTypeFilter(), "all");
assert.equal(state.getAssetsPage(), 1);
assert.equal(storage.values["maintainops.assetStatusFilter"], "running");
assert.equal(storage.values["maintainops.assetTypeFilter"], "all");
assert.equal(storage.values["maintainops.assetsPage"], "1");
assert.equal(renderCount, 3);

toolingAssetButton.dispatch("click");
assert.equal(state.getAssetStatusFilter(), "all");
assert.equal(state.getAssetTypeFilter(), "tooling");
assert.equal(storage.values["maintainops.assetStatusFilter"], "all");
assert.equal(storage.values["maintainops.assetTypeFilter"], "tooling");
assert.equal(renderCount, 4);

toolingAssetButton.dispatch("click");
assert.equal(state.getAssetTypeFilter(), "all");
assert.equal(storage.values["maintainops.assetTypeFilter"], "all");
assert.equal(renderCount, 5);

runningAssetButton.dispatch("click");
runningAssetButton.dispatch("click");
assert.equal(state.getAssetStatusFilter(), "all");
assert.equal(storage.values["maintainops.assetStatusFilter"], "all");
assert.equal(renderCount, 7);

state.setAssetsPage(4);
degradedAssetButton.dispatch("click");
assert.equal(state.getAssetStatusFilter(), "degraded");
assert.equal(state.getAssetTypeFilter(), "all");
assert.equal(state.getAssetsPage(), 1);
assert.equal(storage.values["maintainops.assetStatusFilter"], "degraded");
assert.equal(storage.values["maintainops.assetTypeFilter"], "all");
assert.equal(storage.values["maintainops.assetsPage"], "1");
assert.equal(renderCount, 8);

state.setAssetsPage(5);
areaSelect.dispatch("change");
assert.equal(state.getAssetAreaFilter(), "Bay 1");
assert.equal(state.getAssetsPage(), 1);
assert.equal(storage.values["maintainops.assetAreaFilter"], "Bay 1");
assert.equal(storage.values["maintainops.assetsPage"], "1");
assert.equal(renderCount, 9);

areaSelect.value = "";
areaSelect.dispatch("change");
assert.equal(state.getAssetAreaFilter(), "all");
assert.equal(storage.values["maintainops.assetAreaFilter"], "all");
assert.equal(renderCount, 10);
