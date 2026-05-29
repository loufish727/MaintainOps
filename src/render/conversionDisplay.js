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
      {
        title: "Fitting / Thread Reference",
        note: "Confirm thread form, sealing face, angle, pitch, and pressure rating before replacing fittings.",
        columns: ["Type", "Seal style", "Common use note", "Watch point"],
        rows: [
          ["NPT", "tapered thread", "air, water, pipe fittings", "thread sealant"],
          ["NPTF", "dryseal tapered", "hydraulic pipe adapters", "thread damage"],
          ["BSPT", "tapered thread", "import pipe fittings", "not NPT"],
          ["BSPP", "parallel thread", "import hydraulic ports", "bonded seal"],
          ["JIC 37", "metal flare", "hydraulic hose adapters", "flare angle"],
          ["SAE 45", "metal flare", "refrigeration / older fuel", "not JIC"],
          ["ORB", "O-ring boss", "hydraulic valve ports", "O-ring condition"],
          ["ORFS", "flat face O-ring", "leak-sensitive hydraulics", "face seal"],
          ["JIS 30", "metric flare", "Japanese equipment", "seat angle"],
          ["DIN light", "metric bite sleeve", "European hydraulics", "tube series"],
          ["DIN heavy", "metric bite sleeve", "high-pressure metric tube", "tube series"],
          ["Compression", "ferrule", "instrument air / copper tube", "tube OD"],
          ["Push-to-connect", "grip seal", "pneumatic tubing", "tube cut quality"],
          ["Camlock", "gasket face", "temporary hose transfer", "gasket material"],
          ["Tri-clamp", "gasket clamp", "food/process piping", "gasket material"],
          ["Flange 150", "gasket flange", "low-pressure pipe", "bolt pattern"],
          ["Flange 300", "gasket flange", "higher-pressure pipe", "rating class"],
          ["Garden hose", "gasket thread", "washdown / utility water", "washer"],
          ["AN flare", "37 flare", "fuel/oil lines", "same angle as JIC"],
          ["Metric port", "thread + washer", "import machines", "pitch check"],
        ],
      },
      {
        title: "Hydraulic Hose Dash Reference",
        note: "Confirm hose construction, pressure rating, fitting series, bend radius, and fluid compatibility.",
        columns: ["Dash", "Nominal ID", "Approx mm", "Common use note"],
        rows: [
          ["-2", "1/8 in", "3.2 mm", "pilot lines / grease"],
          ["-3", "3/16 in", "4.8 mm", "brake or small hydraulic lines"],
          ["-4", "1/4 in", "6.4 mm", "small cylinders / steering"],
          ["-5", "5/16 in", "7.9 mm", "less common OEM hose"],
          ["-6", "3/8 in", "9.5 mm", "common hydraulic hose"],
          ["-8", "1/2 in", "12.7 mm", "medium flow hydraulics"],
          ["-10", "5/8 in", "15.9 mm", "higher-flow return/feed"],
          ["-12", "3/4 in", "19.1 mm", "large cylinders / return"],
          ["-16", "1 in", "25.4 mm", "large return/suction"],
          ["-20", "1-1/4 in", "31.8 mm", "large suction/return"],
          ["-24", "1-1/2 in", "38.1 mm", "large hydraulic return"],
          ["-32", "2 in", "50.8 mm", "large suction line"],
          ["1SN", "wire braid", "medium pressure", "single braid"],
          ["2SN", "wire braid", "higher pressure", "double braid"],
          ["4SP", "spiral wire", "high-pressure impulse", "bend radius"],
          ["4SH", "spiral wire", "very high pressure", "crimp spec"],
          ["R12", "spiral wire", "heavy hydraulic service", "temperature"],
          ["R13", "spiral wire", "severe impulse service", "fitting match"],
          ["R15", "spiral wire", "very high impulse service", "fitting match"],
          ["Suction", "reinforced", "pump inlet / reservoir", "collapse rating"],
        ],
      },
      {
        title: "Socket / Wrench Close-Fit Reference",
        note: "Close fits are for identification only. Use the correct socket/wrench before applying torque.",
        columns: ["SAE", "Metric close fit", "Fit quality", "Common use note"],
        rows: [
          ["5/32", "4 mm", "close", "small set screws"],
          ["3/16", "5 mm", "loose", "small machine hardware"],
          ["7/32", "5.5 mm", "close", "small hex hardware"],
          ["1/4", "6 mm", "loose", "small hex heads"],
          ["5/16", "8 mm", "close", "#10 hex / small bolts"],
          ["11/32", "9 mm", "loose", "small clamp hardware"],
          ["3/8", "10 mm", "loose", "small metric/SAE mix"],
          ["7/16", "11 mm", "close", "1/4 bolt heads"],
          ["1/2", "13 mm", "loose", "5/16 bolt heads"],
          ["9/16", "14 mm", "close", "3/8 bolt heads"],
          ["5/8", "16 mm", "loose", "7/16 bolt heads"],
          ["11/16", "17 mm", "close", "metric frame hardware"],
          ["3/4", "19 mm", "close", "1/2 bolt heads"],
          ["13/16", "21 mm", "loose", "lug/nut checks"],
          ["7/8", "22 mm", "close", "larger fasteners"],
          ["15/16", "24 mm", "close", "5/8 bolt heads"],
          ["1", "25 mm", "loose", "large fasteners"],
          ["1-1/16", "27 mm", "close", "hydraulic fittings"],
          ["1-1/8", "29 mm", "loose", "large fittings"],
          ["1-1/4", "32 mm", "close", "large nuts/fittings"],
        ],
      },
      {
        title: "Sheet Metal Gauge Reference",
        note: "Gauge thickness varies by material standard. Confirm material, coating, and drawing callout.",
        columns: ["Gauge", "Steel", "Aluminum", "Common use note"],
        rows: [
          ["30 ga", "0.0120 in", "0.0100 in", "thin shim / flashing"],
          ["28 ga", "0.0149 in", "0.0126 in", "light covers"],
          ["26 ga", "0.0179 in", "0.0159 in", "duct / light panels"],
          ["24 ga", "0.0239 in", "0.0201 in", "sheet-metal skins"],
          ["22 ga", "0.0299 in", "0.0253 in", "light guards"],
          ["20 ga", "0.0359 in", "0.0320 in", "panels / covers"],
          ["18 ga", "0.0478 in", "0.0403 in", "machine guards"],
          ["16 ga", "0.0598 in", "0.0508 in", "strong guards / brackets"],
          ["14 ga", "0.0747 in", "0.0641 in", "brackets / cabinets"],
          ["12 ga", "0.1046 in", "0.0808 in", "heavy guards / frames"],
          ["11 ga", "0.1196 in", "0.0907 in", "industrial guards"],
          ["10 ga", "0.1345 in", "0.1019 in", "heavy brackets"],
          ["9 ga", "0.1495 in", "0.1144 in", "floor plates / supports"],
          ["8 ga", "0.1644 in", "0.1285 in", "heavy supports"],
          ["7 ga", "0.1793 in", "0.1443 in", "heavy fabrication"],
          ["6 ga", "0.1943 in", "0.1620 in", "structural plate range"],
          ["5 ga", "0.2092 in", "0.1819 in", "heavy plate range"],
          ["4 ga", "0.2242 in", "0.2043 in", "heavy plate range"],
          ["3 ga", "0.2391 in", "0.2294 in", "heavy plate range"],
          ["1/4 plate", "0.2500 in", "0.2500 in", "plate, not gauge"],
        ],
      },
      {
        title: "Fastener Grade Marking Reference",
        note: "Confirm markings, material, coating, and spec. Do not mix unknown fasteners into critical joints.",
        columns: ["Marking", "Approx class", "Common use note", "Watch point"],
        rows: [
          ["No lines", "SAE Grade 2", "light-duty hardware", "low strength"],
          ["3 radial lines", "SAE Grade 5", "general machinery bolts", "medium strength"],
          ["6 radial lines", "SAE Grade 8", "high-strength machinery", "brittleness risk"],
          ["A325", "structural", "structural steel bolting", "joint spec"],
          ["A490", "structural high strength", "structural steel bolting", "joint spec"],
          ["8.8", "metric class 8.8", "metric machinery bolts", "common metric"],
          ["10.9", "metric class 10.9", "higher-strength metric", "torque spec"],
          ["12.9", "metric class 12.9", "socket head cap screws", "critical torque"],
          ["A2-70", "304 stainless", "corrosion resistant hardware", "lower strength"],
          ["A4-80", "316 stainless", "wet/corrosive hardware", "galling"],
          ["B7", "alloy stud", "flanges / pressure joints", "nut match"],
          ["2H", "heavy hex nut", "B7 stud nut", "stud compatibility"],
          ["L9", "high strength", "specialty high-strength bolts", "spec required"],
          ["F593", "stainless bolt", "stainless machine fasteners", "alloy class"],
          ["F594", "stainless nut", "stainless nut pairing", "alloy class"],
          ["5.8", "metric class 5.8", "light metric hardware", "lower strength"],
          ["6.8", "metric class 6.8", "medium metric hardware", "less common"],
          ["Brass", "non-ferrous", "electrical/corrosion uses", "soft material"],
          ["Aluminum", "lightweight", "low-load assemblies", "thread damage"],
          ["Unknown", "do not rate", "replace with known grade", "do not trust"],
        ],
      },
      {
        title: "O-Ring Size Reference",
        note: "Confirm AS568 size, material, durometer, groove design, pressure, and fluid compatibility.",
        columns: ["AS568", "ID", "CS", "Common use note"],
        rows: [
          ["-006", "0.114 in", "0.070 in", "small pneumatic fittings"],
          ["-008", "0.176 in", "0.070 in", "small valves"],
          ["-010", "0.239 in", "0.070 in", "instrument fittings"],
          ["-012", "0.364 in", "0.070 in", "small hydraulic plugs"],
          ["-014", "0.489 in", "0.070 in", "small ports"],
          ["-016", "0.614 in", "0.070 in", "small cylinders"],
          ["-110", "0.362 in", "0.103 in", "ORB/fitting seals"],
          ["-112", "0.487 in", "0.103 in", "fittings / valve plugs"],
          ["-114", "0.612 in", "0.103 in", "hydraulic fittings"],
          ["-116", "0.737 in", "0.103 in", "larger fittings"],
          ["-118", "0.862 in", "0.103 in", "ports and covers"],
          ["-120", "0.987 in", "0.103 in", "covers / plugs"],
          ["-210", "0.734 in", "0.139 in", "cylinder glands"],
          ["-212", "0.859 in", "0.139 in", "hydraulic glands"],
          ["-214", "0.984 in", "0.139 in", "pumps / covers"],
          ["-216", "1.109 in", "0.139 in", "covers / housings"],
          ["-218", "1.234 in", "0.139 in", "larger glands"],
          ["-222", "1.484 in", "0.139 in", "larger covers"],
          ["-325", "1.975 in", "0.210 in", "large cylinder seals"],
          ["-330", "2.475 in", "0.210 in", "large housings"],
        ],
      },
      {
        title: "Shaft Seal Reference",
        note: "Confirm shaft finish, housing bore, seal lip material, pressure, speed, and installation direction.",
        columns: ["Size ID x OD x W", "Common code", "Material", "Common use note"],
        rows: [
          ["12 x 22 x 7 mm", "TC 12-22-7", "NBR", "small gearbox shafts"],
          ["15 x 26 x 7 mm", "TC 15-26-7", "NBR", "small motors/gears"],
          ["17 x 30 x 7 mm", "TC 17-30-7", "NBR", "small pumps"],
          ["20 x 35 x 7 mm", "TC 20-35-7", "NBR", "gearbox shafts"],
          ["25 x 40 x 7 mm", "TC 25-40-7", "NBR", "pump shafts"],
          ["25 x 47 x 7 mm", "TC 25-47-7", "NBR", "motor/gearbox shafts"],
          ["30 x 47 x 7 mm", "TC 30-47-7", "NBR", "gear reducers"],
          ["30 x 52 x 8 mm", "TC 30-52-8", "NBR", "pump housings"],
          ["35 x 52 x 7 mm", "TC 35-52-7", "NBR", "gearbox output"],
          ["35 x 62 x 8 mm", "TC 35-62-8", "NBR", "larger reducers"],
          ["40 x 62 x 8 mm", "TC 40-62-8", "NBR", "larger shafts"],
          ["40 x 72 x 10 mm", "TC 40-72-10", "NBR", "industrial reducers"],
          ["45 x 72 x 10 mm", "TC 45-72-10", "NBR", "pump/gearbox"],
          ["50 x 72 x 10 mm", "TC 50-72-10", "NBR", "larger gearbox"],
          ["50 x 80 x 10 mm", "TC 50-80-10", "NBR", "large reducers"],
          ["1 x 1.5 x .25 in", "inch lip seal", "NBR", "small inch shafts"],
          ["1.25 x 2 x .25 in", "inch lip seal", "NBR", "inch pump shafts"],
          ["1.5 x 2.25 x .375 in", "inch lip seal", "NBR", "gearbox shafts"],
          ["2 x 3 x .375 in", "inch lip seal", "NBR", "large inch shafts"],
          ["2.5 x 3.5 x .375 in", "inch lip seal", "NBR", "heavy equipment shafts"],
        ],
      },
      {
        title: "NEMA Motor Frame Reference",
        note: "Confirm enclosure, horsepower, shaft, base, C-face, voltage, RPM, and service factor before replacing motors.",
        columns: ["Frame", "Shaft height", "Shaft dia.", "Common use note"],
        rows: [
          ["48", "3.0 in", "1/2 in", "small fractional HP motors"],
          ["56", "3.5 in", "5/8 in", "common fractional HP motors"],
          ["56C", "3.5 in", "5/8 in", "C-face pump/machine motors"],
          ["143T", "3.5 in", "7/8 in", "small industrial motor"],
          ["145T", "3.5 in", "7/8 in", "small industrial motor"],
          ["182T", "4.5 in", "1-1/8 in", "general industrial motors"],
          ["184T", "4.5 in", "1-1/8 in", "pumps and fans"],
          ["213T", "5.25 in", "1-3/8 in", "medium industrial motors"],
          ["215T", "5.25 in", "1-3/8 in", "medium pumps/blowers"],
          ["254T", "6.25 in", "1-5/8 in", "larger industrial motors"],
          ["256T", "6.25 in", "1-5/8 in", "larger pumps/fans"],
          ["284T", "7.0 in", "1-7/8 in", "larger motor bases"],
          ["286T", "7.0 in", "1-7/8 in", "larger industrial motors"],
          ["324T", "8.0 in", "2-1/8 in", "large pumps/blowers"],
          ["326T", "8.0 in", "2-1/8 in", "large industrial motors"],
          ["364T", "9.0 in", "2-3/8 in", "large equipment motors"],
          ["365T", "9.0 in", "2-3/8 in", "large fan/pump motors"],
          ["404T", "10.0 in", "2-7/8 in", "very large motors"],
          ["405T", "10.0 in", "2-7/8 in", "very large pumps"],
          ["444T", "11.0 in", "3-3/8 in", "large process motors"],
        ],
      },
      {
        title: "Electrical Plug / Receptacle Reference",
        note: "Confirm voltage, phase, amperage, grounding, environment, and local electrical code before wiring.",
        columns: ["NEMA", "Rating", "Common use note", "Watch point"],
        rows: [
          ["5-15", "125V 15A", "standard household outlet", "indoor general use"],
          ["5-20", "125V 20A", "shop branch circuits", "T-slot receptacle"],
          ["6-15", "250V 15A", "small 240V equipment", "no neutral"],
          ["6-20", "250V 20A", "240V tools / equipment", "no neutral"],
          ["6-30", "250V 30A", "welders / shop equipment", "no neutral"],
          ["6-50", "250V 50A", "welder outlets", "no neutral"],
          ["10-30", "125/250V 30A", "older dryer outlet", "old 3-wire"],
          ["10-50", "125/250V 50A", "older range outlet", "old 3-wire"],
          ["14-30", "125/250V 30A", "modern dryer / generator", "4-wire"],
          ["14-50", "125/250V 50A", "RV 50A / range / EV", "4-wire"],
          ["L5-15", "125V 15A", "locking light-duty tools", "twist-lock"],
          ["L5-20", "125V 20A", "locking shop cords", "twist-lock"],
          ["L5-30", "125V 30A", "RV/generator 120V", "twist-lock"],
          ["L6-20", "250V 20A", "locking 240V equipment", "no neutral"],
          ["L6-30", "250V 30A", "locking 240V equipment", "no neutral"],
          ["L14-20", "125/250V 20A", "generator / transfer loads", "4-wire"],
          ["L14-30", "125/250V 30A", "generator inlet common", "4-wire"],
          ["L15-30", "250V 30A 3-phase", "3-phase equipment", "no neutral"],
          ["L21-30", "120/208V 30A 3-phase", "3-phase with neutral", "5-wire"],
          ["TT-30", "125V 30A", "RV 30A travel trailer", "not 240V"],
        ],
      },
      {
        title: "Common Sensor ID Reference",
        note: "Reference only. Confirm wiring diagram, voltage, output type, sensing range, and connector pinout.",
        columns: ["ID / marking", "Type", "Common use note", "Watch point"],
        rows: [
          ["M12 prox", "inductive sensor", "metal detection on guards/stops", "PNP/NPN"],
          ["M18 prox", "inductive sensor", "larger target sensing", "range"],
          ["M30 prox", "inductive sensor", "longer-range metal targets", "mounting"],
          ["PZ / PE", "photoeye", "box/product detection", "beam alignment"],
          ["Retroreflective", "photoeye", "reflector target sensing", "reflector condition"],
          ["Diffuse", "photoeye", "short-range product sensing", "surface color"],
          ["Fork sensor", "photoeye", "label/web edge detection", "slot width"],
          ["Reed switch", "magnetic cylinder sensor", "air cylinder position", "magnet piston"],
        ],
      },
      {
        title: "Fuse Class Reference",
        note: "Match fuse class, voltage, interrupt rating, time-delay behavior, and equipment listing.",
        columns: ["Class", "Typical marking", "Common use note", "Watch point"],
        rows: [
          ["Class CC", "CCMR / LP-CC", "control transformers / small motors", "holder type"],
          ["Class J", "JTD / LPJ", "industrial feeders", "short-circuit rating"],
          ["Class RK5", "FRN-R / FRS-R", "general motor circuits", "current limiting"],
          ["Class RK1", "LPN-RK / LPS-RK", "higher protection feeders", "cost"],
          ["Class T", "JLLN / JLLS", "compact high-current service", "very fast"],
          ["Midget", "MDA / MDL", "control panels", "not class CC"],
          ["Glass AGC", "AGC / 3AG", "small electronics", "voltage rating"],
          ["Semiconductor", "A70QS / FWP", "drives and SCRs", "application specific"],
        ],
      },
      {
        title: "Contactor / Overload Reference",
        note: "Confirm coil voltage, horsepower rating, auxiliary contacts, overload class, and reset mode.",
        columns: ["Marking", "Part type", "Common use note", "Watch point"],
        rows: [
          ["A1 / A2", "coil terminals", "contactor coil wiring", "coil voltage"],
          ["L1 L2 L3", "line side", "incoming power", "disconnect first"],
          ["T1 T2 T3", "load side", "motor leads", "phase order"],
          ["13 / 14", "NO aux", "seal-in / status contact", "contact state"],
          ["21 / 22", "NC aux", "interlock contact", "contact state"],
          ["Class 10", "overload trip", "standard motor protection", "motor duty"],
          ["Class 20", "overload trip", "heavier starting loads", "start time"],
          ["FLA dial", "overload setting", "motor nameplate amps", "service factor"],
        ],
      },
      {
        title: "Motor Nameplate Reference",
        note: "Use motor nameplate and OEM requirements for replacement. Do not size by horsepower alone.",
        columns: ["Field", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["HP / kW", "output power", "replacement sizing", "service factor"],
          ["FLA", "full-load amps", "overload setting", "voltage-specific"],
          ["RPM", "rated speed", "pulley/fan/pump speed", "pole count"],
          ["Frame", "mounting/shaft size", "mechanical fit", "C-face/base"],
          ["SF", "service factor", "overload margin", "continuous load"],
          ["Ins class", "winding insulation", "temperature rating", "environment"],
          ["Enclosure", "TEFC/ODP/etc.", "washdown/dust exposure", "cooling"],
          ["Duty", "continuous/intermittent", "cycle rating", "heat"],
        ],
      },
      {
        title: "VFD Fault Quick Reference",
        note: "VFD faults are drive-specific. Check the manual before parameter changes or repeated resets.",
        columns: ["Fault", "Likely area", "Common use note", "Watch point"],
        rows: [
          ["OC / overcurrent", "load or wiring", "jam, short, accel too fast", "motor leads"],
          ["OV / overvoltage", "regen or line", "decel too fast", "braking resistor"],
          ["UV / undervoltage", "supply", "line dip or phase loss", "incoming power"],
          ["OH / overheat", "cooling", "dirty fan/heatsink", "ambient temp"],
          ["GF / ground fault", "motor/cable", "insulation breakdown", "megger policy"],
          ["OL / overload", "motor/load", "high current over time", "mechanical load"],
          ["PHL / phase loss", "input/output", "missing phase", "fuses/contactors"],
          ["COM fault", "network/control", "PLC or keypad comms", "cable/settings"],
        ],
      },
      {
        title: "Pneumatic Fitting ID Reference",
        note: "Confirm tube OD, thread type, seal style, pressure rating, and fluid compatibility.",
        columns: ["ID", "Type", "Common use note", "Watch point"],
        rows: [
          ["1/4 push", "push-to-connect", "common air tubing", "tube cut"],
          ["3/8 push", "push-to-connect", "larger air drops", "OD sizing"],
          ["1/2 push", "push-to-connect", "main machine air", "flow"],
          ["1/8 NPT", "pipe thread", "small valves/fittings", "sealant"],
          ["1/4 NPT", "pipe thread", "common air fittings", "thread damage"],
          ["M5", "metric thread", "small pneumatic ports", "pitch"],
          ["G1/8", "BSPP", "import valve ports", "bonded seal"],
          ["Bulkhead", "panel fitting", "through-panel tubing", "nut clearance"],
        ],
      },
      {
        title: "Air Cylinder ID Reference",
        note: "Confirm bore, stroke, mounting, rod thread, cushions, magnet piston, and seal kit.",
        columns: ["Marking", "Means", "Common use note", "Watch point"],
        rows: [
          ["Bore", "piston diameter", "force estimate", "pressure"],
          ["Stroke", "travel length", "motion distance", "end clearance"],
          ["Rod dia.", "rod size", "thread/clevis fit", "buckling"],
          ["NFPA", "tie-rod style", "standard industrial cylinder", "mounting"],
          ["Compact", "short body", "tight machine spaces", "side load"],
          ["Magnet", "sensor-ready piston", "reed/prox switches", "sensor type"],
          ["Cushion", "end damping", "high-speed motion", "adjustment"],
          ["Seal kit", "repair kit", "leaking cylinder repair", "series match"],
        ],
      },
      {
        title: "Solenoid Valve ID Reference",
        note: "Confirm voltage, valve function, port size, manual override, flow, and pressure range.",
        columns: ["Marking", "Function", "Common use note", "Watch point"],
        rows: [
          ["2/2", "2-way valve", "on/off air or fluid", "normally open/closed"],
          ["3/2", "3-way valve", "single-acting cylinder", "exhaust port"],
          ["5/2", "5-way valve", "double-acting cylinder", "single/double solenoid"],
          ["5/3", "center position", "hold/vent/pressure center", "machine behavior"],
          ["12VDC", "coil voltage", "mobile equipment", "polarity"],
          ["24VDC", "coil voltage", "PLC machines", "flyback"],
          ["120VAC", "coil voltage", "older controls", "coil heat"],
          ["DIN plug", "connector style", "field-replaceable coil", "gasket"],
        ],
      },
      {
        title: "Hydraulic Cylinder Seal ID Reference",
        note: "Seal selection depends on bore, rod, groove, pressure, fluid, temperature, and surface finish.",
        columns: ["Seal", "Location", "Common use note", "Watch point"],
        rows: [
          ["Rod seal", "gland", "keeps oil in cylinder", "lip direction"],
          ["Wiper", "rod exterior", "keeps dirt out", "rod damage"],
          ["Piston seal", "piston OD", "separates pressure sides", "energizer"],
          ["Wear ring", "rod/piston guide", "prevents metal contact", "gap"],
          ["Buffer seal", "behind rod seal", "shock pressure protection", "orientation"],
          ["O-ring", "static seal", "gland/port sealing", "durometer"],
          ["Backup ring", "anti-extrusion", "high-pressure O-rings", "side placement"],
          ["U-cup", "dynamic seal", "rod or piston sealing", "open side to pressure"],
        ],
      },
      {
        title: "Gear Reducer ID Reference",
        note: "Confirm ratio, shaft orientation, service factor, mounting, lubricant, and backstop requirements.",
        columns: ["Marking", "Means", "Common use note", "Watch point"],
        rows: [
          ["Ratio 10:1", "speed reduction", "output is input/10", "torque increase"],
          ["HP rating", "power rating", "motor match", "service factor"],
          ["SF", "service factor", "load severity allowance", "shock load"],
          ["C-face", "motor mount", "direct motor mounting", "frame size"],
          ["Hollow bore", "shaft mount", "conveyor reducers", "bushing size"],
          ["Right angle", "worm/bevel", "space-saving drive", "efficiency"],
          ["Backstop", "one-way clutch", "incline conveyors", "rotation"],
          ["ISO VG", "oil viscosity", "lube selection", "temperature"],
        ],
      },
      {
        title: "Coupling Insert Reference",
        note: "Confirm coupling series, shaft size, torque rating, speed, alignment, and chemical exposure.",
        columns: ["ID", "Style", "Common use note", "Watch point"],
        rows: [
          ["L-075 spider", "jaw coupling", "small pumps", "durometer"],
          ["L-095 spider", "jaw coupling", "small motors", "series"],
          ["L-100 spider", "jaw coupling", "common pump drive", "wear dust"],
          ["L-110 spider", "jaw coupling", "larger pump drive", "hub size"],
          ["L-150 spider", "jaw coupling", "heavier drive", "torque"],
          ["HRC insert", "jaw coupling", "metric/Euro drives", "series"],
          ["Grid coupling", "steel grid", "shock load drives", "lubrication"],
          ["Sure-Flex sleeve", "elastomer sleeve", "pump/fan drives", "flange size"],
        ],
      },
      {
        title: "Conveyor Roller ID Reference",
        note: "Confirm roller diameter, between-frame length, axle style, bearing type, and load rating.",
        columns: ["ID", "Feature", "Common use note", "Watch point"],
        rows: [
          ["1.9 roller", "1.9 in OD", "common gravity conveyor", "BF length"],
          ["2.5 roller", "2.5 in OD", "heavier conveyor", "load"],
          ["7/16 hex axle", "hex spring axle", "common conveyor roller", "frame slot"],
          ["11/16 hex axle", "heavy hex axle", "heavier roller", "frame slot"],
          ["Spring loaded", "axle style", "easy roller removal", "spring length"],
          ["Grooved roller", "O-belt groove", "line-shaft conveyor", "groove position"],
          ["Tapered roller", "curve conveyor", "carton curves", "orientation"],
          ["Poly sleeve", "roller cover", "quiet/grip surface", "wear"],
        ],
      },
      {
        title: "Photoeye Setup Reference",
        note: "Confirm sensor mode, target, environment, wiring, response time, and teach procedure.",
        columns: ["Mode", "Best for", "Common use note", "Watch point"],
        rows: [
          ["Through-beam", "long range", "reliable detection", "two devices"],
          ["Retroreflective", "medium range", "carton/object detection", "reflector"],
          ["Polarized retro", "shiny targets", "rejects mirror reflections", "alignment"],
          ["Diffuse", "short range", "no reflector needed", "target color"],
          ["Background suppression", "fixed distance", "ignores background", "teach distance"],
          ["Clear object", "bottles/film", "transparent targets", "sensitivity"],
          ["Fiber optic", "tight spaces", "small target detection", "fiber damage"],
          ["Laser", "small spot", "precise edge detection", "eye safety"],
        ],
      },
      {
        title: "Proximity Sensor Reference",
        note: "Confirm sensing material, shielded/unshielded body, output type, voltage, and connector.",
        columns: ["Type", "Detects", "Common use note", "Watch point"],
        rows: [
          ["Inductive", "metal", "shaft/guard/stop sensing", "range by metal"],
          ["Capacitive", "many materials", "level/product detection", "false trips"],
          ["Magnetic reed", "magnet", "cylinder position", "magnet required"],
          ["Hall effect", "magnetic field", "speed/position sensing", "polarity"],
          ["Shielded", "flush mount", "metal bracket mounting", "shorter range"],
          ["Unshielded", "non-flush", "longer range", "clearance needed"],
          ["PNP", "sourcing output", "common modern PLC input", "input card"],
          ["NPN", "sinking output", "some older/import machines", "input card"],
        ],
      },
      {
        title: "Thermocouple / RTD Reference",
        note: "Confirm sensor type, temperature range, wiring, extension wire, and controller input setting.",
        columns: ["ID", "Type", "Common use note", "Watch point"],
        rows: [
          ["Type J", "thermocouple", "older equipment / moderate heat", "iron wire"],
          ["Type K", "thermocouple", "general high-temp use", "polarity"],
          ["Type T", "thermocouple", "low-temp/wet environments", "range"],
          ["Type E", "thermocouple", "higher output signal", "controller setting"],
          ["PT100", "RTD", "accurate process temp", "2/3/4 wire"],
          ["PT1000", "RTD", "longer lead applications", "controller setting"],
          ["Mini plug", "TC connector", "bench/test leads", "alloy match"],
          ["Ungrounded", "probe style", "noise isolation", "slower response"],
        ],
      },
      {
        title: "Hose Clamp Reference",
        note: "Confirm clamp style, diameter range, material, pressure, vibration, and hose construction.",
        columns: ["Style", "Best for", "Common use note", "Watch point"],
        rows: [
          ["Worm gear", "general hose", "water/air light duty", "strip risk"],
          ["T-bolt", "high clamp load", "charge air / heavy hose", "torque"],
          ["Spring clamp", "thermal cycling", "coolant hoses", "reuse condition"],
          ["Ear clamp", "permanent crimp", "small hoses", "single use"],
          ["Constant torque", "temperature swings", "silicone/coolant hose", "size range"],
          ["Band clamp", "exhaust/duct", "large diameter joints", "seal type"],
          ["Cushion clamp", "line support", "hydraulic/air line routing", "rubber condition"],
          ["Double wire", "spiral hose", "dust collection hose", "wire fit"],
        ],
      },
      {
        title: "Threadlocker / Retaining Compound Reference",
        note: "Confirm manufacturer, strength, temperature, gap, material, and whether future disassembly is required.",
        columns: ["Color / ID", "Strength", "Common use note", "Watch point"],
        rows: [
          ["Purple 222", "low", "small screws / adjustment screws", "small fasteners"],
          ["Blue 242/243", "medium", "general bolts that need service", "oil tolerance"],
          ["Red 271", "high", "permanent studs/bolts", "heat to remove"],
          ["Green 290", "wicking", "assembled fasteners", "cleanliness"],
          ["Green 609", "retaining", "bearings/bushings", "slip fit"],
          ["Green 620", "high-temp retaining", "sleeves/gears", "gap"],
          ["Primer", "activator", "stainless/inactive metals", "cure speed"],
          ["Anti-seize", "not threadlocker", "hot/corrosive fasteners", "torque changes"],
        ],
      },
      {
        title: "Bearing Suffix ID Reference",
        note: "Match the full bearing code. Suffixes vary by manufacturer and change fit, clearance, seals, and shields.",
        columns: ["Suffix", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["2RS / 2RSH", "two rubber seals", "dusty/wet bearing locations", "friction"],
          ["ZZ / 2Z", "two metal shields", "motors/light contamination", "not sealed"],
          ["C3", "extra clearance", "motors/hot running fits", "noise if misused"],
          ["C4", "more clearance", "high-temp/special fits", "spec required"],
          ["NR", "snap ring groove", "located bearing", "ring included"],
          ["M", "machined cage", "higher duty bearings", "manufacturer meaning"],
          ["TN / TV", "polyamide cage", "common modern bearings", "temperature"],
          ["Explorer", "SKF series", "premium bearing line", "brand-specific"],
        ],
      },
      {
        title: "Belt Code ID Reference",
        note: "Confirm belt profile, effective length, top width, cogged/notched style, and manufacturer code.",
        columns: ["Code", "Means", "Common use note", "Watch point"],
        rows: [
          ["A40", "A section length", "classic V-belt", "inside/effective length"],
          ["4L400", "light-duty belt", "fractional HP belt", "not same as A40"],
          ["AX40", "cogged A belt", "small pulley drives", "profile"],
          ["B56", "B section length", "common industrial V-belt", "length basis"],
          ["5L560", "light-duty B-ish", "fractional HP replacement", "duty"],
          ["BX56", "cogged B belt", "pump/fan drives", "profile"],
          ["5VX800", "narrow cogged belt", "high-power compact drive", "pulley profile"],
          ["J-section", "poly-V", "multi-rib compact belt", "rib count"],
        ],
      },
      {
        title: "Chain Sprocket ID Reference",
        note: "Confirm chain size, tooth count, bore, keyway, hub style, and wear before replacing sprockets.",
        columns: ["ID", "Means", "Common use note", "Watch point"],
        rows: [
          ["40B12", "#40 chain 12T", "small conveyor sprocket", "bore"],
          ["40B24", "#40 chain 24T", "speed reduction", "pitch"],
          ["50B15", "#50 chain 15T", "medium drive", "tooth wear"],
          ["60B18", "#60 chain 18T", "heavier drive", "hub clearance"],
          ["80B12", "#80 chain 12T", "heavy slow drive", "wrap"],
          ["Type A", "plate sprocket", "no hub", "mounting"],
          ["Type B", "one-side hub", "common keyed sprocket", "set screws"],
          ["QD bushing", "taper bushing", "serviceable shaft fit", "bushing series"],
        ],
      },
      {
        title: "Metric Thread Pitch Reference",
        note: "Metric fasteners are identified by major diameter and pitch. Verify pitch with a gauge before matching nuts or tapped holes.",
        columns: ["Thread", "Coarse pitch", "Fine pitch", "Common use note"],
        rows: [
          ["M3", "0.5 mm", "0.35 mm", "small covers and electronics"],
          ["M4", "0.7 mm", "0.5 mm", "small brackets and guards"],
          ["M5", "0.8 mm", "0.5 mm", "covers and light mounts"],
          ["M6", "1.0 mm", "0.75 mm", "machine guards and panels"],
          ["M8", "1.25 mm", "1.0 mm", "equipment mounts"],
          ["M10", "1.5 mm", "1.25 / 1.0 mm", "motor bases and brackets"],
          ["M12", "1.75 mm", "1.5 / 1.25 mm", "structural brackets"],
          ["M16", "2.0 mm", "1.5 mm", "heavy machine fasteners"],
          ["M20", "2.5 mm", "1.5 mm", "large machinery"],
          ["M24", "3.0 mm", "2.0 mm", "heavy equipment"],
        ],
      },
      {
        title: "NPT Pipe Thread Reference",
        note: "NPT size is nominal and tapered. Confirm thread type, sealant requirements, and pressure rating.",
        columns: ["NPT", "Tap drill", "Threads/in", "Common use note"],
        rows: [
          ["1/16", "1/4 in", "27", "small gauges/instruments"],
          ["1/8", "R", "27", "small air fittings"],
          ["1/4", "7/16 in", "18", "common air/tool fittings"],
          ["3/8", "37/64 in", "18", "larger air fittings"],
          ["1/2", "23/32 in", "14", "plant air/water branches"],
          ["3/4", "59/64 in", "14", "utility piping"],
          ["1", "1-5/32 in", "11.5", "larger headers"],
          ["1-1/4", "1-1/2 in", "11.5", "process piping"],
          ["1-1/2", "1-47/64 in", "11.5", "pump/header work"],
          ["2", "2-7/32 in", "11.5", "large service lines"],
        ],
      },
      {
        title: "O-Ring Material Reference",
        note: "O-ring material depends on fluid, temperature, pressure, and movement. Verify compatibility before replacement.",
        columns: ["Material", "Common use note", "Strength", "Watch point"],
        rows: [
          ["NBR / Buna-N", "oil and hydraulic service", "common/low cost", "ozone/heat limits"],
          ["FKM / Viton", "heat and chemical exposure", "high temp", "not best for steam"],
          ["EPDM", "water/steam/coolant", "weather resistant", "poor petroleum oil"],
          ["Silicone", "wide temperature range", "flexible", "low tear strength"],
          ["PTFE", "chemical resistance", "very inert", "low elasticity"],
          ["HNBR", "hydraulic/mobile equipment", "heat/oil resistance", "cost"],
          ["Neoprene", "refrigerant/weather", "moderate oil resistance", "application-specific"],
          ["Urethane", "abrasion/dynamic seals", "tough", "chemical limits"],
        ],
      },
      {
        title: "PM Interval Starter Reference",
        note: "Use this only as a starting point. OEM manual, duty cycle, environment, and failure history should override generic intervals.",
        columns: ["Asset type", "Starter interval", "Common task", "Watch point"],
        rows: [
          ["Air compressor", "weekly/monthly", "drain, filter, leaks", "oil and heat"],
          ["Conveyor", "weekly/monthly", "belt/chain tracking", "guarding"],
          ["Pump", "monthly/quarterly", "leaks, vibration, coupler", "seal condition"],
          ["Gear reducer", "monthly/quarterly", "oil level, leaks, noise", "breather"],
          ["Dust collector", "weekly/monthly", "filters, differential pressure", "fire risk"],
          ["Hydraulic power unit", "weekly/monthly", "fluid, leaks, heat", "contamination"],
          ["Panel/controls", "quarterly", "fans, filters, loose wires", "LOTO"],
          ["Forklift/vehicle", "daily/weekly", "tires, leaks, battery", "operator checks"],
        ],
      },
      {
        title: "Common Failure Symptom Reference",
        note: "Symptoms point to likely areas, not final diagnosis. Lock out equipment and verify before adjustment.",
        columns: ["Asset", "Symptom", "Likely area", "First check"],
        rows: [
          ["Motor", "runs hot", "overload or cooling", "current and fan"],
          ["Pump", "low flow", "clog, air, impeller", "suction/strainer"],
          ["Conveyor", "tracks off", "alignment/load", "rollers and tension"],
          ["Gearbox", "noisy", "lube/bearing/gear", "oil level"],
          ["Air cylinder", "slow stroke", "flow/leak/pressure", "regulator"],
          ["Hydraulic system", "weak force", "pressure/leak/bypass", "relief pressure"],
          ["VFD motor", "trips on accel", "load/current/ramp", "mechanical jam"],
          ["Sensor", "intermittent", "alignment/wiring", "LED and cable"],
        ],
      },
      {
        title: "Bearing Symptom Reference",
        note: "Bearing diagnosis should include load, lubrication, alignment, fit, temperature, and contamination review.",
        columns: ["Symptom", "Likely area", "Common use note", "Watch point"],
        rows: [
          ["Growling noise", "race damage", "rotating equipment", "replace soon"],
          ["High heat", "lube/load/fit", "motors and rollers", "overgrease"],
          ["Blue discoloration", "overheat", "failed lubrication", "shaft damage"],
          ["Vibration", "spall/imbalance", "fans and conveyors", "alignment"],
          ["Rust staining", "water ingress", "washdown/dusty areas", "seal choice"],
          ["Black grease", "contamination/heat", "older bearings", "cleanliness"],
          ["Loose fit", "shaft/housing wear", "repeated failures", "measure fit"],
          ["Early repeat failure", "root cause missed", "critical assets", "alignment/load"],
        ],
      },
      {
        title: "Belt Failure Pattern Reference",
        note: "Belt failures often come from alignment, tension, pulley wear, heat, or contamination rather than the belt alone.",
        columns: ["Pattern", "Likely cause", "Common use note", "First check"],
        rows: [
          ["Glazed sides", "slip/low tension", "V-belts", "tension and load"],
          ["Cracked ribs", "age/heat", "old belts", "temperature"],
          ["Frayed edge", "misalignment", "conveyors/drives", "pulley alignment"],
          ["Chunking", "wrong pulley/debris", "notched belts", "pulley damage"],
          ["Squeal", "slip", "startup load", "tension"],
          ["Dust buildup", "wear/slip", "belt guards", "pulley grooves"],
          ["Uneven wear", "pulley mismatch", "multi-belt sets", "matched set"],
          ["Repeated break", "shock load", "jammed drive", "driven equipment"],
        ],
      },
      {
        title: "Chain / Sprocket Wear Reference",
        note: "Replace chain and sprockets as a system when wear is advanced. Lubrication and alignment drive chain life.",
        columns: ["Condition", "Likely cause", "Common use note", "Watch point"],
        rows: [
          ["Hooked teeth", "worn sprocket", "old conveyor drive", "replace sprocket"],
          ["Chain stretch", "pin/bushing wear", "long conveyors", "measure length"],
          ["Side wear", "misalignment", "guide/contact issue", "sprocket alignment"],
          ["Rusty chain", "poor lube/washdown", "wet areas", "lubricant choice"],
          ["Tight spots", "damaged links", "shock load", "replace chain"],
          ["Noisy drive", "lube/tension/wear", "open chain drives", "lubrication"],
          ["Jumping teeth", "loose/worn", "startup load", "tension"],
          ["Broken rollers", "impact/debris", "dirty conveyors", "guarding"],
        ],
      },
      {
        title: "Pneumatic Cylinder Troubleshooting Reference",
        note: "Depressurize and lock out before service. Confirm pressure, flow controls, valve function, and mechanical binding.",
        columns: ["Symptom", "Likely area", "Common use note", "First check"],
        rows: [
          ["Slow extend", "flow/pressure", "air cylinders", "regulator"],
          ["Slow retract", "flow control", "double-acting cylinders", "meter-out setting"],
          ["Drifts", "seal leak/valve leak", "vertical loads", "check valve"],
          ["Chatters", "low pressure/binding", "sticky motion", "guide rails"],
          ["No movement", "valve/supply", "machine cycle", "solenoid LED"],
          ["End slam", "cushion/flow", "fast stroke", "cushion setting"],
          ["Air leak at rod", "rod seal", "worn cylinder", "rod damage"],
          ["Sensor missed", "magnet/switch", "position sensing", "sensor location"],
        ],
      },
      {
        title: "Hydraulic Leak / Failure Reference",
        note: "Hydraulic leaks can inject fluid under skin. Depressurize and use proper PPE before inspection.",
        columns: ["Symptom", "Likely area", "Common use note", "Watch point"],
        rows: [
          ["External hose leak", "hose/fitting", "wet hose or fitting", "pressure rating"],
          ["Cylinder drift", "piston seal/valve", "load slowly moves", "load safety"],
          ["Weak force", "low pressure/bypass", "presses/lifts", "relief setting"],
          ["Foamy oil", "air ingress", "pump noise", "suction leak"],
          ["Hot oil", "restriction/bypass", "slow systems", "cooler/filter"],
          ["Pump whine", "cavitation", "low inlet flow", "suction strainer"],
          ["Jerky motion", "air/contamination", "cylinders", "bleed/filter"],
          ["Black oil", "heat/contamination", "old fluid", "sample oil"],
        ],
      },
      {
        title: "Compressor Maintenance Reference",
        note: "Follow OEM intervals. Heat, dirty intake air, water, and poor drains shorten compressor life.",
        columns: ["Task", "Starter interval", "Common use note", "Watch point"],
        rows: [
          ["Drain tank", "daily/weekly", "water removal", "auto drain"],
          ["Check oil", "weekly", "lubricated units", "oil type"],
          ["Intake filter", "monthly", "dirty environments", "pressure drop"],
          ["Belt tension", "monthly", "belt-drive units", "alignment"],
          ["Inspect leaks", "monthly", "air savings", "ultrasonic test"],
          ["Clean cooler", "quarterly", "heat control", "airflow"],
          ["Change oil", "OEM interval", "lubricated units", "hours"],
          ["Service separator", "OEM interval", "rotary screw", "pressure drop"],
        ],
      },
      {
        title: "Pump Seal Failure Reference",
        note: "Seal failure is often a symptom of dry run, misalignment, vibration, heat, or wrong materials.",
        columns: ["Symptom", "Likely cause", "Common use note", "First check"],
        rows: [
          ["Dripping at seal", "seal wear", "centrifugal pumps", "flush/pressure"],
          ["Sudden heavy leak", "seal face damage", "critical pump", "dry run"],
          ["Seal runs hot", "poor lubrication", "process pumps", "flow/flush"],
          ["Repeated failure", "alignment/vibration", "coupled pump", "coupling alignment"],
          ["Cracked faces", "thermal shock", "hot/cold service", "process change"],
          ["Corrosion", "wrong material", "chemical service", "material spec"],
          ["Cavitation noise", "suction problem", "low NPSH", "strainer/valves"],
          ["Leaking packing", "packing adjustment", "packed pumps", "gland pressure"],
        ],
      },
      {
        title: "Lockout / Tagout Checklist Reference",
        note: "Use company LOTO procedure and authorized training. This chart is a reminder, not a substitute for procedure.",
        columns: ["Step", "Action", "Common use note", "Watch point"],
        rows: [
          ["1", "notify affected people", "before shutdown", "scope"],
          ["2", "identify energy sources", "electric/air/hydraulic/gravity", "stored energy"],
          ["3", "shut down normally", "operator controls", "sequence"],
          ["4", "isolate energy", "disconnects/valves/blocks", "all sources"],
          ["5", "apply lock/tag", "authorized person", "one lock per person"],
          ["6", "release stored energy", "bleed/block/discharge", "gravity"],
          ["7", "verify zero energy", "try/start/test", "meter/proof"],
          ["8", "restore safely", "remove tools/people clear", "controlled restart"],
        ],
      },
      {
        title: "PPE Task Matrix Reference",
        note: "Follow site hazard assessment and SDS. PPE does not replace guarding, lockout, or safe work controls.",
        columns: ["Task", "Likely PPE", "Common use note", "Watch point"],
        rows: [
          ["Grinding", "safety glasses + face shield", "sparks/debris", "glove snag"],
          ["Welding", "hood, gloves, FR", "hot work", "fume control"],
          ["Chemical handling", "goggles/gloves/apron", "cleaners/oils", "SDS"],
          ["Electrical panel", "arc-rated PPE", "qualified work", "arc flash label"],
          ["Compressed air", "eye protection", "blowoff/nozzles", "pressure limit"],
          ["Overhead work", "hard hat/eye protection", "lifts/ladders", "drop zone"],
          ["Cutting metal", "eye/hand/hearing", "saws/shears", "guarding"],
          ["Hydraulics", "eye/hand protection", "leak checks", "injection hazard"],
        ],
      },
      {
        title: "Extension Cord Load Reference",
        note: "Use listed cords, inspect damage, and follow site electrical rules. Long runs need larger wire.",
        columns: ["Cord", "Length", "Typical load", "Watch point"],
        rows: [
          ["16 AWG", "25 ft", "light tools", "voltage drop"],
          ["16 AWG", "50 ft", "low/medium load", "not heaters"],
          ["14 AWG", "50 ft", "medium tools", "15 A limit"],
          ["14 AWG", "100 ft", "moderate load", "drop"],
          ["12 AWG", "50 ft", "heavy tools", "20 A circuits"],
          ["12 AWG", "100 ft", "higher load", "heat/drop"],
          ["10 AWG", "100 ft", "large temporary load", "connector rating"],
          ["Outdoor cord", "wet location", "jobsite use", "GFCI"],
        ],
      },
      {
        title: "Industrial Wire Color Reference",
        note: "Wire colors vary by standard, machine builder, and country. Verify with drawings and meter before work.",
        columns: ["Color", "Common meaning", "Common use note", "Watch point"],
        rows: [
          ["Green / green-yellow", "equipment ground", "protective earth", "never assume only by color"],
          ["White / gray", "neutral", "AC grounded conductor", "shared neutrals"],
          ["Black", "AC line/control", "120/240 VAC", "verify voltage"],
          ["Red", "AC line/control", "switched or second leg", "panel standard"],
          ["Blue", "DC control", "24 VDC common/positive varies", "drawing required"],
          ["Brown", "DC positive", "IEC sensors", "PNP/NPN wiring"],
          ["Black sensor lead", "sensor output", "3-wire sensors", "input type"],
          ["Yellow/orange", "external/interlock", "machine builder specific", "live when off"],
        ],
      },
      {
        title: "Conduit Fill Quick Reference",
        note: "Use electrical code and actual conductor insulation/OD for final fill. This is a field reminder only.",
        columns: ["Rule", "Common value", "Common use note", "Watch point"],
        rows: [
          ["1 conductor", "53% max fill", "single conductor raceway", "heat"],
          ["2 conductors", "31% max fill", "two-wire raceway", "pulling"],
          ["3+ conductors", "40% max fill", "normal raceway", "derating"],
          ["Junction box", "box fill required", "splices/devices", "grounds count"],
          ["Long pull", "reduce fill", "easier install", "pull tension"],
          ["Many bends", "360 deg max typical", "raceway run", "pull points"],
          ["VFD cable", "follow drive manual", "shielded cable", "noise"],
          ["Controls", "separate as required", "signal wiring", "interference"],
        ],
      },
      {
        title: "IP / NEMA Enclosure Reference",
        note: "Ratings are not always directly interchangeable. Confirm environment, washdown, dust, corrosion, and listing.",
        columns: ["Rating", "Protects against", "Common use note", "Watch point"],
        rows: [
          ["NEMA 1", "indoor contact", "basic indoor panels", "no dust/water"],
          ["NEMA 3R", "rain/sleet", "outdoor utility", "windblown dust"],
          ["NEMA 4", "hose-directed water", "washdown areas", "corrosion"],
          ["NEMA 4X", "water + corrosion", "food/chemical areas", "material"],
          ["NEMA 12", "dust/dripping oil", "industrial indoor", "not washdown"],
          ["IP54", "dust limited/splash", "light industrial", "washdown"],
          ["IP65", "dust tight/jet water", "wet/dusty areas", "submersion"],
          ["IP67", "temporary immersion", "sensors/devices", "connector rating"],
        ],
      },
      {
        title: "Relay / Contactor Symbol Reference",
        note: "Symbols vary by drawing standard. Confirm coil voltage, contact state, and device tag before wiring.",
        columns: ["Symbol / ID", "Means", "Common use note", "Watch point"],
        rows: [
          ["A1/A2", "coil terminals", "relay/contactor coil", "voltage"],
          ["NO", "normally open", "closes when energized", "de-energized state"],
          ["NC", "normally closed", "opens when energized", "safety/interlock"],
          ["13/14", "NO aux contact", "IEC auxiliary", "contact rating"],
          ["21/22", "NC aux contact", "IEC auxiliary", "logic state"],
          ["L1/L2/L3", "line side", "contactor input", "phase order"],
          ["T1/T2/T3", "load side", "motor output", "overload"],
          ["OL contact", "overload trip contact", "motor protection", "reset state"],
        ],
      },
      {
        title: "PLC I/O Voltage Reference",
        note: "Confirm input card type, sourcing/sinking wiring, commons, and isolation before landing wires.",
        columns: ["Signal", "Typical use", "Common use note", "Watch point"],
        rows: [
          ["24 VDC input", "sensors/buttons", "modern machines", "PNP/NPN"],
          ["24 VDC output", "solenoids/relays", "PLC outputs", "current limit"],
          ["120 VAC input", "older controls", "field switches", "shock hazard"],
          ["120 VAC output", "relays/lamps", "legacy panels", "load rating"],
          ["Analog 4-20 mA", "process signal", "pressure/level/temp", "loop power"],
          ["Analog 0-10 V", "speed/reference", "VFD commands", "noise"],
          ["Thermocouple input", "temperature", "process heat", "type setting"],
          ["RTD input", "temperature", "accurate sensing", "2/3/4 wire"],
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
            <span class="conversion-card-icon" aria-hidden="true">${escapeHtml(group.label.slice(0, 1))}</span>
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

    const shopReferenceCategories = [
      { id: "fasteners", label: "Fasteners & Threads", description: "Threads, bolts, taps, torque, grades, threadlocker" },
      { id: "electrical", label: "Electrical & Controls", description: "Wire, plugs, fuses, sensors, panels, PLC I/O" },
      { id: "motors", label: "Motors & Drives", description: "Motors, VFDs, reducers, belts, couplings" },
      { id: "fluid-power", label: "Fluid Power", description: "Hydraulic hose, leaks, seals, cylinders, fittings" },
      { id: "pneumatics", label: "Pneumatics", description: "Air fittings, cylinders, valves, tubing" },
      { id: "bearings-belts-chain", label: "Bearings, Belts & Chain", description: "Bearings, belts, chains, sprockets, wear patterns" },
      { id: "safety", label: "Safety & LOTO", description: "LOTO, PPE, extension cords, enclosure reminders" },
      { id: "pm-troubleshooting", label: "PM & Troubleshooting", description: "Intervals, symptoms, compressors, pumps" },
      { id: "pipe-hose-fittings", label: "Pipe, Hose & Fittings", description: "Pipe, tubing, NPT, hose clamps, fittings" },
      { id: "materials-shop", label: "Materials & Shop Math", description: "Gauge, grease, close-fit, temperature and shop IDs" },
    ];

    function shopReferenceCategory(section) {
      const title = section.title.toLowerCase();
      if (/thread|tap|fastener|torque|threadlocker/.test(title)) return "fasteners";
      if (/wire|electrical|plug|sensor|fuse|contactor|vfd|thermocouple|rtd|plc|relay|conduit|nema enclosure/.test(title)) return "electrical";
      if (/motor|belt code|belt section|gear reducer|coupling/.test(title)) return "motors";
      if (/hydraulic|shaft seal|o-ring material|pump seal/.test(title)) return "fluid-power";
      if (/pneumatic|air cylinder|solenoid/.test(title)) return "pneumatics";
      if (/bearing|roller chain|chain|sprocket|belt failure|conveyor roller/.test(title)) return "bearings-belts-chain";
      if (/lockout|tagout|ppe|extension cord|ip \//.test(title)) return "safety";
      if (/pm interval|failure symptom|compressor|pump seal/.test(title)) return "pm-troubleshooting";
      if (/pipe|tubing|npt|fitting|hose clamp|hydraulic hose/.test(title)) return "pipe-hose-fittings";
      return "materials-shop";
    }

    function renderCategoryCard(category, count) {
      return `
        <button class="shop-reference-category-card" data-shop-reference-category="${escapeHtml(category.id)}" type="button">
          <span>${escapeHtml(category.label)}</span>
          <small>${escapeHtml(category.description)}</small>
          <strong>${count} charts</strong>
        </button>
      `;
    }

    function renderReferenceTable(section) {
      const category = shopReferenceCategory(section);
      const searchableText = [
        section.title,
        category,
        section.note,
        ...section.columns,
        ...section.rows.flat(),
      ].join(" ");
      return `
        <details class="bolt-reference-details shop-reference-details shop-reference-card" data-shop-reference-card data-shop-reference-category="${escapeHtml(category)}" data-shop-reference-title="${escapeHtml(section.title)}" data-shop-reference-search="${escapeHtml(searchableText.toLowerCase())}">
          <summary class="bolt-reference-summary">
            <div class="shop-reference-card-main">
              <div class="chip-row">
                <span class="chip">reference</span>
                <span class="chip">${section.rows.length} rows</span>
              </div>
              <strong>${escapeHtml(section.title)}</strong>
              <small>${escapeHtml(section.columns.join(" / "))}</small>
            </div>
            <div class="shop-reference-card-actions">
              <button class="shop-reference-favorite" data-shop-reference-favorite type="button" aria-label="Favorite ${escapeHtml(section.title)}" title="Favorite chart" aria-pressed="false">&#9734;</button>
              <span class="part-tile-open">Open</span>
            </div>
          </summary>
          <div class="bolt-table-wrap" role="region" aria-label="${escapeHtml(section.title)} table" tabindex="0">
            <table class="bolt-reference-table shop-reference-table">
              <thead>
                <tr>${section.columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr>
              </thead>
              <tbody>
                ${section.rows.map((row) => `
                  <tr>${row.map((cell, index) => `<td data-label="${escapeHtml(section.columns[index] || "")}">${escapeHtml(cell)}</td>`).join("")}</tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          <p class="shop-reference-note"><span aria-hidden="true">*</span>${escapeHtml(section.note)}</p>
        </details>
      `;
    }

    function renderShopReferences() {
      const pageSize = 12;
      const sortedSections = [...shopReferenceSections].sort((a, b) => a.title.localeCompare(b.title));
      const categoryCount = (categoryId) => (
        shopReferenceSections.filter((section) => shopReferenceCategory(section) === categoryId).length
      );
      const totalPages = Math.max(1, Math.ceil(sortedSections.length / pageSize));
      return `
        <section class="shop-reference-panel" data-shop-reference-panel data-shop-reference-page-size="${pageSize}">
          <div class="shop-reference-heading">
          <div>
            <h3>Shop Reference Charts</h3>
              <p>Common field references, sorted alphabetically. Search filters chart names, IDs, sizes, and notes.</p>
            </div>
            <span>${shopReferenceSections.length} charts / 12 per page</span>
          </div>
          <div class="shop-reference-pages">
            <label class="shop-reference-search">
              <span>Search references</span>
              <input data-shop-reference-search-input type="search" inputmode="search" autocomplete="off" placeholder="Try 6205, NPT, M12, 5VX800, photoeye...">
            </label>
            <div class="shop-reference-category-grid" data-shop-reference-category-grid>
              ${shopReferenceCategories.map((category) => renderCategoryCard(category, categoryCount(category.id))).join("")}
            </div>
            <button class="secondary-button shop-reference-back" data-shop-reference-back type="button" hidden>All categories</button>
            <div class="shop-reference-card-grid" data-shop-reference-grid hidden>
              ${sortedSections.map(renderReferenceTable).join("")}
            </div>
            <p class="shop-reference-empty" data-shop-reference-empty hidden>No matching reference cards.</p>
            ${shopReferenceSections.length > pageSize ? `
              <div class="pagination-bar shop-reference-pagination">
                <button class="secondary-button page-action-button" data-shop-reference-page="prev" type="button" disabled>Previous</button>
                <span data-shop-reference-page-status>Showing ${shopReferenceCategories.length} categories</span>
                <button class="secondary-button page-action-button" data-shop-reference-page="next" type="button">Next</button>
              </div>
            ` : ""}
          </div>
        </section>
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
              <div class="bolt-gauge-measurement-stack">
                <div class="bolt-gauge-card-readout">
                  <output class="bolt-gauge-output" data-bolt-gauge-output></output>
                </div>
                <div class="bolt-gauge-card" data-bolt-gauge-card aria-label="Bolt gauge sizing card">
                  <label class="bolt-gauge-size-lock"><input data-bolt-gauge-size-lock type="checkbox">Lock size</label>
                  <div class="bolt-gauge-circle" data-bolt-gauge-circle></div>
                  <div class="bolt-gauge-calibration-line" data-bolt-gauge-calibration-line><span>1 in</span></div>
                </div>
              </div>
              <div class="bolt-gauge-controls">
                <label class="bolt-gauge-sizing-control">Sizing circle<input data-bolt-gauge-diameter type="range" min="18" max="280" step="1" value="96"></label>
                <label class="bolt-gauge-points-control">Head points<select data-bolt-gauge-points><option value="6" selected>6 point hex</option><option value="4">4 point square</option><option value="8">8 point square</option><option value="12">12 point socket</option></select></label>
                <label class="bolt-gauge-calibration-control">1 in calibration<input data-bolt-gauge-calibration type="range" min="48" max="200" step="1" value="96"></label>
                <label class="bolt-gauge-lock"><input data-bolt-gauge-lock type="checkbox" checked>Lock 1 in calibration</label>
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
            <div class="conversion-board-heading">
              <div>
                <h3>Unit Converters</h3>
                <p>Common shop and maintenance measurements</p>
              </div>
              <span>${conversionGroups.length} tools</span>
            </div>
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
