const crypto = require("node:crypto");
const fs = require("node:fs");
const esbuild = require("esbuild");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");
const bundlesDir = path.join(root, "src", "bundles");
const manifestPath = path.join(bundlesDir, "manifest.json");

const bundles = [
  {
    entry: "src/bundles/runtime.entry.js",
    baseName: "runtime",
  },
  {
    entry: "app.js",
    baseName: "appShell",
  },
];

function bundleHash(text) {
  return crypto.createHash("sha256").update(text).digest("hex").slice(0, 10);
}

function removeOldBundleFiles(baseName) {
  if (!fs.existsSync(bundlesDir)) return;
  for (const fileName of fs.readdirSync(bundlesDir)) {
    if (!new RegExp(`^${baseName}(?:\\.bundle)?(?:\\.[a-f0-9]{10})?\\.js$`).test(fileName)) continue;
    fs.unlinkSync(path.join(bundlesDir, fileName));
  }
}

function updateIndexHtml(manifest) {
  let html = fs.readFileSync(indexPath, "utf8");
  html = html.replace(
    /^[ \t]*<script defer src="src\/bundles\/runtime(?:\.bundle)?(?:\.[a-f0-9]{10})?\.js(?:\?v=[^"]+)?"><\/script>/m,
    `    <script defer src="src/bundles/${manifest.runtime}"></script>`
  );
  html = html.replace(
    /^[ \t]*<script defer src="src\/bundles\/appShell(?:\.bundle)?(?:\.[a-f0-9]{10})?\.js(?:\?v=[^"]+)?"><\/script>/m,
    `    <script defer src="src/bundles/${manifest.appShell}"></script>`
  );
  fs.writeFileSync(indexPath, html);
}

async function main() {
  const manifest = {};
  for (const bundle of bundles) {
    const result = await esbuild.build({
      entryPoints: [path.join(root, bundle.entry)],
      bundle: true,
      format: "iife",
      logLevel: "warning",
      write: false,
    });
    const outputText = result.outputFiles[0].text;
    const hash = bundleHash(outputText);
    const fileName = `${bundle.baseName}.${hash}.js`;
    removeOldBundleFiles(bundle.baseName);
    fs.writeFileSync(path.join(bundlesDir, fileName), outputText);
    manifest[bundle.baseName] = fileName;
    console.log(`Built src/bundles/${fileName}`);
  }
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  updateIndexHtml(manifest);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
