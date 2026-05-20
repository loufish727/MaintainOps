# LFES Phase 14Z - Search Filter Display Readiness

Date: 2026-05-20

## Risk

MEDIUM RISK.

The helpers are pure read-only predicates, but they are shared by many list, message, and search filters.

## Candidate

- `matchesSearch`
- `matchesQuery`

## Safe Boundary

- Move only the shared search predicate helpers.
- Keep all search consumers, list construction, global-search result building, message filtering, workflow logic, and mutations in `app.js`.
- Preserve exact trimming, lowercasing, empty-query behavior, nullish value handling, and explicit-query override behavior.

## Verification Plan

- Static checks.
- Targeted local helper-output smoke.
- Local resource smoke for the new render module.
- Do not package/upload unless local checks pass.
- Hosted resource smoke and signed-in live smoke after deployment.
