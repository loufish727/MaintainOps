# Supabase Setup

This project depends on Supabase Auth, Database, RLS policies, RPC functions, and storage buckets.

## Config File

Create `supabase-config.js` from `supabase-config.example.js`.

Required values:

```js
window.SUPABASE_URL = "https://lbphkzznvvumemdkqoay.supabase.co";
window.SUPABASE_ANON_KEY = "your-publishable-anon-key";
```

## Auth Redirect Configuration

MaintainOps uses a dedicated verification callback page so Supabase email-confirmation links return users to the app instead of a dead-end Supabase page.

Supabase Dashboard > Authentication > URL Configuration:

- Site URL: `https://loufish727.github.io/MaintainOps/`
- Redirect URLs:
  - `https://loufish727.github.io/MaintainOps/auth/callback/`

The signup form passes `emailRedirectTo` with the same callback URL. The callback page exchanges Supabase `code` links or hash-token links into a browser session, then redirects to the MaintainOps workspace. Password-reset emails still return to the main app so the existing reset-password form can accept the recovery session.

Do not commit private service-role keys.

## Current Known Project URL

`https://lbphkzznvvumemdkqoay.supabase.co`

## SQL Setup Direction

Fresh setup should start with:

1. Run `supabase/schema.sql`.
2. Run the `supabase/step-next-*.sql` files that are not already included in the schema.
3. Refresh the browser after SQL changes.

The project has evolved quickly, so when in doubt, compare `schema.sql` and the step files before assuming a fresh deploy is complete.

## Current Step Files

- `step-next-admin-delete-work-orders.sql`
- `step-next-applied-migrations.sql`
- `step-next-app-issue-reports.sql`
- `step-next-asset-audit-fields.sql`
- `step-next-asset-hierarchy.sql`
- `step-next-asset-type-secondary-machine.sql`
- `step-next-asset-type-shop-item.sql`
- `step-next-asset-type-tooling.sql`
- `step-next-cancel-team-invites.sql`
- `step-next-cleanup-delete-paths.sql`
- `step-next-company-logo.sql`
- `step-next-company-settings.sql`
- `step-next-equipment-delete.sql`
- `step-next-explicit-data-api-grants.sql`
- `step-next-invite-default-location.sql`
- `step-next-invite-links.sql`
- `step-next-invite-role-preservation.sql`
- `step-next-location-integrity.sql`
- `step-next-locations.sql`
- `step-next-login-memberships.sql`
- `step-next-maintenance-requests.sql`
- `step-next-maintenance-request-photos.sql`
- `step-next-message-center.sql`
- `step-next-message-work-order-links.sql`
- `step-next-mobile-tech-setting.sql`
- `step-next-asset-parts.sql`
- `step-next-asset-type-forklift.sql`
- `step-next-equipment-document-delete-admins.sql`
- `step-next-equipment-document-record-delete.sql`
- `step-next-part-costs.sql`
- `step-next-part-delete.sql`
- `step-next-part-documents.sql`
- `step-next-parts-inventory.sql`
- `step-next-part-suppliers.sql`
- `step-next-photo-metadata.sql`
- `step-next-preventive-schedules.sql`
- `step-next-procedures.sql`
- `step-next-public-request-link-admin-controls.sql`
- `step-next-public-request-links.sql`
- `step-next-public-request-photo-attach-hardening.sql`
- `step-next-public-request-rate-limit.sql`
- `step-next-request-notification-recipients.sql`
- `step-next-request-email-outbox.sql`
- `step-next-qa-rls-location-fixture.sql`
- `step-next-record-work-order-part-usage.sql`
- `step-next-rls-bulletproof-hardening.sql`
- `step-next-rpc-execute-hardening.sql`
- `step-next-safety-check-completion-only.sql`
- `step-next-safety-checks.sql`
- `step-next-security-hardening.sql`
- `step-next-storage-cleanup.sql`
- `step-next-storage-mime-hardening.sql`
- `step-next-team-invites.sql`
- `step-next-team-members.sql`
- `step-next-team-roles.sql`
- `step-next-role-model-technician-manager-admin.sql`
- `step-next-technician-assignment-guardrails.sql`
- `step-next-work-order-assignment.sql`
- `step-next-work-order-completion.sql`
- `step-next-work-order-events.sql`
- `step-next-work-order-outcomes.sql`
- `step-next-work-order-type.sql`

Migration tracking:

Run `supabase/step-next-applied-migrations.sql` before relying on the app to record which manual SQL steps have been applied live. Older migrations still need one-time backfill from dashboard inspection and known handoff history.

## Request Email Notifications

MaintainOps stores request-email recipients in `public.request_notification_recipients`, then queues one private email notification per matching recipient when a new row is inserted into `public.maintenance_requests`.

Setup steps:

1. Run `supabase/step-next-request-notification-recipients.sql` if it is not already installed.
2. Run `supabase/step-next-request-email-outbox.sql`.
3. Run `supabase/step-next-request-email-outbox-rpc.sql` so the Edge Function can claim and complete private outbox rows without exposing the `private` schema.
4. Deploy the Edge Function:

```powershell
npx supabase functions deploy request-emailer --project-ref lbphkzznvvumemdkqoay --no-verify-jwt
```

5. Set the email-provider secrets. The current function expects Resend:

```powershell
npx supabase secrets set RESEND_API_KEY="paste-provider-key" REQUEST_EMAIL_FROM="MaintainOps <requests@your-verified-domain.com>" REQUEST_EMAIL_APP_URL="https://loufish727.github.io/MaintainOps" --project-ref lbphkzznvvumemdkqoay
```

For the Taylor beta no-new-paid-provider path, the same function can send through Google Apps Script instead:

```powershell
npx supabase secrets set GOOGLE_SCRIPT_WEBHOOK_URL="paste-google-script-web-app-url" GOOGLE_SCRIPT_WEBHOOK_SECRET="paste-shared-secret" REQUEST_EMAIL_APP_URL="https://loufish727.github.io/MaintainOps" --project-ref lbphkzznvvumemdkqoay
```

See `docs/GOOGLE_APPS_SCRIPT_REQUEST_EMAILER.md`.

The frontend calls the Edge Function after a request is created, but request creation does not fail if the email sender is not configured. The function is deployed without JWT verification so anonymous public QR submissions can invoke it after the database creates the request. The function only processes existing queued request IDs and sends only to configured company recipients; it does not accept arbitrary recipient addresses from the browser.

Taylor beta note: `maintenance@taylormetal.com` is currently configured as the request notification recipient while Salem is the only active QR request flow. Before activating QR request links for another Taylor location, scope request notification recipients by `location_id` so each location can use its own email routing.

## Recent Required SQL

Explicit Data API grants:

Run `supabase/step-next-explicit-data-api-grants.sql` after schema/setup changes and whenever new public tables or RPCs are added. This keeps MaintainOps ready for Supabase's 2026 change where new `public` schema tables are not exposed to the Data API unless explicit grants exist.

Do not grant direct `anon` access to app tables unless a table is intentionally public. QR request intake should stay behind scoped RPC functions such as `get_public_request_intake` and `submit_public_location_request`.

Mobile tech profile setting:

```sql
alter table public.profiles
add column if not exists mobile_tech boolean not null default false;

notify pgrst, 'reload schema';
```

User preference sync:

Run `supabase/step-next-user-preferences.sql` before expecting shop reference favorites to follow a user across browsers/devices. The app keeps a browser `localStorage` fallback/cache if the table is not available.

Invite role preservation:

Run `supabase/step-next-invite-role-preservation.sql` if an existing teammate accepts a pending invite after their role has already been set. This prevents invite acceptance from downgrading an existing higher role such as admin or manager.

Accounting role:

Run `supabase/step-next-accounting-role.sql` before assigning the Accounting role. It expands team role constraints and role-management RPCs while keeping accounting out of manager/admin operational permissions.

Asset financial register:

Run `supabase/step-next-asset-financials.sql` before saving finance-only equipment fields from the Financial tab. It creates `asset_financials`, keyed by equipment, with RLS that allows company members to read and only admin/manager/accounting roles to insert or update finance records.

Equipment part links:

Run `supabase/step-next-asset-parts.sql` before linking parts directly to equipment. This creates the `asset_parts` join table so equipment can list recommended/common parts without recording work-order usage or changing inventory quantity.

Equipment tooling type:

Run `supabase/step-next-asset-type-tooling.sql` before selecting `Tooling / Setup` as an equipment type. It updates the `assets.asset_type` constraint so roll tooling sets, die sets, profile setups, and station tooling can be tracked separately from machines, sub-assemblies, components, and shop items.

Maintenance request photos:

Run `supabase/step-next-maintenance-request-photos.sql` before testing QR or internal request photo uploads. It adds optional request photo metadata columns, creates the private `maintenance-request-photos` bucket, and installs the public QR upload policy plus the attach RPC.

Public request photo attach hardening:

Run `supabase/step-next-public-request-photo-attach-hardening.sql` after `step-next-maintenance-request-photos.sql`. It hardens `attach_maintenance_request_photo` so random request ids, mismatched storage paths, expired/non-public requests, and no-op updates are rejected.

Storage MIME hardening:

Run `supabase/step-next-storage-mime-hardening.sql` after the storage buckets exist. It enforces bucket-level MIME allowlists and file-size limits for `work-order-photos`, `maintenance-request-photos`, `part-documents`, and `asset-documents`.

Run `supabase/step-next-storage-upload-compatibility.sql` if the live bucket settings drift from the UI copy. Photo-only buckets should allow common image MIME types up to 5 MB. Part/equipment document buckets should allow common shop files and optimized images up to 25 MB.

Public request rate limiting:

Run `supabase/step-next-public-request-rate-limit.sql` after public request links exist. It creates `private.public_request_rate_limits` with RLS enabled and direct client access revoked, then updates `submit_public_location_request` to limit each public request link to 10 submissions per minute.

## QA Location Cleanup

Expected locations:

- Salem, OR
- Riverside, CA
- Spokane, WA
- Sacramento, CA
- Auburn, WA

If a duplicate `Riverside` row exists, merge it into `Riverside, CA` and move related records first.

## RLS Expectations

RLS should be enabled on shared tables.

Core rules:

- Users only access companies they belong to.
- Shared records are scoped by `company_id`.
- Location-bearing records must belong to the same company/location.
- Profiles can be read by company members.
- Users can update their own profile.
- Admins can manage team roles through RPC. Managers can invite technicians, but cannot grant manager/admin authority.

Do not disable RLS as a quick fix.

## Storage Buckets

Known storage usage:

- Work order photos.
- Maintenance request photos.
- Company logos.
- Part documents/receipts/invoices.
- Equipment photos, schematics, settings, manuals, and related machine files.

Client-side image resizing is used for work order photos, maintenance request photos, part/equipment image files, and logos to avoid storing oversized uploads. Work order and maintenance request photos are capped at a 768px max dimension; equipment and part image files keep the larger operational-document optimization path. Large HEIC/HEIF photos may need to be converted, screenshotted, or retaken as JPG/PNG if the browser cannot optimize them.

## Common Recovery Snippets

Reload PostgREST schema cache:

```sql
notify pgrst, 'reload schema';
```

Make a tester manager:

```sql
update public.company_members cm
set role = 'manager'
from auth.users u
where cm.company_id = '<company-id>'::uuid
  and cm.user_id = u.id
  and lower(u.email) = lower('<tester-email>');

notify pgrst, 'reload schema';
```

Check a user's membership role:

```sql
select
  u.email,
  cm.company_id,
  cm.user_id,
  cm.role
from public.company_members cm
join auth.users u on u.id = cm.user_id
where lower(u.email) = lower('<tester-email>');
```
