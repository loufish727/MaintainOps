// materials-shop shop reference chart data. Kept separate so reference content can grow without recreating a data monolith.
(function () {
  const MATERIALS_SHOP_REFERENCE_SECTIONS = [
  {
    "title": "Oil / Grease Reference",
    "note": "Lubricant selection depends on load, speed, temperature, seals, contamination, and OEM spec.",
    "columns": [
      "Type",
      "Reference",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "ISO VG 32": "Very common",
      "ISO VG 46": "Very common",
      "ISO VG 68": "Easy mix-up",
      "ISO VG 220": "Very common",
      "NLGI 2": "Very common",
      "Polyurea": "Easy mix-up",
      "EP gear oil": "High consequence",
      "Food grade H1": "Spec required"
    },
    "rowTeaching": {
      "ISO VG 32": {
        "mechanic101": "ISO VG 32 is a lighter hydraulic oil commonly used in colder systems or smaller hydraulic power units",
        "commonConfusion": "ISO 32 and ISO 46 can both be called hydraulic oil, but viscosity affects startup, leakage, heat, and response.",
        "seniorTechNote": "Do not top off by color or drum habit. Match the OEM viscosity, additive type, and operating temperature.",
        "verifyBy": "OEM spec + label"
      },
      "ISO VG 46": {
        "mechanic101": "ISO VG 46 is a very common hydraulic oil viscosity in industrial hydraulic power units",
        "commonConfusion": "A hydraulic system may tolerate the wrong oil briefly, then show heat, noise, slow action, or seal trouble later.",
        "seniorTechNote": "Treat ISO 46 as common, not universal. Confirm viscosity, antiwear/additive package, and contamination condition.",
        "verifyBy": "label + oil sample"
      },
      "ISO VG 68": {
        "mechanic101": "ISO VG 68 is heavier than ISO 46 and appears in older hydraulics, gear cases, and warmer service",
        "commonConfusion": "Heavier oil is not automatically better. It can hurt cold startup, pump inlet conditions, and response.",
        "seniorTechNote": "If someone upsizes viscosity to quiet a problem, check wear, temperature, suction restriction, and OEM allowance first.",
        "verifyBy": "temperature + OEM range"
      },
      "ISO VG 220": {
        "mechanic101": "ISO VG 220 is a common industrial gear-oil viscosity for loaded reducers and worm gearboxes",
        "commonConfusion": "Gear oil viscosity and additive type both matter; the same number does not prove yellow-metal safety or OEM approval.",
        "seniorTechNote": "For reducers, verify viscosity, EP compatibility, base oil, venting, fill level, and temperature before changing oil type.",
        "verifyBy": "gearbox manual + label"
      },
      "NLGI 2": {
        "mechanic101": "NLGI 2 is the standard-feeling general-purpose grease consistency seen across many motor and conveyor bearings",
        "commonConfusion": "NLGI grade is consistency, not chemistry. Two NLGI 2 greases can have different thickeners and compatibility.",
        "seniorTechNote": "Before mixing greases, confirm thickener/base oil compatibility and application speed, load, water, and temperature.",
        "verifyBy": "grease label + SDS"
      },
      "Polyurea": {
        "mechanic101": "Polyurea grease is common in electric motor bearing service but can be incompatible with some other grease families",
        "commonConfusion": "The same color or NLGI number does not prove grease compatibility.",
        "seniorTechNote": "For motor bearings, use the specified grease and quantity. Overgreasing or mixing can cause heat and early failure.",
        "verifyBy": "motor/OEM grease spec"
      },
      "EP gear oil": {
        "mechanic101": "EP gear oil contains extreme-pressure additives for loaded gears, but the additive chemistry must fit the gearbox materials",
        "commonConfusion": "EP oil is sometimes poured into any gearbox, but some additives can be wrong for yellow metals or special reducers.",
        "seniorTechNote": "Match the reducer manual. Check bronze, brass, seals, and oil temperature before changing EP oil family.",
        "verifyBy": "reducer spec + metals"
      },
      "Food grade H1": {
        "mechanic101": "Food grade H1 lubricant is for incidental food-contact areas, but it still needs the right viscosity and application fit",
        "commonConfusion": "Food grade does not mean any H1 oil or grease can replace the original lubricant.",
        "seniorTechNote": "In food areas, verify H1 registration, viscosity/grade, compatibility, and plant program requirements before use.",
        "verifyBy": "H1 + OEM spec"
      }
    },
    "rows": [
      [
        "ISO VG 22",
        "very light oil",
        "high-speed spindles / light hydraulics",
        "temperature"
      ],
      [
        "ISO VG 32",
        "SAE 10-ish",
        "cold hydraulic systems / small pumps",
        "additive package"
      ],
      [
        "ISO VG 46",
        "SAE 15-ish",
        "common hydraulic power units",
        "OEM viscosity"
      ],
      [
        "ISO VG 68",
        "SAE 20-ish",
        "older hydraulics / light gear cases",
        "foam / water"
      ],
      [
        "ISO VG 100",
        "SAE 30-ish",
        "gear reducers / sleeve bearings",
        "heat"
      ],
      [
        "ISO VG 150",
        "SAE 40-ish",
        "industrial reducers",
        "load"
      ],
      [
        "ISO VG 220",
        "SAE 90-ish gear",
        "worm gears / loaded reducers",
        "additives"
      ],
      [
        "ISO VG 320",
        "heavy gear oil",
        "slow heavy gearbox",
        "startup temp"
      ],
      [
        "ISO VG 460",
        "very heavy gear oil",
        "slow loaded gearbox",
        "pumpability"
      ],
      [
        "NLGI 000",
        "fluid grease",
        "centralized lube lines",
        "leakage"
      ],
      [
        "NLGI 00",
        "semi-fluid grease",
        "gearboxes with grease spec",
        "seal condition"
      ],
      [
        "NLGI 0",
        "soft grease",
        "cold service / low-temp bearings",
        "retention"
      ],
      [
        "NLGI 1",
        "softer grease",
        "centralized grease systems",
        "compatibility"
      ],
      [
        "NLGI 2",
        "standard grease",
        "general motor and conveyor bearings",
        "base/thickener"
      ],
      [
        "NLGI 3",
        "stiffer grease",
        "vertical shafts / high retention",
        "speed/temp"
      ],
      [
        "Lithium complex",
        "grease thickener",
        "general plant bearing grease",
        "mixing"
      ],
      [
        "Polyurea",
        "grease thickener",
        "electric motor bearings",
        "mixing"
      ],
      [
        "Calcium sulfonate",
        "grease thickener",
        "washdown / wet areas",
        "compatibility"
      ],
      [
        "EP gear oil",
        "extreme pressure",
        "loaded gearboxes",
        "yellow metal"
      ],
      [
        "Food grade H1",
        "incidental contact",
        "food processing equipment",
        "rating"
      ]
    ]
  },
  {
    "title": "Socket / Wrench Close-Fit Reference",
    "note": "Close fits are for identification only. Use the correct socket/wrench before applying torque.",
    "columns": [
      "SAE",
      "Metric close fit",
      "Fit quality",
      "Common use note"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "3/8": "Very common",
      "1/2": "Easy mix-up",
      "9/16": "Very common",
      "3/4": "Very common",
      "1-1/16": "High consequence"
    },
    "rowTeaching": {
      "3/8": {
        "mechanic101": "A 3/8 inch wrench is often near a 10 mm fastener, but the fit is loose enough to round small hardware",
        "commonConfusion": "Close fit does not mean correct fit. A loose wrench can feel acceptable until torque is applied.",
        "seniorTechNote": "For common 10 mm hardware, use the actual 10 mm tool when loosening tight or corroded bolts.",
        "verifyBy": "seat tool fully"
      },
      "1/2": {
        "mechanic101": "1/2 inch and 13 mm are a common field mix-up on small brackets and metric equipment",
        "commonConfusion": "A 1/2 inch wrench may start on a 13 mm head, but looseness can damage corners under load.",
        "seniorTechNote": "If the head is already rounded or painted, stop and confirm the correct size before applying torque.",
        "verifyBy": "check rock/play"
      },
      "9/16": {
        "mechanic101": "9/16 inch and 14 mm are close enough to confuse on equipment with mixed inch and metric hardware",
        "commonConfusion": "Mixed machines often have both sizes nearby, so the last tool used is not always the right one.",
        "seniorTechNote": "On tight hardware, pick the tool that bottoms cleanly on all flats with the least visible movement.",
        "verifyBy": "fit all flats"
      },
      "3/4": {
        "mechanic101": "3/4 inch and 19 mm are close and common around larger frame bolts, lug-style nuts, and fittings",
        "commonConfusion": "High-load fasteners punish sloppy tool fit faster than light cover screws.",
        "seniorTechNote": "For high torque, use the exact socket, full engagement, and a six-point tool when possible.",
        "verifyBy": "six-point fit"
      },
      "1-1/16": {
        "mechanic101": "1-1/16 inch often appears near hydraulic fittings and large machine hardware",
        "commonConfusion": "Fitting hex size is not the same thing as thread size or hose size.",
        "seniorTechNote": "Before ordering or replacing a hydraulic fitting, identify the thread/seal style separately from the wrench size.",
        "verifyBy": "measure thread + seal"
      }
    },
    "rows": [
      [
        "5/32",
        "4 mm",
        "close",
        "small set screws"
      ],
      [
        "3/16",
        "5 mm",
        "loose",
        "small machine hardware"
      ],
      [
        "7/32",
        "5.5 mm",
        "close",
        "small hex hardware"
      ],
      [
        "1/4",
        "6 mm",
        "loose",
        "small hex heads"
      ],
      [
        "5/16",
        "8 mm",
        "close",
        "#10 hex / small bolts"
      ],
      [
        "11/32",
        "9 mm",
        "loose",
        "small clamp hardware"
      ],
      [
        "3/8",
        "10 mm",
        "loose",
        "very common 10mm socket; frequent-loss size, not a torque substitute"
      ],
      [
        "7/16",
        "11 mm",
        "close",
        "1/4 bolt heads"
      ],
      [
        "1/2",
        "13 mm",
        "loose",
        "common 13mm metric socket; loose SAE substitute"
      ],
      [
        "9/16",
        "14 mm",
        "close",
        "common 14mm metric socket; check fit before load"
      ],
      [
        "5/8",
        "16 mm",
        "loose",
        "7/16 bolt heads"
      ],
      [
        "11/16",
        "17 mm",
        "close",
        "metric frame hardware"
      ],
      [
        "3/4",
        "19 mm",
        "close",
        "common 19mm metric socket / 1/2 bolt heads; verify full seat"
      ],
      [
        "13/16",
        "21 mm",
        "loose",
        "lug/nut checks"
      ],
      [
        "7/8",
        "22 mm",
        "close",
        "larger fasteners"
      ],
      [
        "15/16",
        "24 mm",
        "close",
        "5/8 bolt heads"
      ],
      [
        "1",
        "25 mm",
        "loose",
        "large fasteners"
      ],
      [
        "1-1/16",
        "27 mm",
        "close",
        "hydraulic fittings"
      ],
      [
        "1-1/8",
        "29 mm",
        "loose",
        "large fittings"
      ],
      [
        "1-1/4",
        "32 mm",
        "close",
        "large nuts/fittings"
      ]
    ]
  },
  {
    "title": "Sheet Metal Gauge Reference",
    "note": "Gauge thickness varies by material standard. Confirm material, coating, and drawing callout.",
    "columns": [
      "Gauge",
      "Steel",
      "Aluminum",
      "Common use note"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "26 ga": "Very common",
      "20 ga": "Very common",
      "16 ga": "Very common",
      "12 ga": "High consequence",
      "1/4 plate": "Spec required"
    },
    "rowTeaching": {
      "26 ga": {
        "mechanic101": "26 gauge is thin sheet often seen in duct, light covers, and non-structural skins",
        "commonConfusion": "Gauge number runs backward: higher gauge usually means thinner material.",
        "seniorTechNote": "Thin sheet changes quickly with coating, material type, and forming. Measure before duplicating a panel.",
        "verifyBy": "caliper actual thickness"
      },
      "20 ga": {
        "mechanic101": "20 gauge is a common light panel and cover thickness in shop fabrication",
        "commonConfusion": "Steel and aluminum gauge thicknesses are not always the same for the same gauge number.",
        "seniorTechNote": "When replacing covers, match material, thickness, stiffness, and bend allowance, not gauge name alone.",
        "verifyBy": "material + thickness"
      },
      "16 ga": {
        "mechanic101": "16 gauge is common for stronger guards, brackets, and cabinet parts",
        "commonConfusion": "A part that looks like 16 gauge may be 14 or 18 once paint and coating are included.",
        "seniorTechNote": "For guards, thickness is only one factor. Check mounting, span, edge condition, and expected impact.",
        "verifyBy": "measure bare edge"
      },
      "12 ga": {
        "mechanic101": "12 gauge is heavier sheet used around robust guards, frames, and support parts",
        "commonConfusion": "Heavy sheet can start becoming a structural decision instead of a simple cover replacement.",
        "seniorTechNote": "If the part carries load or protects people, use the print or engineering requirement before substituting thickness.",
        "verifyBy": "print + caliper"
      },
      "1/4 plate": {
        "mechanic101": "1/4 plate is plate thickness, not a gauge callout",
        "commonConfusion": "Plate and gauge language can get mixed in casual shop talk, especially near 3 ga to 1/4 inch.",
        "seniorTechNote": "For plate work, specify actual thickness, material grade, finish, and tolerance instead of gauge.",
        "verifyBy": "actual thickness spec"
      }
    },
    "rows": [
      [
        "30 ga",
        "0.0120 in",
        "0.0100 in",
        "thin shim / flashing"
      ],
      [
        "28 ga",
        "0.0149 in",
        "0.0126 in",
        "light covers"
      ],
      [
        "26 ga",
        "0.0179 in",
        "0.0159 in",
        "duct / light panels"
      ],
      [
        "24 ga",
        "0.0239 in",
        "0.0201 in",
        "sheet-metal skins"
      ],
      [
        "22 ga",
        "0.0299 in",
        "0.0253 in",
        "light guards"
      ],
      [
        "20 ga",
        "0.0359 in",
        "0.0320 in",
        "panels / covers"
      ],
      [
        "18 ga",
        "0.0478 in",
        "0.0403 in",
        "machine guards"
      ],
      [
        "16 ga",
        "0.0598 in",
        "0.0508 in",
        "strong guards / brackets"
      ],
      [
        "14 ga",
        "0.0747 in",
        "0.0641 in",
        "brackets / cabinets"
      ],
      [
        "12 ga",
        "0.1046 in",
        "0.0808 in",
        "heavy guards / frames"
      ],
      [
        "11 ga",
        "0.1196 in",
        "0.0907 in",
        "industrial guards"
      ],
      [
        "10 ga",
        "0.1345 in",
        "0.1019 in",
        "heavy brackets"
      ],
      [
        "9 ga",
        "0.1495 in",
        "0.1144 in",
        "floor plates / supports"
      ],
      [
        "8 ga",
        "0.1644 in",
        "0.1285 in",
        "heavy supports"
      ],
      [
        "7 ga",
        "0.1793 in",
        "0.1443 in",
        "heavy fabrication"
      ],
      [
        "6 ga",
        "0.1943 in",
        "0.1620 in",
        "structural plate range"
      ],
      [
        "5 ga",
        "0.2092 in",
        "0.1819 in",
        "heavy plate range"
      ],
      [
        "4 ga",
        "0.2242 in",
        "0.2043 in",
        "heavy plate range"
      ],
      [
        "3 ga",
        "0.2391 in",
        "0.2294 in",
        "heavy plate range"
      ],
      [
        "1/4 plate",
        "0.2500 in",
        "0.2500 in",
        "plate, not gauge"
      ]
    ]
  },
  {
    "title": "O-Ring Size Reference",
    "note": "Confirm AS568 size, material, durometer, groove design, pressure, and fluid compatibility.",
    "columns": [
      "AS568",
      "ID",
      "CS",
      "Common use note"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "-110": "Very common",
      "-112": "Very common",
      "-114": "Very common",
      "-212": "Very common",
      "-214": "Very common",
      "-216": "Easy mix-up",
      "-325": "High consequence"
    },
    "rowTeaching": {
      "-110": {
        "mechanic101": "AS568 -110 is a common small cross-section O-ring size used around fittings and plugs",
        "commonConfusion": "O-ring dash size proves dimensions only; material and hardness decide whether it survives the fluid and temperature.",
        "seniorTechNote": "Match dash number, material, durometer, and groove application instead of grabbing a black O-ring that looks close.",
        "verifyBy": "dash size + material"
      },
      "-112": {
        "mechanic101": "-112 is a common fitting and valve-plug O-ring size in many shop assortments",
        "commonConfusion": "Nearby dash sizes can stretch into place and still leak, extrude, or fail early.",
        "seniorTechNote": "If an O-ring had to stretch hard or sits loose, stop and verify the dash size before assembly.",
        "verifyBy": "measure ID + CS"
      },
      "-114": {
        "mechanic101": "-114 appears often on hydraulic fittings and small covers",
        "commonConfusion": "NBR, FKM, and EPDM can all be black depending on supplier, so color is not enough.",
        "seniorTechNote": "Identify material for oil, heat, coolant, steam, or chemical exposure before installing the seal.",
        "verifyBy": "material bag + fluid"
      },
      "-212": {
        "mechanic101": "-212 is a common 0.139 inch cross-section O-ring used in hydraulic glands and fittings",
        "commonConfusion": "A thicker cross-section series changes squeeze and groove fit, not just diameter.",
        "seniorTechNote": "For glands, confirm groove dimensions, pressure, backup ring needs, and dynamic vs static service.",
        "verifyBy": "groove + pressure"
      },
      "-214": {
        "mechanic101": "-214 is a familiar hydraulic and pump-cover O-ring size in many maintenance kits",
        "commonConfusion": "A common kit size may fit many grooves visually but still be wrong for squeeze or material.",
        "seniorTechNote": "Keep old seals for comparison, but verify with the gland drawing or measured groove before reassembly.",
        "verifyBy": "old seal + groove"
      },
      "-216": {
        "mechanic101": "-216 is close enough to nearby sizes that mix-ups can happen in unlabeled assortments",
        "commonConfusion": "O-rings stored loose in bins lose traceability for material, hardness, and exact dash number.",
        "seniorTechNote": "Use labeled bags for seals. Unknown loose O-rings should not go into hydraulic or critical service.",
        "verifyBy": "labeled kit"
      },
      "-325": {
        "mechanic101": "-325 is a larger O-ring size where wrong material, squeeze, or backup support can create bigger leaks",
        "commonConfusion": "Large O-rings can be pinched or twisted during assembly and still look seated.",
        "seniorTechNote": "For large seals, lubricate correctly, prevent twist, inspect groove damage, and follow assembly sequence.",
        "verifyBy": "groove inspection"
      }
    },
    "rows": [
      [
        "-006",
        "0.114 in",
        "0.070 in",
        "small pneumatic fittings"
      ],
      [
        "-008",
        "0.176 in",
        "0.070 in",
        "small valves"
      ],
      [
        "-010",
        "0.239 in",
        "0.070 in",
        "instrument fittings"
      ],
      [
        "-012",
        "0.364 in",
        "0.070 in",
        "small hydraulic plugs"
      ],
      [
        "-014",
        "0.489 in",
        "0.070 in",
        "small ports"
      ],
      [
        "-016",
        "0.614 in",
        "0.070 in",
        "small cylinders"
      ],
      [
        "-110",
        "0.362 in",
        "0.103 in",
        "ORB/fitting seals"
      ],
      [
        "-112",
        "0.487 in",
        "0.103 in",
        "fittings / valve plugs"
      ],
      [
        "-114",
        "0.612 in",
        "0.103 in",
        "hydraulic fittings"
      ],
      [
        "-116",
        "0.737 in",
        "0.103 in",
        "larger fittings"
      ],
      [
        "-118",
        "0.862 in",
        "0.103 in",
        "ports and covers"
      ],
      [
        "-120",
        "0.987 in",
        "0.103 in",
        "covers / plugs"
      ],
      [
        "-210",
        "0.734 in",
        "0.139 in",
        "cylinder glands"
      ],
      [
        "-212",
        "0.859 in",
        "0.139 in",
        "hydraulic glands"
      ],
      [
        "-214",
        "0.984 in",
        "0.139 in",
        "pumps / covers"
      ],
      [
        "-216",
        "1.109 in",
        "0.139 in",
        "covers / housings"
      ],
      [
        "-218",
        "1.234 in",
        "0.139 in",
        "larger glands"
      ],
      [
        "-222",
        "1.484 in",
        "0.139 in",
        "larger covers"
      ],
      [
        "-325",
        "1.975 in",
        "0.210 in",
        "large cylinder seals"
      ],
      [
        "-330",
        "2.475 in",
        "0.210 in",
        "large housings"
      ]
    ]
  },
  {
    "title": "Photoeye Setup Reference",
    "note": "Confirm sensor mode, target, environment, wiring, response time, and teach procedure.",
    "columns": [
      "Mode",
      "Best for",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Through-beam": "Very common",
      "Retroreflective": "Very common",
      "Polarized retro": "Easy mix-up",
      "Diffuse": "Easy mix-up",
      "Background suppression": "Very common",
      "Clear object": "High consequence",
      "Dark-on": "Easy mix-up",
      "Teach button": "Very common"
    },
    "rowTeaching": {
      "Through-beam": {
        "mechanic101": "through-beam uses separate emitter and receiver, making it strong for longer ranges and reliable beam-break detection",
        "commonConfusion": "Through-beam is sometimes confused with retroreflective because both use a beam path, but through-beam needs wiring and alignment for two powered devices.",
        "seniorTechNote": "If it fails intermittently, check emitter power, receiver alignment, vibration, lens dirt, and whether the beam is being partially blocked.",
        "verifyBy": "block beam + check LEDs"
      },
      "Retroreflective": {
        "mechanic101": "retroreflective mode sends light to a reflector and watches for the return beam",
        "commonConfusion": "Reflector damage, dirt, angle, and shiny targets can look like a bad sensor or bad input card.",
        "seniorTechNote": "Clean and square the reflector before touching sensitivity. A weak reflector return can pass empty but fail when the line vibrates.",
        "verifyBy": "clean reflector + align"
      },
      "Polarized retro": {
        "mechanic101": "polarized retroreflective sensors help reject mirror-like reflections from shiny targets",
        "commonConfusion": "A standard retroreflective sensor can false-trigger on shiny metal or film where polarized retro may be the intended choice.",
        "seniorTechNote": "When shiny material is involved, confirm whether the installed sensor is polarized and whether the reflector matches the sensor family.",
        "verifyBy": "test shiny target"
      },
      "Diffuse": {
        "mechanic101": "diffuse mode detects light reflected directly from the target, so target color, texture, and distance matter",
        "commonConfusion": "A dark or angled target can disappear to diffuse sensing even though the sensor is powered and wired correctly.",
        "seniorTechNote": "Do not tune diffuse sensors against your hand and assume the product is solved. Teach or adjust against the real target at real speed.",
        "verifyBy": "test real target"
      },
      "Background suppression": {
        "mechanic101": "background suppression uses distance behavior to detect a target while ignoring something behind it",
        "commonConfusion": "If taught at the wrong distance, the sensor may ignore the target or see the background as the target.",
        "seniorTechNote": "Set background suppression with the actual target and background in place. Distance setup is the job, not a final tweak.",
        "verifyBy": "teach target distance"
      },
      "Clear object": {
        "mechanic101": "clear-object detection needs a sensor mode and setup intended for transparent or low-contrast materials",
        "commonConfusion": "Transparent film or bottles can pass through ordinary photoeyes because they do not block enough light.",
        "seniorTechNote": "If clear material matters, verify the sensor model, reflector, teach method, and repeatability with real product, not a substitute target.",
        "verifyBy": "test transparent product"
      },
      "Dark-on": {
        "mechanic101": "dark-on means the output turns on when received light is absent or blocked",
        "commonConfusion": "Dark-on/light-on logic is easy to reverse and can make the sensor look failed when the input simply changes state opposite of expectation.",
        "seniorTechNote": "Before rewiring, watch the input bit while blocking and unblocking the beam. Confirm logic mode against the program expectation.",
        "verifyBy": "block beam + watch input"
      },
      "Teach button": {
        "mechanic101": "the teach button sets a threshold or mode on many modern sensors using the real target/background condition",
        "commonConfusion": "A locked teach button, wrong teach sequence, or taught-empty condition can look like a dead sensor.",
        "seniorTechNote": "Record the starting state before teaching. Use the model-specific sequence and verify both present and absent conditions afterward.",
        "verifyBy": "teach + test both states"
      }
    },
    "rows": [
      [
        "Through-beam",
        "long range",
        "reliable detection",
        "two devices"
      ],
      [
        "Retroreflective",
        "medium range",
        "carton/object detection",
        "reflector"
      ],
      [
        "Polarized retro",
        "shiny targets",
        "rejects mirror reflections",
        "alignment"
      ],
      [
        "Diffuse",
        "short range",
        "no reflector needed",
        "target color"
      ],
      [
        "Background suppression",
        "fixed distance",
        "ignores background",
        "teach distance"
      ],
      [
        "Clear object",
        "bottles/film",
        "transparent targets",
        "sensitivity"
      ],
      [
        "Fiber optic",
        "tight spaces",
        "small target detection",
        "fiber damage"
      ],
      [
        "Laser",
        "small spot",
        "precise edge detection",
        "eye safety"
      ],
      [
        "Dark-on",
        "output mode",
        "output on blocked beam",
        "logic setting"
      ],
      [
        "Light-on",
        "output mode",
        "output on received light",
        "logic setting"
      ],
      [
        "Teach button",
        "setup input",
        "threshold setup",
        "lockout setting"
      ],
      [
        "Sensitivity pot",
        "manual adjust",
        "older sensors",
        "overgain"
      ]
    ]
  }
];

  if (typeof window !== "undefined") {
    window.MaintainOpsReferenceData = window.MaintainOpsReferenceData || {};
    window.MaintainOpsReferenceData["materials-shop"] = MATERIALS_SHOP_REFERENCE_SECTIONS;
  }

  if (typeof module !== "undefined") {
    module.exports = { MATERIALS_SHOP_REFERENCE_SECTIONS };
  }
})();
