const assert = require("node:assert/strict");

function createButton(dataset = {}) {
  const listeners = {};
  return {
    dataset,
    textContent: "Copy QR Link",
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
      return selector === "[data-copy-public-request-link]" ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument([]);

require("../../src/utils/workspacePublicRequestLinkCopyEvents.js");

const { bindWorkspacePublicRequestLinkCopyEvents } = window.MaintainOpsWorkspacePublicRequestLinkCopyEvents;

const successButton = createButton({ copyPublicRequestLink: "https://example.test/qr-success" });
let copiedText = null;
let timerDelay = null;

bindWorkspacePublicRequestLinkCopyEvents({
  documentRef: createDocument([successButton]),
  copyTextToClipboard: async (text) => {
    copiedText = text;
    return true;
  },
  setTimeoutRef: (callback, delay) => {
    timerDelay = delay;
    callback();
  },
});

(async () => {
  await successButton.dispatch("click");
  assert.equal(copiedText, "https://example.test/qr-success");
  assert.equal(timerDelay, 1600);
  assert.equal(successButton.textContent, "Copy QR Link");

  const failButton = createButton({ copyPublicRequestLink: "https://example.test/qr-fail" });
  let observedFailureLabel = null;

  bindWorkspacePublicRequestLinkCopyEvents({
    documentRef: createDocument([failButton]),
    copyTextToClipboard: async () => false,
    setTimeoutRef: (callback) => {
      observedFailureLabel = failButton.textContent;
      callback();
    },
  });

  await failButton.dispatch("click");
  assert.equal(observedFailureLabel, "Copy failed");
  assert.equal(failButton.textContent, "Copy QR Link");

  bindWorkspacePublicRequestLinkCopyEvents({
    documentRef: createDocument([failButton]),
    copyTextToClipboard: null,
    setTimeoutRef: () => {
      throw new Error("missing copy callback should not bind");
    },
  });

  console.log("workspace public request link copy events smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
