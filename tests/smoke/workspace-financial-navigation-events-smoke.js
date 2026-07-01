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
const openEquipment = createElement({ openFinancialEquipment: "asset-3" });
const opened = [];
const equipmentOpened = [];
let clearCount = 0;
let renderCount = 0;
let scrollCount = 0;

bindWorkspaceFinancialNavigationEvents({
  documentRef: {
    querySelectorAll(selector) {
      if (selector === "[data-open-financial-asset]") return [card, keyboardCard];
      if (selector === "[data-back-financial-list]") return [back];
      if (selector === "[data-open-financial-equipment]") return [openEquipment];
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
    setActiveAssetId(value) {
      equipmentOpened.push(["asset", value]);
    },
    setActiveWorkOrderId(value) {
      equipmentOpened.push(["work", value]);
    },
    setActivePartId(value) {
      equipmentOpened.push(["part", value]);
    },
    setActiveSection(value) {
      equipmentOpened.push(["section", value]);
    },
  },
  renderWorkspace() {
    renderCount += 1;
  },
  scrollToDetailTop() {
    scrollCount += 1;
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

openEquipment.dispatch("click");
assert.equal(clearCount, 2);
assert.deepEqual(equipmentOpened, [
  ["asset", "asset-3"],
  ["work", null],
  ["part", null],
  ["section", "assets"],
]);
assert.equal(renderCount, 4);
assert.equal(scrollCount, 1);

console.log("workspace financial navigation events smoke passed");
