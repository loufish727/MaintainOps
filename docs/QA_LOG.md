# QA Log

This public QA log intentionally stays high-level. Detailed phase logs, user-specific context, and internal LFES catch history live in private/local handoff files.

## Current Verification Baseline

- Static JavaScript syntax checks for touched files.
- Targeted smoke tests for touched workflows.
- Hosted resource smoke for GitHub Pages.
- GitHub Actions Resource Load Smoke after deploy.
- Static SQL security audit for Supabase SQL/RPC surface.
- Security boundary probes when auth/test credentials and live setup are available.

## Recent Verification Notes

- 2026-09-22: Equipment asset tags have focused workflow, display/escaping, search, CSV, and isolated PostgreSQL upgrade/RLS/retention coverage. Signed-in Chromium and WebKit lifecycle tests passed at desktop and 390px mobile widths against the isolated QA backend, including real database persistence and exact fixture cleanup. Run `tests/smoke/equipment-asset-tag-live.spec.js` with QA credentials and `LFES_EQUIPMENT_TAG_MUTATIONS=1`; it rejects the production backend. Browser engines and responsive layouts do not constitute a physical-phone test.
- Equipment-tag release checkpoint `5fa329a`: Full Strict LFES passed 13/13 with a clean worktree. Production migration postflight verified unchanged existing identifiers, row counts, and RLS policies; no production mutation tests were run.

- 2026-09-22: Team cards expose saved default locations, including unset/unavailable states and location-name search. Account-switching regressions reproduced the previous account's location taking precedence over the next user's default, both in the helper and through actual QA sign-out/sign-in. The fix ignores legacy preferences once, remembers future selections by user/company, and rejects stale core-location loads after an account/company change. Full Strict passed 13/13 at clean code checkpoint `68fa707`; focused Chromium and WebKit sign-in tests passed, including fresh contexts, contaminated legacy preferences, and same-user reloads. No production membership, default-location, or database-policy changes were made. This does not claim a signed-in production-account reproduction.

- 2026-09-18 production rollout: PR #49 (`6ced496`) passed required Release Gate,
  Pages and hosted smoke after all five database prerequisites passed postflight.
  Signed-in Taylor browsing caught a further work-list/detail-cache isolation
  defect; its regression first failed on deployed source and follow-up separates
  server-page membership without adding reloads. Exact evidence and follow-up
  status are in `docs/APP_WIDE_VERIFICATION.md`.

- 2026-09-18: App-wide pre-release review corrected 11 app defects plus a Windows test-runner argument bug. Twenty isolated workflow/navigation scenarios passed in each of Chromium and WebKit, followed by full Strict, authenticated boundaries/roles/Production lifecycles and messaging regressions. Exact cleanup retained the manual QA baseline. Two new database migrations are testing-only; no push or production deployment occurred. `docs/APP_WIDE_VERIFICATION.md` records the evidence matrix and unproven device/provider paths.

- 2026-09-17: Messaging review adds paged metadata/latest previews, bounded conversation history, memory-only scoped drafts, safe retry IDs, message-only reloads, accurate hide wording and mobile inbox/conversation navigation. The isolated signed-in lifecycle exercises creation/reply/delete/hide, partial failures and read-only UI. See `docs/MESSAGING_VERIFICATION.md` for exact contracts, automated checks and remaining limits. No production data or database policies changed.

- 2026-07-06: Accounting read-only boundary hardening applied to live Supabase. Financial records now read through admin/manager/accounting RLS and write through admin/accounting RLS; operational mutations use `private.is_company_operational_editor(company_id)` so accounting remains view-only outside Financial. Verified with SQL policy catalog query, static security audit, security boundary probe, broad non-live Node smokes, local resource smoke, work-attach browser smoke, and targeted Setup storage navigation smoke.
- Team join-link frontend shipped with targeted display/workflow smokes.
- The live browser check caught and fixed a false successful-team-access warning after join-link acceptance was paired with legacy invite acceptance.
- Request-emailer remains public-request-only; team invite email support was reverted.

## QA Rule

A resource-load smoke proves assets load. It does not prove user workflow behavior. Any changed workflow still needs a targeted behavior smoke.
# 2026-09-18 Live Return-Scope Follow-Up

- Read-only production retesting after PR #50 reproduced My Work page membership
  under Work Orders labels when returning from a Planning original.
- PR #51 tracks the loaded section/page and conditionally loads the destination
  on detail, Messages and Performance return; no same-page refresh or polling.
- The Node regression failed before the correction. Full Strict passed 13/13 at
  clean code checkpoint `b60a85b`; signed-in scope/exit regressions and final
  release evidence are recorded on PR #51 and in the private release logs.
