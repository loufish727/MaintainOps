(function () {
  function createMaintenanceListDisplayHelpers(deps) {
    const escapeHtml = deps.escapeHtml;
    const getDueState = deps.getDueState;
    const procedureDeleteBlockerMessage = deps.procedureDeleteBlockerMessage;
    const canDeleteOperationalRecords = deps.canDeleteOperationalRecords;

    function filteredPreventiveSchedules() {
      return deps.getPreventiveSchedules().filter((schedule) => deps.matchesActiveLocation(schedule) && deps.matchesSearch([
        schedule.title,
        schedule.frequency,
        schedule.next_due_at,
        schedule.assets?.name,
      ]));
    }

    function filteredProcedureTemplates() {
      return deps.getProcedureTemplates().filter((template) => deps.matchesSearch([
        template.name,
        template.description,
        ...(template.procedure_steps || []).map((step) => step.prompt),
      ]));
    }

    function renderPreventiveSchedule(schedule) {
      const dueState = getDueState({ due_at: schedule.next_due_at, status: "open" });
      const confirming = deps.getPendingDeleteScheduleId() === schedule.id;
      return `
        <article class="pm-card">
          <div>
            <div class="chip-row">
              <span class="chip">${escapeHtml(schedule.frequency)}</span>
              ${dueState ? `<span class="chip ${dueState.className}">${dueState.label}</span>` : ""}
            </div>
            <h3>${escapeHtml(schedule.title)}</h3>
            <p>${escapeHtml(schedule.assets?.name || "No equipment")} - Next due ${schedule.next_due_at}</p>
          </div>
          <div class="request-actions">
            <button class="secondary-button" data-generate-pm="${schedule.id}" type="button">Generate Work</button>
            ${canDeleteOperationalRecords() ? confirming ? `
              <button class="secondary-button" data-cancel-delete-schedule type="button">Cancel</button>
              <button class="danger-action-button confirm-delete-button" data-confirm-delete-schedule="${escapeHtml(schedule.id)}" type="button">Permanently Delete</button>
            ` : `
              <button class="danger-action-button" data-delete-schedule="${escapeHtml(schedule.id)}" type="button">Delete</button>
            ` : ""}
          </div>
        </article>
      `;
    }

    function renderProcedureTemplate(template) {
      const linkedWorkCount = deps.getWorkOrders().filter((workOrder) => workOrder.procedure_template_id === template.id).length;
      const linkedScheduleCount = deps.getPreventiveSchedules().filter((schedule) => schedule.procedure_template_id === template.id).length;
      const blockerMessage = procedureDeleteBlockerMessage({
        workOrders: linkedWorkCount,
        schedules: linkedScheduleCount,
      });
      const confirming = deps.getPendingDeleteProcedureId() === template.id;
      return `
        <article class="procedure-card">
          <div>
            <div class="chip-row">
              <span class="chip">${template.procedure_steps?.length || 0} steps</span>
              <span class="chip">${linkedWorkCount} linked work orders</span>
              ${linkedScheduleCount ? `<span class="chip">${linkedScheduleCount} PM schedules</span>` : ""}
            </div>
            <h3>${escapeHtml(template.name)}</h3>
            <p>${escapeHtml(template.description || "No description.")}</p>
          </div>
          <div class="checklist-list">
            ${(template.procedure_steps || []).map((step) => `
              <div class="checklist-step">
                <span>${step.position}. ${escapeHtml(step.prompt)}</span>
                <small>${escapeHtml(step.response_type)} ${step.required ? "- required" : "- optional"}</small>
              </div>
            `).join("") || `<p class="muted">No steps yet.</p>`}
          </div>
          <form class="inline-form add-step-form relationship-detail procedure" data-add-step="${template.id}">
            <input name="prompt" required placeholder="Step prompt">
            <select name="response_type">
              <option value="checkbox">Checkbox</option>
              <option value="pass_fail">Pass / Fail</option>
              <option value="number">Number</option>
              <option value="text">Text</option>
            </select>
            <select name="required">
              <option value="true">Required</option>
              <option value="false">Optional</option>
            </select>
            <p class="error-text" data-step-error="${template.id}"></p>
            <button class="secondary-button" type="submit">Add Step</button>
          </form>
          ${canDeleteOperationalRecords() ? `
            <section class="delete-zone procedure-delete-zone">
              <div>
                <h3>Delete Procedure Checklist</h3>
                <p>${blockerMessage || "This removes the checklist template and checklist steps."}</p>
              </div>
              <p class="error-text" data-procedure-delete-error="${escapeHtml(template.id)}"></p>
              ${blockerMessage ? `
                <button class="danger-action-button" type="button" disabled>Kept For Traceability</button>
              ` : confirming ? `
                <div class="delete-warning-panel">
                  <strong>Permanent Delete Warning</strong>
                  <p>You are about to permanently delete "${escapeHtml(template.name)}". This cannot be undone.</p>
                  <div class="button-row">
                    <button class="secondary-button" data-cancel-delete-procedure type="button">Cancel</button>
                    <button class="danger-action-button permanent-delete-button" data-confirm-delete-procedure="${escapeHtml(template.id)}" type="button">Permanently Delete</button>
                  </div>
                </div>
              ` : `
                <button class="danger-action-button" data-delete-procedure="${escapeHtml(template.id)}" type="button">Delete Checklist</button>
              `}
            </section>
          ` : ""}
        </article>
      `;
    }

    return {
      filteredPreventiveSchedules,
      filteredProcedureTemplates,
      renderPreventiveSchedule,
      renderProcedureTemplate,
    };
  }

  window.MaintainOpsMaintenanceListDisplay = {
    createMaintenanceListDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createMaintenanceListDisplayHelpers };
  }
})();
