# LFES Phase 14B - Request Queue Display Readiness

Date: 2026-05-20

## Risk

MEDIUM RISK.

The helper is read-only, but it feeds dashboard request counts and request queue display decisions.

## Candidate

- `openMaintenanceRequests`

## Safe Boundary

- Move only the submitted-request filter helper.
- Keep request conversion, public QR intake, request forms, mutation flows, and request detail rendering in `app.js`.
- Preserve exact `status === "submitted"` behavior.

## Verification Plan

- Static checks.
- Targeted local helper-output smoke.
- Local resource smoke for the new render module.
- Do not package/upload unless local checks pass.
- Hosted resource smoke and signed-in live smoke after deployment.
