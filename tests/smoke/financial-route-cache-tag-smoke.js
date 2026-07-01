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
  /src\/utils\/csvExport\.js\?v=mo-build-20260701-export-location-type-sort-1/,
  "csvExport must use the export location/type sort cache tag"
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
  /src\/render\/financialDisplay\.js\?v=mo-build-20260701-financial-manager-readonly-1/,
  "financialDisplay must use the financial manager readonly cache tag"
);
assert.match(
  indexHtml,
  /src\/workflows\/assetFinancialWorkflow\.js\?v=mo-build-20260701-financial-manager-readonly-1/,
  "assetFinancialWorkflow must use the financial manager readonly cache tag"
);
assert.match(
  indexHtml,
  /app\.js\?v=mo-build-20260701-company-duplicate-select-1/,
  "app.js must use the company duplicate select cache tag"
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
for (const file of [
  "requestDisplay",
  "partsDisplay",
  "maintenanceListDisplay",
  "workOrderDetailDisplay",
  "messageCenterDisplay",
]) {
  assert.match(
    indexHtml,
    new RegExp(`src/render/${file}\\.js\\?v=mo-build-20260701-accounting-readonly-1`),
    `${file} must use the accounting readonly cache tag`
  );
}

console.log("financial route cache tag smoke passed");
