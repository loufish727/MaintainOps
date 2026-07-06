const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const indexHtml = fs.readFileSync(path.join(__dirname, "..", "..", "index.html"), "utf8");

assert.match(
  indexHtml,
  /styles\.css\?v=mo-build-20260706-storage-dashboard-trend-2/,
  "styles.css must use the storage dashboard trend cache tag"
);
assert.match(
  indexHtml,
  /src\/render\/storageDashboardDisplay\.js\?v=mo-build-20260706-storage-dashboard-trend-2/,
  "storageDashboardDisplay must be loaded with the storage dashboard trend cache tag"
);
assert.match(
  indexHtml,
  /app\.js\?v=mo-build-20260706-storage-dashboard-1/,
  "app.js must use the storage dashboard cache tag"
);

console.log("storage dashboard cache tag smoke passed");
