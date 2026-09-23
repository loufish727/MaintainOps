const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { spawnSync } = require("node:child_process");

const root = path.resolve(__dirname, "..", "..");
const source = fs.readFileSync(path.join(root, "scripts", "apply-dated-migration.js"), "utf8");
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

assert.equal(packageJson.scripts["migration:apply"], "node scripts/apply-dated-migration.js");
const auditSource = fs.readFileSync(path.join(root, "scripts", "migration-static-check.js"), "utf8");
for (const script of [source, auditSource]) {
  const pattern = vm.runInNewContext(script.match(/const datedMigrationPattern = (.+);/)[1]);
  for (const stamp of ["202609230518", "20260923051845"]) assert.ok(pattern.test(`${stamp}_pm_lifecycle_integrity.sql`));
  for (const name of ["20260923051_bad.sql", "2026092305184_bad.sql", "202609230518450_bad.sql", "202609230518_Bad.sql", "../202609230518_bad.sql", "202609230518_.sql"]) assert.equal(pattern.test(name), false);
}
const prefixSource = auditSource.match(/const prefix = (.+);/)[1];
const prefix = fileName => vm.runInNewContext(prefixSource, { fileName });
assert.equal(prefix("202609230518_one.sql"), prefix("20260923051800_two.sql"));
assert.notEqual(prefix("20260923051844_one.sql"), prefix("20260923051845_two.sql"));
const migrations = fs.readdirSync(path.join(root, "supabase", "migrations"));
for (const digits of [12, 14]) {
  const file = migrations.find(name => new RegExp(`^\\d{${digits}}_`).test(name));
  assert.ok(file);
  const result = spawnSync(process.execPath, ["scripts/apply-dated-migration.js", file], { cwd: root, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Mode: dry-run/);
}
assert.match(source, /--execute/, "migration apply helper must support an explicit execute mode");
assert.match(source, /supabase db query --linked --file/, "migration apply helper must use the linked Supabase CLI query path");
assert.match(source, /Record live verification in docs\/APPLIED_MIGRATIONS\.md/, "migration apply helper must remind operators to record verification");

console.log("migration apply helper smoke passed");
