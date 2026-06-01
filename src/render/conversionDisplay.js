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
          ["16", "0.0508", "1.29", "extension cords / light machine leads; check cord rating"],
          ["14", "0.0641", "1.63", "very common 15 A branch and medium cord size"],
          ["12", "0.0808", "2.05", "very common 20 A branch and heavy cord size"],
          ["10", "0.1019", "2.59", "very common 30 A dryer, water heater, RV TT-30"],
          ["8", "0.1285", "3.26", "common 40 A range/AC feeder; 50 A only when install allows"],
          ["6", "0.1620", "4.11", "common 50 A RV 14-50, welder, range, EV circuit"],
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
          ["6203", "17 mm", "40 x 12 mm", "very common small motor/fan bearing"],
          ["6204", "20 mm", "47 x 14 mm", "very common pump and motor-shaft bearing"],
          ["6205", "25 mm", "52 x 15 mm", "very common pump, conveyor, and motor bearing"],
          ["6206", "30 mm", "62 x 16 mm", "common larger motor / gearbox support bearing"],
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
        note: "Reference only. Always follow OEM torque, bolt grade, lubrication, thread engagement, and application requirements.",
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
          ["3/8", "10 mm", "loose", "very common 10mm socket; frequent-loss size, not a torque substitute"],
          ["7/16", "11 mm", "close", "1/4 bolt heads"],
          ["1/2", "13 mm", "loose", "common 13mm metric socket; loose SAE substitute"],
          ["9/16", "14 mm", "close", "common 14mm metric socket; check fit before load"],
          ["5/8", "16 mm", "loose", "7/16 bolt heads"],
          ["11/16", "17 mm", "close", "metric frame hardware"],
          ["3/4", "19 mm", "close", "common 19mm metric socket / 1/2 bolt heads; verify full seat"],
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
          ["Laser distance", "photoelectric distance", "position/level checks", "surface finish"],
          ["Ultrasonic", "sound wave sensor", "clear object or level sensing", "dead band"],
          ["Pressure switch", "pressure threshold", "air/hydraulic permissive", "setpoint"],
          ["Encoder", "rotary position", "speed/position feedback", "pulse count"],
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
          ["Class G", "SC", "branch circuits / lighting panels", "rejection size"],
          ["Class H", "NON / NOS", "older non-current-limiting circuits", "replacement limits"],
          ["Class L", "KRP-C", "large feeders / service", "bolt-in holder"],
          ["Supplemental", "KTK / FNQ", "control circuits", "not branch protection"],
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
          ["95 / 96", "NC overload aux", "trip signal/interlock", "device convention"],
          ["97 / 98", "NO overload aux", "trip indication", "device convention"],
          ["Manual reset", "reset mode", "local restart control", "access"],
          ["Auto reset", "reset mode", "unattended restart circuits", "application"],
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
          ["Voltage", "rated supply", "single/dual voltage motor", "lead wiring"],
          ["Hz", "rated frequency", "50/60 Hz applications", "speed/heat"],
          ["PH", "phase count", "single or three phase", "starter type"],
          ["Code", "locked-rotor code", "starting current", "upstream protection"],
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
          ["STO", "safe torque off circuit", "enable circuit open", "terminal wiring"],
          ["Encoder fault", "feedback signal", "closed-loop drives", "cable/shield"],
          ["DC bus", "bus imbalance/ripple", "capacitor or line issue", "drive age"],
          ["External fault", "field input", "PLC or interlock input", "input map"],
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
          ["Elbow swivel", "push-to-connect", "tight machine routing", "O-ring"],
          ["Tee union", "tube union", "branch air line", "tube OD"],
          ["Speed control", "metering fitting", "cylinder speed adjustment", "flow direction"],
          ["Silencer", "exhaust muffler", "valve exhaust port", "clogging"],
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
          ["Tie rod", "serviceable body", "repairable industrial cylinder", "rod torque"],
          ["Round body", "light-duty cylinder", "compact automation", "mounting"],
          ["Guided", "anti-rotation", "pick/place or slides", "bearing wear"],
          ["Rodless", "carriage cylinder", "long stroke motion", "seal band"],
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
          ["Manual override", "test actuator", "setup/troubleshooting", "latching type"],
          ["Pilot operated", "air-assisted shift", "higher-flow valves", "minimum pressure"],
          ["Direct acting", "coil shifts valve", "small valves/low flow", "orifice size"],
          ["Manifold mount", "banked valves", "multi-valve stations", "gasket pattern"],
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
          ["Loaded lip seal", "energized seal", "dynamic cylinder service", "profile match"],
          ["Chevron/V-pack", "stacked packing", "older cylinders/presses", "adjustment"],
          ["Glyd ring", "PTFE piston seal", "low-friction cylinders", "energizer"],
          ["Static gasket", "end cap seal", "cylinder head sealing", "compression set"],
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
          ["AGMA", "gear oil grade", "industrial gear lube", "OEM match"],
          ["Worm", "right-angle reducer", "compact low-speed drive", "efficiency/heat"],
          ["Helical", "inline reducer", "higher-efficiency drive", "shaft alignment"],
          ["B5 / B14", "metric flange", "IEC motor mounting", "pilot diameter"],
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
          ["Tire coupling", "rubber tire", "misalignment tolerance", "clamp ring"],
          ["Disc coupling", "metal flex", "precision/high speed", "alignment"],
          ["Chain coupling", "roller chain", "slow rugged drives", "cover/lube"],
          ["Beam coupling", "one-piece flex", "encoders/light duty", "torque limit"],
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
          ["PVC roller", "plastic tube", "light/wet applications", "load limit"],
          ["Zinc steel", "plated steel", "general conveyor use", "corrosion"],
          ["ABEC bearing", "precision bearing", "higher-speed rollers", "seal type"],
          ["Sprocketed roller", "chain-driven roller", "powered conveyor", "chain pitch"],
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
          ["Dark-on", "output mode", "output on blocked beam", "logic setting"],
          ["Light-on", "output mode", "output on received light", "logic setting"],
          ["Teach button", "setup input", "threshold setup", "lockout setting"],
          ["Sensitivity pot", "manual adjust", "older sensors", "overgain"],
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
          ["NO", "normally open output", "turns on at target", "logic state"],
          ["NC", "normally closed output", "turns off at target", "logic state"],
          ["M8 connector", "small round connector", "compact sensors", "pinout"],
          ["M12 connector", "round connector", "common industrial sensors", "pinout"],
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
          ["Grounded", "probe style", "fast response", "noise path"],
          ["Type N", "thermocouple", "higher-temp stability", "controller setting"],
          ["3-wire RTD", "RTD wiring", "common industrial RTD", "lead compensation"],
          ["4-wire RTD", "RTD wiring", "high accuracy RTD", "input support"],
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
          ["V-band", "flanged joints", "exhaust/turbo/ducting", "flange match"],
          ["Lined clamp", "cushioned support", "vibration isolation", "liner material"],
          ["Oetiker stepless", "ear clamp", "small fluid/air hoses", "crimp tool"],
          ["Bridge clamp", "corrugated hose", "dust/duct hose", "hose pitch"],
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
          ["Blue gel", "medium", "vertical/overhead fasteners", "product family"],
          ["Orange hybrid", "medium/high", "serviceable high strength", "brand-specific"],
          ["Pipe sealant", "thread seal", "NPT pneumatic/hydraulic fittings", "fluid compatibility"],
          ["Gasket maker", "flange sealant", "formed-in-place gaskets", "gap/oil exposure"],
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
          ["K", "tapered bore", "adapter sleeve mounting", "shaft fit"],
          ["P5", "precision class", "spindles/precision shafts", "cost"],
          ["DU", "single contact seal", "one-side sealed bearings", "orientation"],
          ["N", "snap ring groove", "located bearing", "ring not included"],
          ["E", "reinforced design", "higher capacity variant", "series-specific"],
          ["J", "pressed steel cage", "common bearing cage", "manufacturer meaning"],
          ["W33", "lubrication groove", "spherical roller bearings", "grease path"],
          ["VA", "special variant", "application-specific bearing", "datasheet"],
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
          ["3V500", "narrow wedge belt", "compact industrial drive", "profile"],
          ["8V1400", "large narrow wedge", "high-horsepower drive", "pulley match"],
          ["SPA1250", "metric wedge belt", "metric pump/fan drives", "effective length"],
          ["HTD 8M", "timing belt pitch", "synchronous drives", "tooth profile"],
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
          ["Type C", "two-side hub", "wide/heavy sprocket", "hub clearance"],
          ["Taper-lock", "taper bushing", "serviceable shaft fit", "bushing size"],
          ["Double single", "two single chains", "parallel drives", "spacing"],
          ["Idler sprocket", "no drive bore", "chain tension/support", "bearing"],
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
          ["FFKM", "severe chemicals/heat", "highest compatibility range", "high cost"],
          ["Aflas", "steam/amine/oil service", "chemical resistance", "application-specific"],
          ["PTFE encapsulated", "chemical service", "inert jacket", "low elasticity"],
          ["Leather", "older hydraulic seals", "legacy equipment", "drying/wear"],
        ],
      },
      {
        title: "Common Failure Symptom Reference",
        note: "Symptoms point to likely areas, not final diagnosis. Confirm operating conditions before adjustment.",
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
        note: "Confirm pressure, flow controls, valve function, and mechanical binding before replacing components.",
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
        note: "Hydraulic leak checks depend on pressure, fluid, fittings, and equipment design. Depressurize before inspection.",
        columns: ["Symptom", "Likely area", "Common use note", "Watch point"],
        rows: [
          ["External hose leak", "hose/fitting", "wet hose or fitting", "pressure rating"],
          ["Cylinder drift", "piston seal/valve", "load slowly moves", "holding circuit"],
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
        title: "Extension Cord Load Reference",
        note: "Cord ratings depend on conductor size, length, insulation, connectors, and listed use. Long runs need larger wire.",
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
          ["SJTW", "outdoor-rated jacket", "extension cords", "marking"],
          ["SOOW", "heavy-duty flexible cord", "portable equipment", "jacket rating"],
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
          ["Light blue", "IEC neutral", "control panels", "standard varies"],
          ["Pink", "sensor/aux signal", "some M12 sensor cables", "pinout"],
          ["Violet", "analog/signal", "machine-builder specific", "drawing"],
          ["Bare/shield", "cable shield/drain", "noise control", "grounding point"],
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
          ["NEMA 2", "dripping water", "indoor drip protection", "not rain"],
          ["NEMA 3", "weather resistant", "outdoor dust/rain", "ice damage"],
          ["NEMA 6", "temporary submersion", "wash/immersion areas", "depth/time"],
          ["IP66", "powerful water jets", "washdown devices", "connector rating"],
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
          ["11/12", "NC contact", "IEC contact numbering", "device convention"],
          ["33/34", "NO aux contact", "additional aux block", "contact count"],
          ["43/44", "NO aux contact", "additional aux block", "contact count"],
          ["KM", "contactor tag", "motor starter drawings", "drawing convention"],
        ],
      },
      {
        title: "PLC I/O Voltage Reference",
        note: "Confirm input card type, sourcing/sinking wiring, commons, and isolation before landing wires.",
        columns: ["Signal", "Typical use", "Common use note", "Watch point"],
        rows: [
          ["24 VDC input", "sensors/buttons", "modern machines", "PNP/NPN"],
          ["24 VDC output", "solenoids/relays", "PLC outputs", "current limit"],
          ["120 VAC input", "older controls", "field switches", "voltage exposure"],
          ["120 VAC output", "relays/lamps", "legacy panels", "load rating"],
          ["Analog 4-20 mA", "process signal", "pressure/level/temp", "loop power"],
          ["Analog 0-10 V", "speed/reference", "VFD commands", "noise"],
          ["Thermocouple input", "temperature", "process heat", "type setting"],
          ["RTD input", "temperature", "accurate sensing", "2/3/4 wire"],
          ["High-speed input", "encoder/pulse", "counting applications", "frequency limit"],
          ["Relay output", "isolated contact", "mixed-voltage loads", "contact life"],
          ["Triac output", "AC load switching", "solid-state AC output", "leakage current"],
          ["RTD transmitter", "4-20 mA temp", "long cable temperature", "scaling"],
        ],
      },
      {
        title: "Diesel SPN / FMI Diagnostic Reference",
        note: "Fault IDs identify a circuit or condition, not the repair. Use the engine OEM diagnostic tree for final testing.",
        columns: ["ID", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["SPN", "suspect parameter number", "identifies system or sensor", "OEM mapping"],
          ["FMI", "failure mode identifier", "describes fault type", "same SPN can vary"],
          ["OC", "occurrence count", "repeat history", "old vs active fault"],
          ["Active", "currently detected", "live diagnostic fault", "conditions present"],
          ["Inactive", "not currently detected", "stored fault history", "clear after repair"],
          ["FMI 0", "data high", "sensor value above range", "compare live data"],
          ["FMI 1", "data low", "sensor value below range", "compare live data"],
          ["FMI 2", "erratic/intermittent", "signal plausibility", "wiggle/load test"],
          ["FMI 3", "voltage high/short high", "open/short to power", "measure voltage"],
          ["FMI 4", "voltage low/short low", "short to ground", "measure resistance"],
          ["FMI 5", "current low/open", "open circuit or coil", "load test circuit"],
          ["FMI 6", "current high/short", "shorted load", "isolate component"],
        ],
      },
      {
        title: "Diesel Aftertreatment ID Reference",
        note: "Aftertreatment codes depend on engine, emissions level, sensor layout, and calibration.",
        columns: ["ID", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["DOC", "diesel oxidation catalyst", "upstream exhaust treatment", "temperature sensors"],
          ["DPF", "diesel particulate filter", "soot capture/regeneration", "restriction"],
          ["SCR", "selective catalytic reduction", "NOx reduction with DEF", "NOx sensors"],
          ["DEF", "diesel exhaust fluid", "SCR reagent", "quality/concentration"],
          ["Regen", "filter cleaning cycle", "soot burn-off event", "inhibit conditions"],
          ["Soot load", "DPF loading estimate", "regen decision", "sensor accuracy"],
          ["Ash load", "non-burnable residue", "service interval factor", "cleaning history"],
          ["NOx sensor", "emissions sensor", "SCR feedback", "upstream/downstream"],
          ["DPF delta P", "filter pressure drop", "restriction estimate", "hose/sensor ports"],
          ["DEF doser", "urea injector", "SCR dosing", "crystallization"],
          ["DEF pump", "reagent pressure", "tank to doser supply", "freeze/thaw"],
          ["Quality sensor", "DEF concentration", "fluid verification", "contamination"],
        ],
      },
      {
        title: "Diesel Fluid / Filter Reference",
        note: "Match fluid and filter requirements to the engine or equipment OEM specification.",
        columns: ["Item", "What it affects", "Common use note", "Watch point"],
        rows: [
          ["Engine oil", "lubrication/soot handling", "diesel crankcase", "OEM spec"],
          ["Oil filter", "lube filtration", "scheduled service", "bypass rating"],
          ["Primary fuel filter", "coarse fuel/water separation", "frame-mounted filter", "micron/water bowl"],
          ["Secondary fuel filter", "fine fuel filtration", "engine-mounted filter", "micron rating"],
          ["Coolant", "heat/corrosion protection", "cooling system", "chemistry match"],
          ["Coolant filter", "additive/filter element", "some heavy engines", "SCA level"],
          ["Air filter", "intake protection", "dusty equipment", "restriction gauge"],
          ["Hydraulic oil", "machine fluid power", "mobile equipment", "viscosity/additives"],
          ["DEF", "SCR reagent", "emissions system", "32.5% concentration"],
          ["Fuel water separator", "water removal", "fuel system protection", "drain history"],
        ],
      },
      {
        title: "Heavy Equipment Battery / Charging Reference",
        note: "Charging faults depend on battery state, cable voltage drop, alternator output, and controller inputs.",
        columns: ["Check", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["12.6 V", "charged 12V battery rest", "single battery check", "surface charge"],
          ["12.2 V", "partially charged", "slow crank complaint", "load test"],
          ["24 V system", "two 12V batteries series", "heavy equipment/trucks", "balance"],
          ["CCA", "cold cranking amps", "starting capacity", "temperature"],
          ["Voltage drop", "cable/connection loss", "crank circuit", "under load"],
          ["Alternator B+", "charge output", "charging system", "sense wire"],
          ["Ground strap", "return path", "engine/frame grounds", "corrosion"],
          ["Parasitic draw", "key-off current", "dead battery complaint", "sleep mode"],
          ["Battery isolation", "multi-battery system", "aux/start battery split", "solenoid"],
          ["CAN awake", "module not sleeping", "modern equipment", "network activity"],
        ],
      },
      {
        title: "CNC G-Code Quick Reference",
        note: "G-code dialects vary by control. Confirm the active plane, units, offsets, and modal state before running.",
        columns: ["Code", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["G00", "rapid positioning", "non-cutting move", "clearance"],
          ["G01", "linear feed move", "straight cutting move", "feedrate"],
          ["G02", "clockwise arc", "circular interpolation", "IJK/R mode"],
          ["G03", "counterclockwise arc", "circular interpolation", "plane"],
          ["G17", "XY plane", "mill default plane", "arc direction"],
          ["G20", "inch units", "inch programs", "unit mismatch"],
          ["G21", "metric units", "metric programs", "unit mismatch"],
          ["G28", "machine zero return", "home return command", "intermediate point"],
          ["G40", "cancel cutter comp", "end compensated path", "lead-out"],
          ["G41/G42", "cutter comp left/right", "profile compensation", "tool diameter"],
          ["G43", "tool length comp", "Z length offset active", "H offset"],
          ["G54-G59", "work offsets", "fixture coordinate systems", "active offset"],
          ["G80", "cancel canned cycle", "drill cycle cleanup", "modal cycle"],
          ["G90/G91", "absolute/incremental", "positioning mode", "unexpected motion"],
        ],
      },
      {
        title: "CNC M-Code Quick Reference",
        note: "M-codes are machine/control specific. Confirm the machine manual before relying on optional functions.",
        columns: ["Code", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["M00", "program stop", "mandatory stop", "restart point"],
          ["M01", "optional stop", "operator-controlled stop", "optional stop switch"],
          ["M03", "spindle forward", "clockwise spindle", "speed command"],
          ["M04", "spindle reverse", "counterclockwise spindle", "tool/process"],
          ["M05", "spindle stop", "stop rotation", "coast time"],
          ["M06", "tool change", "automatic/manual tool change", "tool number"],
          ["M08", "coolant on", "flood coolant", "coolant type"],
          ["M09", "coolant off", "stop coolant", "chip clearing"],
          ["M19", "spindle orient", "tool change/probing", "orientation setting"],
          ["M30", "program end/reset", "end of program", "rewind behavior"],
          ["M97", "local subprogram", "repeat section in same file", "line number"],
          ["M98", "subprogram call", "call external/internal sub", "P/L words"],
          ["M99", "subprogram return", "loop/return command", "infinite loop"],
          ["M88/M89", "through-spindle coolant on/off", "TSC machines", "pressure/tooling"],
        ],
      },
      {
        title: "Machining Insert ID Reference",
        note: "Insert codes vary by standard and manufacturer. Match shape, clearance, tolerance, chipbreaker, and grade.",
        columns: ["ID", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["CNMG", "80 deg diamond turning insert", "general turning", "holder hand"],
          ["DNMG", "55 deg diamond insert", "profiling/finishing", "weaker point"],
          ["TNMG", "triangle insert", "turning/facing", "edge count"],
          ["WNMG", "trigon insert", "rough/medium turning", "holder style"],
          ["CCMT", "positive diamond insert", "small boring/turning", "screw size"],
          ["VBMT", "35 deg positive insert", "profiling", "point strength"],
          ["APKT", "milling insert", "shoulder/face mills", "cutter series"],
          ["R390", "milling insert family", "Sandvik-style shoulder milling", "grade/geometry"],
          ["P grade", "steel machining", "ISO material group", "material match"],
          ["M grade", "stainless machining", "ISO material group", "work hardening"],
          ["K grade", "cast iron machining", "ISO material group", "abrasion"],
          ["N grade", "non-ferrous machining", "aluminum/brass", "built-up edge"],
        ],
      },
      {
        title: "Machining Decimal Drill Reference",
        note: "Decimal equivalents help identify drill sizes. Confirm required fit, clearance, and material before cutting.",
        columns: ["Drill", "Decimal", "Metric near", "Common use note"],
        rows: [
          ["#60", "0.0400 in", "1.02 mm", "small holes"],
          ["#50", "0.0700 in", "1.78 mm", "small screw drilling"],
          ["#40", "0.0980 in", "2.49 mm", "pilot holes"],
          ["#30", "0.1285 in", "3.26 mm", "small machine screws"],
          ["#21", "0.1590 in", "4.04 mm", "#10-32 tap drill"],
          ["#7", "0.2010 in", "5.11 mm", "1/4-20 tap drill"],
          ["F", "0.2570 in", "6.53 mm", "5/16-18 tap drill"],
          ["Q", "0.3320 in", "8.43 mm", "3/8-24 tap drill"],
          ["U", "0.3680 in", "9.35 mm", "7/16-14 tap drill"],
          ["27/64", "0.4219 in", "10.72 mm", "1/2-13 tap drill"],
          ["1/2", "0.5000 in", "12.70 mm", "common clearance/pilot"],
          ["5/8", "0.6250 in", "15.88 mm", "larger clearance/pilot"],
        ],
      },
      {
        title: "Surface Finish Reference",
        note: "Surface finish requirements depend on process, material, sealing, bearing, and print callout.",
        columns: ["Ra", "Process range", "Common use note", "Watch point"],
        rows: [
          ["250 µin", "rough machining", "non-critical surfaces", "tool marks"],
          ["125 µin", "general machining", "typical milled/turned surface", "fit"],
          ["63 µin", "fine machining", "bearing fits/light sealing", "tool condition"],
          ["32 µin", "fine finish", "shaft/seal adjacent surfaces", "process control"],
          ["16 µin", "grinding/honing", "sealing/bearing surfaces", "measurement"],
          ["8 µin", "lapped/ground", "precision sealing", "cost"],
          ["3.2 µm", "metric roughness", "rough/general finish", "unit conversion"],
          ["1.6 µm", "metric roughness", "general machined finish", "unit conversion"],
          ["0.8 µm", "metric roughness", "fine machined finish", "unit conversion"],
          ["0.4 µm", "metric roughness", "ground/sealing finish", "unit conversion"],
        ],
      },
      {
        title: "GD&T Symbol Quick Reference",
        note: "GD&T meaning depends on datum structure, feature control frame, tolerance zone, and drawing standard.",
        columns: ["Symbol/name", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["Flatness", "surface flat zone", "plate/machined faces", "no datum"],
          ["Straightness", "line/axis control", "shafts/edges", "surface vs axis"],
          ["Circularity", "roundness", "turned diameters", "cross-section"],
          ["Cylindricity", "round + straight cylinder", "precision shafts/bores", "no datum"],
          ["Profile", "surface/line profile", "complex contours", "datum setup"],
          ["Perpendicularity", "90 deg orientation", "machined faces/holes", "datum"],
          ["Parallelism", "parallel orientation", "slots/faces", "datum"],
          ["Position", "true position", "hole patterns", "MMC/LMC modifier"],
          ["Concentricity", "median point control", "legacy callouts", "hard to inspect"],
          ["Runout", "rotation variation", "shafts/chucks", "datum axis"],
          ["Total runout", "full surface rotation", "sealing/bearing surfaces", "full sweep"],
          ["Datum", "reference feature", "inspection setup", "simulator"],
        ],
      },
      {
        title: "CNC Offset Reference",
        note: "Offsets are control-specific and modal. Confirm active work offset and tool offset before cycle start.",
        columns: ["Offset", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["G54", "work coordinate 1", "main vise/fixture", "active fixture"],
          ["G55", "work coordinate 2", "second fixture", "program callout"],
          ["H offset", "tool length", "Z compensation", "tool number match"],
          ["D offset", "tool diameter/radius", "cutter comp", "wear vs geometry"],
          ["Wear offset", "small correction", "size tuning", "sign direction"],
          ["Geometry offset", "tool measured value", "setup data", "probe/manual entry"],
          ["Tool table", "tool data register", "length/diameter storage", "active tool"],
          ["Work probe", "sets fixture offset", "part setup", "probe calibration"],
          ["Tool setter", "measures tool length", "tool setup", "setter location"],
          ["G92", "coordinate shift", "legacy/program shift", "hidden modal state"],
        ],
      },
      {
        title: "Weld Symbol Quick Reference",
        note: "Weld symbols depend on the drawing standard, arrow side, other side, tail notes, and dimensions.",
        columns: ["Symbol/name", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["Fillet", "triangular weld symbol", "corner/T/lap joints", "size/length"],
          ["Square groove", "square butt joint", "thin plates", "root opening"],
          ["V-groove", "beveled both sides", "butt weld prep", "included angle"],
          ["Bevel groove", "one member beveled", "thicker plate", "arrow side"],
          ["Plug/slot", "hole or slot weld", "lap joints", "pitch/count"],
          ["Contour flush", "finish flush", "grind/machine finish", "finish symbol"],
          ["All around", "circle at elbow", "weld all around joint", "joint continuity"],
          ["Field weld", "flag symbol", "weld made in field", "location"],
          ["Tail", "process/spec note", "WPS/process callout", "note text"],
          ["Arrow side", "symbol below line", "near-side weld", "standard convention"],
          ["Other side", "symbol above line", "far-side weld", "standard convention"],
          ["Intermittent", "length-pitch callout", "stitch welds", "spacing"],
        ],
      },
      {
        title: "Stick Electrode Reference",
        note: "Electrode choice depends on base metal, position, current type, joint, and procedure requirements.",
        columns: ["Rod", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["E6010", "deep penetrating DC rod", "pipe/root/open root", "DC capability"],
          ["E6011", "AC/DC deep penetration", "dirty/rusty repair", "arc force"],
          ["E6013", "light penetration", "sheet/light fabrication", "slag inclusions"],
          ["E7014", "iron powder fill", "flat/horizontal fillets", "position"],
          ["E7018", "low hydrogen", "structural/general repair", "storage"],
          ["E7024", "high deposition", "flat/horizontal heavy welds", "position"],
          ["Ni-Cl", "nickel cast iron", "cast iron repair", "preheat/cooling"],
          ["Hardfacing", "wear overlay", "bucket/blade wear areas", "base metal"],
          ["3/32 in", "small diameter", "thin material/root", "amperage"],
          ["1/8 in", "common diameter", "general fabrication", "joint thickness"],
          ["5/32 in", "larger diameter", "heavy material", "machine output"],
          ["DCEP", "reverse polarity", "many rods", "rod requirement"],
        ],
      },
      {
        title: "MIG Wire / Shielding Gas Reference",
        note: "Match wire, gas, transfer mode, base metal, thickness, and machine output.",
        columns: ["ID", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["ER70S-6", "mild steel solid wire", "general steel MIG", "gas required"],
          [".023 in", "small wire", "thin sheet", "feed stability"],
          [".030 in", "light/general wire", "auto/body/light fab", "material thickness"],
          [".035 in", "common fab wire", "general fabrication", "machine range"],
          [".045 in", "larger wire", "heavy fab", "output capacity"],
          ["C25", "75/25 argon-CO2", "short-circuit steel", "gas mix"],
          ["100% CO2", "active gas", "deeper penetration steel", "spatter"],
          ["Tri-mix", "stainless gas", "stainless MIG", "wire/process"],
          ["Flux-core gas shielded", "tubular wire", "structural/heavy fab", "polarity"],
          ["Self-shielded FCAW", "no external gas", "outdoor field repair", "wire type"],
        ],
      },
      {
        title: "Plasma Cutting Reference",
        note: "Cut quality depends on consumables, amperage, air/gas quality, torch height, speed, and material.",
        columns: ["Item", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["Nozzle", "orifice shapes arc", "cut quality/kerf", "wear"],
          ["Electrode", "arc emitter", "consumable core", "pit depth"],
          ["Shield", "protects nozzle", "drag/mechanized cutting", "correct style"],
          ["Swirl ring", "gas flow control", "arc stability", "damage"],
          ["Kerf", "cut width", "nesting/offset", "consumable/process"],
          ["Pierce height", "start height", "hole starts", "blowback"],
          ["Cut height", "running torch height", "edge quality", "arc voltage"],
          ["Dross", "re-solidified metal", "speed/height clue", "top vs bottom"],
          ["Air pressure", "gas supply", "portable plasma", "moisture"],
          ["Amperage cartridge", "process-specific consumable", "material thickness"],
        ],
      },
      {
        title: "Fabrication Bend Reference",
        note: "Bend results depend on material, grain, tooling, die opening, radius, and machine setup.",
        columns: ["Term", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["Inside radius", "bend inner radius", "formed part geometry", "tool radius"],
          ["K-factor", "neutral axis factor", "flat pattern math", "material/process"],
          ["Bend allowance", "arc length added", "flat pattern calculation", "units"],
          ["Bend deduction", "length removed", "flange layout", "method"],
          ["Setback", "mold line distance", "layout reference", "angle"],
          ["Air bend", "three-point bend", "common press brake process", "springback"],
          ["Bottoming", "punch bottoms material", "more repeatable angle", "tonnage"],
          ["Coining", "high-tonnage forming", "tight angle control", "tool wear"],
          ["Die opening", "V-die width", "radius/tonnage driver", "material thickness"],
          ["Grain direction", "rolling direction", "crack control", "bend orientation"],
        ],
      },
      {
        title: "Structural Shape ID Reference",
        note: "Shape designations vary by standard and supplier. Confirm dimensions, weight, grade, and mill cert.",
        columns: ["ID", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["W8x18", "wide-flange beam", "structural beam", "weight/ft"],
          ["C6x8.2", "channel", "frames/supports", "flange slope"],
          ["L2x2x1/4", "angle", "brackets/frames", "leg thickness"],
          ["HSS2x2x1/4", "square tube", "machine frames", "wall thickness"],
          ["HSS3x2x1/4", "rect tube", "frames/guards", "orientation"],
          ["Pipe 2 SCH40", "nominal pipe", "rails/utility", "actual OD"],
          ["Flat bar", "rectangular bar", "tabs/brackets", "thickness"],
          ["Round bar", "solid round", "pins/shafts", "diameter/material"],
          ["Plate", "flat plate", "bases/gussets", "thickness/grade"],
          ["Expanded metal", "slit/stretched sheet", "guards/walkways", "strand size"],
        ],
      },
      {
        title: "Industrial PLC Sourcing / Sinking Reference",
        note: "Sourcing/sinking labels vary by manufacturer. PNP/NPN and the module wiring diagram are clearer.",
        columns: ["ID", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["PNP sensor", "sources +V on output", "common 24VDC sensors", "input common"],
          ["NPN sensor", "sinks to 0V on output", "some import/legacy systems", "pull-up/common"],
          ["Sourcing output", "switches +V to load", "PLC output modules", "load common"],
          ["Sinking output", "switches load to 0V", "PLC output modules", "load supply"],
          ["Sinking input", "accepts sourcing device", "many AB input modules", "manual definition"],
          ["Sourcing input", "accepts sinking device", "some module styles", "manual definition"],
          ["2-wire sensor", "series load sensor", "prox/photoeye", "leakage current"],
          ["3-wire sensor", "+V/0V/output", "standard sensors", "pinout"],
          ["Brown", "+V sensor lead", "IEC sensor cable", "pinout"],
          ["Blue", "0V sensor lead", "IEC sensor cable", "pinout"],
          ["Black", "output lead", "IEC sensor cable", "PNP/NPN"],
          ["White", "second output/teach", "4-wire sensors", "function"],
        ],
      },
      {
        title: "Control Panel Terminal Reference",
        note: "Terminal markings depend on IEC/NEMA convention, manufacturer, and drawing standard.",
        columns: ["Marking", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["A1/A2", "coil terminals", "relays/contactors", "coil voltage"],
          ["13/14", "NO contact", "auxiliary contact", "state"],
          ["21/22", "NC contact", "auxiliary contact", "state"],
          ["95/96", "NC overload trip", "starter feedback", "device convention"],
          ["97/98", "NO overload trip", "trip indication", "device convention"],
          ["L1/L2/L3", "line terminals", "incoming power", "phase order"],
          ["T1/T2/T3", "load terminals", "motor output", "overload location"],
          ["X1/X2", "control transformer secondary", "24/120V control", "grounded side"],
          ["PE", "protective earth", "ground terminal", "bonding"],
          ["0V", "DC common", "24VDC control", "isolated supplies"],
          ["24V", "DC supply positive", "controls/sensors", "current capacity"],
          ["COM", "common terminal", "I/O or relay common", "voltage group"],
        ],
      },
      {
        title: "Control Transformer Reference",
        note: "Transformer selection depends on primary voltage, secondary voltage, VA load, inrush, and protection.",
        columns: ["Item", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["Primary", "supply winding", "480/240/120V input", "tap selection"],
          ["Secondary", "output winding", "24/120V controls", "grounding"],
          ["VA", "power rating", "control circuit capacity", "inrush"],
          ["Fuse primary", "line-side protection", "transformer protection", "voltage"],
          ["Fuse secondary", "control circuit protection", "branch protection", "class/rating"],
          ["Inrush", "startup current", "contactors/solenoids", "nuisance trip"],
          ["X1 grounded", "grounded control side", "120V controls", "drawing convention"],
          ["Class 2", "limited power", "24V control devices", "load limit"],
          ["Multi-tap", "selectable primary", "480/240/208 input", "jumper/tap"],
          ["VA sum", "load total", "coils/lights/devices", "simultaneous load"],
        ],
      },
      {
        title: "Drive / Motor Nameplate Match Reference",
        note: "Drive setup should match the motor nameplate and application. Confirm against the drive manual.",
        columns: ["Field", "Meaning", "Common use note", "Watch point"],
        rows: [
          ["Motor FLA", "full-load amps", "drive current limit", "voltage-specific"],
          ["Base Hz", "rated frequency", "60/50Hz motors", "speed scaling"],
          ["Base RPM", "rated speed", "slip/speed setup", "pole count"],
          ["Motor volts", "rated voltage", "drive output setup", "lead wiring"],
          ["HP/kW", "power rating", "sizing reference", "current matters more"],
          ["Accel time", "speed ramp up", "conveyors/fans", "overcurrent"],
          ["Decel time", "speed ramp down", "high inertia loads", "overvoltage"],
          ["Brake resistor", "regen energy path", "fast decel", "ohms/watts"],
          ["Carrier freq", "PWM frequency", "noise/heat tradeoff", "motor cable"],
          ["Control source", "keypad/terminal/network", "start command", "unexpected source"],
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
      { id: "diesel-mobile", label: "Diesel & Mobile", description: "SPN/FMI, aftertreatment, batteries, fluids, field service IDs" },
      { id: "machining-cnc", label: "Machining & CNC", description: "G-code, M-code, inserts, GD&T, finishes, offsets" },
      { id: "fabrication", label: "Fabrication & Welding", description: "Weld symbols, electrodes, MIG, plasma, bends, structural shapes" },
      { id: "motors", label: "Motors & Drives", description: "Motors, VFDs, reducers, belts, couplings" },
      { id: "fluid-power", label: "Fluid Power", description: "Hydraulic hose, leaks, seals, cylinders, fittings" },
      { id: "pneumatics", label: "Pneumatics", description: "Air fittings, cylinders, valves, tubing" },
      { id: "bearings-belts-chain", label: "Bearings, Belts & Chain", description: "Bearings, belts, chains, sprockets, wear patterns" },
      { id: "pm-troubleshooting", label: "PM & Troubleshooting", description: "Intervals, symptoms, compressors, pumps" },
      { id: "pipe-hose-fittings", label: "Pipe, Hose & Fittings", description: "Pipe, tubing, NPT, hose clamps, fittings" },
      { id: "materials-shop", label: "Materials & Shop Math", description: "Gauge, grease, close-fit, temperature and shop IDs" },
    ];

    const shopReferenceKinds = [
      { id: "sizing-id", label: "Sizing / ID" },
      { id: "troubleshooting", label: "Troubleshooting" },
      { id: "codes-symbols", label: "Codes / symbols" },
      { id: "common-specs", label: "Common specs" },
    ];

    function shopReferenceCategory(section) {
      const title = section.title.toLowerCase();
      if (/thread|tap|fastener|torque|threadlocker/.test(title)) return "fasteners";
      if (/diesel|aftertreatment|battery \/ charging|heavy equipment/.test(title)) return "diesel-mobile";
      if (/cnc|g-code|m-code|machining|insert|decimal drill|surface finish|gd&t|offset/.test(title)) return "machining-cnc";
      if (/weld|stick electrode|mig|plasma|fabrication|structural shape/.test(title)) return "fabrication";
      if (/wire|electrical|plug|sensor|fuse|contactor|thermocouple|rtd|plc|relay|conduit|nema enclosure|control panel|control transformer/.test(title)) return "electrical";
      if (/motor|vfd|drive \/ motor|belt code|belt section|gear reducer|coupling/.test(title)) return "motors";
      if (/hydraulic|shaft seal|o-ring material|pump seal/.test(title)) return "fluid-power";
      if (/pneumatic|air cylinder|solenoid/.test(title)) return "pneumatics";
      if (/bearing|roller chain|chain|sprocket|belt failure|conveyor roller/.test(title)) return "bearings-belts-chain";
      if (/extension cord|industrial wire|conduit|ip \/|nema enclosure|electrical/.test(title)) return "electrical";
      if (/pm interval|failure symptom|compressor|pump seal/.test(title)) return "pm-troubleshooting";
      if (/pipe|tubing|npt|fitting|hose clamp|hydraulic hose/.test(title)) return "pipe-hose-fittings";
      return "materials-shop";
    }

    function shopReferenceKind(section) {
      const title = section.title.toLowerCase();
      if (/failure|symptom|troubleshooting|fault|leak|compressor|pump seal|aftertreatment|spn|fmi/.test(title)) return "troubleshooting";
      if (/g-code|m-code|gd&t|weld symbol|relay \/ contactor symbol|plc|wire color|sourcing \/ sinking|control panel terminal/.test(title)) return "codes-symbols";
      if (/load|fluid|filter|oil|grease|threadlocker|battery|charging|extension cord|transformer|drive \/ motor|plasma|mig wire|stick electrode/.test(title)) return "common-specs";
      return "sizing-id";
    }

    function renderCategoryCard(category, count) {
      return `
        <button class="shop-reference-category-card" data-shop-reference-category="${escapeHtml(category.id)}" type="button" title="${escapeHtml(category.description)}">
          <span>${escapeHtml(category.label)}</span>
          <strong>${count} charts</strong>
        </button>
      `;
    }

    function renderKindCard(kind, count) {
      return `
        <button class="shop-reference-kind-card" data-shop-reference-kind="${escapeHtml(kind.id)}" type="button">
          <span>${escapeHtml(kind.label)}</span>
          <strong>${count} charts</strong>
        </button>
      `;
    }

    function verifyByForReference(section, row) {
      const title = section.title.toLowerCase();
      const rowText = row.join(" ").toLowerCase();
      if (/bearing suffix/.test(title)) return "read full bearing code";
      if (/bearing quick/.test(title)) return "measure bore + full code";
      if (/bearing symptom/.test(title)) return "inspect race/lube pattern";
      if (/belt code|belt section/.test(title)) return "read belt code + measure width";
      if (/belt failure/.test(title)) return "inspect pulley + tension";
      if (/chain sprocket/.test(title)) return "count teeth + confirm chain";
      if (/roller chain/.test(title)) return "measure pitch + roller width";
      if (/chain \/ sprocket wear/.test(title)) return "check pitch stretch + teeth";
      if (/drill \/ tap/.test(title)) return "gauge thread + test fit";
      if (/metric thread|npt pipe thread/.test(title)) return "check pitch/thread gauge";
      if (/fastener grade/.test(title)) return "read head marking";
      if (/torque/.test(title)) return "confirm OEM torque spec";
      if (/socket \/ wrench/.test(title)) return "test correct wrench fit";
      if (/threadlocker/.test(title)) return "match product datasheet";
      if (/wire gauge/.test(title)) return "measure AWG + insulation rating";
      if (/extension cord/.test(title)) return "read cord jacket marking";
      if (/plug|receptacle/.test(title)) return "match NEMA face + rating";
      if (/fuse/.test(title)) return "match class, volts, amps";
      if (/conduit/.test(title)) return "calculate fill with actual OD";
      if (/enclosure/.test(title)) return "read enclosure rating label";
      if (/wire color/.test(title)) return "trace drawing + meter";
      if (/sensor|photoeye|proximity/.test(title)) return "check label, LED, wiring";
      if (/plc i\/o/.test(title)) return "match card type + wiring";
      if (/diesel spn|fmi/.test(title)) return "read code + OEM tree";
      if (/aftertreatment/.test(title)) return "compare live data + sensor";
      if (/diesel fluid|filter/.test(title)) return "match OEM spec/part number";
      if (/battery \/ charging|heavy equipment/.test(title)) return "load test + voltage drop";
      if (/g-code|m-code/.test(title)) return "dry run + active modal check";
      if (/insert id/.test(title)) return "match insert code + holder";
      if (/decimal drill/.test(title)) return "measure drill + print callout";
      if (/surface finish/.test(title)) return "measure Ra/profile callout";
      if (/gd&t/.test(title)) return "read feature control frame";
      if (/cnc offset/.test(title)) return "check active offset screen";
      if (/weld symbol/.test(title)) return "read drawing symbol/tail";
      if (/stick electrode|mig wire|shielding gas/.test(title)) return "match WPS/settings chart";
      if (/plasma cutting/.test(title)) return "match consumables + cut chart";
      if (/fabrication bend/.test(title)) return "check flat pattern/tooling";
      if (/structural shape/.test(title)) return "measure shape + grade";
      if (/sourcing \/ sinking|industrial plc/.test(title)) return "check module diagram";
      if (/control panel terminal/.test(title)) return "trace drawing + terminal mark";
      if (/control transformer/.test(title)) return "sum VA + tap label";
      if (/drive \/ motor nameplate/.test(title)) return "match drive params to nameplate";
      if (/relay|contactor|overload/.test(title)) return "read terminal marks + coil";
      if (/motor nameplate/.test(title)) return "read nameplate fields";
      if (/nema motor frame/.test(title)) return "measure shaft + frame";
      if (/vfd fault/.test(title)) return "read drive fault history";
      if (/pipe \/ tubing/.test(title)) return "measure OD + wall/nominal";
      if (/fitting \/ thread/.test(title)) return "check thread + sealing face";
      if (/hydraulic hose/.test(title)) return "read hose layline";
      if (/hose clamp/.test(title)) return "measure hose OD range";
      if (/pneumatic fitting/.test(title)) return "measure tube OD + thread";
      if (/air cylinder|pneumatic cylinder/.test(title)) return "measure bore/stroke";
      if (/solenoid valve/.test(title)) return "read valve function + coil";
      if (/hydraulic cylinder seal|o-ring|shaft seal/.test(title)) return "measure groove + material";
      if (/hydraulic leak/.test(title)) return "inspect leak point + pressure";
      if (/pump seal/.test(title)) return "inspect seal face + flush";
      if (/gear reducer/.test(title)) return "read tag ratio + shaft";
      if (/coupling/.test(title)) return "measure hub/insert series";
      if (/conveyor roller/.test(title)) return "measure BF + axle";
      if (/thermocouple|rtd/.test(title)) return "match sensor type + wiring";
      if (/oil \/ grease/.test(title)) return "match OEM lube spec";
      if (/sheet metal/.test(title)) return "measure thickness";
      if (/compressor/.test(title)) return "check hours + OEM manual";
      if (/common failure/.test(title)) return "confirm symptom under load";
      if (/class l|class j|class cc/.test(rowText)) return "match holder rejection";
      return "verify marking + measurement";
    }

    function detailTextFromRules(section, rules, fallback) {
      const title = section.title.toLowerCase();
      const match = rules.find((rule) => rule.pattern.test(title));
      return match ? match.text : fallback;
    }

    function referenceSourceFamily(section, category) {
      return detailTextFromRules(section, [
        { pattern: /diesel|aftertreatment|battery|heavy equipment/, text: "SAE J1939, engine OEM service data, equipment service manuals" },
        { pattern: /g-code|m-code|cnc|offset/, text: "CNC control manual, machine builder documentation, setup sheet" },
        { pattern: /insert|drill|surface finish/, text: "ISO machining standards, tooling catalog, print requirement" },
        { pattern: /gd&t/, text: "ASME Y14.5 / ISO GPS drawing standard family" },
        { pattern: /weld|electrode|mig/, text: "AWS symbol/procedure standards, WPS, filler manufacturer data" },
        { pattern: /plasma/, text: "plasma system cut chart, consumable chart, machine manual" },
        { pattern: /bend|structural shape/, text: "fabrication handbook, material standard, shop drawing" },
        { pattern: /wire|plug|fuse|conduit|panel|transformer|plc|relay|sensor|thermocouple|rtd/, text: "NEC/NFPA 70, NEMA/IEC standards, device datasheets" },
        { pattern: /motor|vfd|drive|gear reducer|coupling/, text: "NEMA/IEC motor data, drive manual, OEM mechanical catalog" },
        { pattern: /hydraulic|hose|o-ring|shaft seal|fitting|pipe|tubing/, text: "SAE/ISO fluid power standards, hose/fitting/seal catalog" },
        { pattern: /pneumatic|air cylinder|solenoid/, text: "ISO pneumatic standards, valve/cylinder manufacturer data" },
        { pattern: /bearing|belt|chain|sprocket|roller/, text: "ABMA/ISO bearing data, belt/chain manufacturer catalog" },
        { pattern: /thread|tap|fastener|torque|threadlocker|wrench|socket/, text: "ASME/ISO fastener standards, OEM torque data, product datasheet" },
        { pattern: /sheet metal|oil|grease|failure|compressor|pump/, text: "ASTM/SAE material data, OEM manual, maintenance history" },
      ], `${category.replaceAll("-", " ")} reference family, OEM manual, and measured part marking`);
    }

    function referenceAlternateNames(section, category) {
      return detailTextFromRules(section, [
        { pattern: /spn|fmi/, text: "fault code, J1939 code, DTC, diagnostic code" },
        { pattern: /aftertreatment/, text: "emissions system, DPF/SCR system, exhaust treatment" },
        { pattern: /g-code/, text: "preparatory code, motion code, modal G code" },
        { pattern: /m-code/, text: "miscellaneous code, machine function code" },
        { pattern: /insert/, text: "carbide insert, turning insert, indexable insert" },
        { pattern: /gd&t/, text: "feature control frame, geometric tolerance, datum callout" },
        { pattern: /weld symbol/, text: "AWS symbol, drawing weld callout, welding notation" },
        { pattern: /stick electrode/, text: "SMAW rod, arc rod, welding electrode" },
        { pattern: /mig/, text: "GMAW wire, solid wire, shielding gas setup" },
        { pattern: /plasma/, text: "air plasma, cut chart, consumables chart" },
        { pattern: /sourcing|sinking/, text: "PNP/NPN wiring, input common, output polarity" },
        { pattern: /terminal/, text: "terminal strip, wire marker, panel terminal" },
        { pattern: /transformer/, text: "control power transformer, CPT, VA transformer" },
        { pattern: /wire gauge/, text: "AWG, conductor size, cable size" },
        { pattern: /plug|receptacle/, text: "NEMA plug, twist-lock, cord cap" },
        { pattern: /fuse/, text: "fuse class, current-limiting fuse, branch fuse" },
        { pattern: /bearing/, text: "bearing number, bearing code, bearing ID" },
        { pattern: /belt/, text: "V-belt, belt section, belt code" },
        { pattern: /chain/, text: "roller chain, chain pitch, sprocket chain" },
        { pattern: /hydraulic hose/, text: "hose dash size, hose ID, hydraulic line" },
        { pattern: /fitting|thread/, text: "adapter, thread form, sealing face" },
        { pattern: /o-ring/, text: "seal ring, elastomer seal, dash size" },
        { pattern: /shaft seal/, text: "oil seal, lip seal, rotary seal" },
        { pattern: /torque/, text: "tightening spec, bolt torque, clamp load reference" },
      ], `${category.replaceAll("-", " ")} chart, shop reference, field ID aid`);
    }

    function referenceWrongMatches(section, category) {
      return detailTextFromRules(section, [
        { pattern: /spn|fmi/, text: "same SPN with different FMI, inactive history, manufacturer-specific code text" },
        { pattern: /aftertreatment/, text: "NOx sensor vs DEF dosing fault, soot load vs ash load, regen inhibit vs failed regen" },
        { pattern: /g-code|m-code|cnc|offset/, text: "same code on another control, wrong active work offset, hidden modal state" },
        { pattern: /insert/, text: "same shape with wrong thickness, radius, chipbreaker, grade, or holder hand" },
        { pattern: /drill/, text: "near decimal size, clearance drill vs tap drill, letter/number mix-up" },
        { pattern: /surface finish/, text: "Ra vs RMS, microinch vs micrometer, process guess without measurement" },
        { pattern: /gd&t/, text: "profile vs position, circularity vs cylindricity, datum omitted" },
        { pattern: /weld|electrode|mig|plasma/, text: "similar filler with wrong position/current/gas, cut chart for different consumables" },
        { pattern: /wire|plug|fuse|conduit|panel|transformer|plc|relay|sensor/, text: "same voltage with wrong current, AC/DC mix-up, source/sink reversed" },
        { pattern: /motor|vfd|drive|gear reducer|coupling/, text: "same HP with wrong frame, wrong base speed, wrong shaft or service factor" },
        { pattern: /hydraulic|hose|o-ring|shaft seal|fitting|pipe|tubing/, text: "close OD with wrong thread, wrong sealing face, wrong pressure or material" },
        { pattern: /pneumatic|air cylinder|solenoid/, text: "same port with wrong valve function, wrong coil voltage, wrong tube OD" },
        { pattern: /bearing|belt|chain|sprocket|roller/, text: "same bore with wrong width/seal, same belt length with wrong section, chain pitch mismatch" },
        { pattern: /thread|tap|fastener|torque|threadlocker|wrench|socket/, text: "metric vs inch near match, coarse vs fine pitch, wrench fit confused with thread size" },
      ], "visually similar part, near-size match, or correct family with the wrong rating");
    }

    function referenceExamples(section) {
      return section.rows
        .slice(0, 4)
        .map((row) => row[0])
        .filter(Boolean)
        .join(", ");
    }

    function relatedReferenceTitles(section, category) {
      return shopReferenceSections
        .filter((candidate) => candidate !== section && shopReferenceCategory(candidate) === category)
        .map((candidate) => candidate.title)
        .sort((a, b) => a.localeCompare(b))
        .slice(0, 3)
        .join(", ");
    }

    function referenceDetailItems(section, category) {
      return [
        ["Related chart", relatedReferenceTitles(section, category) || "Use category search for nearby shop references"],
        ["Alternate names", referenceAlternateNames(section, category)],
        ["Close-but-wrong matches", referenceWrongMatches(section, category)],
        ["Source family", referenceSourceFamily(section, category)],
        ["Examples", referenceExamples(section) || "See table rows"],
      ];
    }

    function rowDetailLabel(row) {
      return row[0] || "This row";
    }

    function rowAlternateNames(section, row, category) {
      const label = rowDetailLabel(row);
      const context = row.slice(1, 3).filter(Boolean).join(", ");
      return `${label}${context ? `, ${context}` : ""}, ${referenceAlternateNames(section, category)}`;
    }

    function rowWrongMatches(section, row, category) {
      const label = rowDetailLabel(row);
      return `${label}: ${referenceWrongMatches(section, category)}`;
    }

    function rowExample(row) {
      return row.filter(Boolean).join(" / ");
    }

    function rowDetailItems(section, row, category) {
      return [
        ["Related chart", relatedReferenceTitles(section, category) || "Use category search for nearby shop references"],
        ["Alternate names", rowAlternateNames(section, row, category)],
        ["Close-but-wrong matches", rowWrongMatches(section, row, category)],
        ["Source family", referenceSourceFamily(section, category)],
        ["Example", rowExample(row)],
      ];
    }

    function rowRelevance(section, row) {
      const title = section.title.toLowerCase();
      const label = String(row[0] || "").toLowerCase();
      const rowText = row.join(" ").toLowerCase();
      if (/wire gauge/.test(title) && /^(14|12|10|8|6)$/.test(label)) {
        return "Very common";
      }
      if (/socket \/ wrench/.test(title) && /(10 mm|13 mm|14 mm|19 mm)/.test(rowText)) {
        return "Very common";
      }
      if (/bearing quick/.test(title) && /^(6203|6204|6205|6206)$/.test(label)) {
        return "Very common";
      }
      return "";
    }

    function renderRowDetail(section, row, category, columns) {
      const label = rowDetailLabel(row);
      const details = rowDetailItems(section, row, category);
      return `
        <tr class="shop-reference-row-detail">
          <td colspan="${columns.length}">
            <details class="shop-reference-line-detail">
              <summary><span aria-hidden="true"></span>Details for row above: ${escapeHtml(label)}</summary>
              <div class="shop-reference-detail-panel" aria-label="${escapeHtml(section.title)} ${escapeHtml(label)} reference context">
                ${details.map(([detailLabel, value]) => `
                  <div class="shop-reference-detail-item">
                    <span>${escapeHtml(detailLabel)}</span>
                    <strong>${escapeHtml(value)}</strong>
                  </div>
                `).join("")}
              </div>
            </details>
          </td>
        </tr>
      `;
    }

    function renderReferenceTable(section) {
      const category = shopReferenceCategory(section);
      const kind = shopReferenceKind(section);
      const columns = [...section.columns, "Verify by"];
      const rows = section.rows.map((row) => [...row, verifyByForReference(section, row)]);
      const detailItems = referenceDetailItems(section, category);
      const rowDetails = section.rows.map((row) => rowDetailItems(section, row, category));
      const searchableText = [
        section.title,
        category,
        section.note,
        ...columns,
        ...detailItems.flat(),
        ...rowDetails.flat(2),
        ...rows.flat(),
      ].join(" ");
      return `
        <details class="bolt-reference-details shop-reference-details shop-reference-card" data-shop-reference-card data-shop-reference-category="${escapeHtml(category)}" data-shop-reference-kind="${escapeHtml(kind)}" data-shop-reference-title="${escapeHtml(section.title)}" data-shop-reference-search="${escapeHtml(searchableText.toLowerCase())}">
          <summary class="bolt-reference-summary">
            <div class="shop-reference-card-main">
              <div class="chip-row">
                <span class="chip">reference</span>
                <span class="chip">${section.rows.length} rows</span>
              </div>
              <strong>${escapeHtml(section.title)}</strong>
              <small>${escapeHtml(columns.join(" / "))}</small>
            </div>
            <div class="shop-reference-card-actions">
              <button class="shop-reference-favorite" data-shop-reference-favorite type="button" aria-label="Favorite ${escapeHtml(section.title)}" title="Favorite chart" aria-pressed="false">&#9734;</button>
              <span class="part-tile-open">Open</span>
            </div>
          </summary>
          <div class="bolt-table-wrap" role="region" aria-label="${escapeHtml(section.title)} table" tabindex="0">
            <table class="bolt-reference-table shop-reference-table">
              <thead>
                <tr>${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr>
              </thead>
              <tbody>
                ${rows.map((row, index) => {
                  const relevance = rowRelevance(section, section.rows[index]);
                  return `
                  <tr class="shop-reference-data-row${relevance ? " shop-reference-row-high-signal" : ""}">${row.map((cell, cellIndex) => `<td data-label="${escapeHtml(columns[cellIndex] || "")}">${cellIndex === 0 && relevance ? `<span class="shop-reference-row-signal">${escapeHtml(relevance)}</span>` : ""}${escapeHtml(cell)}</td>`).join("")}</tr>
                  ${renderRowDetail(section, section.rows[index], category, columns)}
                `;
                }).join("")}
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
      const kindCount = (kindId) => (
        shopReferenceSections.filter((section) => shopReferenceKind(section) === kindId).length
      );
      const topReferenceTitles = [
        "Drill / Tap Quick Reference",
        "Wire Gauge Reference",
        "Bearing Quick Reference",
        "CNC G-Code Quick Reference",
        "Diesel SPN / FMI Diagnostic Reference",
        "Weld Symbol Quick Reference",
      ];
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
            <div class="shop-reference-top-strip" aria-label="Top shop references">
              <span>Top references</span>
              ${topReferenceTitles.map((title) => `
                <button class="shop-reference-top-button" data-shop-reference-top="${escapeHtml(title)}" type="button">${escapeHtml(title.replace(" Reference", ""))}</button>
              `).join("")}
            </div>
            <div class="shop-reference-filter-group">
              <span>Reference type</span>
              <div class="shop-reference-kind-grid" data-shop-reference-kind-grid>
                <button class="shop-reference-kind-card" data-shop-reference-kind="" type="button">
                  <span>All types</span>
                  <strong>${shopReferenceSections.length} charts</strong>
                </button>
                ${shopReferenceKinds.map((kind) => renderKindCard(kind, kindCount(kind.id))).join("")}
              </div>
            </div>
            <div class="shop-reference-filter-group">
              <span>Trade area</span>
            <div class="shop-reference-category-grid" data-shop-reference-category-grid>
              <button class="shop-reference-category-card" data-shop-reference-category="" type="button" title="Show every reference">
                <span>All</span>
                <strong>${shopReferenceSections.length} charts</strong>
              </button>
              ${shopReferenceCategories.map((category) => renderCategoryCard(category, categoryCount(category.id))).join("")}
            </div>
            </div>
            <div class="active-team-filter shop-reference-active-filter" data-shop-reference-active-category hidden>
              <span data-shop-reference-active-category-label></span>
              <button class="text-button" data-shop-reference-back type="button">All filters</button>
            </div>
            <div class="shop-reference-card-grid" data-shop-reference-grid>
              ${sortedSections.map(renderReferenceTable).join("")}
            </div>
            <p class="shop-reference-empty" data-shop-reference-empty hidden>No matching reference cards.</p>
            ${shopReferenceSections.length > pageSize ? `
              <div class="pagination-bar shop-reference-pagination">
                <button class="secondary-button page-action-button" data-shop-reference-page="prev" type="button" disabled>Previous</button>
                <span data-shop-reference-page-status>Showing 1-${Math.min(pageSize, sortedSections.length)} of ${sortedSections.length} - Page 1 of ${totalPages}</span>
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
              <label><input data-bolt-gauge-mode type="radio" name="bolt-gauge-mode" value="wrench" checked>SELECT HEAD / WRENCH</label>
              <label><input data-bolt-gauge-mode type="radio" name="bolt-gauge-mode" value="thread">SELECT THREAD / NUT ID</label>
            </div>
            <div class="bolt-gauge-layout">
              <div class="bolt-gauge-measurement-stack">
                <p class="bolt-gauge-screen-callout"><span aria-hidden="true">*</span>PLACE THE ACTUAL BOLT, NUT, OR WRENCH HEAD DIRECTLY ON THE WHITE SCREEN CARD BELOW.</p>
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
