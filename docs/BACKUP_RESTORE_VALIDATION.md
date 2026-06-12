# Backup And Restore Validation

Last checked: 2026-06-11.

This document records the current backup/restore posture for MaintainOps and the validated restore procedure.

## Current Result

**Restore validation: PASS (first drill completed 2026-06-11).**

A daily physical backup (12 Jun 2026 07:59 UTC) was restored into a new scratch project (`taylor-restore-drill`) using the Supabase dashboard "Restore to new project" flow. The restored database matched live production exactly on every checked table:

| Table | Live | Restored |
|---|---:|---:|
| companies | 7 | 7 |
| company_members | 13 | 13 |
| work_orders | 24 | 24 |
| assets | 94 | 94 |
| parts | 4 | 4 |
| maintenance_requests | 11 | 11 |
| messages | 7 | 7 |
| company_invites | 6 | 6 |

Spot checks: known equipment ("New thalmann") present; newest work order timestamp consistent with the backup window; work_order_photos metadata rows present (13).

Restore duration: about 3 minutes from confirmation to ACTIVE_HEALTHY. Additional cost shown by the dashboard: $0 (the drill project should still be deleted after validation).

## Validated Restore Procedure

1. Dashboard → Taylor project → Database → Backups → **Restore to new project** tab.
   - Never use the plain "Restore" buttons on the Scheduled backups tab — those overwrite the live project.
2. Pick the newest backup → Restore → Continue.
3. Name the new project (e.g. `taylor-restore-drill`), set a generated database password (store it in a password manager), submit.
4. Wait for ACTIVE_HEALTHY (~3 minutes observed; poll with `npx supabase projects list`).
5. Verify with row-count comparison between live and restored (SQL editor on both), plus named-record spot checks.
6. For a drill: delete the restored project after validation (Project Settings → General → Delete project — triple-check the project name).
7. For a real recovery: repoint `supabase-config.js` at the restored project, then complete the manual reconfiguration list below.

## Known Gaps (confirmed by the dashboard during the drill)

Database backups DO NOT include:

1. **Storage objects** — work-order photos, equipment files, part documents, and company logos are NOT backed up by Supabase. Only their metadata rows are. MITIGATION (2026-06-11): `npm run backup:storage` (`scripts/storage-backup-mirror.js`) mirrors all buckets to a local directory incrementally; requires `MAINTAINOPS_SERVICE_ROLE_KEY` in env (fetch via `npx supabase projects api-keys`; never commit it). First full mirror completed: 172 objects across 5 buckets, 0 errors. Run it at least weekly until scheduled.
2. **Edge Functions** — `request-emailer` must be redeployed from the repo (`npx supabase functions deploy request-emailer --project-ref <new-ref>`) and its env vars (Google Apps Script webhook URL/secret, app URL) re-entered.
3. **Auth settings & API keys** — Auth URL configuration (callback URLs) must be re-entered; the new project has new anon/service keys, so `supabase-config.js` must be updated.
4. **Database extensions/settings and read replicas** — re-check after restore.

Auth USERS and passwords ARE included in the database restore (they live in the `auth` schema), so users do not need to re-register.

## Disaster Recovery Statement

MaintainOps can now claim a tested database recovery path with roughly one day of maximum data loss (daily backups) plus the manual reconfiguration steps above. It cannot yet claim recovery of stored files (photos/documents) — that requires the storage mirror noted in gap 1.

Next maturity steps:

- schedule the restore drill quarterly
- build the storage-objects mirror/backup script
- consider the PITR add-on if sub-day recovery point becomes necessary
