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
        columns: ["Thread", "Tap drill", "Clearance", "Common use note"],
        rows: [
          ["#1-64", "#53", "#48 / #46", "tiny machine screws"],
          ["#2-56", "#50", "#43 / #41", "small covers and brackets"],
          ["#4-40", "#43", "#32 / #30", "electronics panels"],
          ["#6-32", "#36", "#27 / #25", "electrical boxes and covers"],
          ["#8-32", "#29", "#18 / #16", "machine guards and panels"],
          ["#10-24", "#25", "#9 / #7", "sheet-metal brackets"],
          ["#10-32", "#21", "#9 / #7", "finer machine-screw work"],
          ["1/4-20", "#7", "F / H", "general shop fixtures"],
          ["1/4-28", "#3", "F / H", "fine-thread adjustment points"],
          ["5/16-18", "F", "P / Q", "light equipment mounts"],
          ["5/16-24", "I", "P / Q", "fine-thread clamps"],
          ["3/8-16", "5/16", "W / X", "motor bases and frames"],
          ["3/8-24", "Q", "W / X", "fine-thread machinery"],
          ["7/16-14", "U", "29/64 / 15/32", "heavier equipment mounts"],
          ["1/2-13", "27/64", "17/32 / 35/64", "structural brackets"],
          ["1/2-20", "29/64", "17/32 / 35/64", "fine-thread machinery"],
          ["M4 x 0.7", "3.3 mm", "4.5 / 4.8 mm", "small metric panels"],
          ["M5 x 0.8", "4.2 mm", "5.5 / 5.8 mm", "metric covers"],
          ["M6 x 1.0", "5.0 mm", "6.6 / 7.0 mm", "metric machine guards"],
          ["M8 x 1.25", "6.8 mm", "9.0 / 10.0 mm", "metric equipment mounts"],
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
        columns: ["Nominal / tube", "Actual OD", "Schedule 40 wall", "Common use note"],
        rows: [
          ["1/8 NPS", "0.405 in", "0.068 in", "gauges and small air lines"],
          ["1/4 NPS", "0.540 in", "0.088 in", "compressed air drops"],
          ["3/8 NPS", "0.675 in", "0.091 in", "air tools / small water"],
          ["1/2 NPS", "0.840 in", "0.109 in", "plant air branches"],
          ["3/4 NPS", "1.050 in", "0.113 in", "air header branches"],
          ["1 NPS", "1.315 in", "0.133 in", "main air/water runs"],
          ["1-1/4 NPS", "1.660 in", "0.140 in", "larger utility piping"],
          ["1-1/2 NPS", "1.900 in", "0.145 in", "pump and header piping"],
          ["2 NPS", "2.375 in", "0.154 in", "larger headers"],
          ["2-1/2 NPS", "2.875 in", "0.203 in", "process piping"],
          ["3 NPS", "3.500 in", "0.216 in", "main process lines"],
          ["4 NPS", "4.500 in", "0.237 in", "large water/process lines"],
          ["6 NPS", "6.625 in", "0.280 in", "plant mains"],
          ["8 NPS", "8.625 in", "0.322 in", "large service mains"],
          ["1/4 tube", "0.250 in", "varies", "instrument air / brake tube"],
          ["3/8 tube", "0.375 in", "varies", "pneumatic controls"],
          ["1/2 tube", "0.500 in", "varies", "hydraulic/pneumatic lines"],
          ["3/4 tube", "0.750 in", "varies", "larger hydraulic lines"],
          ["1 tube", "1.000 in", "varies", "machine fluid transfer"],
          ["1-1/2 tube", "1.500 in", "varies", "structural or large fluid tube"],
        ],
      },
      {
        title: "Belt Section Reference",
        note: "Confirm profile, outside length, inside length, and manufacturer series before replacing belts.",
        columns: ["Section", "Top width", "Height", "Common note"],
        rows: [
          ["3L", "3/8 in", "7/32 in", "small fans / light fractional HP"],
          ["4L / A", "1/2 in", "5/16 in", "shop fans and light conveyors"],
          ["5L / B", "21/32 in", "3/8 in", "common pumps and blowers"],
          ["C", "7/8 in", "17/32 in", "larger blowers / compressors"],
          ["D", "1-1/4 in", "3/4 in", "heavy belt drives"],
          ["E", "1-1/2 in", "29/32 in", "very heavy old drives"],
          ["AX", "1/2 in", "5/16 in", "small pulley / high-flex A drive"],
          ["BX", "21/32 in", "3/8 in", "common industrial cogged drive"],
          ["CX", "7/8 in", "17/32 in", "larger cogged drive"],
          ["3V", "3/8 in", "5/16 in", "compact high-speed drive"],
          ["5V", "5/8 in", "17/32 in", "high-horsepower compact drive"],
          ["8V", "1 in", "29/32 in", "large compressor / crusher drive"],
          ["3VX", "3/8 in", "5/16 in", "cogged compact drive"],
          ["5VX", "5/8 in", "17/32 in", "cogged high-horsepower drive"],
          ["2L", "1/4 in", "5/32 in", "appliance / very light duty"],
          ["SPZ", "10 mm", "8 mm", "metric light wedge drive"],
          ["SPA", "13 mm", "10 mm", "metric pump/fan drive"],
          ["SPB", "17 mm", "14 mm", "metric industrial drive"],
          ["SPC", "22 mm", "18 mm", "metric heavy drive"],
          ["Poly-V J", "2.34 mm rib pitch", "motors, treadmills, compact drives"],
        ],
      },
      {
        title: "Bearing Quick Reference",
        note: "Bearing suffixes change seals, shields, clearance, and fit. Match the full bearing code.",
        columns: ["Bearing", "Bore", "OD x Width", "Common use note"],
        rows: [
          ["608", "8 mm", "22 x 7 mm", "rollers, wheels, light guides"],
          ["6000", "10 mm", "26 x 8 mm", "small motors / idlers"],
          ["6001", "12 mm", "28 x 8 mm", "small shafts"],
          ["6002", "15 mm", "32 x 9 mm", "light-duty motors"],
          ["6003", "17 mm", "35 x 10 mm", "small fans / conveyors"],
          ["6004", "20 mm", "42 x 12 mm", "light equipment shafts"],
          ["6005", "25 mm", "47 x 12 mm", "light-duty shaft support"],
          ["6201", "12 mm", "32 x 10 mm", "motor ends / small pulleys"],
          ["6202", "15 mm", "35 x 11 mm", "small motors and rollers"],
          ["6203", "17 mm", "40 x 12 mm", "common motor bearing"],
          ["6204", "20 mm", "47 x 14 mm", "pumps / motor shafts"],
          ["6205", "25 mm", "52 x 15 mm", "common pump and conveyor bearing"],
          ["6206", "30 mm", "62 x 16 mm", "larger motor / gearbox support"],
          ["6207", "35 mm", "72 x 17 mm", "heavier rotating shafts"],
          ["6208", "40 mm", "80 x 18 mm", "larger industrial shafts"],
          ["6301", "12 mm", "37 x 12 mm", "heavier small shaft"],
          ["6302", "15 mm", "42 x 13 mm", "heavier small motor"],
          ["6303", "17 mm", "47 x 14 mm", "heavier motor bearing"],
          ["6304", "20 mm", "52 x 15 mm", "heavier pump shaft"],
          ["6305", "25 mm", "62 x 17 mm", "heavier conveyor/pump bearing"],
        ],
      },
      {
        title: "Roller Chain Reference",
        note: "Match pitch, roller width, strand count, sprocket condition, and lubrication before replacement.",
        columns: ["Chain", "Pitch", "Roller width", "Common note"],
        rows: [
          ["#25", "1/4 in", "1/8 in", "small guards / light automation"],
          ["#25H", "1/4 in", "1/8 in", "heavier small automation"],
          ["#35", "3/8 in", "3/16 in", "small conveyors / light drives"],
          ["#35H", "3/8 in", "3/16 in", "heavier small conveyors"],
          ["#40", "1/2 in", "5/16 in", "common conveyor and sprocket drive"],
          ["#40H", "1/2 in", "5/16 in", "heavier #40 replacement"],
          ["#41", "1/2 in", "1/4 in", "narrow conveyor chain"],
          ["#50", "5/8 in", "3/8 in", "medium conveyor / drive chain"],
          ["#50H", "5/8 in", "3/8 in", "heavier medium drive"],
          ["#60", "3/4 in", "1/2 in", "ag equipment / heavier conveyors"],
          ["#60H", "3/4 in", "1/2 in", "shock-loaded #60 drives"],
          ["#80", "1 in", "5/8 in", "heavy conveyor / mixer drives"],
          ["#80H", "1 in", "5/8 in", "shock-loaded heavy drives"],
          ["#100", "1-1/4 in", "3/4 in", "large conveyor / slow heavy drive"],
          ["#120", "1-1/2 in", "1 in", "large industrial drive"],
          ["#140", "1-3/4 in", "1 in", "large low-speed drive"],
          ["#160", "2 in", "1-1/4 in", "very large industrial drive"],
          ["#200", "2-1/2 in", "1-1/2 in", "very heavy slow drive"],
          ["#240", "3 in", "1-7/8 in", "very heavy conveyor drive"],
          ["#2040", "1 in", "5/16 in", "double-pitch conveyor"],
        ],
      },
      {
        title: "Oil / Grease Reference",
        note: "Lubricant selection depends on load, speed, temperature, seals, contamination, and OEM spec.",
        columns: ["Type", "Reference", "Common use note", "Watch point"],
        rows: [
          ["ISO VG 22", "very light oil", "high-speed spindles / light hydraulics", "temperature"],
          ["ISO VG 32", "SAE 10-ish", "cold hydraulic systems / small pumps", "additive package"],
          ["ISO VG 46", "SAE 15-ish", "common hydraulic power units", "OEM viscosity"],
          ["ISO VG 68", "SAE 20-ish", "older hydraulics / light gear cases", "foam / water"],
          ["ISO VG 100", "SAE 30-ish", "gear reducers / sleeve bearings", "heat"],
          ["ISO VG 150", "SAE 40-ish", "industrial reducers", "load"],
          ["ISO VG 220", "SAE 90-ish gear", "worm gears / loaded reducers", "additives"],
          ["ISO VG 320", "heavy gear oil", "slow heavy gearbox", "startup temp"],
          ["ISO VG 460", "very heavy gear oil", "slow loaded gearbox", "pumpability"],
          ["NLGI 000", "fluid grease", "centralized lube lines", "leakage"],
          ["NLGI 00", "semi-fluid grease", "gearboxes with grease spec", "seal condition"],
          ["NLGI 0", "soft grease", "cold service / low-temp bearings", "retention"],
          ["NLGI 1", "softer grease", "centralized grease systems", "compatibility"],
          ["NLGI 2", "standard grease", "general motor and conveyor bearings", "base/thickener"],
          ["NLGI 3", "stiffer grease", "vertical shafts / high retention", "speed/temp"],
          ["Lithium complex", "grease thickener", "general plant bearing grease", "mixing"],
          ["Polyurea", "grease thickener", "electric motor bearings", "mixing"],
          ["Calcium sulfonate", "grease thickener", "washdown / wet areas", "compatibility"],
          ["EP gear oil", "extreme pressure", "loaded gearboxes", "yellow metal"],
          ["Food grade H1", "incidental contact", "food processing equipment", "rating"],
        ],
      },
      {
        title: "Torque Reference",
        note: "Reference only. Always follow OEM torque, bolt grade, lubrication, thread engagement, and safety-critical requirements.",
        columns: ["Bolt", "Grade 5 dry", "Grade 8 dry", "Note"],
        rows: [
          ["#10-24", "3 ft-lb", "4 ft-lb", "small covers and brackets"],
          ["#10-32", "3 ft-lb", "4 ft-lb", "small machine screws"],
          ["1/4-20", "8 ft-lb", "12 ft-lb", "guards and light brackets"],
          ["1/4-28", "10 ft-lb", "14 ft-lb", "fine-thread small brackets"],
          ["5/16-18", "17 ft-lb", "25 ft-lb", "light equipment mounts"],
          ["5/16-24", "19 ft-lb", "27 ft-lb", "fine-thread clamps"],
          ["3/8-16", "31 ft-lb", "44 ft-lb", "motor feet / frames"],
          ["3/8-24", "35 ft-lb", "49 ft-lb", "fine-thread machinery"],
          ["7/16-14", "49 ft-lb", "70 ft-lb", "medium equipment mounts"],
          ["7/16-20", "55 ft-lb", "78 ft-lb", "fine-thread equipment mounts"],
          ["1/2-13", "75 ft-lb", "105 ft-lb", "structural brackets / bases"],
          ["1/2-20", "85 ft-lb", "120 ft-lb", "fine-thread base fasteners"],
          ["9/16-12", "110 ft-lb", "155 ft-lb", "heavier bases"],
          ["9/16-18", "120 ft-lb", "170 ft-lb", "fine-thread heavier bases"],
          ["5/8-11", "150 ft-lb", "210 ft-lb", "large machine mounts"],
          ["5/8-18", "170 ft-lb", "240 ft-lb", "fine-thread large mounts"],
          ["3/4-10", "265 ft-lb", "375 ft-lb", "heavy frames / anchors"],
          ["3/4-16", "295 ft-lb", "420 ft-lb", "fine-thread heavy frames"],
          ["7/8-9", "430 ft-lb", "605 ft-lb", "very heavy equipment"],
          ["1-8", "640 ft-lb", "910 ft-lb", "large anchor/base fasteners"],
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
