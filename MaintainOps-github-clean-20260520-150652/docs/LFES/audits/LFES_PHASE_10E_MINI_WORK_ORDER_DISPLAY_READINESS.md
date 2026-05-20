# LFES Phase 10E Mini Work Order Display Readiness

Date: 2026-05-20

## Purpose

Review the next low-risk `app.js` cleanup candidate after Phase 10B/10C/10D was packaged, deployed, and live verified.

## Approved Candidate

Move only the mini work order display helpers into a dedicated render module:

- `renderMiniWorkOrder(workOrder)`
- `renderAssetMiniWorkOrder(workOrder)`

These helpers only build small read-only work order snippets. They do not open work orders, mutate records, bind events, call Supabase, or change workflow state.

## Dependency Plan

The new module must not own work order state. `app.js` will provide:

- `escapeHtml`
- `statusLabel`
- `relationshipIcon`
- `getPartsUsedByWorkOrder`
- `getPhotosByWorkOrder`

Asset detail rendering, relationship state loading, click handling, and work order workflows remain in `app.js`.

## Explicitly Out Of Scope

- `renderAssetDetail()`
- `renderAssetCard()`
- asset hierarchy logic.
- work order open/navigation behavior.
- parts/photo loading and mutation.
- Quick Fix.
- work order create/update/complete/delete behavior.
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
- signed-in local smoke across core sections, including Equipment detail/mini work order rendering where available.
- package/upload only after local checks pass.
- live resource verification, hosted Resource Load Smoke, Pages/Actions checks when available, and signed-in live smoke.

## Decision

Proceed to Phase 10F with the mini work order display helper extraction only.
