(function () {
  /*
   * Module contract: owns procedure checklist result saving only.
   * May upsert an injected checklist result, record an injected work-order event,
   * refresh injected step-result state, clear completion warnings, and update checklist readouts in place.
   * Must not create/edit/delete procedure templates, complete work orders, own app state,
   * touch auth/session startup, storage/photo flows, SQL, or RLS.
   */
  const { normalizeChecklistResponseValue, isChecklistStepAnswered } = window.MaintainOpsChecklistResponseValues
    || require("../utils/checklistResponseValues.js");

  function createProcedureChecklistWorkflow(deps = {}) {
    function updateChecklistReadouts(field, workOrderId, stepId) {
      if (!field.isConnected || field.dataset.workOrderId !== workOrderId || field.dataset.stepResult !== stepId) return;
      const workOrder = deps.getWorkOrders().find((item) => item.id === workOrderId);
      if (!workOrder) return;
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
      const result = deps.getStepResultsByWorkOrder()[workOrderId]?.[stepId];
      if (recorded) recorded.textContent = result?.completed_at ? `Recorded ${new Date(result.completed_at).toLocaleString()}` : '';
    }
    async function saveStepResult(event) {
      const field = event.target;
      if (field.disabled) return;
      const workOrderId = field.dataset.workOrderId;
      const stepId = field.dataset.stepResult;
      const companyId = deps.getActiveCompanyId();
      const userId = deps.getSession()?.user?.id;
      const scope = deps.getScope?.();
      const scopeIsCurrent = () => deps.getActiveCompanyId() === companyId && deps.getSession()?.user?.id === userId && deps.getScope?.() === scope;
      const draft = deps.captureResponseDraft?.(field);
      field.disabled = true;
      try {
        const workOrder = deps.getWorkOrders().find((item) => item.id === workOrderId);
        const procedure = deps.getProcedureTemplates().find((item) => item.id === workOrder?.procedure_template_id);
        const step = procedure?.procedure_steps?.find((item) => item.id === stepId);
        if (!companyId || !userId || !workOrder || !procedure || !step
          || workOrder.company_id !== companyId || procedure.company_id !== companyId || step.company_id !== companyId
          || step.procedure_template_id !== procedure.id) {
          throw new Error("This checklist step is no longer attached to this work order. Refresh and try again.");
        }
        const value = normalizeChecklistResponseValue(step, step.response_type === "checkbox" ? field.checked : field.value);
        const answered = isChecklistStepAnswered(step, value);
        if (step.response_type === "number" && value && !answered) {
          throw new Error("Enter a valid numeric reading.");
        }
        if (step.response_type === "pass_fail" && value && !answered) {
          throw new Error("Choose Pass, Fail, or Not checked.");
        }
        const { error } = await deps.withOperationTimeout(
          deps.upsertStepResult({
            company_id: companyId,
            work_order_id: workOrderId,
            procedure_step_id: stepId,
            completed_by: answered ? userId : null,
            value,
            completed_at: answered ? new Date().toISOString() : null,
          }),
          "Checklist save timed out. Check your connection and try again.",
          15000
        );

        if (error) throw error;
        deps.clearResponseDraft?.(draft);
        // History and refresh callbacks use the current workspace scope.
        if (!scopeIsCurrent()) return;
        const logResult = await deps.withOperationTimeout(
          deps.recordWorkOrderEvent(workOrderId, "checklist_updated", "Procedure checklist updated."),
          "Activity log timed out.",
          8000
        ).catch((error) => ({ error }));
        if (!scopeIsCurrent()) return;
        if (logResult?.error) {
          deps.showNotice(`Checklist saved, but history did not update: ${logResult.error.message || logResult.error}`, "warning");
        }

        const reloadError = await deps.withOperationTimeout(
          deps.loadStepResults(),
          "Checklist refresh timed out. Refresh the workspace to confirm the latest checklist state.",
          10000
        ).catch((error) => error);
        if (!scopeIsCurrent()) return;
        if (reloadError) {
          deps.showNotice(`Checklist saved, but refresh did not finish: ${reloadError.message || reloadError}`, "warning");
          return;
        }

        if (deps.getWorkOrderActionWarningId() === workOrderId) {
          const refreshedWorkOrder = deps.getWorkOrders().find((item) => item.id === workOrderId);
          if (refreshedWorkOrder && !deps.blocksProcedureCompletion(refreshedWorkOrder)) deps.setWorkOrderActionWarning("", "");
        }

        // A workspace rebuild here erased other forms the user was already typing in.
        updateChecklistReadouts(field, workOrderId, stepId);
      } catch (error) {
        if (scopeIsCurrent()) deps.showNotice(`Could not save checklist step: ${error.message || error}`, "warning");
      } finally {
        field.disabled = false;
      }
    }

    return { saveStepResult, normalizeChecklistResponseValue, isChecklistStepAnswered };
  }

  window.MaintainOpsProcedureChecklistWorkflow = {
    createProcedureChecklistWorkflow,
    normalizeChecklistResponseValue,
    isChecklistStepAnswered,
  };

  if (typeof module !== "undefined") {
    module.exports = { createProcedureChecklistWorkflow, normalizeChecklistResponseValue, isChecklistStepAnswered };
  }
})();
