# LFES Phase 13Y - Part Usage Display Readiness

Date: 2026-05-20

## Risk

MEDIUM RISK.

The helper is read-only, but it feeds part detail usage counts and delete protection checks.

## Candidate

- `partUsageRows`

## Safe Boundary

- Move only the read-only part usage row lookup.
- Keep part usage RPCs, Use/Restock forms, delete actions, delete confirmation, blockers, and Supabase writes in `app.js`.
- Preserve exact flatten/filter behavior.

## Verification Plan

- Static checks.
- Targeted local helper-output smoke.
- Local resource smoke for the new render module.
- Do not package/upload unless local checks pass.
- Hosted resource smoke and signed-in live smoke after deployment.
