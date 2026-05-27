(function () {
  /*
   * LFES contract: renders Quick Fix form markup and existing contracts only.
   * Dependencies are injected from app.js so this module does not own app state,
   * bind events, build submit payloads, mutate records, call Supabase, touch auth/session
   * startup, storage/photo flows, public QR submit, SQL, or RLS.
   */
  function createQuickFixDisplayHelpers(deps = {}) {
    const {
      TYPE_OPTIONS = [],
      renderAssetOptions,
      assetLocationRoutingMessage,
      escapeHtml,
      renderAssignmentSelect,
      renderProcedureOptions,
      assetStatusLabel,
    } = deps;

    function renderQuickFixForm() {
          const quickFixAssetId = deps.getQuickFixAssetId();
          const quickFixRequestId = deps.getQuickFixRequestId();
          const maintenanceRequests = deps.getMaintenanceRequests();
          const session = deps.getSession();
          const parts = deps.getParts();
      const selectedAssetId = quickFixAssetId || "";
      const sourceRequest = maintenanceRequests.find((request) => request.id === quickFixRequestId);
      return `
        <form class="form-grid quick-fix-form relationship-detail comment" id="quick-fix-form">
          <div>
            <h3>Quick Fix</h3>
            <p class="muted">Log the issue now. Details can be added later.</p>
          </div>
          ${sourceRequest ? `<p class="completion-note">Resolving request: ${escapeHtml(sourceRequest.title)}</p>` : ""}
          <label>Issue<input name="title" required autofocus placeholder="Loose guard switch fixed" value="${escapeHtml(sourceRequest?.title || "")}"></label>
          <label>Machine / equipment
            <select name="asset_id" data-location-sensitive-asset>
              <option value="">No machine / equipment - general item or area</option>
              ${renderAssetOptions(selectedAssetId || sourceRequest?.asset_id || "")}
            </select>
            <small>Machine or equipment not listed? Add it below.</small>
          </label>
          <p class="error-text" data-asset-location-warning>${escapeHtml(assetLocationRoutingMessage(selectedAssetId || sourceRequest?.asset_id || ""))}</p>
          <label>New machine / equipment name<input name="new_asset_name" placeholder="Packaging Line 2"></label>
          <label>Photo<input name="photo" type="file" accept="image/*" capture="environment"><small>Optional. Photos are optimized up to 2400px before upload.</small></label>
          <label class="check-row"><input name="machine_down" type="checkbox"> Machine is down</label>
          <label class="check-row"><input name="mark_completed" type="checkbox"> Already fixed - mark complete now</label>
          <label class="check-row safety-check-row"><input name="safety_devices_checked" type="checkbox"> Safety devices checked if completing equipment work: E-stops, sensors, guards, and interlocks</label>
          <details class="quick-fix-more">
            <summary>Optional details</summary>
            <div class="form-grid">
              <div class="form-section-title">Work Order Info</div>
              <label>Expected back up / due date<input name="due_at" type="text" inputmode="numeric" placeholder="YYYY-MM-DD"></label>
              <label>Priority
                <select name="priority">
                  ${["medium", "high", "critical", "low"].map((priority) => `<option value="${priority}">${priority}</option>`).join("")}
                </select>
              </label>
              <label>Type
                <select name="type">
                  ${TYPE_OPTIONS.filter((type) => type !== "request").map((type) => `<option value="${type}" ${type === "corrective" ? "selected" : ""}>${type}</option>`).join("")}
                </select>
              </label>
              <label>Assign to
                <select name="assigned_to">
                  ${renderAssignmentSelect(session.user.id, { selfLabel: "Assign to me" })}
                </select>
              </label>
              <label>Procedure
                <select name="procedure_template_id">
                  ${renderProcedureOptions()}
                </select>
              </label>
              <div class="form-section-title">Outcome / Notes</div>
              <label>What did you do?<textarea name="resolution_summary" rows="2" placeholder="Tightened mount, tested switch, line returned to normal."></textarea></label>
              <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="Loose mount, worn part, operator report, unknown...">${escapeHtml(sourceRequest?.description || "")}</textarea></label>
            <label>Equipment status after fix
              <select name="asset_status">
                <option value="">Leave unchanged</option>
                  ${["running", "watch", "degraded", "offline"].map((status) => `<option value="${status}">${assetStatusLabel(status)}</option>`).join("")}
              </select>
            </label>
              <label>Part used
                <select name="part_id">
                  <option value="">No part used</option>
                  ${parts.map((part) => `<option value="${part.id}">${escapeHtml(part.name)} (${part.quantity_on_hand} on hand)</option>`).join("")}
                </select>
              </label>
              <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
              <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            </div>
          </details>
          <p class="error-text" id="quick-fix-error"></p>
          <button class="primary-button quick-fix-submit" type="submit">Log Quick Fix</button>
        </form>
      `;
    }

    return { renderQuickFixForm };
  }

  window.MaintainOpsQuickFixDisplay = {
    createQuickFixDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createQuickFixDisplayHelpers };
  }
})();
