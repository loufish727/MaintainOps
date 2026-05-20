# LFES Phase 11O Missing Work Detail Display Readiness

Date: 2026-05-20

## Candidate

Move only the missing work order detail display helper:

- `renderMissingWorkOrderDetail`

## Why This Is Safe

This helper returns static HTML for the not-loaded work order state. It does not inspect filters, bind the back button, mutate state, call Supabase, or change the work detail flow.

## Dependencies To Inject

None.

## Must Not Move

Do not move work order lookup, filters, pagination, quick update behavior, jump behavior, assignment/completion mutations, safety check logic, parts/photo/comment flows, event handlers, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.
