// electrical shop reference chart data. Kept separate so reference content can grow without recreating a data monolith.
(function () {
  const ELECTRICAL_CONTROL_REFERENCE_SECTIONS = [
  {
    "title": "Wire Gauge Reference",
    "note": "Ampacity depends on insulation, temperature, conduit fill, run length, and code requirements.",
    "columns": [
      "AWG",
      "Diameter in",
      "Diameter mm",
      "Common use note"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "6": "High consequence",
      "8": "Spec required",
      "10": "High consequence",
      "12": "Very common",
      "14": "Very common",
      "16": "Easy mix-up",
      "18": "Very common",
      "22": "Very common"
    },
    "rowTeaching": {
      "6": {
        "mechanic101": "6 AWG is common around 50 amp RV, welder, range, and EV-type circuit discussions",
        "commonConfusion": "Common use examples are not permission. Load type, duty, conductor material, terminals, and local code decide the final answer.",
        "seniorTechNote": "Treat 6 AWG as a high-consequence sizing discussion. Confirm the equipment instructions, breaker, receptacle, and conductor type.",
        "verifyBy": "manual + code"
      },
      "8": {
        "mechanic101": "8 AWG is a larger feeder-size clue, but actual allowable current depends heavily on installation details",
        "commonConfusion": "People remember simple amp numbers and forget terminal temperature, conductor material, insulation, conduit fill, and derating.",
        "seniorTechNote": "When wire size becomes a feeder decision, use the applicable code table and installation conditions, not a pocket memory chart.",
        "verifyBy": "NEC table + derating"
      },
      "10": {
        "mechanic101": "10 AWG appears in many 30 amp circuits and larger temporary power situations",
        "commonConfusion": "A 10 AWG conductor can still be wrong if insulation rating, conductor material, terminals, or overcurrent protection do not match.",
        "seniorTechNote": "For 30 amp and above, stop using memory and verify against code, equipment nameplate, and local requirements.",
        "verifyBy": "code + nameplate"
      },
      "12": {
        "mechanic101": "12 AWG is commonly associated with 20 amp branch circuits and heavier shop cords",
        "commonConfusion": "12 AWG does not automatically make a cord or circuit suitable for every 20 amp load; connectors and length still matter.",
        "seniorTechNote": "On nuisance trips or hot plugs, check the full path: conductor size, cord length, plug/receptacle rating, and load nameplate.",
        "verifyBy": "nameplate + full path"
      },
      "14": {
        "mechanic101": "14 AWG is commonly associated with 15 amp branch circuits and medium cord sizes",
        "commonConfusion": "14 AWG is only one sizing clue; breaker size, copper vs aluminum, insulation rating, temperature, bundling, and run length all matter.",
        "seniorTechNote": "Treat 14 AWG as a common recognition point, then verify the actual circuit protection and installation condition.",
        "verifyBy": "breaker + insulation"
      },
      "16": {
        "mechanic101": "16 AWG is common in light cords, fixture leads, and some machine wiring",
        "commonConfusion": "16 AWG is often overtrusted because it looks substantial, but long runs and motor loads can heat plugs or drop voltage.",
        "seniorTechNote": "If a tool or small motor acts weak on an extension, check cord gauge and length before blaming the equipment.",
        "verifyBy": "read jacket + amps"
      },
      "18": {
        "mechanic101": "18 AWG is common for 24V controls, fixture leads, and light machine wiring",
        "commonConfusion": "18 AWG can look close to 16 AWG in a panel, but current, insulation, and terminal rating still matter.",
        "seniorTechNote": "Do not size control wire from color or habit. Confirm amp load, fuse protection, and machine-builder drawing.",
        "verifyBy": "drawing + fuse size"
      },
      "22": {
        "mechanic101": "22 AWG is common in low-current controls, sensors, and signal wiring, not power feeds",
        "commonConfusion": "Small control wire can carry signal voltage while still being wrong for load current, distance, or terminal style.",
        "seniorTechNote": "For controls, verify voltage, current draw, stranded vs solid, shield needs, and terminal rating before pulling wire.",
        "verifyBy": "load current + drawing"
      }
    },
    "rows": [
      [
        "24",
        "0.0201",
        "0.51",
        "small signal wiring"
      ],
      [
        "22",
        "0.0253",
        "0.64",
        "PLC sensors / low-current controls"
      ],
      [
        "20",
        "0.0320",
        "0.81",
        "thermostat, alarm, or panel signal"
      ],
      [
        "18",
        "0.0403",
        "1.02",
        "24V controls / fixture leads"
      ],
      [
        "16",
        "0.0508",
        "1.29",
        "extension cords / light machine leads; check cord rating"
      ],
      [
        "14",
        "0.0641",
        "1.63",
        "very common 15 A branch and medium cord size"
      ],
      [
        "12",
        "0.0808",
        "2.05",
        "very common 20 A branch and heavy cord size"
      ],
      [
        "10",
        "0.1019",
        "2.59",
        "very common 30 A dryer, water heater, RV TT-30"
      ],
      [
        "8",
        "0.1285",
        "3.26",
        "common 40 A range/AC feeder; 50 A only when install allows"
      ],
      [
        "6",
        "0.1620",
        "4.11",
        "common 50 A RV 14-50, welder, range, EV circuit"
      ],
      [
        "4",
        "0.2043",
        "5.19",
        "60-70 A feeder / large equipment"
      ],
      [
        "3",
        "0.2294",
        "5.83",
        "100 A feeder in some copper installs"
      ],
      [
        "2",
        "0.2576",
        "6.54",
        "100 A subpanel / equipment feeder"
      ],
      [
        "1",
        "0.2893",
        "7.35",
        "125 A feeder / large equipment"
      ],
      [
        "1/0",
        "0.3249",
        "8.25",
        "150 A feeder / service conductor"
      ],
      [
        "2/0",
        "0.3648",
        "9.27",
        "175 A feeder / service conductor"
      ],
      [
        "3/0",
        "0.4096",
        "10.40",
        "200 A copper service conductor"
      ],
      [
        "4/0",
        "0.4600",
        "11.68",
        "large service / distribution feeder"
      ],
      [
        "250 kcmil",
        "0.575",
        "14.61",
        "plant distribution / large motor feeder"
      ],
      [
        "500 kcmil",
        "0.813",
        "20.65",
        "large service / switchgear feeder"
      ]
    ]
  },
  {
    "title": "Electrical Plug / Receptacle Reference",
    "note": "Confirm voltage, phase, amperage, grounding, environment, and local electrical code before wiring.",
    "columns": [
      "NEMA",
      "Rating",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "5-15": "Very common",
      "5-20": "Easy mix-up",
      "6-20": "Very common",
      "6-50": "High consequence",
      "14-50": "High consequence",
      "L14-30": "Very common",
      "L15-30": "Spec required",
      "TT-30": "Easy mix-up"
    },
    "rowTeaching": {
      "5-15": {
        "mechanic101": "5-15 is the familiar 125V 15A grounded receptacle used for ordinary branch-circuit loads",
        "commonConfusion": "A familiar outlet shape does not prove the circuit can handle a load, extension cord, or continuous-duty equipment.",
        "seniorTechNote": "For shop equipment, check nameplate amps, circuit rating, cord condition, and GFCI/environment needs before plugging in.",
        "verifyBy": "nameplate + circuit"
      },
      "5-20": {
        "mechanic101": "5-20 is a 125V 20A configuration with the T-slot receptacle pattern",
        "commonConfusion": "A 15A plug may fit a 20A receptacle, but that does not make the equipment or cord rated for 20A use.",
        "seniorTechNote": "Use the receptacle shape as a clue, then verify breaker, conductor, load, and plug rating.",
        "verifyBy": "breaker + receptacle"
      },
      "6-20": {
        "mechanic101": "6-20 is a 250V 20A configuration with grounding but no neutral",
        "commonConfusion": "A 6-series device can be mistaken for a 120/240V device, but it does not provide neutral.",
        "seniorTechNote": "Before connecting controls or mixed loads, confirm whether the equipment needs a neutral or only line-line 250V.",
        "verifyBy": "wiring diagram + meter"
      },
      "6-50": {
        "mechanic101": "6-50 is a 250V 50A configuration often seen around welders and shop equipment",
        "commonConfusion": "6-50 and 14-50 are both large 50A-looking receptacles, but 6-50 has no neutral.",
        "seniorTechNote": "Do not adapt between 6-50 and 14-50 by shape or convenience. Confirm neutral needs, grounding, and equipment instructions.",
        "verifyBy": "config + equipment manual"
      },
      "14-50": {
        "mechanic101": "14-50 is a 125/250V 50A four-wire configuration used for RV, range, EV, and generator-type discussions",
        "commonConfusion": "14-50 is often treated as a universal 50A outlet, but load type, continuous rating, wiring, and local code still decide suitability.",
        "seniorTechNote": "For 14-50 use, verify conductor size, breaker, receptacle rating, neutral/ground separation, and equipment instructions.",
        "verifyBy": "manual + circuit check"
      },
      "L14-30": {
        "mechanic101": "L14-30 is a locking 125/250V 30A four-wire configuration common around generators and transfer loads",
        "commonConfusion": "L14-30 can be confused with other locking 30A plugs that do not carry neutral or have different voltage.",
        "seniorTechNote": "Locking plug families are easy to misread. Match the full NEMA code, not just twist-lock and amp rating.",
        "verifyBy": "full NEMA code"
      },
      "L15-30": {
        "mechanic101": "L15-30 is a locking 250V 30A three-phase configuration without neutral",
        "commonConfusion": "Three-phase locking connectors can look similar to single-phase or generator connectors if only amperage is checked.",
        "seniorTechNote": "For three-phase plugs, verify phase, voltage, grounding, rotation concerns, and whether neutral is required.",
        "verifyBy": "phase + voltage meter"
      },
      "TT-30": {
        "mechanic101": "TT-30 is a 125V 30A travel-trailer/RV configuration, not a 240V dryer-style outlet",
        "commonConfusion": "TT-30 is one of the easiest RV plugs to mislabel as 240V because it is 30A and physically unfamiliar.",
        "seniorTechNote": "Treat TT-30 as a voltage-verification item every time. Meter before connecting or adapting.",
        "verifyBy": "meter hot-neutral"
      }
    },
    "rows": [
      [
        "5-15",
        "125V 15A",
        "standard household outlet",
        "indoor general use"
      ],
      [
        "5-20",
        "125V 20A",
        "shop branch circuits",
        "T-slot receptacle"
      ],
      [
        "6-15",
        "250V 15A",
        "small 240V equipment",
        "no neutral"
      ],
      [
        "6-20",
        "250V 20A",
        "240V tools / equipment",
        "no neutral"
      ],
      [
        "6-30",
        "250V 30A",
        "welders / shop equipment",
        "no neutral"
      ],
      [
        "6-50",
        "250V 50A",
        "welder outlets",
        "no neutral"
      ],
      [
        "10-30",
        "125/250V 30A",
        "older dryer outlet",
        "old 3-wire"
      ],
      [
        "10-50",
        "125/250V 50A",
        "older range outlet",
        "old 3-wire"
      ],
      [
        "14-30",
        "125/250V 30A",
        "modern dryer / generator",
        "4-wire"
      ],
      [
        "14-50",
        "125/250V 50A",
        "RV 50A / range / EV",
        "4-wire"
      ],
      [
        "L5-15",
        "125V 15A",
        "locking light-duty tools",
        "twist-lock"
      ],
      [
        "L5-20",
        "125V 20A",
        "locking shop cords",
        "twist-lock"
      ],
      [
        "L5-30",
        "125V 30A",
        "RV/generator 120V",
        "twist-lock"
      ],
      [
        "L6-20",
        "250V 20A",
        "locking 240V equipment",
        "no neutral"
      ],
      [
        "L6-30",
        "250V 30A",
        "locking 240V equipment",
        "no neutral"
      ],
      [
        "L14-20",
        "125/250V 20A",
        "generator / transfer loads",
        "4-wire"
      ],
      [
        "L14-30",
        "125/250V 30A",
        "generator inlet common",
        "4-wire"
      ],
      [
        "L15-30",
        "250V 30A 3-phase",
        "3-phase equipment",
        "no neutral"
      ],
      [
        "L21-30",
        "120/208V 30A 3-phase",
        "3-phase with neutral",
        "5-wire"
      ],
      [
        "TT-30",
        "125V 30A",
        "RV 30A travel trailer",
        "not 240V"
      ]
    ]
  },
  {
    "title": "Common Sensor ID Reference",
    "note": "Reference only. Confirm wiring diagram, voltage, output type, sensing range, and connector pinout.",
    "columns": [
      "ID / marking",
      "Type",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "M12 prox": "Very common",
      "PZ / PE": "Very common",
      "Retroreflective": "Easy mix-up",
      "Pressure switch": "Spec required",
      "Encoder": "High consequence"
    },
    "rowTeaching": {
      "M12 prox": {
        "mechanic101": "M12 prox usually means a common round industrial proximity sensor package, but the label still has to prove voltage, output, range, and pinout",
        "commonConfusion": "M12 connector size, M12 sensor body, and M12 thread language can get mixed together. The connector does not tell you PNP/NPN, NO/NC, or sensing distance.",
        "seniorTechNote": "Treat M12 prox as a fast ID clue, then read the sensor label and wiring diagram before swapping. Same body style can hide a different output or range.",
        "verifyBy": "read label + pinout"
      },
      "PZ / PE": {
        "mechanic101": "PZ or PE usually points to a photoeye/photoelectric sensor, which detects by light path, reflector, or target reflection",
        "commonConfusion": "A photoeye problem can look like bad wiring when the real issue is dirty lens, reflector alignment, wrong light/dark mode, or target color.",
        "seniorTechNote": "Before replacing a photoeye, prove the light path: clean the lens, check LEDs, block/unblock the beam, and verify the output at the input card.",
        "verifyBy": "check LED + output"
      },
      "Retroreflective": {
        "mechanic101": "retroreflective photoeyes use a reflector to return light to the sensor, so both sensor aim and reflector condition matter",
        "commonConfusion": "A retroreflective sensor can be mistaken for through-beam because it has a beam path, but it needs a reflector rather than a second powered receiver.",
        "seniorTechNote": "If detection is intermittent, check reflector angle, dirt, shiny target behavior, and whether the sensor is polarized before moving brackets.",
        "verifyBy": "inspect reflector + aim"
      },
      "Pressure switch": {
        "mechanic101": "a pressure switch is a threshold device; it proves a pressure condition, not the full pressure curve",
        "commonConfusion": "A pressure switch can be blamed for a permissive fault when the setpoint, plugged port, wiring logic, or real low pressure is the actual cause.",
        "seniorTechNote": "Verify pressure with a gauge at the process point before changing the switch. Then check setpoint, contact type, and input logic.",
        "verifyBy": "gauge pressure + contact"
      },
      "Encoder": {
        "mechanic101": "an encoder turns motion into pulses or position feedback, so pulse count, wiring, shield, and mechanical coupling all matter",
        "commonConfusion": "Length or position drift can be calibration, but random errors often come from slipping wheels, loose couplings, electrical noise, or missed pulses.",
        "seniorTechNote": "Separate mechanical slip from signal trouble: mark the shaft or wheel, compare commanded motion to counts, and inspect cable/shield before changing scale values.",
        "verifyBy": "compare motion to counts"
      }
    },
    "rows": [
      [
        "M12 prox",
        "inductive sensor",
        "metal detection on guards/stops",
        "PNP/NPN"
      ],
      [
        "M18 prox",
        "inductive sensor",
        "larger target sensing",
        "range"
      ],
      [
        "M30 prox",
        "inductive sensor",
        "longer-range metal targets",
        "mounting"
      ],
      [
        "PZ / PE",
        "photoeye",
        "box/product detection",
        "beam alignment"
      ],
      [
        "Retroreflective",
        "photoeye",
        "reflector target sensing",
        "reflector condition"
      ],
      [
        "Diffuse",
        "photoeye",
        "short-range product sensing",
        "surface color"
      ],
      [
        "Fork sensor",
        "photoeye",
        "label/web edge detection",
        "slot width"
      ],
      [
        "Reed switch",
        "magnetic cylinder sensor",
        "air cylinder position",
        "magnet piston"
      ],
      [
        "Laser distance",
        "photoelectric distance",
        "position/level checks",
        "surface finish"
      ],
      [
        "Ultrasonic",
        "sound wave sensor",
        "clear object or level sensing",
        "dead band"
      ],
      [
        "Pressure switch",
        "pressure threshold",
        "air/hydraulic permissive",
        "setpoint"
      ],
      [
        "Encoder",
        "rotary position",
        "speed/position feedback",
        "pulse count"
      ]
    ]
  },
  {
    "title": "Fuse Class Reference",
    "note": "Match fuse class, voltage, interrupt rating, time-delay behavior, and equipment listing.",
    "columns": [
      "Class",
      "Typical marking",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Class CC": "Very common",
      "Class J": "Very common",
      "Class RK5": "Very common",
      "Midget": "Easy mix-up",
      "Semiconductor": "High consequence",
      "Class H": "High consequence",
      "Supplemental": "Spec required"
    },
    "rowTeaching": {
      "Class CC": {
        "mechanic101": "Class CC fuses are compact current-limiting branch-circuit fuses, commonly seen in control panels and small motor/control protection",
        "commonConfusion": "Class CC and midget fuses can look similar by size, but rejection features, listing, interrupt rating, and branch-circuit use are not the same.",
        "seniorTechNote": "Do not replace a Class CC with a same-size midget fuse just because it fits loose in a drawer. Match class, holder rejection, voltage, amps, and time-delay behavior.",
        "verifyBy": "match class + holder"
      },
      "Class J": {
        "mechanic101": "Class J fuses are common industrial current-limiting fuses for feeders and larger equipment circuits",
        "commonConfusion": "Same amp rating does not mean same class. Physical size, rejection mounting, interrupt rating, and time-current behavior change the protection.",
        "seniorTechNote": "When a Class J opens, look at why it opened before upsizing or changing delay style. The replacement has to match the equipment listing.",
        "verifyBy": "read class + amp/volt"
      },
      "Class RK5": {
        "mechanic101": "Class RK5 fuses are common time-delay current-limiting fuses often used around motor loads and general industrial circuits",
        "commonConfusion": "RK1 and RK5 are both Class R families, but they are not interchangeable by label habit; current limitation and protection behavior can differ.",
        "seniorTechNote": "Match the exact class and series when replacing motor-circuit fuses. If nuisance blowing is the complaint, inspect load and starter settings before changing fuse style.",
        "verifyBy": "match series + holder"
      },
      "Midget": {
        "mechanic101": "midget fuses are small supplemental/control fuses, not automatically branch-circuit protection",
        "commonConfusion": "A midget fuse can look like a Class CC fuse at a glance. The fuse holder and printed class decide what belongs there.",
        "seniorTechNote": "If the holder rejects Class CC or calls for supplemental protection, do not improvise from size alone. The physical tube is not the rating.",
        "verifyBy": "read holder label"
      },
      "Semiconductor": {
        "mechanic101": "semiconductor fuses protect fast power electronics such as drives, SCRs, rectifiers, and similar devices",
        "commonConfusion": "A standard time-delay fuse may have the right amps but the wrong clearing behavior for semiconductor protection.",
        "seniorTechNote": "Treat semiconductor fuse replacement as equipment-specific. Match the drive/device manual and fuse series before energizing.",
        "verifyBy": "match OEM fuse series"
      },
      "Class H": {
        "mechanic101": "Class H is an older non-current-limiting fuse family often encountered in legacy equipment",
        "commonConfusion": "Replacing older fuse classes without checking available fault current and equipment listing can leave protection weaker than expected.",
        "seniorTechNote": "If you find Class H in older gear, verify the existing holder, short-circuit rating needs, and whether an engineered upgrade is required.",
        "verifyBy": "check holder + SCCR"
      },
      "Supplemental": {
        "mechanic101": "supplemental fuses protect equipment or control circuits but are not a substitute for required branch-circuit protection",
        "commonConfusion": "Supplemental and branch protection are often mixed up because both are fuses. The listing and circuit purpose decide the role.",
        "seniorTechNote": "Use supplemental fuses where the design calls for them; do not let them become the only protection for a circuit that needs branch protection.",
        "verifyBy": "check listing + circuit"
      }
    },
    "rows": [
      [
        "Class CC",
        "CCMR / LP-CC",
        "control transformers / small motors",
        "holder type"
      ],
      [
        "Class J",
        "JTD / LPJ",
        "industrial feeders",
        "short-circuit rating"
      ],
      [
        "Class RK5",
        "FRN-R / FRS-R",
        "general motor circuits",
        "current limiting"
      ],
      [
        "Class RK1",
        "LPN-RK / LPS-RK",
        "higher protection feeders",
        "cost"
      ],
      [
        "Class T",
        "JLLN / JLLS",
        "compact high-current service",
        "very fast"
      ],
      [
        "Midget",
        "MDA / MDL",
        "control panels",
        "not class CC"
      ],
      [
        "Glass AGC",
        "AGC / 3AG",
        "small electronics",
        "voltage rating"
      ],
      [
        "Semiconductor",
        "A70QS / FWP",
        "drives and SCRs",
        "application specific"
      ],
      [
        "Class G",
        "SC",
        "branch circuits / lighting panels",
        "rejection size"
      ],
      [
        "Class H",
        "NON / NOS",
        "older non-current-limiting circuits",
        "replacement limits"
      ],
      [
        "Class L",
        "KRP-C",
        "large feeders / service",
        "bolt-in holder"
      ],
      [
        "Supplemental",
        "KTK / FNQ",
        "control circuits",
        "not branch protection"
      ]
    ]
  },
  {
    "title": "Contactor / Overload Reference",
    "note": "Confirm coil voltage, horsepower rating, auxiliary contacts, overload class, and reset mode.",
    "columns": [
      "Marking",
      "Part type",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "A1 / A2": "Very common",
      "L1 L2 L3": "High consequence",
      "T1 T2 T3": "High consequence",
      "13 / 14": "Very common",
      "21 / 22": "Easy mix-up",
      "FLA dial": "High consequence",
      "95 / 96": "Very common",
      "Auto reset": "Spec required"
    },
    "rowTeaching": {
      "A1 / A2": {
        "mechanic101": "A1 and A2 are coil terminals; the coil voltage must match the control circuit",
        "commonConfusion": "A contactor can have the right amp or horsepower rating and still have the wrong coil voltage.",
        "seniorTechNote": "If a contactor will not pull in or burns a coil, verify actual control voltage at A1/A2 before replacing parts.",
        "verifyBy": "meter A1/A2"
      },
      "L1 L2 L3": {
        "mechanic101": "L1/L2/L3 are line-side incoming power terminals on three-phase starters and contactors",
        "commonConfusion": "Line and load sides can be misread during replacement, especially when wiring is moved one conductor at a time.",
        "seniorTechNote": "Before landing conductors, lock out, label, photograph, and verify the line/load orientation against the device diagram.",
        "verifyBy": "diagram + labels"
      },
      "T1 T2 T3": {
        "mechanic101": "T1/T2/T3 are load-side motor terminals from the contactor or overload",
        "commonConfusion": "Swapping load leads can reverse motor rotation or confuse troubleshooting when phase order matters.",
        "seniorTechNote": "After starter work, verify rotation and overload wiring before returning pumps, fans, or conveyors to service.",
        "verifyBy": "rotation check"
      },
      "13 / 14": {
        "mechanic101": "13/14 commonly marks a normally-open auxiliary contact used for seal-in or status logic",
        "commonConfusion": "Auxiliary terminal numbers describe contact state, not coil terminals or power contacts.",
        "seniorTechNote": "When a circuit will not latch, check whether the aux contact is NO/NC and whether it changes state when the coil energizes.",
        "verifyBy": "meter aux contact"
      },
      "21 / 22": {
        "mechanic101": "21/22 commonly marks a normally-closed auxiliary contact",
        "commonConfusion": "NO and NC contacts can be swapped physically in an aux block, causing inverted logic.",
        "seniorTechNote": "Do not trust wire location alone after a replacement. Meter the contact state de-energized and energized.",
        "verifyBy": "confirm NO/NC state"
      },
      "FLA dial": {
        "mechanic101": "The overload FLA dial should be set from the motor nameplate current for the actual voltage and service condition",
        "commonConfusion": "Breaker size, horsepower, or old dial position are not substitutes for motor nameplate FLA.",
        "seniorTechNote": "If overloads trip, measure running amps and check mechanical load before simply increasing the dial.",
        "verifyBy": "nameplate + clamp amps"
      },
      "95 / 96": {
        "mechanic101": "95/96 commonly marks the normally-closed overload trip contact used in the control circuit",
        "commonConfusion": "An overload trip can look like a bad coil or missing command if the 95/96 contact is open.",
        "seniorTechNote": "When a starter is dead, check overload reset and 95/96 continuity before chasing the whole control circuit.",
        "verifyBy": "meter 95/96"
      },
      "Auto reset": {
        "mechanic101": "Auto reset allows an overload device to reset without a person pushing the reset button",
        "commonConfusion": "Auto reset can create unexpected restart risk if the control circuit is not designed for it.",
        "seniorTechNote": "Do not change manual/auto reset mode casually. Match the machine safety/control design and documented requirement.",
        "verifyBy": "control design requirement"
      }
    },
    "rows": [
      [
        "A1 / A2",
        "coil terminals",
        "contactor coil wiring",
        "coil voltage"
      ],
      [
        "L1 L2 L3",
        "line side",
        "incoming power",
        "disconnect first"
      ],
      [
        "T1 T2 T3",
        "load side",
        "motor leads",
        "phase order"
      ],
      [
        "13 / 14",
        "NO aux",
        "seal-in / status contact",
        "contact state"
      ],
      [
        "21 / 22",
        "NC aux",
        "interlock contact",
        "contact state"
      ],
      [
        "Class 10",
        "overload trip",
        "standard motor protection",
        "motor duty"
      ],
      [
        "Class 20",
        "overload trip",
        "heavier starting loads",
        "start time"
      ],
      [
        "FLA dial",
        "overload setting",
        "motor nameplate amps",
        "service factor"
      ],
      [
        "95 / 96",
        "NC overload aux",
        "trip signal/interlock",
        "device convention"
      ],
      [
        "97 / 98",
        "NO overload aux",
        "trip indication",
        "device convention"
      ],
      [
        "Manual reset",
        "reset mode",
        "local restart control",
        "access"
      ],
      [
        "Auto reset",
        "reset mode",
        "unattended restart circuits",
        "application"
      ]
    ]
  },
  {
    "title": "Proximity Sensor Reference",
    "note": "Confirm sensing material, shielded/unshielded body, output type, voltage, and connector.",
    "columns": [
      "Type",
      "Detects",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Inductive": "Very common",
      "Capacitive": "Easy mix-up",
      "Shielded": "Very common",
      "Unshielded": "Easy mix-up",
      "PNP": "Very common",
      "NPN": "Easy mix-up",
      "M12 connector": "Very common"
    },
    "rowTeaching": {
      "Inductive": {
        "mechanic101": "inductive proximity sensors detect metal targets, and range changes with target material, size, and mounting",
        "commonConfusion": "Inductive sensors do not detect all objects equally. Stainless, aluminum, target size, and flush mounting can reduce the practical range.",
        "seniorTechNote": "If a metal target is missed, check actual sensing distance, target material, flush/non-flush body, LED state, and input bit before replacing it.",
        "verifyBy": "test target + LED"
      },
      "Capacitive": {
        "mechanic101": "capacitive sensors can detect many materials, including product or level, but they are more sensitive to environment and buildup",
        "commonConfusion": "Moisture, dust, product buildup, or a nearby hand can look like a real target on a poorly adjusted capacitive sensor.",
        "seniorTechNote": "Use capacitive sensing only after checking the real material and environment. Tune against actual empty/full or present/absent states.",
        "verifyBy": "test material + buildup"
      },
      "Shielded": {
        "mechanic101": "shielded sensors can mount flush in metal more easily, but they usually trade off some sensing range",
        "commonConfusion": "A shielded replacement may fit physically but miss a target if the old setup depended on longer range.",
        "seniorTechNote": "Match shielded vs unshielded before chasing brackets. The mounting style is part of the sensing spec.",
        "verifyBy": "read body type + range"
      },
      "Unshielded": {
        "mechanic101": "unshielded sensors often sense farther, but they need clearance from nearby metal around the sensing face",
        "commonConfusion": "Installing an unshielded sensor flush in a metal bracket can make it false-trigger or lose range.",
        "seniorTechNote": "If a new sensor acts stuck-on or weak, compare mounting clearance against the datasheet before changing wiring.",
        "verifyBy": "check clearance spec"
      },
      "PNP": {
        "mechanic101": "PNP sensors source positive voltage on the output when active and are common on modern 24VDC controls",
        "commonConfusion": "PNP is often called sourcing at the sensor, but input card sourcing/sinking language can flip the wording and confuse troubleshooting.",
        "seniorTechNote": "Use the drawing and meter, not memory. Confirm brown/blue power, black output behavior, and input common before swapping PNP/NPN.",
        "verifyBy": "meter output to 0V"
      },
      "NPN": {
        "mechanic101": "NPN sensors sink the output toward 0V when active and are common on some import or legacy machines",
        "commonConfusion": "An NPN sensor installed where a PNP input is expected can power up and show LEDs but never drive the PLC input correctly.",
        "seniorTechNote": "When the sensor LED works but the PLC bit does not, check NPN/PNP and input common before blaming the card.",
        "verifyBy": "meter output to +V"
      },
      "M12 connector": {
        "mechanic101": "M12 is a common industrial round connector style; it does not prove the sensor type by itself",
        "commonConfusion": "Same connector shape can hide different pinouts, output types, and cable keying. Connector match is only one check.",
        "seniorTechNote": "Before ordering a replacement, match connector keying, pin count, cable orientation, voltage, output, and sensing distance.",
        "verifyBy": "match pinout + keying"
      }
    },
    "rows": [
      [
        "Inductive",
        "metal",
        "shaft/guard/stop sensing",
        "range by metal"
      ],
      [
        "Capacitive",
        "many materials",
        "level/product detection",
        "false trips"
      ],
      [
        "Magnetic reed",
        "magnet",
        "cylinder position",
        "magnet required"
      ],
      [
        "Hall effect",
        "magnetic field",
        "speed/position sensing",
        "polarity"
      ],
      [
        "Shielded",
        "flush mount",
        "metal bracket mounting",
        "shorter range"
      ],
      [
        "Unshielded",
        "non-flush",
        "longer range",
        "clearance needed"
      ],
      [
        "PNP",
        "sourcing output",
        "common modern PLC input",
        "input card"
      ],
      [
        "NPN",
        "sinking output",
        "some older/import machines",
        "input card"
      ],
      [
        "NO",
        "normally open output",
        "turns on at target",
        "logic state"
      ],
      [
        "NC",
        "normally closed output",
        "turns off at target",
        "logic state"
      ],
      [
        "M8 connector",
        "small round connector",
        "compact sensors",
        "pinout"
      ],
      [
        "M12 connector",
        "round connector",
        "common industrial sensors",
        "pinout"
      ]
    ]
  },
  {
    "title": "Thermocouple / RTD Reference",
    "note": "Confirm sensor type, temperature range, wiring, extension wire, and controller input setting.",
    "columns": [
      "ID",
      "Type",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Type J": "Easy mix-up",
      "Type K": "Very common",
      "PT100": "Very common",
      "PT1000": "Spec required",
      "Mini plug": "Easy mix-up",
      "Ungrounded": "Spec required",
      "Grounded": "Easy mix-up",
      "3-wire RTD": "Very common",
      "4-wire RTD": "Spec required"
    },
    "rowTeaching": {
      "Type J": {
        "mechanic101": "Type J is a thermocouple family often seen on older equipment and moderate-temperature processes",
        "commonConfusion": "Type J and Type K both produce tiny thermocouple signals, but the wire alloy, color code, range, and controller input must match.",
        "seniorTechNote": "If a temperature reading is wrong but stable, check sensor type and controller input before replacing the probe.",
        "verifyBy": "match TC type + input"
      },
      "Type K": {
        "mechanic101": "Type K is a very common general-purpose thermocouple for higher-temperature industrial use",
        "commonConfusion": "Type K extension wire, connector, polarity, and input setting all matter; ordinary copper extensions can add error.",
        "seniorTechNote": "Trace the whole measurement path: probe, connector, extension wire, polarity, and controller setup.",
        "verifyBy": "probe + extension type"
      },
      "PT100": {
        "mechanic101": "PT100 is an RTD that measures about 100 ohms at 0 C and is used for accurate process temperature",
        "commonConfusion": "A PT100 RTD can be mistaken for a thermocouple if only the probe body is visible.",
        "seniorTechNote": "Use resistance and wiring count to identify RTD vs thermocouple. The controller input must match the sensor family.",
        "verifyBy": "measure resistance"
      },
      "PT1000": {
        "mechanic101": "PT1000 is an RTD family with about 1000 ohms at 0 C and different input requirements than PT100",
        "commonConfusion": "PT100 and PT1000 can look physically identical while reading very wrong on the wrong input.",
        "seniorTechNote": "Do not assume all RTDs are PT100. Check probe marking, resistance, and controller setting.",
        "verifyBy": "resistance + controller"
      },
      "Mini plug": {
        "mechanic101": "Thermocouple mini plugs are made with matching thermocouple alloys for the sensor type",
        "commonConfusion": "A connector can physically fit while using the wrong alloy or polarity.",
        "seniorTechNote": "Match connector type and polarity to the thermocouple family, especially on test leads and temporary probes.",
        "verifyBy": "connector alloy + polarity"
      },
      "Ungrounded": {
        "mechanic101": "Ungrounded thermocouple junctions isolate the sensor junction from the sheath, often reducing noise paths",
        "commonConfusion": "Ungrounded probes may respond slower, so response time and noise behavior can be misdiagnosed.",
        "seniorTechNote": "Choose grounded vs ungrounded based on response, noise, grounding, and controller requirements, not only probe shape.",
        "verifyBy": "probe style + process"
      },
      "Grounded": {
        "mechanic101": "Grounded thermocouple junctions usually respond faster because the junction connects to the sheath",
        "commonConfusion": "Grounded probes can introduce ground-loop or noise problems in some systems.",
        "seniorTechNote": "If readings jump or drift after a probe swap, check grounded/ungrounded style and shielding before tuning controls.",
        "verifyBy": "check junction style"
      },
      "3-wire RTD": {
        "mechanic101": "3-wire RTDs are common industrial RTDs because the third lead helps compensate lead-wire resistance",
        "commonConfusion": "A 3-wire RTD landed as 2-wire can read wrong, especially over longer leads.",
        "seniorTechNote": "Match the controller wiring diagram exactly. RTD lead count is part of the measurement circuit.",
        "verifyBy": "match input wiring"
      },
      "4-wire RTD": {
        "mechanic101": "4-wire RTDs are used where higher accuracy or lead-resistance compensation matters",
        "commonConfusion": "A 4-wire RTD may not be supported by every input card or transmitter.",
        "seniorTechNote": "Before replacing or rewiring, confirm the input supports 4-wire measurement and the leads are paired correctly.",
        "verifyBy": "input support + lead pairs"
      }
    },
    "rows": [
      [
        "Type J",
        "thermocouple",
        "older equipment / moderate heat",
        "iron wire"
      ],
      [
        "Type K",
        "thermocouple",
        "general high-temp use",
        "polarity"
      ],
      [
        "Type T",
        "thermocouple",
        "low-temp/wet environments",
        "range"
      ],
      [
        "Type E",
        "thermocouple",
        "higher output signal",
        "controller setting"
      ],
      [
        "PT100",
        "RTD",
        "accurate process temp",
        "2/3/4 wire"
      ],
      [
        "PT1000",
        "RTD",
        "longer lead applications",
        "controller setting"
      ],
      [
        "Mini plug",
        "TC connector",
        "bench/test leads",
        "alloy match"
      ],
      [
        "Ungrounded",
        "probe style",
        "noise isolation",
        "slower response"
      ],
      [
        "Grounded",
        "probe style",
        "fast response",
        "noise path"
      ],
      [
        "Type N",
        "thermocouple",
        "higher-temp stability",
        "controller setting"
      ],
      [
        "3-wire RTD",
        "RTD wiring",
        "common industrial RTD",
        "lead compensation"
      ],
      [
        "4-wire RTD",
        "RTD wiring",
        "high accuracy RTD",
        "input support"
      ]
    ]
  },
  {
    "title": "Extension Cord Load Reference",
    "note": "Cord ratings depend on conductor size, length, insulation, connectors, and listed use. Long runs need larger wire.",
    "columns": [
      "Cord",
      "Length",
      "Typical load",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "16 AWG": "Easy mix-up",
      "12 AWG": "Very common",
      "10 AWG": "High consequence",
      "Outdoor cord": "Spec required",
      "SJTW": "Very common",
      "SOOW": "Stock item"
    },
    "rowTeaching": {
      "16 AWG": {
        "mechanic101": "extension cord choice depends on AWG, length, load amps, jacket marking, plug rating, and where the cord is used",
        "commonConfusion": "16 AWG cords look useful because they are common and light, but longer runs and motor loads can create voltage drop, heat, and weak tool performance.",
        "seniorTechNote": "Use 16 AWG for light loads only after checking the cord label and tool amps. Do not let a long skinny cord become the hidden cause of nuisance trips or hot plugs.",
        "verifyBy": "read jacket + tool amps"
      },
      "12 AWG": {
        "mechanic101": "extension cord choice depends on AWG, length, load amps, jacket marking, plug rating, and where the cord is used",
        "commonConfusion": "12 AWG is common for heavier shop cords, but it is still not a universal permission slip; connector rating, cord length, duty, and environment still matter.",
        "seniorTechNote": "12 AWG is the everyday heavy-cord size worth recognizing. It buys margin for longer runs and higher draw, but the nameplate load and cord marking still decide.",
        "verifyBy": "read jacket + load nameplate"
      },
      "10 AWG": {
        "mechanic101": "extension cord choice depends on AWG, length, load amps, jacket marking, plug rating, and where the cord is used",
        "commonConfusion": "10 AWG at 100 ft may look like overkill until a large temporary load or motor start pulls voltage down; the wrong connector or circuit rating can still make it wrong.",
        "seniorTechNote": "A 10 AWG cord is a high-load clue. Check the full path: breaker, receptacle, plug, connector rating, cord length, duty cycle, and whether temporary power is appropriate.",
        "verifyBy": "match load + connector rating"
      },
      "Outdoor cord": {
        "mechanic101": "extension cord choice depends on AWG, length, load amps, jacket marking, plug rating, and where the cord is used",
        "commonConfusion": "Outdoor use is not just color or thickness. Look for the actual jacket marking and wet/location suitability instead of assuming a rugged-looking cord is outdoor rated.",
        "seniorTechNote": "Outdoor or jobsite use is a marking-and-protection check. Confirm jacket type, grounded conductors where required, GFCI protection, condition, and connector fit before use.",
        "verifyBy": "check W marking + GFCI"
      },
      "SJTW": {
        "mechanic101": "extension cord choice depends on AWG, length, load amps, jacket marking, plug rating, and where the cord is used",
        "commonConfusion": "SJTW is a jacket/service designation, not an amp rating by itself. You still need the AWG, length, plug rating, and load amps.",
        "seniorTechNote": "SJTW is common outdoor general-duty cord language. It helps identify weather-rated junior hard service cord, but it does not replace reading the full cord label.",
        "verifyBy": "read full cord legend"
      },
      "SOOW": {
        "mechanic101": "extension cord choice depends on AWG, length, load amps, jacket marking, plug rating, and where the cord is used",
        "commonConfusion": "SOOW usually signals heavier flexible service cord, but the letters do not tell you the exact amp limit without AWG, conductor count, plug, and equipment rating.",
        "seniorTechNote": "SOOW is worth recognizing for portable equipment and tougher shop cords. Treat it as a stock clue, then verify conductor size and end fittings before trusting it.",
        "verifyBy": "read jacket + end fittings"
      }
    },
    "rows": [
      [
        "16 AWG",
        "25 ft",
        "light tools",
        "voltage drop"
      ],
      [
        "16 AWG",
        "50 ft",
        "low/medium load",
        "not heaters"
      ],
      [
        "14 AWG",
        "50 ft",
        "medium tools",
        "15 A limit"
      ],
      [
        "14 AWG",
        "100 ft",
        "moderate load",
        "drop"
      ],
      [
        "12 AWG",
        "50 ft",
        "heavy tools",
        "20 A circuits"
      ],
      [
        "12 AWG",
        "100 ft",
        "higher load",
        "heat/drop"
      ],
      [
        "10 AWG",
        "100 ft",
        "large temporary load",
        "connector rating"
      ],
      [
        "Outdoor cord",
        "wet location",
        "jobsite use",
        "GFCI"
      ],
      [
        "SJTW",
        "outdoor-rated jacket",
        "extension cords",
        "marking"
      ],
      [
        "SOOW",
        "heavy-duty flexible cord",
        "portable equipment",
        "jacket rating"
      ]
    ]
  },
  {
    "title": "Industrial Wire Color Reference",
    "note": "Wire colors vary by standard, machine builder, and country. Verify with drawings and meter before work.",
    "columns": [
      "Color",
      "Common meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Green / green-yellow": "High consequence",
      "White / gray": "High consequence",
      "Black": "Very common",
      "Red": "Very common",
      "Blue": "Easy mix-up",
      "Brown": "Very common",
      "Black sensor lead": "Easy mix-up",
      "Yellow/orange": "Spec required"
    },
    "rowTeaching": {
      "Green / green-yellow": {
        "mechanic101": "Green or green-yellow is commonly used for equipment grounding/protective earth conductors",
        "commonConfusion": "A wire color is a clue, not proof. Old panels, imports, repairs, and machine-builder standards can vary.",
        "seniorTechNote": "Never use color alone to prove a conductor is safe. Verify with the drawing, meter, and terminal marking.",
        "verifyBy": "drawing + meter"
      },
      "White / gray": {
        "mechanic101": "White or gray is commonly associated with grounded/neutral conductors in many North American systems",
        "commonConfusion": "Neutral and ground are different functions, and some panels contain mixed control standards.",
        "seniorTechNote": "Before moving white/gray conductors, identify whether the circuit has a neutral, control common, or machine-specific marking.",
        "verifyBy": "trace conductor function"
      },
      "Black": {
        "mechanic101": "Black is commonly used for AC line or control conductors depending on the panel standard",
        "commonConfusion": "Black can be line voltage in one panel and a different function in another machine standard.",
        "seniorTechNote": "Treat black as energized until proven otherwise. Use labels and drawings to identify the actual circuit.",
        "verifyBy": "meter + wire number"
      },
      "Red": {
        "mechanic101": "Red often appears on AC control, switched, or alternate line conductors depending on the standard",
        "commonConfusion": "Red does not always mean the same voltage or phase across machines.",
        "seniorTechNote": "On controls, the wire number is usually more authoritative than color. Trace the circuit before assuming.",
        "verifyBy": "wire number + schematic"
      },
      "Blue": {
        "mechanic101": "Blue is often used for DC control wiring in industrial panels, but polarity conventions can vary",
        "commonConfusion": "Blue can be confused as always DC common or always DC positive; the drawing decides.",
        "seniorTechNote": "For 24VDC troubleshooting, meter to the correct common and confirm PNP/NPN or sourcing/sinking logic.",
        "verifyBy": "meter to DC common"
      },
      "Brown": {
        "mechanic101": "Brown is common on IEC-style sensor cables as a DC positive supply lead",
        "commonConfusion": "Sensor cable colors are useful only when the cable follows the expected pinout and device family.",
        "seniorTechNote": "When replacing sensors, verify pin number, not just wire color. M12 cable colors and pinouts must agree.",
        "verifyBy": "pinout + label"
      },
      "Black sensor lead": {
        "mechanic101": "Black sensor lead is commonly an output on many 3-wire DC sensors",
        "commonConfusion": "Output lead color does not prove PNP/NPN, NO/NC, or signal state.",
        "seniorTechNote": "If the sensor LED changes but the PLC input does not, meter the output lead to the module common.",
        "verifyBy": "meter output signal"
      },
      "Yellow/orange": {
        "mechanic101": "Yellow or orange may indicate external, interlock, or machine-builder-specific circuits",
        "commonConfusion": "Some circuits remain energized from an external source even when the local disconnect is off.",
        "seniorTechNote": "When color suggests external power, verify all sources and drawing notes before touching the conductor.",
        "verifyBy": "check external source note"
      }
    },
    "rows": [
      [
        "Green / green-yellow",
        "equipment ground",
        "protective earth",
        "never assume only by color"
      ],
      [
        "White / gray",
        "neutral",
        "AC grounded conductor",
        "shared neutrals"
      ],
      [
        "Black",
        "AC line/control",
        "120/240 VAC",
        "verify voltage"
      ],
      [
        "Red",
        "AC line/control",
        "switched or second leg",
        "panel standard"
      ],
      [
        "Blue",
        "DC control",
        "24 VDC common/positive varies",
        "drawing required"
      ],
      [
        "Brown",
        "DC positive",
        "IEC sensors",
        "PNP/NPN wiring"
      ],
      [
        "Black sensor lead",
        "sensor output",
        "3-wire sensors",
        "input type"
      ],
      [
        "Yellow/orange",
        "external/interlock",
        "machine builder specific",
        "live when off"
      ],
      [
        "Light blue",
        "IEC neutral",
        "control panels",
        "standard varies"
      ],
      [
        "Pink",
        "sensor/aux signal",
        "some M12 sensor cables",
        "pinout"
      ],
      [
        "Violet",
        "analog/signal",
        "machine-builder specific",
        "drawing"
      ],
      [
        "Bare/shield",
        "cable shield/drain",
        "noise control",
        "grounding point"
      ]
    ]
  },
  {
    "title": "Conduit Fill Quick Reference",
    "note": "Use electrical code and actual conductor insulation/OD for final fill. This is a field reminder only.",
    "columns": [
      "Rule",
      "Common value",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "1 conductor": "Very common",
      "2 conductors": "Easy mix-up",
      "3+ conductors": "Very common",
      "Junction box": "High consequence",
      "Long pull": "Spec required",
      "Many bends": "Very common",
      "VFD cable": "Spec required"
    },
    "rowTeaching": {
      "1 conductor": {
        "mechanic101": "Single-conductor conduit fill has a different percentage limit than multi-conductor fills",
        "commonConfusion": "People remember one fill number and apply it to every raceway, but the conductor count changes the limit.",
        "seniorTechNote": "Use conduit fill tables with actual conductor type and raceway type instead of estimating by eye.",
        "verifyBy": "NEC fill table"
      },
      "2 conductors": {
        "mechanic101": "Two conductors have a lower fill percentage because of jamming and pulling behavior",
        "commonConfusion": "Two large conductors can be harder to pull than a quick percent guess suggests.",
        "seniorTechNote": "For two-conductor pulls, check fill and pulling conditions before choosing a raceway size.",
        "verifyBy": "fill + pull plan"
      },
      "3+ conductors": {
        "mechanic101": "Three or more conductors commonly use the 40 percent fill rule as the field memory point",
        "commonConfusion": "40 percent fill does not replace derating, conductor OD, raceway type, or pull difficulty checks.",
        "seniorTechNote": "If the pull is long, crowded, or has mixed conductor sizes, calculate instead of relying on a chart memory.",
        "verifyBy": "calculate actual fill"
      },
      "Junction box": {
        "mechanic101": "Box fill is separate from conduit fill and includes conductors, splices, devices, and grounding allowances",
        "commonConfusion": "A conduit can be acceptable while the box is still overfilled.",
        "seniorTechNote": "When adding devices or splices, check box fill before treating the enclosure as spare space.",
        "verifyBy": "box fill calculation"
      },
      "Long pull": {
        "mechanic101": "Long pulls increase friction and pulling tension even when fill percentage is legal",
        "commonConfusion": "A legal fill can still be a bad pull if bends, length, or conductor insulation make it difficult.",
        "seniorTechNote": "Plan pull points, lubrication, bend count, and conductor protection before forcing a long run.",
        "verifyBy": "pull length + bends"
      },
      "Many bends": {
        "mechanic101": "Bend count affects whether conductors can be pulled without damage",
        "commonConfusion": "A raceway can look clean but still exceed practical or code bend limits between pull points.",
        "seniorTechNote": "Count total degrees between pull points before pulling, not after the wire is stuck.",
        "verifyBy": "count bend degrees"
      },
      "VFD cable": {
        "mechanic101": "VFD cable routing and shielding follow drive-manufacturer requirements, not just normal conductor fill habits",
        "commonConfusion": "Drive output wiring can create noise, heating, and bearing/current problems if treated like ordinary power wiring.",
        "seniorTechNote": "For VFD output conductors, follow the drive manual for cable type, grounding, shielding, and separation.",
        "verifyBy": "drive manual"
      }
    },
    "rows": [
      [
        "1 conductor",
        "53% max fill",
        "single conductor raceway",
        "heat"
      ],
      [
        "2 conductors",
        "31% max fill",
        "two-wire raceway",
        "pulling"
      ],
      [
        "3+ conductors",
        "40% max fill",
        "normal raceway",
        "derating"
      ],
      [
        "Junction box",
        "box fill required",
        "splices/devices",
        "grounds count"
      ],
      [
        "Long pull",
        "reduce fill",
        "easier install",
        "pull tension"
      ],
      [
        "Many bends",
        "360 deg max typical",
        "raceway run",
        "pull points"
      ],
      [
        "VFD cable",
        "follow drive manual",
        "shielded cable",
        "noise"
      ],
      [
        "Controls",
        "separate as required",
        "signal wiring",
        "interference"
      ]
    ]
  },
  {
    "title": "IP / NEMA Enclosure Reference",
    "note": "Ratings are not always directly interchangeable. Confirm environment, washdown, dust, corrosion, and listing.",
    "columns": [
      "Rating",
      "Protects against",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "NEMA 1": "Very common",
      "NEMA 3R": "Easy mix-up",
      "NEMA 4": "Very common",
      "NEMA 4X": "High consequence",
      "NEMA 12": "Very common",
      "IP65": "Easy mix-up",
      "IP67": "Spec required",
      "NEMA 6": "Spec required"
    },
    "rowTeaching": {
      "NEMA 1": {
        "mechanic101": "NEMA 1 is a basic indoor enclosure rating for personnel contact protection in dry areas",
        "commonConfusion": "A NEMA 1 box is not dust-tight, washdown-ready, or outdoor-rated just because it encloses terminals.",
        "seniorTechNote": "Use NEMA 1 only where the environment matches. Dust, oil, water, and washdown need a different enclosure decision.",
        "verifyBy": "environment check"
      },
      "NEMA 3R": {
        "mechanic101": "NEMA 3R is commonly used for outdoor rain protection, but it is not the same as full washdown protection",
        "commonConfusion": "Outdoor rain resistance can be mistaken for hose-directed water or dust-tight performance.",
        "seniorTechNote": "For outdoor equipment, check rain, sun, condensation, dust, corrosion, and entry fittings, not the rating alone.",
        "verifyBy": "rating + installation"
      },
      "NEMA 4": {
        "mechanic101": "NEMA 4 is a common watertight/washdown-style rating for hose-directed water protection",
        "commonConfusion": "NEMA 4 does not automatically mean corrosion resistance; that is where material and 4X matter.",
        "seniorTechNote": "For washdown, inspect gasket condition, penetrations, latches, drains, and cord grips as part of the rating.",
        "verifyBy": "gasket + entries"
      },
      "NEMA 4X": {
        "mechanic101": "NEMA 4X adds corrosion resistance expectations to the NEMA 4 water-protection family",
        "commonConfusion": "Stainless-looking boxes, painted boxes, and plastic boxes can all be misread without checking the actual listing.",
        "seniorTechNote": "In chemical, outdoor, or food washdown areas, verify 4X listing, material, hardware, and cable-entry ratings.",
        "verifyBy": "listing + material"
      },
      "NEMA 12": {
        "mechanic101": "NEMA 12 is common for industrial indoor dust, dirt, and dripping non-corrosive liquid protection",
        "commonConfusion": "NEMA 12 is often mistaken for washdown suitable because it looks like a sealed industrial panel.",
        "seniorTechNote": "Use NEMA 12 for dry indoor industrial dirt/oil mist contexts, not hose-down areas unless the listing supports it.",
        "verifyBy": "rating label"
      },
      "IP65": {
        "mechanic101": "IP65 indicates dust-tight and water-jet protection, but IP and NEMA ratings are not one-for-one equivalents",
        "commonConfusion": "An IP number can be treated like a direct NEMA replacement when corrosion, oil, gasket aging, or construction details differ.",
        "seniorTechNote": "When converting IP/NEMA expectations, confirm the exact environment and product listing rather than relying on a rough equivalence chart.",
        "verifyBy": "listing + environment"
      },
      "IP67": {
        "mechanic101": "IP67 indicates dust-tight plus temporary immersion protection under defined conditions",
        "commonConfusion": "IP67 is not unlimited submersion, washdown chemical resistance, or connector protection by default.",
        "seniorTechNote": "For sensors and devices, the connector, cable, and mating plug must carry the environment rating too.",
        "verifyBy": "device + connector rating"
      },
      "NEMA 6": {
        "mechanic101": "NEMA 6 is associated with temporary submersion protection under specified conditions",
        "commonConfusion": "Temporary submersion is not the same as continuous underwater service or chemical washdown.",
        "seniorTechNote": "If water can pool or submerge equipment, verify depth, duration, fittings, cable glands, and manufacturer listing.",
        "verifyBy": "depth/time listing"
      }
    },
    "rows": [
      [
        "NEMA 1",
        "indoor contact",
        "basic indoor panels",
        "no dust/water"
      ],
      [
        "NEMA 3R",
        "rain/sleet",
        "outdoor utility",
        "windblown dust"
      ],
      [
        "NEMA 4",
        "hose-directed water",
        "washdown areas",
        "corrosion"
      ],
      [
        "NEMA 4X",
        "water + corrosion",
        "food/chemical areas",
        "material"
      ],
      [
        "NEMA 12",
        "dust/dripping oil",
        "industrial indoor",
        "not washdown"
      ],
      [
        "IP54",
        "dust limited/splash",
        "light industrial",
        "washdown"
      ],
      [
        "IP65",
        "dust tight/jet water",
        "wet/dusty areas",
        "submersion"
      ],
      [
        "IP67",
        "temporary immersion",
        "sensors/devices",
        "connector rating"
      ],
      [
        "NEMA 2",
        "dripping water",
        "indoor drip protection",
        "not rain"
      ],
      [
        "NEMA 3",
        "weather resistant",
        "outdoor dust/rain",
        "ice damage"
      ],
      [
        "NEMA 6",
        "temporary submersion",
        "wash/immersion areas",
        "depth/time"
      ],
      [
        "IP66",
        "powerful water jets",
        "washdown devices",
        "connector rating"
      ]
    ]
  },
  {
    "title": "Relay / Contactor Symbol Reference",
    "note": "Symbols vary by drawing standard. Confirm coil voltage, contact state, and device tag before wiring.",
    "columns": [
      "Symbol / ID",
      "Means",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "A1/A2": "Very common",
      "NO": "Very common",
      "NC": "Easy mix-up",
      "13/14": "Very common",
      "21/22": "Easy mix-up",
      "L1/L2/L3": "High consequence",
      "T1/T2/T3": "High consequence",
      "OL contact": "Very common",
      "KM": "Very common"
    },
    "rowTeaching": {
      "A1/A2": {
        "mechanic101": "A1/A2 usually identifies a relay or contactor coil, not a load contact",
        "commonConfusion": "A drawing can show the coil in one place and the contacts elsewhere, tied together only by the device tag.",
        "seniorTechNote": "When reading ladder drawings, follow the device tag from coil to contacts before assuming what changes state.",
        "verifyBy": "match tag + coil voltage"
      },
      "NO": {
        "mechanic101": "Normally open means the contact is open in its normal de-energized state and closes when actuated",
        "commonConfusion": "NO/NC describes the normal state, not whether the machine is currently running or stopped.",
        "seniorTechNote": "Meter the contact de-energized and energized if the logic does not match the drawing.",
        "verifyBy": "meter state change"
      },
      "NC": {
        "mechanic101": "Normally closed means the contact is closed in its normal de-energized state and opens when actuated",
        "commonConfusion": "NC contacts are common in stop, interlock, and trip circuits, so replacing them with NO can invert behavior.",
        "seniorTechNote": "Before swapping contacts, confirm de-energized state and how the circuit should fail.",
        "verifyBy": "confirm fail state"
      },
      "13/14": {
        "mechanic101": "13/14 commonly marks a normally-open auxiliary contact in IEC-style numbering",
        "commonConfusion": "Auxiliary numbers are easy to confuse with wire numbers or terminal strip numbers.",
        "seniorTechNote": "Use the device diagram to prove 13/14 belongs to the correct relay or contactor and contact block.",
        "verifyBy": "device diagram"
      },
      "21/22": {
        "mechanic101": "21/22 commonly marks a normally-closed auxiliary contact in IEC-style numbering",
        "commonConfusion": "21/22 and 13/14 can sit next to each other on the same aux block and create inverted logic if swapped.",
        "seniorTechNote": "If a permissive is backwards after replacement, verify the actual contact block installed.",
        "verifyBy": "meter NO/NC contact"
      },
      "L1/L2/L3": {
        "mechanic101": "L1/L2/L3 usually marks the incoming line side of a three-phase contactor or starter",
        "commonConfusion": "Line/load reversal can happen during replacement if the old device orientation differs.",
        "seniorTechNote": "Photograph and label conductors before removal, then verify against the new device diagram.",
        "verifyBy": "line/load labels"
      },
      "T1/T2/T3": {
        "mechanic101": "T1/T2/T3 usually marks the load side going toward the motor or overload output",
        "commonConfusion": "Load terminals can be mistaken for motor lead labels, but the drawing decides where overloads and sensors sit.",
        "seniorTechNote": "After wiring, check rotation and overload path before returning the machine to service.",
        "verifyBy": "rotation + overload path"
      },
      "OL contact": {
        "mechanic101": "An overload auxiliary contact changes state when the overload trips and is often wired into the control circuit",
        "commonConfusion": "An open overload contact can look like a bad start button, bad coil, or missing PLC output.",
        "seniorTechNote": "On dead starter circuits, check overload status and trip contact before replacing controls.",
        "verifyBy": "check reset + contact"
      },
      "KM": {
        "mechanic101": "KM is a common contactor tag prefix on many machine drawings",
        "commonConfusion": "A tag such as KM1 may refer to the coil and several contacts spread across different drawing pages.",
        "seniorTechNote": "Use cross-references and sheet numbers to find every contact controlled by the same coil.",
        "verifyBy": "trace cross-reference"
      }
    },
    "rows": [
      [
        "A1/A2",
        "coil terminals",
        "relay/contactor coil",
        "voltage"
      ],
      [
        "NO",
        "normally open",
        "closes when energized",
        "de-energized state"
      ],
      [
        "NC",
        "normally closed",
        "opens when energized",
        "safety/interlock"
      ],
      [
        "13/14",
        "NO aux contact",
        "IEC auxiliary",
        "contact rating"
      ],
      [
        "21/22",
        "NC aux contact",
        "IEC auxiliary",
        "logic state"
      ],
      [
        "L1/L2/L3",
        "line side",
        "contactor input",
        "phase order"
      ],
      [
        "T1/T2/T3",
        "load side",
        "motor output",
        "overload"
      ],
      [
        "OL contact",
        "overload trip contact",
        "motor protection",
        "reset state"
      ],
      [
        "11/12",
        "NC contact",
        "IEC contact numbering",
        "device convention"
      ],
      [
        "33/34",
        "NO aux contact",
        "additional aux block",
        "contact count"
      ],
      [
        "43/44",
        "NO aux contact",
        "additional aux block",
        "contact count"
      ],
      [
        "KM",
        "contactor tag",
        "motor starter drawings",
        "drawing convention"
      ]
    ]
  },
  {
    "title": "PLC I/O Voltage Reference",
    "note": "Confirm input card type, sourcing/sinking wiring, commons, and isolation before landing wires.",
    "columns": [
      "Signal",
      "Typical use",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "24 VDC input": "Very common",
      "24 VDC output": "Very common",
      "120 VAC input": "High consequence",
      "Analog 4-20 mA": "Easy mix-up",
      "High-speed input": "Spec required",
      "Relay output": "Very common",
      "Triac output": "Easy mix-up"
    },
    "rowTeaching": {
      "24 VDC input": {
        "mechanic101": "24 VDC inputs are common for sensors, buttons, and machine permissives, but the input common decides what type of field device works",
        "commonConfusion": "A 24V input can still fail with the wrong PNP/NPN relationship, missing common, or shared supply problem.",
        "seniorTechNote": "When the field device LED works but the PLC bit does not, meter the input terminal to the module common and check the wiring diagram.",
        "verifyBy": "meter input to common"
      },
      "24 VDC output": {
        "mechanic101": "24 VDC outputs switch loads such as solenoids, relays, stack lights, and interposing devices within the output card rating",
        "commonConfusion": "A small DC output is not a free power supply. Solenoid inrush, relay coils, shorts, and shared commons can overload a point or group.",
        "seniorTechNote": "If outputs fail repeatedly, check load current, flyback suppression, point/group rating, and whether an interposing relay is needed.",
        "verifyBy": "measure load current"
      },
      "120 VAC input": {
        "mechanic101": "120 VAC inputs are common on older controls and field switches, but they carry line voltage into the control system",
        "commonConfusion": "A 120 VAC input problem can be mistaken for a 24VDC controls issue if the panel has mixed voltage groups.",
        "seniorTechNote": "Treat AC input troubleshooting as a voltage-group problem. Confirm isolation, neutral/reference, terminal markings, and meter category before touching wiring.",
        "verifyBy": "trace voltage group"
      },
      "Analog 4-20 mA": {
        "mechanic101": "4-20 mA analog signals represent a scaled process value and usually need loop power, correct polarity, and correct scaling",
        "commonConfusion": "A live 4 mA signal is not zero current; it often represents the low end of a valid range. Open loops and scaling errors can look like bad sensors.",
        "seniorTechNote": "For analog issues, check loop power, polarity, raw mA, scaling, and sensor range before changing the transmitter.",
        "verifyBy": "measure loop mA"
      },
      "High-speed input": {
        "mechanic101": "high-speed inputs count pulses faster than ordinary inputs and are used for encoders, measuring wheels, and speed/count applications",
        "commonConfusion": "Putting pulse signals on a normal input can miss counts even though the input appears to blink.",
        "seniorTechNote": "If counts drift at speed, verify frequency, input type, debounce/filter settings, shielding, and encoder wiring.",
        "verifyBy": "check frequency spec"
      },
      "Relay output": {
        "mechanic101": "relay outputs are isolated contacts, useful for mixed voltages, but they have contact life and load limitations",
        "commonConfusion": "Relay output isolation does not mean unlimited current or any load type; inductive loads and switching frequency matter.",
        "seniorTechNote": "Use relay outputs for appropriate loads or interposing. Check contact rating, suppression, and cycle rate before blaming the PLC.",
        "verifyBy": "check contact rating"
      },
      "Triac output": {
        "mechanic101": "triac outputs switch AC loads electronically and can leak small current even when off",
        "commonConfusion": "Leakage current can keep tiny lamps, coils, or meters looking partially alive even when the output is off.",
        "seniorTechNote": "If an AC load will not fully drop out, check triac leakage, load size, snubbers, and whether relay isolation is the better output.",
        "verifyBy": "measure off-state voltage"
      }
    },
    "rows": [
      [
        "24 VDC input",
        "sensors/buttons",
        "modern machines",
        "PNP/NPN"
      ],
      [
        "24 VDC output",
        "solenoids/relays",
        "PLC outputs",
        "current limit"
      ],
      [
        "120 VAC input",
        "older controls",
        "field switches",
        "voltage exposure"
      ],
      [
        "120 VAC output",
        "relays/lamps",
        "legacy panels",
        "load rating"
      ],
      [
        "Analog 4-20 mA",
        "process signal",
        "pressure/level/temp",
        "loop power"
      ],
      [
        "Analog 0-10 V",
        "speed/reference",
        "VFD commands",
        "noise"
      ],
      [
        "Thermocouple input",
        "temperature",
        "process heat",
        "type setting"
      ],
      [
        "RTD input",
        "temperature",
        "accurate sensing",
        "2/3/4 wire"
      ],
      [
        "High-speed input",
        "encoder/pulse",
        "counting applications",
        "frequency limit"
      ],
      [
        "Relay output",
        "isolated contact",
        "mixed-voltage loads",
        "contact life"
      ],
      [
        "Triac output",
        "AC load switching",
        "solid-state AC output",
        "leakage current"
      ],
      [
        "RTD transmitter",
        "4-20 mA temp",
        "long cable temperature",
        "scaling"
      ]
    ]
  },
  {
    "title": "Industrial PLC Sourcing / Sinking Reference",
    "note": "Sourcing/sinking labels vary by manufacturer. PNP/NPN and the module wiring diagram are clearer.",
    "columns": [
      "ID",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "PNP sensor": "Very common",
      "NPN sensor": "Easy mix-up",
      "Sourcing output": "Easy mix-up",
      "Sinking output": "Easy mix-up",
      "Sinking input": "Very common",
      "Sourcing input": "Easy mix-up",
      "2-wire sensor": "Easy mix-up",
      "3-wire sensor": "Very common"
    },
    "rowTeaching": {
      "PNP sensor": {
        "mechanic101": "a PNP sensor sources positive voltage on its output when active, so the receiving input must be wired to accept that signal",
        "commonConfusion": "People mix up sensor sourcing language with input-card sourcing language. A PNP sensor often works with a sinking input.",
        "seniorTechNote": "Use PNP/NPN plus the input module diagram. The words sourcing and sinking are useful only after you know which device is being described.",
        "verifyBy": "meter output to 0V"
      },
      "NPN sensor": {
        "mechanic101": "an NPN sensor sinks the output toward 0V when active, so the input circuit must be wired for that style",
        "commonConfusion": "An NPN sensor may power up and switch its LED while still failing to turn on a PLC input wired for PNP behavior.",
        "seniorTechNote": "If the sensor LED changes but the input bit does not, prove whether the black wire goes high or low when active.",
        "verifyBy": "meter output to +V"
      },
      "Sourcing output": {
        "mechanic101": "a sourcing output switches positive voltage out to the load",
        "commonConfusion": "Sourcing output is not the same phrase as sourcing input. The load common/reference decides the circuit.",
        "seniorTechNote": "For output troubleshooting, draw the current path from supply through output and load to common. The label alone is not enough.",
        "verifyBy": "trace load current path"
      },
      "Sinking output": {
        "mechanic101": "a sinking output switches the load path down to 0V/common",
        "commonConfusion": "Sinking outputs can surprise techs used to seeing voltage appear at the output terminal when active.",
        "seniorTechNote": "Meter sinking outputs with the load connected and the correct reference. Open-circuit readings can mislead.",
        "verifyBy": "meter with load connected"
      },
      "Sinking input": {
        "mechanic101": "a sinking input accepts current from a sourcing field device, commonly a PNP sensor",
        "commonConfusion": "The input is called sinking because current sinks into the module, while the field sensor may be called sourcing.",
        "seniorTechNote": "When teaching this, name both sides: PNP/sourcing sensor into sinking input. That prevents most wiring mistakes.",
        "verifyBy": "match sensor to input common"
      },
      "Sourcing input": {
        "mechanic101": "a sourcing input supplies current out to a sinking field device, commonly an NPN sensor",
        "commonConfusion": "Sourcing input language feels backward if you are thinking from the sensor instead of the module.",
        "seniorTechNote": "Check the module manual. Some modules are configurable, and a jumper/common setting can flip the expected field device.",
        "verifyBy": "check module common"
      },
      "2-wire sensor": {
        "mechanic101": "a 2-wire sensor sits in series with the load/input and often has leakage current and minimum-load behavior",
        "commonConfusion": "A 2-wire sensor may show voltage when off or fail with tiny loads because it needs operating current through the circuit.",
        "seniorTechNote": "If a 2-wire sensor behaves strangely, check leakage current, minimum load, AC/DC type, and input compatibility.",
        "verifyBy": "check leakage spec"
      },
      "3-wire sensor": {
        "mechanic101": "a 3-wire sensor usually has separate +V, 0V, and output wires, making PNP/NPN behavior easier to test",
        "commonConfusion": "Brown/blue/black is common, but never assume wire colors without checking the datasheet or connector pinout.",
        "seniorTechNote": "On 3-wire sensors, prove supply first, then watch the output change against the correct reference.",
        "verifyBy": "check supply + output"
      }
    },
    "rows": [
      [
        "PNP sensor",
        "sources +V on output",
        "common 24VDC sensors",
        "input common"
      ],
      [
        "NPN sensor",
        "sinks to 0V on output",
        "some import/legacy systems",
        "pull-up/common"
      ],
      [
        "Sourcing output",
        "switches +V to load",
        "PLC output modules",
        "load common"
      ],
      [
        "Sinking output",
        "switches load to 0V",
        "PLC output modules",
        "load supply"
      ],
      [
        "Sinking input",
        "accepts sourcing device",
        "many AB input modules",
        "manual definition"
      ],
      [
        "Sourcing input",
        "accepts sinking device",
        "some module styles",
        "manual definition"
      ],
      [
        "2-wire sensor",
        "series load sensor",
        "prox/photoeye",
        "leakage current"
      ],
      [
        "3-wire sensor",
        "+V/0V/output",
        "standard sensors",
        "pinout"
      ],
      [
        "Brown",
        "+V sensor lead",
        "IEC sensor cable",
        "pinout"
      ],
      [
        "Blue",
        "0V sensor lead",
        "IEC sensor cable",
        "pinout"
      ],
      [
        "Black",
        "output lead",
        "IEC sensor cable",
        "PNP/NPN"
      ],
      [
        "White",
        "second output/teach",
        "4-wire sensors",
        "function"
      ]
    ]
  },
  {
    "title": "Control Panel Terminal Reference",
    "note": "Terminal markings depend on IEC/NEMA convention, manufacturer, and drawing standard.",
    "columns": [
      "Marking",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "A1/A2": "Very common",
      "13/14": "Very common",
      "21/22": "Easy mix-up",
      "95/96": "Very common",
      "X1/X2": "High consequence",
      "PE": "High consequence",
      "0V": "Easy mix-up",
      "COM": "Easy mix-up"
    },
    "rowTeaching": {
      "A1/A2": {
        "mechanic101": "A1/A2 marks coil terminals on many relays and contactors",
        "commonConfusion": "The same device may have coil terminals, power contacts, and aux contacts all close together.",
        "seniorTechNote": "Before moving wires, identify whether the terminal is coil, contact, load, common, or supply.",
        "verifyBy": "terminal diagram"
      },
      "13/14": {
        "mechanic101": "13/14 commonly marks a normally-open auxiliary contact",
        "commonConfusion": "A terminal strip number may look like a device terminal number if the drawing is not followed.",
        "seniorTechNote": "Match the physical device terminal to the drawing symbol and wire number before landing wires.",
        "verifyBy": "wire number + symbol"
      },
      "21/22": {
        "mechanic101": "21/22 commonly marks a normally-closed auxiliary contact",
        "commonConfusion": "Using a NO terminal where NC was intended can invert permissive or interlock behavior.",
        "seniorTechNote": "If behavior is backwards after replacement, meter the contact and compare to the drawing.",
        "verifyBy": "meter contact state"
      },
      "95/96": {
        "mechanic101": "95/96 commonly marks a normally-closed overload trip contact",
        "commonConfusion": "A tripped overload can leave 95/96 open and make the starter look electrically dead.",
        "seniorTechNote": "Check reset state and 95/96 continuity before chasing coil voltage upstream.",
        "verifyBy": "continuity + reset"
      },
      "X1/X2": {
        "mechanic101": "X1/X2 often marks the control transformer secondary, such as 24V or 120V control power",
        "commonConfusion": "Transformer secondary terminals may be grounded or fused in specific ways depending on the drawing.",
        "seniorTechNote": "Do not assume X2 is grounded or floating. Verify the schematic and measure control voltage correctly.",
        "verifyBy": "schematic + meter"
      },
      "PE": {
        "mechanic101": "PE identifies protective earth or equipment grounding connection",
        "commonConfusion": "PE, DC common, neutral, and shield drains serve different purposes and should not be treated as the same node.",
        "seniorTechNote": "Keep protective earth identification clear. Verify bonding and terminal markings before reconnecting grounds.",
        "verifyBy": "bonding check"
      },
      "0V": {
        "mechanic101": "0V is a DC common reference point for many 24VDC control circuits",
        "commonConfusion": "0V may be isolated, bonded, or shared depending on the power supply and machine design.",
        "seniorTechNote": "When troubleshooting DC inputs, meter to the correct 0V for that supply or I/O group.",
        "verifyBy": "trace supply common"
      },
      "COM": {
        "mechanic101": "COM means common, but the voltage group and function depend on the device",
        "commonConfusion": "Relay common, PLC input common, analog common, and power-supply common are not automatically interchangeable.",
        "seniorTechNote": "Before tying commons together, identify the voltage group and isolation boundary from the drawing.",
        "verifyBy": "voltage group check"
      }
    },
    "rows": [
      [
        "A1/A2",
        "coil terminals",
        "relays/contactors",
        "coil voltage"
      ],
      [
        "13/14",
        "NO contact",
        "auxiliary contact",
        "state"
      ],
      [
        "21/22",
        "NC contact",
        "auxiliary contact",
        "state"
      ],
      [
        "95/96",
        "NC overload trip",
        "starter feedback",
        "device convention"
      ],
      [
        "97/98",
        "NO overload trip",
        "trip indication",
        "device convention"
      ],
      [
        "L1/L2/L3",
        "line terminals",
        "incoming power",
        "phase order"
      ],
      [
        "T1/T2/T3",
        "load terminals",
        "motor output",
        "overload location"
      ],
      [
        "X1/X2",
        "control transformer secondary",
        "24/120V control",
        "grounded side"
      ],
      [
        "PE",
        "protective earth",
        "ground terminal",
        "bonding"
      ],
      [
        "0V",
        "DC common",
        "24VDC control",
        "isolated supplies"
      ],
      [
        "24V",
        "DC supply positive",
        "controls/sensors",
        "current capacity"
      ],
      [
        "COM",
        "common terminal",
        "I/O or relay common",
        "voltage group"
      ]
    ]
  },
  {
    "title": "Control Transformer Reference",
    "note": "Transformer selection depends on primary voltage, secondary voltage, VA load, inrush, and protection.",
    "columns": [
      "Item",
      "Meaning",
      "Common use note",
      "Watch point"
    ],
    "signalDetailsOnly": true,
    "rowSignals": {
      "Primary": "High consequence",
      "Secondary": "Very common",
      "VA": "Very common",
      "Fuse primary": "Spec required",
      "Fuse secondary": "Spec required",
      "Inrush": "Easy mix-up",
      "X1 grounded": "High consequence",
      "Multi-tap": "Easy mix-up",
      "VA sum": "Very common"
    },
    "rowTeaching": {
      "Primary": {
        "mechanic101": "The primary winding connects to the supply voltage, often with selectable taps for common industrial voltages",
        "commonConfusion": "A multi-tap transformer can be wired to the wrong primary tap and still produce confusing symptoms.",
        "seniorTechNote": "Before energizing, match the tap wiring to measured supply voltage and the transformer diagram.",
        "verifyBy": "meter supply + tap diagram"
      },
      "Secondary": {
        "mechanic101": "The secondary winding provides the control voltage used by coils, relays, lights, PLC inputs, or control devices",
        "commonConfusion": "A transformer with the right primary can still have the wrong secondary voltage for the control circuit.",
        "seniorTechNote": "Verify secondary voltage with no load and under load before blaming individual coils or relays.",
        "verifyBy": "measure secondary voltage"
      },
      "VA": {
        "mechanic101": "VA is transformer capacity for the control circuit load, including coils and devices connected at the same time",
        "commonConfusion": "Adding up steady loads only can miss contactor/solenoid inrush and cause voltage sag or nuisance fuse trips.",
        "seniorTechNote": "Size controls from simultaneous load and inrush, then compare to transformer and protection ratings.",
        "verifyBy": "sum load + inrush"
      },
      "Fuse primary": {
        "mechanic101": "Primary fusing protects the transformer supply side and must match voltage, current, and code/equipment requirements",
        "commonConfusion": "A fuse that stops nuisance trips may be too large or the wrong class for transformer protection.",
        "seniorTechNote": "Use the design or code-based sizing method rather than experimenting with fuse size.",
        "verifyBy": "drawing + fuse spec"
      },
      "Fuse secondary": {
        "mechanic101": "Secondary fusing protects the control circuit downstream of the transformer",
        "commonConfusion": "Primary protection does not always protect every secondary conductor or branch the way people assume.",
        "seniorTechNote": "Check how the secondary is grounded/fused and where branches split before adding loads.",
        "verifyBy": "secondary protection map"
      },
      "Inrush": {
        "mechanic101": "Inrush is the brief high current when coils, transformers, or solenoids first energize",
        "commonConfusion": "Inrush problems can be misread as short circuits because they happen at startup.",
        "seniorTechNote": "If fuses open only at energizing, compare inrush timing, fuse curve, transformer VA, and connected coil loads.",
        "verifyBy": "fuse curve + load"
      },
      "X1 grounded": {
        "mechanic101": "Some control transformer secondaries intentionally bond one side, often shown as X1 or X2 depending on convention",
        "commonConfusion": "Grounded and floating control secondaries behave differently during troubleshooting and fault detection.",
        "seniorTechNote": "Verify the actual grounded side from the drawing and panel before using ground as your meter reference.",
        "verifyBy": "schematic + ground check"
      },
      "Multi-tap": {
        "mechanic101": "Multi-tap transformers allow different primary supply voltages by changing tap connections",
        "commonConfusion": "Unused tap leads can be mislanded or left unclear during replacement.",
        "seniorTechNote": "Cap and label unused taps, and verify the active tap matches the measured primary voltage.",
        "verifyBy": "tap label + meter"
      },
      "VA sum": {
        "mechanic101": "VA sum is the total control load expected to be powered, especially when several coils energize together",
        "commonConfusion": "A circuit can work with one contactor but sag when multiple devices energize at once.",
        "seniorTechNote": "If controls chatter during startup, check secondary voltage sag and simultaneous VA load.",
        "verifyBy": "measure under load"
      }
    },
    "rows": [
      [
        "Primary",
        "supply winding",
        "480/240/120V input",
        "tap selection"
      ],
      [
        "Secondary",
        "output winding",
        "24/120V controls",
        "grounding"
      ],
      [
        "VA",
        "power rating",
        "control circuit capacity",
        "inrush"
      ],
      [
        "Fuse primary",
        "line-side protection",
        "transformer protection",
        "voltage"
      ],
      [
        "Fuse secondary",
        "control circuit protection",
        "branch protection",
        "class/rating"
      ],
      [
        "Inrush",
        "startup current",
        "contactors/solenoids",
        "nuisance trip"
      ],
      [
        "X1 grounded",
        "grounded control side",
        "120V controls",
        "drawing convention"
      ],
      [
        "Class 2",
        "limited power",
        "24V control devices",
        "load limit"
      ],
      [
        "Multi-tap",
        "selectable primary",
        "480/240/208 input",
        "jumper/tap"
      ],
      [
        "VA sum",
        "load total",
        "coils/lights/devices",
        "simultaneous load"
      ]
    ]
  }
];

  if (typeof window !== "undefined") {
    window.MaintainOpsReferenceData = window.MaintainOpsReferenceData || {};
    window.MaintainOpsReferenceData["electrical"] = ELECTRICAL_CONTROL_REFERENCE_SECTIONS;
  }

  if (typeof module !== "undefined") {
    module.exports = { ELECTRICAL_CONTROL_REFERENCE_SECTIONS };
  }
})();
