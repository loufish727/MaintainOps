# LFES Phase 10B Planning Display Readiness

Date: 2026-05-20

## Purpose

Review the next low-risk `app.js` cleanup candidate after Phase 9Y/9Z/10A was packaged, deployed, and live verified.

## Approved Candidate

Move only the Planning display helpers into a dedicated render module:

- `renderPlanningGroup(title, items, chipClass)`
- `renderPlanningItem(item)`

These helpers only build Planning section HTML from already-computed planning items. They do not calculate planning buckets, generate PM work orders, create follow-up work orders, mutate records, bind events, call Supabase, or change workflow state.

## Dependency Plan

The new module must not own planning state. `app.js` will provide:

- `escapeHtml`
- `statusLabel`
- `renderRelationshipChips`

Planning item generation, follow-up item generation, data loading, and click handling remain in `app.js`.

## Explicitly Out Of Scope

- `planningItems()`
- `planningPmItems()`
- `followUpItems()`
- PM generation.
- follow-up work order creation.
- mini work order opening behavior.
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
- signed-in local smoke across core sections, including Planning section rendering.
- package/upload only after local checks pass.
- live resource verification, hosted Resource Load Smoke, Pages/Actions checks when available, and signed-in live smoke.

## Decision

Proceed to Phase 10C with the Planning display helper extraction only.
