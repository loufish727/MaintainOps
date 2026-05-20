# LFES Phase 10T Request Photo Display Readiness

Date: 2026-05-20

## Candidate

Move only the read-only maintenance request photo preview renderer from `app.js` into a new render module:

- `renderMaintenanceRequestPhoto`

## Why This Is Safe

This helper only returns HTML for an already-attached request photo preview/link. It does not:

- call Supabase.
- upload or optimize files.
- sign URLs.
- mutate state.
- change request status.
- convert requests.
- delete requests.
- bind events.

The request card, Quick Fix, conversion, delete controls, photo storage metadata loading, and signed URL preparation stay in `app.js`.

## Dependencies To Inject

The new module should receive only:

- `escapeHtml`
- `requestPhotoMetaText`
- `getRequestPhotosReady`

## Must Not Move

Do not move:

- `renderMaintenanceRequest`.
- request submit handling.
- request conversion.
- Quick Fix request behavior.
- request delete controls.
- request photo upload/optimization/storage code.
- Supabase SQL/RLS.
- auth/session/company/location logic.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

## Verification Required

Phase 10U local verification must include:

- static JS checks.
- local hosted Resource Load Smoke.
- signed-in local smoke with Requests and Messages checks.
- verify the new `src/render/requestPhotoDisplay.js` script tag and new `app.js` cache tag.
- verify no visible app errors.
- verify no actionable browser warning/error logs.

Phase 10V package/live verification must include:

- fresh GitHub upload package.
- live resource tag verification.
- hosted Resource Load Smoke against GitHub Pages.
- signed-in live smoke with Requests and Messages checks.
- docs closeout.
