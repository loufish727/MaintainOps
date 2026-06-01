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

