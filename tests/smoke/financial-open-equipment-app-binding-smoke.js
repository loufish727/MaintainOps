const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const appSource = fs.readFileSync(path.join(root, "app.js"), "utf8");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");

assert.match(
  appSource,
  /scrollToDetailTop:\s*scrollEquipmentDetailToActions/,
  "Financial open-equipment navigation must pass the app-level equipment scroll helper"
);
assert.doesNotMatch(
  appSource,
  /[,{]\s*scrollToDetailTop\s*[,}]/,
  "app.js must not pass an undefined shorthand scrollToDetailTop"
);
assert.match(
  indexHtml,
  /app\.js\?v=mo-build-20260701-company-duplicate-select-1/,
  "app.js cache tag must include the latest app hotfix"
);

console.log("financial open equipment app binding smoke passed");
