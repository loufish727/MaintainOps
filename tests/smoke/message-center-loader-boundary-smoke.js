const assert = require("node:assert/strict");
(async () => {
  const { fetchMessageCenter, fetchMessageHistory } = await import("../../src/services/messageCenterService.mjs");
  const calls = [];
  const tables = {
    message_threads: [{ id: "one", messages: [{ body: "Latest", created_at: "2026-09-17" }] }, { id: "hidden" }],
    message_thread_members: [{ user_id: "me", thread_id: "one" }, { user_id: "me", thread_id: "hidden", deleted_at: "2026" }],
    messages: Array.from({ length: 1001 }, (_, i) => ({ id: String(i), thread_id: "one", created_at: "2026-09-17T01:00:00Z" })),
    message_reads: [],
  };
  for (const thread of tables.message_threads) {
    thread.message_thread_members = tables.message_thread_members.filter((member) => member.thread_id === thread.id);
    thread.message_reads = [];
  }
  const client = { from(table) {
    const query = { table, select(value) { calls.push([table, "select", value]); return this; },
      eq(...args) { calls.push([table, "eq", ...args]); return this; }, is() { return this; }, order() { return this; },
      or(value) { calls.push([table, "or", value]); return this; },
      limit(n, options) { if (!options) this.n = n; return this; },
      range(from, to) { calls.push([table, "range", from, to]); return Promise.resolve({ data: tables[table].slice(from, to + 1) }); },
      then(resolve) { resolve({ data: tables[table].slice(0, this.n) }); },
    };
    return query;
  } };
  const snapshot = await fetchMessageCenter(client, "company", "me");
  assert.equal(snapshot.metadata.length, 1001, "Do not silently stop at Supabase's response cap");
  assert.deepEqual(snapshot.threads.map((thread) => thread.id), ["one"]);
  assert.equal(snapshot.threads[0].latest_message.body, "Latest");
  assert.equal(calls.filter(([table]) => table === "message_thread_members" || table === "message_reads").length, 0, "Small inboxes embed memberships and own read markers");
  assert.equal(calls.filter(([table, op]) => table === "messages" && op === "range").length, 3);
  assert.ok(calls.some(([table, op, value]) => table === "messages" && op === "select" && !value.includes("body")));
  const history = await fetchMessageHistory(client, "company", "one");
  assert.equal(history.rows.length, 50);
  assert.equal(history.hasOlder, true);
  await fetchMessageHistory(client, "company", "one", history.rows[0]);
  assert.ok(calls.some(([, op, value]) => op === "or" && value.includes("id.lt.49")), "Equal timestamps need an ID tie-breaker");
  tables.message_thread_members = Array.from({ length: 501 }, (_, index) => ({ thread_id: "one", user_id: index === 500 ? "me" : `user-${index}` }));
  tables.message_threads[0].message_thread_members = tables.message_thread_members.slice(0, 500);
  const largeTeam = await fetchMessageCenter(client, "company", "me");
  assert.equal(largeTeam.members.length, 501);
  assert.equal(largeTeam.threads[0].id, "one", "Membership beyond the embedded limit must not hide the thread");
  await assert.rejects(fetchMessageCenter({ from() { return { select() { throw new Error("offline"); } }; } }, "company", "me"), /offline/);
  console.log("message center loader boundary smoke passed");
})();
