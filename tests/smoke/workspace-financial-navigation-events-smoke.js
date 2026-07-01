const assert = require("node:assert/strict");

global.window = {};

const { bindWorkspaceFinancialNavigationEvents } = require("../../src/utils/workspaceFinancialNavigationEvents.js");

function createElement(dataset = {}) {
  const listeners = {};
  return {
    dataset,
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    dispatch(type, event = {}) {
      for (const handler of listeners[type] || []) handler(event);
    },
  };
}

const card = createElement({ openFinancialAsset: "asset-1" });
const keyboardCard = createElement({ openFinancialAsset: "asset-2" });
const back = createElement({});
const opened = [];
let clearCount = 0;
let renderCount = 0;

bindWorkspaceFinancialNavigationEvents({
  documentRef: {
    querySelectorAll(selector) {
      if (selector === "[data-open-financial-asset]") return [card, keyboardCard];
      if (selector === "[data-back-financial-list]") return [back];
      return [];
    },
  },
  state: {
    setActiveFinancialAssetId(value) {
      opened.push(value);
    },
    clearActiveFinancialAssetId() {
      clearCount += 1;
    },
  },
  renderWorkspace() {
    renderCount += 1;
  },
});

card.dispatch("click");
assert.deepEqual(opened, ["asset-1"]);
assert.equal(renderCount, 1);

keyboardCard.dispatch("keydown", { key: "Tab", preventDefault() { throw new Error("Tab should not open financial detail"); } });
assert.deepEqual(opened, ["asset-1"]);
assert.equal(renderCount, 1);

let prevented = false;
keyboardCard.dispatch("keydown", { key: "Enter", preventDefault() { prevented = true; } });
assert.equal(prevented, true);
assert.deepEqual(opened, ["asset-1", "asset-2"]);
assert.equal(renderCount, 2);

back.dispatch("click");
assert.equal(clearCount, 1);
assert.equal(renderCount, 3);

console.log("workspace financial navigation events smoke passed");
