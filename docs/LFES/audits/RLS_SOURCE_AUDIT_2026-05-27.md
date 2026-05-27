# LFES RLS Source Audit - 2026-05-27

Scope: follow-up RLS/security review after the 2026-05-26 source audit, focused on source reconstructability, anonymous API exposure, internal RPC execute privileges, and the QA-company test plan needed before auth/storage/public QR refactors continue.

Live database SQL was applied after review. App behavior was not intentionally changed.

## Standards Applied

- Exposed browser-accessible tables require RLS and intentional grants.
- Tenant isolation must be enforced by database-side company membership checks, not UI visibility alone.
- Anonymous access must stay limited to public request intake RPCs.
- Internal mutation RPCs must not be executable by `anon`.
- Security-definer functions must pin `search_path`.
- Source SQL must be sufficient to reconstruct the live database behavior used by the app.

## Source Audit Result

The app-used table and storage posture from the 2026-05-26 audit still holds:

- App-used data tables discovered from `.from(...)` calls have RLS enabled and policy coverage in source.
- App-used storage buckets are declared private and have `storage.objects` policy coverage in source.
- Security-definer functions found in source include `set search_path`.
- Direct anonymous table grants were not found in source.

The 2026-05-26 source-of-truth gaps were resolved in source by adding:

- `supabase/step-next-invite-default-location.sql`
- `supabase/step-next-cancel-team-invites.sql`
- `supabase/step-next-record-work-order-part-usage.sql`
- `supabase/step-next-rpc-execute-hardening.sql`

These files were applied in Supabase after the first combined run exposed the existing `cancel_company_invite(uuid, uuid)` return-type mismatch. The source file now explicitly drops that function before recreating it.

## RPC Source Coverage

After the source additions, every RPC name used by app JavaScript has a source definition and grant path:

| RPC | Source status | Anonymous status intended |
| --- | --- | --- |
| `accept_company_invites` | Covered | No anon execute |
| `attach_maintenance_request_photo` | Covered | Anon allowed intentionally for public QR photo attachment |
| `cancel_company_invite` | Added | No anon execute |
| `create_company` | Covered | No anon execute |
| `create_company_invite` | Covered with default location signature | No anon execute |
| `ensure_company_profile` | Covered | No anon execute |
| `ensure_location_request_link` | Covered | No anon execute |
| `get_my_companies` | Covered with `default_location_id` | No anon execute |
| `get_public_request_intake` | Covered | Anon allowed intentionally for public QR intake |
| `record_work_order_part_usage` | Added | No anon execute |
| `set_company_logo` | Covered | No anon execute |
| `submit_public_location_request` | Covered | Anon allowed intentionally for public QR submit |
| `update_company_member_role` | Covered | No anon execute |

## Live Anonymous API Probe

Non-mutating/invalid-payload API probes were run with the browser publishable key.

Observed live behavior before applying the new hardening SQL:

| Probe | Result |
| --- | --- |
| Anonymous `companies` select | Blocked with table permission error |
| Anonymous `work_orders` select | Blocked with table permission error |
| Anonymous `get_public_request_intake` with invalid token | Allowed function call, returned empty result |
| Anonymous `record_work_order_part_usage` | Execute denied |
| Anonymous `get_my_companies` | Function reachable, returned empty result |
| Anonymous `create_company` | Function reachable, failed inside function/constraints |
| Anonymous `ensure_company_profile` | Function reachable, failed inside function |
| Anonymous `set_company_logo` | Function reachable, failed inside function |
| Anonymous `update_company_member_role` | Function reachable, failed inside function |
| Anonymous `create_company_invite` | Function reachable, failed inside function |
| Anonymous `accept_company_invites` | Function reachable, returned 0 |
| Anonymous `ensure_location_request_link` | Function reachable, failed inside function |
| Anonymous `cancel_company_invite` | Function reachable, failed inside function |

Interpretation: table RLS/grants are doing their job, but several internal RPCs are currently relying on function-body authorization checks after anonymous callers reach the function. LFES security posture requires denying anonymous execute for internal RPCs before function code runs.

## Live Anonymous API Probe After SQL

After applying the SQL, anonymous probes returned execute-denied for internal RPCs:

| RPC | Result |
| --- | --- |
| `get_my_companies` | `401 EXECUTE_DENIED` |
| `create_company` | `401 EXECUTE_DENIED` |
| `ensure_company_profile` | `401 EXECUTE_DENIED` |
| `set_company_logo` | `401 EXECUTE_DENIED` |
| `update_company_member_role` | `401 EXECUTE_DENIED` |
| `create_company_invite` | `401 EXECUTE_DENIED` |
| `accept_company_invites` | `401 EXECUTE_DENIED` |
| `ensure_location_request_link` | `401 EXECUTE_DENIED` |
| `cancel_company_invite` | `401 EXECUTE_DENIED` |
| `record_work_order_part_usage` | `401 EXECUTE_DENIED` |
| `get_public_request_intake` with invalid token | `200`, empty result |

Result: PASS.

## Source Fix Added

`supabase/step-next-rpc-execute-hardening.sql` was added to explicitly revoke `PUBLIC`/`anon` execute on internal RPCs and grant execute back only to `authenticated`.

It also re-scopes the intentionally public QR functions by revoking broad `PUBLIC` execute and granting execute to `anon, authenticated` only for:

- `public.get_public_request_intake(text)`
- `public.submit_public_location_request(text, text, text, text, text, text, text)`
- `public.attach_maintenance_request_photo(uuid, text, text, text, bigint, text, bigint)`

## QA Company Live RLS Plan

To prove tenant isolation live, create or use a dedicated QA user and QA company that is not a member of Taylor Metal Products.

Required checks:

1. QA user can sign in and see only the QA company.
2. QA user cannot see Taylor companies, locations, assets, work orders, requests, parts, messages, team rows, or storage objects.
3. QA user can create/read/update allowed records inside the QA company only.
4. QA technician cannot perform manager/admin-only operations.
5. QA manager/admin can perform allowed manager/admin operations inside QA company only.
6. Anonymous publishable-key requests cannot directly select app tables.
7. Anonymous publishable-key requests cannot execute internal RPCs after hardening SQL is applied.
8. Anonymous access remains limited to public QR intake, submit, and request-photo attachment RPCs.
9. Storage buckets remain private; QA user cannot read Taylor-owned storage paths.

## QA Company Live RLS Result

QA company: `QA Test Facility`

The QA account signed in successfully and returned only:

- company id `f599e431-45c3-4f93-b1a9-6c29e009b1b3`;
- company name `QA Test Facility`;
- role `admin`;
- `default_location_id: null`.

Table read sweep result: PASS.

The QA account returned only QA company rows or empty result sets for:

- `companies`
- `company_members`
- `locations`
- `profiles`
- `assets`
- `work_orders`
- `work_order_comments`
- `work_order_photos`
- `preventive_schedules`
- `parts`
- `work_order_parts`
- `part_documents`
- `work_order_events`
- `maintenance_requests`
- `procedure_templates`
- `procedure_steps`
- `work_order_step_results`
- `message_threads`
- `message_thread_members`
- `messages`
- `message_reads`
- `company_invites`
- `public_request_links`
- `app_issue_reports`

Storage list probes for Taylor-prefixed paths returned empty arrays for the QA account across:

- `work-order-photos`
- `part-documents`
- `company-logos`
- `maintenance-request-photos`

Result: PASS for read isolation.

## Taylor Technician Role-Denial Result

Taylor technician account scope:

- company id `0875d674-7f07-4493-8668-701d192f4421`;
- company name `Taylor Metal Products`;
- role `technician`;
- default location id `328d9ebb-7c4d-4847-a9bb-4aa0619fec43`.

Direct cross-company probes against `QA Test Facility` returned empty results for:

- company direct read by id;
- assets direct read by QA company id.

Manager/admin-only RPC probes as Taylor technician returned denial errors:

| Probe | Result |
| --- | --- |
| `create_company_invite` | Denied: only admins or managers can invite teammates |
| `ensure_location_request_link` | Denied: only admins or managers can create public request links |
| `update_company_member_role` | Denied: only admins or managers can change team roles |
| `cancel_company_invite` | Denied: only admins or managers can cancel invites |

Taylor technician table read sweep result: PASS.

The technician account returned only main Taylor company rows or empty result sets for all app-used tables. No `QA Test Facility` rows were visible.

## LFES Decision

The RLS checkpoint is materially improved and no longer blocks source reconstructability, anonymous internal RPC hardening, or basic tenant/role matrix coverage.

Before starting auth/session startup, public QR submit changes, or storage/photo/document changes, a QA Facility technician smoke would still improve symmetry, but Taylor technician role-denial and QA Facility admin tenant isolation are now verified.

Workspace UI state work and non-security client-only refactors remain allowed if they do not alter Supabase access behavior.

## Verification Performed

- Re-ran source coverage parsing for app-used `.from(...)`, `.rpc(...)`, and storage bucket calls.
- Confirmed all app-used tables still have RLS and policy coverage in source.
- Confirmed all app-used storage buckets still have source bucket/policy coverage.
- Confirmed all app-used RPC names now have source definitions and grant paths after the source additions.
- Confirmed security-definer functions found in source include `set search_path`.
- Ran anonymous API probes against live Supabase using the publishable key.
- Applied the reviewed SQL in Supabase.
- Reran anonymous API probes after SQL.
- Ran QA-company authenticated table read isolation smoke.
- Ran QA-company storage prefix list probes.
- Ran Taylor technician cross-company read probes.
- Ran Taylor technician manager/admin-only RPC denial probes.
- Ran Taylor technician authenticated table read isolation smoke.
- Ran `node --check app.js`.
- Ran `git diff --check`.

Behavior changed: no.
