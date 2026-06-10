(function () {
  /*
   * Module contract: owns work-order status mutation workflow only.
   * May enforce injected checklist/safety completion gates, update injected work-order record,
   * record injected activity, and render via injected callbacks.
   * Must not own assignment, delete, quick update, completion form, auth/session, SQL, or RLS.
   */
  function createWorkOrderStatusWorkflow(deps = {}) {
    async function updateWorkOrderStatus(event) {
      const previous = deps.getWorkOrders().find((item) => item.id === deps.getActiveWorkOrderId());
      event.target.disabled = true;
      try {
        const saved = await setWorkOrderStatus(deps.getActiveWorkOrderId(), event.target.value);
        if (!saved) event.target.value = previous?.status || "open";
      } catch (error) {
        event.target.value = previous?.status || "open";
        deps.showNotice(`Could not update status: ${error.message || error}`, "warning");
      } finally {
        event.target.disabled = false;
      }
    }

    async function setWorkOrderStatus(id, status) {
      const workOrder = deps.getWorkOrders().find((item) => item.id === id);
      if (status === "completed") {
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
        asset_id: workOrder?.asset_id || null,
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
        deps.showNotice(`Could not update status: ${deps.friendlyWorkOrderSaveError(error)}`, "warning");
        return false;
      }

      deps.setActiveWorkOrderId(id);
      deps.setWorkOrderActionWarning("", "");
      await deps.recordWorkOrderEvent(id, "status_changed", `Status changed to ${deps.statusLabel(status)}.`);
      deps.showNotice(`Status changed to ${deps.statusLabel(status)}.`);
      await deps.render();
      return true;
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
