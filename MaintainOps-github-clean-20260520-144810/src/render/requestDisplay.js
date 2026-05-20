(function () {
  function createRequestDisplayHelpers({ segmentIcon }) {
    function requestPanelSubtitle(filter, count) {
      if (filter === "converted") return `${count} converted`;
      if (filter === "all") return `${count} total`;
      return `${count} active`;
    }

    function renderRequestFilterBar(counts, selectedFilter, options = {}) {
      const filters = [
        ["active", "Active", counts.active],
        ["converted", "Converted", counts.converted],
        ["all", "All", counts.all],
      ];
      return `
        <div class="segmented-control request-filter-bar" aria-label="Request filter">
          ${filters.map(([id, label, count]) => `
            <button class="segment ${selectedFilter === id ? "active" : ""}" data-request-filter="${id}" type="button" ${options.locked && id !== "active" ? "disabled" : ""}>
              ${segmentIcon(id === "active" ? "open" : id === "converted" ? "completed" : "all")}${label} <span>${count}</span>
            </button>
          `).join("")}
        </div>
      `;
    }

    return {
      requestPanelSubtitle,
      renderRequestFilterBar,
    };
  }

  window.MaintainOpsRequestDisplay = {
    createRequestDisplayHelpers,
  };
})();
