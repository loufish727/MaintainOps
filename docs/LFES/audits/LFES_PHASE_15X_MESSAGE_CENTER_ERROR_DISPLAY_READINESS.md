# LFES Phase 15X Message Center Error Display Readiness

Date: 2026-05-20

## Classification

MEDIUM RISK.

Risk: message-center error text is user-facing and influences readiness handling, so only pure classification/text may move.

## Approved Scope

Move only the pure message-center error classification/text into `src/render/messageCenterErrorDisplay.js`.

## Required Injection

- `isMissingColumnError`
- `isColumnSchemaError`

## Explicit Non-Scope

Do not move:

- `messagesReady` mutation
- message creation
- reply sending
- read-state mutation
- message event handlers
- `renderWorkspace()`
- `bindWorkspaceEvents()`

## Verification Plan

- `node --check app.js`
- `node --check src/render/messageCenterErrorDisplay.js`
- direct helper-output smoke for work-order-link schema errors, message-center schema errors, and generic errors
- local resource smoke for `index.html`, `app.js`, and `src/render/messageCenterErrorDisplay.js`
- no package/upload unless local checks pass
- hosted resource checks and signed-in live smoke after package/upload
