# LFES Phase 16A App Issue Error Display Readiness

Date: 2026-05-20

## Classification

MEDIUM RISK.

Risk: app issue error text is user-facing and influences readiness handling, so only pure classification/text may move.

## Approved Scope

Move only the pure app issue report error classification/text into `src/render/appIssueErrorDisplay.js`.

## Required Injection

- `isColumnSchemaError`

## Explicit Non-Scope

Do not move:

- `appIssueReportsReady` mutation
- issue report creation/update
- issue report reload
- app issue report forms
- event handlers
- `renderWorkspace()`
- `bindWorkspaceEvents()`

## Verification Plan

- `node --check app.js`
- `node --check src/render/appIssueErrorDisplay.js`
- direct helper-output smoke for missing app issue table/columns and generic errors
- local resource smoke for `index.html`, `app.js`, and `src/render/appIssueErrorDisplay.js`
- no package/upload unless local checks pass
- hosted resource checks and signed-in live smoke after package/upload
