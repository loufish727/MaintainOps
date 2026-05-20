# LFES Phase 11F Work Recommendation Display Readiness

Date: 2026-05-20

## Candidate

Move only the work order recommendation display helper:

- `renderWorkOrderRecommendation`

## Why This Is Safe

This helper renders the already-computed recommended next step. It does not calculate the recommendation, mutate work orders, bind jump behavior, save updates, or call Supabase.

## Dependencies To Inject

- `escapeHtml`
- `recommendedWorkOrderStep`

## Must Not Move

Do not move recommendation calculation, jump behavior, quick update handling, work-order mutations, event handlers, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.
