(function () {
  function createWorkspaceListBuilders(deps) {
    function state(name) {
      return deps[name]();
    }

    function globalSearchResults() {
      const query = state("searchQuery").trim();
      const work = state("workOrders")
        .filter(deps.matchesActiveLocation)
        .sort(deps.compareWorkOrders)
        .slice(0, deps.SEARCH_PREVIEW_LIMIT);

      const assetResults = state("assets")
        .filter(deps.matchesActiveLocation)
        .filter((asset) => deps.matchesQuery([asset.name, asset.asset_code, asset.manufacturer, asset.model, asset.location, asset.status], query))
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, deps.SEARCH_PREVIEW_LIMIT);

      const partResults = state("parts")
        .filter(deps.matchesActiveLocation)
        .filter((part) => deps.matchesQuery([part.name, part.sku, part.supplier_name, part.quantity_on_hand, part.reorder_point], query))
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, deps.SEARCH_PREVIEW_LIMIT);

      const requestResults = state("maintenanceRequests")
        .filter(deps.matchesActiveLocation)
        .filter((request) => deps.matchesQuery([
          request.title,
          request.description,
          request.status,
          request.priority,
          request.assets?.name,
          state("profilesByUserId")[request.requested_by]?.full_name,
        ], query))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, deps.SEARCH_PREVIEW_LIMIT);

      const pmResults = state("preventiveSchedules")
        .filter(deps.matchesActiveLocation)
        .filter((schedule) => deps.matchesQuery([schedule.title, schedule.frequency, schedule.next_due_at, schedule.assets?.name], query))
        .sort((a, b) => String(a.next_due_at || "").localeCompare(String(b.next_due_at || "")))
        .slice(0, deps.SEARCH_PREVIEW_LIMIT);

      const procedureResults = state("procedureTemplates")
        .filter((template) => deps.matchesQuery([
          template.name,
          template.description,
          ...(template.procedure_steps || []).map((step) => step.prompt),
        ], query))
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, deps.SEARCH_PREVIEW_LIMIT);

      return { work, assets: assetResults, parts: partResults, requests: requestResults, pm: pmResults, procedures: procedureResults };
    }

    function planningItems(bucket = "all") {
      const today = deps.startOfToday();
      const soon = new Date(today);
      soon.setDate(soon.getDate() + 7);

      return state("planningWorkOrders")
        .filter(deps.matchesActiveLocation)
        .filter((workOrder) => workOrder.status !== "completed")
        .filter((workOrder) => deps.matchesSearch([
          workOrder.title,
          workOrder.description,
          workOrder.priority,
          workOrder.status,
          workOrder.assets?.name,
          deps.assignmentLabel(workOrder),
        ]))
        .filter((workOrder) => bucket === "no_due" ? !workOrder.due_at : Boolean(workOrder.due_at))
        .map((workOrder) => {
          const due = workOrder.due_at ? new Date(`${workOrder.due_at}T00:00:00`) : null;
          return {
            kind: bucket === "no_due" ? "no_due" : "work",
            id: workOrder.id,
            title: workOrder.title,
            priority: workOrder.priority,
            status: workOrder.status,
            assetName: workOrder.assets?.name || "No equipment",
            dueAt: workOrder.due_at,
            due,
            createdAt: workOrder.created_at || "",
            assignedTo: deps.assignmentLabel(workOrder),
            workOrder,
          };
        })
        .filter((item) => {
          if (bucket === "no_due") return true;
          if (bucket === "overdue") return item.due < today;
          if (bucket === "today") return item.due.getTime() === today.getTime();
          if (bucket === "soon") return item.due > today && item.due <= soon;
          return true;
        })
        .sort((a, b) => {
          if (bucket === "no_due") {
            const priorityRank = { critical: 4, high: 3, medium: 2, low: 1 };
            return (priorityRank[b.priority] || 0) - (priorityRank[a.priority] || 0)
              || new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
          }
          return a.due - b.due;
        });
    }

    function planningPmItems() {
      const today = deps.startOfToday();
      const soon = new Date(today);
      soon.setDate(soon.getDate() + 7);

      return state("preventiveSchedules")
        .filter(deps.matchesActiveLocation)
        .filter((schedule) => {
          const due = new Date(`${schedule.next_due_at}T00:00:00`);
          return due >= today && due <= soon;
        })
        .filter((schedule) => deps.matchesSearch([
          schedule.title,
          schedule.frequency,
          schedule.next_due_at,
          schedule.assets?.name,
        ]))
        .map((schedule) => ({
          kind: "pm",
          id: schedule.id,
          title: schedule.title,
          assetName: schedule.assets?.name || "No equipment",
          dueAt: schedule.next_due_at,
          due: new Date(`${schedule.next_due_at}T00:00:00`),
        }))
        .sort((a, b) => a.due - b.due);
    }

    function followUpItems() {
      return state("planningWorkOrders")
        .filter(deps.matchesActiveLocation)
        .filter((workOrder) => workOrder.follow_up_needed)
        .filter((workOrder) => deps.matchesSearch([
          workOrder.title,
          workOrder.description,
          workOrder.failure_cause,
          workOrder.resolution_summary,
          workOrder.assets?.name,
          workOrder.assigned_profile?.full_name,
        ]))
        .map((workOrder) => ({
          kind: "follow_up",
          id: workOrder.id,
          title: workOrder.title,
          assetName: workOrder.assets?.name || "No equipment",
          completedAt: workOrder.completed_at ? new Date(workOrder.completed_at).toLocaleDateString() : "not completed",
          resolution: workOrder.resolution_summary || workOrder.completion_notes || "",
          workOrder,
        }))
        .sort((a, b) => a.title.localeCompare(b.title));
    }

    return {
      globalSearchResults,
      planningItems,
      planningPmItems,
      followUpItems,
    };
  }

  window.MaintainOpsWorkspaceListBuilders = {
    createWorkspaceListBuilders,
  };
})();
