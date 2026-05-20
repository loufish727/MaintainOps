# LFES Phase 12Y - Location Display Readiness

Date: 2026-05-20

## Candidate

- `activeLocationName`

## Current Surface

- Display-only label for the current active location.
- Used by global search preview text, fallback asset location text, and message composer scope text.

## Dependencies

- `locations`
- `activeLocationId`

## Safe Boundary

- Move only the active location label lookup into a render display module.
- Keep active-location persistence, storage keys, lock behavior, routing checks, and all location mutation/selection behavior in `app.js`.
- Keep global search and message composer helper wiring unchanged except for the imported dependency source.

## Verification Plan

- Static checks.
- Local resource smoke for the new render module.
- Browser smoke verifying current location text, Messages scope text, and Team still render.
- Package, deploy, hosted resource smoke, workflow check, and live browser smoke before continuing.
