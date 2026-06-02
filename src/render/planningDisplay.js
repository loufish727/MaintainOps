(function () {
  function createPlanningDisplayHelpers({
    escapeHtml,
    statusLabel,
    renderRelationshipChips,
  }) {
    function renderPlanningGroup(title, items, chipClass) {
      return `
        <section class="planning-group">
          <div class="panel-header compact-header">
            <h3>${escapeHtml(title)}</h3>
            <span class="chip ${chipClass}">${items.length}</span>
          </div>
          <div class="planning-list">
            ${items.map(renderPlanningItem).join("") || `<p class="muted">Nothing here.</p>`}
          </div>
        </section>
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
      renderPlanningItem,
    };
  }

  window.MaintainOpsPlanningDisplay = {
    createPlanningDisplayHelpers,
  };
})();
