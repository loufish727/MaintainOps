const assert = require("node:assert/strict");

global.window = {};

const state = {
  pendingDeletePartId: "part-1",
  showPartSourceManager: true,
  partDocumentsReady: true,
};

const { createPartsDisplayHelpers } = require("../../src/render/partsDisplay.js");

const helpers = createPartsDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
  money: (value) => `$${Number(value).toFixed(2)}`,
  isLowStockPart: (part) => Number(part.quantity_on_hand) <= Number(part.reorder_point),
  matchesActiveLocation: () => true,
  getParts: () => [
    { id: "part-1", name: "Bearing <A>", sku: "BRG", supplier_name: "Local", machine_note: "MS200", quantity_on_hand: 1, reorder_point: 2, unit_cost: 4 },
  ],
  getPartDocumentsByPartId: () => ({
    "part-1": [
      { file_name: "receipt.pdf", document_type: "receipt", content_type: "application/pdf", created_at: "2026-05-27T12:00:00Z", signedUrl: "https://example.test/receipt.pdf" },
      { file_name: "label.jpg", document_type: "part_photo", content_type: "image/jpeg", file_size_bytes: 12345, original_file_name: "raw label.png", created_at: "2026-05-27T12:10:00Z", signedUrl: "https://example.test/label.jpg" },
    ],
  }),
  getPartDocumentsReady: () => state.partDocumentsReady,
  getPendingDeletePartId: () => state.pendingDeletePartId,
  getShowPartSourceManager: () => state.showPartSourceManager,
  getPartCostsReady: () => true,
  getPartInventoryFilter: () => "low",
  getPartSearchQuery: () => "bearing",
  partUsageRows: () => [],
  canDeleteParts: () => true,
  renderPartSourceOptions: () => '<datalist id="part-source-options"></datalist>',
  renderPartMachineOptions: () => '<datalist id="part-machine-options"></datalist>',
  renderPartSourceManager: () => '<section class="part-source-manager"></section>',
});

const part = helpers.getParts ? helpers.getParts()[0] : { id: "part-1", name: "Bearing <A>", sku: "BRG", supplier_name: "Local", machine_note: "MS200", quantity_on_hand: 1, reorder_point: 2, unit_cost: 4 };

const listCard = helpers.renderPart(part);
assert.match(listCard, /data-open-part="part-1"/);
assert.match(listCard, /Bearing &lt;A&gt;/);
assert.match(listCard, /low stock/);
assert.match(listCard, /MS200/);

const health = helpers.renderPartsHealth();
assert.match(health, /data-part-inventory-filter="low"/);

const search = helpers.renderPartSearch("source");
assert.match(search, /id="part-search-form"/);
assert.match(search, /value="bearing"/);
assert.match(search, /data-part-sort="source"/);
assert.match(search, /Source \/ vendor/);

const detail = helpers.renderPartDetail(part);
assert.match(detail, /data-close-part-detail/);
assert.match(detail, /data-use-part="part-1"/);
assert.match(detail, /data-restock-part="part-1"/);
assert.match(detail, /data-edit-part="part-1"/);
assert.match(detail, /data-toggle-part-sources/);
assert.match(detail, /part-source-manager/);
assert.match(detail, /part-machine-options/);
assert.match(detail, /name="machine_note"/);
assert.match(detail, /value="MS200"/);
assert.match(detail, /data-part-document="part-1"/);
assert.match(detail, /name="document_type"/);
assert.match(detail, /Part photos/);
assert.match(detail, /Receipts/);
assert.match(detail, /part-document-thumb/);
assert.match(detail, /raw label\.png/);
assert.match(detail, /receipt\.pdf/);
assert.match(detail, /data-cancel-delete-part/);
assert.match(detail, /permanent-delete-button/);
assert.match(detail, /data-delete-part="part-1"/);

console.log("parts display smoke passed");
