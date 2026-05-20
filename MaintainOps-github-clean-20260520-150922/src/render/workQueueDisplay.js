(function () {
  function createWorkQueueDisplayHelpers({
    statusLabel,
    teamMemberName,
    getWorkOrderAssigneeFilter,
    getWorkOrderFilter,
    getActiveStatusFilter,
    getMyWorkFilter,
    getActiveSection,
  }) {
    function workOrdersPanelTitle() {
      const workOrderAssigneeFilter = getWorkOrderAssigneeFilter();
      const workOrderFilter = getWorkOrderFilter();
      const activeStatusFilter = getActiveStatusFilter();
      const baseTitle = workOrderAssigneeFilter
        ? `${teamMemberName(workOrderAssigneeFilter)} Work`
        : workOrderFilter === "unassigned"
          ? "Unassigned Work Orders"
          : workOrderFilter === "vendor"
            ? "Outside Vendor Work"
            : workOrderFilter === "assigned"
              ? "Assigned Work Orders"
              : "All Work Orders";
      if (activeStatusFilter === "active" || activeStatusFilter === "all") return baseTitle;
      return `${statusLabel(activeStatusFilter)} - ${baseTitle}`;
    }

    function myWorkPanelTitle() {
      const activeStatusFilter = getActiveStatusFilter();
      if (activeStatusFilter === "active" || activeStatusFilter === "all") return "My Work";
      return `${statusLabel(activeStatusFilter)} - My Work`;
    }

    function workQueuePanelTitle() {
      return getActiveSection() === "mywork" ? myWorkPanelTitle() : workOrdersPanelTitle();
    }

    function workQueuePanelSubtitle(count) {
      const activeSection = getActiveSection();
      const myWorkFilter = getMyWorkFilter();
      const context = activeSection === "mywork"
        ? (myWorkFilter === "created" ? "Created By Me" : "Assigned To Me")
        : "shown";
      return activeSection === "mywork" ? `${count} shown - ${context}` : `${count} shown`;
    }

    return {
      workOrdersPanelTitle,
      myWorkPanelTitle,
      workQueuePanelTitle,
      workQueuePanelSubtitle,
    };
  }

  window.MaintainOpsWorkQueueDisplay = {
    createWorkQueueDisplayHelpers,
  };
})();
