# LFES Phase 9P Empty State Readiness

Date: 2026-05-20

## Purpose

Review the next low-risk `app.js` cleanup candidate after the Phase 9N/9O equipment label extraction was packaged, deployed, and live verified.

## Approved Candidate

Move only the small empty-state text helpers into a dedicated render module:

- `requestEmptyStateText(filter)`
- `assetEmptyStateText()`
- `partEmptyStateText()`

These helpers return static display copy based on current search/filter state. They do not mutate state, call Supabase, bind events, route workflows, or render forms.

## Dependency Plan

The new module must not read app globals directly. `app.js` will provide getter dependencies:

- `getSearchQuery`
- `getAssetStatusFilter`
- `getPartSearchQuery`
- `getPartInventoryFilter`
- `assetStatusLabel`

This keeps the extracted helper module display-focused and avoids moving state ownership out of `app.js`.

## Explicitly Out Of Scope

- request filtering, counts, pagination, conversion, or status logic.
- equipment filtering, parent/child equipment logic, cards, details, forms, or delete guards.
- parts filtering, supplier/source management, Use/Restock, mutations, or storage behavior.
- Quick Fix, public QR, messages, auth/session/company/location logic.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.
- Supabase SQL/RLS/policies.

## Required Verification

After implementation:

- static JS checks for `app.js`, `supabase-config.js`, tests, and all `src` modules.
- local Resource Load Smoke.
- signed-in local smoke across core sections.
- package/upload to GitHub Pages only after local checks pass.
- live resource verification, hosted Resource Load Smoke, GitHub Actions checks, and signed-in live smoke.

## Decision

Proceed to Phase 9Q with the empty-state text helper extraction only.
