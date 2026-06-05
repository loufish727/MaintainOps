const assert = require("node:assert/strict");

global.window = {
  requestAnimationFrame(callback) {
    callback();
  },
};

const { bindWorkspaceManagerDashboardEvents } = require("../../src/utils/workspaceManagerDashboardEvents.js");

function createElement(dataset = {}) {
  return {
    dataset,
    listeners: {},
    addEventListener(type, handler) {
      this.listeners[type] = handler;
    },
    click() {
      this.listeners.click();
    },
    scrollIntoViewCalled: false,
    scrollIntoView() {
      this.scrollIntoViewCalled = true;
    },
  };
}

const drillButton = createElement({ managerDrillUser: "tech-1", managerDrillMetric: "blocked" });
const clearButton = createElement({});
const requestJump = createElement({ managerRequestJump: "converted" });
const drillPanel = createElement({});
let renderCount = 0;
const stored = {};
const state = {
  userId: "",
  metric: "",
  section: "manager",
  requestFilter: "active",
  setManagerDashboardUserId(value) {
    this.userId = value;
  },
  setManagerDashboardMetric(value) {
    this.metric = value;
  },
  setActiveSection(value) {
    this.section = value;
  },
  setRequestViewFilter(value) {
    this.requestFilter = value;
  },
};

const documentRef = {
  querySelectorAll(selector) {
    if (selector === "[data-manager-drill-user][data-manager-drill-metric]") return [drillButton];
    if (selector === "[data-manager-drill-clear]") return [clearButton];
    if (selector === "[data-manager-request-jump]") return [requestJump];
    return [];
  },
  querySelector(selector) {
    if (selector === "[data-manager-drill-in]") return drillPanel;
    return null;
  },
};

bindWorkspaceManagerDashboardEvents({
  documentRef,
  state,
  storage: {
    setItem(key, value) {
      stored[key] = value;
    },
  },
  renderWorkspace: () => { renderCount += 1; },
  windowRef: global.window,
});

drillButton.click();
assert.equal(state.userId, "tech-1");
assert.equal(state.metric, "blocked");
assert.equal(renderCount, 1);
assert.equal(drillPanel.scrollIntoViewCalled, true);

clearButton.click();
assert.equal(state.userId, "");
assert.equal(state.metric, "open");
assert.equal(renderCount, 2);

requestJump.click();
assert.equal(state.section, "requests");
assert.equal(state.requestFilter, "converted");
assert.equal(stored["maintainops.activeSection"], "requests");
assert.equal(renderCount, 3);

console.log("manager dashboard events smoke passed");
