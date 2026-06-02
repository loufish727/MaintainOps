const assert = require("node:assert/strict");

global.window = {};

function createButton(message) {
  return {
    dataset: { copyTeamInvite: message },
    textContent: "Copy Invite",
    listener: null,
    addEventListener(event, listener) {
      if (event === "click") this.listener = listener;
    },
    async click() {
      await this.listener();
    },
  };
}

require("../../src/utils/workspaceTeamInviteCopyEvents.js");

const { bindWorkspaceTeamInviteCopyEvents } = window.MaintainOpsWorkspaceTeamInviteCopyEvents;

(async () => {
  const button = createButton("Invite tech@example.test to MaintainOps");
  let copiedText = "";
  let resetCallback = null;

  bindWorkspaceTeamInviteCopyEvents({
    documentRef: {
      querySelectorAll(selector) {
        return selector === "[data-copy-team-invite]" ? [button] : [];
      },
    },
    copyTextToClipboard: async (text) => {
      copiedText = text;
      return true;
    },
    setTimeoutRef: (callback) => {
      resetCallback = callback;
    },
  });

  await button.click();

  assert.equal(copiedText, "Invite tech@example.test to MaintainOps");
  assert.equal(button.textContent, "Copied");
  resetCallback();
  assert.equal(button.textContent, "Copy Invite");

  console.log("workspace team invite copy events smoke passed");
})();
