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
          ["#1-64", "#53", "#48", "#46"],
          ["#2-56", "#50", "#43", "#41"],
          ["#4-40", "#43", "#32", "#30"],
          ["#6-32", "#36", "#27", "#25"],
          ["#8-32", "#29", "#18", "#16"],
          ["#10-24", "#25", "#9", "#7"],
          ["#10-32", "#21", "#9", "#7"],
          ["1/4-20", "#7", "F", "H"],
          ["1/4-28", "#3", "F", "H"],
          ["5/16-18", "F", "P", "Q"],
          ["5/16-24", "I", "P", "Q"],
          ["3/8-16", "5/16", "W", "X"],
          ["3/8-24", "Q", "W", "X"],
          ["7/16-14", "U", "29/64", "15/32"],
          ["1/2-13", "27/64", "17/32", "35/64"],
          ["1/2-20", "29/64", "17/32", "35/64"],
          ["M4 x 0.7", "3.3 mm", "4.5 mm", "4.8 mm"],
          ["M5 x 0.8", "4.2 mm", "5.5 mm", "5.8 mm"],
          ["M6 x 1.0", "5.0 mm", "6.6 mm", "7.0 mm"],
          ["M8 x 1.25", "6.8 mm", "9.0 mm", "10.0 mm"],
        ],
      },
      {
        title: "Wire Gauge Reference",
        note: "Ampacity depends on insulation, temperature, conduit fill, run length, and code requirements.",
        columns: ["AWG", "Diameter in", "Diameter mm", "Common use note"],
        rows: [
          ["24", "0.0201", "0.51", "small signal wiring"],
          ["22", "0.0253", "0.64", "PLC sensors / low-current controls"],
          ["20", "0.0320", "0.81", "thermostat, alarm, or panel signal"],
          ["18", "0.0403", "1.02", "24V controls / fixture leads"],
          ["16", "0.0508", "1.29", "light indoor extension cord"],
          ["14", "0.0641", "1.63", "15 A branch / medium outdoor cord"],
          ["12", "0.0808", "2.05", "20 A branch / heavy outdoor cord"],
          ["10", "0.1019", "2.59", "30 A dryer, water heater, RV TT-30"],
          ["8", "0.1285", "3.26", "40 A range or large AC; 50 A only when install allows"],
          ["6", "0.1620", "4.11", "50 A RV 14-50, welder, range, EV circuit"],
          ["4", "0.2043", "5.19", "60-70 A feeder / large equipment"],
          ["3", "0.2294", "5.83", "100 A feeder in some copper installs"],
          ["2", "0.2576", "6.54", "100 A subpanel / equipment feeder"],
          ["1", "0.2893", "7.35", "125 A feeder / large equipment"],
          ["1/0", "0.3249", "8.25", "150 A feeder / service conductor"],
          ["2/0", "0.3648", "9.27", "175 A feeder / service conductor"],
          ["3/0", "0.4096", "10.40", "200 A copper service conductor"],
          ["4/0", "0.4600", "11.68", "large service / distribution feeder"],
          ["250 kcmil", "0.575", "14.61", "plant distribution / large motor feeder"],
          ["500 kcmil", "0.813", "20.65", "large service / switchgear feeder"],
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
          ["1-1/4 NPS", "1.660 in", "0.140 in", "pipe"],
          ["1-1/2 NPS", "1.900 in", "0.145 in", "pipe"],
          ["2 NPS", "2.375 in", "0.154 in", "pipe"],
          ["2-1/2 NPS", "2.875 in", "0.203 in", "pipe"],
          ["3 NPS", "3.500 in", "0.216 in", "pipe"],
          ["4 NPS", "4.500 in", "0.237 in", "pipe"],
          ["6 NPS", "6.625 in", "0.280 in", "pipe"],
          ["8 NPS", "8.625 in", "0.322 in", "pipe"],
          ["1/4 tube", "0.250 in", "varies", "tube OD"],
          ["3/8 tube", "0.375 in", "varies", "tube OD"],
          ["1/2 tube", "0.500 in", "varies", "tube OD"],
          ["3/4 tube", "0.750 in", "varies", "tube OD"],
          ["1 tube", "1.000 in", "varies", "tube OD"],
          ["1-1/2 tube", "1.500 in", "varies", "tube OD"],
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
          ["D", "1-1/4 in", "3/4 in", "heavy industrial"],
          ["E", "1-1/2 in", "29/32 in", "very heavy industrial"],
          ["AX", "1/2 in", "5/16 in", "cogged A belt"],
          ["BX", "21/32 in", "3/8 in", "cogged B belt"],
          ["CX", "7/8 in", "17/32 in", "cogged C belt"],
          ["3V", "3/8 in", "5/16 in", "narrow wedge"],
          ["5V", "5/8 in", "17/32 in", "narrow wedge"],
          ["8V", "1 in", "29/32 in", "narrow wedge heavy"],
          ["3VX", "3/8 in", "5/16 in", "cogged narrow wedge"],
          ["5VX", "5/8 in", "17/32 in", "cogged narrow wedge"],
          ["2L", "1/4 in", "5/32 in", "very light duty"],
          ["SPZ", "10 mm", "8 mm", "metric wedge"],
          ["SPA", "13 mm", "10 mm", "metric wedge"],
          ["SPB", "17 mm", "14 mm", "metric wedge"],
          ["SPC", "22 mm", "18 mm", "metric wedge"],
          ["Poly-V J", "2.34 mm rib pitch", "low-profile", "multi-rib belt"],
        ],
      },
      {
        title: "Bearing Quick Reference",
        note: "Bearing suffixes change seals, shields, clearance, and fit. Match the full bearing code.",
        columns: ["Bearing", "Bore", "OD", "Width"],
        rows: [
          ["608", "8 mm", "22 mm", "7 mm"],
          ["6001", "12 mm", "28 mm", "8 mm"],
          ["6002", "15 mm", "32 mm", "9 mm"],
          ["6003", "17 mm", "35 mm", "10 mm"],
          ["6004", "20 mm", "42 mm", "12 mm"],
          ["6005", "25 mm", "47 mm", "12 mm"],
          ["6000", "10 mm", "26 mm", "8 mm"],
          ["6201", "12 mm", "32 mm", "10 mm"],
          ["6202", "15 mm", "35 mm", "11 mm"],
          ["6203", "17 mm", "40 mm", "12 mm"],
          ["6204", "20 mm", "47 mm", "14 mm"],
          ["6205", "25 mm", "52 mm", "15 mm"],
          ["6206", "30 mm", "62 mm", "16 mm"],
          ["6207", "35 mm", "72 mm", "17 mm"],
          ["6208", "40 mm", "80 mm", "18 mm"],
          ["6301", "12 mm", "37 mm", "12 mm"],
          ["6302", "15 mm", "42 mm", "13 mm"],
          ["6303", "17 mm", "47 mm", "14 mm"],
          ["6304", "20 mm", "52 mm", "15 mm"],
          ["6305", "25 mm", "62 mm", "17 mm"],
        ],
      },
      {
        title: "Roller Chain Reference",
        note: "Match pitch, roller width, strand count, sprocket condition, and lubrication before replacement.",
        columns: ["Chain", "Pitch", "Roller width", "Common note"],
        rows: [
          ["#25", "1/4 in", "1/8 in", "small drive"],
          ["#25H", "1/4 in", "1/8 in", "heavier small drive"],
          ["#35", "3/8 in", "3/16 in", "light drive"],
          ["#35H", "3/8 in", "3/16 in", "heavier light drive"],
          ["#40", "1/2 in", "5/16 in", "common drive"],
          ["#40H", "1/2 in", "5/16 in", "heavier common drive"],
          ["#41", "1/2 in", "1/4 in", "narrow conveyor/light drive"],
          ["#50", "5/8 in", "3/8 in", "medium drive"],
          ["#50H", "5/8 in", "3/8 in", "heavier medium drive"],
          ["#60", "3/4 in", "1/2 in", "heavier drive"],
          ["#60H", "3/4 in", "1/2 in", "heavy drive"],
          ["#80", "1 in", "5/8 in", "heavy drive"],
          ["#80H", "1 in", "5/8 in", "heavier industrial drive"],
          ["#100", "1-1/4 in", "3/4 in", "heavy drive"],
          ["#120", "1-1/2 in", "1 in", "heavy industrial drive"],
          ["#140", "1-3/4 in", "1 in", "large industrial drive"],
          ["#160", "2 in", "1-1/4 in", "large industrial drive"],
          ["#200", "2-1/2 in", "1-1/2 in", "very heavy drive"],
          ["#240", "3 in", "1-7/8 in", "very heavy drive"],
          ["#2040", "1 in", "5/16 in", "double-pitch conveyor"],
        ],
      },
      {
        title: "Oil / Grease Reference",
        note: "Lubricant selection depends on load, speed, temperature, seals, contamination, and OEM spec.",
        columns: ["Type", "Reference", "Common use note", "Watch point"],
        rows: [
          ["ISO VG 22", "very light oil", "spindles / light hydraulic", "temperature"],
          ["ISO VG 32", "SAE 10-ish", "light hydraulic / spindle", "additive package"],
          ["ISO VG 46", "SAE 15-ish", "common hydraulic", "OEM viscosity"],
          ["ISO VG 68", "SAE 20-ish", "hydraulic / light gear cases", "foam / water"],
          ["ISO VG 100", "SAE 30-ish", "gearboxes / bearings", "heat"],
          ["ISO VG 150", "SAE 40-ish", "industrial gear oil", "load"],
          ["ISO VG 220", "SAE 90-ish gear", "gear oil range", "additives"],
          ["ISO VG 320", "heavy gear oil", "slow heavy gearbox", "startup temp"],
          ["ISO VG 460", "very heavy gear oil", "slow loaded gearbox", "pumpability"],
          ["NLGI 000", "fluid grease", "centralized systems", "leakage"],
          ["NLGI 00", "semi-fluid grease", "gearboxes / central lube", "seal condition"],
          ["NLGI 0", "soft grease", "cold service", "retention"],
          ["NLGI 1", "softer grease", "cold / centralized systems", "compatibility"],
          ["NLGI 2", "standard grease", "common bearings", "base/thickener"],
          ["NLGI 3", "stiffer grease", "vertical shafts / retention", "speed/temp"],
          ["Lithium complex", "grease thickener", "general industrial grease", "mixing"],
          ["Polyurea", "grease thickener", "electric motor bearings", "mixing"],
          ["Calcium sulfonate", "grease thickener", "wet/corrosive service", "compatibility"],
          ["EP gear oil", "extreme pressure", "gearboxes", "yellow metal"],
          ["Food grade H1", "incidental contact", "food processing areas", "rating"],
        ],
      },
      {
        title: "Torque Reference",
        note: "Reference only. Always follow OEM torque, bolt grade, lubrication, thread engagement, and safety-critical requirements.",
        columns: ["Bolt", "Grade 5 dry", "Grade 8 dry", "Note"],
        rows: [
          ["#10-24", "3 ft-lb", "4 ft-lb", "small fastener"],
          ["#10-32", "3 ft-lb", "4 ft-lb", "small fastener"],
          ["1/4-20", "8 ft-lb", "12 ft-lb", "typical reference range"],
          ["1/4-28", "10 ft-lb", "14 ft-lb", "fine thread"],
          ["5/16-18", "17 ft-lb", "25 ft-lb", "typical reference range"],
          ["5/16-24", "19 ft-lb", "27 ft-lb", "fine thread"],
          ["3/8-16", "31 ft-lb", "44 ft-lb", "typical reference range"],
          ["3/8-24", "35 ft-lb", "49 ft-lb", "fine thread"],
          ["7/16-14", "49 ft-lb", "70 ft-lb", "typical reference range"],
          ["7/16-20", "55 ft-lb", "78 ft-lb", "fine thread"],
          ["1/2-13", "75 ft-lb", "105 ft-lb", "typical reference range"],
          ["1/2-20", "85 ft-lb", "120 ft-lb", "fine thread"],
          ["9/16-12", "110 ft-lb", "155 ft-lb", "typical reference range"],
          ["9/16-18", "120 ft-lb", "170 ft-lb", "fine thread"],
          ["5/8-11", "150 ft-lb", "210 ft-lb", "typical reference range"],
          ["5/8-18", "170 ft-lb", "240 ft-lb", "fine thread"],
          ["3/4-10", "265 ft-lb", "375 ft-lb", "typical reference range"],
          ["3/4-16", "295 ft-lb", "420 ft-lb", "fine thread"],
          ["7/8-9", "430 ft-lb", "605 ft-lb", "typical reference range"],
          ["1-8", "640 ft-lb", "910 ft-lb", "typical reference range"],
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
          <p class="shop-reference-note"><span aria-hidden="true">*</span>${escapeHtml(section.note)}</p>
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
