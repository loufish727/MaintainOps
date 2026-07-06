const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const source = fs.readFileSync(path.join(root, "scripts", "apply-dated-migration.js"), "utf8");
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

assert.equal(packageJson.scripts["migration:apply"], "node scripts/apply-dated-migration.js");
assert.ok(source.includes('const datedMigrationPattern = /^\\d{12}_[a-z0-9][a-z0-9_]*\\.sql$/;'));
assert.match(source, /--execute/, "migration apply helper must support an explicit execute mode");
assert.match(source, /supabase db query --linked --file/, "migration apply helper must use the linked Supabase CLI query path");
assert.match(source, /Record live verification in docs\/APPLIED_MIGRATIONS\.md/, "migration apply helper must remind operators to record verification");

console.log("migration apply helper smoke passed");
