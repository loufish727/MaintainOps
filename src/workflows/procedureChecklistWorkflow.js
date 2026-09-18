(function () {
  /*
   * Module contract: owns procedure checklist result saving only.
   * May upsert an injected checklist result, record an injected work-order event,
   * refresh injected step-result state, clear completion warnings, and update checklist readouts in place.
   * Must not create/edit/delete procedure templates, complete work orders, own app state,
   * touch auth/session startup, storage/photo flows, SQL, or RLS.
   */
  function createProcedureChecklistWorkflow(deps = {}) {
    function updateChecklistReadouts(field) {
      if (!field.isConnected) return;
      const workOrder = deps.getWorkOrders().find((item) => item.id === field.dataset.workOrderId);
      const procedure = deps.getProcedureTemplates().find((item) => item.id === workOrder?.procedure_template_id);
      if (!procedure) return;
      const progress = deps.checklistProgress(workOrder, procedure);
      const required = deps.requiredChecklistProgress(workOrder, procedure);
      const detail = field.closest('.detail-stack');
      const summary = detail?.querySelector('[data-checklist-summary]');
      const chip = detail?.querySelector('.relationship-chip.procedure > span');
      if (summary) summary.textContent = `${progress.done} of ${progress.total} complete - required ${required.done}/${required.total}`;
      if (chip) chip.textContent = `${progress.done}/${progress.total}`;
      const recorded = field.closest('.checklist-step')?.querySelector('[data-checklist-recorded]');
      const result = deps.getStepResultsByWorkOrder()[workOrder.id]?.[field.dataset.stepResult];
      if (recorded) recorded.textContent = result?.completed_at ? `Recorded ${new Date(result.completed_at).toLocaleString()}` : '';
    }
    async function saveStepResult(event) {
      const field = event.target;
      const value = field.type === "checkbox" ? (field.checked ? "checked" : "") : field.value;
      field.disabled = true;
      try {
        const { error } = await deps.withOperationTimeout(
          deps.upsertStepResult({
            company_id: deps.getActiveCompanyId(),
            work_order_id: field.dataset.workOrderId,
            procedure_step_id: field.dataset.stepResult,
            completed_by: value ? deps.getSession().user.id : null,
            value,
            completed_at: value ? new Date().toISOString() : null,
          }),
          "Checklist save timed out. Check your connection and try again.",
          15000
        );

        if (error) throw error;
        await deps.withOperationTimeout(
          deps.recordWorkOrderEvent(field.dataset.workOrderId, "checklist_updated", "Procedure checklist updated."),
          "Activity log timed out.",
          8000
        ).catch(() => null);

        const reloadError = await deps.withOperationTimeout(
          deps.loadStepResults(),
          "Checklist refresh timed out. Refresh the workspace to confirm the latest checklist state.",
          10000
        ).catch((error) => error);
        if (reloadError) {
          deps.showNotice(`Checklist saved, but refresh did not finish: ${reloadError.message || reloadError}`, "warning");
          field.disabled = false;
          return;
        }

        if (deps.getWorkOrderActionWarningId() === field.dataset.workOrderId) {
          const refreshedWorkOrder = deps.getWorkOrders().find((item) => item.id === field.dataset.workOrderId);
          if (!deps.blocksProcedureCompletion(refreshedWorkOrder)) deps.setWorkOrderActionWarning("", "");
        }

        // A workspace rebuild here erased other forms the user was already typing in.
        field.disabled = false;
        updateChecklistReadouts(field);
      } catch (error) {
        deps.showNotice(`Could not save checklist step: ${error.message || error}`, "warning");
        field.disabled = false;
      }
    }

    return { saveStepResult };
  }

  window.MaintainOpsProcedureChecklistWorkflow = {
    createProcedureChecklistWorkflow,
  };

  if (typeof module !== "undefined") {
    module.exports = { createProcedureChecklistWorkflow };
  }
})();
