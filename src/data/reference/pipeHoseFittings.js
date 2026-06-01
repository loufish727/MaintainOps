// pipe-hose-fittings shop reference chart data. Kept separate so reference content can grow without recreating a data monolith.
(function () {
  const PIPE_HOSE_FITTING_REFERENCE_SECTIONS = [
  {
    "title": "Pipe / Tubing Reference",
    "note": "Nominal pipe size is not the actual outside diameter. Tube is usually named by outside diameter.",
    "columns": [
      "Nominal / tube",
      "Actual OD",
      "Schedule 40 wall",
      "Common use note"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "1/2 NPS": "Very common",
      "3/4 NPS": "Very common",
      "1 NPS": "Very common",
      "2 NPS": "High consequence",
      "1/4 tube": "Easy mix-up",
      "3/8 tube": "Very common",
      "1/2 tube": "Very common"
    },
    "rowTeaching": {
      "1/2 NPS": {
        "mechanic101": "1/2 inch pipe is nominal; the actual outside diameter is about 0.840 inch, not 0.500 inch",
        "commonConfusion": "Pipe size and tube size are named differently. A 1/2 tube is actual OD, while 1/2 NPS pipe is not.",
        "seniorTechNote": "When matching plant air or pipe fittings, measure OD and identify pipe thread instead of trusting the spoken size.",
        "verifyBy": "measure OD + thread"
      },
      "3/4 NPS": {
        "mechanic101": "3/4 inch pipe has about 1.050 inch OD and is common around air and utility branch lines",
        "commonConfusion": "3/4 pipe can be mistaken for 1 inch tube or hose by outside size language.",
        "seniorTechNote": "Ask whether the part is pipe, tube, or hose before ordering fittings. The naming system changes the answer.",
        "verifyBy": "identify pipe/tube/hose"
      },
      "1 NPS": {
        "mechanic101": "1 inch pipe is a nominal pipe size with about 1.315 inch outside diameter",
        "commonConfusion": "A measured 1.315 inch OD can surprise people expecting 1 inch actual OD.",
        "seniorTechNote": "For pipe work, pair NPS with schedule and material. OD alone does not tell wall thickness or pressure suitability.",
        "verifyBy": "NPS + schedule"
      },
      "2 NPS": {
        "mechanic101": "2 inch Schedule 40 pipe is common on larger headers and process lines, with OD about 2.375 inch",
        "commonConfusion": "A pipe that measures over 2 inches OD is not automatically the wrong size; NPS is nominal.",
        "seniorTechNote": "On larger piping, confirm schedule, pressure class, material, and joining method before replacing sections or fittings.",
        "verifyBy": "schedule + material"
      },
      "1/4 tube": {
        "mechanic101": "1/4 tube is usually named by actual outside diameter, unlike nominal pipe size",
        "commonConfusion": "1/4 tube and 1/4 pipe are completely different physical sizes and fitting families.",
        "seniorTechNote": "Small tube mistakes usually show up as wrong ferrules, leaks, or fittings that will not start correctly.",
        "verifyBy": "caliper tube OD"
      },
      "3/8 tube": {
        "mechanic101": "3/8 tube is common in pneumatic controls, instruments, and small fluid lines",
        "commonConfusion": "Tube OD, hose ID, and pipe nominal size can all be called by fractions but mean different things.",
        "seniorTechNote": "Before grabbing a fitting, decide whether the line is tube OD, hose ID, or pipe thread.",
        "verifyBy": "measure OD + fitting"
      },
      "1/2 tube": {
        "mechanic101": "1/2 tube is actual OD and is common in pneumatic and hydraulic-style machine lines",
        "commonConfusion": "A 1/2 tube is not the same as 1/2 pipe, and tube wall thickness may still vary.",
        "seniorTechNote": "For tube replacement, confirm OD, wall, material, pressure, and fitting style before cutting new line.",
        "verifyBy": "OD + wall + material"
      }
    },
    "rows": [
      [
        "1/8 NPS",
        "0.405 in",
        "0.068 in",
        "gauges and small air lines"
      ],
      [
        "1/4 NPS",
        "0.540 in",
        "0.088 in",
        "compressed air drops"
      ],
      [
        "3/8 NPS",
        "0.675 in",
        "0.091 in",
        "air tools / small water"
      ],
      [
        "1/2 NPS",
        "0.840 in",
        "0.109 in",
        "plant air branches"
      ],
      [
        "3/4 NPS",
        "1.050 in",
        "0.113 in",
        "air header branches"
      ],
      [
        "1 NPS",
        "1.315 in",
        "0.133 in",
        "main air/water runs"
      ],
      [
        "1-1/4 NPS",
        "1.660 in",
        "0.140 in",
        "larger utility piping"
      ],
      [
        "1-1/2 NPS",
        "1.900 in",
        "0.145 in",
        "pump and header piping"
      ],
      [
        "2 NPS",
        "2.375 in",
        "0.154 in",
        "larger headers"
      ],
      [
        "2-1/2 NPS",
        "2.875 in",
        "0.203 in",
        "process piping"
      ],
      [
        "3 NPS",
        "3.500 in",
        "0.216 in",
        "main process lines"
      ],
      [
        "4 NPS",
        "4.500 in",
        "0.237 in",
        "large water/process lines"
      ],
      [
        "6 NPS",
        "6.625 in",
        "0.280 in",
        "plant mains"
      ],
      [
        "8 NPS",
        "8.625 in",
        "0.322 in",
        "large service mains"
      ],
      [
        "1/4 tube",
        "0.250 in",
        "varies",
        "instrument air / brake tube"
      ],
      [
        "3/8 tube",
        "0.375 in",
        "varies",
        "pneumatic controls"
      ],
      [
        "1/2 tube",
        "0.500 in",
        "varies",
        "hydraulic/pneumatic lines"
      ],
      [
        "3/4 tube",
        "0.750 in",
        "varies",
        "larger hydraulic lines"
      ],
      [
        "1 tube",
        "1.000 in",
        "varies",
        "machine fluid transfer"
      ],
      [
        "1-1/2 tube",
        "1.500 in",
        "varies",
        "structural or large fluid tube"
      ]
    ]
  },
  {
    "title": "Hose Clamp Reference",
    "note": "Confirm clamp style, diameter range, material, pressure, vibration, and hose construction.",
    "columns": [
      "Style",
      "Best for",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Worm gear": "Very common",
      "T-bolt": "High consequence",
      "Spring clamp": "Very common",
      "Constant torque": "Spec required",
      "V-band": "High consequence"
    },
    "rowTeaching": {
      "Worm gear": {
        "mechanic101": "Worm gear clamps are common general-purpose clamps for light hose work",
        "commonConfusion": "More tightening is not always better; the band can strip or cut into soft hose.",
        "seniorTechNote": "Use the right clamp width and diameter range so the screw housing does not distort the hose.",
        "verifyBy": "range + hose condition"
      },
      "T-bolt": {
        "mechanic101": "T-bolt clamps provide higher clamp load for heavy hose, charge-air, and industrial connections",
        "commonConfusion": "A T-bolt clamp can damage the wrong hose or fitting if overtightened.",
        "seniorTechNote": "Use torque guidance where available and recheck after heat cycles on critical boosted or pressure connections.",
        "verifyBy": "torque + pressure test"
      },
      "Spring clamp": {
        "mechanic101": "Spring clamps maintain tension as hose expands and contracts with temperature",
        "commonConfusion": "Replacing a spring clamp with worm gear can create seepage after heat cycles.",
        "seniorTechNote": "If the OEM used a spring clamp on coolant, consider why before substituting clamp style.",
        "verifyBy": "heat-cycle check"
      },
      "Constant torque": {
        "mechanic101": "Constant-torque clamps compensate for thermal movement on hoses that expand and relax",
        "commonConfusion": "They are not just fancy worm clamps; the spring element is part of the function.",
        "seniorTechNote": "Use these where temperature swing and hose compression set have caused repeat leaks.",
        "verifyBy": "match clamp spec"
      },
      "V-band": {
        "mechanic101": "V-band clamps pull matching flanges together and are common on exhaust, turbo, and duct joints",
        "commonConfusion": "V-band diameter is not enough; flange profile and angle must match.",
        "seniorTechNote": "A mismatched V-band can seem tight while leaving poor flange seating or dangerous leaks.",
        "verifyBy": "match flange profile"
      }
    },
    "rows": [
      [
        "Worm gear",
        "general hose",
        "water/air light duty",
        "strip risk"
      ],
      [
        "T-bolt",
        "high clamp load",
        "charge air / heavy hose",
        "torque"
      ],
      [
        "Spring clamp",
        "thermal cycling",
        "coolant hoses",
        "reuse condition"
      ],
      [
        "Ear clamp",
        "permanent crimp",
        "small hoses",
        "single use"
      ],
      [
        "Constant torque",
        "temperature swings",
        "silicone/coolant hose",
        "size range"
      ],
      [
        "Band clamp",
        "exhaust/duct",
        "large diameter joints",
        "seal type"
      ],
      [
        "Cushion clamp",
        "line support",
        "hydraulic/air line routing",
        "rubber condition"
      ],
      [
        "Double wire",
        "spiral hose",
        "dust collection hose",
        "wire fit"
      ],
      [
        "V-band",
        "flanged joints",
        "exhaust/turbo/ducting",
        "flange match"
      ],
      [
        "Lined clamp",
        "cushioned support",
        "vibration isolation",
        "liner material"
      ],
      [
        "Oetiker stepless",
        "ear clamp",
        "small fluid/air hoses",
        "crimp tool"
      ],
      [
        "Bridge clamp",
        "corrugated hose",
        "dust/duct hose",
        "hose pitch"
      ]
    ]
  }
];

  if (typeof window !== "undefined") {
    window.MaintainOpsReferenceData = window.MaintainOpsReferenceData || {};
    window.MaintainOpsReferenceData["pipe-hose-fittings"] = PIPE_HOSE_FITTING_REFERENCE_SECTIONS;
  }

  if (typeof module !== "undefined") {
    module.exports = { PIPE_HOSE_FITTING_REFERENCE_SECTIONS };
  }
})();
