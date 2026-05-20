# LFES Phase 14N - Part Filter Display Readiness

Date: 2026-05-20

## Risk

MEDIUM RISK.

The helpers are read-only, but they control Parts Inventory filtering/search and supplier option lists.

## Candidate

- `filteredParts`
- `matchesPartSearch`
- `partSourceOptions`

## Safe Boundary

- Move only part list filtering, part search matching, and supplier option derivation into the existing part inventory display module.
- Keep Use/Restock, part documents, part delete checks/actions, RPCs, and Supabase mutations in `app.js`.
- Preserve active-location filtering, low-stock filtering, search matching, supplier trimming/deduping, and sort behavior.

## Verification Plan

- Static checks.
- Targeted local helper-output smoke.
- Local resource smoke for the updated render module.
- Do not package/upload unless local checks pass.
- Hosted resource smoke and signed-in live smoke after deployment.
