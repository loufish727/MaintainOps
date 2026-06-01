// machining-cnc shop reference chart data. Kept separate so reference content can grow without recreating a data monolith.
(function () {
  const MACHINING_CNC_REFERENCE_SECTIONS = [
  {
    "title": "Coupling Insert Reference",
    "note": "Confirm coupling series, shaft size, torque rating, speed, alignment, and chemical exposure.",
    "columns": [
      "ID",
      "Style",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "L-095 spider": "Very common",
      "L-100 spider": "Very common",
      "L-110 spider": "Very common",
      "HRC insert": "Easy mix-up",
      "Grid coupling": "Spec required",
      "Sure-Flex sleeve": "Very common",
      "Disc coupling": "High consequence",
      "Beam coupling": "Easy mix-up"
    },
    "rowTeaching": {
      "L-095 spider": {
        "mechanic101": "jaw coupling spiders transmit torque through an elastomer insert between two matching hubs",
        "commonConfusion": "Nearby jaw coupling series can look similar, but spider size, hub series, bore, and durometer must match.",
        "seniorTechNote": "If spider dust keeps appearing, inspect alignment, hub wear, load shock, and whether the insert material is correct.",
        "verifyBy": "match hub series"
      },
      "L-100 spider": {
        "mechanic101": "L-100 jaw couplings are common on small pump and motor drives",
        "commonConfusion": "An L-099/L-100 family may be confused with nearby L-series sizes when the spider is shredded.",
        "seniorTechNote": "Keep one old hub or spider for comparison, but confirm catalog series before ordering from memory.",
        "verifyBy": "measure hub OD/series"
      },
      "L-110 spider": {
        "mechanic101": "larger jaw spiders carry more load but still depend on alignment and correct elastomer selection",
        "commonConfusion": "Upsizing the spider material or hardness will not fix a misaligned or overloaded coupling by itself.",
        "seniorTechNote": "A failed L-series spider is a symptom. Check shaft alignment, spacing, vibration, and load shock before reinstalling.",
        "verifyBy": "check alignment + gap"
      },
      "HRC insert": {
        "mechanic101": "HRC-style couplings are common metric/Euro jaw-style couplings but are not the same as Lovejoy L-series parts",
        "commonConfusion": "Jaw coupling inserts can look alike when removed, but HRC and L-series dimensions are not interchangeable.",
        "seniorTechNote": "Match the coupling family stamped on the hub, not just the shape of the worn insert.",
        "verifyBy": "read hub marking"
      },
      "Grid coupling": {
        "mechanic101": "grid couplings use a steel grid and usually need lubrication and covers to handle shock loads",
        "commonConfusion": "A dry or contaminated grid coupling can fail like an alignment problem while the real issue is maintenance or cover sealing.",
        "seniorTechNote": "For grid couplings, inspect grid wear pattern, cover seal, grease condition, and alignment before replacing only the grid.",
        "verifyBy": "inspect grid + lube"
      },
      "Sure-Flex sleeve": {
        "mechanic101": "elastomer sleeve couplings are common on pump and fan drives and must match sleeve/flange size",
        "commonConfusion": "A sleeve that looks close may be wrong by series, material, or flange size.",
        "seniorTechNote": "Match sleeve series and material, then inspect alignment and flange wear. Sleeve failure often points to a setup issue.",
        "verifyBy": "match sleeve/flange"
      },
      "Disc coupling": {
        "mechanic101": "disc couplings are metal-flex couplings used where precision, speed, or no-lube behavior matters",
        "commonConfusion": "Disc packs can be damaged by misalignment, over-torque, or improper assembly even when the coupling looks clean.",
        "seniorTechNote": "Do not treat disc coupling hardware like generic bolts. Follow the coupling manual for stack, torque, and alignment.",
        "verifyBy": "check manual + alignment"
      },
      "Beam coupling": {
        "mechanic101": "beam couplings are one-piece flexible couplings for light torque and encoder-style applications",
        "commonConfusion": "Beam couplings tolerate small misalignment but are not rugged power-transmission couplings.",
        "seniorTechNote": "Use beam couplings for light feedback/positioning loads. If it is driving real horsepower, rethink the coupling style.",
        "verifyBy": "check torque rating"
      }
    },
    "rows": [
      [
        "L-075 spider",
        "jaw coupling",
        "small pumps",
        "durometer"
      ],
      [
        "L-095 spider",
        "jaw coupling",
        "small motors",
        "series"
      ],
      [
        "L-100 spider",
        "jaw coupling",
        "common pump drive",
        "wear dust"
      ],
      [
        "L-110 spider",
        "jaw coupling",
        "larger pump drive",
        "hub size"
      ],
      [
        "L-150 spider",
        "jaw coupling",
        "heavier drive",
        "torque"
      ],
      [
        "HRC insert",
        "jaw coupling",
        "metric/Euro drives",
        "series"
      ],
      [
        "Grid coupling",
        "steel grid",
        "shock load drives",
        "lubrication"
      ],
      [
        "Sure-Flex sleeve",
        "elastomer sleeve",
        "pump/fan drives",
        "flange size"
      ],
      [
        "Tire coupling",
        "rubber tire",
        "misalignment tolerance",
        "clamp ring"
      ],
      [
        "Disc coupling",
        "metal flex",
        "precision/high speed",
        "alignment"
      ],
      [
        "Chain coupling",
        "roller chain",
        "slow rugged drives",
        "cover/lube"
      ],
      [
        "Beam coupling",
        "one-piece flex",
        "encoders/light duty",
        "torque limit"
      ]
    ]
  },
  {
    "title": "CNC G-Code Quick Reference",
    "note": "G-code dialects vary by control. Confirm the active plane, units, offsets, and modal state before running.",
    "columns": [
      "Code",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "G00": "High consequence",
      "G02": "Easy mix-up",
      "G03": "Easy mix-up",
      "G20": "High consequence",
      "G21": "High consequence",
      "G28": "High consequence",
      "G41/G42": "High consequence",
      "G43": "Very common",
      "G54-G59": "Very common",
      "G80": "Very common",
      "G90/G91": "High consequence"
    },
    "rowTeaching": {
      "G00": {
        "mechanic101": "G00 is rapid positioning, so the machine moves fast and does not care about cutting feedrate",
        "commonConfusion": "A rapid move that looks harmless in backplot can crash if clearance, active offset, or fixture height is wrong.",
        "seniorTechNote": "Dry run rapids above the part, watch active work offset, and prove clearance before trusting the program.",
        "verifyBy": "dry run rapid clearance"
      },
      "G02": {
        "mechanic101": "G02 commands clockwise arc motion in the active plane using control-specific IJK or R arc definitions",
        "commonConfusion": "Wrong plane, wrong IJK sign, or R-vs-IJK assumptions can make the arc move the opposite way or take the long path.",
        "seniorTechNote": "Check active plane, start/end points, IJK/R mode, and graphics before running arcs near clamps or part walls.",
        "verifyBy": "simulate arc + plane"
      },
      "G03": {
        "mechanic101": "G03 commands counterclockwise arc motion in the active plane",
        "commonConfusion": "G02/G03 direction changes with the selected plane and viewing direction, so visual assumptions can be wrong.",
        "seniorTechNote": "Confirm G17/G18/G19 and cutter-comp state before deciding an arc direction is safe.",
        "verifyBy": "check active plane"
      },
      "G20": {
        "mechanic101": "G20 selects inch programming units on many controls",
        "commonConfusion": "Running an inch program as metric, or metric as inch, can scale moves and offsets catastrophically.",
        "seniorTechNote": "Verify units before cycle start, especially after loading a program from another machine or CAM post.",
        "verifyBy": "confirm units screen"
      },
      "G21": {
        "mechanic101": "G21 selects metric programming units on many controls",
        "commonConfusion": "Tool offsets, work offsets, feedrates, and program values may all be wrong if unit mode is assumed.",
        "seniorTechNote": "Make unit verification part of setup, not something discovered after the first move.",
        "verifyBy": "confirm units screen"
      },
      "G28": {
        "mechanic101": "G28 returns through an intermediate point to machine reference on many controls",
        "commonConfusion": "The intermediate point can create an unexpected move before homing if the command is written carelessly.",
        "seniorTechNote": "Be cautious with G28 lines around fixtures, long tools, and rotary axes; know how your control interprets the block.",
        "verifyBy": "single-block G28 path"
      },
      "G41/G42": {
        "mechanic101": "G41 and G42 apply cutter compensation left or right of the programmed path",
        "commonConfusion": "Wrong side, missing lead-in, wrong D offset, or active comp at the wrong time can scrap the profile or gouge.",
        "seniorTechNote": "Check lead-in/out, D offset, climb/conventional direction, and comp cancel before cutting final size.",
        "verifyBy": "verify D offset + lead-in"
      },
      "G43": {
        "mechanic101": "G43 applies tool length compensation from an H offset",
        "commonConfusion": "The right tool with the wrong H offset can drive Z exactly wrong while the program still looks normal.",
        "seniorTechNote": "Match T number, H offset, measured tool length, and active spindle tool before moving close to the part.",
        "verifyBy": "match tool + H offset"
      },
      "G54-G59": {
        "mechanic101": "G54 through G59 select work coordinate systems for fixtures or setups",
        "commonConfusion": "A program can be correct but run in the wrong fixture offset, shifting every move.",
        "seniorTechNote": "Before cycle start, compare the setup sheet, active offset, and actual fixture location.",
        "verifyBy": "check active work offset"
      },
      "G80": {
        "mechanic101": "G80 cancels canned cycles such as drilling cycles on many controls",
        "commonConfusion": "If a canned cycle stays modal, later position moves can unexpectedly drill or feed.",
        "seniorTechNote": "Cancel cycles intentionally before moving to clamps, probing, or a new operation.",
        "verifyBy": "confirm cycle canceled"
      },
      "G90/G91": {
        "mechanic101": "G90 is absolute positioning and G91 is incremental positioning",
        "commonConfusion": "Incremental mode left active can turn a normal-looking coordinate into a surprise relative move.",
        "seniorTechNote": "Treat G90/G91 as a preflight check. Mode mistakes can crash faster than most code errors.",
        "verifyBy": "confirm positioning mode"
      }
    },
    "rows": [
      [
        "G00",
        "rapid positioning",
        "non-cutting move",
        "clearance"
      ],
      [
        "G01",
        "linear feed move",
        "straight cutting move",
        "feedrate"
      ],
      [
        "G02",
        "clockwise arc",
        "circular interpolation",
        "IJK/R mode"
      ],
      [
        "G03",
        "counterclockwise arc",
        "circular interpolation",
        "plane"
      ],
      [
        "G17",
        "XY plane",
        "mill default plane",
        "arc direction"
      ],
      [
        "G20",
        "inch units",
        "inch programs",
        "unit mismatch"
      ],
      [
        "G21",
        "metric units",
        "metric programs",
        "unit mismatch"
      ],
      [
        "G28",
        "machine zero return",
        "home return command",
        "intermediate point"
      ],
      [
        "G40",
        "cancel cutter comp",
        "end compensated path",
        "lead-out"
      ],
      [
        "G41/G42",
        "cutter comp left/right",
        "profile compensation",
        "tool diameter"
      ],
      [
        "G43",
        "tool length comp",
        "Z length offset active",
        "H offset"
      ],
      [
        "G54-G59",
        "work offsets",
        "fixture coordinate systems",
        "active offset"
      ],
      [
        "G80",
        "cancel canned cycle",
        "drill cycle cleanup",
        "modal cycle"
      ],
      [
        "G90/G91",
        "absolute/incremental",
        "positioning mode",
        "unexpected motion"
      ]
    ]
  },
  {
    "title": "CNC M-Code Quick Reference",
    "note": "M-codes are machine/control specific. Confirm the machine manual before relying on optional functions.",
    "columns": [
      "Code",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "M00": "Very common",
      "M01": "Easy mix-up",
      "M03": "High consequence",
      "M04": "High consequence",
      "M06": "High consequence",
      "M08": "Very common",
      "M19": "Spec required",
      "M30": "Very common",
      "M98": "High consequence",
      "M99": "High consequence"
    },
    "rowTeaching": {
      "M00": {
        "mechanic101": "M00 stops the program until the operator resumes it",
        "commonConfusion": "A mandatory stop may be used for inspection, chip clearing, clamp changes, or manual action, not just a pause.",
        "seniorTechNote": "Before restarting after M00, verify spindle, coolant, clamps, part state, and restart position.",
        "verifyBy": "inspect before restart"
      },
      "M01": {
        "mechanic101": "M01 is an optional stop that only stops when optional stop mode is enabled",
        "commonConfusion": "A program may appear to skip a planned inspection if the optional stop switch is off.",
        "seniorTechNote": "Know whether optional stop is part of the setup plan before first article or unattended running.",
        "verifyBy": "check optional stop mode"
      },
      "M03": {
        "mechanic101": "M03 starts spindle rotation in the programmed forward direction for that machine/tool setup",
        "commonConfusion": "Wrong spindle direction, wrong tool hand, or missing speed command can break tools or make no-cut conditions.",
        "seniorTechNote": "Confirm S command, spindle direction, tool hand, and workholding before the first cut.",
        "verifyBy": "verify spindle direction"
      },
      "M04": {
        "mechanic101": "M04 starts spindle reverse on machines and tools that use reverse rotation",
        "commonConfusion": "Reverse spindle is control and tooling dependent; using it casually can unthread tools or crash a process.",
        "seniorTechNote": "Use reverse only when the tool/process requires it and the holder/workholding supports it.",
        "verifyBy": "confirm process needs M04"
      },
      "M06": {
        "mechanic101": "M06 commands a tool change on machines with tool-change support",
        "commonConfusion": "The T code, pocket/tool table, tool length, and spindle state all matter around a tool change.",
        "seniorTechNote": "After edits, verify the intended tool is loaded and the matching offsets are active before Z motion.",
        "verifyBy": "match T/H/D tool"
      },
      "M08": {
        "mechanic101": "M08 usually turns flood coolant on",
        "commonConfusion": "Coolant command does not guarantee flow, correct nozzle direction, or correct coolant type.",
        "seniorTechNote": "For drilling, tapping, and high-heat cuts, verify coolant flow before the tool is buried.",
        "verifyBy": "confirm coolant flow"
      },
      "M19": {
        "mechanic101": "M19 orients the spindle for tool change, probing, or special operations on supported machines",
        "commonConfusion": "Spindle orient behavior is machine-specific and may depend on parameters, drive, or encoder feedback.",
        "seniorTechNote": "Do not assume M19 position across machines. Check the machine manual and orientation requirement.",
        "verifyBy": "check machine manual"
      },
      "M30": {
        "mechanic101": "M30 ends the program and commonly resets or rewinds depending on the control",
        "commonConfusion": "End behavior can reset modal states differently than expected between controls.",
        "seniorTechNote": "After M30, confirm the restart state before rerunning parts, especially after manual edits.",
        "verifyBy": "check restart state"
      },
      "M98": {
        "mechanic101": "M98 calls a subprogram or repeated program section",
        "commonConfusion": "Wrong P/L words, missing subprogram, or unintended repeat count can loop or cut extra features.",
        "seniorTechNote": "Trace subprogram calls during prove-out and confirm repeat counts before production.",
        "verifyBy": "trace subprogram call"
      },
      "M99": {
        "mechanic101": "M99 returns from a subprogram or can create loop behavior depending on context",
        "commonConfusion": "An M99 in the wrong place can make a program repeat unexpectedly.",
        "seniorTechNote": "When a program loops oddly, inspect subprogram structure and return points before blaming the control.",
        "verifyBy": "verify return point"
      }
    },
    "rows": [
      [
        "M00",
        "program stop",
        "mandatory stop",
        "restart point"
      ],
      [
        "M01",
        "optional stop",
        "operator-controlled stop",
        "optional stop switch"
      ],
      [
        "M03",
        "spindle forward",
        "clockwise spindle",
        "speed command"
      ],
      [
        "M04",
        "spindle reverse",
        "counterclockwise spindle",
        "tool/process"
      ],
      [
        "M05",
        "spindle stop",
        "stop rotation",
        "coast time"
      ],
      [
        "M06",
        "tool change",
        "automatic/manual tool change",
        "tool number"
      ],
      [
        "M08",
        "coolant on",
        "flood coolant",
        "coolant type"
      ],
      [
        "M09",
        "coolant off",
        "stop coolant",
        "chip clearing"
      ],
      [
        "M19",
        "spindle orient",
        "tool change/probing",
        "orientation setting"
      ],
      [
        "M30",
        "program end/reset",
        "end of program",
        "rewind behavior"
      ],
      [
        "M97",
        "local subprogram",
        "repeat section in same file",
        "line number"
      ],
      [
        "M98",
        "subprogram call",
        "call external/internal sub",
        "P/L words"
      ],
      [
        "M99",
        "subprogram return",
        "loop/return command",
        "infinite loop"
      ],
      [
        "M88/M89",
        "through-spindle coolant on/off",
        "TSC machines",
        "pressure/tooling"
      ]
    ]
  },
  {
    "title": "Machining Insert ID Reference",
    "note": "Insert codes vary by standard and manufacturer. Match shape, clearance, tolerance, chipbreaker, and grade.",
    "columns": [
      "ID",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "CNMG": "Very common",
      "DNMG": "Easy mix-up",
      "WNMG": "Very common",
      "CCMT": "Very common",
      "APKT": "Easy mix-up",
      "P grade": "Very common",
      "M grade": "Spec required",
      "K grade": "Spec required",
      "N grade": "Spec required"
    },
    "rowTeaching": {
      "CNMG": {
        "mechanic101": "CNMG is a common negative-rake 80-degree diamond turning insert family",
        "commonConfusion": "CNMG shape alone is not enough; size, thickness, nose radius, chipbreaker, grade, and holder hand still matter.",
        "seniorTechNote": "Keep the full insert code from the box or holder setup, not just the first four letters.",
        "verifyBy": "match full insert code"
      },
      "DNMG": {
        "mechanic101": "DNMG is a 55-degree diamond insert often used for profiling and finishing access",
        "commonConfusion": "A sharper insert shape can reach features a CNMG cannot, but it may have less edge strength.",
        "seniorTechNote": "Choose insert shape based on clearance, strength, holder style, and operation, not just what fits the screw.",
        "verifyBy": "match holder + shape"
      },
      "WNMG": {
        "mechanic101": "WNMG is a trigon-style turning insert commonly used for roughing and medium turning",
        "commonConfusion": "WNMG and TNMG-style language can get blurred, but holders and insert geometry differ.",
        "seniorTechNote": "Verify holder pocket, clamp style, nose radius, and grade before swapping turning inserts.",
        "verifyBy": "match pocket + grade"
      },
      "CCMT": {
        "mechanic101": "CCMT is a positive diamond insert family common in small turning and boring work",
        "commonConfusion": "Positive inserts cut easier but may use smaller screws and different holders than negative inserts.",
        "seniorTechNote": "For chatter or poor finish on small bores, check insert radius, grade, overhang, and holder rigidity.",
        "verifyBy": "match screw/holder"
      },
      "APKT": {
        "mechanic101": "APKT-style inserts are commonly associated with shoulder and face milling cutters",
        "commonConfusion": "Milling insert family names can look similar while the cutter pocket, screw, grade, and handed geometry differ.",
        "seniorTechNote": "Match the cutter body family and screw before ordering by insert shape from memory.",
        "verifyBy": "match cutter body"
      },
      "P grade": {
        "mechanic101": "P grade is the ISO material group commonly associated with steel machining",
        "commonConfusion": "The grade letter is material-family guidance, not the whole cutting recipe.",
        "seniorTechNote": "Match grade, chipbreaker, coating, speed/feed, and coolant strategy to the material and operation.",
        "verifyBy": "match material group"
      },
      "M grade": {
        "mechanic101": "M grade is associated with stainless steel and other materials that can work harden",
        "commonConfusion": "A steel grade insert can fail quickly in stainless if speed, chip control, and edge prep are wrong.",
        "seniorTechNote": "When stainless work hardens, protect chip load and avoid rubbing with a dull or wrong geometry insert.",
        "verifyBy": "confirm stainless grade"
      },
      "K grade": {
        "mechanic101": "K grade is commonly associated with cast iron machining",
        "commonConfusion": "Cast iron can look easy to cut but is abrasive and may need a different grade/coating strategy.",
        "seniorTechNote": "Watch dust, abrasion, interrupted cuts, and machine cleanup when selecting cast iron tooling.",
        "verifyBy": "confirm cast iron grade"
      },
      "N grade": {
        "mechanic101": "N grade is commonly associated with non-ferrous materials such as aluminum and brass",
        "commonConfusion": "Using a general steel insert on aluminum can cause built-up edge, poor finish, or chip welding.",
        "seniorTechNote": "For aluminum, favor sharp polished geometry and the right chip evacuation instead of brute-force feeds.",
        "verifyBy": "confirm non-ferrous grade"
      }
    },
    "rows": [
      [
        "CNMG",
        "80 deg diamond turning insert",
        "general turning",
        "holder hand"
      ],
      [
        "DNMG",
        "55 deg diamond insert",
        "profiling/finishing",
        "weaker point"
      ],
      [
        "TNMG",
        "triangle insert",
        "turning/facing",
        "edge count"
      ],
      [
        "WNMG",
        "trigon insert",
        "rough/medium turning",
        "holder style"
      ],
      [
        "CCMT",
        "positive diamond insert",
        "small boring/turning",
        "screw size"
      ],
      [
        "VBMT",
        "35 deg positive insert",
        "profiling",
        "point strength"
      ],
      [
        "APKT",
        "milling insert",
        "shoulder/face mills",
        "cutter series"
      ],
      [
        "R390",
        "milling insert family",
        "Sandvik-style shoulder milling",
        "grade/geometry"
      ],
      [
        "P grade",
        "steel machining",
        "ISO material group",
        "material match"
      ],
      [
        "M grade",
        "stainless machining",
        "ISO material group",
        "work hardening"
      ],
      [
        "K grade",
        "cast iron machining",
        "ISO material group",
        "abrasion"
      ],
      [
        "N grade",
        "non-ferrous machining",
        "aluminum/brass",
        "built-up edge"
      ]
    ]
  },
  {
    "title": "Machining Decimal Drill Reference",
    "note": "Decimal equivalents help identify drill sizes. Confirm required fit, clearance, and material before cutting.",
    "columns": [
      "Drill",
      "Decimal",
      "Metric near",
      "Common use note"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "#21": "Very common",
      "#7": "Very common",
      "F": "Very common",
      "27/64": "High consequence",
      "1/2": "Very common"
    },
    "rowTeaching": {
      "#21": {
        "mechanic101": "#21 is commonly used as a #10-32 tap drill reference",
        "commonConfusion": "#10-24 and #10-32 require different tap drills, so screw number alone is not enough.",
        "seniorTechNote": "Confirm thread pitch, material, and desired thread percentage before drilling.",
        "verifyBy": "thread chart + gauge"
      },
      "#7": {
        "mechanic101": "#7 is the common 1/4-20 tap drill reference",
        "commonConfusion": "1/4-20 and 1/4-28 share diameter but need different tap drills.",
        "seniorTechNote": "For blind holes, verify depth and chip clearance before tapping.",
        "verifyBy": "pitch + hole depth"
      },
      "F": {
        "mechanic101": "F drill is a common 5/16-18 tap drill reference",
        "commonConfusion": "Letter drills can be confused with fractional drills when the index is dirty or missing.",
        "seniorTechNote": "Measure suspect drills with a mic or caliper before cutting a hole that cannot move.",
        "verifyBy": "measure drill decimal"
      },
      "27/64": {
        "mechanic101": "27/64 is a common 1/2-13 tap drill reference",
        "commonConfusion": "Large tapped holes make wrong drill choices expensive because repair options are limited.",
        "seniorTechNote": "For high-load threaded holes, follow the print or engineering requirement before using a quick chart.",
        "verifyBy": "print + tap chart"
      },
      "1/2": {
        "mechanic101": "1/2 inch is a common drill size for clearance, pilots, and layout work",
        "commonConfusion": "A 1/2 inch hole is not automatically clearance for every 1/2 inch fastener or fit condition.",
        "seniorTechNote": "Choose clearance based on fastener size, fit class, coating, and assembly tolerance.",
        "verifyBy": "clearance spec"
      }
    },
    "rows": [
      [
        "#60",
        "0.0400 in",
        "1.02 mm",
        "small holes"
      ],
      [
        "#50",
        "0.0700 in",
        "1.78 mm",
        "small screw drilling"
      ],
      [
        "#40",
        "0.0980 in",
        "2.49 mm",
        "pilot holes"
      ],
      [
        "#30",
        "0.1285 in",
        "3.26 mm",
        "small machine screws"
      ],
      [
        "#21",
        "0.1590 in",
        "4.04 mm",
        "#10-32 tap drill"
      ],
      [
        "#7",
        "0.2010 in",
        "5.11 mm",
        "1/4-20 tap drill"
      ],
      [
        "F",
        "0.2570 in",
        "6.53 mm",
        "5/16-18 tap drill"
      ],
      [
        "Q",
        "0.3320 in",
        "8.43 mm",
        "3/8-24 tap drill"
      ],
      [
        "U",
        "0.3680 in",
        "9.35 mm",
        "7/16-14 tap drill"
      ],
      [
        "27/64",
        "0.4219 in",
        "10.72 mm",
        "1/2-13 tap drill"
      ],
      [
        "1/2",
        "0.5000 in",
        "12.70 mm",
        "common clearance/pilot"
      ],
      [
        "5/8",
        "0.6250 in",
        "15.88 mm",
        "larger clearance/pilot"
      ]
    ]
  },
  {
    "title": "Surface Finish Reference",
    "note": "Surface finish requirements depend on process, material, sealing, bearing, and print callout.",
    "columns": [
      "Ra",
      "Process range",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "125 µin": "Very common",
      "63 µin": "Very common",
      "32 µin": "High consequence",
      "16 µin": "High consequence",
      "0.8 µm": "Easy mix-up"
    },
    "rowTeaching": {
      "125 µin": {
        "mechanic101": "125 microinch Ra is a common general machined finish callout",
        "commonConfusion": "A part can look smooth but still miss a measured finish requirement.",
        "seniorTechNote": "Use visual judgment only for rough screening; inspect if sealing, fit, or print acceptance depends on finish.",
        "verifyBy": "compare to print"
      },
      "63 µin": {
        "mechanic101": "63 microinch Ra is a finer machined finish often near light fits or bearing-adjacent surfaces",
        "commonConfusion": "Tool marks, feed rate, and chatter can push a surface outside finish even if size is correct.",
        "seniorTechNote": "When a fit or wear surface fails early, check finish along with size and alignment.",
        "verifyBy": "finish comparator"
      },
      "32 µin": {
        "mechanic101": "32 microinch Ra is common near shaft, seal, and controlled sliding surfaces",
        "commonConfusion": "Too rough can eat seals; too smooth can also affect lubrication depending on application.",
        "seniorTechNote": "For seal surfaces, verify OEM finish and directionality rather than polishing by feel.",
        "verifyBy": "surface spec"
      },
      "16 µin": {
        "mechanic101": "16 microinch Ra is a fine finish often produced by grinding, honing, or controlled finishing",
        "commonConfusion": "A finer finish usually costs more and may require a different process, not just slower feed.",
        "seniorTechNote": "Do not add fine finish requirements casually; tie them to sealing, bearing, or inspection needs.",
        "verifyBy": "process + inspection"
      },
      "0.8 µm": {
        "mechanic101": "0.8 micrometer Ra is roughly comparable to 32 microinch Ra",
        "commonConfusion": "Metric and microinch finish units are easy to mix up on drawings and vendor quotes.",
        "seniorTechNote": "Confirm units before rejecting or accepting a surface finish report.",
        "verifyBy": "unit conversion"
      }
    },
    "rows": [
      [
        "250 µin",
        "rough machining",
        "non-critical surfaces",
        "tool marks"
      ],
      [
        "125 µin",
        "general machining",
        "typical milled/turned surface",
        "fit"
      ],
      [
        "63 µin",
        "fine machining",
        "bearing fits/light sealing",
        "tool condition"
      ],
      [
        "32 µin",
        "fine finish",
        "shaft/seal adjacent surfaces",
        "process control"
      ],
      [
        "16 µin",
        "grinding/honing",
        "sealing/bearing surfaces",
        "measurement"
      ],
      [
        "8 µin",
        "lapped/ground",
        "precision sealing",
        "cost"
      ],
      [
        "3.2 µm",
        "metric roughness",
        "rough/general finish",
        "unit conversion"
      ],
      [
        "1.6 µm",
        "metric roughness",
        "general machined finish",
        "unit conversion"
      ],
      [
        "0.8 µm",
        "metric roughness",
        "fine machined finish",
        "unit conversion"
      ],
      [
        "0.4 µm",
        "metric roughness",
        "ground/sealing finish",
        "unit conversion"
      ]
    ]
  },
  {
    "title": "GD&T Symbol Quick Reference",
    "note": "GD&T meaning depends on datum structure, feature control frame, tolerance zone, and drawing standard.",
    "columns": [
      "Symbol/name",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Flatness": "Very common",
      "Profile": "High consequence",
      "Perpendicularity": "Very common",
      "Position": "Very common",
      "Concentricity": "Easy mix-up",
      "Runout": "Very common",
      "Total runout": "High consequence",
      "Datum": "High consequence"
    },
    "rowTeaching": {
      "Flatness": {
        "mechanic101": "flatness controls form of a surface and does not use a datum reference",
        "commonConfusion": "Flatness is often treated like level or parallel, but it is a form control of the surface itself.",
        "seniorTechNote": "Inspect flatness from the drawing requirement, not from how the part sits on a bench.",
        "verifyBy": "read feature control frame"
      },
      "Profile": {
        "mechanic101": "profile controls a surface or line relative to the tolerance zone shown on the drawing",
        "commonConfusion": "Profile may control form, size, orientation, and location depending on datum references.",
        "seniorTechNote": "Do not reduce profile to a simple plus/minus size. Read the whole feature control frame and datum structure.",
        "verifyBy": "read datum structure"
      },
      "Perpendicularity": {
        "mechanic101": "perpendicularity controls a 90-degree relationship to a datum for a surface, axis, or center plane",
        "commonConfusion": "A square can check a clue, but the drawing tolerance zone and datum setup decide acceptance.",
        "seniorTechNote": "Set up inspection from the specified datum, especially for holes, shafts, or machined faces.",
        "verifyBy": "setup from datum"
      },
      "Position": {
        "mechanic101": "position controls feature location, commonly for holes, slots, and patterns",
        "commonConfusion": "True position is not the same as separate X/Y plus-minus tolerances, especially with MMC/LMC modifiers.",
        "seniorTechNote": "For hole patterns, position tolerance and datum scheme often decide whether the part assembles.",
        "verifyBy": "check position callout"
      },
      "Concentricity": {
        "mechanic101": "concentricity is a legacy-style control of derived median points and is harder to inspect than many expect",
        "commonConfusion": "Concentricity is often requested when runout or position is the practical inspection need.",
        "seniorTechNote": "If a print uses concentricity, clarify inspection method and whether current standards prefer another control.",
        "verifyBy": "confirm inspection method"
      },
      "Runout": {
        "mechanic101": "runout controls variation during rotation relative to a datum axis",
        "commonConfusion": "Runout is not just roundness; it includes how the surface behaves when rotated about the datum.",
        "seniorTechNote": "Check datum setup and indicator path before deciding a rotating part is acceptable.",
        "verifyBy": "indicator on datum axis"
      },
      "Total runout": {
        "mechanic101": "total runout controls the full surface during rotation, not just individual circular slices",
        "commonConfusion": "Circular runout can pass while total runout fails over the length of a sealing or bearing surface.",
        "seniorTechNote": "Use total runout carefully on bearing/seal surfaces because it can control form, orientation, and coaxial behavior.",
        "verifyBy": "sweep full surface"
      },
      "Datum": {
        "mechanic101": "a datum is the reference feature or simulated reference used to locate and orient inspection",
        "commonConfusion": "The physical surface is not automatically the datum; the datum is established through the drawing and setup method.",
        "seniorTechNote": "Most GD&T mistakes start with the wrong datum setup. Establish datum order before measuring the tolerance.",
        "verifyBy": "establish datum order"
      }
    },
    "rows": [
      [
        "Flatness",
        "surface flat zone",
        "plate/machined faces",
        "no datum"
      ],
      [
        "Straightness",
        "line/axis control",
        "shafts/edges",
        "surface vs axis"
      ],
      [
        "Circularity",
        "roundness",
        "turned diameters",
        "cross-section"
      ],
      [
        "Cylindricity",
        "round + straight cylinder",
        "precision shafts/bores",
        "no datum"
      ],
      [
        "Profile",
        "surface/line profile",
        "complex contours",
        "datum setup"
      ],
      [
        "Perpendicularity",
        "90 deg orientation",
        "machined faces/holes",
        "datum"
      ],
      [
        "Parallelism",
        "parallel orientation",
        "slots/faces",
        "datum"
      ],
      [
        "Position",
        "true position",
        "hole patterns",
        "MMC/LMC modifier"
      ],
      [
        "Concentricity",
        "median point control",
        "legacy callouts",
        "hard to inspect"
      ],
      [
        "Runout",
        "rotation variation",
        "shafts/chucks",
        "datum axis"
      ],
      [
        "Total runout",
        "full surface rotation",
        "sealing/bearing surfaces",
        "full sweep"
      ],
      [
        "Datum",
        "reference feature",
        "inspection setup",
        "simulator"
      ]
    ]
  },
  {
    "title": "CNC Offset Reference",
    "note": "Offsets are control-specific and modal. Confirm active work offset and tool offset before cycle start.",
    "columns": [
      "Offset",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "G54": "Very common",
      "H offset": "High consequence",
      "D offset": "High consequence",
      "Wear offset": "Very common",
      "G92": "High consequence"
    },
    "rowTeaching": {
      "G54": {
        "mechanic101": "G54 is the first common work coordinate system and often holds the main fixture or vise zero",
        "commonConfusion": "The program can call a different fixture offset than the operator expects.",
        "seniorTechNote": "Before cycle start, verify active work offset, setup sheet, and part zero on the control.",
        "verifyBy": "check active WCS"
      },
      "H offset": {
        "mechanic101": "H offset applies tool length compensation, usually tied to the tool number",
        "commonConfusion": "Wrong H offset can move Z by the wrong tool length and cause a crash.",
        "seniorTechNote": "Single-block and verify tool length callouts after tool table edits or program changes.",
        "verifyBy": "tool number = H"
      },
      "D offset": {
        "mechanic101": "D offset applies cutter radius or diameter compensation for profile size control",
        "commonConfusion": "Geometry and wear values can be mixed, causing oversized or undersized cuts.",
        "seniorTechNote": "Know whether the control/program expects radius or diameter and where wear is entered.",
        "verifyBy": "dry run + measure"
      },
      "Wear offset": {
        "mechanic101": "Wear offsets make small corrections after measuring a cut part",
        "commonConfusion": "Sign direction changes by axis, control, and whether the correction is radius/diameter.",
        "seniorTechNote": "Make small changes and measure the next part; do not stack large guesses into wear.",
        "verifyBy": "measure then adjust"
      },
      "G92": {
        "mechanic101": "G92 is a coordinate shift that can create a hidden modal offset depending on control behavior",
        "commonConfusion": "A leftover shift can make every correct-looking offset cut in the wrong place.",
        "seniorTechNote": "Treat unexpected coordinate shifts as a crash risk and clear/verify modal state before running.",
        "verifyBy": "modal state check"
      }
    },
    "rows": [
      [
        "G54",
        "work coordinate 1",
        "main vise/fixture",
        "active fixture"
      ],
      [
        "G55",
        "work coordinate 2",
        "second fixture",
        "program callout"
      ],
      [
        "H offset",
        "tool length",
        "Z compensation",
        "tool number match"
      ],
      [
        "D offset",
        "tool diameter/radius",
        "cutter comp",
        "wear vs geometry"
      ],
      [
        "Wear offset",
        "small correction",
        "size tuning",
        "sign direction"
      ],
      [
        "Geometry offset",
        "tool measured value",
        "setup data",
        "probe/manual entry"
      ],
      [
        "Tool table",
        "tool data register",
        "length/diameter storage",
        "active tool"
      ],
      [
        "Work probe",
        "sets fixture offset",
        "part setup",
        "probe calibration"
      ],
      [
        "Tool setter",
        "measures tool length",
        "tool setup",
        "setter location"
      ],
      [
        "G92",
        "coordinate shift",
        "legacy/program shift",
        "hidden modal state"
      ]
    ]
  }
];

  if (typeof window !== "undefined") {
    window.MaintainOpsReferenceData = window.MaintainOpsReferenceData || {};
    window.MaintainOpsReferenceData["machining-cnc"] = MACHINING_CNC_REFERENCE_SECTIONS;
  }

  if (typeof module !== "undefined") {
    module.exports = { MACHINING_CNC_REFERENCE_SECTIONS };
  }
})();
