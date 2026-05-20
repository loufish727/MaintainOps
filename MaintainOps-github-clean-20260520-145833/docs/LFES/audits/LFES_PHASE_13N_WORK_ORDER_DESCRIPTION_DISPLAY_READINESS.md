# LFES Phase 13N - Work Order Description Display Readiness

Date: 2026-05-20

## Risk

MEDIUM RISK.

The helper is mostly display text cleanup, but it also participates in work-order save, assignment, quick-fix, and request-conversion payload construction.

## Candidate

- `cleanWorkOrderDescription`
- `descriptionWithAssignmentNote`
- `descriptionWithRequestPhotoNote`

## Safe Boundary

- Move only the string transformation helpers.
- Keep work-order creation, quick fix, request conversion, assignment, form handling, Supabase writes, event logging, and workflow behavior in `app.js`.
- Keep constants injected from `app.js` so the outside-vendor note value remains unchanged.

## Verification Plan

- Static checks.
- Targeted local resource smoke for the new render module.
- Do not package/upload unless local checks pass.
- Hosted resource smoke and signed-in live smoke after deployment.
