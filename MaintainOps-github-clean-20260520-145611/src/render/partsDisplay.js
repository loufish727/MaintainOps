(function () {
  function createPartsDisplayHelpers({
    escapeHtml,
    money,
    isLowStockPart,
    matchesActiveLocation,
    getParts,
    getPartCostsReady,
    getPartInventoryFilter,
    getPartSearchQuery,
  }) {
    function renderPart(part) {
      const quantity = Number(part.quantity_on_hand) || 0;
      const reorderPoint = Number(part.reorder_point) || 0;
      const unitCost = Number(part.unit_cost) || 0;
      const low = quantity <= reorderPoint;
      const restockNeed = Math.max(0, reorderPoint - quantity);
      return `
        <article class="part-card part-tile ${low ? "low-stock" : ""}" data-open-part="${part.id}" tabindex="0" role="button" aria-label="Open ${escapeHtml(part.name)}">
          <div class="part-card-main">
            <div class="chip-row">
              ${part.sku ? `<span class="chip">${escapeHtml(part.sku)}</span>` : ""}
              ${part.supplier_name ? `<span class="chip part-source-chip">${escapeHtml(part.supplier_name)}</span>` : ""}
              ${low ? `<span class="chip overdue">low stock</span>` : `<span class="chip open">stocked</span>`}
            </div>
            <h3>${escapeHtml(part.name)}</h3>
            <div class="part-card-meta">
              <span>${quantity} on hand</span>
              <span>reorder at ${reorderPoint}</span>
              <span>${getPartCostsReady() ? `${money(unitCost)} listed cost` : "Cost reference not active yet"}</span>
            </div>
            ${low && reorderPoint > 0 ? `<small>Need ${restockNeed} to reach reorder point.</small>` : ""}
          </div>
          <span class="part-tile-open">Open</span>
        </article>
      `;
    }

    function renderPartsHealth() {
      const locationParts = getParts().filter(matchesActiveLocation);
      const lowCount = locationParts.filter(isLowStockPart).length;
      const partInventoryFilter = getPartInventoryFilter();
      return [
        ["All Parts", locationParts.length, "all"],
        ["Low Stock", lowCount, "low"],
      ].map(([label, value, filter]) => `
        <button class="parts-health ${filter === "low" && value ? "attention" : ""} ${partInventoryFilter === filter ? "active" : ""}" data-part-inventory-filter="${filter}" type="button">
          <span>${label}</span>
          <strong>${value}</strong>
        </button>
      `).join("");
    }

    function renderPartSearch() {
      return `
        <form class="part-search-bar" id="part-search-form">
          <label>
            Search parts
            <input id="part-search" name="part_search" type="search" value="${escapeHtml(getPartSearchQuery())}" placeholder="Search part name, SKU, source, count">
          </label>
          <button class="secondary-button" type="submit">Search</button>
        </form>
      `;
    }

    return {
      renderPart,
      renderPartsHealth,
      renderPartSearch,
    };
  }

  window.MaintainOpsPartsDisplay = {
    createPartsDisplayHelpers,
  };
})();
