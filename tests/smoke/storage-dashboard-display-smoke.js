const assert = require("node:assert/strict");

global.window = {};

const { createStorageDashboardDisplayHelpers } = require("../../src/render/storageDashboardDisplay.js");

const helpers = createStorageDashboardDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
  formatBytes: (bytes) => `${bytes} B`,
});

const html = helpers.renderStorageDashboardPanel({
  canView: true,
  ready: true,
  error: "",
  dashboard: {
    total_bytes: 330000,
    allowance_bytes: 107374182400,
    remaining_bytes: 107373852400,
    usage_percent: 0.001,
    file_count: 3,
    bucket_totals: [
      { bucket_id: "work-order-photos", file_count: 2, size_bytes: 220000 },
      { bucket_id: "asset-documents", file_count: 1, size_bytes: 110000 },
    ],
    top_files: [
      {
        bucket_id: "work-order-photos",
        object_path: "company/work/photo.jpg",
        file_name: "photo<script>.jpg",
        size_bytes: 220000,
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
assert.match(html, /Work order photos/);
assert.match(html, /Equipment files/);
assert.match(html, /Top 10 Largest Files/);
assert.match(html, /data-storage-record-link/);
assert.match(html, /data-storage-link-section="work"/);
assert.match(html, /data-storage-link-id="work-1"/);
assert.match(html, /photo&lt;script&gt;.jpg/);
assert.doesNotMatch(html, /photo<script>\.jpg/);

assert.equal(helpers.renderStorageDashboardPanel({ canView: false }), "");

console.log("storage dashboard display smoke passed");
