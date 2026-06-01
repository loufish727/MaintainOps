// pneumatics shop reference chart data. Kept separate so reference content can grow without recreating a data monolith.
(function () {
  const PNEUMATICS_REFERENCE_SECTIONS = [
  {
    "title": "Pneumatic Fitting ID Reference",
    "note": "Confirm tube OD, thread type, seal style, pressure rating, and fluid compatibility.",
    "columns": [
      "ID",
      "Type",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "1/4 push": "Very common",
      "1/4 NPT": "Very common",
      "G1/8": "Easy mix-up",
      "Speed control": "High consequence",
      "Silencer": "Common failure"
    },
    "rowTeaching": {
      "1/4 push": {
        "mechanic101": "1/4 push-to-connect fittings use tube outside diameter, not pipe size",
        "commonConfusion": "Tubing OD, pipe thread, and hose ID are three different sizing systems.",
        "seniorTechNote": "A crooked or scratched tube end can leak even when the fitting is the right size.",
        "verifyBy": "square cut tube OD"
      },
      "1/4 NPT": {
        "mechanic101": "1/4 NPT is a tapered pipe thread common on air fittings and regulators",
        "commonConfusion": "1/4 NPT does not mean the outside thread measures 0.250 inch.",
        "seniorTechNote": "Use compatible sealant and avoid overtightening tapered threads into small valve bodies.",
        "verifyBy": "identify NPT taper"
      },
      "G1/8": {
        "mechanic101": "G1/8 is a straight BSPP-style thread often found on imported pneumatic valves",
        "commonConfusion": "BSPP and NPT can look close but seal differently and can damage ports if forced.",
        "seniorTechNote": "If the port uses a gasket or bonded seal, do not treat it like tapered NPT.",
        "verifyBy": "thread gauge + seal"
      },
      "Speed control": {
        "mechanic101": "A speed control meters airflow to tune cylinder speed",
        "commonConfusion": "Meter-in and meter-out direction matters; reversing the fitting can make motion unstable.",
        "seniorTechNote": "For cylinders, meter-out is common because it controls exhaust and helps prevent runaway motion.",
        "verifyBy": "arrow + cylinder motion"
      },
      "Silencer": {
        "mechanic101": "A silencer muffles valve exhaust air and can clog with oil, dust, or water",
        "commonConfusion": "A slow cylinder can be caused by a clogged exhaust muffler, not just supply pressure.",
        "seniorTechNote": "When a valve shifts but motion is weak, briefly verify exhaust flow before changing the cylinder.",
        "verifyBy": "check exhaust restriction"
      }
    },
    "rows": [
      [
        "1/4 push",
        "push-to-connect",
        "common air tubing",
        "tube cut"
      ],
      [
        "3/8 push",
        "push-to-connect",
        "larger air drops",
        "OD sizing"
      ],
      [
        "1/2 push",
        "push-to-connect",
        "main machine air",
        "flow"
      ],
      [
        "1/8 NPT",
        "pipe thread",
        "small valves/fittings",
        "sealant"
      ],
      [
        "1/4 NPT",
        "pipe thread",
        "common air fittings",
        "thread damage"
      ],
      [
        "M5",
        "metric thread",
        "small pneumatic ports",
        "pitch"
      ],
      [
        "G1/8",
        "BSPP",
        "import valve ports",
        "bonded seal"
      ],
      [
        "Bulkhead",
        "panel fitting",
        "through-panel tubing",
        "nut clearance"
      ],
      [
        "Elbow swivel",
        "push-to-connect",
        "tight machine routing",
        "O-ring"
      ],
      [
        "Tee union",
        "tube union",
        "branch air line",
        "tube OD"
      ],
      [
        "Speed control",
        "metering fitting",
        "cylinder speed adjustment",
        "flow direction"
      ],
      [
        "Silencer",
        "exhaust muffler",
        "valve exhaust port",
        "clogging"
      ]
    ]
  },
  {
    "title": "Air Cylinder ID Reference",
    "note": "Confirm bore, stroke, mounting, rod thread, cushions, magnet piston, and seal kit.",
    "columns": [
      "Marking",
      "Means",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Bore": "Very common",
      "Stroke": "Very common",
      "Rod dia.": "High consequence",
      "Magnet": "Easy mix-up",
      "Cushion": "Common failure"
    },
    "rowTeaching": {
      "Bore": {
        "mechanic101": "Cylinder bore is piston diameter and is the main clue for force at a given air pressure",
        "commonConfusion": "A cylinder can have the same stroke but a different bore, changing force dramatically.",
        "seniorTechNote": "When replacing a cylinder, match bore before assuming pressure adjustment will solve force problems.",
        "verifyBy": "bore + pressure"
      },
      "Stroke": {
        "mechanic101": "Stroke is the cylinder travel distance from retracted to extended position",
        "commonConfusion": "Overall body length is not stroke, especially across compact, cushion, and mount variations.",
        "seniorTechNote": "Measure the actual required travel and end clearances so the replacement does not bottom the mechanism.",
        "verifyBy": "measure travel"
      },
      "Rod dia.": {
        "mechanic101": "Rod diameter affects thread fit, strength, buckling resistance, and attachment hardware",
        "commonConfusion": "Two cylinders with the same bore/stroke can have different rod sizes and rod-end threads.",
        "seniorTechNote": "Vertical or side-loaded applications need rod and guide review, not just a matching stroke.",
        "verifyBy": "rod OD + thread"
      },
      "Magnet": {
        "mechanic101": "A magnetic piston lets reed or electronic sensors detect position through the barrel",
        "commonConfusion": "A sensor-ready cylinder and a non-magnetic cylinder can look nearly identical externally.",
        "seniorTechNote": "If position sensors stopped working after replacement, confirm the piston magnet and sensor type.",
        "verifyBy": "sensor response test"
      },
      "Cushion": {
        "mechanic101": "Cylinder cushions slow the piston near end of stroke to reduce slam",
        "commonConfusion": "End slam may be blamed on pressure when cushion adjustment, speed controls, or load changed.",
        "seniorTechNote": "Tune speed and cushions together. Too much cushion can also stall or slow cycle time.",
        "verifyBy": "adjust cushion + flow"
      }
    },
    "rows": [
      [
        "Bore",
        "piston diameter",
        "force estimate",
        "pressure"
      ],
      [
        "Stroke",
        "travel length",
        "motion distance",
        "end clearance"
      ],
      [
        "Rod dia.",
        "rod size",
        "thread/clevis fit",
        "buckling"
      ],
      [
        "NFPA",
        "tie-rod style",
        "standard industrial cylinder",
        "mounting"
      ],
      [
        "Compact",
        "short body",
        "tight machine spaces",
        "side load"
      ],
      [
        "Magnet",
        "sensor-ready piston",
        "reed/prox switches",
        "sensor type"
      ],
      [
        "Cushion",
        "end damping",
        "high-speed motion",
        "adjustment"
      ],
      [
        "Seal kit",
        "repair kit",
        "leaking cylinder repair",
        "series match"
      ],
      [
        "Tie rod",
        "serviceable body",
        "repairable industrial cylinder",
        "rod torque"
      ],
      [
        "Round body",
        "light-duty cylinder",
        "compact automation",
        "mounting"
      ],
      [
        "Guided",
        "anti-rotation",
        "pick/place or slides",
        "bearing wear"
      ],
      [
        "Rodless",
        "carriage cylinder",
        "long stroke motion",
        "seal band"
      ]
    ]
  },
  {
    "title": "Solenoid Valve ID Reference",
    "note": "Confirm voltage, valve function, port size, manual override, flow, and pressure range.",
    "columns": [
      "Marking",
      "Function",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "3/2": "Very common",
      "5/2": "Very common",
      "5/3": "High consequence",
      "24VDC": "Very common",
      "Manual override": "Common failure"
    },
    "rowTeaching": {
      "3/2": {
        "mechanic101": "A 3/2 valve has three ports and two positions, often used for single-acting cylinders or air signals",
        "commonConfusion": "Normally open and normally closed versions behave opposite even with the same port count.",
        "seniorTechNote": "Before swapping a 3/2 valve, verify rest state, exhaust port, and actuator behavior.",
        "verifyBy": "port diagram + rest state"
      },
      "5/2": {
        "mechanic101": "A 5/2 valve commonly controls a double-acting cylinder with extend and retract ports",
        "commonConfusion": "Single-solenoid and double-solenoid 5/2 valves can behave differently after power loss.",
        "seniorTechNote": "On safety-sensitive motion, confirm spring return, detent, and loss-of-air behavior before replacing.",
        "verifyBy": "schematic + fail state"
      },
      "5/3": {
        "mechanic101": "A 5/3 valve has a center position that may block, vent, or pressurize ports",
        "commonConfusion": "All 5/3 valves are not interchangeable because the center condition changes machine behavior.",
        "seniorTechNote": "Treat center position as a machine-behavior requirement, especially on vertical or clamped loads.",
        "verifyBy": "center symbol"
      },
      "24VDC": {
        "mechanic101": "24VDC coils are common on PLC-controlled machines",
        "commonConfusion": "Voltage can be correct while polarity, connector wiring, flyback suppression, or coil type is wrong.",
        "seniorTechNote": "If the PLC output turns on but the valve does not shift, check coil voltage at the plug under load.",
        "verifyBy": "measure coil under load"
      },
      "Manual override": {
        "mechanic101": "Manual override lets a tech shift a valve for setup or troubleshooting",
        "commonConfusion": "Some overrides latch; a latched override can make the machine act like the control system is wrong.",
        "seniorTechNote": "Always return overrides to normal after testing and verify the actual spool state.",
        "verifyBy": "inspect override state"
      }
    },
    "rows": [
      [
        "2/2",
        "2-way valve",
        "on/off air or fluid",
        "normally open/closed"
      ],
      [
        "3/2",
        "3-way valve",
        "single-acting cylinder",
        "exhaust port"
      ],
      [
        "5/2",
        "5-way valve",
        "double-acting cylinder",
        "single/double solenoid"
      ],
      [
        "5/3",
        "center position",
        "hold/vent/pressure center",
        "machine behavior"
      ],
      [
        "12VDC",
        "coil voltage",
        "mobile equipment",
        "polarity"
      ],
      [
        "24VDC",
        "coil voltage",
        "PLC machines",
        "flyback"
      ],
      [
        "120VAC",
        "coil voltage",
        "older controls",
        "coil heat"
      ],
      [
        "DIN plug",
        "connector style",
        "field-replaceable coil",
        "gasket"
      ],
      [
        "Manual override",
        "test actuator",
        "setup/troubleshooting",
        "latching type"
      ],
      [
        "Pilot operated",
        "air-assisted shift",
        "higher-flow valves",
        "minimum pressure"
      ],
      [
        "Direct acting",
        "coil shifts valve",
        "small valves/low flow",
        "orifice size"
      ],
      [
        "Manifold mount",
        "banked valves",
        "multi-valve stations",
        "gasket pattern"
      ]
    ]
  },
  {
    "title": "Pneumatic Cylinder Troubleshooting Reference",
    "note": "Confirm pressure, flow controls, valve function, and mechanical binding before replacing components.",
    "columns": [
      "Symptom",
      "Likely area",
      "Common use note",
      "First check"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Slow extend": "Very common",
      "Drifts": "High consequence",
      "No movement": "Very common",
      "End slam": "Common failure",
      "Air leak at rod": "Common failure"
    },
    "rowTeaching": {
      "Slow extend": {
        "mechanic101": "Slow extension can come from low pressure, flow controls, exhaust restriction, load, or binding",
        "commonConfusion": "Turning up pressure may hide a clogged muffler, closed flow control, or mechanical bind.",
        "seniorTechNote": "Compare extend and retract behavior, then check pressure at the valve and cylinder ports.",
        "verifyBy": "pressure + flow control"
      },
      "Drifts": {
        "mechanic101": "Cylinder drift can come from seal leakage, valve leakage, load movement, or missing load-holding design",
        "commonConfusion": "A drifting cylinder is not always a bad cylinder; the valve or circuit may be leaking.",
        "seniorTechNote": "On vertical loads, treat drift as a safety issue and isolate before adjusting.",
        "verifyBy": "isolate ports safely"
      },
      "No movement": {
        "mechanic101": "No movement usually starts with air supply, valve shift, coil signal, manual override, or mechanical jam checks",
        "commonConfusion": "A lit solenoid LED does not prove the valve shifted or air reached the actuator.",
        "seniorTechNote": "Follow the energy path: electrical command, valve shift, air pressure, exhaust path, then mechanics.",
        "verifyBy": "trace command to motion"
      },
      "End slam": {
        "mechanic101": "End slam happens when the cylinder reaches the end of stroke too fast or without enough cushion",
        "commonConfusion": "Pressure reduction may reduce force but not fix poor speed control or cushion settings.",
        "seniorTechNote": "Tune meter-out flow controls and cushion adjustment together while watching cycle reliability.",
        "verifyBy": "cushion + meter-out"
      },
      "Air leak at rod": {
        "mechanic101": "Air leaking at the rod points toward rod seal wear, rod damage, or side load",
        "commonConfusion": "Replacing seals without correcting rod scratches or side loading can make the leak return.",
        "seniorTechNote": "Inspect rod finish and alignment before replacing a cylinder or seal kit.",
        "verifyBy": "inspect rod/alignment"
      }
    },
    "rows": [
      [
        "Slow extend",
        "flow/pressure",
        "air cylinders",
        "regulator"
      ],
      [
        "Slow retract",
        "flow control",
        "double-acting cylinders",
        "meter-out setting"
      ],
      [
        "Drifts",
        "seal leak/valve leak",
        "vertical loads",
        "check valve"
      ],
      [
        "Chatters",
        "low pressure/binding",
        "sticky motion",
        "guide rails"
      ],
      [
        "No movement",
        "valve/supply",
        "machine cycle",
        "solenoid LED"
      ],
      [
        "End slam",
        "cushion/flow",
        "fast stroke",
        "cushion setting"
      ],
      [
        "Air leak at rod",
        "rod seal",
        "worn cylinder",
        "rod damage"
      ],
      [
        "Sensor missed",
        "magnet/switch",
        "position sensing",
        "sensor location"
      ]
    ]
  }
];

  if (typeof window !== "undefined") {
    window.MaintainOpsReferenceData = window.MaintainOpsReferenceData || {};
    window.MaintainOpsReferenceData["pneumatics"] = PNEUMATICS_REFERENCE_SECTIONS;
  }

  if (typeof module !== "undefined") {
    module.exports = { PNEUMATICS_REFERENCE_SECTIONS };
  }
})();
