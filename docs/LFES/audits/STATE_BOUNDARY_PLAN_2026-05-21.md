# LFES State Boundary Plan - 2026-05-21

## Why This Exists

Recent `bindWorkspaceEvents()` extractions reduced surface area, but `app.js` still owns state, render decisions, and workflow sequencing. That is intentional for the first hard-boundary passes, but it cannot be the permanent architecture if the goal is real authority reduction.

This plan defines the next safer boundary work before moving state ownership.

## Current Contract Standard

Event modules must:

- bind only their named selector group;
- receive state through injected getters/setters;
- call only injected side-effect callbacks;
- preserve selectors and event contracts;
- avoid business-data mutation;
- avoid form submissions, deletes, uploads, auth/session startup, public QR submit, Supabase SQL/RLS, and broad render ownership;
- remain rollback-friendly by restoring the original listener block and cache tag.

Modules now carrying explicit contract comments:

- `src/utils/workspaceSearchEvents.js`
- `src/utils/workspaceFilterPaginationEvents.js`
- `src/utils/workspaceDetailNavigationEvents.js`
- `src/utils/workspaceInventoryFilterEvents.js`

## First Credible State Boundary

Recommended first state boundary: workspace UI state, not workflow/mutation state.

Candidate state object:

- `activeSection`
- `activeWorkOrderId`
- `activeAssetId`
- `activePartId`
- `searchQuery`
- `workOrderSearchMode`
- `activeStatusFilter`
- `myWorkFilter`
- `workOrderFilter`
- `workOrderAssigneeFilter`
- `workSort`
- `requestViewFilter`
- `workOrderPage`
- `partsPage`
- `assetsPage`
- `requestsPage`
- `schedulesPage`
- `proceduresPage`
- `membersPage`
- `assetStatusFilter`
- `partInventoryFilter`
- `partSearchQuery`

Why this is the first candidate:

- It is already mostly local UI state.
- It already has localStorage persistence contracts.
- It is exercised by current event modules.
- Part inventory and asset status filter events have now been extracted, closing the sequencing asymmetry called out during review.
- It can be tested without creating, editing, deleting, uploading, or touching Supabase/RLS.

## Explicitly Out Of Scope For First State Boundary

Do not include:

- `session`
- `activeCompanyId`
- `activeLocationId`
- company/location startup state
- loaded business arrays such as `workOrders`, `assets`, `parts`, `maintenanceRequests`
- pending delete ids
- Quick Fix submission state
- request conversion state
- message send/reply body state
- photo/document/logo upload state
- Supabase clients, SQL, RLS, or storage policies

## Required Implementation Shape

The first state-boundary implementation should be a factory, not a global singleton:

```js
const workspaceUiState = createWorkspaceUiState({
  storage: localStorage,
  activeLocationStorageKey: ACTIVE_LOCATION_STORAGE_KEY,
});
```

The factory should expose explicit methods such as:

- `getActiveSection()`
- `setActiveSection(value)`
- `getSearchQuery()`
- `setSearchQuery(value)`
- `getWorkOrderPage()`
- `setWorkOrderPage(value)`
- focused reset helpers for page/search state

It should not import services or call Supabase. It should not render.

## Verification Required Before Deploy

- static JS checks;
- state factory unit/mock smoke for default values and localStorage persistence;
- event-module mock smoke using the state factory instead of ad hoc state wrappers;
- local resource smoke;
- local boot smoke;
- hosted resource smoke;
- signed-in live smoke covering search, filter/pagination, detail open/back;
- `npm run test:smoke:github-actions`.

## RLS/Security Review Is Separate

Supabase RLS remains blocked from modularization work, but it deserves its own audit.

Schedule a standalone RLS review to answer:

- which tables have RLS enabled;
- which policies exist per table;
- whether client-side role checks are mirrored server-side;
- whether public QR/request paths are constrained correctly;
- whether storage buckets have expected private/public access;
- whether manager/admin/technician behavior is enforced by database policy or only client UI.

Do not combine the RLS audit with app.js state extraction. Mixing these would expand blast radius and make rollback unclear.

## Recommended Next Step

Do one of:

1. Implement the workspace UI state factory as a medium-risk but non-mutating state boundary.
2. Continue one more small read-only filter boundary only if the state factory is deferred.
3. Run the standalone RLS audit before any security-sensitive workflow extraction.
