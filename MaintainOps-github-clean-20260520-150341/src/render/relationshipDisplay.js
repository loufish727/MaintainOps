(function () {
  function renderActivityItem(item, deps) {
    const profilesByUserId = deps.getProfilesByUserId();

    if (item.type === "comment") {
      return `
      <article class="relationship-detail comment">
        <strong>${deps.escapeHtml(profilesByUserId[item.author_id]?.full_name || "Team member")}</strong>
        <span>${new Date(item.created_at).toLocaleString()}</span>
        <p>${deps.escapeHtml(item.body)}</p>
      </article>
    `;
    }

    if (item.type === "photo") {
      return `
      <article class="relationship-detail photo">
        <strong>Photo uploaded</strong>
        <span>${deps.photoMetaText(item)}</span>
        <p>${deps.escapeHtml(item.file_name)}</p>
        ${item.signedUrl ? `<a href="${deps.escapeHtml(item.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>` : ""}
      </article>
    `;
    }

    if (item.type === "part") {
      const unitCost = deps.partUsageUnitCost(item);
      const totalCost = unitCost * (Number(item.quantity_used) || 0);
      return `
      <article class="relationship-detail parts">
        <strong>Part used</strong>
        <span>${new Date(item.created_at).toLocaleString()}</span>
        <p>${deps.escapeHtml(item.parts?.name || "Part")} - ${Number(item.quantity_used) || 0} used - ${deps.money(totalCost)}</p>
      </article>
    `;
    }

    return `
    <article>
      <strong>${deps.escapeHtml(item.event_type.replaceAll("_", " "))}</strong>
      <span>${new Date(item.created_at).toLocaleString()} \u00c2\u00b7 ${deps.escapeHtml(profilesByUserId[item.actor_id]?.full_name || "Team member")}</span>
      <p>${deps.escapeHtml(item.summary)}</p>
    </article>
  `;
  }

  function renderRelationshipChips(workOrder, deps) {
    const procedureTemplates = deps.getProcedureTemplates();
    const partsUsedByWorkOrder = deps.getPartsUsedByWorkOrder();
    const commentsByWorkOrder = deps.getCommentsByWorkOrder();
    const photosByWorkOrder = deps.getPhotosByWorkOrder();
    const messageThreads = deps.getMessageThreads();
    const procedure = procedureTemplates.find((template) => template.id === workOrder.procedure_template_id);
    const progress = procedure ? deps.checklistProgress(workOrder, procedure) : null;
    const partsCount = (partsUsedByWorkOrder[workOrder.id] || []).length;
    const commentsCount = (commentsByWorkOrder[workOrder.id] || []).length;
    const photosCount = (photosByWorkOrder[workOrder.id] || []).length;
    const messageCount = messageThreads.filter((thread) => thread.work_order_id === workOrder.id).length;
    const chips = [];

    if (workOrder.asset_id) {
      chips.push(relationshipChip("asset", "Equipment", workOrder.assets?.name || "Linked", deps));
    }

    if (procedure && progress) {
      chips.push(relationshipChip("procedure", "Procedure", `${progress.done}/${progress.total}`, deps));
    }

    if (partsCount) {
      chips.push(relationshipChip("parts", "Parts", String(partsCount), deps));
    }

    if (commentsCount) {
      chips.push(relationshipChip("comment", "Comments", String(commentsCount), deps));
    }

    if (messageCount) {
      chips.push(relationshipChip("message", "Messages", String(messageCount), deps));
    }

    if (photosCount) {
      chips.push(relationshipChip("photo", "Photos", String(photosCount), deps));
    }

    return chips.length ? `<div class="relationship-row">${chips.join("")}</div>` : "";
  }

  function relationshipChip(type, label, value, deps) {
    return `
    <span class="relationship-chip ${type}" title="${deps.escapeHtml(label)}">
      ${relationshipIcon(type)}
      <span>${deps.escapeHtml(value)}</span>
    </span>
  `;
  }

  function relationshipIcon(type) {
    const icons = {
      asset: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path></svg>`,
      procedure: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path></svg>`,
      parts: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path></svg>`,
      comment: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v10H8l-3 3V5z"></path></svg>`,
      message: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path></svg>`,
      photo: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6z"></path><path d="M8 14l3-3 2 2 2-3 3 4"></path><path d="M8 9h.01"></path></svg>`,
    };
    return icons[type] || "";
  }

  function createRelationshipDisplayHelpers(deps) {
    return Object.freeze({
      renderActivityItem: (item) => renderActivityItem(item, deps),
      renderRelationshipChips: (workOrder) => renderRelationshipChips(workOrder, deps),
      relationshipChip: (type, label, value) => relationshipChip(type, label, value, deps),
      relationshipIcon,
    });
  }

  window.MaintainOpsRelationshipDisplay = Object.freeze({
    createRelationshipDisplayHelpers,
  });
})();
