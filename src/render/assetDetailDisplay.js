(function () {
  /*
   * Module contract: renders Equipment Detail markup and existing data-* contracts only.
   * Dependencies are injected from app.js so this module does not own app state,
   * bind events, mutate records, call Supabase, touch auth/session startup, storage,
   * public QR submit, SQL, or RLS.
   */
  function createAssetDetailDisplayHelpers(deps = {}) {
    const {
      renderCreateWorkOrder,
      parentAssetFor,
      childAssetsFor,
      escapeHtml,
      assetTypeLabel,
      renderParentAssetOptions,
      renderLocationOptions,
      assetStatusLabel,
      renderAssetMiniWorkOrder,
      assetDeleteBlockerMessage,
      canDeleteEquipment,
    } = deps;

    function renderAssetDetail() {
      const assets = deps.getAssets();
      const activeAssetId = deps.getActiveAssetId();
      const asset = assets.find((item) => item.id === activeAssetId);
      if (!asset) return renderCreateWorkOrder();
      const workOrders = deps.getWorkOrders();
      const preventiveSchedules = deps.getPreventiveSchedules();
      const parts = deps.getParts();
      const assetParts = deps.getAssetParts();
      const assetPartsReady = deps.getAssetPartsReady();
      const assetDocuments = (deps.getAssetDocumentsByAssetId?.()[asset.id] || []);
      const assetDocumentsReady = deps.getAssetDocumentsReady?.() !== false;
      const partsUsedByWorkOrder = deps.getPartsUsedByWorkOrder();
      const locations = deps.getLocations();
      const activeLocationId = deps.getActiveLocationId();
      const ASSET_TYPE_OPTIONS = deps.ASSET_TYPE_OPTIONS || [];
      const parent = parentAssetFor(asset);
      const children = childAssetsFor(asset.id);
      const assetWorkOrders = workOrders.filter((workOrder) => workOrder.asset_id === asset.id);
      const openWork = assetWorkOrders.filter((workOrder) => workOrder.status !== "completed");
      const completedWork = assetWorkOrders.filter((workOrder) => workOrder.status === "completed");
      const assetSchedules = preventiveSchedules.filter((schedule) => schedule.asset_id === asset.id);
      const usedParts = Object.values(partsUsedByWorkOrder)
        .flat()
        .filter((row) => assetWorkOrders.some((workOrder) => workOrder.id === row.work_order_id));
      const linkedParts = assetParts.filter((row) => row.asset_id === asset.id);
      const linkedPartIds = new Set(linkedParts.map((row) => row.part_id));
      const attachableParts = parts.filter((part) => !linkedPartIds.has(part.id));
      const locationName = locations.find((location) => location.id === asset.location_id)?.name || asset.location || "No location set";
      const primaryLabel = parent ? parent.name : "Top level equipment";
      const statusTone = asset.status === "offline"
        ? "status-blocked"
        : asset.status === "degraded"
          ? "status-open"
          : asset.status === "watch"
            ? "status-in_progress"
            : "status-completed";

      return `
        <div class="detail-stack">
          <div>
            <div class="chip-row">
              <span class="chip asset-${asset.status}">${escapeHtml(asset.status)}</span>
              <span class="chip">${escapeHtml(assetTypeLabel(asset.asset_type))}</span>
              ${asset.asset_code ? `<span class="chip">${escapeHtml(asset.asset_code)}</span>` : ""}
              ${asset.safety_devices_required === false ? `<span class="chip">no safety check</span>` : `<span class="chip overdue">safety check required</span>`}
            </div>
            <h2>${escapeHtml(asset.name)}</h2>
            <p>${escapeHtml(asset.location || "No location set")}</p>
            ${parent ? `<p>Part of <button class="text-button inline-link-button" data-open-asset="${escapeHtml(parent.id)}" type="button">${escapeHtml(parent.name)}</button></p>` : ""}
          </div>

          <section class="work-command-summary asset-command-summary" aria-label="Equipment summary">
            <button class="command-card ${statusTone}" data-jump-work-section="edit-asset-status-field" type="button">
              <span>Status</span>
              <strong>${escapeHtml(assetStatusLabel(asset.status))}</strong>
              <small>${asset.safety_devices_required === false ? "No safety completion gate" : "Safety check required before completing work"}</small>
            </button>
            <button class="command-card command-equipment" data-jump-work-section="edit-asset-location-field" type="button">
              <span>Location</span>
              <strong>${escapeHtml(locationName)}</strong>
              <small>${asset.location ? escapeHtml(asset.location) : "Area / spot unset"}</small>
            </button>
            <button class="command-card command-owner" data-jump-work-section="edit-asset-parent-field" type="button">
              <span>Primary</span>
              <strong>${escapeHtml(primaryLabel)}</strong>
              <small>${parent ? "Linked under parent equipment" : "Primary / standalone item"}</small>
            </button>
            <button class="command-card command-equipment ${children.length ? "" : "empty"}" data-jump-work-section="asset-linked-equipment-target" type="button">
              <span>Sub Equipment</span>
              <strong>${children.length}</strong>
              <small>${children.length ? "Linked child items" : "No linked child equipment"}</small>
            </button>
            <button class="command-card command-parts ${linkedParts.length ? "" : "empty"}" data-jump-work-section="asset-linked-parts-target" type="button">
              <span>Parts</span>
              <strong>${linkedParts.length}</strong>
              <small>${linkedParts.length ? "Recommended/common parts linked" : "No linked parts yet"}</small>
            </button>
            <button class="command-card status-open ${openWork.length ? "" : "empty"}" data-jump-work-section="asset-open-work-target" type="button">
              <span>Open Work</span>
              <strong>${openWork.length}</strong>
              <small>${openWork.length ? "Active work tied to this equipment" : "No open work"}</small>
            </button>
            <button class="command-card command-photo ${assetDocuments.length ? "" : "empty"}" data-jump-work-section="asset-documents-target" type="button">
              <span>Files</span>
              <strong>${assetDocuments.length}</strong>
              <small>${assetDocuments.length ? "Machine files on record" : "No machine files yet"}</small>
            </button>
          </section>

          <section class="equipment-structure-guide" aria-label="Equipment structure guide">
            <div class="guide-header">
              <span class="guide-kicker">Structure Guide</span>
              <strong>How to model a line, sub-assembly, tooling, and parts</strong>
            </div>
            <div class="equipment-structure-grid">
              <article>
                <span>Machine / Line</span>
                <strong>Whole operational asset</strong>
                <p>Use for the progressive roll former, ASC line, folder, press, or machine people open work against.</p>
              </article>
              <article>
                <span>Sub-assembly</span>
                <strong>Major functional section</strong>
                <p>Use for uncoiler, forming section, shear, HPU, controls cabinet, conveyor, or safety circuit.</p>
              </article>
              <article>
                <span>Tooling / Setup</span>
                <strong>Swappable profile or station setup</strong>
                <p>Use for roll tooling sets, die sets, profile setups, or station tooling worth tracking separately.</p>
              </article>
              <article>
                <span>Component / Part</span>
                <strong>Replaceable item</strong>
                <p>Use linked parts for bearings, sensors, VFDs, cylinders, valves, spacers, and common spares.</p>
              </article>
            </div>
            <p class="guide-note"><strong>Roll former rule:</strong> a station is usually a position. Track it as tooling/setup only when the roll set, adjustment, serial, PM, or recurring defect needs its own history.</p>
          </section>

          <div class="quick-actions detail-quick-actions">
            <button class="assign-action" data-quick-fix-asset="${asset.id}" type="button">Quick Fix for this equipment</button>
          </div>

          <section class="relationship-detail photo asset-photo-panel" id="asset-documents-target">
            <div class="panel-header compact">
              <h3>Machine Files</h3>
              <span>${assetDocuments.length} file${assetDocuments.length === 1 ? "" : "s"}</span>
            </div>
            <form class="form-grid asset-photo-form relationship-detail photo" data-asset-document="${escapeHtml(asset.id)}">
              <label>File type
                <select name="document_type">
                  <option value="machine_photo">Machine photo</option>
                  <option value="schematic">Schematic / print</option>
                  <option value="settings">Settings / parameters</option>
                  <option value="manual">Manual / cut sheet</option>
                  <option value="nameplate">Nameplate photo</option>
                  <option value="inspection">Inspection reference</option>
                  <option value="receipt">Receipt / invoice</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>Attach file<input name="document" type="file" accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx" capture="environment"></label>
              <p class="error-text" data-asset-document-error="${escapeHtml(asset.id)}">${assetDocumentsReady ? "" : "Run supabase/step-next-asset-documents.sql before uploading equipment files."}</p>
              <button class="secondary-button asset-action-button" type="submit" ${assetDocumentsReady ? "" : "disabled"}>Attach Machine File</button>
            </form>
            <div class="asset-file-list">
              ${assetDocuments.map((document) => `
                <details class="asset-file-item">
                  <summary>
                    <span class="asset-file-thumb ${String(document.content_type || "").startsWith("image/") ? "" : "document-file"}">
                      ${String(document.content_type || "").startsWith("image/") && document.signedUrl ? `<img src="${escapeHtml(document.signedUrl)}" alt="${escapeHtml(document.original_file_name || document.file_name || asset.name)}">` : `<strong>${escapeHtml(assetDocumentTypeLabel(document.document_type))}</strong>`}
                    </span>
                    <span class="asset-file-title">
                      <strong>${escapeHtml(assetDocumentTypeLabel(document.document_type))}</strong>
                      <span>${escapeHtml(document.original_file_name || document.file_name || "Machine file")}</span>
                    </span>
                    <span class="asset-file-action">Open</span>
                  </summary>
                  <div class="asset-file-preview">
                    ${String(document.content_type || "").startsWith("image/") && document.signedUrl ? `<img src="${escapeHtml(document.signedUrl)}" alt="${escapeHtml(document.original_file_name || document.file_name || asset.name)}">` : `<div class="asset-file-document-preview">${escapeHtml(assetDocumentTypeLabel(document.document_type))}</div>`}
                    <div class="asset-file-meta">
                      <span>${escapeHtml(document.content_type || "file")}</span>
                      <a class="secondary-button" href="${escapeHtml(document.signedUrl || "#")}" target="_blank" rel="noreferrer">Open File</a>
                    </div>
                  </div>
                </details>
              `).join("") || `<p class="muted">No photos, schematics, settings, manuals, nameplates, or receipts uploaded yet.</p>`}
            </div>
          </section>

          <form class="form-grid" id="edit-asset-form">
            <label>Equipment name<input name="name" required value="${escapeHtml(asset.name)}"></label>
            <label>Equipment ID<input name="asset_code" value="${escapeHtml(asset.asset_code || "")}"></label>
            <label>Type
              <select name="asset_type">
                ${ASSET_TYPE_OPTIONS.map((type) => `<option value="${type}" ${type === (asset.asset_type || "machine") ? "selected" : ""}>${assetTypeLabel(type)}</option>`).join("")}
              </select>
            </label>
            <label id="edit-asset-parent-field">Part of
              <select name="parent_asset_id">
                <option value="">Top level equipment</option>
                ${renderParentAssetOptions(asset.parent_asset_id || "", asset.id)}
              </select>
            </label>
            <label id="edit-asset-location-field">Location
              <select name="location_id" ${locations.length ? "" : "disabled"}>
                ${renderLocationOptions(asset.location_id || activeLocationId)}
              </select>
            </label>
            <label>Area / spot<input name="location" value="${escapeHtml(asset.location || "")}"></label>
            <label id="edit-asset-status-field">Status
              <select name="status">
                ${["running", "watch", "degraded", "offline"].map((status) => `<option value="${status}" ${status === asset.status ? "selected" : ""}>${assetStatusLabel(status)}</option>`).join("")}
              </select>
            </label>
            <label class="check-row safety-check-toggle"><input name="safety_devices_required" type="checkbox" ${asset.safety_devices_required === false ? "" : "checked"}> Safety devices required before completion</label>
            <p class="error-text" id="asset-edit-error"></p>
            <button class="secondary-button asset-action-button" type="submit">Save Equipment</button>
          </form>

          <section id="asset-linked-equipment-target">
            <h3>Linked Equipment</h3>
            <div class="mini-list asset-link-list">
              ${children.map((child) => `
                <article class="mini-work-order" data-open-asset="${escapeHtml(child.id)}">
                  <strong>${escapeHtml(child.name)}</strong>
                  <span>${escapeHtml(assetTypeLabel(child.asset_type))} - ${escapeHtml(assetStatusLabel(child.status))}</span>
                </article>
              `).join("") || `<p class="muted">No equipment is linked under this item yet.</p>`}
            </div>
          </section>

          <section id="asset-open-work-target">
            <h3>Open Work</h3>
            <div class="mini-list">
              ${openWork.map(renderAssetMiniWorkOrder).join("") || `<p class="muted">No open work for this equipment.</p>`}
            </div>
          </section>

          <section>
            <h3>Completed History</h3>
            <div class="mini-list">
              ${completedWork.map(renderAssetMiniWorkOrder).join("") || `<p class="muted">No completed work yet.</p>`}
            </div>
          </section>

          <section>
            <h3>PM Schedules</h3>
            <div class="mini-list">
              ${assetSchedules.map((schedule) => `<article><strong>${escapeHtml(schedule.title)}</strong><span>${schedule.frequency} - next due ${schedule.next_due_at}</span></article>`).join("") || `<p class="muted">No PM schedules for this equipment.</p>`}
            </div>
          </section>

          <section id="asset-linked-parts-target">
            <h3>Linked Parts</h3>
            ${assetPartsReady ? `
              <form class="inline-form equipment-part-form relationship-detail parts" data-attach-asset-part="${escapeHtml(asset.id)}">
                <label>Part
                  <select name="part_id" ${attachableParts.length ? "" : "disabled"}>
                    <option value="">Select part</option>
                    ${attachableParts.map((part) => `<option value="${escapeHtml(part.id)}">${escapeHtml(part.name)}${part.sku ? ` - ${escapeHtml(part.sku)}` : ""}</option>`).join("")}
                  </select>
                </label>
                <label>Recommended qty<input name="quantity_recommended" type="number" min="1" step="1" value="1"></label>
                <label>Note<input name="note" maxlength="180" placeholder="Filter, belt, seal, common spare..."></label>
                <button class="secondary-button asset-action-button" type="submit" ${attachableParts.length ? "" : "disabled"}>Attach Part</button>
              </form>
              <p class="error-text" data-asset-part-error="${escapeHtml(asset.id)}"></p>
              <div class="mini-list">
                ${linkedParts.map((row) => `<article>
                  <strong>${escapeHtml(row.parts?.name || "Part")}</strong>
                  <span>${escapeHtml(row.parts?.sku || "No SKU")} - recommended qty ${escapeHtml(row.quantity_recommended || 1)}${row.note ? ` - ${escapeHtml(row.note)}` : ""}</span>
                  <button class="text-button danger-link" data-remove-asset-part="${escapeHtml(row.id)}" type="button">Remove Link</button>
                </article>`).join("") || `<p class="muted">No parts are linked to this equipment yet.</p>`}
              </div>
            ` : `<p class="muted">Run supabase/step-next-asset-parts.sql to link parts directly to equipment.</p>`}
          </section>

          <section>
            <h3>Parts Used History</h3>
            <div class="mini-list">
              ${usedParts.map((row) => `<article><strong>${escapeHtml(row.parts?.name || "Part")}</strong><span>${row.quantity_used} used</span></article>`).join("") || `<p class="muted">No parts history yet.</p>`}
            </div>
          </section>

          ${renderAssetDangerZone(asset)}
        </div>
      `;
    }

    function renderAssetDangerZone(asset) {
      const workOrders = deps.getWorkOrders();
      const preventiveSchedules = deps.getPreventiveSchedules();
      const assets = deps.getAssets();
      const activeAssetId = deps.getActiveAssetId();
      const assetWorkOrderCount = workOrders.filter((workOrder) => workOrder.asset_id === asset.id).length;
      const scheduleCount = preventiveSchedules.filter((schedule) => schedule.asset_id === asset.id).length;
      const childCount = assets.filter((item) => item.parent_asset_id === asset.id).length;
      const requestCount = deps.getMaintenanceRequests().filter((request) => request.asset_id === asset.id).length;
      const blockerMessage = assetDeleteBlockerMessage({
        workOrders: assetWorkOrderCount,
        children: childCount,
        schedules: scheduleCount,
        requests: requestCount,
      });
      const confirming = deps.getPendingDeleteAssetId() === activeAssetId;
      if (!canDeleteEquipment()) {
        return `<p class="muted">Admins and managers can delete unused equipment.</p>`;
      }

      return `
        <section class="delete-zone asset-delete-zone">
          <div>
            <h3>Delete Equipment</h3>
            <p>${blockerMessage
              ? blockerMessage
              : `This permanently removes "${escapeHtml(asset.name)}" from the equipment list.`}</p>
          </div>
          <p class="error-text" id="asset-delete-error"></p>
          ${blockerMessage ? `
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          ` : confirming ? `
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${escapeHtml(asset.name)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-asset type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-asset="${escapeHtml(asset.id)}" type="button">Permanently Delete</button>
              </div>
            </div>
          ` : `
            <button class="danger-action-button large-delete-button" data-delete-asset="${escapeHtml(asset.id)}" type="button">Delete Equipment</button>
          `}
        </section>
      `;
    }

    function assetDocumentTypeLabel(type) {
      return {
        machine_photo: "Photo",
        schematic: "Schematic",
        settings: "Settings",
        manual: "Manual",
        nameplate: "Nameplate",
        inspection: "Inspection",
        receipt: "Receipt",
        other: "File",
      }[type] || "File";
    }


    return { renderAssetDetail };
  }

  window.MaintainOpsAssetDetailDisplay = {
    createAssetDetailDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createAssetDetailDisplayHelpers };
  }
})();
