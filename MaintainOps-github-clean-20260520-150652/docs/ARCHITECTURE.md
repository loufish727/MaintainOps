# MaintainOps Architecture

MaintainOps is currently a vanilla browser app backed by Supabase. It is intentionally simple: one HTML file, one large JavaScript file, one CSS file, and SQL migration files.

## Frontend Files

- `index.html`
  - Loads Supabase client, QR code generator, `supabase-config.js`, and `app.js`.
  - Cache-buster query strings are manually bumped after changes.

- `app.js`
  - Auth, data loading, rendering, event binding, and Supabase operations.
  - Major concerns live in this file right now: work orders, parts, equipment, PM, procedures, messages, settings, team, search, and QA support.

- `src/utils/constants.js`
  - Pure shared constants extracted from `app.js` during LFES modularization Phase 1.

- `src/utils/dom.js`
  - Pure DOM-safe escaping helper.

- `src/utils/formatting.js`
  - Pure formatting, file-name, date, role-label, CSV cell, and due-state helpers extracted from `app.js`.

- `styles.css`
  - App styling for desktop and mobile.
  - Includes dark sleek theme, mobile shell, card layouts, gauges, badges, and form styling.

- `assets/gauges/gauge-status-sprite.png`
  - Current approved gauge artwork sheet used for status dashboard buttons.

## LF Engineering Standard

- `docs/LFES`
  - Internal engineering continuity and review framework.
  - LFES Core is the everyday standard for controlled changes.
  - LFES Gold is the strict audit mode used before professional review, production release, major refactor, security/RLS work, app store preparation, or onboarding real companies.
  - LFES does not replace `docs/DEBUG_PROCESS.md`; it preserves reasoning, traceability, assumptions, operational visibility, and safe evolution above the functional Debug Protocol.

## Supabase Architecture

The app is multi-tenant by `company_id`.

Important shared tables include:

- `companies`
- `locations`
- `profiles`
- `company_members`
- `assets`
- `work_orders`
- `work_order_comments`
- `work_order_photos`
- `work_order_parts`
- `parts`
- `part_documents`
- `preventive_schedules`
- `procedure_templates`
- `procedure_steps`
- `work_order_step_results`
- `work_order_events`
- `maintenance_requests`
- `message_threads`
- `message_thread_members`
- `message_reads`
- `messages`
- `public_request_links`

Every shared operational record should include `company_id`. Location-scoped operational records should include `location_id`.

Use `supabase/step-next-location-integrity-audit.sql` as the read-only audit before correcting location routing data or validating location foreign-key constraints. Run the SELECT blocks separately in Supabase so any finding can be reviewed before a targeted correction is written.

Request photo intake stores one optional optimized photo on `maintenance_requests` with `photo_*` metadata fields and the private `maintenance-request-photos` storage bucket. QR request photos use the same client-side optimization helper as work-order photos: image uploads are resized to a 2400px max dimension and encoded as JPEG at quality 0.88 when the browser supports it.

## Company And Location Model

Companies hold shared business identity and membership.

Locations separate operational data inside a company. The app should show one active location at a time, not an all-locations work queue by default.

Current approach:

- Managers/admins can switch locations from the top banner.
- Technicians can switch locations only when their profile has `mobile_tech = true`.
- The `Mobile tech` setting is intentionally in Team under My Profile.
- Team invites can carry a `default_location_id`. When the invited user accepts the invite, that location is copied to `company_members.default_location_id`; app startup uses it when there is no saved active location for that user/company yet.
- This avoids accidental location changes while still allowing a tech to work at another branch when they intentionally opt in.
- When a selected machine/equipment belongs to a different location than the active location, the app warns the user before saving and explains that the work/request/PM will route to the equipment's location. This preserves equipment-driven location integrity while making cross-location saves intentional.

## Roles

Known company roles:

- `admin`
- `manager`
- `technician`

Role behavior:

- Admins have full company setup, team, settings, delete, and work access.
- Managers can manage work, requests, team roles, company settings, parts/equipment deletes, and location switching. Managers cannot promote another user to admin.
- Technicians use My Work, Work Orders, Quick Fix, Requests, Equipment, PM, Procedures, Parts, Messages, comments, photos, and Team profile settings. Technicians can turn requests into work orders, create work, and claim unassigned work for themselves. They cannot assign work to other users, assign outside vendors, clear assignments, or steal work already assigned to someone else. Technicians do not see Admin Setup/Settings and can switch locations only when Mobile tech is enabled.
- Legacy `member` rows are treated as technicians and should be migrated to `technician` with `supabase/step-next-role-model-technician-manager-admin.sql`.

## Work Order Statuses

Current status constants:

- `open`
- `in_progress`
- `blocked`
- `completed`

UI labels:

- `open` is presented as `New` in many places.
- `in_progress` is active work being handled.
- `blocked` is waiting on something.
- `completed` is done and not shown by default in main work queues.

## Equipment Model

The app table is still named `assets`, but the UI language now uses `Equipment`.

Asset types:

- `machine`
- `secondary_machine`
- `component`
- `shop_item`

Business meaning:

- `machine`: top-level equipment such as a roll former.
- `secondary_machine`: substantial attached equipment such as a decoiler.
- `component`: part of a machine, such as an entry guide or shear.
- `shop_item`: object or support item, such as a sawhorse.

Safety checks are required only when a work order has equipment that requires safety devices.

Equipment deletion is intentionally conservative. Because Work Orders and Requests are server-paged, delete confirmation must verify linked work orders, PM schedules, and requests with live Supabase count checks before deletion, not only by counting the rows currently loaded in the browser.

Procedure deletion follows the same traceability rule. A procedure template must verify live linked work-order and PM-schedule counts before delete confirmation or final delete, because paged work-order data can undercount links in the browser.

## Work Orders

Work orders can be created through:

- Quick Fix
- Full Create Work Order flow
- Preventive maintenance schedule generation
- Request conversion
- Follow-up work

Important relationships:

- `work_orders.asset_id`
- `work_orders.assigned_to`
- `work_orders.location_id`
- `work_orders.procedure_template_id`
- `work_order_parts.work_order_id`
- `work_order_comments.work_order_id`
- `work_order_photos.work_order_id`
- `work_order_events.work_order_id`
- `message_threads.work_order_id`

## Search And Pagination

Work order and request list fetches are server-paged, currently 12 per page. Request filters use separate count queries for Active, Converted, and All so converted history can stay available without loading every request into the browser.

Constants:

- `WORK_ORDERS_PER_PAGE = 12`
- `PARTS_PER_PAGE = 12`
- `ASSETS_PER_PAGE = 12`
- `LIST_ITEMS_PER_PAGE = 12`
- `SEARCH_ID_PAGE_SIZE = 1000`

Global search is location-scoped. Work-order search can follow related data such as parts used, comments, photos, history, and checklist results.

Known future need:

- A richer `view all matching work orders` path for huge global searches.

## Security Model

RLS should remain enabled on shared tables.

Policies should enforce:

- Authenticated users only.
- Company membership for reads/writes.
- Company and location integrity.
- Admin/manager restrictions for destructive or team-management actions.

Security-definer functions should pin `search_path`.

Data API access should be explicit for Supabase's 2026 public schema grant changes:

- App tables use explicit grants to `authenticated` plus RLS policies.
- Backend/admin API usage gets explicit `service_role` grants.
- Anonymous access should stay on narrowly scoped RPCs, such as public QR request intake, instead of direct table access.

Known security hardening already addressed:

- Company names escaped in UI.
- Some security-definer functions hardened.
- Message membership policy was tightened.

Do not weaken RLS for convenience.
