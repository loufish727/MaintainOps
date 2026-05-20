# LFES Phase 11R Part Source Display Readiness

Date: 2026-05-20

## Candidate

Move only the part source display helpers:

- `renderPartSourceOptions`
- `renderPartSourceManager`

## Why This Is Safe

These helpers render the source/vendor datalist and source rename panel from already-loaded part data. They do not calculate part inventory, toggle the source manager, submit source rename forms, mutate parts, call Supabase, or change document/stock/detail flows.

## Dependencies To Inject

- `escapeHtml`
- `getPartSources`
- `getPartSuppliersReady`

## Must Not Move

Do not move part source calculation, source rename behavior, source toggle behavior, part create/edit forms, inventory Use/Restock behavior, document upload behavior, delete guards, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.
