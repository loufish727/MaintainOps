(function () {
  const DEFAULT_SHOP_REFERENCE_SECTIONS = (typeof window !== "undefined" && window.MaintainOpsShopReferenceCharts && window.MaintainOpsShopReferenceCharts.SHOP_REFERENCE_SECTIONS)
    || (typeof require !== "undefined" ? require("../data/shopReferenceCharts.js").SHOP_REFERENCE_SECTIONS : []);

  function createConversionDisplayHelpers({
    escapeHtml,
    conversionGroups,
    boltReference,
    wrenchReference,
    conversionResultText,
    shopReferenceSections = DEFAULT_SHOP_REFERENCE_SECTIONS,
  }) {
    function optionHtml(group, selectedUnitId) {
      return group.units.map((unit) => (
        `<option value="${escapeHtml(unit.id)}" ${unit.id === selectedUnitId ? "selected" : ""}>${escapeHtml(unit.label)}</option>`
      )).join("");
    }


    function renderConversionCard(group) {
      const from = group.defaultFrom || group.units[0]?.id || "";
      const to = group.defaultTo || group.units[1]?.id || from;
      const value = group.defaultValue || "1";
      const initialResult = conversionResultText(group.id, value, from, to);
      return `
        <details class="conversion-card" data-conversion-card data-conversion-group="${escapeHtml(group.id)}">
          <summary class="conversion-card-heading">
            <span class="conversion-card-icon" aria-hidden="true">${escapeHtml(group.label.slice(0, 1))}</span>
            <h3>${escapeHtml(group.label)}</h3>
            <span>Open</span>
          </summary>
          <div class="conversion-card-body">
            <button class="icon-action-button" data-conversion-swap type="button" title="Swap units" aria-label="Swap ${escapeHtml(group.label)} units">&#8644;</button>
            <div class="conversion-controls">
              <label>Value<input data-conversion-input type="number" inputmode="decimal" step="any" value="${escapeHtml(value)}"></label>
              <label>From<select data-conversion-from>${optionHtml(group, from)}</select></label>
              <label>To<select data-conversion-to>${optionHtml(group, to)}</select></label>
            </div>
            <output class="conversion-result" data-conversion-output>${escapeHtml(initialResult)}</output>
          </div>
        </details>
      `;
    }

    const shopReferenceCategories = [
      { id: "fasteners", label: "Fasteners & Threads", description: "Threads, bolts, taps, torque, grades, threadlocker" },
      { id: "electrical", label: "Electrical & Controls", description: "Wire, plugs, fuses, sensors, panels, PLC I/O" },
      { id: "diesel-mobile", label: "Diesel & Mobile", description: "SPN/FMI, aftertreatment, batteries, fluids, field service IDs" },
      { id: "machining-cnc", label: "Machining & CNC", description: "G-code, M-code, inserts, GD&T, finishes, offsets" },
      { id: "fabrication", label: "Fabrication & Welding", description: "Weld symbols, electrodes, MIG, plasma, bends, structural shapes" },
      { id: "motors", label: "Motors & Drives", description: "Motors, VFDs, reducers, belts, couplings" },
      { id: "fluid-power", label: "Fluid Power", description: "Hydraulic hose, leaks, seals, cylinders, fittings" },
      { id: "pneumatics", label: "Pneumatics", description: "Air fittings, cylinders, valves, tubing" },
      { id: "bearings-belts-chain", label: "Bearings, Belts & Chain", description: "Bearings, belts, chains, sprockets, wear patterns" },
      { id: "pm-troubleshooting", label: "PM & Troubleshooting", description: "Intervals, symptoms, compressors, pumps" },
      { id: "pipe-hose-fittings", label: "Pipe, Hose & Fittings", description: "Pipe, tubing, NPT, hose clamps, fittings" },
      { id: "materials-shop", label: "Materials & Shop Math", description: "Gauge, grease, close-fit, temperature and shop IDs" },
    ];

    const shopReferenceKinds = [
      { id: "sizing-id", label: "Sizing / ID" },
      { id: "troubleshooting", label: "Troubleshooting" },
      { id: "codes-symbols", label: "Codes / symbols" },
      { id: "common-specs", label: "Common specs" },
    ];

    function shopReferenceCategory(section) {
      const title = section.title.toLowerCase();
      if (/thread|tap|fastener|torque|threadlocker/.test(title)) return "fasteners";
      if (/diesel|aftertreatment|battery \/ charging|heavy equipment/.test(title)) return "diesel-mobile";
      if (/spark plug/.test(title)) return "pm-troubleshooting";
      if (/cnc|g-code|m-code|machining|insert|decimal drill|surface finish|gd&t|offset/.test(title)) return "machining-cnc";
      if (/weld|stick electrode|mig|plasma|fabrication|structural shape/.test(title)) return "fabrication";
      if (/wire|electrical|plug|sensor|fuse|contactor|thermocouple|rtd|plc|relay|conduit|nema enclosure|control panel|control transformer/.test(title)) return "electrical";
      if (/motor|vfd|drive \/ motor|belt code|belt section|gear reducer|coupling/.test(title)) return "motors";
      if (/hydraulic|shaft seal|o-ring material|pump seal/.test(title)) return "fluid-power";
      if (/pneumatic|air cylinder|solenoid/.test(title)) return "pneumatics";
      if (/bearing|roller chain|chain|sprocket|belt failure|conveyor roller/.test(title)) return "bearings-belts-chain";
      if (/extension cord|industrial wire|conduit|ip \/|nema enclosure|electrical/.test(title)) return "electrical";
      if (/pm interval|failure symptom|spark plug|compressor|pump seal/.test(title)) return "pm-troubleshooting";
      if (/pipe|tubing|npt|fitting|hose clamp|hydraulic hose/.test(title)) return "pipe-hose-fittings";
      return "materials-shop";
    }

    function shopReferenceKind(section) {
      const title = section.title.toLowerCase();
      if (/failure|symptom|troubleshooting|fault|leak|fluid condition|spark plug|compressor|pump seal|aftertreatment|spn|fmi/.test(title)) return "troubleshooting";
      if (/g-code|m-code|gd&t|weld symbol|relay \/ contactor symbol|plc|wire color|sourcing \/ sinking|control panel terminal/.test(title)) return "codes-symbols";
      if (/load|fluid|filter|oil|grease|threadlocker|battery|charging|extension cord|transformer|drive \/ motor|plasma|mig wire|stick electrode/.test(title)) return "common-specs";
      return "sizing-id";
    }

    function renderCategoryCard(category, count) {
      return `
        <button class="shop-reference-category-card" data-shop-reference-category="${escapeHtml(category.id)}" type="button" title="${escapeHtml(category.description)}">
          <span>${escapeHtml(category.label)}</span>
          <strong>${count} charts</strong>
        </button>
      `;
    }

    function renderKindCard(kind, count) {
      return `
        <button class="shop-reference-kind-card" data-shop-reference-kind="${escapeHtml(kind.id)}" type="button">
          <span>${escapeHtml(kind.label)}</span>
          <strong>${count} charts</strong>
        </button>
      `;
    }

    function verifyByForReference(section, row) {
      const title = section.title.toLowerCase();
      const rowText = row.join(" ").toLowerCase();
      const teachingVerifyBy = rowTeachingValue(section, row, "verifyBy");
      if (teachingVerifyBy) return teachingVerifyBy;
      if (/bearing suffix/.test(title)) return "read full bearing code";
      if (/bearing quick/.test(title)) return "measure bore + full code";
      if (/bearing symptom/.test(title)) return "inspect race/lube pattern";
      if (/belt code|belt section/.test(title)) return "read belt code + measure width";
      if (/belt failure/.test(title)) return "inspect pulley + tension";
      if (/chain sprocket/.test(title)) return "count teeth + confirm chain";
      if (/roller chain/.test(title)) return "measure pitch + roller width";
      if (/chain \/ sprocket wear/.test(title)) return "check pitch stretch + teeth";
      if (/drill \/ tap/.test(title)) return "gauge thread + test fit";
      if (/metric thread|npt pipe thread/.test(title)) return "check pitch/thread gauge";
      if (/fastener grade/.test(title)) return "read head marking";
      if (/torque/.test(title)) return "confirm OEM torque spec";
      if (/socket \/ wrench/.test(title)) return "test correct wrench fit";
      if (/threadlocker/.test(title)) return "match product datasheet";
      if (/wire gauge/.test(title)) return "measure AWG + insulation rating";
      if (/extension cord/.test(title)) return "read cord jacket marking";
      if (/spark plug/.test(title)) return "compare plug + cylinder data";
      if (/plug|receptacle/.test(title)) return "match NEMA face + rating";
      if (/fuse/.test(title)) return "match class, volts, amps";
      if (/conduit/.test(title)) return "calculate fill with actual OD";
      if (/enclosure/.test(title)) return "read enclosure rating label";
      if (/wire color/.test(title)) return "trace drawing + meter";
      if (/sensor|photoeye|proximity/.test(title)) return "check label, LED, wiring";
      if (/plc i\/o/.test(title)) return "match card type + wiring";
      if (/diesel spn|fmi/.test(title)) return "read code + OEM tree";
      if (/aftertreatment/.test(title)) return "compare live data + sensor";
      if (/diesel fluid|filter/.test(title)) return "match OEM spec/part number";
      if (/battery \/ charging|heavy equipment/.test(title)) return "load test + voltage drop";
      if (/g-code|m-code/.test(title)) return "dry run + active modal check";
      if (/insert id/.test(title)) return "match insert code + holder";
      if (/decimal drill/.test(title)) return "measure drill + print callout";
      if (/surface finish/.test(title)) return "measure Ra/profile callout";
      if (/gd&t/.test(title)) return "read feature control frame";
      if (/cnc offset/.test(title)) return "check active offset screen";
      if (/weld symbol/.test(title)) return "read drawing symbol/tail";
      if (/stick electrode|mig wire|shielding gas/.test(title)) return "match WPS/settings chart";
      if (/plasma cutting/.test(title)) return "match consumables + cut chart";
      if (/fabrication bend/.test(title)) return "check flat pattern/tooling";
      if (/structural shape/.test(title)) return "measure shape + grade";
      if (/sourcing \/ sinking|industrial plc/.test(title)) return "check module diagram";
      if (/control panel terminal/.test(title)) return "trace drawing + terminal mark";
      if (/control transformer/.test(title)) return "sum VA + tap label";
      if (/drive \/ motor nameplate/.test(title)) return "match drive params to nameplate";
      if (/relay|contactor|overload/.test(title)) return "read terminal marks + coil";
      if (/motor nameplate/.test(title)) return "read nameplate fields";
      if (/nema motor frame/.test(title)) return "measure shaft + frame";
      if (/vfd fault/.test(title)) return "read drive fault history";
      if (/pipe \/ tubing/.test(title)) return "measure OD + wall/nominal";
      if (/fitting \/ thread/.test(title)) return "check thread + sealing face";
      if (/hydraulic hose/.test(title)) return "read hose layline";
      if (/hydraulic fluid condition/.test(title)) return "sample oil + system clues";
      if (/hose clamp/.test(title)) return "measure hose OD range";
      if (/pneumatic fitting/.test(title)) return "measure tube OD + thread";
      if (/air cylinder|pneumatic cylinder/.test(title)) return "measure bore/stroke";
      if (/solenoid valve/.test(title)) return "read valve function + coil";
      if (/hydraulic cylinder seal|o-ring|shaft seal/.test(title)) return "measure groove + material";
      if (/hydraulic leak/.test(title)) return "inspect leak point + pressure";
      if (/pump seal/.test(title)) return "inspect seal face + flush";
      if (/gear reducer/.test(title)) return "read tag ratio + shaft";
      if (/coupling/.test(title)) return "measure hub/insert series";
      if (/conveyor roller/.test(title)) return "measure BF + axle";
      if (/thermocouple|rtd/.test(title)) return "match sensor type + wiring";
      if (/oil \/ grease/.test(title)) return "match OEM lube spec";
      if (/sheet metal/.test(title)) return "measure thickness";
      if (/compressor/.test(title)) return "check hours + OEM manual";
      if (/common failure/.test(title)) return "confirm symptom under load";
      if (/class l|class j|class cc/.test(rowText)) return "match holder rejection";
      return "verify marking + measurement";
    }

    function detailTextFromRules(section, rules, fallback) {
      const title = section.title.toLowerCase();
      const match = rules.find((rule) => rule.pattern.test(title));
      return match ? match.text : fallback;
    }

    function referenceSourceFamily(section, category) {
      return detailTextFromRules(section, [
        { pattern: /diesel|aftertreatment|battery|heavy equipment/, text: "SAE J1939, engine OEM service data, equipment service manuals" },
        { pattern: /g-code|m-code|cnc|offset/, text: "CNC control manual, machine builder documentation, setup sheet" },
        { pattern: /insert|drill|surface finish/, text: "ISO machining standards, tooling catalog, print requirement" },
        { pattern: /gd&t/, text: "ASME Y14.5 / ISO GPS drawing standard family" },
        { pattern: /weld|electrode|mig/, text: "AWS symbol/procedure standards, WPS, filler manufacturer data" },
        { pattern: /plasma/, text: "plasma system cut chart, consumable chart, machine manual" },
        { pattern: /bend|structural shape/, text: "fabrication handbook, material standard, shop drawing" },
        { pattern: /extension cord/, text: "UL flexible cord/listing guidance, OSHA flexible-cord rules, tool OEM cord tables, cord jacket markings" },
        { pattern: /spark plug/, text: "spark plug manufacturer diagnosis guides, OEM service data, cylinder comparison, scan data" },
        { pattern: /wire|plug|fuse|conduit|panel|transformer|plc|relay|sensor|thermocouple|rtd/, text: "NEC/NFPA 70, NEMA/IEC standards, device datasheets" },
        { pattern: /motor|vfd|drive|gear reducer|coupling/, text: "NEMA/IEC motor data, drive manual, OEM mechanical catalog" },
        { pattern: /hydraulic fluid condition/, text: "hydraulic fluid OEM manuals, filtration guidance, lubricant manufacturer data, oil analysis references" },
        { pattern: /hydraulic|hose|o-ring|shaft seal|fitting|pipe|tubing/, text: "SAE/ISO fluid power standards, hose/fitting/seal catalog" },
        { pattern: /pneumatic|air cylinder|solenoid/, text: "ISO pneumatic standards, valve/cylinder manufacturer data" },
        { pattern: /bearing|belt|chain|sprocket|roller/, text: "ABMA/ISO bearing data, belt/chain manufacturer catalog" },
        { pattern: /thread|tap|fastener|torque|threadlocker|wrench|socket/, text: "ASME/ISO fastener standards, OEM torque data, product datasheet" },
        { pattern: /sheet metal|oil|grease|failure|compressor|pump/, text: "ASTM/SAE material data, OEM manual, maintenance history" },
      ], `${category.replaceAll("-", " ")} reference family, OEM manual, and measured part marking`);
    }

    function referenceAlternateNames(section, category) {
      return detailTextFromRules(section, [
        { pattern: /spn|fmi/, text: "fault code, J1939 code, DTC, diagnostic code" },
        { pattern: /aftertreatment/, text: "emissions system, DPF/SCR system, exhaust treatment" },
        { pattern: /g-code/, text: "preparatory code, motion code, modal G code" },
        { pattern: /m-code/, text: "miscellaneous code, machine function code" },
        { pattern: /insert/, text: "carbide insert, turning insert, indexable insert" },
        { pattern: /gd&t/, text: "feature control frame, geometric tolerance, datum callout" },
        { pattern: /weld symbol/, text: "AWS symbol, drawing weld callout, welding notation" },
        { pattern: /stick electrode/, text: "SMAW rod, arc rod, welding electrode" },
        { pattern: /mig/, text: "GMAW wire, solid wire, shielding gas setup" },
        { pattern: /plasma/, text: "air plasma, cut chart, consumables chart" },
        { pattern: /sourcing|sinking/, text: "PNP/NPN wiring, input common, output polarity" },
        { pattern: /terminal/, text: "terminal strip, wire marker, panel terminal" },
        { pattern: /transformer/, text: "control power transformer, CPT, VA transformer" },
        { pattern: /wire gauge/, text: "AWG, conductor size, cable size" },
        { pattern: /extension cord/, text: "drop cord, cord set, flexible cord, portable cord, SJTW/SOOW cord" },
        { pattern: /spark plug/, text: "plug reading, plug condition, ignition/fueling clue, misfire clue" },
        { pattern: /plug|receptacle/, text: "NEMA plug, twist-lock, cord cap" },
        { pattern: /fuse/, text: "fuse class, current-limiting fuse, branch fuse" },
        { pattern: /bearing/, text: "bearing number, bearing code, bearing ID" },
        { pattern: /belt/, text: "V-belt, belt section, belt code" },
        { pattern: /chain/, text: "roller chain, chain pitch, sprocket chain" },
        { pattern: /hydraulic fluid condition/, text: "oil condition, fluid contamination, hydraulic oil sample, reservoir check" },
        { pattern: /hydraulic hose/, text: "hose dash size, hose ID, hydraulic line" },
        { pattern: /fitting|thread/, text: "adapter, thread form, sealing face" },
        { pattern: /o-ring/, text: "seal ring, elastomer seal, dash size" },
        { pattern: /shaft seal/, text: "oil seal, lip seal, rotary seal" },
        { pattern: /torque/, text: "tightening spec, bolt torque, clamp load reference" },
      ], `${category.replaceAll("-", " ")} chart, shop reference, field ID aid`);
    }

    function referenceWrongMatches(section, category) {
      return detailTextFromRules(section, [
        { pattern: /spn|fmi/, text: "same SPN with different FMI, inactive history, manufacturer-specific code text" },
        { pattern: /aftertreatment/, text: "NOx sensor vs DEF dosing fault, soot load vs ash load, regen inhibit vs failed regen" },
        { pattern: /g-code|m-code|cnc|offset/, text: "same code on another control, wrong active work offset, hidden modal state" },
        { pattern: /insert/, text: "same shape with wrong thickness, radius, chipbreaker, grade, or holder hand" },
        { pattern: /drill/, text: "near decimal size, clearance drill vs tap drill, letter/number mix-up" },
        { pattern: /surface finish/, text: "Ra vs RMS, microinch vs micrometer, process guess without measurement" },
        { pattern: /gd&t/, text: "profile vs position, circularity vs cylindricity, datum omitted" },
        { pattern: /weld|electrode|mig|plasma/, text: "similar filler with wrong position/current/gas, cut chart for different consumables" },
        { pattern: /extension cord/, text: "cord length ignored, jacket marking misread, indoor cord used outdoors, plug rating confused with wire size" },
        { pattern: /spark plug/, text: "plug appearance mistaken for final diagnosis, fuel wet vs oil wet, heat range issue vs engine problem" },
        { pattern: /wire|plug|fuse|conduit|panel|transformer|plc|relay|sensor/, text: "same voltage with wrong current, AC/DC mix-up, source/sink reversed" },
        { pattern: /motor|vfd|drive|gear reducer|coupling/, text: "same HP with wrong frame, wrong base speed, wrong shaft or service factor" },
        { pattern: /hydraulic fluid condition/, text: "normal darkening vs failed oil, water haze vs air bubbles, dirt vs wear metal, visual clue vs oil analysis result" },
        { pattern: /hydraulic|hose|o-ring|shaft seal|fitting|pipe|tubing/, text: "close OD with wrong thread, wrong sealing face, wrong pressure or material" },
        { pattern: /pneumatic|air cylinder|solenoid/, text: "same port with wrong valve function, wrong coil voltage, wrong tube OD" },
        { pattern: /bearing|belt|chain|sprocket|roller/, text: "same bore with wrong width/seal, same belt length with wrong section, chain pitch mismatch" },
        { pattern: /thread|tap|fastener|torque|threadlocker|wrench|socket/, text: "metric vs inch near match, coarse vs fine pitch, wrench fit confused with thread size" },
      ], "visually similar part, near-size match, or correct family with the wrong rating");
    }

    function referenceExamples(section) {
      return section.rows
        .slice(0, 4)
        .map((row) => row[0])
        .filter(Boolean)
        .join(", ");
    }

    function rowDetailLabel(row) {
      return row[0] || "This row";
    }

    function rowWrongMatches(section, row, category) {
      const label = rowDetailLabel(row);
      return `${label}: ${referenceWrongMatches(section, category)}`;
    }

    function rowExample(row) {
      return row.filter(Boolean).join(" / ");
    }

    function rowTeachingValue(section, row, field) {
      const teaching = section.rowTeaching && section.rowTeaching[row[0]];
      return teaching && teaching[field] ? teaching[field] : "";
    }

    function rowMechanic101(section, row) {
      const title = section.title.toLowerCase();
      const label = rowDetailLabel(row);
      const rowText = row.join(" ").toLowerCase();
      const teaching = rowTeachingValue(section, row, "mechanic101");
      if (teaching) return teaching;
      if (/wire gauge/.test(title) && /^(14|12|10|8|6)$/.test(String(row[0] || ""))) {
        return `${label} AWG is only one sizing clue; fuse/breaker size, copper vs aluminum, insulation rating, temperature, bundling, and run length all matter`;
      }
      if (/socket \/ wrench/.test(title) && /(10 mm|13 mm|14 mm|19 mm)/.test(rowText)) {
        return `${row[1]} is a wrench/socket size for the fastener head, not the bolt thread size`;
      }
      if (/bearing quick/.test(title) && /^(6203|6204|6205|6206)$/.test(String(row[0] || ""))) {
        return `${label} identifies the bearing size family, but suffix, seal/shield style, clearance, and fit still decide the replacement`;
      }
      if (/spark plug/.test(title)) {
        return "spark plug condition is a clue; compare all cylinders and confirm ignition, fuel, compression, heat range, and OEM plug spec";
      }
      if (/hydraulic fluid condition/.test(title)) {
        return "hydraulic fluid appearance is a clue; confirm with oil sample, filter condition, reservoir checks, temperature, noise, and OEM fluid spec";
      }
      return detailTextFromRules(section, [
        { pattern: /wire gauge/, text: "wire size, fuse size, insulation rating, and run length all matter" },
        { pattern: /socket \/ wrench/, text: "wrench size is fastener head size, not bolt thread size" },
        { pattern: /bearing quick/, text: "bearing bore, OD, width, suffix, seal style, and clearance all matter" },
        { pattern: /bearing/, text: "match the complete bearing code, not just the bore" },
        { pattern: /thread|tap|fastener/, text: "diameter, pitch, grade, and thread family must all match" },
        { pattern: /torque/, text: "torque depends on grade, lubrication, thread condition, and OEM spec" },
        { pattern: /hydraulic|hose|fitting|seal/, text: "pressure, material, sealing face, and contamination drive the right choice" },
        { pattern: /sensor|plc|relay|contactor|wire|plug|fuse|transformer/, text: "voltage, current, AC/DC type, and wiring method must match the device" },
        { pattern: /motor|vfd|drive/, text: "nameplate data and application load decide the correct setup" },
        { pattern: /cnc|g-code|m-code|insert/, text: "active setup, control model, tooling, and offsets change what the code means" },
        { pattern: /weld|electrode|mig|plasma/, text: "material, process, position, filler, and machine settings must agree" },
      ], "identify the part family, then verify the exact marking, size, and application");
    }

    function rowCommonConfusion(section, row, category) {
      const title = section.title.toLowerCase();
      const label = rowDetailLabel(row);
      const rowText = row.join(" ").toLowerCase();
      const teaching = rowTeachingValue(section, row, "commonConfusion");
      if (teaching) return teaching;
      if (/wire gauge/.test(title) && /^(14|12|10|8|6)$/.test(String(row[0] || ""))) {
        return `${label} AWG can be confused with nearby gauge sizes by sight. Do not size wire from voltage alone; current, protection, material, and run length change the answer.`;
      }
      if (/socket \/ wrench/.test(title) && /10 mm/.test(rowText)) {
        return "10mm is close enough to some inch sizes to tempt a shortcut, but loose fit rounds hardware under load.";
      }
      if (/socket \/ wrench/.test(title) && /(13 mm|14 mm|19 mm)/.test(rowText)) {
        return `${row[1]} may feel close to an SAE size during identification. Confirm full seating before torque or removal force.`;
      }
      if (/bearing quick/.test(title) && /^(6203|6204|6205|6206)$/.test(String(row[0] || ""))) {
        return `${label} can match by bore while still being wrong by width, seal/shield suffix, clearance, cage, or fit.`;
      }
      if (/spark plug/.test(title)) {
        if (/fuel wet/i.test(label)) return "fuel-wet and oil-wet plugs can both look wet at a glance. Smell, texture, cylinder data, and compression separate the cause.";
        if (/oil fouling/i.test(label)) return "oil fouling can be mistaken for a bad plug. The plug may be the symptom, while rings, guides, PCV, or cylinder wear are the cause.";
        if (/overheated/i.test(label)) return "overheated plug signs can be confused with normal light coloring. Blistering, eroded electrodes, timing, lean mix, cooling, and heat range matter.";
        if (/carbon tracking/i.test(label)) return "carbon tracking can be missed because the plug tip may not look terrible. The spark may be leaking down the insulator or boot path.";
        return `${label}: plug appearance can be mistaken for final diagnosis. Compare cylinders and verify the running condition.`;
      }
      return rowWrongMatches(section, row, category);
    }

    function seniorTechNoteForReference(section, row, category) {
      const label = rowDetailLabel(row);
      const rowText = row.join(" ").toLowerCase();
      const teaching = rowTeachingValue(section, row, "seniorTechNote");
      if (teaching) return teaching;
      if (/wire gauge/i.test(section.title) && /^(14|12|10|8|6)$/.test(String(row[0] || ""))) {
        return `${label} AWG is common enough to recognize quickly, but fuse size, run length, and insulation rating still decide the final answer`;
      }
      if (/socket \/ wrench/i.test(section.title) && /10 mm/.test(rowText)) {
        return "10mm is a high-frequency mechanic size because it appears constantly on metric hardware; keep extras, but do not treat a loose SAE fit as correct";
      }
      if (/socket \/ wrench/i.test(section.title) && /(13 mm|14 mm|19 mm)/.test(rowText)) {
        return `${row[1]} is common in metric work; use close-fit notes for identification, then seat the correct socket before applying load`;
      }
      if (/bearing quick/i.test(section.title) && /^(6203|6204|6205|6206)$/.test(String(row[0] || ""))) {
        return `${label} is common in rotating equipment, but suffix, clearance, seal/shield style, and fit are where replacements go wrong`;
      }
      if (/spark plug/i.test(section.title)) {
        if (/dry carbon/i.test(label)) return "Dry carbon fouling points toward rich running, weak ignition, cold operation, or the wrong heat range; replace the plug only after checking why it fouled.";
        if (/fuel wet/i.test(label)) return "A fuel-wet plug is usually telling you the cylinder did not light off; check spark, injector behavior, and compression before blaming the plug.";
        if (/oil fouling/i.test(label)) return "Oil fouling is a root-cause clue. The new plug may foul again if oil control, PCV, guides, rings, or cylinder wear are ignored.";
        if (/overheated/i.test(label)) return "Overheated plug damage is a stop-and-check signal because lean operation, timing, cooling, or wrong heat range can hurt the engine.";
        if (/carbon tracking/i.test(label)) return "Carbon tracking often follows the boot path, so a new plug alone may not fix the misfire if the boot, coil, or wire leaks spark.";
        if (/worn electrode/i.test(label)) return "A worn electrode is common maintenance evidence; check gap, mileage, and whether the wear is even across cylinders.";
        return `${label}: use the plug as a clue, then confirm with live data, cylinder comparison, and OEM service information.`;
      }
      return `${label}: ${referenceWrongMatches(section, category)}. Verify before replacing, tightening, wiring, or ordering.`;
    }

    function riskSignalForReference(section, row) {
      const title = section.title.toLowerCase();
      const rowText = row.join(" ").toLowerCase();
      const relevance = rowRelevance(section, row);
      if (section.signalDetailsOnly && relevance) return relevance;
      if (/torque|wire|fuse|hydraulic|pressure|lifting|structural|electrical/.test(title)) return "Spec required";
      if (/wrong|not npt|not sealed|overheat|leak|fault|failure|symptom/.test(rowText)) return "High consequence";
      if (relevance) return relevance;
      return "Verify first";
    }

    function rowExampleForReference(section, row) {
      const title = section.title.toLowerCase();
      const label = rowDetailLabel(row);
      const rowText = row.join(" ").toLowerCase();
      if (/wire gauge/.test(title) && /^(14|12|10|8|6)$/.test(String(row[0] || ""))) {
        return `${label} AWG is commonly associated with ${row[3]}, but only when the installation conditions allow it.`;
      }
      if (/socket \/ wrench/.test(title) && /(10 mm|13 mm|14 mm|19 mm)/.test(rowText)) {
        return `${row[1]} is commonly reached for ${row[3]}; use the close-fit value for identification, not as a substitute spec.`;
      }
      if (/bearing quick/.test(title) && /^(6203|6204|6205|6206)$/.test(String(row[0] || ""))) {
        return `${label} (${row[1]} bore, ${row[2]}) is commonly seen on ${row[3]}; match the full bearing code before ordering.`;
      }
      if (/spark plug/.test(title)) {
        return `${label}: ${row[1]}. Field clue: ${row[2]}. First check: ${row[3]}.`;
      }
      if (/hydraulic fluid condition/.test(title)) {
        return `${label}: ${row[1]}. Likely clue: ${row[2]}. First check: ${row[3]}.`;
      }
      return rowExample(row);
    }

    function rowDetailItems(section, row, category) {
      return [
        ["Mechanic 101", rowMechanic101(section, row)],
        ["Common confusion", rowCommonConfusion(section, row, category)],
        ["Senior tech note", seniorTechNoteForReference(section, row, category)],
        ["Verify by", verifyByForReference(section, row)],
        ["Risk / signal", riskSignalForReference(section, row)],
        ["Source family", referenceSourceFamily(section, category)],
        ["Example", rowExampleForReference(section, row)],
      ];
    }

    function rowRelevance(section, row) {
      const title = section.title.toLowerCase();
      const label = String(row[0] || "").toLowerCase();
      const rowText = row.join(" ").toLowerCase();
      if (/wire gauge/.test(title) && /^(14|12|10|8|6)$/.test(label)) {
        return "Very common";
      }
      if (/socket \/ wrench/.test(title) && /(10 mm|13 mm|14 mm|19 mm)/.test(rowText)) {
        return "Very common";
      }
      if (/bearing quick/.test(title) && /^(6203|6204|6205|6206)$/.test(label)) {
        return "Very common";
      }
      if (section.rowSignals && Object.prototype.hasOwnProperty.call(section.rowSignals, row[0])) {
        return section.rowSignals[row[0]];
      }
      return "";
    }

    function shouldRenderRowDetail(section, row) {
      if (section.signalDetailsOnly) {
        return Boolean(rowRelevance(section, row));
      }
      return true;
    }

    function renderRowDetail(section, row, category) {
      const label = rowDetailLabel(row);
      const details = rowDetailItems(section, row, category);
      return `
        <details class="shop-reference-line-detail">
          <summary title="Explain ${escapeHtml(label)}">
            <span class="shop-reference-help-mark" aria-hidden="true">?</span>
            <span class="shop-reference-help-copy">Explain ${escapeHtml(label)}</span>
          </summary>
          <div class="shop-reference-detail-panel" aria-label="${escapeHtml(section.title)} ${escapeHtml(label)} reference context">
            ${details.map(([detailLabel, value]) => `
              <div class="shop-reference-detail-item">
                <span>${escapeHtml(detailLabel)}</span>
                <strong>${escapeHtml(value)}</strong>
              </div>
            `).join("")}
          </div>
        </details>
      `;
    }

    function renderReferenceRow(section, row, sourceRow, category, columns) {
      const relevance = rowRelevance(section, sourceRow);
      const hasDetail = shouldRenderRowDetail(section, sourceRow);
      return `
        <tr class="shop-reference-data-row${relevance ? " shop-reference-row-high-signal" : ""}${hasDetail ? " shop-reference-row-has-detail" : ""}">
          <td class="shop-reference-row-card-cell" colspan="${columns.length}">
            <div class="shop-reference-row-card">
              <div class="shop-reference-row-fields" style="--shop-reference-columns: ${columns.length};">
                ${row.map((cell, cellIndex) => `
                  <div class="shop-reference-row-field" data-label="${escapeHtml(columns[cellIndex] || "")}">
                    <span>${escapeHtml(columns[cellIndex] || "")}</span>
                    <strong>${cellIndex === 0 && relevance ? `<span class="shop-reference-row-signal">${escapeHtml(relevance)}</span>` : ""}${escapeHtml(cell)}</strong>
                  </div>
                `).join("")}
              </div>
              ${hasDetail ? renderRowDetail(section, sourceRow, category) : ""}
            </div>
          </td>
        </tr>
      `;
    }

    function renderReferenceTable(section) {
      const category = shopReferenceCategory(section);
      const kind = shopReferenceKind(section);
      const columns = [...section.columns, "Verify by"];
      const rows = section.rows.map((row) => [...row, verifyByForReference(section, row)]);
      const rowDetails = section.rows
        .filter((row) => shouldRenderRowDetail(section, row))
        .map((row) => rowDetailItems(section, row, category));
      const searchableText = [
        section.title,
        category,
        section.note,
        ...columns,
        ...rowDetails.flat(2),
        ...rows.flat(),
      ].join(" ");
      return `
        <details class="bolt-reference-details shop-reference-details shop-reference-card" data-shop-reference-card data-shop-reference-category="${escapeHtml(category)}" data-shop-reference-kind="${escapeHtml(kind)}" data-shop-reference-title="${escapeHtml(section.title)}" data-shop-reference-search="${escapeHtml(searchableText.toLowerCase())}">
          <summary class="bolt-reference-summary">
            <div class="shop-reference-card-main">
              <div class="chip-row">
                <span class="chip">reference</span>
                <span class="chip">${section.rows.length} rows</span>
              </div>
              <strong>${escapeHtml(section.title)}</strong>
              <small>${escapeHtml(columns.join(" / "))}</small>
            </div>
            <div class="shop-reference-card-actions">
              <button class="shop-reference-favorite" data-shop-reference-favorite type="button" aria-label="Favorite ${escapeHtml(section.title)}" title="Favorite chart" aria-pressed="false">&#9734;</button>
              <span class="part-tile-open">Open</span>
            </div>
          </summary>
          <div class="bolt-table-wrap" role="region" aria-label="${escapeHtml(section.title)} table" tabindex="0">
            <table class="bolt-reference-table shop-reference-table">
              <thead>
                <tr>${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr>
              </thead>
              <tbody>
                ${rows.map((row, index) => renderReferenceRow(section, row, section.rows[index], category, columns)).join("")}
              </tbody>
            </table>
          </div>
          <p class="shop-reference-note"><span aria-hidden="true">*</span>${escapeHtml(section.note)}</p>
        </details>
      `;
    }

    function renderShopReferences() {
      const pageSize = 12;
      const sortedSections = [...shopReferenceSections].sort((a, b) => a.title.localeCompare(b.title));
      const categoryCount = (categoryId) => (
        shopReferenceSections.filter((section) => shopReferenceCategory(section) === categoryId).length
      );
      const kindCount = (kindId) => (
        shopReferenceSections.filter((section) => shopReferenceKind(section) === kindId).length
      );
      const totalPages = Math.max(1, Math.ceil(sortedSections.length / pageSize));
      return `
        <section class="shop-reference-panel" data-shop-reference-panel data-shop-reference-page-size="${pageSize}">
          <div class="shop-reference-heading">
          <div>
            <h3>Shop Reference Charts</h3>
              <p>Common field references, sorted alphabetically. Search filters chart names, IDs, sizes, and notes.</p>
            </div>
            <span>${shopReferenceSections.length} charts / 12 per page</span>
          </div>
          <div class="shop-reference-pages">
            <label class="shop-reference-search">
              <span>Search references</span>
              <input data-shop-reference-search-input type="search" inputmode="search" autocomplete="off" placeholder="Try 6205, NPT, M12, 5VX800, photoeye...">
            </label>
            <div class="shop-reference-filter-group">
              <span>1. Choose reference type</span>
              <div class="shop-reference-kind-grid" data-shop-reference-kind-grid>
                <button class="shop-reference-kind-card" data-shop-reference-kind="" type="button">
                  <span>All types</span>
                  <strong>${shopReferenceSections.length} charts</strong>
                </button>
                ${shopReferenceKinds.map((kind) => renderKindCard(kind, kindCount(kind.id))).join("")}
              </div>
            </div>
            <div class="shop-reference-filter-group" data-shop-reference-category-group hidden>
              <span>2. Narrow by trade area</span>
            <div class="shop-reference-category-grid" data-shop-reference-category-grid>
              <button class="shop-reference-category-card" data-shop-reference-category="" type="button" title="Show every trade area for the selected reference type">
                <span>All trade areas</span>
                <strong>${shopReferenceSections.length} charts</strong>
              </button>
              ${shopReferenceCategories.map((category) => renderCategoryCard(category, categoryCount(category.id))).join("")}
            </div>
            </div>
            <div class="active-team-filter shop-reference-active-filter" data-shop-reference-active-category hidden>
              <span data-shop-reference-active-category-label></span>
              <button class="text-button" data-shop-reference-back type="button">All filters</button>
            </div>
            <div class="shop-reference-card-grid" data-shop-reference-grid>
              ${sortedSections.map(renderReferenceTable).join("")}
            </div>
            <p class="shop-reference-empty" data-shop-reference-empty hidden>No matching reference cards.</p>
            ${shopReferenceSections.length > pageSize ? `
              <div class="pagination-bar shop-reference-pagination">
                <button class="secondary-button page-action-button" data-shop-reference-page="prev" type="button" disabled>Previous</button>
                <span data-shop-reference-page-status>Showing 1-${Math.min(pageSize, sortedSections.length)} of ${sortedSections.length} - Page 1 of ${totalPages}</span>
                <button class="secondary-button page-action-button" data-shop-reference-page="next" type="button">Next</button>
              </div>
            ` : ""}
          </div>
        </section>
      `;
    }

    function renderBoltReference() {
      return `
        <section class="conversion-reference">
          <div class="settings-section-heading">
            <h3>Bolt Size Reference</h3>
            <span>Closest common sizes only</span>
          </div>
          <p class="muted">Imperial and metric bolts are not interchangeable by diameter alone. Verify thread pitch, grade, length, and fit before replacing hardware.</p>
          <div class="bolt-gauge" data-bolt-gauge>
            <div class="settings-section-heading">
              <h3>Bolt Gauge</h3>
              <span>screen fit estimate</span>
            </div>
            <div class="bolt-gauge-mode" role="radiogroup" aria-label="Bolt gauge mode">
              <label><input data-bolt-gauge-mode type="radio" name="bolt-gauge-mode" value="wrench" checked>SELECT HEAD / WRENCH</label>
              <label><input data-bolt-gauge-mode type="radio" name="bolt-gauge-mode" value="thread">SELECT THREAD / NUT ID</label>
            </div>
            <div class="bolt-gauge-layout">
              <div class="bolt-gauge-measurement-stack">
                <p class="bolt-gauge-screen-callout"><span aria-hidden="true">*</span>PLACE THE ACTUAL BOLT, NUT, OR WRENCH HEAD DIRECTLY ON THE WHITE SCREEN CARD BELOW.</p>
                <div class="bolt-gauge-card-readout">
                  <output class="bolt-gauge-output" data-bolt-gauge-output></output>
                </div>
                <div class="bolt-gauge-card" data-bolt-gauge-card aria-label="Bolt gauge sizing card">
                  <label class="bolt-gauge-size-lock"><input data-bolt-gauge-size-lock type="checkbox">Lock size</label>
                  <div class="bolt-gauge-circle" data-bolt-gauge-circle></div>
                  <div class="bolt-gauge-calibration-line" data-bolt-gauge-calibration-line><span>1 in</span></div>
                </div>
              </div>
              <div class="bolt-gauge-controls">
                <label class="bolt-gauge-sizing-control">Sizing circle<input data-bolt-gauge-diameter type="range" min="18" max="280" step="1" value="96"></label>
                <label class="bolt-gauge-points-control">Head points<select data-bolt-gauge-points><option value="6" selected>6 point hex</option><option value="4">4 point square</option><option value="8">8 point square</option><option value="12">12 point socket</option></select></label>
                <label class="bolt-gauge-calibration-control">1 in calibration<input data-bolt-gauge-calibration type="range" min="48" max="200" step="1" value="96"></label>
                <label class="bolt-gauge-lock"><input data-bolt-gauge-lock type="checkbox" checked>Lock 1 in calibration</label>
                <p class="muted">Reference only. Verify thread pitch, grade, and final size with a physical gauge or calipers.</p>
              </div>
            </div>
          </div>
          <details class="bolt-reference-details">
            <summary class="bolt-reference-summary">
              <strong>Common Inch Thread Reference</strong>
              <span>${boltReference.length} rows</span>
            </summary>
            <div class="bolt-table-wrap" role="region" aria-label="Common inch thread reference table" tabindex="0">
              <table class="bolt-reference-table">
                <thead>
                  <tr>
                    <th>Inch size</th>
                    <th>Common inch thread</th>
                    <th class="bolt-reference-detail">Major dia. in</th>
                    <th class="bolt-reference-detail">Nearest metric</th>
                    <th class="bolt-reference-detail">Metric dia. mm</th>
                  </tr>
                </thead>
                <tbody>
                  ${boltReference.map((row) => `
                    <tr class="bolt-reference-row" data-bolt-size-row="${escapeHtml(row.inch)}">
                      <td class="bolt-reference-primary">${escapeHtml(row.inch)}</td>
                      <td class="bolt-reference-primary">${escapeHtml(row.threads)}</td>
                      <td class="bolt-reference-detail">${escapeHtml(row.inchDiameter)}</td>
                      <td class="bolt-reference-detail">${escapeHtml(row.metric)}</td>
                      <td class="bolt-reference-detail">${escapeHtml(row.metricDiameter)}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </details>
          <details class="bolt-reference-details">
            <summary class="bolt-reference-summary">
              <strong>Common Wrench / Head Size Reference</strong>
              <span>${wrenchReference.length} rows</span>
            </summary>
            <div class="bolt-table-wrap" role="region" aria-label="Common wrench and head size reference table" tabindex="0">
              <table class="bolt-reference-table wrench-reference-table">
                <thead>
                  <tr>
                    <th>Thread size</th>
                    <th>Wrench size</th>
                    <th class="bolt-reference-detail">Thread dia. in</th>
                    <th class="bolt-reference-detail">Wrench mm</th>
                    <th class="bolt-reference-detail">Use</th>
                  </tr>
                </thead>
                <tbody>
                  ${wrenchReference.map((row) => `
                    <tr class="bolt-reference-row" data-wrench-size-row="${escapeHtml(row.thread)}">
                      <td class="bolt-reference-primary">${escapeHtml(row.thread)}</td>
                      <td class="bolt-reference-primary">${escapeHtml(row.wrenchIn)}</td>
                      <td class="bolt-reference-detail">${escapeHtml(row.threadDiameterIn)}</td>
                      <td class="bolt-reference-detail">${escapeHtml(row.wrenchMm)}</td>
                      <td class="bolt-reference-detail">${escapeHtml(row.note)}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </details>
          ${renderShopReferences()}
        </section>
      `;
    }

    function renderConversionsPanel() {
      return `
        <div class="conversion-screen">
          <div class="conversion-grid">
            <div class="conversion-board-heading">
              <div>
                <h3>Unit Converters</h3>
                <p>Common shop and maintenance measurements</p>
              </div>
              <span>${conversionGroups.length} tools</span>
            </div>
            ${conversionGroups.map(renderConversionCard).join("")}
          </div>
          ${renderBoltReference()}
        </div>
      `;
    }

    return {
      renderConversionsPanel,
    };
  }

  window.MaintainOpsConversionDisplay = {
    createConversionDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createConversionDisplayHelpers };
  }
})();
