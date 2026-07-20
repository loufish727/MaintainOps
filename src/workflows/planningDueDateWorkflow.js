(function () {
  function createPlanningDueDateWorkflow(deps) {
    async function savePlanningDueDate(workOrderId, value) {
      if (!deps.canEditOperationalRecords()) {
        deps.showNotice("This account can view Planning but cannot change work orders.", "warning");
        return { saved: false, reason: "read_only" };
      }

      const workOrder = deps.getPlanningWorkOrders().find((item) => item.id === workOrderId);
      if (!workOrder || workOrder.status === "completed") {
        deps.showNotice("That work order is no longer available in the no-due-date queue.", "warning");
        return { saved: false, reason: "not_available" };
      }

      try {
        const dueAt = deps.workOrderDateValue(value);
        if (!dueAt) throw new Error("Choose a due date.");
        const response = await deps.withOperationTimeout(
          deps.updateWorkOrderSafely({ due_at: dueAt }, workOrderId),
          "Due date save timed out. Check your connection and try again."
        );
        if (response.error) throw response.error;

        deps.setPlanningWorkOrders(deps.getPlanningWorkOrders().map((item) => (
          item.id === workOrderId ? { ...item, due_at: dueAt } : item
        )));
        deps.setWorkOrders(deps.getWorkOrders().map((item) => (
          item.id === workOrderId ? { ...item, due_at: dueAt } : item
        )));
        deps.resetNoDuePage();
        await deps.recordWorkOrderEvent(workOrderId, "updated", `Due date set to ${dueAt} from Planning.`);
        deps.showNotice("Due date set. The order moved out of No Due Date.");
        deps.renderWorkspace();
        return { saved: true, dueAt };
      } catch (error) {
        deps.showNotice(`Could not set due date: ${error.message || error}`, "warning");
        return { saved: false, reason: "save_failed", error };
      }
    }

    return { savePlanningDueDate };
  }

  window.MaintainOpsPlanningDueDateWorkflow = {
    createPlanningDueDateWorkflow,
  };

  if (typeof module !== "undefined") {
    module.exports = { createPlanningDueDateWorkflow };
  }
})();
