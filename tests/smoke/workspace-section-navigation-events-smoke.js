const assert = require("node:assert/strict");

function createButton(section) {
  const listeners = {};
  return {
    dataset: { section },
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    async dispatch(type) {
      for (const handler of listeners[type] || []) await handler();
    },
  };
}

function createDocument(buttons) {
  return {
    querySelectorAll(selector) {
      return selector === "[data-section]" ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument([]);

require("../../src/utils/workspaceSectionNavigationEvents.js");

const { bindWorkspaceSectionNavigationEvents } = window.MaintainOpsWorkspaceSectionNavigationEvents;

const workButton = createButton("work");
const myWorkButton = createButton("mywork");
const requestsButton = createButton("requests");
const equipmentButton = createButton("equipment");
const managerButton = createButton("manager");
const setupButton = createButton("setup");
const performanceButton = createButton("performance");
const teamButton = createButton("team");
const blockedButton = createButton("blocked");
const storage = {
  values: {},
  setItem(key, value) {
    this.values[key] = value;
  },
};
const stateValues = {
  activeSection: "mywork",
  activeWorkOrderId: "wo-1",
  activeAssetId: "asset-1",
  activePartId: "part-1",
  showPartSourceManager: true,
  createWorkOrderMode: true,
  quickFixMode: true,
  reportIssueMode: true,
  quickFixAssetId: "asset-2",
  quickFixRequestId: "request-1",
};
let workSearchModeCalls = [];
let resetCount = 0;
let renderCount = 0;
let scrollCount = 0;
let workReloadCount = 0;
let requestReloadCount = 0;
let managerLoadCount = 0;
let setupStorageLoadCount = 0;
let performanceLoadCount = 0;
let teamWorkloadReloadCount = 0;

(async () => {
  bindWorkspaceSectionNavigationEvents({
    documentRef: createDocument([workButton, myWorkButton, requestsButton, equipmentButton, managerButton, setupButton, performanceButton, teamButton, blockedButton]),
    storage,
    state: {
      setActiveAssetId: (value) => { stateValues.activeAssetId = value; },
      setActivePartId: (value) => { stateValues.activePartId = value; },
      setActiveSection: (value) => { stateValues.activeSection = value; },
      setActiveWorkOrderId: (value) => { stateValues.activeWorkOrderId = value; },
      setCreateWorkOrderMode: (value) => { stateValues.createWorkOrderMode = value; },
      setQuickFixAssetId: (value) => { stateValues.quickFixAssetId = value; },
      setQuickFixMode: (value) => { stateValues.quickFixMode = value; },
      setQuickFixRequestId: (value) => { stateValues.quickFixRequestId = value; },
      setReportIssueMode: (value) => { stateValues.reportIssueMode = value; },
      setShowPartSourceManager: (value) => { stateValues.showPartSourceManager = value; },
    },
    visibleNavItems: () => [["work"], ["mywork"], ["requests"], ["equipment"], ["manager"], ["setup"], ["performance"], ["team"]],
    setWorkOrderSearchMode: (value) => { workSearchModeCalls.push(value); },
    resetWorkOrderPage: () => { resetCount += 1; },
    renderWorkspace: () => { renderCount += 1; },
    scrollToSectionTop: () => { scrollCount += 1; },
    reloadWorkOrderQueue: async () => { workReloadCount += 1; },
    reloadRequestQueue: async () => { requestReloadCount += 1; },
    reloadTeamWorkloads: async () => { teamWorkloadReloadCount += 1; renderCount += 1; },
    loadManagerDashboardCompletedWork: async () => { managerLoadCount += 1; },
    loadSetupStorageDashboard: async () => { setupStorageLoadCount += 1; },
    loadPlatformPerformance: async () => { performanceLoadCount += 1; },
  });

  await workButton.dispatch("click");
  assert.equal(stateValues.activeSection, "work");
  assert.equal(stateValues.activeWorkOrderId, null);
  assert.equal(stateValues.activeAssetId, null);
  assert.equal(stateValues.activePartId, null);
  assert.equal(stateValues.showPartSourceManager, false);
  assert.equal(stateValues.createWorkOrderMode, false);
  assert.equal(stateValues.quickFixMode, false);
  assert.equal(stateValues.reportIssueMode, false);
  assert.equal(stateValues.quickFixAssetId, null);
  assert.equal(stateValues.quickFixRequestId, null);
  assert.deepEqual(workSearchModeCalls, []);
  assert.equal(storage.values["maintainops.activeSection"], "work");
  assert.equal(resetCount, 1);
  assert.equal(renderCount, 1);
  assert.equal(scrollCount, 1);
  assert.equal(workReloadCount, 1);
  assert.equal(requestReloadCount, 0);

  await myWorkButton.dispatch("click");
  assert.equal(stateValues.activeSection, "mywork");
  assert.deepEqual(workSearchModeCalls, [false]);
  assert.equal(storage.values["maintainops.activeSection"], "mywork");
  assert.equal(resetCount, 2);
  assert.equal(renderCount, 2);
  assert.equal(scrollCount, 2);
  assert.equal(workReloadCount, 2);
  assert.equal(requestReloadCount, 0);

  await requestsButton.dispatch("click");
  assert.equal(stateValues.activeSection, "requests");
  assert.deepEqual(workSearchModeCalls, [false, false]);
  assert.equal(storage.values["maintainops.activeSection"], "requests");
  assert.equal(resetCount, 3);
  assert.equal(renderCount, 3);
  assert.equal(scrollCount, 3);
  assert.equal(workReloadCount, 2);
  assert.equal(requestReloadCount, 1);

  await managerButton.dispatch("click");
  assert.equal(stateValues.activeSection, "manager");
  assert.equal(storage.values["maintainops.activeSection"], "manager");
  assert.equal(renderCount, 5);
  assert.equal(scrollCount, 4);
  assert.equal(resetCount, 4);
  assert.equal(managerLoadCount, 1);

  await setupButton.dispatch("click");
  assert.equal(stateValues.activeSection, "setup");
  assert.equal(storage.values["maintainops.activeSection"], "setup");
  assert.equal(renderCount, 7);
  assert.equal(scrollCount, 5);
  assert.equal(resetCount, 5);
  assert.equal(setupStorageLoadCount, 1);

  await equipmentButton.dispatch("click");
  assert.equal(stateValues.activeSection, "equipment");
  assert.deepEqual(workSearchModeCalls, [false, false, false, false, false]);
  assert.equal(storage.values["maintainops.activeSection"], "equipment");
  assert.equal(resetCount, 6);
  assert.equal(renderCount, 8);
  assert.equal(scrollCount, 6);
  assert.equal(workReloadCount, 2);
  assert.equal(requestReloadCount, 1);

  await blockedButton.dispatch("click");
  assert.equal(stateValues.activeSection, "equipment");
  assert.equal(renderCount, 8);
  assert.equal(scrollCount, 6);
  assert.equal(workReloadCount, 2);

  await teamButton.dispatch("click");
  assert.equal(stateValues.activeSection, "team");
  assert.equal(storage.values["maintainops.activeSection"], "team");
  assert.equal(resetCount, 7);
  assert.equal(renderCount, 10);
  assert.equal(scrollCount, 7);
  assert.equal(teamWorkloadReloadCount, 1);

  await performanceButton.dispatch("click");
  assert.equal(stateValues.activeSection, "performance");
  assert.equal(storage.values["maintainops.activeSection"], "performance");
  assert.equal(resetCount, 8);
  assert.equal(renderCount, 11);
  assert.equal(scrollCount, 8);
  assert.equal(performanceLoadCount, 1);

  bindWorkspaceSectionNavigationEvents({
    documentRef: createDocument([workButton]),
    state: null,
    renderWorkspace: () => {
      throw new Error("missing state should not render");
    },
  });

  console.log("workspace section navigation events smoke passed");
})();
