const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const sql = fs.readFileSync(path.join(root, "supabase", "step-next-asset-financials.sql"), "utf8");
const lower = sql.toLowerCase();

assert.match(lower, /create table if not exists public\.asset_financials/);
assert.match(lower, /asset_id uuid references public\.assets\(id\) on delete set null/);
assert.match(lower, /archived_asset_name text/);
assert.match(lower, /operational_deleted_at timestamptz/);
assert.match(lower, /asset_tag text/);
assert.match(lower, /current_book_value numeric/);
assert.match(lower, /needs_review boolean not null default true/);
assert.match(lower, /last_reviewed_at timestamptz/);
assert.match(lower, /alter table public\.asset_financials enable row level security/);
assert.match(lower, /financial roles can read asset financials/);
assert.match(lower, /cm\.role in \('admin', 'manager', 'accounting'\)/);
assert.match(lower, /cm\.role in \('admin', 'accounting'\)/);
assert.match(lower, /finance roles can delete archived asset financials/);
assert.match(lower, /grant select, insert, update, delete on public\.asset_financials to authenticated/);
assert.doesNotMatch(lower, /grant .* on public\.assets to anon/);

console.log("asset financials SQL smoke passed");
