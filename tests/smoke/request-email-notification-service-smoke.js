const assert = require("node:assert/strict");

global.window = {};

const { notifyRequestEmailer } = require("../../src/services/requestEmailNotificationService.js");

(async () => {
  const missingClient = await notifyRequestEmailer(null, "request-1");
  assert.equal(missingClient.skipped, true);

  const calls = [];
  const supabaseClient = {
    functions: {
      async invoke(name, options) {
        calls.push([name, options.body]);
        return { data: { sent: 1 }, error: null };
      },
    },
  };

  const result = await notifyRequestEmailer(supabaseClient, "request-1");
  assert.equal(result.skipped, false);
  assert.deepEqual(calls, [["request-emailer", { request_id: "request-1" }]]);
  assert.deepEqual(result.data, { sent: 1 });
  assert.equal(result.error, null);

  const throwingClient = {
    functions: {
      async invoke() {
        throw new Error("offline");
      },
    },
  };
  const failed = await notifyRequestEmailer(throwingClient, "request-2");
  assert.equal(failed.skipped, false);
  assert.match(failed.error.message, /offline/);

  console.log("request email notification service smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
