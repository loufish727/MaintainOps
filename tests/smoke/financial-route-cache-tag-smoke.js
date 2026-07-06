const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");

assert.match(
  indexHtml,
  /src\/utils\/formatting\.js\?v=mo-build-20260701-all-completed-filter-1/,
  "formatting must use the all completed filter cache tag"
);
assert.match(
  indexHtml,
  /src\/utils\/csvExport\.js\?v=mo-build-20260702-equipment-facility-export-1/,
  "csvExport must use the equipment facility export cache tag"
);

assert.match(
  indexHtml,
  /src\/utils\/workspaceDetailNavigationEvents\.js\?v=mo-build-20260701-financial-route-fix-1/,
  "workspaceDetailNavigationEvents must use the financial route fix cache tag"
);
assert.match(
  indexHtml,
  /src\/utils\/workspaceFinancialNavigationEvents\.js\?v=mo-build-20260701-financial-open-equipment-1/,
  "workspaceFinancialNavigationEvents must use the financial open equipment cache tag"
);
assert.match(
  indexHtml,
  /src\/render\/financialDisplay\.js\?v=mo-build-20260701-financial-delete-retention-1/,
  "financialDisplay must use the financial delete-retention cache tag"
);
assert.match(
  indexHtml,
  /src\/workflows\/assetFinancialWorkflow\.js\?v=mo-build-20260701-financial-delete-retention-1/,
  "assetFinancialWorkflow must use the financial delete-retention cache tag"
);
assert.match(
  indexHtml,
  /app\.js\?v=mo-build-20260706-accounting-boundaries-1/,
  "app.js must use the accounting boundary cache tag"
);
assert.match(
  indexHtml,
  /src\/utils\/workspaceSectionNavigationEvents\.js\?v=mo-build-20260706-setup-storage-load-1/,
  "workspaceSectionNavigationEvents must use the setup storage loader cache tag"
);
assert.match(
  indexHtml,
  /src\/workflows\/teamWorkflow\.js\?v=mo-build-20260701-password-change-1/,
  "teamWorkflow must use the password change cache tag"
);
assert.match(
  indexHtml,
  /src\/render\/teamMemberDisplay\.js\?v=mo-build-20260701-password-change-1/,
  "teamMemberDisplay must use the password change cache tag"
);
assert.match(
  indexHtml,
  /src\/services\/workspaceQueueLoadersService\.js\?v=mo-build-20260701-all-completed-filter-1/,
  "workspaceQueueLoadersService must use the all completed filter cache tag"
);
assert.match(
  indexHtml,
  /src\/render\/dashboardDisplay\.js\?v=mo-build-20260701-all-completed-filter-1/,
  "dashboardDisplay must use the all completed filter cache tag"
);
assert.match(
  indexHtml,
  /src\/render\/requestDisplay\.js\?v=mo-build-20260706-work-request-photo-768-1/,
  "requestDisplay must use the work/request photo 768 cache tag"
);
assert.match(
  indexHtml,
  /src\/render\/maintenanceListDisplay\.js\?v=mo-build-20260701-accounting-readonly-1/,
  "maintenanceListDisplay must use the accounting readonly cache tag"
);
assert.match(
  indexHtml,
  /src\/render\/workOrderDetailDisplay\.js\?v=mo-build-20260706-work-photo-delete-1/,
  "workOrderDetailDisplay must use the work photo delete cache tag"
);
assert.match(
  indexHtml,
  /src\/render\/messageCenterDisplay\.js\?v=mo-build-20260701-accounting-readonly-1/,
  "messageCenterDisplay must use the accounting readonly cache tag"
);
for (const file of [
  "partsDisplay",
  "assetDetailDisplay",
]) {
  assert.match(
    indexHtml,
    new RegExp(`src/render/${file}\\.js\\?v=mo-build-20260706-asset-photo-1mb-1`),
    `${file} must use the asset photo 1 MB cache tag`
  );
}
assert.match(
  indexHtml,
  /src\/workflows\/mediaStorageWorkflow\.js\?v=mo-build-20260706-asset-photo-1mb-1/,
  "mediaStorageWorkflow must use the asset photo 1 MB cache tag"
);

console.log("financial route cache tag smoke passed");
