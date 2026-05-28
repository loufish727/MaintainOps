(function () {
  function createRequestLifecycleWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;
    const alertRef = deps.alertRef || alert;
    const CSSRef = deps.CSSRef || CSS;

    function renderRequestForm() {
      const detailPanel = documentRef.querySelector("#detail-panel");
      detailPanel.innerHTML = deps.renderRequestFormContent();
    }

    async function createRequest(event) {
      event.preventDefault();
      await createRequestFromForm(event.target);
    }

    async function createRequestFromForm(formElement) {
      const errorElement = documentRef.querySelector("#request-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      if (errorElement) errorElement.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
      }

      try {
        const form = new FormDataCtor(formElement);
        const assetId = form.get("asset_id") || null;
        if (!deps.confirmAssetLocationRouting(assetId, "submitting this request", errorElement)) return;
        const requestPayload = {
          company_id: deps.getActiveCompanyId(),
          location_id: deps.locationIdForAsset(assetId),
          title: deps.requiredText(form.get("title"), "Request title"),
          description: deps.requiredText(form.get("description"), "Request description"),
          asset_id: assetId,
          priority: form.get("priority"),
          status: "submitted",
          requested_by: deps.getSession().user.id,
        };

        if (!deps.getRequestsReady()) {
          throw new Error("Run supabase/step-next-maintenance-requests.sql before submitting requests.");
        }
        const { data, error } = await deps.withOperationTimeout(
          deps.supabaseClient().from("maintenance_requests").insert(requestPayload).select("*").single(),
          "Request save timed out. Check your connection and try again.",
          15000
        );
        if (error && deps.isMissingColumnError(error, "location_id")) {
          deps.setLocationsReady(false);
          throw new Error(deps.databaseSetupRequiredMessage("saving requests by location"));
        }
        if (error) throw error;
        const photo = form.get("photo");
        let photoWarning = "";
        if (photo && photo.name) {
          const photoError = await deps.addPhotoToMaintenanceRequest(data.id, photo);
          if (photoError) photoWarning = ` Photo did not upload: ${photoError.message || photoError}`;
        }
        deps.setActiveSection("requests");
        deps.setRequestViewFilter("active");
        deps.resetRequestsPage();
        deps.showNotice(`Request submitted.${photoWarning}`, photoWarning ? "warning" : "success");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not submit request.";
        else alertRef(error.message || error);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Submit Request";
        }
      }
    }

    async function convertRequestToWorkOrder(requestId) {
      const request = deps.getMaintenanceRequests().find((item) => item.id === requestId);
      if (!request) return;
      const button = documentRef.querySelector(`[data-convert-request="${CSSRef.escape(requestId)}"]`);
      if (button) {
        button.disabled = true;
        button.textContent = "Converting...";
      }

      try {
        const payload = {
          company_id: deps.getActiveCompanyId(),
          location_id: request.location_id || deps.locationIdForAsset(request.asset_id),
          title: request.title,
          description: deps.descriptionWithRequestPhotoNote(request.description, request),
          asset_id: request.asset_id || null,
          priority: request.priority || "medium",
          type: "reactive",
          status: "open",
          created_by: deps.getSession().user.id,
        };
        deps.applySafetyRequirementPayload(payload);
        deps.applySafetyCheckPayload(payload, false);
        const { data, error } = await deps.withOperationTimeout(
          deps.insertWithOptionalProcedure("work_orders", payload, { returnSingle: true }),
          "Request conversion timed out. Check your connection and try again.",
          15000
        );
        if (error) throw error;

        const { error: updateError } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("maintenance_requests")
            .update({
              status: "converted",
              reviewed_by: deps.getSession().user.id,
              reviewed_at: new Date().toISOString(),
              converted_work_order_id: data.id,
            })
            .eq("id", requestId)
            .eq("company_id", deps.getActiveCompanyId()),
          "Request status update timed out. Check your connection and try again.",
          15000
        );
        if (updateError) throw updateError;

        deps.setActiveSection("work");
        deps.setActiveWorkOrderId(data.id);
        await deps.withOperationTimeout(
          deps.recordWorkOrderEvent(data.id, "request_converted", "Request converted to work order."),
          "Activity log timed out.",
          8000
        ).catch(() => null);
        deps.showNotice("Request converted to work order.");
        await deps.render();
      } catch (error) {
        deps.showNotice(`Could not convert request: ${error.message || error}`, "warning");
        if (button) {
          button.disabled = false;
          button.textContent = "Convert to Work Order";
        }
      }
    }

    function openQuickFixForRequest(requestId) {
      const request = deps.getMaintenanceRequests().find((item) => item.id === requestId);
      if (!request) return;
      deps.setQuickFixRequestId(requestId);
      deps.setQuickFixAssetId(request.asset_id || null);
      deps.setQuickFixMode(true);
      deps.setActiveWorkOrderId(null);
      deps.setActiveAssetId(null);
      deps.setCreateWorkOrderMode(false);
      deps.setActiveSection("mywork");
      deps.renderWorkspace();
    }

    function requestDeleteMaintenanceRequest(id) {
      if (!deps.canDeleteOperationalRecords()) {
        alertRef("Only company admins and managers can delete requests.");
        return;
      }
      if (!deps.getMaintenanceRequests().some((request) => request.id === id)) return;
      deps.setPendingDeleteRequestId(id);
      deps.renderWorkspace();
    }

    async function deleteMaintenanceRequest(id) {
      if (!deps.canDeleteOperationalRecords()) {
        alertRef("Only company admins and managers can delete requests.");
        return;
      }

      const request = deps.getMaintenanceRequests().find((item) => item.id === id);
      if (!request) return;
      const button = documentRef.querySelector(`[data-confirm-delete-request="${CSSRef.escape(id)}"]`);
      if (button) {
        button.disabled = true;
        button.textContent = "Deleting...";
      }

      try {
        if (request.photo_storage_path) {
          const storageDelete = await deps.withOperationTimeout(
            deps.supabaseClient().storage.from("maintenance-request-photos").remove([request.photo_storage_path]),
            "Request photo cleanup timed out.",
            15000
          );
          if (storageDelete.error) throw new Error(`Could not remove request photo: ${storageDelete.error.message}`);
        }

        const { data, error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("maintenance_requests")
            .delete()
            .eq("id", id)
            .eq("company_id", deps.getActiveCompanyId())
            .select("id"),
          "Request delete timed out. Check your connection and try again.",
          15000
        );
        if (error) throw error;
        if (!data?.length) {
          throw new Error("Request was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");
        }

        const verification = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("maintenance_requests")
            .select("id")
            .eq("id", id)
            .eq("company_id", deps.getActiveCompanyId())
            .maybeSingle(),
          "Request delete verification timed out. Refresh and check the request list.",
          15000
        );
        if (verification.error) throw new Error(`Request delete verification failed: ${verification.error.message}`);
        if (verification.data) throw new Error("Request delete did not persist in Supabase.");

        deps.setPendingDeleteRequestId(null);
        deps.showNotice("Request deleted.");
        await deps.render();
      } catch (error) {
        deps.showNotice(error.message || "Could not delete request.", "warning");
        if (button) {
          button.disabled = false;
          button.textContent = "Permanently Delete";
        }
      }
    }

    return {
      convertRequestToWorkOrder,
      createRequest,
      createRequestFromForm,
      deleteMaintenanceRequest,
      openQuickFixForRequest,
      renderRequestForm,
      requestDeleteMaintenanceRequest,
    };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { createRequestLifecycleWorkflow };
  }
  window.MaintainOpsRequestLifecycleWorkflow = { createRequestLifecycleWorkflow };
})();
