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
      renderAssetDangerZone,
    } = deps;

    function renderAssetDetail() {
      const assets = deps.getAssets();
      const activeAssetId = deps.getActiveAssetId();
      const asset = assets.find((item) => item.id === activeAssetId);
      if (!asset) return renderCreateWorkOrder();
      const workOrders = deps.getWorkOrders();
      const preventiveSchedules = deps.getPreventiveSchedules();
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
    
          <div class="quick-actions detail-quick-actions">
            <button class="assign-action" data-quick-fix-asset="${asset.id}" type="button">Quick Fix for this equipment</button>
          </div>
    
          <form class="form-grid" id="edit-asset-form">
            <label>Equipment name<input name="name" required value="${escapeHtml(asset.name)}"></label>
            <label>Equipment ID<input name="asset_code" value="${escapeHtml(asset.asset_code || "")}"></label>
            <label>Type
              <select name="asset_type">
                ${ASSET_TYPE_OPTIONS.map((type) => `<option value="${type}" ${type === (asset.asset_type || "machine") ? "selected" : ""}>${assetTypeLabel(type)}</option>`).join("")}
              </select>
            </label>
            <label>Part of
              <select name="parent_asset_id">
                <option value="">Top level equipment</option>
                ${renderParentAssetOptions(asset.parent_asset_id || "", asset.id)}
              </select>
            </label>
            <label>Location
              <select name="location_id" ${locations.length ? "" : "disabled"}>
                ${renderLocationOptions(asset.location_id || activeLocationId)}
              </select>
            </label>
            <label>Area / spot<input name="location" value="${escapeHtml(asset.location || "")}"></label>
            <label>Status
              <select name="status">
                ${["running", "watch", "degraded", "offline"].map((status) => `<option value="${status}" ${status === asset.status ? "selected" : ""}>${assetStatusLabel(status)}</option>`).join("")}
              </select>
            </label>
            <label class="check-row safety-check-toggle"><input name="safety_devices_required" type="checkbox" ${asset.safety_devices_required === false ? "" : "checked"}> Safety devices required before completion</label>
            <p class="error-text" id="asset-edit-error"></p>
            <button class="secondary-button asset-action-button" type="submit">Save Equipment</button>
          </form>
    
          <section>
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
    
          <section>
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
    
          <section>
            <h3>Parts Used</h3>
            <div class="mini-list">
              ${usedParts.map((row) => `<article><strong>${escapeHtml(row.parts?.name || "Part")}</strong><span>${row.quantity_used} used</span></article>`).join("") || `<p class="muted">No parts history yet.</p>`}
            </div>
          </section>
    
          ${renderAssetDangerZone(asset)}
        </div>
      `;
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
