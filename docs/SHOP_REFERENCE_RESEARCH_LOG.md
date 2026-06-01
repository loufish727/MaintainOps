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
