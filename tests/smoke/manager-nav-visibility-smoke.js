const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");

const appSource = readFileSync("app.js", "utf8");
const visibleNavMatch = appSource.match(/function visibleNavItems\(\) \{[\s\S]*?return items;\s*\}/);
assert.ok(visibleNavMatch, "visibleNavItems should exist");

const visibleNavSource = visibleNavMatch[0];
const managerIndex = visibleNavSource.indexOf('["manager", "Manager"]');
const gateIndex = visibleNavSource.indexOf("if (canManageTeam())");
assert.ok(managerIndex > gateIndex, "Manager nav item should stay inside canManageTeam gate");
assert.doesNotMatch(
  visibleNavSource.slice(0, gateIndex),
  /\["manager", "Manager"\]/,
  "Manager nav item must not be visible to base technician nav"
);

const iconSource = readFileSync("src/render/iconDisplay.js", "utf8");
assert.match(iconSource, /manager:/);

console.log("manager nav visibility smoke passed");
