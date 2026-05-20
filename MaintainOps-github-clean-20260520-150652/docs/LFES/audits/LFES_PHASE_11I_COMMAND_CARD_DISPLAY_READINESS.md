# LFES Phase 11I Command Card Display Readiness

Date: 2026-05-20

## Candidate

Move only command-card display helpers:

- `renderEmailHelperCommandCard`
- `commandShortcut`

## Why This Is Safe

These helpers only return command card HTML. They do not bind jump behavior, copy email text, mutate work orders, or call Supabase.

## Dependencies To Inject

- `escapeHtml`

## Must Not Move

Do not move command summary calculation, jump behavior, email helper copy behavior, work-order mutations, event handlers, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.
