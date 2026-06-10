const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const appSource = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");

assert.match(appSource, /label:\s*"Primary"/);
assert.match(appSource, /typeFilter:\s*"machine"/);
assert.match(appSource, /label:\s*"Forklifts"/);
assert.match(appSource, /typeFilter:\s*"forklift"/);
assert.match(appSource, /label:\s*"Sub Equipment"/);
assert.match(appSource, /typeFilter:\s*"secondary_machine"/);

console.log("equipment main summary static smoke passed");
