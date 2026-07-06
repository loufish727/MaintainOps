const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const bundlesDir = path.join(root, "src", "bundles");
const manifestPath = path.join(bundlesDir, "manifest.json");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");

assert.ok(fs.existsSync(manifestPath), "Bundle manifest must exist.");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
for (const key of ["runtime", "appShell"]) {
  assert.match(
    String(manifest[key] || ""),
    new RegExp(`^${key}\\.[a-f0-9]{10}\\.js$`),
    `Manifest ${key} entry must point to a hashed bundle file`
  );
  assert.ok(
    fs.existsSync(path.join(bundlesDir, manifest[key])),
    `Manifest ${key} bundle must exist on disk`
  );
  assert.match(
    indexHtml,
    new RegExp(`src/bundles/${manifest[key].replace(/\./g, "\\.")}`),
    `index.html must reference manifest ${key} bundle`
  );
}

for (const legacyName of ["runtime.bundle.js", "appShell.bundle.js"]) {
  assert.ok(
    !fs.existsSync(path.join(bundlesDir, legacyName)),
    `${legacyName} must be removed after hashed bundle generation`
  );
}

for (const baseName of ["runtime", "appShell"]) {
  const hashedFiles = fs.readdirSync(bundlesDir)
    .filter((name) => new RegExp(`^${baseName}\\.[a-f0-9]{10}\\.js$`).test(name));
  assert.equal(hashedFiles.length, 1, `${baseName} must have exactly one current hashed bundle file`);
  assert.equal(hashedFiles[0], manifest[baseName], `${baseName} hashed bundle must match the manifest`);
}

console.log("bundle manifest smoke passed");
