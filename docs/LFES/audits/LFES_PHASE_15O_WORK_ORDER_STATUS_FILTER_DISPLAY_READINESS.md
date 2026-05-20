# LFES Phase 15O Work Order Status Filter Display Readiness

Date: 2026-05-20

## Classification

MEDIUM RISK.

Risk: the status predicate is read-only but controls which work orders appear in the queue.

## Approved Scope

Move only `workOrderMatchesStatusFilter` from `app.js` into `src/render/workOrderStatusFilterDisplay.js`.

## Required Injection

- `getActiveStatusFilter`
- `getDueState`
- `isCompletedThisMonth`
- `isCompletedThisWeek`

## Explicit Non-Scope

Do not move:

- `filteredWorkOrders`
- `myWorkQueueOrders`
- work-order search values
- queue filters
- assignment/vendor filters
- event handlers
- mutations
- `renderWorkspace()`
- `bindWorkspaceEvents()`

## Verification Plan

- `node --check app.js`
- `node --check src/render/workOrderStatusFilterDisplay.js`
- direct helper-output smoke for overdue, completed month/week, active/all, and exact status matching
- local resource smoke for `index.html`, `app.js`, and `src/render/workOrderStatusFilterDisplay.js`
- no package/upload unless local checks pass
- hosted resource checks and signed-in live smoke after package/upload
