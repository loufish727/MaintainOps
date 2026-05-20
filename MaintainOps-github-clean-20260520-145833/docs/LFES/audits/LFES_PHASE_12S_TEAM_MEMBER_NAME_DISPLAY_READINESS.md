# LFES Phase 12S Team Member Name Display Readiness

Date: 2026-05-20

## Candidate

Move only the team member name display helper:

- `teamMemberName`

## Why This Is Safe

This helper formats a display name from already-loaded profile/session data. It does not update profiles, assign work, invite teammates, change roles, call Supabase, or alter access control.

## Dependencies To Inject

- `getProfilesByUserId`
- `getCurrentUser`

## Must Not Move

Do not move profile updates, invite handling, role management, assignment behavior, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.
