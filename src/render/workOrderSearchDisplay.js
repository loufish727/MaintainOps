(function () {
  function createWorkOrderSearchDisplayHelpers(deps) {
    function workOrderSearchValues(workOrder) {
      const usedParts = deps.getPartsUsedByWorkOrder()[workOrder.id] || [];
      const comments = deps.getCommentsByWorkOrder()[workOrder.id] || [];
      const events = deps.getEventsByWorkOrder()[workOrder.id] || [];
      const photos = deps.getPhotosByWorkOrder()[workOrder.id] || [];
      const procedure = deps.getProcedureTemplates().find((template) => template.id === workOrder.procedure_template_id);
      const stepResults = Object.values(deps.getStepResultsByWorkOrder()[workOrder.id] || {});
      const profilesByUserId = deps.getProfilesByUserId();

      return [
        workOrder.title,
        workOrder.description,
        workOrder.status,
        deps.statusLabel(workOrder.status),
        workOrder.priority,
        workOrder.type,
        workOrder.assets?.name,
        deps.assignmentLabel(workOrder),
        workOrder.failure_cause,
        workOrder.resolution_summary,
        workOrder.completion_notes,
        workOrder.current_update,
        procedure?.name,
        procedure?.description,
        ...(procedure?.procedure_steps || []).flatMap((step) => [step.prompt, step.step_type]),
        ...usedParts.flatMap((row) => [
          row.parts?.name,
          row.parts?.sku,
          row.parts?.supplier_name,
          row.quantity_used,
          row.unit_cost,
        ]),
        ...comments.flatMap((comment) => [
          comment.body,
          profilesByUserId[comment.author_id]?.full_name,
        ]),
        ...events.flatMap((event) => [
          event.event_type,
          event.summary,
          profilesByUserId[event.actor_id]?.full_name,
        ]),
        ...photos.flatMap((photo) => [
          photo.file_name,
          photo.original_file_name,
          photo.content_type,
        ]),
        ...stepResults.flatMap((result) => [
          result.value,
          result.notes,
        ]),
      ];
    }

    return {
      workOrderSearchValues,
    };
  }

  window.MaintainOpsWorkOrderSearchDisplay = {
    createWorkOrderSearchDisplayHelpers,
  };
})();
