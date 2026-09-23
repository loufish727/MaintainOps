(function () {
  function createMaintenanceListDisplayHelpers(deps) {
    const escapeHtml = deps.escapeHtml;
    const getDueState = deps.getDueState;
    const procedureDeleteBlockerMessage = deps.procedureDeleteBlockerMessage;
    const canDeleteOperationalRecords = deps.canDeleteOperationalRecords;
    const canEditOperationalRecords = deps.canEditOperationalRecords || (() => true);

    function renderPanel(kind, { count, rows, pagination, ready, assetOptions, procedureOptions, date }) {
      const pm = kind === 'pm';
      const title = pm ? 'Preventive Maintenance' : 'Procedure Checklists';
      return `<section class="panel full-width">
        <div class="panel-header"><h2>${title}</h2><span>${ready ? `${count} shown` : 'Unavailable'}</span></div>
        ${ready ? `${canEditOperationalRecords() ? pm ? renderPmCreateForm({ assetOptions, procedureOptions, date }) : renderProcedureCreateForm() : ''}
          <div class="${pm ? 'pm' : 'procedure'}-list">${rows.map(pm ? renderPreventiveSchedule : renderProcedureTemplate).join('') || `<p class="muted">No ${pm ? 'schedules' : 'procedure checklists'} match this search.</p>`}</div>
          ${pagination}` : `<p class="error-text" role="alert">${pm ? 'PM schedules' : 'Procedure checklists'} could not be loaded. Try again.</p>`}
      </section>`;
    }

    function renderProcedureCreateForm() {
      return `<form class="form-grid procedure-form relationship-detail procedure" id="create-procedure-form">
        <label>Procedure checklist name<input name="name" required placeholder="Monthly compressor inspection"></label>
        <label>Description<textarea name="description" rows="3" placeholder="Use this checklist when creating repeat work."></textarea></label>
        <p class="error-text" id="procedure-error"></p>
        <button class="secondary-button" type="submit">Add Checklist</button>
        <button class="secondary-button" type="reset">Clear Form</button>
      </form>
      <button class="text-button" id="seed-sample-procedure" type="button">Add sample inspection checklist</button>`;
    }

    function renderPmCreateForm({ assetOptions, procedureOptions, date }) {
      return `<form class="inline-form pm-form" id="create-pm-form" data-create-pm-form>
        <input name="title" required placeholder="Monthly compressor PM">
        <select name="asset_id" required data-location-sensitive-asset><option value="">Machine / equipment</option>${assetOptions}</select>
        <p class="error-text" data-asset-location-warning></p>
        <select name="frequency"><option value="weekly">Weekly</option><option value="monthly">Monthly</option><option value="quarterly">Quarterly</option></select>
        <select name="procedure_template_id">${procedureOptions}</select>
        <span class="date-picker-row inline-date-picker" data-date-picker-field>
          <input name="next_due_at" type="date" value="${escapeHtml(date)}" required>
          <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
        </span>
        <p class="error-text" id="pm-error"></p>
        <button class="secondary-button" type="submit">Add Schedule</button>
        <button class="secondary-button" type="reset">Clear Form</button>
      </form>`;
    }

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
      const dueState = schedule.active === false ? null : getDueState({ due_at: schedule.next_due_at, status: "open" });
      const confirming = deps.getPendingDeleteScheduleId() === schedule.id;
      const canEditOperational = canEditOperationalRecords();
      return `
        <article class="pm-card">
          <div>
            <div class="chip-row">
              <span class="chip">${escapeHtml(schedule.frequency)}</span>
              ${schedule.active === false ? `<span class="chip">Inactive</span>` : ""}
              ${dueState ? `<span class="chip ${dueState.className}">${dueState.label}</span>` : ""}
            </div>
            <h3>${escapeHtml(schedule.title)}</h3>
            <p>${escapeHtml(schedule.assets?.name || "No equipment")} - Next due ${escapeHtml(schedule.next_due_at)}</p>
          </div>
          ${canEditOperational ? `<div class="request-actions">
            <button class="secondary-button" data-generate-pm="${escapeHtml(schedule.id)}" type="button" ${schedule.active === false ? "disabled" : ""}>Generate Work</button>
            ${canDeleteOperationalRecords() ? confirming ? `
              <button class="secondary-button" data-cancel-delete-schedule type="button">Cancel</button>
              <button class="danger-action-button confirm-delete-button" data-confirm-delete-schedule="${escapeHtml(schedule.id)}" type="button">Permanently Delete</button>
            ` : `
              <button class="danger-action-button" data-delete-schedule="${escapeHtml(schedule.id)}" type="button">Delete</button>
            ` : ""}
          </div>` : ""}
          <details data-pm-history="${escapeHtml(schedule.id)}">
            <summary>Generated Work History</summary>
            <div class="mini-list" data-pm-history-content></div>
          </details>
        </article>
      `;
    }

    function renderProcedureTemplate(template) {
      const links = deps.getProcedureLinkCounts?.(template.id);
      const linkedWorkCount = links?.status === "ready" ? Number(links.work_order_count) : null;
      const linkedScheduleCount = links?.status === "ready" ? Number(links.schedule_count) : null;
      const blockerMessage = procedureDeleteBlockerMessage({
        workOrders: linkedWorkCount,
        schedules: linkedScheduleCount,
      });
      const confirming = deps.getPendingDeleteProcedureId() === template.id;
      const canEditOperational = canEditOperationalRecords();
      return `
        <article class="procedure-card">
          <div>
            <div class="chip-row">
              <span class="chip">${template.procedure_steps?.length || 0} steps</span>
              <span class="chip" data-procedure-links="${escapeHtml(template.id)}">${linkedWorkCount === null ? "Loading work links..." : `${linkedWorkCount} linked work orders`}</span>
              <span class="chip" data-procedure-schedules>${linkedScheduleCount === null ? "Loading PM links..." : `${linkedScheduleCount} PM schedules`}</span>
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
          ${canEditOperational && deps.canUseMaintenanceTools?.() !== false ? `<form class="inline-form add-step-form relationship-detail procedure" data-add-step="${template.id}">
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
            <button class="secondary-button" type="reset">Clear Form</button>
          </form>` : ""}
          ${canEditOperational && canDeleteOperationalRecords() ? `
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
                <button class="danger-action-button" data-delete-procedure="${escapeHtml(template.id)}" type="button" ${links?.status !== "ready" ? "disabled" : ""}>${links?.status !== "ready" ? "Checking Links..." : "Delete Checklist"}</button>
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
      renderPmCreateForm,
      renderProcedureCreateForm,
      renderPanel,
    };
  }

  window.MaintainOpsMaintenanceListDisplay = {
    createMaintenanceListDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createMaintenanceListDisplayHelpers };
  }
})();
