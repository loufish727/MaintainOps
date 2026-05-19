# LFES Real-World Catches

This file records real engineering discoveries, prevented failures, or operational risks found while working on MaintainOps.

Do not add theoretical examples. Only document issues actually observed in MaintainOps.

## 2026-05-19 - Phase 6A - Parts Usage Is Not Transaction-Safe Yet

- Issue discovered: recording a part on a work order and decrementing inventory are separate database operations.
- How it was discovered: LFES Phase 6A created a disposable QA part, restocked it, used it from inventory, recorded it on a disposable QA work order, and verified the resulting quantity and `work_order_parts` row.
- Operational risk: if the `work_order_parts` insert succeeds but the stock update fails, or if two users record usage at the same time, inventory history and quantity on hand can diverge.
- LFES principle exposed it: mutation-boundary traceability, operational continuity, and failure-state visibility.
- What prevented escalation: Phase 6A used disposable QA records, verified final state, and cleaned up the request, work order, relationship row, and part after testing.
- Fix applied or recommended: no code or SQL fix applied in Phase 6A. Recommended next phase is parts transaction/RPC planning so work-order part usage and stock decrement happen atomically.
- Lessons learned: a workflow can pass live smoke and still expose a higher-grade operational trust gap. Passing the happy path is not the same as proving mutation atomicity.

Phase 6D update:

- Fix applied: `public.record_work_order_part_usage` was created in Phase 6C, then `addPartUsageToWorkOrder(...)` was updated in Phase 6D to call the RPC instead of separately inserting `work_order_parts` and updating `parts.quantity_on_hand`.
- Evidence: local Work Order Detail smoke recorded `QA Phase6D RPC Part 20260519-6D-1779214388252` as used and changed visible quantity from `50 on hand` to `29 on hand` through the app path.
- Remaining boundary: this closes the transaction gap for work-order part usage. Parts-screen Restock and inventory-only Use still remain separate client-side updates and should be handled in a future phase only if live operations require that stronger guarantee.

## 2026-05-19 - Live Testing - Password Recovery Link Had No App Handler

- Issue discovered: Supabase password recovery links returned to the app, but MaintainOps did not have a screen to set a new password from a recovery session.
- How it was discovered: while preparing a technician test account, the user sent a password reset and the resulting recovery link did not lead to a usable in-app reset flow.
- Operational risk: test users and live users could become locked out or require manual Supabase/admin intervention, delaying role QA and live pilot support.
- LFES principle exposed it: operational continuity, recovery-path visibility, and auth-boundary traceability.
- What prevented escalation: the issue was handled before technician guardrail testing continued, and the recovery token itself was not stored in docs.
- Fix applied or recommended: added a login `Forgot password?` screen, Supabase reset email request, recovery-link detection, `Set New Password` screen, password confirmation validation, `updateUser` call, and recovery URL cleanup.
- Lessons learned: account recovery is part of the operational auth boundary. A sign-in flow is incomplete if users cannot recover access without leaving the app process.

## 2026-05-18 - Phase 2K / 2L - Auburn First-Load Default Location

- Issue discovered: fresh/no-saved-location sessions selected Auburn, WA even though Taylor Metal Products expected Salem, OR as the operational default.
- How it was discovered: LFES live browser verification cleared scoped and legacy active-location localStorage keys and reloaded the GitHub Pages app.
- Operational risk: new work, requests, PM, equipment, or live testing could begin in the wrong branch before the user noticed.
- LFES principle exposed it: assumption traceability and operational-state persistence visibility.
- What prevented escalation: the Phase 2K analysis paused deeper workflow extraction, mapped the location precedence chain, and identified that `company_members.default_location_id` was null.
- Fix applied or recommended: Phase 2L ran a data-only Supabase SQL update setting Taylor members with null default location to Salem, OR. No app code, schema, or RLS changes were needed.
- Lessons learned: location defaulting is an operational boundary, not a cosmetic preference. Fresh-profile behavior must be tested separately from saved-location behavior.

## 2026-05-18 - Phase 2L - App Client Could Not Apply Admin Data Fix

- Issue discovered: attempting the default-location data fix through the signed-in app Supabase client affected 0 rows even though the app could read the rows.
- How it was discovered: an app-side Supabase update equivalent to the approved SQL returned no error but verification still showed all Taylor member defaults as null.
- Operational risk: relying on app-side admin-style updates could create false confidence that data fixes were applied.
- LFES principle exposed it: security-boundary traceability and verification visibility.
- What prevented escalation: the verification SELECT/app read was run immediately after the attempted update and caught the 0-row result.
- Fix applied or recommended: the prepared SQL was run through the Supabase SQL Editor/admin dashboard as `postgres`, then verified again.
- Lessons learned: data fixes crossing RLS-sensitive tables should use an explicit admin path and must always include a verification SELECT.

## 2026-05-19 - Phase 3A - renderWorkspace / bindWorkspaceEvents Responsibility Concentration

- Issue discovered: `renderWorkspace()` and `bindWorkspaceEvents()` define most screen composition, event contracts, global state transitions, and mutation entry points.
- How it was discovered: Phase 3A scanned `app.js` for rendering, event binding, state persistence, and mutation call sites.
- Operational risk: moving mutations before mapping render/event contracts could break buttons, forms, reload behavior, or location-scoped workflows without obvious syntax failures.
- LFES principle exposed it: controlled evolution, dependency visibility, and reviewer cognitive-load reduction.
- What prevented escalation: Phase 3A stopped at architecture mapping and recommended an event-contract inventory before deeper extraction.
- Fix applied or recommended: no code fix applied. Recommended next phase is Phase 3B event-contract inventory, planning only.
- Lessons learned: a file can become more modular at the service layer while still being operationally coupled at the render/event/state layer.

## 2026-05-19 - Phase 3B - Hidden DOM/Event Contract Inventory Gap

- Issue discovered: signed-in workspace workflows depend on 126 listener registrations in `bindWorkspaceEvents()`, while auth/public QR intake and signed-in request submit also use top-level or renderer-local listeners outside that function.
- How it was discovered: Phase 3B statically inventoried listener selectors, rendered IDs, and `data-*` attributes in `app.js`.
- Operational risk: future extraction could move a workflow handler while missing the DOM contract that reaches it, causing silent button/form failures without syntax errors.
- LFES principle exposed it: dependency visibility, operational continuity, and verification-boundary visibility.
- What prevented escalation: Phase 3B stopped at documentation, created `LFES_PHASE_3B_EVENT_CONTRACT_INVENTORY.md`, and kept workflow extraction blocked.
- Fix applied or recommended: no app code fix applied. Recommended next phase is a smoke-test matrix and contract guard plan before moving workflow handlers.
- Lessons learned: markup selectors, `data-*` attributes, and event handlers are part of the architecture. They need the same traceability as service wrappers and database boundaries.

## 2026-05-19 - Phase 3C - Missing Workflow Smoke Matrix Before Handler Extraction

- Issue discovered: the app had broad debug protocol coverage, but the exact workflow smoke tests tied to high-risk DOM/event contracts were not centralized before handler extraction.
- How it was discovered: Phase 3C converted the Phase 3B event inventory into workflow-specific smoke tests and contract guards.
- Operational risk: a handler extraction could pass static checks while breaking a real user path such as Quick Fix, request conversion, public QR submit, delete confirmation, or safety-check completion.
- LFES principle exposed it: verification visibility, controlled evolution, and operational continuity.
- What prevented escalation: Phase 3C stopped at planning and created `LFES_PHASE_3C_SMOKE_TEST_MATRIX.md` before workflow handlers moved.
- Fix applied or recommended: no app code fix applied. Recommended next phase is state ownership mapping before any workflow extraction.
- Lessons learned: the Debug Protocol needs phase-specific smoke paths when a refactor touches event contracts, because general app loading is not enough evidence for workflow continuity.

## 2026-05-19 - Phase 3D - Global State Ownership Concentration

- Issue discovered: `app.js` has 100 top-level mutable state variables spanning session, company, location, lists, filters, relationship maps, pending deletes, and workflow modes.
- How it was discovered: Phase 3D statically inventoried top-level `let` declarations and localStorage mirrors in `app.js`.
- Operational risk: moving workflow handlers before state ownership is explicit could desynchronize active location, selected detail records, pending delete confirmations, relationship maps, or reload filters.
- LFES principle exposed it: assumption traceability, dependency visibility, controlled evolution, and operational continuity.
- What prevented escalation: Phase 3D stopped at documentation and created `LFES_PHASE_3D_STATE_OWNERSHIP_MAP.md`.
- Fix applied or recommended: no app code fix applied. Recommended next phase is render ownership mapping before workflow extraction.
- Lessons learned: state ownership is a separate architecture boundary from service wrappers. A codebase can have cleaner data services while still being tightly coupled through shared mutable state.

## 2026-05-19 - Phase 3E - Render Output Is A Behavior Contract

- Issue discovered: many `render*` functions create mutation forms, delete confirmations, public QR boundaries, storage upload forms, and desktop/mobile command contracts rather than display-only HTML.
- How it was discovered: Phase 3E inventoried 83 render functions and the IDs, classes, and `data-*` attributes they emit.
- Operational risk: extracting or renaming render helpers could break workflow entry points even if the JavaScript still parses and services still work.
- LFES principle exposed it: render-contract traceability, dependency visibility, and controlled evolution.
- What prevented escalation: Phase 3E stopped at documentation and created `LFES_PHASE_3E_RENDER_OWNERSHIP_MAP.md`.
- Fix applied or recommended: no app code fix applied. Recommended next phase is an implementation-readiness decision before any render/helper movement.
- Lessons learned: renderers that emit forms, behavior classes, or `data-*` actions must be treated as part of workflow architecture, not just UI markup.

## 2026-05-19 - Phase 3F - Code Movement Was Technically Possible But Not Highest Value

- Issue discovered: low-risk render helper extraction is technically possible, but the evidence shows live smoke coverage and role guardrail verification are more valuable before additional code movement.
- How it was discovered: Phase 3F compared Phase 3A-3E maps, the Phase 2H mutation plan, and the current live-testing context.
- Operational risk: continuing modularization could improve structure while failing to prove technician guardrails, location persistence, and work-order workflows still behave correctly for real users.
- LFES principle exposed it: proportional rigor, verification visibility, and operational relevance.
- What prevented escalation: Phase 3F stopped at a readiness decision and did not approve code extraction.
- Fix applied or recommended: run LFES Phase 4A live smoke and technician assignment guardrail verification before more refactor.
- Lessons learned: the safest next engineering step is not always the smallest code change; during live testing, evidence from user workflows can be more valuable than additional modularity.

## 2026-05-19 - Phase 5A - Render Helper False-Safe Coupling

- Issue discovered: several render helpers that initially looked like low-risk display helpers actually emit behavior hooks or read global workflow state.
- How it was discovered: Phase 5A inspected specific helper bodies before approving render extraction candidates.
- Operational risk: moving or renaming helpers such as `renderGaugeReadout`, `renderWorkloadStrip`, pagination renderers, or request photo preview could break filters, paging, signed photo links, or relationship visibility while still passing syntax checks.
- LFES principle exposed it: render-contract traceability, hidden dependency visibility, and controlled evolution.
- What prevented escalation: Phase 5A stopped at planning, separated `SAFE FIRST EXTRACTION` from `SECRETLY COUPLED`, and kept broad render extraction blocked.
- Fix applied or recommended: no app code fix applied. Recommended Phase 5B should move only `renderMetric`, `renderInsight`, and `renderRoleGuide` first, with static checks and signed-in smoke verification.
- Lessons learned: a helper is not safe because it is short. It is safe only if it does not carry behavior contracts, global state assumptions, or operational workflow dependencies.
