(function () {
  function createWorkOrderDetailEditWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;
    const consoleRef = deps.consoleRef || console;

    async function updateWorkOrderDetails(event) {
      event.preventDefault();
      const formElement = event.target;
      const submitButton = formElement.querySelector("button[type='submit']");
      const errorTarget = documentRef.querySelector("#work-order-save-error");
      submitButton.disabled = true;
      submitButton.textContent = "Saving...";
      if (errorTarget) errorTarget.textContent = "";

      try {
        const form = new FormDataCtor(event.target);
        const activeWorkOrderId = deps.getActiveWorkOrderId();
        const previous = deps.getWorkOrders().find((workOrder) => workOrder.id === activeWorkOrderId);
        const currentStatus = documentRef.querySelector("#status-select")?.value || previous?.status || "open";
        const formOwnsAsset = form.has("asset_id");
        const assetId = formOwnsAsset ? form.get("asset_id") || null : previous?.asset_id || null;
        if (formOwnsAsset && typeof deps.confirmAssetLocationRouting === "function" && !deps.confirmAssetLocationRouting(assetId, "saving this work order", errorTarget)) {
          submitButton.disabled = false;
          submitButton.textContent = "Save Work Order";
          return;
        }
        const payload = {
          title: deps.requiredText(form.get("title"), "Work order title"),
          description: deps.descriptionWithAssignmentNote(form.get("description"), form.get("assigned_to")),
          due_at: deps.workOrderDateValue(form.get("due_at")),
          status: currentStatus,
          priority: form.get("priority"),
          type: form.get("type"),
          assigned_to: deps.assignedUserFromForm(form),
          ...deps.procedureColumn(form.get("procedure_template_id")),
          failure_cause: form.get("failure_cause") || null,
          resolution_summary: form.get("resolution_summary") || null,
          follow_up_needed: form.get("follow_up_needed") === "on",
          actual_minutes: Number(form.get("actual_minutes")) || 0,
        };
        if (formOwnsAsset) {
          payload.asset_id = assetId;
          payload.location_id = deps.locationIdForAsset(assetId);
        }
        payload.safety_check_required = deps.assetRequiresSafety(assetId);
        if (payload.status === "completed") {
          const productionActionMessage = deps.productionActionCompletionMessage?.(previous) || "";
          if (productionActionMessage) {
            deps.setWorkOrderActionWarning(activeWorkOrderId, productionActionMessage);
            submitButton.disabled = false;
            submitButton.textContent = "Save Work Order";
            if (errorTarget) errorTarget.textContent = productionActionMessage;
            return;
          }
        }
        if (payload.status === "completed" && payload.safety_check_required && !deps.hasCompletedSafetyDeviceCheck(previous) && form.get("safety_devices_checked") !== "on") {
          submitButton.disabled = false;
          submitButton.textContent = "Save Work Order";
          if (errorTarget) errorTarget.textContent = "Use Complete Work and check safety devices before completing equipment work.";
          return;
        }
        const procedureChanged = (previous?.procedure_template_id || "") !== (payload.procedure_template_id || "");
        const procedureCompletionMessage = payload.status === "completed" && (previous?.status !== "completed" || procedureChanged)
          ? deps.blocksProcedureCompletion(previous, payload.procedure_template_id || null)
          : "";
        if (procedureCompletionMessage) {
          deps.setWorkOrderActionWarning(activeWorkOrderId, procedureCompletionMessage);
          submitButton.disabled = false;
          submitButton.textContent = "Save Work Order";
          if (errorTarget) errorTarget.textContent = procedureCompletionMessage;
          return;
        }
        if (payload.status === "completed" && previous?.status !== "completed") {
          payload.completed_at = new Date().toISOString();
          deps.applySafetyCheckPayload(payload, payload.safety_check_required && (form.get("safety_devices_checked") === "on" || deps.hasCompletedSafetyDeviceCheck(previous)));
        } else if (payload.status !== "completed") {
          payload.completed_at = null;
          deps.applySafetyCheckPayload(payload, false);
        } else if (previous?.status === "completed" && payload.safety_check_required && form.has("safety_devices_checked")) {
          deps.applySafetyCheckPayload(payload, form.get("safety_devices_checked") === "on" || deps.hasCompletedSafetyDeviceCheck(previous));
        } else if (previous?.status === "completed" && !payload.safety_check_required) {
          deps.applySafetyCheckPayload(payload, false);
        }
        const { error } = await deps.withOperationTimeout(
          deps.updateWorkOrderSafely(payload, activeWorkOrderId),
          "Work order save timed out. Check your connection and try again.",
          20000
        );
        if (error) {
          submitButton.disabled = false;
          submitButton.textContent = "Save Work Order";
          if (errorTarget) errorTarget.textContent = `Could not save work order: ${deps.friendlyWorkOrderSaveError(error)}`;
          return;
        }
        const changeSnapshot = { ...Object.fromEntries(form.entries()), status: currentStatus };
        const logError = await deps.withOperationTimeout(
          deps.recordWorkOrderEvent(activeWorkOrderId, "updated", deps.describeWorkOrderChanges(previous, changeSnapshot)),
          "Activity log timed out.",
          8000
        ).catch((error) => error);
        deps.setWorkOrderActionWarning("", "");
        deps.showNotice(logError ? `Work order saved, but history did not update: ${logError.message}` : "Work order saved.", logError ? "warning" : "success");
        await deps.render();
      } catch (error) {
        consoleRef.error("Work order save failed", error);
        submitButton.disabled = false;
        submitButton.textContent = "Save Work Order";
        if (errorTarget) errorTarget.textContent = `Could not save work order: ${error.message || error}`;
      } finally {
        if (submitButton && submitButton.isConnected) {
          submitButton.disabled = false;
          submitButton.textContent = "Save Work Order";
        }
      }
    }

    return { updateWorkOrderDetails };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { createWorkOrderDetailEditWorkflow };
  }
  window.MaintainOpsWorkOrderDetailEditWorkflow = { createWorkOrderDetailEditWorkflow };
})();
