(function () {
  function createCsvExportHelpers(deps = {}) {
    const documentRef = deps.documentRef || document;
    const URLRef = deps.URLRef || URL;
    const BlobCtor = deps.BlobCtor || Blob;
    const alertRef = deps.alertRef || alert;
    const matchesActiveLocation = typeof deps.matchesActiveLocation === "function" ? deps.matchesActiveLocation : () => true;

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
          rows: deps.getAssets().filter(matchesActiveLocation).map((asset) => ({
            name: asset.name,
            serial_number: asset.asset_code || "",
            manufacturer: asset.manufacturer || "",
            model: asset.model || "",
            picture_id: assetPictureId(asset.id),
            picture_count: assetPictureDocuments(asset.id).length,
            picture_status: assetPictureDocuments(asset.id).length ? "attached" : "missing",
            location: asset.location || "",
            status: asset.status,
          })),
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
