(function () {
  /*
   * Module contract: owns work-order status mutation workflow only.
   * May enforce injected checklist/safety completion gates, update injected work-order record,
   * record injected activity, and render via injected callbacks.
   * Must not own assignment, delete, quick update, completion form, auth/session, SQL, or RLS.
   */
  function createWorkOrderStatusWorkflow(deps = {}) {
    const pending = new Set();

    function captureScope() {
      const scope = deps.getScope?.();
      return () => deps.getScope?.() === scope;
    }

    async function updateWorkOrderStatus(event) {
      const target = event.target;
      const id = deps.getActiveWorkOrderId();
      if (target.disabled || pending.has(id)) return;
      const isCurrent = captureScope();
      const previous = deps.getWorkOrders().find((item) => item.id === id);
      target.disabled = true;
      try {
        const saved = await setWorkOrderStatus(id, target.value);
        if (!saved && isCurrent()) target.value = previous?.status || "open";
      } catch (error) {
        if (isCurrent()) {
          target.value = previous?.status || "open";
          deps.showNotice(`Could not update status: ${error.message || error}`, "warning");
        }
      } finally {
        target.disabled = false;
      }
    }

    async function setWorkOrderStatus(id, status) {
      if (pending.has(id)) return false;
      const isCurrent = captureScope();
      const workOrder = id && deps.getWorkOrders().find((item) => item.id === id);
      if (!workOrder) {
        deps.showNotice("This work order is no longer available. Refresh and try again.", "warning");
        return false;
      }
      pending.add(id);
      let statusSaved = false;
      try {
        if (status === "completed") {
          const productionActionMessage = deps.productionActionCompletionMessage?.(workOrder) || "";
          if (productionActionMessage) {
            deps.setActiveWorkOrderId(id);
            deps.setWorkOrderActionWarning(id, productionActionMessage);
            deps.showNotice(productionActionMessage, "warning");
            await deps.render();
            return false;
          }
          const procedureCompletionMessage = deps.blocksProcedureCompletion(workOrder);
          if (procedureCompletionMessage) {
            deps.setActiveWorkOrderId(id);
            deps.setWorkOrderActionWarning(id, procedureCompletionMessage);
            deps.showNotice(procedureCompletionMessage, "warning");
            await deps.render();
            return false;
          }
        }

        const safetyCheckedNow = deps.currentSafetyCheckboxCheckedForWorkOrder(id);
        const hasSafetyCheck = deps.hasCompletedSafetyDeviceCheck(workOrder) || safetyCheckedNow;
        if (status === "completed" && deps.requiresSafetyDeviceCheck(workOrder) && !hasSafetyCheck) {
          deps.setActiveWorkOrderId(id);
          const safetyMessage = "Safety devices must be checked before completing equipment work. Open the work order and use Complete Work.";
          deps.setWorkOrderActionWarning(id, safetyMessage);
          deps.showNotice(safetyMessage, "warning");
          await deps.render();
          return false;
        }

        const payload = {
          status,
          asset_id: workOrder.asset_id || null,
          completed_at: status === "completed" ? new Date().toISOString() : null,
        };
        deps.applySafetyRequirementPayload(payload);
        if (status === "completed") {
          deps.applySafetyCheckPayload(payload, payload.safety_check_required && hasSafetyCheck);
        } else if (status !== "completed") {
          deps.applySafetyCheckPayload(payload, false);
        }
        delete payload.asset_id;

        const { error } = await deps.withOperationTimeout(
          deps.updateWorkOrderSafely(payload, id),
          "Status save timed out. Check your connection and try again.",
          15000
        );
        if (error) {
          if (isCurrent()) deps.showNotice(`Could not update status: ${deps.friendlyWorkOrderSaveError(error)}`, "warning");
          return false;
        }
        statusSaved = true;
        if (!isCurrent()) return true;

        let historyError;
        try {
          const result = await deps.recordWorkOrderEvent(id, "status_changed", `Status changed to ${deps.statusLabel(status)}.`);
          historyError = result?.error;
        } catch (error) {
          historyError = error || new Error("History save failed.");
        }
        if (!isCurrent()) return true;

        deps.setActiveWorkOrderId(id);
        deps.setWorkOrderActionWarning("", "");
        if (historyError) {
          deps.showNotice(`Status changed to ${deps.statusLabel(status)}, but history could not be saved: ${historyError.message || historyError}`, "warning");
        } else {
          deps.showNotice(`Status changed to ${deps.statusLabel(status)}.`);
        }
        await deps.render();
        return true;
      } catch (error) {
        if (isCurrent()) {
          const message = statusSaved
            ? `Status changed to ${deps.statusLabel(status)}, but the view could not be refreshed: ${error.message || error}`
            : `Could not update status: ${error.message || error}`;
          deps.showNotice(message, "warning");
        }
        return statusSaved;
      } finally {
        pending.delete(id);
      }
    }

    return {
      setWorkOrderStatus,
      updateWorkOrderStatus,
    };
  }

  window.MaintainOpsWorkOrderStatusWorkflow = {
    createWorkOrderStatusWorkflow,
  };

  if (typeof module !== "undefined") {
    module.exports = { createWorkOrderStatusWorkflow };
  }
})();
