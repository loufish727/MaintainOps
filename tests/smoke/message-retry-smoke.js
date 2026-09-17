const assert = require("node:assert/strict");
global.window = {};
const { createMessageWorkflow } = require("../../src/workflows/messageWorkflow.js");

(async () => {
  const rows = new Map();
  let timeoutAfterCommit = true;
  let readFails = true;
  let localRead = null;
  const warnings = [];
  const client = { from(table) {
    return {
      action: "select", payload: null, id: "",
      insert(payload) { this.action = "insert"; this.payload = payload; return this; },
      update() { this.action = "update"; return this; },
      upsert(payload) { this.action = "upsert"; this.payload = payload; return this; },
      select() { return this; }, single() { return this; },
      eq(column, value) { if (column === "id") this.id = value; return this; },
      then(resolve, reject) {
        const run = async () => {
          if (table === "message_reads") return { error: readFails ? new Error("Read marker offline") : null };
          if (table === "message_threads" && this.action === "update") return { error: new Error("Timestamp offline") };
          if (this.action === "select") return { data: rows.get(this.id), error: null };
          if (rows.has(this.payload.id)) return { error: { code: "23505" } };
          rows.set(this.payload.id, this.payload);
          if (timeoutAfterCommit) { timeoutAfterCommit = false; throw new Error("Timeout after commit"); }
          return { data: this.payload, error: null };
        };
        return run().then(resolve, reject);
      },
    };
  } };
  const workflow = createMessageWorkflow({ documentRef: {}, FormDataCtor: class {},
    supabaseClient: () => client, withOperationTimeout: (operation) => Promise.resolve(operation),
    getActiveCompanyId: () => "company", getSession: () => ({ user: { id: "sender" } }),
    getMessagesReady: () => true, getLatestReadTime: () => "2026-09-17T10:00:00Z",
    setMessageThreadRead: (_id, row) => { localRead = row; }, warn: (message) => warnings.push(message),
  });
  await assert.rejects(workflow.insertThreadMessage("thread", "Keep this message"), /Timeout after commit/);
  assert.equal(rows.size, 1);
  assert.deepEqual(await workflow.insertThreadMessage("thread", "Keep this message"), { error: null });
  assert.equal(rows.size, 1, "Retry must verify the original message ID, not send a duplicate");
  assert.ok(warnings.includes("Message sent; thread timestamp could not be updated"));
  await workflow.markMessageThreadRead("thread");
  assert.equal(localRead, null, "A failed write must not silently clear unread counts locally");
  readFails = false;
  await workflow.markMessageThreadRead("thread");
  assert.equal(localRead.last_read_at, "2026-09-17T10:00:00Z", "Only the loaded message boundary is read, not the current clock");
  console.log("message retry smoke passed");
})();
