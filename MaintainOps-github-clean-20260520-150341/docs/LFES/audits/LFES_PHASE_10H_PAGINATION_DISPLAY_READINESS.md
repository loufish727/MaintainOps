# LFES Phase 10H Pagination Display Readiness

Date: 2026-05-20

## Candidate

Move only the tiny pagination display helpers from `app.js` into a new render module:

- `renderWorkPagination`
- `renderPartsPagination`
- `renderAssetsPagination`
- `renderListPagination`

## Why This Is Safe

These helpers only return HTML for pagination bars:

- Previous and Next buttons.
- Showing count text.
- Page count text.
- Existing `data-*` attributes used by current event delegation.

They do not:

- call Supabase.
- mutate state.
- change localStorage.
- change active filters.
- change page numbers.
- bind events.
- render forms.
- perform delete guard logic.
- create or update operational records.

## Dependencies To Inject

The new module should receive only read-only values:

- `WORK_ORDERS_PER_PAGE`
- `PARTS_PER_PAGE`
- `ASSETS_PER_PAGE`
- `LIST_ITEMS_PER_PAGE`
- `getWorkOrderPage`
- `getPartsPage`
- `getAssetsPage`

`renderListPagination` already receives `currentPage` and `totalPages` directly, so it does not need page-state access.

## Must Not Move

Do not move:

- page click event handling.
- page state mutation.
- localStorage updates.
- work order, request, asset, schedule, procedure, member, or part filtering.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.
- Quick Fix, request conversion, PM generation, delete guards, auth/session/company/location logic, Supabase SQL/RLS, storage/photo/document flows, message composer/workflow logic.

## Verification Required

Phase 10I local verification must include:

- static JS checks.
- local hosted Resource Load Smoke.
- signed-in local smoke across My Work, Work Orders, Requests, Equipment, PM, Procedures, Parts, Team, Settings, and Messages.
- verify the new `src/render/paginationDisplay.js` script tag and new `app.js` cache tag.
- verify no visible app errors.
- verify no actionable browser warning/error logs.

Phase 10J package/live verification must include:

- fresh GitHub upload package.
- live resource tag verification.
- hosted Resource Load Smoke against GitHub Pages.
- signed-in live smoke across core sections.
- docs closeout.
