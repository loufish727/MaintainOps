# Shop Reference Source Validation Process

MaintainOps shop reference charts should feel like a senior mechanic teaching a useful lookup, not like a copied catalog. The goal is to turn common shop references into fast, practical, verified field guidance while keeping the app clear that code, OEM manuals, labels, and measurements decide the final answer.

## Goal

Build reference charts that are better than a quick web search because they combine:

- The lookup value.
- The mechanic/apprentice background needed to understand it.
- The common field confusion.
- The verification step before use.
- The risk signal when the row should not be treated as casual advice.

## Scope

This process applies to Conversions tab shop reference charts. It does not make MaintainOps an engineering standard, code book, torque authority, or OEM replacement. It is a mechanic-focused field reference layer.

Charts should support:

- Identification.
- Troubleshooting orientation.
- Common mistake prevention.
- Faster parts/work-order decisions.
- Apprentice-level background learning.

Charts should not become:

- Company policy.
- Safety-program instructions.
- Exhaustive catalogs.
- Unsourced opinion lists.
- Substitutes for code, OEM specs, nameplates, markings, physical gauges, or measured dimensions.

## Source Thresholds

Use chart risk to choose the source depth.

### 4-Source Validation

Use this for identification charts where a wrong answer is usually recoverable and physically verifiable.

Examples:

- Socket / wrench close-fit.
- Bearing dimensions.
- Belt code ID.
- Chain size ID.
- Drill / tap lookup.
- Sheet metal gauge.
- Common sensor ID.

Minimum source mix:

- 1 authority/source-family source.
- 1 field-use source.
- 1 beginner/101 source.
- 1 common-confusion or failure source.

### 10-Source Validation

Use this when a chart may influence what someone installs, wires, torques, pressurizes, protects, lifts, or diagnoses.

Examples:

- Wire gauge and ampacity.
- Fuse/breaker/overload selection.
- Torque and load-bearing fasteners.
- Hydraulic hose, pressure, and fittings.
- Electrical controls and PLC wiring.
- Motor/VFD setup.
- Lubricants and fluids.
- Diesel/aftertreatment diagnosis.
- Structural or lifting-related references.

Minimum source mix:

- 2 authority/standard sources.
- 2 manufacturer/OEM/datasheet sources.
- 2 field-use/forum/technician sources.
- 1 beginner/101 source.
- 1 common-confusion source.
- 1 troubleshooting/failure source.
- 1 cross-check source from a different ecosystem.

## Row Thresholds

Normal rows can rely on chart-level source coverage.

Highlighted rows need row-level support:

- `Very common`: at least 2 row-specific confirmations.
- `Easy mix-up`: at least 2 row-specific confirmations of the confusion.
- `High consequence`: at least 3 row-specific confirmations, including one authority/manufacturer source.
- `Spec required`: source family must be clear, and the row must direct the user to the final authority.
- `Common failure`: at least one troubleshooting/failure source and one field-use source.

## Signal Detail Gate

If a row is important enough to receive a signal badge, it is not allowed to rely on generic expanded teaching text.

Every badged row must have row-specific:

- Common confusion.
- Senior tech note.
- Verification path.
- Risk/signal label.
- Example context tied to that exact row.

Generic fallback text can still support unbadged rows or search metadata, but it should not appear in the rendered expanded detail for `Very common`, `Easy mix-up`, `High consequence`, `Spec required`, `Common failure`, `Stock item`, or `Field shortcut` rows.

## Badge Rules

Use badges sparingly. A badge is a teaching signal, not decoration.

- `Very common`: frequent field encounter or common time sink.
- `Easy mix-up`: visually/verbally/size-wise close to a wrong part or value.
- `High consequence`: wrong use can damage equipment, create downtime, or create safety/code risk.
- `Spec required`: final answer must come from code, OEM data, datasheet, nameplate, print, WPS, or measured spec.
- `Common failure`: common symptom/failure pattern worth diagnosing.
- `Stock item`: frequently useful inventory candidate.
- `Field shortcut`: helpful memory aid, but not a final authority.

## Research Sequence

For each chart:

1. Classify as `identification` or `decision`.
2. Set source threshold: 4 or 10.
3. Collect source candidates by source type.
4. Separate authority facts from field observations.
5. Identify common apprentice misunderstandings.
6. Identify common senior-tech warnings.
7. Decide which rows deserve badges/details.
8. Draft row-specific teaching text only for signal rows.
9. Run review against the standard before UI changes.
10. Implement only the reviewed content.

## Evidence Rules

- Authority sources decide values and limits.
- Manufacturer/OEM sources confirm dimensions, suffixes, ratings, and use boundaries.
- Forum and technician sources identify common confusion, field language, time sinks, and failure patterns.
- Beginner/101 sources help phrase explanations clearly.
- Forums must not be used as final authority for code, torque, pressure, electrical limits, or safety-critical values.
