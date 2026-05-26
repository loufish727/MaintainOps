const assert = require("node:assert/strict");

function createSelect(id) {
  const listeners = {};
  return {
    id,
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    dispatch(type) {
      (listeners[type] || []).forEach((handler) => handler({ currentTarget: this }));
    },
  };
}

function createDocument(selects) {
  return {
    querySelectorAll(selector) {
      return selector === "[data-location-sensitive-asset]" ? selects : [];
    },
  };
}

global.window = {};
global.document = createDocument([]);

require("../../src/utils/workspaceAssetLocationWarningEvents.js");

const { bindWorkspaceAssetLocationWarningEvents } = window.MaintainOpsWorkspaceAssetLocationWarningEvents;

const firstSelect = createSelect("asset-a");
const secondSelect = createSelect("asset-b");
const updates = [];

bindWorkspaceAssetLocationWarningEvents({
  documentRef: createDocument([firstSelect, secondSelect]),
  updateAssetLocationWarning: (select) => {
    updates.push(select.id);
  },
});

assert.deepEqual(updates, ["asset-a", "asset-b"]);

firstSelect.dispatch("change");
assert.deepEqual(updates, ["asset-a", "asset-b", "asset-a"]);

bindWorkspaceAssetLocationWarningEvents({
  documentRef: createDocument([firstSelect]),
});

firstSelect.dispatch("change");
assert.deepEqual(updates, ["asset-a", "asset-b", "asset-a", "asset-a"]);

console.log("workspace asset location warning events smoke passed");
