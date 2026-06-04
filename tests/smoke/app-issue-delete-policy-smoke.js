const fs = require("fs");
const path = require("path");
const assert = require("node:assert/strict");

const sql = fs.readFileSync(path.join(__dirname, "..", "..", "supabase", "step-next-app-issue-delete-policy.sql"), "utf8");
const setupSql = fs.readFileSync(path.join(__dirname, "..", "..", "supabase", "step-next-app-issue-reports.sql"), "utf8");

assert.match(sql, /grant delete on public\.app_issue_reports to authenticated;/i);
assert.match(sql, /create policy "Managers can delete app issue reports"/i);
assert.match(sql, /cm\.role in \('admin', 'manager'\)/i);
assert.match(sql, /notify pgrst, 'reload schema';/i);
assert.match(setupSql, /grant select, insert, update, delete on public\.app_issue_reports to authenticated;/i);
assert.match(setupSql, /create policy "Managers can delete app issue reports"/i);

console.log("app issue delete policy smoke passed");
