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
      for (const handler of listeners[type] || []) handler();
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

const { bindWorkspacePublicRequestLinkAdminEvents } = require("../../src/utils/workspacePublicRequestLinkAdminEvents.js");

const createButtonElement = createButton({ createPublicRequestLink: "location-1" });
const disableButtonElement = createButton({ disablePublicRequestLink: "link-disable" });
const enableButtonElement = createButton({ enablePublicRequestLink: "link-enable" });
const regenerateButtonElement = createButton({ regeneratePublicRequestLink: "link-regenerate" });
const calls = [];

bindWorkspacePublicRequestLinkAdminEvents({
  documentRef: createDocument({
    "[data-create-public-request-link]": [createButtonElement],
    "[data-disable-public-request-link]": [disableButtonElement],
    "[data-enable-public-request-link]": [enableButtonElement],
    "[data-regenerate-public-request-link]": [regenerateButtonElement],
  }),
  createPublicRequestLink: (id) => calls.push(["create", id]),
  disablePublicRequestLink: (id) => calls.push(["disable", id]),
  setPublicRequestLinkActive: (id, active) => calls.push(["active", id, active]),
  regeneratePublicRequestLink: (id) => calls.push(["regenerate", id]),
});

createButtonElement.dispatch("click");
disableButtonElement.dispatch("click");
enableButtonElement.dispatch("click");
regenerateButtonElement.dispatch("click");

assert.deepEqual(calls, [
  ["create", "location-1"],
  ["disable", "link-disable"],
  ["active", "link-enable", true],
  ["regenerate", "link-regenerate"],
]);

const noCallbackButton = createButton({ createPublicRequestLink: "location-2" });
assert.doesNotThrow(() => {
  bindWorkspacePublicRequestLinkAdminEvents({
    documentRef: createDocument({
      "[data-create-public-request-link]": [noCallbackButton],
    }),
  });
  noCallbackButton.dispatch("click");
});

console.log("workspace public request link admin events smoke passed");
