const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { writeEvidence } = require("./lfes-evidence");

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

function listSqlFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory)
    .filter((name) => name.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b));
}

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function main() {
  const errors = [];
  const rootSqlFiles = listSqlFiles(supabaseDir);
  const migrationFiles = listSqlFiles(migrationsDir);
  const appliedDocument = fs.existsSync(appliedDocPath) ? fs.readFileSync(appliedDocPath, "utf8") : "";

  if (!fs.existsSync(migrationsDir)) errors.push("Missing supabase/migrations directory.");
  if (!appliedDocument) errors.push("Missing or empty docs/APPLIED_MIGRATIONS.md.");

  for (const fileName of rootSqlFiles) {
    if (!allowedLegacyRootPatterns.some((pattern) => pattern.test(fileName))) {
      errors.push(`Unexpected root SQL file name: supabase/${fileName}. New migrations belong in supabase/migrations/YYYYMMDDHHMM_description.sql.`);
    }
  }

  const seenPrefixes = new Set();
  const migrations = migrationFiles.map((fileName) => {
    const filePath = path.join(migrationsDir, fileName);
    const text = fs.readFileSync(filePath, "utf8");
    if (!datedMigrationPattern.test(fileName)) {
      errors.push(`Invalid migration file name: supabase/migrations/${fileName}. Use YYYYMMDDHHMM_description.sql.`);
    }
    const prefix = fileName.slice(0, 12);
    if (seenPrefixes.has(prefix)) errors.push(`Duplicate migration timestamp prefix: ${prefix}.`);
    seenPrefixes.add(prefix);
    if (!text.trim()) errors.push(`Empty migration file: supabase/migrations/${fileName}.`);
    if (!appliedDocument.includes(`supabase/migrations/${fileName}`)) {
      errors.push(`Migration status is not documented in docs/APPLIED_MIGRATIONS.md: ${fileName}.`);
    }
    return {
      file: `supabase/migrations/${fileName}`,
      sha256: sha256(text),
      documented: appliedDocument.includes(`supabase/migrations/${fileName}`),
    };
  });

  const report = {
    status: errors.length ? "FAIL" : "PASS",
    scope: "Migration naming, uniqueness, non-empty content, documentation coverage, and content hashes",
    generatedAt: new Date().toISOString(),
    rootSqlFiles: rootSqlFiles.length,
    datedMigrations: migrationFiles.length,
    migrations,
    appliedMigrationDoc: appliedDocument ? "present" : "missing",
    errors,
  };

  writeEvidence("migration-static.json", report);
  console.log(JSON.stringify(report, null, 2));
  if (errors.length) process.exitCode = 1;
}

main();
