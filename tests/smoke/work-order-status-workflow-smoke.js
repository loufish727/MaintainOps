const assert = require("node:assert/strict");

global.window = {};

const { createWorkOrderStatusWorkflow } = require("../../src/workflows/workOrderStatusWorkflow.js");

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

function createWorkflow(overrides = {}) {
  const calls = [];
  const notices = [];
  let activeWorkOrderId = "wo-1";
  const workOrders = overrides.workOrders || [{ id: "wo-1", status: "open", asset_id: "asset-1" }];
  const workflow = createWorkOrderStatusWorkflow({
    applySafetyCheckPayload: (payload, checked) => {
      payload.safety_devices_checked = checked;
    },
    applySafetyRequirementPayload: (payload) => {
      payload.safety_check_required = true;
    },
    blocksProcedureCompletion: overrides.blocksProcedureCompletion || (() => ""),
    productionActionCompletionMessage: overrides.productionActionCompletionMessage || (() => ""),
    currentSafetyCheckboxCheckedForWorkOrder: overrides.currentSafetyCheckboxCheckedForWorkOrder || (() => true),
    friendlyWorkOrderSaveError: (error) => error.message || String(error),
    getActiveWorkOrderId: overrides.getActiveWorkOrderId || (() => activeWorkOrderId),
    getScope: overrides.getScope,
    getWorkOrders: () => workOrders,
    hasCompletedSafetyDeviceCheck: overrides.hasCompletedSafetyDeviceCheck || (() => false),
    recordWorkOrderEvent: async (id, type, summary) => {
      calls.push(["recordWorkOrderEvent", id, type, summary]);
      return overrides.recordWorkOrderEvent?.(id, type, summary);
    },
    render: async () => {
      calls.push(["render"]);
      return overrides.render?.();
    },
    requiresSafetyDeviceCheck: overrides.requiresSafetyDeviceCheck || (() => true),
    setActiveWorkOrderId: (id) => {
      activeWorkOrderId = id;
      calls.push(["setActiveWorkOrderId", id]);
    },
    setWorkOrderActionWarning: (id, message) => calls.push(["setWorkOrderActionWarning", id, message]),
    showNotice: (message, tone = "success") => notices.push([message, tone]),
    statusLabel: (status) => status,
    updateWorkOrderSafely: async (payload, id) => {
      calls.push(["updateWorkOrderSafely", id, payload]);
      if (overrides.updateWorkOrderSafely) return overrides.updateWorkOrderSafely(payload, id);
      return { error: overrides.updateError || null };
    },
    withOperationTimeout: overrides.withOperationTimeout || ((promise) => promise),
  });
  return { calls, notices, workflow };
}

(async () => {
  const success = createWorkflow();
  const saved = await success.workflow.setWorkOrderStatus("wo-1", "completed");
  assert.equal(saved, true);
  const updateCall = success.calls.find((call) => call[0] === "updateWorkOrderSafely");
  assert.equal(updateCall[1], "wo-1");
  assert.equal(updateCall[2].status, "completed");
  assert.equal(typeof updateCall[2].completed_at, "string");
  assert.equal(updateCall[2].safety_devices_checked, true);
  assert.equal(success.calls.some((call) => call[0] === "recordWorkOrderEvent" && call[2] === "status_changed"), true);
  assert.deepEqual(success.notices.at(-1), ["Status changed to completed.", "success"]);

  const blocked = createWorkflow({ currentSafetyCheckboxCheckedForWorkOrder: () => false });
  const blockedSaved = await blocked.workflow.setWorkOrderStatus("wo-1", "completed");
  assert.equal(blockedSaved, false);
  assert.equal(blocked.calls.some((call) => call[0] === "updateWorkOrderSafely"), false);
  assert.equal(blocked.calls.some((call) => call[0] === "setWorkOrderActionWarning" && call[1] === "wo-1"), true);

  const productionBlocked = createWorkflow({
    productionActionCompletionMessage: () => "Complete Production Action first.",
  });
  const productionBlockedSaved = await productionBlocked.workflow.setWorkOrderStatus("wo-1", "completed");
  assert.equal(productionBlockedSaved, false);
  assert.equal(productionBlocked.calls.some((call) => call[0] === "updateWorkOrderSafely"), false);
  assert.deepEqual(productionBlocked.notices.at(-1), ["Complete Production Action first.", "warning"]);

  const selectTarget = { value: "completed", disabled: false };
  const selectBlocked = createWorkflow({ currentSafetyCheckboxCheckedForWorkOrder: () => false });
  await selectBlocked.workflow.updateWorkOrderStatus({ target: selectTarget });
  assert.equal(selectTarget.value, "open");
  assert.equal(selectTarget.disabled, false);

  const procedureBlocked = createWorkflow({ blocksProcedureCompletion: () => "Finish required steps." });
  assert.equal(await procedureBlocked.workflow.setWorkOrderStatus("wo-1", "completed"), false);
  assert.equal(procedureBlocked.calls.some((call) => call[0] === "updateWorkOrderSafely"), false);
  assert.deepEqual(procedureBlocked.notices.at(-1), ["Finish required steps.", "warning"]);

  const savedSafety = createWorkflow({
    currentSafetyCheckboxCheckedForWorkOrder: () => false,
    hasCompletedSafetyDeviceCheck: () => true,
  });
  assert.equal(await savedSafety.workflow.setWorkOrderStatus("wo-1", "completed"), true);
  assert.equal(savedSafety.calls[0][2].safety_devices_checked, true);

  const reopen = createWorkflow({
    workOrders: [{ id: "wo-1", status: "completed", asset_id: "asset-1" }],
    blocksProcedureCompletion: () => { throw new Error("Do not gate reopening."); },
    productionActionCompletionMessage: () => { throw new Error("Do not gate reopening."); },
    currentSafetyCheckboxCheckedForWorkOrder: () => false,
  });
  assert.equal(await reopen.workflow.setWorkOrderStatus("wo-1", "open"), true);
  assert.deepEqual(reopen.calls[0][2], {
    status: "open", completed_at: null, safety_check_required: true, safety_devices_checked: false,
  });

  for (const status of ["open", "completed"]) {
    for (const id of ["missing", null, undefined, ""]) {
      const missing = createWorkflow({
        blocksProcedureCompletion: () => { throw new Error("Missing rows must not reach gates."); },
        currentSafetyCheckboxCheckedForWorkOrder: () => { throw new Error("Missing rows must not reach safety."); },
      });
      assert.equal(await missing.workflow.setWorkOrderStatus(id, status), false);
      assert.deepEqual(missing.calls, []);
      assert.match(missing.notices[0][0], /no longer available/);
      assert.equal(missing.notices[0][1], "warning");
    }
  }

  for (const rejects of [false, true]) {
    let failed = false;
    const failure = createWorkflow({
      updateWorkOrderSafely: () => {
        if (failed) return { error: null };
        failed = true;
        if (rejects) throw new Error("Save unavailable.");
        return { error: new Error("Save unavailable.") };
      },
    });
    const target = { value: "completed", disabled: false };
    await failure.workflow.updateWorkOrderStatus({ target });
    assert.equal(target.value, "open");
    assert.equal(target.disabled, false);
    assert.equal(failure.calls.length, 1);
    assert.deepEqual(failure.notices, [["Could not update status: Save unavailable.", "warning"]]);
    assert.equal(await failure.workflow.setWorkOrderStatus("wo-1", "completed"), true, "Failed writes must release pending IDs.");
  }

  for (const rejects of [false, true]) {
    const historyFailure = createWorkflow({
      recordWorkOrderEvent: () => {
        if (rejects) throw new Error("History unavailable.");
        return { error: new Error("History unavailable.") };
      },
    });
    assert.equal(await historyFailure.workflow.setWorkOrderStatus("wo-1", "completed"), true);
    assert.deepEqual(historyFailure.notices, [[
      "Status changed to completed, but history could not be saved: History unavailable.", "warning",
    ]]);
    assert.equal(historyFailure.calls.filter((call) => call[0] === "render").length, 1);
    const target = { value: "completed", disabled: false };
    await historyFailure.workflow.updateWorkOrderStatus({ target });
    assert.equal(target.value, "completed", "A saved status must not be reverted when history fails.");
    assert.equal(target.disabled, false);
    assert.equal(historyFailure.calls.filter((call) => call[0] === "updateWorkOrderSafely").length, 2);
  }

  for (const phase of ["save", "history"]) {
    const wait = deferred();
    const entered = deferred();
    const pending = createWorkflow({
      [phase === "save" ? "updateWorkOrderSafely" : "recordWorkOrderEvent"]: () => {
        entered.resolve();
        return wait.promise;
      },
    });
    const firstTarget = { value: "completed", disabled: false };
    const first = pending.workflow.updateWorkOrderStatus({ target: firstTarget });
    await entered.promise;
    assert.equal(await pending.workflow.setWorkOrderStatus("wo-1", "open"), false);
    await pending.workflow.updateWorkOrderStatus({ target: firstTarget });
    assert.equal(firstTarget.disabled, true, "Duplicate events must not unlock the first save's control.");
    const secondTarget = { value: "open", disabled: false };
    await pending.workflow.updateWorkOrderStatus({ target: secondTarget });
    assert.equal(secondTarget.disabled, false);
    assert.equal(pending.calls.filter((call) => call[0] === "updateWorkOrderSafely").length, 1);
    assert.deepEqual(pending.notices, []);
    wait.resolve({ error: null });
    await first;
    assert.equal(firstTarget.disabled, false);
    assert.equal(await pending.workflow.setWorkOrderStatus("wo-1", "open"), true);
  }

  const otherWait = deferred();
  const independent = createWorkflow({
    workOrders: [{ id: "wo-1", status: "open" }, { id: "wo-2", status: "open" }],
    updateWorkOrderSafely: (_payload, id) => id === "wo-1" ? otherWait.promise : { error: null },
  });
  const firstIndependent = independent.workflow.setWorkOrderStatus("wo-1", "completed");
  assert.equal(await independent.workflow.setWorkOrderStatus("wo-2", "completed"), true);
  otherWait.resolve({ error: null });
  assert.equal(await firstIndependent, true);

  for (const changedKey of ["user", "company", "location"]) {
    for (const phase of ["save", "history"]) {
      for (const outcome of ["success", "returned-error", "rejected"]) {
        const scope = { user: "user-1", company: "company-1", location: "location-1" };
        const wait = deferred();
        const entered = deferred();
        const race = createWorkflow({
          getScope: () => JSON.stringify(scope),
          [phase === "save" ? "updateWorkOrderSafely" : "recordWorkOrderEvent"]: () => {
            entered.resolve();
            return wait.promise;
          },
        });
        const saving = race.workflow.setWorkOrderStatus("wo-1", "completed");
        await entered.promise;
        scope[changedKey] += "-changed";
        if (outcome === "rejected") wait.reject(new Error("Stale failure."));
        else wait.resolve({ error: outcome === "returned-error" ? new Error("Stale failure.") : null });
        assert.equal(await saving, phase === "history" || outcome === "success");
        assert.deepEqual(race.calls.map((call) => call[0]), phase === "save"
          ? ["updateWorkOrderSafely"]
          : ["updateWorkOrderSafely", "recordWorkOrderEvent"]);
        assert.deepEqual(race.notices, [], `${changedKey} changed during ${phase}: suppress stale notices.`);
      }
    }
  }

  for (const rejects of [false, true]) {
    const wait = deferred();
    let scope = "old-scope";
    const staleSelect = createWorkflow({
      getScope: () => scope,
      updateWorkOrderSafely: () => wait.promise,
    });
    const target = { value: "completed", disabled: false };
    const saving = staleSelect.workflow.updateWorkOrderStatus({ target });
    scope = "new-scope";
    if (rejects) wait.reject(new Error("Old save failed."));
    else wait.resolve({ error: new Error("Old save failed.") });
    await saving;
    assert.equal(target.value, "completed", "Do not reset a stale scope's select.");
    assert.equal(target.disabled, false);
    assert.deepEqual(staleSelect.notices, []);
  }

  const renderWait = deferred();
  const renderEntered = deferred();
  let renderScope = "old-scope";
  const staleRender = createWorkflow({
    getScope: () => renderScope,
    render: () => {
      renderEntered.resolve();
      return renderWait.promise;
    },
  });
  const rendered = staleRender.workflow.setWorkOrderStatus("wo-1", "completed");
  await renderEntered.promise;
  const callsBeforeScopeChange = [...staleRender.calls];
  const noticesBeforeScopeChange = [...staleRender.notices];
  renderScope = "new-scope";
  renderWait.reject(new Error("Old render failed."));
  assert.equal(await rendered, true);
  assert.deepEqual(staleRender.calls, callsBeforeScopeChange);
  assert.deepEqual(staleRender.notices, noticesBeforeScopeChange);

  const refreshFailure = createWorkflow({ render: () => { throw new Error("Refresh unavailable."); } });
  assert.equal(await refreshFailure.workflow.setWorkOrderStatus("wo-1", "completed"), true);
  assert.match(refreshFailure.notices.at(-1)[0], /Status changed to completed, but the view could not be refreshed/);
  assert.equal(refreshFailure.notices.at(-1)[1], "warning");

  const timeout = createWorkflow({ withOperationTimeout: () => Promise.reject(new Error("Status save timed out.")) });
  assert.equal(await timeout.workflow.setWorkOrderStatus("wo-1", "completed"), false);
  assert.deepEqual(timeout.calls.map((call) => call[0]), ["updateWorkOrderSafely"]);
  assert.deepEqual(timeout.notices, [["Could not update status: Status save timed out.", "warning"]]);

  console.log("work order status workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
