(function () {
  /*
   * Module contract: renders Create Work Order form markup and existing contracts only.
   * Dependencies are injected from app.js so this module does not own app state,
   * bind events, build submit payloads, mutate records, call Supabase, touch auth/session
   * startup, storage/photo flows, public QR submit, SQL, or RLS.
   */
  function createCreateWorkOrderDisplayHelpers(deps = {}) {
    const {
      STATUS_OPTIONS = [],
      TYPE_OPTIONS = [],
      renderAssetOptions,
      statusLabel,
      workOrderTypeLabel = (type) => String(type || "corrective").replace(/\b\w/g, (letter) => letter.toUpperCase()),
      renderAssignmentSelect,
      renderProcedureOptions,
      escapeHtml,
    } = deps;

    function todayDateValue() {
      const now = new Date();
      const local = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
      return local.toISOString().slice(0, 10);
    }

    function renderCreateWorkOrder() {
          const parts = deps.getParts();
      return `
        <form class="form-grid create-work-order-template relationship-detail asset" id="create-work-order-form">
          <div>
            <h3>Create Work Order</h3>
            <p class="muted">Build a complete work order step by step.</p>
          </div>
    
          <div class="form-section-title">1. What needs attention?</div>
          <label>Title<input name="title" required placeholder="Inspect packaging line sensor"></label>
          <label>Description<textarea name="description" rows="2" placeholder="What is happening, where, and what should be checked?"></textarea></label>
          <fieldset class="equipment-choice" data-equipment-choice>
            <legend>Machine / equipment</legend>
            <div class="equipment-choice-modes" role="radiogroup" aria-label="Choose existing or new equipment">
              <label class="equipment-choice-mode active"><input name="equipment_choice_mode" type="radio" value="existing" data-equipment-choice-mode checked> Existing equipment</label>
              <label class="equipment-choice-mode"><input name="equipment_choice_mode" type="radio" value="new" data-equipment-choice-mode> Create new equipment</label>
            </div>
            <div data-equipment-choice-panel="existing">
              <label>Existing machine / equipment
                <select name="asset_id" data-location-sensitive-asset data-equipment-choice-existing>
                  <option value="">No machine / equipment - general item or area</option>
                  ${renderAssetOptions()}
                </select>
              </label>
            </div>
            <div data-equipment-choice-panel="new" hidden>
              <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Roll Former 3" disabled></label>
            </div>
          </fieldset>
          <p class="error-text" data-asset-location-warning></p>
    
          <details class="quick-fix-more" open>
            <summary>2. Priority and timing</summary>
            <div class="form-grid">
              <label>Status
                <select name="status">
                  ${STATUS_OPTIONS.map((status) => `<option value="${status}" ${status === "open" ? "selected" : ""}>${statusLabel(status)}</option>`).join("")}
                </select>
              </label>
              <label>Priority
                <select name="priority">
                  <option>medium</option>
                  <option>high</option>
                  <option>critical</option>
                  <option>low</option>
                </select>
              </label>
              <label>Work type
                <select name="type">
                  ${TYPE_OPTIONS.map((type) => `<option value="${type}">${workOrderTypeLabel(type)}</option>`).join("")}
                </select>
              </label>
              <label>Complete by / due date
                <span class="date-picker-row" data-date-picker-field>
                  <input name="due_at" type="date" value="${todayDateValue()}">
                  <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
                </span>
                <small>Defaults to today. Use the calendar to choose a different deadline.</small>
              </label>
            </div>
          </details>
    
          <details class="quick-fix-more">
            <summary>3. People and procedure</summary>
            <div class="form-grid">
              <label>Assign to
                <select name="assigned_to">
                  ${renderAssignmentSelect("", { selfLabel: "Assign to me" })}
                </select>
              </label>
              <label>Procedure checklist
                <select name="procedure_template_id">
                  ${renderProcedureOptions()}
                </select>
              </label>
            </div>
          </details>
    
          <details class="quick-fix-more">
            <summary>4. Internal notes and completion</summary>
            <div class="form-grid">
              <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
              <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
              <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
              <label class="check-row safety-check-row"><input name="safety_devices_checked" type="checkbox"> Safety devices identified before completion: E-stops, sensors, guards, and interlocks</label>
              <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="0"></label>
              <label>Completion notes<textarea name="completion_notes" rows="2" placeholder="Final notes if this is already complete."></textarea></label>
            </div>
          </details>
    
          <details class="quick-fix-more">
            <summary>5. Parts, photo, and first comment</summary>
            <div class="form-grid">
              <label>Part used
                <select name="part_id">
                  <option value="">No part used</option>
                  ${parts.map((part) => `<option value="${part.id}">${escapeHtml(part.name)} (${part.quantity_on_hand} on hand)</option>`).join("")}
                </select>
              </label>
              <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
              <label>Photo<input name="photo" type="file" accept="image/*"><small>Optional image only. PDF quotes/documents are attached from equipment or parts. Photos are resized to 768px.</small></label>
              <label>First comment<textarea name="initial_comment" rows="2" placeholder="Add the first update or note for the record."></textarea></label>
            </div>
          </details>
    
          <p class="error-text" id="create-work-order-error"></p>
          <button class="primary-button work-action-button quick-fix-submit" type="submit">Create Work Order</button>
        </form>
      `;
    }

    return { renderCreateWorkOrder };
  }

  window.MaintainOpsCreateWorkOrderDisplay = {
    createCreateWorkOrderDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createCreateWorkOrderDisplayHelpers };
  }
})();
