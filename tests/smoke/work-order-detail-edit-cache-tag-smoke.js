const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const indexHtml = fs.readFileSync(path.join(__dirname, "..", "..", "index.html"), "utf8");

assert.match(
  indexHtml,
  /src\/workflows\/workOrderDetailEditWorkflow\.js\?v=mo-build-20260702-work-order-edit-asset-safety-1/,
  "workOrderDetailEditWorkflow must use the asset safety edit cache tag"
);

console.log("work order detail edit cache tag smoke passed");
