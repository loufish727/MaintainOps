const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const migration = fs.readFileSync(path.join(root, "supabase", "step-next-work-order-part-history-actors.sql"), "utf8");
const inventory = fs.readFileSync(path.join(root, "supabase", "step-next-parts-inventory.sql"), "utf8");
const recordUsage = fs.readFileSync(path.join(root, "supabase", "step-next-record-work-order-part-usage.sql"), "utf8");
const schema = fs.readFileSync(path.join(root, "supabase", "schema.sql"), "utf8");

for (const source of [migration, inventory, recordUsage, schema]) {
  assert.match(source, /created_by uuid references auth\.users\(id\) on delete set null/);
  assert.match(source, /work_order_parts_created_by_idx/);
}

assert.match(migration, /created_by\s*\)\s*values[\s\S]*auth\.uid\(\)/);
assert.match(recordUsage, /created_by\s*\)\s*values[\s\S]*auth\.uid\(\)/);
assert.match(migration, /notify pgrst, 'reload schema'/);

console.log("work order part history actor sql smoke passed");
