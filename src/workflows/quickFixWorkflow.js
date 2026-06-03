(function () {
  /*
   * Module contract: owns the Quick Fix submit workflow only.
   * Dependencies are injected from app.js so this module does not own auth/session,
   * company/location startup, renderWorkspace, storage policy, SQL, or RLS.
   */
  function createQuickFixWorkflow(deps = {}) {
    const {
      documentRef = document,
      FormDataCtor = FormData,
      withOperationTimeout,
      createQuickFixAsset,
      getMaintenanceRequests,
      getQuickFixRequestId,
      getActiveCompanyId,
      getSession,
      getParts,
      getRequestsReady,
      getSupabaseClient,
      confirmAssetLocationRouting,
      assetRequiresSafety,
      blocksProcedureCompletion,
      setWorkOrderActionWarning,
      locationIdForAsset,
      descriptionWithRequestPhotoNote,
      descriptionWithAssignmentNote,
      assignedUserFromForm,
      procedureColumn,
      workOrderDateValue,
      applySafetyRequirementPayload,
      applySafetyCheckPayload,
      insertWithOptionalProcedure,
      friendlyWorkOrderSaveError,
      addPartUsageToWorkOrder,
      addPhotoToWorkOrder,
      updateAssetStatus,
      recordWorkOrderEvent,
      setActiveWorkOrderIdState,
      setActiveAssetIdState,
      setCreateWorkOrderMode,
      setQuickFixMode,
      setQuickFixAssetId,
      setQuickFixRequestId,
      showNotice,
      render,
      alertUser = (message) => window.alert(message),
    } = deps;

    async function createQuickFix(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const errorTarget = documentRef.querySelector("#quick-fix-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      if (errorTarget) errorTarget.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Saving...";
      }

      try {
        const form = new FormDataCtor(formElement);
        const title = String(form.get("title") || "").trim();
        if (!title) throw new Error("Quick Fix issue is required.");
        const currentQuickFixRequestId = getQuickFixRequestId();
        const currentActiveCompanyId = getActiveCompanyId();
        const currentSession = getSession();
        const resolutionSummary = String(form.get("resolution_summary") || "").trim();
        const quickFixSummary = resolutionSummary || title;
        const markCompleted = form.get("mark_completed") === "on";
        const machineDown = form.get("machine_down") === "on";
        let assetId = form.get("asset_id") || null;
        const sourceRequest = currentQuickFixRequestId ? getMaintenanceRequests().find((request) => request.id === currentQuickFixRequestId) : null;
        const newAssetName = String(form.get("new_asset_name") || "").trim();
        if (newAssetName) {
          const { data: newAsset, error: assetError } = await withOperationTimeout(
            createQuickFixAsset(newAssetName, machineDown ? "offline" : "running"),
            "Equipment save timed out. Check your connection and try again."
          );
          if (assetError) {
            if (errorTarget) errorTarget.textContent = assetError.message;
            return;
          }
          assetId = newAsset.id;
        }
        if (!newAssetName && !confirmAssetLocationRouting(assetId, "logging this Quick Fix", errorTarget)) return;
        if (markCompleted && assetRequiresSafety(assetId) && form.get("safety_devices_checked") !== "on") {
          if (errorTarget) errorTarget.textContent = "Check safety devices before marking equipment work complete.";
          return;
        }
        const procedureCompletionMessage = markCompleted
          ? blocksProcedureCompletion(null, form.get("procedure_template_id") || null)
          : "";
        if (procedureCompletionMessage) {
          setWorkOrderActionWarning("", "");
          if (errorTarget) errorTarget.textContent = `${procedureCompletionMessage} Log it first, then complete the checklist before marking it complete.`;
          return;
        }

        const payload = {
          company_id: currentActiveCompanyId,
          location_id: locationIdForAsset(assetId),
          title,
          description: descriptionWithRequestPhotoNote(descriptionWithAssignmentNote(quickFixSummary, form.get("assigned_to")), sourceRequest),
          asset_id: assetId,
          assigned_to: assignedUserFromForm(form, currentSession.user.id),
          priority: form.get("priority") || "medium",
          type: form.get("type") || "corrective",
          status: markCompleted ? "completed" : "open",
          due_at: workOrderDateValue(form.get("due_at")),
          created_by: currentSession.user.id,
          ...procedureColumn(form.get("procedure_template_id")),
          actual_minutes: 0,
          failure_cause: form.get("failure_cause") || null,
          resolution_summary: markCompleted ? quickFixSummary : (resolutionSummary || null),
          follow_up_needed: form.get("follow_up_needed") === "on",
          completion_notes: markCompleted ? quickFixSummary : null,
          completed_at: markCompleted ? new Date().toISOString() : null,
        };
        applySafetyRequirementPayload(payload);
        applySafetyCheckPayload(payload, markCompleted && payload.safety_check_required && form.get("safety_devices_checked") === "on");

        const { data, error } = await withOperationTimeout(
          insertWithOptionalProcedure("work_orders", payload, { returnSingle: true }),
          "Quick Fix save timed out. Check your connection and try again."
        );

        if (error) {
          if (errorTarget) errorTarget.textContent = `Could not log quick fix: ${friendlyWorkOrderSaveError(error)}`;
          return;
        }

        const warnings = [];
        const partId = form.get("part_id");
        const quantity = Number(form.get("quantity_used")) || 1;
        if (partId) {
          const part = getParts().find((item) => item.id === partId);
          const partError = await withOperationTimeout(
            addPartUsageToWorkOrder(data.id, part, quantity),
            "Part usage save timed out.",
            12000
          ).catch((timeoutError) => timeoutError);
          if (partError) warnings.push(`part usage failed: ${partError.message}`);
        }

        const photo = form.get("photo");
        if (photo && photo.name) {
          const photoError = await withOperationTimeout(
            addPhotoToWorkOrder(data.id, photo),
            "Photo upload timed out.",
            25000
          ).catch((timeoutError) => timeoutError);
          if (photoError) warnings.push(`photo upload failed: ${photoError.message}`);
        }

        const assetStatus = machineDown ? "offline" : form.get("asset_status");
        if (payload.asset_id && !newAssetName && (machineDown || (markCompleted && assetStatus))) {
          const assetError = await withOperationTimeout(
            updateAssetStatus(payload.asset_id, assetStatus),
            "Equipment status update timed out.",
            12000
          ).catch((timeoutError) => timeoutError);
          if (assetError) {
            warnings.push(`equipment status did not update: ${assetError.message}`);
          } else {
            await withOperationTimeout(
              recordWorkOrderEvent(data.id, "asset_status_updated", machineDown ? "Equipment marked offline/down." : `Equipment status set to ${assetStatus}.`),
              "Activity log timed out.",
              8000
            ).catch((logError) => warnings.push(`history did not update: ${logError.message}`));
          }
        }

        await withOperationTimeout(
          recordWorkOrderEvent(data.id, "quick_fix", markCompleted ? "Quick fix recorded as completed." : "Quick fix logged and assigned to creator."),
          "Activity log timed out.",
          8000
        ).catch((logError) => warnings.push(`history did not update: ${logError.message}`));
        if (newAssetName) {
          await withOperationTimeout(
            recordWorkOrderEvent(data.id, "equipment_created", `Equipment created from Quick Fix: ${newAssetName}.`),
            "Activity log timed out.",
            8000
          ).catch((logError) => warnings.push(`history did not update: ${logError.message}`));
        }
        if (currentQuickFixRequestId && getRequestsReady()) {
          const requestUpdate = await withOperationTimeout(
            getSupabaseClient()
              .from("maintenance_requests")
              .update({
                status: "converted",
                reviewed_by: currentSession.user.id,
                reviewed_at: new Date().toISOString(),
                converted_work_order_id: data.id,
              })
              .eq("id", currentQuickFixRequestId)
              .eq("company_id", currentActiveCompanyId),
            "Request status update timed out.",
            12000
          ).catch((timeoutError) => ({ error: timeoutError }));
          if (requestUpdate.error) {
            warnings.push(`request status did not update: ${requestUpdate.error.message}`);
          } else {
            await withOperationTimeout(
              recordWorkOrderEvent(data.id, "request_quick_fixed", markCompleted ? "Request resolved through Quick Fix." : "Request converted to a Quick Fix work order."),
              "Activity log timed out.",
              8000
            ).catch((logError) => warnings.push(`history did not update: ${logError.message}`));
          }
        }
        setActiveWorkOrderIdState(data.id);
        setActiveAssetIdState(null);
        setCreateWorkOrderMode(false);
        setQuickFixMode(false);
        setQuickFixAssetId(null);
        setQuickFixRequestId(null);
        showNotice(warnings.length ? `Quick Fix saved with warning: ${warnings[0]}` : "Quick Fix saved.", warnings.length ? "warning" : "success");
        await render();
      } catch (error) {
        if (errorTarget) errorTarget.textContent = `Could not log quick fix: ${error.message || error}`;
        else alertUser(error.message || error);
      } finally {
        if (submitButton && submitButton.isConnected) {
          submitButton.disabled = false;
          submitButton.textContent = "Log Quick Fix";
        }
      }
    }

    return { createQuickFix };
  }

  window.MaintainOpsQuickFixWorkflow = {
    createQuickFixWorkflow,
  };

  if (typeof module !== "undefined") {
    module.exports = { createQuickFixWorkflow };
  }
})();
