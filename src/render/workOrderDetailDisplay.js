(function () {
  /*
   * Module contract: renders Work Order Detail markup and existing data-* contracts only.
   * Dependencies are injected from app.js so this module does not own app state,
   * bind events, mutate records, call Supabase, touch auth/session startup, storage,
   * public QR submit, SQL, or RLS.
   */
  function createWorkOrderDetailDisplayHelpers(deps = {}) {
    const {
      renderMissingWorkOrderDetail,
      partUsageUnitCost,
      buildActivityFeed,
      checklistProgress,
      requiredChecklistProgress,
      escapeHtml,
      cleanWorkOrderDescription,
      renderRelationshipChips,
      renderWorkOrderCommandSummary,
      renderWorkOrderRecommendation,
      statusLabel,
      hasCompletedSafetyDeviceCheck,
      canAssignWorkOrderToMe,
      renderAssetOptions,
      assetLocationRoutingMessage,
      renderWorkOrderAssignmentField,
      requiresSafetyDeviceCheck,
      renderWorkOrderMessages,
      renderProcedureOptions,
      money,
      photoMetaText,
      renderActivityItem,
      canDeleteWorkOrders,
    } = deps;

    function renderChecklistStep(workOrder, step) {
      const result = deps.getStepResultsByWorkOrder()[workOrder.id]?.[step.id];
      const value = result?.value || "";
      const baseAttrs = `data-step-result="${step.id}" data-work-order-id="${workOrder.id}"`;
      let control = `<input ${baseAttrs} value="${escapeHtml(value)}" placeholder="Result">`;

      if (step.response_type === "checkbox") {
        control = `<label class="check-row"><input ${baseAttrs} type="checkbox" ${value === "checked" ? "checked" : ""}> Done</label>`;
      }

      if (step.response_type === "pass_fail") {
        control = `
          <select ${baseAttrs}>
            <option value="">Not checked</option>
            <option value="pass" ${value === "pass" ? "selected" : ""}>Pass</option>
            <option value="fail" ${value === "fail" ? "selected" : ""}>Fail</option>
          </select>
        `;
      }

      if (step.response_type === "number") {
        control = `<input ${baseAttrs} type="number" value="${escapeHtml(value)}" placeholder="Reading">`;
      }

      return `
        <div class="checklist-step relationship-detail procedure">
          <span>${step.position}. ${escapeHtml(step.prompt)} ${step.required ? `<small class="required-mark">Required</small>` : ""}</span>
          ${control}
          ${result?.completed_at ? `<small>Recorded ${new Date(result.completed_at).toLocaleString()}</small>` : ""}
        </div>
      `;
    }

    function renderWorkOrderDangerZone(workOrder) {
      const confirming = deps.getPendingDeleteWorkOrderId() === workOrder.id;
      return `
        <section class="delete-zone">
          <div>
            <h3>Delete Work Order</h3>
            <p>This removes the work order and its linked comments, history, parts used, and photo records.</p>
          </div>
          ${confirming ? `
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${escapeHtml(workOrder.title)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-work-order type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-work-order="${workOrder.id}" type="button">Permanently Delete</button>
              </div>
            </div>
          ` : `
            <button class="danger-action-button large-delete-button" data-delete-work-order="${workOrder.id}" type="button">Delete Work Order</button>
          `}
        </section>
      `;
    }

    function renderWorkOrderDetail() {
      const activeWorkOrderId = deps.getActiveWorkOrderId();
      const workOrders = deps.getWorkOrders();
    const workOrder = workOrders.find((item) => item.id === activeWorkOrderId);
    if (!workOrder) return renderMissingWorkOrderDetail();
    const commentsByWorkOrder = deps.getCommentsByWorkOrder();
    const photosByWorkOrder = deps.getPhotosByWorkOrder();
    const eventsByWorkOrder = deps.getEventsByWorkOrder();
    const partsUsedByWorkOrder = deps.getPartsUsedByWorkOrder();
    const procedureTemplates = deps.getProcedureTemplates();
    const workOrderActionWarningId = deps.getWorkOrderActionWarningId();
    const workOrderActionWarning = deps.getWorkOrderActionWarning();
    const parts = deps.getParts();
    const profilesByUserId = deps.getProfilesByUserId();
    const commentsError = deps.getCommentsError();
    const STATUS_OPTIONS = deps.STATUS_OPTIONS || [];
    const TYPE_OPTIONS = deps.TYPE_OPTIONS || [];
    const comments = commentsByWorkOrder[workOrder.id] || [];
    const photos = photosByWorkOrder[workOrder.id] || [];
    const events = eventsByWorkOrder[workOrder.id] || [];
    const usedParts = partsUsedByWorkOrder[workOrder.id] || [];
    const partsCost = usedParts.reduce((sum, row) => sum + ((Number(row.quantity_used) || 0) * partUsageUnitCost(row)), 0);
    const partsQuantity = usedParts.reduce((sum, row) => sum + (Number(row.quantity_used) || 0), 0);
    const activity = buildActivityFeed(comments, photos, events, usedParts);
    const procedure = procedureTemplates.find((template) => template.id === workOrder.procedure_template_id);
    const progress = procedure ? checklistProgress(workOrder, procedure) : null;
    const requiredProgress = procedure ? requiredChecklistProgress(workOrder, procedure) : null;
  
    return `
      <div class="detail-stack">
        <div>
          <div class="chip-row">
            <span class="chip ${workOrder.priority}">${workOrder.priority}</span>
            <span class="chip">${escapeHtml(workOrder.type || "reactive")}</span>
            <span class="chip ${workOrder.status}">${statusLabel(workOrder.status)}</span>
          </div>
          <h2>${escapeHtml(workOrder.title)}</h2>
          <p>${escapeHtml(cleanWorkOrderDescription(workOrder.description) || "No description.")}</p>
          ${renderRelationshipChips(workOrder)}
          ${workOrder.completed_at ? `<p class="completion-note">Completed ${new Date(workOrder.completed_at).toLocaleString()} · ${workOrder.actual_minutes || 0} min</p>` : ""}
          ${workOrder.asset_id && hasCompletedSafetyDeviceCheck(workOrder) ? `<p class="completion-note">Safety devices checked before completion.</p>` : ""}
          ${workOrder.completion_notes ? `<p>${escapeHtml(workOrder.completion_notes)}</p>` : ""}
        </div>
  
        ${renderWorkOrderCommandSummary(workOrder)}
        ${renderWorkOrderRecommendation(workOrder)}
  
        ${workOrder.completed_at && (workOrder.failure_cause || workOrder.resolution_summary || workOrder.follow_up_needed) ? `
          <div class="outcome-summary">
            <h3>Work Outcome</h3>
            ${workOrder.failure_cause ? `<article><span>Cause</span><strong>${escapeHtml(workOrder.failure_cause)}</strong></article>` : ""}
            ${workOrder.resolution_summary ? `<article><span>Resolution</span><strong>${escapeHtml(workOrder.resolution_summary)}</strong></article>` : ""}
            ${workOrder.follow_up_needed ? `<article class="follow-up"><span>Follow-up</span><strong>Needed</strong></article>` : ""}
          </div>
        ` : ""}
  
        <label>Status
          <select id="status-select">
            ${STATUS_OPTIONS.map((status) => `<option value="${status}" ${status === workOrder.status ? "selected" : ""}>${statusLabel(status)}</option>`).join("")}
          </select>
        </label>
  
        <div class="quick-actions detail-quick-actions">
          ${canAssignWorkOrderToMe(workOrder) ? `<button class="assign-action" data-assign-me="${workOrder.id}" type="button">${workOrder.assigned_to ? "Reassign to me" : "Assign to me"}</button>` : ""}
          ${STATUS_OPTIONS.filter((status) => status !== workOrder.status).map((status) => `
            <button data-quick-status="${status}" data-id="${workOrder.id}" type="button">${statusLabel(status)}</button>
          `).join("")}
        </div>
        ${workOrderActionWarningId === workOrder.id && workOrderActionWarning ? `<p class="error-text action-warning">${escapeHtml(workOrderActionWarning)}</p>` : ""}
  
        <details class="quick-update-panel relationship-detail comment work-detail-section" open>
          <summary>Quick Update</summary>
          <form class="form-grid" id="quick-update-work-order-form">
            <label id="quick-update-issue-field">Issue<input name="title" required value="${escapeHtml(workOrder.title)}"></label>
            <div class="equipment-choice" id="quick-update-equipment-field">
              <label>Machine / equipment
                <select name="asset_id" data-location-sensitive-asset>
                  <option value="">No machine / equipment - general item or area</option>
                  ${renderAssetOptions(workOrder.asset_id || "")}
                </select>
              </label>
              <span>or</span>
              <label>New machine / equipment name<input name="new_asset_name" placeholder="Roll Former 3"></label>
            </div>
            <p class="error-text" data-asset-location-warning>${escapeHtml(assetLocationRoutingMessage(workOrder.asset_id || ""))}</p>
            <label id="quick-update-resolution-field">Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${escapeHtml(workOrder.resolution_summary || "")}</textarea></label>
            <label id="quick-update-due-field">Expected back up / due date<input name="due_at" type="text" inputmode="numeric" placeholder="YYYY-MM-DD" value="${escapeHtml(workOrder.due_at || "")}"></label>
            <label id="quick-update-status-field">Status
              <select name="status">
                ${STATUS_OPTIONS.map((status) => `<option value="${status}" ${status === workOrder.status ? "selected" : ""}>${statusLabel(status)}</option>`).join("")}
              </select>
            </label>
            <label>Priority
              <select name="priority">
                ${["low", "medium", "high", "critical"].map((priority) => `<option value="${priority}" ${priority === workOrder.priority ? "selected" : ""}>${priority}</option>`).join("")}
              </select>
            </label>
            ${renderWorkOrderAssignmentField(workOrder, "quick-update-owner-field")}
            <label id="quick-update-procedure-field">Procedure checklist
              <select name="procedure_template_id">
                ${renderProcedureOptions(workOrder.procedure_template_id || "")}
              </select>
            </label>
            <label class="check-row"><input name="machine_down" type="checkbox" ${workOrder.assets?.status === "offline" ? "checked" : ""}> Machine is down</label>
            ${requiresSafetyDeviceCheck(workOrder) ? (
              `<label class="check-row safety-check-row" id="quick-update-safety-field"><input name="safety_devices_checked" type="checkbox" ${workOrder.safety_devices_checked ? "checked" : ""}> Safety devices checked before completion: E-stops, sensors, guards, and interlocks</label>`
            ) : `<div class="safety-check-row safety-pending-note" id="quick-update-safety-field"><strong>Safety devices</strong><span>No machine / equipment selected, so no equipment safety check is required.</span></div>`}
            <p class="error-text" id="quick-update-error"></p>
            <button class="primary-button quick-fix-submit" type="submit">Save Quick Update</button>
          </form>
        </details>
  
        <div class="downtime-copy relationship-detail asset" id="work-order-email-helper-target">
          <div>
            <h3>Email Helper</h3>
            <p class="muted">Copy a human update for email when this machine/equipment is down or needs attention.</p>
          </div>
          <div class="quick-actions">
            <button class="secondary-button" data-copy-downtime="subject" data-id="${workOrder.id}" type="button">Copy Subject</button>
            <button class="secondary-button" data-copy-downtime="body" data-id="${workOrder.id}" type="button">Copy Email Body</button>
          </div>
        </div>
  
        ${renderWorkOrderMessages(workOrder)}
  
        <details class="work-detail-section relationship-detail asset">
          <summary>Full Work Order Details</summary>
        <form class="form-grid" id="edit-work-order-form">
          <label>Title<input name="title" required value="${escapeHtml(workOrder.title)}"></label>
          <label>Description<textarea name="description" rows="3">${escapeHtml(cleanWorkOrderDescription(workOrder.description) || "")}</textarea></label>
          <label>Due date<input name="due_at" type="text" inputmode="numeric" placeholder="YYYY-MM-DD" value="${escapeHtml(workOrder.due_at || "")}"></label>
          <label>Priority
            <select name="priority">
              ${["low", "medium", "high", "critical"].map((priority) => `<option value="${priority}" ${priority === workOrder.priority ? "selected" : ""}>${priority}</option>`).join("")}
            </select>
          </label>
          <label>Type
            <select name="type">
              ${TYPE_OPTIONS.map((type) => `<option value="${type}" ${type === (workOrder.type || "reactive") ? "selected" : ""}>${type}</option>`).join("")}
            </select>
          </label>
          ${renderWorkOrderAssignmentField(workOrder)}
          <label>Procedure checklist
            <select name="procedure_template_id">
              ${renderProcedureOptions(workOrder.procedure_template_id || "")}
            </select>
          </label>
          <div class="form-section-title">Internal Record</div>
          <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?">${escapeHtml(workOrder.failure_cause || "")}</textarea></label>
          <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${escapeHtml(workOrder.resolution_summary || "")}</textarea></label>
          <label class="check-row"><input name="follow_up_needed" type="checkbox" ${workOrder.follow_up_needed ? "checked" : ""}> Follow-up needed</label>
          ${requiresSafetyDeviceCheck(workOrder) ? `
            <label class="check-row safety-check-row">
              <input name="safety_devices_checked" type="checkbox" ${workOrder.safety_devices_checked ? "checked" : ""}>
              Safety devices checked before completion: E-stops, sensors, guards, and interlocks
            </label>
          ` : ""}
          <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${workOrder.actual_minutes || 0}"></label>
          <p class="error-text" id="work-order-save-error"></p>
          <button class="secondary-button save-work-button" type="submit">Save Work Order</button>
        </form>
        </details>
  
        ${procedure ? `
          <details class="work-detail-section relationship-detail procedure" open>
            <summary>Procedure Checklist</summary>
            <div class="panel-header compact-header">
              <h3>${escapeHtml(procedure.name)}</h3>
              <span>${progress.done} of ${progress.total} complete · required ${requiredProgress.done}/${requiredProgress.total}</span>
            </div>
            <div class="checklist-list">
              ${procedure.procedure_steps.map((step) => renderChecklistStep(workOrder, step)).join("") || `<p class="muted">This procedure has no steps yet.</p>`}
            </div>
          </details>
        ` : ""}
  
        ${workOrder.status !== "completed" ? `
          <details class="work-detail-section completion-section" id="work-order-complete-target">
            <summary>Complete Work</summary>
          <form class="completion-box" id="complete-work-order-form">
            <h3>Complete Work</h3>
            ${requiredProgress?.total ? `<p class="${requiredProgress.done === requiredProgress.total ? "completion-note" : "warning-text"}">Required checklist: ${requiredProgress.done}/${requiredProgress.total}</p>` : ""}
            <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
            <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
            <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${workOrder.actual_minutes || 0}"></label>
            <label>Completion notes<textarea name="completion_notes" rows="3" placeholder="What was fixed? Any follow-up needed?"></textarea></label>
            ${requiresSafetyDeviceCheck(workOrder) ? `
              <label class="check-row safety-check-row">
                <input name="safety_devices_checked" type="checkbox" required ${hasCompletedSafetyDeviceCheck(workOrder) ? "checked" : ""}>
                Safety devices checked and functioning: E-stops, sensors, guards, and interlocks
              </label>
            ` : ""}
            <p class="error-text" id="completion-error"></p>
            <button class="primary-button" type="submit">Complete Work Order</button>
          </form>
          </details>
        ` : ""}
  
        <details class="work-detail-section relationship-detail parts" id="work-order-parts-target">
          <summary>Parts Used</summary>
        <form class="form-grid relationship-detail parts" id="parts-used-form">
          <h3>Parts Used</h3>
          <label>Part
            <select name="part_id" required>
              <option value="">Select part</option>
              ${parts.map((part) => `<option value="${part.id}">${escapeHtml(part.name)} (${part.quantity_on_hand} on hand)</option>`).join("")}
            </select>
          </label>
          <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
          <p class="error-text" id="parts-used-error"></p>
          <button class="secondary-button" type="submit">Record Part Used</button>
        </form>
  
        <div class="parts-used-list">
          ${usedParts.length ? `<article class="parts-used-summary"><strong>Parts estimate</strong><span>${money(partsCost)}</span></article>` : ""}
          ${usedParts.map((row) => `
            <article class="relationship-detail parts">
              <strong>${escapeHtml(row.parts?.name || "Part")}</strong>
              <span>${row.quantity_used} used - ${money((Number(row.quantity_used) || 0) * partUsageUnitCost(row))}</span>
            </article>
          `).join("") || `<p class="muted">No parts used yet.</p>`}
        </div>
        </details>
  
        <details class="work-detail-section relationship-detail photo" id="work-order-photos-target">
          <summary>Photos</summary>
        <form class="form-grid relationship-detail photo" id="photo-form">
          <label>Upload photo<input name="photo" type="file" accept="image/*"><small>Photos are optimized up to 2400px before upload.</small></label>
          <p class="error-text" id="photo-error"></p>
          <button class="secondary-button" type="submit">Upload Photo</button>
        </form>
  
        <div>
          <h3>Photos</h3>
          <div class="photo-list">
            ${photos.map((photo) => `
              <article class="relationship-detail photo">
                ${photo.signedUrl && photo.content_type?.startsWith("image/")
                  ? `<img class="photo-thumb" src="${escapeHtml(photo.signedUrl)}" alt="${escapeHtml(photo.file_name)}">`
                  : ""}
                <strong>${escapeHtml(photo.file_name)}</strong>
                <span>${photoMetaText(photo)}</span>
                ${photo.signedUrl ? `<a href="${escapeHtml(photo.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>` : ""}
              </article>
            `).join("") || `<p class="muted">No photos uploaded yet.</p>`}
          </div>
        </div>
        </details>
  
        <details class="work-detail-section relationship-detail comment" id="work-order-comments-target">
          <summary>Comments</summary>
        <form class="form-grid relationship-detail comment" id="comment-form">
          <label>Comment<textarea name="body" rows="3" required></textarea></label>
          <p class="error-text" id="comment-error"></p>
          <button class="primary-button" type="submit">Add Comment</button>
        </form>
        <div class="comment-list">
          ${comments.map((comment) => `
            <article class="relationship-detail comment">
              <strong>${escapeHtml(profilesByUserId[comment.author_id]?.full_name || "Team member")}</strong>
              <span>${comment.created_at ? new Date(comment.created_at).toLocaleString() : ""}</span>
              <p>${escapeHtml(comment.body)}</p>
            </article>
          `).join("") || `<p class="muted">No comments yet.</p>`}
        </div>
        </details>
  
        <details class="work-detail-section" id="work-order-history-target">
          <summary>History</summary>
        <div class="timeline">
          ${commentsError ? `<p class="error-text">${escapeHtml(commentsError)}</p>` : ""}
          ${activity.map(renderActivityItem).join("") || `<p class="muted">No activity yet.</p>`}
        </div>
        </details>
  
        ${canDeleteWorkOrders() ? renderWorkOrderDangerZone(workOrder) : ""}
      </div>
    `;
  }
  

    return { renderWorkOrderDetail };
  }

  window.MaintainOpsWorkOrderDetailDisplay = {
    createWorkOrderDetailDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createWorkOrderDetailDisplayHelpers };
  }
})();
