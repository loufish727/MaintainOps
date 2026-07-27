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
- Collapsible conversions reference tab for common shop measurements, square footage, expanded common inch thread lookup, wrench/head-size lookup, and a screen-fit bolt gauge.
- Equipment hierarchy.
- Equipment can classify tooling/setup records separately from machines, sub-assemblies, components, and shop items.
- Equipment deletion for manager/admin.
- Preventive maintenance schedules.
- PM-generated work orders.
- Procedure checklist templates and checklist steps.
- Procedure checklist result saving.
- Safety-device completion check.
- Work order history/events.
- Message center.
- Message links to work orders.
- Team invites and single-use join links.
- Team-managed request email recipient routing.
- Team role updates.
- Team navigation groups members, profile, security, roles, notifications, invitations, and advanced tools into expandable sections; Team Members opens by default and open sections survive workspace rerenders.
- Company logo upload.
- Public request QR/link intake per location.
- Location-scoped search.
- Work order cards show due date and created date at a glance.
- Work order types use one operational taxonomy everywhere: Corrective, Preventive, and Fabrication. Legacy Reactive and Request values map to Corrective; Inspection maps to Preventive; Fabrication is selected manually.
- Converted request cards identify the team member who converted the request using the recorded reviewer/converter profile, with explicit legacy-data fallbacks.
- Mobile shell and desktop layout.
- The full Shop Reference Charts library is retained and tested but currently hidden behind `SHOP_REFERENCE_CHARTS_ENABLED`; its data files are not loaded while the feature is off.

## Stable Enough For QA

These have been exercised repeatedly, including desktop/mobile smoke passes:

- Login recovery after browser issues.
- Create/edit/delete parts.
- Create/update/delete equipment.
- Create/update/delete work orders where permissions allow.
- Comments and comment refresh.
- Photo upload and metadata.
- Procedure checklist connection and checklist updates.
- PM to work order.
- Parts use and restock.
- Search by part name/number and related work orders.
- Location switch reload.
- Manager role behavior.
- Technician role restrictions.
- 10,000+ work order stress testing.

## Recently Added Or Changed

- The lazy App Performance workspace now separates real-user browser health, company storage capacity, operational workload, and synthetic hosted checks. Objective Good/Watch/Poor gauges show targets, basis, and sample counts; missing evidence remains Collecting. The 3D scene has Auto, Efficient, and Ultra quality modes with device-aware rendering, while a daily read-only GitHub monitor records deployed resource status, latency, and payload size.
- Conversions tab added with collapsible length, area, weight, temperature, volume, pressure, torque, expanded common inch thread reference, wrench/head-size reference, and a calibrated screen-fit bolt gauge with selectable Thread / Nut ID and Head / Wrench modes. The sizing circle is green, the calibration bar is red, and calibration can be locked per device.
- Work order cards now include a created-date stamp alongside existing due-date/context metadata.
- Follow-up work creation now uses a days-based due-date target from Planning instead of creating follow-up work with no due date. `actual_minutes` remains labor/completion duration data for analytics and exports.
- Equipment detail includes a visible structure guide explaining machine/line, sub-assembly, tooling/setup, and component/part logic for complex lines like progressive roll formers and ASC lines.
- Shop reference chart cards were adjusted to follow the app's card pattern: collapsed headline cards, one expanded chart at a time, full-width desktop detail layout, mobile stacked label/value rows so table content does not clip on phones, stronger favorite styling, and favorites that persist to the signed-in user's `user_preferences` row when available, with browser `localStorage` retained as a fallback/cache.
- Shop reference charts were expanded from 17 to 37 total cards with 20 common part-ID/reference additions including sensors, VFD faults, fuse classes, contactors/overloads, motor nameplates, pneumatic/hydraulic IDs, couplings, rollers, photoeyes, proximity sensors, thermocouples, hose clamps, threadlocker, bearing suffixes, belt codes, and chain sprocket IDs. A search bar now filters relevant cards without connecting to inventory or Supabase.
- Main conversion cards were restyled as color-coded white tool tiles so length, area, weight, temperature, volume, pressure, and torque read as distinct quick tools instead of a plain list.
- Shop reference charts now have a documented relevance standard and first-pass "Very common" row highlighting for researched wire gauge, socket/wrench, and bearing rows so high-frequency field references stand out without turning the charts into policy or opinion content.
- Shop reference expanded row details now emphasize Mechanic 101, common confusion, senior tech notes, verify-by guidance, risk/signal, source family, and examples. The generic related-chart box was removed because it added navigation noise without improving field judgment.
- Highlighted "Very common" reference rows now use row-specific teaching text instead of only generic category fallback, so examples like 14 AWG, 10mm, and 6205 explain the actual nearby mistake and field reason they matter.
- Shop reference source validation is now documented separately: identification charts require 4-source validation, decision charts require 10-source validation, and highlighted rows require row-specific support before deeper teaching text is treated as reviewed.
- A new Spark Plug Condition Reference chart was added as the first source-validation process trial: it uses 4-source validation, mechanic-facing condition rows, signal-only detail expansion, and row-specific teaching text for common failure/high-consequence plug conditions.
- Request email notifications use the backend outbox and Supabase Edge Function sender path. Production currently routes through the configured Google Apps Script webhook; the Resend path remains scaffolded but is not configured.
- Badged shop reference rows now have a stricter detail gate: signal rows must use row-specific teaching, not generic category fallback. Spark Plug Ash deposits was corrected, and Hydraulic Fluid Condition Reference was added as the second trial.
- Extension Cord Load Reference now applies the same signal-detail rule as a simple-looking but higher-scrutiny common-spec chart: selected cord/load/jacket rows get row-specific teaching while unbadged rows stay clean.
- Auth verification callback flow now returns verified users through MaintainOps instead of a dead-end Supabase page.
- RLS and public-schema grant hardening were reviewed against the current app-used Supabase surface.
- Security verification commands now cover static SQL/RPC checks, anonymous table-access denial, invalid public request token behavior, and a tested cross-company read probe for selected high-value tables.
- Technician manager/admin mutation probes now verify that technician credentials are rejected by role-management, invite, company-logo, and public-request-link admin RPCs.
- Public request photo attach probing found a live RPC hardening gap; `supabase/step-next-public-request-photo-attach-hardening.sql` was applied and the random/mismatched request attach probes now pass.
- Storage MIME hardening was applied to photo and document buckets; photo-only buckets stay image-only while part/equipment document buckets allow common shop files up to 25 MB. Media storage workflow smoke and public/storage boundary probes passed afterward.
- Authenticated upload failures now create internal app issue reports with upload context, file name, MIME/type inference, size, and error details so unsupported-file reports are visible to managers/admins.
- Public request intake now has a per-link 10-submissions-per-minute database throttle; live throttle smoke accepted 10 disposable requests, rejected the next 2, and cleanup passed.
- Major workflow, render, event, service, query, and utility code has been extracted from the legacy `app.js` into `src/`.
- `app.js` is currently about 6,400 physical lines and its remaining shell/coordinator role is tracked in `APP_JS_AUTHORITY_MAP.md`.
- Same-session workspace bootstrap is single-flight guarded, company-logo signed URLs are cached, and dashboard/My Work totals use one scoped aggregate RPC. The isolated testing platform dropped from about 88 Supabase requests per initial workspace load to 29, and the authenticated proof now fails above 35 or when a core loader repeats.
- Production JavaScript and CSS are minified into content-hashed assets with external source maps. The workspace builds only the active screen, and Manager, Financial, Team presentation, and Admin Setup load as screen-specific feature chunks. Deterministic bundle budgets and authenticated request, visible-time, DOM-size, and lazy-load assertions prevent startup weight from silently returning.
- Startup now waits for the initial Supabase session check before presenting editable login fields. This removed a WebKit-visible race that could clear an email and password entered while startup was still settling.
- The dashboard gauge sprite was re-encoded from 1,960,314-byte PNG to a 188,356-byte WebP without changing its dimensions.
- The production workspace now has a skip link, one page-level heading, active-navigation `aria-current`, and one shared live status region.
- Manual CSS/config cache tags were replaced by build-derived content hashes.
- A static DOM audit now fail-closes on any first-party `innerHTML` assignment outside the 31 reviewed assignment sites.
- Public request-link admin button binding was extracted behind injected callbacks; public request token generation was extracted into a focused utility; public request-link RPCs and intake submit remain app-owned.
- Storage restore/incident response, public request intake hardening, and public exposure review remain pilot-readiness workstreams. The database restore drill has passed.
- Smoke tests and GitHub Actions resource-load proof now cover the current deployment path.
- Work-card warning badges made darker.
- Work-card badge row changed to prevent desktop clipping.
- Location list changed to Taylor Metal branches.
- Topbar location selector added.
- `profiles.mobile_tech` added.
- Location switching locked unless manager/admin or Mobile tech.
- Mobile tech setting moved to Team under My Profile.
- Invite default location is enforced for team invites.
- Team join links are single-use, expire after 7 days, and are copy/send manual; they do not send email automatically.
- Applied SQL migration tracking exists in `public.applied_migrations`; initial rows were backfilled for join links and the tracking migration itself.

## Deferred / Not Yet Fully Built

- User location default self-service.
  - `company_members.default_location_id` exists for invite/location-lock behavior.
  - A fuller admin/user-facing default-location management screen can still be refined later.

- Location-specific permission rules.
  - User does not want this overcomplicated now. Do not build per-location access restrictions unless specifically requested.

- Better search result exploration at huge scale.
  - Current search returns usable previews and paged work-order search.
  - Later add explicit "view all matching results" screens.

- Public request production polish.
  - QR/link intake exists through scoped public RPC paths.
  - Custom-domain routing, final public-facing copy, and production support process still need a final rollout pass.

- Automated test coverage.
  - Current coverage includes the required fast Release Gate, manual Full Strict LFES, recursive SQL and DOM assignment inspection, isolated PostgreSQL/RLS checks, targeted smoke tests, hosted resource checks, four-role Chromium proof, and a signed-in WebKit admin contract against the testing platform.
  - Numeric line/branch coverage and an exhaustive live mutation/cross-browser matrix do not exist yet.

- Operational readiness.
  - The database Restore to a New Project drill passed on 2026-06-11; see `BACKUP_RESTORE_VALIDATION.md`.
  - The storage mirror completed an initial full backup, but automated scheduling and a stored-object restore drill remain open.
  - Pilot hardening gates for support, public request rollout, mobile/photo verification, and controlled onboarding are tracked in `PILOT_HARDENING_PLAN.md`.
  - Public exposure review is ongoing as the app remains publicly hosted and publicly reviewable.

- Offline write resilience.
  - Offline/reconnect telemetry exists, but Quick Fix and work-order mutations do not yet have a durable IndexedDB outbox. This remains a separate data-conflict and recovery design effort.

- Configurable response security headers.
  - GitHub Pages cannot emit the clickjacking and content-type headers needed for broader external deployment. A move to a configurable static host remains open.

## UI Direction

Keep practical field use in mind:

- Mobile-first for technicians.
- Quick Fix is the fastest action.
- Avoid clutter on My Work.
- Keep completed work out of default views.
- Use strong warning badges for critical/overdue/safety.
- Cards should stay consistent in size and structure.
- Parts should stay compact and searchable.
- Wide reference data should use responsive layouts on mobile rather than requiring hidden horizontal table scrolling.

## Do Not Regress

- Do not remove existing Supabase/RLS protections.
- Do not remove location scoping.
- Do not make completed work show by default.
- Do not make Quick Fix heavy or multi-step by default.
- Do not hide the active location.
- Do not make technicians accidentally change locations without Mobile tech intent.
- Do not remove the browser fallback/cache for shop reference favorites unless a replacement offline/failure behavior is defined.
