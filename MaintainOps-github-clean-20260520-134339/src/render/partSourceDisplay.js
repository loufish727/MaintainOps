(function () {
  function createPartSourceDisplayHelpers({
    escapeHtml,
    getPartSources,
    getPartSuppliersReady,
  }) {
    function renderPartSourceOptions() {
      const options = getPartSources();
      return `
        <datalist id="part-source-options">
          ${options.map((source) => `<option value="${escapeHtml(source)}"></option>`).join("")}
        </datalist>
      `;
    }

    function renderPartSourceManager() {
      const sources = getPartSources();
      return `
        <section class="part-source-manager relationship-detail parts">
          <div class="panel-header compact">
            <h3>Edit Sources</h3>
            <button class="text-button" data-toggle-part-sources type="button">Close</button>
          </div>
          ${getPartSuppliersReady() ? `
            <p class="muted">Rename a source to correct spelling or merge duplicates across every part using that exact name.</p>
            <div class="part-source-list">
              ${sources.map((source) => `
                <form class="part-source-row" data-rename-part-source>
                  <input name="old_source" type="hidden" value="${escapeHtml(source)}">
                  <span>${escapeHtml(source)}</span>
                  <input name="new_source" list="part-source-options" value="${escapeHtml(source)}" aria-label="New source name for ${escapeHtml(source)}">
                  <button class="secondary-button" type="submit">Rename</button>
                </form>
              `).join("") || `<p class="muted">No sources have been added yet.</p>`}
            </div>
            <p class="error-text" id="part-source-error"></p>
          ` : `<p class="error-text">Run supabase/step-next-part-suppliers.sql before editing sources.</p>`}
        </section>
      `;
    }

    return {
      renderPartSourceOptions,
      renderPartSourceManager,
    };
  }

  window.MaintainOpsPartSourceDisplay = {
    createPartSourceDisplayHelpers,
  };
})();
