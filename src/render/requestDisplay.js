(function () {
  function createRequestDisplayHelpers(deps) {
    const segmentIcon = deps.segmentIcon;
    const escapeHtml = deps.escapeHtml;
    const renderAssetOptions = deps.renderAssetOptions;
    const renderMaintenanceRequestPhoto = deps.renderMaintenanceRequestPhoto;
    const isConvertedRequest = deps.isConvertedRequest;
    const canDeleteOperationalRecords = deps.canDeleteOperationalRecords;
    const getPendingDeleteRequestId = deps.getPendingDeleteRequestId;
    const getProfilesByUserId = deps.getProfilesByUserId;

    function requestPanelSubtitle(filter, count) {
      if (filter === "converted") return `${count} converted`;
      if (filter === "all") return `${count} total`;
      return `${count} active`;
    }

    function renderRequestFilterBar(counts, selectedFilter, options = {}) {
      const filters = [
        ["active", "Active", counts.active],
        ["converted", "Converted", counts.converted],
        ["all", "All", counts.all],
      ];
      return `
        <div class="segmented-control request-filter-bar" aria-label="Request filter">
          ${filters.map(([id, label, count]) => `
            <button class="segment ${selectedFilter === id ? "active" : ""}" data-request-filter="${id}" type="button" ${options.locked && id !== "active" ? "disabled" : ""}>
              ${segmentIcon(id === "active" ? "open" : id === "converted" ? "completed" : "all")}${label} <span>${count}</span>
            </button>
          `).join("")}
        </div>
      `;
    }

    function renderMaintenanceRequest(request) {
      const converted = isConvertedRequest(request);
      const confirming = getPendingDeleteRequestId() === request.id;
      const profilesByUserId = getProfilesByUserId();
      const deleteControls = canDeleteOperationalRecords() ? confirming ? `
        <button class="secondary-button" data-cancel-delete-request type="button">Cancel</button>
        <button class="danger-action-button confirm-delete-button" data-confirm-delete-request="${escapeHtml(request.id)}" type="button">Permanently Delete</button>
      ` : `
        <button class="danger-action-button" data-delete-request="${escapeHtml(request.id)}" type="button">Delete</button>
      ` : "";
      return `
        <article class="request-card ${converted ? "converted-request" : "active-request"}">
          <div class="request-card-main">
            <div class="chip-row">
              <span class="chip ${request.priority}">${escapeHtml(request.priority)}</span>
              <span class="chip ${converted ? "completed" : "open"}">${converted ? "converted" : escapeHtml(request.status)}</span>
            </div>
            <h3>${escapeHtml(request.title)}</h3>
            <p>${escapeHtml(request.description || "No description.")}</p>
            ${renderMaintenanceRequestPhoto(request)}
            <div class="meta-row">
              <span>${escapeHtml(request.assets?.name || request.locations?.name || "No equipment")}</span>
              <span>${escapeHtml(request.requested_by_name || profilesByUserId[request.requested_by]?.full_name || "Requester")}</span>
              <span>${new Date(request.created_at).toLocaleString()}</span>
            </div>
          </div>
          ${!converted && request.status === "submitted" ? `
            <div class="request-actions">
              <button class="secondary-button request-action-button" data-quick-fix-request="${request.id}" type="button">Quick Fix</button>
              <button class="secondary-button work-action-button" data-convert-request="${request.id}" type="button">Convert to Work Order</button>
              ${deleteControls}
            </div>
          ` : `
            <div class="request-actions request-converted-note">
              <span>Converted to work order</span>
              ${deleteControls}
            </div>
          `}
        </article>
      `;
    }

    function renderRequestFormContent() {
      return `
        <form class="form-grid" id="request-form">
          <label>Request title<input name="title" required placeholder="Cold room door not sealing"></label>
          <label>Your name<input name="requester_name" required maxlength="120" placeholder="Who is submitting this?"></label>
          <label>Machine / area<input name="equipment_note" required maxlength="140" placeholder="Roll former 1, saw area, aisle 3"></label>
          <label>Details<textarea name="description" rows="4" required placeholder="What is happening? Any noise, leak, jam, alarm, or safety concern?"></textarea></label>
          <label>Photo<input name="photo" type="file" accept="image/*" capture="environment"><small>Optional. Photos are optimized up to 2400px before upload.</small></label>
          <label>Link to saved equipment
            <select name="asset_id" data-location-sensitive-asset>
              <option value="">No saved equipment link</option>
              ${renderAssetOptions()}
            </select>
          </label>
          <p class="error-text" data-asset-location-warning></p>
          <label>Priority
            <select name="priority">
              <option>medium</option>
              <option>high</option>
              <option>critical</option>
              <option>low</option>
            </select>
          </label>
          <p class="error-text" id="request-error"></p>
          <button class="primary-button request-action-button" type="submit">Submit Request</button>
        </form>
      `;
    }

    return {
      requestPanelSubtitle,
      renderRequestFilterBar,
      renderMaintenanceRequest,
      renderRequestFormContent,
    };
  }

  window.MaintainOpsRequestDisplay = {
    createRequestDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createRequestDisplayHelpers };
  }
})();
