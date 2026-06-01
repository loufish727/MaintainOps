// bearings-belts-chain shop reference chart data. Kept separate so reference content can grow without recreating a data monolith.
(function () {
  const BEARINGS_BELTS_CHAIN_REFERENCE_SECTIONS = [
  {
    "title": "Bearing Quick Reference",
    "note": "Bearing suffixes change seals, shields, clearance, and fit. Match the full bearing code.",
    "columns": [
      "Bearing",
      "Bore",
      "OD x Width",
      "Common use note"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "608": "Very common",
      "6004": "Easy mix-up",
      "6005": "Easy mix-up",
      "6203": "Very common",
      "6204": "Very common",
      "6205": "Very common",
      "6206": "Very common",
      "6305": "High consequence"
    },
    "rowTeaching": {
      "608": {
        "mechanic101": "608 is a small 8 mm bore deep-groove bearing often seen in rollers, wheels, and light guides",
        "commonConfusion": "A 608 size match does not prove seal style, clearance, quality, or environment fit.",
        "seniorTechNote": "For small roller bearings, match size first, then shield/seal style and contamination exposure.",
        "verifyBy": "measure bore + code"
      },
      "6004": {
        "mechanic101": "6004 and 6204 both have a 20 mm bore, but they are not the same width or OD",
        "commonConfusion": "Same bore is a common trap; OD and width decide whether the bearing fits the housing and shaft stack.",
        "seniorTechNote": "Do not order from shaft size alone. Measure bore, OD, width, and read suffixes.",
        "verifyBy": "measure all dimensions"
      },
      "6005": {
        "mechanic101": "6005 and 6205 both use a 25 mm bore but fit different housing envelopes",
        "commonConfusion": "A bearing can slide on the shaft and still be wrong for the housing or spacer stack.",
        "seniorTechNote": "When replacing common 25 mm bearings, compare full series and dimensions before assuming 6005/6205 interchange.",
        "verifyBy": "compare series dimensions"
      },
      "6203": {
        "mechanic101": "6203 is a very common 17 mm bore bearing used in small motors, fans, and rollers",
        "commonConfusion": "6203, 6303, and nearby metric bearings can be mixed up if only the bore is checked.",
        "seniorTechNote": "Keep the old bearing until the new one is verified by full code and measured dimensions.",
        "verifyBy": "read code + measure"
      },
      "6204": {
        "mechanic101": "6204 is a very common 20 mm bore bearing used in pumps, motors, and rotating equipment",
        "commonConfusion": "6204 2RS, 6204 ZZ, and 6204 C3 can be different service decisions despite the same base size.",
        "seniorTechNote": "Match the base number and suffix. Seal and clearance choices can change heat, drag, and life.",
        "verifyBy": "match suffix + size"
      },
      "6205": {
        "mechanic101": "6205 is a very common 25 mm bore bearing used around conveyors, pumps, and motors",
        "commonConfusion": "6205 can match by bore while still being wrong by width, seal/shield suffix, clearance, cage, or fit.",
        "seniorTechNote": "Treat 6205 as a familiar size, not a universal replacement. Confirm suffix and fit conditions.",
        "verifyBy": "measure bore + full code"
      },
      "6206": {
        "mechanic101": "6206 is a common 30 mm bore bearing found in larger motors, gearboxes, and shaft supports",
        "commonConfusion": "Larger common bearings are often substituted by availability, but clearance and load details matter more.",
        "seniorTechNote": "For repeat failures, check alignment, fit, lubrication, and load instead of only changing the bearing brand.",
        "verifyBy": "match fit + suffix"
      },
      "6305": {
        "mechanic101": "6305 shares a 25 mm bore with 6205 but has a larger OD and width for heavier duty",
        "commonConfusion": "Same bore can hide a completely different housing size and load capacity.",
        "seniorTechNote": "Never substitute 6205 and 6305 by shaft size. Housing, width, and duty are different.",
        "verifyBy": "compare OD/width"
      }
    },
    "rows": [
      [
        "608",
        "8 mm",
        "22 x 7 mm",
        "rollers, wheels, light guides"
      ],
      [
        "6000",
        "10 mm",
        "26 x 8 mm",
        "small motors / idlers"
      ],
      [
        "6001",
        "12 mm",
        "28 x 8 mm",
        "small shafts"
      ],
      [
        "6002",
        "15 mm",
        "32 x 9 mm",
        "light-duty motors"
      ],
      [
        "6003",
        "17 mm",
        "35 x 10 mm",
        "small fans / conveyors"
      ],
      [
        "6004",
        "20 mm",
        "42 x 12 mm",
        "light equipment shafts"
      ],
      [
        "6005",
        "25 mm",
        "47 x 12 mm",
        "light-duty shaft support"
      ],
      [
        "6201",
        "12 mm",
        "32 x 10 mm",
        "motor ends / small pulleys"
      ],
      [
        "6202",
        "15 mm",
        "35 x 11 mm",
        "small motors and rollers"
      ],
      [
        "6203",
        "17 mm",
        "40 x 12 mm",
        "very common small motor/fan bearing"
      ],
      [
        "6204",
        "20 mm",
        "47 x 14 mm",
        "very common pump and motor-shaft bearing"
      ],
      [
        "6205",
        "25 mm",
        "52 x 15 mm",
        "very common pump, conveyor, and motor bearing"
      ],
      [
        "6206",
        "30 mm",
        "62 x 16 mm",
        "common larger motor / gearbox support bearing"
      ],
      [
        "6207",
        "35 mm",
        "72 x 17 mm",
        "heavier rotating shafts"
      ],
      [
        "6208",
        "40 mm",
        "80 x 18 mm",
        "larger industrial shafts"
      ],
      [
        "6301",
        "12 mm",
        "37 x 12 mm",
        "heavier small shaft"
      ],
      [
        "6302",
        "15 mm",
        "42 x 13 mm",
        "heavier small motor"
      ],
      [
        "6303",
        "17 mm",
        "47 x 14 mm",
        "heavier motor bearing"
      ],
      [
        "6304",
        "20 mm",
        "52 x 15 mm",
        "heavier pump shaft"
      ],
      [
        "6305",
        "25 mm",
        "62 x 17 mm",
        "heavier conveyor/pump bearing"
      ]
    ]
  },
  {
    "title": "Roller Chain Reference",
    "note": "Match pitch, roller width, strand count, sprocket condition, and lubrication before replacement.",
    "columns": [
      "Chain",
      "Pitch",
      "Roller width",
      "Common note"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "#35": "Very common",
      "#40": "Very common",
      "#41": "Easy mix-up",
      "#50": "Very common",
      "#60": "Very common",
      "#80": "High consequence",
      "#2040": "Easy mix-up"
    },
    "rowTeaching": {
      "#35": {
        "mechanic101": "#35 roller chain is a small 3/8 inch pitch chain used on light drives and small conveyors",
        "commonConfusion": "Small chain sizes can look similar when worn or dirty, but pitch and roller width decide the match.",
        "seniorTechNote": "Measure pitch over several pins and confirm sprocket marking before ordering chain by sight.",
        "verifyBy": "measure pitch + width"
      },
      "#40": {
        "mechanic101": "#40 is a common 1/2 inch pitch roller chain for small conveyors and shop drives",
        "commonConfusion": "#40 and #41 share 1/2 inch pitch language, but roller width differs.",
        "seniorTechNote": "If the chain rides poorly on the sprocket, verify roller width and sprocket tooth thickness, not pitch only.",
        "verifyBy": "measure roller width"
      },
      "#41": {
        "mechanic101": "#41 is a narrow 1/2 inch pitch chain often used on lighter conveyor applications",
        "commonConfusion": "#41 may be mistaken for #40 because pitch matches while width does not.",
        "seniorTechNote": "Do not force #40/#41 substitutions. The sprocket and chain width must agree.",
        "verifyBy": "compare #40/#41 width"
      },
      "#50": {
        "mechanic101": "#50 is a common 5/8 inch pitch chain for medium conveyor and drive use",
        "commonConfusion": "A worn #50 drive may need sprockets too; new chain on hooked teeth wears quickly.",
        "seniorTechNote": "Inspect sprocket teeth and alignment before calling it a chain-only replacement.",
        "verifyBy": "measure chain + teeth"
      },
      "#60": {
        "mechanic101": "#60 is a common 3/4 inch pitch chain used on heavier conveyors and equipment drives",
        "commonConfusion": "Heavy chain failures often point to shock load, poor lubrication, alignment, or worn sprockets.",
        "seniorTechNote": "For #60 and up, treat replacement as a drive-system inspection, not a single part swap.",
        "verifyBy": "inspect full drive"
      },
      "#80": {
        "mechanic101": "#80 is a 1 inch pitch chain for heavier slow drives and larger conveyors",
        "commonConfusion": "Large chain is expensive and dangerous to misapply; tooth count, strand count, lube, and alignment matter.",
        "seniorTechNote": "Before replacing large chain, document chain size, strand count, sprocket tooth condition, and take-up range.",
        "verifyBy": "confirm size + strand"
      },
      "#2040": {
        "mechanic101": "#2040 is double-pitch conveyor chain, not ordinary #40 drive chain",
        "commonConfusion": "Double-pitch chain can be ordered wrong if the number is read as normal #40 chain.",
        "seniorTechNote": "Confirm conveyor chain style, attachment needs, and sprocket compatibility before ordering.",
        "verifyBy": "confirm double pitch"
      }
    },
    "rows": [
      [
        "#25",
        "1/4 in",
        "1/8 in",
        "small guards / light automation"
      ],
      [
        "#25H",
        "1/4 in",
        "1/8 in",
        "heavier small automation"
      ],
      [
        "#35",
        "3/8 in",
        "3/16 in",
        "small conveyors / light drives"
      ],
      [
        "#35H",
        "3/8 in",
        "3/16 in",
        "heavier small conveyors"
      ],
      [
        "#40",
        "1/2 in",
        "5/16 in",
        "common conveyor and sprocket drive"
      ],
      [
        "#40H",
        "1/2 in",
        "5/16 in",
        "heavier #40 replacement"
      ],
      [
        "#41",
        "1/2 in",
        "1/4 in",
        "narrow conveyor chain"
      ],
      [
        "#50",
        "5/8 in",
        "3/8 in",
        "medium conveyor / drive chain"
      ],
      [
        "#50H",
        "5/8 in",
        "3/8 in",
        "heavier medium drive"
      ],
      [
        "#60",
        "3/4 in",
        "1/2 in",
        "ag equipment / heavier conveyors"
      ],
      [
        "#60H",
        "3/4 in",
        "1/2 in",
        "shock-loaded #60 drives"
      ],
      [
        "#80",
        "1 in",
        "5/8 in",
        "heavy conveyor / mixer drives"
      ],
      [
        "#80H",
        "1 in",
        "5/8 in",
        "shock-loaded heavy drives"
      ],
      [
        "#100",
        "1-1/4 in",
        "3/4 in",
        "large conveyor / slow heavy drive"
      ],
      [
        "#120",
        "1-1/2 in",
        "1 in",
        "large industrial drive"
      ],
      [
        "#140",
        "1-3/4 in",
        "1 in",
        "large low-speed drive"
      ],
      [
        "#160",
        "2 in",
        "1-1/4 in",
        "very large industrial drive"
      ],
      [
        "#200",
        "2-1/2 in",
        "1-1/2 in",
        "very heavy slow drive"
      ],
      [
        "#240",
        "3 in",
        "1-7/8 in",
        "very heavy conveyor drive"
      ],
      [
        "#2040",
        "1 in",
        "5/16 in",
        "double-pitch conveyor"
      ]
    ]
  },
  {
    "title": "Conveyor Roller ID Reference",
    "note": "Confirm roller diameter, between-frame length, axle style, bearing type, and load rating.",
    "columns": [
      "ID",
      "Feature",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "1.9 roller": "Very common",
      "7/16 hex axle": "Very common",
      "Spring loaded": "Very common",
      "Grooved roller": "Easy mix-up",
      "Sprocketed roller": "High consequence"
    },
    "rowTeaching": {
      "1.9 roller": {
        "mechanic101": "1.9 inch OD rollers are common on gravity and light powered conveyor sections",
        "commonConfusion": "Roller OD alone is not enough; between-frame length and axle style decide fit.",
        "seniorTechNote": "Measure between-frame length from the conveyor frame, not just the removed roller tube.",
        "verifyBy": "OD + BF + axle"
      },
      "7/16 hex axle": {
        "mechanic101": "7/16 hex axles fit matching hex frame slots and keep the axle from rotating",
        "commonConfusion": "Round, hex, threaded, and spring axles are not interchangeable without frame changes.",
        "seniorTechNote": "A roller that drops in but spins the axle can wear frame slots and bearings.",
        "verifyBy": "match axle/slot"
      },
      "Spring loaded": {
        "mechanic101": "Spring-loaded axles compress so rollers can be installed or removed from the frame",
        "commonConfusion": "A weak or wrong-length spring axle can let the roller walk out of the frame.",
        "seniorTechNote": "Check axle extension and spring force if rollers repeatedly pop out or rattle.",
        "verifyBy": "measure axle extension"
      },
      "Grooved roller": {
        "mechanic101": "Grooved rollers accept O-belts or line-shaft drive bands at a specific groove position",
        "commonConfusion": "Right roller diameter with wrong groove position will misalign belts.",
        "seniorTechNote": "Match groove count, spacing, and side before replacing driven conveyor rollers.",
        "verifyBy": "groove position"
      },
      "Sprocketed roller": {
        "mechanic101": "Sprocketed rollers are chain-driven and must match chain pitch and tooth count",
        "commonConfusion": "Tube size and length can match while sprocket pitch, location, or tooth count is wrong.",
        "seniorTechNote": "For powered conveyor, identify chain pitch, sprocket alignment, and drive direction before ordering.",
        "verifyBy": "chain pitch + sprocket"
      }
    },
    "rows": [
      [
        "1.9 roller",
        "1.9 in OD",
        "common gravity conveyor",
        "BF length"
      ],
      [
        "2.5 roller",
        "2.5 in OD",
        "heavier conveyor",
        "load"
      ],
      [
        "7/16 hex axle",
        "hex spring axle",
        "common conveyor roller",
        "frame slot"
      ],
      [
        "11/16 hex axle",
        "heavy hex axle",
        "heavier roller",
        "frame slot"
      ],
      [
        "Spring loaded",
        "axle style",
        "easy roller removal",
        "spring length"
      ],
      [
        "Grooved roller",
        "O-belt groove",
        "line-shaft conveyor",
        "groove position"
      ],
      [
        "Tapered roller",
        "curve conveyor",
        "carton curves",
        "orientation"
      ],
      [
        "Poly sleeve",
        "roller cover",
        "quiet/grip surface",
        "wear"
      ],
      [
        "PVC roller",
        "plastic tube",
        "light/wet applications",
        "load limit"
      ],
      [
        "Zinc steel",
        "plated steel",
        "general conveyor use",
        "corrosion"
      ],
      [
        "ABEC bearing",
        "precision bearing",
        "higher-speed rollers",
        "seal type"
      ],
      [
        "Sprocketed roller",
        "chain-driven roller",
        "powered conveyor",
        "chain pitch"
      ]
    ]
  },
  {
    "title": "Bearing Suffix ID Reference",
    "note": "Match the full bearing code. Suffixes vary by manufacturer and change fit, clearance, seals, and shields.",
    "columns": [
      "Suffix",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "2RS / 2RSH": "Very common",
      "ZZ / 2Z": "Very common",
      "C3": "Very common",
      "C4": "Spec required",
      "NR": "Easy mix-up",
      "K": "Spec required",
      "P5": "High consequence",
      "W33": "Spec required"
    },
    "rowTeaching": {
      "2RS / 2RSH": {
        "mechanic101": "2RS/2RSH indicates rubber seals on both sides, with exact seal style varying by manufacturer",
        "commonConfusion": "A sealed bearing may have more drag and better contamination protection than a shielded bearing.",
        "seniorTechNote": "Match seal style to contamination, speed, temperature, and the original suffix, not just base size.",
        "verifyBy": "read suffix + catalog"
      },
      "ZZ / 2Z": {
        "mechanic101": "ZZ/2Z indicates metal shields on both sides, generally lower drag but less sealing than contact seals",
        "commonConfusion": "Shields are often called seals in conversation, but they do not protect like rubber contact seals.",
        "seniorTechNote": "For dusty or wet areas, confirm whether shields are acceptable before replacing a 2RS bearing with ZZ.",
        "verifyBy": "compare shield/seal"
      },
      "C3": {
        "mechanic101": "C3 means greater internal clearance than normal and is common in some motors and hotter fits",
        "commonConfusion": "C3 is not a quality grade; using it where normal clearance is required can add noise or looseness.",
        "seniorTechNote": "Use C3 because the fit/heat/speed requires it, not because it sounds upgraded.",
        "verifyBy": "match clearance spec"
      },
      "C4": {
        "mechanic101": "C4 is more internal clearance than C3 and is normally application-specific",
        "commonConfusion": "More clearance is not automatically safer. Wrong clearance can shorten bearing life.",
        "seniorTechNote": "Treat C4 as spec-required. Confirm the equipment manual or original bearing designation.",
        "verifyBy": "confirm OEM clearance"
      },
      "NR": {
        "mechanic101": "NR indicates a snap ring groove with snap ring on many bearing designations",
        "commonConfusion": "N and NR can be mixed up; one may indicate groove only while the other includes the ring depending on maker.",
        "seniorTechNote": "If the bearing locates axially by snap ring, confirm groove, ring, and housing fit before install.",
        "verifyBy": "check groove + ring"
      },
      "K": {
        "mechanic101": "K often indicates a tapered bore used with adapter sleeves or tapered mounting",
        "commonConfusion": "A tapered-bore bearing is not a drop-in match for a straight-bore bearing with the same base family.",
        "seniorTechNote": "Confirm bore style, sleeve, locknut, and mounting procedure before ordering.",
        "verifyBy": "check bore/sleeve"
      },
      "P5": {
        "mechanic101": "P5 is a precision class used for more demanding spindle or precision applications",
        "commonConfusion": "Precision suffixes affect cost, fit, and application; they are not generic replacements.",
        "seniorTechNote": "For precision bearings, match full designation, preload/fit requirements, and handling cleanliness.",
        "verifyBy": "match precision class"
      },
      "W33": {
        "mechanic101": "W33 commonly indicates a lubrication groove and holes on spherical roller bearings",
        "commonConfusion": "Lubrication features can be missed if only bore and OD are checked.",
        "seniorTechNote": "For spherical rollers, confirm lube path and relubrication method before replacing.",
        "verifyBy": "confirm lube groove"
      }
    },
    "rows": [
      [
        "2RS / 2RSH",
        "two rubber seals",
        "dusty/wet bearing locations",
        "friction"
      ],
      [
        "ZZ / 2Z",
        "two metal shields",
        "motors/light contamination",
        "not sealed"
      ],
      [
        "C3",
        "extra clearance",
        "motors/hot running fits",
        "noise if misused"
      ],
      [
        "C4",
        "more clearance",
        "high-temp/special fits",
        "spec required"
      ],
      [
        "NR",
        "snap ring groove",
        "located bearing",
        "ring included"
      ],
      [
        "M",
        "machined cage",
        "higher duty bearings",
        "manufacturer meaning"
      ],
      [
        "TN / TV",
        "polyamide cage",
        "common modern bearings",
        "temperature"
      ],
      [
        "Explorer",
        "SKF series",
        "premium bearing line",
        "brand-specific"
      ],
      [
        "K",
        "tapered bore",
        "adapter sleeve mounting",
        "shaft fit"
      ],
      [
        "P5",
        "precision class",
        "spindles/precision shafts",
        "cost"
      ],
      [
        "DU",
        "single contact seal",
        "one-side sealed bearings",
        "orientation"
      ],
      [
        "N",
        "snap ring groove",
        "located bearing",
        "ring not included"
      ],
      [
        "E",
        "reinforced design",
        "higher capacity variant",
        "series-specific"
      ],
      [
        "J",
        "pressed steel cage",
        "common bearing cage",
        "manufacturer meaning"
      ],
      [
        "W33",
        "lubrication groove",
        "spherical roller bearings",
        "grease path"
      ],
      [
        "VA",
        "special variant",
        "application-specific bearing",
        "datasheet"
      ]
    ]
  },
  {
    "title": "Chain Sprocket ID Reference",
    "note": "Confirm chain size, tooth count, bore, keyway, hub style, and wear before replacing sprockets.",
    "columns": [
      "ID",
      "Means",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "40B12": "Very common",
      "40B24": "Very common",
      "50B15": "Very common",
      "80B12": "High consequence",
      "Type A": "Easy mix-up",
      "Type B": "Very common",
      "QD bushing": "Spec required",
      "Taper-lock": "Spec required",
      "Double single": "Easy mix-up",
      "Idler sprocket": "Very common"
    },
    "rowTeaching": {
      "40B12": {
        "mechanic101": "40B12 usually means #40 chain, B-hub sprocket, 12 teeth",
        "commonConfusion": "The chain size and tooth count can be right while bore, keyway, hub, and set-screw layout are wrong.",
        "seniorTechNote": "Confirm bore and hub style before ordering a sprocket from the stamped size alone.",
        "verifyBy": "count teeth + bore"
      },
      "40B24": {
        "mechanic101": "40B24 is a #40 chain B-hub sprocket with 24 teeth",
        "commonConfusion": "Changing tooth count changes speed ratio and chain wrap, even if chain pitch matches.",
        "seniorTechNote": "Match tooth count unless you intentionally want a speed/torque change.",
        "verifyBy": "confirm tooth count"
      },
      "50B15": {
        "mechanic101": "50B15 is a common #50 chain sprocket family with 15 teeth",
        "commonConfusion": "Worn #50 sprockets may let a new chain skip or wear quickly.",
        "seniorTechNote": "Inspect tooth profile and chain elongation together before replacing only one part.",
        "verifyBy": "inspect teeth + chain"
      },
      "80B12": {
        "mechanic101": "80B12 is a heavy #80 chain sprocket where wrap, bore, and hub clearance matter",
        "commonConfusion": "Low tooth counts on heavy drives can create wear and wrap concerns if the drive is already marginal.",
        "seniorTechNote": "For heavy slow drives, confirm load, wrap angle, alignment, bore, key, and bushing fit.",
        "verifyBy": "check wrap + bore"
      },
      "Type A": {
        "mechanic101": "Type A sprockets are plate-style with no hub",
        "commonConfusion": "Type A and Type B can share tooth count and chain size but mount very differently.",
        "seniorTechNote": "Match hub style to the shaft, mounting, and clearance before ordering.",
        "verifyBy": "confirm hub style"
      },
      "Type B": {
        "mechanic101": "Type B sprockets have a hub on one side and are common keyed/set-screw sprockets",
        "commonConfusion": "Hub side orientation can matter in tight guards, bearings, and chain alignment.",
        "seniorTechNote": "Check hub side, bore, keyway, set screws, and chain centerline before install.",
        "verifyBy": "check hub orientation"
      },
      "QD bushing": {
        "mechanic101": "QD bushings are tapered serviceable bushings used to mount sprockets and sheaves",
        "commonConfusion": "Bushing series and bolt pattern must match; a tapered bushing is not generic by bore only.",
        "seniorTechNote": "Match bushing series, bore, keyway, bolt pattern, and sprocket hub before ordering.",
        "verifyBy": "match bushing series"
      },
      "Taper-lock": {
        "mechanic101": "Taper-lock style bushings clamp through a taper and must match the hub series",
        "commonConfusion": "QD and taper-lock language gets mixed up because both are tapered shaft-mount systems.",
        "seniorTechNote": "Use the hub marking and bushing series, not just shaft diameter, to identify replacements.",
        "verifyBy": "read hub/bushing mark"
      },
      "Double single": {
        "mechanic101": "double-single sprockets run two single-strand chains side by side",
        "commonConfusion": "Double-single and double-strand setups can look similar but spacing and chain arrangement differ.",
        "seniorTechNote": "Confirm chain arrangement and center spacing before replacing multi-row sprockets.",
        "verifyBy": "confirm strand spacing"
      },
      "Idler sprocket": {
        "mechanic101": "idler sprockets guide or tension chain and may include an internal bearing instead of a keyed bore",
        "commonConfusion": "An idler sprocket can match chain size but fail by bearing, mounting bolt, or width.",
        "seniorTechNote": "For idlers, match chain size, bearing ID, mounting hardware, and running width.",
        "verifyBy": "match bearing/mount"
      }
    },
    "rows": [
      [
        "40B12",
        "#40 chain 12T",
        "small conveyor sprocket",
        "bore"
      ],
      [
        "40B24",
        "#40 chain 24T",
        "speed reduction",
        "pitch"
      ],
      [
        "50B15",
        "#50 chain 15T",
        "medium drive",
        "tooth wear"
      ],
      [
        "60B18",
        "#60 chain 18T",
        "heavier drive",
        "hub clearance"
      ],
      [
        "80B12",
        "#80 chain 12T",
        "heavy slow drive",
        "wrap"
      ],
      [
        "Type A",
        "plate sprocket",
        "no hub",
        "mounting"
      ],
      [
        "Type B",
        "one-side hub",
        "common keyed sprocket",
        "set screws"
      ],
      [
        "QD bushing",
        "taper bushing",
        "serviceable shaft fit",
        "bushing series"
      ],
      [
        "Type C",
        "two-side hub",
        "wide/heavy sprocket",
        "hub clearance"
      ],
      [
        "Taper-lock",
        "taper bushing",
        "serviceable shaft fit",
        "bushing size"
      ],
      [
        "Double single",
        "two single chains",
        "parallel drives",
        "spacing"
      ],
      [
        "Idler sprocket",
        "no drive bore",
        "chain tension/support",
        "bearing"
      ]
    ]
  },
  {
    "title": "Bearing Symptom Reference",
    "note": "Bearing diagnosis should include load, lubrication, alignment, fit, temperature, and contamination review.",
    "columns": [
      "Symptom",
      "Likely area",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Growling noise": "Common failure",
      "High heat": "Very common",
      "Blue discoloration": "High consequence",
      "Loose fit": "Common failure",
      "Early repeat failure": "High consequence"
    },
    "rowTeaching": {
      "Growling noise": {
        "mechanic101": "Growling often suggests race or rolling-element damage in a bearing",
        "commonConfusion": "Belt noise, gear noise, and rubbing guards can sound like bearing growl.",
        "seniorTechNote": "Confirm with isolation, vibration, temperature, and load checks before replacing nearby parts.",
        "verifyBy": "listen + isolate"
      },
      "High heat": {
        "mechanic101": "Bearing heat can come from load, speed, lubrication, fit, seal drag, or misalignment",
        "commonConfusion": "Overgreasing can cause heat just like underlubrication can.",
        "seniorTechNote": "Use trend temperature and grease amount history instead of judging from one hot touch.",
        "verifyBy": "temp trend + lube"
      },
      "Blue discoloration": {
        "mechanic101": "Blue or dark heat color suggests severe overheating and possible shaft or housing damage",
        "commonConfusion": "Replacing only the bearing may miss the damaged fit that overheated it.",
        "seniorTechNote": "Inspect shaft, housing, seals, and lubrication path after a heat-discolored failure.",
        "verifyBy": "inspect fits"
      },
      "Loose fit": {
        "mechanic101": "A loose bearing fit lets the race move where it should be held stationary",
        "commonConfusion": "Repeated bearing failures may be blamed on bearing quality when the shaft or housing is worn.",
        "seniorTechNote": "Measure shaft and housing fits before installing another bearing into a worn seat.",
        "verifyBy": "mic shaft/housing"
      },
      "Early repeat failure": {
        "mechanic101": "Early repeat failure usually means the root cause was not corrected",
        "commonConfusion": "The new bearing becomes the evidence collector for alignment, load, lube, or contamination problems.",
        "seniorTechNote": "Treat repeat failures as a system problem until alignment, fit, load, and lubrication are proven.",
        "verifyBy": "root-cause checklist"
      }
    },
    "rows": [
      [
        "Growling noise",
        "race damage",
        "rotating equipment",
        "replace soon"
      ],
      [
        "High heat",
        "lube/load/fit",
        "motors and rollers",
        "overgrease"
      ],
      [
        "Blue discoloration",
        "overheat",
        "failed lubrication",
        "shaft damage"
      ],
      [
        "Vibration",
        "spall/imbalance",
        "fans and conveyors",
        "alignment"
      ],
      [
        "Rust staining",
        "water ingress",
        "washdown/dusty areas",
        "seal choice"
      ],
      [
        "Black grease",
        "contamination/heat",
        "older bearings",
        "cleanliness"
      ],
      [
        "Loose fit",
        "shaft/housing wear",
        "repeated failures",
        "measure fit"
      ],
      [
        "Early repeat failure",
        "root cause missed",
        "critical assets",
        "alignment/load"
      ]
    ]
  },
  {
    "title": "Belt Failure Pattern Reference",
    "note": "Belt failures often come from alignment, tension, pulley wear, heat, or contamination rather than the belt alone.",
    "columns": [
      "Pattern",
      "Likely cause",
      "Common use note",
      "First check"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Glazed sides": "Common failure",
      "Frayed edge": "Very common",
      "Squeal": "Very common",
      "Uneven wear": "Common failure",
      "Repeated break": "High consequence"
    },
    "rowTeaching": {
      "Glazed sides": {
        "mechanic101": "Glazed belt sides usually mean slip, heat, or pulley contact problems",
        "commonConfusion": "Belt dressing may quiet the symptom while leaving tension or pulley problems untouched.",
        "seniorTechNote": "Check tension, pulley groove wear, load, and alignment before installing another belt.",
        "verifyBy": "tension + pulley"
      },
      "Frayed edge": {
        "mechanic101": "Frayed edges often point to misalignment, rubbing guards, or pulley flange/contact issues",
        "commonConfusion": "A belt can be the victim of a bent bracket or shifted pulley, not the root failure.",
        "seniorTechNote": "Sight the pulley path and inspect nearby sheet metal before blaming belt quality.",
        "verifyBy": "straightedge alignment"
      },
      "Squeal": {
        "mechanic101": "Squeal is usually belt slip during startup, load change, or acceleration",
        "commonConfusion": "Overtightening to stop squeal can overload bearings and shorten belt life.",
        "seniorTechNote": "Find why the belt slipped: tension, pulley wear, load jam, contamination, or wrong belt section.",
        "verifyBy": "load + tension"
      },
      "Uneven wear": {
        "mechanic101": "Uneven wear can mean pulley mismatch, misalignment, or multi-belt set mismatch",
        "commonConfusion": "Replacing one belt in a matched set can cause uneven load sharing.",
        "seniorTechNote": "On multi-belt drives, replace matched sets and verify pulley groove condition.",
        "verifyBy": "matched set + grooves"
      },
      "Repeated break": {
        "mechanic101": "Repeated belt breakage often means shock load, jammed driven equipment, wrong belt, or severe misalignment",
        "commonConfusion": "A stronger belt may only move the failure to bearings, shafts, or guards.",
        "seniorTechNote": "Investigate the driven load and startup condition before upgrading belt strength.",
        "verifyBy": "inspect driven load"
      }
    },
    "rows": [
      [
        "Glazed sides",
        "slip/low tension",
        "V-belts",
        "tension and load"
      ],
      [
        "Cracked ribs",
        "age/heat",
        "old belts",
        "temperature"
      ],
      [
        "Frayed edge",
        "misalignment",
        "conveyors/drives",
        "pulley alignment"
      ],
      [
        "Chunking",
        "wrong pulley/debris",
        "notched belts",
        "pulley damage"
      ],
      [
        "Squeal",
        "slip",
        "startup load",
        "tension"
      ],
      [
        "Dust buildup",
        "wear/slip",
        "belt guards",
        "pulley grooves"
      ],
      [
        "Uneven wear",
        "pulley mismatch",
        "multi-belt sets",
        "matched set"
      ],
      [
        "Repeated break",
        "shock load",
        "jammed drive",
        "driven equipment"
      ]
    ]
  },
  {
    "title": "Chain / Sprocket Wear Reference",
    "note": "Replace chain and sprockets as a system when wear is advanced. Lubrication and alignment drive chain life.",
    "columns": [
      "Condition",
      "Likely cause",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Hooked teeth": "Common failure",
      "Chain stretch": "Very common",
      "Side wear": "Common failure",
      "Noisy drive": "Very common",
      "Jumping teeth": "High consequence"
    },
    "rowTeaching": {
      "Hooked teeth": {
        "mechanic101": "Hooked sprocket teeth show sprocket wear and poor chain engagement",
        "commonConfusion": "A new chain on hooked sprockets can wear quickly and skip under load.",
        "seniorTechNote": "Replace sprockets with the chain when tooth wear is visible or pitch engagement is poor.",
        "verifyBy": "inspect tooth profile"
      },
      "Chain stretch": {
        "mechanic101": "Chain stretch is usually pin and bushing wear, not actual metal stretching",
        "commonConfusion": "Tensioning worn chain can hide wear while damaging sprockets.",
        "seniorTechNote": "Measure chain over a known number of pitches and replace when elongation exceeds the drive standard.",
        "verifyBy": "measure pitch length"
      },
      "Side wear": {
        "mechanic101": "Side wear suggests misalignment, guide rubbing, or frame interference",
        "commonConfusion": "Lubrication will not fix a chain being pushed sideways by alignment problems.",
        "seniorTechNote": "Check sprocket alignment and guide contact before replacing only the chain.",
        "verifyBy": "straightedge sprockets"
      },
      "Noisy drive": {
        "mechanic101": "Chain noise can come from lubrication, tension, wear, alignment, or damaged links",
        "commonConfusion": "A noisy chain is not always too loose; overtension can also create noise and bearing load.",
        "seniorTechNote": "Verify slack at the recommended span and inspect sprocket wear before adjusting.",
        "verifyBy": "slack + lube"
      },
      "Jumping teeth": {
        "mechanic101": "Jumping teeth means the chain is not staying engaged with the sprocket under load",
        "commonConfusion": "Tension may temporarily help but worn pitch, hooked teeth, or shock load can remain.",
        "seniorTechNote": "Treat jumping as a stop-and-inspect condition before it damages guards, shafts, or product.",
        "verifyBy": "pitch + sprocket"
      }
    },
    "rows": [
      [
        "Hooked teeth",
        "worn sprocket",
        "old conveyor drive",
        "replace sprocket"
      ],
      [
        "Chain stretch",
        "pin/bushing wear",
        "long conveyors",
        "measure length"
      ],
      [
        "Side wear",
        "misalignment",
        "guide/contact issue",
        "sprocket alignment"
      ],
      [
        "Rusty chain",
        "poor lube/washdown",
        "wet areas",
        "lubricant choice"
      ],
      [
        "Tight spots",
        "damaged links",
        "shock load",
        "replace chain"
      ],
      [
        "Noisy drive",
        "lube/tension/wear",
        "open chain drives",
        "lubrication"
      ],
      [
        "Jumping teeth",
        "loose/worn",
        "startup load",
        "tension"
      ],
      [
        "Broken rollers",
        "impact/debris",
        "dirty conveyors",
        "guarding"
      ]
    ]
  }
];

  if (typeof window !== "undefined") {
    window.MaintainOpsReferenceData = window.MaintainOpsReferenceData || {};
    window.MaintainOpsReferenceData["bearings-belts-chain"] = BEARINGS_BELTS_CHAIN_REFERENCE_SECTIONS;
  }

  if (typeof module !== "undefined") {
    module.exports = { BEARINGS_BELTS_CHAIN_REFERENCE_SECTIONS };
  }
})();
