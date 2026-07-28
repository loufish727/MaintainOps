const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const migration = fs.readFileSync(
  path.resolve(__dirname, "../../supabase/migrations/202607281200_performance_vital_session_dedup.sql"),
  "utf8",
).toLowerCase();

assert.match(migration, /create or replace function public\.get_app_performance_dashboard/);
assert.match(migration, /partition by recorded_by/);
assert.match(migration, /count\(\*\) filter \(where metric_name = 'session_start'\) over/);
assert.match(migration, /partition by recorded_by, session_number, metric_name/);
assert.match(migration, /metric_name not in \('fcp_ms', 'lcp_ms', 'inp_ms', 'cls'\)/);
assert.match(migration, /or session_metric_rank = 1/);
assert.match(migration, /'raw_sample_count'/);
assert.match(migration, /'duplicate_vital_samples_ignored'/);
assert.match(migration, /security definer/);
assert.match(migration, /set search_path = public, private, pg_temp/);
assert.match(migration, /revoke all on function public\.get_app_performance_dashboard\(uuid, integer\) from public, anon/);
assert.match(migration, /grant execute on function public\.get_app_performance_dashboard\(uuid, integer\) to authenticated/);
assert.doesNotMatch(migration, /\b(delete|truncate|drop table)\b/);

console.log("platform performance session dedup SQL smoke passed");
