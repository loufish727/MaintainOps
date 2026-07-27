const fs = require("fs");
const path = require("path");
const assert = require("node:assert/strict");

const appSource = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");
const startupLoaderSource = fs.readFileSync(path.join(__dirname, "..", "..", "src", "appShell", "workspaceStartupLoaders.js"), "utf8");
const sectionNavigationSource = fs.readFileSync(path.join(__dirname, "..", "..", "src", "utils", "workspaceSectionNavigationEvents.js"), "utf8");

assert.match(appSource, /function loadWorkspaceResponse\(label, promise, timeoutMs = 12000\)/);
assert.match(appSource, /function runWorkspaceLoader\(label, loader, timeoutMs = 12000\)/);
assert.match(appSource, /function scheduleWorkspaceHydration\(hydrationLoaders = \[\]\)/);
assert.match(
  appSource,
  /loadWorkspaceResponse\(\s*"Work orders",\s*loadServerWorkOrderSlice\(workOrderCountSnapshotPromise\),\s*16000\s*\)/
);
assert.match(
  appSource,
  /async function loadServerWorkOrderSlice\(countSnapshotPromise = loadWorkspaceWorkOrderCountSnapshot\(\)\)/,
  "later work-queue paging and filters must keep the aggregate-count path"
);
assert.match(appSource, /workspaceLoaderMap\[loader\]/);
assert.match(appSource, /const startupLoaders = createWorkspaceStartupLoaders\(/);
assert.match(startupLoaderSource, /\["Messages", "loadMessageCenter"\]/);
assert.match(startupLoaderSource, /\["Work photos", "loadPhotos"\]/);
assert.match(appSource, /Some workspace data loaded slowly:/);
assert.match(startupLoaderSource, /if \(activeSection === "setup"\) immediateLoaders\.push\(\["Storage dashboard", "loadStorageDashboard"\]\)/);
assert.match(appSource, /\.\.\.\(canUseFinancialMenu\(\) \? \[runWorkspaceLoader\("Asset financials", loadAssetFinancials\)\] : \[\]\)/);
assert.match(appSource, /if \(!activeCompanyId \|\| !canManageTeam\(\)\) \{/);
assert.match(appSource, /if \(activeSection === "planning"\) await ensurePlanningWorkOrdersLoaded\(\);/);
assert.match(sectionNavigationSource, /if \(nextSection === "planning"/, "Planning navigation must own its lazy queue load");

const companyLoadBlock = appSource.match(/async function loadCompanyData\(\) \{[\s\S]*?^\}/m);
assert.ok(companyLoadBlock, "company data loader should be found");
assert.equal(
  companyLoadBlock[0].includes('loadWorkspaceResponse("Planning work orders", loadPlanningWorkOrders(), 16000)'),
  false,
  "Planning queries should not run unconditionally during workspace startup"
);

const universalLoadBlock = appSource.match(/await Promise\.all\(\[\s*runWorkspaceLoader\("Profiles", loadProfiles\),[\s\S]*?\.\.\.startupLoaders\.immediateLoaders\.map/);
assert.ok(universalLoadBlock, "workspace startup loader block should be found");
assert.equal(
  universalLoadBlock[0].includes('runWorkspaceLoader("Storage dashboard", loadStorageDashboard)'),
  false,
  "storage dashboard should stay out of the universal startup loader"
);

console.log("workspace load timeout guard smoke passed");
