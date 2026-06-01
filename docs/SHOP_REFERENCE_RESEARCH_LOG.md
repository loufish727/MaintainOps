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
