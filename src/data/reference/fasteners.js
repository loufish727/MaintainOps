// fasteners shop reference chart data. Kept separate so reference content can grow without recreating a data monolith.
(function () {
  const FASTENER_REFERENCE_SECTIONS = [
  {
    "title": "Drill / Tap Quick Reference",
    "note": "Verify material, thread class, and print requirements before drilling or tapping.",
    "columns": [
      "Thread",
      "Tap drill",
      "Clearance",
      "Common use note"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "#6-32": "Very common",
      "#10-24": "Easy mix-up",
      "#10-32": "Easy mix-up",
      "1/4-20": "Very common",
      "1/4-28": "Easy mix-up",
      "3/8-16": "Very common",
      "1/2-13": "High consequence",
      "M6 x 1.0": "Very common"
    },
    "rowTeaching": {
      "#6-32": {
        "mechanic101": "#6-32 is a very common machine-screw thread around electrical boxes, covers, and light panels",
        "commonConfusion": "Small numbered screws are easy to mix up by sight. #6-32 and #8-32 can both look close when threads are dirty or painted.",
        "seniorTechNote": "Use a thread gauge or known nut before drilling. A wrong small tap drill can break the tap before the mistake is obvious.",
        "verifyBy": "gauge thread + drill chart"
      },
      "#10-24": {
        "mechanic101": "#10-24 is the coarse #10 thread; #10-32 is the fine #10 thread",
        "commonConfusion": "#10-24 and #10-32 share the same screw number but require different tap drills and matching nuts.",
        "seniorTechNote": "Do not choose by screw diameter alone. Count pitch or use a thread gauge before tapping a #10 hole.",
        "verifyBy": "count threads + gauge"
      },
      "#10-32": {
        "mechanic101": "#10-32 is the fine #10 thread often used where finer adjustment or better vibration resistance is wanted",
        "commonConfusion": "A #10-32 screw may start into a #10-24 nut or tapped hole just enough to damage threads.",
        "seniorTechNote": "If a #10 fastener feels wrong after a turn or two, stop and verify pitch instead of forcing it.",
        "verifyBy": "thread gauge + nut"
      },
      "1/4-20": {
        "mechanic101": "1/4-20 is one of the most common coarse machine threads in shop fixtures, brackets, and guards",
        "commonConfusion": "1/4-20 and 1/4-28 share diameter, but the fine thread needs a different tap drill and mating hardware.",
        "seniorTechNote": "Treat 1/4-20 as familiar, not automatic. Verify thread pitch and material before choosing drill size and tap style.",
        "verifyBy": "verify pitch + material"
      },
      "1/4-28": {
        "mechanic101": "1/4-28 is the fine-thread version of 1/4 inch hardware",
        "commonConfusion": "Fine threads are easy to cross with coarse-thread stock when bins or old hardware are mixed.",
        "seniorTechNote": "Fine-thread tapped holes are less forgiving. Confirm pitch, thread depth, and required engagement before cutting.",
        "verifyBy": "gauge pitch + depth"
      },
      "3/8-16": {
        "mechanic101": "3/8-16 is a common coarse thread for frames, motor feet, guards, and equipment brackets",
        "commonConfusion": "3/8-16 can be confused with nearby metric hardware such as M10 when the bolt is loose in hand.",
        "seniorTechNote": "When repairing mixed equipment, check inch vs metric before drilling or retapping a damaged 3/8 hole.",
        "verifyBy": "measure OD + pitch"
      },
      "1/2-13": {
        "mechanic101": "1/2-13 is a common coarse thread for heavier brackets, bases, and structural shop fixtures",
        "commonConfusion": "Large familiar bolts invite shortcuts, but thread class, grade, engagement, and material still decide whether the joint is acceptable.",
        "seniorTechNote": "For loaded joints, do not let a tap chart replace the print, OEM spec, or engineering requirement.",
        "verifyBy": "print + thread gauge"
      },
      "M6 x 1.0": {
        "mechanic101": "M6 x 1.0 is a very common metric machine thread for guards, covers, sensors, and small brackets",
        "commonConfusion": "M6 hardware can be confused with 1/4 inch hardware by size, but pitch and diameter are not the same.",
        "seniorTechNote": "Metric repairs fail quietly when inch hardware is forced in. Gauge the thread before chasing or retapping.",
        "verifyBy": "metric gauge + caliper"
      }
    },
    "rows": [
      [
        "#1-64",
        "#53",
        "#48 / #46",
        "tiny machine screws"
      ],
      [
        "#2-56",
        "#50",
        "#43 / #41",
        "small covers and brackets"
      ],
      [
        "#4-40",
        "#43",
        "#32 / #30",
        "electronics panels"
      ],
      [
        "#6-32",
        "#36",
        "#27 / #25",
        "electrical boxes and covers"
      ],
      [
        "#8-32",
        "#29",
        "#18 / #16",
        "machine guards and panels"
      ],
      [
        "#10-24",
        "#25",
        "#9 / #7",
        "sheet-metal brackets"
      ],
      [
        "#10-32",
        "#21",
        "#9 / #7",
        "finer machine-screw work"
      ],
      [
        "1/4-20",
        "#7",
        "F / H",
        "general shop fixtures"
      ],
      [
        "1/4-28",
        "#3",
        "F / H",
        "fine-thread adjustment points"
      ],
      [
        "5/16-18",
        "F",
        "P / Q",
        "light equipment mounts"
      ],
      [
        "5/16-24",
        "I",
        "P / Q",
        "fine-thread clamps"
      ],
      [
        "3/8-16",
        "5/16",
        "W / X",
        "motor bases and frames"
      ],
      [
        "3/8-24",
        "Q",
        "W / X",
        "fine-thread machinery"
      ],
      [
        "7/16-14",
        "U",
        "29/64 / 15/32",
        "heavier equipment mounts"
      ],
      [
        "1/2-13",
        "27/64",
        "17/32 / 35/64",
        "structural brackets"
      ],
      [
        "1/2-20",
        "29/64",
        "17/32 / 35/64",
        "fine-thread machinery"
      ],
      [
        "M4 x 0.7",
        "3.3 mm",
        "4.5 / 4.8 mm",
        "small metric panels"
      ],
      [
        "M5 x 0.8",
        "4.2 mm",
        "5.5 / 5.8 mm",
        "metric covers"
      ],
      [
        "M6 x 1.0",
        "5.0 mm",
        "6.6 / 7.0 mm",
        "metric machine guards"
      ],
      [
        "M8 x 1.25",
        "6.8 mm",
        "9.0 / 10.0 mm",
        "metric equipment mounts"
      ]
    ]
  },
  {
    "title": "Torque Reference",
    "note": "Reference only. Always follow OEM torque, bolt grade, lubrication, thread engagement, and application requirements.",
    "columns": [
      "Bolt",
      "Grade 5 dry",
      "Grade 8 dry",
      "Note"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "1/4-20": "Very common",
      "5/16-18": "Very common",
      "3/8-16": "Very common",
      "1/2-13": "High consequence",
      "5/8-11": "High consequence",
      "3/4-10": "Spec required"
    },
    "rowTeaching": {
      "1/4-20": {
        "mechanic101": "1/4-20 torque values are small enough that over-tightening can strip threads or crush light brackets quickly",
        "commonConfusion": "Small bolts feel harmless, but dry vs lubricated threads and soft base material can change the real clamping result.",
        "seniorTechNote": "Use the OEM spec for assemblies. A general torque chart is a fallback, not permission to tighten by feel.",
        "verifyBy": "OEM spec + grade"
      },
      "5/16-18": {
        "mechanic101": "5/16-18 is common on light equipment mounts and brackets where thread condition matters",
        "commonConfusion": "Rust, reused hardware, mixed grades, and lubricated threads can make a chart value misleading.",
        "seniorTechNote": "When the joint matters, identify grade, thread condition, lubrication, and base material before applying torque.",
        "verifyBy": "grade + thread condition"
      },
      "3/8-16": {
        "mechanic101": "3/8-16 is common around motor feet, frames, and machine brackets",
        "commonConfusion": "Grade 5 and Grade 8 values are not interchangeable, and lubrication changes clamp load.",
        "seniorTechNote": "If a machine mount keeps loosening, check alignment, vibration, washer stack, thread engagement, and torque procedure.",
        "verifyBy": "grade + lube state"
      },
      "1/2-13": {
        "mechanic101": "1/2-13 is a common heavier fastener where torque mistakes can damage parts or leave a joint loose",
        "commonConfusion": "A familiar half-inch bolt may be structural, machine-grade, stainless, or unknown hardware with different requirements.",
        "seniorTechNote": "Do not use one memory number for every 1/2 inch bolt. Grade, joint type, lubrication, and OEM spec decide.",
        "verifyBy": "marking + OEM spec"
      },
      "5/8-11": {
        "mechanic101": "5/8-11 bolts are often used on larger mounts where clamp load and thread engagement matter",
        "commonConfusion": "High torque can feel like the solution to loosening, but it may hide vibration, poor fit, bad washers, or stretched hardware.",
        "seniorTechNote": "For large fasteners, inspect the joint and hardware before retorquing. Reused or stretched bolts may not behave like chart values.",
        "verifyBy": "joint inspection"
      },
      "3/4-10": {
        "mechanic101": "3/4-10 torque is high enough that wrong grade, lubrication, or sequence can create serious joint problems",
        "commonConfusion": "Large bolt torque is often treated as brute force, but sequence, lubrication, washer condition, and thread engagement control clamp load.",
        "seniorTechNote": "Use a calibrated tool and the actual procedure for large or critical fasteners. General charts are only orientation.",
        "verifyBy": "procedure + calibrated tool"
      }
    },
    "rows": [
      [
        "#10-24",
        "3 ft-lb",
        "4 ft-lb",
        "small covers and brackets"
      ],
      [
        "#10-32",
        "3 ft-lb",
        "4 ft-lb",
        "small machine screws"
      ],
      [
        "1/4-20",
        "8 ft-lb",
        "12 ft-lb",
        "guards and light brackets"
      ],
      [
        "1/4-28",
        "10 ft-lb",
        "14 ft-lb",
        "fine-thread small brackets"
      ],
      [
        "5/16-18",
        "17 ft-lb",
        "25 ft-lb",
        "light equipment mounts"
      ],
      [
        "5/16-24",
        "19 ft-lb",
        "27 ft-lb",
        "fine-thread clamps"
      ],
      [
        "3/8-16",
        "31 ft-lb",
        "44 ft-lb",
        "motor feet / frames"
      ],
      [
        "3/8-24",
        "35 ft-lb",
        "49 ft-lb",
        "fine-thread machinery"
      ],
      [
        "7/16-14",
        "49 ft-lb",
        "70 ft-lb",
        "medium equipment mounts"
      ],
      [
        "7/16-20",
        "55 ft-lb",
        "78 ft-lb",
        "fine-thread equipment mounts"
      ],
      [
        "1/2-13",
        "75 ft-lb",
        "105 ft-lb",
        "structural brackets / bases"
      ],
      [
        "1/2-20",
        "85 ft-lb",
        "120 ft-lb",
        "fine-thread base fasteners"
      ],
      [
        "9/16-12",
        "110 ft-lb",
        "155 ft-lb",
        "heavier bases"
      ],
      [
        "9/16-18",
        "120 ft-lb",
        "170 ft-lb",
        "fine-thread heavier bases"
      ],
      [
        "5/8-11",
        "150 ft-lb",
        "210 ft-lb",
        "large machine mounts"
      ],
      [
        "5/8-18",
        "170 ft-lb",
        "240 ft-lb",
        "fine-thread large mounts"
      ],
      [
        "3/4-10",
        "265 ft-lb",
        "375 ft-lb",
        "heavy frames / anchors"
      ],
      [
        "3/4-16",
        "295 ft-lb",
        "420 ft-lb",
        "fine-thread heavy frames"
      ],
      [
        "7/8-9",
        "430 ft-lb",
        "605 ft-lb",
        "very heavy equipment"
      ],
      [
        "1-8",
        "640 ft-lb",
        "910 ft-lb",
        "large anchor/base fasteners"
      ]
    ]
  },
  {
    "title": "Fitting / Thread Reference",
    "note": "Confirm thread form, sealing face, angle, pitch, and pressure rating before replacing fittings.",
    "columns": [
      "Type",
      "Seal style",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "NPT": "Very common",
      "NPTF": "Easy mix-up",
      "BSPP": "Easy mix-up",
      "JIC 37": "Very common",
      "SAE 45": "Easy mix-up",
      "ORB": "Very common",
      "ORFS": "High consequence",
      "DIN light": "Spec required"
    },
    "rowTeaching": {
      "NPT": {
        "mechanic101": "NPT is a tapered pipe thread that seals on thread interference with sealant or tape",
        "commonConfusion": "NPT is often mistaken for any tapered-looking pipe thread, but BSPT and other forms can be close enough to damage parts.",
        "seniorTechNote": "Measure thread OD and pitch, then identify sealing method before forcing a fitting into a port.",
        "verifyBy": "thread gauge + seal style"
      },
      "NPTF": {
        "mechanic101": "NPTF is a dryseal tapered pipe thread used in some hydraulic and fuel fittings",
        "commonConfusion": "NPT and NPTF look similar, but thread form and sealing expectations can differ.",
        "seniorTechNote": "When replacing hydraulic pipe adapters, match the exact thread callout and inspect damaged threads before reuse.",
        "verifyBy": "part marking + gauge"
      },
      "BSPP": {
        "mechanic101": "BSPP is a parallel British pipe thread that usually seals with a washer, bonded seal, or O-ring face",
        "commonConfusion": "BSPP can be confused with NPT or metric threads when only diameter is checked.",
        "seniorTechNote": "Imported equipment deserves a thread gauge and sealing-face check before ordering adapters.",
        "verifyBy": "pitch + seal washer"
      },
      "JIC 37": {
        "mechanic101": "JIC fittings seal on a 37 degree metal flare, not on the threads",
        "commonConfusion": "JIC 37 and SAE 45 flare can look similar but are not the same sealing angle.",
        "seniorTechNote": "If a flare fitting leaks, inspect seat angle, cone damage, alignment, and tube flare before tightening harder.",
        "verifyBy": "flare angle + seat"
      },
      "SAE 45": {
        "mechanic101": "SAE 45 degree flare is common in refrigeration, fuel, and older systems, not standard JIC hydraulic flare",
        "commonConfusion": "A 45 degree flare may thread together with a 37 degree flare but seal poorly.",
        "seniorTechNote": "Do not identify flare fittings by thread alone. Match flare angle and application family.",
        "verifyBy": "flare gauge"
      },
      "ORB": {
        "mechanic101": "ORB uses straight threads with an O-ring at the boss to seal the port",
        "commonConfusion": "ORB threads can look like JIC/SAE threads, but the seal is the O-ring, not a flare face.",
        "seniorTechNote": "For ORB leaks, inspect O-ring size/material, backup washer, port chamfer, and fitting shoulder.",
        "verifyBy": "O-ring + port face"
      },
      "ORFS": {
        "mechanic101": "ORFS uses a flat face with an O-ring and is common where leak control matters",
        "commonConfusion": "ORFS can be mistaken for a simple flat fitting if the O-ring groove or face damage is missed.",
        "seniorTechNote": "Keep ORFS faces clean and protected. A nicked face or wrong O-ring can leak even with correct threads.",
        "verifyBy": "face + O-ring groove"
      },
      "DIN light": {
        "mechanic101": "DIN light-series fittings use metric tube and bite-sleeve style identification",
        "commonConfusion": "DIN light and DIN heavy may share similar-looking parts but differ by tube series and pressure application.",
        "seniorTechNote": "For metric hydraulic tube, identify tube OD, series, nut, sleeve, and seat before replacing one component.",
        "verifyBy": "tube OD + series"
      }
    },
    "rows": [
      [
        "NPT",
        "tapered thread",
        "air, water, pipe fittings",
        "thread sealant"
      ],
      [
        "NPTF",
        "dryseal tapered",
        "hydraulic pipe adapters",
        "thread damage"
      ],
      [
        "BSPT",
        "tapered thread",
        "import pipe fittings",
        "not NPT"
      ],
      [
        "BSPP",
        "parallel thread",
        "import hydraulic ports",
        "bonded seal"
      ],
      [
        "JIC 37",
        "metal flare",
        "hydraulic hose adapters",
        "flare angle"
      ],
      [
        "SAE 45",
        "metal flare",
        "refrigeration / older fuel",
        "not JIC"
      ],
      [
        "ORB",
        "O-ring boss",
        "hydraulic valve ports",
        "O-ring condition"
      ],
      [
        "ORFS",
        "flat face O-ring",
        "leak-sensitive hydraulics",
        "face seal"
      ],
      [
        "JIS 30",
        "metric flare",
        "Japanese equipment",
        "seat angle"
      ],
      [
        "DIN light",
        "metric bite sleeve",
        "European hydraulics",
        "tube series"
      ],
      [
        "DIN heavy",
        "metric bite sleeve",
        "high-pressure metric tube",
        "tube series"
      ],
      [
        "Compression",
        "ferrule",
        "instrument air / copper tube",
        "tube OD"
      ],
      [
        "Push-to-connect",
        "grip seal",
        "pneumatic tubing",
        "tube cut quality"
      ],
      [
        "Camlock",
        "gasket face",
        "temporary hose transfer",
        "gasket material"
      ],
      [
        "Tri-clamp",
        "gasket clamp",
        "food/process piping",
        "gasket material"
      ],
      [
        "Flange 150",
        "gasket flange",
        "low-pressure pipe",
        "bolt pattern"
      ],
      [
        "Flange 300",
        "gasket flange",
        "higher-pressure pipe",
        "rating class"
      ],
      [
        "Garden hose",
        "gasket thread",
        "washdown / utility water",
        "washer"
      ],
      [
        "AN flare",
        "37 flare",
        "fuel/oil lines",
        "same angle as JIC"
      ],
      [
        "Metric port",
        "thread + washer",
        "import machines",
        "pitch check"
      ]
    ]
  },
  {
    "title": "Fastener Grade Marking Reference",
    "note": "Confirm markings, material, coating, and spec. Do not mix unknown fasteners into critical joints.",
    "columns": [
      "Marking",
      "Approx class",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "No lines": "Easy mix-up",
      "3 radial lines": "Very common",
      "6 radial lines": "High consequence",
      "A325": "Spec required",
      "8.8": "Very common",
      "10.9": "High consequence",
      "12.9": "High consequence",
      "A2-70": "Easy mix-up",
      "Unknown": "High consequence"
    },
    "rowTeaching": {
      "No lines": {
        "mechanic101": "Unmarked inch bolts are commonly treated as low-strength hardware unless documentation proves otherwise",
        "commonConfusion": "No lines does not mean safe for any light-looking job; it means the strength is not proven by a grade mark.",
        "seniorTechNote": "Do not put unmarked hardware into machinery joints where grade, clamp load, or failure consequence matters.",
        "verifyBy": "replace with known grade"
      },
      "3 radial lines": {
        "mechanic101": "Three radial head lines identify SAE Grade 5-style medium-strength inch bolts",
        "commonConfusion": "Grade 5 is common general machinery hardware, but it is not automatically correct for every replacement.",
        "seniorTechNote": "Match grade, length, thread, coating, and nut/washer system instead of only counting head lines.",
        "verifyBy": "marking + joint spec"
      },
      "6 radial lines": {
        "mechanic101": "Six radial head lines identify SAE Grade 8-style high-strength inch bolts",
        "commonConfusion": "Stronger is not always safer; Grade 8 can be wrong where ductility, corrosion, joint design, or OEM spec calls for something else.",
        "seniorTechNote": "Do not upgrade fastener grade casually. Match the joint design and torque spec before changing strength class.",
        "verifyBy": "OEM spec + torque"
      },
      "A325": {
        "mechanic101": "A325 markings identify structural bolting families, not ordinary bin bolts",
        "commonConfusion": "Structural bolts can look like heavy hardware, but installation, nut, washer, and inspection requirements are part of the system.",
        "seniorTechNote": "Treat A325 as a structural-spec item. Follow the drawing/specification rather than substituting general Grade 5 or Grade 8 hardware.",
        "verifyBy": "structural spec"
      },
      "8.8": {
        "mechanic101": "8.8 is a common metric property class often seen in machinery and automotive-style hardware",
        "commonConfusion": "Metric class numbers are not SAE radial lines, and similar sizes can be mixed with inch hardware.",
        "seniorTechNote": "When replacing metric hardware, match property class, pitch, length, coating, and the OEM torque requirement.",
        "verifyBy": "class + metric pitch"
      },
      "10.9": {
        "mechanic101": "10.9 is a higher-strength metric property class used where the joint was designed for it",
        "commonConfusion": "A 10.9 bolt is not a universal upgrade for 8.8 or stainless hardware.",
        "seniorTechNote": "Changing metric property class can change clamp load, failure mode, and torque. Follow the equipment spec.",
        "verifyBy": "OEM class + torque"
      },
      "12.9": {
        "mechanic101": "12.9 is a high-strength metric class common on socket head cap screws and critical machinery joints",
        "commonConfusion": "High-strength socket head hardware can be brittle or misused if substituted without understanding the joint.",
        "seniorTechNote": "For 12.9 hardware, verify exact pitch, engagement, lubrication, and torque procedure before replacement.",
        "verifyBy": "class + procedure"
      },
      "A2-70": {
        "mechanic101": "A2-70 is common stainless hardware, often 304-family corrosion resistant but not equal to high-strength alloy bolts",
        "commonConfusion": "Stainless is often chosen for corrosion, then incorrectly treated like Grade 5, Grade 8, or 8.8 strength hardware.",
        "seniorTechNote": "Stainless substitutions need strength, galling, corrosion, and anti-seize review before use in machinery joints.",
        "verifyBy": "material + strength"
      },
      "Unknown": {
        "mechanic101": "Unknown fasteners have unknown strength, material, coating, and history",
        "commonConfusion": "A bolt that fits the hole is not proven safe if the grade, material, or prior use is unknown.",
        "seniorTechNote": "For critical or loaded assemblies, replace unknown hardware with the specified fastener instead of guessing.",
        "verifyBy": "discard or identify"
      }
    },
    "rows": [
      [
        "No lines",
        "SAE Grade 2",
        "light-duty hardware",
        "low strength"
      ],
      [
        "3 radial lines",
        "SAE Grade 5",
        "general machinery bolts",
        "medium strength"
      ],
      [
        "6 radial lines",
        "SAE Grade 8",
        "high-strength machinery",
        "brittleness risk"
      ],
      [
        "A325",
        "structural",
        "structural steel bolting",
        "joint spec"
      ],
      [
        "A490",
        "structural high strength",
        "structural steel bolting",
        "joint spec"
      ],
      [
        "8.8",
        "metric class 8.8",
        "metric machinery bolts",
        "common metric"
      ],
      [
        "10.9",
        "metric class 10.9",
        "higher-strength metric",
        "torque spec"
      ],
      [
        "12.9",
        "metric class 12.9",
        "socket head cap screws",
        "critical torque"
      ],
      [
        "A2-70",
        "304 stainless",
        "corrosion resistant hardware",
        "lower strength"
      ],
      [
        "A4-80",
        "316 stainless",
        "wet/corrosive hardware",
        "galling"
      ],
      [
        "B7",
        "alloy stud",
        "flanges / pressure joints",
        "nut match"
      ],
      [
        "2H",
        "heavy hex nut",
        "B7 stud nut",
        "stud compatibility"
      ],
      [
        "L9",
        "high strength",
        "specialty high-strength bolts",
        "spec required"
      ],
      [
        "F593",
        "stainless bolt",
        "stainless machine fasteners",
        "alloy class"
      ],
      [
        "F594",
        "stainless nut",
        "stainless nut pairing",
        "alloy class"
      ],
      [
        "5.8",
        "metric class 5.8",
        "light metric hardware",
        "lower strength"
      ],
      [
        "6.8",
        "metric class 6.8",
        "medium metric hardware",
        "less common"
      ],
      [
        "Brass",
        "non-ferrous",
        "electrical/corrosion uses",
        "soft material"
      ],
      [
        "Aluminum",
        "lightweight",
        "low-load assemblies",
        "thread damage"
      ],
      [
        "Unknown",
        "do not rate",
        "replace with known grade",
        "do not trust"
      ]
    ]
  },
  {
    "title": "Threadlocker / Retaining Compound Reference",
    "note": "Confirm manufacturer, strength, temperature, gap, material, and whether future disassembly is required.",
    "columns": [
      "Color / ID",
      "Strength",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Blue 242/243": "Very common",
      "Red 271": "High consequence",
      "Green 290": "Easy mix-up",
      "Green 609": "Spec required",
      "Anti-seize": "Common confusion"
    },
    "rowTeaching": {
      "Blue 242/243": {
        "mechanic101": "Blue threadlocker is commonly used for medium-strength bolts that may need service later",
        "commonConfusion": "Color is a clue, but product number, oil tolerance, and cure conditions still matter.",
        "seniorTechNote": "Clean threads and use the specified product family when vibration is the reason for failure.",
        "verifyBy": "product number + cure"
      },
      "Red 271": {
        "mechanic101": "Red threadlocker is high strength and often needs heat for removal",
        "commonConfusion": "Using high-strength product where service is expected can turn a simple repair into broken hardware.",
        "seniorTechNote": "Before using red, confirm the joint is intended to be permanent or heat-removable in that location.",
        "verifyBy": "service requirement"
      },
      "Green 290": {
        "mechanic101": "Green 290 is a wicking threadlocker used after fasteners are assembled",
        "commonConfusion": "Green products can be wicking or retaining compounds; the number matters more than color.",
        "seniorTechNote": "Use wicking product only where capillary action and cleanliness make sense.",
        "verifyBy": "product ID"
      },
      "Green 609": {
        "mechanic101": "Green 609 is a retaining compound for slip-fit cylindrical parts like bushings or bearings",
        "commonConfusion": "Retaining compound is not regular bolt threadlocker and depends heavily on gap and fit.",
        "seniorTechNote": "For worn housings or shafts, verify gap, surface condition, load, and temperature before relying on compound.",
        "verifyBy": "measure fit gap"
      },
      "Anti-seize": {
        "mechanic101": "Anti-seize helps prevent galling and corrosion but is not a threadlocker",
        "commonConfusion": "Lubricated threads change torque-tension relationship and can over-stretch hardware if torque is not adjusted.",
        "seniorTechNote": "Use anti-seize only where specified or appropriate, and account for torque changes on critical joints.",
        "verifyBy": "torque spec note"
      }
    },
    "rows": [
      [
        "Purple 222",
        "low",
        "small screws / adjustment screws",
        "small fasteners"
      ],
      [
        "Blue 242/243",
        "medium",
        "general bolts that need service",
        "oil tolerance"
      ],
      [
        "Red 271",
        "high",
        "permanent studs/bolts",
        "heat to remove"
      ],
      [
        "Green 290",
        "wicking",
        "assembled fasteners",
        "cleanliness"
      ],
      [
        "Green 609",
        "retaining",
        "bearings/bushings",
        "slip fit"
      ],
      [
        "Green 620",
        "high-temp retaining",
        "sleeves/gears",
        "gap"
      ],
      [
        "Primer",
        "activator",
        "stainless/inactive metals",
        "cure speed"
      ],
      [
        "Anti-seize",
        "not threadlocker",
        "hot/corrosive fasteners",
        "torque changes"
      ],
      [
        "Blue gel",
        "medium",
        "vertical/overhead fasteners",
        "product family"
      ],
      [
        "Orange hybrid",
        "medium/high",
        "serviceable high strength",
        "brand-specific"
      ],
      [
        "Pipe sealant",
        "thread seal",
        "NPT pneumatic/hydraulic fittings",
        "fluid compatibility"
      ],
      [
        "Gasket maker",
        "flange sealant",
        "formed-in-place gaskets",
        "gap/oil exposure"
      ]
    ]
  },
  {
    "title": "Metric Thread Pitch Reference",
    "note": "Metric fasteners are identified by major diameter and pitch. Verify pitch with a gauge before matching nuts or tapped holes.",
    "columns": [
      "Thread",
      "Coarse pitch",
      "Fine pitch",
      "Common use note"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "M6": "Very common",
      "M8": "Very common",
      "M10": "Easy mix-up",
      "M12": "Very common",
      "M24": "High consequence"
    },
    "rowTeaching": {
      "M6": {
        "mechanic101": "M6 x 1.0 is a very common metric thread for covers, guards, sensors, and small brackets",
        "commonConfusion": "M6 can be confused with 1/4 inch hardware by eye, especially in mixed equipment bins.",
        "seniorTechNote": "Gauge pitch before chasing damaged threads; forcing inch hardware can ruin a metric tapped hole.",
        "verifyBy": "metric thread gauge"
      },
      "M8": {
        "mechanic101": "M8 x 1.25 is common on equipment mounts, brackets, and machine guards",
        "commonConfusion": "M8 coarse and fine pitch hardware can start together before binding.",
        "seniorTechNote": "If an M8 bolt feels tight early, stop and confirm pitch rather than using more force.",
        "verifyBy": "pitch + nut check"
      },
      "M10": {
        "mechanic101": "M10 coarse is commonly 1.5 mm pitch, but fine options are also common",
        "commonConfusion": "M10 can be mistaken for 3/8 inch hardware, and fine/coarse pitch mix-ups are common.",
        "seniorTechNote": "On motor bases and brackets, check the actual pitch because previous repairs may have mixed hardware.",
        "verifyBy": "caliper + gauge"
      },
      "M12": {
        "mechanic101": "M12 is a common larger metric fastener size for structural brackets and machine frames",
        "commonConfusion": "M12 coarse, 1.5 fine, and 1.25 fine can be confused if only diameter is measured.",
        "seniorTechNote": "For load-bearing fasteners, match grade/property class and pitch, not just diameter.",
        "verifyBy": "pitch + grade"
      },
      "M24": {
        "mechanic101": "M24 is heavy equipment hardware where torque, grade, and thread engagement matter",
        "commonConfusion": "Large fasteners can feel forgiving while still being the wrong pitch or property class.",
        "seniorTechNote": "Use the equipment spec for pitch, grade, lubrication, and torque on M24-scale joints.",
        "verifyBy": "OEM spec + gauge"
      }
    },
    "rows": [
      [
        "M3",
        "0.5 mm",
        "0.35 mm",
        "small covers and electronics"
      ],
      [
        "M4",
        "0.7 mm",
        "0.5 mm",
        "small brackets and guards"
      ],
      [
        "M5",
        "0.8 mm",
        "0.5 mm",
        "covers and light mounts"
      ],
      [
        "M6",
        "1.0 mm",
        "0.75 mm",
        "machine guards and panels"
      ],
      [
        "M8",
        "1.25 mm",
        "1.0 mm",
        "equipment mounts"
      ],
      [
        "M10",
        "1.5 mm",
        "1.25 / 1.0 mm",
        "motor bases and brackets"
      ],
      [
        "M12",
        "1.75 mm",
        "1.5 / 1.25 mm",
        "structural brackets"
      ],
      [
        "M16",
        "2.0 mm",
        "1.5 mm",
        "heavy machine fasteners"
      ],
      [
        "M20",
        "2.5 mm",
        "1.5 mm",
        "large machinery"
      ],
      [
        "M24",
        "3.0 mm",
        "2.0 mm",
        "heavy equipment"
      ]
    ]
  },
  {
    "title": "NPT Pipe Thread Reference",
    "note": "NPT size is nominal and tapered. Confirm thread type, sealant requirements, and pressure rating.",
    "columns": [
      "NPT",
      "Tap drill",
      "Threads/in",
      "Common use note"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "1": "High consequence",
      "2": "High consequence",
      "1/8": "Very common",
      "1/4": "Very common",
      "1/2": "Very common"
    },
    "rowTeaching": {
      "1": {
        "mechanic101": "1 inch NPT appears on larger headers, pumps, and process piping",
        "commonConfusion": "Large tapered fittings can split ports or distort housings if over-tightened.",
        "seniorTechNote": "Use engagement guidance and wrench support on larger threaded connections.",
        "verifyBy": "engagement count"
      },
      "2": {
        "mechanic101": "2 inch NPT is a large service-line size where thread condition and support matter",
        "commonConfusion": "At this size, alignment and pipe support can load the joint beyond sealing concerns.",
        "seniorTechNote": "Treat 2 inch threaded work as piping work: support, alignment, pressure, and material all matter.",
        "verifyBy": "pipe support + spec"
      },
      "1/8": {
        "mechanic101": "1/8 NPT is common on small gauges, instruments, and compact air fittings",
        "commonConfusion": "The thread OD is much larger than 1/8 inch because NPT size is nominal.",
        "seniorTechNote": "Small tapered ports crack easily. Use proper sealant and avoid over-tightening.",
        "verifyBy": "gauge taper + sealant"
      },
      "1/4": {
        "mechanic101": "1/4 NPT is a very common plant-air and tool-fitting thread",
        "commonConfusion": "NPT, BSPT, and BSPP fittings may look close but seal differently.",
        "seniorTechNote": "When a fitting leaks after replacement, verify thread family before adding more sealant.",
        "verifyBy": "thread gauge"
      },
      "1/2": {
        "mechanic101": "1/2 NPT is common on larger air, water, and utility branches",
        "commonConfusion": "Thread seal does not make up for poor engagement, cracked fittings, or wrong material.",
        "seniorTechNote": "For utility piping, verify pressure, temperature, material, and support before replacing fittings.",
        "verifyBy": "material + pressure"
      }
    },
    "rows": [
      [
        "1/16",
        "1/4 in",
        "27",
        "small gauges/instruments"
      ],
      [
        "1/8",
        "R",
        "27",
        "small air fittings"
      ],
      [
        "1/4",
        "7/16 in",
        "18",
        "common air/tool fittings"
      ],
      [
        "3/8",
        "37/64 in",
        "18",
        "larger air fittings"
      ],
      [
        "1/2",
        "23/32 in",
        "14",
        "plant air/water branches"
      ],
      [
        "3/4",
        "59/64 in",
        "14",
        "utility piping"
      ],
      [
        "1",
        "1-5/32 in",
        "11.5",
        "larger headers"
      ],
      [
        "1-1/4",
        "1-1/2 in",
        "11.5",
        "process piping"
      ],
      [
        "1-1/2",
        "1-47/64 in",
        "11.5",
        "pump/header work"
      ],
      [
        "2",
        "2-7/32 in",
        "11.5",
        "large service lines"
      ]
    ]
  }
];

  if (typeof window !== "undefined") {
    window.MaintainOpsReferenceData = window.MaintainOpsReferenceData || {};
    window.MaintainOpsReferenceData["fasteners"] = FASTENER_REFERENCE_SECTIONS;
  }

  if (typeof module !== "undefined") {
    module.exports = { FASTENER_REFERENCE_SECTIONS };
  }
})();
