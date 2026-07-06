const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const indexHtml = fs.readFileSync(path.join(__dirname, "..", "..", "index.html"), "utf8");
const runtimeEntry = fs.readFileSync(path.join(__dirname, "..", "..", "src", "bundles", "runtime.entry.js"), "utf8");

assert.match(
  indexHtml,
  /src\/bundles\/runtime\.[a-f0-9]{10}\.js/,
  "index.html must load the current hashed runtime bundle"
);
assert.match(
  runtimeEntry,
  /['"]\.\.\/workflows\/workOrderDetailEditWorkflow\.js['"]/,
  "workOrderDetailEditWorkflow must remain part of the eager runtime bundle"
);

console.log("work order detail edit cache tag smoke passed");
