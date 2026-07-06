const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const esbuild = require("esbuild");

const root = path.resolve(__dirname, "..", "..");
const bundlePath = path.join(root, "src", "bundles", "emptyStateText.bundle.js");

if (!fs.existsSync(bundlePath)) {
  esbuild.buildSync({
    entryPoints: [path.join(root, "src", "render", "emptyStateText.js")],
    bundle: true,
    format: "iife",
    outfile: bundlePath,
    logLevel: "silent",
  });
}

const code = fs.readFileSync(bundlePath, "utf8");
const context = {
  window: {},
};

vm.createContext(context);
vm.runInContext(code, context, {
  filename: bundlePath,
});

const api = context.window.MaintainOpsEmptyStateText;
if (!api || typeof api.createEmptyStateTextHelpers !== "function") {
  throw new Error("Pilot bundle did not expose MaintainOpsEmptyStateText.");
}

const helpers = api.createEmptyStateTextHelpers({
  getSearchQuery: () => "",
  getAssetStatusFilter: () => "all",
  getAssetTypeFilter: () => "all",
  getPartSearchQuery: () => "",
  getPartInventoryFilter: () => "all",
  assetTypeLabel: (value) => value,
  assetStatusLabel: (value) => value,
});

if (helpers.requestEmptyStateText("all") !== "No requests at this location yet.") {
  throw new Error("Pilot bundle request empty-state behavior changed.");
}

if (helpers.assetEmptyStateText() !== "No equipment added yet.") {
  throw new Error("Pilot bundle asset empty-state behavior changed.");
}

if (helpers.partEmptyStateText() !== "No parts added yet.") {
  throw new Error("Pilot bundle part empty-state behavior changed.");
}

console.log("bundle pilot smoke passed");
