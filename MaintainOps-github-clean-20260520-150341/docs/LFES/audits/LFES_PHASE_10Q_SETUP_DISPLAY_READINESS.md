# LFES Phase 10Q Setup Display Readiness

Date: 2026-05-20

## Candidate

Move only the read-only Admin Setup item renderer from `app.js` into a new render module:

- `renderSetupItem`

## Why This Is Safe

This helper only returns HTML for one setup readiness row. It does not:

- call Supabase.
- mutate state.
- change localStorage.
- mark SQL applied.
- bind events.
- perform setup readiness checks.
- create, update, or delete records.

The existing setup item data builder and setup-action click handling remain in `app.js`.

## Dependencies To Inject

The new module should receive only:

- `escapeHtml`

## Must Not Move

Do not move:

- `setupItems`.
- setup action event handling.
- `adminDeleteSqlConfirmed` mutation/localStorage behavior.
- Supabase SQL/RLS.
- auth/session/company/location logic.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

## Verification Required

Phase 10R local verification must include:

- static JS checks.
- local hosted Resource Load Smoke.
- signed-in local smoke that confirms Admin Setup loads and setup cards render.
- verify the new `src/render/setupDisplay.js` script tag and new `app.js` cache tag.
- verify no visible app errors.
- verify no actionable browser warning/error logs.

Phase 10S package/live verification must include:

- fresh GitHub upload package.
- live resource tag verification.
- hosted Resource Load Smoke against GitHub Pages.
- signed-in live smoke with Admin Setup card checks.
- docs closeout.
