const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const migration = fs.readFileSync(
  path.join(root, "supabase", "migrations", "202608051200_production_ready_notifications.sql"),
  "utf8"
).toLowerCase();

assert.match(migration, /create table if not exists public\.work_order_notifications/);
assert.match(migration, /unique \(source_event_id, recipient_id\)/);
assert.match(migration, /alter table public\.work_order_notifications enable row level security/);
assert.match(migration, /grant select on public\.work_order_notifications to authenticated/);
assert.match(migration, /grant update \(read_at\) on public\.work_order_notifications to authenticated/);
assert.doesNotMatch(migration, /grant (?:insert|delete|update) on public\.work_order_notifications to authenticated/);
assert.match(migration, /recipient_id = auth\.uid\(\)/);
assert.match(migration, /cm\.user_id = new\.assigned_to/);
assert.match(migration, /cm\.user_id = new\.created_by or cm\.role in \('admin', 'manager'\)/);
assert.match(migration, /event_name <> 'production_action_completed'/);
assert.match(migration, /on conflict \(source_event_id, recipient_id\) do nothing/);
assert.doesNotMatch(migration, /request_notification_outbox|notify_request_emailer|notification_email/);

console.log("production ready notifications SQL smoke passed");
