# LFES Phase 14W - Dashboard Metrics Display Readiness

Date: 2026-05-20

## Risk

MEDIUM RISK.

The helpers are read-only, but they feed dashboard counts, completed filters, overdue filters, and PM due-soon indicators.

## Candidate

- `overdueWorkOrders`
- `completedThisWeek`
- `isCompletedThisWeek`
- `completedThisMonth`
- `isCompletedThisMonth`
- `averageCompletionMinutes`
- `preventiveDueSoon`

## Safe Boundary

- Move only dashboard metric/date helpers into the existing dashboard display module.
- Keep work-order fetching, status changes, PM generation, planning item creation, and mutations in `app.js`.
- Preserve overdue detection via `getDueState`, seven-day completed window, current-month completed window, average rounding, and seven-day PM due-soon window.

## Verification Plan

- Static checks.
- Targeted local helper-output smoke.
- Local resource smoke for the updated render module.
- Do not package/upload unless local checks pass.
- Hosted resource smoke and signed-in live smoke after deployment.
