# Pilot Hardening Plan

Last updated: 2026-06-02.

MaintainOps is suitable for controlled pilot and internal operational review. This plan defines what still needs to be proven before treating it as production-hardened external SaaS.

## Current Position

Status: controlled pilot / internal operational review ready.

Do not describe MaintainOps as fully production disaster-recovery ready until backup and restore validation is complete. Do not expand public intake beyond controlled review until support ownership, routing, and abuse handling are confirmed.

## Hardening Gates

### 1. Backup And Restore

Goal: prove that operational data can be recovered into a usable app environment.

Required before broader production dependence:

- Choose a restore path: Supabase managed restore or a restore-test Supabase project.
- Capture database schema, table data, RLS policies, grants, RPC functions, auth recovery/reinvite steps, storage buckets, storage objects, and app config values.
- Run the restore into a separate target.
- Point a local app config at the restored target.
- Verify sign-in or reinvite flow, company selection, workspace load, storage signed URLs, and representative work-order records.
- Record restore duration, manual steps, missing objects, and any accepted limitations.

Current status: ACTION NEEDED. See `docs/BACKUP_RESTORE_VALIDATION.md`.

### 2. Incident And Support Process

Goal: make ownership clear when a pilot user is blocked.

Minimum pilot process:

- Define a primary support owner and backup owner.
- Define how users report urgent issues outside the app if login or public intake is unavailable.
- Define severity levels for login outage, data isolation concern, failed photo upload, public request abuse, lost work-order data, and GitHub Pages outage.
- Define the first response action for each severity level.
- Keep an incident note with date, affected workflow, impact, fix or workaround, and follow-up test.

Current status: not yet documented as an operating runbook.

### 3. Public Request Rollout

Goal: keep public QR/link intake useful without creating avoidable support or abuse risk.

Before wider public posting:

- Confirm the final public request wording for Taylor Metal pilot locations.
- Confirm who receives and triages new public requests.
- Confirm what information requesters should include and what should never be requested through the public form.
- Confirm QR/link placement by location.
- Confirm the 10-submissions-per-minute rate limit remains acceptable for expected usage.
- Re-run public request token, invalid submit, photo attach, and resource-load smokes after any copy, routing, or SQL change.

Current status: intake exists and has security/rate-limit hardening; final production copy, routing, and support process remain open.

### 4. Mobile And Photo Verification

Goal: prove the field workflows work on the devices used by technicians.

Pilot verification should cover:

- Login and session recovery on the primary phone browser.
- Quick Fix creation from a phone.
- Work-order photo upload from camera and photo library.
- Maintenance request photo upload.
- Equipment file/photo viewing where relevant.
- Part document/photo viewing where relevant.
- Location switch behavior for manager/admin and Mobile tech users.
- Offline or poor-signal expectation: what fails clearly, what can be retried, and what users should do.

Current status: desktop/mobile layout and targeted smoke coverage exist, but device-specific pilot verification should be recorded.

### 5. Controlled User Onboarding

Goal: add pilot users without role, location, or expectation drift.

For each pilot user:

- Confirm user name, email, company, role, and intended default location before invite.
- Confirm whether Mobile tech should be enabled.
- Confirm first login reaches the expected company and location.
- Confirm the user can perform one expected workflow and cannot perform one role-forbidden workflow.
- Confirm how the user should request support.
- Remove or archive any setup/test records created during onboarding if they could confuse live queues.

Current status: team invites and role management exist; default location on invite is deferred.

## Verification Language

Use these labels when reporting hardening work:

- PASS: verified with the named check.
- FAIL: checked and did not meet expectation.
- NOT VERIFIED: not checked, blocked, or not possible in the current environment.
- ACTION NEEDED: requires user, Supabase dashboard, production account, device, or external state.

## Stop Rules

Stop and escalate before continuing if:

- A restore cannot prove data, storage, and auth recovery assumptions.
- Any cross-company or role-boundary check fails.
- Public request intake accepts invalid tokens, mismatched photo attachments, or direct anonymous table access.
- A mobile/photo workflow silently loses user data.
- The active location shown to a user differs from the intended pilot location.
- A support or incident path depends on a single unavailable person.
