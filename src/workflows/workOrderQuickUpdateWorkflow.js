(function () {
  function createWorkOrderQuickUpdateWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;
    const consoleRef = deps.consoleRef || console;

    async function updateWorkOrderQuickView(event) {
      event.preventDefault();
      const formElement = event.target;
      const submitButton = formElement.querySelector("button[type='submit']");
      const errorTarget = documentRef.querySelector("#quick-update-error");
      const previous = deps.getWorkOrders().find((workOrder) => workOrder.id === deps.getActiveWorkOrderId());
      const form = new FormDataCtor(formElement);
      submitButton.disabled = true;
      submitButton.textContent = "Saving...";
      if (errorTarget) errorTarget.textContent = "";

      try {
        let assetId = form.get("asset_id") || null;
        const newAssetName = String(form.get("new_asset_name") || "").trim();
        if (assetId && newAssetName) {
          throw new Error("Choose existing equipment or create new equipment, not both.");
        }
        if (newAssetName) {
          const { data: newAsset, error: assetError } = await deps.createQuickFixAsset(newAssetName, "running");
          if (assetError) {
            submitButton.disabled = false;
            submitButton.textContent = "Save Quick Update";
            if (errorTarget) errorTarget.textContent = `Could not add equipment: ${assetError.message}`;
            return;
          }
          assetId = newAsset.id;
        }
        if (!newAssetName && !deps.confirmAssetLocationRouting(assetId, "saving this work update", errorTarget)) return;
        const payload = {
          title: deps.requiredText(form.get("title"), "Issue"),
          description: deps.descriptionWithAssignmentNote(previous?.description || "", form.get("assigned_to")),
          asset_id: assetId,
          location_id: deps.locationIdForAsset(assetId),
          due_at: deps.workOrderDateValue(form.get("due_at")),
          status: form.get("status"),
          priority: form.get("priority"),
          assigned_to: deps.assignedUserFromForm(form),
          ...deps.procedureColumn(form.get("procedure_template_id")),
          resolution_summary: form.get("resolution_summary") || null,
        };
        deps.applySafetyRequirementPayload(payload);
        const safetyChecked = form.get("safety_devices_checked") === "on";
        if (payload.status === "completed" && previous?.status !== "completed") {
          const procedureCompletionMessage = deps.blocksProcedureCompletion(previous, payload.procedure_template_id || null);
          if (procedureCompletionMessage) {
            deps.setWorkOrderActionWarning(deps.getActiveWorkOrderId(), procedureCompletionMessage);
            submitButton.disabled = false;
            submitButton.textContent = "Save Quick Update";
            if (errorTarget) errorTarget.textContent = procedureCompletionMessage;
            return;
          }
          deps.applySafetyCheckPayload(payload, safetyChecked);
          if (deps.requiresSafetyDeviceCheck(payload) && !payload.safety_devices_checked) {
            submitButton.disabled = false;
            submitButton.textContent = "Save Quick Update";
            if (errorTarget) errorTarget.textContent = "Check safety devices before completing work tied to equipment.";
            return;
          }
          payload.completed_at = new Date().toISOString();
        }
        if (payload.status !== "completed") {
          payload.completed_at = null;
          deps.applySafetyCheckPayload(payload, false);
        } else if (previous?.status === "completed") {
          deps.applySafetyCheckPayload(payload, payload.safety_check_required && (safetyChecked || deps.hasCompletedSafetyDeviceCheck(previous)));
        }

        const { error } = await deps.withOperationTimeout(
          deps.updateWorkOrderSafely(payload, deps.getActiveWorkOrderId()),
          "Quick update save timed out. Check your connection and try again.",
          20000
        );
        if (error) {
          submitButton.disabled = false;
          submitButton.textContent = "Save Quick Update";
          if (errorTarget) errorTarget.textContent = `Could not save update: ${deps.friendlyWorkOrderSaveError(error)}`;
          return;
        }

        const warnings = [];
        if (payload.asset_id && form.get("machine_down") === "on") {
          const assetError = await deps.updateAssetStatus(payload.asset_id, "offline");
          if (assetError) {
            warnings.push(`equipment status did not update: ${assetError.message}`);
          } else {
            await deps.recordWorkOrderEvent(deps.getActiveWorkOrderId(), "asset_status_updated", "Equipment marked offline/down.");
          }
        }

        const logError = await deps.withOperationTimeout(
          deps.recordWorkOrderEvent(deps.getActiveWorkOrderId(), "quick_update", deps.describeWorkOrderChanges(previous, Object.fromEntries(form.entries()))),
          "Activity log timed out.",
          8000
        ).catch((error) => error);
        if (newAssetName) {
          await deps.withOperationTimeout(
            deps.recordWorkOrderEvent(deps.getActiveWorkOrderId(), "equipment_created", `Equipment created from work order: ${newAssetName}.`),
            "Activity log timed out.",
            8000
          ).catch(() => null);
        }
        if (logError) warnings.push(`history did not update: ${logError.message}`);
        deps.setWorkOrderActionWarning("", "");
        deps.showNotice(warnings.length ? `Quick update saved with warning: ${warnings[0]}` : "Quick update saved.", warnings.length ? "warning" : "success");
        await deps.render();
      } catch (error) {
        consoleRef.error("Quick update save failed", error);
        submitButton.disabled = false;
        submitButton.textContent = "Save Quick Update";
        if (errorTarget) errorTarget.textContent = `Could not save update: ${error.message || error}`;
      }
    }

    return {
      updateWorkOrderQuickView,
    };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { createWorkOrderQuickUpdateWorkflow };
  }
  window.MaintainOpsWorkOrderQuickUpdateWorkflow = { createWorkOrderQuickUpdateWorkflow };
})();
