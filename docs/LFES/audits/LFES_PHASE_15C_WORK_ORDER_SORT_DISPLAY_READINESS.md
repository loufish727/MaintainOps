# LFES Phase 15C Work Order Sort Display Readiness

Date: 2026-05-20

## Classification

MEDIUM RISK.

Risk: work-order ordering is read-only but user-visible across queues, and the comparator currently depends on queue state.

## Approved Scope

Move only these helpers from `app.js` into `src/render/workOrderSortDisplay.js`:

- `compareWorkOrders`
- `dueSortValue`
- `prioritySortValue`
- `completedSortValue`

## Required Injection

- `getActiveStatusFilter`
- `getWorkSort`

## Explicit Non-Scope

Do not move:

- `filteredWorkOrders`
- `workOrderMatchesStatusFilter`
- `myWorkQueueOrders`
- search values
- queue mutations
- event handlers
- `renderWorkspace()`
- `bindWorkspaceEvents()`

## Verification Plan

- `node --check app.js`
- `node --check src/render/workOrderSortDisplay.js`
- direct helper-output smoke for newest, due, priority, and completed sort behavior
- local resource smoke for `index.html`, `app.js`, and `src/render/workOrderSortDisplay.js`
- no package/upload unless local checks pass
- hosted resource checks and signed-in live smoke after package/upload
