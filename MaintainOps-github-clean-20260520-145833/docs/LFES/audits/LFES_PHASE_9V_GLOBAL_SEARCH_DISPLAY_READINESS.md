# LFES Phase 9V Global Search Display Readiness

Date: 2026-05-20

## Purpose

Review the next low-risk `app.js` cleanup candidate after Phase 9S/9T/9U was packaged, deployed, and live verified.

## Approved Candidate

Move only the global search result display helpers into a dedicated render module:

- `renderGlobalSearchResults(results)`
- `renderGlobalResultGroup(title, items, renderer, tone, options = {})`
- `renderGlobalWorkResult(workOrder)`
- `renderGlobalAssetResult(asset)`
- `renderGlobalPartResult(part)`
- `renderGlobalRequestResult(request)`
- `renderGlobalPmResult(schedule)`
- `renderGlobalProcedureResult(template)`
- `globalResultCount(results)`

These helpers only build result display HTML and count result groups that are already supplied by `app.js`. They do not search records, filter data, mutate records, bind events, call Supabase, or change workflow state.

## Dependency Plan

The new module must not own search state or navigation behavior. `app.js` will provide:

- `escapeHtml`
- `statusLabel`
- `assignmentLabel`
- `activeLocationName`
- `getSearchQuery`

`globalSearchResults()` and all search/filter logic remain in `app.js`.

## Explicitly Out Of Scope

- `globalSearchResults()`
- `matchesSearch()`
- `matchesQuery()`
- work order search values and exact work order search.
- search input state and localStorage.
- data-search click handlers.
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
- signed-in local smoke across core sections, including global search result display rendering.
- package/upload only after local checks pass.
- live resource verification, hosted Resource Load Smoke, GitHub Actions checks, and signed-in live smoke.

## Decision

Proceed to Phase 9W with the global search result display helper extraction only.
