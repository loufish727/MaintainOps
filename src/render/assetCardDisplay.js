(function () {
  function createAssetCardDisplayHelpers({
    escapeHtml,
    assetTypeLabel,
    getWorkOrders,
    getActiveAssetId,
    parentAssetFor,
    childAssetsFor,
  }) {
    function renderAssetCard(asset) {
      const openWork = getWorkOrders().filter((workOrder) => workOrder.asset_id === asset.id && workOrder.status !== "completed").length;
      const parent = parentAssetFor(asset);
      const children = childAssetsFor(asset.id);
      return `
        <article class="asset-card asset-state-${asset.status} ${asset.id === getActiveAssetId() ? "selected" : ""}" data-asset-id="${asset.id}" tabindex="0">
          <div class="part-card-main">
            <div class="chip-row">
              <span class="chip asset-${asset.status}">${escapeHtml(asset.status)}</span>
              <span class="chip">${escapeHtml(assetTypeLabel(asset.asset_type))}</span>
              ${asset.asset_code ? `<span class="chip">${escapeHtml(asset.asset_code)}</span>` : ""}
              ${asset.manufacturer ? `<span class="chip">${escapeHtml(asset.manufacturer)}</span>` : ""}
              ${asset.model ? `<span class="chip">${escapeHtml(asset.model)}</span>` : ""}
              ${asset.safety_devices_required === false ? `<span class="safety-check-note disabled">no safety devices identified</span>` : `<span class="safety-check-note">safety devices identified</span>`}
            </div>
            <h3>${escapeHtml(asset.name)}</h3>
            <p>${escapeHtml(asset.location || "No location set")}</p>
            ${parent ? `<p>Part of ${escapeHtml(parent.name)}</p>` : ""}
            ${children.length ? `<p>${children.length} linked item${children.length === 1 ? "" : "s"}</p>` : ""}
          </div>
          <span class="muted">${openWork} open work</span>
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
})();
