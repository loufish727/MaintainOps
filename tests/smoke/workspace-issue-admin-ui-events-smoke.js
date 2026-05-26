const assert = require("node:assert/strict");

function createButton(dataset = {}) {
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

function createDocument(groups) {
  return {
    querySelectorAll(selector) {
      return groups[selector] || [];
    },
  };
}

global.window = {};
global.document = createDocument({});

require("../../src/utils/workspaceIssueAdminUiEvents.js");

const { bindWorkspaceIssueAdminUiEvents } = window.MaintainOpsWorkspaceIssueAdminUiEvents;

const cancelIssueButton = createButton();
const confirmSqlButton = createButton({ setupAction: "confirm-admin-delete-sql" });
const ignoredSetupButton = createButton({ setupAction: "other-action" });
const storage = {
  values: {},
  setItem(key, value) {
    this.values[key] = value;
  },
};
const stateValues = {
  reportIssueMode: true,
  adminDeleteSqlConfirmed: false,
};
const notices = [];
let renderCount = 0;

bindWorkspaceIssueAdminUiEvents({
  documentRef: createDocument({
    "[data-cancel-app-issue-report]": [cancelIssueButton],
    "[data-setup-action]": [confirmSqlButton, ignoredSetupButton],
  }),
  storage,
  state: {
    setAdminDeleteSqlConfirmed: (value) => { stateValues.adminDeleteSqlConfirmed = value; },
    setReportIssueMode: (value) => { stateValues.reportIssueMode = value; },
  },
  renderWorkspace: () => { renderCount += 1; },
  showNotice: (message) => { notices.push(message); },
});

cancelIssueButton.dispatch("click");
assert.equal(stateValues.reportIssueMode, false);
assert.equal(renderCount, 1);

ignoredSetupButton.dispatch("click");
assert.equal(stateValues.adminDeleteSqlConfirmed, false);
assert.equal(renderCount, 1);
assert.deepEqual(notices, []);

confirmSqlButton.dispatch("click");
assert.equal(stateValues.adminDeleteSqlConfirmed, true);
assert.equal(storage.values["maintainops.adminDeleteSqlConfirmed"], "true");
assert.deepEqual(notices, ["Admin delete SQL marked as applied."]);
assert.equal(renderCount, 2);

bindWorkspaceIssueAdminUiEvents({
  documentRef: createDocument({ "[data-cancel-app-issue-report]": [cancelIssueButton] }),
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace issue/admin UI events smoke passed");
