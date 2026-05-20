# LFES Phase 10K Parts Display Readiness

Date: 2026-05-20

## Candidate

Move only the read-only Parts list display helpers from `app.js` into a new render module:

- `renderPart`
- `renderPartsHealth`
- `renderPartSearch`

## Why This Is Safe

These helpers only return HTML for:

- part inventory cards.
- the parts health filter buttons.
- the parts search form markup.

They do not:

- call Supabase.
- mutate state.
- change localStorage.
- submit forms.
- change filters.
- open part detail.
- create, use, restock, save, or delete parts.
- bind events.
- perform delete guard logic.

## Dependencies To Inject

The new module should receive only display helpers and read-only accessors:

- `escapeHtml`
- `money`
- `isLowStockPart`
- `matchesActiveLocation`
- `getParts`
- `getPartCostsReady`
- `getPartInventoryFilter`
- `getPartSearchQuery`

## Must Not Move

Do not move:

- `renderPartDetail`
- `renderPartDangerZone`
- `renderPartSourceOptions`
- `renderPartSourceManager`
- part create/edit/use/restock/document forms beyond existing returned markup.
- part click/open handling.
- part search submit handling.
- inventory filter click handling.
- localStorage updates.
- mutations.
- event handlers.
- Supabase SQL/RLS.
- storage/document flows.
- auth/session/company/location logic.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

## Verification Required

Phase 10L local verification must include:

- static JS checks.
- local hosted Resource Load Smoke.
- signed-in local smoke across My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages.
- verify the new `src/render/partsDisplay.js` script tag and new `app.js` cache tag.
- verify Parts Inventory renders and includes the search form and parts health controls.
- verify no visible app errors.
- verify no actionable browser warning/error logs.

Phase 10M package/live verification must include:

- fresh GitHub upload package.
- live resource tag verification.
- hosted Resource Load Smoke against GitHub Pages.
- signed-in live smoke across core sections with Parts Inventory checks.
- docs closeout.
