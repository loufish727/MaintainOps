const assert = require("node:assert/strict");

global.window = {};
const { bindWorkspaceWorkOrderNotificationEvents } = require("../../src/utils/workspaceWorkOrderNotificationEvents.js");

function fakeElement(dataset) {
  return {
    dataset,
    disabled: false,
    listeners: {},
    addEventListener(type, handler) {
      this.listeners[type] = handler;
    },
  };
}

async function main() {
  const workCard = fakeElement({ id: "work-1" });
  const notificationButton = fakeElement({
    openWorkNotification: "notification-1",
    workOrderId: "work-1",
  });
  const calls = [];
  const documentRef = {
    querySelectorAll(selector) {
      if (selector === ".work-card[data-id]") return [workCard];
      if (selector === "[data-open-work-notification]") return [notificationButton];
      return [];
    },
  };

  bindWorkspaceWorkOrderNotificationEvents({
    documentRef,
    markWorkOrderNotificationsReadForOrder: async (workOrderId, options) => {
      calls.push(["read-order", workOrderId, options]);
    },
    openWorkOrderNotification: async (notificationId, workOrderId) => {
      calls.push(["open", notificationId, workOrderId]);
    },
  });

  workCard.listeners.click();
  await notificationButton.listeners.click({ preventDefault() {}, stopPropagation() {} });
  assert.deepEqual(calls[0], ["read-order", "work-1", { render: false }]);
  assert.deepEqual(calls[1], ["open", "notification-1", "work-1"]);
  assert.equal(notificationButton.disabled, true);

  console.log("workspace work order notification events smoke passed");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
