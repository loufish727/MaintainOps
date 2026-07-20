const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const indexHtml = fs.readFileSync(path.join(__dirname, "..", "..", "index.html"), "utf8");
const runtimeEntry = fs.readFileSync(path.join(__dirname, "..", "..", "src", "bundles", "runtime.entry.js"), "utf8");

assert.match(
  indexHtml,
  /styles\.css\?v=mo-build-20260720-team-sections-1/,
  "styles.css must use the current Team sections cache tag"
);
assert.match(
  indexHtml,
  /src\/bundles\/runtime\.[a-f0-9]{10}\.js/,
  "index.html must load the current hashed runtime bundle"
);
assert.match(
  runtimeEntry,
  /['"]\.\.\/render\/storageDashboardDisplay\.js['"]/,
  "storageDashboardDisplay must remain part of the eager runtime bundle"
);
assert.match(
  runtimeEntry,
  /['"]\.\.\/workflows\/companyLogoWorkflow\.js['"]/,
  "companyLogoWorkflow must remain part of the eager runtime bundle"
);
assert.match(
  runtimeEntry,
  /['"]\.\.\/utils\/workspaceSectionNavigationEvents\.js['"]/,
  "workspaceSectionNavigationEvents must remain part of the eager runtime bundle"
);

console.log("storage dashboard cache tag smoke passed");
