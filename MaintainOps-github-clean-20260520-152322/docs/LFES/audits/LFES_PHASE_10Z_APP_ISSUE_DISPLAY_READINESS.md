# LFES Phase 10Z App Issue Display Readiness

Date: 2026-05-20

## Candidate

Move only the read-only app issue report card renderer from `app.js` into a new render module:

- `renderAppIssueReport`

## Why This Is Safe

This helper returns HTML for one already-loaded issue report and its status form. It does not call Supabase, change status, bind events, submit forms, mutate state, or alter setup behavior.

## Dependencies To Inject

- `escapeHtml`
- `getProfilesByUserId`
- `getLocations`

## Must Not Move

Do not move app issue report form submission, status submit handling, setup readiness, app issue report loading, mutations, event handlers, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.
