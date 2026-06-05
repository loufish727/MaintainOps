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
      renderAssetAreaOptions,
      assetStatusLabel,
      renderAssetMiniWorkOrder,
      assetDeleteBlockerMessage,
      canDeleteEquipment,
      renderEquipmentStructureGuide,
      renderProcedureOptions,
    } = deps;

    function renderAssetDetail() {
      const assets = deps.getAssets();
      const activeAssetId = deps.getActiveAssetId();
      const asset = assets.find((item) => item.id === activeAssetId);
      if (!asset) return renderCreateWorkOrder();
      if (typeof deps.ensureAssetDocumentSignedUrls === "function") deps.ensureAssetDocumentSignedUrls(asset.id);
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
      const openWork = assetWorkOrders
        .filter((workOrder) => workOrder.status !== "completed")
        .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
      const completedWork = assetWorkOrders
        .filter((workOrder) => workOrder.status === "completed")
        .sort((a, b) => new Date(b.completed_at || b.created_at || 0) - new Date(a.completed_at || a.created_at || 0));
      const assetSchedules = preventiveSchedules.filter((schedule) => schedule.asset_id === asset.id);
      const usedParts = Object.values(partsUsedByWorkOrder)
        .flat()
        .filter((row) => assetWorkOrders.some((workOrder) => workOrder.id === row.work_order_id));
      const linkedParts = assetParts.filter((row) => row.asset_id === asset.id);
      const linkedPartIds = new Set(linkedParts.map((row) => row.part_id));
      const attachableParts = parts.filter((part) => !linkedPartIds.has(part.id));
      const pageSize = deps.LIST_ITEMS_PER_PAGE || 12;
      const relationOpen = (section) => deps.getAssetRelationshipOpen?.(asset.id, section) || false;
      const relationPage = (section, total) => Math.min(
        Math.max(1, deps.getAssetRelationshipPage?.(asset.id, section) || 1),
        Math.max(1, Math.ceil(total / pageSize))
      );
      const pageRows = (rows, section) => {
        const page = relationPage(section, rows.length);
        return rows.slice((page - 1) * pageSize, page * pageSize);
      };
      const relationPagination = (section, total) => {
        if (total <= pageSize) return "";
        const page = relationPage(section, total);
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        const firstShown = ((page - 1) * pageSize) + 1;
        const lastShown = Math.min(total, page * pageSize);
        return `
          <div class="pagination-bar">
            <button class="secondary-button page-action-button" data-asset-relation-page="prev" data-asset-id="${escapeHtml(asset.id)}" data-asset-relation-section="${escapeHtml(section)}" type="button" ${page <= 1 ? "disabled" : ""}>Previous</button>
            <span>Showing ${firstShown}-${lastShown} of ${total} - Page ${page} of ${totalPages}</span>
            <button class="secondary-button page-action-button" data-asset-relation-page="next" data-asset-id="${escapeHtml(asset.id)}" data-asset-relation-section="${escapeHtml(section)}" type="button" ${page >= totalPages ? "disabled" : ""}>Next</button>
          </div>
        `;
      };
      const relationshipDetailsAttrs = (section) => `class="asset-relationship-panel relationship-detail comment" data-asset-relationship-section="${escapeHtml(section)}" data-asset-id="${escapeHtml(asset.id)}" ${relationOpen(section) ? "open" : ""}`;
      const locationName = locations.find((location) => location.id === asset.location_id)?.name || asset.location || "No location set";
      const primaryLabel = parent ? parent.name : "Top level equipment";
      const statusTone = asset.status === "offline"
        ? "status-blocked"
        : asset.status === "degraded"
          ? "status-open"
          : asset.status === "watch"
            ? "status-in_progress"
            : "status-completed";
      const degradedWithoutOpenWork = asset.status === "degraded" && openWork.length === 0;

      return `
        <div class="detail-stack">
          <div>
            <div class="chip-row">
              <span class="chip asset-${asset.status}">${escapeHtml(assetStatusLabel(asset.status))}</span>
              <span class="chip">${escapeHtml(assetTypeLabel(asset.asset_type))}</span>
              ${asset.asset_code ? `<span class="chip">${escapeHtml(asset.asset_code)}</span>` : ""}
              ${asset.safety_devices_required === false ? `<span class="safety-check-note disabled">no safety devices identified</span>` : `<span class="safety-check-note">safety devices identified</span>`}
            </div>
            <h2>${escapeHtml(asset.name)}</h2>
            <p>${escapeHtml(asset.location || "No location set")}</p>
            ${parent ? `<p>Part of <button class="text-button inline-link-button" data-open-asset="${escapeHtml(parent.id)}" type="button">${escapeHtml(parent.name)}</button></p>` : ""}
          </div>

          <section class="work-command-summary asset-command-summary" id="equipment-action-cards" aria-label="Equipment summary">
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

          <section class="equipment-status-guide" aria-label="Equipment status guide">
            <div><strong>Watch</strong><span>Monitor for a possible issue.</span></div>
            <div><strong>Degraded</strong><span>Known issue, still usable.</span></div>
            <div><strong>Offline / Down</strong><span>Do not count on this equipment.</span></div>
          </section>

          ${degradedWithoutOpenWork ? `
            <section class="equipment-status-nudge degraded" aria-label="Degraded equipment follow-up">
              <strong>Degraded needs a reason</strong>
              <p>This equipment is marked degraded but has no open work tied to it. Create or attach a work order so the condition is traceable.</p>
              <button class="secondary-button" data-quick-fix-asset="${escapeHtml(asset.id)}" type="button">Create Work for Degraded Condition</button>
            </section>
          ` : ""}

          ${renderEquipmentStructureGuide ? renderEquipmentStructureGuide() : ""}

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
              <label>Attach file<input name="document" type="file" accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx"><small>Images are optimized. Non-image files over 2 MB are blocked until large-file storage is enabled.</small></label>
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
                      <button class="text-button danger-link" data-delete-asset-document="${escapeHtml(document.id)}" data-asset-document-path="${escapeHtml(document.storage_path || "")}" type="button">Delete File</button>
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
            <label>Area / spot
              <select name="location_existing">
                <option value="">Area / spot unset</option>
                ${renderAssetAreaOptions(asset.location || "")}
              </select>
            </label>
            <label>New area / spot<input name="location_new" placeholder="Use only when this is a new area"></label>
            <label id="edit-asset-status-field">Status
              <select name="status">
                ${["running", "watch", "degraded", "offline"].map((status) => `<option value="${status}" ${status === asset.status ? "selected" : ""}>${assetStatusLabel(status)}</option>`).join("")}
              </select>
            </label>
            <label class="check-row safety-check-toggle"><input name="safety_devices_required" type="checkbox" ${asset.safety_devices_required === false ? "" : "checked"}> Safety devices required before completion</label>
            <p class="error-text" id="asset-edit-error"></p>
            <button class="secondary-button asset-action-button" type="submit">Save Equipment</button>
          </form>

          <section class="asset-relationship-panel relationship-detail asset" id="asset-linked-equipment-target">
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

          <details ${relationshipDetailsAttrs("open-work")} id="asset-open-work-target">
            <summary>Open Work <span>${openWork.length}</span></summary>
            <div class="mini-list">
              ${relationOpen("open-work")
                ? pageRows(openWork, "open-work").map(renderAssetMiniWorkOrder).join("") || `<p class="muted">No open work for this equipment.</p>`
                : `<p class="muted">Open this section to load and review active work for this equipment.</p>`}
            </div>
            ${relationOpen("open-work") ? relationPagination("open-work", openWork.length) : ""}
          </details>

          <details ${relationshipDetailsAttrs("completed-history")}>
            <summary>Completed History <span>${completedWork.length}</span></summary>
            <div class="mini-list">
              ${relationOpen("completed-history")
                ? pageRows(completedWork, "completed-history").map(renderAssetMiniWorkOrder).join("") || `<p class="muted">No completed work yet.</p>`
                : `<p class="muted">Open this section to load completed work history for this equipment.</p>`}
            </div>
            ${relationOpen("completed-history") ? relationPagination("completed-history", completedWork.length) : ""}
          </details>

          <section class="asset-relationship-panel relationship-detail procedure">
            <div class="panel-header compact">
              <h3>PM Schedules</h3>
              <div class="panel-header-actions">
                <span>${assetSchedules.length} schedule${assetSchedules.length === 1 ? "" : "s"}</span>
                <button class="secondary-button asset-action-button" data-section="pm" type="button">Go to PM</button>
              </div>
            </div>
            <form class="inline-form pm-form relationship-detail maintenance" data-create-pm-form data-equipment-pm-form="${escapeHtml(asset.id)}">
              <input name="title" required placeholder="PM for ${escapeHtml(asset.name)}">
              <input name="asset_id" type="hidden" value="${escapeHtml(asset.id)}">
              <select name="frequency">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
              <select name="procedure_template_id">
                ${renderProcedureOptions ? renderProcedureOptions() : `<option value="">No procedure checklist</option>`}
              </select>
              <input name="next_due_at" type="date" required>
              <p class="error-text" data-pm-error></p>
              <button class="secondary-button asset-action-button" type="submit">Add Schedule</button>
            </form>
            <div class="mini-list">
              ${assetSchedules.map((schedule) => `<article><strong>${escapeHtml(schedule.title)}</strong><span>${schedule.frequency} - next due ${schedule.next_due_at}</span></article>`).join("") || `<p class="muted">No PM schedules for this equipment.</p>`}
            </div>
          </section>

          <details class="asset-relationship-panel relationship-detail parts" id="asset-linked-parts-target" data-asset-relationship-section="linked-parts" data-asset-id="${escapeHtml(asset.id)}" ${relationOpen("linked-parts") ? "open" : ""}>
            <summary>Linked Parts <span>${linkedParts.length}</span></summary>
            <div class="panel-header compact">
              <button class="secondary-button asset-action-button" data-section="parts" type="button">Go to Parts</button>
            </div>
            ${relationOpen("linked-parts") && assetPartsReady ? `
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
                ${pageRows(linkedParts, "linked-parts").map((row) => `<article>
                  <strong>${escapeHtml(row.parts?.name || "Part")}</strong>
                  <span>${escapeHtml(row.parts?.sku || "No SKU")} - recommended qty ${escapeHtml(row.quantity_recommended || 1)}${row.note ? ` - ${escapeHtml(row.note)}` : ""}</span>
                  <button class="text-button danger-link" data-remove-asset-part="${escapeHtml(row.id)}" type="button">Remove Link</button>
                </article>`).join("") || `<p class="muted">No parts are linked to this equipment yet.</p>`}
              </div>
              ${relationPagination("linked-parts", linkedParts.length)}
            ` : assetPartsReady ? `<p class="muted">Open this section to review or attach linked parts for this equipment.</p>` : `<p class="muted">Run supabase/step-next-asset-parts.sql to link parts directly to equipment.</p>`}
          </details>

          <details class="asset-relationship-panel relationship-detail parts" data-asset-relationship-section="parts-used" data-asset-id="${escapeHtml(asset.id)}" ${relationOpen("parts-used") ? "open" : ""}>
            <summary>Parts Used History <span>${usedParts.length}</span></summary>
            <div class="mini-list">
              ${relationOpen("parts-used")
                ? pageRows(usedParts, "parts-used").map((row) => `<article><strong>${escapeHtml(row.parts?.name || "Part")}</strong><span>${row.quantity_used} used</span></article>`).join("") || `<p class="muted">No parts history yet.</p>`
                : `<p class="muted">Open this section to load parts used history for this equipment.</p>`}
            </div>
            ${relationOpen("parts-used") ? relationPagination("parts-used", usedParts.length) : ""}
          </details>

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
