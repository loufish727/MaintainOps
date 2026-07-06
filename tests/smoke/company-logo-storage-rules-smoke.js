const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..", "..");
const stepSql = fs.readFileSync(path.join(root, "supabase", "step-next-company-logo-storage-rules.sql"), "utf8").toLowerCase();
const setupSql = fs.readFileSync(path.join(root, "supabase", "step-next-company-logo.sql"), "utf8").toLowerCase();
const schemaSql = fs.readFileSync(path.join(root, "supabase", "schema.sql"), "utf8").toLowerCase();

for (const sql of [stepSql, setupSql, schemaSql]) {
  assert.match(sql, /where id = 'company-logos'/);
  assert.match(sql, /file_size_limit = 26214400/);
  assert.match(sql, /allowed_mime_types = array\[/);
  assert.match(sql, /'image\/png'/);
}

console.log("company logo storage rules smoke passed");
