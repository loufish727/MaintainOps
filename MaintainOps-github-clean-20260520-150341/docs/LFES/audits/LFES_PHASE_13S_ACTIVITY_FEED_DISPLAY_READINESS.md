# LFES Phase 13S - Activity Feed Display Readiness

Date: 2026-05-20

## Risk

MEDIUM RISK.

The helper only builds display data for work-order history, but a mistake could omit or reorder comments, photos, parts, or events.

## Candidate

- `buildActivityFeed`

## Safe Boundary

- Move only the activity feed merge/sort helper.
- Keep comments, photos, parts, event loading, rendering, uploads, inserts, and work-order detail behavior in `app.js`.
- Preserve type labels and descending `created_at` ordering exactly.

## Verification Plan

- Static checks.
- Targeted local helper-output smoke.
- Local resource smoke for the new render module.
- Do not package/upload unless local checks pass.
- Hosted resource smoke and signed-in live smoke after deployment.
