# app.js Authority Map

This document defines the intended role of `app.js` after the modularization pass. The goal is not to make `app.js` empty. The goal is to keep its remaining authority deliberate.

## Current Position

`app.js` is currently about 6,400 physical lines. It has been reduced from a much larger legacy orchestration file by moving render helpers, event-binding groups, workflow modules, service helpers, query/list helpers, and utility logic into `src/`.

The shell now renders only the active workspace screen. Manager, Financial, Team presentation, and Admin Setup are lazy feature bundles initialized through shell-owned dependency injection. Their screen authority remains modular without requiring a framework rewrite.

At this stage, additional movement should be based on ownership clarity and operational risk reduction, not line count alone.

## Authority Allowed To Stay In app.js

The following responsibilities are appropriate for `app.js` for the current architecture:

- application startup and top-level initialization
- auth/session bootstrap coordination
- active company and active location selection
- global state declarations that are still shared across modules
- top-level render routing
- `renderWorkspace` as the current active-screen composition router
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

### Workflow / Still In app.js

- `createFollowUpWorkOrder`
- `assignWorkOrderToMe`
- `assignWorkOrderFromCard`
- `createComment`
- `addCommentToWorkOrder`

### Workflow / Module-Owned

- part deletion: `deletePart` and `requestDeletePart`
- procedure checklist saving: `saveStepResult`
- work-order status changes: `setWorkOrderStatus` and `updateWorkOrderStatus`
- public request intake and submission
- company creation and setup

The module-owned functions remain wired through `app.js`, but their workflow authority lives in dedicated files under `src/workflows/`.

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
3. Work-order assignment operations: operationally important, but shared mutation authority needs careful dependency injection.
4. Company and location data-loading lifecycle: move only as a dedicated state-consistency and performance phase.
5. Shared mutation helpers such as `updateWorkOrderSafely` and `recordWorkOrderEvent`: move only after their callers have stable workflow boundaries.

## Decision Rule

Do not extract from `app.js` just because code remains there.

Extract when at least one of these is true:

- the function owns a mutation or delete flow
- the function owns business behavior that can be tested independently
- the function has a clearer workflow, service, render, or utility home
- the extraction reduces hidden authority without expanding blast radius
- the required smoke test can verify the behavior meaningfully

Leave code in `app.js` when it is acting as the app shell, state coordinator, render router, or dependency wiring layer.
