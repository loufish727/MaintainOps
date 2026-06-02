const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const hardeningSql = fs.readFileSync(path.join(root, "supabase", "step-next-invite-role-preservation.sql"), "utf8");
const defaultLocationSql = fs.readFileSync(path.join(root, "supabase", "step-next-invite-default-location.sql"), "utf8");
const teamInvitesSql = fs.readFileSync(path.join(root, "supabase", "step-next-team-invites.sql"), "utf8");

function acceptInviteBlock(sql) {
  const match = sql.match(/create or replace function public\.accept_company_invites\(\)[\s\S]*?\$\$;/i);
  assert.ok(match, "accept_company_invites function is present");
  return match[0].toLowerCase();
}

for (const sql of [hardeningSql, defaultLocationSql, teamInvitesSql]) {
  assert.match(sql, /create or replace function private\.role_rank/i);
  const block = acceptInviteBlock(sql);
  assert.match(block, /private\.role_rank\(public\.company_members\.role\)/);
  assert.match(block, /private\.role_rank\(excluded\.role\)/);
  assert.doesNotMatch(block, /set\s+role\s*=\s*excluded\.role\s*(,|;)/);
}

console.log("invite role preservation SQL smoke passed");
