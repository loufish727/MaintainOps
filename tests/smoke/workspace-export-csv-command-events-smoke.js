const assert = require("node:assert/strict");

function createButton() {
  const listeners = {};
  return {
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    dispatch(type) {
      for (const handler of listeners[type] || []) handler();
    },
  };
}

function createDocument(buttons) {
  return {
    querySelectorAll(selector) {
      return selector === '[data-command-action="export-csv"]' ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument([]);

require("../../src/utils/workspaceExportCsvCommandEvents.js");

const { bindWorkspaceExportCsvCommandEvents } = window.MaintainOpsWorkspaceExportCsvCommandEvents;

const exportButton = createButton();
let exportCount = 0;

bindWorkspaceExportCsvCommandEvents({
  documentRef: createDocument([exportButton]),
  exportActiveSectionCsv: () => { exportCount += 1; },
});

exportButton.dispatch("click");
assert.equal(exportCount, 1);

const inertButton = createButton();
bindWorkspaceExportCsvCommandEvents({
  documentRef: createDocument([inertButton]),
  exportActiveSectionCsv: null,
});

inertButton.dispatch("click");
assert.equal(exportCount, 1);

console.log("workspace export csv command events smoke passed");
