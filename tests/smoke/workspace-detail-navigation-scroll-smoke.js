const assert = require("node:assert/strict");

function createElement(dataset = {}) {
  const listeners = {};
  return {
    dataset,
    open: false,
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    async dispatch(type, event = {}) {
      for (const handler of listeners[type] || []) await handler(event);
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
const completedHistoryDetails = createElement({ assetId: "asset-1", assetRelationshipSection: "completed-history" });
const completedHistoryNext = createElement({
  assetId: "asset-1",
  assetRelationSection: "completed-history",
  assetRelationPage: "next",
});
const stateValues = {
  activeSection: "assets",
  activeAssetId: null,
  activeWorkOrderId: "wo-1",
  activePartId: "part-1",
};
let renderCount = 0;
let scrollCount = 0;
let relationPage = 1;
const historyLoads = [];
const scrollRestores = [];
const windowRef = {
  scrollY: 460,
  scrollTo(options) {
    scrollRestores.push(options);
  },
  requestAnimationFrame(callback) {
    callback();
  },
};

bindWorkspaceDetailNavigationEvents({
  documentRef: createDocument({
    ".work-card": [],
    ".asset-card": [legacyAssetCard, assetCard],
    "[data-open-asset]": [openAssetButton],
    "[data-asset-id]": [assetCard, keyboardAssetCard],
    "[data-mini-work-order]": [miniWorkOrder],
    "[data-asset-relationship-section]": [completedHistoryDetails],
    "[data-asset-relation-page]": [completedHistoryNext],
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
  getAssetRelationshipPage: () => relationPage,
  loadAssetWorkOrderHistory: async (assetId) => { historyLoads.push(assetId); },
  renderWorkspace: () => { renderCount += 1; },
  scrollToDetailTop: () => { scrollCount += 1; },
  setAssetRelationshipPage: (assetId, section, page) => {
    assert.equal(assetId, "asset-1");
    assert.equal(section, "completed-history");
    relationPage = page;
  },
  windowRef,
});

(async () => {
await assetCard.dispatch("click");
assert.equal(stateValues.activeAssetId, "asset-1");
assert.equal(renderCount, 1);
assert.equal(scrollCount, 1);
assert.deepEqual(historyLoads, []);

await openAssetButton.dispatch("click", { stopPropagation() {} });
assert.equal(stateValues.activeAssetId, "asset-2");
assert.equal(renderCount, 2);
assert.equal(scrollCount, 2);
assert.deepEqual(historyLoads, []);

await keyboardAssetCard.dispatch("keydown", { key: "Enter", preventDefault() {} });
assert.equal(stateValues.activeAssetId, "asset-3");
assert.equal(renderCount, 3);
assert.equal(scrollCount, 3);
assert.deepEqual(historyLoads, []);

completedHistoryDetails.open = true;
await completedHistoryDetails.dispatch("toggle");
assert.deepEqual(historyLoads, ["asset-1"]);
assert.equal(renderCount, 4);
assert.equal(scrollCount, 3);
assert.deepEqual(scrollRestores, [{ top: 460, behavior: "auto" }]);

windowRef.scrollY = 720;
await completedHistoryNext.dispatch("click", { preventDefault() {}, stopPropagation() {} });
assert.equal(relationPage, 2);
assert.equal(renderCount, 5);
assert.equal(scrollCount, 3);
assert.deepEqual(scrollRestores, [
  { top: 460, behavior: "auto" },
  { top: 720, behavior: "auto" },
]);

await miniWorkOrder.dispatch("click");
assert.equal(stateValues.activeWorkOrderId, "wo-2");
assert.equal(stateValues.activeAssetId, null);
assert.equal(stateValues.activeSection, "work");
assert.equal(renderCount, 6);
assert.equal(scrollCount, 4);

console.log("workspace detail navigation scroll smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
