# LFES RLS Source Audit - 2026-05-26

Scope: source-level review of Supabase RLS, storage policies, explicit Data API grants, app-used tables, app-used RPCs, and app-used storage buckets before continuing into harder LFES boundaries.

This audit did not change database policy behavior. It reviewed the repository SQL and JavaScript call surface only. Live database introspection was not performed.

## Why This Audit Happened

The LFES review identified RLS as the next control point before deeper work on auth, public QR, storage/photo/document flows, and higher-risk mutation boundaries.

The goal was to confirm whether the source tree still supports the established MaintainOps security posture:

- Browser app access uses authenticated table grants plus RLS.
- Anonymous public QR access uses narrow RPC grants, not direct table access.
- Storage buckets stay private.
- Security-definer functions pin `search_path`.
- Company/location membership checks remain server-side.
- SQL/RLS changes are not mixed into unrelated app modularization phases.

## Summary

Result: mostly aligned, with one source-of-truth gap to resolve before related workflow work.

- App-used data tables found in JS have RLS enabled in the SQL source.
- App-used data tables have policies in the SQL source.
- App-used storage buckets are declared private.
- Public QR anonymous access is limited to expected RPC grants and the maintenance request photo attachment RPC.
- Security-definer functions found in source include `set search_path`.
- Two app-used RPC names were not found in the checked SQL source files:
  - `cancel_company_invite`
  - `record_work_order_part_usage`

This does not prove those RPCs are absent from the live database. It does mean the repository source is not sufficient to reconstruct or review those two live app dependencies.

## App-Used Table Coverage

All app-used data tables discovered from `.from(...)` calls have RLS/policy coverage in source:

| Table | RLS in source | Policy coverage | Notes |
| --- | --- | --- | --- |
| `app_issue_reports` | Yes | Yes | Member create/read, manager update. |
| `assets` | Yes | Yes | Member read/create/update, manager delete unused. |
| `companies` | Yes | Yes | Member read, admin update. |
| `company_invites` | Yes | Yes | Manager read; create/update routed through RPC/table grants. |
| `company_members` | Yes | Yes | Member read/add; role changes routed through RPC. |
| `locations` | Yes | Yes | Member read/create/update with location integrity helpers. |
| `maintenance_requests` | Yes | Yes | Member read/create/update, manager delete, public QR creation via RPC. |
| `message_reads` | Yes | Yes | User-scoped read/write/update. |
| `message_thread_members` | Yes | Yes | Thread membership read, company member add. |
| `message_threads` | Yes | Yes | Thread member read/update, company member create. |
| `messages` | Yes | Yes | Thread member read/send. |
| `part_documents` | Yes | Yes | Member read/create. |
| `parts` | Yes | Yes | Member read/create/update, manager delete unused. |
| `preventive_schedules` | Yes | Yes | Member read/create/update, manager delete. |
| `procedure_steps` | Yes | Yes | Member read/create/update, manager delete. |
| `procedure_templates` | Yes | Yes | Member read/create/update, manager delete. |
| `profiles` | Yes | Yes | Member read/create/update own profile. |
| `public_request_links` | Yes | Yes | Member read, manager create, admin update. |
| `work_order_comments` | Yes | Yes | Member read/create. |
| `work_order_events` | Yes | Yes | Member read/create. |
| `work_order_parts` | Yes | Yes | Member read/create. |
| `work_order_photos` | Yes | Yes | Member read/create metadata. |
| `work_order_step_results` | Yes | Yes | Member read/create/update. |
| `work_orders` | Yes | Yes | Member read/create/update, admin delete, assignment guardrails. |

Storage bucket names such as `work-order-photos`, `part-documents`, `maintenance-request-photos`, and `company-logos` also appear in JS through `storage.from(...)`; they are covered separately below.

## Storage Coverage

App-used storage buckets:

| Bucket | Declared private | Source policy coverage | Notes |
| --- | --- | --- | --- |
| `work-order-photos` | Yes | Yes | Member upload/read; owner/admin delete policies exist. |
| `part-documents` | Yes | Yes | Member upload/read; owner delete policies exist. |
| `company-logos` | Yes | Yes | Admin upload; member read. |
| `maintenance-request-photos` | Yes | Yes | Public QR upload allowed only through request-path validation; member read; manager delete. |

The `maintenance-request-photos` public upload path is intentionally narrow:

- bucket is private;
- upload policy targets `anon, authenticated`;
- path validation is delegated to `private.can_write_maintenance_request_photo(name)`;
- the public write window is limited to valid `public_location_qr` requests less than one day old;
- metadata attachment is routed through `public.attach_maintenance_request_photo(...)`.

## App-Used RPC Coverage

RPCs found in app code and covered by source grants:

| RPC | Source grant status | Notes |
| --- | --- | --- |
| `accept_company_invites` | Covered | Authenticated/service_role grants in explicit grants and team invite SQL. |
| `attach_maintenance_request_photo` | Covered | `anon, authenticated` expected for public QR photo attachment. |
| `create_company` | Covered | Authenticated/service_role grants. |
| `create_company_invite` | Covered | Authenticated/service_role grants; function enforces manager/admin. |
| `ensure_company_profile` | Covered | Authenticated/service_role grants. |
| `ensure_location_request_link` | Covered | Authenticated/service_role grants; function enforces manager/admin. |
| `get_my_companies` | Covered | Authenticated/service_role grants. |
| `get_public_request_intake` | Covered | `anon, authenticated` expected public QR read RPC. |
| `set_company_logo` | Covered | Authenticated/service_role grants; function enforces admin. |
| `submit_public_location_request` | Covered | `anon, authenticated` expected public QR submit RPC. |
| `update_company_member_role` | Covered | Authenticated/service_role grants; function enforces manager/admin rules. |

RPCs found in app code but not found in checked SQL source:

| RPC | App usage | Risk |
| --- | --- | --- |
| `cancel_company_invite` | `cancelTeamInvite(...)` in `app.js` | Source-of-truth gap. App expects `supabase/step-next-cancel-team-invites.sql`, but that file is not present in the repo. |
| `record_work_order_part_usage` | `addPartUsageToWorkOrder(...)` in `app.js` | Source-of-truth gap. The app uses the RPC for parts-used mutation, but the function/grant definition is not present in checked SQL source. |

## Anonymous Access Review

Anonymous source grants were found only for:

- schema usage;
- `public.get_public_request_intake(text)`;
- `public.submit_public_location_request(text, text, text, text, text, text, text)`;
- `public.attach_maintenance_request_photo(uuid, text, text, text, bigint, text, bigint)`.

No direct anonymous table grants were found in source.

This matches the current MaintainOps stance: anonymous public QR users can use scoped RPCs, not direct table access.

## Security-Definer Review

All security-definer functions discovered in source include a `set search_path` clause.

Examples include:

- `private.is_company_member(...)`
- `private.location_belongs_to_company(...)`
- `private.asset_belongs_to_company(...)`
- `public.create_company(...)`
- `public.ensure_company_profile(...)`
- `public.set_company_logo(...)`
- `public.get_my_companies()`
- `public.ensure_location_request_link(...)`
- `public.get_public_request_intake(...)`
- `public.submit_public_location_request(...)`
- `public.attach_maintenance_request_photo(...)`
- `public.update_company_member_role(...)`
- `public.create_company_invite(...)`
- `public.accept_company_invites()`

## Source Drift Notes

The SQL source is incremental and contains repeated policy names across baseline and step files. That is expected for this project history, but it means review should treat the ordered migration set as the meaningful source, not a single file.

The two missing RPC source definitions are a more serious documentation/source-control gap because they are app runtime dependencies.

## LFES Decision

Do not start auth/session, public QR submit, storage/photo/document, team invite cancel, or parts-used extraction work until the missing RPC source gap is resolved or explicitly accepted.

The workspace UI state factory remains a valid next modularization target because it is client UI state and does not require SQL/RLS mutation, as long as it does not cross into the blocked storage/auth/public QR/RPC gaps.

## Recommended Next Actions

1. Resolve the missing RPC source gap:
   - locate or recreate `cancel_company_invite` SQL;
   - locate or recreate `record_work_order_part_usage` SQL;
   - add both to `supabase/` with explicit grants and security-definer `search_path` if they are intended RPCs.
2. If live DB access is available, run a live DB introspection pass to confirm deployed functions/policies match repository source.
3. Proceed with the workspace UI state factory only after documenting that it does not alter Supabase access, RLS, storage, auth/session startup, public QR submit, or mutation sequencing.
4. Keep public QR submit, storage/photo/document flows, auth/session/company/location startup, team invite cancel, and parts-used mutation boundaries blocked until the source gap is closed.

## Verification Performed

- Grepped SQL source for RLS enablement, policies, grants, storage policies, bucket declarations, security-definer functions, and `set search_path`.
- Parsed app JavaScript for `.from(...)`, `.rpc(...)`, and `.storage.from(...)` usage.
- Cross-checked app-used tables against RLS/policy source coverage.
- Cross-checked app-used RPCs against source grants.
- Cross-checked app-used storage buckets against private bucket declarations and storage policies.

Behavior changed: no.

