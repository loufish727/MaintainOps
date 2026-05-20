(function () {
  function createGlobalSearchDisplayHelpers({
    escapeHtml,
    statusLabel,
    assignmentLabel,
    activeLocationName,
    getSearchQuery,
  }) {
    function renderGlobalSearchResults(results) {
      const total = globalResultCount(results);
      return `
        <section class="panel full-width global-search-panel">
          <div class="panel-header">
            <h2>Search Results</h2>
            <span>${total} previewed in ${escapeHtml(activeLocationName())}</span>
          </div>
          <div class="global-search-grid">
            ${renderGlobalResultGroup("Work Orders", results.work, renderGlobalWorkResult, "work", { showWorkSearchAction: Boolean(getSearchQuery().trim()) })}
            ${renderGlobalResultGroup("Equipment", results.assets, renderGlobalAssetResult, "asset")}
            ${renderGlobalResultGroup("Parts", results.parts, renderGlobalPartResult, "parts")}
            ${renderGlobalResultGroup("Requests", results.requests, renderGlobalRequestResult, "comment")}
            ${renderGlobalResultGroup("PM", results.pm, renderGlobalPmResult, "procedure")}
            ${renderGlobalResultGroup("Procedures", results.procedures, renderGlobalProcedureResult, "procedure")}
          </div>
        </section>
      `;
    }

    function renderGlobalResultGroup(title, items, renderer, tone, options = {}) {
      return `
        <section class="global-result-group relationship-detail ${tone}">
          <div class="panel-header compact">
            <h3>${escapeHtml(title)}</h3>
            <span class="chip">${items.length}</span>
          </div>
          <div class="global-result-list">
            ${items.map(renderer).join("") || `<p class="muted">No matches.</p>`}
            ${options.showWorkSearchAction ? `<button class="secondary-button global-result-action" data-view-work-search type="button">Page through all matching work orders</button>` : ""}
          </div>
        </section>
      `;
    }

    function renderGlobalWorkResult(workOrder) {
      return `
        <button class="global-result-item" data-search-work-order="${workOrder.id}" type="button">
          <strong>${escapeHtml(workOrder.title)}</strong>
          <span>${statusLabel(workOrder.status)} - ${escapeHtml(workOrder.assets?.name || "No equipment")} - ${escapeHtml(assignmentLabel(workOrder))}</span>
        </button>
      `;
    }

    function renderGlobalAssetResult(asset) {
      return `
        <button class="global-result-item" data-search-asset="${asset.id}" type="button">
          <strong>${escapeHtml(asset.name)}</strong>
          <span>${escapeHtml(asset.asset_code || "No ID")} - ${escapeHtml(asset.status)} - ${escapeHtml(asset.location || activeLocationName())}</span>
        </button>
      `;
    }

    function renderGlobalPartResult(part) {
      const quantity = Number(part.quantity_on_hand) || 0;
      return `
        <button class="global-result-item" data-search-part="${part.id}" type="button">
          <strong>${escapeHtml(part.name)}</strong>
          <span>${escapeHtml(part.sku || "No SKU")} - ${quantity} on hand${part.supplier_name ? ` - ${escapeHtml(part.supplier_name)}` : ""}</span>
        </button>
      `;
    }

    function renderGlobalRequestResult(request) {
      return `
        <button class="global-result-item" data-search-request="${request.id}" type="button">
          <strong>${escapeHtml(request.title)}</strong>
          <span>${escapeHtml(request.status)} - ${escapeHtml(request.assets?.name || "No equipment")}</span>
        </button>
      `;
    }

    function renderGlobalPmResult(schedule) {
      return `
        <button class="global-result-item" data-search-section="pm" data-search-label="${escapeHtml(schedule.title)}" type="button">
          <strong>${escapeHtml(schedule.title)}</strong>
          <span>${escapeHtml(schedule.assets?.name || "No equipment")} - due ${escapeHtml(schedule.next_due_at || "unset")}</span>
        </button>
      `;
    }

    function renderGlobalProcedureResult(template) {
      return `
        <button class="global-result-item" data-search-section="procedures" data-search-label="${escapeHtml(template.name)}" type="button">
          <strong>${escapeHtml(template.name)}</strong>
          <span>${(template.procedure_steps || []).length} steps</span>
        </button>
      `;
    }

    function globalResultCount(results) {
      return Object.values(results).reduce((sum, list) => sum + list.length, 0);
    }

    return {
      renderGlobalSearchResults,
      renderGlobalResultGroup,
      renderGlobalWorkResult,
      renderGlobalAssetResult,
      renderGlobalPartResult,
      renderGlobalRequestResult,
      renderGlobalPmResult,
      renderGlobalProcedureResult,
      globalResultCount,
    };
  }

  window.MaintainOpsGlobalSearchDisplay = {
    createGlobalSearchDisplayHelpers,
  };
})();
