# LFES Phase 14K - Asset Hierarchy Display Readiness

Date: 2026-05-20

## Risk

MEDIUM RISK.

The helpers are read-only, but they feed equipment lists, parent/child labels, option filtering, and delete-blocker counts.

## Candidate

- `filteredAssets`
- `parentAssetFor`
- `childAssetsFor`
- `isAssetDescendantOf`

## Safe Boundary

- Move only asset filtering and hierarchy lookup helpers.
- Keep asset location routing warnings, asset forms, delete blocker queries, delete actions, and Supabase mutations in `app.js`.
- Preserve location/status/search filtering, parent lookup, sorted children, and descendant cycle protection.

## Verification Plan

- Static checks.
- Targeted local helper-output smoke.
- Local resource smoke for the new render module.
- Do not package/upload unless local checks pass.
- Hosted resource smoke and signed-in live smoke after deployment.
