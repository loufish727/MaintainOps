const assert = require("node:assert/strict");

global.window = {};
global.localStorage = null;

const { createWorkspaceUiState } = require("../../src/utils/workspaceUiState.js");
require("../../src/utils/workspaceFilterPaginationEvents.js");

const { bindWorkspaceFilterPaginationEvents } = window.MaintainOpsWorkspaceFilterPaginationEvents;

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

function createButton(dataset, disabled = false) {
  const listeners = {};
  return {
    dataset,
    disabled,
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    async dispatch(type) {
      for (const handler of listeners[type] || []) {
        await handler();
      }
    },
  };
}

function createField(dataset, value) {
  const field = createButton(dataset);
  field.value = value;
  return field;
}

const storage = createStorage({
  "maintainops.workOrderPage": "4",
  "maintainops.financialPage": "2",
  "maintainops.requestsPage": "3",
  "maintainops.schedulesPage": "2",
  "maintainops.proceduresPage": "2",
  "maintainops.membersPage": "2",
  "maintainops.messageThreadsPage": "2",
  "maintainops.planningFollowUpPage": "2",
});
const state = createWorkspaceUiState({ storage });
const statusRequests = createButton({ statusFilter: "requests" });
const myWorkCreated = createButton({ myWorkFilter: "created" });
const workFilterVendor = createButton({ workOrderFilter: "vendor" });
const workSortDue = createButton({ workSort: "due" });
const requestConverted = createButton({ requestFilter: "converted" });
const workNext = createButton({ workPage: "next" });
const assetNext = createButton({ assetsPage: "next" });
const financialNext = createButton({ financialPage: "next" });
const financialArea = createField({ financialFilter: "area" }, "Bay 3");
const requestNext = createButton({ listPage: "requests", pageDirection: "next" });
const scheduleNext = createButton({ listPage: "schedules", pageDirection: "next" });
const procedureNext = createButton({ listPage: "procedures", pageDirection: "next" });
const memberNext = createButton({ listPage: "members", pageDirection: "next" });
const messageNext = createButton({ listPage: "messages", pageDirection: "next" });
const planningFollowUpNext = createButton({ listPage: "planning-follow-up", pageDirection: "next" });
const clearAssignee = createButton({});

const doc = {
  querySelectorAll(selector) {
    if (selector === "[data-status-filter]") return [statusRequests];
    if (selector === "[data-my-work-filter]") return [myWorkCreated];
    if (selector === "[data-work-order-filter]") return [workFilterVendor];
    if (selector === "[data-clear-assignee-filter]") return [clearAssignee];
    if (selector === "[data-work-sort]") return [workSortDue];
    if (selector === "[data-request-filter]") return [requestConverted];
    if (selector === "[data-work-page]") return [workNext];
    if (selector === "[data-parts-page]") return [];
    if (selector === "[data-assets-page]") return [assetNext];
    if (selector === "[data-financial-page]") return [financialNext];
    if (selector === "[data-financial-filter]") return [financialArea];
    if (selector === "[data-list-page]") return [requestNext, scheduleNext, procedureNext, memberNext, messageNext, planningFollowUpNext];
    return [];
  },
};

let workReloadCount = 0;
let requestReloadCount = 0;
let renderCount = 0;
let invalidateCount = 0;

bindWorkspaceFilterPaginationEvents({
  documentRef: doc,
  storage,
  state,
  resetWorkOrderPage: () => state.resetWorkOrderPage(),
  resetRequestsPage: () => state.resetRequestsPage(),
  reloadWorkOrderQueue: async () => {
    workReloadCount += 1;
  },
  reloadRequestQueue: async () => {
    requestReloadCount += 1;
  },
  renderWorkspace: () => {
    renderCount += 1;
  },
  invalidateExactWorkOrderSearchCache: () => {
    invalidateCount += 1;
  },
});

(async () => {
  await statusRequests.dispatch("click");
  assert.equal(state.getActiveStatusFilter(), "requests");
  assert.equal(state.getWorkOrderPage(), 1);
  assert.equal(state.getRequestsPage(), 1);
  assert.equal(workReloadCount, 1);
  assert.equal(requestReloadCount, 1);

  await myWorkCreated.dispatch("click");
  assert.equal(state.getMyWorkFilter(), "created");
  assert.equal(storage.values["maintainops.myWorkFilter"], "created");
  assert.equal(workReloadCount, 2);

  await workFilterVendor.dispatch("click");
  assert.equal(state.getWorkOrderFilter(), "vendor");
  assert.equal(state.getWorkOrderAssigneeFilter(), "");
  assert.equal(storage.values["maintainops.workOrderFilter"], "vendor");
  assert.equal(storage.values["maintainops.workOrderAssigneeFilter"], undefined);
  assert.equal(workReloadCount, 3);

  await workSortDue.dispatch("click");
  assert.equal(state.getWorkSort(), "due");
  assert.equal(storage.values["maintainops.workSort"], "due");
  assert.equal(invalidateCount, 1);
  assert.equal(workReloadCount, 4);

  await requestConverted.dispatch("click");
  assert.equal(state.getRequestViewFilter(), "converted");
  assert.equal(state.getRequestsPage(), 1);
  assert.equal(storage.values["maintainops.requestViewFilter"], "converted");
  assert.equal(requestReloadCount, 2);

  await workNext.dispatch("click");
  assert.equal(state.getWorkOrderPage(), 2);
  assert.equal(storage.values["maintainops.workOrderPage"], "2");
  assert.equal(workReloadCount, 5);

  await assetNext.dispatch("click");
  assert.equal(state.getAssetsPage(), 2);
  assert.equal(storage.values["maintainops.assetsPage"], "2");
  assert.equal(renderCount, 1);

  await financialNext.dispatch("click");
  assert.equal(state.getFinancialPage(), 3);
  assert.equal(storage.values["maintainops.financialPage"], "3");
  assert.equal(state.getAssetsPage(), 2);
  assert.equal(storage.values["maintainops.assetsPage"], "2");
  assert.equal(renderCount, 2);

  await financialArea.dispatch("change");
  assert.equal(state.getFinancialAreaFilter(), "Bay 3");
  assert.equal(storage.values["maintainops.financialAreaFilter"], "Bay 3");
  assert.equal(state.getFinancialPage(), 1);
  assert.equal(storage.values["maintainops.financialPage"], "1");
  assert.equal(renderCount, 3);

  await requestNext.dispatch("click");
  assert.equal(state.getRequestsPage(), 2);
  assert.equal(storage.values["maintainops.requestsPage"], "2");
  assert.equal(requestReloadCount, 3);

  await scheduleNext.dispatch("click");
  await procedureNext.dispatch("click");
  await memberNext.dispatch("click");
  await messageNext.dispatch("click");
  await planningFollowUpNext.dispatch("click");
  assert.equal(state.getSchedulesPage(), 3);
  assert.equal(state.getProceduresPage(), 3);
  assert.equal(state.getMembersPage(), 3);
  assert.equal(state.getMessageThreadsPage(), 3);
  assert.equal(state.getPlanningPage("follow-up"), 3);
  assert.equal(storage.values["maintainops.messageThreadsPage"], "3");
  assert.equal(storage.values["maintainops.planningFollowUpPage"], "3");
  assert.equal(renderCount, 8);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
