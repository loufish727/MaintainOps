const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const migration = fs.readFileSync(path.join(root, "supabase", "step-next-accounting-readonly-boundaries.sql"), "utf8");
const schema = fs.readFileSync(path.join(root, "supabase", "schema.sql"), "utf8");
const sql = `${migration}\n${schema}`.toLowerCase();

assert.match(sql, /create or replace function private\.is_company_operational_editor/);
assert.match(sql, /cm\.role in \('admin', 'manager', 'technician', 'member'\)/);
const editorFunction = migration.toLowerCase().match(/create or replace function private\.is_company_operational_editor[\s\S]*?\$\$;/)?.[0] || "";
assert.ok(editorFunction, "operational editor helper should be present");
assert.doesNotMatch(editorFunction, /'accounting'/);

assert.match(sql, /financial roles can read asset financials/);
assert.match(sql, /cm\.role in \('admin', 'manager', 'accounting'\)/);
assert.match(migration.toLowerCase(), /finance roles can insert asset financials|financial roles can read asset financials/);

for (const table of [
  "locations",
  "assets",
  "work_orders",
  "work_order_comments",
  "work_order_photos",
  "preventive_schedules",
  "parts",
  "work_order_parts",
  "part_documents",
  "work_order_events",
  "asset_events",
  "maintenance_requests",
  "procedure_templates",
  "procedure_steps",
  "work_order_step_results",
]) {
  assert.match(
    migration,
    new RegExp(`on public\\.${table.replace("_", "\\_")} for (insert|update|delete)`, "i"),
    `${table} should have an operational mutation policy in the accounting boundary migration`
  );
}

assert.match(migration, /bucket_id = 'work-order-photos'[\s\S]*is_company_operational_editor/i);
assert.match(migration, /bucket_id = 'part-documents'[\s\S]*is_company_operational_editor/i);
assert.match(migration, /notify pgrst, 'reload schema';/i);

console.log("accounting readonly boundaries SQL smoke passed");
