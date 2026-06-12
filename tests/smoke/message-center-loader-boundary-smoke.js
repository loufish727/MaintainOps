const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const appSource = fs.readFileSync(path.join(__dirname, "../../app.js"), "utf8");

assert.match(appSource, /\.from\("messages"\)\s*\.select\("id, thread_id, sender_id, created_at, deleted_at"\)/);
assert.match(appSource, /async function loadActiveMessageThreadMessages\(threadId\)/);
assert.match(appSource, /\.eq\("thread_id", threadId\)/);
assert.match(appSource, /messagesByThreadId\[threadId\] = activeMessageResponse\.data \|\| \[\];/);

console.log("message center loader boundary smoke passed");
