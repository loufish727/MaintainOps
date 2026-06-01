// motors shop reference chart data. Kept separate so reference content can grow without recreating a data monolith.
(function () {
  const MOTORS_DRIVES_REFERENCE_SECTIONS = [
  {
    "title": "Belt Section Reference",
    "note": "Confirm profile, outside length, inside length, and manufacturer series before replacing belts.",
    "columns": [
      "Section",
      "Top width",
      "Height",
      "Common note"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "4L / A": "Easy mix-up",
      "5L / B": "Very common",
      "5V": "High consequence",
      "5VX": "Very common",
      "8V": "High consequence",
      "SPA": "Easy mix-up",
      "Poly-V J": "Easy mix-up"
    },
    "rowTeaching": {
      "4L / A": {
        "mechanic101": "4L and A belts are close in top width, but light-duty fractional belts and industrial A-section belts are not always the same replacement decision",
        "commonConfusion": "A 4L belt can be used where an A belt appears to fit, but duty, length basis, pulley profile, and load can make the shortcut fail early.",
        "seniorTechNote": "Match the belt code and pulley profile before treating 4L and A as interchangeable. A belt that fits the groove is not automatically the right duty.",
        "verifyBy": "read code + pulley profile"
      },
      "5L / B": {
        "mechanic101": "5L and B-size belts are common around pumps, fans, and blowers, but the belt family and length basis still matter",
        "commonConfusion": "A 5L belt may look like a B belt, but fractional/light-duty vs industrial duty can change life under load.",
        "seniorTechNote": "For repeat belt failures, stop matching only by apparent length. Confirm section, pulley wear, tension, alignment, and duty.",
        "verifyBy": "match section + length basis"
      },
      "5V": {
        "mechanic101": "5V narrow wedge belts carry higher loads in compact drives and require matching 5V sheaves",
        "commonConfusion": "A 5V belt can be confused with a conventional B/C-looking belt by size, but the wedge profile and pulley groove are different.",
        "seniorTechNote": "Do not force a 5V replacement by eyeball. Wrong profile in the wrong sheave creates heat, slip, and belt rollover.",
        "verifyBy": "check sheave profile"
      },
      "5VX": {
        "mechanic101": "5VX is a cogged narrow wedge belt used where flexibility and higher power density matter",
        "commonConfusion": "The X means cogged/notched, not a random supplier suffix. It can affect small-pulley flex and replacement behavior.",
        "seniorTechNote": "If a 5VX belt keeps failing, inspect pulley profile, small-sheave diameter, tension, and alignment before changing belt brand.",
        "verifyBy": "read belt + inspect sheave"
      },
      "8V": {
        "mechanic101": "8V belts are heavy narrow wedge belts for larger horsepower drives",
        "commonConfusion": "Large belts invite rough substitution by width, but 8V drives depend on matched sheave profile and correct tension.",
        "seniorTechNote": "Treat 8V replacements as a drive-system check. Inspect sheave wear, matched set length, alignment, and load condition.",
        "verifyBy": "check matched set"
      },
      "SPA": {
        "mechanic101": "SPA is a metric wedge belt section, not just another A belt label",
        "commonConfusion": "Metric wedge sections can be mistaken for inch sections when the belt is worn or the marking is partly gone.",
        "seniorTechNote": "When the equipment is imported or metric, confirm SPA/SPB/SPC section before ordering an inch-series belt.",
        "verifyBy": "read marking + measure section"
      },
      "Poly-V J": {
        "mechanic101": "Poly-V J belts use multiple small ribs rather than one V section, so rib count and pitch matter",
        "commonConfusion": "A poly-V belt is often ordered by approximate width, but missing rib count or wrong pitch makes it wrong.",
        "seniorTechNote": "Count ribs, read pitch/section, and check pulley groove damage before replacing compact multi-rib drives.",
        "verifyBy": "count ribs + pitch"
      }
    },
    "rows": [
      [
        "3L",
        "3/8 in",
        "7/32 in",
        "small fans / light fractional HP"
      ],
      [
        "4L / A",
        "1/2 in",
        "5/16 in",
        "shop fans and light conveyors"
      ],
      [
        "5L / B",
        "21/32 in",
        "3/8 in",
        "common pumps and blowers"
      ],
      [
        "C",
        "7/8 in",
        "17/32 in",
        "larger blowers / compressors"
      ],
      [
        "D",
        "1-1/4 in",
        "3/4 in",
        "heavy belt drives"
      ],
      [
        "E",
        "1-1/2 in",
        "29/32 in",
        "very heavy old drives"
      ],
      [
        "AX",
        "1/2 in",
        "5/16 in",
        "small pulley / high-flex A drive"
      ],
      [
        "BX",
        "21/32 in",
        "3/8 in",
        "common industrial cogged drive"
      ],
      [
        "CX",
        "7/8 in",
        "17/32 in",
        "larger cogged drive"
      ],
      [
        "3V",
        "3/8 in",
        "5/16 in",
        "compact high-speed drive"
      ],
      [
        "5V",
        "5/8 in",
        "17/32 in",
        "high-horsepower compact drive"
      ],
      [
        "8V",
        "1 in",
        "29/32 in",
        "large compressor / crusher drive"
      ],
      [
        "3VX",
        "3/8 in",
        "5/16 in",
        "cogged compact drive"
      ],
      [
        "5VX",
        "5/8 in",
        "17/32 in",
        "cogged high-horsepower drive"
      ],
      [
        "2L",
        "1/4 in",
        "5/32 in",
        "appliance / very light duty"
      ],
      [
        "SPZ",
        "10 mm",
        "8 mm",
        "metric light wedge drive"
      ],
      [
        "SPA",
        "13 mm",
        "10 mm",
        "metric pump/fan drive"
      ],
      [
        "SPB",
        "17 mm",
        "14 mm",
        "metric industrial drive"
      ],
      [
        "SPC",
        "22 mm",
        "18 mm",
        "metric heavy drive"
      ],
      [
        "Poly-V J",
        "2.34 mm rib pitch",
        "motors, treadmills, compact drives"
      ]
    ]
  },
  {
    "title": "NEMA Motor Frame Reference",
    "note": "Confirm enclosure, horsepower, shaft, base, C-face, voltage, RPM, and service factor before replacing motors.",
    "columns": [
      "Frame",
      "Shaft height",
      "Shaft dia.",
      "Common use note"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "56": "Very common",
      "56C": "Very common",
      "143T": "Very common",
      "145T": "Easy mix-up",
      "182T": "Very common",
      "184T": "Easy mix-up",
      "213T": "High consequence",
      "215T": "Easy mix-up"
    },
    "rowTeaching": {
      "56": {
        "mechanic101": "NEMA frame size mainly describes mounting dimensions and shaft height, not horsepower by itself",
        "commonConfusion": "A 56-frame motor may physically fit while voltage, RPM, enclosure, service factor, shaft style, or duty are still wrong.",
        "seniorTechNote": "Use frame size to start the fit check, then match the whole nameplate and mounting style before ordering.",
        "verifyBy": "read full nameplate"
      },
      "56C": {
        "mechanic101": "56C means a C-face mounting style on a common fractional/small motor frame",
        "commonConfusion": "A 56 and 56C can share frame-family language but differ at the mounting face and pilot.",
        "seniorTechNote": "For pump or gearbox mounts, the C-face pilot, bolt circle, shaft, and coupling position matter as much as horsepower.",
        "verifyBy": "measure C-face pilot"
      },
      "143T": {
        "mechanic101": "143T is a common small industrial T-frame family where frame fit is only one replacement requirement",
        "commonConfusion": "143T and 145T can look close because shaft height is the same, but mounting length and application details can differ.",
        "seniorTechNote": "When replacing 143T/145T motors, compare base holes, shaft, RPM, voltage, enclosure, and service factor from the nameplate.",
        "verifyBy": "compare frame drawing"
      },
      "145T": {
        "mechanic101": "145T shares shaft height with 143T but is not automatically the same mounting envelope",
        "commonConfusion": "Same shaft height can hide different base dimensions or fit conflicts in tight machine mounts.",
        "seniorTechNote": "Do not order 143T vs 145T from shaft height alone. Check the dimension chart and existing base pattern.",
        "verifyBy": "measure base holes"
      },
      "182T": {
        "mechanic101": "182T is a common general industrial frame size used on many pumps, fans, and machine drives",
        "commonConfusion": "A physically similar 184T can still shift fit or shaft placement enough to matter.",
        "seniorTechNote": "Frame replacement is a geometry check first, then an electrical/nameplate check. Both must pass.",
        "verifyBy": "match frame + nameplate"
      },
      "184T": {
        "mechanic101": "184T is in the same shaft-height family as 182T but should be treated as a distinct frame",
        "commonConfusion": "The 182T/184T pair is easy to blur during ordering because many notes say similar application families.",
        "seniorTechNote": "If the motor is on a rigid base or coupled machine, verify bolt pattern and shaft position before assuming the larger frame works.",
        "verifyBy": "measure mount + shaft"
      },
      "213T": {
        "mechanic101": "larger frame motors create more fit, lifting, coupling, and starter/protection consequences when replaced incorrectly",
        "commonConfusion": "Same horsepower does not guarantee same frame, shaft, or mounting style, especially across old/new efficiency designs.",
        "seniorTechNote": "For medium frames and up, confirm frame drawing, coupling dimensions, nameplate amps, starter/drive settings, and physical handling plan.",
        "verifyBy": "compare drawing + FLA"
      },
      "215T": {
        "mechanic101": "215T is often near 213T in application range but must be checked as its own frame",
        "commonConfusion": "Near-frame swaps can cause belt alignment, coupling spacing, or base-hole problems even if the motor runs electrically.",
        "seniorTechNote": "Before accepting a near-frame substitution, check shaft height, base, shaft diameter, pulley/coupling position, and enclosure.",
        "verifyBy": "check shaft/base dimensions"
      }
    },
    "rows": [
      [
        "48",
        "3.0 in",
        "1/2 in",
        "small fractional HP motors"
      ],
      [
        "56",
        "3.5 in",
        "5/8 in",
        "common fractional HP motors"
      ],
      [
        "56C",
        "3.5 in",
        "5/8 in",
        "C-face pump/machine motors"
      ],
      [
        "143T",
        "3.5 in",
        "7/8 in",
        "small industrial motor"
      ],
      [
        "145T",
        "3.5 in",
        "7/8 in",
        "small industrial motor"
      ],
      [
        "182T",
        "4.5 in",
        "1-1/8 in",
        "general industrial motors"
      ],
      [
        "184T",
        "4.5 in",
        "1-1/8 in",
        "pumps and fans"
      ],
      [
        "213T",
        "5.25 in",
        "1-3/8 in",
        "medium industrial motors"
      ],
      [
        "215T",
        "5.25 in",
        "1-3/8 in",
        "medium pumps/blowers"
      ],
      [
        "254T",
        "6.25 in",
        "1-5/8 in",
        "larger industrial motors"
      ],
      [
        "256T",
        "6.25 in",
        "1-5/8 in",
        "larger pumps/fans"
      ],
      [
        "284T",
        "7.0 in",
        "1-7/8 in",
        "larger motor bases"
      ],
      [
        "286T",
        "7.0 in",
        "1-7/8 in",
        "larger industrial motors"
      ],
      [
        "324T",
        "8.0 in",
        "2-1/8 in",
        "large pumps/blowers"
      ],
      [
        "326T",
        "8.0 in",
        "2-1/8 in",
        "large industrial motors"
      ],
      [
        "364T",
        "9.0 in",
        "2-3/8 in",
        "large equipment motors"
      ],
      [
        "365T",
        "9.0 in",
        "2-3/8 in",
        "large fan/pump motors"
      ],
      [
        "404T",
        "10.0 in",
        "2-7/8 in",
        "very large motors"
      ],
      [
        "405T",
        "10.0 in",
        "2-7/8 in",
        "very large pumps"
      ],
      [
        "444T",
        "11.0 in",
        "3-3/8 in",
        "large process motors"
      ]
    ]
  },
  {
    "title": "Motor Nameplate Reference",
    "note": "Use motor nameplate and OEM requirements for replacement. Do not size by horsepower alone.",
    "columns": [
      "Field",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "FLA": "Very common",
      "RPM": "Very common",
      "Frame": "Very common",
      "SF": "Easy mix-up",
      "Enclosure": "Spec required",
      "Voltage": "High consequence",
      "Hz": "Easy mix-up",
      "Code": "Spec required"
    },
    "rowTeaching": {
      "FLA": {
        "mechanic101": "full-load amps is the current the motor is expected to draw at rated load and voltage",
        "commonConfusion": "FLA is often confused with breaker size, fuse size, or no-load current; those are different checks.",
        "seniorTechNote": "Use FLA for overload and drive/current-limit setup, then verify actual running amps under real load.",
        "verifyBy": "read FLA + clamp amps"
      },
      "RPM": {
        "mechanic101": "nameplate RPM reflects motor speed under rated load and is tied to pole count, slip, and frequency",
        "commonConfusion": "A 1750 RPM motor and 3450 RPM motor can share horsepower and frame but completely change machine speed.",
        "seniorTechNote": "When replacing a motor on belts, pumps, or fans, RPM errors become process errors fast. Match speed before fit.",
        "verifyBy": "match RPM + pulley ratio"
      },
      "Frame": {
        "mechanic101": "frame tells you the standardized mounting/shaft geometry family, not the full motor spec",
        "commonConfusion": "A matching frame can still be wrong by voltage, speed, enclosure, service factor, duty, or shaft details.",
        "seniorTechNote": "Frame gets the motor bolted in; the rest of the nameplate decides whether it belongs there.",
        "verifyBy": "match frame drawing"
      },
      "SF": {
        "mechanic101": "service factor is limited overload margin under rated conditions, not a normal design target",
        "commonConfusion": "Running into service factor all day can be mistaken for acceptable loading because the nameplate allows it.",
        "seniorTechNote": "If the load depends on service factor to survive, look for sizing, mechanical drag, voltage, cooling, or process issues.",
        "verifyBy": "compare load to FLA/SF"
      },
      "Enclosure": {
        "mechanic101": "enclosure describes how the motor is protected and cooled in its environment",
        "commonConfusion": "A motor that fits and runs can still be wrong for dust, washdown, outdoor exposure, or airflow.",
        "seniorTechNote": "Match enclosure to environment and cooling path. TEFC, ODP, washdown, and hazardous-location needs are not cosmetic.",
        "verifyBy": "match environment rating"
      },
      "Voltage": {
        "mechanic101": "motor voltage must match supply and lead wiring; dual-voltage motors require correct connection",
        "commonConfusion": "A dual-voltage motor can be wired wrong even if the nameplate includes the shop voltage.",
        "seniorTechNote": "Before startup, verify lead connections against the wiring diagram and compare line voltage under load.",
        "verifyBy": "check leads + line volts"
      },
      "Hz": {
        "mechanic101": "frequency changes motor speed and heating, so 50/60 Hz details matter when equipment or drives move across regions",
        "commonConfusion": "Voltage alone does not prove the motor is correct if frequency and speed assumptions are wrong.",
        "seniorTechNote": "For VFD or imported equipment, confirm base frequency, RPM, volts/Hz, and cooling before changing parameters.",
        "verifyBy": "match base Hz/RPM"
      },
      "Code": {
        "mechanic101": "locked-rotor code is a starting-current clue used for upstream protection and starting behavior",
        "commonConfusion": "It is easy to ignore code letters because the motor runs after startup, but starting current affects protection and starters.",
        "seniorTechNote": "When replacing across motor designs, check starting current/code if nuisance trips or starter sizing are part of the problem.",
        "verifyBy": "check code + starter"
      }
    },
    "rows": [
      [
        "HP / kW",
        "output power",
        "replacement sizing",
        "service factor"
      ],
      [
        "FLA",
        "full-load amps",
        "overload setting",
        "voltage-specific"
      ],
      [
        "RPM",
        "rated speed",
        "pulley/fan/pump speed",
        "pole count"
      ],
      [
        "Frame",
        "mounting/shaft size",
        "mechanical fit",
        "C-face/base"
      ],
      [
        "SF",
        "service factor",
        "overload margin",
        "continuous load"
      ],
      [
        "Ins class",
        "winding insulation",
        "temperature rating",
        "environment"
      ],
      [
        "Enclosure",
        "TEFC/ODP/etc.",
        "washdown/dust exposure",
        "cooling"
      ],
      [
        "Duty",
        "continuous/intermittent",
        "cycle rating",
        "heat"
      ],
      [
        "Voltage",
        "rated supply",
        "single/dual voltage motor",
        "lead wiring"
      ],
      [
        "Hz",
        "rated frequency",
        "50/60 Hz applications",
        "speed/heat"
      ],
      [
        "PH",
        "phase count",
        "single or three phase",
        "starter type"
      ],
      [
        "Code",
        "locked-rotor code",
        "starting current",
        "upstream protection"
      ]
    ]
  },
  {
    "title": "VFD Fault Quick Reference",
    "note": "VFD faults are drive-specific. Check the manual before parameter changes or repeated resets.",
    "columns": [
      "Fault",
      "Likely area",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "OC / overcurrent": "Very common",
      "OV / overvoltage": "Very common",
      "UV / undervoltage": "Easy mix-up",
      "GF / ground fault": "High consequence",
      "OL / overload": "Very common",
      "PHL / phase loss": "High consequence",
      "STO": "Spec required",
      "Encoder fault": "High consequence"
    },
    "rowTeaching": {
      "OC / overcurrent": {
        "mechanic101": "overcurrent means the drive saw more current than allowed, often from load, acceleration, wiring, motor, or parameter mismatch",
        "commonConfusion": "Overcurrent is often reset repeatedly as an electrical nuisance when a jam, locked load, short accel time, or motor cable issue is still present.",
        "seniorTechNote": "Do not start with parameter changes. Check mechanical load, motor leads, ramp time, current limit, and when in the cycle the fault occurs.",
        "verifyBy": "trend amps + load"
      },
      "OV / overvoltage": {
        "mechanic101": "DC bus overvoltage often happens when the motor regenerates energy during decel or the incoming line is high/transient",
        "commonConfusion": "Overvoltage during stopping is not the same problem as high incoming supply during running.",
        "seniorTechNote": "If OV happens on decel, check decel time, braking resistor/chopper, load inertia, and whether the drive is being back-driven.",
        "verifyBy": "check bus during decel"
      },
      "UV / undervoltage": {
        "mechanic101": "undervoltage points toward low line, dips, missing supply, or DC bus falling below drive limits",
        "commonConfusion": "A stored undervoltage fault may be old power-loss history rather than the reason the machine is down now.",
        "seniorTechNote": "Check timestamp/history and line voltage under load before chasing a ghost. Power cycling can create undervoltage records.",
        "verifyBy": "measure line under load"
      },
      "GF / ground fault": {
        "mechanic101": "ground fault means the drive detected leakage or fault current toward ground in the motor/cable/load side",
        "commonConfusion": "Ground faults are sometimes treated like generic overcurrent, but insulation, moisture, cable damage, or motor winding breakdown may be involved.",
        "seniorTechNote": "Follow site policy for insulation testing and drive-safe megger practice. Isolate motor and cable before condemning either one.",
        "verifyBy": "isolate motor/cable"
      },
      "OL / overload": {
        "mechanic101": "overload means current or thermal model stayed too high over time, usually from load, cooling, or motor setup",
        "commonConfusion": "Overload is not the same as instant overcurrent; the machine may run for a while before the trip.",
        "seniorTechNote": "Compare running amps, motor FLA parameter, cooling, process load, belt/pump drag, and duty cycle before changing trip settings.",
        "verifyBy": "compare amps to FLA"
      },
      "PHL / phase loss": {
        "mechanic101": "phase loss means a supply or motor phase is missing or not being sensed correctly",
        "commonConfusion": "A blown fuse, loose contactor, bad terminal, or output cable issue can look like a drive failure.",
        "seniorTechNote": "Check input and output phases with the right procedure before replacing the drive. Phase loss often points outside the drive.",
        "verifyBy": "check all phases"
      },
      "STO": {
        "mechanic101": "safe torque off is an enable/safety circuit that prevents torque when open or not satisfied",
        "commonConfusion": "STO faults can look like a drive that refuses to run even though power and commands are present.",
        "seniorTechNote": "Do not bypass STO to prove a point. Trace the safety/enable circuit, terminals, reset logic, and device manual.",
        "verifyBy": "trace STO circuit"
      },
      "Encoder fault": {
        "mechanic101": "encoder faults come from feedback signal loss, wiring, shielding, setup, or mechanical coupling problems",
        "commonConfusion": "A feedback fault can be mechanical slip or wiring noise, not just a failed encoder.",
        "seniorTechNote": "Check coupling, connector, shield, feedback power, parameter type, and counts before changing encoder hardware.",
        "verifyBy": "check counts + coupling"
      }
    },
    "rows": [
      [
        "OC / overcurrent",
        "load or wiring",
        "jam, short, accel too fast",
        "motor leads"
      ],
      [
        "OV / overvoltage",
        "regen or line",
        "decel too fast",
        "braking resistor"
      ],
      [
        "UV / undervoltage",
        "supply",
        "line dip or phase loss",
        "incoming power"
      ],
      [
        "OH / overheat",
        "cooling",
        "dirty fan/heatsink",
        "ambient temp"
      ],
      [
        "GF / ground fault",
        "motor/cable",
        "insulation breakdown",
        "megger policy"
      ],
      [
        "OL / overload",
        "motor/load",
        "high current over time",
        "mechanical load"
      ],
      [
        "PHL / phase loss",
        "input/output",
        "missing phase",
        "fuses/contactors"
      ],
      [
        "COM fault",
        "network/control",
        "PLC or keypad comms",
        "cable/settings"
      ],
      [
        "STO",
        "safe torque off circuit",
        "enable circuit open",
        "terminal wiring"
      ],
      [
        "Encoder fault",
        "feedback signal",
        "closed-loop drives",
        "cable/shield"
      ],
      [
        "DC bus",
        "bus imbalance/ripple",
        "capacitor or line issue",
        "drive age"
      ],
      [
        "External fault",
        "field input",
        "PLC or interlock input",
        "input map"
      ]
    ]
  },
  {
    "title": "Gear Reducer ID Reference",
    "note": "Confirm ratio, shaft orientation, service factor, mounting, lubricant, and backstop requirements.",
    "columns": [
      "Marking",
      "Means",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Ratio 10:1": "Very common",
      "SF": "Spec required",
      "C-face": "Very common",
      "Hollow bore": "Easy mix-up",
      "Backstop": "High consequence",
      "ISO VG": "Spec required",
      "Worm": "Easy mix-up"
    },
    "rowTeaching": {
      "Ratio 10:1": {
        "mechanic101": "reducer ratio compares input speed to output speed and changes output torque/speed behavior",
        "commonConfusion": "A reducer with the same physical size but different ratio can make a conveyor, roll, or pump run at the wrong speed.",
        "seniorTechNote": "Before swapping reducers, calculate output speed from motor RPM and ratio, then compare shaft orientation and mounting.",
        "verifyBy": "read tag ratio"
      },
      "SF": {
        "mechanic101": "service factor reflects how much application severity the reducer selection can tolerate",
        "commonConfusion": "A reducer can fit and have the right ratio but still be undersized for shock, hours, starts, or load type.",
        "seniorTechNote": "Repeated reducer failures are often application selection problems. Check service factor, load class, starts/stops, and overload history.",
        "verifyBy": "match application SF"
      },
      "C-face": {
        "mechanic101": "C-face reducer input mounting accepts a face-mounted motor with a pilot and bolt pattern",
        "commonConfusion": "C-face size and motor frame language can be close but not correct; pilot, shaft, and bolt circle still matter.",
        "seniorTechNote": "For direct-mounted motor reducers, measure pilot, shaft, and bolt circle before ordering the motor or reducer.",
        "verifyBy": "measure pilot + shaft"
      },
      "Hollow bore": {
        "mechanic101": "hollow-bore reducers mount around the driven shaft, often with bushings or shrink-style mounting",
        "commonConfusion": "The reducer ratio may be right while the bore, bushing series, key, or shaft mount is wrong.",
        "seniorTechNote": "On shaft-mounted reducers, confirm driven shaft diameter, bushing series, torque arm, and removal access.",
        "verifyBy": "measure shaft + bushing"
      },
      "Backstop": {
        "mechanic101": "a backstop prevents reverse rotation on certain loads such as incline conveyors",
        "commonConfusion": "A reducer with or without backstop may look similar but can change machine behavior and safety/control expectations.",
        "seniorTechNote": "Confirm backstop direction and requirement before replacement. Wrong rotation lock can stop startup or allow rollback.",
        "verifyBy": "check rotation arrow"
      },
      "ISO VG": {
        "mechanic101": "ISO VG is oil viscosity grade; reducer lubricant depends on gear type, load, speed, temperature, and OEM spec",
        "commonConfusion": "Gear oil viscosity is not chosen only by thickness at room temperature; worm, helical, synthetic, and temperature needs differ.",
        "seniorTechNote": "Use the reducer tag/manual for oil type and quantity. Wrong lube can create heat, wear, seal issues, or warranty trouble.",
        "verifyBy": "match lube spec"
      },
      "Worm": {
        "mechanic101": "worm reducers are compact right-angle reducers, often lower efficiency and more heat-sensitive than helical styles",
        "commonConfusion": "A right-angle reducer is not always a worm reducer, and worm gear lube needs can differ from general gear oil.",
        "seniorTechNote": "For worm reducers, check ratio, direction, heat, lubricant type, and whether backdriving/backstop behavior matters.",
        "verifyBy": "read reducer type"
      }
    },
    "rows": [
      [
        "Ratio 10:1",
        "speed reduction",
        "output is input/10",
        "torque increase"
      ],
      [
        "HP rating",
        "power rating",
        "motor match",
        "service factor"
      ],
      [
        "SF",
        "service factor",
        "load severity allowance",
        "shock load"
      ],
      [
        "C-face",
        "motor mount",
        "direct motor mounting",
        "frame size"
      ],
      [
        "Hollow bore",
        "shaft mount",
        "conveyor reducers",
        "bushing size"
      ],
      [
        "Right angle",
        "worm/bevel",
        "space-saving drive",
        "efficiency"
      ],
      [
        "Backstop",
        "one-way clutch",
        "incline conveyors",
        "rotation"
      ],
      [
        "ISO VG",
        "oil viscosity",
        "lube selection",
        "temperature"
      ],
      [
        "AGMA",
        "gear oil grade",
        "industrial gear lube",
        "OEM match"
      ],
      [
        "Worm",
        "right-angle reducer",
        "compact low-speed drive",
        "efficiency/heat"
      ],
      [
        "Helical",
        "inline reducer",
        "higher-efficiency drive",
        "shaft alignment"
      ],
      [
        "B5 / B14",
        "metric flange",
        "IEC motor mounting",
        "pilot diameter"
      ]
    ]
  },
  {
    "title": "Belt Code ID Reference",
    "note": "Confirm belt profile, effective length, top width, cogged/notched style, and manufacturer code.",
    "columns": [
      "Code",
      "Means",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "A40": "Very common",
      "4L400": "Easy mix-up",
      "AX40": "Very common",
      "B56": "Very common",
      "5L560": "Easy mix-up",
      "5VX800": "High consequence",
      "J-section": "Easy mix-up",
      "HTD 8M": "Spec required"
    },
    "rowTeaching": {
      "A40": {
        "mechanic101": "A40 identifies an A-section V-belt family and length convention",
        "commonConfusion": "A40 and 4L400 look related but may differ by duty and length basis.",
        "seniorTechNote": "Match section, length basis, and pulley groove before treating A and 4L codes as interchangeable.",
        "verifyBy": "read belt + groove"
      },
      "4L400": {
        "mechanic101": "4L400 is a light-duty fractional horsepower belt code, not simply an industrial A40 label",
        "commonConfusion": "4L belts can fit a groove and still be wrong for industrial duty.",
        "seniorTechNote": "If a light-duty belt keeps failing, check whether the drive needs an A-section industrial belt.",
        "verifyBy": "confirm belt duty"
      },
      "AX40": {
        "mechanic101": "AX identifies a cogged/notched A-section belt for better flex around smaller sheaves",
        "commonConfusion": "The X is not a random suffix; it changes belt construction and small-pulley behavior.",
        "seniorTechNote": "Confirm the belt profile and sheave condition before swapping cogged and wrapped styles.",
        "verifyBy": "inspect belt profile"
      },
      "B56": {
        "mechanic101": "B56 identifies a common B-section industrial V-belt family and length",
        "commonConfusion": "B-section and 5L belt language can blur because widths are close.",
        "seniorTechNote": "On pump/fan drives, match section and length from the marking or sheave gauge, not memory.",
        "verifyBy": "measure section/length"
      },
      "5L560": {
        "mechanic101": "5L560 is a light-duty belt in the B-width neighborhood but not automatically a B56 replacement",
        "commonConfusion": "A 5L belt may run briefly where a B belt belongs, then fail early under load.",
        "seniorTechNote": "Check duty and pulley profile before using fractional-horsepower belts on industrial drives.",
        "verifyBy": "check duty class"
      },
      "5VX800": {
        "mechanic101": "5VX800 is a cogged narrow wedge belt for compact higher-power drives",
        "commonConfusion": "5VX belts need matching narrow wedge sheaves; conventional section guesses create heat and slip.",
        "seniorTechNote": "Treat narrow wedge belts as a matched drive system: profile, sheave, length, and tension all matter.",
        "verifyBy": "match wedge sheave"
      },
      "J-section": {
        "mechanic101": "J-section poly-V belts are identified by rib pitch and rib count, not just overall width",
        "commonConfusion": "Ordering by approximate width can miss rib count or pitch.",
        "seniorTechNote": "Count ribs and confirm pitch/section before ordering compact multi-rib belts.",
        "verifyBy": "count ribs + pitch"
      },
      "HTD 8M": {
        "mechanic101": "HTD 8M identifies a synchronous timing belt tooth profile and pitch",
        "commonConfusion": "Timing belts are not selected like friction V-belts; tooth profile and pitch must match pulleys.",
        "seniorTechNote": "For synchronous drives, match tooth profile, pitch, width, tooth count, and pulley wear.",
        "verifyBy": "match tooth profile"
      }
    },
    "rows": [
      [
        "A40",
        "A section length",
        "classic V-belt",
        "inside/effective length"
      ],
      [
        "4L400",
        "light-duty belt",
        "fractional HP belt",
        "not same as A40"
      ],
      [
        "AX40",
        "cogged A belt",
        "small pulley drives",
        "profile"
      ],
      [
        "B56",
        "B section length",
        "common industrial V-belt",
        "length basis"
      ],
      [
        "5L560",
        "light-duty B-ish",
        "fractional HP replacement",
        "duty"
      ],
      [
        "BX56",
        "cogged B belt",
        "pump/fan drives",
        "profile"
      ],
      [
        "5VX800",
        "narrow cogged belt",
        "high-power compact drive",
        "pulley profile"
      ],
      [
        "J-section",
        "poly-V",
        "multi-rib compact belt",
        "rib count"
      ],
      [
        "3V500",
        "narrow wedge belt",
        "compact industrial drive",
        "profile"
      ],
      [
        "8V1400",
        "large narrow wedge",
        "high-horsepower drive",
        "pulley match"
      ],
      [
        "SPA1250",
        "metric wedge belt",
        "metric pump/fan drives",
        "effective length"
      ],
      [
        "HTD 8M",
        "timing belt pitch",
        "synchronous drives",
        "tooth profile"
      ]
    ]
  },
  {
    "title": "Drive / Motor Nameplate Match Reference",
    "note": "Drive setup should match the motor nameplate and application. Confirm against the drive manual.",
    "columns": [
      "Field",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Motor FLA": "Very common",
      "Base Hz": "High consequence",
      "Base RPM": "Very common",
      "Motor volts": "High consequence",
      "Accel time": "Very common",
      "Decel time": "High consequence",
      "Brake resistor": "Spec required",
      "Control source": "Easy mix-up"
    },
    "rowTeaching": {
      "Motor FLA": {
        "mechanic101": "Motor FLA is the nameplate full-load current used by the drive for current limit and motor protection setup",
        "commonConfusion": "HP alone is not enough for drive setup; voltage-specific FLA and motor data must match.",
        "seniorTechNote": "Enter motor FLA from the nameplate for the actual wiring voltage, then verify running amps under load.",
        "verifyBy": "nameplate FLA + clamp amps"
      },
      "Base Hz": {
        "mechanic101": "Base Hz is the motor frequency where rated voltage/speed relationship is defined, often 50 or 60 Hz",
        "commonConfusion": "Wrong base frequency can change speed scaling, torque behavior, and motor heating.",
        "seniorTechNote": "For imported or VFD-driven machines, confirm base frequency before changing speed limits or volts-per-Hz settings.",
        "verifyBy": "nameplate Hz + drive parameter"
      },
      "Base RPM": {
        "mechanic101": "Base RPM is the motor rated speed under load and helps the drive estimate slip and speed scaling",
        "commonConfusion": "Base RPM is not always the same as synchronous speed, and entering the wrong value can affect display and control behavior.",
        "seniorTechNote": "Use the actual nameplate RPM, then verify machine speed at commanded frequency.",
        "verifyBy": "nameplate RPM + tach"
      },
      "Motor volts": {
        "mechanic101": "Motor voltage parameter must match the motor nameplate and lead wiring configuration",
        "commonConfusion": "Dual-voltage motors can be connected wrong even when the drive voltage seems correct.",
        "seniorTechNote": "Before enabling the drive, confirm motor lead wiring, drive output voltage class, and nameplate voltage.",
        "verifyBy": "lead diagram + volts"
      },
      "Accel time": {
        "mechanic101": "Accel time controls how quickly the drive ramps motor speed up",
        "commonConfusion": "Too-short accel can create overcurrent trips that look like bad drives or weak motors.",
        "seniorTechNote": "If overcurrent happens on startup, check load inertia, mechanical drag, current limit, and accel time together.",
        "verifyBy": "fault timing + load"
      },
      "Decel time": {
        "mechanic101": "Decel time controls how quickly the drive ramps speed down and can create regen energy on high-inertia loads",
        "commonConfusion": "Overvoltage during stopping is often a decel/regeneration issue, not incoming supply trouble.",
        "seniorTechNote": "For high-inertia loads, coordinate decel time, braking resistor, DC bus limits, and process needs.",
        "verifyBy": "watch DC bus on stop"
      },
      "Brake resistor": {
        "mechanic101": "A brake resistor dissipates regenerative energy so the drive can stop high-inertia loads faster",
        "commonConfusion": "Any resistor with similar ohms is not automatically safe; watts, duty cycle, wiring, and drive approval matter.",
        "seniorTechNote": "Use the drive manual for resistor ohms, wattage, duty, thermal protection, and parameter setup.",
        "verifyBy": "drive manual resistor spec"
      },
      "Control source": {
        "mechanic101": "Control source tells the drive whether start/speed commands come from keypad, terminals, network, or another source",
        "commonConfusion": "A drive can be powered and healthy but ignore buttons if the active command source is different.",
        "seniorTechNote": "When a drive will not start, check run command source, speed reference source, enables, and interlocks before changing hardware.",
        "verifyBy": "check command source"
      }
    },
    "rows": [
      [
        "Motor FLA",
        "full-load amps",
        "drive current limit",
        "voltage-specific"
      ],
      [
        "Base Hz",
        "rated frequency",
        "60/50Hz motors",
        "speed scaling"
      ],
      [
        "Base RPM",
        "rated speed",
        "slip/speed setup",
        "pole count"
      ],
      [
        "Motor volts",
        "rated voltage",
        "drive output setup",
        "lead wiring"
      ],
      [
        "HP/kW",
        "power rating",
        "sizing reference",
        "current matters more"
      ],
      [
        "Accel time",
        "speed ramp up",
        "conveyors/fans",
        "overcurrent"
      ],
      [
        "Decel time",
        "speed ramp down",
        "high inertia loads",
        "overvoltage"
      ],
      [
        "Brake resistor",
        "regen energy path",
        "fast decel",
        "ohms/watts"
      ],
      [
        "Carrier freq",
        "PWM frequency",
        "noise/heat tradeoff",
        "motor cable"
      ],
      [
        "Control source",
        "keypad/terminal/network",
        "start command",
        "unexpected source"
      ]
    ]
  }
];

  if (typeof window !== "undefined") {
    window.MaintainOpsReferenceData = window.MaintainOpsReferenceData || {};
    window.MaintainOpsReferenceData["motors"] = MOTORS_DRIVES_REFERENCE_SECTIONS;
  }

  if (typeof module !== "undefined") {
    module.exports = { MOTORS_DRIVES_REFERENCE_SECTIONS };
  }
})();
