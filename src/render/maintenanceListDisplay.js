(function () {
  function createMaintenanceListDisplayHelpers(deps) {
    function filteredPreventiveSchedules() {
      return deps.getPreventiveSchedules().filter((schedule) => deps.matchesActiveLocation(schedule) && deps.matchesSearch([
        schedule.title,
        schedule.frequency,
        schedule.next_due_at,
        schedule.assets?.name,
      ]));
    }

    function filteredProcedureTemplates() {
      return deps.getProcedureTemplates().filter((template) => deps.matchesSearch([
        template.name,
        template.description,
        ...(template.procedure_steps || []).map((step) => step.prompt),
      ]));
    }

    return {
      filteredPreventiveSchedules,
      filteredProcedureTemplates,
    };
  }

  window.MaintainOpsMaintenanceListDisplay = {
    createMaintenanceListDisplayHelpers,
  };
})();
