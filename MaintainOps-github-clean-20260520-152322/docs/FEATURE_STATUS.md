# MaintainOps Feature Status

This file tracks what exists, what is considered stable enough for continued QA, and what still needs attention.

## Working Core

- Supabase email/password login and signup.
- Company creation and company selection.
- Multi-tenant data by `company_id`.
- Location-scoped workspace by `location_id`.
- Top-banner location switcher.
- Mobile tech location lock.
- Work order list with server paging.
- My Work and Work Orders dashboard gauges.
- Clickable gauge filters.
- Quick Fix work order creation.
- Full Create Work Order guided form.
- Work order detail/edit.
- Status changes.
- Assignment and reassignment.
- Outside vendor assignment marker.
- Comments.
- Photo upload with client-side resize.
- Parts inventory.
- Parts usage on work orders.
- Parts documents/receipts attachment.
- Equipment hierarchy.
- Equipment deletion for manager/admin.
- Preventive maintenance schedules.
- PM-generated work orders.
- Procedure templates and checklist steps.
- Procedure checklist result saving.
- Safety-device completion check.
- Work order history/events.
- Message center.
- Message links to work orders.
- Team invites.
- Team role updates.
- Company logo upload.
- Public request QR/link concept per location.
- Location-scoped search.
- Mobile shell and desktop layout.

## Stable Enough For QA

These have been exercised repeatedly, including desktop/mobile smoke passes:

- Login recovery after browser issues.
- Create/edit/delete parts.
- Create/update/delete equipment.
- Create/update/delete work orders where permissions allow.
- Comments and comment refresh.
- Photo upload and metadata.
- Procedure connection and checklist updates.
- PM to work order.
- Parts use and restock.
- Search by part name/number and related work orders.
- Location switch reload.
- Manager role behavior.
- Technician role restrictions.
- 10,000+ work order stress testing.

## Recently Added Or Changed

- Work-card warning badges made darker.
- Work-card badge row changed to prevent desktop clipping.
- Location list changed to Taylor Metal branches.
- Topbar location selector added.
- `profiles.mobile_tech` added.
- Location switching locked unless manager/admin or Mobile tech.
- Mobile tech setting moved to Team under My Profile.

## Deferred / Not Yet Fully Built

- Invite default location.
  - Desired behavior: invite carries a default `location_id`; first login lands user in that branch.

- User location default.
  - We likely need `company_members.default_location_id` or similar.

- Location-specific permission rules.
  - User does not want this overcomplicated now. Do not build per-location access restrictions unless specifically requested.

- Better search result exploration at huge scale.
  - Current search returns usable previews and paged work-order search.
  - Later add explicit "view all matching results" screens.

- Request external intake final hosting path.
  - QR code/link concept exists, but GitHub Pages/public path needs final production routing cleanup.

- Automated tests.
  - Current testing is manual/browser/API stress testing.
  - No formal test runner exists yet.

## UI Direction

Keep practical field use in mind:

- Mobile-first for technicians.
- Quick Fix is the fastest action.
- Avoid clutter on My Work.
- Keep completed work out of default views.
- Use strong warning badges for critical/overdue/safety.
- Cards should stay consistent in size and structure.
- Parts should stay compact and searchable.

## Do Not Regress

- Do not remove existing Supabase/RLS protections.
- Do not remove location scoping.
- Do not make completed work show by default.
- Do not make Quick Fix heavy or multi-step by default.
- Do not hide the active location.
- Do not make technicians accidentally change locations without Mobile tech intent.
