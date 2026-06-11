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

console.log("request emailer template smoke passed");
