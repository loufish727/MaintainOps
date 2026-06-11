# Backup And Restore Validation

Last checked: 2026-06-11.

This document records the current backup/restore posture for MaintainOps and the result of the first restore-validation pass.

## Current Result

Restore validation is not complete.

The current Supabase project has been upgraded to Pro, so the original Free-plan blocker is no longer the blocker.

What is now confirmed:

- Supabase Pro is active.
- `npx supabase backups list --project-ref lbphkzznvvumemdkqoay` lists completed daily physical backups.
- Confirmed available backups:
  - 2026-06-11 07:59:29 UTC
  - 2026-06-10 08:00:03 UTC
  - 2026-06-09 07:58:43 UTC
  - 2026-06-08 07:58:20 UTC
  - 2026-06-07 07:56:34 UTC
  - 2026-06-06 07:54:28 UTC
  - 2026-06-05 07:55:25 UTC
  - 2026-06-04 07:56:35 UTC

What is still missing:

- perform one restore into a scratch/restored project
- point a local/test app config at that restored project
- verify auth/onboarding path, data reads, RLS, RPCs, and storage behavior
- record restore duration, missing pieces, and manual recovery actions

Because no restore drill has been completed yet, MaintainOps should not claim disaster-recovery readiness.

## Local Tooling Result

The current local machine does not have the full tooling needed for a local database restore simulation:

- Supabase CLI: available through `npx supabase`.
- `psql`: not available.
- Docker/Postgres runtime: not available.

This means a local restore dry run cannot currently be performed from this workspace alone without adding `psql` and/or a local Postgres/Docker restore target.

## What The Repository Can Rebuild

The repository contains the app source, SQL schema, and incremental SQL step files:

- `supabase/schema.sql`
- `supabase/step-next-*.sql`
- app frontend files
- auth callback files
- smoke/security probe scripts

This is enough to rebuild a project structure manually in a clean Supabase project, but it is not the same as a verified backup restore.

The repo does not by itself contain:

- Supabase Auth users/passwords/sessions.
- live table data snapshots.
- storage object bytes.
- database extension/runtime state outside the checked-in SQL.
- a known-good restore target configuration.

## Current Backup Gap

For real production dependence, MaintainOps needs a tested recovery path that includes:

- database schema
- table data
- RLS policies
- grants
- RPC functions
- auth users or an account recovery/reinvite process
- storage buckets
- storage object files
- app environment/config values

At the moment, the security posture is better verified than the operational recovery posture.

## Required Path To Complete Restore Validation

Use one of these paths.

### Required: Supabase Managed Restore

1. Confirm the Pro project has a recent managed backup. Completed 2026-06-11.
2. Use Supabase dashboard restore tooling to create a scratch/restored project.
3. Capture the restored project's URL and publishable anon key.
4. Temporarily point local `supabase-config.js` at the restored project.
5. Run:

```bash
npm run test:security:static
npm run test:security:boundary
npm run test:smoke:resources
```

6. Sign in or create/reinvite a test user in the restored project.
7. Verify the app loads company/workspace data.
8. Verify storage buckets and signed URL behavior.
9. Verify request-emailer and auth callback config are either intentionally disabled or restored.
10. Record restore duration, missing pieces, and manual recovery actions.

Current hard stop:

Supabase's "Restore to a New Project" flow creates a new independent project and presents costs before starting. Do not trigger the restore until the operator explicitly approves that cost/action in the Supabase dashboard.

### Alternate: Manual Rebuild Restore Drill

This validates rebuildability, not full production backup recovery.

1. Create a separate Supabase restore-test project.
2. Run `supabase/schema.sql`.
3. Run the current `supabase/step-next-*.sql` files that are not already represented in the schema.
4. Configure auth redirect URLs for the restore-test project.
5. Create/reinvite test users.
6. Seed representative company/location/work-order data.
7. Create required storage buckets and policies through SQL.
8. Point local `supabase-config.js` at the restore-test project.
9. Run smoke and security probes.
10. Document all manual gaps.

This path does not prove live data recovery unless table data and storage objects are also exported and restored.

## Storage Recovery Notes

Storage must be treated as a separate restore concern.

Known buckets:

- `work-order-photos`
- `maintenance-request-photos`
- `company-logos`
- `part-documents`

For production readiness, storage object backup must be validated separately from database schema/table restore.

## Provisional Incident Guidance

Until restore validation is complete:

- Do not claim full production disaster-recovery readiness.
- Treat the live database as pilot/internal operational data only.
- Export critical data before high-risk database work.
- Keep SQL changes reversible where possible.
- Use a restore-test project before major schema rewrites.

## Current Status

OPERATOR ACTION REQUIRED:

Supabase Pro removes the prior plan blocker. The remaining required step is an actual restore drill into a scratch/restored project and documentation of the result.
