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
    renderPartMachineOptions,
    renderPartSourceManager,
  }) {
    const PART_DOCUMENT_TYPES = [
      ["part_photo", "Part photos"],
      ["receipt", "Receipts"],
      ["invoice", "Invoices"],
      ["part_print", "Part prints"],
      ["schematic", "Schematics"],
      ["manual", "Manuals"],
      ["spec_sheet", "Spec sheets"],
      ["warranty", "Warranty"],
      ["other", "Other files"],
    ];

    const PART_DOCUMENT_TYPE_LABELS = PART_DOCUMENT_TYPES.reduce((labels, [value, label]) => {
      labels[value] = label.replace(/s$/, "");
      return labels;
    }, {});

    function partDocumentType(document) {
      if (document.document_type) return document.document_type;
      if (String(document.content_type || "").startsWith("image/")) return "part_photo";
      if (/invoice/i.test(document.file_name || "")) return "invoice";
      if (/receipt/i.test(document.file_name || "")) return "receipt";
      if (/schematic|diagram/i.test(document.file_name || "")) return "schematic";
      if (/print|drawing/i.test(document.file_name || "")) return "part_print";
      if (/manual/i.test(document.file_name || "")) return "manual";
      if (/spec|cut.?sheet|datasheet/i.test(document.file_name || "")) return "spec_sheet";
      return "other";
    }

    function renderDocumentTypeOptions() {
      return PART_DOCUMENT_TYPES.map(([value, label]) => `
        <option value="${value}">${escapeHtml(PART_DOCUMENT_TYPE_LABELS[value] || label)}</option>
      `).join("");
    }

    function renderPartDocumentCard(document) {
      const type = partDocumentType(document);
      const isImage = String(document.content_type || "").startsWith("image/");
      const typeLabel = PART_DOCUMENT_TYPE_LABELS[type] || "File";
      const uploaded = document.created_at ? new Date(document.created_at).toLocaleString() : "Uploaded";
      const sizeText = document.file_size_bytes ? `${Math.round(Number(document.file_size_bytes) / 1024)} KB` : "";
      return `
        <article class="part-document-card ${isImage ? "image-file" : ""}">
          ${isImage && document.signedUrl ? `<a class="part-document-thumb" href="${escapeHtml(document.signedUrl)}" target="_blank" rel="noreferrer"><img src="${escapeHtml(document.signedUrl)}" alt="${escapeHtml(document.file_name)}"></a>` : ""}
          <div>
            <div class="chip-row">
              <span class="chip">${escapeHtml(typeLabel)}</span>
              ${sizeText ? `<span class="chip">${escapeHtml(sizeText)}</span>` : ""}
            </div>
            <strong>${escapeHtml(document.file_name)}</strong>
            <span>${escapeHtml(uploaded)}</span>
            ${document.original_file_name && document.original_file_name !== document.file_name ? `<small>Original: ${escapeHtml(document.original_file_name)}</small>` : ""}
            ${document.signedUrl ? `<a href="${escapeHtml(document.signedUrl)}" target="_blank" rel="noreferrer">Open file</a>` : ""}
          </div>
        </article>
      `;
    }

    function renderPartDocumentSection([type, label], documents) {
      const grouped = documents.filter((document) => partDocumentType(document) === type);
      if (!grouped.length) return "";
      return `
        <section class="part-document-group">
          <div class="part-document-group-heading">
            <h4>${escapeHtml(label)}</h4>
            <span>${grouped.length}</span>
          </div>
          <div class="part-document-grid">
            ${grouped.map(renderPartDocumentCard).join("")}
          </div>
        </section>
      `;
    }

    function renderPartDocumentSummary(documents) {
      const counts = documents.reduce((summary, document) => {
        const type = partDocumentType(document);
        summary[type] = (summary[type] || 0) + 1;
        return summary;
      }, {});
      const summaryTypes = ["part_photo", "receipt", "invoice", "part_print", "schematic", "manual", "spec_sheet"];
      return summaryTypes
        .filter((type) => counts[type])
        .map((type) => `<span class="chip">${counts[type]} ${escapeHtml(PART_DOCUMENT_TYPE_LABELS[type] || "file")}${counts[type] === 1 ? "" : "s"}</span>`)
        .join("");
    }

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
              ${part.machine_note ? `<span class="chip">${escapeHtml(part.machine_note)}</span>` : ""}
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

    function renderPartSearch(partSort = "default") {
      return `
        <form class="part-search-bar" id="part-search-form">
          <label>
            Search parts
            <input id="part-search" name="part_search" type="search" value="${escapeHtml(getPartSearchQuery())}" placeholder="Search part name, SKU, source, count">
          </label>
          <button class="secondary-button" type="submit">Search</button>
        </form>
        <div class="part-sort-bar relationship-detail parts" aria-label="Parts sort">
          <label>Sort parts
            <select data-part-sort>
              <option value="default" ${partSort === "default" ? "selected" : ""}>Default</option>
              <option value="source" ${partSort === "source" ? "selected" : ""}>Source / vendor</option>
            </select>
          </label>
        </div>
      `;
    }

    function renderPartDetail(part) {
      const quantity = Number(part.quantity_on_hand) || 0;
      const reorderPoint = Number(part.reorder_point) || 0;
      const unitCost = Number(part.unit_cost) || 0;
      const documents = getPartDocumentsByPartId()[part.id] || [];
      const documentSummary = renderPartDocumentSummary(documents);
      return `
        <section class="part-detail-shell">
          ${renderPartSourceOptions()}
          ${renderPartMachineOptions()}
          <div class="part-detail-summary relationship-detail parts">
            <button class="secondary-button part-back-button" data-close-part-detail type="button">Back to parts</button>
            <div>
              <div class="chip-row">
                ${part.sku ? `<span class="chip">${escapeHtml(part.sku)}</span>` : ""}
                ${part.supplier_name ? `<span class="chip part-source-chip">${escapeHtml(part.supplier_name)}</span>` : ""}
                ${part.machine_note ? `<span class="chip">${escapeHtml(part.machine_note)}</span>` : ""}
                <span class="chip ${quantity <= reorderPoint ? "overdue" : "open"}">${quantity <= reorderPoint ? "low stock" : "stocked"}</span>
              </div>
              <h3>${escapeHtml(part.name)}</h3>
              <p>${quantity} on hand - reorder at ${reorderPoint}</p>
              ${documentSummary ? `<div class="chip-row part-file-summary">${documentSummary}</div>` : ""}
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
            <label>Common machine / area<input name="machine_note" list="part-machine-options" value="${escapeHtml(part.machine_note || "")}" placeholder="Optional display/search note"></label>
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
              <h3>Part Files</h3>
              <span>${documents.length} file${documents.length === 1 ? "" : "s"}</span>
            </div>
            <form class="part-document-form" data-part-document="${part.id}">
              <label>File type<select name="document_type">${renderDocumentTypeOptions()}</select></label>
              <label>Attach file<input name="document" type="file" accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx"><small>Images are optimized. Non-image files over 25 MB are blocked.</small></label>
              <p class="error-text" data-part-document-error="${part.id}">${getPartDocumentsReady() ? "" : "Run supabase/step-next-part-documents.sql before attaching files."}</p>
              <button class="secondary-button" type="submit" ${getPartDocumentsReady() ? "" : "disabled"}>Attach File</button>
            </form>
            <div class="part-document-list">
              ${documents.length
                ? PART_DOCUMENT_TYPES.map((type) => renderPartDocumentSection(type, documents)).join("")
                : `<p class="muted">No photos, receipts, invoices, prints, schematics, or manuals filed with this part.</p>`}
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
