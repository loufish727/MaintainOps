(function () {
  /*
   * Module contract: owns Work Order Detail completion submit handling and safety checkbox sync.
   * Requires app.js-injected state lookup, safety helpers, mutation callbacks, timeout wrapper, notices, and render.
   * May build the completion payload, call injected work-order update/event callbacks, sync safety checkboxes,
   * update completion form button/error UI, show completion notices, and trigger render.
   * Must not import Supabase, own auth/company/location state, delete work, assign work, change quick status bindings,
   * handle storage/photo/document flows, or touch SQL/RLS directly.
   */
  function createWorkspaceWorkOrderCompletionEvents(options = {}) {
    const doc = options.documentRef || document;
    const FormDataRef = options.FormDataRef || FormData;

    function currentSafetyCheckboxCheckedForWorkOrder(id) {
      if (options.getActiveWorkOrderId() !== id) return false;
      return Array.from(doc.querySelectorAll('#complete-work-order-form input[name="safety_devices_checked"], #quick-update-work-order-form input[name="safety_devices_checked"]'))
        .some((field) => field.checked);
    }

    function syncSafetyDeviceChecks(event) {
      doc.querySelectorAll('input[name="safety_devices_checked"]').forEach((field) => {
        field.checked = event.target.checked;
      });
    }

    async function completeWorkOrder(event) {
      event.preventDefault();
      const formElement = event.target;
      const submitButton = formElement.querySelector("button[type='submit']");
      const errorTarget = doc.querySelector("#completion-error");
      const activeWorkOrderId = options.getActiveWorkOrderId();
      const workOrder = options.getWorkOrderById(activeWorkOrderId);
      const procedure = options.getProcedureById(workOrder?.procedure_template_id);
      const requiredProgress = procedure ? options.requiredChecklistProgress(workOrder, procedure) : { done: 0, total: 0 };

      const productionActionMessage = options.productionActionCompletionMessage?.(workOrder) || "";
      if (productionActionMessage) {
        if (errorTarget) errorTarget.textContent = productionActionMessage;
        options.setWorkOrderActionWarning(activeWorkOrderId, productionActionMessage);
        options.showNotice(productionActionMessage, "warning");
        return;
      }

      if (requiredProgress.done < requiredProgress.total) {
        if (errorTarget) errorTarget.textContent = `Complete required checklist steps first (${requiredProgress.done}/${requiredProgress.total}).`;
        return;
      }

      const form = new FormDataRef(formElement);
      const safetyChecked = form.get("safety_devices_checked") === "on"
        || currentSafetyCheckboxCheckedForWorkOrder(activeWorkOrderId)
        || options.hasCompletedSafetyDeviceCheck(workOrder);
      if (options.requiresSafetyDeviceCheck(workOrder) && !safetyChecked) {
        if (errorTarget) errorTarget.textContent = "Check safety devices before completing equipment work.";
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = "Completing...";
      if (errorTarget) errorTarget.textContent = "";

      try {
        const payload = {
          status: "completed",
          asset_id: workOrder?.asset_id || null,
          actual_minutes: Number(form.get("actual_minutes")) || 0,
          failure_cause: form.get("failure_cause") || null,
          resolution_summary: form.get("resolution_summary") || null,
          follow_up_needed: form.get("follow_up_needed") === "on",
          completion_notes: form.get("completion_notes") || null,
          completed_at: new Date().toISOString(),
        };
        options.applySafetyRequirementPayload(payload);
        options.applySafetyCheckPayload(payload, payload.safety_check_required && safetyChecked);
        delete payload.asset_id;

        const { error } = await options.withOperationTimeout(
          options.updateWorkOrderSafely(payload, activeWorkOrderId),
          "Complete work save timed out. Check your connection and try again.",
          20000
        );
        if (error) {
          if (errorTarget) errorTarget.textContent = `Could not complete work order: ${options.friendlyWorkOrderSaveError(error)}`;
          return;
        }

        const logError = await options.withOperationTimeout(
          options.recordWorkOrderEvent(activeWorkOrderId, "completed", form.get("resolution_summary") || form.get("completion_notes") || "Work order completed."),
          "Activity log timed out.",
          8000
        ).catch((error) => error);
        options.setWorkOrderActionWarning("", "");
        options.showNotice(logError ? `Work order completed, but history did not update: ${logError.message}` : "Work order completed.", logError ? "warning" : "success");
        await options.render();
      } catch (error) {
        if (errorTarget) errorTarget.textContent = `Could not complete work order: ${error.message || error}`;
        else options.alertRef(error.message || error);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Complete Work Order";
      }
    }

    function bindWorkspaceWorkOrderCompletionEvents() {
      const completionForm = doc.querySelector("#complete-work-order-form");
      if (completionForm) completionForm.addEventListener("submit", completeWorkOrder);

      doc.querySelectorAll('input[name="safety_devices_checked"]').forEach((field) => {
        field.addEventListener("change", syncSafetyDeviceChecks);
      });
    }

    return {
      bindWorkspaceWorkOrderCompletionEvents,
      completeWorkOrder,
      currentSafetyCheckboxCheckedForWorkOrder,
      syncSafetyDeviceChecks,
    };
  }

  window.MaintainOpsWorkspaceWorkOrderCompletionEvents = {
    createWorkspaceWorkOrderCompletionEvents,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { createWorkspaceWorkOrderCompletionEvents };
  }
})();
