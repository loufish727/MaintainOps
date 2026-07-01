const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");

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
  /src\/render\/financialDisplay\.js\?v=mo-build-20260701-financial-open-equipment-1/,
  "financialDisplay must use the financial open equipment cache tag"
);
assert.match(
  indexHtml,
  /app\.js\?v=mo-build-20260701-financial-open-equipment-1/,
  "app.js must use the financial open equipment cache tag"
);

console.log("financial route cache tag smoke passed");
