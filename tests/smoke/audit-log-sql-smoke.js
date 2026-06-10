const fs = require("fs");
const path = require("path");
const assert = require("node:assert/strict");

const sql = fs.readFileSync(path.join(__dirname, "..", "..", "supabase", "step-next-audit-log.sql"), "utf8");

assert.match(sql, /create table if not exists public\.audit_log/i);
assert.match(sql, /old_data jsonb/i);
assert.match(sql, /new_data jsonb/i);
assert.match(sql, /changed_fields text\[\]/i);
assert.match(sql, /alter table public\.audit_log enable row level security/i);
assert.match(sql, /revoke all on public\.audit_log from anon/i);
assert.match(sql, /revoke all on public\.audit_log from authenticated/i);
assert.match(sql, /grant select on public\.audit_log to authenticated/i);
assert.match(sql, /create policy "Admins can read audit log"/i);
assert.match(sql, /cm\.role = 'admin'/i);
assert.match(sql, /create policy "No client audit log inserts"/i);
assert.match(sql, /with check \(false\)/i);
assert.match(sql, /create policy "No client audit log updates"/i);
assert.match(sql, /create policy "No client audit log deletes"/i);
assert.match(sql, /create or replace function private\.audit_row_change\(\)/i);
assert.match(sql, /security definer/i);
assert.match(sql, /set search_path = public, private, pg_temp/i);
assert.match(sql, /auth\.uid\(\)/i);
assert.match(sql, /call private\.attach_audit_trigger\('public\.work_orders'::regclass\)/i);
assert.match(sql, /call private\.attach_audit_trigger\('public\.assets'::regclass\)/i);
assert.match(sql, /call private\.attach_audit_trigger\('public\.maintenance_requests'::regclass\)/i);
assert.match(sql, /call private\.attach_audit_trigger\('public\.company_members'::regclass\)/i);
assert.doesNotMatch(sql, /call private\.attach_audit_trigger\('public\.audit_log'::regclass\)/i);
assert.doesNotMatch(sql, /call private\.attach_audit_trigger\('public\.work_order_events'::regclass\)/i);
assert.match(sql, /notify pgrst, 'reload schema';/i);

console.log("audit log SQL smoke passed");
