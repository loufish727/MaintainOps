# app.js Authority Map

This document defines the intended role of `app.js` after the modularization pass. The goal is not to make `app.js` empty. The goal is to keep its remaining authority deliberate.

## Current Position

`app.js` is currently about 4,615 lines. It has been reduced from a much larger legacy orchestration file by moving render helpers, event-binding groups, workflow modules, service helpers, query/list helpers, and utility logic into `src/`.

At this stage, additional movement should be based on ownership clarity and operational risk reduction, not line count alone.

## Authority Allowed To Stay In app.js

The following responsibilities are appropriate for `app.js` for the current architecture:

- application startup and top-level initialization
- auth/session bootstrap coordination
- active company and active location selection
- global state declarations that are still shared across modules
- top-level render routing
- `renderWorkspace` as the current workspace composition router
- `bindWorkspaceEvents` as the current event module composition hub
- module factory wiring and dependency injection
- high-level reload orchestration after mutations
- shared user notices and top-level error presentation

These are shell responsibilities. They can remain while the app is still a vanilla browser app loaded through script tags.

## Authority That Should Move When Touched

The following responsibilities should not grow inside `app.js`. If changed materially, they should be treated as extraction candidates:

- Supabase mutation workflows
- delete flows
- upload or storage removal flows
- form payload construction for operational records
- public request intake business logic
- work order status and assignment operations
- comment creation and follow-up work creation
- procedure step result saving
- business-rule classifiers that are reused across screens
- large HTML builders or repeated display transformations

These responsibilities are operational authority. They should live in workflow, service, render, or utility modules when the boundary is clear and smoke coverage is available.

## Current Function Classification

### Shell / Keep For Now

- `init`
- `render`
- `renderWorkspace`
- `bindWorkspaceEvents`
- `loadCompanies`
- `loadCompaniesFromMembershipRows`
- `loadCompanyData`
- `reloadWorkOrderQueue`
- `reloadRequestQueue`
- active company/location persistence helpers
- workspace state setter wrappers
- notice and top-level warning helpers

### Workflow / Move When Safe

- `deletePart`
- `requestDeletePart`
- `createFollowUpWorkOrder`
- `updateWorkOrderStatus`
- `setWorkOrderStatus`
- `assignWorkOrderToMe`
- `assignWorkOrderFromCard`
- `createComment`
- `addCommentToWorkOrder`
- `saveStepResult`
- `submitPublicRequest`
- `createCompany`

### Service / Possible Future Service Boundary

- `updateWorkOrderSafely`
- `insertWithOptionalProcedure`
- `updateWithOptionalProcedure`
- `recordWorkOrderEvent`
- page fetch/count helpers
- signed URL loaders
- company/profile/member loaders

### Render / Possible Future Render Boundary

- `renderAuth`
- `renderCompanyCreate`
- `renderPublicRequestIntake`
- `renderPublicRequestQrPage`
- `renderPartDetail`
- workspace section composition inside `renderWorkspace`

### Utility / Possible Future Utility Boundary

- password recovery URL classifiers
- public request token URL helpers
- location routing helpers
- checklist/procedure completion helpers
- role/capability helpers
- safety device payload helpers
- `copyTextToClipboard`

## Highest-Value Remaining Candidates

1. Comment workflow: bounded mutation path with visible smoke coverage potential.
2. Follow-up work order workflow: coherent work-order creation derivative with known rollback pattern.
3. Work order status and assignment operations: operationally important, but shared mutation authority needs careful dependency injection.
4. Procedure step result saving: bounded procedure mutation, but tied to completion rules.
5. Part delete workflow: meaningful authority reduction, but high-risk because it includes destructive behavior, document cleanup, and traceability checks.
6. Public request intake: important security boundary, but should be handled only as a dedicated public-path hardening phase.
7. Company creation/bootstrap: should stay until auth/company startup has its own deliberate boundary plan.

## Decision Rule

Do not extract from `app.js` just because code remains there.

Extract when at least one of these is true:

- the function owns a mutation or delete flow
- the function owns business behavior that can be tested independently
- the function has a clearer workflow, service, render, or utility home
- the extraction reduces hidden authority without expanding blast radius
- the required smoke test can verify the behavior meaningfully

Leave code in `app.js` when it is acting as the app shell, state coordinator, render router, or dependency wiring layer.
