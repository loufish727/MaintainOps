# LFES Phase 13H - Work Order Error Display Readiness

Date: 2026-05-20

## Candidate

- `friendlyWorkOrderSaveError`

## Current Surface

- Text-only formatting for work-order save/update/delete/assign errors.
- The helper returns a friendly message and does not change work-order state.

## Dependencies

- Error message text only.

## Safe Boundary

- Move only the error-message formatter into a render display module.
- Keep work-order creates, quick fixes, saves, status transitions, deletes, assignments, alerts, notices, and Supabase calls in `app.js`.

## Verification Plan

- Static checks.
- Local resource smoke for the new render module.
- Hosted resource smoke after deploy.
- Live browser smoke for signed-in workspace load and console cleanliness.
