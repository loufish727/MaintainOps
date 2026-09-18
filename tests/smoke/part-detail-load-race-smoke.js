const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "../..");
const appSource = fs.readFileSync(path.join(root, "app.js"), "utf8").replace(/\r\n/g, "\n");
const helperSource = fs.readFileSync(path.join(root, "src/utils/workspacePartDetailEvents.js"), "utf8");
const bindingStart = appSource.indexOf("  bindWorkspacePartDetailEvents({");
const bindingEnd = appSource.indexOf("\n  });", bindingStart);
assert.ok(bindingStart >= 0 && bindingEnd > bindingStart, "App must wire the part detail event helper");
const bindingSource = appSource.slice(bindingStart, bindingEnd + "\n  });".length);

function createButton() {
  const listeners = new Map();
  return {
    dataset: { openPart: "part-1" },
    isConnected: true,
    addEventListener(type, handler) {
      const handlers = listeners.get(type) || [];
      handlers.push(handler);
      listeners.set(type, handlers);
    },
    async click() {
      for (const handler of listeners.get("click") || []) await handler();
    },
  };
}

function createHarness() {
  const button = createButton();
  const reads = [];
  const loaderCalls = [];
  const renders = [];
  const notices = [];
  const initialPart = { id: "part-1", company_id: "company-1", location_id: "location-1", quantity_on_hand: 10 };
  let wiring;
  const context = vm.createContext({
    window: {},
    document: { querySelectorAll: selector => selector === "[data-open-part]" ? [button] : [] },
    activeCompanyId: "company-1",
    activeLocationId: "location-1",
    activeSection: "parts",
    activePartId: null,
    showPartSourceManager: false,
    parts: [initialPart],
    matchesActiveLocation: part => part.location_id === context.activeLocationId,
    withOperationTimeout: promise => promise,
    setActivePartIdState: id => { context.activePartId = id; },
    renderWorkspace: () => { renders.push({ id: context.activePartId, quantity: context.parts[0].quantity_on_hand }); },
    showNotice: (...args) => { notices.push(args); },
    supabaseClient: {
      from(table) {
        assert.equal(table, "parts");
        const filters = {};
        return {
          select(columns) { assert.equal(columns, "*"); return this; },
          eq(column, value) { filters[column] = value; return this; },
          maybeSingle() {
            assert.deepEqual(filters, { company_id: "company-1", id: "part-1" });
            return new Promise(resolve => {
              reads.push(quantity => resolve({ data: { ...initialPart, quantity_on_hand: quantity }, error: null }));
            });
          },
        };
      },
    },
  });

  vm.runInContext(helperSource, context, { filename: "workspacePartDetailEvents.js" });
  const bind = context.window.MaintainOpsWorkspacePartDetailEvents.bindWorkspacePartDetailEvents;
  context.bindWorkspacePartDetailEvents = options => {
    wiring = options;
    bind({
      ...options,
      loadPartDetail: (...args) => {
        loaderCalls.push(args);
        return options.loadPartDetail(...args);
      },
    });
  };
  // Execute the real app wiring without bootstrapping the app or copying its loader.
  vm.runInContext(bindingSource, context, { filename: "app-part-detail-wiring.js" });
  assert.equal(typeof wiring.loadPartDetail, "function");
  return { button, context, initialPart, loaderCalls, notices, reads, renders, wiring };
}

const cases = [
  ["obsolete detail reads cannot mutate the displayed inventory snapshot", async () => {
    const h = createHarness();
    const obsolete = h.button.click();
    const current = h.button.click();
    assert.equal(h.reads.length, 2);

    h.reads[1](10);
    await current;
    assert.deepEqual(h.renders, [{ id: "part-1", quantity: 10 }]);
    const displayedPart = h.context.parts[0];

    // The first GET reaches the backend after another user restocks to 11.
    // Keep the button connected to exercise sequence invalidation independently.
    h.reads[0](11);
    await obsolete;
    assert.equal(h.notices.length, 0);
    assert.equal(h.renders.length, 1, "Obsolete open must not render again");
    assert.equal(h.context.parts[0].quantity_on_hand, 10, "Obsolete detail load must not replace displayed quantity 10 with cached quantity 11");
    assert.equal(h.context.parts[0], displayedPart, "Obsolete detail load must leave the shared part snapshot untouched");
  }],
  ["disconnected opens cannot mutate the shared inventory cache", async () => {
    const h = createHarness();
    const pending = h.button.click();
    assert.equal(h.reads.length, 1);
    h.button.isConnected = false;
    h.reads[0](11);
    await pending;
    assert.equal(h.notices.length, 0);
    assert.equal(h.renders.length, 0);
    assert.equal(h.context.activePartId, null);
    assert.equal(h.context.parts[0], h.initialPart, "Detached caller must invalidate its load before cache mutation");
  }],
  ["event helper passes a live caller-owned isCurrent callback", async () => {
    const h = createHarness();
    const first = h.button.click();
    const firstOptions = h.loaderCalls[0]?.[1];
    const firstWasCurrent = firstOptions?.isCurrent?.();
    const second = h.button.click();
    const secondOptions = h.loaderCalls[1]?.[1];
    const firstAfterSecond = firstOptions?.isCurrent?.();
    const secondWasCurrent = secondOptions?.isCurrent?.();
    h.button.isConnected = false;
    const secondAfterDetach = secondOptions?.isCurrent?.();
    h.reads[0](10);
    h.reads[1](10);
    await first;
    await second;

    assert.equal(typeof firstOptions?.isCurrent, "function", "loadPartDetail(id, { isCurrent }) must receive the caller's validity check");
    assert.equal(firstWasCurrent, true);
    assert.equal(firstAfterSecond, false, "A newer open must invalidate the earlier callback");
    assert.equal(secondWasCurrent, true);
    assert.equal(secondAfterDetach, false, "Removing the initiating button must invalidate the callback");
  }],
  ["app loader supports callers omitting the optional validity argument", async () => {
    const h = createHarness();
    const pending = h.wiring.loadPartDetail("part-1");
    if (h.reads.length) h.reads[0](12);
    assert.equal(await pending, true);
    assert.equal(h.reads.length, 1);
    assert.equal(h.context.parts[0].quantity_on_hand, 12);
    assert.equal(h.renders.length, 0);
  }],
];

(async () => {
  let failures = 0;
  for (const [name, run] of cases) {
    try {
      await run();
      console.log(`PASS: ${name}`);
    } catch (error) {
      failures += 1;
      console.error(`FAIL: ${name}`);
      console.error(error);
    }
  }
  if (failures) process.exitCode = 1;
  else console.log("part detail load race smoke passed");
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
