const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const source = fs.readFileSync(path.join(__dirname, "..", "..", "src", "render", "navBadgeDisplay.js"), "utf8");
const appSource = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");
const context = { window: {} };

vm.createContext(context);
vm.runInContext(source, context);

const helpers = context.window.MaintainOpsNavBadgeDisplay.createNavBadgeDisplayHelpers();

assert.strictEqual(helpers.renderNavCountBadge(0), "");
assert.strictEqual(helpers.renderNavCountBadge(-2), "");
assert.strictEqual(helpers.renderNavCountBadge("3"), '<b class="nav-badge">3</b>');
assert.strictEqual(helpers.renderNavCountBadge(12.8), '<b class="nav-badge">12</b>');
assert.strictEqual(helpers.renderNavCountBadge(140), '<b class="nav-badge">99+</b>');
assert.strictEqual(helpers.renderNavCountBadge(5, { alert: true }), '<b class="nav-badge nav-alert-badge">5</b>');
assert.strictEqual(helpers.renderNavCountBadge(2, { alert: true, alertSuffix: true }), '<b class="nav-badge nav-alert-badge">2!</b>');
assert.match(appSource, /id === "mywork"\)\s*return renderNavCountBadge\(myWorkDashboardCounts\?\.activeWork \|\| 0\)/);
assert.match(appSource, /id === "work"\)\s*return renderNavCountBadge\(workOrderDashboardCounts\?\.newWork \|\| 0\)/);

console.log("nav badge display smoke passed");
