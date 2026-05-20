# LFES Phase 12M Invite Location Label Display Readiness

Date: 2026-05-20

## Candidate

Move only the invite default location label display helper:

- `inviteDefaultLocationLabel`

## Why This Is Safe

This helper formats read-only label text for pending team invites from already-loaded locations. It does not create invites, cancel invites, accept invites, assign roles, update profiles, call Supabase, or change default-location selection.

## Dependencies To Inject

- `getLocations`

## Must Not Move

Do not move invite creation, invite cancellation, invite acceptance, role/default-location form rendering, profile updates, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.
