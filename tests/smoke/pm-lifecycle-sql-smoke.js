const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { checkPmLifecycle } = require("../../scripts/isolated-pm-lifecycle-check");

const sql = fs.readFileSync(path.join(__dirname, "../../supabase/migrations/20260923051845_pm_lifecycle_integrity.sql"), "utf8");
assert.match(sql, /preventive_schedule_id uuid references public\.preventive_schedules\(id\) on delete set null/i);
assert.match(sql, /unique index[^;]+company_id, preventive_source_id, preventive_due_at/is);
assert.match(sql, /as restrictive for all to authenticated/i);
assert.doesNotMatch(sql, /security definer/i);
assert.doesNotMatch(sql, /update public\.work_orders set preventive_source/i);

checkPmLifecycle().then(report => {
  assert.equal(report.status, "PASS");
  console.log(`PM lifecycle SQL smoke passed (${report.checks.length} isolated checks)`);
}).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
