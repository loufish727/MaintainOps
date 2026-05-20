# LFES Phase 11X Procedure Options Display Readiness

Date: 2026-05-20

## Candidate

Move only the procedure select option display helper:

- `renderProcedureOptions`

## Why This Is Safe

This helper renders `<option>` markup from already-loaded procedure templates and readiness state. It does not create templates, add checklist steps, mutate work orders or schedules, validate completion, call Supabase, or change procedure schema fallback behavior.

## Dependencies To Inject

- `escapeHtml`
- `getProceduresReady`
- `getProcedureTemplates`

## Must Not Move

Do not move procedure schema checks, procedure column payload logic, checklist completion validation, template creation, step creation, PM generation, work order creation/editing, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.
