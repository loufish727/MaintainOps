# Documentation Drift Review - 2026-05-27

## Purpose

This review reconciles MaintainOps documentation after the 2026-05-27 RLS hardening and auth verification callback work.

## Scope Reviewed

- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/QA_LOG.md`
- `docs/SUPABASE_SETUP.md`
- `docs/LFES/audits/RLS_LIVE_CHECKPOINT_2026-05-27.md`

## Drift Found

- `docs/NEXT_STEPS.md` still described the 2026-05-26 / `e7c1a70` state-boundary checkpoint as current, even after RLS hardening and auth callback verification had shipped.
- `docs/CURRENT_HANDOFF.md` still carried stale `ACTION NEEDED` language for the earlier `e7c1a70` GitHub Actions verifier limitation, even though later RLS/auth checkpoints recovered Actions proof through public run pages.
- `docs/LFES/audits/RLS_LIVE_CHECKPOINT_2026-05-27.md` had an early note saying the QA Facility lacked a visible location and QR-link role denial still needed proof, while later verification showed the QA fixture and real-location denial test passed.
- `docs/SUPABASE_SETUP.md` did not list the newer SQL step files created during RLS hardening and related source-control cleanup.

## Corrections Applied

- Updated `docs/NEXT_STEPS.md` to make `41a0fe9` (`Add Supabase auth verification callback`) the current app behavior checkpoint and `bf4cabe` (`Document real signup verification pass`) the current documentation checkpoint.
- Updated current cache-tag references to `auth-callback-1` and preserved the older `lfes-state-message-ui-1` cache tag as the latest state-factory checkpoint.
- Reframed the `e7c1a70` GitHub Actions limitation as a historical tooling limitation, not a current stop.
- Updated the RLS live checkpoint to reflect the completed QA location fixture and public request-link role-denial proof.
- Added missing SQL step files to the Supabase setup/current-step list.
- Added this review entry and a QA log note so the cleanup is traceable.

## Current Source Of Truth

- Current app behavior checkpoint: `41a0fe9` (`Add Supabase auth verification callback`).
- Current real-world auth verification documentation checkpoint: `bf4cabe` (`Document real signup verification pass`).
- Current RLS hardening checkpoint: `49d8961` (`Complete live RLS hardening checkpoint`), with Actions proof documented in `105b57e`.
- Current state-factory checkpoint: `e7c1a70` (`Wire message UI state to workspace factory`).

## Verification

Targeted stale-language search was run against the active handoff/setup/audit docs and returned no matches for the known conflicting phrases:

- old 2026-05-26 current-state wording
- stale `e7c1a70` current-app behavior wording
- stale `ACTION NEEDED` Actions-verifier stop
- stale QA Facility no-location / QR-link denial-needed wording
- stale "commit updated SQL/docs before switching" wording

## Remaining Intentional Notes

Historical references to `e7c1a70` remain valid where they describe the message UI state checkpoint. They should not be treated as current app behavior.

The remaining verifier-process improvement is to install/configure `gh` or provide an authenticated GitHub API verifier path so future Actions proof does not depend on unauthenticated public lookups.
