# LFES Phase 13P - Work Order Change Display Readiness

Date: 2026-05-20

## Risk

MEDIUM RISK.

The helper only formats an activity summary, but that summary is written after work-order saves and quick updates.

## Candidate

- `describeWorkOrderChanges`

## Safe Boundary

- Move only the event-summary text formatter.
- Keep work-order saves, quick updates, event insertion, Supabase writes, forms, and workflow logic in `app.js`.
- Keep field comparison behavior exactly unchanged.

## Verification Plan

- Static checks.
- Targeted local helper-output smoke.
- Local resource smoke for the new render module.
- Do not package/upload unless local checks pass.
- Hosted resource smoke and signed-in live smoke after deployment.
