const assert = require("node:assert/strict");
const { test } = require("node:test");

const modulePromise = import("../../src/services/checklistResultsState.mjs");

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

async function fixture(respond) {
  const { createChecklistResultsState } = await modulePromise;
  const scope = { key: "user:company:north:1", companyId: "company" };
  const calls = [], applied = [];
  let cache = {
    "work-1": [{ id: "saved-1", work_order_id: "work-1", response_text: "Keep saved result" }],
    "work-2": [{ id: "saved-2", work_order_id: "work-2" }],
    unrelated: [{ id: "saved-other", work_order_id: "unrelated" }],
  };
  const client = {
    from(table) {
      const call = { table, filters: [], orders: [] };
      return {
        select(columns, options) { Object.assign(call, { columns, options }); return this; },
        eq(column, value) { call.filters.push(["eq", column, value]); return this; },
        in(column, values) { call.filters.push(["in", column, [...values]]); return this; },
        order(column) { call.orders.push(column); return this; },
        range(start, end) {
          call.range = [start, end];
          calls.push(call);
          const number = calls.length;
          return Promise.resolve().then(() => respond(call, number));
        },
      };
    },
  };
  const state = createChecklistResultsState({
    getScope: () => scope.key,
    getCompanyId: () => scope.companyId,
    client: () => client,
    applyResults(ids, rows) {
      applied.push({ ids: [...ids], rows: [...rows] });
      const next = { ...cache };
      for (const id of ids) next[id] = rows.filter(row => row.work_order_id === id);
      cache = next;
    },
  });
  return { state, scope, calls, applied, cache: () => cache };
}

for (const cap of [1000, 137]) {
  test(`checklist results load all 2207 rows with a ${cap}-row server cap`, async () => {
    const rows = Array.from({ length: 2207 }, (_, i) => ({
      id: `result-${String(i).padStart(5, "0")}`,
      work_order_id: i % 2 ? "work-1" : "work-2",
      response_text: `Saved response ${i}`,
    }));
    const lastPage = deferred(), reachedLastPage = deferred();
    const f = await fixture(call => {
      const start = call.range[0];
      const response = { data: rows.slice(start, start + cap), count: rows.length, error: null };
      if (start + cap >= rows.length) {
        reachedLastPage.resolve();
        return lastPage.promise;
      }
      return response;
    });
    const before = f.cache();
    const pending = f.state.load(["work-1", "work-2"]);
    await reachedLastPage.promise;
    assert.equal(f.cache(), before, "Partial pages must not replace saved results");
    assert.equal(f.applied.length, 0);
    lastPage.resolve({ data: rows.slice(f.calls.at(-1).range[0]), count: rows.length, error: null });
    await pending;
    assert.equal(f.calls.length, Math.ceil(rows.length / cap));
    assert.deepEqual(f.applied, [{ ids: ["work-1", "work-2"], rows }]);
    assert.equal(f.cache().unrelated, before.unrelated);
    assert.deepEqual([...f.cache()["work-1"], ...f.cache()["work-2"]].map(row => row.id).sort(), rows.map(row => row.id));
    for (const [index, call] of f.calls.entries()) {
      assert.equal(call.table, "work_order_step_results");
      assert.equal(call.columns, "*");
      assert.deepEqual(call.options, { count: "exact" });
      assert.deepEqual(call.filters, [["eq", "company_id", "company"], ["in", "work_order_id", ["work-1", "work-2"]]]);
      assert.deepEqual(call.orders, ["id"]);
      assert.deepEqual(call.range, [index * cap, index * cap + 999], "Advance by returned rows, not the requested page size");
    }
  });
}

test("failed first and later reads retain cache, mark requested IDs, and recover on retry", async () => {
  for (const failAt of [1, 2]) {
    let recovering = false;
    const failure = new Error("Checklist page unavailable");
    const f = await fixture((call, number) => {
      if (recovering) return { data: [], count: 0, error: null };
      if (number === failAt) return { data: null, count: null, error: failure };
      return { data: [{ id: "partial", work_order_id: "work-1" }], count: 2, error: null };
    });
    const before = f.cache();
    await assert.rejects(f.state.load(["work-1", "work-2"]), error => error === failure);
    assert.equal(f.cache(), before);
    assert.equal(f.applied.length, 0);
    assert.equal(f.calls.length, failAt);
    assert.equal(f.state.hasError("work-1"), true);
    assert.equal(f.state.hasError("work-2"), true);
    assert.equal(f.state.hasError("unrelated"), false);
    recovering = true;
    await f.state.load(["work-1"]);
    assert.equal(f.state.hasError("work-1"), false);
    assert.equal(f.state.hasError("work-2"), true, "Retry must not clear another work order's error");
    assert.deepEqual(f.cache()["work-1"], []);
    assert.equal(f.cache()["work-2"], before["work-2"]);
    assert.equal(f.cache().unrelated, before.unrelated);
  }
});

test("rejected requests and unavailable exact counts never turn saved results into an empty cache", async () => {
  for (const count of [undefined, null, -1, 0.5, "1", NaN]) {
    const f = await fixture(() => ({ data: [], count, error: null }));
    const before = f.cache();
    await assert.rejects(f.state.load(["work-1"]), /count unavailable/);
    assert.equal(f.cache(), before);
    assert.equal(f.applied.length, 0);
    assert.equal(f.state.hasError("work-1"), true);
  }
  const f = await fixture(() => Promise.reject(new Error("Network disconnected")));
  const before = f.cache();
  await assert.rejects(f.state.load(["work-1"]), /Network disconnected/);
  assert.equal(f.cache(), before);
  assert.equal(f.state.hasError("work-1"), true);
});

test("an empty page before the exact total fails without applying partial rows or looping", async () => {
  const f = await fixture((call, number) => ({
    data: number === 1 ? [{ id: "partial", work_order_id: "work-1" }] : [], count: 3, error: null,
  }));
  const before = f.cache();
  await assert.rejects(f.state.load(["work-1"]), /incomplete/);
  assert.equal(f.calls.length, 2);
  assert.equal(f.cache(), before);
  assert.equal(f.applied.length, 0);
  assert.equal(f.state.hasError("work-1"), true);
});

test("an empty ID list makes no read or cache change", async () => {
  const f = await fixture(() => { throw Error("Unexpected query"); });
  const before = f.cache();
  await f.state.load([]);
  assert.equal(f.calls.length, 0);
  assert.equal(f.cache(), before);
  assert.equal(f.applied.length, 0);
});

for (const olderOutcome of ["success", "error"]) {
  for (const newerOutcome of ["success", "error"]) {
    test(`reverse responses keep the newest work-order state: old ${olderOutcome}, new ${newerOutcome}`, async () => {
      const responses = [deferred(), deferred()];
      const f = await fixture((call, number) => responses[number - 1].promise);
      const oldLoad = f.state.load(["work-1"]);
      const oldSettled = olderOutcome === "error" ? assert.rejects(oldLoad, /Older request failed/) : oldLoad;
      const newLoad = f.state.load(["work-1"]);
      const newSettled = newerOutcome === "error" ? assert.rejects(newLoad, /Newer request failed/) : newLoad;
      const latestRows = [{ id: "latest-result", work_order_id: "work-1", response_text: "Latest saved answer" }];
      responses[1].resolve(newerOutcome === "error"
        ? { error: new Error("Newer request failed") }
        : { data: latestRows, count: 1, error: null });
      await newSettled;
      const currentCache = f.cache(), appliedCount = f.applied.length;
      assert.equal(f.state.hasError("work-1"), newerOutcome === "error");
      responses[0].resolve(olderOutcome === "error"
        ? { error: new Error("Older request failed") }
        : { data: [{ id: "old-result", work_order_id: "work-1", response_text: "Stale saved answer" }], count: 1, error: null });
      await oldSettled;
      assert.equal(f.cache(), currentCache, "Late success must not replace the newer cache");
      assert.equal(f.applied.length, appliedCount, "A superseded read must not publish");
      assert.equal(f.state.hasError("work-1"), newerOutcome === "error", "Late success/error must not clear/set a newer error");
      if (newerOutcome === "success") assert.deepEqual(f.cache()["work-1"], latestRows);
      else assert.equal(f.cache()["work-1"][0].id, "saved-1");
      assert.equal(f.calls.length, 2);
    });
  }

  test(`partially overlapping reverse requests only apply old ${olderOutcome} to unsuperseded work IDs`, async () => {
    const responses = [deferred(), deferred()];
    const f = await fixture((call, number) => responses[number - 1].promise);
    const before = f.cache();
    const oldLoad = f.state.load(["work-1", "work-2"]);
    const oldSettled = olderOutcome === "error" ? assert.rejects(oldLoad, /Older batch failed/) : oldLoad;
    const newLoad = f.state.load(["work-1"]);
    const latestRows = [{ id: "latest-result", work_order_id: "work-1" }];
    responses[1].resolve({ data: latestRows, count: 1, error: null });
    await newLoad;
    const remainingRows = [{ id: "batch-result-2", work_order_id: "work-2" }];
    responses[0].resolve(olderOutcome === "error"
      ? { error: new Error("Older batch failed") }
      : { data: [{ id: "stale-result-1", work_order_id: "work-1" }, ...remainingRows], count: 2, error: null });
    await oldSettled;
    assert.deepEqual(f.cache()["work-1"], latestRows);
    assert.equal(f.state.hasError("work-1"), false);
    assert.equal(f.state.hasError("work-2"), olderOutcome === "error");
    assert.equal(f.cache().unrelated, before.unrelated);
    if (olderOutcome === "success") {
      assert.deepEqual(f.applied, [{ ids: ["work-1"], rows: latestRows }, { ids: ["work-2"], rows: remainingRows }]);
      assert.deepEqual(f.cache()["work-2"], remainingRows);
    } else {
      assert.equal(f.applied.length, 1);
      assert.equal(f.cache()["work-2"], before["work-2"]);
    }
  });
}

for (const [name, pages, expectedError] of [
  ["changing exact total", [
    { data: [{ id: "first", work_order_id: "work-1" }], count: 2 },
    { data: [{ id: "second", work_order_id: "work-1" }], count: 3 },
  ], /changed while loading/],
  ["duplicate IDs across pages", [
    { data: [{ id: "repeat", work_order_id: "work-1" }], count: 2 },
    { data: [{ id: "repeat", work_order_id: "work-1" }], count: 2 },
  ], /page invalid/],
  ["duplicate IDs within a page", [
    { data: [{ id: "repeat", work_order_id: "work-1" }, { id: "repeat", work_order_id: "work-1" }], count: 2 },
  ], /page invalid/],
  ["foreign work-order result", [
    { data: [{ id: "foreign", work_order_id: "unrelated" }], count: 1 },
  ], /page invalid/],
  ["missing result ID", [{ data: [{ work_order_id: "work-1" }], count: 1 }], /page invalid/],
  ["missing work-order ID", [{ data: [{ id: "missing-owner" }], count: 1 }], /page invalid/],
  ["invalid data shape", [{ data: null, count: 0 }], /page invalid/],
  ["more rows than exact total", [{ data: [{ id: "extra", work_order_id: "work-1" }], count: 0 }], /page invalid/],
]) {
  test(`${name} retains the saved cache and never publishes a partial checklist`, async () => {
    const f = await fixture((call, number) => {
      assert.ok(number <= pages.length, "Invalid pages must not trigger another read");
      return { ...pages[number - 1], error: null };
    });
    const before = f.cache();
    await assert.rejects(f.state.load(["work-1"]), expectedError);
    assert.equal(f.calls.length, pages.length);
    assert.equal(f.cache(), before);
    assert.equal(f.applied.length, 0);
    assert.equal(f.state.hasError("work-1"), true);
    assert.equal(f.state.hasError("unrelated"), false);
  });
}

for (const [key, companyId] of [
  ["user:company:south:2", "company"],
  ["other-user:company:north:2", "company"],
  ["user:other-company:north:2", "other-company"],
]) {
  test(`scope change discards old pages and clears old errors: ${key}`, async () => {
    const oldPage = deferred(), started = deferred();
    let mode = "error";
    const newRows = [{ id: "current", work_order_id: "work-1" }];
    const f = await fixture(() => {
      if (mode === "error") return { error: new Error("Old error") };
      if (mode === "old") { started.resolve(); return oldPage.promise; }
      return { data: newRows, count: 1, error: null };
    });
    await assert.rejects(f.state.load(["work-1"]), /Old error/);
    assert.equal(f.state.hasError("work-1"), true);
    mode = "old";
    const pending = f.state.load(["work-1"]);
    await started.promise;
    Object.assign(f.scope, { key, companyId });
    assert.equal(f.state.hasError("work-1"), false);
    mode = "new";
    await f.state.load(["work-1"]);
    assert.deepEqual(f.calls.at(-1).filters[0], ["eq", "company_id", companyId]);
    const currentCache = f.cache(), count = f.calls.length;
    oldPage.resolve({ data: [{ id: "stale", work_order_id: "work-1" }], count: 1001, error: null });
    await pending;
    assert.equal(f.cache(), currentCache);
    assert.equal(f.applied.length, 1);
    assert.equal(f.calls.length, count, "Do not fetch another old-scope page");
    assert.deepEqual(f.cache()["work-1"], newRows);
  });
}

test("an old-scope rejection does not mark the current work order as failed", async () => {
  const oldPage = deferred(), started = deferred();
  const f = await fixture(() => { started.resolve(); return oldPage.promise; });
  const pending = f.state.load(["work-1"]);
  const rejected = assert.rejects(pending, /Old network failure/);
  await started.promise;
  f.scope.key = "user:company:south:2";
  assert.equal(f.state.hasError("work-1"), false);
  oldPage.reject(new Error("Old network failure"));
  await rejected;
  assert.equal(f.state.hasError("work-1"), false);
  assert.equal(f.applied.length, 0);
});
