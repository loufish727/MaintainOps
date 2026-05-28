# MaintainOps Architecture

MaintainOps is currently a vanilla browser app backed by Supabase. It is intentionally simple: static HTML/CSS/JavaScript, browser-loaded modules, SQL migration files, and Supabase services.

## Frontend Files

- `index.html`
  - Loads Supabase client, QR code generator, `supabase-config.js`, extracted app modules, and `app.js`.
  - Cache-buster query strings are manually bumped after changes.

- `app.js`
  - Owns the current app shell authority: auth/session startup, company/location bootstrapping, data loading, render orchestration, module wiring, dependency injection, and event-module composition.
  - Current line count is about 4,450 after ongoing modularization work.
  - Remaining authority is tracked in `docs/APP_JS_AUTHORITY_MAP.md`; additional extraction should be based on ownership clarity and operational risk reduction, not line count alone.

- `src/`
  - Contains extracted render helpers, event-binding groups, UI state helpers, query/list helpers, and selected workflow boundaries.
  - Recent examples include `src/workflows/quickFixWorkflow.js`, `src/workflows/messageWorkflow.js`, `src/workflows/preventiveMaintenanceWorkflow.js`, `src/workflows/procedureWorkflow.js`, `src/workflows/teamWorkflow.js`, `src/workflows/companySettingsWorkflow.js`, `src/workflows/appIssueWorkflow.js`, `src/workflows/publicRequestLinkWorkflow.js`, `src/workflows/partInventoryWorkflow.js`, `src/workflows/workOrderQuickUpdateWorkflow.js`, `src/workflows/assetWorkflow.js`, `src/workflows/requestLifecycleWorkflow.js`, `src/workflows/workOrderCreationWorkflow.js`, `src/workflows/workOrderDetailEditWorkflow.js`, `src/workflows/partUsageWorkflow.js`, `src/workflows/mediaStorageWorkflow.js`, `src/workflows/companyLogoWorkflow.js`, `src/utils/csvExport.js`, `src/services/authSessionFlow.js`, and render modules for Work Order Detail, Equipment Detail, Message Center, Create Work Order, and Quick Fix.

- `styles.css`
  - App styling for desktop and mobile.
  - Includes dark sleek theme, mobile shell, card layouts, gauges, badges, and form styling.

- `assets/gauges/gauge-status-sprite.png`
  - Current approved gauge artwork sheet used for status dashboard buttons.

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

Request photo intake stores one optional optimized photo on `maintenance_requests` with `photo_*` metadata fields and the private `maintenance-request-photos` storage bucket. QR request photos use the same client-side optimization helper as work-order photos: image uploads are resized to a 2400px max dimension and encoded as JPEG at quality 0.88 when the browser supports it.

## Company And Location Model

Companies hold shared business identity and membership.

Locations separate operational data inside a company. The app should show one active location at a time, not an all-locations work queue by default.

Current approach:

- Managers/admins can switch locations from the top banner.
- Technicians can switch locations only when their profile has `mobile_tech = true`.
- The `Mobile tech` setting is intentionally in Team under My Profile.
- This avoids accidental location changes while still allowing a tech to work at another branch when they intentionally opt in.

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

Work order list fetches are server-paged, currently 12 per page.

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
- RLS and Data API exposure were reviewed for the current app-used surface.
- Anonymous direct table access is not part of the intended model.

Do not weaken RLS for convenience.
