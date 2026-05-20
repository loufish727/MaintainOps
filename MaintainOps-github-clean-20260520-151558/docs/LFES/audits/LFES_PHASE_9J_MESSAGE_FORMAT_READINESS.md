# LFES Phase 9J Message Format Readiness Decision

Date: 2026-05-20

## Purpose

Phase 9J decides the next safe code movement after Phase 9I verified non-empty message rendering on the live app.

This phase is planning/documentation only.

## Evidence Reviewed

- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/QA_LOG.md`
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- `docs/LFES/audits/LFES_PHASE_9H_APP_JS_CLEANUP_READINESS.md`
- Phase 9I live non-empty Messages smoke evidence
- `app.js`
- `src/render/messageDisplay.js`

## Current State

Phase 9I verified the Phase 9G message display extraction with real message data:

- thread button summary rendered
- one message bubble rendered
- sender initials rendered
- `Today` day divider rendered
- timestamp rendered
- core sections loaded afterward
- no visible app errors
- no browser warning/error logs

## Candidate Evaluation

| Candidate | Estimated Line Reduction | Risk | Why | Decision |
| --- | ---: | --- | --- | --- |
| `formatMessageTime`, `formatMessageDay`, `initials` | 25-40 | Low | Pure message display formatting, no Supabase, no DOM events, no mutations, already used by `messageDisplay.js` through explicit deps | RECOMMENDED |
| `messageComposerScopeNote` | 3-8 | Medium | Reads active location through `activeLocationName()` and belongs to composer behavior | DEFER |
| `messageThreadScopeLabel`, `directThreadNames` | 10-25 | Medium | Reads thread members, locations, and team names; affects thread filtering/search summaries | DEFER |
| `renderMessageNavBadge` | 5-10 | Medium | Depends on unread state and navigation badge behavior | DEFER |
| `renderMessageThreadButton` | 20-35 | High | Emits `data-message-thread` behavior hook | BLOCKED |
| `renderMessageCenter` | 100+ | High/Critical | Owns composer forms, reply form, filters, linked work controls, and message workflow markup | BLOCKED |

## Decision

Approve a narrow Phase 9K implementation:

- create `src/render/messageFormatting.js`
- move only:
  - `formatMessageTime`
  - `formatMessageDay`
  - `initials`
- expose them through `window.MaintainOpsMessageFormatting`
- update `app.js` to import them from that namespace
- keep `renderMessageCenter`, `renderMessageThreadButton`, composer forms, filters, thread mutation, reply mutation, and event handlers in `app.js`

## Required Phase 9K Guardrails

Phase 9K must:

- preserve exact helper behavior
- update `index.html` script loading before `messageDisplay.js` and `app.js`
- bump the `app.js` cache tag
- update `tests/smoke/resource-load.spec.js`
- run static JavaScript checks
- run local resource smoke
- run signed-in local smoke focused on Messages with non-empty thread data and core sections
- update QA and handoff docs

## Remains Blocked

- `renderMessageCenter`
- `renderMessageThreadButton`
- `renderLinkedWorkMessageThread`
- message composer forms
- thread creation/send/read mutations
- event handlers
- Supabase calls
- auth/session/company/location logic
- `renderWorkspace()`
- `bindWorkspaceEvents()`
- Supabase SQL/RLS

## Verification

Documentation-only phase:

- app behavior changed: no
- app code changed: no
- Supabase SQL/RLS changed: no
- runtime smoke required: no

Result:

- Phase 9J planning/readiness: PASS
