const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const appSource = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");

assert.match(appSource, /async function runStartupInviteChecks\(\)/);
assert.match(appSource, /const shouldCheckPendingJoinLink = Boolean\(joinToken && teamInviteLinksReady\)/);
assert.match(appSource, /withOperationTimeout\(\s*acceptTeamInvites\(\),\s*"Team invite refresh timed out\.",\s*4000\s*\)\.catch\(\(\) => \{\}\)/s);
assert.match(appSource, /if \(!shouldCheckPendingJoinLink\) \{\s*return null;\s*\}/s);
assert.match(appSource, /withOperationTimeout\(\s*acceptPendingTeamJoinLink\(\),\s*"Team invite join link timed out\.",\s*5000/s);
assert.doesNotMatch(appSource, /Promise\.all\(\[acceptTeamInvites\(\), acceptPendingTeamJoinLink\(\)\]\)/);

console.log("startup invite check source smoke passed");
