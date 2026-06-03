(function () {
  function createAssetCardDisplayHelpers({
    escapeHtml,
    assetTypeLabel,
    assetStatusLabel,
    getWorkOrders,
    getAssetParts,
    getAssetDocumentsByAssetId,
    getActiveAssetId,
    parentAssetFor,
    childAssetsFor,
  }) {
    function renderAssetCard(asset) {
      const openWork = getWorkOrders().filter((workOrder) => workOrder.asset_id === asset.id && workOrder.status !== "completed").length;
      const linkedParts = getAssetParts().filter((row) => row.asset_id === asset.id).length;
      const fileCount = (getAssetDocumentsByAssetId()[asset.id] || []).length;
      const parent = parentAssetFor(asset);
      const children = childAssetsFor(asset.id);
      return `
        <article class="asset-card asset-state-${asset.status} ${asset.id === getActiveAssetId() ? "selected" : ""}" data-asset-id="${asset.id}" tabindex="0">
          <div class="asset-card-main">
            <div class="chip-row">
              <span class="chip asset-${asset.status}">${escapeHtml(assetStatusLabel(asset.status))}</span>
              <span class="chip">${escapeHtml(assetTypeLabel(asset.asset_type))}</span>
              ${asset.asset_code ? `<span class="chip">${escapeHtml(asset.asset_code)}</span>` : ""}
              ${asset.safety_devices_required === false ? `<span class="chip">no safety check</span>` : `<span class="chip overdue">safety check</span>`}
            </div>
            <h3>${escapeHtml(asset.name)}</h3>
            <div class="asset-card-context">
              <span>${escapeHtml(asset.location || "No location set")}</span>
              <span>${parent ? `Part of ${escapeHtml(parent.name)}` : "Top level equipment"}</span>
            </div>
            <div class="asset-card-summary" aria-label="Equipment card summary">
              <span><small>Status</small><strong>${escapeHtml(assetStatusLabel(asset.status))}</strong></span>
              <span><small>Sub</small><strong>${children.length}</strong></span>
              <span><small>Parts</small><strong>${linkedParts}</strong></span>
              <span><small>Work</small><strong>${openWork}</strong></span>
              <span><small>Files</small><strong>${fileCount}</strong></span>
            </div>
          </div>
        </article>
      `;
    }

    return {
      renderAssetCard,
    };
  }

  window.MaintainOpsAssetCardDisplay = {
    createAssetCardDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createAssetCardDisplayHelpers };
  }
})();
