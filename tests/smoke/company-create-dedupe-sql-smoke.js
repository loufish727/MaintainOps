const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..", "..");
const migration = fs.readFileSync(path.join(root, "supabase", "step-next-company-create-dedupe.sql"), "utf8");
const schema = fs.readFileSync(path.join(root, "supabase", "schema.sql"), "utf8");

for (const sql of [migration, schema]) {
  assert.match(sql, /create or replace function public\.create_company\(company_name text\)/i);
  assert.match(sql, /normalized_company_name := btrim\(coalesce\(company_name, ''\)\)/i);
  assert.match(sql, /join public\.company_members cm/i);
  assert.match(sql, /cm\.user_id = auth\.uid\(\)/i);
  assert.match(sql, /where lower\(btrim\(c\.name\)\) = lower\(normalized_company_name\)/i);
  assert.match(sql, /if existing_company_id is not null then\s+return existing_company_id;/i);
  assert.match(sql, /values \(normalized_company_name, auth\.uid\(\)\)/i);
}

assert.match(migration, /grant execute on function public\.create_company\(text\) to authenticated, service_role;/i);
assert.match(migration, /notify pgrst, 'reload schema';/i);

console.log("company create dedupe SQL smoke passed");
