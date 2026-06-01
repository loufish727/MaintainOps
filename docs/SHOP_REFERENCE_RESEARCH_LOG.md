# Shop Reference Research Log

This log tracks source validation before chart content changes. It is intentionally separate from the rendered chart data so reference edits are based on reviewed evidence, not quick guesses.

## Source Rules In Use

- Identification charts require 4-source validation.
- Decision charts require 10-source validation.
- Highlighted rows require row-specific support.
- Forum/field sources are used for confusion and common-use evidence, not as final authority.

## Current Research Queue

| Chart | Type | Source Target | Status | Why |
| --- | --- | ---: | --- | --- |
| Wire Gauge Reference | Decision | 10 | Started | Electrical sizing/protection can affect overheating, nuisance trips, voltage drop, and code/OEM fit. |
| Socket / Wrench Close-Fit Reference | Identification | 4 | Queued | Useful mechanic field lookup with common close-fit mistakes. |
| Bearing Quick Reference | Identification with consequence rows | 4 chart / row-specific highlights | Queued | Common part ID chart; suffix, clearance, seal, and fit mistakes can cause repeat failure. |
| Spark Plug Condition Reference | Identification/troubleshooting | 4 | Implemented trial | Mechanic-facing visual diagnosis chart used to test signal-only detail expansion and row-specific teaching text. |
| Hydraulic Fluid Condition Reference | Identification/troubleshooting | 4 | Implemented trial | Mechanic-facing fluid condition chart used to test the no-generic-detail rule for all signal rows. |
| Extension Cord Load Reference | Decision/common-spec | 10 | Started / limited signal trial | Simple-looking chart that can affect load, heat, voltage drop, outdoor use, and jobsite protection decisions. |

## Wire Gauge Reference - Started

Classification: 10-source decision chart.

Reason: This chart can influence wire, fuse/breaker, cord, and current-carrying decisions. It needs authority/manufacturer support plus field-confusion evidence.

### Reviewed / Opened Sources

1. Blue Sea Systems, Circuit Protection  
   URL: https://www.bluesea.com/resources/96  
   Use: authority/manufacturer-style guidance for wire sizing, voltage drop, inrush, and circuit protection concepts.

2. Cerrowire, Ampacity Charts  
   URL: https://www.cerrowire.com/products/resources/tables-calculators/ampacity-charts/  
   Use: beginner/authority-style explanation of ampacity, load, voltage drop, derating, and NEC consultation warning.

3. Southwire, SIMpull THHN/THWN-2 Copper  
   URL: https://www.southwire.com/wire-cable/building-wire/simpull-sup-sup-thhn-thwn-2-copper/p/SPEC10000  
   Use: manufacturer data with NEC table notes and overcurrent limitation references for 14/12/10 AWG.

4. Ancor, Marine Wire Resources  
   URL: https://www.navico.com/ancor/resources  
   Use: field/OEM-style wire marking, voltage rating, temperature rating, oil resistance, 3%/10% voltage drop, and connector guidance.

5. Eaton Bussmann, Fuseology Handbook  
   URL: https://www.eaton.com/content/dam/eaton/support/austria/downloads/Handbuch_Fuseology_Overcurrent_protection.pdf  
   Use: overcurrent protection background, overload/short-circuit distinction, inrush, interrupting rating, and fuse terminology.

### Candidate Sources To Review Next

6. Lapp Tannehill Ampacity Chart  
   URL: https://www.lapptannehill.com/resources/technical-information/ampacity-chart  
   Target use: cross-check ampacity framing and conductor condition assumptions.

7. Blue Sea / Circuit Wizard wire-fuse chart material  
   URL: https://www.bluesea.com/support/reference  
   Target use: cross-check DC voltage drop and fuse/wire workflow.

8. Field-use discussion: boating / mobile DC fuse sizing threads  
   Target use: common confusion around fuse-to-wire sizing, voltage drop, and run length.

9. Field-use discussion: van/RV/skoolie wiring threads  
   Target use: common mechanic/user mistakes around 12V current, wire gauge, and fuse placement.

10. Beginner/101 electrical explanation source  
   Target use: phrase apprentice-facing explanation without making the chart a code manual.

### Early Findings To Validate

- Wire gauge alone is not a decision. Fuse/breaker size, current, insulation rating, conductor material, temperature, bundling, and run length matter.
- Low-voltage DC work makes voltage drop more visible than many beginners expect.
- Fuses and breakers protect conductors and circuits; they are not just device-size labels.
- 14/12/10 AWG rows are high-value because they map to common branch-circuit and cord conversations, but the chart must avoid implying universal permission.
- Field examples should say "commonly associated with" rather than "rated for" unless the row is backed by the exact code/OEM context.

### Current Content Direction

Do not edit the rendered Wire Gauge chart again until the 10-source pack is complete or a smaller reviewed row-specific patch is explicitly scoped.

## Spark Plug Condition Reference - Implemented Trial

Classification: 4-source identification/troubleshooting chart.

Reason: Spark plug condition reading is mechanic-facing and visual. It is useful for orientation, but plug appearance is a clue rather than a final diagnosis. This made it a good trial for the source process without using a 10-source decision chart.

### Reviewed Sources

1. DENSO, Spark Plug Basic Knowledge - Troubleshooting
   URL: https://www.denso.com/global/en/products-and-services/automotive-service-parts-and-accessories/plug/basic/diagnosis/
   Use: manufacturer diagnosis language for oil fouling, overheating, deposits, and misfire conditions.

2. Champion, Spark Plug Trouble Tracer Chart
   URL: https://www.championautoparts.com/content/dam/marketing/emea/champion/pdf/CHAMPION-Spark-Plug-Trouble-Tracer-pdf.pdf
   Use: manufacturer condition list and common causes for oil fouling, carbon fouling, flashover/carbon tracking, ash deposits, and worn plugs.

3. NGK, Plug Fouling technical sheet
   URL: https://www.ngkpartfinder.co.uk/assets/Uploads/PlugFouling-ver2.pdf
   Use: manufacturer fouling explanation, wet/dry deposit distinction, low-speed/stop-start operation, and heat-range context.

4. Mechanic/field discussion sample: AskMechanics and MechanicAdvice spark plug reading threads
   Example URL: https://www.reddit.com/r/AskMechanics/comments/106lz6v/
   Use: field confusion evidence. Common pattern: people ask plug appearance to diagnose engine health, while experienced replies caution that modern plug reading is limited and should be paired with cylinder comparison, symptoms, scan/live data, and service context.

### Trial Decisions

- Added one new chart: Spark Plug Condition Reference.
- Treated it as an identification/troubleshooting chart, not a final diagnosis chart.
- Added `signalDetailsOnly` so only signal rows get expanded senior-tech detail.
- Signal rows include common failure/high-consequence/easy-mix-up/very-common examples.
- Normal lookup rows remain clean table rows without expanded detail.

### Standard Feedback

This trial supports the direction that normal rows should stay clean and only signal rows should get teaching detail. After review, Ash deposits exposed the next standard rule: a badged row cannot use generic fallback detail. Spark Plug signal rows now use row-specific common-confusion and senior-tech detail.

## Hydraulic Fluid Condition Reference - Implemented Trial

Classification: 4-source identification/troubleshooting chart.

Reason: Hydraulic fluid appearance is a mechanic-facing clue, but visual inspection is not oil analysis. This made it a good second trial for the updated signal-detail gate: every badged row must carry row-specific teaching.

### Reviewed Sources

1. Donaldson, 6 Types of Hydraulic Fluid Contamination and How to Prevent Them
   URL: https://www.donaldson.com/en-us/engine/filters/technical-articles/six-types-hydraulic-fluid-contamination/
   Use: contamination families, water haze/milky fluid, air/foam, chemical degradation, particles, and damage risk.

2. Shell, Hydraulic oil air contamination white paper
   URL: https://www.shell.com/business-customers/lubricants-for-business/products/shell-tellus-hydraulic-fluids/shell-tellus-s4-ve/
   Use: distinction between surface foam and entrained air, air effects on wear, noise, cavitation, and response.

3. Mobil, Equipment Maintenance Used Oil Analysis / hydraulic oils machine shop
   URL: https://www.mobil.com/en/lubricants/for-businesses/industrial/lubricant-expertise/resources/hydraulic-oils-machine-shop
   Use: water contamination, varnish formation, oxidation, anti-foam context, and oil analysis framing.

4. Machinery Lubrication, How to Identify and Proactively Prevent Lubrication Contamination
   URL: https://www.machinerylubrication.com/Read/32876/how-to-identify-prevent-lubrication-contamination
   Use: field-identification limits, cloudy oil after cooling, surface foam vs entrained air, heat, sludge, and varnish.

### Trial Decisions

- Added one new chart: Hydraulic Fluid Condition Reference.
- Treated it as an identification/troubleshooting chart, not a lab-result or OEM-fluid-selection chart.
- Added `signalDetailsOnly` so only signal rows get expanded detail.
- Added row-specific teaching for every signal row before rendering.
- Normal rows remain clean table rows without expanded detail.

### Standard Feedback

This trial validates the updated rule: signal badges require authored row-specific teaching. Generic fallback detail is now treated as a smoke-test failure for signal-only trial charts.

## Extension Cord Load Reference - Limited Signal Trial

Classification: 10-source decision/common-spec chart.

Reason: Extension cords look simple, but the chart can influence load, length, voltage-drop, outdoor/wet-location, jobsite, jacket-rating, and connector decisions. It should stay conservative and label-driven until the full 10-source decision pack is complete.

### Reviewed / Opened Sources

1. UL Solutions, Wire and Cable Application Guide
   URL: https://www.ul.com/thecodeauthority/knowledge/wire-cable-guide
   Use: flexible cord and cable markings, intended-use language, SJTW outdoor/weather-resistant marking context.

2. OSHA, Electrical - Flexible Cords
   URL: https://www.osha.gov/electrical/hazards/flexible-cords
   Use: flexible-cord service marking, hard/extra-hard usage framing, jobsite inspection and grounded-cord context.

3. CPSC, Extension Cords FAQ
   URL: https://www.cpsc.gov/FAQ/Extension-Cords
   Use: consumer-facing extension cord definition and observable safety/listing characteristics.

4. DeWalt, Minimum Gauge for Cord Sets table
   URL: https://support.dewalt.com/hc/es/article_attachments/115004370914
   Use: tool-OEM framing that undersized cords cause voltage drop, power loss, and overheating; cord length/load/AWG relationship.

5. OSHA, Extension Cords publication
   URL: https://www.osha.gov/sites/default/files/publications/OSHA4495.pdf
   Use: field/jobsite inspection, GFCI, and flexible-cord usage reminders.

6. Electrical101, Extension Cord Info
   URL: https://www.electrical101.com/extension-cords.html
   Use: beginner/101 explanation for gauge, length, amp ratings, voltage drop, indoor/outdoor distinctions.

7. Allstar Electrical, Extension Cord Size Guide
   URL: https://www.allstarelectrical.com/resource-articles/post/extension-cord-sizing-guide
   Use: current field-use summary for AWG, load, length, jacket/environment, and GFCI decision language.

### Trial Decisions

- Kept the visible chart at 10 rows.
- Added signal details only for rows that teach common mistakes or common field IDs.
- Left unbadged rows clean, including 14 AWG rows, because the current goal is not to make every cord size a lecture.
- Added row-specific teaching for 16 AWG, 12 AWG, 10 AWG, Outdoor cord, SJTW, and SOOW.
- Added smoke coverage so generic fallback cannot silently replace these signal details.

### Open Work

Complete the remaining 3 sources before treating the whole chart as fully reviewed under the 10-source decision threshold. Until then, this is a conservative signal-detail trial, not a full extension-cord authority.

## Electrical & Controls Signal Batch - Implemented

Classification: mixed 4-source identification and 10-source decision-adjacent common-spec charts.

Reason: Electrical/control reference cards are high-use in maintenance, but several rows can influence wiring, fuse replacement, PLC I/O selection, or sensor replacement. This batch applies the signal-detail standard conservatively: only high-frequency, high-confusion, high-consequence, or spec-required rows get expanded teaching.

### Reviewed / Opened Sources

1. Banner Engineering, Photoelectric Sensors overview
   URL: https://www.bannerengineering.eu/us/en/products/sensors/photoelectric-sensors.html
   Use: photoelectric sensing families including opposed/through-beam, retroreflective, diffuse, background suppression, clear object, and alignment/range context.

2. Banner Engineering, photoelectric sensor literature / troubleshooting reference
   URL: https://info.bannerengineering.com/cs/groups/public/documents/literature/03190.pdf
   Use: field troubleshooting orientation for opposed and retroreflective alignment, load operation checks, and reflector-related diagnosis.

3. AutomationDirect, Inductive Proximity Sensors
   URL: https://www.automationdirect.com/proximity
   Use: proximity sensor families, PNP/NPN output availability, AC/DC output models, sensor purpose, and PLC/relay connection context.

4. AutomationDirect, Proximity Sensor Terminology / catalog references
   URL: https://support.automationdirect.com/docs/an-sen-009.pdf
   Use: proximity terminology, output type, voltage drop, wiring-programmable output context, and field-device language.

5. Eaton, Fuses Made Simple
   URL: https://www.eaton.com/us/en-us/products/electrical-circuit-protection/fuses/fuses-made-simple0.html
   Use: fuse class family names, time-delay/current-limiting framing, Class CC/J/R/L context, and replacement-class caution.

6. Eaton, Fuseology / overcurrent protection fundamentals
   URL: https://www.eaton.com/content/dam/eaton/markets/machinebuilding/protect-personnel-assets-and-machine-reliability/documents/documents-english-language/bus-ele-br-10757-fuseology.pdf
   Use: current-limiting fuse families, rejection-holder context, Class R/RK family differences, and supplemental/branch-protection separation.

7. Rockwell/Allen-Bradley style field documentation sample and PLC field discussions
   URL: https://www.manualsdir.com/manuals/576828/rockwell-automation-45mla-controller-installation-instructions.html?page=3
   Use: sourcing/sinking input language and the repeated field confusion around PNP/NPN sensor terminology vs module input terminology.

### Trial Decisions

- Updated six existing charts: Common Sensor ID Reference, Fuse Class Reference, Photoeye Setup Reference, Proximity Sensor Reference, PLC I/O Voltage Reference, and Industrial PLC Sourcing / Sinking Reference.
- Added `signalDetailsOnly` to keep unbadged rows clean.
- Added row-specific `rowSignals` and `rowTeaching` for high-value rows only.
- Kept final authority language pointed toward labels, wiring diagrams, datasheets, holders, input cards, and OEM/device manuals.
- Added smoke coverage for at least one authored signal detail from each updated chart.

### Standard Feedback

The signal-only model scales better than giving every row generic expanded details. It keeps the cards readable, makes search richer, and forces authored details only where a row has enough field value to deserve a badge.

## Motors & Drives Signal Batch - Implemented

Classification: mixed 4-source identification and 10-source decision-adjacent common-spec charts.

Reason: Motors, drives, belts, reducers, and couplings are common mechanic-maintenance references, but several rows can change fit, replacement, setup, or safety outcomes. This batch keeps the signal-detail standard conservative: only common, confusing, high-consequence, or spec-required rows get expanded teaching.

### Reviewed / Source Families

1. NEMA / motor frame and nameplate references
   Use: frame geometry, shaft height, mounting language, nameplate field interpretation, and replacement-fit caution.

2. Motor manufacturer nameplate guides and replacement guidance
   Use: FLA, voltage, RPM, frame, enclosure, service factor, frequency, and start-code decision context.

3. VFD manufacturer fault and troubleshooting manuals
   Use: overcurrent, overvoltage, undervoltage, ground fault, overload, phase loss, STO, encoder feedback, and first-check language.

4. Gear reducer catalogs and service manuals
   Use: ratio, service factor, C-face mounting, hollow bore, backstop, worm/helical differences, and lubricant/spec matching.

5. Coupling manufacturer catalogs and maintenance references
   Use: jaw spider series, grid/sleeve/disc/beam coupling differences, insert-family matching, alignment, lube, and torque-rating cautions.

6. Industrial belt manufacturer catalogs and field guides
   Use: conventional V-belt, fractional horsepower belt, narrow wedge belt, cogged belt, metric wedge belt, and poly-V identification.

### Trial Decisions

- Updated six existing charts: Belt Section Reference, NEMA Motor Frame Reference, Motor Nameplate Reference, VFD Fault Quick Reference, Gear Reducer ID Reference, and Coupling Insert Reference.
- Added `signalDetailsOnly` to keep non-signal rows clean.
- Added row-specific `rowSignals` and `rowTeaching` for high-value rows only.
- Kept final authority language pointed toward labels, nameplates, drive manuals, reducer tags, coupling catalogs, belt markings, and OEM documentation.
- Added smoke coverage for at least one authored signal detail from each updated chart.

### Standard Feedback

The signal-only standard still fits this domain. Motors and drives can become over-explained quickly, so the card should teach the rows that change field decisions while leaving basic lookup rows compact.

## Diesel & Mobile Signal Batch - Implemented

Classification: mixed 4-source identification and 10-source decision-adjacent troubleshooting charts.

Reason: Diesel/mobile references can influence diagnostic direction, parts replacement, emissions troubleshooting, filter service, and battery/charging decisions. This batch uses the signal-detail standard only where a row represents a common field mistake, high-consequence decision, or spec-required check.

### Reviewed / Opened Sources

1. SAE J1939 / SPN-FMI diagnostic source family
   Use: SPN/FMI relationship, failure mode direction, active/inactive distinction, and OEM diagnostic-tree framing.

2. Cummins / PACCAR aftertreatment operator and aftertreatment-system references
   Use: DOC, DPF, SCR, DEF, regeneration, soot/ash language, warning/inhibit context, and aftertreatment-system service framing.

3. Donaldson diesel fuel and engine filtration references
   Use: fuel-water separation, filter service context, water contamination, filter plugging, and diesel fuel quality language.

4. Caterpillar battery testing and charging references
   Use: open-circuit voltage, load testing, battery condition, equipment-specific replacement, and charging-system decision context.

5. Field diagnostic practice source family
   Use: voltage-drop testing, ground-path checks, parasitic draw sleep timing, CAN-awake troubleshooting, and diesel fault-code verification patterns.

### Trial Decisions

- Updated four existing charts: Diesel SPN / FMI Diagnostic Reference, Diesel Aftertreatment ID Reference, Diesel Fluid / Filter Reference, and Heavy Equipment Battery / Charging Reference.
- Added `signalDetailsOnly` so ordinary lookup rows stay compact.
- Added row-specific `rowSignals` and `rowTeaching` for common diagnostic and service-decision rows.
- Kept final authority language pointed toward OEM diagnostic trees, live data, fluid tests, filter markings, service history, and voltage/load tests.
- Added smoke coverage for at least one authored signal detail from each updated chart.

### Standard Feedback

The diesel/mobile batch benefits from the senior-tech standard because many rows are not part numbers; they are diagnostic direction clues. The chart should make the first verification step obvious without pretending to replace OEM service information.

## Shop Reference Data Boundary - Implemented

Reason: The shop reference library is expected to keep growing, so chart data should not live inside the conversion renderer or app coordinator.

Decision:

- Moved shop reference chart definitions to `src/data/shopReferenceCharts.js`.
- Kept rendering behavior in `src/render/conversionDisplay.js`.
- Loaded the data module before the renderer in `index.html`.
- Added the data module to the resource-load smoke list.

Standard:

New chart rows, signal badges, and row teaching should be added to `src/data/shopReferenceCharts.js`. Renderer changes should stay in `src/render/conversionDisplay.js` only when layout or behavior changes.

## Machining & CNC Signal Batch - Implemented

Classification: mixed 4-source identification and 10-source decision-adjacent machining setup charts.

Reason: CNC and machining references can influence machine motion, offsets, tooling, insert selection, and drawing inspection. This batch applies authored detail only to rows where a wrong assumption can create a crash, scrap part, wrong tool order, or inspection mistake.

### Reviewed / Opened Sources

1. Haas Automation G-code reference
   URL: https://www.haascnc.com/service/service-content/guide-procedures/mill---g-codes.html
   Use: common mill G-code meaning including rapid, feed, plane, units, offsets, canned-cycle cancellation, and absolute/incremental behavior.

2. Haas mill programming workbook
   URL: https://www.haascnc.com/content/dam/haascnc/en/service/reference/programming-workbooks/mill---programming-workbook.pdf
   Use: control-specific programming context, setup/prove-out language, and modal G-code framing.

3. CIMCO Fanuc/Siemens G and M code training references
   URL: https://www.cimco.com/documentation/online/cimco_edit/v8/en/ExercisesMillingFanucGMCodes.html
   Use: cross-control examples for G43, G54, G80, G90, M03, and program-structure awareness.

4. Sandvik / ISO insert designation source family
   Use: insert shape families, ISO material groups, chipbreaker/grade context, and full-code matching.

5. ASME Y14.5 / GD&T source family
   Use: feature control frame, datum setup, profile, position, runout, total runout, and legacy concentricity inspection caution.

### Trial Decisions

- Updated four existing charts: CNC G-Code Quick Reference, CNC M-Code Quick Reference, Machining Insert ID Reference, and GD&T Symbol Quick Reference.
- Added `signalDetailsOnly` so basic lookup rows stay compact.
- Added row-specific `rowSignals` and `rowTeaching` for high-value setup, tooling, and inspection rows.
- Kept final authority language pointed toward the active control manual, setup sheet, tool table, insert box/catalog, drawing standard, and inspection setup.
- Added smoke coverage for at least one authored signal detail from each updated chart.

### Standard Feedback

The machining batch reinforces that not every code row deserves a lecture. The strongest chart value is warning where a familiar code or symbol has a hidden setup dependency: active unit mode, active offset, modal state, full insert code, or datum structure.

## Fabrication & Welding Signal Batch - Implemented

Classification: mixed 4-source identification and 10-source decision-adjacent fabrication charts.

Reason: Fabrication and welding references can influence weld placement, rod/wire selection, plasma cut quality, brake setup, and material substitution. This batch avoids company-policy/safety-process content and focuses on practical identification and verification cues.

### Reviewed / Opened Sources

1. AWS A2.4 weld symbol source family
   Use: arrow-side / other-side convention, reference line, tail, fillet/groove symbols, intermittent weld language, and all-around symbol caution.

2. Lincoln Electric / Miller stick electrode and welding setup source family
   Use: E6010, E6011, E6013, E7018, E7024, polarity, low-hydrogen handling, and rod-position context.

3. Miller MIG wire and shielding gas references
   URL: https://www.millerwelds.com/resources/article-library/understanding-the-basics-of-mig-welding-for-mild-steel
   Use: ER70S-6, C25 gas, wire diameter, shielding-gas behavior, and mild-steel MIG setup language.

4. Hypertherm plasma cut chart source family
   Use: consumable stack, amperage, pierce height, cut height, kerf, dross, air quality, and chart-based setup.

5. Sheet-metal bend / press-brake setup source family
   Use: inside radius, K-factor, bend allowance/deduction, air bending, die opening, springback, and grain-direction caution.

6. AISC / structural shape source family
   Use: W-shape/channel/angle/HSS/pipe designation, nominal vs actual dimensions, weight per foot, wall thickness, grade, and material certification context.

### Trial Decisions

- Updated six existing charts: Weld Symbol Quick Reference, Stick Electrode Reference, MIG Wire / Shielding Gas Reference, Plasma Cutting Reference, Fabrication Bend Reference, and Structural Shape ID Reference.
- Added `signalDetailsOnly` so ordinary lookup rows stay compact.
- Added row-specific `rowSignals` and `rowTeaching` for high-value fabrication, welding, cutting, forming, and material-ID rows.
- Kept final authority language pointed toward drawings, WPS/procedure, rod/wire labels, machine cut charts, brake setup data, shape tables, and material certs.
- Added smoke coverage for at least one authored signal detail from each updated chart.

### Standard Feedback

Fabrication charts need to be practical without sounding like jobsite policy. The useful standard is: identify what the row means, name the common wrong assumption, and tell the tech what physical label, print note, chart, setup data, or measurement proves it.

## Power Transmission ID Signal Batch - Implemented

Classification: mixed 4-source identification and 10-source decision-adjacent mechanical ID charts.

Reason: Bearings, chain, sprockets, and belt codes are common shop-floor replacement references where same-bore, same-pitch, or same-looking substitutions can still be wrong.

### Reviewed / Opened Sources

1. SKF / bearing manufacturer designation source family
   Use: bearing suffixes, seals, shields, clearance, cages, tapered bore, snap-ring/groove language, and lubrication-groove context.

2. Bearing damage and application source family
   Use: fit, repeat failure, heat, load, lubrication context, and why same-size substitution may not solve the root problem.

3. Gates / belt manufacturer source family
   Use: V-belt sections, fractional HP vs industrial belt families, cogged belts, narrow wedge belts, synchronous timing belt profile, and effective-length language.

4. ANSI roller chain / chain manufacturer source family
   Use: chain pitch, roller width, heavy series, double-pitch conveyor chain, strand count, and replacement measurement.

5. Martin / sprocket and bushing manufacturer source family
   Use: sprocket ID, tooth count, hub style, QD/taper bushings, bore, keyway, and bushing interchange caution.

### Trial Decisions

- Updated five existing charts: Bearing Quick Reference, Roller Chain Reference, Bearing Suffix ID Reference, Belt Code ID Reference, and Chain Sprocket ID Reference.
- Added `signalDetailsOnly` so ordinary lookup rows stay compact.
- Added row-specific `rowSignals` and `rowTeaching` for high-value mechanical ID rows.
- Kept final authority language pointed toward markings, full part codes, measurements, catalogs, manufacturer specs, and OEM requirements.
- Added smoke coverage for at least one authored signal detail from each updated chart.

### Standard Feedback

Power transmission ID cards are highest value when they teach that a same-looking part is not automatically the same replacement. The chart should call out bore, width, pitch, tooth count, belt section, suffix, bushing type, and manufacturer code before a tech treats a replacement as equivalent.

## Foundational Shop Reference Signal Batch - Implemented

Classification: mixed 4-source identification and 10-source decision-adjacent shop reference charts.

Reason: Drill/tap, wire gauge, pipe/tubing, torque, and fastener-grade references are familiar enough to invite memory-based shortcuts. This batch adds row teaching where common numbers can still be wrong because of pitch, material, code, schedule, grade, lubrication, or joint requirements.

### Reviewed / Opened Sources

1. Tap drill and clearance-hole source family
   Use: UNC, UNF, and metric tap drill relationships, clearance-hole checks, thread pitch differences, and thread-class context.

2. NEC / conductor ampacity source family
   Use: AWG recognition, insulation temperature, conductor material, terminal temperature, ambient correction, conductor count, and voltage-drop caution.

3. ASME pipe / nominal pipe size source family
   Use: NPS vs actual OD, schedule wall thickness, tubing actual-OD language, material and pressure-class checks.

4. SAE / fastener torque source family
   Use: Grade 5/Grade 8 dry torque, lubricated vs dry difference, reused hardware caution, joint condition, and OEM torque authority.

5. SAE / ISO / ASTM fastener marking source family
   Use: radial head markings, metric property classes, stainless A2/A4 classes, structural bolt markings, and unknown-fastener replacement caution.

### Trial Decisions

- Updated five existing charts: Drill / Tap Quick Reference, Wire Gauge Reference, Pipe / Tubing Reference, Torque Reference, and Fastener Grade Marking Reference.
- Added `signalDetailsOnly` so ordinary lookup rows remain compact.
- Added row-specific `rowSignals` and `rowTeaching` for common, easy-mix-up, spec-required, and high-consequence rows.
- Kept authority pointed to thread gauges, calipers, drawings, OEM specs, code tables, structural specs, and known fastener markings.
- Added smoke coverage for at least one authored signal detail from each updated chart.

### Standard Feedback

Foundational shop charts should not pretend memory is enough. The useful pattern is: recognize the common number, name the hidden dependency, then tell the tech what proves the answer before they drill, wire, pipe, torque, or substitute hardware.

## Fluid Power and Sealing Signal Batch - Implemented

Classification: mixed 4-source identification and 10-source decision-adjacent fluid-power and sealing charts.

Reason: Lubricant, fitting, hose, O-ring, and shaft-seal replacements are common maintenance tasks where a part can appear close enough but fail because the material, pressure, fluid, sealing face, construction, or installation condition is wrong.

### Reviewed / Opened Sources

1. NLGI / lubricant viscosity source family
   Use: NLGI consistency, ISO VG viscosity, grease thickener compatibility, food-grade H1 framing, and OEM lubricant authority.

2. Hydraulic fitting and thread identification source family
   Use: NPT/NPTF, BSPP/BSPT, JIC 37, SAE 45, ORB, ORFS, DIN light/heavy, sealing-face identification, and thread-gauge practice.

3. SAE hydraulic hose and dash-size source family
   Use: dash size as nominal hose ID, hose construction, pressure rating, fitting/crimp compatibility, suction hose distinction, and bend-radius/routing concerns.

4. AS568 O-ring source family
   Use: dash size, ID/cross-section matching, NBR/FKM/EPDM material differences, durometer, groove fit, pressure, and fluid compatibility.

5. Rotary shaft seal source family
   Use: ID/OD/width identification, lip direction, shaft finish, bore condition, seal material, wear sleeves, pressure/venting, and installation damage.

### Trial Decisions

- Updated five existing charts: Oil / Grease Reference, Fitting / Thread Reference, Hydraulic Hose Dash Reference, O-Ring Size Reference, and Shaft Seal Reference.
- Added `signalDetailsOnly` so ordinary lookup rows stay compact.
- Added row-specific `rowSignals` and `rowTeaching` for common, easy-mix-up, high-consequence, and spec-required rows.
- Kept authority pointed to OEM specs, labels, laylines, thread gauges, sealing faces, crimp charts, groove measurements, material bags, and shaft/bore inspection.
- Added smoke coverage for at least one authored signal detail from each updated chart.

### Standard Feedback

Fluid-power and sealing charts should teach that dimensional match is only the first gate. The useful chart answer is: identify the size family, then verify fluid, pressure, material, sealing surface, construction, and installation condition before replacement.

## Electrical Identification Signal Batch - Implemented

Classification: mixed 4-source identification and spec-adjacent electrical reference charts.

Reason: Electrical reference cards are useful only when they help a technician identify what they are looking at without replacing drawings, code, meter checks, or qualified electrical procedure. This batch focuses on connector identity, terminal markings, wire-color caution, raceway fill reminders, and enclosure-rating interpretation.

### Reviewed / Opened Sources

1. NEMA plug and receptacle source family
   Use: 5/6/10/14 locking and non-locking configurations, voltage/amperage families, neutral vs no-neutral distinction, TT-30 RV confusion, and unsafe interchange prevention.

2. Contactor and overload terminal-marking source family
   Use: A1/A2 coil terminals, L/T line-load markings, auxiliary NO/NC numbering, overload 95/96 and 97/98 contacts, FLA dial, and reset-mode checks.

3. NFPA 79 / industrial control panel wiring source family
   Use: wire color as a convention, not proof; AC/DC control wiring distinctions, external-source color caution, wire numbering, and schematic authority.

4. NEC conduit-fill source family
   Use: 53 percent / 31 percent / 40 percent fill reminders, Chapter 9 table framing, box-fill distinction, pull length, bend count, and VFD cable manufacturer requirements.

5. NEMA enclosure / IP rating source family
   Use: NEMA 1, 3R, 4, 4X, 12, 6 and IP54/IP65/IP67 distinctions, environment suitability, connector/entry ratings, corrosion, dust, washdown, and temporary immersion limits.

### Trial Decisions

- Updated five existing charts: Electrical Plug / Receptacle Reference, Contactor / Overload Reference, Industrial Wire Color Reference, Conduit Fill Quick Reference, and IP / NEMA Enclosure Reference.
- Added `signalDetailsOnly` so ordinary lookup rows stay compact.
- Added row-specific `rowSignals` and `rowTeaching` for common, easy-mix-up, high-consequence, and spec-required rows.
- Kept authority pointed to equipment manuals, labels, schematic/wire numbers, meter checks, code tables, listings, enclosure labels, and environment checks.
- Added smoke coverage for at least one authored signal detail from each updated chart.

### Standard Feedback

Electrical shop references should never read like permission to wire by memory. The useful pattern is: identify the item, name the common wrong assumption, then force verification through the drawing, meter, listing, code table, or equipment manual.

## Control Panel and Instrumentation Signal Batch - Implemented

Classification: mixed 4-source identification and setup-adjacent control-panel charts.

Reason: Panel and instrumentation references are most useful when they help identify the symbol, terminal, sensor, transformer, or drive parameter while still forcing verification through the drawing, meter, nameplate, input setting, or drive manual.

### Reviewed / Opened Sources

1. Thermocouple / RTD source family
   Use: Type J/K/T/E/N distinctions, thermocouple alloy and extension-wire requirements, PT100/PT1000 RTD behavior, 2/3/4-wire RTD wiring, grounded vs ungrounded junction behavior, and controller-input matching.

2. IEC/NEMA relay and contactor terminal-marking source family
   Use: A1/A2 coil terminals, NO/NC state language, 13/14 and 21/22 auxiliary contacts, L/T line/load markings, overload trip contact behavior, and device-tag cross-reference practice.

3. Control transformer source family
   Use: primary/secondary winding checks, VA load, coil/solenoid inrush, primary/secondary protection, grounded secondary conventions, multi-tap wiring, and load-sag troubleshooting.

4. VFD / motor nameplate parameter source family
   Use: motor FLA, voltage, base frequency, base RPM, accel/decel behavior, brake resistor selection, command source, and drive-manual authority.

### Trial Decisions

- Updated five existing charts: Thermocouple / RTD Reference, Relay / Contactor Symbol Reference, Control Panel Terminal Reference, Control Transformer Reference, and Drive / Motor Nameplate Match Reference.
- Added `signalDetailsOnly` so ordinary lookup rows stay compact.
- Added row-specific `rowSignals` and `rowTeaching` for common, easy-mix-up, high-consequence, and spec-required rows.
- Kept authority pointed to drawings, device diagrams, meter checks, input settings, transformer diagrams, load/inrush checks, motor nameplates, and drive manuals.
- Added smoke coverage for at least one authored signal detail from each updated chart.

### Standard Feedback

Control-panel references should help a tech read what is in front of them without encouraging panel work by memory. The best row detail names the symbol or parameter, explains the common wrong assumption, and points to the exact proof: drawing, meter, input setup, nameplate, or manual.

## All Remaining Card Signal Batch - Implemented

Classification: mixed 4-source field identification, sizing, troubleshooting, and setup reference charts.

Reason: The remaining charts were useful as lookup tables, but they did not yet carry the senior-tech detail layer. This batch brings every shop-reference chart onto the same row-detail standard: identify the common/high-risk row, name the likely wrong assumption, and point to a practical verification step.

### Reviewed / Source Families

1. Hand-tool, fastener, and sheet-metal sizing source family
   Use: socket/wrench close-fit caution, metric/inch mix-ups, gauge thickness direction, material-family differences, and plate-vs-gauge language.

2. Pneumatic and hydraulic component source family
   Use: tube OD vs pipe size, NPT/BSPP distinction, valve function symbols, cylinder bore/stroke/rod/magnet checks, seal orientation, backup rings, and leak/failure isolation.

3. Conveyor, clamp, and chemical-retention source family
   Use: roller OD/BF/axle identification, groove/sprocket matching, clamp style by service condition, threadlocker vs retaining compound, and anti-seize torque caution.

4. Thread, pipe, O-ring, and material compatibility source family
   Use: metric pitch verification, NPT nominal/tapered thread behavior, O-ring material compatibility, elastomer limits, and gland/fit requirements.

5. Troubleshooting and maintenance source family
   Use: motor/pump/conveyor/hydraulic/sensor first checks, bearing/belt/chain failure patterns, pneumatic cylinder checks, compressor maintenance, and pump seal root-cause framing.

6. Machining and CNC source family
   Use: decimal drill identification, tap-drill mix-ups, surface finish unit confusion, work coordinate offsets, H/D offsets, wear offsets, and hidden modal-state risks.

### Trial Decisions

- Updated 23 remaining charts that still lacked `rowTeaching`.
- Added `signalDetailsOnly` and row-specific `rowSignals` so lookup rows stay compact until a user opens the question-mark detail.
- Added detail rows to common, easy-mix-up, high-consequence, spec-required, and common-failure items rather than trying to explain every low-value row.
- Added a smoke assertion that every shop-reference chart has `rowTeaching`, plus representative rendered assertions for the newly updated charts.
- Kept all changes in the data module; the renderer and app coordinator were not changed.

### Standard Feedback

The all-card standard is now consistent: every chart should behave like a senior tech standing beside the table. It should not replace OEM manuals, drawings, code, or qualified procedure. It should make the first field decision better by saying what the row means, what people commonly confuse, and what to verify before acting.

## Bolt / Wrench Reference Signal Batch - Implemented

Classification: bounded conversion-screen table detail update.

Reason: Common Inch Thread Reference and Common Wrench / Head Size Reference are 100-row conversion reference tables, not part of the 77 shop-reference card dataset. They still needed the same senior-tech signal layer on the rows where a mechanic is most likely to make a bad assumption.

### Reviewed / Source Families

1. Inch thread and machine-screw source family
   Use: screw-number versus diameter, UNC/UNF/UNEF pitch differences, inch-versus-metric near matches, and common small-hardware field mistakes.

2. Hex-head and across-flats source family
   Use: wrench size as tool fit, not thread proof; standard hex versus heavy hex versus square head; common tool-grab shortcuts; and high-consequence large fastener handling.

3. Fastener grade / torque / OEM procedure source family
   Use: head-mark checks, material and grade requirements, lubrication/torque sensitivity, engineered heavy hardware, and drawing/OEM authority for large fasteners.

### Trial Decisions

- Kept both 100-row tables intact for fast scanning.
- Added row-level teaching only to common, commonly confused, high-consequence, and spec-only rows.
- Reused the same question-mark detail affordance from shop-reference cards so the UI language stays consistent.
- Kept the key warning explicit: thread size, wrench size, nearest metric size, and replacement approval are different decisions.
- Added smoke coverage proving both tables still contain 100 rows and now render senior-tech details.

### Standard Feedback

Bolt and wrench references should make the first field identification faster without implying substitution authority. A good row detail explains the measurement being shown, names the common wrong assumption, and points the user to a physical proof: thread gauge, calipers, head mark, wrench fit, torque spec, drawing, or OEM procedure.

## Reference Data Split - Implemented

Classification: low-risk mechanical data organization.

Reason: The shop-reference dataset had grown to 77 charts, 1,004 rows, and 541 senior-tech detail rows. It was still safe as static frontend data, but `src/data/shopReferenceCharts.js` had become a maintenance risk as one large file.

### Implementation

- Split chart data into category files under `src/data/reference/`.
- Kept `src/data/shopReferenceCharts.js` as the compatibility assembler/export used by the existing renderer and tests.
- Preserved browser global loading through `window.MaintainOpsReferenceData`.
- Preserved CommonJS test loading through category-file `module.exports`.
- Updated `index.html` load order so category data loads before the assembler.
- Updated resource-load smoke coverage so each split category file must be referenced and hosted.

### Verification Standard

- Syntax check every split data file.
- Confirm assembled chart data is byte-for-byte equivalent to the previous committed export.
- Confirm chart count, row count, teaching-row count, and first/last chart order.
- Run conversion and shop-reference favorites smokes.
- Run local and hosted resource smokes before calling the split complete.

### Standard Feedback

Reference data can keep growing, but new chart additions should now land in the relevant category file instead of rebuilding a single data monolith. `shopReferenceCharts.js` should stay an assembler unless the exported contract itself changes.
