# LFES Phase 14T - Maintenance List Display Readiness

Date: 2026-05-20

## Risk

MEDIUM RISK.

The helpers are read-only, but they control which preventive schedules and procedure templates appear under search/location filters.

## Candidate

- `filteredPreventiveSchedules`
- `filteredProcedureTemplates`

## Safe Boundary

- Move only list filtering helpers for preventive schedules and procedure templates.
- Keep PM generation, schedule saves/deletes, procedure saves/deletes, checklist behavior, and `procedureColumn` payload logic in `app.js`.
- Preserve active-location filtering for schedules and search-field matching for both lists.

## Verification Plan

- Static checks.
- Targeted local helper-output smoke.
- Local resource smoke for the new render module.
- Do not package/upload unless local checks pass.
- Hosted resource smoke and signed-in live smoke after deployment.
