(function () {
  function createWorkOrderCreationWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;
    const alertRef = deps.alertRef || alert;

    async function createWorkOrder(event) {
      event.preventDefault();
      const formElement = event.target;
      const submitButton = formElement.querySelector("button[type='submit']");
      const errorTarget = documentRef.querySelector("#create-work-order-error");
      submitButton.disabled = true;
      submitButton.textContent = "Creating...";
      if (errorTarget) errorTarget.textContent = "";

      try {
        const form = new FormDataCtor(formElement);
        const status = form.get("status") || "open";
        let assetId = form.get("asset_id") || null;
        const newAssetName = String(form.get("new_asset_name") || "").trim();
        if (assetId && newAssetName) {
          throw new Error("Choose existing equipment or create new equipment, not both.");
        }
        if (newAssetName) {
          const { data: newAsset, error: assetError } = await deps.createQuickFixAsset(newAssetName, "running");
          if (assetError) {
            if (errorTarget) errorTarget.textContent = `Could not add equipment: ${assetError.message}`;
            return;
          }
          assetId = newAsset.id;
        }
        if (!newAssetName && !deps.confirmAssetLocationRouting(assetId, "creating this work order", errorTarget)) return;
        if (status === "completed" && deps.assetRequiresSafety(assetId) && form.get("safety_devices_checked") !== "on") {
          if (errorTarget) errorTarget.textContent = "Check safety devices before creating completed work tied to equipment.";
          return;
        }
        const procedureCompletionMessage = status === "completed"
          ? deps.blocksProcedureCompletion(null, form.get("procedure_template_id") || null)
          : "";
        if (procedureCompletionMessage) {
          deps.setWorkOrderActionWarning("", "");
          if (errorTarget) errorTarget.textContent = `${procedureCompletionMessage} Create the work order first, then complete the checklist before marking it complete.`;
          return;
        }
        const payload = {
          company_id: deps.getActiveCompanyId(),
          location_id: deps.locationIdForAsset(assetId),
          title: deps.requiredText(form.get("title"), "Work order title"),
          description: deps.descriptionWithAssignmentNote(form.get("description"), form.get("assigned_to")),
          asset_id: assetId,
          priority: form.get("priority"),
          type: form.get("type") || "corrective",
          due_at: deps.workOrderDateValue(form.get("due_at")),
          assigned_to: deps.assignedUserFromForm(form),
          ...deps.procedureColumn(form.get("procedure_template_id")),
          status,
          created_by: deps.getSession().user.id,
          actual_minutes: Number(form.get("actual_minutes")) || 0,
          failure_cause: form.get("failure_cause") || null,
          resolution_summary: form.get("resolution_summary") || null,
          follow_up_needed: form.get("follow_up_needed") === "on",
          completion_notes: form.get("completion_notes") || null,
          completed_at: status === "completed" ? new Date().toISOString() : null,
        };
        deps.applySafetyRequirementPayload(payload);
        deps.applySafetyCheckPayload(payload, status === "completed" && payload.safety_check_required && form.get("safety_devices_checked") === "on");
        const { data, error } = await deps.withOperationTimeout(
          deps.insertWithOptionalProcedure("work_orders", payload, { returnSingle: true }),
          "Work order creation timed out. Check your connection and try again."
        );
        if (error) {
          if (errorTarget) errorTarget.textContent = `Could not create work order: ${deps.friendlyWorkOrderSaveError(error)}`;
          return;
        }
        await deps.recordWorkOrderEvent(data.id, "created", "Work order created.");
        if (newAssetName) {
          await deps.recordWorkOrderEvent(data.id, "equipment_created", `Equipment created from work order: ${newAssetName}.`);
        }

        const warnings = [];
        const partId = form.get("part_id");
        if (partId) {
          const part = deps.getParts().find((item) => item.id === partId);
          const partError = await deps.addPartUsageToWorkOrder(data.id, part, Number(form.get("quantity_used")) || 1);
          if (partError) warnings.push(`part usage failed: ${partError.message}`);
          else await deps.recordWorkOrderEvent(data.id, "part_used", `Part recorded: ${part?.name || "Part"}.`);
        }

        const photo = form.get("photo");
        if (photo && photo.name) {
          const photoError = await deps.addPhotoToWorkOrder(data.id, photo);
          if (photoError) warnings.push(`photo upload failed: ${photoError.message}`);
          else await deps.recordWorkOrderEvent(data.id, "photo_uploaded", `Photo uploaded: ${photo.name}.`);
        }

        const initialComment = String(form.get("initial_comment") || "").trim();
        if (initialComment) {
          const commentError = await deps.addCommentToWorkOrder(data.id, initialComment);
          if (commentError) warnings.push(`comment failed: ${commentError.message}`);
          else await deps.recordWorkOrderEvent(data.id, "comment_added", "Initial comment added.");
        }

        deps.setActiveWorkOrderId(data.id);
        deps.setCreateWorkOrderMode(false);
        deps.showNotice(warnings.length ? `Work order created with warning: ${warnings[0]}` : "Work order created.", warnings.length ? "warning" : "success");
        await deps.render();
      } catch (error) {
        if (errorTarget) errorTarget.textContent = `Could not create work order: ${error.message || error}`;
        else alertRef(error.message || error);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Create Work Order";
      }
    }

    return { createWorkOrder };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { createWorkOrderCreationWorkflow };
  }
  window.MaintainOpsWorkOrderCreationWorkflow = { createWorkOrderCreationWorkflow };
})();
