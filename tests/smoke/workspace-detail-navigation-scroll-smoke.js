const assert = require("node:assert/strict");

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

function createDocument(groups = {}) {
  return {
    querySelector() {
      return null;
    },
    querySelectorAll(selector) {
      return groups[selector] || [];
    },
  };
}

global.window = {};
global.document = createDocument();
global.localStorage = { setItem() {} };

require("../../src/utils/workspaceDetailNavigationEvents.js");

const { bindWorkspaceDetailNavigationEvents } = window.MaintainOpsWorkspaceDetailNavigationEvents;

const legacyAssetCard = createElement({});
const openAssetButton = createElement({ openAsset: "asset-2" });
const assetCard = createElement({ assetId: "asset-1" });
const keyboardAssetCard = createElement({ assetId: "asset-3" });
const miniWorkOrder = createElement({ miniWorkOrder: "wo-2" });
const stateValues = {
  activeSection: "assets",
  activeAssetId: null,
  activeWorkOrderId: "wo-1",
  activePartId: "part-1",
};
let renderCount = 0;
let scrollCount = 0;

bindWorkspaceDetailNavigationEvents({
  documentRef: createDocument({
    ".work-card": [],
    ".asset-card": [legacyAssetCard, assetCard],
    "[data-open-asset]": [openAssetButton],
    "[data-asset-id]": [assetCard, keyboardAssetCard],
    "[data-mini-work-order]": [miniWorkOrder],
  }),
  storage: { setItem() {} },
  state: {
    getActiveSection: () => stateValues.activeSection,
    setActiveAssetId: (value) => { stateValues.activeAssetId = value; },
    setActivePartId: (value) => { stateValues.activePartId = value; },
    setActiveSection: (value) => { stateValues.activeSection = value; },
    setActiveWorkOrderId: (value) => { stateValues.activeWorkOrderId = value; },
    setCreateWorkOrderMode() {},
    setPendingDeleteAssetId() {},
    setQuickFixAssetId() {},
    setQuickFixMode() {},
    setQuickFixRequestId() {},
    setReportIssueMode() {},
  },
  renderWorkspace: () => { renderCount += 1; },
  scrollToDetailTop: () => { scrollCount += 1; },
});

assetCard.dispatch("click");
assert.equal(stateValues.activeAssetId, "asset-1");
assert.equal(renderCount, 1);
assert.equal(scrollCount, 1);

openAssetButton.dispatch("click", { stopPropagation() {} });
assert.equal(stateValues.activeAssetId, "asset-2");
assert.equal(renderCount, 2);
assert.equal(scrollCount, 2);

keyboardAssetCard.dispatch("keydown", { key: "Enter", preventDefault() {} });
assert.equal(stateValues.activeAssetId, "asset-3");
assert.equal(renderCount, 3);
assert.equal(scrollCount, 3);

miniWorkOrder.dispatch("click");
assert.equal(stateValues.activeWorkOrderId, "wo-2");
assert.equal(stateValues.activeAssetId, null);
assert.equal(stateValues.activeSection, "work");
assert.equal(renderCount, 4);
assert.equal(scrollCount, 4);

console.log("workspace detail navigation scroll smoke passed");
