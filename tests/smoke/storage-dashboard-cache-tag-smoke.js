const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const indexHtml = fs.readFileSync(path.join(__dirname, "..", "..", "index.html"), "utf8");

assert.match(
  indexHtml,
  /styles\.css\?v=mo-build-20260706-storage-dashboard-largest-month-1/,
  "styles.css must use the storage dashboard rules cache tag"
);
assert.match(
  indexHtml,
  /src\/render\/storageDashboardDisplay\.js\?v=mo-build-20260706-storage-dashboard-largest-month-1/,
  "storageDashboardDisplay must be loaded with the storage dashboard rules cache tag"
);
assert.match(
  indexHtml,
  /src\/workflows\/companyLogoWorkflow\.js\?v=mo-build-20260706-logo-rules-3/,
  "companyLogoWorkflow must be loaded with the logo rules cache tag"
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

console.log("storage dashboard cache tag smoke passed");
