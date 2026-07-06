const esbuild = require("esbuild");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

const bundles = [
  {
    entry: "src/render/emptyStateText.js",
    outfile: "src/bundles/emptyStateText.bundle.js",
  },
  {
    entry: "src/bundles/renderLeaf.entry.js",
    outfile: "src/bundles/renderLeaf.bundle.js",
  },
];

async function main() {
  for (const bundle of bundles) {
    await esbuild.build({
      entryPoints: [path.join(root, bundle.entry)],
      bundle: true,
      format: "iife",
      outfile: path.join(root, bundle.outfile),
      logLevel: "warning",
    });
    console.log(`Built ${bundle.outfile}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
