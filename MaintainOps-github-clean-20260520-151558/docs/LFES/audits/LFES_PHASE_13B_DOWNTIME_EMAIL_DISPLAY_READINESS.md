# LFES Phase 13B - Downtime Email Display Readiness

Date: 2026-05-20

## Candidate

- `downtimeEmailSubject`
- `downtimeEmailBody`
- internal `assetNameForWorkOrder`

## Current Surface

- Copy-only text for machine-down update buttons on work orders.
- No data mutation, Supabase access, workflow transition, or clipboard behavior inside the candidate functions.

## Dependencies

- `formatDate`
- `assignmentLabel`
- `cleanWorkOrderDescription`

## Safe Boundary

- Move only the subject/body text builders into a render display module.
- Keep button event binding, clipboard writes, work-order action logic, assignment semantics, and description cleanup behavior in `app.js`.
- Keep stored work-order descriptions unchanged.

## Verification Plan

- Static checks.
- Local resource smoke for the new render module.
- Hosted resource smoke after deploy.
- Live browser smoke covering Work Orders/Team/Messages script load and console cleanliness.
