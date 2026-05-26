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

function createDocument(cancelButtons, keepButtons) {
  return {
    querySelectorAll(selector) {
      if (selector === "[data-cancel-invite]") return cancelButtons;
      if (selector === "[data-cancel-invite-cancel]") return keepButtons;
      return [];
    },
  };
}

global.window = {};
global.document = createDocument([], []);

require("../../src/utils/workspaceTeamInviteCancelEvents.js");

const { bindWorkspaceTeamInviteCancelEvents } = window.MaintainOpsWorkspaceTeamInviteCancelEvents;

const cancelButton = createButton({ cancelInvite: "invite-1" });
const keepButton = createButton();
let pendingCancelInviteId = null;
let teamInviteCancelError = "Previous error";
let renderCount = 0;

bindWorkspaceTeamInviteCancelEvents({
  documentRef: createDocument([cancelButton], [keepButton]),
  state: {
    setPendingCancelInviteId: (value) => {
      pendingCancelInviteId = value;
    },
    setTeamInviteCancelError: (value) => {
      teamInviteCancelError = value;
    },
  },
  renderWorkspace: () => {
    renderCount += 1;
  },
});

cancelButton.dispatch("click");
assert.equal(pendingCancelInviteId, "invite-1");
assert.equal(teamInviteCancelError, "");
assert.equal(renderCount, 1);

teamInviteCancelError = "Another error";
keepButton.dispatch("click");
assert.equal(pendingCancelInviteId, null);
assert.equal(teamInviteCancelError, "");
assert.equal(renderCount, 2);

bindWorkspaceTeamInviteCancelEvents({
  documentRef: createDocument([cancelButton], [keepButton]),
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace team invite cancel events smoke passed");
