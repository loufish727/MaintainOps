(function () {
  function createStorageDashboardDisplayHelpers({
    escapeHtml,
    formatBytes,
  }) {
    const bucketLabels = {
      "asset-documents": "Equipment files",
      "company-logos": "Company logos",
      "maintenance-request-photos": "Request photos",
      "part-documents": "Part files",
      "work-order-photos": "Work order photos",
    };
    const typeLabels = {
      company: "Company",
      equipment: "Equipment",
      part: "Part",
      request: "Request",
      work_order: "Work Order",
    };

    function byteText(value) {
      const bytes = Number(value) || 0;
      if (!bytes) return "0 B";
      if (bytes >= 1099511627776) return `${(bytes / 1099511627776).toFixed(bytes >= 10995116277760 ? 0 : 1)} TB`;
      if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(bytes >= 10737418240 ? 0 : 1)} GB`;
      return formatBytes(bytes) || "0 B";
    }

    function percentText(value) {
      const number = Number(value) || 0;
      if (number <= 0) return "0%";
      if (number < 0.01) return "<0.01%";
      return `${number.toFixed(number >= 10 ? 1 : 2)}%`;
    }

    function bucketLabel(bucketId) {
      return bucketLabels[bucketId] || String(bucketId || "Storage");
    }

    function recordTypeLabel(recordType) {
      return typeLabels[recordType] || String(recordType || "Record");
    }

    function renderStorageMetric(label, value, detail) {
      return `
        <article class="storage-metric">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
          <small>${escapeHtml(detail || "")}</small>
        </article>
      `;
    }

    function renderBucketRow(bucket, totalBytes) {
      const sizeBytes = Number(bucket.size_bytes) || 0;
      const share = totalBytes ? (sizeBytes / totalBytes) * 100 : 0;
      return `
        <article class="storage-bucket-row">
          <div>
            <strong>${escapeHtml(bucketLabel(bucket.bucket_id))}</strong>
            <span>${Number(bucket.file_count) || 0} files</span>
          </div>
          <div class="storage-bar" aria-label="${escapeHtml(bucketLabel(bucket.bucket_id))} usage">
            <span style="width: ${Math.max(share, sizeBytes ? 1 : 0).toFixed(2)}%"></span>
          </div>
          <strong>${escapeHtml(byteText(sizeBytes))}</strong>
        </article>
      `;
    }

    function renderTopFileRow(file) {
      const section = file.link_section || "";
      const linkedId = file.linked_record_id || "";
      const canOpen = Boolean(section && linkedId);
      return `
        <article class="storage-file-row">
          <div class="storage-file-main">
            <strong title="${escapeHtml(file.object_path || "")}">${escapeHtml(file.file_name || file.object_path || "Stored file")}</strong>
            <span>${escapeHtml(bucketLabel(file.bucket_id))} - ${escapeHtml(recordTypeLabel(file.record_type))}</span>
          </div>
          <div class="storage-file-record">
            <span>${escapeHtml(file.linked_record_label || "Linked record")}</span>
            ${canOpen ? `<button class="secondary-button small" data-storage-record-link data-storage-link-section="${escapeHtml(section)}" data-storage-link-id="${escapeHtml(linkedId)}" data-storage-link-label="${escapeHtml(file.linked_record_label || "")}" type="button">Open</button>` : ""}
          </div>
          <strong class="storage-file-size">${escapeHtml(byteText(file.size_bytes))}</strong>
        </article>
      `;
    }

    function renderStorageDashboardPanel({
      canView,
      dashboard,
      ready,
      error,
    }) {
      if (!canView) return "";
      const data = dashboard || {};
      const totalBytes = Number(data.total_bytes) || 0;
      const allowanceBytes = Number(data.allowance_bytes) || 107374182400;
      const remainingBytes = Math.max(Number(data.remaining_bytes) || (allowanceBytes - totalBytes), 0);
      const bucketTotals = Array.isArray(data.bucket_totals) ? data.bucket_totals : [];
      const topFiles = Array.isArray(data.top_files) ? data.top_files : [];
      return `
        <section class="storage-dashboard relationship-detail asset">
          <div class="panel-header compact">
            <div>
              <h3>Storage Usage</h3>
              <span>${ready ? `${Number(data.file_count) || 0} linked files tracked` : "loading storage usage"}</span>
            </div>
            <button class="secondary-button small" data-refresh-storage-dashboard type="button">Refresh</button>
          </div>
          ${error ? `<p class="warning-text">${escapeHtml(error)}</p>` : ""}
          <div class="storage-metric-grid">
            ${renderStorageMetric("Used", byteText(totalBytes), `${percentText(data.usage_percent)} of plan storage`)}
            ${renderStorageMetric("Available", byteText(allowanceBytes), "Supabase Pro file storage")}
            ${renderStorageMetric("Remaining", byteText(remainingBytes), `${percentText((remainingBytes / allowanceBytes) * 100)} open`)}
            ${renderStorageMetric("Largest Files", `${topFiles.length}/10`, "Top linked storage objects")}
          </div>
          <div class="storage-dashboard-grid">
            <section class="storage-breakdown">
              <div class="settings-section-heading">
                <div>
                  <strong>What Is Taking Space</strong>
                  <span>${bucketTotals.length} buckets</span>
                </div>
              </div>
              <div class="storage-bucket-list">
                ${bucketTotals.map((bucket) => renderBucketRow(bucket, totalBytes)).join("") || `<p class="muted">No linked files found for this company yet.</p>`}
              </div>
            </section>
            <section class="storage-largest-files">
              <div class="settings-section-heading">
                <div>
                  <strong>Top 10 Largest Files</strong>
                  <span>${topFiles.length} shown</span>
                </div>
              </div>
              <div class="storage-file-list">
                ${topFiles.map(renderTopFileRow).join("") || `<p class="muted">No files to list yet.</p>`}
              </div>
            </section>
          </div>
        </section>
      `;
    }

    return {
      renderStorageDashboardPanel,
    };
  }

  window.MaintainOpsStorageDashboardDisplay = {
    createStorageDashboardDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createStorageDashboardDisplayHelpers };
  }
})();
