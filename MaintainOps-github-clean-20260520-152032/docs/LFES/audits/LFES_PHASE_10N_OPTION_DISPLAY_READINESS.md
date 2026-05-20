# LFES Phase 10N Option Display Readiness

Date: 2026-05-20

## Candidate

Move only the read-only option-list display helpers from `app.js` into a new render module:

- `renderLocationOptions`
- `renderAssetOptions`
- `renderParentAssetOptions`
- `assetOptionLabel`

## Why This Is Safe

These helpers only return `<option>` HTML or a display label for location/equipment selects. They do not:

- call Supabase.
- mutate state.
- change localStorage.
- submit forms.
- change location, asset, work order, or request records.
- bind events.
- perform routing confirmation.
- perform delete guard logic.

The existing filtering and hierarchy checks remain in `app.js` and are injected as read-only functions.

## Dependencies To Inject

The new module should receive only display helpers and read-only accessors:

- `escapeHtml`
- `getLocations`
- `getActiveLocationId`
- `getAssets`
- `filteredAssets`
- `matchesActiveLocation`
- `isAssetDescendantOf`
- `parentAssetFor`

## Must Not Move

Do not move:

- location switching behavior.
- asset routing warning/confirmation.
- `filteredAssets`.
- `matchesActiveLocation`.
- `isAssetDescendantOf`.
- asset create/edit forms beyond existing option markup.
- work order/request/quick fix form behavior.
- event handlers.
- mutations.
- Supabase SQL/RLS.
- auth/session/company/location logic.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

## Verification Required

Phase 10O local verification must include:

- static JS checks.
- local hosted Resource Load Smoke.
- signed-in local smoke across My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages.
- verify the new `src/render/optionDisplay.js` script tag and new `app.js` cache tag.
- verify Equipment and Work Order/Quick Fix related screens still render selects.
- verify no visible app errors.
- verify no actionable browser warning/error logs.

Phase 10P package/live verification must include:

- fresh GitHub upload package.
- live resource tag verification.
- hosted Resource Load Smoke against GitHub Pages.
- signed-in live smoke across core sections with Equipment and form option checks.
- docs closeout.
