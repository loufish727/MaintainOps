(function () {
  function createConversionDisplayHelpers({
    escapeHtml,
    conversionGroups,
    boltReference,
    conversionResultText,
  }) {
    function optionHtml(group, selectedUnitId) {
      return group.units.map((unit) => (
        `<option value="${escapeHtml(unit.id)}" ${unit.id === selectedUnitId ? "selected" : ""}>${escapeHtml(unit.label)}</option>`
      )).join("");
    }

    function renderConversionCard(group) {
      const from = group.defaultFrom || group.units[0]?.id || "";
      const to = group.defaultTo || group.units[1]?.id || from;
      const value = group.defaultValue || "1";
      const initialResult = conversionResultText(group.id, value, from, to);
      return `
        <article class="conversion-card" data-conversion-card data-conversion-group="${escapeHtml(group.id)}">
          <div class="conversion-card-heading">
            <h3>${escapeHtml(group.label)}</h3>
            <button class="icon-action-button" data-conversion-swap type="button" title="Swap units" aria-label="Swap ${escapeHtml(group.label)} units">&#8644;</button>
          </div>
          <div class="conversion-controls">
            <label>Value<input data-conversion-input type="number" inputmode="decimal" step="any" value="${escapeHtml(value)}"></label>
            <label>From<select data-conversion-from>${optionHtml(group, from)}</select></label>
            <label>To<select data-conversion-to>${optionHtml(group, to)}</select></label>
          </div>
          <output class="conversion-result" data-conversion-output>${escapeHtml(initialResult)}</output>
        </article>
      `;
    }

    function renderBoltReference() {
      return `
        <section class="conversion-reference">
          <div class="settings-section-heading">
            <h3>Bolt Size Reference</h3>
            <span>Closest common sizes only</span>
          </div>
          <p class="muted">Imperial and metric bolts are not interchangeable by diameter alone. Verify thread pitch, grade, length, and fit before replacing hardware.</p>
          <div class="bolt-table-wrap" role="region" aria-label="Bolt size reference table" tabindex="0">
            <table class="bolt-reference-table">
              <thead>
                <tr>
                  <th>Inch size</th>
                  <th>Major dia. in</th>
                  <th>Nearest metric</th>
                  <th>Metric dia. mm</th>
                  <th>Common inch threads</th>
                </tr>
              </thead>
              <tbody>
                ${boltReference.map((row) => `
                  <tr>
                    <td>${escapeHtml(row.inch)}</td>
                    <td>${escapeHtml(row.inchDiameter)}</td>
                    <td>${escapeHtml(row.metric)}</td>
                    <td>${escapeHtml(row.metricDiameter)}</td>
                    <td>${escapeHtml(row.threads)}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </section>
      `;
    }

    function renderConversionsPanel() {
      return `
        <div class="conversion-screen">
          <div class="conversion-grid">
            ${conversionGroups.map(renderConversionCard).join("")}
          </div>
          ${renderBoltReference()}
        </div>
      `;
    }

    return {
      renderConversionsPanel,
    };
  }

  window.MaintainOpsConversionDisplay = {
    createConversionDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createConversionDisplayHelpers };
  }
})();
