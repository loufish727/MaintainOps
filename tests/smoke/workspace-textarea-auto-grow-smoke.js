const assert = require("node:assert/strict");

function createTextarea(scrollHeight) {
  const listeners = {};
  return {
    scrollHeight,
    style: { height: "" },
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    dispatch(type) {
      (listeners[type] || []).forEach((handler) => handler());
    },
  };
}

function createDocument(fields) {
  return {
    querySelectorAll(selector) {
      return selector === "textarea" ? fields : [];
    },
  };
}

global.window = {};
global.document = createDocument([]);

require("../../src/utils/workspaceTextareaAutoGrow.js");

const { autoGrowTextarea, bindWorkspaceTextareaAutoGrow } = window.MaintainOpsWorkspaceTextareaAutoGrow;

const field = createTextarea(84);
autoGrowTextarea(field);
assert.equal(field.style.height, "84px");

field.scrollHeight = 128;
bindWorkspaceTextareaAutoGrow({ documentRef: createDocument([field]) });
assert.equal(field.style.height, "128px");

field.scrollHeight = 192;
field.dispatch("input");
assert.equal(field.style.height, "192px");

autoGrowTextarea(null);

console.log("workspace textarea auto grow smoke passed");
