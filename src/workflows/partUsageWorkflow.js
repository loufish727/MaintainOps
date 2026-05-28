(function () {
  function createPartUsageWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;

    async function recordPartUsed(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const errorElement = documentRef.querySelector("#parts-used-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      if (errorElement) errorElement.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Recording...";
      }

      try {
        const form = new FormDataCtor(formElement);
        const partId = form.get("part_id");
        const quantity = Number(form.get("quantity_used")) || 1;
        const part = deps.getParts().find((item) => item.id === partId);
        if (!deps.getActiveWorkOrderId()) throw new Error("Open a work order before recording parts.");
        if (!part) throw new Error("Choose a part first.");

        const usageError = await addPartUsageToWorkOrder(deps.getActiveWorkOrderId(), part, quantity);
        if (usageError) throw usageError;

        deps.showNotice("Part recorded on work order.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not record part used.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Record Part Used";
        }
      }
    }

    async function addPartUsageToWorkOrder(workOrderId, part, quantity) {
      if (!part) return new Error("Choose a part first.");

      const { error } = await deps.withOperationTimeout(
        deps.supabaseClient().rpc("record_work_order_part_usage", {
          p_company_id: deps.getActiveCompanyId(),
          p_work_order_id: workOrderId,
          p_part_id: part.id,
          p_quantity: quantity,
        }),
        "Part usage save timed out."
      );
      if (error) return error;
      return null;
    }

    return {
      addPartUsageToWorkOrder,
      recordPartUsed,
    };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { createPartUsageWorkflow };
  }
  window.MaintainOpsPartUsageWorkflow = { createPartUsageWorkflow };
})();
