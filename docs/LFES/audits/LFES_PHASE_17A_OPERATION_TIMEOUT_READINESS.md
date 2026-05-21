# LFES Phase 17A Operation Timeout Readiness

Date: 2026-05-21

## Scope

Move only `withOperationTimeout(promise, message, timeoutMs)` from `app.js` into `src/utils/operationTimeout.js`.

## Risk

MEDIUM/HIGH RISK: the helper is pure infrastructure, but it wraps auth, data loading, storage, messaging, and mutation operations throughout the app.

## Guardrails

- Do not change any timeout values.
- Do not change any call sites.
- Do not move Supabase calls.
- Do not move mutation handlers.
- Do not move auth, storage, public QR, message, or work-order workflow logic.
- Do not change promise rejection behavior or the timeout message contract.

## Verification Plan

- Run `node --check app.js`.
- Run `node --check src/utils/operationTimeout.js`.
- Run direct helper smoke for success and timeout rejection behavior.
- Run local resource smoke for `index.html`, `app.js`, and `src/utils/operationTimeout.js`.
- Package/upload only after clean local verification.
- Run hosted resource checks and live signed-in smoke.
