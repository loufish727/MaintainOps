const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const esbuild = require("esbuild");

const root = path.resolve(__dirname, "..", "..");
const entryPath = path.join(root, "src", "bundles", "renderLeaf.entry.js");
const bundlePath = path.join(root, "src", "bundles", "renderLeaf.bundle.js");

if (!fs.existsSync(bundlePath)) {
  esbuild.buildSync({
    entryPoints: [entryPath],
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

const {
  MaintainOpsMessageBadgeDisplay,
  MaintainOpsNavBadgeDisplay,
  MaintainOpsPartSourceDisplay,
  MaintainOpsRequestPhotoDisplay,
} = context.window;

if (!MaintainOpsMessageBadgeDisplay?.createMessageBadgeDisplayHelpers) {
  throw new Error("Render leaf bundle did not expose MaintainOpsMessageBadgeDisplay.");
}
if (!MaintainOpsNavBadgeDisplay?.createNavBadgeDisplayHelpers) {
  throw new Error("Render leaf bundle did not expose MaintainOpsNavBadgeDisplay.");
}
if (!MaintainOpsPartSourceDisplay?.createPartSourceDisplayHelpers) {
  throw new Error("Render leaf bundle did not expose MaintainOpsPartSourceDisplay.");
}
if (!MaintainOpsRequestPhotoDisplay?.createRequestPhotoDisplayHelpers) {
  throw new Error("Render leaf bundle did not expose MaintainOpsRequestPhotoDisplay.");
}

const messageHelpers = MaintainOpsMessageBadgeDisplay.createMessageBadgeDisplayHelpers({
  directUnreadMessages: () => 0,
  totalUnreadMessages: () => 7,
});
if (messageHelpers.renderMessageNavBadge() !== `<b class="nav-badge">7</b>`) {
  throw new Error("Message badge bundle behavior changed.");
}

const navHelpers = MaintainOpsNavBadgeDisplay.createNavBadgeDisplayHelpers();
if (navHelpers.navBadgeText(105) !== "99+") {
  throw new Error("Nav badge bundle behavior changed.");
}

const partSourceHelpers = MaintainOpsPartSourceDisplay.createPartSourceDisplayHelpers({
  escapeHtml: (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;"),
  getPartSources: () => ["Vendor & Supply"],
  getPartSuppliersReady: () => true,
});
if (!partSourceHelpers.renderPartSourceOptions().includes("Vendor &amp; Supply")) {
  throw new Error("Part source bundle behavior changed.");
}

const requestPhotoHelpers = MaintainOpsRequestPhotoDisplay.createRequestPhotoDisplayHelpers({
  escapeHtml: (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;"),
  requestPhotoMetaText: () => "330 KB",
  getRequestPhotosReady: () => true,
});
const requestPhotoHtml = requestPhotoHelpers.renderMaintenanceRequestPhoto({
  photo_storage_path: "requests/photo.jpg",
  photo_file_name: "Before & After.jpg",
  photoSignedUrl: "https://example.test/photo.jpg",
  photo_content_type: "image/jpeg",
});
if (!requestPhotoHtml.includes("Before &amp; After.jpg") || !requestPhotoHtml.includes("330 KB")) {
  throw new Error("Request photo bundle behavior changed.");
}

console.log("render leaf bundle smoke passed");
