# Applied Migration Tracking

This file closes the review gap where the repository contains many `supabase/step-next-*.sql` files but the live application state is not obvious from Git alone.

## Current Status

Tracking has been introduced after many SQL steps were already applied manually through the Supabase dashboard. Older rows still must be backfilled from live database inspection and known handoff history.

## Source Of Truth Going Forward

Preferred live source:

- `public.applied_migrations`

Live status:

- `supabase/step-next-applied-migrations.sql` was applied to project `lbphkzznvvumemdkqoay` on 2026-06-11 through `npx supabase db query --linked --file`.
- Initial rows were backfilled for `step-next-applied-migrations.sql` and `step-next-invite-links.sql`.

Repo source:

- this file records known manual state when live access is not available.

## Known Recently Applied

| SQL file | Live status | Evidence |
|---|---|---|
| `supabase/step-next-accounting-role.sql` | Applied | Applied to project `lbphkzznvvumemdkqoay` with Supabase CLI on 2026-07-01; verified `company_members`/`company_invites` role constraints include `accounting`, verified `update_company_member_role` and `create_company_invite` include `accounting`, and recorded in `public.applied_migrations`. |
| `supabase/step-next-asset-financials.sql` | Applied | Applied to project `lbphkzznvvumemdkqoay` with Supabase CLI on 2026-07-01; verified `asset_financials` columns, grants, RLS policies, and recorded in `public.applied_migrations`. |
| `supabase/step-next-asset-audit-fields.sql` | Applied | Applied to project `lbphkzznvvumemdkqoay` with Supabase CLI on 2026-07-01; `information_schema.columns` verified `manufacturer` and `model` exist on `public.assets`. |
| `supabase/step-next-applied-migrations.sql` | Applied | Applied with Supabase CLI on 2026-06-11; query verified rows exist in `public.applied_migrations`. |
| `supabase/step-next-invite-links.sql` | Applied | User confirmed SQL success on 2026-06-11; frontend join-link phase verified live afterward. |

## Known Needs Confirmation

| SQL file | Reason |
|---|---|
| `supabase/step-next-audit-log.sql` | SQL foundation exists in repo, but live application status was unknown in the 2026-06-11 review. |

## Rule

Every new SQL run should record:

- SQL file name
- applied timestamp
- project ref
- who/what applied it
- verification performed
- rollback note if applicable
