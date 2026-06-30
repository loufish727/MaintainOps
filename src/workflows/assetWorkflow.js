(function () {
  function createAssetWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;
    const alertRef = deps.alertRef || alert;
    const CSSRef = deps.CSSRef || CSS;

    function areaSpotFromForm(form) {
      return String(form.get("location_new") || form.get("location_existing") || form.get("location") || "").trim() || null;
    }

    function currentUserId() {
      return deps.getSession?.()?.user?.id || null;
    }

    function assetById(assetId) {
      return (deps.getAssets?.() || []).find((asset) => asset.id === assetId) || null;
    }

    function changedFieldLabels(previous, next) {
      if (!previous) return [];
      const labels = {
        name: "name",
        asset_code: "equipment ID",
        location_id: "location",
        location: "area / spot",
        parent_asset_id: "primary equipment",
        asset_type: "type",
        safety_devices_required: "safety requirement",
        status: "status",
      };
      return Object.keys(labels)
        .filter((key) => String(previous[key] ?? "") !== String(next[key] ?? ""))
        .map((key) => labels[key]);
    }

    async function createAsset(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const errorElement = documentRef.querySelector("#asset-create-error");
      if (errorElement) errorElement.textContent = "";
      const submitButton = formElement.querySelector("button[type='submit']");
      const originalButtonText = submitButton?.textContent || "Add Equipment";
      const shouldContinue = event.submitter?.dataset?.assetContinue === "true";
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
          location: areaSpotFromForm(form),
          parent_asset_id: form.get("parent_asset_id") || null,
          asset_type: form.get("asset_type") || "machine",
          safety_devices_required: form.get("safety_devices_required") === "on",
          status: "running",
          created_by: currentUserId(),
        };
        const query = deps.supabaseClient().from("assets").insert(payload).select("id").single();
        const { data, error } = await deps.withOperationTimeout(
          query,
          "Equipment save timed out. Check your connection and try again.",
          15000
        );
        if (error && deps.isMissingColumnError(error, "location_id")) {
          deps.setLocationsReady(false);
          throw new Error(deps.databaseSetupRequiredMessage("saving equipment locations"));
        }
        if (error && deps.isMissingColumnError(error, "created_by")) {
          throw new Error("Run supabase/step-next-asset-events.sql before saving equipment history.");
        }
        if (error && deps.isAssetHierarchySchemaError(error)) {
          throw new Error(deps.equipmentSchemaMessage(error));
        }
        if (error) throw error;
        if (data?.id && typeof deps.recordAssetEvent === "function") {
          await deps.recordAssetEvent(data.id, "created", `Created ${payload.name}.`);
        }
        if (shouldContinue && data?.id) {
          deps.setActiveAssetId(data.id);
          deps.showNotice("Equipment saved. Add PM, parts, files, or sub-equipment from this page.");
        } else {
          deps.showNotice("Equipment added.");
        }
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
        const previous = assetById(deps.getActiveAssetId());
        const payload = {
          name: deps.requiredText(form.get("name"), "Equipment name"),
          asset_code: String(form.get("asset_code") || "").trim() || null,
          location_id: form.get("location_id") || deps.activeLocationDatabaseId(),
          location: areaSpotFromForm(form),
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
        const changed = changedFieldLabels(previous, payload);
        if (changed.length && typeof deps.recordAssetEvent === "function") {
          await deps.recordAssetEvent(deps.getActiveAssetId(), "updated", `Updated ${changed.join(", ")}.`);
        }
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
      if (!error && typeof deps.recordAssetEvent === "function") {
        await deps.recordAssetEvent(assetId, "status_changed", `Status changed to ${status}.`);
      }
      return error || null;
    }

    async function attachAssetPart(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const assetId = formElement.dataset.attachAssetPart;
      const errorElement = documentRef.querySelector(`[data-asset-part-error="${CSSRef.escape(assetId)}"]`);
      if (errorElement) errorElement.textContent = "";
      const submitButton = formElement.querySelector("button[type='submit']");
      const originalButtonText = submitButton?.textContent || "Attach Part";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Attaching...";
      }

      try {
        const form = new FormDataCtor(formElement);
        const partId = form.get("part_id");
        if (!partId) throw new Error("Select a part to attach.");
        const quantity = Math.max(1, Number(form.get("quantity_recommended")) || 1);
        const note = String(form.get("note") || "").trim() || null;
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient().from("asset_parts").insert({
            company_id: deps.getActiveCompanyId(),
            asset_id: assetId,
            part_id: partId,
            quantity_recommended: quantity,
            note,
          }),
          "Equipment part link save timed out. Check your connection and try again.",
          15000
        );
        if (error) {
          if (deps.isMissingTableError?.(error, "asset_parts")) {
            deps.setAssetPartsReady(false);
            throw new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.");
          }
          if (error.code === "23505") throw new Error("This part is already linked to this equipment.");
          throw error;
        }
        deps.showNotice("Part linked to equipment.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not link part to equipment.";
        else deps.showNotice(error.message || "Could not link part to equipment.", "warning");
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    }

    async function removeAssetPart(id) {
      const errorElement = documentRef.querySelector("[data-asset-part-error]");
      if (errorElement) errorElement.textContent = "";
      try {
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("asset_parts")
            .delete()
            .eq("id", id)
            .eq("company_id", deps.getActiveCompanyId()),
          "Equipment part unlink timed out. Check your connection and try again.",
          15000
        );
        if (error) {
          if (deps.isMissingTableError?.(error, "asset_parts")) {
            deps.setAssetPartsReady(false);
            throw new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.");
          }
          throw error;
        }
        deps.showNotice("Part link removed.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not remove linked part.";
        else deps.showNotice(error.message || "Could not remove linked part.", "warning");
      }
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

        const documentPaths = deps.getAssetDocumentStoragePaths?.(id) || [];
        if (documentPaths.length) {
          const storageDelete = await deps.withOperationTimeout(
            deps.removeAssetDocumentStorage(documentPaths),
            "Equipment file cleanup timed out.",
            15000
          );
          if (storageDelete.error) {
            throw new Error(`Could not remove equipment files: ${storageDelete.error.message}`);
          }
        }

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
        created_by: currentUserId(),
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
      if (response.error && deps.isMissingColumnError(response.error, "created_by")) {
        return deps.withSetupError(response, "Run supabase/step-next-asset-events.sql before saving equipment history.");
      }
      if (response.error && deps.isAssetHierarchySchemaError(response.error)) {
        return deps.withSetupError(response, deps.equipmentSchemaMessage(response.error).replace("saving", "adding"));
      }
      if (!response.error && response.data?.id && typeof deps.recordAssetEvent === "function") {
        await deps.recordAssetEvent(response.data.id, "created", `Created ${name}.`);
      }
      return response;
    }

    return {
      assetDeleteBlockers,
      assetHasDeleteBlockers,
      attachAssetPart,
      countAssetLinkedRows,
      createAsset,
      createQuickFixAsset,
      deleteAsset,
      loadAssetDeleteBlockers,
      removeAssetPart,
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
