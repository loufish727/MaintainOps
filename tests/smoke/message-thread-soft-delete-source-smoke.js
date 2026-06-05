const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const appSource = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");
const sqlSource = fs.readFileSync(path.join(__dirname, "..", "..", "supabase", "step-next-message-thread-soft-delete.sql"), "utf8");

assert.match(appSource, /member\.user_id === session\.user\.id && !member\.deleted_at/);
assert.match(appSource, /visibleThreadIds\.has\(thread\.id\)/);
assert.match(sqlSource, /alter table public\.message_thread_members/);
assert.match(sqlSource, /add column if not exists deleted_at timestamptz/);
assert.match(sqlSource, /create or replace function public\.soft_delete_own_message_thread/);
assert.match(sqlSource, /set search_path = public, private/);
assert.match(sqlSource, /grant execute on function public\.soft_delete_own_message_thread\(uuid\) to authenticated/);

console.log("message thread soft delete source smoke passed");
