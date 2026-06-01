// Shop reference chart data is assembled from category files so the library can grow without recreating a data monolith.
(function () {
  const SECTION_ORDER = [
  "Drill / Tap Quick Reference",
  "Wire Gauge Reference",
  "Pipe / Tubing Reference",
  "Belt Section Reference",
  "Bearing Quick Reference",
  "Roller Chain Reference",
  "Oil / Grease Reference",
  "Torque Reference",
  "Fitting / Thread Reference",
  "Hydraulic Hose Dash Reference",
  "Socket / Wrench Close-Fit Reference",
  "Sheet Metal Gauge Reference",
  "Fastener Grade Marking Reference",
  "O-Ring Size Reference",
  "Shaft Seal Reference",
  "NEMA Motor Frame Reference",
  "Electrical Plug / Receptacle Reference",
  "Common Sensor ID Reference",
  "Fuse Class Reference",
  "Contactor / Overload Reference",
  "Motor Nameplate Reference",
  "VFD Fault Quick Reference",
  "Pneumatic Fitting ID Reference",
  "Air Cylinder ID Reference",
  "Solenoid Valve ID Reference",
  "Hydraulic Cylinder Seal ID Reference",
  "Gear Reducer ID Reference",
  "Coupling Insert Reference",
  "Conveyor Roller ID Reference",
  "Photoeye Setup Reference",
  "Proximity Sensor Reference",
  "Thermocouple / RTD Reference",
  "Hose Clamp Reference",
  "Threadlocker / Retaining Compound Reference",
  "Bearing Suffix ID Reference",
  "Belt Code ID Reference",
  "Chain Sprocket ID Reference",
  "Metric Thread Pitch Reference",
  "NPT Pipe Thread Reference",
  "O-Ring Material Reference",
  "Common Failure Symptom Reference",
  "Spark Plug Condition Reference",
  "Bearing Symptom Reference",
  "Belt Failure Pattern Reference",
  "Chain / Sprocket Wear Reference",
  "Pneumatic Cylinder Troubleshooting Reference",
  "Hydraulic Leak / Failure Reference",
  "Hydraulic Fluid Condition Reference",
  "Compressor Maintenance Reference",
  "Pump Seal Failure Reference",
  "Extension Cord Load Reference",
  "Industrial Wire Color Reference",
  "Conduit Fill Quick Reference",
  "IP / NEMA Enclosure Reference",
  "Relay / Contactor Symbol Reference",
  "PLC I/O Voltage Reference",
  "Diesel SPN / FMI Diagnostic Reference",
  "Diesel Aftertreatment ID Reference",
  "Diesel Fluid / Filter Reference",
  "Heavy Equipment Battery / Charging Reference",
  "CNC G-Code Quick Reference",
  "CNC M-Code Quick Reference",
  "Machining Insert ID Reference",
  "Machining Decimal Drill Reference",
  "Surface Finish Reference",
  "GD&T Symbol Quick Reference",
  "CNC Offset Reference",
  "Weld Symbol Quick Reference",
  "Stick Electrode Reference",
  "MIG Wire / Shielding Gas Reference",
  "Plasma Cutting Reference",
  "Fabrication Bend Reference",
  "Structural Shape ID Reference",
  "Industrial PLC Sourcing / Sinking Reference",
  "Control Panel Terminal Reference",
  "Control Transformer Reference",
  "Drive / Motor Nameplate Match Reference"
];

  function orderedSections(sections) {
    const orderMap = new Map(SECTION_ORDER.map((title, index) => [title, index]));
    return sections.slice().sort((left, right) => (
      (orderMap.get(left.title) ?? Number.MAX_SAFE_INTEGER) - (orderMap.get(right.title) ?? Number.MAX_SAFE_INTEGER)
    ));
  }

  function browserSections() {
    const referenceData = (typeof window !== "undefined" && window.MaintainOpsReferenceData) || {};
    return [
      referenceData["fasteners"] || [],
      referenceData["electrical"] || [],
      referenceData["diesel-mobile"] || [],
      referenceData["machining-cnc"] || [],
      referenceData["fabrication"] || [],
      referenceData["motors"] || [],
      referenceData["fluid-power"] || [],
      referenceData["pneumatics"] || [],
      referenceData["bearings-belts-chain"] || [],
      referenceData["pm-troubleshooting"] || [],
      referenceData["pipe-hose-fittings"] || [],
      referenceData["materials-shop"] || []
    ].flat();
  }

  function nodeSections() {
    if (typeof require === "undefined") return [];
    return [
      require("./reference/fasteners.js").FASTENER_REFERENCE_SECTIONS,
      require("./reference/electricalControls.js").ELECTRICAL_CONTROL_REFERENCE_SECTIONS,
      require("./reference/dieselMobile.js").DIESEL_MOBILE_REFERENCE_SECTIONS,
      require("./reference/machiningCnc.js").MACHINING_CNC_REFERENCE_SECTIONS,
      require("./reference/fabrication.js").FABRICATION_REFERENCE_SECTIONS,
      require("./reference/motorsDrives.js").MOTORS_DRIVES_REFERENCE_SECTIONS,
      require("./reference/fluidPower.js").FLUID_POWER_REFERENCE_SECTIONS,
      require("./reference/pneumatics.js").PNEUMATICS_REFERENCE_SECTIONS,
      require("./reference/bearingsBeltsChain.js").BEARINGS_BELTS_CHAIN_REFERENCE_SECTIONS,
      require("./reference/pmTroubleshooting.js").PM_TROUBLESHOOTING_REFERENCE_SECTIONS,
      require("./reference/pipeHoseFittings.js").PIPE_HOSE_FITTING_REFERENCE_SECTIONS,
      require("./reference/materialsShop.js").MATERIALS_SHOP_REFERENCE_SECTIONS
    ].flat();
  }

  const browserData = browserSections();
  const SHOP_REFERENCE_SECTIONS = orderedSections(
    browserData.length ? browserData : nodeSections()
  );

  if (typeof window !== "undefined") {
    window.MaintainOpsShopReferenceCharts = { SHOP_REFERENCE_SECTIONS };
  }

  if (typeof module !== "undefined") {
    module.exports = { SHOP_REFERENCE_SECTIONS };
  }
})();
