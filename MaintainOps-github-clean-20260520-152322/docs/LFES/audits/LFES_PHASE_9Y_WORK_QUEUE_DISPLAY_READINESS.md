# LFES Phase 9Y Work Queue Display Readiness

Date: 2026-05-20

## Purpose

Review the next low-risk `app.js` cleanup candidate after Phase 9V/9W/9X was packaged, deployed, and live verified.

## Approved Candidate

Move only the Work Orders / My Work queue title display helpers into a dedicated render module:

- `workOrdersPanelTitle()`
- `myWorkPanelTitle()`
- `workQueuePanelTitle()`
- `workQueuePanelSubtitle(count)`

These helpers only return panel title/subtitle copy from existing filter state. They do not filter work orders, count rows, mutate records, bind events, call Supabase, or change workflow state.

## Dependency Plan

The new module must not own queue state. `app.js` will provide:

- `statusLabel`
- `teamMemberName`
- `getWorkOrderAssigneeFilter`
- `getWorkOrderFilter`
- `getActiveStatusFilter`
- `getMyWorkFilter`
- `getActiveSection`

Work queue filtering, server paging, dashboard counts, assignment filters, and localStorage state remain in `app.js`.

## Explicitly Out Of Scope

- `filteredWorkOrders()`
- `myWorkQueueOrders()`
- work order filtering, status filtering, sorting, paging, and counts.
- assignment filtering behavior.
- Quick Fix, work order create/update/complete/delete behavior.
- event handlers.
- mutations.
- Supabase calls, SQL, RLS, and policies.
- auth/session/company/location logic.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

## Required Verification

After implementation:

- static JS checks for `app.js`, `supabase-config.js`, tests, and all `src` modules.
- local Resource Load Smoke.
- signed-in local smoke across core sections, including Work Orders and My Work panel title/subtitle rendering.
- package/upload only after local checks pass.
- live resource verification, hosted Resource Load Smoke, Pages/Actions checks when available, and signed-in live smoke.

## Decision

Proceed to Phase 9Z with the work queue title/subtitle display helper extraction only.
