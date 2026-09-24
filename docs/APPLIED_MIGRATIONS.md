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
- The first dated migration file now exists in the repo at `supabase/migrations/202607061430_applied_migration_metadata.sql`; it is not listed as applied until live execution and verification are completed.
- `supabase/migrations/202607201200_work_order_type_taxonomy.sql` maps legacy work-order types to the Corrective/Preventive/Fabrication taxonomy; live status is recorded below after execution and verification.
- `supabase/migrations/202607201330_work_order_priority_rank.sql` adds a generated priority rank used for correct Critical-to-Low work-order sorting; production and testing-platform application are recorded below.
- `supabase/migrations/202607211200_app_performance_telemetry.sql` adds privacy-limited, company-scoped browser performance samples and aggregate dashboard RPCs; testing-platform and production application are recorded below.
- `supabase/migrations/202607271000_workspace_work_order_counts.sql` adds one company/location-scoped dashboard count RPC; testing-platform and production application are recorded below.
- `supabase/migrations/202607281200_performance_vital_session_dedup.sql` changes only the performance aggregate RPC so repeated Web Vital captures count once per browser session; testing-platform and production application are recorded below.
- `supabase/migrations/202607291200_performance_measurement_integrity.sql` versions performance samples so only visibility-safe, non-automated generation-2 measurements drive the dashboard; testing-platform and production application are recorded below.
- `supabase/migrations/202608041200_production_actions.sql` adds the Production role, work-order Production Actions, My Work routing, completion guards, and automatic history; testing-platform and production application are recorded below.
- `supabase/migrations/202608051200_production_ready_notifications.sql` adds recipient-only in-app Production Ready notifications, assigned-technician routing, creator/manager fallback routing, and read tracking without changing work-order status or sending email; testing-platform and production application are recorded below.

Repo source:

- this file records known manual state when live access is not available.
- `npm run migration:apply -- 202607061430_applied_migration_metadata.sql` is the helper entry point for dated migration review and linked-project execution.

## Known Recently Applied

### Equipment Asset Tag, 2026-09-22

- `supabase/migrations/202609222255_equipment_asset_tag.sql`: applied to isolated QA project `fsxqrngpaseqdxijggcm`, then production `lbphkzznvvumemdkqoay` on 2026-09-22 through Supabase `apply_migration`, after targeted browser proof and clean Full Strict LFES 13/13 at `5fa329a`.
- Adds nullable operational `assets.asset_tag` and retained `asset_financials.archived_asset_tag`; existing serials, accounting fixed asset numbers, grants, and RLS remain unchanged. No backfill.
- Rollback: revert the frontend only; retain the additive columns and archive support to avoid losing newly entered tags.
- Verification: isolated PostgreSQL proves upgrade from the previous table shape, repeat application, unchanged existing identifiers, four operational writer roles, accounting read-only, cross-company denial, and retention with/without an existing finance row. Signed-in Chromium and WebKit prove create/edit/clear/reopen, history, tag search, CSV, accounting read-only UI/API, and retained Financials display. Each browser run removes only its disposable QA fixture.
- Production postflight retained 141 equipment and 6 financial records, with identical serial/financial-identifier and RLS-policy fingerprints. Both new columns are nullable text, the retention trigger includes the tag, and no tags were backfilled. Application and verification are recorded in `public.applied_migrations` in both projects. SQL SHA256: `a316b935fed36749821145a858c171a7acde9af119208a100e7d2588613f835a`.

| SQL file | Live status | Evidence |
|---|---|---|
| `supabase/migrations/202608051200_production_ready_notifications.sql` | Applied | Applied to testing project `fsxqrngpaseqdxijggcm`, then production project `lbphkzznvvumemdkqoay` on 2026-08-05. Local Full Strict LFES passed before live application. The private signed-in lifecycle then created one disposable assigned order, completed its Production Action as the Production user, proved exactly one technician-scoped notification and Production Ready badge, opened the exact order from Messages, persisted `read_at`, preserved the order as open and assigned, observed zero email function/outbox requests, and removed the temporary order, events, and notification. Testing returned to 6 members, 8 work orders, 14 work-order events, and 0 notifications. Production preflight/postflight retained 21 members, 123 work orders, and 705 work-order events while adding an empty RLS table with two recipient-only policies, authenticated SELECT, `read_at`-only UPDATE, no authenticated INSERT/DELETE or other-column UPDATE, and a security-definer trigger function with pinned `search_path`. Both applications were recorded in `public.applied_migrations`; no operational rows were changed. |
| `supabase/migrations/202608041200_production_actions.sql` | Applied | Applied to testing project `fsxqrngpaseqdxijggcm`, then production project `lbphkzznvvumemdkqoay` on 2026-08-04. Local Full Strict LFES passed on commit `6b7c71a`; Release Gate run `30933794766`, five-role Authenticated LFES run `30933804371`, Pages deployment `30934076280`, and Hosted App Smoke `30934135722` passed. Testing preflight/postflight retained 5 prior members and 8 work orders; its signed-in Production lifecycle proved assignment, Team drill-down, My Work routing, completion blocking, action completion, queue removal, cleanup, and automatic history. Production preflight/postflight retained 21 members, 120 work orders, and 685 work-order events while adding 7 columns, 5 constraints, 2 work-order triggers, the Production role constraint, and the authenticated-only count RPC. Justin Werber's single Taylor Metal Products Salem membership changed from Technician to Production; his existing normal work-order assignment remained. Both applications were recorded in `public.applied_migrations`. |
| `supabase/migrations/202607291200_performance_measurement_integrity.sql` | Applied | Applied to testing project `fsxqrngpaseqdxijggcm`, then production project `lbphkzznvvumemdkqoay` on 2026-07-29 after focused telemetry, SQL-security, migration-static, bundle, desktop/mobile Performance, isolated-schema, authenticated boundary, and full Strict LFES verification. Testing retained 819 generation-1 samples, accepted generation-2 samples, excluded legacy measurements from the aggregate, and returned no boundary failures. Production retained all 15,953 historical samples as generation 1; postflight verified the non-null version column and index, both security-definer RPCs with pinned `search_path`, authenticated execution, and no `anon` execution. The application was recorded in `public.applied_migrations`; no operational rows were changed. |
| `supabase/migrations/202607281200_performance_vital_session_dedup.sql` | Applied | Applied to testing project `fsxqrngpaseqdxijggcm`, then production project `lbphkzznvvumemdkqoay` on 2026-07-28 after focused telemetry, threshold, SQL, bundle, desktop, mobile, visual, security, migration-static, and isolated-schema verification. The isolated PostgreSQL check proves repeated LCP samples within one browser session aggregate once and remain identity-free. Production postflight found 14,225 raw samples, 12,599 aggregate samples, and 1,626 repeated Web Vital samples ignored without deleting or updating any raw row. Taylor Metal's LCP aggregate changed from 560 raw samples with a 5,908 ms p75 to 44 session samples with a 3,704 ms p75. Catalog verification found one stable security-definer RPC with pinned `search_path`, authenticated execution, and no `anon` or `PUBLIC` execution. The application was recorded in `public.applied_migrations`; no operational rows were changed. |
| `supabase/migrations/202607271000_workspace_work_order_counts.sql` | Applied | Applied to isolated testing project `fsxqrngpaseqdxijggcm`, then production project `lbphkzznvvumemdkqoay` on 2026-07-27 after local Strict LFES, four-role authenticated testing-platform proof, WebKit proof, and GitHub Release Gate run `30289872510`. The isolated PostgreSQL check verifies company/location counts, assigned-versus-created My Work scope, Sunday-to-Sunday completion boundaries, invalid filter rejection, and cross-company denial. Signed-in testing measured 30 requests for admin, manager, accounting, and WebKit admin, and 34 for technician, with one `work_orders` query and one count RPC per initial workspace load. Read-only production catalog verification found exactly one stable security-definer RPC with pinned `search_path`, authenticated execution, and no `anon` or `PUBLIC` execution. The application was recorded in `public.applied_migrations`; no operational rows were updated or deleted. |
| `supabase/migrations/202607211200_app_performance_telemetry.sql` | Applied | Applied to testing project `fsxqrngpaseqdxijggcm` and production project `lbphkzznvvumemdkqoay` on 2026-07-21 after isolated schema, local Strict LFES, hosted Strict LFES, and authenticated testing-platform proof. Authenticated run `29871957982` passed all four role contracts plus telemetry write, aggregate-only read, malformed-unit rejection, raw-read denial, and cross-company denial. Read-only production postflight verified RLS enabled, no `anon` or `authenticated` table SELECT, exactly two security-definer RPCs with pinned `search_path`, authenticated execute grants, and zero initial samples. No operational rows were updated or deleted; the migration only added the telemetry table, constraints, policies, indexes, and RPCs. |
| `supabase/migrations/202607201330_work_order_priority_rank.sql` | Applied | Applied to testing project `fsxqrngpaseqdxijggcm` and production project `lbphkzznvvumemdkqoay` on 2026-07-20 after isolated schema and Strict LFES verification. Read-only production postflight verified `priority_rank` is an `ALWAYS` generated `smallint`, verified the exact `work_orders_company_location_priority_idx` definition, and returned Critical=4 (14), High=3 (24), Medium=2 (45), and Low=1 (10). Testing returned the same rank mapping across all eight testing work orders. No work-order rows were updated or deleted. |
| `supabase/migrations/202607201200_work_order_type_taxonomy.sql` | Applied | Applied to production project `lbphkzznvvumemdkqoay` with the corrected Windows migration helper on 2026-07-20. Read-only preflight counted 31 Corrective, 59 Reactive, and 3 Preventive work orders. Postflight counted 90 Corrective and 3 Preventive, verified the Corrective default, verified the exact Corrective/Preventive/Fabrication constraint, and verified the assignment guard trigger was enabled again. The same migration was then applied to testing project `fsxqrngpaseqdxijggcm`; its postflight counted 4 Corrective and 4 Preventive and verified the same default, constraint, and restored trigger. No rows were deleted and no records were auto-classified as Fabrication. |
| `supabase/step-next-accounting-role.sql` | Applied | Applied to project `lbphkzznvvumemdkqoay` with Supabase CLI on 2026-07-01; verified `company_members`/`company_invites` role constraints include `accounting`, verified `update_company_member_role` and `create_company_invite` include `accounting`, and recorded in `public.applied_migrations`. |
| `supabase/step-next-asset-financial-manager-readonly.sql` | Applied | Applied to project `lbphkzznvvumemdkqoay` with Supabase CLI on 2026-07-01; verified live `asset_financials` SELECT remains available to company members while INSERT/UPDATE policies allow only `admin` and `accounting`. |
| `supabase/step-next-asset-financials.sql` | Applied | Applied to project `lbphkzznvvumemdkqoay` with Supabase CLI on 2026-07-01; verified `asset_financials` columns, grants, RLS policies, and recorded in `public.applied_migrations`. |
| `supabase/step-next-asset-audit-fields.sql` | Applied | Applied to project `lbphkzznvvumemdkqoay` with Supabase CLI on 2026-07-01; `information_schema.columns` verified `manufacturer` and `model` exist on `public.assets`. |
| `supabase/step-next-work-order-photo-delete.sql` | Applied | Applied to project `lbphkzznvvumemdkqoay` with Supabase CLI on 2026-07-06; verified `authenticated` has DELETE grant on `public.work_order_photos`. |
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

## PM Lifecycle Integrity, 2026-09-23 UTC

`supabase/migrations/20260923051845_pm_lifecycle_integrity.sql` was applied by
Codex through the Supabase migration tool to testing project
`fsxqrngpaseqdxijggcm` during the 2026-09-22 Pacific audit, then to production
`lbphkzznvvumemdkqoay` on 2026-09-23 after the user authorized release. No existing
production record contents were rewritten: row digests and counts remained identical
for 216 work orders, 1 schedule, 2 templates, 4 steps, and 32 answers. No backfill.
Six function definitions/privileges match QA, both public RPCs are authenticated-only
security invoker, five integrity triggers are enabled, the occurrence index is valid,
and all three RESTRICT foreign keys are validated. Preflight found zero cross-company
reference mismatches; existing security advisor findings were unchanged. The migration
is recorded in production `public.applied_migrations` at 13:15:47 UTC.
Source SQL SHA256: `6e6b48df4efc0cc0b198b98086bb91034378527f31361cffb7c793e2a28d36ed`.
Isolated PostgreSQL schema/RLS and PM lifecycle checks pass; both new public RPCs
were verified as security invoker. Signed-in and concurrency evidence, deployment
order, rollback cautions, and existing advisor findings are recorded in
`PM_LIFECYCLE_VERIFICATION.md`. The production database prerequisite is verified;
the frontend release is tracked by PR #59 and the required Release Gate.
## Production Rollout, 2026-09-18

All five migrations below were applied in order to production project
`lbphkzznvvumemdkqoay` through Supabase `apply_migration` before PR #49 merged.
Application completed at approximately 16:21 UTC; verification was recorded in
`public.applied_migrations` at 16:21:44 UTC. This supersedes the historical
testing-only status in the following checkpoint notes.

- `202609171659_messaging_experience.sql`
- `202609171801_messaging_complete.sql`
- `202609171830_message_storage_usage.sql`
- `202609181444_appwide_role_and_request_integrity.sql`
- `202609181531_work_part_usage_operational_boundary.sql`

All 14 function bodies match the reviewed migration source. Postflight verified
RLS, authenticated-only public RPC grants, immutable conversation audience,
private 25 MiB message storage and all three realtime publication members.
Fingerprints of existing fields across 18 business tables and stored-object
metadata were identical before and immediately after migration. New nullable,
defaulted and generated columns were excluded only from comparisons of existing
fields. No business rows or stored objects were removed or rewritten by rollout.
Exact catalog and digest evidence is retained privately.

Production advisor results are not an all-clear: 3 no-policy INFO findings,
5 anonymous-callable and 28 authenticated-callable security-definer warnings,
and disabled leaked-password protection remain recorded for risk-scoped review.
See the provider's [RPC guidance](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable)
and [password-protection guidance](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).
No unrelated Auth configuration or existing public intake function was changed.

Recovery: roll back frontend presentation independently; retain additive schema
and the stricter permission checks. Do not drop conversations, financial records,
converted orders, attachments, or restore the superseded authorization functions.

## Messaging Experience, 2026-09-17 (Historical QA Checkpoint)

- `supabase/migrations/202609171659_messaging_experience.sql`: isolated PostgreSQL/RLS proof passed; applied incrementally to testing project `fsxqrngpaseqdxijggcm` through the Supabase migration tool on 2026-09-17. Not applied to production. Adds recoverable preferences, same-thread quotes, scoped reactions and realtime publication membership, and enforces the existing Accounting read-only messaging contract. Signed-in Chromium and WebKit lifecycle checks passed on the testing platform. Existing operational records and production conversations were not rewritten. The checked-in consolidated migration is the fresh-application contract. Deployment order, cleanup and rollback notes are in `docs/MESSAGING_VERIFICATION.md`.
# Messaging Tools Expansion (Local / Testing Only)

- `supabase/migrations/202609171801_messaging_complete.sql`: indexed message search, personal favorites/sections, same-conversation reply threads, private message-file bucket and transactional attachment sends. Production has NOT been migrated. Testing proof is recorded separately before release.
- `supabase/migrations/202609171830_message_storage_usage.sql`: includes message-file bytes and photos in storage totals/months. Nonparticipants see aggregate usage but never private filenames, paths, titles or links. Testing platform only; production pending.
# App-wide QA Candidate, 2026-09-18

`supabase/migrations/202609181444_appwide_role_and_request_integrity.sql`:
corrects the Team role authorization variable and makes request conversion atomic/idempotent.
Production: NOT APPLIED. Applied to testing project `fsxqrngpaseqdxijggcm` on
2026-09-18 through the Supabase migration tool. Isolated PostgreSQL proves admin
authorization, self/nonadmin/cross-company denial, rollback on request-link failure,
and idempotent conversion/history. Signed-in test-bed browser checks prove Team
role round trips and conversion retry after a lost response. This is a release
prerequisite, not an automatic production change. Apply before the corresponding
frontend. Frontend rollback can leave these additive RPC changes in place; do not
restore the broken role authorization function or delete converted work as rollback.

`supabase/migrations/202609181531_work_part_usage_operational_boundary.sql`:
enforces the operational-editor role at the transactional part-usage RPC, preserving
existing stock/history semantics. The isolated QA reproduction proved Accounting
could previously deduct stock despite its read-only UI. Isolated PostgreSQL now
proves Accounting/outsider denial with unchanged stock/history and success for all
four operational roles. Production: NOT APPLIED. Applied to testing project
`fsxqrngpaseqdxijggcm` on 2026-09-18 through the Supabase migration tool. Signed-in
postflight rejects Accounting, preserves quantity/history, and allows technician
usage with the correct actor and stock deduction. Do not restore the membership-only
check on rollback.
# Automatic Attachments Rollout, 2026-09-23

`supabase/migrations/20260923170451_automatic_work_order_attachments.sql` was applied by Codex through the Supabase migration tool to production `lbphkzznvvumemdkqoay` after the user authorized release. Application completed at 18:01:49 UTC and was recorded in `public.applied_migrations` at 18:02:19 UTC. It adds a private 25 MiB work-order document bucket/table, role/tenant policies, atomic document history, ZIP MIME support for existing equipment/part file buckets, and document accounting in storage usage. Existing photos are unchanged.

Applied to testing project `fsxqrngpaseqdxijggcm` on 2026-09-23, followed by the reviewed QA-only hardening delta. The consolidated production candidate SHA256 is `cf1fc41b6f119f71b49593248bc366d81de8a2e34385656408b22e3cf503147b`; the delta SHA256 is `0551c0524f00795e6860bd177d1d5568a7eebdf3992a3bffc03691a2e85bb703`. The delta is reproducible with `node tests/smoke/work-order-documents-sql-smoke.js --qa-delta`. Do not apply both to a fresh environment.

Production pre/postflight counts and row fingerprints were identical across 22 business tables and all 278 stored-object metadata rows, including 220 work orders and 136 equipment records. The new table began empty. Columns, constraints, indexes, table/storage policies, column grants, and private bucket settings match QA; both function definitions match. The existing dashboard RPC has an additional service-role EXECUTE grant in QA only; production retains its narrower existing grant. The trigger remains security invoker with a pinned empty search path. Production advisors are unchanged: 3 no-policy INFO findings, 5 anonymous-callable and 28 authenticated-callable security-definer warnings, and disabled leaked-password protection. See the provider's [RPC guidance](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable) and [password-protection guidance](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).

The production database prerequisite is verified; frontend publication follows the required GitHub Release Gate. Rollback may restore the prior frontend while retaining the additive table/bucket and uploaded data. Never drop attachments or restore weaker policies as rollback. See `docs/AUTOMATIC_ATTACHMENTS.md` for scope, proof commands, and limitations.

# Issue Message Relay Rollout, 2026-09-23

`supabase/migrations/20260923181857_app_issue_message_relay.sql` was applied through the Supabase migration tool to testing project `fsxqrngpaseqdxijggcm`, then production `lbphkzznvvumemdkqoay` after release authorization at 18:42 UTC on 2026-09-23. Source SHA256: `38fe5c8253ce00dbf27e61bfc07b1ac49100022a6748259f1cdfa598816990ba`. The migration is recorded in `public.applied_migrations`. The verified Louie Fisher admin recipient was enabled at 18:43 UTC for the active Taylor Metal company only, covering its five facilities. Frontend publication follows the required GitHub Release Gate.

Adds private per-company recipient configuration, an admin-only configuration RPC and an INSERT-only transactional relay trigger. Existing reports/messages are not backfilled or rewritten; existing messaging policies/grants are unchanged. Browser tests configure only run-owned disposable companies. QA security advisors show one additional authenticated-callable definer warning for the explicitly admin-checked setter (30 to 31); existing 5 no-policy INFO findings, 5 anonymous-callable warnings and disabled leaked-password protection are unchanged. See [RPC security guidance](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable) and `APP_ISSUE_MESSAGE_RELAY.md` for authorization proof, setup and non-destructive rollback.

Production postflight matches the tested QA function bodies, privileges, trigger and routing RLS/policies/grants. Counts/fingerprints across 25 existing business/storage relations and existing message policies are unchanged. Production advisors show the expected setter warning (28 to 29 authenticated-callable definers); its existing 3 no-policy INFO findings, 5 anonymous-callable warnings and disabled leaked-password protection remain unchanged. No production test reports/messages were created. Disable future routing without deleting reports/messages for rollback.
# Traveling Primary Equipment, 2026-09-23

`supabase/migrations/20260924025115_traveling_primary_equipment.sql` (UTC filename; local release date September 23) was applied to isolated QA `fsxqrngpaseqdxijggcm`, then production `lbphkzznvvumemdkqoay` after verification and user release authorization. The production tracking entry is dated 2026-09-24 03:12:59 UTC. SHA256: `8de88d4ea9147dc6321dbbe40ee1cb926477345dc9164f93b2466f7186a651aa`.

Adds the `traveling_machine` asset type, invoker-only hierarchy/location guards, atomic asset history and an authenticated operational-editor move RPC. No existing business rows are rewritten. Full Strict LFES passed all 13 stages (201 Node smoke files, 86 targeted browser regressions, attachment/resource checks and four Performance checks). Authenticated LFES passed all nine stages, including five-role contracts and the traveling lifecycle at 1440px/390px in Chromium and WebKit. See `TRAVELING_EQUIPMENT.md` for the contract and non-destructive rollback.

Production function bodies, grants, triggers and type constraint match the tested QA catalog. Before/after fingerprints matched across 25 business/storage relations, including 138 pre-existing equipment records, 222 work orders and 278 storage objects. The three user-requested curving units were then created in Salem with explicit provisional-location history. Excluding only those three new equipment IDs and their creation events, the same original-record fingerprints still match. No production transfer test was performed.

Production advisors are unchanged: 3 no-policy INFO findings, 5 anonymous-callable and 29 authenticated-callable security-definer warnings, and disabled leaked-password protection. This migration adds no definer. Exact catalog/digest and QA evidence is retained privately. Frontend publication follows the required GitHub Release Gate.

# Traveling Units Board, 2026-09-23

`supabase/migrations/20260924050141_traveling_units_board.sql` (UTC filename) is applied to isolated QA `fsxqrngpaseqdxijggcm`; production is pending verification. Adds bounded company-wide discovery/counts, structured database-only movement history, protected equipment revision tokens, and atomic quick condition/location RPCs. Existing records are not backfilled or relocated. All new functions use security invoker and pinned empty search paths; public/anonymous execution is revoked. Apply before the frontend; frontend rollback may retain additive schema and stricter safeguards. Do not delete history or equipment as rollback.
