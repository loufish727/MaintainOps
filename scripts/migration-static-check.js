const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const supabaseDir = path.join(root, "supabase");
const migrationsDir = path.join(supabaseDir, "migrations");
const appliedDocPath = path.join(root, "docs", "APPLIED_MIGRATIONS.md");

const datedMigrationPattern = /^\d{12}_[a-z0-9][a-z0-9_]*\.sql$/;
const allowedLegacyRootPatterns = [
  /^schema\.sql$/,
  /^audit-[a-z0-9-]+-\d{4}-\d{2}-\d{2}\.sql$/,
  /^step-next-[a-z0-9-]+\.sql$/,
  /^step-live-[a-z0-9-]+\.sql$/,
];

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function listSqlFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((name) => name.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b));
}

function main() {
  if (!fs.existsSync(migrationsDir)) {
    fail("Missing supabase/migrations directory.");
  }

  if (!fs.existsSync(appliedDocPath)) {
    fail("Missing docs/APPLIED_MIGRATIONS.md.");
  }

  const rootSqlFiles = listSqlFiles(supabaseDir);
  for (const fileName of rootSqlFiles) {
    if (!allowedLegacyRootPatterns.some((pattern) => pattern.test(fileName))) {
      fail(`Unexpected root SQL file name: supabase/${fileName}. New migrations belong in supabase/migrations/YYYYMMDDHHMM_description.sql.`);
    }
  }

  const migrationFiles = listSqlFiles(migrationsDir);
  const seenPrefixes = new Set();
  for (const fileName of migrationFiles) {
    if (!datedMigrationPattern.test(fileName)) {
      fail(`Invalid migration file name: supabase/migrations/${fileName}. Use YYYYMMDDHHMM_description.sql.`);
      continue;
    }
    const prefix = fileName.slice(0, 12);
    if (seenPrefixes.has(prefix)) {
      fail(`Duplicate migration timestamp prefix: ${prefix}.`);
    }
    seenPrefixes.add(prefix);
  }

  if (process.exitCode) return;

  console.log(JSON.stringify({
    status: "PASS",
    rootSqlFiles: rootSqlFiles.length,
    datedMigrations: migrationFiles.length,
    appliedMigrationDoc: "present",
  }, null, 2));
}

main();
