# LFES Phase 13K - Assignment Display Readiness

Date: 2026-05-20

## Candidate

- `assignmentLabel`

## Current Surface

- Display label for assigned work orders and outside-vendor work.
- Used by cards, global search, command cards, exports, and downtime email text.

## Dependencies

- `isVendorAssigned`
- Work-order assigned profile data

## Safe Boundary

- Move only the assignment label formatter into a render display module.
- Keep assignment select controls, assignment mutations, vendor detection, form payloads, event logging, and permission checks in `app.js`.

## Verification Plan

- Static checks.
- Local resource smoke for the new render module.
- Hosted resource smoke after deploy.
- Live browser smoke for signed-in workspace load, Work/Team nav availability, and console cleanliness.
