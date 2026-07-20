(function () {
  function createRequestDisplayHelpers(deps) {
    const segmentIcon = deps.segmentIcon;
    const escapeHtml = deps.escapeHtml;
    const renderAssetOptions = deps.renderAssetOptions;
    const renderMaintenanceRequestPhoto = deps.renderMaintenanceRequestPhoto;
    const isConvertedRequest = deps.isConvertedRequest;
    const canDeleteOperationalRecords = deps.canDeleteOperationalRecords;
    const canEditOperationalRecords = deps.canEditOperationalRecords || (() => true);
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
      const canEditOperational = canEditOperationalRecords();
      const confirming = getPendingDeleteRequestId() === request.id;
      const profilesByUserId = getProfilesByUserId();
      const requestedAt = request.created_at ? new Date(request.created_at) : null;
      const requestedAtLabel = requestedAt && !Number.isNaN(requestedAt.getTime()) ? requestedAt.toLocaleString() : "date unavailable";
      const equipmentLabel = request.assets?.name || request.locations?.name || "No equipment";
      const requesterLabel = request.requested_by_name || profilesByUserId[request.requested_by]?.full_name || "Requester";
      const converterId = request.converted_by || request.reviewed_by || "";
      const converterLabel = profilesByUserId[converterId]?.full_name || "";
      const conversionLabel = converterLabel
        ? `Converted to work order by ${converterLabel}`
        : converterId
          ? "Converted to work order; converter name unavailable"
          : "Converted to work order; converter not recorded";
      const deleteControls = canEditOperational && canDeleteOperationalRecords() ? confirming ? `
        <button class="secondary-button" data-cancel-delete-request type="button">Cancel</button>
        <button class="danger-action-button confirm-delete-button" data-confirm-delete-request="${escapeHtml(request.id)}" type="button">Permanently Delete</button>
      ` : `
        <button class="danger-action-button" data-delete-request="${escapeHtml(request.id)}" type="button">Delete</button>
      ` : "";
      return `
        <article class="request-card ${converted ? "converted-request" : "active-request"}">
          <div class="request-card-main">
            <div class="request-card-header">
              <div class="chip-row">
                <span class="chip ${request.priority}">${escapeHtml(request.priority)}</span>
                <span class="chip ${converted ? "completed" : "open"}">${converted ? "converted" : escapeHtml(request.status)}</span>
              </div>
              <span class="request-source-pill">Public intake</span>
            </div>
            <h3>${escapeHtml(request.title)}</h3>
            <p>${escapeHtml(request.description || "No description.")}</p>
            ${renderMaintenanceRequestPhoto(request)}
            <div class="meta-row">
              <span><strong>Machine / area</strong>${escapeHtml(equipmentLabel)}</span>
              <span><strong>Requester</strong>${escapeHtml(requesterLabel)}</span>
              <span><strong>Received</strong>${escapeHtml(requestedAtLabel)}</span>
            </div>
          </div>
          ${canEditOperational && !converted && request.status === "submitted" ? `
            <div class="request-actions">
              <button class="secondary-button request-action-button" data-quick-fix-request="${request.id}" type="button">Quick Fix</button>
              <button class="secondary-button work-action-button" data-convert-request="${request.id}" type="button">Convert to Work Order</button>
              ${deleteControls}
            </div>
          ` : converted ? `
            <div class="request-actions request-converted-note">
              <span>${escapeHtml(conversionLabel)}</span>
              ${deleteControls}
            </div>
          ` : ""}
        </article>
      `;
    }

    function renderRequestFormContent() {
      return `
        <form class="form-grid" id="request-form">
          <label>Request title<input name="title" required placeholder="Cold room door not sealing"></label>
          <label>Your name<input name="requester_name" required maxlength="120" placeholder="Who is submitting this?"></label>
          <fieldset class="equipment-choice request-equipment-choice" data-equipment-choice>
            <legend>Machine / area</legend>
            <div class="equipment-choice-modes" role="radiogroup" aria-label="Choose saved equipment or an unlisted area">
              <label class="equipment-choice-mode"><input name="equipment_choice_mode" type="radio" value="existing" data-equipment-choice-mode> Saved equipment</label>
              <label class="equipment-choice-mode active"><input name="equipment_choice_mode" type="radio" value="new" data-equipment-choice-mode checked> Equipment not listed / general area</label>
            </div>
            <div data-equipment-choice-panel="existing" hidden>
              <label>Saved equipment
                <select name="asset_id" data-location-sensitive-asset data-equipment-choice-existing data-equipment-choice-required="true" disabled>
                  <option value="">Choose saved equipment</option>
                  ${renderAssetOptions()}
                </select>
              </label>
            </div>
            <div data-equipment-choice-panel="new">
              <label>Equipment name or general area<input name="equipment_note" data-equipment-choice-new data-equipment-choice-required="true" required maxlength="140" placeholder="Roll former 1, saw area, aisle 3"></label>
            </div>
          </fieldset>
          <label>Details<textarea name="description" rows="4" required placeholder="What is happening? Any noise, leak, jam, alarm, or safety concern?"></textarea></label>
          <label>Photo<input name="photo" type="file" accept="image/*" capture="environment"><small>Optional image only. PDF quotes/documents are not accepted in this photo box. Photos are resized to 768px.</small></label>
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
