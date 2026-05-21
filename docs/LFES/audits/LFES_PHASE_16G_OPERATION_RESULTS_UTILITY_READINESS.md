# LFES Phase 16G Operation Results Utility Readiness

Date: 2026-05-21

## Scope

Move only the pure `withSetupError(response, message)` response wrapper from `app.js` into `src/utils/operationResults.js`.

## Risk

MEDIUM RISK: the helper is pure, but it is used by setup/error handling around Supabase responses.

## Guardrails

- Do not move Supabase calls.
- Do not move mutation handlers.
- Do not move `withOperationTimeout`.
- Do not move schema readiness mutations or readiness flags.
- Do not change returned response shape.

## Verification Plan

- Run `node --check app.js`.
- Run `node --check src/utils/operationResults.js`.
- Run direct helper smoke for wrapped response shape.
- Run local resource smoke for `index.html`, `app.js`, and `src/utils/operationResults.js`.
- Package and upload only after clean local verification.
- Run live resource and signed-in smoke after deploy.
