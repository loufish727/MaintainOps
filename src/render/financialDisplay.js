(function () {
  function createFinancialDisplayHelpers({
    escapeHtml,
    assetTypeLabel,
    parentAssetFor,
    getAssets,
    getAssetDocumentsByAssetId,
    matchesActiveLocation,
    getAssetsPage,
    renderAssetsPagination,
    ASSETS_PER_PAGE,
  }) {
    const pageSize = ASSETS_PER_PAGE || 12;
    const currentPage = getAssetsPage || (() => 1);
    const pagination = renderAssetsPagination || (() => "");
    const assetTypeOrder = {
      machine: 10,
      forklift: 20,
      secondary_machine: 30,
      tooling: 40,
      component: 50,
      shop_item: 60,
    };

    function assetPictureDocuments(assetId) {
      return (getAssetDocumentsByAssetId()[assetId] || [])
        .filter((document) => String(document.content_type || "").startsWith("image/") || document.document_type === "machine_photo" || document.document_type === "nameplate");
    }

    function financialAssets() {
      return getAssets()
        .filter(matchesActiveLocation)
        .sort((a, b) => {
          const typeDelta = (assetTypeOrder[a.asset_type || "machine"] || 999) - (assetTypeOrder[b.asset_type || "machine"] || 999);
          if (typeDelta) return typeDelta;
          const parentDelta = String(parentAssetFor(a)?.name || "").localeCompare(String(parentAssetFor(b)?.name || ""));
          return parentDelta
            || String(a.location || "").localeCompare(String(b.location || ""))
            || String(a.name || "").localeCompare(String(b.name || ""));
        });
    }

    function renderFinancialAssetCard(asset) {
      const parent = parentAssetFor(asset);
      const pictures = assetPictureDocuments(asset.id);
      return `
        <article class="asset-card asset-state-${escapeHtml(asset.status || "running")}">
          <div class="part-card-main">
            <div class="chip-row">
              <span class="chip">${escapeHtml(assetTypeLabel(asset.asset_type))}</span>
              <span class="chip asset-${escapeHtml(asset.status || "running")}">${escapeHtml(asset.status || "running")}</span>
              ${asset.asset_code ? `<span class="chip">${escapeHtml(asset.asset_code)}</span>` : ""}
              ${pictures.length ? `<span class="chip">${pictures.length} photo${pictures.length === 1 ? "" : "s"}</span>` : `<span class="chip">photo missing</span>`}
            </div>
            <h3>${escapeHtml(asset.name || "Equipment")}</h3>
            <p>${escapeHtml(parent ? `Part of ${parent.name}` : "Top level equipment")}</p>
            <p>${escapeHtml(asset.location || "No area / spot set")}</p>
          </div>
          <div class="member-card-actions">
            <span class="chip">${escapeHtml(asset.manufacturer || "Manufacturer blank")}</span>
            <span class="chip">${escapeHtml(asset.model || "Model blank")}</span>
          </div>
        </article>
      `;
    }

    function renderFinancialPanel() {
      const rows = financialAssets();
      const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
      const page = Math.min(Math.max(Number(currentPage()) || 1, 1), totalPages);
      const pagedRows = rows.slice((page - 1) * pageSize, page * pageSize);
      return `
        <div class="queue-context-card asset-command-summary">
          <div>
            <strong>Equipment Financial Register</strong>
            <span>Read-only equipment mirror for asset accounting. Financial fields will live here without opening maintenance editing rights.</span>
          </div>
          <small>${rows.length} equipment record${rows.length === 1 ? "" : "s"}</small>
        </div>
        <div class="asset-list">
          ${pagedRows.map(renderFinancialAssetCard).join("") || `<p class="muted">No equipment found for this location.</p>`}
        </div>
        ${pagination(rows.length, totalPages)}
      `;
    }

    return {
      financialAssets,
      renderFinancialPanel,
      renderFinancialAssetCard,
    };
  }

  window.MaintainOpsFinancialDisplay = {
    createFinancialDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createFinancialDisplayHelpers };
  }
})();
