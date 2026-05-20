# LFES Phase 12V - Team Workload Display Readiness

Date: 2026-05-20

## Candidate

- `teamMemberWorkload`

## Current Surface

- Team member cards render workload chips for open, in-progress, blocked, and overdue assigned work.
- The helper only counts already-loaded work orders and returns display counts.

## Dependencies

- `workOrders`
- `matchesActiveLocation`
- `getDueState`

## Safe Boundary

- Move only the count helper into a render display module.
- Keep role editing, profile rendering, invite behavior, location filtering logic, and all mutations in `app.js`.
- Keep `renderMember` in `app.js` because it owns role form markup and team action controls.

## Verification Plan

- Static checks.
- Local resource smoke for the new render module.
- Signed-in local Team smoke confirming member cards and workload chips still render.
- Package, deploy, hosted resource smoke, workflow check, and live Team smoke before continuing.
