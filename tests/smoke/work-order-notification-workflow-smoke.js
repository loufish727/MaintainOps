const assert = require("node:assert/strict");

global.window = {};
const { createWorkOrderNotificationWorkflow } = require("../../src/workflows/workOrderNotificationWorkflow.js");

async function main() {
  let notifications = [
    { id: "n1", work_order_id: "w1", read_at: null },
    { id: "n2", work_order_id: "w1", read_at: null },
    { id: "n3", work_order_id: "w2", read_at: null },
  ];
  let serviceCall = null;
  let renderCount = 0;
  let notice = "";
  let failUpdate = false;
  const workflow = createWorkOrderNotificationWorkflow({
    getSupabaseClient: () => ({ client: true }),
    getSession: () => ({ user: { id: "user-1" } }),
    getNotifications: () => notifications,
    setNotifications: (next) => { notifications = next; },
    markWorkOrderNotificationsRead: async (_client, recipientId, ids, readAt) => {
      serviceCall = { recipientId, ids, readAt };
      return failUpdate ? { error: new Error("denied") } : { data: ids.map((id) => ({ id, read_at: readAt })), error: null };
    },
    withOperationTimeout: (promise) => promise,
    showNotice: (message) => { notice = message; },
    renderWorkspace: () => { renderCount += 1; },
  });

  assert.equal(await workflow.markWorkOrderNotificationsReadForOrder("w1", { render: false }), true);
  assert.deepEqual(serviceCall.ids, ["n1", "n2"]);
  assert.equal(serviceCall.recipientId, "user-1");
  assert.equal(Boolean(notifications[0].read_at), true);
  assert.equal(Boolean(notifications[1].read_at), true);
  assert.equal(notifications[2].read_at, null);
  assert.equal(renderCount, 0);

  failUpdate = true;
  assert.equal(await workflow.markWorkOrderNotificationRead("n3"), false);
  assert.equal(notifications[2].read_at, null);
  assert.match(notice, /Could not mark the work notification read/);
  assert.equal(renderCount, 2);

  console.log("work order notification workflow smoke passed");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
