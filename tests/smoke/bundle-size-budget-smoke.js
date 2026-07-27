const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");

const root = path.resolve(__dirname, "..", "..");
const bundlesDir = path.join(root, "src", "bundles");
const manifest = JSON.parse(fs.readFileSync(path.join(bundlesDir, "manifest.json"), "utf8"));

const budgets = {
  runtime: { decoded: 430 * 1024, gzip: 100 * 1024 },
  appShell: { decoded: 160 * 1024, gzip: 44 * 1024 },
  appStyles: { decoded: 185 * 1024, gzip: 33 * 1024 },
  platformSpatial: { decoded: 720 * 1024, gzip: 200 * 1024 },
  platformSpatialStyles: { decoded: 52 * 1024, gzip: 11 * 1024 },
  managerFeature: { decoded: 32 * 1024, gzip: 9 * 1024 },
  financialFeature: { decoded: 28 * 1024, gzip: 8 * 1024 },
  teamFeature: { decoded: 22 * 1024, gzip: 6 * 1024 },
  setupFeature: { decoded: 20 * 1024, gzip: 6 * 1024 },
};

const initialKeys = ["runtime", "appShell", "appStyles"];
const initialBudget = {
  decoded: 780 * 1024,
  gzip: 175 * 1024,
};

function measure(key) {
  const fileName = manifest[key];
  assert.ok(fileName, `Bundle manifest must include ${key}.`);
  const filePath = key === "appStyles"
    ? path.join(root, fileName)
    : path.join(bundlesDir, fileName);
  const bytes = fs.readFileSync(filePath);
  return {
    decoded: bytes.length,
    gzip: zlib.gzipSync(bytes, { level: 9 }).length,
  };
}

const measurements = Object.fromEntries(Object.keys(budgets).map((key) => [key, measure(key)]));

for (const [key, limits] of Object.entries(budgets)) {
  for (const metric of ["decoded", "gzip"]) {
    assert.ok(
      measurements[key][metric] <= limits[metric],
      `${key} ${metric} size ${measurements[key][metric]} exceeds ${limits[metric]} bytes`
    );
  }
}

const initial = initialKeys.reduce((totals, key) => ({
  decoded: totals.decoded + measurements[key].decoded,
  gzip: totals.gzip + measurements[key].gzip,
}), { decoded: 0, gzip: 0 });

for (const metric of ["decoded", "gzip"]) {
  assert.ok(
    initial[metric] <= initialBudget[metric],
    `Initial first-party ${metric} size ${initial[metric]} exceeds ${initialBudget[metric]} bytes`
  );
}

console.log(JSON.stringify({ initial, measurements }, null, 2));
console.log("bundle size budget smoke passed");
