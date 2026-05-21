# LFES Phase 16D Schema Error Utility Readiness

Date: 2026-05-21

## Classification

MEDIUM RISK.

Risk: schema error predicates are pure, but they are used across load and mutation error handling.

## Approved Scope

Move only these side-effect-free predicates from `app.js` into `src/utils/schemaErrors.js`:

- `isColumnSchemaError`
- `isMissingColumnError`
- `isProfileMissingError`
- `isProcedureSchemaError`
- `isAssetHierarchySchemaError`

## Explicit Non-Scope

Do not move:

- `markSchemaReadiness`
- readiness flag mutations
- Supabase calls
- mutation handlers
- form handlers
- `renderWorkspace()`
- `bindWorkspaceEvents()`

## Verification Plan

- `node --check app.js`
- `node --check src/utils/schemaErrors.js`
- direct helper-output smoke for column, missing column, profile, procedure, and asset hierarchy schema errors
- local resource smoke for `index.html`, `app.js`, and `src/utils/schemaErrors.js`
- no package/upload unless local checks pass
- hosted resource checks and signed-in live smoke after package/upload
