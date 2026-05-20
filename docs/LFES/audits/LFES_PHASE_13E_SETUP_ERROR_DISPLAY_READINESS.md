# LFES Phase 13E - Setup Error Display Readiness

Date: 2026-05-20

## Candidate

- `equipmentSchemaMessage`
- `databaseSetupRequiredMessage`

## Current Surface

- Text-only setup guidance for missing SQL/schema conditions.
- The helpers return strings and do not change readiness flags or perform operations.

## Dependencies

- Error message text only.

## Safe Boundary

- Move only the string-formatting helpers into a render display module.
- Keep schema detection, readiness flag changes, Supabase response wrapping, mutations, and save flows in `app.js`.

## Verification Plan

- Static checks.
- Local resource smoke for the new render module.
- Hosted resource smoke after deploy.
- Live browser smoke for workspace surfaces and console cleanliness.
