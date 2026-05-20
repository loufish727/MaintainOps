# LFES Phase 10W Message Badge Display Readiness

Date: 2026-05-20

## Candidate

Move only the read-only message navigation badge renderer from `app.js` into a new render module:

- `renderMessageNavBadge`

## Why This Is Safe

This helper only returns badge HTML based on unread counts. It does not:

- call Supabase.
- mutate state.
- mark messages read.
- filter messages.
- create, update, or delete threads.
- bind events.

Unread count calculations stay in `app.js` and are injected as read-only functions.

## Dependencies To Inject

- `directUnreadMessages`
- `totalUnreadMessages`

## Must Not Move

Do not move message thread filtering, read tracking, composer behavior, message CRUD, event handlers, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.

## Verification Required

- static JS checks.
- local hosted Resource Load Smoke.
- signed-in local smoke with Messages check.
- live resource verification and signed-in live smoke after package/upload.
