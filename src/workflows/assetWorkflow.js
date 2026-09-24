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
        asset_code: "serial number",
        asset_tag: "asset tag",
        manufacturer: "manufacturer",
        model: "model",
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

    function isMissingAuditFieldColumn(error) {
      return deps.isMissingColumnError(error, "manufacturer") || deps.isMissingColumnError(error, "model");
    }

    async function createAsset(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const submittedDraft = deps.captureCreateDraft?.(formElement);
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
          asset_tag: String(form.get("asset_tag") || "").trim() || null,
          manufacturer: String(form.get("manufacturer") || "").trim() || null,
          model: String(form.get("model") || "").trim() || null,
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
        if (error && isMissingAuditFieldColumn(error)) {
          throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");
        }
        if (error && deps.isMissingColumnError(error, "asset_tag")) {
          throw new Error("Equipment asset tags need a database update. Contact your administrator.");
        }
        if (error && deps.isAssetHierarchySchemaError(error)) {
          throw new Error(deps.equipmentSchemaMessage(error));
        }
        if (error) throw error;
        deps.clearCreateDraft?.(submittedDraft);
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
      const assetId = deps.getActiveAssetId(), companyId = deps.getActiveCompanyId(), actorId = currentUserId();
      const isCurrent = () => assetId === deps.getActiveAssetId() && companyId === deps.getActiveCompanyId() && actorId === currentUserId();
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
        const previous = assetById(assetId);
        if (!previous) throw new Error("Equipment details are not loaded. Reopen the equipment before saving.");
        const payload = {
          name: deps.requiredText(form.get("name"), "Equipment name"),
          asset_code: String(form.get("asset_code") || "").trim() || null,
          asset_tag: String(form.get("asset_tag") || "").trim() || null,
          manufacturer: String(form.get("manufacturer") || "").trim() || null,
          model: String(form.get("model") || "").trim() || null,
          location: areaSpotFromForm(form),
          parent_asset_id: form.get("parent_asset_id") || null,
          asset_type: form.get("asset_type") || previous.asset_type || "machine",
          safety_devices_required: form.get("safety_devices_required") === "on",
          status: form.get("status"),
        };
        // Facility changes belong to the reviewed relocation/update-location flows.
        // Leave unchanged hierarchy columns out so routine edits do not take the structural gate.
        if (payload.parent_asset_id === (previous.parent_asset_id || null)) delete payload.parent_asset_id;
        if (payload.asset_type === (previous.asset_type || "machine")) delete payload.asset_type;
        let query = deps.supabaseClient().from("assets").update(payload)
          .eq("id", assetId).eq("company_id", companyId).eq("asset_type", previous.asset_type || "machine")
          .eq("traveling_revision", Number(formElement.dataset?.travelRevision ?? previous.traveling_revision ?? 0));
        if (previous.location_id) query = query.eq("location_id", previous.location_id);
        query = query.select("id");
        const { data, error } = await deps.withOperationTimeout(
          query,
          "Equipment save timed out. Check your connection and try again.",
          15000
        );
        if (error && deps.isMissingColumnError(error, "location_id")) {
          deps.setLocationsReady(false);
          throw new Error(deps.databaseSetupRequiredMessage("saving equipment locations"));
        }
        if (error && isMissingAuditFieldColumn(error)) {
          throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");
        }
        if (error && deps.isMissingColumnError(error, "asset_tag")) {
          throw new Error("Equipment asset tags need a database update. Contact your administrator.");
        }
        if (error && deps.isAssetHierarchySchemaError(error)) {
          throw new Error(deps.equipmentSchemaMessage(error));
        }
        if (error) throw error;
        if (!data?.length) throw new Error("This equipment moved, changed condition, or is no longer editable. Reopen its details before saving.");
        const changed = changedFieldLabels(previous, { ...previous, ...payload });
        if (changed.length && typeof deps.recordAssetEvent === "function") {
          await deps.recordAssetEvent(assetId, "updated", `Updated ${changed.join(", ")}.`, { companyId, actorId });
        }
        if (!isCurrent()) return;
        deps.showNotice("Equipment saved.");
        await deps.render();
      } catch (error) {
        if (!isCurrent()) return;
        if (errorElement) errorElement.textContent = error.message;
        else alertRef(error.message);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    }

    async function moveTravelingAsset(event) {
      event.preventDefault();
      const element = event.currentTarget;
      const button = element.querySelector("button[type='submit']");
      if (button?.disabled) return;
      const errorElement = element.querySelector("[data-transfer-error]");
      const companyId = element.dataset.companyId;
      const assetId = element.dataset.assetId;
      const userId = currentUserId();
      const form = new FormDataCtor(element);
      const destination = form.get("destination_id");
      const current = () => companyId === deps.getActiveCompanyId() && userId === currentUserId() && assetId === deps.getActiveAssetId();
      if (!current() || !destination) return;
      const destinationName = element.querySelector("[name='destination_id'] option:checked")?.textContent || "the selected facility";
      if (!(deps.confirmRef || confirm)(`Move ${assetById(assetId)?.name || "this machine"} to ${destinationName}?\n\nAll work history stays linked to this machine. Existing work orders keep their original facility and assigned person. Warehouse stock stays at its current facility.\n\nSave any equipment edits before moving; unsaved edits will be lost.`)) return;
      if (errorElement) errorElement.textContent = "";
      if (button) button.disabled = true;
      try {
        const { error } = await deps.withOperationTimeout(deps.supabaseClient().rpc("update_traveling_equipment_location", {
          p_company_id: companyId, p_asset_id: assetId, p_location_id: destination,
          p_expected_location_id: element.dataset.fromLocation || null,
          p_expected_revision: Number(element.dataset.travelRevision || 0),
        }), "Location change timed out. Reopen the equipment to check its current facility before retrying.", 15000);
        if (error) throw error;
        if (current()) {
          deps.showNotice("Equipment location changed. Its records remain attached.");
          await deps.render();
        }
      } catch (error) {
        if (current() && errorElement) errorElement.textContent = error.message;
      } finally {
        if (button) button.disabled = false;
      }
    }

    async function updateAssetStatus(assetId, status) {
      const asset = assetById(assetId);
      if (!asset) return new Error("Equipment details are not loaded. Reopen the equipment before changing condition.");
      const companyId = deps.getActiveCompanyId(), actorId = currentUserId();
      if (asset?.asset_type === "traveling_machine") {
        const { error } = await deps.withOperationTimeout(deps.supabaseClient().rpc("update_traveling_equipment_condition", {
          p_company_id: deps.getActiveCompanyId(), p_asset_id: assetId, p_status: status,
          p_expected_status: asset.status, p_expected_location_id: asset.location_id, p_expected_revision: asset.traveling_revision || 0,
        }), "Equipment condition save timed out. Reopen its details before retrying.", 12000);
        return error || null;
      }
      const { data, error } = await deps.withOperationTimeout(
        deps.supabaseClient()
          .from("assets")
          .update({ status })
          .eq("id", assetId)
          .eq("company_id", companyId)
          .eq("asset_type", asset.asset_type || "machine")
          .eq("status", asset.status)
          .eq("traveling_revision", asset.traveling_revision || 0).select("id"),
        "Equipment status save timed out. Check your connection and try again.",
        12000
      );
      if (!error && !data?.length) return new Error("Equipment changed or is no longer editable. Reopen it before changing condition.");
      if (!error && typeof deps.recordAssetEvent === "function") {
        await deps.recordAssetEvent(assetId, "status_changed", `Status changed to ${status}.`, { companyId, actorId });
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
      if (!Number.isSafeInteger(count) || count < 0) {
        throw new Error(`Could not verify linked ${tableName.replaceAll("_", " ")} before deleting equipment. Try again.`);
      }
      return count;
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
      const companyId = deps.getActiveCompanyId();
      const deletionContext = deps.getDeletionContext?.();
      const actorId = currentUserId();
      const stillCurrent = () => deps.getActiveCompanyId() === companyId && currentUserId() === actorId
        && deps.getActiveAssetId() === id && deps.getDeletionContext?.() === deletionContext;
      if (confirmButton) {
        confirmButton.disabled = true;
        confirmButton.textContent = "Deleting...";
      }

      try {
        const blockers = await loadAssetDeleteBlockers(id);
        const blockerMessage = deps.assetDeleteBlockerMessage(blockers);
        if (blockerMessage) throw new Error(blockerMessage);

        const documentPaths = deps.getAssetDocumentStoragePaths?.(id) || [];
        if (!stillCurrent()) throw new Error("Workspace changed. Reopen the equipment before deleting.");
        const { data, error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("assets")
            .delete()
            .eq("id", id)
            .eq("company_id", companyId)
            .select("id"),
          "Equipment delete timed out. Check your connection and try again.",
          15000
        );
        if (error) {
          throw new Error(error.message.includes("violates foreign key constraint")
            ? "This equipment is linked to records and cannot be deleted."
            : error.message);
        }
        if (!Array.isArray(data) || data.length !== 1 || data[0].id !== id) {
          throw new Error("Equipment deletion was not confirmed. Files were left unchanged; reopen the equipment before trying again.");
        }
        // Storage is not transactional with the database. Never remove files first.
        let cleanupPending = false;
        if (documentPaths.length) {
          try {
            const storageDelete = await deps.withOperationTimeout(
              deps.removeAssetDocumentStorage(documentPaths),
              "Equipment file cleanup timed out.",
              15000
            );
            if (storageDelete.error) throw storageDelete.error;
          } catch (_) {
            cleanupPending = true;
          }
        }
        if (!stillCurrent()) return;
        deps.setActiveAssetId(null);
        deps.setPendingDeleteAssetId(null);
        deps.setActiveSection("assets");
        deps.showNotice(cleanupPending
          ? "Equipment deleted. Some files may remain in storage; ask an admin to review file cleanup."
          : "Equipment deleted.", cleanupPending ? "warning" : "success");
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
      moveTravelingAsset,
      updateAssetStatus,
    };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { createAssetWorkflow };
  }
  window.MaintainOpsAssetWorkflow = { createAssetWorkflow };
})();
