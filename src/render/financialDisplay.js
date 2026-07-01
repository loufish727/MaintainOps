(function () {
  function createFinancialDisplayHelpers({
    escapeHtml,
    assetTypeLabel,
    parentAssetFor,
    getAssets,
    getAssetDocumentsByAssetId,
    getAssetFinancialsByAssetId,
    getAssetFinancialsReady,
    getProfilesByUserId,
    getLocations,
    matchesActiveLocation,
    getFinancialPage,
    getFinancialMissingFilter,
    getFinancialLocationFilter,
    getFinancialTypeFilter,
    ASSETS_PER_PAGE,
  }) {
    const pageSize = ASSETS_PER_PAGE || 12;
    const currentPage = getFinancialPage || (() => 1);
    const moneyFields = ["acquisition_cost", "current_book_value"];
    const requiredFinancialFields = ["asset_tag", "acquisition_date", "acquisition_cost", "depreciation_method", "useful_life_years", "current_book_value", "tax_jurisdiction", "ownership_status", "in_service_date", "gl_account_code", "cost_center"];
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

    function financeFor(assetId) {
      return getAssetFinancialsByAssetId?.()[assetId] || {};
    }

    function isMissingFinancialInfo(asset) {
      const finance = financeFor(asset.id);
      return requiredFinancialFields.some((field) => finance[field] == null || String(finance[field]).trim() === "");
    }

    function locationName(locationId) {
      return getLocations?.().find((location) => location.id === locationId)?.name || "";
    }

    function reviewedByName(finance) {
      if (!finance.reviewed_by) return "";
      return getProfilesByUserId?.()[finance.reviewed_by]?.full_name || `User ${String(finance.reviewed_by).slice(0, 8)}`;
    }

    function financialAssets() {
      const missingFilter = getFinancialMissingFilter?.() || "all";
      const locationFilter = getFinancialLocationFilter?.() || "all";
      const typeFilter = getFinancialTypeFilter?.() || "all";
      return getAssets()
        .filter((asset) => locationFilter === "all" || asset.location_id === locationFilter)
        .filter((asset) => typeFilter === "all" || (asset.asset_type || "machine") === typeFilter)
        .filter((asset) => {
          if (missingFilter === "missing") return isMissingFinancialInfo(asset);
          if (missingFilter === "review") return financeFor(asset.id).needs_review === true;
          return true;
        })
        .sort((a, b) => {
          const typeDelta = (assetTypeOrder[a.asset_type || "machine"] || 999) - (assetTypeOrder[b.asset_type || "machine"] || 999);
          if (typeDelta) return typeDelta;
          const parentDelta = String(parentAssetFor(a)?.name || "").localeCompare(String(parentAssetFor(b)?.name || ""));
          return parentDelta
            || String(locationName(a.location_id) || a.location || "").localeCompare(String(locationName(b.location_id) || b.location || ""))
            || String(a.location || "").localeCompare(String(b.location || ""))
            || String(a.name || "").localeCompare(String(b.name || ""));
        });
    }

    function dateValue(value) {
      return value ? String(value).slice(0, 10) : "";
    }

    function moneyValue(value) {
      return value == null || value === "" ? "" : String(value);
    }

    function fieldValue(finance, field) {
      return moneyFields.includes(field) ? moneyValue(finance[field]) : (finance[field] || "");
    }

    function renderFinancialAssetCard(asset) {
      const parent = parentAssetFor(asset);
      const pictures = assetPictureDocuments(asset.id);
      const finance = financeFor(asset.id);
      const missing = isMissingFinancialInfo(asset);
      return `
        <article class="asset-card asset-state-${escapeHtml(asset.status || "running")} financial-asset-card">
          <div class="part-card-main">
            <div class="chip-row">
              <span class="chip">${escapeHtml(assetTypeLabel(asset.asset_type))}</span>
              <span class="chip">${escapeHtml(locationName(asset.location_id) || "Location unset")}</span>
              <span class="chip">${escapeHtml(asset.location || "Department unset")}</span>
              ${asset.asset_code ? `<span class="chip">${escapeHtml(asset.asset_code)}</span>` : ""}
              ${pictures.length ? `<span class="chip">${pictures.length} photo${pictures.length === 1 ? "" : "s"}</span>` : `<span class="chip">photo missing</span>`}
              ${missing ? `<span class="chip status-open">missing finance info</span>` : `<span class="chip status-completed">finance complete</span>`}
              ${finance.needs_review ? `<span class="chip status-blocked">needs review</span>` : ""}
            </div>
            <h3>${escapeHtml(asset.name || "Equipment")}</h3>
            <p>${escapeHtml(parent ? `Part of ${parent.name}` : "Top level equipment")}</p>
            <p>${escapeHtml(asset.manufacturer || "Manufacturer blank")} ${asset.model ? `- ${escapeHtml(asset.model)}` : ""}</p>
            <p class="muted">Last reviewed ${finance.last_reviewed_at ? new Date(finance.last_reviewed_at).toLocaleDateString() : "not recorded"}${finance.reviewed_by ? ` by ${escapeHtml(reviewedByName(finance))}` : ""}</p>
          </div>
          <form class="form-grid financial-asset-form" data-financial-asset="${escapeHtml(asset.id)}">
            <input name="asset_id" type="hidden" value="${escapeHtml(asset.id)}">
            <label>Asset tag / fixed asset number<input name="asset_tag" value="${escapeHtml(fieldValue(finance, "asset_tag"))}"></label>
            <label>Acquisition date<input name="acquisition_date" type="date" value="${escapeHtml(dateValue(finance.acquisition_date))}"></label>
            <label>Acquisition cost<input name="acquisition_cost" type="number" min="0" step="0.01" value="${escapeHtml(fieldValue(finance, "acquisition_cost"))}"></label>
            <label>Depreciation method<input name="depreciation_method" value="${escapeHtml(fieldValue(finance, "depreciation_method"))}" placeholder="Straight-line"></label>
            <label>Useful life years<input name="useful_life_years" type="number" min="0" step="0.1" value="${escapeHtml(fieldValue(finance, "useful_life_years"))}"></label>
            <label>Current book value<input name="current_book_value" type="number" min="0" step="0.01" value="${escapeHtml(fieldValue(finance, "current_book_value"))}"></label>
            <label>Tax jurisdiction / property tax location<input name="tax_jurisdiction" value="${escapeHtml(fieldValue(finance, "tax_jurisdiction"))}"></label>
            <label>Ownership status
              <select name="ownership_status">
                ${["", "owned", "leased", "rented", "disposed"].map((value) => `<option value="${value}" ${value === (finance.ownership_status || "") ? "selected" : ""}>${value ? value.replace(/\b\w/g, (letter) => letter.toUpperCase()) : "Unset"}</option>`).join("")}
              </select>
            </label>
            <label>In service date<input name="in_service_date" type="date" value="${escapeHtml(dateValue(finance.in_service_date))}"></label>
            <label>Disposal date<input name="disposal_date" type="date" value="${escapeHtml(dateValue(finance.disposal_date))}"></label>
            <label>GL / account code<input name="gl_account_code" value="${escapeHtml(fieldValue(finance, "gl_account_code"))}"></label>
            <label>Cost center / department<input name="cost_center" value="${escapeHtml(fieldValue(finance, "cost_center"))}"></label>
            <label>Disposal notes<textarea name="disposal_notes" rows="2">${escapeHtml(finance.disposal_notes || "")}</textarea></label>
            <label>Finance notes<textarea name="finance_notes" rows="2">${escapeHtml(finance.finance_notes || "")}</textarea></label>
            <label class="check-row"><input name="needs_review" type="checkbox" ${finance.needs_review ? "checked" : ""}> Needs review</label>
            <p class="error-text" data-financial-error="${escapeHtml(asset.id)}"></p>
            <button class="secondary-button asset-action-button" type="submit" ${getAssetFinancialsReady?.() === false ? "disabled" : ""}>Save Financial Info</button>
          </form>
        </article>
      `;
    }

    function renderFinancialFilters(rows) {
      const activeMissing = getFinancialMissingFilter?.() || "all";
      const activeLocation = getFinancialLocationFilter?.() || "all";
      const activeType = getFinancialTypeFilter?.() || "all";
      const locations = getLocations?.() || [];
      const typeOptions = [...new Set(getAssets().map((asset) => asset.asset_type || "machine"))]
        .sort((a, b) => (assetTypeOrder[a] || 999) - (assetTypeOrder[b] || 999));
      return `
        <div class="asset-area-filter relationship-detail asset" aria-label="Financial asset filters">
          <label>Status
            <select data-financial-filter="missing">
              <option value="all" ${activeMissing === "all" ? "selected" : ""}>All financial records</option>
              <option value="missing" ${activeMissing === "missing" ? "selected" : ""}>Missing financial info</option>
              <option value="review" ${activeMissing === "review" ? "selected" : ""}>Needs review</option>
            </select>
          </label>
          <label>Facility
            <select data-financial-filter="location">
              <option value="all" ${activeLocation === "all" ? "selected" : ""}>All facilities</option>
              ${locations.map((location) => `<option value="${escapeHtml(location.id)}" ${activeLocation === location.id ? "selected" : ""}>${escapeHtml(location.name || "Location")}</option>`).join("")}
            </select>
          </label>
          <label>Equipment type
            <select data-financial-filter="type">
              <option value="all" ${activeType === "all" ? "selected" : ""}>All types</option>
              ${typeOptions.map((type) => `<option value="${escapeHtml(type)}" ${activeType === type ? "selected" : ""}>${escapeHtml(assetTypeLabel(type))}</option>`).join("")}
            </select>
          </label>
          <span>${rows.length} shown</span>
        </div>
      `;
    }

    function renderFinancialPanel() {
      const rows = financialAssets();
      const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
      const page = Math.min(Math.max(Number(currentPage()) || 1, 1), totalPages);
      const pagedRows = rows.slice((page - 1) * pageSize, page * pageSize);
      const firstShown = ((page - 1) * pageSize) + 1;
      const lastShown = Math.min(rows.length, page * pageSize);
      const pagination = rows.length <= pageSize ? "" : `
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-financial-page="prev" type="button" ${page <= 1 ? "disabled" : ""}>Previous</button>
          <span>Showing ${firstShown}-${lastShown} of ${rows.length} - Page ${page} of ${totalPages}</span>
          <button class="secondary-button page-action-button" data-financial-page="next" type="button" ${page >= totalPages ? "disabled" : ""}>Next</button>
        </div>
      `;
      return `
        <div class="queue-context-card asset-command-summary">
          <div>
            <strong>Equipment Financial Register</strong>
            <span>Finance fields are stored separately from maintenance equipment records.</span>
          </div>
          <small>${getAssetFinancialsReady?.() === false ? "Run supabase/step-next-asset-financials.sql" : `${rows.length} equipment record${rows.length === 1 ? "" : "s"}`}</small>
        </div>
        ${renderFinancialFilters(rows)}
        <div class="asset-list">
          ${pagedRows.map(renderFinancialAssetCard).join("") || `<p class="muted">No equipment found for these financial filters.</p>`}
        </div>
        ${pagination}
      `;
    }

    return {
      financialAssets,
      isMissingFinancialInfo,
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
