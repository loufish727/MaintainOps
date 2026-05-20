# LFES Phase 9H App.js Cleanup Readiness Decision

Date: 2026-05-20

## Purpose

Phase 9H decides whether MaintainOps should continue `app.js` display-helper extraction immediately after Phase 9G, or whether the next safest move is additional runtime evidence.

This phase is planning/documentation only.

## Evidence Reviewed

- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/QA_LOG.md`
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- `docs/LFES/audits/LFES_PHASE_9F_APP_JS_CLEANUP_READINESS.md`
- `app.js`
- current `src/render/*` modules

## Current State

Phase 9G is fully closed:

- local extraction: PASS
- package/upload: PASS
- live resource verification: PASS
- GitHub Actions Resource Load Smoke: PASS
- Pages build/deployment: PASS
- signed-in live UI smoke: PASS

Important caveat:

- Messages had `0 threads` during both local and live Phase 9G smoke.
- The Messages empty state was verified.
- Non-empty message bubbles were not data-exercised.

## Candidate Evaluation

| Candidate | Estimated Value | Risk | Verification Available Now | Decision |
| --- | --- | --- | --- | --- |
| Non-empty Messages smoke | High for Phase 9G confidence | Low/Medium because it may create live message data | Requires explicit approval for live mutation or safe existing thread data | RECOMMENDED NEXT |
| Pure message formatting helpers (`formatMessageTime`, `formatMessageDay`, `initials`) | Low/Medium | Low code risk, but affects unexercised message output | Weak until non-empty Messages data exists | DEFER |
| Pure asset labels (`assetTypeLabel`, `assetStatusLabel`) | Low | Low | Equipment/Work Orders smoke can verify | SAFE LATER, LOW VALUE |
| Empty-state text helpers | Low | Low/Medium due global search/filter state | Section smoke can verify | SAFE LATER, LOW VALUE |
| Message thread buttons / composer | Medium line reduction | High behavior/event/mutation coupling | Requires message workflow smoke | BLOCKED |
| Notice/status/toast helpers | Low | Medium/High due global timer and `renderWorkspace()` | Requires notice lifecycle smoke | BLOCKED |
| Admin readiness helpers | Medium | Medium due `data-setup-action` | Requires Admin Setup action smoke | BLOCKED |
| Parts/equipment/request/public QR renderers | Medium/High | High/Critical workflow coupling | Requires mutation and delete/storage smoke | BLOCKED |

## Decision

Do not recommend immediate Phase 9I code extraction yet.

Reason:

- Phase 9G moved message bubble/list display helpers.
- The app has verified the empty Messages state, but not actual message bubbles.
- Moving more message-adjacent helpers before non-empty message evidence would stack unverified display risk.
- The remaining clearly pure label helpers are technically safe, but low-value enough that they do not justify another extraction before closing the message data caveat.

## Recommended Next Controlled Phase

Recommended next phase:

- LFES Phase 9I non-empty Messages smoke, if explicitly approved.

Scope:

- no code changes
- no helper extraction
- no Supabase SQL/RLS changes
- no workflow refactor
- use an existing safe message thread if one exists, or create a minimal safe message thread only with explicit approval
- verify message list, message bubble, sender initials, timestamp/day divider, thread button summary, and core section navigation afterward
- document any live data created and whether cleanup is available

If live message mutation is not approved:

- keep the non-empty message bubble result as `NOT VERIFIED`
- continue live pilot monitoring
- defer further app.js extraction

## Safe Later Code Candidate

If app.js cleanup resumes after non-empty message display is verified, the next narrow code candidate can be one of:

- pure message formatting helpers:
  - `formatMessageTime`
  - `formatMessageDay`
  - `initials`
- pure equipment label helpers:
  - `assetTypeLabel`
  - `assetStatusLabel`

These should be implemented only as a tiny, single-purpose phase with:

- static JavaScript checks
- resource smoke if a new file is created
- signed-in local smoke
- live signed-in smoke if packaged/uploaded

## Remains Blocked

- Phase 9I code implementation without a fresh approval.
- `renderMessageCenter`.
- `renderMessageThreadButton`.
- `renderLinkedWorkMessageThread`.
- message composer forms.
- thread creation/send/read mutations, except a manually approved live smoke using safe owned accounts.
- event handlers.
- Supabase calls.
- auth/session/company/location logic.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.
- notice/status/toast helper movement.
- admin readiness display movement.
- issue report display movement.
- public QR rendering and submit flow.
- parts and equipment rendering.
- Team invite/member/default-location rendering.
- work-order lifecycle and command-card movement.
- Supabase SQL/RLS changes.

## Verification

Documentation-only phase:

- app behavior changed: no
- app code changed: no
- Supabase SQL/RLS changed: no
- runtime smoke required: no

Result:

- Phase 9H planning/readiness: PASS
