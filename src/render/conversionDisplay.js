(function () {
  function createConversionDisplayHelpers({
    escapeHtml,
    conversionGroups,
    boltReference,
    wrenchReference,
    conversionResultText,
  }) {
    function optionHtml(group, selectedUnitId) {
      return group.units.map((unit) => (
        `<option value="${escapeHtml(unit.id)}" ${unit.id === selectedUnitId ? "selected" : ""}>${escapeHtml(unit.label)}</option>`
      )).join("");
    }

    const shopReferenceSections = [
      {
        title: "Drill / Tap Quick Reference",
        note: "Verify material, thread class, and print requirements before drilling or tapping.",
        columns: ["Thread", "Tap drill", "Close clearance", "Free clearance"],
        rows: [
          ["#6-32", "#36", "#27", "#25"],
          ["#8-32", "#29", "#18", "#16"],
          ["#10-24", "#25", "#9", "#7"],
          ["#10-32", "#21", "#9", "#7"],
          ["1/4-20", "#7", "F", "H"],
          ["5/16-18", "F", "P", "Q"],
          ["3/8-16", "5/16", "W", "X"],
          ["1/2-13", "27/64", "17/32", "35/64"],
          ["M6 x 1.0", "5.0 mm", "6.6 mm", "7.0 mm"],
          ["M8 x 1.25", "6.8 mm", "9.0 mm", "10.0 mm"],
        ],
      },
      {
        title: "Wire Gauge Reference",
        note: "Ampacity depends on insulation, temperature, conduit fill, run length, and code requirements.",
        columns: ["AWG", "Diameter in", "Diameter mm", "Common use note"],
        rows: [
          ["18", "0.0403", "1.02", "controls / signal"],
          ["16", "0.0508", "1.29", "controls / light load"],
          ["14", "0.0641", "1.63", "15 A branch typical"],
          ["12", "0.0808", "2.05", "20 A branch typical"],
          ["10", "0.1019", "2.59", "30 A branch typical"],
          ["8", "0.1285", "3.26", "larger branch / equipment"],
          ["6", "0.1620", "4.11", "equipment feed"],
          ["4", "0.2043", "5.19", "larger feeder"],
        ],
      },
      {
        title: "Pipe / Tubing Reference",
        note: "Nominal pipe size is not the actual outside diameter. Tube is usually named by outside diameter.",
        columns: ["Nominal / tube", "Actual OD", "Schedule 40 wall", "Note"],
        rows: [
          ["1/8 NPS", "0.405 in", "0.068 in", "pipe"],
          ["1/4 NPS", "0.540 in", "0.088 in", "pipe"],
          ["3/8 NPS", "0.675 in", "0.091 in", "pipe"],
          ["1/2 NPS", "0.840 in", "0.109 in", "pipe"],
          ["3/4 NPS", "1.050 in", "0.113 in", "pipe"],
          ["1 NPS", "1.315 in", "0.133 in", "pipe"],
          ["1/2 tube", "0.500 in", "varies", "tube OD"],
          ["1 tube", "1.000 in", "varies", "tube OD"],
        ],
      },
      {
        title: "Belt Section Reference",
        note: "Confirm profile, outside length, inside length, and manufacturer series before replacing belts.",
        columns: ["Section", "Top width", "Height", "Common note"],
        rows: [
          ["3L", "3/8 in", "7/32 in", "light fractional HP"],
          ["4L / A", "1/2 in", "5/16 in", "common light duty"],
          ["5L / B", "21/32 in", "3/8 in", "common industrial"],
          ["C", "7/8 in", "17/32 in", "larger industrial"],
          ["AX", "1/2 in", "5/16 in", "cogged A belt"],
          ["BX", "21/32 in", "3/8 in", "cogged B belt"],
          ["3V", "3/8 in", "5/16 in", "narrow wedge"],
          ["5V", "5/8 in", "17/32 in", "narrow wedge"],
        ],
      },
      {
        title: "Bearing Quick Reference",
        note: "Bearing suffixes change seals, shields, clearance, and fit. Match the full bearing code.",
        columns: ["Bearing", "Bore", "OD", "Width"],
        rows: [
          ["608", "8 mm", "22 mm", "7 mm"],
          ["6000", "10 mm", "26 mm", "8 mm"],
          ["6201", "12 mm", "32 mm", "10 mm"],
          ["6202", "15 mm", "35 mm", "11 mm"],
          ["6203", "17 mm", "40 mm", "12 mm"],
          ["6204", "20 mm", "47 mm", "14 mm"],
          ["6205", "25 mm", "52 mm", "15 mm"],
          ["6305", "25 mm", "62 mm", "17 mm"],
        ],
      },
      {
        title: "Roller Chain Reference",
        note: "Match pitch, roller width, strand count, sprocket condition, and lubrication before replacement.",
        columns: ["Chain", "Pitch", "Roller width", "Common note"],
        rows: [
          ["#25", "1/4 in", "1/8 in", "small drive"],
          ["#35", "3/8 in", "3/16 in", "light drive"],
          ["#40", "1/2 in", "5/16 in", "common drive"],
          ["#50", "5/8 in", "3/8 in", "medium drive"],
          ["#60", "3/4 in", "1/2 in", "heavier drive"],
          ["#80", "1 in", "5/8 in", "heavy drive"],
          ["#100", "1-1/4 in", "3/4 in", "heavy drive"],
        ],
      },
      {
        title: "Oil / Grease Reference",
        note: "Lubricant selection depends on load, speed, temperature, seals, contamination, and OEM spec.",
        columns: ["Type", "Reference", "Approximate note", "Use caution"],
        rows: [
          ["ISO VG 32", "SAE 10-ish", "light hydraulic / spindle", "not exact SAE engine oil"],
          ["ISO VG 46", "SAE 15-ish", "common hydraulic", "verify OEM spec"],
          ["ISO VG 68", "SAE 20-ish", "hydraulic / gear cases", "verify additives"],
          ["ISO VG 220", "SAE 90-ish gear", "gear oil range", "not universal"],
          ["NLGI 1", "softer grease", "cold / centralized systems", "verify compatibility"],
          ["NLGI 2", "standard grease", "common bearings", "verify base/thickener"],
          ["NLGI 3", "stiffer grease", "higher retention", "verify speed/temp"],
        ],
      },
      {
        title: "Torque Reference",
        note: "Reference only. Always follow OEM torque, bolt grade, lubrication, thread engagement, and safety-critical requirements.",
        columns: ["Bolt", "Grade 5 dry", "Grade 8 dry", "Note"],
        rows: [
          ["1/4-20", "8 ft-lb", "12 ft-lb", "typical reference range"],
          ["5/16-18", "17 ft-lb", "25 ft-lb", "typical reference range"],
          ["3/8-16", "31 ft-lb", "44 ft-lb", "typical reference range"],
          ["7/16-14", "49 ft-lb", "70 ft-lb", "typical reference range"],
          ["1/2-13", "75 ft-lb", "105 ft-lb", "typical reference range"],
          ["5/8-11", "150 ft-lb", "210 ft-lb", "typical reference range"],
        ],
      },
    ];

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

    function renderReferenceTable(section) {
      return `
        <details class="bolt-reference-details shop-reference-details">
          <summary class="bolt-reference-summary">
            <strong>${escapeHtml(section.title)}</strong>
            <span>${section.rows.length} rows</span>
          </summary>
          <div class="bolt-table-wrap" role="region" aria-label="${escapeHtml(section.title)} table" tabindex="0">
            <table class="bolt-reference-table shop-reference-table">
              <thead>
                <tr>${section.columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr>
              </thead>
              <tbody>
                ${section.rows.map((row) => `
                  <tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          <p class="muted shop-reference-note">${escapeHtml(section.note)}</p>
        </details>
      `;
    }

    function renderShopReferences() {
      return `
        <div class="settings-section-heading">
          <h3>Shop Reference Charts</h3>
          <span>${shopReferenceSections.length} collapsed charts</span>
        </div>
        ${shopReferenceSections.map(renderReferenceTable).join("")}
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
            <div class="bolt-gauge-mode" role="radiogroup" aria-label="Bolt gauge mode">
              <label><input data-bolt-gauge-mode type="radio" name="bolt-gauge-mode" value="thread" checked>Thread / Nut ID</label>
              <label><input data-bolt-gauge-mode type="radio" name="bolt-gauge-mode" value="wrench">Head / Wrench</label>
            </div>
            <p class="muted bolt-gauge-help" data-bolt-gauge-help>Fit the circle around the bolt shaft or inside the nut opening to estimate thread size.</p>
            <div class="bolt-gauge-layout">
              <div class="bolt-gauge-card" data-bolt-gauge-card aria-label="Bolt gauge sizing card">
                <div class="bolt-gauge-circle" data-bolt-gauge-circle></div>
                <div class="bolt-gauge-calibration-line" data-bolt-gauge-calibration-line><span>1 in</span></div>
              </div>
              <div class="bolt-gauge-controls">
                <label class="bolt-gauge-sizing-control">Sizing circle<input data-bolt-gauge-diameter type="range" min="18" max="280" step="1" value="96"></label>
                <label class="bolt-gauge-calibration-control">1 in calibration<input data-bolt-gauge-calibration type="range" min="48" max="200" step="1" value="96"></label>
                <label class="bolt-gauge-lock"><input data-bolt-gauge-lock type="checkbox" checked>Lock 1 in calibration</label>
                <output class="bolt-gauge-output" data-bolt-gauge-output></output>
                <p class="muted">Reference only. Verify thread pitch, grade, and final size with a physical gauge or calipers.</p>
              </div>
            </div>
          </div>
          <details class="bolt-reference-details">
            <summary class="bolt-reference-summary">
              <strong>Common Inch Thread Reference</strong>
              <span>${boltReference.length} rows</span>
            </summary>
            <div class="bolt-table-wrap" role="region" aria-label="Common inch thread reference table" tabindex="0">
              <table class="bolt-reference-table">
                <thead>
                  <tr>
                    <th>Inch size</th>
                    <th>Common inch thread</th>
                    <th class="bolt-reference-detail">Major dia. in</th>
                    <th class="bolt-reference-detail">Nearest metric</th>
                    <th class="bolt-reference-detail">Metric dia. mm</th>
                  </tr>
                </thead>
                <tbody>
                  ${boltReference.map((row) => `
                    <tr class="bolt-reference-row" data-bolt-size-row="${escapeHtml(row.inch)}">
                      <td class="bolt-reference-primary">${escapeHtml(row.inch)}</td>
                      <td class="bolt-reference-primary">${escapeHtml(row.threads)}</td>
                      <td class="bolt-reference-detail">${escapeHtml(row.inchDiameter)}</td>
                      <td class="bolt-reference-detail">${escapeHtml(row.metric)}</td>
                      <td class="bolt-reference-detail">${escapeHtml(row.metricDiameter)}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </details>
          <details class="bolt-reference-details">
            <summary class="bolt-reference-summary">
              <strong>Common Wrench / Head Size Reference</strong>
              <span>${wrenchReference.length} rows</span>
            </summary>
            <div class="bolt-table-wrap" role="region" aria-label="Common wrench and head size reference table" tabindex="0">
              <table class="bolt-reference-table wrench-reference-table">
                <thead>
                  <tr>
                    <th>Thread size</th>
                    <th>Wrench size</th>
                    <th class="bolt-reference-detail">Thread dia. in</th>
                    <th class="bolt-reference-detail">Wrench mm</th>
                    <th class="bolt-reference-detail">Use</th>
                  </tr>
                </thead>
                <tbody>
                  ${wrenchReference.map((row) => `
                    <tr class="bolt-reference-row" data-wrench-size-row="${escapeHtml(row.thread)}">
                      <td class="bolt-reference-primary">${escapeHtml(row.thread)}</td>
                      <td class="bolt-reference-primary">${escapeHtml(row.wrenchIn)}</td>
                      <td class="bolt-reference-detail">${escapeHtml(row.threadDiameterIn)}</td>
                      <td class="bolt-reference-detail">${escapeHtml(row.wrenchMm)}</td>
                      <td class="bolt-reference-detail">${escapeHtml(row.note)}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </details>
          ${renderShopReferences()}
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
