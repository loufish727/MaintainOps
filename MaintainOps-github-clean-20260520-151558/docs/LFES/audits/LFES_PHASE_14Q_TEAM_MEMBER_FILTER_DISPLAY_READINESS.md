# LFES Phase 14Q - Team Member Filter Display Readiness

Date: 2026-05-20

## Risk

MEDIUM RISK.

The helper is read-only, but it controls which team members appear when search is active.

## Candidate

- `filteredMembers`

## Safe Boundary

- Move only Team-list filtering into the existing team member display module.
- Keep role changes, invites, profile saves, team membership loads, auth, and Supabase mutations in `app.js`.
- Preserve matching against user id, role, and profile full name.

## Verification Plan

- Static checks.
- Targeted local helper-output smoke.
- Local resource smoke for the updated render module.
- Do not package/upload unless local checks pass.
- Hosted resource smoke and signed-in live smoke after deployment.
