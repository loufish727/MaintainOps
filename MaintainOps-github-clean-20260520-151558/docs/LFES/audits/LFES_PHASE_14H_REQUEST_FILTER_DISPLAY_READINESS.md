# LFES Phase 14H - Request Filter Display Readiness

Date: 2026-05-20

## Risk

MEDIUM RISK.

The helpers are read-only, but they control request list visibility and request filter counts in the workspace.

## Candidate

- `requestMatchesBaseFilters`
- `isConvertedRequest`
- `requestMatchesViewFilter`
- `filteredRequests`
- `requestFilterCounts`

## Safe Boundary

- Move only request filtering/count helpers into the existing request queue display module.
- Keep request creation, public QR intake, request conversion, request deletion, photo handling, and Supabase mutations in `app.js`.
- Preserve existing submitted/converted/all behavior and the existing count fallback.

## Verification Plan

- Static checks.
- Targeted local helper-output smoke.
- Local resource smoke for the updated render module.
- Do not package/upload unless local checks pass.
- Hosted resource smoke and signed-in live smoke after deployment.
