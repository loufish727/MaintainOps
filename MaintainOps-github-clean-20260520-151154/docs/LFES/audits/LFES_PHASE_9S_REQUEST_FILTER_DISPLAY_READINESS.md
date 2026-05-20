# LFES Phase 9S Request Filter Display Readiness

Date: 2026-05-20

## Purpose

Review the next low-risk `app.js` cleanup candidate after Phase 9P/9Q/9R was packaged, deployed, and live verified.

## Approved Candidate

Move only the request filter display helpers into a dedicated render module:

- `requestPanelSubtitle(filter, count)`
- `renderRequestFilterBar(counts, selectedFilter, options = {})`

These helpers only build display text and request filter HTML. They do not filter requests, count requests, mutate records, bind events, call Supabase, or change workflow state.

## Dependency Plan

The new module must not own workflow or request state. `app.js` will provide only:

- `segmentIcon`

Request counts and selected filter will continue to be calculated and owned by `app.js`.

## Explicitly Out Of Scope

- `requestFilterCounts()`
- `requestMatchesBaseFilters()`
- `requestMatchesViewFilter()`
- `filteredRequests()`
- request pagination, conversion, delete, submit, Quick Fix, and public QR behavior.
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
- signed-in local smoke across core sections, including Requests filter bar rendering.
- package/upload only after local checks pass.
- live resource verification, hosted Resource Load Smoke, GitHub Actions checks, and signed-in live smoke.

## Decision

Proceed to Phase 9T with the request filter display helper extraction only.
