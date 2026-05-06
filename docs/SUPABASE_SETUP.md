# Supabase Setup

This project depends on Supabase Auth, Database, RLS policies, RPC functions, and storage buckets.

## Config File

Create `supabase-config.js` from `supabase-config.example.js`.

Required values:

```js
window.SUPABASE_URL = "https://lbphkzznvvumemdkqoay.supabase.co";
window.SUPABASE_ANON_KEY = "your-publishable-anon-key";
```

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
- `step-next-asset-hierarchy.sql`
- `step-next-asset-type-secondary-machine.sql`
- `step-next-asset-type-shop-item.sql`
- `step-next-company-logo.sql`
- `step-next-company-settings.sql`
- `step-next-equipment-delete.sql`
- `step-next-location-integrity.sql`
- `step-next-locations.sql`
- `step-next-login-memberships.sql`
- `step-next-maintenance-requests.sql`
- `step-next-message-center.sql`
- `step-next-message-work-order-links.sql`
- `step-next-mobile-tech-setting.sql`
- `step-next-part-costs.sql`
- `step-next-part-delete.sql`
- `step-next-part-documents.sql`
- `step-next-parts-inventory.sql`
- `step-next-part-suppliers.sql`
- `step-next-photo-metadata.sql`
- `step-next-preventive-schedules.sql`
- `step-next-procedures.sql`
- `step-next-public-request-links.sql`
- `step-next-safety-check-completion-only.sql`
- `step-next-safety-checks.sql`
- `step-next-security-hardening.sql`
- `step-next-storage-cleanup.sql`
- `step-next-team-invites.sql`
- `step-next-team-members.sql`
- `step-next-team-roles.sql`
- `step-next-work-order-assignment.sql`
- `step-next-work-order-completion.sql`
- `step-next-work-order-events.sql`
- `step-next-work-order-outcomes.sql`
- `step-next-work-order-type.sql`

## Recent Required SQL

Mobile tech profile setting:

```sql
alter table public.profiles
add column if not exists mobile_tech boolean not null default false;

notify pgrst, 'reload schema';
```

## Taylor Metal Location Cleanup

Company ID:

`0875d674-7f07-4493-8668-701d192f4421`

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
- Managers/admins can manage team roles through RPC.

Do not disable RLS as a quick fix.

## Storage Buckets

Known storage usage:

- Work order photos.
- Company logos.
- Part documents/receipts/invoices.

Client-side image resizing is used for work order photos and logos to avoid storing oversized uploads.

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
where cm.company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid
  and cm.user_id = u.id
  and lower(u.email) = lower('louie@taylormetal.com');

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
where lower(u.email) = lower('louie@taylormetal.com');
```
