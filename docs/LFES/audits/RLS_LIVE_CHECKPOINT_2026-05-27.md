# RLS Live Checkpoint - 2026-05-27

Scope: follow-up to the 2026-05-27 RLS hardening work. Requested steps were: recover GitHub Actions proof, test Taylor against QA Facility instead of creating another QA technician email, and run live RLS/policy inventory as far as the local environment allows.

## Step 1 - GitHub Actions Verifier

Result: partially blocked by tooling.

- `gh` CLI is not installed in this local environment.
- The local `npm run test:smoke:github-actions` verifier uses unauthenticated GitHub API calls and is currently rate-limited for this IP.
- Public GitHub Actions pages are accessible, but the static HTML does not reliably expose the newest run details needed for commit-specific proof.

Conclusion: GitHub Actions verification is still a tooling gap for high-risk phases. Use an authenticated GitHub API path or install/configure `gh` before relying on this gate again.

## Step 2 - Taylor Technician Against QA Facility

Result: PASS for cross-company table isolation on app-used tables.

Test actor:

- Taylor Metal Products technician account.

Target:

- QA Test Facility company id: `f599e431-45c3-4f93-b1a9-6c29e009b1b3`.

Direct REST probes:

- Queried QA rows directly through Supabase REST using the Taylor technician token.
- `companies` was probed with `id=eq.<qa_company_id>`.
- Other app-used company-scoped tables were probed with `company_id=eq.<qa_company_id>`.

Tables returning zero QA rows to the Taylor technician:

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

Manager/admin RPC role-denial probes with Taylor technician token:

- `create_company_invite`: denied with `Only admins or managers can invite teammates.`
- `update_company_member_role`: denied with `Only admins or managers can change team roles.`
- `cancel_company_invite`: denied with `Only admins or managers can cancel invites.`

`ensure_location_request_link` note:

- QA Facility currently has no visible location rows for the QA admin account, so this RPC could not be tested against a real QA Facility location.
- A fake location id correctly failed with `Location not found.`, but that is not a role-denial proof.
- To finish this specific check, create one QA Facility location, then rerun Taylor technician against `ensure_location_request_link(target_location_id := <qa_location_id>)`.

Conclusion: Taylor technician cannot directly read QA Facility data across app-used tables. Manager/admin RPC denial is confirmed for invite create, role update, and invite cancel. QR-link role denial still needs a real QA location.

## Anonymous Table Exposure Sweep

Result: PASS for app-used tables.

Direct anonymous REST reads to every app-used table returned `401`.

Tables checked:

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

Conclusion: no direct anonymous table reads were available through the public REST API for the app-used tables.

## Step 3 - Live Policy Inventory

Result: blocked from local client credentials; source-backed inventory completed.

Attempted live metadata endpoints with anon and authenticated browser tokens:

- `/rest/v1/pg_policies`
- `/rest/v1/pg_tables`
- `/rest/v1/information_schema.tables`
- `/rest/v1/rpc/sql`

Result:

- Metadata endpoints returned PostgREST 404 / schema-cache errors.
- No generic SQL RPC exists.
- This is expected and good from an exposure standpoint, but it means a true live policy inventory requires Supabase Dashboard SQL Editor, psql, Supabase CLI with DB credentials, or another admin connection.

Source-backed inventory from `supabase/*.sql`:

| Table | RLS enabled in source | Policy ops found in source |
| --- | --- | --- |
| `app_issue_reports` | yes | SELECT, INSERT, UPDATE |
| `assets` | yes | SELECT, INSERT, UPDATE, DELETE |
| `companies` | yes | SELECT, UPDATE |
| `company_invites` | yes | SELECT |
| `company_members` | yes | SELECT, INSERT |
| `locations` | yes | SELECT, INSERT, UPDATE |
| `maintenance_requests` | yes | SELECT, INSERT, UPDATE, DELETE |
| `message_reads` | yes | SELECT, INSERT, UPDATE |
| `message_thread_members` | yes | SELECT, INSERT |
| `message_threads` | yes | SELECT, INSERT, UPDATE |
| `messages` | yes | SELECT, INSERT |
| `part_documents` | yes | SELECT, INSERT |
| `parts` | yes | SELECT, INSERT, UPDATE, DELETE |
| `preventive_schedules` | yes | SELECT, INSERT, UPDATE, DELETE |
| `procedure_steps` | yes | SELECT, INSERT, UPDATE, DELETE |
| `procedure_templates` | yes | SELECT, INSERT, UPDATE, DELETE |
| `profiles` | yes | SELECT, INSERT, UPDATE |
| `public_request_links` | yes | SELECT, INSERT, UPDATE |
| `work_order_comments` | yes | SELECT, INSERT |
| `work_order_events` | yes | SELECT, INSERT |
| `work_order_parts` | yes | SELECT, INSERT |
| `work_order_photos` | yes | SELECT, INSERT |
| `work_order_step_results` | yes | SELECT, INSERT, UPDATE |
| `work_orders` | yes | SELECT, INSERT, UPDATE, DELETE |

Important interpretation:

- Missing operation policies are not automatically a gap. Several tables intentionally do not expose direct deletes or updates because those operations happen through controlled workflows, service-role cleanup, or not at all.
- Source includes repeated policy definitions across incremental SQL steps; duplicates in source are migration history, not necessarily duplicate live policies.
- Live policy inventory still needs dashboard/admin SQL to prove the exact current database state.

## Current Bottom Line

The core tenant-isolation test requested here passed: a Taylor technician token could not read QA Facility rows across app-used tables.

Direct anonymous table reads are denied across app-used tables.

The remaining RLS audit work is not app-code work. It is admin metadata work:

1. Create one QA Facility location if we want to finish the `ensure_location_request_link` denial test.
2. Run a Supabase Dashboard SQL inventory for live `pg_tables`, `pg_policies`, function grants, and storage policies.
3. Restore authenticated GitHub Actions verification before continuing high-risk modularization phases.
