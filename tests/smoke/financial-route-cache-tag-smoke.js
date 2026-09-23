const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const runtimeEntry = fs.readFileSync(path.join(root, "src", "bundles", "runtime.entry.js"), "utf8");
const financialEntry = fs.readFileSync(path.join(root, "src", "bundles", "financialFeature.entry.js"), "utf8");
const teamEntry = fs.readFileSync(path.join(root, "src", "bundles", "teamFeature.entry.js"), "utf8");

assert.match(
  indexHtml,
  /src\/bundles\/runtime\.[a-f0-9]{10}\.js/,
  "index.html must load the current hashed runtime bundle"
);
assert.match(
  indexHtml,
  /src\/bundles\/appShell\.[a-f0-9]{10}\.js/,
  "index.html must load the current hashed app shell bundle"
);

for (const file of [
  "formatting",
  "csvExport",
  "workspaceDetailNavigationEvents",
  "workspaceSectionNavigationEvents",
  "teamWorkflow",
  "workspaceQueueLoadersService",
  "dashboardDisplay",
  "requestDisplay",
  "workOrderDetailDisplay",
  "partsDisplay",
  "assetDetailDisplay",
]) {
  assert.match(
    runtimeEntry,
    new RegExp(`['\"]\\.\\./(?:utils|workflows|services|render)/${file}\\.js['\"]`),
    `${file} must remain part of the eager runtime bundle`
  );
}

const attachmentEntry = fs.readFileSync(path.join(root, "src", "bundles", "attachmentFeature.entry.js"), "utf8");
assert.match(attachmentEntry, /\.\.\/workflows\/mediaStorageWorkflow\.js/);
assert.match(attachmentEntry, /\.\.\/workflows\/attachmentWorkflow\.mjs/);
assert.doesNotMatch(runtimeEntry, /mediaStorageWorkflow\.js/);

for (const file of ["workspaceFinancialNavigationEvents", "financialDisplay", "assetFinancialWorkflow"]) {
  assert.match(
    financialEntry,
    new RegExp(`['\"]\\.\\./(?:utils|workflows|services|render)/${file}\\.js['\"]`),
    `${file} must remain part of the lazy Financial feature bundle`
  );
  assert.doesNotMatch(
    runtimeEntry,
    new RegExp(`['\"]\\.\\./(?:utils|workflows|services|render)/${file}\\.js['\"]`),
    `${file} must not return to the eager runtime bundle`
  );
}

assert.match(teamEntry, /['"]\.\.\/render\/teamMemberDisplay\.js['"]/);
assert.doesNotMatch(runtimeEntry, /['"]\.\.\/render\/teamMemberDisplay\.js['"]/);
const messageEntry = fs.readFileSync(path.join(root, "src", "bundles", "messageFeature.entry.js"), "utf8");
const maintenanceEntry = fs.readFileSync(path.join(root, "src", "bundles", "maintenanceFeature.entry.js"), "utf8");
for (const file of ["maintenanceListDisplay", "preventiveMaintenanceWorkflow", "procedureWorkflow", "procedureChecklistWorkflow"]) {
  assert.match(maintenanceEntry, new RegExp(`${file}\\.js`));
  assert.doesNotMatch(runtimeEntry, new RegExp(`${file}\\.js`));
}
for (const file of ["messageCenterDisplay", "messageDisplay", "messageLiveDisplay", "messageWorkflow"]) {
  assert.match(messageEntry, new RegExp(`${file}\\.js`));
  assert.doesNotMatch(runtimeEntry, new RegExp(`${file}\\.js`));
}

console.log("financial route cache tag smoke passed");
