const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");

const appSource = readFileSync("app.js", "utf8");
const visibleNavMatch = appSource.match(/function visibleNavItems\(\) \{[\s\S]*?return items;\s*\}/);
assert.ok(visibleNavMatch, "visibleNavItems should exist");

const visibleNavSource = visibleNavMatch[0];
const managerIndex = visibleNavSource.indexOf('["manager", "Manager"]');
const adminGateIndex = visibleNavSource.indexOf("if (canAdministerTeamRoles())");
const managerGateIndex = visibleNavSource.indexOf("if (canManageTeam())");
const financialIndex = visibleNavSource.indexOf('["financial", "Financial"]');
assert.ok(managerIndex > adminGateIndex, "Manager nav item should stay inside admin role gate");
assert.ok(financialIndex >= 0, "Financial nav item should exist");
assert.match(visibleNavSource, /activeCompanyRole\(\) === "accounting"[\s\S]*\[\["financial", "Financial"\]\]/);
assert.match(visibleNavSource, /if \(canUseFinancialMenu\(\)\)/);
assert.doesNotMatch(
  visibleNavSource.slice(0, adminGateIndex),
  /\["manager", "Manager"\]/,
  "Manager nav item must not be visible to base technician nav"
);
assert.ok(
  managerGateIndex < 0 || managerGateIndex > managerIndex,
  "Manager nav item must not be introduced by the manager/admin team gate"
);

const iconSource = readFileSync("src/render/iconDisplay.js", "utf8");
assert.match(iconSource, /manager:/);

console.log("manager nav visibility smoke passed");
