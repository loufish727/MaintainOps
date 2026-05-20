# Supabase Authentication And Multi-Tenant Data

## Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Run the current step files below, in order, for features added after the original schema.
4. Copy `supabase-config.example.js` to `supabase-config.js`.
5. Put your Supabase project URL and publishable anon key in `supabase-config.js`.
6. Open `index.html`.

## Current SQL Step Order

Run these after `supabase/schema.sql` when creating or refreshing a Supabase project:

1. `supabase/step-next-team-members.sql`
2. `supabase/step-next-work-order-assignment.sql`
3. `supabase/step-next-work-order-type.sql`
4. `supabase/step-next-preventive-schedules.sql`
5. `supabase/step-next-work-order-completion.sql`
6. `supabase/step-next-parts-inventory.sql`
7. `supabase/step-next-work-order-events.sql`
8. `supabase/step-next-company-settings.sql`
9. `supabase/step-next-procedures.sql`
10. `supabase/step-next-maintenance-requests.sql`
11. `supabase/step-next-part-costs.sql`
12. `supabase/step-next-work-order-outcomes.sql`
13. `supabase/step-next-safety-checks.sql`
14. `supabase/step-next-photo-metadata.sql`
15. `supabase/step-next-part-documents.sql`
16. `supabase/step-next-part-suppliers.sql`
17. `supabase/step-next-locations.sql`
18. `supabase/step-next-location-integrity.sql`
19. `supabase/step-next-storage-cleanup.sql`
20. `supabase/step-next-team-invites.sql`
21. `supabase/step-next-team-roles.sql`
22. `supabase/step-next-admin-delete-work-orders.sql`
23. `supabase/step-next-message-center.sql`
24. `supabase/step-next-message-work-order-links.sql`
25. `supabase/step-next-company-logo.sql`
26. `supabase/step-next-safety-check-completion-only.sql`
27. `supabase/step-next-security-hardening.sql`
28. `supabase/step-next-public-request-links.sql`

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
- Locations, procedures, preventive schedules, maintenance requests, public request QR links, parts inventory, part documents, team invites, role management, message threads, company logos, work order history, and safety completion checks.

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

## Security Shape

All shared records are scoped by `company_id`. RLS policies use `private.is_company_member(company_id)` so browser clients using the anon key can only read or write rows for companies where the authenticated user has a membership.

Public request QR links do not grant app access. Anonymous users can only call the public intake RPC with a valid active token, and that RPC can only create a submitted maintenance request for the token's company/location.

Comment authors and photo uploaders are also constrained by tenant-aware composite foreign keys against `profiles(company_id, user_id)`, which keeps user references inside the same company boundary.
