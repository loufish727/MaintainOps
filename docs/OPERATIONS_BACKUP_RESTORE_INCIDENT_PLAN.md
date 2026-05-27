# MaintainOps Backup, Restore, And Incident Plan

This plan covers the current MaintainOps pilot posture. It is not a replacement for Supabase platform documentation, but it defines the app-level expectations before broader external rollout.

## Current Recovery Objective

- Controlled pilot target: recover from accidental app/data changes with limited manual intervention.
- Current acceptable posture: documented backup ownership, restore path, and incident checklist.
- Not yet claimed: fully automated disaster recovery with tested point-in-time restore drills.

## Systems In Scope

- Supabase Auth users.
- Supabase Postgres app tables.
- Supabase RPC functions and RLS policies.
- Supabase Storage buckets:
  - work-order photos
  - maintenance request photos
  - company logos
  - part documents
- GitHub Pages static frontend.
- GitHub repository source and SQL migration files.

## Backup Sources

- Database: Supabase project backups / point-in-time recovery if enabled for the project tier.
- Schema/source: repository SQL files under `supabase/`.
- Frontend: Git repository history.
- Storage objects: Supabase Storage bucket contents.
- Operational evidence: `docs/QA_LOG.md`, current handoff docs, and RLS checkpoint docs.

## Minimum Backup Expectations Before Broader Rollout

1. Confirm Supabase database backup capability and retention for the active project tier.
2. Export or otherwise preserve storage bucket contents on a defined cadence.
3. Keep all SQL changes represented in source control.
4. Record the deployed frontend commit after production-impacting changes.
5. Keep a short incident note for any production-affecting issue, including date, symptom, impact, fix, and follow-up.

## Restore Checklist

Use this if data loss, corruption, or broken deployment is suspected.

1. Stop making nonessential changes.
2. Capture current state:
   - current Git commit
   - app cache tag in `index.html`
   - affected company/location/user path
   - browser console errors if visible
   - Supabase error messages if visible
3. Determine impact:
   - frontend-only
   - database data
   - storage object
   - auth/session
   - RLS/policy/RPC
4. Frontend-only rollback:
   - revert or redeploy the last known good Git commit
   - bump cache tags if app files changed
   - run hosted resource smoke
   - run one signed-in smoke for the affected workflow
5. Database restore:
   - do not run cleanup SQL blindly
   - identify affected tables and records first
   - prefer point-in-time restore or targeted repair from known source data
   - re-run RLS/public access checks after any policy/RPC restore
6. Storage restore:
   - identify bucket and object paths
   - restore missing objects from backup if available
   - verify signed URL/read behavior through the app
7. Close the incident:
   - document root cause
   - document records/files touched
   - document verification performed
   - add follow-up prevention work if needed

## Incident Severity

- Sev 1: cross-company data exposure, data loss across many records, auth/RLS bypass, or app unavailable to all users.
- Sev 2: workflow broken for a role/company/location, storage upload/read broken, public intake broken, or destructive action behaves unexpectedly.
- Sev 3: display issue, stale cache, noncritical smoke failure, or isolated workflow annoyance with workaround.

## Required Follow-Up After Any Sev 1 Or Sev 2

- Re-run hosted resource smoke.
- Re-run affected workflow smoke.
- If auth/RLS/public intake/storage was involved, re-run the relevant security/RLS checks.
- Update `docs/CURRENT_HANDOFF.md` and `docs/QA_LOG.md`.

## Current Gaps

- Backup retention and restore drill status must be confirmed against the active Supabase project tier.
- Storage export cadence is not yet documented as an automated process.
- No recurring restore drill has been completed and documented yet.
