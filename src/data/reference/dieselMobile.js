// diesel-mobile shop reference chart data. Kept separate so reference content can grow without recreating a data monolith.
(function () {
  const DIESEL_MOBILE_REFERENCE_SECTIONS = [
  {
    "title": "Diesel SPN / FMI Diagnostic Reference",
    "note": "Fault IDs identify a circuit or condition, not the repair. Use the engine OEM diagnostic tree for final testing.",
    "columns": [
      "ID",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "SPN": "Very common",
      "FMI": "Very common",
      "Active": "High consequence",
      "Inactive": "Easy mix-up",
      "FMI 2": "Common failure",
      "FMI 3": "Common failure",
      "FMI 4": "Common failure",
      "FMI 5": "Easy mix-up"
    },
    "rowTeaching": {
      "SPN": {
        "mechanic101": "SPN points to the suspect parameter or circuit family; it does not name the failed part by itself",
        "commonConfusion": "The same SPN can lead to different tests depending on FMI, engine family, wiring, and OEM diagnostic tree.",
        "seniorTechNote": "Read SPN and FMI together, then follow the OEM test path before replacing a sensor or harness.",
        "verifyBy": "read SPN + FMI"
      },
      "FMI": {
        "mechanic101": "FMI describes how the parameter failed, such as high, low, erratic, open, or shorted",
        "commonConfusion": "Technicians often memorize the SPN and skip FMI, but FMI changes the first electrical or live-data check.",
        "seniorTechNote": "Treat FMI as the direction of the fault. It tells you whether to compare live data, measure voltage, load-test, or inspect intermittents.",
        "verifyBy": "read code + OEM tree"
      },
      "Active": {
        "mechanic101": "active faults are present now or detected under current conditions",
        "commonConfusion": "An active fault can disappear if conditions change, while the root cause is still present under load, heat, or vibration.",
        "seniorTechNote": "Verify active faults with live data and operating conditions before clearing. A clean idle check may miss the loaded failure.",
        "verifyBy": "confirm live fault"
      },
      "Inactive": {
        "mechanic101": "inactive faults are stored history and may reflect an old condition, intermittent issue, or repaired problem",
        "commonConfusion": "Inactive faults get chased like active failures even when the machine no longer has the condition.",
        "seniorTechNote": "Use occurrence count, freeze-frame/context, and a repeat test before spending parts on an inactive code.",
        "verifyBy": "check history + repeat"
      },
      "FMI 2": {
        "mechanic101": "FMI 2 points toward erratic or intermittent signal behavior rather than a simple high/low value",
        "commonConfusion": "Intermittent wiring, connector tension, vibration, or sensor dropout can look fine during a static key-on check.",
        "seniorTechNote": "Move the harness, load the circuit, and compare live data while reproducing the condition.",
        "verifyBy": "wiggle/load test"
      },
      "FMI 3": {
        "mechanic101": "FMI 3 commonly points to voltage above normal, open circuits, or short-to-power style failures",
        "commonConfusion": "A high-voltage code is not automatically a bad sensor; an open return, pulled-up signal, or harness fault can create it.",
        "seniorTechNote": "Backprobe carefully and verify reference, signal, and ground before condemning the component.",
        "verifyBy": "measure voltage paths"
      },
      "FMI 4": {
        "mechanic101": "FMI 4 commonly points to voltage below normal or short-to-ground style failures",
        "commonConfusion": "Low voltage can come from a grounded signal, poor supply, connector corrosion, or a shorted component.",
        "seniorTechNote": "Unplug and isolate sections of the circuit so you know whether the fault follows the harness or the device.",
        "verifyBy": "isolate ground short"
      },
      "FMI 5": {
        "mechanic101": "FMI 5 often points toward current below normal or an open-load style circuit",
        "commonConfusion": "A coil or actuator open code can be wiring, connector spread, driver output, or the component itself.",
        "seniorTechNote": "Use a load test, not just an ohm check, when the circuit fails only under demand.",
        "verifyBy": "load test circuit"
      }
    },
    "rows": [
      [
        "SPN",
        "suspect parameter number",
        "identifies system or sensor",
        "OEM mapping"
      ],
      [
        "FMI",
        "failure mode identifier",
        "describes fault type",
        "same SPN can vary"
      ],
      [
        "OC",
        "occurrence count",
        "repeat history",
        "old vs active fault"
      ],
      [
        "Active",
        "currently detected",
        "live diagnostic fault",
        "conditions present"
      ],
      [
        "Inactive",
        "not currently detected",
        "stored fault history",
        "clear after repair"
      ],
      [
        "FMI 0",
        "data high",
        "sensor value above range",
        "compare live data"
      ],
      [
        "FMI 1",
        "data low",
        "sensor value below range",
        "compare live data"
      ],
      [
        "FMI 2",
        "erratic/intermittent",
        "signal plausibility",
        "wiggle/load test"
      ],
      [
        "FMI 3",
        "voltage high/short high",
        "open/short to power",
        "measure voltage"
      ],
      [
        "FMI 4",
        "voltage low/short low",
        "short to ground",
        "measure resistance"
      ],
      [
        "FMI 5",
        "current low/open",
        "open circuit or coil",
        "load test circuit"
      ],
      [
        "FMI 6",
        "current high/short",
        "shorted load",
        "isolate component"
      ]
    ]
  },
  {
    "title": "Diesel Aftertreatment ID Reference",
    "note": "Aftertreatment codes depend on engine, emissions level, sensor layout, and calibration.",
    "columns": [
      "ID",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "DPF": "Very common",
      "SCR": "Very common",
      "DEF": "Very common",
      "Regen": "High consequence",
      "Soot load": "Common failure",
      "Ash load": "Easy mix-up",
      "NOx sensor": "High consequence",
      "DPF delta P": "Common failure",
      "DEF doser": "Common failure",
      "Quality sensor": "Easy mix-up"
    },
    "rowTeaching": {
      "DPF": {
        "mechanic101": "DPF captures soot and depends on correct regeneration, exhaust temperature, sensor inputs, and engine health",
        "commonConfusion": "A plugged DPF complaint may be caused upstream by oil use, injector trouble, turbo issues, failed regen, or bad pressure sensing.",
        "seniorTechNote": "Do not treat the DPF as an isolated filter. Confirm why soot loaded before forcing regen or replacing parts.",
        "verifyBy": "compare soot + delta P"
      },
      "SCR": {
        "mechanic101": "SCR uses DEF dosing and catalyst chemistry to reduce NOx after combustion",
        "commonConfusion": "SCR faults are often blamed on the NOx sensor first, but DEF quality, dosing, exhaust leaks, temperature, and wiring all matter.",
        "seniorTechNote": "Compare upstream/downstream NOx behavior with DEF quality, dosing command, temperature, and fault history.",
        "verifyBy": "compare NOx + DEF data"
      },
      "DEF": {
        "mechanic101": "DEF is a specific urea-water fluid for SCR systems, not coolant, washer fluid, water, or diesel additive",
        "commonConfusion": "DEF contamination or wrong-fluid fill can create system faults that look like sensor or pump failures.",
        "seniorTechNote": "When DEF faults stack up, verify fluid quality and contamination before replacing dosing hardware.",
        "verifyBy": "test DEF quality"
      },
      "Regen": {
        "mechanic101": "regeneration burns soot from the DPF when the system has the right conditions",
        "commonConfusion": "Failed regen can be a symptom of inhibit conditions, temperature faults, fuel/exhaust problems, or excessive soot loading.",
        "seniorTechNote": "Before forcing a regen, check fault status, soot level, oil/coolant contamination clues, and OEM regen requirements.",
        "verifyBy": "check inhibit conditions"
      },
      "Soot load": {
        "mechanic101": "soot load is the burnable carbon loading estimate that drives regeneration decisions",
        "commonConfusion": "High soot can be caused by engine operation, failed regen, bad sensing, exhaust leaks, or engine problems.",
        "seniorTechNote": "If soot returns quickly after service, look upstream at combustion, duty cycle, sensor tubes, and regen completion.",
        "verifyBy": "trend soot after regen"
      },
      "Ash load": {
        "mechanic101": "ash is non-burnable residue that accumulates over service life and does not burn away during normal regen",
        "commonConfusion": "Ash and soot both restrict the DPF, but regen can reduce soot and cannot remove ash.",
        "seniorTechNote": "Treat ash load as a service-life and cleaning-history question, not a regen-performance question.",
        "verifyBy": "review service history"
      },
      "NOx sensor": {
        "mechanic101": "NOx sensors report emissions feedback and may be upstream or downstream of the SCR catalyst",
        "commonConfusion": "Upstream/downstream position matters; swapping diagnosis between them can send you after the wrong cause.",
        "seniorTechNote": "Verify sensor location, wiring, heater faults, live data, and DEF/SCR behavior before condemning a NOx sensor.",
        "verifyBy": "confirm sensor position"
      },
      "DPF delta P": {
        "mechanic101": "delta pressure estimates restriction across the DPF using pressure ports and hoses",
        "commonConfusion": "A high or strange pressure reading can be a plugged hose, water, cracked line, sensor fault, or real filter restriction.",
        "seniorTechNote": "Inspect hoses and ports before trusting the number. A blocked pressure tube can fake a filter problem.",
        "verifyBy": "inspect hoses + ports"
      },
      "DEF doser": {
        "mechanic101": "the DEF doser injects DEF into the exhaust stream when commanded by the SCR system",
        "commonConfusion": "Crystallization at the doser can look like a pump, quality, or NOx conversion issue.",
        "seniorTechNote": "Check command, pressure, spray pattern, crystallization, leaks, and temperature before replacing the doser.",
        "verifyBy": "check dosing test"
      },
      "Quality sensor": {
        "mechanic101": "DEF quality sensors help detect concentration or contamination problems",
        "commonConfusion": "Quality sensor faults can be fluid quality, contamination, temperature/freeze behavior, wiring, or sensor failure.",
        "seniorTechNote": "Verify the fluid with an independent check before assuming the quality sensor is lying.",
        "verifyBy": "verify fluid sample"
      }
    },
    "rows": [
      [
        "DOC",
        "diesel oxidation catalyst",
        "upstream exhaust treatment",
        "temperature sensors"
      ],
      [
        "DPF",
        "diesel particulate filter",
        "soot capture/regeneration",
        "restriction"
      ],
      [
        "SCR",
        "selective catalytic reduction",
        "NOx reduction with DEF",
        "NOx sensors"
      ],
      [
        "DEF",
        "diesel exhaust fluid",
        "SCR reagent",
        "quality/concentration"
      ],
      [
        "Regen",
        "filter cleaning cycle",
        "soot burn-off event",
        "inhibit conditions"
      ],
      [
        "Soot load",
        "DPF loading estimate",
        "regen decision",
        "sensor accuracy"
      ],
      [
        "Ash load",
        "non-burnable residue",
        "service interval factor",
        "cleaning history"
      ],
      [
        "NOx sensor",
        "emissions sensor",
        "SCR feedback",
        "upstream/downstream"
      ],
      [
        "DPF delta P",
        "filter pressure drop",
        "restriction estimate",
        "hose/sensor ports"
      ],
      [
        "DEF doser",
        "urea injector",
        "SCR dosing",
        "crystallization"
      ],
      [
        "DEF pump",
        "reagent pressure",
        "tank to doser supply",
        "freeze/thaw"
      ],
      [
        "Quality sensor",
        "DEF concentration",
        "fluid verification",
        "contamination"
      ]
    ]
  },
  {
    "title": "Diesel Fluid / Filter Reference",
    "note": "Match fluid and filter requirements to the engine or equipment OEM specification.",
    "columns": [
      "Item",
      "What it affects",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Engine oil": "Spec required",
      "Primary fuel filter": "Very common",
      "Secondary fuel filter": "High consequence",
      "Coolant": "Spec required",
      "Air filter": "Common failure",
      "DEF": "Very common",
      "Fuel water separator": "High consequence"
    },
    "rowTeaching": {
      "Engine oil": {
        "mechanic101": "diesel engine oil must match the OEM viscosity and service category for soot handling, emissions equipment, and wear control",
        "commonConfusion": "Oil weight alone is not the spec. Emissions-era diesels can require different oil categories than older engines.",
        "seniorTechNote": "Before topping off or changing oil, match viscosity, API/OEM spec, duty cycle, and maintenance interval.",
        "verifyBy": "match oil spec"
      },
      "Primary fuel filter": {
        "mechanic101": "the primary filter usually handles coarse filtration and water separation before fuel reaches finer engine-side filtration",
        "commonConfusion": "Primary and secondary filters can be swapped in conversation, but micron rating and water separation roles differ.",
        "seniorTechNote": "Repeated primary-filter plugging points to fuel quality, water, tank debris, algae/microbial contamination, or storage problems.",
        "verifyBy": "read filter + drain bowl"
      },
      "Secondary fuel filter": {
        "mechanic101": "secondary filters protect high-pressure fuel components with finer filtration near the engine",
        "commonConfusion": "A machine that starts after filter changes may still have air intrusion, water, or upstream contamination.",
        "seniorTechNote": "On common-rail systems, protect injectors first: use the correct filter rating and bleed/prime exactly as specified.",
        "verifyBy": "match micron/OEM part"
      },
      "Coolant": {
        "mechanic101": "coolant chemistry controls freeze protection, heat transfer, corrosion, cavitation, and liner protection",
        "commonConfusion": "Color is not a reliable coolant spec. Different chemistries can look similar or be dyed differently.",
        "seniorTechNote": "Confirm coolant family, concentration, additive requirements, and whether the system uses SCA or extended-life chemistry.",
        "verifyBy": "test coolant chemistry"
      },
      "Air filter": {
        "mechanic101": "air filters protect the engine intake and should be judged by restriction and sealing, not just surface appearance",
        "commonConfusion": "Blowing out filters or judging only by color can damage media or miss a sealing leak.",
        "seniorTechNote": "Check restriction indicator, housing seal, intake boots, and dust tracks before blaming low power on the filter alone.",
        "verifyBy": "check restriction + seal"
      },
      "DEF": {
        "mechanic101": "DEF must stay clean and at the correct concentration for SCR operation",
        "commonConfusion": "Contaminated DEF can cause faults that look like pump, doser, or NOx sensor problems.",
        "seniorTechNote": "Keep DEF handling clean and verify quality when faults appear after refill or storage.",
        "verifyBy": "test DEF + cap color"
      },
      "Fuel water separator": {
        "mechanic101": "water separation protects fuel pumps and injectors from water damage and freezing restriction",
        "commonConfusion": "Water in fuel may show up as intermittent no-start, low power, filter plugging, corrosion, or injector damage.",
        "seniorTechNote": "Drain and inspect water bowls regularly, especially after suspect fuel deliveries or seasonal temperature swings.",
        "verifyBy": "drain sample + inspect"
      }
    },
    "rows": [
      [
        "Engine oil",
        "lubrication/soot handling",
        "diesel crankcase",
        "OEM spec"
      ],
      [
        "Oil filter",
        "lube filtration",
        "scheduled service",
        "bypass rating"
      ],
      [
        "Primary fuel filter",
        "coarse fuel/water separation",
        "frame-mounted filter",
        "micron/water bowl"
      ],
      [
        "Secondary fuel filter",
        "fine fuel filtration",
        "engine-mounted filter",
        "micron rating"
      ],
      [
        "Coolant",
        "heat/corrosion protection",
        "cooling system",
        "chemistry match"
      ],
      [
        "Coolant filter",
        "additive/filter element",
        "some heavy engines",
        "SCA level"
      ],
      [
        "Air filter",
        "intake protection",
        "dusty equipment",
        "restriction gauge"
      ],
      [
        "Hydraulic oil",
        "machine fluid power",
        "mobile equipment",
        "viscosity/additives"
      ],
      [
        "DEF",
        "SCR reagent",
        "emissions system",
        "32.5% concentration"
      ],
      [
        "Fuel water separator",
        "water removal",
        "fuel system protection",
        "drain history"
      ]
    ]
  },
  {
    "title": "Heavy Equipment Battery / Charging Reference",
    "note": "Charging faults depend on battery state, cable voltage drop, alternator output, and controller inputs.",
    "columns": [
      "Check",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "12.6 V": "Very common",
      "24 V system": "High consequence",
      "CCA": "Spec required",
      "Voltage drop": "Very common",
      "Alternator B+": "Common failure",
      "Ground strap": "Very common",
      "Parasitic draw": "Easy mix-up",
      "CAN awake": "Easy mix-up"
    },
    "rowTeaching": {
      "12.6 V": {
        "mechanic101": "a rested 12V lead-acid battery near 12.6 volts is generally charged, but surface charge and temperature affect readings",
        "commonConfusion": "A battery can show decent open-circuit voltage and still fail under load.",
        "seniorTechNote": "Use resting voltage as a clue, then load-test and inspect cables before calling the battery good.",
        "verifyBy": "rest voltage + load test"
      },
      "24 V system": {
        "mechanic101": "many heavy machines use two 12V batteries in series for a 24V starting or control system",
        "commonConfusion": "One weak battery in a series pair can drag the system down even if total voltage looks close at rest.",
        "seniorTechNote": "Test each battery separately and as a pair. Do not replace one battery in a mismatched weak pair without checking balance.",
        "verifyBy": "test each battery"
      },
      "CCA": {
        "mechanic101": "cold cranking amps is a starting-capacity rating tied to temperature and battery design",
        "commonConfusion": "Physical battery size, voltage, and terminal fit do not guarantee enough cranking capacity.",
        "seniorTechNote": "Match CCA, group/fit, terminal layout, vibration duty, and equipment spec before replacing batteries.",
        "verifyBy": "match CCA spec"
      },
      "Voltage drop": {
        "mechanic101": "voltage drop testing finds cable, connection, relay, starter, and ground losses while current is flowing",
        "commonConfusion": "Ohm checks can pass with no load while a bad cable or corroded connection fails during cranking.",
        "seniorTechNote": "Measure drop on the positive and ground sides during crank. The bad side tells you where to inspect.",
        "verifyBy": "measure during crank"
      },
      "Alternator B+": {
        "mechanic101": "B+ is the alternator output path back to the battery and electrical system",
        "commonConfusion": "Charging complaints can be alternator output, belt slip, sense wire, fuse link, ground, or battery acceptance.",
        "seniorTechNote": "Check voltage at alternator B+ and at the battery under load before replacing the alternator.",
        "verifyBy": "compare B+ to battery"
      },
      "Ground strap": {
        "mechanic101": "ground straps complete the return path between battery, engine, frame, cab, and electronics",
        "commonConfusion": "Bad grounds can mimic weak batteries, bad starters, sensor faults, or module communication problems.",
        "seniorTechNote": "Inspect and voltage-drop grounds under load. A clean-looking strap can still be broken internally.",
        "verifyBy": "drop test ground side"
      },
      "Parasitic draw": {
        "mechanic101": "parasitic draw is key-off current that drains batteries after the machine should be asleep",
        "commonConfusion": "Testing too soon after key-off can catch normal module activity and look like an abnormal draw.",
        "seniorTechNote": "Let modules time out, then measure draw without waking the system by opening doors or disconnecting the wrong point.",
        "verifyBy": "wait sleep + measure"
      },
      "CAN awake": {
        "mechanic101": "a module or network staying awake can keep current draw high after shutdown",
        "commonConfusion": "A dead battery may be blamed on the battery when the real cause is a controller, sensor, or network wake-up problem.",
        "seniorTechNote": "Watch sleep timing, scan for modules staying online, and compare draw before and after network shutdown.",
        "verifyBy": "scan modules + draw"
      }
    },
    "rows": [
      [
        "12.6 V",
        "charged 12V battery rest",
        "single battery check",
        "surface charge"
      ],
      [
        "12.2 V",
        "partially charged",
        "slow crank complaint",
        "load test"
      ],
      [
        "24 V system",
        "two 12V batteries series",
        "heavy equipment/trucks",
        "balance"
      ],
      [
        "CCA",
        "cold cranking amps",
        "starting capacity",
        "temperature"
      ],
      [
        "Voltage drop",
        "cable/connection loss",
        "crank circuit",
        "under load"
      ],
      [
        "Alternator B+",
        "charge output",
        "charging system",
        "sense wire"
      ],
      [
        "Ground strap",
        "return path",
        "engine/frame grounds",
        "corrosion"
      ],
      [
        "Parasitic draw",
        "key-off current",
        "dead battery complaint",
        "sleep mode"
      ],
      [
        "Battery isolation",
        "multi-battery system",
        "aux/start battery split",
        "solenoid"
      ],
      [
        "CAN awake",
        "module not sleeping",
        "modern equipment",
        "network activity"
      ]
    ]
  }
];

  if (typeof window !== "undefined") {
    window.MaintainOpsReferenceData = window.MaintainOpsReferenceData || {};
    window.MaintainOpsReferenceData["diesel-mobile"] = DIESEL_MOBILE_REFERENCE_SECTIONS;
  }

  if (typeof module !== "undefined") {
    module.exports = { DIESEL_MOBILE_REFERENCE_SECTIONS };
  }
})();
