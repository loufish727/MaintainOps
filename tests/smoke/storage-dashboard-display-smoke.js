const assert = require("node:assert/strict");

global.window = {};

const { createStorageDashboardDisplayHelpers } = require("../../src/render/storageDashboardDisplay.js");

const helpers = createStorageDashboardDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
  formatBytes: (bytes) => {
    const value = Number(bytes) || 0;
    if (!value) return "";
    if (value < 1024) return `${value} B`;
    if (value < 1048576) return `${Math.round(value / 1024)} KB`;
    return `${(value / 1048576).toFixed(value >= 10485760 ? 0 : 1)} MB`;
  },
});

const html = helpers.renderStorageDashboardPanel({
  canView: true,
  ready: true,
  error: "",
  dashboard: {
    total_bytes: 232783872,
    allowance_bytes: 107374182400,
    remaining_bytes: 107141398528,
    usage_percent: 0.217,
    file_count: 3,
    bucket_totals: [
      { bucket_id: "work-order-photos", file_count: 2, size_bytes: 232673872 },
      { bucket_id: "asset-documents", file_count: 1, size_bytes: 110000 },
    ],
    monthly_usage: [
      { month: "2026-06", month_label: "Jun 2026", file_count: 1, size_bytes: 110000, cumulative_bytes: 110000, remaining_bytes: 107374072400 },
      { month: "2026-07", month_label: "Jul 2026", file_count: 2, size_bytes: 232673872, cumulative_bytes: 232783872, remaining_bytes: 107141398528 },
    ],
    top_files: [
      {
        bucket_id: "work-order-photos",
        object_path: "company/work/photo.jpg",
        file_name: "photo<script>.jpg",
        size_bytes: 232673872,
        record_type: "work_order",
        linked_record_id: "work-1",
        linked_record_label: "WO <danger>",
        link_section: "work",
      },
    ],
  },
});

assert.match(html, /Storage Usage/);
assert.match(html, /100 GB/);
assert.match(html, /99\.8 GB/);
assert.match(html, /Work order photos/);
assert.match(html, /Equipment files/);
assert.match(html, /Storage Rules/);
assert.match(html, /Upload caps and optimization targets/);
assert.match(html, /Work Order Photos/);
assert.match(html, /Request Photos/);
assert.match(html, /Equipment Images/);
assert.match(html, /Part Images/);
assert.match(html, /Documents/);
assert.match(html, /Company Logos/);
assert.match(html, /Photos are accepted, then resized before upload/);
assert.match(html, /Resize to 768px, target near 256 KB; blocked only if still over 5 MB/);
assert.match(html, /Images are resized before upload/);
assert.match(html, /Target near 1 MB/);
assert.match(html, /Non-image files over 25 MB are blocked/);
assert.match(html, /JPG, PNG, WebP, GIF, HEIC, and HEIF images are accepted/);
assert.match(html, /Resize to 1200px PNG when possible; blocked only if still over 25 MB/);
assert.match(html, /Month Over Month Usage/);
assert.match(html, /Largest Month/);
assert.match(html, /12 Month Median/);
assert.match(html, /Cap Estimate/);
assert.match(html, /At the largest monthly usage rate of/);
assert.match(html, /estimated in/);
assert.doesNotMatch(html, /12 Month Average/);
assert.match(html, /Jun 2026/);
assert.match(html, /Remaining storage/);
assert.match(html, /left/);
assert.match(html, /storage-month-added/);
assert.match(html, /storage-month-cumulative/);
assert.match(html, /storage-legend-remaining/);
assert.match(html, /Top 10 Largest Files/);
assert.match(html, /data-storage-record-link/);
assert.match(html, /data-storage-link-section="work"/);
assert.match(html, /data-storage-link-id="work-1"/);
assert.match(html, /photo&lt;script&gt;.jpg/);
assert.doesNotMatch(html, /photo<script>\.jpg/);

assert.equal(helpers.renderStorageDashboardPanel({ canView: false }), "");

console.log("storage dashboard display smoke passed");
