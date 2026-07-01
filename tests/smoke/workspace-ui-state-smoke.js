const assert = require("node:assert/strict");

global.window = {};
global.localStorage = null;

const { createWorkspaceUiState } = require("../../src/utils/workspaceUiState.js");

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

const storage = createStorage({
  "maintainops.activeSection": "work",
  "maintainops.searchQuery": "pump",
  "maintainops.workOrderSearchMode": "true",
  "maintainops.workOrderPage": "3",
  "maintainops.partsPage": "2",
  "maintainops.financialPage": "4",
  "maintainops.assetStatusFilter": "inactive",
  "maintainops.assetTypeFilter": "tooling",
  "maintainops.assetAreaFilter": "Bay 1",
  "maintainops.partInventoryFilter": "low",
  "maintainops.partSearchQuery": "hose",
  "maintainops.managerDashboardUserId": "tech-1",
  "maintainops.managerDashboardMetric": "blocked",
});

const state = createWorkspaceUiState({ storage });

assert.equal(state.getActiveSection(), "mywork");
assert.equal(storage.values["maintainops.activeSection"], "mywork");
assert.equal(storage.values["maintainops.sectionSplitDone"], "true");
assert.equal(state.getSearchQuery(), "pump");
assert.equal(state.getWorkOrderSearchMode(), true);
assert.equal(state.getWorkOrderPage(), 3);
assert.equal(state.getPartsPage(), 2);
assert.equal(state.getFinancialPage(), 4);
assert.equal(state.getAssetStatusFilter(), "inactive");
assert.equal(state.getAssetTypeFilter(), "tooling");
assert.equal(state.getAssetAreaFilter(), "Bay 1");
assert.equal(state.getPartInventoryFilter(), "low");
assert.equal(state.getPartSearchQuery(), "hose");
assert.equal(state.getManagerDashboardUserId(), "tech-1");
assert.equal(state.getManagerDashboardMetric(), "blocked");

state.setActiveSection("parts");
state.setSearchQuery("motor");
state.setWorkOrderSearchMode(false);
state.setWorkOrderAssigneeFilter("user-1");
state.resetWorkOrderPage();
state.resetPartsPage();
state.resetFinancialPage();
state.setAssetTypeFilter("component");
state.setAssetAreaFilter("Line 2");
state.setPartSearchQuery("belt");
state.setWorkOrderAssigneeFilter("");
state.setManagerDashboardUserId("tech-2");
state.setManagerDashboardMetric("overdue");

assert.equal(state.getActiveSection(), "parts");
assert.equal(storage.values["maintainops.activeSection"], "parts");
assert.equal(state.getSearchQuery(), "motor");
assert.equal(storage.values["maintainops.searchQuery"], "motor");
assert.equal(state.getWorkOrderSearchMode(), false);
assert.equal(storage.values["maintainops.workOrderSearchMode"], "false");
assert.equal(state.getWorkOrderPage(), 1);
assert.equal(storage.values["maintainops.workOrderPage"], "1");
assert.equal(state.getPartsPage(), 1);
assert.equal(storage.values["maintainops.partsPage"], "1");
assert.equal(state.getFinancialPage(), 1);
assert.equal(storage.values["maintainops.financialPage"], "1");
assert.equal(state.getAssetTypeFilter(), "component");
assert.equal(storage.values["maintainops.assetTypeFilter"], "component");
assert.equal(state.getAssetAreaFilter(), "Line 2");
assert.equal(storage.values["maintainops.assetAreaFilter"], "Line 2");
assert.equal(state.getPartSearchQuery(), "belt");
assert.equal(storage.values["maintainops.partSearchQuery"], "belt");
assert.equal(state.getWorkOrderAssigneeFilter(), "");
assert.equal(storage.values["maintainops.workOrderAssigneeFilter"], undefined);
assert.equal(state.getManagerDashboardUserId(), "tech-2");
assert.equal(storage.values["maintainops.managerDashboardUserId"], "tech-2");
assert.equal(state.getManagerDashboardMetric(), "overdue");
assert.equal(storage.values["maintainops.managerDashboardMetric"], "overdue");

const snapshot = state.snapshot();
assert.equal(snapshot.activeSection, "parts");
assert.equal(snapshot.searchQuery, "motor");
assert.equal(snapshot.partSearchQuery, "belt");
assert.equal(snapshot.managerDashboardUserId, "tech-2");
