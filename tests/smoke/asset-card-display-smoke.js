const assert = require("node:assert/strict");

global.window = {};

const { createAssetCardDisplayHelpers } = require("../../src/render/assetCardDisplay.js");

const { renderAssetCard } = createAssetCardDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  assetTypeLabel: (type) => ({ machine: "Machine", tooling: "Tooling" }[type] || type),
  assetStatusLabel: (status) => ({ running: "Running", watch: "Watch", degraded: "Degraded", offline: "Offline" }[status] || status),
  getWorkOrders: () => [
    { id: "wo-1", asset_id: "asset-1", status: "open" },
    { id: "wo-2", asset_id: "asset-1", status: "in_progress" },
    { id: "wo-3", asset_id: "asset-1", status: "completed" },
  ],
  getAssetParts: () => [
    { id: "ap-1", asset_id: "asset-1", part_id: "part-1" },
    { id: "ap-2", asset_id: "asset-1", part_id: "part-2" },
  ],
  getAssetDocumentsByAssetId: () => ({
    "asset-1": [
      { id: "doc-1" },
      { id: "doc-2" },
    ],
  }),
  getActiveAssetId: () => "asset-1",
  parentAssetFor: () => ({ id: "parent-1", name: "MS200" }),
  childAssetsFor: () => [{ id: "child-1" }],
});

const html = renderAssetCard({
  id: "asset-1",
  name: "New thalmann",
  asset_code: "TH-1",
  asset_type: "machine",
  status: "running",
  location: "Salem, OR",
  safety_devices_required: true,
});

assert.match(html, /class="asset-card asset-state-running selected"/);
assert.match(html, /data-asset-id="asset-1"/);
assert.match(html, /New thalmann/);
assert.match(html, /Salem, OR/);
assert.match(html, /Part of MS200/);
assert.match(html, /aria-label="Equipment card summary"/);
assert.match(html, /<small>Status<\/small>/);
assert.match(html, /<strong>Running<\/strong>/);
assert.match(html, /Safety check required before completing work/);
assert.match(html, /<small>Location<\/small>\s*<strong>Salem, OR<\/strong>/);
assert.match(html, /<small>Primary<\/small>\s*<strong>MS200<\/strong>\s*<em>Linked under parent equipment<\/em>/);
assert.match(html, /<small>Sub Equipment<\/small>\s*<strong>1<\/strong>\s*<em>Linked child equipment<\/em>/);
assert.match(html, /<small>Parts<\/small>\s*<strong>2<\/strong>\s*<em>Recommended\/common parts linked<\/em>/);
assert.match(html, /<small>Open Work<\/small>\s*<strong>2<\/strong>\s*<em>Active work tied to this equipment<\/em>/);
assert.match(html, /<small>Files<\/small>\s*<strong>2<\/strong>\s*<em>Machine files on record<\/em>/);
assert.doesNotMatch(html, /Email Helper/);

const toolingHtml = renderAssetCard({
  id: "asset-1",
  name: "Roll setup",
  asset_type: "tooling",
  status: "watch",
  location: "",
  safety_devices_required: false,
});

assert.match(toolingHtml, /<small>Setup<\/small>/);
assert.match(toolingHtml, /<small>Setup Items<\/small>/);
assert.match(toolingHtml, /Tooling files on record/);

const standalone = createAssetCardDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  assetTypeLabel: (type) => ({ machine: "Machine", tooling: "Tooling" }[type] || type),
  assetStatusLabel: (status) => ({ running: "Running", watch: "Watch", degraded: "Degraded", offline: "Offline" }[status] || status),
  getWorkOrders: () => [],
  getAssetParts: () => [],
  getAssetDocumentsByAssetId: () => ({}),
  getActiveAssetId: () => "",
  parentAssetFor: () => null,
  childAssetsFor: () => [],
}).renderAssetCard({
  id: "tool-standalone",
  name: "Standalone roll setup",
  asset_type: "tooling",
  status: "watch",
  location: "",
  safety_devices_required: false,
});

assert.match(standalone, /Standalone tooling/);
assert.match(standalone, /No linked setup items/);
assert.match(standalone, /No tooling files yet/);
