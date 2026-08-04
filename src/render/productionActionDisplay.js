(function () {
  function createProductionActionDisplayHelpers(deps = {}) {
    function productionMembers() {
      return deps.getCompanyMembers()
        .filter((member) => deps.normalizeRole(member.role) === "production")
        .map((member) => ({
          userId: member.user_id,
          name: deps.teamMemberName(member.user_id),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    }

    function productionAssigneeName(workOrder) {
      return workOrder.production_action_assigned_to
        ? deps.teamMemberName(workOrder.production_action_assigned_to)
        : "Production owner not set";
    }

    function canChangeProductionActionStatus(workOrder) {
      const role = deps.activeCompanyRole();
      return ["admin", "manager"].includes(role)
        || workOrder.production_action_assigned_to === deps.getSession()?.user?.id;
    }

    function renderProductionOptions(selectedUserId = "") {
      const members = productionMembers();
      return members.map((member) => `
        <option value="${deps.escapeHtml(member.userId)}" ${member.userId === selectedUserId ? "selected" : ""}>${deps.escapeHtml(member.name)}</option>
      `).join("");
    }

    function renderProductionActionForm(workOrder, options = {}) {
      const members = productionMembers();
      const compactClass = options.compact ? " compact" : "";
      if (!members.length) {
        return `<p class="warning-text production-action-empty">Add a Production user in Team before assigning a Production Action.</p>`;
      }
      const selectedUserId = members.some((member) => member.userId === workOrder.production_action_assigned_to)
        ? workOrder.production_action_assigned_to
        : members[0].userId;
      return `
        <form class="production-action-form${compactClass}" data-production-action-form="${deps.escapeHtml(workOrder.id)}">
          <label>Production action
            <textarea name="production_action" rows="${options.compact ? 2 : 3}" required placeholder="What does Production need to do?">${deps.escapeHtml(workOrder.production_action || "")}</textarea>
          </label>
          <label>Production owner
            <select name="production_action_assigned_to" required>
              ${renderProductionOptions(selectedUserId)}
            </select>
          </label>
          <p class="error-text" data-production-action-error="${deps.escapeHtml(workOrder.id)}"></p>
          <div class="button-row production-action-form-actions">
            <button class="secondary-button" type="submit">${deps.hasProductionAction(workOrder) ? "Save Production Action" : "Assign Production Action"}</button>
            ${deps.hasProductionAction(workOrder) ? `<button class="text-button danger-link" data-production-action-remove="${deps.escapeHtml(workOrder.id)}" type="button">Remove</button>` : ""}
          </div>
        </form>
      `;
    }

    function renderProductionActionStatusControls(workOrder) {
      if (!canChangeProductionActionStatus(workOrder) || workOrder.status === "completed") return "";
      if (workOrder.production_action_status === "open") {
        return `<button class="secondary-button" data-production-action-status="completed" data-work-order-id="${deps.escapeHtml(workOrder.id)}" type="button">Complete Production Action</button>`;
      }
      return `<button class="secondary-button" data-production-action-status="open" data-work-order-id="${deps.escapeHtml(workOrder.id)}" type="button">Reopen Production Action</button>`;
    }

    function renderProductionActionSummary(workOrder) {
      const completed = workOrder.production_action_status === "completed";
      return `
        <div class="production-action-heading">
          <div class="chip-row">
            <span class="chip production-action-chip">Production Action</span>
            <span class="chip ${completed ? "status-completed" : "status-open"}">${completed ? "Completed" : "Open"}</span>
          </div>
          <strong>${deps.escapeHtml(productionAssigneeName(workOrder))}</strong>
        </div>
        <p class="production-action-text">${deps.escapeHtml(workOrder.production_action)}</p>
        ${completed && workOrder.production_action_completed_at
          ? `<small>Completed ${deps.escapeHtml(new Date(workOrder.production_action_completed_at).toLocaleString())}</small>`
          : ""}
      `;
    }

    function renderProductionActionCard(workOrder) {
      const canEdit = deps.canEditOperationalRecords() && workOrder.status !== "completed";
      if (!deps.hasProductionAction(workOrder)) {
        if (!canEdit) return "";
        return `
          <details class="production-action-control production-action-add" data-production-action-control>
            <summary><span class="chip production-action-chip">Production Action</span><span>Assign</span></summary>
            ${renderProductionActionForm(workOrder, { compact: true })}
          </details>
        `;
      }
      return `
        <section class="production-action-control ${workOrder.production_action_status === "completed" ? "is-completed" : "is-open"}" data-production-action-control>
          ${renderProductionActionSummary(workOrder)}
          ${canEdit ? `
            <div class="button-row production-action-card-actions">
              ${renderProductionActionStatusControls(workOrder)}
              <details data-production-action-control>
                <summary>Edit Production Action</summary>
                ${renderProductionActionForm(workOrder, { compact: true })}
              </details>
            </div>
          ` : ""}
        </section>
      `;
    }

    function renderProductionActionDetail(workOrder) {
      const canEdit = deps.canEditOperationalRecords() && workOrder.status !== "completed";
      if (!deps.hasProductionAction(workOrder) && !canEdit) return "";
      return `
        <details class="work-detail-section production-action-detail" data-production-action-control open>
          <summary>Production Action</summary>
          ${deps.hasProductionAction(workOrder) ? renderProductionActionSummary(workOrder) : `<p class="muted">No Production Action is assigned.</p>`}
          ${canEdit ? `
            <div class="button-row production-action-detail-actions">
              ${deps.hasProductionAction(workOrder) ? renderProductionActionStatusControls(workOrder) : ""}
            </div>
            ${renderProductionActionForm(workOrder)}
          ` : ""}
        </details>
      `;
    }

    return {
      productionMembers,
      productionAssigneeName,
      renderProductionActionCard,
      renderProductionActionDetail,
    };
  }

  window.MaintainOpsProductionActionDisplay = {
    createProductionActionDisplayHelpers,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { createProductionActionDisplayHelpers };
  }
})();
