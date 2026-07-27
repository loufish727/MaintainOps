const assert = require("node:assert/strict");

(async () => {
  const { createKeyedSingleFlight } = await import("../../src/utils/keyedSingleFlight.mjs");
  const runSingleFlight = createKeyedSingleFlight();
  const releases = [];
  let calls = 0;

  const first = runSingleFlight("user-a", () => new Promise((resolve) => {
    calls += 1;
    releases.push(resolve);
  }));
  const duplicate = runSingleFlight("user-a", () => {
    calls += 1;
    return "duplicate";
  });

  assert.equal(first, duplicate);
  assert.equal(calls, 0);
  await Promise.resolve();
  assert.equal(calls, 1);

  const differentKey = runSingleFlight("user-b", async () => {
    calls += 1;
    return "second user";
  });
  assert.notEqual(first, differentKey);
  assert.equal(await differentKey, "second user");

  const originalKeyAfterSwitch = runSingleFlight("user-a", async () => {
    calls += 1;
    return "unexpected duplicate";
  });
  assert.equal(originalKeyAfterSwitch, first);

  releases[0]("first user");
  assert.equal(await first, "first user");

  const next = runSingleFlight("user-a", async () => {
    calls += 1;
    return "next load";
  });
  assert.notEqual(next, first);
  assert.equal(await next, "next load");
  assert.equal(calls, 3);

  console.log("keyed single-flight smoke passed");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
