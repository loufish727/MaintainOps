const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const runtimeEntry = fs.readFileSync(path.join(root, "src", "bundles", "runtime.entry.js"), "utf8");

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
  "workspaceFinancialNavigationEvents",
  "workspaceSectionNavigationEvents",
  "teamWorkflow",
  "teamMemberDisplay",
  "workspaceQueueLoadersService",
  "dashboardDisplay",
  "requestDisplay",
  "maintenanceListDisplay",
  "workOrderDetailDisplay",
  "messageCenterDisplay",
  "partsDisplay",
  "assetDetailDisplay",
  "mediaStorageWorkflow",
  "financialDisplay",
  "assetFinancialWorkflow",
]) {
  assert.match(
    runtimeEntry,
    new RegExp(`['\"]\\.\\./(?:utils|workflows|services|render)/${file}\\.js['\"]`),
    `${file} must remain part of the eager runtime bundle`
  );
}

console.log("financial route cache tag smoke passed");
