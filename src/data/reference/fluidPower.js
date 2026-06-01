// fluid-power shop reference chart data. Kept separate so reference content can grow without recreating a data monolith.
(function () {
  const FLUID_POWER_REFERENCE_SECTIONS = [
  {
    "title": "Hydraulic Hose Dash Reference",
    "note": "Confirm hose construction, pressure rating, fitting series, bend radius, and fluid compatibility.",
    "columns": [
      "Dash",
      "Nominal ID",
      "Approx mm",
      "Common use note"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "-4": "Very common",
      "-6": "Very common",
      "-8": "Very common",
      "-12": "High consequence",
      "-16": "High consequence",
      "2SN": "Very common",
      "4SP": "Spec required",
      "Suction": "Easy mix-up"
    },
    "rowTeaching": {
      "-4": {
        "mechanic101": "-4 hose is nominal 1/4 inch ID and is common on small cylinders, steering, and compact hydraulic circuits",
        "commonConfusion": "Dash size describes hose ID family, not pressure rating or fitting thread by itself.",
        "seniorTechNote": "Match dash size, hose construction, pressure rating, fitting series, and bend radius before crimping.",
        "verifyBy": "read layline + fitting"
      },
      "-6": {
        "mechanic101": "-6 hose is nominal 3/8 inch ID and is one of the most common hydraulic hose sizes",
        "commonConfusion": "A -6 hose can carry many different pressure ratings depending on construction and hose series.",
        "seniorTechNote": "Do not replace by diameter only. Read the layline and match the crimp spec to the fitting system.",
        "verifyBy": "layline + crimp chart"
      },
      "-8": {
        "mechanic101": "-8 hose is nominal 1/2 inch ID and is common on medium-flow hydraulic circuits",
        "commonConfusion": "Upsizing or downsizing hose can change speed, heat, pressure drop, and fitting fit-up.",
        "seniorTechNote": "If a hose runs hot or noisy, check routing, bend radius, flow, and pressure drop instead of only copying length.",
        "verifyBy": "flow + routing check"
      },
      "-12": {
        "mechanic101": "-12 hose is nominal 3/4 inch ID and often handles larger cylinder, return, or feed flow",
        "commonConfusion": "Large hose is easy to treat as low risk, but wrong construction or fitting can fail violently under pressure.",
        "seniorTechNote": "For large hydraulic hoses, verify pressure, impulse rating, fitting compatibility, routing protection, and clamp support.",
        "verifyBy": "pressure + routing"
      },
      "-16": {
        "mechanic101": "-16 hose is nominal 1 inch ID and is common on large return, suction, or high-flow circuits",
        "commonConfusion": "Return, suction, and pressure hose may share size language but need different construction.",
        "seniorTechNote": "Identify whether the hose sees pressure, suction, vacuum, or return flow before choosing replacement stock.",
        "verifyBy": "circuit role + layline"
      },
      "2SN": {
        "mechanic101": "2SN is a common two-wire braid hydraulic hose construction for many medium/high-pressure applications",
        "commonConfusion": "Two-wire braid does not mean all brands, pressures, temperatures, and fittings are interchangeable.",
        "seniorTechNote": "Use the hose manufacturer's crimp chart. Hose, stem, ferrule, and crimper settings are a system.",
        "verifyBy": "manufacturer crimp spec"
      },
      "4SP": {
        "mechanic101": "4SP is a spiral-wire hydraulic hose construction for high-pressure impulse service",
        "commonConfusion": "Spiral hose usually needs different fittings and crimp specs than wire-braid hose.",
        "seniorTechNote": "Treat spiral hose replacement as spec-required. Match construction, pressure, impulse, fitting family, and bend radius.",
        "verifyBy": "hose spec + fitting"
      },
      "Suction": {
        "mechanic101": "Suction hose must resist collapse at the pump inlet and may not be built like ordinary pressure hose",
        "commonConfusion": "A hose that fits the barb or fitting can still collapse internally under suction.",
        "seniorTechNote": "For pump inlet lines, verify suction/vacuum rating, reinforcement, routing, clamps, and strainer restriction.",
        "verifyBy": "vacuum rating + routing"
      }
    },
    "rows": [
      [
        "-2",
        "1/8 in",
        "3.2 mm",
        "pilot lines / grease"
      ],
      [
        "-3",
        "3/16 in",
        "4.8 mm",
        "brake or small hydraulic lines"
      ],
      [
        "-4",
        "1/4 in",
        "6.4 mm",
        "small cylinders / steering"
      ],
      [
        "-5",
        "5/16 in",
        "7.9 mm",
        "less common OEM hose"
      ],
      [
        "-6",
        "3/8 in",
        "9.5 mm",
        "common hydraulic hose"
      ],
      [
        "-8",
        "1/2 in",
        "12.7 mm",
        "medium flow hydraulics"
      ],
      [
        "-10",
        "5/8 in",
        "15.9 mm",
        "higher-flow return/feed"
      ],
      [
        "-12",
        "3/4 in",
        "19.1 mm",
        "large cylinders / return"
      ],
      [
        "-16",
        "1 in",
        "25.4 mm",
        "large return/suction"
      ],
      [
        "-20",
        "1-1/4 in",
        "31.8 mm",
        "large suction/return"
      ],
      [
        "-24",
        "1-1/2 in",
        "38.1 mm",
        "large hydraulic return"
      ],
      [
        "-32",
        "2 in",
        "50.8 mm",
        "large suction line"
      ],
      [
        "1SN",
        "wire braid",
        "medium pressure",
        "single braid"
      ],
      [
        "2SN",
        "wire braid",
        "higher pressure",
        "double braid"
      ],
      [
        "4SP",
        "spiral wire",
        "high-pressure impulse",
        "bend radius"
      ],
      [
        "4SH",
        "spiral wire",
        "very high pressure",
        "crimp spec"
      ],
      [
        "R12",
        "spiral wire",
        "heavy hydraulic service",
        "temperature"
      ],
      [
        "R13",
        "spiral wire",
        "severe impulse service",
        "fitting match"
      ],
      [
        "R15",
        "spiral wire",
        "very high impulse service",
        "fitting match"
      ],
      [
        "Suction",
        "reinforced",
        "pump inlet / reservoir",
        "collapse rating"
      ]
    ]
  },
  {
    "title": "Shaft Seal Reference",
    "note": "Confirm shaft finish, housing bore, seal lip material, pressure, speed, and installation direction.",
    "columns": [
      "Size ID x OD x W",
      "Common code",
      "Material",
      "Common use note"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "20 x 35 x 7 mm": "Very common",
      "25 x 40 x 7 mm": "Very common",
      "30 x 47 x 7 mm": "Very common",
      "35 x 52 x 7 mm": "Very common",
      "40 x 62 x 8 mm": "High consequence",
      "1 x 1.5 x .25 in": "Easy mix-up",
      "2 x 3 x .375 in": "High consequence"
    },
    "rowTeaching": {
      "20 x 35 x 7 mm": {
        "mechanic101": "20 x 35 x 7 mm is a common metric oil seal size used around small gearboxes and shafts",
        "commonConfusion": "Seal size does not prove lip material, spring style, pressure capability, or rotation direction.",
        "seniorTechNote": "Before replacing a shaft seal, inspect the shaft wear groove and bore condition or the new seal may leak immediately.",
        "verifyBy": "measure shaft + bore"
      },
      "25 x 40 x 7 mm": {
        "mechanic101": "25 x 40 x 7 mm is a common pump and small gearbox shaft seal size",
        "commonConfusion": "A seal can match dimensions and still be wrong for heat, fluid, pressure, or dust lip requirements.",
        "seniorTechNote": "Read the seal markings and match material. Use FKM or special material only where the application calls for it.",
        "verifyBy": "seal code + fluid"
      },
      "30 x 47 x 7 mm": {
        "mechanic101": "30 x 47 x 7 mm appears often on gearboxes, pumps, and rotating equipment",
        "commonConfusion": "Installation depth and lip direction can matter as much as dimensions.",
        "seniorTechNote": "Install square, protect the lip over keyways, and face the primary lip toward the fluid or pressure side unless specified otherwise.",
        "verifyBy": "lip direction + depth"
      },
      "35 x 52 x 7 mm": {
        "mechanic101": "35 x 52 x 7 mm is a common shaft seal size for medium rotating equipment",
        "commonConfusion": "Repeat seal leaks are often blamed on the seal when the shaft groove, bearing play, vent, or misalignment is the cause.",
        "seniorTechNote": "On repeat leaks, check shaft runout, bearing looseness, venting, surface finish, and contamination before changing brands.",
        "verifyBy": "shaft condition check"
      },
      "40 x 62 x 8 mm": {
        "mechanic101": "40 x 62 x 8 mm is a larger common metric seal size where shaft condition and installation quality matter more",
        "commonConfusion": "Larger seals can cock in the bore or roll the lip during installation.",
        "seniorTechNote": "Use a proper driver, inspect bore chamfer, lubricate the lip, and confirm venting before startup.",
        "verifyBy": "driver + bore check"
      },
      "1 x 1.5 x .25 in": {
        "mechanic101": "Inch shaft seals are listed by shaft ID, housing OD, and width, which can be confused with metric markings",
        "commonConfusion": "A 25 mm metric seal and 1 inch inch-size seal can seem close but are not automatically interchangeable.",
        "seniorTechNote": "Do not convert by approximation on seals. Measure in the original unit family and match the catalog code.",
        "verifyBy": "caliper + catalog"
      },
      "2 x 3 x .375 in": {
        "mechanic101": "Large inch shaft seals are common on pumps, gearboxes, and older equipment",
        "commonConfusion": "A large seal may hide a worn sleeve or shaft groove that needs repair, not just another seal.",
        "seniorTechNote": "For larger shafts, inspect for wear sleeves, shaft repair options, bearing looseness, and case pressure before replacement.",
        "verifyBy": "shaft sleeve inspection"
      }
    },
    "rows": [
      [
        "12 x 22 x 7 mm",
        "TC 12-22-7",
        "NBR",
        "small gearbox shafts"
      ],
      [
        "15 x 26 x 7 mm",
        "TC 15-26-7",
        "NBR",
        "small motors/gears"
      ],
      [
        "17 x 30 x 7 mm",
        "TC 17-30-7",
        "NBR",
        "small pumps"
      ],
      [
        "20 x 35 x 7 mm",
        "TC 20-35-7",
        "NBR",
        "gearbox shafts"
      ],
      [
        "25 x 40 x 7 mm",
        "TC 25-40-7",
        "NBR",
        "pump shafts"
      ],
      [
        "25 x 47 x 7 mm",
        "TC 25-47-7",
        "NBR",
        "motor/gearbox shafts"
      ],
      [
        "30 x 47 x 7 mm",
        "TC 30-47-7",
        "NBR",
        "gear reducers"
      ],
      [
        "30 x 52 x 8 mm",
        "TC 30-52-8",
        "NBR",
        "pump housings"
      ],
      [
        "35 x 52 x 7 mm",
        "TC 35-52-7",
        "NBR",
        "gearbox output"
      ],
      [
        "35 x 62 x 8 mm",
        "TC 35-62-8",
        "NBR",
        "larger reducers"
      ],
      [
        "40 x 62 x 8 mm",
        "TC 40-62-8",
        "NBR",
        "larger shafts"
      ],
      [
        "40 x 72 x 10 mm",
        "TC 40-72-10",
        "NBR",
        "industrial reducers"
      ],
      [
        "45 x 72 x 10 mm",
        "TC 45-72-10",
        "NBR",
        "pump/gearbox"
      ],
      [
        "50 x 72 x 10 mm",
        "TC 50-72-10",
        "NBR",
        "larger gearbox"
      ],
      [
        "50 x 80 x 10 mm",
        "TC 50-80-10",
        "NBR",
        "large reducers"
      ],
      [
        "1 x 1.5 x .25 in",
        "inch lip seal",
        "NBR",
        "small inch shafts"
      ],
      [
        "1.25 x 2 x .25 in",
        "inch lip seal",
        "NBR",
        "inch pump shafts"
      ],
      [
        "1.5 x 2.25 x .375 in",
        "inch lip seal",
        "NBR",
        "gearbox shafts"
      ],
      [
        "2 x 3 x .375 in",
        "inch lip seal",
        "NBR",
        "large inch shafts"
      ],
      [
        "2.5 x 3.5 x .375 in",
        "inch lip seal",
        "NBR",
        "heavy equipment shafts"
      ]
    ]
  },
  {
    "title": "Hydraulic Cylinder Seal ID Reference",
    "note": "Seal selection depends on bore, rod, groove, pressure, fluid, temperature, and surface finish.",
    "columns": [
      "Seal",
      "Location",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Rod seal": "Very common",
      "Wiper": "Common failure",
      "Piston seal": "High consequence",
      "Backup ring": "Easy mix-up",
      "U-cup": "Very common"
    },
    "rowTeaching": {
      "Rod seal": {
        "mechanic101": "The rod seal keeps pressurized oil from leaking out around the moving rod",
        "commonConfusion": "A rod leak may be blamed on the seal alone when rod scratches, chrome damage, or side load caused it.",
        "seniorTechNote": "Before resealing, inspect rod finish, gland wear, bushing support, and contamination source.",
        "verifyBy": "inspect rod + gland"
      },
      "Wiper": {
        "mechanic101": "The wiper scrapes dirt from the rod before it enters the gland",
        "commonConfusion": "A failed wiper may not leak oil immediately, but it can feed dirt into the rod seal.",
        "seniorTechNote": "If a rod seal fails repeatedly in dirty service, check the wiper and rod exposure, not only the pressure seal.",
        "verifyBy": "check wiper lip"
      },
      "Piston seal": {
        "mechanic101": "The piston seal separates pressure between cylinder sides and affects force and drift",
        "commonConfusion": "Cylinder drift can come from piston bypass, valve leakage, or holding circuit leakage.",
        "seniorTechNote": "Use isolation testing before condemning the cylinder, especially on lifted or clamped loads.",
        "verifyBy": "isolate cylinder ports"
      },
      "Backup ring": {
        "mechanic101": "A backup ring supports an O-ring so pressure does not extrude it into a gap",
        "commonConfusion": "Backup ring side and pressure direction matter; wrong placement can fail quickly.",
        "seniorTechNote": "When disassembling, record ring order and orientation before removing the old stack.",
        "verifyBy": "match stack orientation"
      },
      "U-cup": {
        "mechanic101": "A U-cup is a dynamic seal whose open side usually faces pressure",
        "commonConfusion": "Installing a U-cup backward can leak immediately or fail under load.",
        "seniorTechNote": "Use the old seal, groove, and pressure direction to confirm orientation before assembly.",
        "verifyBy": "open side to pressure"
      }
    },
    "rows": [
      [
        "Rod seal",
        "gland",
        "keeps oil in cylinder",
        "lip direction"
      ],
      [
        "Wiper",
        "rod exterior",
        "keeps dirt out",
        "rod damage"
      ],
      [
        "Piston seal",
        "piston OD",
        "separates pressure sides",
        "energizer"
      ],
      [
        "Wear ring",
        "rod/piston guide",
        "prevents metal contact",
        "gap"
      ],
      [
        "Buffer seal",
        "behind rod seal",
        "shock pressure protection",
        "orientation"
      ],
      [
        "O-ring",
        "static seal",
        "gland/port sealing",
        "durometer"
      ],
      [
        "Backup ring",
        "anti-extrusion",
        "high-pressure O-rings",
        "side placement"
      ],
      [
        "U-cup",
        "dynamic seal",
        "rod or piston sealing",
        "open side to pressure"
      ],
      [
        "Loaded lip seal",
        "energized seal",
        "dynamic cylinder service",
        "profile match"
      ],
      [
        "Chevron/V-pack",
        "stacked packing",
        "older cylinders/presses",
        "adjustment"
      ],
      [
        "Glyd ring",
        "PTFE piston seal",
        "low-friction cylinders",
        "energizer"
      ],
      [
        "Static gasket",
        "end cap seal",
        "cylinder head sealing",
        "compression set"
      ]
    ]
  },
  {
    "title": "O-Ring Material Reference",
    "note": "O-ring material depends on fluid, temperature, pressure, and movement. Verify compatibility before replacement.",
    "columns": [
      "Material",
      "Common use note",
      "Strength",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "NBR / Buna-N": "Very common",
      "FKM / Viton": "Very common",
      "EPDM": "Easy mix-up",
      "PTFE": "Spec required",
      "Urethane": "Common failure"
    },
    "rowTeaching": {
      "NBR / Buna-N": {
        "mechanic101": "NBR/Buna-N is a common oil and hydraulic O-ring material",
        "commonConfusion": "Common does not mean universal; heat, ozone, fuel blend, and fluid additives can still attack it.",
        "seniorTechNote": "Use Buna as a likely starting point for oil service, then verify fluid and temperature compatibility.",
        "verifyBy": "fluid + temp chart"
      },
      "FKM / Viton": {
        "mechanic101": "FKM/Viton is common for higher heat and many chemical or fuel exposures",
        "commonConfusion": "Viton is not automatically best for steam or every coolant/water application.",
        "seniorTechNote": "For hot chemical service, confirm exact fluid, concentration, and temperature before ordering seals.",
        "verifyBy": "compatibility chart"
      },
      "EPDM": {
        "mechanic101": "EPDM is common for water, steam, coolant, and weather exposure",
        "commonConfusion": "EPDM is generally poor for petroleum oil, so it can fail quickly in hydraulic or oil service.",
        "seniorTechNote": "If a black O-ring swells or gets gummy in oil, verify material instead of assuming size was wrong.",
        "verifyBy": "fluid compatibility"
      },
      "PTFE": {
        "mechanic101": "PTFE has strong chemical resistance but low elasticity compared with rubber O-rings",
        "commonConfusion": "A PTFE ring may not seal like a rubber O-ring in a groove designed for elastomer squeeze.",
        "seniorTechNote": "Use PTFE only when the gland design and installation method support it.",
        "verifyBy": "gland design spec"
      },
      "Urethane": {
        "mechanic101": "Urethane is tough and abrasion resistant, often used in dynamic seal applications",
        "commonConfusion": "Toughness does not guarantee chemical compatibility.",
        "seniorTechNote": "For dynamic hydraulic seals, match hardness, profile, fluid, surface finish, and temperature.",
        "verifyBy": "seal profile + fluid"
      }
    },
    "rows": [
      [
        "NBR / Buna-N",
        "oil and hydraulic service",
        "common/low cost",
        "ozone/heat limits"
      ],
      [
        "FKM / Viton",
        "heat and chemical exposure",
        "high temp",
        "not best for steam"
      ],
      [
        "EPDM",
        "water/steam/coolant",
        "weather resistant",
        "poor petroleum oil"
      ],
      [
        "Silicone",
        "wide temperature range",
        "flexible",
        "low tear strength"
      ],
      [
        "PTFE",
        "chemical resistance",
        "very inert",
        "low elasticity"
      ],
      [
        "HNBR",
        "hydraulic/mobile equipment",
        "heat/oil resistance",
        "cost"
      ],
      [
        "Neoprene",
        "refrigerant/weather",
        "moderate oil resistance",
        "application-specific"
      ],
      [
        "Urethane",
        "abrasion/dynamic seals",
        "tough",
        "chemical limits"
      ],
      [
        "FFKM",
        "severe chemicals/heat",
        "highest compatibility range",
        "high cost"
      ],
      [
        "Aflas",
        "steam/amine/oil service",
        "chemical resistance",
        "application-specific"
      ],
      [
        "PTFE encapsulated",
        "chemical service",
        "inert jacket",
        "low elasticity"
      ],
      [
        "Leather",
        "older hydraulic seals",
        "legacy equipment",
        "drying/wear"
      ]
    ]
  },
  {
    "title": "Hydraulic Leak / Failure Reference",
    "note": "Hydraulic leak checks depend on pressure, fluid, fittings, and equipment design. Depressurize before inspection.",
    "columns": [
      "Symptom",
      "Likely area",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "External hose leak": "High consequence",
      "Cylinder drift": "High consequence",
      "Weak force": "Very common",
      "Foamy oil": "Common failure",
      "Pump whine": "High consequence"
    },
    "rowTeaching": {
      "External hose leak": {
        "mechanic101": "A wet hose or fitting can indicate damaged hose, loose fitting, wrong assembly, or overpressure",
        "commonConfusion": "Hydraulic leaks can inject fluid under skin; never check with hands.",
        "seniorTechNote": "Depressurize and inspect hose rating, bend radius, abrasion, fitting type, and routing before replacement.",
        "verifyBy": "safe depressurize + inspect"
      },
      "Cylinder drift": {
        "mechanic101": "Cylinder drift can come from piston seal bypass, valve leakage, hose expansion, or holding-circuit problems",
        "commonConfusion": "The cylinder often gets blamed first, but the control valve or counterbalance circuit may be the cause.",
        "seniorTechNote": "Use safe load support and isolation testing before replacing cylinder seals.",
        "verifyBy": "support load + isolate"
      },
      "Weak force": {
        "mechanic101": "Weak hydraulic force can mean low pressure, internal leakage, pump wear, relief setting, or mechanical binding",
        "commonConfusion": "Adjusting the relief without gauges can create new hazards and hide the real fault.",
        "seniorTechNote": "Measure pressure and flow under the actual failure condition before turning settings.",
        "verifyBy": "gauge under load"
      },
      "Foamy oil": {
        "mechanic101": "Foamy oil usually indicates air entering or being trapped in the hydraulic system",
        "commonConfusion": "Air foam can look like bad oil while the suction leak or low reservoir condition remains.",
        "seniorTechNote": "Check reservoir level, suction fittings, pump inlet restrictions, and return-line aeration.",
        "verifyBy": "suction + reservoir"
      },
      "Pump whine": {
        "mechanic101": "Pump whine often points to cavitation, aeration, inlet restriction, or failing pump components",
        "commonConfusion": "A noisy pump may be starving for oil rather than mechanically bad.",
        "seniorTechNote": "Stop chasing downstream parts until suction strainer, inlet hose, oil viscosity, and reservoir level are checked.",
        "verifyBy": "inlet condition"
      }
    },
    "rows": [
      [
        "External hose leak",
        "hose/fitting",
        "wet hose or fitting",
        "pressure rating"
      ],
      [
        "Cylinder drift",
        "piston seal/valve",
        "load slowly moves",
        "holding circuit"
      ],
      [
        "Weak force",
        "low pressure/bypass",
        "presses/lifts",
        "relief setting"
      ],
      [
        "Foamy oil",
        "air ingress",
        "pump noise",
        "suction leak"
      ],
      [
        "Hot oil",
        "restriction/bypass",
        "slow systems",
        "cooler/filter"
      ],
      [
        "Pump whine",
        "cavitation",
        "low inlet flow",
        "suction strainer"
      ],
      [
        "Jerky motion",
        "air/contamination",
        "cylinders",
        "bleed/filter"
      ],
      [
        "Black oil",
        "heat/contamination",
        "old fluid",
        "sample oil"
      ]
    ]
  },
  {
    "title": "Hydraulic Fluid Condition Reference",
    "note": "Fluid appearance is a field clue, not a lab result. Compare a clean sample, check filters and reservoir conditions, and use oil analysis when the finding affects operation.",
    "columns": [
      "Condition",
      "Look",
      "Likely clue",
      "First check"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Milky / cloudy oil": "High consequence",
      "Foam on surface": "Common failure",
      "Air bubbles suspended": "Easy mix-up",
      "Dark / burnt smell": "High consequence",
      "Metallic sparkle": "High consequence",
      "Sludge / varnish": "Common failure",
      "Water at reservoir drain": "Common failure"
    },
    "rowTeaching": {
      "Milky / cloudy oil": {
        "commonConfusion": "Milky oil is often treated like normal color change, but a cloudy emulsion points toward water mixed into the oil and can mean rust, cavitation, sludge, and poor lubricity.",
        "seniorTechNote": "Milky oil is a stop-and-sample clue. Check for free water, bad breathers, washdown entry, cooler leaks, and whether the machine has been agitating water into the reservoir."
      },
      "Foam on surface": {
        "commonConfusion": "Surface foam and suspended air are related but not identical. Foam is visible on top; entrained air can hide below the surface and still cause noise, heat, and sluggish response.",
        "seniorTechNote": "Foam usually means air management trouble. Check oil level, return flow, anti-foam condition, suction leaks, and whether the reservoir is being churned or overfilled."
      },
      "Air bubbles suspended": {
        "commonConfusion": "Suspended bubbles can be mistaken for water haze. Let the sample sit and compare: air clears differently, while water emulsion often stays cloudy or separates slowly.",
        "seniorTechNote": "Entrained air is a pump and valve warning. Look for suction leaks, low oil level, return-line aeration, cylinder cycling effects, and cavitation noise before changing parts."
      },
      "Dark / burnt smell": {
        "commonConfusion": "Dark oil is not automatically failed oil, but burnt odor plus darkening points toward heat, oxidation, overextended service, or the wrong operating condition.",
        "seniorTechNote": "Burnt-smelling oil is a heat-history clue. Check temperature, cooler flow, relief bypass, filter restriction, viscosity, and whether the oil analysis shows oxidation or additive depletion."
      },
      "Metallic sparkle": {
        "commonConfusion": "Shiny particles are not the same as ordinary dirt. Metal in the sample points toward active wear, repair debris, cavitation damage, or a component breaking down.",
        "seniorTechNote": "Metal sparkle should trigger filter inspection and oil analysis. Cut the filter if practical, check recent repairs, and watch pumps, motors, cylinders, and valves for generated wear."
      },
      "Sludge / varnish": {
        "commonConfusion": "Sticky varnish is easy to confuse with dirt, but it often comes from oxidation, heat, air, water, or degraded oil chemistry and can stick valves even when bulk oil tests look normal.",
        "seniorTechNote": "Varnish is a reliability clue, not just dirty oil. Check temperature control, oil age, valve sticking complaints, filter loading, and whether varnish-specific testing or cleanup is needed."
      },
      "Water at reservoir drain": {
        "commonConfusion": "Free water at the drain can be missed if only the top of the reservoir is checked. Oil floats above water, so the bottom drain tells a different story than the sight glass.",
        "seniorTechNote": "Free water means find the entry path. Check breathers, washdown, storage/top-off handling, coolers, condensation cycles, and whether dehydration or fluid change is required."
      }
    },
    "rows": [
      [
        "Clear / normal color",
        "clear amber to darker normal",
        "baseline depends on oil age/type",
        "compare clean sample"
      ],
      [
        "Milky / cloudy oil",
        "hazy, cloudy, mayonnaise-like",
        "water contamination/emulsion",
        "bottom drain + sample"
      ],
      [
        "Foam on surface",
        "bubbles sitting on top",
        "air contamination or churn",
        "oil level/suction leaks"
      ],
      [
        "Air bubbles suspended",
        "tiny bubbles in oil body",
        "entrained air/aeration",
        "let sample settle"
      ],
      [
        "Dark / burnt smell",
        "dark oil, hot odor",
        "oxidation/overheat",
        "temperature + oil sample"
      ],
      [
        "Metallic sparkle",
        "shiny flakes or glitter",
        "wear debris/repair debris",
        "filter + oil analysis"
      ],
      [
        "Sludge / varnish",
        "sticky brown film/deposits",
        "oxidation/deposit formation",
        "valves/filter/temperature"
      ],
      [
        "Water at reservoir drain",
        "free water or emulsion first",
        "water settled at bottom",
        "drain test + source"
      ],
      [
        "Dirty / gritty oil",
        "visible dirt or grit",
        "particulate ingress",
        "filter/breather/service practice"
      ],
      [
        "Wrong or mixed fluid",
        "odd color or separation",
        "cross-contamination/additive clash",
        "fluid ID + service history"
      ]
    ]
  },
  {
    "title": "Pump Seal Failure Reference",
    "note": "Seal failure is often a symptom of dry run, misalignment, vibration, heat, or wrong materials.",
    "columns": [
      "Symptom",
      "Likely cause",
      "Common use note",
      "First check"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Dripping at seal": "Common failure",
      "Sudden heavy leak": "High consequence",
      "Seal runs hot": "High consequence",
      "Repeated failure": "High consequence",
      "Cavitation noise": "Common failure"
    },
    "rowTeaching": {
      "Dripping at seal": {
        "mechanic101": "A seal drip can indicate face wear, flush problems, shaft sleeve wear, or operating condition changes",
        "commonConfusion": "Tightening nearby packing logic does not apply to a mechanical seal.",
        "seniorTechNote": "Identify seal type and flush/pressure conditions before replacing parts.",
        "verifyBy": "seal type + flush"
      },
      "Sudden heavy leak": {
        "mechanic101": "A sudden heavy leak can mean seal face damage, dry running, pressure upset, or broken components",
        "commonConfusion": "The visible leak is the result; the cause may be a process upset or lost flush.",
        "seniorTechNote": "Protect the area, stop safely, and identify whether the pump ran dry or changed operating point.",
        "verifyBy": "safe stop + inspect"
      },
      "Seal runs hot": {
        "mechanic101": "A hot seal often lacks proper lubrication, cooling, flush, or process flow",
        "commonConfusion": "Adding water or cooling after the fact may not fix wrong seal material or operating point.",
        "seniorTechNote": "Check flush plan, suction condition, deadhead risk, and seal material compatibility.",
        "verifyBy": "flush + suction"
      },
      "Repeated failure": {
        "mechanic101": "Repeated seal failure usually means the root cause remains in alignment, vibration, process, or installation",
        "commonConfusion": "Another seal kit will not fix shaft runout, pipe strain, cavitation, or wrong seal selection.",
        "seniorTechNote": "Measure alignment, runout, vibration, and process conditions before reinstalling.",
        "verifyBy": "alignment + runout"
      },
      "Cavitation noise": {
        "mechanic101": "Cavitation noise suggests vapor bubbles collapsing inside the pump due to poor suction conditions",
        "commonConfusion": "Cavitation can destroy seals and impellers while sounding like a bad bearing or gravel.",
        "seniorTechNote": "Check suction strainer, valve position, fluid temperature, NPSH margin, and pump speed.",
        "verifyBy": "suction condition"
      }
    },
    "rows": [
      [
        "Dripping at seal",
        "seal wear",
        "centrifugal pumps",
        "flush/pressure"
      ],
      [
        "Sudden heavy leak",
        "seal face damage",
        "critical pump",
        "dry run"
      ],
      [
        "Seal runs hot",
        "poor lubrication",
        "process pumps",
        "flow/flush"
      ],
      [
        "Repeated failure",
        "alignment/vibration",
        "coupled pump",
        "coupling alignment"
      ],
      [
        "Cracked faces",
        "thermal shock",
        "hot/cold service",
        "process change"
      ],
      [
        "Corrosion",
        "wrong material",
        "chemical service",
        "material spec"
      ],
      [
        "Cavitation noise",
        "suction problem",
        "low NPSH",
        "strainer/valves"
      ],
      [
        "Leaking packing",
        "packing adjustment",
        "packed pumps",
        "gland pressure"
      ]
    ]
  }
];

  if (typeof window !== "undefined") {
    window.MaintainOpsReferenceData = window.MaintainOpsReferenceData || {};
    window.MaintainOpsReferenceData["fluid-power"] = FLUID_POWER_REFERENCE_SECTIONS;
  }

  if (typeof module !== "undefined") {
    module.exports = { FLUID_POWER_REFERENCE_SECTIONS };
  }
})();
