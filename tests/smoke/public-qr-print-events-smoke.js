const assert = require("node:assert/strict");

function createButton() {
  const listeners = {};
  return {
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    dispatch(type) {
      (listeners[type] || []).forEach((handler) => handler());
    },
  };
}

function createDocument(button) {
  return {
    querySelector(selector) {
      return selector === "#print-public-qr" ? button : null;
    },
  };
}

global.window = { print() {} };
global.document = createDocument(null);

require("../../src/utils/publicQrPrintEvents.js");

const { bindPublicQrPrintEvents } = window.MaintainOpsPublicQrPrintEvents;

const button = createButton();
let printCount = 0;

bindPublicQrPrintEvents({
  documentRef: createDocument(button),
  printRef: () => {
    printCount += 1;
  },
});

button.dispatch("click");
assert.equal(printCount, 1);

bindPublicQrPrintEvents({
  documentRef: createDocument(null),
  printRef: () => {
    throw new Error("missing button should not print");
  },
});

console.log("public QR print events smoke passed");
