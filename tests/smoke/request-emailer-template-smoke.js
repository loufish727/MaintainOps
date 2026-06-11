const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");

const source = readFileSync("supabase/functions/request-emailer/index.ts", "utf8");

assert.match(source, /function requestSummaryFromDescription/);
assert.match(source, /\^machine\\s\*\\\/\\s\*area:/);
assert.match(source, /\^submitted by:/i);
assert.match(source, /\^contact:/i);
assert.match(source, /Machine \/ Area:/);
assert.match(source, /Details:/);
assert.doesNotMatch(source, /`New MaintainOps Request: \$\{title\}`/);
assert.match(source, /function inviteEmailBody/);
assert.match(source, /MaintainOps Invite:/);
assert.match(source, /Use the same email address this message was sent to/);
assert.match(source, /auth\.getUser\(token\)/);
assert.match(source, /Only admins or managers can send invite emails/);
assert.match(source, /Only admins can send manager or admin invites/);
assert.match(source, /sendGoogleScriptInviteEmail/);

console.log("request emailer template smoke passed");
