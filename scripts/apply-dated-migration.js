const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const migrationsDir = path.join(root, "supabase", "migrations");
const projectRefPath = path.join(root, "supabase", ".temp", "project-ref");
const supabaseCliPath = require.resolve("supabase/dist/supabase.js");
const datedMigrationPattern = /^\d{12}_[a-z0-9][a-z0-9_]*\.sql$/;

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readProjectRef() {
  if (!fs.existsSync(projectRefPath)) return "unknown";
  return fs.readFileSync(projectRefPath, "utf8").trim() || "unknown";
}

function listMigrations() {
  if (!fs.existsSync(migrationsDir)) return [];
  return fs.readdirSync(migrationsDir)
    .filter((name) => name.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b));
}

function resolveMigrationArg(rawValue) {
  if (!rawValue) fail("Pass a dated migration file name from supabase/migrations.");
  const fileName = path.basename(rawValue);
  if (!datedMigrationPattern.test(fileName)) {
    fail(`Invalid migration file name: ${fileName}. Use YYYYMMDDHHMM_description.sql.`);
  }
  const filePath = path.join(migrationsDir, fileName);
  if (!fs.existsSync(filePath)) {
    fail(`Migration file not found: supabase/migrations/${fileName}`);
  }
  return { fileName, filePath };
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const execute = args.includes("--execute");
  const migrationArg = args.find((value) => !value.startsWith("--")) || "";
  return {
    execute,
    migration: resolveMigrationArg(migrationArg),
  };
}

function printPlan({ fileName, filePath }, execute) {
  const projectRef = readProjectRef();
  console.log(`Migration: supabase/migrations/${fileName}`);
  console.log(`Project ref: ${projectRef}`);
  console.log(`Mode: ${execute ? "execute" : "dry-run"}`);
  console.log("");
  console.log("Next steps:");
  console.log(`1. Review ${path.relative(root, filePath)}`);
  console.log(`2. ${execute ? "Run" : "To run,"} npx supabase db query --linked --file "${path.relative(root, filePath)}"`);
  console.log(`3. Record live verification in docs/APPLIED_MIGRATIONS.md`);
}

function executeMigration(filePath) {
  execFileSync(process.execPath, [supabaseCliPath, "db", "query", "--linked", "--file", path.relative(root, filePath)], {
    cwd: root,
    stdio: "inherit",
  });
}

function main() {
  if (!listMigrations().length) fail("No dated migrations found in supabase/migrations.");
  const { execute, migration } = parseArgs(process.argv);
  printPlan(migration, execute);
  if (!execute) return;
  console.log("");
  executeMigration(migration.filePath);
}

main();
