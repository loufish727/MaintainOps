const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "..", "..");
const manifestPath = path.join(root, "src", "bundles", "manifest.json");

if (!fs.existsSync(manifestPath)) {
  execFileSync(process.execPath, ["scripts/build-runtime-bundles.js"], {
    cwd: root,
    stdio: "ignore",
  });
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const runtimeBundlePath = path.join(root, "src", "bundles", manifest.runtime);
const runtimeCode = fs.readFileSync(runtimeBundlePath, "utf8");
const context = {
  Date,
  Math,
  Uint8Array,
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  },
  window: {
    btoa: (value) => Buffer.from(value, "binary").toString("base64"),
    crypto: {
      getRandomValues: (array) => array,
    },
  },
};

context.window.localStorage = context.localStorage;
vm.createContext(context);
vm.runInContext(runtimeCode, context, {
  filename: runtimeBundlePath,
});

const requiredGlobals = [
  "MaintainOpsConstants",
  "MaintainOpsFormatting",
  "MaintainOpsWorkspaceSectionNavigationEvents",
  "MaintainOpsQuickFixWorkflow",
  "MaintainOpsLocationsService",
  "MaintainOpsAuthSessionFlow",
  "MaintainOpsRenderDisplayHelpers",
  "MaintainOpsRequestPhotoDisplay",
  "MaintainOpsWorkMessageDisplay",
  "MaintainOpsMessageDisplay",
];

for (const name of requiredGlobals) {
  if (!context.window[name]) {
    throw new Error(`Runtime bundle did not expose ${name}.`);
  }
}

const roles = context.window.MaintainOpsConstants.COMPANY_ROLES || [];
if (!roles.includes("accounting")) {
  throw new Error("Runtime bundle constants lost the accounting role.");
}
if (!roles.includes("production")) {
  throw new Error("Runtime bundle constants lost the production role.");
}

const requestPhotoHelpers = context.window.MaintainOpsRequestPhotoDisplay.createRequestPhotoDisplayHelpers({
  escapeHtml: (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;"),
  requestPhotoMetaText: () => "256 KB",
  getRequestPhotosReady: () => true,
});
const requestPhotoHtml = requestPhotoHelpers.renderMaintenanceRequestPhoto({
  photo_storage_path: "requests/photo.jpg",
  photo_file_name: "Runtime Photo.jpg",
  photoSignedUrl: "https://example.test/photo.jpg",
  photo_content_type: "image/jpeg",
});
if (!requestPhotoHtml.includes("Runtime Photo.jpg") || !requestPhotoHtml.includes("256 KB")) {
  throw new Error("Runtime bundle request photo rendering changed.");
}

const navHelpers = context.window.MaintainOpsNavBadgeDisplay.createNavBadgeDisplayHelpers();
if (navHelpers.renderNavCountBadge(3, { alert: true, alertSuffix: true }) !== `<b class="nav-badge nav-alert-badge">3!</b>`) {
  throw new Error("Runtime bundle nav badge rendering changed.");
}

const token = context.window.MaintainOpsPublicRequestTokens.generatePublicRequestToken();
if (!token) {
  throw new Error("Runtime bundle public request token helper returned an empty token.");
}

console.log("runtime bundle smoke passed");
