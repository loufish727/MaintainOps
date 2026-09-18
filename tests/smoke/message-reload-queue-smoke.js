const assert = require("node:assert/strict");
(async () => {
  const { createMessageReloadQueue } = await import("../../src/services/messageReloadQueue.mjs");
  const calls = [];
  let release;
  const reload = createMessageReloadQueue(async (preserve) => {
    calls.push(preserve);
    await new Promise((resolve) => { release = resolve; });
  });
  let finished = false;
  const first = reload(true).then(() => { finished = true; });
  await new Promise(setImmediate);
  const mutation = reload(false);
  const live = reload(true);
  assert.equal(mutation, live);
  assert.deepEqual(calls, [true]);
  release();
  await new Promise(setImmediate);
  assert.deepEqual(calls, [true, false]);
  assert.equal(finished, false, "An old in-flight read cannot resolve a post-mutation reload");
  release();
  await first;
  await mutation;
  assert.equal(finished, true);
  console.log("message snapshot queue coalescing and mutation ordering smoke passed");
})();
