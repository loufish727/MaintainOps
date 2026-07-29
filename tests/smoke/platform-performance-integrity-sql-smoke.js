const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const migration = fs.readFileSync(
  path.resolve(__dirname, "../../supabase/migrations/202607291200_performance_measurement_integrity.sql"),
  "utf8",
).toLowerCase();

assert.match(migration, /add column if not exists measurement_version smallint not null default 1/);
assert.match(migration, /sample #>> '\{context,measurement_version\}' = '2'/);
assert.match(migration, /measurement_version,\s*context/);
assert.match(migration, /and measurement_version = 2/);
assert.match(migration, /and measurement_version < 2/);
assert.match(migration, /'legacy_sample_count_ignored'/);
assert.match(migration, /'measurement_started_at'/);
assert.match(migration, /'measurement_version', 2/);
assert.match(migration, /security definer/);
assert.match(migration, /set search_path = public, private, pg_temp/);
assert.match(migration, /revoke all on function public\.record_app_performance_samples\(uuid, jsonb\) from public, anon/);
assert.match(migration, /revoke all on function public\.get_app_performance_dashboard\(uuid, integer\) from public, anon/);
assert.match(migration, /grant execute on function public\.record_app_performance_samples\(uuid, jsonb\) to authenticated/);
assert.match(migration, /grant execute on function public\.get_app_performance_dashboard\(uuid, integer\) to authenticated/);
assert.doesNotMatch(migration, /\b(truncate|drop table|update public\.app_performance_samples)\b/);

console.log("platform performance measurement integrity SQL smoke passed");
