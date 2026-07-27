const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const bundlesDir = path.join(root, "src", "bundles");
const manifestPath = path.join(bundlesDir, "manifest.json");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const spatialHtml = fs.readFileSync(path.join(root, "performance-spatial.html"), "utf8");

assert.ok(fs.existsSync(manifestPath), "Bundle manifest must exist.");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const scriptBundleKeys = [
  "runtime",
  "managerFeature",
  "financialFeature",
  "teamFeature",
  "setupFeature",
  "appShell",
  "platformSpatial",
];
const lazyFeatureKeys = new Set(["managerFeature", "financialFeature", "teamFeature", "setupFeature"]);
for (const key of scriptBundleKeys) {
  assert.match(
    String(manifest[key] || ""),
    new RegExp(`^${key}\\.[a-f0-9]{10}\\.js$`),
    `Manifest ${key} entry must point to a hashed bundle file`
  );
  assert.ok(
    fs.existsSync(path.join(bundlesDir, manifest[key])),
    `Manifest ${key} bundle must exist on disk`
  );
  assert.ok(
    fs.existsSync(path.join(bundlesDir, `${manifest[key]}.map`)),
    `Manifest ${key} source map must exist on disk`
  );
  const sourceMap = JSON.parse(
    fs.readFileSync(path.join(bundlesDir, `${manifest[key]}.map`), "utf8")
  );
  assert.ok(sourceMap.sources?.length, `Manifest ${key} source map must name its sources`);
  assert.equal(
    Object.prototype.hasOwnProperty.call(sourceMap, "sourcesContent"),
    false,
    `Manifest ${key} source map must not embed platform-sensitive source copies`
  );
  assert.doesNotMatch(
    fs.readFileSync(path.join(bundlesDir, manifest[key]), "utf8"),
    /^[\t ]+$/m,
    `Manifest ${key} bundle must not contain whitespace-only lines`
  );
  const referenceSource = key === "platformSpatial"
    ? spatialHtml
    : lazyFeatureKeys.has(key)
      ? fs.readFileSync(path.join(bundlesDir, manifest.appShell), "utf8")
      : indexHtml;
  assert.match(
    referenceSource,
    new RegExp(`src/bundles/${manifest[key].replace(/\./g, "\\.")}`),
    `${key === "platformSpatial" ? "performance-spatial.html" : "app shell"} must reference manifest ${key} bundle`
  );
}

assert.match(
  String(manifest.appStyles || ""),
  /^appStyles\.[a-f0-9]{10}\.css$/,
  "Manifest appStyles entry must point to a hashed stylesheet"
);
assert.ok(
  fs.existsSync(path.join(root, manifest.appStyles)),
  "Manifest appStyles stylesheet must exist on disk"
);
assert.ok(
  fs.existsSync(path.join(root, `${manifest.appStyles}.map`)),
  "Manifest appStyles source map must exist on disk"
);
const appStylesSourceMap = JSON.parse(
  fs.readFileSync(path.join(root, `${manifest.appStyles}.map`), "utf8")
);
assert.equal(
  Object.prototype.hasOwnProperty.call(appStylesSourceMap, "sourcesContent"),
  false,
  "Manifest appStyles source map must not embed platform-sensitive source copies"
);
assert.match(
  indexHtml,
  new RegExp(`href="${manifest.appStyles.replace(/\./g, "\\.")}"`),
  "index.html must reference the manifest appStyles stylesheet"
);

assert.match(
  String(manifest.platformSpatialStyles || ""),
  /^platformSpatialStyles\.[a-f0-9]{10}\.css$/,
  "Manifest platformSpatialStyles entry must point to a hashed stylesheet"
);
assert.ok(
  fs.existsSync(path.join(bundlesDir, manifest.platformSpatialStyles)),
  "Manifest platformSpatialStyles stylesheet must exist on disk"
);
assert.ok(
  fs.existsSync(path.join(bundlesDir, `${manifest.platformSpatialStyles}.map`)),
  "Manifest platformSpatialStyles source map must exist on disk"
);
const spatialStylesSourceMap = JSON.parse(
  fs.readFileSync(path.join(bundlesDir, `${manifest.platformSpatialStyles}.map`), "utf8")
);
assert.equal(
  Object.prototype.hasOwnProperty.call(spatialStylesSourceMap, "sourcesContent"),
  false,
  "Manifest platformSpatialStyles source map must not embed platform-sensitive source copies"
);
assert.match(
  spatialHtml,
  new RegExp(`href="src/bundles/${manifest.platformSpatialStyles.replace(/\./g, "\\.")}"`),
  "performance-spatial.html must reference the manifest platformSpatialStyles stylesheet"
);

for (const legacyName of ["runtime.bundle.js", "appShell.bundle.js", "platformSpatial.bundle.js"]) {
  assert.ok(
    !fs.existsSync(path.join(bundlesDir, legacyName)),
    `${legacyName} must be removed after hashed bundle generation`
  );
}

for (const baseName of scriptBundleKeys) {
  const hashedFiles = fs.readdirSync(bundlesDir)
    .filter((name) => new RegExp(`^${baseName}\\.[a-f0-9]{10}\\.js$`).test(name));
  assert.equal(hashedFiles.length, 1, `${baseName} must have exactly one current hashed bundle file`);
  assert.equal(hashedFiles[0], manifest[baseName], `${baseName} hashed bundle must match the manifest`);
}

const hashedSpatialStyles = fs.readdirSync(bundlesDir)
  .filter((name) => /^platformSpatialStyles\.[a-f0-9]{10}\.css$/.test(name));
assert.equal(hashedSpatialStyles.length, 1, "platformSpatialStyles must have exactly one current hashed stylesheet");
assert.equal(
  hashedSpatialStyles[0],
  manifest.platformSpatialStyles,
  "platformSpatialStyles hashed stylesheet must match the manifest"
);

const hashedStyles = fs.readdirSync(root)
  .filter((name) => /^appStyles\.[a-f0-9]{10}\.css$/.test(name));
assert.equal(hashedStyles.length, 1, "appStyles must have exactly one current hashed stylesheet");
assert.equal(hashedStyles[0], manifest.appStyles, "appStyles hashed stylesheet must match the manifest");

console.log("bundle manifest smoke passed");
