const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const sql = fs.readFileSync(path.join(root, "supabase", "step-next-accounting-role.sql"), "utf8");
const lower = sql.toLowerCase();

assert.match(lower, /company_members_role_check[\s\S]*accounting/);
assert.match(lower, /company_invites_role_check[\s\S]*accounting/);
assert.match(lower, /new_role not in \('admin', 'manager', 'accounting', 'technician'\)/);
assert.match(lower, /selected_role not in \('admin', 'manager', 'accounting', 'technician'\)/);
assert.match(lower, /actor_role <> 'admin' and selected_role <> 'technician'/);
assert.match(lower, /when 'accounting' then 2/);
assert.doesNotMatch(lower, /cm\.role in \('admin', 'manager', 'accounting'\)/);

console.log("accounting role SQL smoke passed");
