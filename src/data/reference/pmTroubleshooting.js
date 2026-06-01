// pm-troubleshooting shop reference chart data. Kept separate so reference content can grow without recreating a data monolith.
(function () {
  const PM_TROUBLESHOOTING_REFERENCE_SECTIONS = [
  {
    "title": "Common Failure Symptom Reference",
    "note": "Symptoms point to likely areas, not final diagnosis. Confirm operating conditions before adjustment.",
    "columns": [
      "Asset",
      "Symptom",
      "Likely area",
      "First check"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Motor": "Very common",
      "Pump": "Very common",
      "Conveyor": "Very common",
      "Hydraulic system": "High consequence",
      "Sensor": "Common failure"
    },
    "rowTeaching": {
      "Motor": {
        "mechanic101": "A hot motor points toward load, cooling, voltage, current imbalance, bearings, or duty cycle",
        "commonConfusion": "Heat is often blamed on the motor when the driven load, fan, or voltage problem caused it.",
        "seniorTechNote": "Compare current to nameplate FLA on all phases and inspect airflow before replacing the motor.",
        "verifyBy": "amps + airflow"
      },
      "Pump": {
        "mechanic101": "Low pump flow can come from suction restriction, air, worn impeller, wrong rotation, or clogged discharge path",
        "commonConfusion": "A pump can sound like the problem when the strainer, valve position, or suction leak is the cause.",
        "seniorTechNote": "Check suction conditions first because cavitation and starvation can damage a good pump.",
        "verifyBy": "suction + strainer"
      },
      "Conveyor": {
        "mechanic101": "Tracking problems usually involve alignment, tension, load placement, rollers, or frame condition",
        "commonConfusion": "Tightening the belt may hide tracking problems while increasing bearing and splice stress.",
        "seniorTechNote": "Correct mechanical alignment before using tension as the only fix.",
        "verifyBy": "alignment + tension"
      },
      "Hydraulic system": {
        "mechanic101": "Weak hydraulic force can come from pressure setting, pump output, valve bypass, cylinder bypass, or leaks",
        "commonConfusion": "Pressure and flow are different; a system can show pressure while still failing under motion.",
        "seniorTechNote": "Use gauges and isolation checks before turning relief valves or replacing major components.",
        "verifyBy": "pressure under load"
      },
      "Sensor": {
        "mechanic101": "Intermittent sensors often involve alignment, target distance, cable damage, contamination, or power supply issues",
        "commonConfusion": "A sensor LED can blink and still not provide a stable PLC input.",
        "seniorTechNote": "Check signal at the PLC/input module, not only at the sensor face.",
        "verifyBy": "LED + input status"
      }
    },
    "rows": [
      [
        "Motor",
        "runs hot",
        "overload or cooling",
        "current and fan"
      ],
      [
        "Pump",
        "low flow",
        "clog, air, impeller",
        "suction/strainer"
      ],
      [
        "Conveyor",
        "tracks off",
        "alignment/load",
        "rollers and tension"
      ],
      [
        "Gearbox",
        "noisy",
        "lube/bearing/gear",
        "oil level"
      ],
      [
        "Air cylinder",
        "slow stroke",
        "flow/leak/pressure",
        "regulator"
      ],
      [
        "Hydraulic system",
        "weak force",
        "pressure/leak/bypass",
        "relief pressure"
      ],
      [
        "VFD motor",
        "trips on accel",
        "load/current/ramp",
        "mechanical jam"
      ],
      [
        "Sensor",
        "intermittent",
        "alignment/wiring",
        "LED and cable"
      ]
    ]
  },
  {
    "title": "Spark Plug Condition Reference",
    "note": "Plug appearance is a clue, not a standalone diagnosis. Compare all cylinders and verify plug type, gap, heat range, ignition, fueling, oil control, and OEM service data.",
    "columns": [
      "Condition",
      "Look",
      "Field note",
      "First check"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Dry carbon fouling": "Common failure",
      "Fuel wet fouling": "Common failure",
      "Oil fouling": "Common failure",
      "Ash deposits": "Common failure",
      "Overheated / blistered": "High consequence",
      "Carbon tracking": "Easy mix-up",
      "Worn electrode": "Very common"
    },
    "rowTeaching": {
      "Dry carbon fouling": {
        "commonConfusion": "Dry carbon is often blamed on the plug alone, but the soot usually points back to rich mixture, weak ignition, too much idle/cold running, or the wrong heat range.",
        "seniorTechNote": "Dry carbon fouling points toward rich running, weak ignition, cold operation, or the wrong heat range; replace the plug only after checking why it fouled."
      },
      "Fuel wet fouling": {
        "commonConfusion": "Fuel-wet and oil-wet plugs can both look wet at a glance. Smell, texture, cylinder data, and compression separate the cause.",
        "seniorTechNote": "A fuel-wet plug is usually telling you the cylinder did not light off; check spark, injector behavior, and compression before blaming the plug."
      },
      "Oil fouling": {
        "commonConfusion": "Oil fouling can be mistaken for a bad plug. The plug may be the symptom, while rings, guides, PCV, or cylinder wear are the cause.",
        "seniorTechNote": "Oil fouling is a root-cause clue. The new plug may foul again if oil control, PCV, guides, rings, or cylinder wear are ignored."
      },
      "Ash deposits": {
        "commonConfusion": "Ash deposits are dry crusty residue, not the same thing as a wet oil-fouled plug. Additives, oil consumption, or fuel/oil contamination can leave light-colored buildup.",
        "seniorTechNote": "Ash deposits are a residue clue. Check oil use, additives, fuel quality, and whether the same crust appears across cylinders before replacing plugs and calling it fixed."
      },
      "Overheated / blistered": {
        "commonConfusion": "Overheated plug signs can be confused with normal light coloring. Blistering, eroded electrodes, timing, lean mix, cooling, and heat range matter.",
        "seniorTechNote": "Overheated plug damage is a stop-and-check signal because lean operation, timing, cooling, or wrong heat range can hurt the engine."
      },
      "Carbon tracking": {
        "commonConfusion": "Carbon tracking can be missed because the plug tip may not look terrible. The spark may be leaking down the insulator or boot path.",
        "seniorTechNote": "Carbon tracking often follows the boot path, so a new plug alone may not fix the misfire if the boot, coil, or wire leaks spark."
      },
      "Worn electrode": {
        "commonConfusion": "A worn electrode can look like an ordinary old plug until the gap is measured. Mileage, gap growth, and even wear across cylinders separate normal wear from a deeper issue.",
        "seniorTechNote": "A worn electrode is common maintenance evidence; check gap, mileage, and whether the wear is even across cylinders."
      }
    },
    "rows": [
      [
        "Normal",
        "light tan/gray, slight wear",
        "baseline after real running",
        "compare cylinders"
      ],
      [
        "Dry carbon fouling",
        "dry black soot",
        "rich mixture, weak spark, cold running",
        "air/fuel/ignition"
      ],
      [
        "Fuel wet fouling",
        "wet fuel smell",
        "no-start, misfire, flooding",
        "spark/injector/compression"
      ],
      [
        "Oil fouling",
        "wet oily deposits",
        "oil control, rings, guides, PCV",
        "compression/leakdown"
      ],
      [
        "Ash deposits",
        "tan/white crust",
        "oil/fuel additives or oil burning",
        "oil use/additives"
      ],
      [
        "Overheated / blistered",
        "white blistering, eroded electrode",
        "lean, timing, cooling, wrong heat range",
        "timing/fuel/cooling"
      ],
      [
        "Worn electrode",
        "rounded center/ground electrode",
        "normal service wear, larger gap",
        "gap and mileage"
      ],
      [
        "Gap bridged",
        "debris between electrodes",
        "misfire from deposits/debris",
        "inspect chamber/deposits"
      ],
      [
        "Cracked insulator",
        "broken ceramic",
        "handling, detonation, installation damage",
        "replace and inspect cause"
      ],
      [
        "Carbon tracking",
        "black line down insulator",
        "spark leak from boot/terminal",
        "boot/coil/wire"
      ],
      [
        "Glazed deposits",
        "shiny yellow/brown coating",
        "additives/heat can cause misfire",
        "fuel/oil additives"
      ],
      [
        "Incorrect gap",
        "gap too wide/narrow",
        "hard start, misfire, coil stress",
        "gap to OEM spec"
      ]
    ]
  },
  {
    "title": "Compressor Maintenance Reference",
    "note": "Follow OEM intervals. Heat, dirty intake air, water, and poor drains shorten compressor life.",
    "columns": [
      "Task",
      "Starter interval",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Drain tank": "Very common",
      "Intake filter": "Very common",
      "Inspect leaks": "Very common",
      "Clean cooler": "Common failure",
      "Service separator": "High consequence"
    },
    "rowTeaching": {
      "Drain tank": {
        "mechanic101": "Tank drains remove water that accumulates from compressed air moisture",
        "commonConfusion": "Water in the tank is not just messy; it can promote corrosion and carry downstream.",
        "seniorTechNote": "If drains collect excessive water, review dryer performance, ambient humidity, and auto-drain function.",
        "verifyBy": "check drain output"
      },
      "Intake filter": {
        "mechanic101": "The intake filter protects the compressor from dust and debris",
        "commonConfusion": "A dirty intake filter can reduce output and raise temperature before it looks fully blocked.",
        "seniorTechNote": "In dusty shops, inspect by pressure drop or condition more often than a calendar-only interval.",
        "verifyBy": "inspect/pressure drop"
      },
      "Inspect leaks": {
        "mechanic101": "Air leaks waste compressor capacity and can make a good compressor seem undersized",
        "commonConfusion": "Short cycling or low pressure may be blamed on the compressor while the system is leaking.",
        "seniorTechNote": "Leak surveys often pay back faster than compressor upgrades.",
        "verifyBy": "listen/ultrasonic test"
      },
      "Clean cooler": {
        "mechanic101": "Coolers reject heat so the compressor can run at the right temperature",
        "commonConfusion": "High temperature trips may be caused by airflow blockage, not oil or sensor failure.",
        "seniorTechNote": "Check cooler cleanliness, fan direction, ambient temperature, and cabinet airflow before adjusting controls.",
        "verifyBy": "cooler airflow"
      },
      "Service separator": {
        "mechanic101": "Rotary screw separators remove oil from compressed air before discharge",
        "commonConfusion": "High oil carryover or pressure drop can be separator-related but also depends on oil level and return lines.",
        "seniorTechNote": "Use OEM pressure-drop and hour guidance; separator failure can contaminate downstream systems.",
        "verifyBy": "separator pressure drop"
      }
    },
    "rows": [
      [
        "Drain tank",
        "daily/weekly",
        "water removal",
        "auto drain"
      ],
      [
        "Check oil",
        "weekly",
        "lubricated units",
        "oil type"
      ],
      [
        "Intake filter",
        "monthly",
        "dirty environments",
        "pressure drop"
      ],
      [
        "Belt tension",
        "monthly",
        "belt-drive units",
        "alignment"
      ],
      [
        "Inspect leaks",
        "monthly",
        "air savings",
        "ultrasonic test"
      ],
      [
        "Clean cooler",
        "quarterly",
        "heat control",
        "airflow"
      ],
      [
        "Change oil",
        "OEM interval",
        "lubricated units",
        "hours"
      ],
      [
        "Service separator",
        "OEM interval",
        "rotary screw",
        "pressure drop"
      ]
    ]
  }
];

  if (typeof window !== "undefined") {
    window.MaintainOpsReferenceData = window.MaintainOpsReferenceData || {};
    window.MaintainOpsReferenceData["pm-troubleshooting"] = PM_TROUBLESHOOTING_REFERENCE_SECTIONS;
  }

  if (typeof module !== "undefined") {
    module.exports = { PM_TROUBLESHOOTING_REFERENCE_SECTIONS };
  }
})();
