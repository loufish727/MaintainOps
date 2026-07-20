(function () {
  function createWorkOrderChangeDisplayHelpers() {
    function describeWorkOrderChanges(previous, next) {
      if (!previous) return "Work order updated.";
      const changes = [];
      if (previous.title !== next.title) changes.push("title");
      if ((previous.description || "") !== (next.description || "")) changes.push("description");
      if ((previous.due_at || "") !== (next.due_at || "")) changes.push("due date");
      if (previous.priority !== next.priority) changes.push("priority");
      if ((previous.type || "corrective") !== next.type) changes.push("type");
      if ((previous.assigned_to || "") !== (next.assigned_to || "")) changes.push("assignment");
      if ((previous.procedure_template_id || "") !== (next.procedure_template_id || "")) changes.push("procedure");
      if (String(previous.actual_minutes || 0) !== String(next.actual_minutes || 0)) changes.push("actual minutes");
      return changes.length ? `Updated ${changes.join(", ")}.` : "Work order saved.";
    }

    return {
      describeWorkOrderChanges,
    };
  }

  window.MaintainOpsWorkOrderChangeDisplay = {
    createWorkOrderChangeDisplayHelpers,
  };
})();
