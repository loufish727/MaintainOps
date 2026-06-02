(function () {
  function createProcedureOptionsDisplayHelpers({
    escapeHtml,
    getProceduresReady,
    getProcedureTemplates,
  }) {
    function renderProcedureOptions(selectedId = "") {
      if (!getProceduresReady()) return `<option value="">No procedure checklist</option>`;
      return `
        <option value="">No procedure checklist</option>
        ${getProcedureTemplates().map((template) => `<option value="${template.id}" ${template.id === selectedId ? "selected" : ""}>${escapeHtml(template.name)}</option>`).join("")}
      `;
    }

    return {
      renderProcedureOptions,
    };
  }

  window.MaintainOpsProcedureOptionsDisplay = {
    createProcedureOptionsDisplayHelpers,
  };
})();
