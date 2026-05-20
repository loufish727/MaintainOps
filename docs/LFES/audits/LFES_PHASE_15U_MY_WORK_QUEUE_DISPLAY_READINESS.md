# LFES Phase 15U My Work Queue Display Readiness

Date: 2026-05-20

## Classification

MEDIUM RISK.

Risk: the helper is read-only but describes My Work queue membership if it is reactivated by surrounding render logic.

## Approved Scope

Move only `myWorkQueueOrders` from `app.js` into `src/render/myWorkQueueDisplay.js`.

## Required Injection

- work orders
- current user
- `myWorkFilter`
- active-location matcher
- search matcher
- work-order search value helper

## Explicit Non-Scope

Do not move:

- `filteredWorkOrders`
- work-order status filter logic
- assignment/vendor filters
- search mode/cache state
- event handlers
- mutations
- `renderWorkspace()`
- `bindWorkspaceEvents()`

## Verification Plan

- `node --check app.js`
- `node --check src/render/myWorkQueueDisplay.js`
- direct helper-output smoke for assigned-to-me, created-by-me, location filtering, and search filtering
- local resource smoke for `index.html`, `app.js`, and `src/render/myWorkQueueDisplay.js`
- no package/upload unless local checks pass
- hosted resource checks and signed-in live smoke after package/upload
