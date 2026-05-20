# LFES Phase 14E - Delete Blocker Display Readiness

Date: 2026-05-20

## Risk

MEDIUM RISK.

The helpers are read-only message formatters, but they appear in equipment and procedure delete-protection flows.

## Candidate

- `assetDeleteBlockerMessage`
- `procedureDeleteBlockerMessage`

## Safe Boundary

- Move only blocker message formatting.
- Keep permissions, blocker-loading queries, pending delete state, delete confirmations, and Supabase mutations in `app.js`.
- Preserve exact singular/plural wording and empty-string behavior.

## Verification Plan

- Static checks.
- Targeted local helper-output smoke.
- Local resource smoke for the new render module.
- Do not package/upload unless local checks pass.
- Hosted resource smoke and signed-in live smoke after deployment.
