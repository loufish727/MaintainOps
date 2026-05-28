# Supabase Authentication And Multi-Tenant Data

## Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Run the current step files below, in order, for features added after the original schema.
4. Copy `supabase-config.example.js` to `supabase-config.js`.
5. Put your Supabase project URL and publishable anon key in `supabase-config.js`.
6. Open `index.html`.

## Current SQL Setup Direction

Run `supabase/schema.sql` first when creating or refreshing a Supabase project, then apply the current `supabase/step-next-*.sql` files that are not already represented in the schema. The canonical current file list and setup cautions live in `docs/SUPABASE_SETUP.md`.

Some SQL files are audit or live-maintenance scripts, not baseline migrations. Do not run files named `audit-*` or `step-live-*` as part of a fresh baseline setup unless you are intentionally performing that specific audit or live data repair.

## Implemented

- Email/password sign up and login.
- Company creation through the `create_company` RPC.
- Company selection for users with memberships.
- Multi-tenant tables with `company_id` on shared records.
- RLS policies that restrict shared data to company members.
- Work order list, creation, status editing, comments, and photo upload.
- Asset creation for the active company.
- Company-level work order status metrics and filtering.
- Asset list display with open work counts.
- Uploaded photo records displayed on the work order detail with private signed links.
- Private Supabase Storage bucket for work order photos.
- Locations, procedures, preventive schedules, maintenance requests, public request QR links, request photos, parts inventory, part documents, team invites, role management, message threads, company logos, work order history, safety completion checks, delete guardrails, explicit Data API grants, and role-assignment guardrails.

## Tables

- `companies`
- `profiles`
- `company_members`
- `assets`
- `work_orders`
- `work_order_comments`
- `work_order_photos`
- `locations`
- `preventive_schedules`
- `parts`
- `work_order_parts`
- `part_documents`
- `work_order_events`
- `procedure_templates`
- `procedure_steps`
- `work_order_step_results`
- `maintenance_requests`
- `public_request_links`
- `company_invites`
- `message_threads`
- `message_thread_members`
- `messages`
- `message_reads`

Additional feature tables and columns are introduced through the current `step-next-*.sql` files listed in `SUPABASE_SETUP.md`.

## Security Shape

All shared records are scoped by `company_id`. RLS policies use `private.is_company_member(company_id)` so browser clients using the anon key can only read or write rows for companies where the authenticated user has a membership.

Public request QR links do not grant app access. Anonymous users can only call the public intake RPC with a valid active token, and that RPC can only create a submitted maintenance request for the token's company/location.

Comment authors and photo uploaders are also constrained by tenant-aware composite foreign keys against `profiles(company_id, user_id)`, which keeps user references inside the same company boundary.
