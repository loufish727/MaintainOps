(function () {
  function createPartsDisplayHelpers({
    escapeHtml,
    money,
    isLowStockPart,
    matchesActiveLocation,
    getParts,
    getPartDocumentsByPartId,
    getPartDocumentsReady,
    getPendingDeletePartId,
    getShowPartSourceManager,
    getPartCostsReady,
    getPartInventoryFilter,
    getPartSearchQuery,
    partUsageRows,
    canDeleteParts,
    renderPartSourceOptions,
    renderPartSourceManager,
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

    function renderPartDetail(part) {
      const quantity = Number(part.quantity_on_hand) || 0;
      const reorderPoint = Number(part.reorder_point) || 0;
      const unitCost = Number(part.unit_cost) || 0;
      const documents = getPartDocumentsByPartId()[part.id] || [];
      return `
        <section class="part-detail-shell">
          ${renderPartSourceOptions()}
          <div class="part-detail-summary relationship-detail parts">
            <button class="secondary-button part-back-button" data-close-part-detail type="button">Back to parts</button>
            <div>
              <div class="chip-row">
                ${part.sku ? `<span class="chip">${escapeHtml(part.sku)}</span>` : ""}
                ${part.supplier_name ? `<span class="chip part-source-chip">${escapeHtml(part.supplier_name)}</span>` : ""}
                <span class="chip ${quantity <= reorderPoint ? "overdue" : "open"}">${quantity <= reorderPoint ? "low stock" : "stocked"}</span>
              </div>
              <h3>${escapeHtml(part.name)}</h3>
              <p>${quantity} on hand - reorder at ${reorderPoint}</p>
            </div>
          </div>

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Quick Inventory</h3>
              <span>stock movement</span>
            </div>
            <div class="part-card-actions">
              <form class="part-quantity-form use-part-form" data-use-part="${part.id}">
                <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Use quantity for ${escapeHtml(part.name)}">
                <button class="secondary-button use-part-button" type="submit">Use</button>
              </form>
              <form class="part-quantity-form restock-form" data-restock-part="${part.id}">
                <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Restock quantity for ${escapeHtml(part.name)}">
                <button class="secondary-button" type="submit">Restock</button>
              </form>
            </div>
          </section>

          <form class="part-detail-form relationship-detail parts" data-edit-part="${part.id}">
            <label>Name<input name="name" required value="${escapeHtml(part.name)}"></label>
            <label>SKU<input name="sku" value="${escapeHtml(part.sku || "")}"></label>
            <label>Source / vendor<input name="supplier_name" list="part-source-options" value="${escapeHtml(part.supplier_name || "")}" placeholder="Where this part usually comes from"><button class="text-button danger-link inline-label-action" data-toggle-part-sources type="button">Edit sources</button></label>
            <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="${quantity}"></label>
            <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="${reorderPoint}"></label>
            <label>Listed unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="${unitCost}"></label>
            <p class="error-text" data-part-edit-error="${part.id}"></p>
            <div class="button-row">
              <button class="secondary-button" type="submit">Save Part</button>
              <button class="text-button" data-close-part-detail type="button">Cancel</button>
            </div>
          </form>

          ${getShowPartSourceManager() ? renderPartSourceManager() : ""}

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Filed Receipts / Invoices</h3>
              <span>${documents.length} file${documents.length === 1 ? "" : "s"}</span>
            </div>
            <form class="part-document-form" data-part-document="${part.id}">
              <label>Attach file<input name="document" type="file" accept="image/*,.pdf"></label>
              <p class="error-text" data-part-document-error="${part.id}">${getPartDocumentsReady() ? "" : "Run supabase/step-next-part-documents.sql before attaching files."}</p>
              <button class="secondary-button" type="submit" ${getPartDocumentsReady() ? "" : "disabled"}>Attach File</button>
            </form>
            <div class="mini-list part-document-list">
              ${documents.map((document) => `
                <article>
                  <strong>${escapeHtml(document.file_name)}</strong>
                  <span>${new Date(document.created_at).toLocaleString()}</span>
                  ${document.signedUrl ? `<a href="${escapeHtml(document.signedUrl)}" target="_blank" rel="noreferrer">Open file</a>` : ""}
                </article>
              `).join("") || `<p class="muted">No receipts or invoices filed with this part.</p>`}
            </div>
          </section>

          ${renderPartDangerZone(part)}
        </section>
      `;
    }

    function renderPartDangerZone(part) {
      const usageCount = partUsageRows(part.id).length;
      const documents = getPartDocumentsByPartId()[part.id] || [];
      const confirming = getPendingDeletePartId() === part.id;
      if (!canDeleteParts()) {
        return `<p class="muted">Admins and managers can delete unused parts.</p>`;
      }

      return `
        <section class="delete-zone part-delete-zone">
          <div>
            <h3>Delete Part</h3>
            <p>${usageCount
              ? `This part has ${usageCount} usage record${usageCount === 1 ? "" : "s"} tied to work order history, so it cannot be deleted.`
              : `This permanently removes the part${documents.length ? ` and ${documents.length} filed receipt/invoice record${documents.length === 1 ? "" : "s"}` : ""}.`}</p>
          </div>
          <p class="error-text" id="part-delete-error"></p>
          ${usageCount ? `
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          ` : confirming ? `
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${escapeHtml(part.name)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-part type="button">Cancel</button>
                <button class="danger-action-button large-delete-button permanent-delete-button" data-delete-part="${escapeHtml(part.id)}" type="button">Permanently Delete</button>
              </div>
            </div>
          ` : `
            <button class="danger-action-button large-delete-button" data-delete-part="${escapeHtml(part.id)}" type="button">Delete Part</button>
          `}
        </section>
      `;
    }

    return {
      renderPart,
      renderPartsHealth,
      renderPartSearch,
      renderPartDetail,
      renderPartDangerZone,
    };
  }

  window.MaintainOpsPartsDisplay = {
    createPartsDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createPartsDisplayHelpers };
  }
})();
