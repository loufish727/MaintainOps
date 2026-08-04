const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const migration = fs.readFileSync(path.join(root, "supabase", "migrations", "202608041200_production_actions.sql"), "utf8").toLowerCase();

assert.match(migration, /company_members_role_check[\s\S]*'production'/);
assert.match(migration, /company_invites_role_check[\s\S]*'production'/);
assert.match(migration, /when 'production' then 2/);
assert.match(migration, /is_company_operational_editor[\s\S]*'production'[\s\S]*'technician'/);
assert.doesNotMatch(migration, /is_company_operational_editor[\s\S]{0,500}cm\.role in \([^)]*'accounting'/);
assert.match(migration, /new_role not in \('admin', 'manager', 'accounting', 'production', 'technician'\)/);
assert.match(migration, /selected_role not in \('admin', 'manager', 'accounting', 'production', 'technician'\)/);
assert.match(migration, /work_orders_company_production_action_assigned_profile_fkey/);
assert.match(migration, /work_orders_production_action_consistency_check/);
assert.match(migration, /work_orders_production_action_completion_check/);
assert.match(migration, /production actions must be assigned to a production user/);
assert.match(migration, /complete or remove the open production action before completing this work order/);
assert.match(migration, /production_action_created/);
assert.match(migration, /production_action_completed/);
assert.match(migration, /guard_production_role_change/);
assert.match(migration, /wo\.production_action_assigned_to = auth\.uid\(\) and wo\.production_action_status = 'open'/);
assert.match(migration, /technician and production users can only claim unassigned work/);

console.log("production actions SQL smoke passed");
