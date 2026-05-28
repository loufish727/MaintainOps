(function () {
  function createAssetWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;
    const alertRef = deps.alertRef || alert;
    const CSSRef = deps.CSSRef || CSS;

    async function createAsset(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const errorElement = documentRef.querySelector("#asset-create-error");
      if (errorElement) errorElement.textContent = "";
      const submitButton = formElement.querySelector("button[type='submit']");
      const originalButtonText = submitButton?.textContent || "Add Equipment";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Saving...";
      }
      try {
        const form = new FormDataCtor(formElement);
        const payload = {
          company_id: deps.getActiveCompanyId(),
          location_id: form.get("location_id") || deps.activeLocationDatabaseId(),
          name: deps.requiredText(form.get("name"), "Equipment name"),
          asset_code: String(form.get("asset_code") || "").trim() || null,
          location: String(form.get("location") || "").trim() || null,
          parent_asset_id: form.get("parent_asset_id") || null,
          asset_type: form.get("asset_type") || "machine",
          safety_devices_required: form.get("safety_devices_required") === "on",
          status: "running",
        };
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient().from("assets").insert(payload),
          "Equipment save timed out. Check your connection and try again.",
          15000
        );
        if (error && deps.isMissingColumnError(error, "location_id")) {
          deps.setLocationsReady(false);
          throw new Error(deps.databaseSetupRequiredMessage("saving equipment locations"));
        }
        if (error && deps.isAssetHierarchySchemaError(error)) {
          throw new Error(deps.equipmentSchemaMessage(error));
        }
        if (error) throw error;
        deps.showNotice("Equipment added.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message;
        else alertRef(error.message);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    }

    async function updateAsset(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const errorElement = documentRef.querySelector("#asset-edit-error");
      if (errorElement) errorElement.textContent = "";
      const submitButton = formElement.querySelector("button[type='submit']");
      const originalButtonText = submitButton?.textContent || "Save Equipment";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Saving...";
      }
      try {
        const form = new FormDataCtor(formElement);
        const payload = {
          name: deps.requiredText(form.get("name"), "Equipment name"),
          asset_code: String(form.get("asset_code") || "").trim() || null,
          location_id: form.get("location_id") || deps.activeLocationDatabaseId(),
          location: String(form.get("location") || "").trim() || null,
          parent_asset_id: form.get("parent_asset_id") || null,
          asset_type: form.get("asset_type") || "machine",
          safety_devices_required: form.get("safety_devices_required") === "on",
          status: form.get("status"),
        };
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("assets")
            .update(payload)
            .eq("id", deps.getActiveAssetId())
            .eq("company_id", deps.getActiveCompanyId()),
          "Equipment save timed out. Check your connection and try again.",
          15000
        );
        if (error && deps.isMissingColumnError(error, "location_id")) {
          deps.setLocationsReady(false);
          throw new Error(deps.databaseSetupRequiredMessage("saving equipment locations"));
        }
        if (error && deps.isAssetHierarchySchemaError(error)) {
          throw new Error(deps.equipmentSchemaMessage(error));
        }
        if (error) throw error;
        deps.showNotice("Equipment saved.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message;
        else alertRef(error.message);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    }

    async function updateAssetStatus(assetId, status) {
      const { error } = await deps.withOperationTimeout(
        deps.supabaseClient()
          .from("assets")
          .update({ status })
          .eq("id", assetId)
          .eq("company_id", deps.getActiveCompanyId()),
        "Equipment status save timed out. Check your connection and try again.",
        12000
      );
      return error || null;
    }

    function assetDeleteBlockers(assetId) {
      return {
        workOrders: deps.getWorkOrders().filter((workOrder) => workOrder.asset_id === assetId).length,
        children: deps.childAssetsFor(assetId).length,
        schedules: deps.getPreventiveSchedules().filter((schedule) => schedule.asset_id === assetId).length,
        requests: deps.getMaintenanceRequests().filter((request) => request.asset_id === assetId).length,
      };
    }

    function assetHasDeleteBlockers(assetId) {
      const blockers = assetDeleteBlockers(assetId);
      return Object.values(blockers).some(Boolean);
    }

    async function loadAssetDeleteBlockers(assetId) {
      const [workOrdersCount, schedulesCount, requestsCount] = await Promise.all([
        countAssetLinkedRows("work_orders", assetId),
        countAssetLinkedRows("preventive_schedules", assetId),
        countAssetLinkedRows("maintenance_requests", assetId),
      ]);
      return {
        workOrders: workOrdersCount,
        children: deps.childAssetsFor(assetId).length,
        schedules: schedulesCount,
        requests: requestsCount,
      };
    }

    async function countAssetLinkedRows(tableName, assetId) {
      const { count, error } = await deps.withOperationTimeout(
        deps.supabaseClient()
          .from(tableName)
          .select("id", { count: "exact", head: true })
          .eq("company_id", deps.getActiveCompanyId())
          .eq("asset_id", assetId),
        `Equipment delete check timed out while checking ${tableName}.`,
        15000
      );
      if (error) throw new Error(`Could not verify linked ${tableName.replaceAll("_", " ")} before deleting equipment: ${error.message}`);
      return count || 0;
    }

    async function requestDeleteAsset(id) {
      if (!deps.canDeleteEquipment()) {
        alertRef("Only company admins and managers can delete equipment.");
        return;
      }
      const errorElement = documentRef.querySelector("#asset-delete-error");
      if (errorElement) errorElement.textContent = "";
      try {
        const blockers = await loadAssetDeleteBlockers(id);
        const message = deps.assetDeleteBlockerMessage(blockers);
        if (message) {
          if (errorElement) errorElement.textContent = message;
          return;
        }
        deps.setPendingDeleteAssetId(id);
        deps.renderWorkspace();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not verify equipment links before delete.";
        else deps.showNotice(error.message || "Could not verify equipment links before delete.", "warning");
      }
    }

    async function deleteAsset(id) {
      if (!deps.canDeleteEquipment()) {
        alertRef("Only company admins and managers can delete equipment.");
        return;
      }
      const errorElement = documentRef.querySelector("#asset-delete-error");
      if (errorElement) errorElement.textContent = "";
      const confirmButton = documentRef.querySelector(`[data-confirm-delete-asset="${CSSRef.escape(id)}"]`);
      if (confirmButton) {
        confirmButton.disabled = true;
        confirmButton.textContent = "Deleting...";
      }

      try {
        const blockers = await loadAssetDeleteBlockers(id);
        const blockerMessage = deps.assetDeleteBlockerMessage(blockers);
        if (blockerMessage) throw new Error(blockerMessage);

        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("assets")
            .delete()
            .eq("id", id)
            .eq("company_id", deps.getActiveCompanyId()),
          "Equipment delete timed out. Check your connection and try again.",
          15000
        );
        if (error) {
          throw new Error(error.message.includes("violates foreign key constraint")
            ? "This equipment is linked to records and cannot be deleted."
            : error.message);
        }
        deps.setActiveAssetId(null);
        deps.setPendingDeleteAssetId(null);
        deps.setActiveSection("assets");
        deps.showNotice("Equipment deleted.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not delete equipment.";
        if (confirmButton) {
          confirmButton.disabled = false;
          confirmButton.textContent = "Permanently Delete";
        }
      }
    }

    async function createQuickFixAsset(name, status = "running") {
      const payload = {
        company_id: deps.getActiveCompanyId(),
        location_id: deps.activeLocationDatabaseId(),
        name,
        asset_type: "machine",
        safety_devices_required: true,
        status,
      };
      const response = await deps.withOperationTimeout(
        deps.supabaseClient()
          .from("assets")
          .insert(payload)
          .select()
          .single(),
        "Equipment save timed out. Check your connection and try again.",
        15000
      );
      if (response.error && deps.isMissingColumnError(response.error, "location_id")) {
        deps.setLocationsReady(false);
        return deps.withSetupError(response, deps.databaseSetupRequiredMessage("adding equipment in this location"));
      }
      if (response.error && deps.isAssetHierarchySchemaError(response.error)) {
        return deps.withSetupError(response, deps.equipmentSchemaMessage(response.error).replace("saving", "adding"));
      }
      return response;
    }

    return {
      assetDeleteBlockers,
      assetHasDeleteBlockers,
      countAssetLinkedRows,
      createAsset,
      createQuickFixAsset,
      deleteAsset,
      loadAssetDeleteBlockers,
      requestDeleteAsset,
      updateAsset,
      updateAssetStatus,
    };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { createAssetWorkflow };
  }
  window.MaintainOpsAssetWorkflow = { createAssetWorkflow };
})();
