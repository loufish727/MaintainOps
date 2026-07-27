const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..", "..");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const spatialHtml = fs.readFileSync(path.join(root, "performance-spatial.html"), "utf8");
const runtimeEntry = fs.readFileSync(path.join(root, "src", "bundles", "runtime.entry.js"), "utf8");
const setupEntry = fs.readFileSync(path.join(root, "src", "bundles", "setupFeature.entry.js"), "utf8");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "src", "bundles", "manifest.json"), "utf8"));

function sourceHash(relativePath) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  return crypto.createHash("sha256").update(source).digest("hex").slice(0, 10);
}

assert.match(indexHtml, new RegExp(`href="${manifest.appStyles.replace(/\./g, "\\.")}"`));
assert.match(indexHtml, new RegExp(`supabase-config\\.js\\?v=${sourceHash("supabase-config.js")}`));
assert.match(
  spatialHtml,
  new RegExp(`href="src/bundles/${manifest.platformSpatialStyles.replace(/\./g, "\\.")}"`)
);
assert.match(
  indexHtml,
  /src\/bundles\/runtime\.[a-f0-9]{10}\.js/,
  "index.html must load the current hashed runtime bundle"
);
assert.match(
  setupEntry,
  /['"]\.\.\/render\/storageDashboardDisplay\.js['"]/,
  "storageDashboardDisplay must remain part of the lazy Setup feature bundle"
);
assert.doesNotMatch(
  runtimeEntry,
  /['"]\.\.\/render\/storageDashboardDisplay\.js['"]/,
  "storageDashboardDisplay must not return to the eager runtime bundle"
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
