const assert = require("node:assert/strict");

(async () => {
  const { createMessageLive } = await import("../../src/services/messageLive.mjs");
  const calls = [], statuses = [], channels = [];
  let release;
  const client = {
    realtime: { async setAuth(token) { calls.push(["auth", token]); } },
    removeChannel(channel) { calls.push(["remove", channel.name]); },
    channel(name) {
      const channel = { name, handlers: [], on(kind, config, handler) { this.handlers.push({ kind, config, handler }); return this; },
        subscribe(handler) { this.status = handler; return this; } };
      channels.push(channel);
      return channel;
    },
  };
  const batches = [];
  const live = createMessageLive({ delay: 1, onStatus: (value) => statuses.push(value),
    onChanges: async (batch, context) => { batches.push({ batch, context }); if (batch[0].hold) await new Promise((resolve) => { release = resolve; }); } });
  const tick = () => new Promise((resolve) => setTimeout(resolve, 12));
  await live.start(client, "company-a", "user-a", "test-only-token");
  await live.start(client, "company-a", "user-a", "test-only-token");
  assert.equal(channels.length, 1);
  assert.deepEqual(calls[0], ["auth", "test-only-token"]);
  const channel = channels[0];
  const system = channel.handlers.find((item) => item.kind === "system").handler;
  channel.status("SUBSCRIBED");
  assert.ok(!statuses.includes("live"), "A socket join alone does not prove the database stream is working");
  system({ extension: "postgres_changes", status: "error" });
  assert.equal(statuses.at(-1), "unavailable");
  system({ extension: "postgres_changes", status: "ok" });
  await tick();
  assert.equal(batches[0].batch[0].table, "reconcile");
  const handlers = channel.handlers.filter((item) => item.kind === "postgres_changes");
  assert.equal(handlers.length, 6);
  assert.ok(handlers.every((item) => item.config.filter === "company_id=eq.company-a" && item.config.event !== "DELETE"));
  handlers[0].handler({ table: "messages", hold: true });
  await tick();
  handlers[0].handler({ table: "messages", id: "two" });
  handlers[0].handler({ table: "messages", id: "three" });
  await tick();
  assert.equal(batches.length, 2, "Changes cannot start overlapping fetches");
  release();
  await tick();
  assert.equal(batches.length, 3);
  assert.equal(batches[2].batch.length, 2, "Bursts are coalesced");
  channel.status("CHANNEL_ERROR");
  system({ extension: "postgres_changes", status: "ok" });
  await tick();
  assert.equal(batches.at(-1).batch[0].reconnect, true);
  const oldContext = batches[0].context;
  await live.start(client, "company-b", "user-a", "test-only-token");
  assert.equal(oldContext.current(), false);
  const count = batches.length;
  handlers[0].handler({ table: "messages", id: "stale" });
  await tick();
  assert.equal(batches.length, count);
  live.stop();
  assert.equal(calls.filter(([kind]) => kind === "remove").length, 2);
  console.log("message realtime auth, subscription proof, batching, reconnect and teardown smoke passed");
})();
