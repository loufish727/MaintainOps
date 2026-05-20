# LFES Phase 15R Work Order Search Display Readiness

Date: 2026-05-20

## Classification

MEDIUM RISK.

Risk: work-order search value assembly is read-only but broad, and an omitted field would make search results harder to find.

## Approved Scope

Move only `workOrderSearchValues` from `app.js` into `src/render/workOrderSearchDisplay.js`.

## Required Injection

- relationship maps for parts, comments, events, photos, and step results
- procedure templates
- profiles
- `statusLabel`
- `assignmentLabel`

## Explicit Non-Scope

Do not move:

- `filteredWorkOrders`
- `myWorkQueueOrders`
- `globalSearchResults`
- server-side search
- search mode/cache state
- event handlers
- mutations
- `renderWorkspace()`
- `bindWorkspaceEvents()`

## Verification Plan

- `node --check app.js`
- `node --check src/render/workOrderSearchDisplay.js`
- direct helper-output smoke for title/status/asset/assignment/procedure/parts/comments/events/photos/step result searchable values
- local resource smoke for `index.html`, `app.js`, and `src/render/workOrderSearchDisplay.js`
- no package/upload unless local checks pass
- hosted resource checks and signed-in live smoke after package/upload
