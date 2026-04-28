# Supabase Authentication And Multi-Tenant Data

## Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Copy `supabase-config.example.js` to `supabase-config.js`.
4. Put your Supabase project URL and publishable anon key in `supabase-config.js`.
5. Open `index.html`.

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

## Tables

- `companies`
- `profiles`
- `company_members`
- `assets`
- `work_orders`
- `work_order_comments`
- `work_order_photos`

## Security Shape

All shared records are scoped by `company_id`. RLS policies use `private.is_company_member(company_id)` so browser clients using the anon key can only read or write rows for companies where the authenticated user has a membership.

Comment authors and photo uploaders are also constrained by tenant-aware composite foreign keys against `profiles(company_id, user_id)`, which keeps user references inside the same company boundary.
