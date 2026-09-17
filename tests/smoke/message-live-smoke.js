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
  const live = createMessageLive({ delay: 1, readyTimeout: 40, onStatus: (value) => statuses.push(value),
    onChanges: async (batch, context) => { batches.push({ batch, context }); if (batch[0].hold) await new Promise((resolve) => { release = resolve; }); } });
  const tick = () => new Promise((resolve) => setTimeout(resolve, 12));
  const firstReady = live.start(client, "company-a", "user-a", "test-only-token");
  const sameReady = live.start(client, "company-a", "user-a", "test-only-token");
  await Promise.resolve();
  assert.equal(channels.length, 1);
  assert.deepEqual(calls[0], ["auth", "test-only-token"]);
  const channel = channels[0];
  const system = channel.handlers.find((item) => item.kind === "system").handler;
  channel.status("SUBSCRIBED");
  assert.ok(!statuses.includes("live"), "A socket join alone does not prove the database stream is working");
  let ready = false;
  void firstReady.then(() => { ready = true; });
  await tick();
  assert.equal(ready, false, "A socket join cannot release the initial snapshot before the database stream");
  system({ extension: "postgres_changes", status: "ok" });
  assert.equal(await firstReady, true);
  assert.equal(await sameReady, true);
  system({ extension: "postgres_changes", status: "ok" });
  await tick();
  assert.equal(batches.length, 0, "An acknowledged stream precedes the first read, so it needs no duplicate snapshot");
  const handlers = channel.handlers.filter((item) => item.kind === "postgres_changes");
  assert.equal(handlers.length, 6);
  assert.ok(handlers.every((item) => item.config.filter === "company_id=eq.company-a" && item.config.event !== "DELETE"));
  handlers[0].handler({ table: "messages", hold: true });
  await tick();
  handlers[0].handler({ table: "messages", id: "two" });
  handlers[0].handler({ table: "messages", id: "three" });
  await tick();
  assert.equal(batches.length, 1, "Changes cannot start overlapping fetches");
  release();
  await tick();
  assert.equal(batches.length, 2);
  assert.equal(batches[1].batch.length, 2, "Bursts are coalesced, including changes received during a snapshot");
  channel.status("CHANNEL_ERROR");
  system({ extension: "postgres_changes", status: "ok" });
  await tick();
  assert.equal(batches.at(-1).batch[0].reconnect, true);
  const oldContext = batches[0].context;
  assert.equal(await live.start(client, "company-b", "user-a", "test-only-token"), false, "Unavailable realtime cannot indefinitely block messages");
  assert.equal(oldContext.current(), false);
  const count = batches.length;
  handlers[0].handler({ table: "messages", id: "stale" });
  await tick();
  assert.equal(batches.length, count);
  const lateSystem = channels[1].handlers.find((item) => item.kind === "system").handler;
  lateSystem({ extension: "postgres_changes", status: "ok" });
  await tick();
  assert.equal(batches.at(-1).batch[0].table, "reconcile", "A late initial join reconciles messages missed since the fallback snapshot");
  assert.equal(batches.at(-1).batch[0].reconnect, false);
  const pending = live.start(client, "company-c", "user-a", "test-only-token");
  await Promise.resolve();
  live.stop();
  assert.equal(await pending, false, "Scope teardown releases an outstanding startup wait");
  assert.equal(calls.filter(([kind]) => kind === "remove").length, 3);
  const failed = live.start(client, "company-d", "user-a", "test-only-token");
  await Promise.resolve();
  const failedSystem = channels[3].handlers.find((item) => item.kind === "system").handler;
  failedSystem({ extension: "postgres_changes", status: "error" });
  assert.equal(await failed, false);
  assert.equal(statuses.at(-1), "unavailable");
  failedSystem({ extension: "postgres_changes", status: "ok" });
  await tick();
  assert.equal(batches.at(-1).batch[0].table, "reconcile", "Recovery after an initial stream error also reconciles");
  live.stop();
  console.log("message realtime auth, snapshot ordering, bounded startup, batching, reconnect and teardown smoke passed");
})();
