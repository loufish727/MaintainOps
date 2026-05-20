# app.js Modularization Plan

This is a plan only. Do not modularize `app.js` until approved.

## Purpose

The purpose is not cosmetic cleanup or trendy architecture. The purpose is to preserve engineering understanding, reduce responsibility concentration, improve controlled evolution, reduce reviewer cognitive load, and preserve operational traceability.

## Current Responsibilities Inside app.js

`app.js` currently owns:

- Global state.
- Supabase client initialization.
- Auth rendering and login/signup.
- Public QR request pages.
- Company loading and creation.
- Location selection and persistence.
- Work-order loading, searching, filtering, rendering, creating, updating, assignment, completion, deletion, comments, photos, parts, history, checklist results, and follow-up work.
- Request loading, filtering, rendering, internal creation, public creation, photo attachment, conversion, Quick Fix from request, and deletion.
- Equipment rendering, creation, update, status, delete guards, and deletion.
- Parts rendering, inventory, document upload, use/restock, search, and deletion.
- PM schedule rendering, creation, deletion, and generation.
- Procedure rendering, steps, checklist handling, delete guards, and deletion.
- Team members, roles, invites, invite cancellation, profile/mobile-tech setting.
- Messages and message read state.
- App issue reports.
- Company settings, logo upload, public request URL/QR management.
- CSV export.
- Utilities for dates, formatting, escaping, files, photos, permissions, and planning metrics.
- Event binding through `bindWorkspaceEvents()`.

## Global State Variables And Dependencies

Important state groups:

- Session/company/location: `session`, `companies`, `activeCompanyId`, `locations`, `activeLocationId`.
- Work queues: `workOrders`, counts, filters, pages, search caches.
- Requests: `maintenanceRequests`, counts, request filters/pages.
- Team: `companyMembers`, `teamInvites`, readiness flags.
- Messages: `messageThreads`, `messageThreadMembers`, `messagesByThreadId`, read state.
- Domain lists: `assets`, `parts`, `procedureTemplates`, `preventiveSchedules`.
- Relationship maps: comments, photos, parts used, events, step results, part documents.
- UI mode/detail state: active work/equipment/part ids, delete confirmations, quick fix/create modes, report issue mode.
- Readiness/error flags for optional schema and storage features.

Risk: these state groups are easy to accidentally couple because they are globally visible.

## Supabase/Database Call Locations

Supabase calls appear throughout:

- Auth/session: `init`, `renderAuth`, `signInWithPasswordWithFallback`, `resetLoginState`.
- Public intake: `renderPublicRequestQrPage`, `renderPublicRequestIntake`, `submitPublicRequest`.
- Company/team: `loadCompanies`, `createCompany`, `ensureProfileForActiveCompany`, `acceptTeamInvites`, `loadMembers`, `loadTeamInvites`, role/invite RPCs.
- Data loading: `loadCompanyData`, `loadServerWorkOrderSlice`, `fetchRequestPage`, `loadComments`, `loadPhotos`, `loadPartsUsed`, `loadWorkOrderEvents`, `loadStepResults`, messages.
- Mutations: create/update/delete functions for equipment, work orders, requests, parts, procedures, PM, comments, photos, messages, settings, QR links.
- Storage: company logos, work-order photos, request photos, part documents.

Risk: data access and rendering are interleaved, which makes behavior-preserving extraction harder.

## Event Listener Locations

The main listener concentration is `bindWorkspaceEvents()` around the middle of the file. It binds navigation, location switching, search, detail opening, pagination, filters, delete buttons, forms, Quick Fix, request conversion, comments, photos, messages, public link controls, and more.

Risk: after rendering changes, missing event bindings can break buttons silently.

## Rendering Functions

Rendering functions are spread across the file:

- Top-level workspace/auth/public pages.
- Dashboard/gauges/planning.
- Work-order cards/detail/forms.
- Request cards/forms.
- Equipment cards/detail.
- Parts cards/detail.
- PM/procedure screens.
- Team, messages, settings, issue reports.

Risk: render functions often read global state directly and build event contracts through `data-*` attributes.

## Utility/Helper Functions

Utility helpers include:

- Date/time formatting.
- CSV export.
- HTML escaping.
- File name cleanup.
- Photo/logo optimization.
- Role/permission checks.
- Safety checks.
- Assignment labeling.
- Due-state calculations.
- Planning metrics.
- LocalStorage helpers.

These are the safest first extraction candidates if they have minimal global dependencies.

## Highest-Risk Areas To Move

Move these later:

- Auth/session initialization.
- Location persistence and company loading.
- Work-order mutation paths.
- Request conversion and Quick Fix-from-request.
- Public QR request intake.
- Role/invite flows.
- Delete guard logic for equipment/procedures/requests.
- Photo/storage upload paths.
- `bindWorkspaceEvents()`.

## Lowest-Risk Areas To Move First

Move these first:

- Formatting helpers.
- File name helpers.
- Date helpers.
- CSV helpers.
- Role label/description helpers.
- Pure status/due-state helpers.
- Constants.

## Suggested Target Folder Structure

```text
src/
  config/
  state/
  services/
  auth/
  features/
  render/
  utils/
```

Possible modules:

- `src/config/constants.js`
- `src/state/appState.js`
- `src/services/supabaseClient.js`
- `src/services/workOrdersService.js`
- `src/services/assetsService.js`
- `src/services/partsService.js`
- `src/services/requestsService.js`
- `src/services/teamService.js`
- `src/auth/authController.js`
- `src/features/workOrders.js`
- `src/features/assets.js`
- `src/features/parts.js`
- `src/features/preventiveMaintenance.js`
- `src/features/messages.js`
- `src/render/workOrdersRender.js`
- `src/render/dashboardRender.js`
- `src/utils/formatting.js`
- `src/utils/dom.js`
- `src/utils/files.js`

## Step-By-Step Extraction Plan

1. Create utility modules for pure helpers.
2. Run static checks and full Debug Protocol smoke.
3. Extract constants.
4. Run static checks and changed-path smoke.
5. Extract data services without changing payloads or query behavior.
6. Run Debug Protocol with work orders, requests, parts, equipment, PM, procedures.
7. Extract auth/session logic.
8. Run login/logout, company load, invite acceptance, and location persistence QA.
9. Extract feature modules one at a time: parts, equipment, procedures, PM, requests, messages, work orders.
10. Run the Debug Protocol after each feature extraction.
11. Extract render helpers last, because render/event contracts are fragile.
12. Re-run LFES Gold after the modularization series.

## Debug Protocol Checkpoints

After each extraction:

- `node --check app.js` or module-aware equivalent.
- App startup.
- Main navigation.
- Location switching and persistence.
- One write path adjacent to the moved code.
- Console error scan.
- QA log update.

For service/data extraction:

- Verify Supabase reads and writes for that domain.
- Verify RLS/permission-related error handling still appears.

For render extraction:

- Verify event buttons still bind.
- Verify detail panels clear when navigating.

## Rollback Strategy

- Keep each extraction small enough to revert as one unit.
- Do not mix refactor with behavior changes.
- Keep cache tags explicit.
- Preserve old function names temporarily where it reduces risk.
- If a Debug Protocol checkpoint fails, revert the last extraction before moving on.

## Operational Risks During Modularization

- Hidden global-state dependency breaks a workflow.
- Event listener no longer matches rendered `data-*` attributes.
- Data service changes a Supabase query shape.
- Optional schema fallback is dropped accidentally.
- Public QR path breaks because it runs before authenticated workspace state.
- Location persistence changes alter where work lands.
- Delete guards undercount linked history.

## Embedded Assumptions In app.js

- Active location is one location at a time.
- Managers/admins can switch locations.
- Technicians need Mobile tech to switch.
- Equipment can route work to its own location if user confirms.
- Completed work is hidden by default.
- Lists are paged.
- Public QR requests are anonymous but token-scoped.
- Schema fallbacks are temporary safety paths.

## Dependencies Likely To Become Hidden

- `renderWorkspace()` depends on many global readiness flags.
- `bindWorkspaceEvents()` depends on render markup names and `data-*` attributes.
- Work-order status and safety checks depend on equipment fields.
- Requests and Quick Fix share conversion/source-request assumptions.
- Photo display depends on storage bucket policies and signed URLs.
- Team invite defaults depend on company member default location and startup location selection.

## Recommendation

Do not modularize immediately. First finish the remaining invite acceptance QA and true technician QA, then begin utilities-only extraction as the first approved modularization phase.

## Post Phase 2G Remaining Risk Review - 2026-05-18

Analysis only. No code, Supabase policies, SQL, service files, rendering, event binding, or business logic changed during this review.

### Current Size And Concentration

After LFES Phase 2G, `app.js` remains the primary application coordinator:

- approximately 9,600 lines,
- approximately 388 function declarations,
- approximately 100 remaining Supabase/RPC/storage call sites.

The earlier LFES phases reduced some database-read concentration, but the dominant remaining risk is no longer simple read queries. The dominant risk is operational workflow mutation mixed with rendering, event binding, global state, storage, and location/company assumptions.

### 1. Remaining High-Risk Responsibilities

The highest-risk responsibilities still in `app.js` are:

- Auth/session startup and login fallback.
- Company selection and company membership fallback behavior.
- Active location hard-save precedence and per-user/company location persistence.
- Public QR request intake and anonymous request submit.
- Internal request submit, request photo attach, request conversion, and request delete.
- Quick Fix, full work-order creation, quick update, completion, assignment, delete, comments, photos, parts used, checklist results, and history events.
- Equipment create/update/status/delete, including equipment-driven location routing warnings.
- PM schedule create/delete/generate work order/update next due.
- Procedure template/step create/delete and live delete blockers.
- Team role changes, invite creation/cancel, and Mobile tech profile setting.
- Message thread/read/reply flows.
- Storage upload/remove and signed URL behavior for logos, work-order photos, request photos, and part documents.
- `renderWorkspace()` and `bindWorkspaceEvents()`, which remain central render/event contracts for almost every workflow.

### 2. Remaining Supabase Calls By Category

Remaining read/query categories:

- Public QR intake:
  - `get_public_request_intake` RPC.
- Company logo signed URLs:
  - `company-logos` storage signed URL.
- Maintenance requests:
  - request page reads,
  - request count queries,
  - request filter/search support.
- Work-order related search:
  - `work_order_parts`,
  - generic relation-table search helper.
- Preventive schedules:
  - `preventive_schedules` list with linked asset data.
- Procedures:
  - `procedure_templates` with nested `procedure_steps`.
- Messages:
  - `message_threads`,
  - `message_thread_members`,
  - `messages`,
  - `message_reads`.
- Public request links:
  - `public_request_links` list.
- Work-order detail relationships:
  - `work_order_comments`,
  - `work_order_photos`,
  - `work_order_parts`,
  - `part_documents`,
  - `work_order_events`,
  - `work_order_step_results`.
- Storage signed URLs:
  - `work-order-photos`,
  - `maintenance-request-photos`,
  - `part-documents`.

Remaining mutation categories:

- Company/profile/team:
  - company creation,
  - profile ensure,
  - invite acceptance,
  - manual member insert,
  - role update RPC,
  - Mobile tech profile upsert,
  - invite create/cancel RPC,
  - company settings update,
  - company logo upload/set RPC.
- Assets/equipment:
  - starter asset seed,
  - create/update/status/delete,
  - Quick Fix equipment creation,
  - live delete blocker reads.
- PM/procedures:
  - PM schedule delete/update,
  - procedure template insert/delete,
  - procedure step insert,
  - live procedure delete blocker reads.
- Messages:
  - thread insert,
  - member insert,
  - read upsert,
  - reply insert,
  - thread timestamp update.
- Issue reports:
  - issue report insert,
  - status update.
- Public request links:
  - ensure link RPC,
  - activate/deactivate/regenerate update.
- Parts:
  - create/update/use/restock/delete,
  - source rename,
  - document upload/delete/metadata insert,
  - work-order part usage insert,
  - stock update after use.
- Requests:
  - internal request insert,
  - source request update from Quick Fix,
  - conversion update,
  - request photo storage remove,
  - request delete,
  - request photo upload and attach RPC.
- Work orders:
  - checklist result upsert,
  - delete,
  - assignment updates,
  - comment insert,
  - photo upload/delete/metadata insert,
  - event insert.

### 3. Remaining Rendering/Event-Binding Concentration

`renderWorkspace()` still:

- chooses the active screen,
- calculates visible lists/pages,
- renders dashboard gauges,
- renders detail panels,
- renders forms,
- renders Settings/Admin/Team/Messages/Requests/Work Orders/Equipment/Parts/PM/Procedures.

`bindWorkspaceEvents()` still:

- binds company and location switching,
- binds navigation,
- binds search and pagination,
- binds Quick Fix/create/request/report commands,
- binds work-order cards, details, status, assignment, delete, comments, photos, checklist,
- binds request conversion/delete/public link controls,
- binds PM/procedure/team/message/parts/settings/company-logo flows,
- performs meaningful state transitions before calling render/reload functions.

This is a high reviewability bottleneck. Extracting database wrappers while leaving all render/event behavior concentrated is useful but only partially reduces risk.

### 4. Areas That Should Stay In app.js For Now

Keep these in `app.js` until there is a dedicated plan and checkpoint:

- Auth/session startup.
- Active company and active location selection/persistence.
- Public QR request submit and request photo attach.
- Request conversion.
- Quick Fix and work-order creation/update/completion/assignment/delete.
- PM generation.
- Procedure checklist and step-result behavior.
- Storage upload/remove flows.
- Delete guards and live delete verification.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

Reason: these areas encode operational state transitions, not just data access. Moving them without a deeper boundary plan could hide assumptions around company isolation, location routing, role permissions, cleanup, and field-worker workflows.

### 5. Additional Read-Only Extraction Risk

Some read-only extraction remains possible, but it is no longer obviously "free":

- Lower-risk remaining reads:
  - `preventiveSchedulesService.listPreventiveSchedules(...)`
  - `proceduresService.listProcedureTemplatesWithSteps(...)`
  - `publicRequestLinksService.listPublicRequestLinks(...)`
- Medium/high-risk remaining reads:
  - `maintenanceRequestsService` page/count reads because Active/Converted/All behavior was recently stabilized.
  - `messagesService` reads because thread/read state is multi-table.
  - `workOrderRelationsService` reads because comments/photos/parts/events/checklist/search all depend on them.
  - storage signed URL wrappers because bucket privacy and display behavior need focused QA.

Conclusion: one or two more read-only extractions are possible, but the next best engineering move is not to keep extracting reads by momentum. The next best move is to plan mutation/service boundaries before touching any workflow writes.

### 6. Best Next Planning Direction

Best next move:

- mutation-service planning.

Why mutation planning beats auth or rendering planning right now:

- Auth planning is important but should wait because startup/location behavior is currently sensitive and recently fixed.
- Rendering planning is important but too broad for the next small controlled phase.
- Mutation-service planning directly addresses the remaining highest-risk work without changing behavior.
- It can produce a safe map of which mutations should remain in `app.js`, which can move as raw database wrappers, and which must be held until automated/browser QA is stronger.

### 7. Recommended Next Single Controlled Phase

Recommended next phase:

- LFES Phase 2H mutation-boundary planning only.

Scope:

- Do not implement.
- Do not create new services.
- Do not move functions.
- Do not change SQL/RLS.
- Map every remaining mutation by domain:
  - company/team,
  - assets/equipment,
  - parts/documents,
  - maintenance requests,
  - public QR links,
  - work orders,
  - comments/photos/events/checklist,
  - PM/procedures,
  - messages,
  - app issue reports,
  - storage.
- Classify each mutation as:
  - raw DB wrapper candidate,
  - workflow-owned mutation that should stay in `app.js`,
  - storage-boundary mutation,
  - security/role-sensitive mutation,
  - deletion/traceability-sensitive mutation.
- Recommend one future implementation target, if any, and keep it narrow.

Likely safest future implementation target after that planning:

- app issue report mutation wrappers may be the smallest mutation candidate because the read wrapper already exists and the workflow is isolated.

Do not implement that until Phase 2H planning is complete and approved.

## Phase 2H Mutation Boundary Planning - 2026-05-18

Phase 2H planning is complete in:

- `docs/LFES/audits/LFES_PHASE_2H_MUTATION_BOUNDARY_PLAN.md`

Findings:

- True remaining Supabase/RPC/storage mutation-boundary call sites: 69.
- Related storage signed URL read boundaries tracked separately: 4.
- Risk counts:
  - Critical: 32
  - High: 24
  - Medium: 11
  - Low: 2

Lowest-risk future mutation candidate:

- `app_issue_reports` insert/update wrappers.

Highest-risk mutation areas:

- public anonymous QR submit,
- invite acceptance/default-location onboarding,
- Quick Fix and work-order creation/update/status/assignment,
- request conversion,
- delete workflows,
- PM generation,
- procedure/template changes,
- comments/photos/parts/checklist relationships,
- storage uploads/removes/photo metadata.

Recommended next controlled phase:

- LFES Phase 2I app issue report mutation wrapper extraction only, if approved.

Phase 2I must keep UI form handling, submit-button state, notices, reloads, and rendering in `app.js`; only the raw `app_issue_reports` insert/update calls should move.

## Phase 2J Mutation Boundary Review Checkpoint - 2026-05-18

Phase 2J was analysis only. No code, wrappers, refactors, Supabase SQL, Supabase RLS, rendering, event binding, or business logic changed.

### Current Architecture State

Post-Phase-2I, the app has a clearer first layer of separation:

- pure constants/formatting/DOM helpers are in `src/utils`.
- low-risk read wrappers exist for locations, profiles/team reads, parts reads, assets reads, work-order reads, company reads, and app issue report reads.
- the first low-risk mutation wrappers exist for `app_issue_reports` insert/update.

This is real progress, but the current architecture is still not service-oriented in a full sense. The services are intentionally thin database boundary wrappers. `app.js` remains the operational controller for:

- auth/session flow,
- active company and location state,
- all rendering,
- all event binding,
- form validation and payload assembly,
- notices/loading states,
- permission decisions,
- most workflow mutations,
- post-save reloads and re-rendering.

Current measured shape:

- `app.js` is about 10,514 lines.
- `app.js` still has about 388 function declarations.
- raw pattern scan still finds about 107 Supabase-related call patterns.
- raw pattern scan still finds about 76 mutation/RPC/storage-style patterns before excluding false-positive DOM calls.
- using the Phase 2H verified count as the baseline, Phase 2I moved 2 of 69 true mutation-boundary call sites, leaving about 67 true mutation-boundary call sites still in `app.js`.
- storage signed URL read boundaries remain separate from mutation counts.

### Mutation Wrapper Separation Quality

The Phase 2I app issue report boundary is a good example of the safest current wrapper shape:

- the service owns only the raw table call.
- `app.js` still owns UI state, validation, permission checks, timeout messaging, reload, notice, and render behavior.
- the wrapper preserves the `company_id` scope on status update.
- browser QA exercised both insert and update on local and live builds.

This is useful because it reduces repeated raw Supabase syntax without hiding operational behavior.

### Remaining Coupling Inside app.js

The remaining mutation coupling is still high. Major write paths remain mixed with UI/render/event/global state:

- public QR request submit and photo attach,
- invite acceptance and default-location onboarding,
- active location persistence,
- Quick Fix,
- work-order create/update/status/complete/assignment/delete,
- request conversion,
- request delete/photo cleanup,
- PM generation,
- procedure/template/step/checklist behavior,
- parts inventory mutations and document storage,
- equipment create/update/delete and delete guards,
- comments/photos/events/step-results,
- messages and message read state,
- company/team role/invite/profile mutations,
- storage uploads/removes.

These are not simple data-access calls. They carry company isolation assumptions, location routing assumptions, role assumptions, UI state assumptions, cleanup assumptions, and recovery-path assumptions.

### Clarity Versus Fragmentation

The extraction strategy is still improving clarity when the target is:

- pure helper logic,
- read-only service wrappers,
- isolated raw table mutations with narrow UI ownership left in `app.js`.

The strategy will become fragmented if extraction continues by moving one mutation at a time without a stronger state/event/render boundary map. Too many tiny wrappers can make the repo look modular while hiding the fact that the actual workflow contract still lives in `app.js`.

LFES conclusion: wrapper boundaries are clearer than before, but the next phase should slow down.

### Operational Continuity Risks

Important current risks:

- Fresh debug/live profiles can initially select Auburn, WA before Salem, OR is intentionally selected.
- Salem hard-save works after intentional selection and reload, but the first-load default path still needs a focused default-location/onboarding verification pass.
- `renderWorkspace()` and `bindWorkspaceEvents()` remain large reviewability bottlenecks.
- Many UI actions mutate global state before or after async database calls.
- Many workflows depend on `activeCompanyId`, `activeLocationId`, `session.user.id`, and cached arrays such as `assets`, `workOrders`, `maintenanceRequests`, `companyMembers`, `profilesByUserId`, and `locations`.
- Delete and storage workflows still combine confirmation state, cleanup, database mutation, reload, and render behavior.
- Public anonymous request intake remains a critical boundary and should not move until separately planned.

### Hidden State Dependencies

State dependencies that future extraction must keep visible:

- scoped active-location localStorage key by user/company,
- legacy active-location localStorage migration behavior,
- active section and page/filter localStorage keys,
- pending delete IDs,
- Quick Fix and create-work-order mode flags,
- report issue mode,
- active work order/equipment/part IDs,
- request view filters and pagination,
- message composer/thread/read state,
- profile/mobile-tech role behavior,
- cached company membership/default-location values.

### Event Binding And Render Coupling

`bindWorkspaceEvents()` still binds most app actions directly to workflow functions. `renderWorkspace()` still builds most screens and controls detail-mode visibility. This means any deeper extraction can silently depend on DOM shape, active section, selected record IDs, or render timing.

Before moving higher-risk mutations, LFES should preserve an explicit event/state/render map.

### Recommended Pace

Slow the extraction pace now.

Do not continue extracting mutation wrappers by momentum. Additional extraction can still improve maintainability, but only after the next phase clarifies state and operational assumptions that are currently hidden in `app.js`.

### Recommended Next Controlled Phase

Recommended next phase:

- LFES Phase 2K default-location/onboarding verification checkpoint, analysis/QA only.

Why this first:

- It addresses the repeated Auburn first-load finding seen during local and live Phase 2I verification.
- Location state is an operational continuity boundary for every work order, request, PM, equipment, and part workflow.
- It should be understood before moving more workflow mutations.

Phase 2K should:

- not change code unless a real defect is proven and approved,
- verify saved scoped location behavior,
- verify legacy location key migration,
- verify invited/default-location behavior if a safe second-user path is available,
- verify technician/mobile-tech location switching assumptions,
- document whether Auburn first-load is expected because of a fresh browser/default membership or a real onboarding defect.

Only after Phase 2K should MaintainOps consider:

- a state/event/render boundary map, or
- one more low-risk mutation wrapper candidate from the Phase 2H plan.

## Phase 2K Default Location / Onboarding Verification - 2026-05-18

Phase 2K was analysis/QA only. No code, wrappers, refactors, Supabase SQL, Supabase RLS, location logic, rendering, event binding, or business logic changed.

### Active Location Precedence

Current `app.js` active-location precedence in `storedLocationForLoadedCompany()` is:

1. scoped saved user/company location:
   - `maintainops.activeLocationId:<user_id>:<company_id>`
2. legacy saved location:
   - `maintainops.activeLocationId`
3. in-memory `activeLocationId`
4. current company membership default:
   - `activeCompanyMembership()?.default_location_id`
5. first loaded location:
   - `locations[0]?.id`

`loadCompanyData()` then calls:

- `activeLocationId = storedLocationForLoadedCompany()`
- `persistActiveLocationId(activeLocationId)`

That means whichever branch wins is immediately written into the scoped key and the legacy key is removed when a user/company scoped key is available.

### Location Storage Keys

Location persistence keys observed:

- Company:
  - `maintainops.activeCompanyId`
- Legacy location:
  - `maintainops.activeLocationId`
- Scoped user/company location:
  - `maintainops.activeLocationId:8f6e618f-bf06-46a7-925b-1001d7d30228:0875d674-7f07-4493-8668-701d192f4421`

For Taylor Metal Products in the live signed-in test:

- company id: `0875d674-7f07-4493-8668-701d192f4421`
- signed-in user id: `8f6e618f-bf06-46a7-925b-1001d7d30228`
- Auburn, WA id: `6cdc08a7-1ce8-48f1-9d5c-ec7969fd6d45`
- Salem, OR id: `328d9ebb-7c4d-4847-a9bb-4aa0619fec43`

### Live Data Findings

The current signed-in user membership has:

- role: `admin`
- `company_members.default_location_id`: `null`

Loaded locations are ordered by `locationsService.listLocations(...)`, which currently runs:

- `.from("locations").select("*").eq("company_id", companyId).order("name")`

That returns Auburn first because `Auburn, WA` sorts before Riverside, Sacramento, Salem, and Spokane.

### Test Matrix

Live GitHub Pages test window was signed in and used only localStorage manipulations plus reloads.

| Test case | Result | Root behavior |
|---|---|---|
| Fresh profile/no saved location keys | Auburn, WA selected | No saved scoped key, no legacy key, no member default, so first location fallback wins. |
| Legacy Salem saved key only | Salem, OR selected | Legacy key is honored, then migrated into scoped key. |
| Scoped Salem saved key | Salem, OR selected | Scoped key wins. |
| Conflicting legacy Auburn + scoped Salem | Salem, OR selected | Scoped key correctly wins over legacy key. |
| Legacy Auburn only | Auburn, WA selected | Legacy key is honored, then migrated into scoped key. |
| Intentional Salem restore + reload | Salem, OR selected | Salem hard-save works through scoped key. |

### Root Cause

Auburn first-load behavior is not caused by broken hard-save logic. It is caused by the fallback chain reaching the first loaded location when no saved location and no member default exist.

Because locations are ordered alphabetically by name, Auburn is the first-location fallback.

### Expected Or Bug?

Technically expected under the current code.

Operationally, it is a product/onboarding bug risk if Taylor expects Salem to be the default branch for this user or for new/invited users. The app has a member-level default location mechanism, but the current admin membership has no default location set, and there is no company-level default location fallback.

### Invite / Default Location Influence

For the signed-in admin test account, invite/default-location onboarding is not influencing first load because the current `company_members.default_location_id` is `null`.

For invited users, the existing design can influence first load if invite acceptance correctly writes `company_members.default_location_id`. That path still needs a real second-user invite/default-location QA pass.

### Safe Fix Proposal

No code was changed in Phase 2K.

Safest immediate data fix if Salem should be the default for existing Taylor users:

- set `company_members.default_location_id` to Salem, OR for the intended users/company.

Safer product fix before broader live onboarding:

- add an explicit company or onboarding default-location rule instead of relying on alphabetical first-location fallback.
- continue preserving scoped saved location as the highest precedence.
- keep legacy-key migration behavior.
- do not override an intentional scoped saved location.

### Recommendation

Before deeper workflow extraction:

1. Decide whether Taylor's no-saved-location fallback should be Salem by data policy or by app rule.
2. Run a real second-user invite acceptance QA pass with a default location.
3. Only after the default-location/onboarding behavior is settled, resume service-wrapper extraction or state/event/render boundary planning.

Deeper workflow extraction remains blocked because location selection is a cross-cutting operational boundary for work orders, requests, PM, equipment, parts, QR intake, and mobile tech behavior.

## Phase 3A Rendering / Event / State Architecture Map - 2026-05-19

Phase 3A was analysis/documentation only. No code, wrappers, refactors, Supabase SQL, Supabase RLS, rendering, event binding, or business logic changed.

Detailed map:

- `docs/LFES/audits/LFES_PHASE_3A_ARCHITECTURE_MAP.md`

### Current Architecture State

`app.js` remains the operational controller. The earlier utility/read-wrapper/app-issue-report phases improved reviewability, but the remaining risk is now render/event/state/workflow coupling rather than simple raw Supabase syntax.

Current ownership:

- `renderWorkspace()` owns most authenticated screen composition and emits many DOM contracts through IDs, classes, forms, and `data-*` attributes.
- `bindWorkspaceEvents()` owns most user action binding and directly calls workflow mutations.
- global state owns session, company, location, work queues, requests, assets, parts, PM, procedures, messages, relationship maps, pending delete state, quick-fix mode, create mode, report issue mode, filters, pages, and localStorage persistence.
- mutation workflows own validation, permissions, company/location scope, optional schema fallbacks, storage cleanup, notices, reloads, and render transitions.

### Highest Coupling Points

- Quick Fix from normal command and request conversion path.
- Work-order create/update/status/complete/assignment/delete.
- Request conversion and request delete/photo cleanup.
- PM generation and next-due update.
- Procedure template/step/checklist mutations.
- Storage flows for work-order photos, request photos, part documents, and company logos.
- Team invite/default-location and role/profile/admin flows.
- Active-location persistence and equipment-driven location routing.
- `renderWorkspace()` to `bindWorkspaceEvents()` DOM contract coupling.

### Phase 3A Recommendation

Pause deeper workflow extraction.

The next controlled phase should be LFES Phase 3B event-contract inventory, planning only. It should map the exact form IDs, DOM IDs, and `data-*` attributes emitted by render functions and consumed by `bindWorkspaceEvents()`.

Do not move Quick Fix, request conversion, work-order mutations, public QR submit, storage/photo flows, delete workflows, PM generation, procedures/checklists, Team/admin flows, active-location persistence, `renderWorkspace()`, or `bindWorkspaceEvents()` until the event contract and smoke-test expectations are documented.

## Phase 3B Event Contract Inventory - 2026-05-19

Phase 3B was analysis/documentation only. No code, wrappers, refactors, Supabase SQL/RLS, rendering, event binding, or business logic changed.

Detailed inventory:

- `docs/LFES/audits/LFES_PHASE_3B_EVENT_CONTRACT_INVENTORY.md`

### Inventory Counts

- `bindWorkspaceEvents()` listener registrations mapped: 126.
- Event type counts: 79 `click`, 33 `submit`, 9 `change`, 3 `input`, 2 `keydown`.
- DOM selectors consumed inside `bindWorkspaceEvents()`: 126 raw, 124 unique.
- Rendered ID references found in `app.js`: 112 raw, 102 unique.
- `data-*` attribute references found in `app.js`: 143 raw, 91 unique.
- Total raw DOM contract references mapped across listener selectors, rendered IDs, and `data-*`: 381.

### Phase 3B Findings

- `bindWorkspaceEvents()` is not the only event boundary. Auth, public QR intake, public QR print, workspace load retry, company create, and signed-in `#request-form` submit also depend on top-level or renderer-local listeners.
- `#request-form` is intentionally handled by a document-level submit listener. This preserves the prior request-submit fix and should not be casually moved into a different binding path.
- Desktop/mobile duplicate controls use dynamic IDs, but behavior generally depends on shared `data-command-action` contracts.
- `.work-card` and `.asset-card` are behavior hooks as well as visual classes.
- Delete confirmations depend on pending global IDs plus `data-confirm-*` controls.
- `input[name="safety_devices_checked"]` is a shared safety-check synchronization contract, not a visual-only field name.

### Recommendation

Workflow extraction remains blocked.

Before moving Quick Fix, work-order mutations, request conversion, public QR submit, delete workflows, storage/photo/document flows, PM generation, procedures/checklists, Team/admin workflows, or active-location persistence, define a Phase 3C smoke-test matrix and contract guard plan for the high-risk DOM/event contracts.

## Phase 3C Smoke-Test Matrix And Contract Guard Plan - 2026-05-19

Phase 3C was analysis/documentation only. No code, wrappers, refactors, Supabase SQL/RLS, rendering, event binding, workflow handler movement, or business logic changed.

Detailed matrix:

- `docs/LFES/audits/LFES_PHASE_3C_SMOKE_TEST_MATRIX.md`

### Smoke Tests Defined

Phase 3C defined reproducible smoke tests for:

- Quick Fix create/open/complete/delete.
- Work order create/edit/status/complete/delete.
- Signed-in request submit and conversion.
- Public QR request submit and manager visibility.
- Location switch and reload persistence.
- Parts use/restock.
- PM generation to work order.
- Procedure/checklist update.
- Issue report submit/update.
- Team invite/member role display.
- Technician assignment guardrail.
- Photo/document upload path.

### Contract Guard Findings

- High-risk IDs and forms are now listed as behavior contracts, not casual markup.
- High-risk `data-*` attributes are grouped by workflow and should not be renamed without smoke tests.
- `.work-card`, `.asset-card`, and `.workspace-search-input` are documented as visual classes that also act as behavior hooks.
- Delete flows, Quick Fix routing, report issue mode, and active detail panels still depend on global pending/active state.

### Recommendation

Workflow extraction remains blocked.

The next controlled phase should be LFES Phase 3D state ownership map, planning only. It should map navigation state, detail-panel state, pending delete state, form/workflow state, persistence/localStorage, and reload queue ownership before moving any workflow handler.

## Phase 3D State Ownership Map - 2026-05-19

Phase 3D was analysis/documentation only. No code, wrappers, refactors, Supabase SQL/RLS, rendering, event binding, workflow handler movement, or business logic changed.

Detailed map:

- `docs/LFES/audits/LFES_PHASE_3D_STATE_OWNERSHIP_MAP.md`

### Inventory Counts

- Top-level mutable `let` state variables mapped: 100.
- State categories used: company-scoped, location-scoped, user/session-scoped, view/UI-scoped, workflow-scoped, pending action/confirmation-scoped, and cache/list-scoped.

### Phase 3D Findings

- Company/session/location state is shared across almost every render, load, and mutation path.
- Active detail state (`activeWorkOrderId`, `activeAssetId`, `activePartId`) controls which focus panel renders and which workflow handlers are reachable.
- Quick Fix state (`quickFixMode`, `quickFixAssetId`, `quickFixRequestId`) connects command buttons, equipment cards, request cards, and work order creation.
- Pending delete state coordinates request/cancel/confirm UI across re-renders.
- Relationship maps for comments, photos, parts, events, and checklist results are loaded separately but rendered and mutated from work order detail.
- Many filters/pages/search values are mirrored in localStorage and influence reload behavior after mutations.

### Recommendation

Workflow extraction remains blocked.

The next controlled phase should be LFES Phase 3E render ownership map, planning only. It should map which render functions read each state category and identify render-only separation opportunities that do not move workflow handlers.

## Phase 3E Render Ownership Map - 2026-05-19

Phase 3E was analysis/documentation only. No code, wrappers, refactors, Supabase SQL/RLS, rendering, event binding, workflow handler movement, or business logic changed.

Detailed map:

- `docs/LFES/audits/LFES_PHASE_3E_RENDER_OWNERSHIP_MAP.md`

### Inventory Counts

- Major `render*` functions mapped: 83.

### Phase 3E Findings

- `renderWorkspace()` remains the highest-risk renderer because it owns the authenticated shell, duplicated desktop/mobile command stack, major section composition, and the call to `bindWorkspaceEvents()`.
- Work order detail rendering creates multiple mutation contracts in one output: quick update, full edit, completion, status, comments, photos, parts used, checklist results, messages, and delete.
- Public request renderers create anonymous/public boundary contracts.
- Delete-zone renderers depend on pending global state and confirmation `data-*` attributes.
- `.work-card`, `.asset-card`, and `.workspace-search-input` remain behavior hooks as well as visual classes.
- Low-risk candidates exist, but only for pure display helpers that do not create mutation forms or public/storage/delete contracts.

### Recommendation

Workflow and render extraction remain blocked.

The next controlled phase should be LFES Phase 3F implementation-readiness decision, planning only. It should decide whether to proceed with a tiny pure display render-helper extraction, a localStorage/list state helper extraction, or pause modularization and run a full live debug pass first.

## Phase 3F Implementation-Readiness Decision - 2026-05-19

Phase 3F was decision/planning only. No code, wrappers, refactors, Supabase SQL/RLS, rendering, event binding, workflow handler movement, or business logic changed.

Detailed decision:

- `docs/LFES/audits/LFES_PHASE_3F_IMPLEMENTATION_READINESS_DECISION.md`

### Decision

Do not extract code yet.

Recommended next implementation phase:

- LFES Phase 4A live smoke and technician assignment guardrail verification.

### Rationale

- Low-risk render helper extraction is technically possible, but it is not the highest-value next move during live testing.
- Phase 2H still shows many critical/high mutation boundaries.
- Phase 3D shows broad mutable state concentration.
- Phase 3E shows render output is often a behavior contract.
- Phase 3C defines smoke paths, but the next practical step is to run the most important ones before moving more code.

### Remains Blocked

- workflow extraction.
- mutation extraction.
- render extraction.
- event binding extraction.
- public QR submit movement.
- Quick Fix/work-order/request conversion movement.
- delete/storage/photo/document movement.
- auth/session/company/location movement.
- Supabase SQL/RLS changes.

### Next Step

Run LFES Phase 4A live smoke and technician assignment guardrail verification. Code changes should happen only if that smoke pass finds a real defect.

## Phase 5A Low-Risk Render Helper Extraction Plan - 2026-05-19

Phase 5A was planning/documentation only. No app code, render behavior, event binding, workflow handler, mutation path, Supabase SQL/RLS, or business logic changed.

Detailed plan:

- `docs/LFES/audits/LFES_PHASE_5A_RENDER_HELPER_EXTRACTION_PLAN.md`

### Phase 5A Decision

Low-risk render helper extraction is possible, but the first implementation must be smaller than a broad render-module split.

Safest first candidates:

- `renderMetric`
- `renderInsight`
- `renderRoleGuide`

Safe later candidates:

- `renderMessageBubble`
- `renderMessageList`
- `renderMessageNavBadge`
- `renderActivityItem`
- `renderEmailHelperCommandCard`
- `renderRelationshipChips`
- `renderMaintenanceRequestPhoto`

### False-Safe Coupling Found

Several helpers that look visual are actually behavior contracts:

- `renderGaugeReadout()` emits `data-status-filter` and reads `activeStatusFilter`.
- `renderWorkloadStrip()` calls `renderGaugeReadout()`, so it is not safe as a first extraction.
- pagination helpers emit `data-*` page controls and read page state.
- request photo preview is display-oriented but depends on storage/signed URL readiness and request photo metadata.
- relationship chips read global relationship maps.

### Recommendation

The next controlled implementation may be LFES Phase 5B render display-helper extraction only, limited to:

- create a small `src/render/displayHelpers.js`,
- move `renderMetric`, `renderInsight`, and `renderRoleGuide`,
- preserve exact markup and function availability,
- run static checks,
- run signed-in smoke checks for dashboard/team load,
- stop after that narrow extraction.

Workflow extraction, mutation extraction, event binding extraction, and high-risk render movement remain blocked.

## Phase 5C Readiness Decision - 2026-05-19

Phase 5C was planning/documentation only. No code, render helpers, refactors, Supabase SQL/RLS, workflow logic, or business logic changed.

### Evidence Reviewed

- Phase 5A render-helper extraction plan.
- Phase 5B local, manager/admin, and live GitHub Pages smoke results.
- Phase 4B technician assignment guardrail status.
- Phase 2H mutation-boundary plan.
- Phase 3C smoke-test matrix.
- Phase 3A-3E architecture, event, state, and render maps.
- Current handoff, next steps, and QA log.

### Decision

Do not continue display-helper extraction yet.

Another tiny extraction is technically possible, but it is not the highest-value next move while live testing is active.

### Why

Phase 5B proved the extraction process works for truly tiny display helpers:

- `renderMetric`
- `renderInsight`
- `renderRoleGuide`

But the next candidate group is less isolated:

- message helpers depend on session/user/profile/time formatting and message read state;
- activity helpers depend on comments/photos/parts/events payload shapes and signed URL metadata;
- email helper command cards emit command navigation contracts through `commandShortcut`;
- relationship chips read multiple global relationship maps;
- request photo preview touches storage/signed URL readiness and public/internal request assumptions.

Meanwhile, higher-value operational risks remain open:

- technician assignment DB/RLS/trigger denial is still not proven;
- public QR request end-to-end validation should be re-run on the live deployed build;
- parts use/restock/work-order part usage remains a transaction/inventory integrity concern;
- workflow render/event/state contracts remain high-risk and should stay mapped but unmoved.

### Recommended Next Phase

Recommended next controlled phase:

**LFES Phase 6A operational smoke hardening, technician DB-layer guardrail proof first.**

This should be verification-first and code-free unless a real defect is found.

Priority order:

1. Technician assignment guardrail DB-layer proof with disposable QA work order.
2. Public QR request end-to-end validation on the live GitHub Pages build.
3. Parts use/restock and work-order part usage smoke, then parts transaction RPC planning if the smoke confirms risk.
4. Only after those pass, consider Phase 5D or 5C-implementation for another tiny display-helper extraction.

### What Remains Blocked

- Phase 5C implementation/code extraction.
- workflow renderer extraction.
- event binding extraction.
- mutation extraction.
- public QR submit movement.
- Quick Fix/work-order/request conversion movement.
- delete/storage/photo/document movement.
- auth/session/company/location movement.
- Supabase SQL/RLS changes.
- parts transaction RPC implementation.

### Required Smoke Tests Before More Extraction

- Technician assignment guardrail:
  - technician can claim allowed unassigned work for self,
  - technician cannot assign another user,
  - technician cannot assign outside vendor,
  - technician cannot clear or steal an assignment,
  - DB/RLS/trigger denial is proven where possible.
- Public QR request:
  - signed-out QR form loads from live GitHub Pages,
  - request submits without login,
  - request lands in the QR link's correct location,
  - manager sees it in Requests.
- Parts inventory:
  - restock safe QA part,
  - use safe QA part,
  - use part on work order if safe,
  - confirm quantity changes and cleanup path.

### Code Extraction Approval

Code extraction is still blocked.

The next approved direction is operational smoke hardening, not another render-helper extraction.

## Phase 9A Subsystem Extraction Strategy - 2026-05-19

Phase 9A was planning/documentation only. No app code, `app.js` refactor, function movement, rendering behavior, event binding, Supabase SQL/RLS, workflow logic, or business logic changed.

Detailed strategy:

- `docs/LFES/audits/LFES_PHASE_9A_SUBSYSTEM_EXTRACTION_STRATEGY.md`

### Phase 9A Decision

The safest coherent subsystem to extract next is:

- read-only work-order relationship display helpers.

Recommended Phase 9B file:

- `src/render/relationshipDisplay.js`

Recommended helpers:

- `renderActivityItem`
- `renderRelationshipChips`
- `relationshipChip`
- `relationshipIcon`

Estimated line-reduction potential:

- approximately 110-140 lines from `app.js`, depending on how much adapter code remains.

### Why This Is Safer Than Other Subsystems

The relationship display helpers do not create forms, mutation buttons, delete controls, storage upload controls, public/auth boundaries, Supabase calls, or event-binding selectors.

Other candidate subsystems remain more coupled:

- dashboard/metrics remaining helpers include gauge/filter behavior.
- issue report renderers include submit/status mutation contracts.
- Team renderers include role/default/mobile tech/invite onboarding controls.
- public QR renderers cross anonymous token and location-routing boundaries.
- parts renderers include inventory use/restock/delete/document workflows.
- equipment renderers include location routing, Quick Fix, edit, and delete contracts.
- notice/toast helpers are small but side-effectful and low-value to extract now.

### Phase 9B Guardrails

Phase 9B should:

- preserve exact returned markup.
- keep work-order card/detail renderers in `app.js`.
- pass relationship display dependencies explicitly or through a small adapter.
- avoid hidden reads from `app.js` globals inside the new module.
- run static checks and signed-in work-order detail smoke.

### Remains Blocked

- workflow extraction.
- mutation extraction.
- event binding extraction.
- broad `renderWorkspace()` movement.
- public QR submit/display movement.
- Team invite/default-location movement.
- parts and equipment detail movement.
- auth/session/company/location movement.
- Supabase SQL/RLS changes.

## Phase 9C App.js Cleanup Readiness Decision - 2026-05-20

Phase 9C was planning/documentation only. No app code, `app.js` refactor, function movement, Supabase SQL/RLS, workflow logic, or business logic changed.

Detailed decision:

- `docs/LFES/audits/LFES_PHASE_9C_APP_JS_CLEANUP_READINESS.md`

### Phase 9C Decision

The next safest coherent app.js reduction target is:

- dashboard / metrics display cluster.

Recommended Phase 9D file:

- `src/render/dashboardDisplay.js`

Recommended helpers:

- `renderGaugeReadout`
- `renderWorkOrderGaugeDashboard`
- `renderWorkloadStrip`

Estimated line-reduction potential:

- approximately 55-85 lines from `app.js`, depending on adapter code.

### Why This Is The Next Safest Target

The dashboard/metrics helpers are display-oriented and do not write Supabase data, mutate workflows, change auth, change company isolation, touch public QR, touch parts inventory, or touch equipment routing.

Important caveat:

- they emit `data-status-filter` and `data-section`, so they are still behavior contracts.
- implementation must preserve exact markup and attributes.
- smoke must prove gauge/filter behavior still works.

### Phase 9B Deployment Lesson Applied

Phase 9B caught a real deploy issue:

- `relationshipDisplay.js` was deployed correctly.
- `app.js` initially kept an older cache tag.
- fixed by changing `app.js` to `app.js?v=lfes-phase-9b-relationship-1`.

Future extraction phases must verify:

- live new helper script HTTP 200.
- live `index.html` includes the new helper script.
- live `app.js` cache tag changed for the extraction.
- signed-in live smoke passes after GitHub Pages publish.

### Remains Blocked

- Phase 9D implementation until explicitly approved.
- issue report display movement.
- parts render/detail movement.
- equipment render/detail movement.
- Team invite/member/default-location rendering.
- public QR rendering and submit flow.
- Quick Fix extraction.
- work-order create/edit/status/complete/delete extraction.
- request conversion extraction.
- event binding extraction.
- mutation extraction.
- broad `renderWorkspace()` movement.
- auth/session/company/location movement.
- Supabase SQL/RLS changes.

## Phase 9E Batched Low-Risk Display Helper Cleanup - 2026-05-20

Phase 9E classified the next display-helper cleanup candidates first, then implemented only the helpers that were clearly display/read-only.

### Candidate Classification

SAFE NEXT and implemented:

- `segmentIcon`
- `navIcon`

These helpers return static SVG markup only. They do not create forms, emit mutation controls, read Supabase, mutate global state, depend on auth/session, depend on company/location state, or own workflow behavior.

BLOCKED:

- notice/status/toast helpers:
  - `showNotice()` mutates `appNotice`, `appNoticeTone`, `noticeTimer`, and can call `renderWorkspace()`.
- admin readiness display helpers:
  - `renderSetupItem()` emits `data-setup-action`, so it is an admin behavior contract.
- issue-report display helpers:
  - issue-report form/panel/card rendering includes submit/status controls and app issue mutation paths.
- public QR helpers:
  - public request link cards include copy, test, regenerate, and disable action hooks.
- parts/equipment card helpers:
  - cards emit open/detail behavior hooks and are tied to detail workflows.
- email/helper command cards:
  - command cards emit `data-jump-work-section`, so they remain section-navigation behavior contracts.

SAFE LATER with more focused planning:

- small label-only helpers such as asset/location/message labels may be moved later, but the current line-reduction value is low and several depend on global lists.

### Implementation

Created:

- `src/render/iconDisplay.js`

Moved:

- `segmentIcon`
- `navIcon`

Updated:

- `index.html` loads `src/render/iconDisplay.js?v=lfes-phase-9e-icons-1` before `app.js`.
- `index.html` loads `app.js?v=lfes-phase-9e-icons-1`.
- `app.js` imports `segmentIcon` and `navIcon` from `window.MaintainOpsIconDisplay`.
- `tests/smoke/resource-load.spec.js` now includes `src/render/relationshipDisplay.js`, `src/render/dashboardDisplay.js`, and `src/render/iconDisplay.js`.

### Verification

- Static checks passed for `app.js`, `supabase-config.js`, all `src/utils`, all `src/services`, and all `src/render` files.
- Static check passed for `tests/smoke/resource-load.spec.js`.
- Local `src/render/iconDisplay.js?v=lfes-phase-9e-icons-1` served HTTP 200.
- Local Playwright Resource Load Smoke passed with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`.
- Local signed-in smoke passed:
  - Taylor Metal Products loaded.
  - Salem, OR was selected.
  - My Work, Work Orders, Equipment, Parts, Team, and Settings loaded.
  - nav icons and segment icons rendered.
  - no visible app errors.
  - no actionable browser console warning/error logs captured.

### Line Reduction

- before Phase 9E: 10,561 lines.
- after Phase 9E: 10,524 lines.
- reduction: 37 lines.

### Remains Blocked

- package/upload until explicitly requested.
- Phase 9F planning/implementation.
- additional display extraction without a focused classification pass.
- workflow renderers.
- event handlers.
- mutations.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.
- Supabase SQL/RLS changes.

## Phase 9F App.js Cleanup Readiness Decision - 2026-05-20

Phase 9F was planning/documentation only. No app code, `app.js` refactor, function movement, rendering behavior, event binding, Supabase SQL/RLS, workflow logic, or business logic changed.

Detailed decision:

- `docs/LFES/audits/LFES_PHASE_9F_APP_JS_CLEANUP_READINESS.md`

### Phase 9F Decision

The next safest coherent `app.js` reduction target is:

- message bubble/list display only.

Recommended Phase 9G file:

- `src/render/messageDisplay.js`

Recommended helpers:

- `renderMessageBubble`
- `renderMessageList`

Estimated line-reduction potential:

- approximately 25-45 lines from `app.js`, depending on adapter code.

### Why This Is The Next Safest Target

The message bubble/list helpers are display-oriented and do not create forms, action buttons, thread selection controls, Supabase calls, message mutations, public/auth boundaries, company/location logic, storage flows, or delete controls.

Important caveat:

- the broader message center is not low-risk.
- only the bubble/list display helpers are approved for a future Phase 9G.
- message thread buttons and linked work-order thread buttons must stay in `app.js` because they emit behavior hooks.

### Required Phase 9G Guardrails

Phase 9G should:

- create `src/render/messageDisplay.js`.
- move only `renderMessageBubble` and `renderMessageList`.
- pass dependencies explicitly from `app.js`.
- preserve exact returned markup.
- update `index.html` script loading.
- bump the `app.js` cache tag.
- update Resource Load Smoke required resources.
- run static checks.
- run local signed-in smoke that opens Messages and core sections.
- stop before package/upload unless explicitly requested.

### Remains Blocked

- `renderMessageCenter`.
- `renderMessageThreadButton`.
- `renderLinkedWorkMessageThread`.
- message composer forms.
- thread creation/send/read mutations.
- event handlers.
- Supabase calls.
- auth/session/company/location logic.

## Phase 9G Message Display Helper Extraction - 2026-05-20

Phase 9G implemented the approved message bubble/list display extraction only. No workflow, message mutation, thread selection, event binding, Supabase query, auth/session/company/location logic, `renderWorkspace()`, `bindWorkspaceEvents()`, Supabase SQL/RLS, or business logic changed.

### Implementation

Created:

- `src/render/messageDisplay.js`

Modified:

- `app.js`
- `index.html`
- `tests/smoke/resource-load.spec.js`
- `docs/QA_LOG.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`

Moved from `app.js`:

- `renderMessageBubble`
- `renderMessageList`

The new module exposes `window.MaintainOpsMessageDisplay.createMessageDisplayHelpers(...)`. Dependencies remain explicit and are passed from `app.js`:

- `escapeHtml`
- `getCurrentUserId`
- `teamMemberName`
- `initials`
- `formatMessageTime`
- `formatMessageDay`

This preserves the old rendering behavior while keeping the broader message center, message thread controls, composer forms, and message mutations in `app.js`.

### Cache And Resource Smoke

- `index.html` now loads `src/render/messageDisplay.js?v=lfes-phase-9g-message-1`.
- `index.html` now loads `app.js?v=lfes-phase-9g-message-1`.
- `tests/smoke/resource-load.spec.js` now checks `src/render/messageDisplay.js`.
- Local HTTP resource checks returned HTTP 200 for the new helper and updated `app.js`.
- Local Playwright Resource Load Smoke passed with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`.

### Line Reduction

- before Phase 9G: 10,524 lines.
- after Phase 9G: 10,511 lines.
- reduction: 13 lines.

### Local Smoke Result

Local signed-in smoke passed on:

- `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9g-message-20260520`

Verified:

- Taylor Metal Products loaded.
- Salem, OR was selected.
- Messages opened and rendered the no-thread empty state.
- My Work, Work Orders, Equipment, Parts, Team, and Settings loaded.
- no visible app errors.
- no actionable browser console warning/error logs captured.

Important caveat:

- current pilot data had 0 message threads, so non-empty message bubbles were not data-exercised.
- user confirmed QA and Louie Fisher accounts are both safe owned accounts for a later non-empty Messages smoke if needed.

### Remains Blocked

- package/upload until explicitly requested.
- `renderMessageCenter`.
- `renderMessageThreadButton`.
- `renderLinkedWorkMessageThread`.
- message composer forms.
- thread creation/send/read mutations.
- event handlers.
- Supabase calls.
- auth/session/company/location logic.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.
- notice/status/toast helper movement.
- admin readiness display movement.
- issue report display movement.
- public QR rendering and submit flow.
- parts and equipment rendering.
- Team invite/member/default-location rendering.
- work-order lifecycle and command-card movement.
- Supabase SQL/RLS changes.

## Phase 9H App.js Cleanup Readiness Decision - 2026-05-20

Phase 9H was planning/documentation only. No app code, helper extraction, rendering behavior, event binding, Supabase SQL/RLS, workflow logic, or business logic changed.

Detailed decision:

- `docs/LFES/audits/LFES_PHASE_9H_APP_JS_CLEANUP_READINESS.md`

### Phase 9H Decision

Do not recommend immediate Phase 9I code extraction yet.

Reason:

- Phase 9G is fully closed, including signed-in live UI smoke.
- Both local and live Phase 9G smoke verified the Messages empty state.
- Current live Messages data had `0 threads`, so non-empty message bubbles were not data-exercised.
- Moving additional message-adjacent helpers before non-empty message evidence would stack unverified display risk.
- Other pure label helpers are technically safe but low-value enough to defer.

### Recommended Next Controlled Phase

Recommended next phase:

- LFES Phase 9I non-empty Messages smoke, if explicitly approved.

Scope:

- no code changes.
- no helper extraction.
- no Supabase SQL/RLS changes.
- no workflow refactor.
- use an existing safe message thread if available, or create a minimal safe message thread only with explicit approval.
- verify message list, message bubble, sender initials, timestamp/day divider, thread button summary, and core sections afterward.

If live message mutation is not approved:

- keep non-empty message bubble rendering as `NOT VERIFIED`.
- continue live pilot monitoring.
- defer additional app.js extraction.

### Safe Later Code Candidates

After non-empty message display is verified, possible tiny code candidates include:

- `formatMessageTime`.
- `formatMessageDay`.
- `initials`.
- `assetTypeLabel`.
- `assetStatusLabel`.

These remain safe later, not currently approved for implementation.

### Remains Blocked

- Phase 9I code implementation without fresh approval.
- `renderMessageCenter`.
- `renderMessageThreadButton`.
- `renderLinkedWorkMessageThread`.
- message composer forms.
- thread creation/send/read mutations, except a manually approved live smoke using safe owned accounts.
- event handlers.
- Supabase calls.
- auth/session/company/location logic.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.
- notice/status/toast helper movement.
- admin readiness display movement.
- issue report display movement.
- public QR rendering and submit flow.
- parts and equipment rendering.
- Team invite/member/default-location rendering.
- work-order lifecycle and command-card movement.
- Supabase SQL/RLS changes.

## Phase 9I Non-Empty Messages Smoke - 2026-05-20

Phase 9I completed the runtime evidence gap left after Phase 9G. It was live signed-in smoke only. No app code, helper extraction, rendering behavior, event binding, Supabase SQL/RLS, workflow logic, or business logic changed.

### Scope

- Created one minimal direct QA message thread using safe owned accounts.
- Verified real message thread and message bubble rendering.
- Did not move message center, composer, thread buttons, event handlers, Supabase calls, or mutations into modules.

### QA Data Created

- subject: `QA Phase 9I message smoke 20260520-9I-1779288774749`
- body: `QA Phase 9I message bubble smoke 20260520-9I-1779288774749. Safe owned-account rendering check.`
- type: direct
- visible participants: `Louie Fisher, loufish727`
- cleanup: retained as QA evidence unless a later app-supported cleanup/archive decision is made.

### Verification

Live URL:

- `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9i-message-smoke-20260520`

Verified:

- signed-in session restored.
- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- Messages went from `0 threads` to `1 threads`.
- thread button rendered subject, participants, sender/body summary, and timestamp.
- message detail rendered one `.message-bubble`.
- sender initials rendered as `LF`.
- `Today` day divider rendered.
- My Work, Work Orders, Equipment, Parts, Team, Settings, and Messages loaded afterward.
- no visible app errors.
- no browser warning/error logs.

### Phase 9I Result

- non-empty Messages smoke: PASS.
- non-empty message bubble rendering is now data-exercised.
- app behavior changed: no.
- live QA data changed: yes, one direct QA message thread was created.

### Recommended Next Phase

Choose one:

- LFES Phase 9J planning/readiness before any additional helper extraction.
- pause code movement and continue live pilot monitoring.

### Remains Blocked

- Phase 9J implementation without fresh approval.
- additional display extraction.
- message workflow movement.
- event handlers.
- mutations.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

## Phase 9J Message Format Readiness Decision - 2026-05-20

Phase 9J was planning/documentation only. No app code, helper extraction, rendering behavior, event binding, Supabase SQL/RLS, workflow logic, or business logic changed.

Detailed decision:

- `docs/LFES/audits/LFES_PHASE_9J_MESSAGE_FORMAT_READINESS.md`

### Phase 9J Decision

Approve a narrow Phase 9K implementation:

- create `src/render/messageFormatting.js`
- move only:
  - `formatMessageTime`
  - `formatMessageDay`
  - `initials`

Reason:

- Phase 9I verified non-empty message rendering before additional message-adjacent movement.
- The three helpers are pure display-format helpers.
- They perform no Supabase calls.
- They emit no `data-*` behavior hooks.
- They do not create forms, event handlers, message mutations, auth/session/company/location behavior, or storage behavior.

### Remains Blocked

- `renderMessageCenter`.
- `renderMessageThreadButton`.
- `renderLinkedWorkMessageThread`.
- message composer forms.
- thread creation/send/read mutations.
- event handlers.
- Supabase calls.
- auth/session/company/location logic.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.
- Supabase SQL/RLS.

## Phase 9K Message Formatting Helper Extraction - 2026-05-20

Phase 9K implemented the approved message formatting helper extraction only. No workflow, message mutation, thread selection, event binding, Supabase query, auth/session/company/location logic, `renderWorkspace()`, `bindWorkspaceEvents()`, Supabase SQL/RLS, or business logic changed.

### Implementation

Created:

- `src/render/messageFormatting.js`

Modified:

- `app.js`
- `index.html`
- `tests/smoke/resource-load.spec.js`
- `docs/LFES/audits/LFES_PHASE_9J_MESSAGE_FORMAT_READINESS.md`
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- `docs/QA_LOG.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`

Moved from `app.js`:

- `formatMessageTime`
- `formatMessageDay`
- `initials`

The new module exposes `window.MaintainOpsMessageFormatting`.

### Cache And Resource Smoke

- `index.html` now loads `src/render/messageFormatting.js?v=lfes-phase-9k-message-format-1`.
- `index.html` now loads `app.js?v=lfes-phase-9k-message-format-1`.
- `tests/smoke/resource-load.spec.js` now checks `src/render/messageFormatting.js`.
- Local Playwright Resource Load Smoke passed with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`.

### Line Reduction

- before Phase 9K: 10,511 lines.
- after Phase 9K: 10,487 lines.
- reduction: 24 lines.

### Local Smoke Result

Local signed-in smoke passed on:

- `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9k-message-format-20260520`

Verified:

- Taylor Metal Products loaded.
- Salem, OR was selected.
- `src/render/messageFormatting.js` and the Phase 9K `app.js` cache tag were present.
- Messages opened with the Phase 9I QA thread.
- message thread button rendered.
- one message bubble rendered.
- sender initials `LF` rendered.
- `Today` day divider rendered.
- My Work, Work Orders, Equipment, Parts, Team, Settings, and Messages loaded.
- no visible app errors.
- no browser warning/error logs captured.

### Remains Blocked

- package/upload until Phase 9L.
- `renderMessageCenter`.
- `renderMessageThreadButton`.
- `renderLinkedWorkMessageThread`.
- message composer forms.
- thread creation/send/read mutations.
- event handlers.
- Supabase calls.
- auth/session/company/location logic.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.
- Supabase SQL/RLS changes.

## Phase 9L Package/Upload And Live Verification - 2026-05-20

Phase 9L packaged and uploaded the stable Phase 9K message formatting helper extraction. No additional helpers moved, no workflow logic changed, no event handlers moved, and no Supabase SQL/RLS changed.

### Package And Deploy

- package: `MaintainOps-github-clean-20260520-082153`
- zip: `MaintainOps-github-clean-20260520-082153.zip`
- commit: `989ac29b6a9c13df0143756ab74184c421572455`
- commit message: `Extract message formatting helpers`

### Live Resource Verification

- live `index.html` references `src/render/messageFormatting.js?v=lfes-phase-9k-message-format-1`.
- live `index.html` references `app.js?v=lfes-phase-9k-message-format-1`.
- live `src/render/messageFormatting.js?v=lfes-phase-9k-message-format-1`: HTTP 200.
- live `app.js?v=lfes-phase-9k-message-format-1`: HTTP 200.
- hosted Resource Load Smoke: PASS.

### GitHub Actions

- Resource Load Smoke: PASS.
- run: `https://github.com/loufish727/MaintainOps/actions/runs/26172273053`
- Pages build/deployment: PASS.
- run: `https://github.com/loufish727/MaintainOps/actions/runs/26172272050`

### Live Signed-In Smoke

Live URL:

- `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9l-live-20260520`

Verified:

- signed-in session restored.
- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- Messages loaded with the Phase 9I QA thread.
- thread button rendered.
- one message bubble rendered.
- sender initials `LF` rendered.
- `Today` day divider rendered.
- My Work, Work Orders, Equipment, Parts, Team, Settings, and Messages loaded afterward.
- no visible app errors.
- no browser warning/error logs.

### Phase 9L Result

- package/upload: PASS.
- live resource verification: PASS.
- GitHub Actions Resource Load Smoke: PASS.
- Pages build/deployment: PASS.
- live signed-in smoke: PASS.
- behavior changed: no observed behavior change.
- Phase 9K/9L is fully closed.

### Recommended Next Phase

Choose one:

- LFES Phase 9M planning/readiness before any additional helper extraction.
- pause code movement and continue live pilot monitoring.

### Remains Blocked

- Phase 9M implementation without fresh approval.
- additional display extraction.
- message workflow movement.
- event handlers.
- mutations.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

## Phase 9M Equipment Label Readiness Decision - 2026-05-20

Phase 9M was planning/documentation only. No app code, helper extraction, rendering behavior, event binding, Supabase SQL/RLS, workflow logic, or business logic changed.

Detailed decision:

- `docs/LFES/audits/LFES_PHASE_9M_EQUIPMENT_LABEL_READINESS.md`

### Phase 9M Decision

Approve a narrow Phase 9N implementation:

- create `src/render/equipmentLabels.js`
- move only:
  - `assetTypeLabel`
  - `assetStatusLabel`

Reason:

- the helpers are pure string label helpers.
- they perform no Supabase calls.
- they emit no `data-*` behavior hooks.
- they do not create forms, event handlers, mutations, auth/session/company/location behavior, or storage behavior.

### Remains Blocked

- equipment cards/details/forms.
- equipment delete guards.
- equipment-driven routing behavior.
- Quick Fix hooks.
- parts/request/work-order renderers.
- event handlers.
- mutations.
- Supabase calls.
- auth/session/company/location logic.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.
- Supabase SQL/RLS.

## Phase 9N Equipment Label Helper Extraction - 2026-05-20

Phase 9N implemented the approved equipment label helper extraction only. No workflow, equipment mutation, routing behavior, event binding, Supabase query, auth/session/company/location logic, `renderWorkspace()`, `bindWorkspaceEvents()`, Supabase SQL/RLS, or business logic changed.

### Implementation

Created:

- `src/render/equipmentLabels.js`

Modified:

- `app.js`
- `index.html`
- `tests/smoke/resource-load.spec.js`
- `docs/LFES/audits/LFES_PHASE_9M_EQUIPMENT_LABEL_READINESS.md`
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- `docs/QA_LOG.md`
- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`

Moved from `app.js`:

- `assetTypeLabel`
- `assetStatusLabel`

The new module exposes `window.MaintainOpsEquipmentLabels`.

### Cache And Resource Smoke

- `index.html` now loads `src/render/equipmentLabels.js?v=lfes-phase-9n-equipment-labels-1`.
- `index.html` now loads `app.js?v=lfes-phase-9n-equipment-labels-1`.
- `tests/smoke/resource-load.spec.js` now checks `src/render/equipmentLabels.js`.
- Local Playwright Resource Load Smoke passed with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`.

### Line Reduction

- before Phase 9N: 10,487 lines.
- after Phase 9N: 10,476 lines.
- reduction: 11 lines.

### Local Smoke Result

Local signed-in smoke passed on:

- `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9n-equipment-labels-20260520`

Verified:

- Taylor Metal Products loaded.
- Salem, OR was selected.
- `src/render/equipmentLabels.js` and the Phase 9N `app.js` cache tag were present.
- Equipment opened and rendered equipment type/status labels.
- Work Orders, My Work, Parts, Team, Settings, and Messages loaded.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs captured.

### Remains Blocked

- package/upload until Phase 9O.
- equipment cards/details/forms.
- equipment delete guards.
- equipment-driven routing behavior.
- Quick Fix hooks.
- parts/request/work-order renderers.
- event handlers.
- mutations.
- Supabase calls.
- auth/session/company/location logic.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.
- Supabase SQL/RLS changes.

## Phase 9O Package/Upload And Live Verification - 2026-05-20

Phase 9O packaged and uploaded the stable Phase 9N equipment label helper extraction. No additional helpers moved, no workflow logic changed, no event handlers moved, and no Supabase SQL/RLS changed.

### Package And Deploy

- package: `MaintainOps-github-clean-20260520-085806`
- zip: `MaintainOps-github-clean-20260520-085806.zip`
- commit: `c7a03782b2bd6e547dcf6b99261d9d3c11a8d51a`
- commit message: `Extract equipment label helpers`

### Live Resource Verification

- live `index.html` references `src/render/equipmentLabels.js?v=lfes-phase-9n-equipment-labels-1`.
- live `index.html` references `app.js?v=lfes-phase-9n-equipment-labels-1`.
- live `src/render/equipmentLabels.js?v=lfes-phase-9n-equipment-labels-1`: HTTP 200.
- live `app.js?v=lfes-phase-9n-equipment-labels-1`: HTTP 200.
- hosted Resource Load Smoke: PASS.

### GitHub Actions

- Resource Load Smoke: PASS.
- run: `https://github.com/loufish727/MaintainOps/actions/runs/26174279121`
- Pages build/deployment: PASS.
- run: `https://github.com/loufish727/MaintainOps/actions/runs/26174277950`

### Live Signed-In Smoke

Live URL:

- `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9o-live-20260520`

Verified:

- signed-in session restored.
- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- Equipment loaded and rendered type/status labels.
- Work Orders, My Work, Parts, Team, Settings, and Messages loaded.
- no visible app errors.
- no browser warning/error logs.

### Phase 9O Result

- package/upload: PASS.
- live resource verification: PASS.
- GitHub Actions Resource Load Smoke: PASS.
- Pages build/deployment: PASS.
- live signed-in smoke: PASS.
- behavior changed: no observed behavior change.
- Phase 9N/9O is fully closed.

### Recommended Next Phase

Choose one:

- LFES Phase 9P planning/readiness before any additional helper extraction.
- pause code movement and continue live pilot monitoring.

### Remains Blocked

- Phase 9P implementation without fresh approval.
- additional display extraction.
- equipment cards/details/forms.
- event handlers.
- mutations.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

## Phase 9P Empty State Readiness - 2026-05-20

Phase 9P reviewed the next low-risk cleanup candidate after Phase 9N/9O was fully packaged, deployed, and live verified.

Approved for Phase 9Q:

- `requestEmptyStateText(filter)`
- `assetEmptyStateText()`
- `partEmptyStateText()`

The approved helpers are display-only copy helpers. They depend on current search/filter values, so the extraction must inject getter functions from `app.js` instead of letting the helper module read app globals directly.

Readiness audit:

- `docs/LFES/audits/LFES_PHASE_9P_EMPTY_STATE_READINESS.md`

Still blocked:

- request/equipment/parts filtering logic.
- pagination and count logic.
- cards, forms, detail panels, and source managers.
- event handlers and mutations.
- Quick Fix, public QR, messages workflow/composer.
- auth/session/company/location logic.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.
- Supabase SQL/RLS.

## Phase 9Q Empty State Text Extraction - 2026-05-20

Phase 9Q added `src/render/emptyStateText.js` and moved only the approved empty-state copy helpers.

Implementation:

- `src/render/emptyStateText.js` exposes `window.MaintainOpsEmptyStateText.createEmptyStateTextHelpers`.
- `app.js` injects:
  - `getSearchQuery`
  - `getAssetStatusFilter`
  - `getPartSearchQuery`
  - `getPartInventoryFilter`
  - `assetStatusLabel`
- `index.html` now loads `src/render/emptyStateText.js?v=lfes-phase-9q-empty-state-1`.
- `app.js` cache tag is now `app.js?v=lfes-phase-9q-empty-state-1`.
- Resource Load Smoke now includes `src/render/emptyStateText.js`.

Line count:

- before: 10,476 lines.
- after: 10,470 lines.
- reduction: 6 lines.

Local verification:

- static JS checks: PASS.
- local Resource Load Smoke: PASS.
- signed-in local smoke: PASS.

Local signed-in smoke verified:

- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new empty-state script and app cache tag loaded.
- Requests rendered active empty-state copy.
- Parts rendered empty-state copy.
- Equipment labels still rendered.
- Work Orders, My Work, Team, Settings, and Messages loaded.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs captured.

Phase 9Q result:

- local extraction: PASS.
- behavior changed: no observed behavior change.
- package/upload: next Phase 9R.

## Phase 9R Package/Upload And Live Verification - 2026-05-20

Phase 9R packaged and uploaded the stable Phase 9Q empty-state text helper extraction. No additional helpers moved, no workflow logic changed, no event handlers moved, and no Supabase SQL/RLS changed.

### Package And Deploy

- package: `MaintainOps-github-clean-20260520-091730`
- zip: `MaintainOps-github-clean-20260520-091730.zip`
- commit: `6f358dcdbfc3bd52aef6bce63521bcafa28d58f0`
- commit message: `Extract empty state text helpers`

### Live Resource Verification

- live `index.html` references `src/render/emptyStateText.js?v=lfes-phase-9q-empty-state-1`.
- live `index.html` references `app.js?v=lfes-phase-9q-empty-state-1`.
- live `src/render/emptyStateText.js?v=lfes-phase-9q-empty-state-1`: HTTP 200.
- live `app.js?v=lfes-phase-9q-empty-state-1`: HTTP 200.
- hosted Resource Load Smoke: PASS.

### GitHub Actions

- Resource Load Smoke: PASS.
- run: `https://github.com/loufish727/MaintainOps/actions/runs/26175333772`
- Pages build/deployment: PASS.
- run: `https://github.com/loufish727/MaintainOps/actions/runs/26175333222`

### Live Signed-In Smoke

Live URL:

- `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9r-live-20260520`

Verified:

- signed-in session restored.
- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new empty-state script and app cache tag loaded.
- Requests rendered active empty-state copy.
- Parts rendered empty-state copy.
- Equipment labels still rendered.
- Work Orders, My Work, Team, Settings, and Messages loaded.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs.

### Phase 9R Result

- package/upload: PASS.
- live resource verification: PASS.
- GitHub Actions Resource Load Smoke: PASS.
- Pages build/deployment: PASS.
- live signed-in smoke: PASS.
- behavior changed: no observed behavior change.
- Phase 9P/9Q/9R is fully closed.

### Recommended Next Phase

Choose one:

- LFES Phase 9S planning/readiness before any additional helper extraction.
- pause code movement and continue live pilot monitoring.

### Remains Blocked

- additional display extraction without fresh readiness.
- event handlers.
- mutations.
- workflow logic.
- auth/session/company/location logic.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

## Phase 9S Request Filter Display Readiness - 2026-05-20

Phase 9S reviewed the next low-risk cleanup candidate after Phase 9P/9Q/9R was fully packaged, deployed, and live verified.

Approved for Phase 9T:

- `requestPanelSubtitle(filter, count)`
- `renderRequestFilterBar(counts, selectedFilter, options = {})`

The approved helpers are display-only. They build the request panel subtitle and request filter bar HTML from counts/filter values already calculated by `app.js`.

Readiness audit:

- `docs/LFES/audits/LFES_PHASE_9S_REQUEST_FILTER_DISPLAY_READINESS.md`

Still blocked:

- `requestFilterCounts()`.
- request filtering and matching logic.
- request pagination, submit, conversion, delete, Quick Fix, and public QR behavior.
- event handlers and mutations.
- auth/session/company/location logic.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

## Phase 9T Request Filter Display Extraction - 2026-05-20

Phase 9T added `src/render/requestDisplay.js` and moved only the approved request filter display helpers.

Implementation:

- `src/render/requestDisplay.js` exposes `window.MaintainOpsRequestDisplay.createRequestDisplayHelpers`.
- `app.js` injects `segmentIcon`.
- `index.html` now loads `src/render/requestDisplay.js?v=lfes-phase-9t-request-display-1`.
- `app.js` cache tag is now `app.js?v=lfes-phase-9t-request-display-1`.
- Resource Load Smoke now includes `src/render/requestDisplay.js`.

Line count:

- before: 10,470 lines.
- after: 10,454 lines.
- reduction: 16 lines.

Local verification:

- static JS checks: PASS.
- local Resource Load Smoke: PASS.
- signed-in local smoke: PASS.

Local signed-in smoke verified:

- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new request display script and app cache tag loaded.
- Requests rendered Active/Converted/All filter buttons with counts.
- Requests rendered active empty-state copy.
- Work Orders, My Work, Equipment, Parts, Team, Settings, and Messages loaded.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs captured.

Phase 9T result:

- local extraction: PASS.
- behavior changed: no observed behavior change.
- package/upload: next Phase 9U.

## Phase 9U Package/Upload And Live Verification - 2026-05-20

Phase 9U packaged and uploaded the stable Phase 9T request filter display helper extraction. No additional helpers moved, no workflow logic changed, no event handlers moved, and no Supabase SQL/RLS changed.

### Package And Deploy

- package: `MaintainOps-github-clean-20260520-094703`
- zip: `MaintainOps-github-clean-20260520-094703.zip`
- commit: `c6e94f14a1faaa210d722116111ea3969ced1530`
- commit message: `Extract request filter display helpers`

### Live Resource Verification

- live `index.html` references `src/render/requestDisplay.js?v=lfes-phase-9t-request-display-1`.
- live `index.html` references `app.js?v=lfes-phase-9t-request-display-1`.
- live `src/render/requestDisplay.js?v=lfes-phase-9t-request-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-9t-request-display-1`: HTTP 200.
- hosted Resource Load Smoke: PASS.

### GitHub Actions

- Resource Load Smoke: PASS.
- run: `https://github.com/loufish727/MaintainOps/actions/runs/26176843065`
- Pages build/deployment: PASS.
- run: `https://github.com/loufish727/MaintainOps/actions/runs/26176841661`

### Live Signed-In Smoke

Live URL:

- `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9u-live-20260520`

Verified:

- signed-in session restored.
- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new request display script and app cache tag loaded.
- Requests rendered Active/Converted/All filter buttons with counts.
- Requests rendered active empty-state copy.
- Work Orders, My Work, Equipment, Parts, Team, Settings, and Messages loaded.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs.

### Phase 9U Result

- package/upload: PASS.
- live resource verification: PASS.
- GitHub Actions Resource Load Smoke: PASS.
- Pages build/deployment: PASS.
- live signed-in smoke: PASS.
- behavior changed: no observed behavior change.
- Phase 9S/9T/9U is fully closed.

### Recommended Next Phase

Choose one:

- LFES Phase 9V planning/readiness before any additional helper extraction.
- pause code movement and continue live pilot monitoring.

### Remains Blocked

- additional display extraction without fresh readiness.
- request filtering/counting/pagination.
- event handlers.
- mutations.
- workflow logic.
- auth/session/company/location logic.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

## Phase 9V Global Search Display Readiness - 2026-05-20

Phase 9V reviewed the next low-risk cleanup candidate after Phase 9S/9T/9U was fully packaged, deployed, and live verified.

Approved for Phase 9W:

- `renderGlobalSearchResults(results)`
- `renderGlobalResultGroup(title, items, renderer, tone, options = {})`
- `renderGlobalWorkResult(workOrder)`
- `renderGlobalAssetResult(asset)`
- `renderGlobalPartResult(part)`
- `renderGlobalRequestResult(request)`
- `renderGlobalPmResult(schedule)`
- `renderGlobalProcedureResult(template)`
- `globalResultCount(results)`

The approved helpers are display-only. They build global search result HTML from result data already prepared by `app.js`.

Readiness audit:

- `docs/LFES/audits/LFES_PHASE_9V_GLOBAL_SEARCH_DISPLAY_READINESS.md`

Still blocked:

- `globalSearchResults()`.
- search/filter/matching logic.
- exact work order search.
- search input state and localStorage.
- data-search click handlers.
- event handlers and mutations.
- auth/session/company/location logic.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

## Phase 9W Global Search Display Extraction - 2026-05-20

Phase 9W added `src/render/globalSearchDisplay.js` and moved only the approved global search result display helpers.

Implementation:

- `src/render/globalSearchDisplay.js` exposes `window.MaintainOpsGlobalSearchDisplay.createGlobalSearchDisplayHelpers`.
- `app.js` injects:
  - `escapeHtml`
  - `statusLabel`
  - `assignmentLabel`
  - `activeLocationName`
  - `getSearchQuery`
- `index.html` now loads `src/render/globalSearchDisplay.js?v=lfes-phase-9w-global-search-display-1`.
- `app.js` cache tag is now `app.js?v=lfes-phase-9w-global-search-display-1`.
- Resource Load Smoke now includes `src/render/globalSearchDisplay.js`.

Line count:

- before: 10,454 lines.
- after: 10,370 lines.
- reduction: 84 lines.

Local verification:

- static JS checks: PASS.
- local Resource Load Smoke: PASS.
- Node render probe for global search display HTML: PASS.
- signed-in local smoke: PASS.

Local signed-in smoke verified:

- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new global search display script and app cache tag loaded.
- Requests still rendered Active/Converted/All filter buttons.
- Work Orders, My Work, Equipment, Parts, Team, Settings, and Messages loaded.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs captured.

Phase 9W result:

- local extraction: PASS.
- behavior changed: no observed behavior change.
- package/upload: next Phase 9X.

## Phase 9X Package/Upload And Live Verification - 2026-05-20

Phase 9X packaged and uploaded the stable Phase 9W global search display helper extraction. No additional helpers moved, no workflow logic changed, no event handlers moved, and no Supabase SQL/RLS changed.

### Package And Deploy

- package: `MaintainOps-github-clean-20260520-100524`
- zip: `MaintainOps-github-clean-20260520-100524.zip`
- commit: `57a746f20af54941196f07c49b7fcb7e5b263808`
- commit message: `Extract global search display helpers`

### Live Resource Verification

- live `index.html` references `src/render/globalSearchDisplay.js?v=lfes-phase-9w-global-search-display-1`.
- live `index.html` references `app.js?v=lfes-phase-9w-global-search-display-1`.
- live `src/render/globalSearchDisplay.js?v=lfes-phase-9w-global-search-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-9w-global-search-display-1`: HTTP 200.
- hosted Resource Load Smoke after Pages served the new build: PASS.

### GitHub Actions

- Resource Load Smoke for commit `57a746f20af54941196f07c49b7fcb7e5b263808`: failed due Pages timing.
- run: `https://github.com/loufish727/MaintainOps/actions/runs/26177757511`
- Pages build/deployment: PASS.
- run: `https://github.com/loufish727/MaintainOps/actions/runs/26177756072`
- follow-up hosted Resource Load Smoke run locally against live GitHub Pages after Pages completed: PASS.

### Live Signed-In Smoke

Live URL:

- `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9x-live-20260520`

Verified:

- signed-in session restored.
- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new global search display script and app cache tag loaded.
- Requests still rendered Active/Converted/All filter buttons.
- Work Orders, My Work, Equipment, Parts, Team, Settings, and Messages loaded.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs.

### Phase 9X Result

- package/upload: PASS.
- live resource verification: PASS.
- Pages build/deployment: PASS.
- hosted Resource Load Smoke after Pages completion: PASS.
- live signed-in smoke: PASS.
- behavior changed: no observed behavior change.
- known issue: the first GitHub Actions Resource Load Smoke run for the app commit failed because it started before Pages served the new cache tags.
- Phase 9V/9W/9X is functionally closed.

### Recommended Next Phase

Choose one:

- LFES Phase 9Y planning/readiness before any additional helper extraction.
- pause code movement and continue live pilot monitoring.

### Remains Blocked

- additional display extraction without fresh readiness.
- global search/filter logic.
- exact work order search.
- search input state.
- data-search event handlers.
- mutations.
- workflow logic.
- auth/session/company/location logic.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

## Phase 9Y Work Queue Display Readiness - 2026-05-20

Phase 9Y reviewed the next low-risk cleanup candidate after Phase 9V/9W/9X was packaged, deployed, and live verified.

Approved for Phase 9Z:

- `workOrdersPanelTitle()`
- `myWorkPanelTitle()`
- `workQueuePanelTitle()`
- `workQueuePanelSubtitle(count)`

The approved helpers are display-only. They return Work Orders / My Work title and subtitle copy from existing filter state.

Readiness audit:

- `docs/LFES/audits/LFES_PHASE_9Y_WORK_QUEUE_DISPLAY_READINESS.md`

Still blocked:

- work order filtering/sorting/paging/counting.
- assignment filtering behavior.
- Quick Fix.
- work order create/update/complete/delete behavior.
- event handlers and mutations.
- auth/session/company/location logic.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

## Phase 9Z Work Queue Display Extraction - 2026-05-20

Phase 9Z added `src/render/workQueueDisplay.js` and moved only the approved Work Orders / My Work queue title/subtitle helpers.

Implementation:

- `src/render/workQueueDisplay.js` exposes `window.MaintainOpsWorkQueueDisplay.createWorkQueueDisplayHelpers`.
- `app.js` injects:
  - `statusLabel`
  - `teamMemberName`
  - `getWorkOrderAssigneeFilter`
  - `getWorkOrderFilter`
  - `getActiveStatusFilter`
  - `getMyWorkFilter`
  - `getActiveSection`
- `index.html` now loads `src/render/workQueueDisplay.js?v=lfes-phase-9z-work-queue-display-1`.
- `app.js` cache tag is now `app.js?v=lfes-phase-9z-work-queue-display-1`.
- Resource Load Smoke now includes `src/render/workQueueDisplay.js`.

Line count:

- before: 10,370 lines.
- after: 10,354 lines.
- reduction: 16 lines.

Local verification:

- static JS checks: PASS.
- local Resource Load Smoke: PASS.
- signed-in local smoke: PASS.

Local signed-in smoke verified:

- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new work queue display script and app cache tag loaded.
- My Work title/subtitle rendered.
- Work Orders title/subtitle rendered.
- Requests still rendered Active/Converted/All filter buttons.
- Equipment, Parts, Team, Settings, and Messages loaded.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs captured.

Phase 9Z result:

- local extraction: PASS.
- behavior changed: no observed behavior change.
- package/upload: next Phase 10A.

## Phase 10A Package/Upload And Live Verification - 2026-05-20

Phase 10A packaged and uploaded the stable Phase 9Z work queue display helper extraction. No additional helpers moved, no workflow logic changed, no event handlers moved, and no Supabase SQL/RLS changed.

### Package And Deploy

- package: `MaintainOps-github-clean-20260520-102539`
- zip: `MaintainOps-github-clean-20260520-102539.zip`
- commit: `b037737b5edcf85f9910fb89d087da33235a88de`
- commit message: `Extract work queue display helpers`

### Live Resource Verification

- live `index.html` references `src/render/workQueueDisplay.js?v=lfes-phase-9z-work-queue-display-1`.
- live `index.html` references `app.js?v=lfes-phase-9z-work-queue-display-1`.
- live `src/render/workQueueDisplay.js?v=lfes-phase-9z-work-queue-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-9z-work-queue-display-1`: HTTP 200.
- hosted Resource Load Smoke against live GitHub Pages: PASS.

### GitHub Actions

- Public GitHub API was rate-limited during final verification.
- Connector workflow lookup returned no workflow runs for commit `b037737b5edcf85f9910fb89d087da33235a88de`.
- Live resource verification and hosted Resource Load Smoke passed after Pages served the new build.

### Live Signed-In Smoke

Live URL:

- `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10a-live-20260520`

Verified:

- signed-in session restored.
- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new work queue display script and app cache tag loaded.
- My Work title/subtitle rendered.
- Work Orders title/subtitle rendered.
- Requests still rendered Active/Converted/All filter buttons.
- Equipment, Parts, Team, Settings, and Messages loaded.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs.

### Phase 10A Result

- package/upload: PASS.
- live resource verification: PASS.
- hosted Resource Load Smoke: PASS.
- live signed-in smoke: PASS.
- behavior changed: no observed behavior change.
- GitHub Actions final check unavailable due public API rate limiting / connector run lookup gap.
- Phase 9Y/9Z/10A is functionally closed.

### Recommended Next Phase

Choose one:

- LFES Phase 10B planning/readiness before any additional helper extraction.
- pause code movement and continue live pilot monitoring.

### Remains Blocked

- additional display extraction without fresh readiness.
- work order filtering/sorting/paging/counting.
- assignment filtering behavior.
- Quick Fix.
- work order create/update/complete/delete behavior.
- event handlers.
- mutations.
- workflow logic.
- auth/session/company/location logic.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

## Phase 10B Planning Display Readiness - 2026-05-20

Phase 10B reviewed the next low-risk cleanup candidate after Phase 9Y/9Z/10A was packaged, deployed, and live verified.

Approved for Phase 10C:

- `renderPlanningGroup(title, items, chipClass)`
- `renderPlanningItem(item)`

The approved helpers are display-only. They render Planning section groups and item cards from already-computed planning items.

Readiness audit:

- `docs/LFES/audits/LFES_PHASE_10B_PLANNING_DISPLAY_READINESS.md`

Still blocked:

- `planningItems()`.
- `planningPmItems()`.
- `followUpItems()`.
- PM generation.
- follow-up work order creation.
- mini work order opening behavior.
- event handlers and mutations.
- auth/session/company/location logic.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

## Phase 10C Planning Display Extraction - 2026-05-20

Phase 10C added `src/render/planningDisplay.js` and moved only the approved Planning display helpers.

Implementation:

- `src/render/planningDisplay.js` exposes `window.MaintainOpsPlanningDisplay.createPlanningDisplayHelpers`.
- `app.js` injects:
  - `escapeHtml`
  - `statusLabel`
  - `renderRelationshipChips`
- `index.html` now loads `src/render/planningDisplay.js?v=lfes-phase-10c-planning-display-1`.
- `app.js` cache tag is now `app.js?v=lfes-phase-10c-planning-display-1`.
- Resource Load Smoke now includes `src/render/planningDisplay.js`.

Line count:

- before: 10,354 lines.
- after: 10,309 lines.
- reduction: 45 lines.

Local verification:

- static JS checks: PASS.
- local Resource Load Smoke: PASS.
- signed-in local smoke: PASS.

Local signed-in smoke verified:

- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new Planning display script and app cache tag loaded.
- Planning rendered Overdue, Due Today, Next 7 Days, Follow-up Needed, and PM Due Soon groups.
- Requests still rendered Active/Converted/All filter buttons.
- My Work, Work Orders, Equipment, Parts, Team, Settings, and Messages loaded.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs captured.

Phase 10C result:

- local extraction: PASS.
- behavior changed: no observed behavior change.
- package/upload: next Phase 10D.

## Phase 10D Package/Upload And Live Verification - 2026-05-20

Phase 10D packaged and uploaded the stable Phase 10C Planning display helper extraction. No additional helpers moved, no workflow logic changed, no event handlers moved, and no Supabase SQL/RLS changed.

### Package And Deploy

- package: `MaintainOps-github-clean-20260520-103436`
- zip: `MaintainOps-github-clean-20260520-103436.zip`
- commit: `efef39c`
- commit message: `Extract planning display helpers`

### Live Resource Verification

- live `index.html` references `src/render/planningDisplay.js?v=lfes-phase-10c-planning-display-1`.
- live `index.html` references `app.js?v=lfes-phase-10c-planning-display-1`.
- live `src/render/planningDisplay.js?v=lfes-phase-10c-planning-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-10c-planning-display-1`: HTTP 200.
- hosted Resource Load Smoke against live GitHub Pages: PASS.

### GitHub Actions

- Public GitHub API was still rate-limited during final verification.
- Live resource verification and hosted Resource Load Smoke passed after Pages served the new build.

### Live Signed-In Smoke

Live URL:

- `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10d-live-20260520`

Verified:

- signed-in session restored.
- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new Planning display script and app cache tag loaded.
- Planning rendered Overdue, Due Today, Next 7 Days, Follow-up Needed, and PM Due Soon groups.
- Requests still rendered Active/Converted/All filter buttons.
- My Work, Work Orders, Equipment, Parts, Team, Settings, and Messages loaded.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs.

### Phase 10D Result

- package/upload: PASS.
- live resource verification: PASS.
- hosted Resource Load Smoke: PASS.
- live signed-in smoke: PASS.
- behavior changed: no observed behavior change.
- GitHub Actions final check unavailable due public API rate limiting.
- Phase 10B/10C/10D is functionally closed.

### Recommended Next Phase

Choose one:

- LFES Phase 10E planning/readiness before any additional helper extraction.
- pause code movement and continue live pilot monitoring.

## Phase 10E/10F Mini Work Order Display Extraction - 2026-05-20

Phase 10E readiness approved only the tiny mini work order display helper extraction. Phase 10F added `src/render/miniWorkOrderDisplay.js` and moved only:

- `renderMiniWorkOrder`
- `renderAssetMiniWorkOrder`

Implementation:

- `src/render/miniWorkOrderDisplay.js` exposes `window.MaintainOpsMiniWorkOrderDisplay.createMiniWorkOrderDisplayHelpers`.
- `app.js` injects:
  - `escapeHtml`
  - `statusLabel`
  - `relationshipIcon`
  - read-only accessors for `partsUsedByWorkOrder` and `photosByWorkOrder`
- `index.html` now loads `src/render/miniWorkOrderDisplay.js?v=lfes-phase-10f-mini-work-order-display-1`.
- `app.js` cache tag is now `app.js?v=lfes-phase-10f-mini-work-order-display-1`.
- Resource Load Smoke now includes `src/render/miniWorkOrderDisplay.js`.

Line count:

- before: 10,309 lines.
- after: 10,290 lines.
- reduction: 19 lines.

Local verification:

- static JS checks: PASS.
- local Resource Load Smoke: PASS.
- signed-in local smoke: PASS.

Local signed-in smoke verified:

- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new mini work order display script and app cache tag loaded.
- My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages loaded.
- Equipment still showed `New thalmann`.
- Equipment detail rendered two `[data-mini-work-order]` snippets.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs captured.

Phase 10F result:

- local extraction: PASS.
- behavior changed: no observed behavior change.
- package/upload: next Phase 10G.

## Phase 10G Package/Upload And Live Verification - 2026-05-20

Phase 10G packaged and uploaded the stable Phase 10F mini work order display helper extraction. No additional helpers moved, no workflow logic changed, no event handlers moved, and no Supabase SQL/RLS changed.

### Package And Deploy

- package: `MaintainOps-github-clean-20260520-110415`
- zip: `MaintainOps-github-clean-20260520-110415.zip`
- commit: `fba2c26`
- commit message: `Extract mini work order display helpers`

### Live Resource Verification

- live `index.html` references `src/render/miniWorkOrderDisplay.js?v=lfes-phase-10f-mini-work-order-display-1`.
- live `index.html` references `app.js?v=lfes-phase-10f-mini-work-order-display-1`.
- live `src/render/miniWorkOrderDisplay.js?v=lfes-phase-10f-mini-work-order-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-10f-mini-work-order-display-1`: HTTP 200.
- hosted Resource Load Smoke against live GitHub Pages: PASS.

### GitHub Actions

- GitHub connector check for commit `fba2c26` returned no workflow runs.
- Live resource verification and hosted Resource Load Smoke passed after Pages served the new build.

### Live Signed-In Smoke

Live URL:

- `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10g-live-20260520`

Verified:

- signed-in session restored.
- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new mini work order display script and app cache tag loaded.
- My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages loaded.
- Equipment still showed `New thalmann`.
- Equipment detail rendered two `[data-mini-work-order]` snippets.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs.

### Phase 10G Result

- package/upload: PASS.
- live resource verification: PASS.
- hosted Resource Load Smoke: PASS.
- live signed-in smoke: PASS.
- behavior changed: no observed behavior change.
- Phase 10E/10F/10G is functionally closed.

### Recommended Next Phase

Choose one:

- LFES Phase 10H planning/readiness before any additional helper extraction.
- pause code movement and continue live pilot monitoring.

## Phase 10H/10I Pagination Display Extraction - 2026-05-20

Phase 10H readiness approved only the pagination display helper extraction. Phase 10I added `src/render/paginationDisplay.js` and moved only:

- `renderWorkPagination`
- `renderPartsPagination`
- `renderAssetsPagination`
- `renderListPagination`

Implementation:

- `src/render/paginationDisplay.js` exposes `window.MaintainOpsPaginationDisplay.createPaginationDisplayHelpers`.
- `app.js` injects:
  - `WORK_ORDERS_PER_PAGE`
  - `PARTS_PER_PAGE`
  - `ASSETS_PER_PAGE`
  - `LIST_ITEMS_PER_PAGE`
  - read-only getters for `workOrderPage`, `partsPage`, and `assetsPage`
- `index.html` now loads `src/render/paginationDisplay.js?v=lfes-phase-10i-pagination-display-1`.
- `app.js` cache tag is now `app.js?v=lfes-phase-10i-pagination-display-1`.
- Resource Load Smoke now includes `src/render/paginationDisplay.js`.

Line count:

- before: 10,290 lines.
- after: 10,253 lines.
- reduction: 37 lines.

Local verification:

- static JS checks: PASS.
- local Resource Load Smoke: PASS.
- signed-in local smoke: PASS.

Local signed-in smoke verified:

- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new pagination display script and app cache tag loaded.
- My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages loaded.
- Equipment still showed `New thalmann`.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs captured.
- current Salem data did not exceed pagination thresholds, so no pagination bars were visible in the smoke pass.

Phase 10I result:

- local extraction: PASS.
- behavior changed: no observed behavior change.
- package/upload: next Phase 10J.

## Phase 10J Package/Upload And Live Verification - 2026-05-20

Phase 10J packaged and uploaded the stable Phase 10I pagination display helper extraction. No additional helpers moved, no workflow logic changed, no event handlers moved, and no Supabase SQL/RLS changed.

### Package And Deploy

- package: `MaintainOps-github-clean-20260520-114423`
- zip: `MaintainOps-github-clean-20260520-114423.zip`
- commit: `a0f48e3`
- commit message: `Extract pagination display helpers`

### Live Resource Verification

- live `index.html` references `src/render/paginationDisplay.js?v=lfes-phase-10i-pagination-display-1`.
- live `index.html` references `app.js?v=lfes-phase-10i-pagination-display-1`.
- live `src/render/paginationDisplay.js?v=lfes-phase-10i-pagination-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-10i-pagination-display-1`: HTTP 200.
- hosted Resource Load Smoke against live GitHub Pages: PASS.

### GitHub Actions

- GitHub connector check for commit `a0f48e3` returned no workflow runs.
- Live resource verification and hosted Resource Load Smoke passed after Pages served the new build.

### Live Signed-In Smoke

Live URL:

- `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10j-live-20260520`

Verified:

- signed-in session restored.
- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new pagination display script and app cache tag loaded.
- My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages loaded.
- Equipment still showed `New thalmann`.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs.
- current Salem data did not exceed pagination thresholds, so no pagination bars were visible in the smoke pass.

### Phase 10J Result

- package/upload: PASS.
- live resource verification: PASS.
- hosted Resource Load Smoke: PASS.
- live signed-in smoke: PASS.
- behavior changed: no observed behavior change.
- Phase 10H/10I/10J is functionally closed.

### Recommended Next Phase

Choose one:

- LFES Phase 10K planning/readiness before any additional helper extraction.
- pause code movement and continue live pilot monitoring.

## Phase 10K/10L Parts Display Extraction - 2026-05-20

Phase 10K readiness approved only the Parts list display helper extraction. Phase 10L added `src/render/partsDisplay.js` and moved only:

- `renderPart`
- `renderPartsHealth`
- `renderPartSearch`

Implementation:

- `src/render/partsDisplay.js` exposes `window.MaintainOpsPartsDisplay.createPartsDisplayHelpers`.
- `app.js` injects:
  - `escapeHtml`
  - `money`
  - `isLowStockPart`
  - `matchesActiveLocation`
  - read-only accessors for parts, part cost readiness, inventory filter, and search query
- `index.html` now loads `src/render/partsDisplay.js?v=lfes-phase-10l-parts-display-1`.
- `app.js` cache tag is now `app.js?v=lfes-phase-10l-parts-display-1`.
- Resource Load Smoke now includes `src/render/partsDisplay.js`.

Line count:

- before: 10,253 lines.
- after: 10,215 lines.
- reduction: 38 lines.

Local verification:

- static JS checks: PASS.
- local Resource Load Smoke: PASS.
- signed-in local smoke: PASS.

Local signed-in smoke verified:

- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new parts display script and app cache tag loaded.
- My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages loaded.
- Equipment still showed `New thalmann`.
- Parts Inventory rendered two `.parts-health` controls, one `#part-search-form`, and the All Parts / Low Stock labels.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs captured.
- current Salem data had zero visible part cards, so the empty-state path was observed.

Phase 10L result:

- local extraction: PASS.
- behavior changed: no observed behavior change.
- package/upload: next Phase 10M.

## Phase 10M Package/Upload And Live Verification - 2026-05-20

Phase 10M packaged and uploaded the stable Phase 10L Parts display helper extraction. No additional helpers moved, no workflow logic changed, no event handlers moved, and no Supabase SQL/RLS changed.

### Package And Deploy

- package: `MaintainOps-github-clean-20260520-115838`
- zip: `MaintainOps-github-clean-20260520-115838.zip`
- commit: `affeabb`
- commit message: `Extract parts display helpers`

### Live Resource Verification

- live `index.html` references `src/render/partsDisplay.js?v=lfes-phase-10l-parts-display-1`.
- live `index.html` references `app.js?v=lfes-phase-10l-parts-display-1`.
- live `src/render/partsDisplay.js?v=lfes-phase-10l-parts-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-10l-parts-display-1`: HTTP 200.
- hosted Resource Load Smoke against live GitHub Pages: PASS.

### GitHub Actions

- GitHub connector check for commit `affeabb` returned no workflow runs.
- Live resource verification and hosted Resource Load Smoke passed after Pages served the new build.

### Live Signed-In Smoke

Live URL:

- `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10m-live-20260520`

Verified:

- signed-in session restored.
- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new Parts display script and app cache tag loaded.
- My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Team, Admin Setup, Settings, and Messages loaded.
- Equipment still showed `New thalmann`.
- Parts Inventory rendered two `.parts-health` controls, one `#part-search-form`, and the All Parts / Low Stock labels.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs.
- current Salem data had zero visible part cards, so the empty-state path was observed.

### Phase 10M Result

- package/upload: PASS.
- live resource verification: PASS.
- hosted Resource Load Smoke: PASS.
- live signed-in smoke: PASS.
- behavior changed: no observed behavior change.
- Phase 10K/10L/10M is functionally closed.

### Recommended Next Phase

Choose one:

- LFES Phase 10N planning/readiness before any additional helper extraction.
- pause code movement and continue live pilot monitoring.

### Remains Blocked

- additional display extraction without fresh readiness.
- planning item generation.
- PM generation.
- follow-up work order creation.
- mini work order opening behavior.
- event handlers.
- mutations.
- workflow logic.
- auth/session/company/location logic.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.
