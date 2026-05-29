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
        <details class="conversion-card" data-conversion-card data-conversion-group="${escapeHtml(group.id)}">
          <summary class="conversion-card-heading">
            <h3>${escapeHtml(group.label)}</h3>
            <span>Open</span>
          </summary>
          <div class="conversion-card-body">
            <button class="icon-action-button" data-conversion-swap type="button" title="Swap units" aria-label="Swap ${escapeHtml(group.label)} units">&#8644;</button>
            <div class="conversion-controls">
              <label>Value<input data-conversion-input type="number" inputmode="decimal" step="any" value="${escapeHtml(value)}"></label>
              <label>From<select data-conversion-from>${optionHtml(group, from)}</select></label>
              <label>To<select data-conversion-to>${optionHtml(group, to)}</select></label>
            </div>
            <output class="conversion-result" data-conversion-output>${escapeHtml(initialResult)}</output>
          </div>
        </details>
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
          <div class="bolt-gauge" data-bolt-gauge>
            <div class="settings-section-heading">
              <h3>Bolt Gauge</h3>
              <span>screen fit estimate</span>
            </div>
            <div class="bolt-gauge-layout">
              <div class="bolt-gauge-card" data-bolt-gauge-card aria-label="Bolt gauge sizing card">
                <div class="bolt-gauge-circle" data-bolt-gauge-circle></div>
                <div class="bolt-gauge-calibration-line" data-bolt-gauge-calibration-line><span>1 in</span></div>
              </div>
              <div class="bolt-gauge-controls">
                <label>Circle diameter<input data-bolt-gauge-diameter type="range" min="18" max="240" step="1" value="96"></label>
                <label>1 in calibration<input data-bolt-gauge-calibration type="range" min="48" max="180" step="1" value="96"></label>
                <output class="bolt-gauge-output" data-bolt-gauge-output></output>
                <p class="muted">Reference only. Verify thread pitch, grade, and final size with a physical gauge or calipers.</p>
              </div>
            </div>
          </div>
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
