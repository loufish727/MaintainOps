const assert = require("node:assert/strict");

global.window = {};

const { createPartUsageWorkflow } = require("../../src/workflows/partUsageWorkflow.js");

class FakeFormData {
  constructor(form) {
    this.values = form.formValues || {};
  }

  get(name) {
    return this.values[name] || "";
  }
}

function createWorkflow(options = {}) {
  const calls = [];
  const errorTarget = { textContent: "" };
  const workflow = createPartUsageWorkflow({
    documentRef: {
      querySelector(selector) {
        return selector === "#parts-used-error" ? errorTarget : null;
      },
    },
    FormDataCtor: FakeFormData,
    supabaseClient: () => ({
      rpc(name, payload) {
        calls.push(["rpc", name, payload]);
        return Promise.resolve({ error: options.rpcError || null });
      },
    }),
    withOperationTimeout: async (operation) => await operation,
    getActiveCompanyId: () => "company-1",
    getActiveWorkOrderId: () => options.activeWorkOrderId ?? "wo-1",
    getParts: () => [{ id: "part-1", name: "Bearing" }],
    showNotice: (message, tone) => calls.push(["notice", message, tone || "success"]),
    render: async () => calls.push(["render"]),
  });
  return { workflow, calls, errorTarget };
}

(async () => {
  const success = createWorkflow();
  const button = { disabled: false, textContent: "Record Part Used" };
  await success.workflow.recordPartUsed({
    preventDefault() {},
    currentTarget: {
      formValues: { part_id: "part-1", quantity_used: "3" },
      querySelector(selector) {
        return selector === "button[type='submit']" ? button : null;
      },
    },
  });
  assert.deepEqual(success.calls.find((call) => call[0] === "rpc"), [
    "rpc",
    "record_work_order_part_usage",
    {
      p_company_id: "company-1",
      p_work_order_id: "wo-1",
      p_part_id: "part-1",
      p_quantity: 3,
    },
  ]);
  assert.equal(success.calls.some((call) => call[0] === "notice" && call[1] === "Part recorded on work order."), true);
  assert.equal(button.disabled, false);

  const missingWork = createWorkflow({ activeWorkOrderId: "" });
  await missingWork.workflow.recordPartUsed({
    preventDefault() {},
    currentTarget: {
      formValues: { part_id: "part-1", quantity_used: "1" },
      querySelector() { return null; },
    },
  });
  assert.equal(missingWork.errorTarget.textContent, "Open a work order before recording parts.");

  const direct = createWorkflow();
  const error = await direct.workflow.addPartUsageToWorkOrder("wo-2", { id: "part-1" }, 2);
  assert.equal(error, null);

  console.log("part usage workflow smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
