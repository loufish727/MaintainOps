(function () {
  function createProductionActionWorkflow(deps = {}) {
    const FormDataCtor = deps.FormDataCtor || FormData;
    const confirmRef = deps.confirmRef || confirm;

    function errorTargetFor(element, workOrderId) {
      return element?.closest?.("[data-production-action-control]")?.querySelector?.(`[data-production-action-error="${workOrderId}"]`)
        || deps.documentRef?.querySelector?.(`[data-production-action-error="${workOrderId}"]`)
        || null;
    }

    async function runMutation({ workOrderId, payload, source, busyText, successMessage }) {
      const button = source?.querySelector?.("button[type='submit']") || source;
      const originalText = button?.textContent || "";
      const errorTarget = errorTargetFor(source, workOrderId);
      if (button) {
        button.disabled = true;
        button.textContent = busyText;
      }
      if (errorTarget) errorTarget.textContent = "";

      try {
        const response = await deps.withOperationTimeout(
          deps.updateProductionActionRecord(workOrderId, payload),
          "Production Action save timed out. Check your connection and try again.",
          15000
        );
        if (response.error) {
          const message = deps.friendlyWorkOrderSaveError(response.error);
          if (errorTarget) errorTarget.textContent = `Could not save Production Action: ${message}`;
          else deps.showNotice(`Could not save Production Action: ${message}`, "warning");
          return false;
        }
        deps.showNotice(successMessage, "success");
        await deps.afterProductionActionMutation(response.data, workOrderId);
        return true;
      } catch (error) {
        const message = error.message || String(error);
        if (errorTarget) errorTarget.textContent = `Could not save Production Action: ${message}`;
        else deps.showNotice(`Could not save Production Action: ${message}`, "warning");
        return false;
      } finally {
        if (button?.isConnected) {
          button.disabled = false;
          button.textContent = originalText;
        }
      }
    }

    async function saveProductionAction(event) {
      event.preventDefault();
      event.stopPropagation();
      const formElement = event.currentTarget;
      const workOrderId = formElement.dataset.productionActionForm;
      const form = new FormDataCtor(formElement);
      const action = String(form.get("production_action") || "").trim();
      const assignedTo = String(form.get("production_action_assigned_to") || "").trim();
      const errorTarget = errorTargetFor(formElement, workOrderId);
      if (!action || !assignedTo) {
        if (errorTarget) errorTarget.textContent = "Enter an action and choose a Production owner.";
        return;
      }
      const existing = deps.getWorkOrderById(workOrderId);
      await runMutation({
        workOrderId,
        payload: {
          production_action: action,
          production_action_assigned_to: assignedTo,
        },
        source: formElement,
        busyText: "Saving...",
        successMessage: existing?.production_action ? "Production Action updated." : "Production Action assigned.",
      });
    }

    async function setProductionActionStatus(event) {
      event.preventDefault();
      event.stopPropagation();
      const button = event.currentTarget;
      const workOrderId = button.dataset.workOrderId;
      const status = button.dataset.productionActionStatus;
      await runMutation({
        workOrderId,
        payload: { production_action_status: status },
        source: button,
        busyText: status === "completed" ? "Completing..." : "Reopening...",
        successMessage: status === "completed" ? "Production Action completed." : "Production Action reopened.",
      });
    }

    async function removeProductionAction(event) {
      event.preventDefault();
      event.stopPropagation();
      const button = event.currentTarget;
      const workOrderId = button.dataset.productionActionRemove;
      if (!confirmRef("Remove this Production Action? Work Order History will keep a record of the removal.")) return;
      await runMutation({
        workOrderId,
        payload: { production_action: null },
        source: button,
        busyText: "Removing...",
        successMessage: "Production Action removed.",
      });
    }

    return {
      saveProductionAction,
      setProductionActionStatus,
      removeProductionAction,
    };
  }

  window.MaintainOpsProductionActionWorkflow = {
    createProductionActionWorkflow,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { createProductionActionWorkflow };
  }
})();
