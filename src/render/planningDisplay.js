(function () {
  function createPlanningDisplayHelpers({
    escapeHtml,
    LIST_ITEMS_PER_PAGE,
    getPlanningPage,
    getPlanningGroupOpen = (_kind, fallback) => fallback,
    renderListPagination,
    statusLabel,
    renderRelationshipChips,
    canEditOperationalRecords = () => true,
  }) {
    function renderPlanningGroup(title, items, chipClass, pageKind, options = {}) {
      const pageSize = LIST_ITEMS_PER_PAGE || 12;
      const currentPage = typeof getPlanningPage === "function" ? getPlanningPage(pageKind) : 1;
      const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
      const safePage = Math.min(Math.max(currentPage, 1), totalPages);
      const pagedItems = items.slice((safePage - 1) * pageSize, safePage * pageSize);
      const isOpen = getPlanningGroupOpen(pageKind, Boolean(options.defaultOpen && items.length));
      return `
        <details class="planning-group" data-planning-group="${escapeHtml(pageKind)}" ${isOpen ? "open" : ""}>
          <summary class="planning-group-summary">
            <span>
              <strong>${escapeHtml(title)}</strong>
              ${options.description ? `<small>${escapeHtml(options.description)}</small>` : ""}
            </span>
            <span class="chip ${chipClass}">${items.length}</span>
          </summary>
          <div class="planning-group-body">
            <div class="planning-list">
              ${pagedItems.map(renderPlanningItem).join("") || `<p class="muted">Nothing here.</p>`}
            </div>
            ${typeof renderListPagination === "function" ? renderListPagination(`planning-${pageKind}`, items.length, safePage, totalPages) : ""}
          </div>
        </details>
      `;
    }

    function renderPlanningLane(title, description, content, className = "") {
      return `
        <section class="planning-lane ${className}">
          <header class="planning-lane-header">
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(description)}</p>
          </header>
          ${content}
        </section>
      `;
    }

    function renderPlanningBoard(groups) {
      return `
        <div class="planning-grid">
          ${renderPlanningLane("Needs action", "Unscheduled work and completed items that still need follow-up.", `
            ${renderPlanningGroup("No Due Date", groups.noDue, "blocked", "no-due", {
              defaultOpen: true,
              description: "Set a date here to move work into the schedule.",
            })}
            ${renderPlanningGroup("Follow-up Needed", groups.followUp, "blocked", "follow-up", {
              description: "Close the loop or create the next order.",
            })}
          `, "planning-lane-action")}
          ${renderPlanningLane("Current schedule", "Work requiring attention now.", `
            ${renderPlanningGroup("Overdue", groups.overdue, "overdue", "overdue", { defaultOpen: true })}
            ${renderPlanningGroup("Due Today", groups.today, "due_today", "today", { defaultOpen: true })}
          `)}
          ${renderPlanningLane("Upcoming", "Near-term maintenance and preventive work.", `
            ${renderPlanningGroup("Next 7 Days", groups.soon, "in_progress", "soon")}
            ${renderPlanningGroup("PM Due Soon", groups.pm, "open", "pm")}
          `)}
        </div>
      `;
    }

    function renderPlanningItem(item) {
      if (item.kind === "follow_up") {
        return `
          <article class="planning-item follow-up-item">
            <div>
              <span class="eyebrow">Follow-up</span>
              <strong>${escapeHtml(item.title)}</strong>
              <p>${escapeHtml(item.assetName)} - completed ${escapeHtml(item.completedAt)}</p>
              ${item.resolution ? `<p>${escapeHtml(item.resolution)}</p>` : ""}
            </div>
            <div class="follow-up-create" data-follow-up-create>
              <button class="secondary-button" data-mini-work-order="${escapeHtml(item.id)}" type="button">Open Original</button>
              <label>Due in days<input name="follow_up_days" type="number" min="0" max="365" step="1" value="7"></label>
              <button class="secondary-button" data-create-follow-up="${escapeHtml(item.id)}" type="button">Create Work</button>
            </div>
          </article>
        `;
      }

      if (item.kind === "pm") {
        return `
          <article class="planning-item">
            <div>
              <span class="eyebrow">Preventive</span>
              <strong>${escapeHtml(item.title)}</strong>
              <p>${escapeHtml(item.assetName)} - due ${escapeHtml(item.dueAt)}</p>
            </div>
            <button class="secondary-button" data-generate-pm="${item.id}" type="button">Generate Work</button>
          </article>
        `;
      }

      if (item.kind === "no_due") {
        const createdAt = item.createdAt ? new Date(item.createdAt) : null;
        const createdLabel = createdAt && !Number.isNaN(createdAt.getTime()) ? createdAt.toLocaleDateString() : "Unknown";
        return `
          <article class="planning-item planning-no-due-item">
            <div>
              <span class="eyebrow">${escapeHtml(item.priority)} ${escapeHtml(statusLabel(item.status))}</span>
              <strong>${escapeHtml(item.title)}</strong>
              <p>${escapeHtml(item.assetName)} - ${escapeHtml(item.assignedTo || "Unassigned")}</p>
              <p>Created ${escapeHtml(createdLabel)}</p>
            </div>
            <div class="planning-item-actions">
              <button class="secondary-button" data-mini-work-order="${escapeHtml(item.id)}" type="button">Open Work Order</button>
              ${canEditOperationalRecords() ? `
                <form class="planning-due-form" data-planning-due-form="${escapeHtml(item.id)}">
                  <label>Due date<input name="planning_due_at" type="date" required></label>
                  <button class="primary-button" type="submit">Set Due Date</button>
                </form>
              ` : `<span class="muted planning-view-only">View only</span>`}
            </div>
          </article>
        `;
      }

      return `
        <article class="planning-item mini-work-order" data-mini-work-order="${item.id}">
          <div>
            <span class="eyebrow">${escapeHtml(item.priority)} ${escapeHtml(statusLabel(item.status))}</span>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.assetName)} - due ${escapeHtml(item.dueAt)}</p>
          </div>
          ${renderRelationshipChips(item.workOrder)}
        </article>
      `;
    }

    return {
      renderPlanningGroup,
      renderPlanningBoard,
      renderPlanningItem,
    };
  }

  window.MaintainOpsPlanningDisplay = {
    createPlanningDisplayHelpers,
  };
})();
