const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(path.join(__dirname, "../../src/appShell/workspaceStartupLoaders.js"), "utf8");
const tests = [];
const test = (name, run) => tests.push({ name, run });
const scheduleRows = (count) => Array.from({ length: count }, (_, index) => ({ id: `pm-${index}`, next_due_at: "2031-01-15" }));
const procedureRows = (count) => Array.from({ length: count }, (_, index) => ({
  id: `procedure-${index}`, name: "Same name", procedure_steps: [], procedure_step_count: [{ count: 0 }],
}));

(async () => {
  const maintenanceRows = await import("../../src/services/maintenanceWorkspaceRows.mjs");
  global.window = { MaintainOpsMaintenanceWorkspaceRows: maintenanceRows };
  const { loadWorkspaceCoreData } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);

  async function load(options = {}) {
    const calls = [], labels = [], otherLoads = [];
    const tables = {
      preventive_schedules: options.schedules || scheduleRows(2),
      procedure_templates: options.procedures || procedureRows(2),
    };
    const supabaseClient = {
      from(table) {
        assert.ok(Object.hasOwn(tables, table), "No additional startup child-table queries");
        const call = { table, orders: [], filters: [] };
        return {
          select(columns, options) { call.columns = columns; call.options = options; return this; },
          eq(column, value) { call.filters.push([column, value]); return this; },
          order(column, options) { call.orders.push([column, options]); return this; },
          async range(from, to) {
            call.range = [from, to];
            calls.push(call);
            const source = tables[table];
            const cap = options.caps?.[table] || 1000;
            const response = { data: source.slice(from, Math.min(to + 1, from + cap)), error: null, count: source.length };
            return options.response ? options.response(call, response) : response;
          },
        };
      },
    };
    const list = (label) => async (client, companyId) => {
      assert.equal(client, supabaseClient);
      assert.equal(companyId, "company-1");
      otherLoads.push(label);
      return { data: [{ id: label }], error: null };
    };
    const result = await loadWorkspaceCoreData({
      activeCompanyId: "company-1", supabaseClient,
      listLocations: list("locations"), listAssets: list("assets"), listParts: list("parts"), listAppIssueReports: list("issues"),
      loadWorkspaceResponse: async (label, query) => { labels.push(label); return query; },
    });
    for (const call of calls) {
      assert.deepEqual(call.options, { count: "exact" }, "Count travels with the data, never a separate HEAD probe");
      assert.deepEqual(call.filters, [["company_id", "company-1"]]);
      assert.deepEqual(call.orders, [
        [call.table === "preventive_schedules" ? "next_due_at" : "name", { ascending: true }],
        ["id", { ascending: true }],
      ], "Primary-key tie breaker keeps offset pages stable");
    }
    assert.deepEqual(otherLoads, ["locations", "assets", "parts", "issues"]);
    assert.equal(labels.length, 6, "Existing timeout/telemetry wrapper still owns each entire logical read");
    return { ...result, calls, labels };
  }

  test("small datasets and empty datasets require one query per table", async () => {
    for (const size of [0, 2, 1000]) {
      const result = await load({ schedules: scheduleRows(size), procedures: procedureRows(size) });
      assert.equal(result.calls.length, 2);
      assert.equal(result.scheduleResponse.data.length, size);
      assert.equal(result.procedureResponse.data.length, size);
      assert.equal(result.scheduleResponse.error, null);
      assert.equal(result.procedureResponse.error, null);
      assert.ok(result.calls.find(call => call.table === "procedure_templates").columns.includes("procedure_step_count:procedure_steps(count)"));
    }
  });

  test("traveling PM visibility follows current equipment without rewriting schedule data", async () => {
    const schedules = [
      { id: "travel", location_id: "old", assets: { location_id: "new", asset_type: "traveling_machine" } },
      { id: "fixed", location_id: "old", assets: { location_id: "new", asset_type: "machine" } },
    ];
    const result = await load({ schedules });
    assert.equal(result.scheduleResponse.data[0].location_id, "new");
    assert.equal(result.scheduleResponse.data[1].location_id, "old");
    assert.equal(schedules[0].location_id, "old");
  });

  test("all pages are loaded without an empty trailing probe", async () => {
    const schedules = scheduleRows(2000), procedures = procedureRows(2001);
    const result = await load({ schedules, procedures });
    assert.deepEqual(result.scheduleResponse.data, schedules);
    assert.deepEqual(result.procedureResponse.data, procedures);
    assert.deepEqual(result.calls.filter(call => call.table === "preventive_schedules").map(call => call.range), [[0, 999], [1000, 1999]]);
    assert.deepEqual(result.calls.filter(call => call.table === "procedure_templates").map(call => call.range), [[0, 999], [1000, 1999], [2000, 2999]]);
  });

  test("server caps below requested range never skip records", async () => {
    const schedules = scheduleRows(5), procedures = procedureRows(3);
    const result = await load({ schedules, procedures, caps: { preventive_schedules: 2, procedure_templates: 1 } });
    assert.deepEqual(result.scheduleResponse.data, schedules);
    assert.deepEqual(result.procedureResponse.data, procedures);
    assert.deepEqual(result.calls.filter(call => call.table === "preventive_schedules").map(call => call.range), [[0, 999], [2, 1001], [4, 1003]]);
    assert.deepEqual(result.calls.filter(call => call.table === "procedure_templates").map(call => call.range), [[0, 999], [1, 1000], [2, 1001]]);
  });

  test("uneven successful pages use actual received-row offsets", async () => {
    const schedules = scheduleRows(6);
    const result = await load({ schedules, response(call, response) {
      if (call.table === "preventive_schedules") response.data = schedules.slice(call.range[0], call.range[0] + (call.range[0] === 0 ? 3 : call.range[0] === 3 ? 1 : 2));
      return response;
    } });
    assert.deepEqual(result.scheduleResponse.data, schedules);
    assert.deepEqual(result.calls.filter(call => call.table === "preventive_schedules").map(call => call.range[0]), [0, 3, 4]);
  });

  for (const [table, responseKey] of [["preventive_schedules", "scheduleResponse"], ["procedure_templates", "procedureResponse"]]) {
    for (const [name, alter, expected] of [
      ["empty incomplete page", response => ({ ...response, data: [] }), /only 2 of 5/],
      ["changing total", response => ({ ...response, count: response.count + 1 }), /records changed/],
      ["missing exact count", response => ({ ...response, count: null }), /exact row count/],
      ["negative exact count", response => ({ ...response, count: -1 }), /exact row count/],
      ["invalid page shape", response => ({ ...response, data: null }), /invalid page/],
      ["repeated previous row", response => ({ ...response, data: [{ ...response.data[0], id: table === "preventive_schedules" ? "pm-0" : "procedure-0" }] }), /repeated record IDs/],
      ["missing row ID", response => ({ ...response, data: [{ ...response.data[0], id: null }] }), /missing or repeated/],
    ]) {
      test(`${table}: ${name} returns an error, never partial data`, async () => {
        const result = await load({ schedules: scheduleRows(5), procedures: procedureRows(5),
          caps: { [table]: 2 }, response(call, response) { return call.table === table && call.range[0] > 0 ? alter(response) : response; } });
        assert.deepEqual(result[responseKey].data, []);
        assert.match(result[responseKey].error.message, expected);
        assert.equal(result[responseKey].error.code, "INCOMPLETE_WORKSPACE_DATA");
        assert.equal(result.calls.filter(call => call.table === table).length, 2);
      });
    }
    test(`${table}: a failed later page preserves the underlying error and discards earlier rows`, async () => {
      const failure = { code: "42501", message: "Read denied" };
      const result = await load({ schedules: scheduleRows(5), procedures: procedureRows(5), caps: { [table]: 2 },
        response(call, response) { return call.table === table && call.range[0] > 0 ? { ...response, error: failure } : response; } });
      assert.equal(result[responseKey].error, failure);
      assert.deepEqual(result[responseKey].data, []);
    });
    test(`${table}: rejected later query returns an error without rejecting other core data`, async () => {
      const failure = new Error("Network unavailable");
      const result = await load({ schedules: scheduleRows(5), procedures: procedureRows(5), caps: { [table]: 2 },
        response(call, response) { if (call.table === table && call.range[0] > 0) throw failure; return response; } });
      assert.equal(result[responseKey].error, failure);
      assert.deepEqual(result[responseKey].data, []);
      assert.equal(result.assetResponse.error, null);
    });
  }

  test("more rows than exact total is not accepted", async () => {
    const result = await load({ response(call, response) {
      return call.table === "preventive_schedules" ? { ...response, count: 1 } : response;
    } });
    assert.deepEqual(result.scheduleResponse.data, []);
    assert.match(result.scheduleResponse.error.message, /does not match its row count/);
  });

  test("complete embedded steps stay attached to their template with no separate child query", async () => {
    const procedures = procedureRows(1);
    procedures[0].procedure_steps = [{ id: "step-1", required: true }, { id: "step-2", required: false }];
    procedures[0].procedure_step_count = [{ count: 2 }];
    const result = await load({ procedures });
    assert.deepEqual(result.procedureResponse.data, procedures);
    assert.equal(result.calls.length, 2);
  });

  for (const [name, alter, message] of [
    ["embedded server cap", row => { row.procedure_step_count = [{ count: 2 }]; row.procedure_steps = [{ id: "step-1" }]; }, /returned 1 of 2 steps/],
    ["missing embedded count", row => { delete row.procedure_step_count; }, /step count.*unavailable/],
    ["missing embedded rows", row => { delete row.procedure_steps; }, /step count.*unavailable/],
    ["duplicate embedded step", row => { row.procedure_step_count = [{ count: 2 }]; row.procedure_steps = [{ id: "step-1" }, { id: "step-1" }]; }, /embedded checklist may be capped/],
  ]) {
    test(`${name} fails closed without a giant child-table fallback`, async () => {
      const procedures = procedureRows(3);
      alter(procedures[2]);
      const result = await load({ procedures, caps: { procedure_templates: 2 } });
      assert.deepEqual(result.procedureResponse.data, []);
      assert.match(result.procedureResponse.error.message, message);
      assert.equal(result.calls.filter(call => call.table === "procedure_templates").length, 2);
    });
  }

  for (const { name, run } of tests) {
    try { await run(); } catch (error) { throw new Error(`${name}: ${error.stack}`); }
  }
  console.log(`workspace startup paged maintenance smoke passed (${tests.length} isolated cases)`);
})().catch(error => { console.error(error); process.exitCode = 1; });
