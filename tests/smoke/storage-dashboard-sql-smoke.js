const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const sql = fs.readFileSync(path.join(root, "supabase", "step-next-storage-dashboard.sql"), "utf8");
const lower = sql.toLowerCase();

assert.match(lower, /create or replace function public\.get_storage_dashboard\(target_company_id uuid\)/);
assert.match(lower, /security definer/);
assert.match(lower, /set search_path = public, private, storage/);
assert.match(lower, /cm\.role in \('admin', 'manager'\)/);
assert.doesNotMatch(lower, /cm\.role in \('admin', 'manager', 'accounting'\)/);
assert.match(lower, /from storage\.objects/);
assert.match(lower, /join public\.work_order_photos/);
assert.match(lower, /join public\.maintenance_requests/);
assert.match(lower, /join public\.asset_documents/);
assert.match(lower, /join public\.part_documents/);
assert.match(lower, /join public\.companies/);
assert.match(lower, /107374182400/);
assert.match(lower, /month_series as/);
assert.match(lower, /monthly_usage as/);
assert.match(lower, /'photo_count', totals\.photo_count/);
assert.match(lower, /'photo_count', photo_count/);
assert.match(lower, /content_type ilike 'image\/%'/);
assert.doesNotMatch(lower, /'type_totals'/);
assert.match(lower, /'monthly_usage', monthly_json\.rows/);
assert.match(lower, /'remaining_bytes', remaining_bytes/);
assert.match(lower, /generate_series/);
assert.match(lower, /limit 10/);
assert.match(lower, /grant execute on function public\.get_storage_dashboard\(uuid\) to authenticated/);

console.log("storage dashboard SQL smoke passed");
