# LFES Phase 12D App Issue Panel Display Readiness

Date: 2026-05-20

## Candidate

Move only the app issue reports panel display helper:

- `renderAppIssueReportsPanel`

## Why This Is Safe

This helper renders the manager-only wrapper around already-loaded app issue reports and delegates each issue card to the existing display helper. It does not create issue reports, update statuses, bind status forms, mutate records, call Supabase, or change setup readiness.

## Dependencies To Inject

- `canManageTeam`
- `renderAppIssueReport`
- `getAppIssueReportsReady`
- `getAppIssueReports`

## Must Not Move

Do not move app issue report creation, status update behavior, app issue form rendering, setup checks, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.
