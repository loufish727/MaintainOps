const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..", "..");
const migration = fs.readFileSync(path.join(root, "supabase", "step-next-asset-financial-delete-retention.sql"), "utf8");
const schema = fs.readFileSync(path.join(root, "supabase", "schema.sql"), "utf8");
const schemaTableBlock = schema.match(/create table if not exists public\.asset_financials \([\s\S]*?\n\);/i)?.[0] || "";

for (const sql of [migration, schema]) {
  assert.match(sql, /archived_asset_name text/i);
  assert.match(sql, /operational_deleted_at timestamptz/i);
  assert.match(sql, /asset_id uuid references public\.assets\(id\) on delete set null|foreign key \(asset_id\) references public\.assets\(id\) on delete set null/i);
  assert.match(sql, /archive_asset_financial_before_delete/i);
  assert.match(sql, /set asset_id = null/i);
  assert.match(sql, /archived_asset_name = old\.name/i);
  assert.match(sql, /Finance roles can delete archived asset financials/i);
  assert.match(sql, /asset_financials\.asset_id is null/i);
}

assert.doesNotMatch(migration, /asset_id uuid not null references public\.assets\(id\) on delete cascade/i);
assert.doesNotMatch(schemaTableBlock, /asset_id uuid not null references public\.assets\(id\) on delete cascade/i);

assert.match(migration, /alter column asset_id drop not null/i);
assert.match(migration, /drop constraint if exists asset_financials_asset_id_fkey/i);
assert.match(migration, /grant delete on public\.asset_financials to authenticated/i);
assert.match(migration, /notify pgrst, 'reload schema';/i);

console.log("asset financial delete retention SQL smoke passed");
