(function () {
  function createCsvExportHelpers(deps = {}) {
    const documentRef = deps.documentRef || document;
    const URLRef = deps.URLRef || URL;
    const BlobCtor = deps.BlobCtor || Blob;
    const alertRef = deps.alertRef || alert;
    const matchesActiveLocation = typeof deps.matchesActiveLocation === "function" ? deps.matchesActiveLocation : () => true;
    const assetTypeLabel = typeof deps.assetTypeLabel === "function" ? deps.assetTypeLabel : (type) => String(type || "machine").replaceAll("_", " ");
    const assetTypeOrder = {
      machine: 10,
      forklift: 20,
      secondary_machine: 30,
      tooling: 40,
      component: 50,
      shop_item: 60,
    };

    function assetPictureDocuments(assetId) {
      return (deps.getAssetDocumentsByAssetId?.()[assetId] || [])
        .filter((document) => String(document.content_type || "").startsWith("image/") || document.document_type === "machine_photo" || document.document_type === "nameplate");
    }

    function assetPictureId(assetId) {
      return assetPictureDocuments(assetId)
        .map((document) => document.original_file_name || document.file_name || document.storage_path || document.id)
        .filter(Boolean)
        .join("; ");
    }

    function parentAssetName(asset, assetsById) {
      return asset?.parent_asset_id ? assetsById.get(asset.parent_asset_id)?.name || "" : "";
    }

    function locationName(locationId) {
      return deps.getLocations?.().find((location) => location.id === locationId)?.name || "";
    }

    function profileName(userId) {
      if (!userId) return "";
      const profile = deps.getProfilesByUserId?.()[userId];
      return profile?.full_name || profile?.email || userId;
    }

    function assetLocationSortKey(asset) {
      return String(locationName(asset.location_id) || asset.location_id || asset.location || "");
    }

    function archivedFinancialAsset(financial) {
      return {
        id: `financial:${financial.id}`,
        financialRecord: financial,
        name: financial.archived_asset_name || "Deleted equipment",
        asset_type: financial.archived_asset_type || "machine",
        asset_code: financial.archived_asset_code || "",
        manufacturer: financial.archived_manufacturer || "",
        model: financial.archived_model || "",
        location_id: financial.archived_location_id || "",
        location: financial.archived_location || "",
        status: "deleted",
      };
    }

    function financialAssetRows() {
      return [
        ...deps.getAssets(),
        ...(deps.getAssetFinancials?.() || []).filter((financial) => !financial.asset_id).map(archivedFinancialAsset),
      ];
    }

    function compareAssetsForAudit(a, b, assetsById) {
      const locationDelta = assetLocationSortKey(a).localeCompare(assetLocationSortKey(b));
      if (locationDelta) return locationDelta;
      const typeDelta = (assetTypeOrder[a.asset_type || "machine"] || 999) - (assetTypeOrder[b.asset_type || "machine"] || 999);
      if (typeDelta) return typeDelta;
      return String(parentAssetName(a, assetsById)).localeCompare(String(parentAssetName(b, assetsById)))
        || String(a.location || "").localeCompare(String(b.location || ""))
        || String(a.name || "").localeCompare(String(b.name || ""));
    }

    function assetAuditRows() {
      const assets = deps.getAssets().filter(matchesActiveLocation);
      const assetsById = new Map(assets.map((asset) => [asset.id, asset]));
      return [...assets]
        .sort((a, b) => compareAssetsForAudit(a, b, assetsById))
        .map((asset) => ({
          equipment_type: assetTypeLabel(asset.asset_type),
          name: asset.name,
          parent_equipment: parentAssetName(asset, assetsById),
          serial_number: asset.asset_code || "",
          manufacturer: asset.manufacturer || "",
          model: asset.model || "",
          picture_id: assetPictureId(asset.id),
          picture_count: assetPictureDocuments(asset.id).length,
          picture_status: assetPictureDocuments(asset.id).length ? "attached" : "missing",
          location: asset.location || "",
          status: asset.status,
        }));
    }

    function assetFinancialRows() {
      const assets = financialAssetRows();
      const assetsById = new Map(assets.map((asset) => [asset.id, asset]));
      const financialsByAssetId = deps.getAssetFinancialsByAssetId?.() || {};
      return [...assets]
        .sort((a, b) => compareAssetsForAudit(a, b, assetsById))
        .map((asset) => {
          const financial = asset.financialRecord || financialsByAssetId[asset.id] || {};
          return {
            operational_status: asset.financialRecord ? "deleted" : "active",
            equipment_type: assetTypeLabel(asset.asset_type),
            name: asset.name,
            parent_equipment: parentAssetName(asset, assetsById),
            facility: locationName(asset.location_id) || asset.location_id || "",
            area_department: asset.location || "",
            serial_number: asset.asset_code || "",
            manufacturer: asset.manufacturer || "",
            model: asset.model || "",
            picture_status: assetPictureDocuments(asset.id).length ? "attached" : "missing",
            asset_tag: financial.asset_tag || "",
            acquisition_date: financial.acquisition_date || "",
            acquisition_cost: financial.acquisition_cost || "",
            depreciation_method: financial.depreciation_method || "",
            useful_life_years: financial.useful_life_years || "",
            current_book_value: financial.current_book_value || "",
            tax_jurisdiction: financial.tax_jurisdiction || "",
            ownership_status: financial.ownership_status || "",
            in_service_date: financial.in_service_date || "",
            disposal_date: financial.disposal_date || "",
            disposal_notes: financial.disposal_notes || "",
            gl_account_code: financial.gl_account_code || "",
            cost_center: financial.cost_center || "",
            finance_notes: financial.finance_notes || "",
            needs_review: Boolean(financial.needs_review),
            last_reviewed_at: financial.last_reviewed_at || "",
            reviewed_by: profileName(financial.reviewed_by),
          };
        });
    }

    function exportActiveSectionCsv() {
      const exports = {
        work: {
          filename: "work-orders.csv",
          rows: deps.getWorkOrders().map((workOrder) => ({
            title: workOrder.title,
            status: workOrder.status,
            priority: workOrder.priority,
            type: workOrder.type || "reactive",
            equipment: workOrder.assets?.name || "",
            assigned_to: deps.assignmentLabel(workOrder),
            due_at: workOrder.due_at || "",
            completed_at: workOrder.completed_at || "",
            actual_minutes: workOrder.actual_minutes || 0,
            failure_cause: workOrder.failure_cause || "",
            resolution_summary: workOrder.resolution_summary || "",
            follow_up_needed: Boolean(workOrder.follow_up_needed),
          })),
        },
        assets: {
          filename: "equipment.csv",
          rows: assetAuditRows(),
        },
        financial: {
          filename: "equipment-financial.csv",
          rows: assetFinancialRows(),
        },
        requests: {
          filename: "maintenance-requests.csv",
          rows: deps.getMaintenanceRequests().map((request) => ({
            title: request.title,
            status: request.status,
            priority: request.priority,
            equipment: request.assets?.name || "",
            requested_by: deps.getProfilesByUserId()[request.requested_by]?.full_name || "",
            created_at: request.created_at || "",
            converted_work_order_id: request.converted_work_order_id || "",
          })),
        },
        pm: {
          filename: "preventive-schedules.csv",
          rows: deps.getPreventiveSchedules().map((schedule) => ({
            title: schedule.title,
            equipment: schedule.assets?.name || "",
            frequency: schedule.frequency,
            next_due_at: schedule.next_due_at,
            active: schedule.active,
          })),
        },
        parts: {
          filename: "parts.csv",
          rows: deps.getParts().map((part) => ({
            name: part.name,
            sku: part.sku || "",
            supplier_name: part.supplier_name || "",
            quantity_on_hand: part.quantity_on_hand,
            reorder_point: part.reorder_point,
            unit_cost: part.unit_cost || 0,
          })),
        },
        procedures: {
          filename: "procedures.csv",
          rows: deps.getProcedureTemplates().map((template) => ({
            name: template.name,
            description: template.description || "",
            steps: template.procedure_steps?.length || 0,
          })),
        },
        team: {
          filename: "team.csv",
          rows: deps.getCompanyMembers().map((member) => ({
            user_id: member.user_id,
            name: deps.getProfilesByUserId()[member.user_id]?.full_name || "",
            role: member.role,
          })),
        },
      };

      const selected = exports[deps.getActiveSection()] || exports.work;
      if (!selected.rows.length) return alertRef("Nothing to export in this section yet.");
      downloadCsv(selected.filename, selected.rows);
    }

    function downloadCsv(filename, rows) {
      const headers = Object.keys(rows[0]);
      const lines = [
        headers.join(","),
        ...rows.map((row) => headers.map((header) => deps.csvCell(row[header])).join(",")),
      ];
      const blob = new BlobCtor([`\uFEFF${lines.join("\n")}`], { type: "text/csv;charset=utf-8" });
      const url = URLRef.createObjectURL(blob);
      const link = documentRef.createElement("a");
      link.href = url;
      link.download = filename;
      documentRef.body.appendChild(link);
      link.click();
      link.remove();
      URLRef.revokeObjectURL(url);
    }

    return {
      downloadCsv,
      exportActiveSectionCsv,
    };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { createCsvExportHelpers };
  }
  window.MaintainOpsCsvExport = { createCsvExportHelpers };
})();
