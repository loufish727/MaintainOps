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
  const selectors = groups.__selectors || {};
  return {
    querySelector(selector) {
      return selectors[selector] || null;
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

const financialAssetCard = createElement({ openFinancialAsset: "asset-financial" });
const openAssetButton = createElement({ openAsset: "asset-2" });
const assetCard = createElement({ assetId: "asset-1" });
const keyboardAssetCard = createElement({ assetId: "asset-3" });
const miniWorkOrder = createElement({ miniWorkOrder: "wo-2" });
const photoJumpButton = createElement({ workPhotoJump: "wo-photo" });
const photoTarget = {
  open: false,
  scrolled: false,
  scrollIntoView(options) {
    this.scrolled = options;
  },
};
const completedHistoryDetails = createElement({ assetId: "asset-1", assetRelationshipSection: "completed-history" });
const completedHistoryNext = createElement({
  assetId: "asset-1",
  assetRelationSection: "completed-history",
  assetRelationPage: "next",
});
const openAssetHistory = createElement({ openAssetHistory: "asset-1" });
const backAssetHistory = createElement({ backAssetHistory: "asset-1" });
const assetHistoryNext = createElement({
  assetId: "asset-1",
  assetHistoryPage: "next",
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
let historyPage = 1;
let activeAssetHistoryId = null;
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
    ".asset-card": [financialAssetCard, assetCard],
    "[data-open-asset]": [openAssetButton],
    "[data-work-photo-jump]": [photoJumpButton],
    "[data-asset-id]": [assetCard, keyboardAssetCard],
    "[data-mini-work-order]": [miniWorkOrder],
    "[data-asset-relationship-section]": [completedHistoryDetails],
    "[data-asset-relation-page]": [completedHistoryNext],
    "[data-open-asset-history]": [openAssetHistory],
    "[data-back-asset-history]": [backAssetHistory],
    "[data-asset-history-page]": [assetHistoryNext],
    __selectors: {
      "#work-order-photos-target": photoTarget,
    },
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
  getAssetRelationshipPage: (assetId, section) => section === "asset-history" ? historyPage : relationPage,
  loadAssetEventsForAssetIds: async (assetIds) => { historyLoads.push(`asset-events:${assetIds.join(",")}`); },
  loadAssetWorkOrderHistory: async (assetId) => { historyLoads.push(assetId); },
  renderWorkspace: () => { renderCount += 1; },
  scrollToDetailTop: () => { scrollCount += 1; },
  setAssetRelationshipPage: (assetId, section, page) => {
    assert.equal(assetId, "asset-1");
    if (section === "asset-history") historyPage = page;
    else {
      assert.equal(section, "completed-history");
      relationPage = page;
    }
  },
  setActiveAssetHistoryId: (value) => { activeAssetHistoryId = value; },
  windowRef,
});

(async () => {
await financialAssetCard.dispatch("click");
assert.equal(stateValues.activeAssetId, null);
assert.equal(stateValues.activeSection, "assets");
assert.equal(renderCount, 0);
assert.equal(scrollCount, 0);

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
assert.deepEqual(scrollRestores, []);

windowRef.scrollY = 900;
await openAssetHistory.dispatch("click", { preventDefault() {}, stopPropagation() {} });
assert.deepEqual(historyLoads, ["asset-1", "asset-events:asset-1"]);
assert.equal(renderCount, 5);
assert.equal(scrollCount, 4);
assert.equal(activeAssetHistoryId, "asset-1");
assert.deepEqual(scrollRestores, []);

windowRef.scrollY = 1200;
assert.equal(windowRef.scrollY, 1200);
assert.deepEqual(scrollRestores, []);

windowRef.scrollY = 720;
await completedHistoryNext.dispatch("click", { preventDefault() {}, stopPropagation() {} });
assert.equal(relationPage, 2);
assert.equal(renderCount, 6);
assert.equal(scrollCount, 4);
assert.deepEqual(scrollRestores, []);

await assetHistoryNext.dispatch("click", { preventDefault() {}, stopPropagation() {} });
assert.equal(historyPage, 2);
assert.equal(renderCount, 7);
assert.equal(scrollCount, 5);
assert.deepEqual(scrollRestores, []);

await backAssetHistory.dispatch("click", { preventDefault() {}, stopPropagation() {} });
assert.equal(stateValues.activeAssetId, "asset-1");
assert.equal(activeAssetHistoryId, null);
assert.equal(renderCount, 8);
assert.equal(scrollCount, 6);
assert.deepEqual(scrollRestores, []);

await miniWorkOrder.dispatch("click");
assert.equal(stateValues.activeWorkOrderId, "wo-2");
assert.equal(stateValues.activeAssetId, null);
assert.equal(stateValues.activeSection, "work");
assert.equal(activeAssetHistoryId, null);
assert.equal(renderCount, 9);
assert.equal(scrollCount, 7);

await photoJumpButton.dispatch("click", { preventDefault() {}, stopPropagation() {} });
assert.equal(stateValues.activeWorkOrderId, "wo-photo");
assert.equal(stateValues.activeAssetId, null);
assert.equal(stateValues.activeSection, "work");
assert.equal(renderCount, 10);
assert.equal(scrollCount, 7);
assert.equal(photoTarget.open, true);
assert.deepEqual(photoTarget.scrolled, { behavior: "smooth", block: "start" });

console.log("workspace detail navigation scroll smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
