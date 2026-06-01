// fabrication shop reference chart data. Kept separate so reference content can grow without recreating a data monolith.
(function () {
  const FABRICATION_REFERENCE_SECTIONS = [
  {
    "title": "Weld Symbol Quick Reference",
    "note": "Weld symbols depend on the drawing standard, arrow side, other side, tail notes, and dimensions.",
    "columns": [
      "Symbol/name",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Fillet": "Very common",
      "V-groove": "High consequence",
      "Bevel groove": "Easy mix-up",
      "All around": "Easy mix-up",
      "Tail": "Spec required",
      "Arrow side": "High consequence",
      "Other side": "High consequence",
      "Intermittent": "Very common"
    },
    "rowTeaching": {
      "Fillet": {
        "mechanic101": "fillet weld symbols identify triangular welds used on corner, T, and lap joints",
        "commonConfusion": "The symbol shape does not tell the whole weld; size, length, pitch, side, contour, and process notes still matter.",
        "seniorTechNote": "Read the full symbol before welding. A common fillet can still be wrong by side, length, or intermittent spacing.",
        "verifyBy": "read full weld symbol"
      },
      "V-groove": {
        "mechanic101": "V-groove symbols call for groove preparation and weld detail on a butt joint",
        "commonConfusion": "Groove angle, root opening, backing, and weld size can be missed if the symbol is treated like a simple butt weld.",
        "seniorTechNote": "Before cutting or welding, confirm prep dimensions, root condition, backing, and whether the WPS covers the joint.",
        "verifyBy": "check groove callout"
      },
      "Bevel groove": {
        "mechanic101": "bevel groove symbols involve one member being beveled, often with arrow-side meaning",
        "commonConfusion": "Beveling the wrong member or wrong side can make the joint impossible to fit or weld as drawn.",
        "seniorTechNote": "Use the arrow, break, and drawing notes to identify which member gets prepared before cutting.",
        "verifyBy": "confirm beveled member"
      },
      "All around": {
        "mechanic101": "the all-around circle means the weld continues around the joint where the joint geometry supports it",
        "commonConfusion": "All-around does not mean weld every nearby edge or weld through inaccessible breaks in the joint.",
        "seniorTechNote": "Trace the actual joint path and stops before assuming the symbol covers every visible edge.",
        "verifyBy": "trace joint continuity"
      },
      "Tail": {
        "mechanic101": "the tail carries process, specification, WPS, or note information when needed",
        "commonConfusion": "The weld shape may be clear while the process or procedure requirement is hidden in the tail.",
        "seniorTechNote": "Never ignore tail text on production or code work. It may control process, filler, inspection, or procedure.",
        "verifyBy": "read tail/WPS note"
      },
      "Arrow side": {
        "mechanic101": "in AWS-style symbols, a symbol below the reference line usually indicates the arrow side of the joint",
        "commonConfusion": "Arrow side and other side are one of the easiest ways to put the right weld on the wrong side.",
        "seniorTechNote": "Before welding, physically point to the arrow-side member and compare it to the print.",
        "verifyBy": "mark arrow side"
      },
      "Other side": {
        "mechanic101": "in AWS-style symbols, a symbol above the reference line usually indicates the other side of the joint",
        "commonConfusion": "A weld symbol above the line can be missed when the fitter is focused on the arrow side.",
        "seniorTechNote": "Check above/below reference line before tack-up so the weld side is not discovered after fit-up.",
        "verifyBy": "confirm other side"
      },
      "Intermittent": {
        "mechanic101": "intermittent welds use length and pitch to define stitch weld spacing",
        "commonConfusion": "Length and pitch are often mixed up, leading to too much weld, too little weld, or wrong spacing.",
        "seniorTechNote": "Lay out intermittent welds from the symbol dimensions before welding the first segment.",
        "verifyBy": "check length + pitch"
      }
    },
    "rows": [
      [
        "Fillet",
        "triangular weld symbol",
        "corner/T/lap joints",
        "size/length"
      ],
      [
        "Square groove",
        "square butt joint",
        "thin plates",
        "root opening"
      ],
      [
        "V-groove",
        "beveled both sides",
        "butt weld prep",
        "included angle"
      ],
      [
        "Bevel groove",
        "one member beveled",
        "thicker plate",
        "arrow side"
      ],
      [
        "Plug/slot",
        "hole or slot weld",
        "lap joints",
        "pitch/count"
      ],
      [
        "Contour flush",
        "finish flush",
        "grind/machine finish",
        "finish symbol"
      ],
      [
        "All around",
        "circle at elbow",
        "weld all around joint",
        "joint continuity"
      ],
      [
        "Field weld",
        "flag symbol",
        "weld made in field",
        "location"
      ],
      [
        "Tail",
        "process/spec note",
        "WPS/process callout",
        "note text"
      ],
      [
        "Arrow side",
        "symbol below line",
        "near-side weld",
        "standard convention"
      ],
      [
        "Other side",
        "symbol above line",
        "far-side weld",
        "standard convention"
      ],
      [
        "Intermittent",
        "length-pitch callout",
        "stitch welds",
        "spacing"
      ]
    ]
  },
  {
    "title": "Stick Electrode Reference",
    "note": "Electrode choice depends on base metal, position, current type, joint, and procedure requirements.",
    "columns": [
      "Rod",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "E6010": "Spec required",
      "E6011": "Very common",
      "E6013": "Easy mix-up",
      "E7018": "Very common",
      "E7024": "High consequence",
      "Ni-Cl": "Spec required",
      "Hardfacing": "Spec required",
      "DCEP": "Easy mix-up"
    },
    "rowTeaching": {
      "E6010": {
        "mechanic101": "E6010 is a deep-penetrating cellulose electrode commonly associated with DC work and root passes",
        "commonConfusion": "E6010 and E6011 are both digging rods, but machine current capability and procedure requirements differ.",
        "seniorTechNote": "Confirm current type, position, procedure, and root requirements before choosing E6010 from habit.",
        "verifyBy": "check rod + current"
      },
      "E6011": {
        "mechanic101": "E6011 is a deep-penetrating AC/DC electrode often used for repair work and less-than-perfect surfaces",
        "commonConfusion": "A rod that can tolerate rough conditions still does not replace fit-up, cleaning, or procedure requirements.",
        "seniorTechNote": "Use E6011 for the right reason: access, current availability, and repair condition, not as a universal shortcut.",
        "verifyBy": "confirm AC/DC need"
      },
      "E6013": {
        "mechanic101": "E6013 is a lighter-penetrating electrode often used on sheet or light fabrication",
        "commonConfusion": "E6013 can make a nice-looking bead while lacking penetration for heavier repair work.",
        "seniorTechNote": "Do not judge stick weld choice by bead appearance alone. Match penetration and joint requirement.",
        "verifyBy": "match joint thickness"
      },
      "E7018": {
        "mechanic101": "E7018 is a low-hydrogen electrode used widely for structural and general repair work",
        "commonConfusion": "Low-hydrogen rods can be misused if storage, moisture exposure, or procedure requirements are ignored.",
        "seniorTechNote": "If the work calls for low hydrogen, storage and handling are part of the weld, not paperwork.",
        "verifyBy": "check rod storage"
      },
      "E7024": {
        "mechanic101": "E7024 is a high-deposition electrode commonly limited to flat and horizontal work",
        "commonConfusion": "A high-deposition rod can be wrong for position even when strength class looks acceptable.",
        "seniorTechNote": "Before selecting E7024, confirm position, joint access, and machine output.",
        "verifyBy": "confirm weld position"
      },
      "Ni-Cl": {
        "mechanic101": "nickel cast-iron electrodes are used for cast iron repair where cracking and heat control matter",
        "commonConfusion": "Cast iron repair is often more about preheat, cooling, restraint, and base-metal condition than just rod choice.",
        "seniorTechNote": "Plan cast repair before striking an arc: identify cast material, crack stop, preheat, and cooling method.",
        "verifyBy": "confirm cast procedure"
      },
      "Hardfacing": {
        "mechanic101": "hardfacing electrodes add wear-resistant overlay material to surfaces such as buckets, blades, and wear areas",
        "commonConfusion": "Harder is not automatically better; base metal, impact, abrasion, and build-up layers all matter.",
        "seniorTechNote": "Match hardfacing product to the wear mode and base material before overlaying.",
        "verifyBy": "match wear mode"
      },
      "DCEP": {
        "mechanic101": "DCEP means direct current electrode positive, often called reverse polarity",
        "commonConfusion": "Polarity terms get mixed up quickly, and the wrong polarity changes arc behavior and weld quality.",
        "seniorTechNote": "Check the rod package and machine leads before troubleshooting a bad arc.",
        "verifyBy": "check lead polarity"
      }
    },
    "rows": [
      [
        "E6010",
        "deep penetrating DC rod",
        "pipe/root/open root",
        "DC capability"
      ],
      [
        "E6011",
        "AC/DC deep penetration",
        "dirty/rusty repair",
        "arc force"
      ],
      [
        "E6013",
        "light penetration",
        "sheet/light fabrication",
        "slag inclusions"
      ],
      [
        "E7014",
        "iron powder fill",
        "flat/horizontal fillets",
        "position"
      ],
      [
        "E7018",
        "low hydrogen",
        "structural/general repair",
        "storage"
      ],
      [
        "E7024",
        "high deposition",
        "flat/horizontal heavy welds",
        "position"
      ],
      [
        "Ni-Cl",
        "nickel cast iron",
        "cast iron repair",
        "preheat/cooling"
      ],
      [
        "Hardfacing",
        "wear overlay",
        "bucket/blade wear areas",
        "base metal"
      ],
      [
        "3/32 in",
        "small diameter",
        "thin material/root",
        "amperage"
      ],
      [
        "1/8 in",
        "common diameter",
        "general fabrication",
        "joint thickness"
      ],
      [
        "5/32 in",
        "larger diameter",
        "heavy material",
        "machine output"
      ],
      [
        "DCEP",
        "reverse polarity",
        "many rods",
        "rod requirement"
      ]
    ]
  },
  {
    "title": "MIG Wire / Shielding Gas Reference",
    "note": "Match wire, gas, transfer mode, base metal, thickness, and machine output.",
    "columns": [
      "ID",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "ER70S-6": "Very common",
      ".023 in": "Very common",
      ".035 in": "Very common",
      "C25": "Very common",
      "100% CO2": "Easy mix-up",
      "Tri-mix": "Spec required",
      "Flux-core gas shielded": "Easy mix-up",
      "Self-shielded FCAW": "High consequence"
    },
    "rowTeaching": {
      "ER70S-6": {
        "mechanic101": "ER70S-6 is a common mild-steel solid MIG wire with deoxidizers for general fabrication",
        "commonConfusion": "Wire classification does not choose settings by itself; gas, diameter, material thickness, and transfer mode still decide setup.",
        "seniorTechNote": "Match the wire to base metal and then set voltage, wire feed, gas, stickout, and travel speed from the machine chart.",
        "verifyBy": "match wire + gas chart"
      },
      ".023 in": {
        "mechanic101": ".023 wire is commonly used for thin sheet because it needs less heat and current",
        "commonConfusion": "Thin wire can feed poorly if the liner, drive rolls, tip, or tension do not match.",
        "seniorTechNote": "For thin material, use the right wire size and tune fit-up, tack spacing, and heat control.",
        "verifyBy": "match tip/rolls"
      },
      ".035 in": {
        "mechanic101": ".035 wire is a common general-fabrication size on many shop MIG machines",
        "commonConfusion": "A common wire size can still be wrong for very thin sheet or machine output limits.",
        "seniorTechNote": "Start from the door chart, then tune by weld sound, bead profile, penetration, and spatter.",
        "verifyBy": "check machine chart"
      },
      "C25": {
        "mechanic101": "C25 is 75% argon and 25% CO2, a common shielding gas mix for short-circuit mild-steel MIG",
        "commonConfusion": "Gas mix affects bead, spatter, penetration, and transfer mode; it is not just a bottle label.",
        "seniorTechNote": "If the weld changed after a cylinder swap, verify the gas mix before chasing machine settings.",
        "verifyBy": "read cylinder label"
      },
      "100% CO2": {
        "mechanic101": "100% CO2 is an active shielding gas that can increase penetration and spatter compared with C25",
        "commonConfusion": "CO2 and C25 can both weld steel, but settings and bead behavior are not identical.",
        "seniorTechNote": "When switching gas, reset expectations for voltage, wire speed, spatter, and penetration.",
        "verifyBy": "match gas/settings"
      },
      "Tri-mix": {
        "mechanic101": "tri-mix shielding gas is used for specific stainless or specialty MIG applications",
        "commonConfusion": "Stainless wire and gas choices are process-specific; mild-steel C25 assumptions may not carry over.",
        "seniorTechNote": "Use the WPS or wire/gas recommendation before welding stainless or specialty alloys.",
        "verifyBy": "check WPS/gas spec"
      },
      "Flux-core gas shielded": {
        "mechanic101": "gas-shielded flux-core wire uses a tubular electrode plus shielding gas",
        "commonConfusion": "Gas-shielded and self-shielded flux-core wires are not interchangeable just because both say flux-core.",
        "seniorTechNote": "Read the wire classification, polarity, gas requirement, and position limits before loading the spool.",
        "verifyBy": "read wire label"
      },
      "Self-shielded FCAW": {
        "mechanic101": "self-shielded flux-core wire does not use external shielding gas and is common in outdoor field work",
        "commonConfusion": "Running self-shielded wire with the wrong polarity or technique can create serious weld quality problems.",
        "seniorTechNote": "Check polarity, stickout, drag angle, and manufacturer settings before judging the wire.",
        "verifyBy": "check polarity + wire"
      }
    },
    "rows": [
      [
        "ER70S-6",
        "mild steel solid wire",
        "general steel MIG",
        "gas required"
      ],
      [
        ".023 in",
        "small wire",
        "thin sheet",
        "feed stability"
      ],
      [
        ".030 in",
        "light/general wire",
        "auto/body/light fab",
        "material thickness"
      ],
      [
        ".035 in",
        "common fab wire",
        "general fabrication",
        "machine range"
      ],
      [
        ".045 in",
        "larger wire",
        "heavy fab",
        "output capacity"
      ],
      [
        "C25",
        "75/25 argon-CO2",
        "short-circuit steel",
        "gas mix"
      ],
      [
        "100% CO2",
        "active gas",
        "deeper penetration steel",
        "spatter"
      ],
      [
        "Tri-mix",
        "stainless gas",
        "stainless MIG",
        "wire/process"
      ],
      [
        "Flux-core gas shielded",
        "tubular wire",
        "structural/heavy fab",
        "polarity"
      ],
      [
        "Self-shielded FCAW",
        "no external gas",
        "outdoor field repair",
        "wire type"
      ]
    ]
  },
  {
    "title": "Plasma Cutting Reference",
    "note": "Cut quality depends on consumables, amperage, air/gas quality, torch height, speed, and material.",
    "columns": [
      "Item",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Nozzle": "Very common",
      "Electrode": "Very common",
      "Shield": "Easy mix-up",
      "Kerf": "Very common",
      "Pierce height": "High consequence",
      "Cut height": "High consequence",
      "Dross": "Common failure",
      "Air pressure": "Common failure",
      "Amperage cartridge": "Spec required"
    },
    "rowTeaching": {
      "Nozzle": {
        "mechanic101": "the nozzle shapes and constricts the plasma arc, so wear directly affects cut quality",
        "commonConfusion": "A worn nozzle can look like bad speed, bad height, or bad material when the consumable is the real issue.",
        "seniorTechNote": "Inspect nozzle roundness and orifice damage before tuning every other setting.",
        "verifyBy": "inspect nozzle orifice"
      },
      "Electrode": {
        "mechanic101": "the electrode emits the arc and wears during cutting and piercing",
        "commonConfusion": "Electrode pit depth and wear can cause unstable starts or poor cut quality before the part program is at fault.",
        "seniorTechNote": "Track consumable life and inspect the electrode when cut quality changes suddenly.",
        "verifyBy": "check electrode pit"
      },
      "Shield": {
        "mechanic101": "the shield protects the nozzle and may be process-specific for drag, mechanized, or fine cutting",
        "commonConfusion": "Similar-looking shields can belong to different amperage or process setups.",
        "seniorTechNote": "Match the full consumable stack to the cut chart before judging torch height or speed.",
        "verifyBy": "match consumable stack"
      },
      "Kerf": {
        "mechanic101": "kerf is the cut width removed by the process and affects part size and nesting",
        "commonConfusion": "Changing consumables, amperage, material, or speed can change kerf enough to affect fit.",
        "seniorTechNote": "If parts are consistently undersize or oversize, verify kerf compensation and actual cut width.",
        "verifyBy": "measure test cut kerf"
      },
      "Pierce height": {
        "mechanic101": "pierce height keeps molten blowback away from the consumables during arc start",
        "commonConfusion": "Piercing too low can destroy consumables and look like a bad torch or material problem.",
        "seniorTechNote": "Use the cut chart pierce height and delay for the material thickness before adjusting by feel.",
        "verifyBy": "match pierce chart"
      },
      "Cut height": {
        "mechanic101": "cut height is the running torch distance that affects bevel, dross, arc voltage, and consumable life",
        "commonConfusion": "A height-control issue can be mistaken for speed, amperage, or consumable trouble.",
        "seniorTechNote": "Check actual torch height and arc voltage against the chart before changing the program.",
        "verifyBy": "match cut height"
      },
      "Dross": {
        "mechanic101": "dross is re-solidified metal and its location can hint at speed, height, consumable, or gas problems",
        "commonConfusion": "Bottom dross does not always mean the same fix; slow speed, fast speed, height, and air quality can all matter.",
        "seniorTechNote": "Use dross as a clue, then compare cut chart speed, height, amperage, and consumable condition.",
        "verifyBy": "compare dross + chart"
      },
      "Air pressure": {
        "mechanic101": "portable plasma systems depend on clean, dry air or correct gas supply at the required pressure and flow",
        "commonConfusion": "Moisture or pressure drop can mimic bad consumables and create rough cuts or short consumable life.",
        "seniorTechNote": "Check air quality, regulator drop under flow, filters, and compressor capacity.",
        "verifyBy": "check dry air flow"
      },
      "Amperage cartridge": {
        "mechanic101": "some plasma systems use process-specific cartridges or consumables matched to amperage and material",
        "commonConfusion": "A consumable that fits physically can still be wrong for the amperage or material thickness.",
        "seniorTechNote": "Match amperage, material, consumable family, and cut chart as a set.",
        "verifyBy": "match cartridge chart"
      }
    },
    "rows": [
      [
        "Nozzle",
        "orifice shapes arc",
        "cut quality/kerf",
        "wear"
      ],
      [
        "Electrode",
        "arc emitter",
        "consumable core",
        "pit depth"
      ],
      [
        "Shield",
        "protects nozzle",
        "drag/mechanized cutting",
        "correct style"
      ],
      [
        "Swirl ring",
        "gas flow control",
        "arc stability",
        "damage"
      ],
      [
        "Kerf",
        "cut width",
        "nesting/offset",
        "consumable/process"
      ],
      [
        "Pierce height",
        "start height",
        "hole starts",
        "blowback"
      ],
      [
        "Cut height",
        "running torch height",
        "edge quality",
        "arc voltage"
      ],
      [
        "Dross",
        "re-solidified metal",
        "speed/height clue",
        "top vs bottom"
      ],
      [
        "Air pressure",
        "gas supply",
        "portable plasma",
        "moisture"
      ],
      [
        "Amperage cartridge",
        "process-specific consumable",
        "material thickness"
      ]
    ]
  },
  {
    "title": "Fabrication Bend Reference",
    "note": "Bend results depend on material, grain, tooling, die opening, radius, and machine setup.",
    "columns": [
      "Term",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Inside radius": "Very common",
      "K-factor": "Spec required",
      "Bend allowance": "Very common",
      "Bend deduction": "Easy mix-up",
      "Air bend": "Very common",
      "Bottoming": "Easy mix-up",
      "Die opening": "High consequence",
      "Grain direction": "High consequence"
    },
    "rowTeaching": {
      "Inside radius": {
        "mechanic101": "inside radius is the radius on the inside of the bend and is driven by tooling, material, and process",
        "commonConfusion": "Print radius, punch radius, and actual formed radius can be treated as the same thing when they are not.",
        "seniorTechNote": "Check the print requirement, tooling, and sample bend before committing a flat pattern.",
        "verifyBy": "measure formed radius"
      },
      "K-factor": {
        "mechanic101": "K-factor estimates where the neutral axis sits through the material during bending",
        "commonConfusion": "One K-factor does not fit every material, thickness, radius, tooling, and bend method.",
        "seniorTechNote": "Use known shop data or test bends for repeat work instead of guessing a universal K-factor.",
        "verifyBy": "test bend or shop data"
      },
      "Bend allowance": {
        "mechanic101": "bend allowance is the developed arc length added into flat-pattern math",
        "commonConfusion": "Bend allowance and bend deduction are opposite-side math terms and get swapped often.",
        "seniorTechNote": "Know which method your drawing, software, or brake setup uses before changing flat length.",
        "verifyBy": "confirm flat method"
      },
      "Bend deduction": {
        "mechanic101": "bend deduction is removed from flange totals to calculate flat length",
        "commonConfusion": "Using bend deduction where bend allowance is expected can shift the flat pattern the wrong direction.",
        "seniorTechNote": "If first parts are consistently long or short, check whether the formula method was mixed.",
        "verifyBy": "compare formula method"
      },
      "Air bend": {
        "mechanic101": "air bending forms the angle with punch and die contact without fully bottoming the material",
        "commonConfusion": "Air bending depends heavily on springback, die opening, material, and tooling setup.",
        "seniorTechNote": "Expect angle tuning and verify first-piece results before running quantity.",
        "verifyBy": "first-piece angle check"
      },
      "Bottoming": {
        "mechanic101": "bottoming drives the material closer into the die for more repeatable angle control than air bending",
        "commonConfusion": "Bottoming and coining are often mixed up, but tonnage and tooling demands differ.",
        "seniorTechNote": "Confirm the intended bend method before applying tonnage or choosing tooling.",
        "verifyBy": "confirm bend method"
      },
      "Die opening": {
        "mechanic101": "die opening strongly affects bend radius, tonnage, flange limits, and part marking",
        "commonConfusion": "Changing V-die width can change the formed part even when the angle setting looks the same.",
        "seniorTechNote": "Record die opening with the job setup; it is part of the process, not a minor detail.",
        "verifyBy": "record V-die width"
      },
      "Grain direction": {
        "mechanic101": "grain direction is the rolling direction of sheet or plate and can affect cracking during bending",
        "commonConfusion": "A bend that worked one direction can crack when rotated across the sheet or plate.",
        "seniorTechNote": "For tight bends or crack-prone material, plan bend direction before nesting blanks.",
        "verifyBy": "mark grain direction"
      }
    },
    "rows": [
      [
        "Inside radius",
        "bend inner radius",
        "formed part geometry",
        "tool radius"
      ],
      [
        "K-factor",
        "neutral axis factor",
        "flat pattern math",
        "material/process"
      ],
      [
        "Bend allowance",
        "arc length added",
        "flat pattern calculation",
        "units"
      ],
      [
        "Bend deduction",
        "length removed",
        "flange layout",
        "method"
      ],
      [
        "Setback",
        "mold line distance",
        "layout reference",
        "angle"
      ],
      [
        "Air bend",
        "three-point bend",
        "common press brake process",
        "springback"
      ],
      [
        "Bottoming",
        "punch bottoms material",
        "more repeatable angle",
        "tonnage"
      ],
      [
        "Coining",
        "high-tonnage forming",
        "tight angle control",
        "tool wear"
      ],
      [
        "Die opening",
        "V-die width",
        "radius/tonnage driver",
        "material thickness"
      ],
      [
        "Grain direction",
        "rolling direction",
        "crack control",
        "bend orientation"
      ]
    ]
  },
  {
    "title": "Structural Shape ID Reference",
    "note": "Shape designations vary by standard and supplier. Confirm dimensions, weight, grade, and mill cert.",
    "columns": [
      "ID",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "W8x18": "Very common",
      "C6x8.2": "Easy mix-up",
      "L2x2x1/4": "Very common",
      "HSS2x2x1/4": "Very common",
      "Pipe 2 SCH40": "Easy mix-up",
      "Plate": "Spec required",
      "Expanded metal": "Easy mix-up"
    },
    "rowTeaching": {
      "W8x18": {
        "mechanic101": "W-shape designations identify wide-flange beam family, nominal depth, and weight per foot",
        "commonConfusion": "The nominal depth is not the exact measured depth, and weight per foot changes the actual section.",
        "seniorTechNote": "Confirm the shape table, actual dimensions, grade, and mill cert before substitution.",
        "verifyBy": "match shape table"
      },
      "C6x8.2": {
        "mechanic101": "C-channel designations identify channel family, nominal depth, and weight per foot",
        "commonConfusion": "Channel, miscellaneous channel, and formed channel can look similar but differ in flange geometry and strength.",
        "seniorTechNote": "Do not replace structural channel from tape-measure depth alone. Match designation and grade.",
        "verifyBy": "confirm channel designation"
      },
      "L2x2x1/4": {
        "mechanic101": "angle designations identify leg sizes and thickness",
        "commonConfusion": "Equal-leg and unequal-leg angles can be flipped or substituted accidentally during layout.",
        "seniorTechNote": "Check leg lengths, thickness, grade, and orientation before cutting brackets or frames.",
        "verifyBy": "measure both legs"
      },
      "HSS2x2x1/4": {
        "mechanic101": "HSS designations identify hollow structural section outside dimensions and wall thickness",
        "commonConfusion": "Tube and pipe language gets mixed up; HSS dimensions and pipe nominal sizes are different systems.",
        "seniorTechNote": "Verify wall thickness, corner radius, grade, and weld seam/orientation if it matters to the part.",
        "verifyBy": "measure OD + wall"
      },
      "Pipe 2 SCH40": {
        "mechanic101": "pipe size is nominal and schedule controls wall thickness, so the actual OD is not 2 inches",
        "commonConfusion": "Pipe is often substituted for tube or HSS because it looks close, but fit and strength assumptions can fail.",
        "seniorTechNote": "Confirm actual OD, schedule, material, and whether the design expects pipe or tubing.",
        "verifyBy": "check pipe schedule"
      },
      "Plate": {
        "mechanic101": "plate is specified by thickness, grade, flatness/size, and sometimes certification requirements",
        "commonConfusion": "A plate of the same thickness can be wrong by grade, condition, finish, or certification.",
        "seniorTechNote": "For load-bearing or customer work, verify grade and cert instead of pulling generic plate from stock.",
        "verifyBy": "verify grade/cert"
      },
      "Expanded metal": {
        "mechanic101": "expanded metal is slit and stretched sheet with strand size, opening, flattening, and orientation details",
        "commonConfusion": "Raised and flattened expanded metal can differ in thickness, grip, and fit even if the opening looks close.",
        "seniorTechNote": "Match style, opening, strand, sheet size, and load/walkway need before ordering.",
        "verifyBy": "match expanded spec"
      }
    },
    "rows": [
      [
        "W8x18",
        "wide-flange beam",
        "structural beam",
        "weight/ft"
      ],
      [
        "C6x8.2",
        "channel",
        "frames/supports",
        "flange slope"
      ],
      [
        "L2x2x1/4",
        "angle",
        "brackets/frames",
        "leg thickness"
      ],
      [
        "HSS2x2x1/4",
        "square tube",
        "machine frames",
        "wall thickness"
      ],
      [
        "HSS3x2x1/4",
        "rect tube",
        "frames/guards",
        "orientation"
      ],
      [
        "Pipe 2 SCH40",
        "nominal pipe",
        "rails/utility",
        "actual OD"
      ],
      [
        "Flat bar",
        "rectangular bar",
        "tabs/brackets",
        "thickness"
      ],
      [
        "Round bar",
        "solid round",
        "pins/shafts",
        "diameter/material"
      ],
      [
        "Plate",
        "flat plate",
        "bases/gussets",
        "thickness/grade"
      ],
      [
        "Expanded metal",
        "slit/stretched sheet",
        "guards/walkways",
        "strand size"
      ]
    ]
  }
];

  if (typeof window !== "undefined") {
    window.MaintainOpsReferenceData = window.MaintainOpsReferenceData || {};
    window.MaintainOpsReferenceData["fabrication"] = FABRICATION_REFERENCE_SECTIONS;
  }

  if (typeof module !== "undefined") {
    module.exports = { FABRICATION_REFERENCE_SECTIONS };
  }
})();
