const crypto = require("node:crypto");
const fs = require("node:fs");
const esbuild = require("esbuild");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");
const spatialPagePath = path.join(root, "performance-spatial.html");
const bundlesDir = path.join(root, "src", "bundles");
const manifestPath = path.join(bundlesDir, "manifest.json");
const stylesPath = path.join(root, "styles.css");
const spatialStylesPath = path.join(root, "src", "performance", "platformSpatial.css");

const bundles = [
  {
    entry: "src/bundles/runtime.entry.js",
    baseName: "runtime",
  },
  {
    entry: "src/bundles/managerFeature.entry.js",
    baseName: "managerFeature",
  },
  {
    entry: "src/bundles/financialFeature.entry.js",
    baseName: "financialFeature",
  },
  {
    entry: "src/bundles/teamFeature.entry.js",
    baseName: "teamFeature",
  },
  {
    entry: "src/bundles/setupFeature.entry.js",
    baseName: "setupFeature",
  },
  {
    entry: "app.js",
    baseName: "appShell",
  },
  {
    entry: "src/performance/platformSpatialFrame.js",
    baseName: "platformSpatial",
  },
];

function bundleHash(text) {
  return crypto.createHash("sha256").update(text).digest("hex").slice(0, 10);
}

function sourceHash(relativePath) {
  return bundleHash(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function removeOldBundleFiles(baseName) {
  if (!fs.existsSync(bundlesDir)) return;
  for (const fileName of fs.readdirSync(bundlesDir)) {
    if (!new RegExp(`^${baseName}(?:\\.bundle)?(?:\\.[a-f0-9]{10})?\\.(?:js|css)(?:\\.map)?$`).test(fileName)) continue;
    fs.unlinkSync(path.join(bundlesDir, fileName));
  }
}

function removeOldStyleFiles() {
  for (const fileName of fs.readdirSync(root)) {
    if (!/^appStyles\.[a-f0-9]{10}\.css(?:\.map)?$/.test(fileName)) continue;
    fs.unlinkSync(path.join(root, fileName));
  }
}

function updateIndexHtml(manifest) {
  let html = fs.readFileSync(indexPath, "utf8");
  html = html.replace(
    /href="(?:styles\.css(?:\?v=[^"]+)?|appStyles\.[a-f0-9]{10}\.css)"/,
    `href="${manifest.appStyles}"`
  );
  html = html.replace(
    /src="supabase-config\.js(?:\?v=[^"]+)?"/,
    `src="supabase-config.js?v=${sourceHash("supabase-config.js")}"`
  );
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

function updateSpatialPageHtml(manifest) {
  let html = fs.readFileSync(spatialPagePath, "utf8");
  html = html.replace(
    /href="(?:src\/performance\/platformSpatial\.css(?:\?v=[^"]+)?|src\/bundles\/platformSpatialStyles\.[a-f0-9]{10}\.css)"/,
    `href="src/bundles/${manifest.platformSpatialStyles}"`
  );
  html = html.replace(
    /^[ \t]*<script defer src="src\/bundles\/platformSpatial(?:\.bundle)?(?:\.[a-f0-9]{10})?\.js(?:\?v=[^"]+)?"><\/script>/m,
    `    <script defer src="src/bundles/${manifest.platformSpatial}"></script>`
  );
  fs.writeFileSync(spatialPagePath, html);
}

async function main() {
  const manifest = {};
  for (const bundle of bundles) {
    const featureDefines = bundle.baseName === "appShell"
      ? {
          __MAINTAINOPS_MANAGER_FEATURE_BUNDLE__: JSON.stringify(`src/bundles/${manifest.managerFeature}`),
          __MAINTAINOPS_FINANCIAL_FEATURE_BUNDLE__: JSON.stringify(`src/bundles/${manifest.financialFeature}`),
          __MAINTAINOPS_TEAM_FEATURE_BUNDLE__: JSON.stringify(`src/bundles/${manifest.teamFeature}`),
          __MAINTAINOPS_SETUP_FEATURE_BUNDLE__: JSON.stringify(`src/bundles/${manifest.setupFeature}`),
        }
      : undefined;
    const result = await esbuild.build({
      entryPoints: [path.join(root, bundle.entry)],
      bundle: true,
      define: featureDefines,
      format: "iife",
      legalComments: "none",
      logLevel: "warning",
      minify: true,
      outfile: path.join(bundlesDir, `${bundle.baseName}.js`),
      sourcemap: "external",
      sourcesContent: true,
      treeShaking: true,
      write: false,
    });
    const scriptOutput = result.outputFiles.find((file) => file.path.endsWith(".js"));
    const mapOutput = result.outputFiles.find((file) => file.path.endsWith(".js.map"));
    if (!scriptOutput || !mapOutput) throw new Error(`Missing script or source map output for ${bundle.baseName}.`);
    const minifiedText = scriptOutput.text.replace(/[\t ]+$/gm, "");
    const hash = bundleHash(minifiedText);
    const fileName = `${bundle.baseName}.${hash}.js`;
    const mapFileName = `${fileName}.map`;
    const outputText = `${minifiedText.trimEnd()}\n//# sourceMappingURL=${mapFileName}\n`;
    removeOldBundleFiles(bundle.baseName);
    fs.writeFileSync(path.join(bundlesDir, fileName), outputText);
    fs.writeFileSync(path.join(bundlesDir, mapFileName), mapOutput.text);
    manifest[bundle.baseName] = fileName;
    console.log(`Built src/bundles/${fileName}`);
  }

  const stylesResult = await esbuild.transform(fs.readFileSync(stylesPath, "utf8"), {
    legalComments: "none",
    loader: "css",
    minify: true,
    sourcefile: "styles.css",
    sourcemap: "external",
    sourcesContent: true,
  });
  const stylesHash = bundleHash(stylesResult.code);
  const stylesFileName = `appStyles.${stylesHash}.css`;
  const stylesMapFileName = `${stylesFileName}.map`;
  const stylesText = `${stylesResult.code.trimEnd()}\n/*# sourceMappingURL=${stylesMapFileName} */\n`;
  removeOldStyleFiles();
  fs.writeFileSync(path.join(root, stylesFileName), stylesText);
  fs.writeFileSync(path.join(root, stylesMapFileName), stylesResult.map);
  manifest.appStyles = stylesFileName;
  console.log(`Built ${stylesFileName}`);

  const spatialStylesResult = await esbuild.transform(fs.readFileSync(spatialStylesPath, "utf8"), {
    legalComments: "none",
    loader: "css",
    minify: true,
    sourcefile: "src/performance/platformSpatial.css",
    sourcemap: "external",
    sourcesContent: true,
  });
  const spatialStylesHash = bundleHash(spatialStylesResult.code);
  const spatialStylesFileName = `platformSpatialStyles.${spatialStylesHash}.css`;
  const spatialStylesMapFileName = `${spatialStylesFileName}.map`;
  const spatialStylesText = `${spatialStylesResult.code.trimEnd()}\n/*# sourceMappingURL=${spatialStylesMapFileName} */\n`;
  removeOldBundleFiles("platformSpatialStyles");
  fs.writeFileSync(path.join(bundlesDir, spatialStylesFileName), spatialStylesText);
  fs.writeFileSync(path.join(bundlesDir, spatialStylesMapFileName), spatialStylesResult.map);
  manifest.platformSpatialStyles = spatialStylesFileName;
  console.log(`Built src/bundles/${spatialStylesFileName}`);

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  updateIndexHtml(manifest);
  updateSpatialPageHtml(manifest);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
