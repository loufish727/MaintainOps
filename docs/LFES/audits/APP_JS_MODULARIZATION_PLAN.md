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

## Phase 10W Through 11Q Continuation - 2026-05-20

The continuation from Phase 10W through Phase 11Q completed seven additional tiny display-only extraction cycles:

- Phase 10W/10X/10Y: `src/render/messageBadgeDisplay.js` moved `renderMessageNavBadge`.
- Phase 10Z/11A/11B: `src/render/appIssueDisplay.js` moved `renderAppIssueReport`.
- Phase 11C/11D/11E: `src/render/workMessageDisplay.js` moved `renderWorkOrderMessages` and `renderLinkedWorkMessageThread`.
- Phase 11F/11G/11H: `src/render/workRecommendationDisplay.js` moved `renderWorkOrderRecommendation`.
- Phase 11I/11J/11K: `src/render/commandCardDisplay.js` moved `renderEmailHelperCommandCard` and `commandShortcut`.
- Phase 11L/11M/11N: `src/render/workCommandDisplay.js` moved `renderWorkOrderCommandSummary`.
- Phase 11O/11P/11Q: `src/render/missingWorkDetailDisplay.js` moved `renderMissingWorkOrderDetail`.

Latest state:

- latest app commit: `3c31d77`.
- latest package: `MaintainOps-github-clean-20260520-131510`.
- latest live smoke URL: `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-11q-live-20260520`.
- `app.js` line count after Phase 11P: 10,093.

Verification:

- static JS checks: PASS.
- local Resource Load Smoke: PASS.
- hosted GitHub Pages Resource Load Smoke: PASS.
- signed-in live smoke: PASS.
- Taylor Metal Products, Salem, OR, and Phase 9I message thread remained visible.
- no browser warning/error logs.
- GitHub connector returned no workflow runs for latest app commits.

Continue with the same guardrails for the next cleanup pass. The remaining extractions should still avoid workflow logic, event handlers, mutations, auth/session/company/location logic, Supabase SQL/RLS, storage/photo/document flows, Quick Fix, request conversion, delete guards, `renderWorkspace()`, and `bindWorkspaceEvents()`.

## Phase 11R Through 11W Continuation - 2026-05-20

Two additional display-only extraction cycles completed:

- Phase 11R/11S/11T: `src/render/partSourceDisplay.js` moved `renderPartSourceOptions` and `renderPartSourceManager`.
- Phase 11U/11V/11W: `src/render/assetCardDisplay.js` moved `renderAssetCard`.

Latest state:

- latest app commit: `3e68c82`.
- latest package: `MaintainOps-github-clean-20260520-132436`.
- latest live smoke URL: `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-11w-live-20260520`.
- `app.js` line count after Phase 11V: 10,055.

Verification:

- static JS checks: PASS.
- local Resource Load Smoke: PASS.
- hosted GitHub Pages Resource Load Smoke: PASS.
- signed-in live Equipment smoke: PASS.
- Equipment rendered 1 asset card.
- Phase 9I message regression after navigation: PASS.
- no browser warning/error logs.
- GitHub connector returned no workflow runs for latest app commits.

Next candidate selection should be more conservative. Many remaining render functions are mixed with auth, public QR, full forms, danger zones, workflow actions, or delete controls.

## Phase 11X Through 12R Continuation - 2026-05-20

Seven additional low-risk display extraction cycles completed:

- Phase 11X/11Y/11Z: `src/render/procedureOptionsDisplay.js` moved `renderProcedureOptions`.
- Phase 12A/12B/12C: `src/render/messageThreadButtonDisplay.js` moved `renderMessageThreadButton`.
- Phase 12D/12E/12F: `src/render/appIssuePanelDisplay.js` moved `renderAppIssueReportsPanel`.
- Phase 12G/12H/12I: `src/render/messageThreadLabelDisplay.js` moved `messageThreadScopeLabel` and `directThreadNames`.
- Phase 12J/12K/12L: `src/render/messageComposerDisplay.js` moved `messageComposerScopeNote`.
- Phase 12M/12N/12O: `src/render/inviteLocationDisplay.js` moved `inviteDefaultLocationLabel`.
- Phase 12P/12Q/12R: `src/render/partSetupDisplay.js` moved `partSetupMessage`.

Latest state:

- latest app commit: `eef5e1c`.
- latest package: `MaintainOps-github-clean-20260520-134626`.
- latest live smoke URL: `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-12r-live-20260520`.
- `app.js` line count after Phase 12Q: 10,042.

Verification:

- static JS checks: PASS.
- local Resource Load Smoke: PASS.
- hosted GitHub Pages Resource Load Smoke: PASS.
- signed-in live Parts smoke: PASS.
- Phase 9I message regression after navigation: PASS.
- no browser warning/error logs.
- GitHub connector returned no workflow runs for latest app commits.

Continue only with fresh readiness. Remaining render functions are mostly medium/high-risk because they include forms, auth/startup, public QR, work/request workflow actions, assignment controls, delete zones, or full detail views.

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

## Phase 10N/10O Option Display Extraction - 2026-05-20

Phase 10N readiness approved only the option-list display helper extraction. Phase 10O added `src/render/optionDisplay.js` and moved only:

- `renderLocationOptions`
- `renderAssetOptions`
- `renderParentAssetOptions`
- `assetOptionLabel`

Implementation:

- `src/render/optionDisplay.js` exposes `window.MaintainOpsOptionDisplay.createOptionDisplayHelpers`.
- `app.js` injects:
  - `escapeHtml`
  - read-only accessors for locations, active location, and assets
  - existing read-only helpers `filteredAssets`, `matchesActiveLocation`, `isAssetDescendantOf`, and `parentAssetFor`
- `index.html` now loads `src/render/optionDisplay.js?v=lfes-phase-10o-option-display-1`.
- `app.js` cache tag is now `app.js?v=lfes-phase-10o-option-display-1`.
- Resource Load Smoke now includes `src/render/optionDisplay.js`.

Line count:

- before: 10,215 lines.
- after: 10,204 lines.
- reduction: 11 lines.

Local verification:

- static JS checks: PASS.
- local Resource Load Smoke: PASS.
- signed-in local smoke: PASS.

Local signed-in smoke verified:

- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new option display script and app cache tag loaded.
- request asset select rendered 2 options.
- create equipment parent select rendered 2 options.
- create equipment location select rendered 5 options.
- PM asset select rendered 2 options.
- team invite default location select rendered 5 options.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs captured.

Phase 10O result:

- local extraction: PASS.
- behavior changed: no observed behavior change.
- package/upload: next Phase 10P.

## Phase 10P Package/Upload And Live Verification - 2026-05-20

Phase 10P packaged and uploaded the stable Phase 10O option display helper extraction. No additional helpers moved, no workflow logic changed, no event handlers moved, and no Supabase SQL/RLS changed.

### Package And Deploy

- package: `MaintainOps-github-clean-20260520-122031`
- zip: `MaintainOps-github-clean-20260520-122031.zip`
- commit: `0b100fa`
- commit message: `Extract option display helpers`

### Live Resource Verification

- live `index.html` references `src/render/optionDisplay.js?v=lfes-phase-10o-option-display-1`.
- live `index.html` references `app.js?v=lfes-phase-10o-option-display-1`.
- live `src/render/optionDisplay.js?v=lfes-phase-10o-option-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-10o-option-display-1`: HTTP 200.
- hosted Resource Load Smoke against live GitHub Pages: PASS.

### GitHub Actions

- GitHub connector check for commit `0b100fa` returned no workflow runs.
- Live resource verification and hosted Resource Load Smoke passed after Pages served the new build.

### Live Signed-In Smoke

Live URL:

- `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-10p-live-20260520`

Verified:

- signed-in session restored.
- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new option display script and app cache tag loaded.
- request asset select rendered 2 options.
- create equipment parent select rendered 2 options.
- create equipment location select rendered 5 options.
- PM asset select rendered 2 options.
- team invite default location select rendered 5 options.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs.

### Phase 10P Result

- package/upload: PASS.
- live resource verification: PASS.
- hosted Resource Load Smoke: PASS.
- live signed-in smoke: PASS.
- behavior changed: no observed behavior change.
- Phase 10N/10O/10P is functionally closed.

### Recommended Next Phase

Choose one:

- LFES Phase 10Q planning/readiness before any additional helper extraction.
- pause code movement and continue live pilot monitoring.

## Phase 10Q/10R Setup Display Extraction - 2026-05-20

Phase 10Q readiness approved only the Admin Setup item display helper extraction. Phase 10R added `src/render/setupDisplay.js` and moved only:

- `renderSetupItem`

Implementation:

- `src/render/setupDisplay.js` exposes `window.MaintainOpsSetupDisplay.createSetupDisplayHelpers`.
- `app.js` injects `escapeHtml`.
- `index.html` now loads `src/render/setupDisplay.js?v=lfes-phase-10r-setup-display-1`.
- `app.js` cache tag is now `app.js?v=lfes-phase-10r-setup-display-1`.
- Resource Load Smoke now includes `src/render/setupDisplay.js`.

Line count:

- before: 10,204 lines.
- after: 10,197 lines.
- reduction: 7 lines.

Local verification:

- static JS checks: PASS.
- local Resource Load Smoke: PASS.
- signed-in local smoke: PASS.

Local signed-in smoke verified:

- Taylor Metal Products loaded.
- Salem, OR stayed selected.
- new setup display script and app cache tag loaded.
- Admin Setup opened and rendered 16 `.setup-item` cards.
- Admin Setup included `Supabase config` and `Photos`.
- Messages still showed the Phase 9I QA thread.
- no visible app errors.
- no browser warning/error logs captured.

Phase 10R result:

- local extraction: PASS.
- behavior changed: no observed behavior change.
- package/upload: next Phase 10S.

## Phase 10S Package/Upload And Live Verification - 2026-05-20

Phase 10S packaged and uploaded the stable Phase 10R setup display helper extraction.

- package: `MaintainOps-github-clean-20260520-123706`
- commit: `f09abd2`
- live `src/render/setupDisplay.js?v=lfes-phase-10r-setup-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-10r-setup-display-1`: HTTP 200.
- hosted Resource Load Smoke: PASS.
- live signed-in setup smoke: PASS.
- GitHub connector check for commit `f09abd2` returned no workflow runs.

Phase 10Q/10R/10S result:

- package/upload: PASS.
- live resource verification: PASS.
- hosted Resource Load Smoke: PASS.
- live signed-in smoke: PASS.
- behavior changed: no observed behavior change.

## Phase 10T/10U Request Photo Display Extraction - 2026-05-20

Phase 10T readiness approved only the request photo preview display helper extraction. Phase 10U added `src/render/requestPhotoDisplay.js` and moved only:

- `renderMaintenanceRequestPhoto`

Implementation:

- `src/render/requestPhotoDisplay.js` exposes `window.MaintainOpsRequestPhotoDisplay.createRequestPhotoDisplayHelpers`.
- `app.js` injects `escapeHtml`, `requestPhotoMetaText`, and a read-only request photo readiness accessor.
- `index.html` now loads `src/render/requestPhotoDisplay.js?v=lfes-phase-10u-request-photo-display-1`.
- `app.js` cache tag is now `app.js?v=lfes-phase-10u-request-photo-display-1`.
- Resource Load Smoke now includes `src/render/requestPhotoDisplay.js`.

Line count:

- before: 10,197 lines.
- after: 10,187 lines.
- reduction: 10 lines.

Local verification:

- static JS checks: PASS.
- local Resource Load Smoke: PASS.
- signed-in local Requests smoke: PASS.
- no visible app errors.
- no browser warning/error logs captured.

## Phase 10V Package/Upload And Live Verification - 2026-05-20

Phase 10V packaged and uploaded the stable Phase 10U request photo display helper extraction.

- package: `MaintainOps-github-clean-20260520-124047`
- commit: `0b889c8`
- live `src/render/requestPhotoDisplay.js?v=lfes-phase-10u-request-photo-display-1`: HTTP 200.
- live `app.js?v=lfes-phase-10u-request-photo-display-1`: HTTP 200.
- hosted Resource Load Smoke: PASS.
- live signed-in Requests smoke: PASS.
- GitHub connector check for commit `0b889c8` returned no workflow runs.

Phase 10T/10U/10V result:

- package/upload: PASS.
- live resource verification: PASS.
- hosted Resource Load Smoke: PASS.
- live signed-in smoke: PASS.
- behavior changed: no observed behavior change.
- Phase 10Q through 10V is functionally closed.

## Phase 12S Through 13M Display Extraction Continuation - 2026-05-20

Completed another 21 controlled LFES phase steps:

- Phase 12S/12T/12U: extracted `teamMemberName` into `src/render/teamMemberDisplay.js`; deploy commit `7c2d1e9`.
- Phase 12V/12W/12X: extracted `teamMemberWorkload` into `src/render/teamWorkloadDisplay.js`; deploy commit `2237404`.
- Phase 12Y/12Z/13A: extracted `activeLocationName` into `src/render/locationDisplay.js`; deploy commit `05364be`.
- Phase 13B/13C/13D: extracted downtime email subject/body helpers into `src/render/downtimeEmailDisplay.js`; deploy commit `92cd812`.
- Phase 13E/13F/13G: extracted setup error text helpers into `src/render/setupErrorDisplay.js`; deploy commit `31ec687`.
- Phase 13H/13I/13J: extracted `friendlyWorkOrderSaveError` into `src/render/workOrderErrorDisplay.js`; deploy commit `d3b8e63`.
- Phase 13K/13L/13M: extracted `assignmentLabel` into `src/render/assignmentDisplay.js`; deploy commit `10516dc`.

Final verification:

- final package: `MaintainOps-github-clean-20260520-141451`.
- final cache tag: `app.js?v=lfes-phase-13l-assignment-display-1`.
- final hosted Resource Load Smoke: PASS.
- final live signed-in smoke: PASS.
- final browser console warning/error logs: clean.
- `app.js` line count after Phase 13L: 10,011.

Boundary preserved:

- No workflow logic, event handlers, mutations, auth/session/company/location logic, Supabase SQL/RLS, `renderWorkspace()`, `bindWorkspaceEvents()`, assignment controls, delete zones, public QR flows, Quick Fix, request conversion, or PM generation were moved.

### Recommended Next Phase

Choose one:

- LFES Phase 10W planning/readiness before any additional helper extraction.
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

## Phase 13N Through 14G Display Extraction Continuation - 2026-05-20

Completed another 21 controlled LFES phase steps under the medium-risk workflow:

- Phase 13N/13O/13P: extracted work-order description display helpers into `src/render/workOrderDescriptionDisplay.js`; deploy commit `7053b85`.
- Phase 13P/13Q/13R: extracted `describeWorkOrderChanges` into `src/render/workOrderChangeDisplay.js`; deploy commit `8c0393d`.
- Phase 13S/13T/13U: extracted `buildActivityFeed` into `src/render/activityFeedDisplay.js`; deploy commit `a8c0333`.
- Phase 13V/13W/13X: extracted `isLowStockPart` and `lowStockParts` into `src/render/partInventoryDisplay.js`; deploy commit `6985a70`.
- Phase 13Y/13Z/14A: extracted `partUsageRows` into `src/render/partUsageDisplay.js`; deploy commit `381bbc3`.
- Phase 14B/14C/14D: extracted `openMaintenanceRequests` into `src/render/requestQueueDisplay.js`; deploy commit `ac9a3fa`.
- Phase 14E/14F/14G: extracted `assetDeleteBlockerMessage` and `procedureDeleteBlockerMessage` into `src/render/deleteBlockerDisplay.js`; deploy commit `1a17d36`.

Final verification:

- final package: `MaintainOps-github-clean-20260520-145833`.
- final cache tag: `app.js?v=lfes-phase-14f-delete-blocker-display-1`.
- final hosted Resource Load Smoke: PASS.
- final live signed-in smoke: PASS.
- final browser console warning/error logs: clean after filtering known benign noise.
- `app.js` line count after Phase 14F: 9,969.

Boundary preserved:

- No request/workflow mutations, request conversion, Quick Fix, delete actions, delete confirmations, blocker queries, auth/startup, public QR flows, forms with mutations, PM generation, event handlers, Supabase SQL/RLS, `renderWorkspace()`, or `bindWorkspaceEvents()` were moved.

### Recommended Next Phase

Choose one:

- LFES Phase 14H planning/readiness before any additional helper extraction.
- pause code movement and continue live pilot monitoring.

## Phase 14H Through 15B Display/Search Extraction Continuation - 2026-05-20

Completed another 21 controlled LFES phase steps under the medium-risk workflow:

- Phase 14H/14I/14J: extracted request filter/count helpers into `src/render/requestQueueDisplay.js`; deploy commit `d5bbfe9`.
- Phase 14K/14L/14M: extracted asset hierarchy filter helpers into `src/render/assetHierarchyDisplay.js`; deploy commit `bed7851`.
- Phase 14N/14O/14P: extracted part filter/search/source helpers into `src/render/partInventoryDisplay.js`; deploy commit `6e99df9`.
- Phase 14Q/14R/14S: extracted `filteredMembers` into `src/render/teamMemberDisplay.js`; deploy commit `85029c7`.
- Phase 14T/14U/14V: extracted maintenance list filters into `src/render/maintenanceListDisplay.js`; deploy commit `65aaa6a`.
- Phase 14W/14X/14Y: extracted dashboard metric helpers into `src/render/dashboardDisplay.js`; deploy commit `01f547b`.
- Phase 14Z/15A/15B: extracted shared search predicates into `src/render/searchFilterDisplay.js`; deploy commit `1242284`.

Final verification:

- final package: `MaintainOps-github-clean-20260520-152322`.
- final cache tag: `app.js?v=lfes-phase-15a-search-filter-display-1`.
- final hosted resource checks: PASS.
- final live signed-in smoke: PASS.
- final browser console warning/error logs: clean after filtering known benign noise.
- `app.js` line count after Phase 15A: 9,854.

Boundary preserved:

- No workflow logic, event handlers, mutations, auth/session/company/location logic, Supabase SQL/RLS, storage/photo/document flows, Quick Fix, request conversion, delete actions, delete confirmations, public QR flows, PM generation, forms with mutations, assignment controls, `renderWorkspace()`, or `bindWorkspaceEvents()` were moved.

### Recommended Next Phase

Choose one:

- LFES Phase 15C planning/readiness before any additional helper extraction.
- pause code movement for an AI/code review because remaining candidates are more cross-cutting and higher risk.

## Phase 15C Through 15W Display Extraction Continuation - 2026-05-20

Completed another 21 controlled LFES phase steps under the medium-risk workflow:

- Phase 15C/15D/15E: extracted work-order sort helpers into `src/render/workOrderSortDisplay.js`; deploy commit `51092d8`.
- Phase 15F/15G/15H: extracted active-location filter helpers into `src/render/locationFilterDisplay.js`; deploy commit `ef12207`.
- Phase 15I/15J/15K: extracted message thread filter/unread helpers into `src/render/messageThreadFilterDisplay.js`; deploy commit `fb9ba71`.
- Phase 15L/15M/15N: extracted setup readiness status helper into `src/render/setupStatusDisplay.js`; deploy commit `b62799d`.
- Phase 15O/15P/15Q: extracted work-order status predicate into `src/render/workOrderStatusFilterDisplay.js`; deploy commit `d0da94c`.
- Phase 15R/15S/15T: extracted work-order search value helper into `src/render/workOrderSearchDisplay.js`; deploy commit `fd96990`.
- Phase 15U/15V/15W: extracted `myWorkQueueOrders` into `src/render/myWorkQueueDisplay.js`; deploy commit `3a9f4be`.

Final verification:

- final package: `MaintainOps-github-clean-20260520-155625`.
- final package path: `C:\Users\louie\Documents\Codex\2026-05-20\3-maintain-ops-continuation-build\packages`.
- final cache tag: `app.js?v=lfes-phase-15v-my-work-queue-display-1`.
- final hosted resource checks: PASS.
- final live signed-in smoke: PASS.
- final browser console warning/error logs: clean after filtering known benign noise.
- `app.js` line count after Phase 15V: 9,705.

Boundary preserved:

- No workflow logic, event handlers, mutations, auth/session/company/location startup, Supabase SQL/RLS, storage/photo/document flows, Quick Fix, request conversion, delete actions, delete confirmations, public QR flows, PM generation, forms with mutations, assignment controls, `renderWorkspace()`, or `bindWorkspaceEvents()` were moved.

### Recommended Next Phase

Choose one:

- LFES Phase 15X planning/readiness only after a fresh remaining-candidate audit.
- pause code movement for an AI/code review because remaining candidates are now mostly core queue/detail/form/workflow areas.

## Phase 15X Through 16C Error Display Extraction - 2026-05-20

Completed a smaller 6-step LFES phase run under the medium-risk workflow:

- Phase 15X/15Y/15Z: extracted pure message-center error classification/text into `src/render/messageCenterErrorDisplay.js`; deploy commit `f90f376`.
- Phase 16A/16B/16C: extracted pure app-issue error classification/text into `src/render/appIssueErrorDisplay.js`; deploy commit `09ef977`.

Final verification:

- final package: `MaintainOps-github-clean-20260520-161159`.
- final package path: `C:\Users\louie\Documents\Codex\2026-05-20\3-maintain-ops-continuation-build\packages`.
- final cache tag: `app.js?v=lfes-phase-16b-app-issue-error-display-1`.
- final hosted resource checks: PASS.
- final live signed-in smoke: PASS.
- final browser console warning/error logs: clean after filtering known benign noise.
- `app.js` line count after Phase 16B: 9,711.

Boundary preserved:

- No readiness mutations, workflow logic, event handlers, mutations, auth/session/company/location startup, Supabase SQL/RLS, storage/photo/document flows, Quick Fix, request conversion, delete actions, delete confirmations, public QR flows, PM generation, forms with mutations, assignment controls, `renderWorkspace()`, or `bindWorkspaceEvents()` were moved.

### Recommended Next Phase

Choose one:

- LFES Phase 16D planning/readiness only after a fresh remaining-candidate audit.
- pause code movement for an AI/code review because remaining candidates are now mostly core queue/detail/form/workflow areas.

## Phase 16D Through 16I Utility Extraction And Safety Stop - 2026-05-21

Completed two controlled medium-risk utility extraction cycles:

- Phase 16D/16E/16F: extracted pure schema error predicate helpers into `src/utils/schemaErrors.js`; deploy commit `f78d84a`.
- Phase 16G/16H/16I: extracted pure setup error response wrapper into `src/utils/operationResults.js`; deploy commit `abb1b80`.

Final verification:

- final package: `MaintainOps-github-clean-20260521-085044`.
- final package path: `C:\Users\louie\Documents\Codex\2026-05-20\3-maintain-ops-continuation-build\packages`.
- final cache tag: `app.js?v=lfes-phase-16h-operation-results-1`.
- final hosted resource checks: PASS.
- final live signed-in smoke: PASS.
- live app showed authenticated shell with Louie, Work, Parts, and Team visible.
- hosted files confirmed `src/utils/operationResults.js` exports `MaintainOpsOperationResults`, live `app.js` imports it, and the old inline `withSetupError` function is absent.
- `app.js` line count after Phase 16H: 9,684.

Boundary preserved:

- No Supabase calls, schema readiness mutations, readiness flags, workflow logic, event handlers, mutations, auth/session/company/location startup, Supabase SQL/RLS, storage/photo/document flows, Quick Fix, request conversion, delete actions, delete confirmations, public QR flows, PM generation, forms with mutations, assignment controls, `renderWorkspace()`, or `bindWorkspaceEvents()` were moved.

### ACTION NEEDED

Pause additional automated phase extraction before continuing. The next apparent helpers (`requiredText`, `workOrderDateValue`, `procedureColumn`, auth URL helpers, public URL/QR helpers, readiness wrappers, and queue/detail helpers) now intersect mutation payloads, auth/public flows, readiness side effects, or workflow state. Continuing safely requires an explicit architecture/review decision for the next module boundary rather than another low-risk display-helper style extraction.

## Phase 17A Through 17C Operation Timeout Boundary - 2026-05-21

Completed one deliberate medium/high-risk infrastructure extraction after architecture review:

- Phase 17A/17B/17C: extracted `withOperationTimeout` into `src/utils/operationTimeout.js`; deploy commit `db77ffd`.

Final verification:

- final package: `MaintainOps-github-clean-20260521-090143`.
- final package path: `C:\Users\louie\Documents\Codex\2026-05-20\3-maintain-ops-continuation-build\packages`.
- final cache tag: `app.js?v=lfes-phase-17b-operation-timeout-1`.
- static checks: PASS for `app.js` and `src/utils/operationTimeout.js`.
- direct timeout helper smoke: PASS for resolved promise and timeout rejection message.
- local resource smoke: PASS.
- hosted resource checks: PASS.
- live signed-in smoke: PASS.
- live app showed authenticated shell with Louie, Work, Parts, and Team visible.
- hosted files confirmed `src/utils/operationTimeout.js` exports `MaintainOpsOperationTimeout`, live `app.js` imports it, and the old inline `withOperationTimeout` function is absent.
- GitHub connector returned no workflow runs for `db77ffd`.
- `app.js` line count after Phase 17B: 9,677.

Boundary preserved:

- No timeout values, call sites, Supabase calls, mutation handlers, auth flows, storage flows, public QR flows, message flows, work-order workflow logic, readiness flags, `renderWorkspace()`, or `bindWorkspaceEvents()` were changed.

### Recommended Next Phase

Pause before another extraction and choose the next explicit boundary. The next viable candidates are form/payload validation helpers (`requiredText`, `workOrderDateValue`, `procedureColumn`) or public URL/QR helpers, both of which require targeted behavior smokes beyond resource loading.

## Documentation Source-of-Truth Cleanup - 2026-05-21

Completed a process/documentation cleanup before high-risk extraction work:

- Restored full LFES standards into the current top-level `docs/LFES` tree.
- Updated current handoff, next steps, Codex LFES handoff, QA log, README, and LFES evidence.
- Removed tracked `MaintainOps-github-clean-*` package snapshots from the publish repo.
- Added `.gitignore` rules to keep future clean packages out of the source repository.
- Added `docs/LFES/context/DOCUMENTATION_DRIFT_REVIEW_2026-05-21.md`.
- Added `docs/LFES/context/PACKAGE_ARTIFACT_POLICY.md`.

Root cause:

- Package/export artifacts were committed into the publish repo, causing historical copies of app code and LFES standards to live beside current source files.
- Rapid phase execution kept `APP_JS_MODULARIZATION_PLAN.md` current, but restart docs and the central QA log lagged behind.

Verification/process correction:

- Current restart docs now point at Phase 17C.
- LFES standards are available from the current README entry points.
- Package artifacts are preserved outside the repo in the project package folder.
- Future verification language must distinguish hosted resource checks from GitHub Actions runs.

### Recommended Next Phase

Continue to pause code movement until the next explicit boundary is chosen and its targeted smoke is defined.

## Phase 17C Public URL/QR Utility Boundary - 2026-05-21

Completed one targeted utility extraction after candidate smokes:

- Rejected form/payload validation as the next boundary because the invalid-date Quick Fix UI smoke did not block cleanly.
- Extracted public URL/QR helper logic into `src/utils/publicUrlQr.js`; deploy commit `b67f252`.
- Added `src/utils/publicUrlQr.js?v=lfes-phase-17c-public-url-qr-1` before `app.js`.
- Updated `app.js` cache tag to `app.js?v=lfes-phase-17c-public-url-qr-1`.
- Updated `tests/smoke/resource-load.spec.js` so hosted resource smoke covers the new utility.

Moved functions:

- `publicRequestUrl`
- `publicRequestQrUrl`
- `publicAppUrlWithSearch`
- `publicAppBaseUrl`
- `normalizePublicAppUrl`
- `isPublicAppHost`
- `qrSvgFor`

Final verification:

- static checks: PASS for `app.js`, `src/utils/publicUrlQr.js`, and `tests/smoke/resource-load.spec.js`.
- targeted helper smoke: PASS for request/QR URL generation, HTTPS normalization, localhost/private host rejection, QR SVG generation, and QR fallback output.
- local resource smoke against `http://127.0.0.1:4187/`: PASS.
- hosted resource smoke after GitHub Pages propagation: PASS.
- live signed-in Settings/QR smoke: PASS on `https://loufish727.github.io/MaintainOps/?qa_bust=live-public-url-qr-17c-b67f252`.
- live Settings showed 5 active location QR links, GitHub Pages public URL, QR/Test Form links, and QR SVGs.
- fresh live console sample after smoke: PASS, no current error logs.
- `app.js` line count after extraction: 9,627.

Boundary preserved:

- No public QR submit flow, QR admin mutation action, request creation/conversion, workflow logic, event handler, auth/session/company/location startup, Supabase SQL/RLS, storage/photo/document flow, Quick Fix flow, form payload validation, `renderWorkspace()`, or `bindWorkspaceEvents()` was moved.

Carried-forward stop:

- Form/payload validation helpers (`requiredText`, `workOrderDateValue`, `procedureColumn`) remain blocked until the Quick Fix/date validation UI path has a narrower contract and passing targeted smoke.

### Recommended Next Phase

Pause before the next extraction. Choose a new explicit boundary only after a targeted behavior smoke proves it, and keep form/payload validation blocked until the invalid-date behavior is understood.

## Phase 17D Maintenance Schedule Date Helper - 2026-05-21

Completed one tiny utility extraction adjacent to PM logic:

- Extracted only `nextDueDate` into `src/utils/maintenanceScheduleDates.js`; deploy commit `1c37db8`.
- Added `src/utils/maintenanceScheduleDates.js?v=lfes-phase-17d-maintenance-date-1` before `app.js`.
- Updated `app.js` cache tag to `app.js?v=lfes-phase-17d-maintenance-date-1`.
- Updated `tests/smoke/resource-load.spec.js` so hosted resource smoke covers the new utility.

Moved function:

- `nextDueDate`

Final verification:

- static checks: PASS for `app.js`, `src/utils/maintenanceScheduleDates.js`, and `tests/smoke/resource-load.spec.js`.
- targeted helper smoke: PASS for weekly, monthly, quarterly, and unknown-frequency behavior.
- local resource smoke against `http://127.0.0.1:4187/`: PASS.
- local browser boot smoke: PASS with `maintenanceScheduleDates.js` and the Phase 17D app cache tag present.
- hosted resource smoke after GitHub Pages propagation: PASS.
- live signed-in PM passive smoke: PASS on `https://loufish727.github.io/MaintainOps/?qa_bust=live-maintenance-date-17d-1c37db8`.
- live PM surface opened and showed Preventive Maintenance without generating PM work or clicking mutation controls.
- fresh live console sample after smoke: PASS, no current error logs.
- `app.js` line count after extraction: 9,620.

Boundary preserved:

- No PM generation, schedule mutation, schedule creation/update/delete, Supabase call, workflow logic, event handler, render function, form payload validation, auth/session/company/location logic, Supabase SQL/RLS, `renderWorkspace()`, or `bindWorkspaceEvents()` was moved.

Carried-forward stop:

- Form/payload validation helpers (`requiredText`, `workOrderDateValue`, `procedureColumn`) remain blocked until the Quick Fix/date validation UI path has a narrower contract and passing targeted smoke.

### Recommended Next Phase

Pause before the next extraction. Remaining candidates should be re-audited because most now sit near auth, location state, PM mutations, forms, delete zones, assignment, or workflow/event contracts.

## Hard Boundary - Work-Order Query Filters - 2026-05-21

Completed the first deliberate hard-boundary extraction in this continuation run:

- Selected boundary: work-order filter/sort query orchestration.
- Extracted into `src/utils/workOrderQueryFilters.js`; deploy commit `d90976d`.
- Added `src/utils/workOrderQueryFilters.js?v=lfes-hard-boundary-work-order-query-1` before `app.js`.
- Updated `app.js` cache tag to `app.js?v=lfes-hard-boundary-work-order-query-1`.
- Updated `tests/smoke/resource-load.spec.js` so hosted resource smoke covers the new utility.

Why it is hard:

- These helpers are not display helpers. They compose Supabase read queries for My Work, Work Orders, dashboard counts, status filters, queue filters, global search, and sort order.
- The original inline functions depended on hidden app globals including company/location state, active section, filters, search text, related search IDs, session user, and date helpers.

Why it is recoverable:

- The boundary is read-only query composition.
- No event handlers, mutations, Quick Fix, request conversion, auth/session/company/location startup, public QR submit, storage/photo/document flow, Supabase SQL/RLS, `renderWorkspace()`, or `bindWorkspaceEvents()` moved.
- Rollback is direct: revert `d90976d`, or remove the script/module, restore the five inline helpers, and restore the previous app cache tag.

Moved functions:

- `applyWorkOrderListFilters`
- `applyWorkOrderFilters`
- `applyWorkOrderQueueFilters`
- `applyWorkOrderStatusFilter`
- `applyWorkOrderSort`

Final verification:

- static checks: PASS for `app.js`, `src/utils/workOrderQueryFilters.js`, and `tests/smoke/resource-load.spec.js`.
- targeted fake-query chain smoke: PASS for My Work queue, unassigned queue, completed-month status/sort, global search, and request pseudo-status.
- local resource smoke against `http://127.0.0.1:4187/`: PASS.
- local browser boot smoke: PASS with `workOrderQueryFilters.js` and the hard-boundary cache tag present.
- hosted resource smoke after GitHub Pages propagation: PASS.
- live signed-in Work Orders/My Work smoke: PASS on `https://loufish727.github.io/MaintainOps/?qa_bust=live-work-query-hard-boundary-d90976d`.
- live My Work showed Assigned To Me / Created By Me and dashboard counts.
- live Work Orders showed status/filter/sort surface and `Hydralic Leak`.
- live Overdue metric click reloaded to `Overdue - All Work Orders` and kept `Hydralic Leak` visible.
- fresh live console sample after smoke: PASS, no current error logs.
- `app.js` line count after extraction: 9,550.

LFES catch:

- Responsive duplicate controls made generic locator-based search smoke ambiguous. Use visible DOM targeting for non-mutating filter/sort smoke on dense responsive surfaces.
- For hard-but-contained extractions, explicit dependency getter injection is better than silently preserving global reads in the module.

### Recommended Next Phase

Pause before selecting another hard boundary. Good next candidates must have an explicit rollback path and live visible smoke coverage. Keep Quick Fix, request conversion, auth/session/company/location startup, Supabase SQL/RLS, storage/photo/document flows, broad `renderWorkspace`, and broad `bindWorkspaceEvents` blocked.

## Hard Boundary - Work-Order Detail Field-Jump Event Binding - 2026-05-21

Completed a small event-binding extraction from `bindWorkspaceEvents()`:

- Selected boundary: `[data-jump-work-section]` field-jump listener.
- Extracted into `src/utils/workSectionJumpEvents.js`; deploy commit `5a99590`.
- Added `src/utils/workSectionJumpEvents.js?v=lfes-hard-boundary-work-jump-1` before `app.js`.
- Updated `app.js` cache tag to `app.js?v=lfes-hard-boundary-work-jump-1`.
- Updated `tests/smoke/resource-load.spec.js` so hosted resource smoke covers the new utility.
- Resolved the prior visible-DOM/dependency-injection LFES catch in `docs/DEBUG_PROCESS.md` and `docs/LFES/CORE_STANDARD.md`.

Why it is hard:

- This moved an actual event-binding contract out of `bindWorkspaceEvents()`.
- It depends on stable `data-jump-work-section` attributes and matching Work Order Detail target IDs.

Why it is recoverable:

- The behavior is non-mutating and visual only: open a details section, scroll the target, add temporary highlight classes, and remove them after timeout.
- No Supabase calls, mutations, workflow state, Quick Fix, request conversion, delete flow, auth/session/company/location startup, storage/photo/document flow, SQL/RLS, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` moved.
- Rollback is direct: revert `5a99590`, or remove the script/module, restore the listener block in `bindWorkspaceEvents()`, and restore the previous app cache tag.

Moved event contract:

- `[data-jump-work-section]` click listener.

Final verification:

- static checks: PASS for `app.js`, `src/utils/workSectionJumpEvents.js`, and `tests/smoke/resource-load.spec.js`.
- targeted mock-DOM event smoke: PASS for details opening, scroll call, highlight classes, and delayed removal.
- local resource smoke against `http://127.0.0.1:4187/`: PASS.
- local browser boot smoke: PASS with `workSectionJumpEvents.js` and the hard-boundary cache tag present.
- hosted resource smoke after GitHub Pages propagation: PASS.
- live signed-in Work Order Detail jump smoke: PASS on `https://loufish727.github.io/MaintainOps/?qa_bust=live-work-jump-event-5a99590`.
- live `Hydralic Leak` detail opened.
- live `Go To Completion` opened the completion details, applied `jump-highlight` and `field-jump-highlight`, and removed both after timeout.
- fresh live console sample after smoke: PASS, no current error logs.
- `app.js` line count after extraction: 9,539.

LFES catch:

- The live smoke again encountered duplicate `Hydralic Leak` text. The newly documented visible-DOM targeting rule was used successfully.

### Recommended Next Phase

Pause before selecting another hard boundary. Small event-binding extraction can continue only when the event contract is isolated, non-mutating or safely smokeable, and has a direct rollback path.

## Hard Boundary - Global Search Navigation Events - 2026-05-21

Completed another contained event-binding extraction from `bindWorkspaceEvents()`:

- Selected boundary: global search result navigation click handlers.
- Extracted into `src/utils/globalSearchNavigationEvents.js`; deploy commit `fb77f1c`.
- Added `src/utils/globalSearchNavigationEvents.js?v=lfes-hard-boundary-global-search-nav-1` before `app.js`.
- Updated `app.js` cache tag to `app.js?v=lfes-hard-boundary-global-search-nav-1`.
- Updated `tests/smoke/resource-load.spec.js` so hosted resource smoke covers the new utility.

Why it is hard:

- This moved stateful navigation event contracts out of `bindWorkspaceEvents()`.
- The original inline handlers updated active IDs, active section, persisted search, work-search mode, and then re-rendered.

Why it is recoverable:

- The boundary is non-mutating UI navigation.
- No Supabase calls, mutations, Quick Fix, request conversion, delete flow, auth/session/company/location startup, public QR submit, storage/photo/document flow, SQL/RLS, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` moved.
- Rollback is direct: revert `fb77f1c`, or remove the script/module, restore the five listener blocks in `bindWorkspaceEvents()`, and restore the previous app cache tag.

Moved event contracts:

- `[data-search-work-order]`
- `[data-search-asset]`
- `[data-search-part]`
- `[data-search-request]`
- `[data-search-section]`

Final verification:

- static checks: PASS for `app.js`, `src/utils/globalSearchNavigationEvents.js`, and `tests/smoke/resource-load.spec.js`.
- targeted mock-DOM event smoke: PASS for all five moved search result routes.
- local resource smoke against `http://127.0.0.1:4187/`: PASS.
- local browser boot smoke: PASS with `globalSearchNavigationEvents.js` and the hard-boundary cache tag present.
- hosted resource smoke after GitHub Pages propagation: PASS.
- live signed-in global search navigation smoke: PASS on `https://loufish727.github.io/MaintainOps/?qa_bust=live-global-search-nav-behavior-fb77f1c-final`.
- live search for `Hydralic` returned a visible `Hydralic Leak` work-order result.
- clicking the visible result opened Work Order Detail, persisted active section as `work`, and cleared persisted search plus the visible search input.
- fresh live console sample had only the existing missing-resource 404 pattern; no app runtime error or page error was observed.
- `app.js` line count after extraction: 9,488.

LFES catch:

- The smoke initially hit the known responsive-duplicate issue because a generic selector resolved hidden controls first. The documented visible-DOM inspection rule handled it.
- Copied Chrome profile auth was stale, while copied Edge profile auth was valid. Treat copied-profile smoke auth as environment-dependent; the product signal is the signed-in app behavior once a valid session is available.

### Recommended Next Phase

Pause before selecting another hard boundary. Next candidates should remain non-mutating or have stronger targeted smoke coverage before implementation.

## Measurable Reduction - Read-Only Query/Search/List Helpers - 2026-05-21

Completed a controlled app.js reduction run with a 300-500 line target:

- Starting `app.js` line count: 9,488.
- Ending `app.js` line count: 9,122.
- Net reduction: 366 lines.
- Deploy commit: `2be8b54` (`Extract read-only query and list helpers`).
- Added `src/utils/requestQueryFilters.js?v=lfes-reduction-read-only-query-list-1`.
- Added `src/utils/workOrderSearch.js?v=lfes-reduction-read-only-query-list-1`.
- Added `src/utils/workspaceListBuilders.js?v=lfes-reduction-read-only-query-list-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-reduction-read-only-query-list-1`.
- Updated hosted resource smoke coverage.

Moved helpers:

- request query filtering: `applyRequestQueryFilters`.
- work-order related and exact search orchestration: `refreshWorkOrderRelatedSearch`, related ID readers, exact search page/row helpers.
- read-only list builders: `globalSearchResults`, `planningItems`, `planningPmItems`, `followUpItems`.

Risk classification:

- Medium, bounded read-only extraction.
- The moved code reads data, composes read queries, derives list/search results, and writes only explicit local cache/page/search-result state through injected setters.
- No mutation, event binding, form submit, delete action, delete confirmation, Quick Fix, request conversion, public QR submit, auth/session/company/location startup, storage/photo/document flow, SQL/RLS, `renderWorkspace()`, or `bindWorkspaceEvents()` movement occurred.

Final verification:

- static checks: PASS for `app.js`, all three new modules, and `tests/smoke/resource-load.spec.js`.
- helper-output smoke: PASS for request query filtering, related/exact work-order search orchestration, global search, planning, PM planning, and follow-up builders.
- local resource smoke: PASS.
- local browser boot smoke: PASS after fixing lazy dependency injection for `parentAssetFor`.
- hosted GitHub Pages resource smoke: PASS.
- live signed-in search smoke: PASS. `Hydralic` global search and exact work-order search showed `Hydralic Leak`.
- live signed-in Planning smoke: PASS. Planning groups rendered without search overlay.
- live signed-in Requests smoke: PASS. Request surface and filters rendered without search overlay.
- GitHub Actions resource smoke: NOT AVAILABLE; GitHub connector returned no workflow runs for `2be8b54`.

Rejected as unsafe:

- Work-order detail/create/quick-fix/card rendering, asset/detail/procedure/part/request display, message center, public QR link cards, and all event/mutation/delete/upload/auth/RLS zones.

Behavior changed:

- No observed behavior change.

LFES catch:

- `parentAssetFor` looked function-like but is initialized from a display helper later in app startup. Hard-boundary modules must use lazy getter injection for later-initialized dependencies.

### Recommended Next Phase

Pause and re-audit before another measurable reduction. Do not force another 300-line target if the next candidates require forms, mutations, event contracts, delete/QR/storage/auth flows, or broad render/event movement.

## Medium-Risk Authority Boundary - Workspace Search Events - 2026-05-21

Completed the first implementation phase after the render/event authority map:

- Selected boundary: workspace search and exact work-search read-only event cluster.
- Extracted into `src/utils/workspaceSearchEvents.js`; deploy commit `61f6387`.
- Added `src/utils/workspaceSearchEvents.js?v=lfes-authority-workspace-search-events-1` before `app.js`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-workspace-search-events-1`.
- Updated hosted resource smoke coverage.

Why it is medium risk:

- The moved code changes local UI state, page state, exact-search cache state, and read queue reload sequencing.
- It also restores focus/cursor after render-driven DOM replacement.

Why it is recoverable:

- It is read-only and non-mutating.
- No form submit, delete, upload, auth/session/company/location startup, public QR submit, Quick Fix, request conversion, storage/photo/document flow, SQL/RLS, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` movement occurred.
- Rollback is direct: revert `61f6387`, or remove the module/script, restore the three listener blocks, and restore the prior cache tag.

Moved event contracts:

- `.workspace-search-input`
- `[data-view-work-search]`
- `[data-close-work-search]`

Final verification:

- static checks: PASS for `app.js`, `src/utils/workspaceSearchEvents.js`, and `tests/smoke/resource-load.spec.js`.
- targeted mock-DOM event smoke: PASS for search state, cache invalidation, read reload calls, page resets, exact search open/close, storage writes, and focus restoration.
- local resource smoke: PASS.
- local browser boot smoke: PASS.
- hosted GitHub Pages resource smoke: PASS.
- live signed-in smoke: PASS on `https://loufish727.github.io/MaintainOps/?qa_bust=live-workspace-search-events-61f6387`.
- live `Hydralic` search preview, exact work-search mode, and back-to-preview path all worked.
- GitHub Actions resource smoke: NOT AVAILABLE; GitHub connector returned no workflow runs for `61f6387`.

Behavior changed:

- No observed behavior change.

Authority reduced:

- Workspace search and exact work-search event ownership moved out of the monolithic `bindWorkspaceEvents()` function into a named, dependency-injected module.

### Recommended Next Phase

Choose one next authority-map boundary. Good next candidates are local read-only navigation/card openers or pagination/filter events. Keep command routing, message sending, form submissions, mutations, deletes, uploads, auth/startup, storage/photo/document flows, Quick Fix, and request conversion blocked until individually planned.

## Hard-Boundary Authority Reduction - Workspace Filter/Pagination Events - 2026-05-21

The safe render-helper reduction boundary has been reached. The active strategy is now controlled authority reduction, not aggressive line count reduction.

First `bindWorkspaceEvents()` decomposition pass:

- Mapped 121 selector bindings inside the 934-line `bindWorkspaceEvents()` authority block.
- Selected the largest recoverable medium-risk group with direct smoke coverage: workspace filter/pagination events.
- Extracted into `src/utils/workspaceFilterPaginationEvents.js`.
- App deploy commit: `ceb8ba6`.
- `app.js` line count after extraction: 9,046.

Moved event authority:

- Work/request status filters.
- My Work filter.
- Work-order filter and assignee-filter clearing.
- Work-order sort.
- Request queue filter.
- Work, parts, assets, and generic list pagination.

Boundary design:

- The module owns only event binding and local event orchestration.
- `app.js` remains the state owner through injected getters/setters.
- Business-data mutations remain blocked.
- No selector contracts changed.
- No form submissions, deletes, uploads, auth/session/company/location startup, public QR submit, Quick Fix, request conversion, storage/photo/document flows, SQL/RLS, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` movement occurred.

Required smoke pattern for future event extractions:

1. Map selectors and state touched.
2. Classify the group as safe-to-medium, medium-risk, high-risk, or do-not-touch.
3. Define rollback path before edits.
4. Add a targeted mock-DOM smoke covering each moved selector and each state/storage/reload/render side effect.
5. Run syntax checks and local resource smoke.
6. Deploy only after local verification passes.
7. Run hosted resource smoke.
8. Run signed-in live behavior smoke with the dedicated QA/test account.
9. Document behavior and LFES catches without committing credentials.

Next best candidates:

- Detail/open navigation group if a visible smoke can confirm card/detail open and back behavior.
- Part inventory and asset status filters if kept read-only.
- Team member work-view bridge if planned as a medium-risk UI-state boundary.

Blocked until separate planning:

- command routing,
- message center send/reply,
- work-order mutation/status/assignment/delete/downtime flows,
- request conversion, Quick Fix, request delete,
- part inventory mutations and document/source flows,
- asset/PM/procedure/team/settings forms,
- auth/session/company/location startup,
- public QR submit/admin,
- storage/photo/document/logo flows,
- SQL/RLS,
- broad render/event extraction.

## Hard-Boundary Authority Reduction - Workspace Detail Navigation Events - 2026-05-21

Second `bindWorkspaceEvents()` decomposition pass:

- Selected a medium-risk UI navigation group with visible smoke coverage.
- Extracted into `src/utils/workspaceDetailNavigationEvents.js`.
- App deploy commit: `ef69559`.
- `app.js` line count after extraction: 8,986.

Moved event authority:

- Back from work detail.
- Back from equipment detail.
- Work-card open.
- Asset-card open.
- Inline asset open.
- Keyboard/click asset open from `[data-asset-id]`.
- Mini work-order open.

Boundary design:

- The module owns event binding and UI navigation orchestration only.
- `app.js` remains the state owner through injected getters/setters.
- The boundary intentionally leaves Quick Fix creation, quick status mutation, delete flows, and global-search navigation outside this module.
- No selector contracts changed.
- No business-data mutations, form submissions, deletes, uploads, auth/session/company/location startup, public QR submit, request conversion, storage/photo/document flows, SQL/RLS, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` movement occurred.

Verification:

- Targeted mock-DOM smoke covered all moved selectors, keyboard behavior, stop propagation, storage writes, and render calls.
- Local resource and boot smokes passed.
- Hosted resource smoke passed.
- Signed-in live smoke opened and backed out of a real Work Order detail and a real Equipment detail with no relevant page errors.
- GitHub Actions verification gap was later traced to the wrong lookup method. Direct Actions API verification confirmed `Resource Load Smoke` passed for `ef69559`.

LFES catch:

- Work-order detail open state is not persisted to localStorage; live behavior evidence should use visible DOM/back-button state for this path.
- Use `npm run test:smoke:github-actions` for future push-run Actions verification; do not rely on the PR-oriented connector workflow lookup for normal push runs.

Next best candidates:

- Workspace UI state factory as the first explicit state-boundary phase, if the next goal is authority reduction rather than more surface extraction. See `docs/LFES/audits/STATE_BOUNDARY_PLAN_2026-05-21.md`. The part inventory and asset status filter events are now extracted in `2b4ad8e`, so the planned factory no longer needs to own those states while their handlers remain in `app.js`.
- Team member work-view bridge as a medium-risk UI-state boundary.
- Message read-only navigation only after mapping thread/read-state effects; send/reply forms stay blocked.

## High-Risk Work-Order Status Event Boundary - 2026-05-26

Selected boundary:

- `bindWorkspaceEvents()` quick status button binding only:
  - `[data-quick-status]`

Why this is hard:

- The button binding triggers a real work-order status mutation through injected `setWorkOrderStatus`.
- `setWorkOrderStatus` remains in `app.js` and still owns workflow guards, Supabase update sequencing, work-order event recording, notices, active work-order state, and render.

Why this is recoverable:

- The extraction moved only event binding, not mutation logic or selectors.
- Assignment, delete, downtime, completion, and detail status dropdown flows were left untouched.
- Rollback is one app commit or a small manual restoration of the original listener block.

Implementation:

- Added `src/utils/workspaceWorkOrderStatusEvents.js`.
- Updated `index.html` with `src/utils/workspaceWorkOrderStatusEvents.js?v=lfes-authority-work-status-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-work-status-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- App deploy commit: `5828262` (`Extract workspace work order status events`).
- `app.js` line count moved from 8,985 to 8,965.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceWorkOrderStatusEvents.js`, and `tests/smoke/resource-load.spec.js`.
- Mock-DOM event smoke: PASS for success, false return, thrown error, stopPropagation, disabled/Saving state, restoration, and warning notice.
- Local resource smoke: PASS.
- Local boot smoke: PASS.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: PASS for `5828262`, run `https://github.com/loufish727/MaintainOps/actions/runs/26454460812`.
- Signed-in live mutation/restore smoke: PASS. The QA account changed `Hydralic Leak` from `in_progress` to `open`, observed Work Order Detail status `open`, restored it to `in_progress`, and observed Work Order Detail status `in_progress`.

LFES catch:

- The initial live smoke failed because it expected the list card to stay visible after a successful quick-status mutation. The app intentionally sets `activeWorkOrderId` and renders Work Order Detail after status changes. Future quick-status smokes must assert the detail status and restore from detail.

Next candidates:

- Continue work-order hard-boundary decomposition only one subcluster at a time.
- Good candidates to map next: assignment group or downtime-copy group.
- Keep delete, completion, Quick Fix, request conversion, storage/photo/document, auth/session/company/location startup, Supabase SQL/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` blocked until separately planned.

## High-Risk Work-Order Assignment Event Boundary - 2026-05-26

Selected boundary:

- `bindWorkspaceEvents()` work-order assignment event wiring:
  - `[data-assign-me]`
  - `[data-card-assign]`

Why this is hard:

- The event wiring triggers real work-order assignment mutations.
- `assignWorkOrderToMe` and `assignWorkOrderFromCard` remain in `app.js` and still own permissions, Supabase update sequencing, description note handling, work-order event recording, notices, state, and render.

Why this is recoverable:

- The extraction moved only event binding, not mutation logic or selectors.
- Status, delete, downtime, completion, and detail update flows were left untouched.
- Rollback is one app commit or a small manual restoration of the original listener blocks.

Implementation:

- Added `src/utils/workspaceWorkOrderAssignmentEvents.js`.
- Updated `index.html` with `src/utils/workspaceWorkOrderAssignmentEvents.js?v=lfes-authority-work-assignment-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-work-assignment-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- App deploy commit: `892f4c2` (`Extract workspace work order assignment events`).
- `app.js` line count moved from 8,965 to 8,955.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceWorkOrderAssignmentEvents.js`, and `tests/smoke/resource-load.spec.js`.
- Mock-DOM event smoke: PASS for assign-to-me click, card assignment submit, click stopPropagation, assigned_to change auto-submit, and unrelated change ignored.
- Local resource smoke: PASS.
- Local boot smoke: PASS.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: PASS for `892f4c2`, run `https://github.com/loufish727/MaintainOps/actions/runs/26455282763`.
- Dedicated QA/test account smoke: PASS for hidden assignment controls.
- Manager/admin signed-in assignment/restore smoke: PASS. `Hydralic Leak` changed from Lee Gaede to Louie Fisher through `Assign To Me`, then restored to Lee Gaede through the card assignment control.

LFES catch:

- Assignment verification is role-sensitive. A technician-style QA account can prove controls are hidden, but manager/admin live smoke is required for assignment mutation and restore behavior.

Next candidates:

- Downtime-copy event group is the next lower-risk work-order hard boundary because it is visible and non-mutating.
- Delete and completion flows remain higher-risk and should not be combined with another group.

## Work-Order Downtime Copy Event Boundary - 2026-05-26

Selected boundary:

- `bindWorkspaceEvents()` downtime email copy buttons:
  - `[data-copy-downtime]`

Why this is hard:

- The binding touches browser clipboard behavior and temporary button feedback, which can behave differently in automation and live browsers.

Why this is recoverable:

- It is non-mutating.
- The extraction moved only event binding, not downtime text builders or clipboard implementation.
- Status, assignment, delete, completion, and Supabase/RLS flows were left untouched.

Implementation:

- Added `src/utils/workspaceWorkOrderDowntimeEvents.js`.
- Updated `index.html` with `src/utils/workspaceWorkOrderDowntimeEvents.js?v=lfes-authority-work-downtime-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-work-downtime-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- Added the role-gated smoke rule to `docs/DEBUG_PROCESS.md`.
- App deploy commit: `9eac566` (`Extract workspace work order downtime events`).
- `app.js` line count moved from 8,955 to 8,948.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceWorkOrderDowntimeEvents.js`, and `tests/smoke/resource-load.spec.js`.
- Mock-DOM event smoke: PASS for subject copy, body copy failure state, reset labels, and missing-work-order no-op.
- Local resource smoke: PASS.
- Local boot smoke: PASS.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions public run verification: PASS for `9eac566`, run `https://github.com/loufish727/MaintainOps/actions/runs/26455942889`. The local verifier hit GitHub API rate limiting while the run was pending.
- Signed-in live downtime copy smoke: PASS. `Copy Subject` and `Copy Email Body` changed to a result state and reset to their original labels with clean logs.

LFES catch:

- Fixed sleeps are brittle around clipboard fallback timing. Copy-button smokes should wait for the final label condition instead of assuming the nominal reset timeout is exact.

Next candidates:

- Detail status dropdown is a contained mutation-adjacent boundary if treated separately from quick status.
- Delete and completion remain higher-risk and should not be combined with another group.

## Work-Order Detail Status Dropdown Event Boundary - 2026-05-26

Selected boundary:

- `bindWorkspaceEvents()` Work Order Detail status dropdown:
  - `#status-select`

Why this is hard:

- The dropdown triggers the real status mutation path through `updateWorkOrderStatus` and `setWorkOrderStatus`.

Why this is recoverable:

- The extraction moved only a one-control event binding.
- The mutation logic, guards, Supabase update, event recording, render behavior, quick status buttons, delete, assignment, and completion flows stayed in `app.js`.
- Rollback is one app commit or restoration of the original two-line listener block.

Implementation:

- Added `src/utils/workspaceWorkOrderDetailStatusEvents.js`.
- Updated `index.html` with `src/utils/workspaceWorkOrderDetailStatusEvents.js?v=lfes-authority-work-detail-status-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-work-detail-status-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- App deploy commit: `d0bf9dd` (`Extract workspace work order detail status events`).
- `app.js` line count stayed at 8,948 because the original listener was already very thin.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceWorkOrderDetailStatusEvents.js`, and `tests/smoke/resource-load.spec.js`.
- Mock-DOM event smoke: PASS for `#status-select` change binding and missing-select no-op.
- Local resource smoke: PASS.
- Local boot smoke: PASS.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions public run-list verification: PASS for Resource Load Smoke #130 on `d0bf9dd`; local verifier was blocked by GitHub API rate limiting.
- Signed-in live detail status smoke: PASS. `Hydralic Leak` changed from `in_progress` to `open`, then restored to `in_progress`, with clean logs.

Next candidates:

- Completion is now extracted and live verified. Delete remains the next higher-risk work-order event zone.
- Do not combine delete with another workflow. Map the full delete path, smoke it only with a disposable record and cleanup proof, and stop if mutation sequencing or cleanup is unclear.

## High-Risk Work-Order Completion Boundary - 2026-05-26

Selected boundary:

- Work Order Detail completion submit handling and safety checkbox sync:
  - `#complete-work-order-form`
  - `input[name="safety_devices_checked"]`

Why this is hard:

- This is the first extracted work-order handler in this run that owns the completion payload and calls an injected Supabase mutation callback.
- The path also records activity, gates required checklist completion, gates equipment safety checks, updates button/error UI, clears work-order action warnings, shows notices, and triggers render.

Why this is recoverable:

- Supabase access, auth/company/location state, work-order arrays, safety payload helpers, event logging, and render stayed in `app.js` and are injected.
- `syncSafetyDeviceChecks` moved with the completion module, but `currentSafetyCheckboxCheckedForWorkOrder` intentionally remains in `app.js` because quick-update/status paths still use the shared helper.
- Delete, Quick Fix creation, request conversion, storage/photo/document flows, SQL/RLS, auth/session/company/location startup, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` were left untouched.
- Rollback is one app commit or restoration of the original completion form and safety checkbox listener blocks plus the original `completeWorkOrder` / `syncSafetyDeviceChecks` functions.

Implementation:

- Added `src/utils/workspaceWorkOrderCompletionEvents.js`.
- Updated `index.html` with `src/utils/workspaceWorkOrderCompletionEvents.js?v=lfes-authority-work-completion-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-work-completion-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- App deploy commit: `d9a1922` (`Extract workspace work order completion events`).
- `app.js` line count moved from 8,948 to 8,893.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceWorkOrderCompletionEvents.js`, and `tests/smoke/resource-load.spec.js`.
- Targeted mock-DOM completion smoke: PASS for success payload/update/log/render/button restore, checklist gate, safety-device gate, update-error path, log-warning path, submit binding, and safety checkbox sync.
- Local resource smoke: PASS against `http://127.0.0.1:4181/`.
- Local browser boot smoke: PASS. Login screen loaded with the completion script and cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- Public GitHub Actions run-list verification: PASS for Resource Load Smoke #132 on `d9a1922`; Pages build/deployment #180 also completed successfully. The local verifier was blocked by GitHub API rate limiting.
- Signed-in manager/admin live completion smoke: PASS. Created disposable Quick Fix work order `QA LFES completion smoke 2026-05-26T15-16-53-084Z`, completed it through the extracted completion path, observed Detail status `Completed`, completed timestamp/minutes, notes, and resolution, then permanently deleted the disposable record through the app UI.

LFES catches:

- Completion smoke must respect the native `actual_minutes` field step. A value like `3` is invalid for `step="5"` and the browser blocks submission before the handler runs; use `5`, `10`, etc.
- In-app browser high-level locator clicks can hang on lower-page operational buttons. For authorized disposable smoke cleanup, record the button rect/DOM evidence, scroll into view, then use coordinate click if the locator click stalls.

Next candidates:

- Delete is now extracted and live verified. Select the next hard boundary from the authority map, and do not combine request conversion, Quick Fix, storage/photo/document flows, broad forms, or broad render/event movement with another change.

## High-Risk Work-Order Delete Boundary - 2026-05-26

Selected boundary:

- Work Order Detail delete request/cancel/confirm orchestration:
  - `[data-delete-work-order]`
  - `[data-cancel-delete-work-order]`
  - `[data-confirm-delete-work-order]`

Why this is hard:

- The flow permanently deletes a real work order.
- It performs best-effort photo storage cleanup before deleting the row.
- Deleting `work_orders` cascades database child rows for comments, photo records, parts used, and events through schema foreign keys.

Why this is recoverable:

- The extraction moved delete orchestration and event binding, but direct Supabase row delete, storage cleanup, permission checks, notices, state setters, render, and timeout wrapper stayed injected from `app.js`.
- The live smoke used a disposable work order and verified deletion through both the UI and authenticated data-layer lookup.
- Rollback is one app commit or restoration of the original listener blocks plus `requestDeleteWorkOrder` and `deleteWorkOrder` in `app.js`.

Implementation:

- Added `src/utils/workspaceWorkOrderDeleteEvents.js`.
- Updated `index.html` with `src/utils/workspaceWorkOrderDeleteEvents.js?v=lfes-authority-work-delete-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-work-delete-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- App deploy commit: `171037e` (`Extract workspace work order delete events`).
- `app.js` line count moved from 8,893 to 8,841.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceWorkOrderDeleteEvents.js`, and `tests/smoke/resource-load.spec.js`.
- Targeted mock-DOM delete smoke: PASS for request, cancel, confirm, denied permission, storage-warning continuation, delete-error path, thrown-error path, state clearing, notice, and render.
- Local resource smoke: PASS against `http://127.0.0.1:4182/`.
- Local browser boot smoke: PASS. Login screen loaded with the delete script and cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: PASS for `171037e`, run `https://github.com/loufish727/MaintainOps/actions/runs/26458080821`.
- Signed-in manager/admin live delete smoke: PASS. Created disposable work order `QA LFES delete smoke 2026-05-26T15-33-07-546Z`, opened Work Order Detail, opened permanent-delete warning, canceled once, reopened the warning, permanently deleted it through the app UI, verified it disappeared from Work Orders, and verified authenticated REST lookup returned no row.

LFES catch:

- The in-app browser text-entry path can fail when its virtual clipboard is unavailable. For delete-only live smoke, creating the disposable setup record through authenticated Supabase REST is acceptable, but the changed delete behavior must still be verified through the app UI.

Next candidates:

- Select the next hard boundary from the authority map.
- Do not combine request conversion, Quick Fix, storage/photo/document, broad forms, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` with another extraction.

## Medium-Risk Team Work-View Boundary - 2026-05-26

Selected boundary:

- Team member work-view bridge:
  - `[data-view-member-work]`

Why this is hard:

- The event crosses from Team into Work Orders and changes multiple UI state variables.
- It applies an assignee filter, resets the work-order page, persists active section/filter state, clears active detail/form modes, and renders.

Why this is recoverable:

- The extraction moved only event binding and state orchestration.
- No business records are mutated.
- No forms, deletes, uploads, auth/session/company/location startup, SQL/RLS, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` moved.
- Rollback is one app commit or restoration of the original `[data-view-member-work]` listener block.

Implementation:

- Added `src/utils/workspaceTeamWorkViewEvents.js`.
- Updated `index.html` with `src/utils/workspaceTeamWorkViewEvents.js?v=lfes-authority-team-work-view-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-team-work-view-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- App deploy commit: `0d67122` (`Extract workspace team work-view events`).
- `app.js` line count stayed at 8,841 because the injected adapter roughly replaced the inline block.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceTeamWorkViewEvents.js`, and `tests/smoke/resource-load.spec.js`.
- Targeted mock-DOM Team work-view smoke: PASS for state setters, localStorage persistence, work-page reset, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4183/`.
- Local browser boot smoke: PASS. Login screen loaded with the Team work-view script and cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: PASS for `0d67122`, run `https://github.com/loufish727/MaintainOps/actions/runs/26458707591`.
- Signed-in live Team work-view smoke: PASS. Team opened, Lee Gaede `View Work` was clicked, Work Orders rendered `Lee Gaede Work`, `Assigned to Lee Gaede`, and `Hydralic Leak`.

Next candidates:

- Select the next hard boundary from the authority map.
- Message read-only navigation can be considered only after mapping read-state effects; send/reply forms stay blocked.
- Do not combine request conversion, Quick Fix, storage/photo/document, broad forms, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` with another extraction.

## Parts Detail UI Event Boundary - 2026-05-26

Hard boundary selected:

- Parts detail open/close and source-manager toggle binding inside `bindWorkspaceEvents()`.

Why this is hard:

- The event changes UI authority inside the inventory/detail screen by setting active part detail state and source-manager visibility, and the same screen contains inventory mutations, source rename forms, document upload, and delete controls nearby.

Why this is recoverable:

- The extraction moved only local UI state transitions and render calls.
- No part records are mutated.
- No source rename, restock/use, update, delete, upload, auth/session/company/location, SQL/RLS, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` logic moved.
- Rollback is one app commit or restoration of the original part detail listener block.

Implementation:

- Added `src/utils/workspacePartDetailEvents.js`.
- Updated `index.html` with `src/utils/workspacePartDetailEvents.js?v=lfes-authority-part-detail-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-part-detail-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- Added `tests/smoke/workspace-part-detail-events-smoke.js`.
- App deploy commit: `3a99bfd` (`Extract workspace part detail events`).
- `app.js` line count moved from 8,841 to 8,827.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspacePartDetailEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-part-detail-events-smoke.js`.
- Targeted mock-DOM Parts detail smoke: PASS for click open, keyboard open, irrelevant-key no-op, close detail, source-manager toggle, render calls, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4184/`.
- Local browser boot smoke: PASS. Login screen loaded with the Parts detail script and cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: PASS for `3a99bfd`, run `https://github.com/loufish727/MaintainOps/actions/runs/26459512566`.
- Signed-in live Parts detail smoke: PASS. Parts opened at Auburn, `hydralic hose` opened into Part Detail, `Edit Sources` revealed the source-manager UI, and `Back to parts` returned to Parts Inventory with the `hydralic hose` card visible.

LFES catch:

- Local resource smoke initially timed out because `python -m http.server` is unavailable in this Windows environment; `python` resolves to the Microsoft Store shim. The smoke passed after using the local Node static-server method.

Next candidates:

- Select the next hard boundary from the authority map.
- Message navigation remains mutation-adjacent because thread opening marks read state; split message filter/search/local composer UI from send/reply/read-state writes if choosing Messages.
- Do not combine request conversion, Quick Fix, storage/photo/document, broad forms, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` with another extraction.

## Message Center Local UI Event Boundary - 2026-05-26

Hard boundary selected:

- Message Center local UI binding inside `bindWorkspaceEvents()`.

Why this is hard:

- The Message Center mixes read-navigation, local composer state, quick-reply UI, read-state writes, and send/create message mutations in one render/event area.

Why this is recoverable:

- The extraction moved only local UI state and navigation wiring.
- Thread-open/read-state writes, create-thread submit, send-reply submit, message data loading, Supabase/RLS, and render ownership stayed in `app.js`.
- Rollback is one app commit or restoration of the original local Message UI listener blocks.

Implementation:

- Added `src/utils/workspaceMessageUiEvents.js`.
- Moved `[data-message-filter]`, `[data-open-linked-work-order]`, `[data-clear-message-work-link]`, `#message-search`, `#message-thread-type` composer sync, and `[data-quick-reply]`.
- Updated `index.html` with `src/utils/workspaceMessageUiEvents.js?v=lfes-authority-message-ui-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-message-ui-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- Added `tests/smoke/workspace-message-ui-events-smoke.js`.
- App deploy commit: `d4a8503` (`Extract workspace message UI events`).
- `app.js` line count moved from 8,827 to 8,780.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceMessageUiEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-message-ui-events-smoke.js`.
- Targeted mock-DOM Message UI smoke: PASS for filter state/storage/render, linked work navigation state, clear composer work link, search persistence/focus, composer type sync, quick-reply text insertion/autogrow, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4185/`.
- Local browser boot smoke: PASS. Login screen loaded with the Message UI script and cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: PASS for `d4a8503`, run `https://github.com/loufish727/MaintainOps/actions/runs/26459972613`.
- Signed-in live Message UI smoke: PASS. Messages opened, filter controls remained usable, quick reply `On it` inserted into the active reply textbox, and console stayed quiet.

LFES catch:

- Live browser read-only evaluation could not read `localStorage`, so visible DOM evidence was used for live verification while the targeted mock smoke covered storage updates.

Next candidates:

- Select the next hard boundary from the authority map.
- Message thread-open/read-state writes remain mutation-adjacent and should be planned separately from send/reply forms.
- Do not combine request conversion, Quick Fix, storage/photo/document, broad forms, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` with another extraction.

## Parts Search Event Boundary - 2026-05-26

Hard boundary selected:

- Parts Inventory search input and submit binding inside `bindWorkspaceEvents()`.

Why this is hard:

- It controls persisted search state, page reset, render timing, focus restoration, and list scroll inside a screen that also contains inventory mutations, source management, document upload, and delete controls.

Why this is recoverable:

- The extraction moved only search input/submit UI behavior.
- No inventory records are mutated.
- No create/restock/use/edit/delete, source rename, document upload, auth/session/company/location, SQL/RLS, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` logic moved.
- Rollback is one app commit or restoration of the original `#part-search-form` listener block.

Implementation:

- Added `src/utils/workspacePartSearchEvents.js`.
- Updated `index.html` with `src/utils/workspacePartSearchEvents.js?v=lfes-authority-part-search-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-part-search-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- Added `tests/smoke/workspace-part-search-events-smoke.js`.
- App deploy commit: `72ef610` (`Extract workspace part search events`).
- `app.js` line count moved from 8,780 to 8,763.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspacePartSearchEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-part-search-events-smoke.js`.
- Targeted mock-DOM Parts search smoke: PASS for input persistence, page reset, render, focus/cursor restore, submit prevention, submit persistence, list scroll, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4186/`.
- Local browser boot smoke: PASS. Login screen loaded with the Parts search script and cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: PASS for `72ef610`, run `https://github.com/loufish727/MaintainOps/actions/runs/26460275221`.
- Signed-in live Parts search smoke: PASS. Browser automation text entry hit the known virtual clipboard limitation, so the user manually entered `hose`; verification observed `Search parts` value `hose`, visible `hydralic hose` card, new script/cache tags, and no browser warning/error logs.

Next candidates:

- Continue with another contained event boundary.
- Do not combine request conversion, Quick Fix, storage/photo/document, broad forms, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` with another extraction.

## Workspace Section Navigation Event Boundary - 2026-05-26

Hard boundary selected:

- Main workspace `[data-section]` navigation binding inside `bindWorkspaceEvents()`.

Why this is hard:

- It changes shared workspace state, clears multiple detail/form modes, resets paging, persists active section, renders, and triggers queue reloads.

Why this is recoverable:

- The extraction moved only section-navigation wiring and injected every app-owned dependency.
- No records are mutated.
- No command actions, Quick Fix, request conversion, forms, deletes, uploads, auth/session/company/location, SQL/RLS, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` logic moved.
- Rollback is one app commit or restoration of the original `[data-section]` listener block.

Implementation:

- Added `src/utils/workspaceSectionNavigationEvents.js`.
- Updated `index.html` with `src/utils/workspaceSectionNavigationEvents.js?v=lfes-authority-section-navigation-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-section-navigation-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- Added `tests/smoke/workspace-section-navigation-events-smoke.js`.
- App deploy commit: `f3ea2e6` (`Extract workspace section navigation events`).
- `app.js` line count stayed at 8,763 because the injected adapter roughly replaced the inline block.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceSectionNavigationEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-section-navigation-events-smoke.js`.
- Targeted mock-DOM section navigation smoke: PASS for allowed/blocked sections, state clearing, search-mode reset, storage persistence, work/request queue reloads, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4187/`.
- Local browser boot smoke: PASS. Login screen loaded with the section navigation script and cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions: local verifier hit unauthenticated API rate limit after seeing the run in progress; public run page verified `Status Success` for `f3ea2e6`, run `https://github.com/loufish727/MaintainOps/actions/runs/26460676489`.
- Signed-in live section navigation smoke: PASS. Work Orders, Requests, and Parts each rendered expected headings with no browser warning/error logs.

Next candidates:

- Continue with another contained event boundary.
- Do not combine command actions, request conversion, Quick Fix, storage/photo/document, broad forms, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` with another extraction.

## Message Center Thread Event Boundary - 2026-05-26

Hard boundary selected:

- Message Center thread open/read-state bindings inside `bindWorkspaceEvents()`.

Why this is hard:

- Opening a thread is not purely navigational; it updates active thread state, persists thread state, may switch to Messages, closes composer state for work-linked threads, calls read-state write logic, and renders.

Why this is recoverable:

- The extraction moved only thread-open event wiring and injected the read-state callback.
- The Supabase read-state implementation stayed in `app.js`.
- No create-thread, send-reply, message body mutation, auth/session/company/location, SQL/RLS, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` logic moved.
- Rollback is one app commit or restoration of the original thread listener blocks.

Implementation:

- Added `src/utils/workspaceMessageThreadEvents.js`.
- Updated `index.html` with `src/utils/workspaceMessageThreadEvents.js?v=lfes-authority-message-thread-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-message-thread-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- Added `tests/smoke/workspace-message-thread-events-smoke.js`.
- App deploy commit: `04f4a58` (`Extract workspace message thread events`).
- `app.js` line count moved from 8,763 to 8,753.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceMessageThreadEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-message-thread-events-smoke.js`.
- Targeted mock-DOM Message thread smoke: PASS for thread open, work-linked thread open, read-state callback ordering, storage persistence, composer close, section switch, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4188/`.
- Local browser boot smoke: PASS. Login screen loaded with the Message thread script and cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: unavailable due unauthenticated API rate limit; public Actions list was stale for this phase. Direct hosted resource smoke passed for the deployed commit.
- Signed-in live Message thread smoke: PASS. Messages opened, QA Phase 9I thread opened, thread detail/reply box rendered, new script/cache tags were present, and no browser warning/error logs appeared.

Next candidates:

- Continue with another contained event boundary.
- Do not combine create-thread, send-reply, command actions, request conversion, Quick Fix, storage/photo/document, broad forms, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` with another extraction.

## Issue/Admin Local UI Event Boundary - 2026-05-26

Hard boundary selected:

- App issue report cancel and local admin setup action binding inside `bindWorkspaceEvents()`.

Why this is hard:

- It sits beside issue-report creation, issue-status mutation, setup/admin checklist behavior, and localStorage-backed readiness state.

Why this is recoverable:

- The extraction moved only local UI state and local checklist flag handling.
- No issue reports are created or updated.
- No SQL, Supabase/RLS, auth/session/company/location, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` logic moved.
- Rollback is one app commit or restoration of the original listener blocks.

Implementation:

- Added `src/utils/workspaceIssueAdminUiEvents.js`.
- Updated `index.html` with `src/utils/workspaceIssueAdminUiEvents.js?v=lfes-authority-issue-admin-ui-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-issue-admin-ui-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- Added `tests/smoke/workspace-issue-admin-ui-events-smoke.js`.
- App deploy commit: `9e80f0b` (`Extract workspace issue admin UI events`).
- `app.js` line count moved from 8,753 to 8,746.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceIssueAdminUiEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-issue-admin-ui-events-smoke.js`.
- Targeted mock-DOM issue/admin UI smoke: PASS for report-issue cancel, ignored setup action, confirm admin delete SQL localStorage/notice/render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4189/`.
- Local browser boot smoke: PASS. Login screen loaded with the issue/admin UI script and cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions: PASS. `npm run test:smoke:github-actions` verified Resource Load Smoke run `26462192835`, and Pages build/deployment run `26462191804` completed successfully for `b5328a7`.
- Signed-in live issue/admin UI smoke: PASS. Report Issue opened the issue form, Cancel closed it, new script/cache tags were present, and no browser warning/error logs appeared.

Next candidates:

- Continue with another contained event boundary.
- Do not combine app issue creation/status mutation, command actions, request conversion, Quick Fix, storage/photo/document, broad forms, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` with another extraction.

## Part Delete-Cancel Event Boundary - 2026-05-26

Hard boundary selected:

- Part delete warning cancel binding inside `bindWorkspaceEvents()`.

Why this is hard:

- It lives inside a destructive delete zone and shares visual space with the permanent delete action.

Why this is recoverable:

- The extraction moved only cancel behavior that clears pending delete state and renders.
- No delete request, permanent delete, permission check, Supabase/RLS, auth/session/company/location, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` logic moved.
- Rollback is one app commit or restoration of the original `[data-cancel-delete-part]` listener block.

Implementation:

- Added `src/utils/workspacePartDeleteCancelEvents.js`.
- Updated `index.html` with `src/utils/workspacePartDeleteCancelEvents.js?v=lfes-authority-part-delete-cancel-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-part-delete-cancel-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- Added `tests/smoke/workspace-part-delete-cancel-events-smoke.js`.
- App deploy commit: `e8a0b66` (`Extract workspace part delete cancel events`).
- `app.js` line count moved from 8,746 to 8,747 because the injected adapter is slightly larger than the inline cancel block.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspacePartDeleteCancelEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-part-delete-cancel-events-smoke.js`.
- Targeted mock-DOM Part delete-cancel smoke: PASS for pending delete clear, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4190/`.
- Local browser boot smoke: PASS. Login screen loaded with the Part delete-cancel script and cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: unavailable due unauthenticated API rate limit. Direct hosted resource smoke passed for the deployed commit.
- Signed-in live Part delete-cancel smoke: PASS. Parts opened at Auburn, `hydralic hose` detail opened, `Delete Part` opened the warning, scoped `[data-cancel-delete-part]` cleared the warning, `Delete Part` returned, no deletion occurred, and no browser warning/error logs appeared.

LFES catch:

- The page had two generic `Cancel` buttons, so live smoke needed the scoped `[data-cancel-delete-part]` selector. Danger-zone cancel smokes should scope by data selector, not button text.

Next candidates:

- Continue with another contained event boundary.
- Do not combine permanent delete, request delete, mutation forms, request conversion, Quick Fix, storage/photo/document, broad forms, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` with another extraction.

## Work Message Start Event Boundary - 2026-05-26

Hard boundary selected:

- Work Order `Message Team` start-composer binding inside `bindWorkspaceEvents()`.

Why this is hard:

- It crosses from Work Order detail into Messages, modifies composer/thread state, persists message/workspace state, and renders.

Why this is recoverable:

- The extraction moved only start-composer event wiring.
- No thread creation, reply send, read-state write, Supabase/RLS, auth/session/company/location, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` logic moved.
- Rollback is one app commit or restoration of the original `[data-start-work-message]` listener block.

Implementation:

- Added `src/utils/workspaceWorkMessageStartEvents.js`.
- Updated `index.html` with `src/utils/workspaceWorkMessageStartEvents.js?v=lfes-authority-work-message-start-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-work-message-start-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- Added `tests/smoke/workspace-work-message-start-events-smoke.js`.
- App deploy commit: `9b0381b` (`Extract workspace work message start events`).
- `app.js` line count moved from 8,747 to 8,745.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceWorkMessageStartEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-work-message-start-events-smoke.js`.
- Targeted mock-DOM Work Message Start smoke: PASS for composer work-order id, composer open state, active thread clear, section switch, storage persistence, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4191/`.
- Local browser boot smoke: PASS. Login screen loaded with the Work Message Start script and cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: unavailable due unauthenticated API rate limit. Direct hosted resource smoke passed for the deployed commit.
- Signed-in live Work Message Start smoke: PASS. Hydralic Leak detail opened, Messages accordion opened, Message Team opened the Messages composer with Hydralic Leak linked, no send mutation occurred, and no browser warning/error logs appeared.

LFES catch:

- Work Order detail accordion controls can be below the viewport. The live smoke recorded summary/button rects, scrolled, and used coordinate clicks only for non-submit UI controls.

Next candidates:

- Continue with another contained event boundary.
- Do not combine create-thread, send-reply, read-state writes, command actions, request conversion, Quick Fix, storage/photo/document, broad forms, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` with another extraction.

## Report Issue Command Event Boundary - 2026-05-26

Hard boundary selected:

- `Report Issue` command-opener binding inside `bindWorkspaceEvents()`.

Why this is hard:

- It lives in the shared command-action router beside Quick Fix, New Work Order, Submit Request, and Export CSV, which are broader workflow/download boundaries.

Why this is recoverable:

- The extraction moved only the local Report Issue opener.
- No issue report is submitted.
- Other command actions, Supabase/RLS, auth/session/company/location, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` logic stayed in `app.js`.
- Rollback is one app commit or restoration of the original report-issue branch.

Implementation:

- Added `src/utils/workspaceReportIssueCommandEvents.js`.
- Updated `index.html` with `src/utils/workspaceReportIssueCommandEvents.js?v=lfes-authority-report-issue-command-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-report-issue-command-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- Added `tests/smoke/workspace-report-issue-command-events-smoke.js`.
- App deploy commit: `6c0ab08` (`Extract workspace report issue command events`).
- `app.js` line count moved from 8,745 to 8,748 because the injected adapter is larger than the removed branch.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceReportIssueCommandEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-report-issue-command-events-smoke.js`.
- Targeted mock-DOM Report Issue command smoke: PASS for clearing active detail/form modes, entering report mode, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4192/`.
- Local browser boot smoke: PASS. Login screen loaded with the Report Issue command script and cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: unavailable due unauthenticated API rate limit. Direct hosted resource smoke passed for the deployed commit.
- Signed-in live Report Issue command smoke: PASS. Report Issue opened the issue form, scoped cancel closed it, new script/cache tags were present, and no browser warning/error logs appeared.

Next candidates:

- Reassess before continuing. Quick Fix, New Work Order, Submit Request, and Export CSV are broader workflow/download boundaries and should not be combined with another change.

## Submit Request Command Event Boundary - 2026-05-26

Hard boundary selected:

- `Submit Request` command-opener binding inside `bindWorkspaceEvents()`.

Why this is hard:

- It lives in the shared command-action router and changes multiple workspace UI state values before reloading the request queue.

Why this is recoverable:

- The extraction moved only the Submit Request opener.
- No request is submitted, converted, deleted, or uploaded.
- Quick Fix, New Work Order, Export CSV, request form submit, public QR intake, Supabase/RLS, auth/session/company/location, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` logic stayed in `app.js`.
- Rollback is one app commit or restoration of the original request command branch.

Implementation:

- Added `src/utils/workspaceSubmitRequestCommandEvents.js`.
- Updated `index.html` with `src/utils/workspaceSubmitRequestCommandEvents.js?v=lfes-authority-submit-request-command-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-submit-request-command-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- Added `tests/smoke/workspace-submit-request-command-events-smoke.js`.
- App deploy commit: `b5328a7` (`Extract workspace submit request command events`).
- `app.js` line count moved from 8,748 to 8,750 because the injected adapter is larger than the removed branch.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceSubmitRequestCommandEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-submit-request-command-events-smoke.js`.
- Targeted mock-DOM Submit Request command smoke: PASS for clearing active detail/form modes, switching to Requests, resetting request paging, persisting active section, request queue reload, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Submit Request command script/cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions verifier: unavailable due unauthenticated API rate limit. Direct hosted resource smoke passed for the deployed commit.
- Signed-in live Submit Request command smoke: PASS. `More` was opened, Submit Request rendered the Requests form, new script/cache tags were present, and no browser warning/error logs appeared.

LFES catch:

- Disclosure-hosted commands need an explicit open/visibility step before targeting nested controls. Future command-boundary smokes should open `More` first and verify the intended nested command is visible before clicking.

Next candidates:

- Reassess before continuing. New Work Order and Export CSV are broader form/download boundaries. Quick Fix remains higher-risk and should not be combined with another extraction.

## New Work Order Command Event Boundary - 2026-05-26

Hard boundary selected:

- `New Work Order` command-opener binding inside `bindWorkspaceEvents()`.

Why this is hard:

- It lives in the shared command-action router and opens a mutation-capable work-order form.

Why this is recoverable:

- The extraction moved only the New Work Order opener.
- No work order is submitted, Quick Fix is not opened, and no records are mutated.
- Work-order create submit, validation, Quick Fix, request conversion, Export CSV, Supabase/RLS, auth/session/company/location, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` logic stayed in `app.js`.
- Rollback is one app commit or restoration of the original create-work-order command branch.

Implementation:

- Added `src/utils/workspaceNewWorkOrderCommandEvents.js`.
- Updated `index.html` with `src/utils/workspaceNewWorkOrderCommandEvents.js?v=lfes-authority-new-work-order-command-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-new-work-order-command-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- Added `tests/smoke/workspace-new-work-order-command-events-smoke.js`.
- App deploy commit: `b9931f3` (`Extract workspace new work order command events`).
- `app.js` line count moved from 8,750 to 8,752 because the injected adapter is larger than the removed branch.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceNewWorkOrderCommandEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-new-work-order-command-events-smoke.js`.
- Targeted mock-DOM New Work Order command smoke: PASS for clearing active detail/mode state, entering create-work-order mode, switching to Work Orders, persisting active section, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the New Work Order command script/cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions: PASS. `npm run test:smoke:github-actions` verified Resource Load Smoke run `26462656699`, and Pages build/deployment run `26462655467` completed successfully for `b9931f3`.
- Signed-in live New Work Order command smoke: PASS. `More` was opened, New Work Order rendered `#create-work-order-form`, Quick Fix form did not render, new script/cache tags were present, and no browser warning/error logs appeared.

Next candidates:

- Reassess before continuing. Export CSV has a download side effect and Quick Fix remains higher-risk. Do not combine either with another extraction.

## Export CSV Command Event Boundary - 2026-05-26

Hard boundary selected:

- `Export CSV` command binding inside `bindWorkspaceEvents()`.

Why this is hard:

- It lives in the shared command-action router and triggers a download side effect.

Why this is recoverable:

- The extraction moved only the Export CSV click binding.
- Export row construction, filename selection, blob generation, active-section state, Supabase/RLS, auth/session/company/location, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` logic stayed in `app.js`.
- No app data is mutated.
- Rollback is one app commit or restoration of the original export-csv command branch.

Implementation:

- Added `src/utils/workspaceExportCsvCommandEvents.js`.
- Updated `index.html` with `src/utils/workspaceExportCsvCommandEvents.js?v=lfes-authority-export-csv-command-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-export-csv-command-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- Added `tests/smoke/workspace-export-csv-command-events-smoke.js`.
- App deploy commit: `dd307da` (`Extract workspace export csv command events`).
- `app.js` line count moved from 8,752 to 8,754 because the injected adapter is larger than the removed branch.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceExportCsvCommandEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-export-csv-command-events-smoke.js`.
- Targeted mock-DOM Export CSV command smoke: PASS for invoking the injected export callback and missing-callback no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Export CSV command script/cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions: PASS. `npm run test:smoke:github-actions` verified Resource Load Smoke run `26462940370`, and Pages build/deployment run `26462939393` completed successfully for `dd307da`.
- Signed-in live Export CSV command smoke: PASS. A download-capable authenticated browser opened Equipment, opened `More`, clicked Export CSV, and captured a generated `equipment.csv` blob-link export with no dialogs and no browser warning/error logs.

LFES catch:

- The in-app browser does not support download events; export/download smokes need a download-capable Playwright browser or a browser-side anchor/blob capture.
- Empty-section export intentionally alerts instead of downloading. Choose a known non-empty section for CSV-path verification.

Next candidates:

- Quick Fix is now the remaining shared command opener, but it is higher-risk and should be mapped separately before extraction.

## Equipment Delete-Cancel Event Boundary - 2026-05-26

Hard boundary selected:

- Equipment delete warning cancel binding inside `bindWorkspaceEvents()`:
  - `[data-cancel-delete-asset]`

Why this is hard:

- It is inside a delete flow and depends on pending delete state, role permissions, and link-count delete guards.

Why this is recoverable:

- The extraction moved only the cancel event binding.
- Delete request, permanent delete, link-count guards, permission checks, equipment data, Supabase/RLS, auth/session/company/location, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` logic stayed in `app.js`.
- No permanent delete occurs during the cancel verification; the later cleanup delete is limited to the disposable smoke record.
- Rollback is one app commit or restoration of the original `[data-cancel-delete-asset]` listener block.

Implementation:

- Added `src/utils/workspaceAssetDeleteCancelEvents.js`.
- Updated `index.html` with `src/utils/workspaceAssetDeleteCancelEvents.js?v=lfes-authority-asset-delete-cancel-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-asset-delete-cancel-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- Added `tests/smoke/workspace-asset-delete-cancel-events-smoke.js`.
- App deploy commit: `52086d2` (`Extract workspace asset delete cancel events`).
- `app.js` line count remained 8,754.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceAssetDeleteCancelEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-asset-delete-cancel-events-smoke.js`.
- Targeted mock-DOM Equipment delete-cancel smoke: PASS for `stopPropagation`, pending delete clear, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Equipment delete-cancel script/cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions: PASS. `npm run test:smoke:github-actions` verified Resource Load Smoke run `26463455097`, and Pages build/deployment run `26463454051` completed successfully for `52086d2`.
- Signed-in live Equipment delete-cancel smoke: PASS. Disposable equipment `LFES disposable equipment 1779822012824` was created, opened in the manager/admin session, Delete Equipment rendered Cancel and Permanently Delete, Cancel cleared the warning and restored Delete Equipment, then the disposable record was permanently deleted.
- Cleanup verification: PASS. `LFES disposable equipment 1779822012824` no longer appeared in the app and no browser warning/error logs appeared.

LFES catch:

- Existing linked equipment correctly disables delete and cannot exercise the cancel path.
- Equipment delete controls are role-gated. The QA/test login can create equipment but does not expose delete controls; manager/admin verification is required.
- Disposable equipment setup is acceptable for this boundary as long as the record is unlinked and cleanup is verified.

Next candidates:

- Consider only another cancel-only delete sub-boundary if a safe disposable/visible record exists. Do not combine request conversion, Quick Fix, storage/photo/document, broad forms, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` with another extraction.

## Request Delete-Cancel Event Boundary - 2026-05-26

Hard boundary selected:

- Request delete warning cancel binding inside `bindWorkspaceEvents()`:
  - `[data-cancel-delete-request]`

Why this is hard:

- It is inside the request delete flow and lives beside request conversion and Quick Fix-from-request controls.

Why this is recoverable:

- The extraction moved only the cancel event binding.
- Delete request, permanent delete, request conversion, Quick Fix from request, request data, Supabase/RLS, auth/session/company/location, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` logic stayed in `app.js`.
- No permanent delete occurs during cancel verification; the later cleanup delete is limited to the disposable smoke request.
- Rollback is one app commit or restoration of the original `[data-cancel-delete-request]` listener block.

Implementation:

- Added `src/utils/workspaceRequestDeleteCancelEvents.js`.
- Updated `index.html` with `src/utils/workspaceRequestDeleteCancelEvents.js?v=lfes-authority-request-delete-cancel-events-1`.
- Updated `app.js` cache tag to `app.js?v=lfes-authority-request-delete-cancel-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- Added `tests/smoke/workspace-request-delete-cancel-events-smoke.js`.
- App deploy commit: `a9fcf55` (`Extract workspace request delete cancel events`).
- `app.js` line count moved from 8,754 to 8,755 because the injected adapter is larger than the removed branch.

Verification:

- Static checks: PASS for `app.js`, `src/utils/workspaceRequestDeleteCancelEvents.js`, `tests/smoke/resource-load.spec.js`, and `tests/smoke/workspace-request-delete-cancel-events-smoke.js`.
- Targeted mock-DOM Request delete-cancel smoke: PASS for pending delete clear, render, and missing-state no-op.
- Local resource smoke: PASS against `http://127.0.0.1:4193/`.
- Local browser boot smoke: PASS. The app shell loaded with the Request delete-cancel script/cache tag present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions: PASS. `npm run test:smoke:github-actions` verified Resource Load Smoke run `26469402958` completed successfully for `a9fcf55`.
- Signed-in live Request delete-cancel smoke: PASS. Disposable request `LFES disposable request 1779822739298` was created, opened in the manager/admin session, Delete rendered Cancel and Permanently Delete, Cancel cleared the warning and restored Delete, then the disposable request was permanently deleted.
- Cleanup verification: PASS. `LFES disposable request 1779822739298` no longer appeared in the app and no browser warning/error logs appeared.

LFES catch:

- Request card controls may require scrolling into the viewport before safe coordinate clicking.
- Disposable request setup is acceptable for this boundary as long as cleanup is verified.

Next candidates:

- Consider PM schedule delete-cancel or procedure delete-cancel only if a safe disposable/visible record exists. Do not combine delete-confirm, request conversion, Quick Fix, storage/photo/document, broad forms, broad `renderWorkspace()`, or broad `bindWorkspaceEvents()` with another extraction.

## PM Schedule Delete-Cancel Event Boundary - 2026-05-26

Hard boundary selected:

- PM schedule delete warning cancel binding inside `bindWorkspaceEvents()`:
  - `[data-cancel-delete-schedule]`

Risk:

- Medium risk. It is delete-adjacent and role-gated, and it lives beside PM generation/permanent-delete controls.

Intended boundary:

- Move only the cancel listener that clears pending schedule delete state and re-renders.
- Keep delete request, permanent delete, PM generation, schedule data, Supabase/RLS, auth/session/company/location, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.

Rollback path:

- Revert `f76c15b` or restore the original `[data-cancel-delete-schedule]` listener block in `app.js`.

Implementation:

- Added `src/utils/workspaceScheduleDeleteCancelEvents.js`.
- Added `tests/smoke/workspace-schedule-delete-cancel-events-smoke.js`.
- Updated `index.html` and the hosted cache tags to `lfes-authority-schedule-delete-cancel-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- App deploy commit: `f76c15b` (`Extract workspace schedule delete cancel events`).
- `app.js` line count is 8,098.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceScheduleDeleteCancelEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-schedule-delete-cancel-events-smoke.js`: PASS.
- `node tests/smoke/workspace-schedule-delete-cancel-events-smoke.js`: PASS.
- Local resource smoke against `http://127.0.0.1:4193/`: PASS.
- Local browser boot smoke: PASS with script/cache tags present and no browser warning/error logs.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions: PASS for Resource Load Smoke run `26469751689`.
- Manager/admin live smoke: PASS. Disposable schedule `LFES disposable PM schedule 1779823426651` rendered the delete warning, Cancel cleared it and restored Delete, and cleanup permanent delete removed only that disposable schedule.

Catch:

- The in-app browser text-entry path can fail during setup when the virtual clipboard is unavailable. Use authenticated Playwright setup for disposable records when necessary, then verify the changed behavior through the app UI and confirm cleanup.

Result:

- Behavior changed: no observed behavior change.
- Proceed only to another single bounded delete-cancel or local UI boundary unless a separate high-risk plan is written.

## Procedure Delete-Cancel Event Boundary - 2026-05-26

Hard boundary selected:

- Procedure delete warning cancel binding inside `bindWorkspaceEvents()`:
  - `[data-cancel-delete-procedure]`

Risk:

- Medium risk. It is delete-adjacent and role-gated, and it lives beside blocker verification and permanent-delete controls.

Intended boundary:

- Move only the cancel listener that clears pending procedure delete state and re-renders.
- Keep delete request, permanent delete, blocker verification, procedure data/steps, Supabase/RLS, auth/session/company/location, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.

Rollback path:

- Revert `d776856` or restore the original `[data-cancel-delete-procedure]` listener block in `app.js`.

Implementation:

- Added `src/utils/workspaceProcedureDeleteCancelEvents.js`.
- Added `tests/smoke/workspace-procedure-delete-cancel-events-smoke.js`.
- Updated `index.html` and the hosted cache tags to `lfes-authority-procedure-delete-cancel-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- App deploy commit: `d776856` (`Extract workspace procedure delete cancel events`).
- `app.js` line count is 8,099.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceProcedureDeleteCancelEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-procedure-delete-cancel-events-smoke.js`: PASS.
- `node tests/smoke/workspace-procedure-delete-cancel-events-smoke.js`: PASS.
- Local resource smoke against `http://127.0.0.1:4193/`: PASS.
- Local browser boot smoke: PASS with script/cache tags present.
- Hosted GitHub Pages resource smoke: PASS.
- GitHub Actions: PASS for Resource Load Smoke run `26470365077`.
- Manager/admin live smoke: PASS. Disposable procedure `LFES disposable procedure 1779823870455` rendered the delete warning, Cancel cleared it and restored Delete Procedure, and cleanup permanent delete removed only that disposable procedure.

Catch:

- Procedure delete-cancel smoke needs an unlinked disposable procedure; linked procedures can correctly block delete and are not suitable for the cancel-boundary proof.

Result:

- Behavior changed: no observed behavior change.
- Reassess the next authority-map boundary before moving beyond cancel-only delete flows.

## Textarea Auto-Grow UI Boundary - 2026-05-26

Hard boundary selected:

- Textarea auto-grow helper and global textarea input binding.

Risk:

- Medium-low risk. It touches many forms but only owns textarea height updates, not data, submissions, renders, or mutations.

Intended boundary:

- Move `autoGrowTextarea` and the global `textarea` input binding to `src/utils/workspaceTextareaAutoGrow.js`.
- Keep form submits, field payloads, validation, mutations, render ownership, auth/company/location, Supabase/RLS, and broad `bindWorkspaceEvents()` in `app.js`.

Rollback path:

- Revert `b9e037d` or restore the original helper and `document.querySelectorAll("textarea")` binding in `app.js`.

Implementation:

- Added `src/utils/workspaceTextareaAutoGrow.js`.
- Added `tests/smoke/workspace-textarea-auto-grow-smoke.js`.
- Updated `index.html` and the hosted cache tags to `lfes-authority-textarea-auto-grow-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- App deploy commit: `b9e037d` (`Extract workspace textarea auto grow events`).
- `app.js` line count is 8,093.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceTextareaAutoGrow.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-textarea-auto-grow-smoke.js`: PASS.
- `node tests/smoke/workspace-textarea-auto-grow-smoke.js`: PASS.
- Local resource smoke against `http://127.0.0.1:4193/`: PASS.
- Local browser boot smoke: PASS with script/cache tags present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Report Issue details textarea grew from 94px to 218px after 12 lines of input, with no browser warning/error logs.
- GitHub Actions verifier: the unauthenticated API was rate-limited. Use public workflow page fallback or verify the current tree on the following docs commit before advancing into higher-risk work.

Catch:

- GitHub Actions verification now needs a formal fallback path when API rate limits block the script. Public workflow page verification is acceptable when it shows the target/current-tree commit; otherwise verify the current tree on the next docs commit.

Result:

- Behavior changed: no observed behavior change.
- Do not enter Quick Fix/request conversion/delete-confirm/storage/photo/document/broad form work without a separate high-risk plan.

## Team Invite Cancel-Warning UI Boundary - 2026-05-26

Hard boundary selected:

- Team invite cancel-warning and keep/dismiss bindings:
  - `[data-cancel-invite]`
  - `[data-cancel-invite-cancel]`

Risk:

- Medium risk. It is adjacent to a real invite-cancel mutation, but the selected boundary only opens and dismisses warning state.

Intended boundary:

- Move only the warning-open and keep/dismiss event bindings to `src/utils/workspaceTeamInviteCancelEvents.js`.
- Keep confirm cancel, invite creation, invite data, render ownership, auth/company/location, Supabase/RLS, and broad `bindWorkspaceEvents()` in `app.js`.

Rollback path:

- Revert `4874c96` or restore the original `[data-cancel-invite]` and `[data-cancel-invite-cancel]` listener blocks in `app.js`.

Implementation:

- Added `src/utils/workspaceTeamInviteCancelEvents.js`.
- Added `tests/smoke/workspace-team-invite-cancel-events-smoke.js`.
- Updated `index.html` and the hosted cache tags to `lfes-authority-team-invite-cancel-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- App deploy commit: `4874c96` (`Extract workspace team invite cancel events`).
- `app.js` line count is 8,087.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceTeamInviteCancelEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-team-invite-cancel-events-smoke.js`: PASS.
- `node tests/smoke/workspace-team-invite-cancel-events-smoke.js`: PASS.
- Local resource smoke against `http://127.0.0.1:4193/`: PASS.
- Local browser boot smoke: PASS with script/cache tags present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Existing pending invite `jeffrey.kinkaid@taylormetal.com` opened the warning, rendered Keep and confirm Cancel Invite, then Keep dismissed the warning and restored the original Cancel Invite without mutating the invite.
- GitHub Actions verifier: deferred until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

Catch:

- Existing pending invites allow a non-destructive smoke for warning/keep behavior. Confirm-cancel remains a separate mutation boundary and must not be clicked in this phase.

Result:

- Behavior changed: no observed behavior change.
- Continue only with another bounded local UI/read-only event seam unless a separate high-risk plan is written.

## Request-Origin Quick Fix Opener Boundary - 2026-05-26

Hard boundary selected:

- Request-origin Quick Fix opener:
  - `[data-quick-fix-request]`

Risk:

- High-risk but contained. It enters a mutation-capable form from request context, but the selected boundary only calls the existing opener callback.

Intended boundary:

- Move only the request-origin Quick Fix binding to `src/utils/workspaceRequestQuickFixEvents.js`.
- Keep `openQuickFixForRequest`, Quick Fix submit, request conversion/deletion, request data, created work records, render ownership, auth/company/location, Supabase/RLS, and broad `bindWorkspaceEvents()` in `app.js`.

Rollback path:

- Revert `a2f5435` or restore the original `[data-quick-fix-request]` listener block in `app.js`.

Implementation:

- Added `src/utils/workspaceRequestQuickFixEvents.js`.
- Added `tests/smoke/workspace-request-quick-fix-events-smoke.js`.
- Updated `index.html` and the hosted cache tags to `lfes-authority-request-quick-fix-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- App deploy commit: `a2f5435` (`Extract workspace request quick fix events`).
- `app.js` line count is 8,080.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceRequestQuickFixEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-request-quick-fix-events-smoke.js`: PASS.
- `node tests/smoke/workspace-request-quick-fix-events-smoke.js`: PASS.
- Local resource smoke against `http://127.0.0.1:4193/`: PASS.
- Local browser boot smoke: PASS with script/cache tags present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Disposable request `LFES disposable request quick fix 1779825953666` opened Quick Fix from the request card, rendered `#quick-fix-form` with request context and description, and did not render Work Order create or Report Issue forms. No Quick Fix submit occurred.
- Cleanup verification: PASS. Disposable request `LFES disposable request quick fix 1779825953666` was permanently deleted and no longer appeared in the app.
- GitHub Actions verifier: deferred until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

Catch:

- Request-origin Quick Fix smoke needs a disposable request if no active requests exist. The smoke must stop at open-form/no-submit, then clean up the disposable request separately.

Result:

- Behavior changed: no observed behavior change.
- Reassess before continuing into mutation or conversion workflows.

## Public QR Print Button Boundary - 2026-05-26

Hard boundary selected:

- Public QR print button:
  - `#print-public-qr`

Risk:

- Medium-low risk. It is on the public QR path, but the selected boundary only invokes print and does not submit or mutate records.

Intended boundary:

- Move only the public QR print button binding to `src/utils/publicQrPrintEvents.js`.
- Keep public QR lookup, QR/request URL generation, public request intake/submit, auth/session startup, render ownership, and Supabase access in `app.js`.

Rollback path:

- Revert `54d14e0` or restore the original `#print-public-qr` listener in `app.js`.

Implementation:

- Added `src/utils/publicQrPrintEvents.js`.
- Added `tests/smoke/public-qr-print-events-smoke.js`.
- Updated `index.html` and the hosted cache tags to `lfes-authority-public-qr-print-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- App deploy commit: `54d14e0` (`Extract public QR print events`).
- `app.js` line count is 8,081.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/publicQrPrintEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/public-qr-print-events-smoke.js`: PASS.
- `node tests/smoke/public-qr-print-events-smoke.js`: PASS.
- Local resource smoke against `http://127.0.0.1:4193/`: PASS.
- Local browser boot smoke: PASS with script/cache tags present.
- Hosted GitHub Pages resource smoke: PASS.
- Hosted public QR live smoke: PASS. QR page for token `zGl_nSkBQp9WkId5zg15ewHr` loaded with the new script/cache tags; Playwright Chromium stubbed `window.print`, clicked Print / Save PDF, and verified the print callback fired once with no browser warning/error logs.
- GitHub Actions verifier: deferred until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

Catch:

- The in-app browser evaluate sandbox could not add print-stub state for this public page. Use Playwright Chromium for public QR print smoke and stub `window.print` before clicking.

## Asset Location Warning Events Boundary - 2026-05-26

Risk:

- Medium.
- The warning is workflow-adjacent because it protects cross-location equipment routing, but this boundary only owns event binding and calls the app-owned warning updater.

Intended boundary:

- Move only `[data-location-sensitive-asset]` initial/change warning binding to `src/utils/workspaceAssetLocationWarningEvents.js`.
- Keep cross-location mismatch calculation, warning text, confirmation gates, asset/location state, form submits, render, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.

Blast radius:

- Equipment select warning behavior in request, PM, and work-order forms that render `[data-location-sensitive-asset]`.
- No business record mutation, no delete, no submit, no upload, no auth/session/company/location startup changes.

Rollback path:

- Remove `src/utils/workspaceAssetLocationWarningEvents.js` from `index.html` and the resource smoke list.
- Restore the original `[data-location-sensitive-asset]` loop in `bindWorkspaceEvents()`.
- Revert the `app.js` cache tag.

Implementation result:

- Added `src/utils/workspaceAssetLocationWarningEvents.js`.
- Added `tests/smoke/workspace-asset-location-warning-events-smoke.js`.
- Updated `index.html` and the hosted cache tags to `lfes-authority-asset-location-warning-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- App deploy commit: `62c24c2` (`Extract workspace asset location warning events`).
- `app.js` line count after extraction: 8,081.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceAssetLocationWarningEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-asset-location-warning-events-smoke.js`: PASS.
- `node tests/smoke/workspace-asset-location-warning-events-smoke.js`: PASS.
- Local resource smoke against `http://127.0.0.1:4193/`: PASS.
- Local browser boot smoke: PASS; `index.html` referenced `src/utils/workspaceAssetLocationWarningEvents.js?v=lfes-authority-asset-location-warning-events-1` and `app.js?v=lfes-authority-asset-location-warning-events-1`.
- Hosted resource smoke against GitHub Pages: PASS.
- Signed-in live smoke: PASS; the live app exposed two `[data-location-sensitive-asset]` controls, selecting `New thalmann` in the request form left warning text blank as expected for the available same-location asset, and no submit/mutation occurred.
- GitHub Actions: PASS after the earlier unauthenticated API rate-limit gap cleared. Verified runs included `96de48c` (`26474526945`) and the follow-up docs checkpoint `1f2b80f` (`26474583585`).

LFES catch:

- The live dataset did not expose a cross-location equipment option in the request form during this smoke. Treat this as a same-location binding verification, not a mismatch-message proof. A later cross-location smoke should create or select a controlled cross-location fixture if that text path needs live proof.

## Equipment Delete-Request Events Boundary - 2026-05-26

Risk:

- Medium/high.
- The control is inside an irreversible delete flow, but the selected boundary only opens the app-owned warning state and does not perform the permanent delete.

Intended boundary:

- Move `[data-delete-asset]` warning-opener binding into `src/utils/workspaceAssetDeleteCancelEvents.js`.
- Keep `requestDeleteAsset` as an app-owned injected callback.
- Keep `[data-confirm-delete-asset]`, permanent delete, permission checks, blocker/link-count logic, equipment data, render, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.

Blast radius:

- Equipment Detail Delete Equipment warning opener and cancel behavior.
- No permanent delete ownership, no storage cleanup, no Supabase mutation ownership transfer.

Rollback path:

- Restore the original `[data-delete-asset]` loop in `bindWorkspaceEvents()`.
- Revert `src/utils/workspaceAssetDeleteCancelEvents.js` to cancel-only ownership.
- Revert cache tags to the previous known-good value.

Implementation result:

- Expanded `src/utils/workspaceAssetDeleteCancelEvents.js`.
- Expanded `tests/smoke/workspace-asset-delete-cancel-events-smoke.js`.
- Updated `index.html` and hosted cache tags to `lfes-authority-asset-delete-request-events-1`.
- App deploy commit: `3c0ce6d` (`Extract workspace asset delete request events`).
- `app.js` line count after extraction: 8,076.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceAssetDeleteCancelEvents.js`: PASS.
- `node --check tests/smoke/workspace-asset-delete-cancel-events-smoke.js`: PASS.
- `node tests/smoke/workspace-asset-delete-cancel-events-smoke.js`: PASS.
- Local resource smoke against `http://127.0.0.1:4193/`: PASS.
- Local browser boot smoke: PASS; `index.html` referenced `src/utils/workspaceAssetDeleteCancelEvents.js?v=lfes-authority-asset-delete-request-events-1` and `app.js?v=lfes-authority-asset-delete-request-events-1`.
- Hosted resource smoke against GitHub Pages: PASS after Pages propagation.
- Signed-in live smoke: PASS; disposable equipment `LFES disposable asset delete request 1779827205046` opened Delete Equipment warning, Cancel restored Delete Equipment, and no permanent delete occurred during the boundary check.
- Cleanup: PASS; manager/admin UI permanently deleted disposable asset `7656adb0-ee1e-4125-8715-9940dd26a5f2`, and data-layer verification returned `remaining: 0`.
- GitHub Actions: DEFERRED until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

LFES catch:

- Test-account direct REST cleanup for disposable equipment may be RLS-blocked even after a successful insert. Use manager/admin cleanup for delete-flow smokes unless delete permission is explicitly verified, and always confirm disposable removal at the data layer.

## Request Delete-Request Events Boundary - 2026-05-26

Risk:

- Medium/high.
- The control is inside an irreversible request delete flow, but the selected boundary only opens the app-owned warning state and does not perform the permanent delete.

Intended boundary:

- Move `[data-delete-request]` warning-opener binding into `src/utils/workspaceRequestDeleteCancelEvents.js`.
- Keep `requestDeleteMaintenanceRequest` as an app-owned injected callback.
- Keep `[data-confirm-delete-request]`, permanent delete, request conversion, request-origin Quick Fix, request data, render, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.

Blast radius:

- Request card Delete warning opener and cancel behavior.
- No permanent delete ownership, no conversion/Quick Fix ownership, no Supabase mutation ownership transfer.

Rollback path:

- Restore the original `[data-delete-request]` loop in `bindWorkspaceEvents()`.
- Revert `src/utils/workspaceRequestDeleteCancelEvents.js` to cancel-only ownership.
- Revert cache tags to the previous known-good value.

Implementation result:

- Expanded `src/utils/workspaceRequestDeleteCancelEvents.js`.
- Expanded `tests/smoke/workspace-request-delete-cancel-events-smoke.js`.
- Updated `index.html` and hosted cache tags to `lfes-authority-request-delete-request-events-1`.
- App deploy commit: `7483792` (`Extract workspace request delete request events`).
- `app.js` line count after extraction: 8,074.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceRequestDeleteCancelEvents.js`: PASS.
- `node --check tests/smoke/workspace-request-delete-cancel-events-smoke.js`: PASS.
- `node tests/smoke/workspace-request-delete-cancel-events-smoke.js`: PASS.
- Local resource smoke against `http://127.0.0.1:4193/`: PASS.
- Local browser boot smoke: PASS; `index.html` referenced `src/utils/workspaceRequestDeleteCancelEvents.js?v=lfes-authority-request-delete-request-events-1` and `app.js?v=lfes-authority-request-delete-request-events-1`.
- Hosted resource smoke against GitHub Pages: PASS.
- Signed-in live smoke: PASS; disposable request `LFES disposable request delete request 1779827484622` opened Delete warning, Cancel restored Delete, and no permanent delete occurred during the boundary check.
- Cleanup: PASS; manager/admin UI permanently deleted disposable request `dc7062dc-298f-4027-b9c3-b9518d98dd9d`, and data-layer verification returned `remaining: 0`.
- GitHub Actions: DEFERRED until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

## PM Schedule Delete-Request Events Boundary - 2026-05-26

Risk:

- Medium/high.
- The control is inside an irreversible PM schedule delete flow, but the selected boundary only opens the app-owned warning state and does not perform the permanent delete.

Intended boundary:

- Move `[data-delete-schedule]` warning-opener binding into `src/utils/workspaceScheduleDeleteCancelEvents.js`.
- Keep `requestDeletePreventiveSchedule` as an app-owned injected callback.
- Keep `[data-confirm-delete-schedule]`, permanent delete, PM generation, schedule data, render, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.

Blast radius:

- PM schedule card Delete warning opener and cancel behavior.
- No permanent delete ownership, no PM generation ownership, no Supabase mutation ownership transfer.

Rollback path:

- Restore the original `[data-delete-schedule]` loop in `bindWorkspaceEvents()`.
- Revert `src/utils/workspaceScheduleDeleteCancelEvents.js` to cancel-only ownership.
- Revert cache tags to the previous known-good value.

Implementation result:

- Expanded `src/utils/workspaceScheduleDeleteCancelEvents.js`.
- Expanded `tests/smoke/workspace-schedule-delete-cancel-events-smoke.js`.
- Updated `index.html` and hosted cache tags to `lfes-authority-schedule-delete-request-events-1`.
- App deploy commit: `57de17f` (`Extract workspace schedule delete request events`).
- `app.js` line count after extraction: 8,072.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceScheduleDeleteCancelEvents.js`: PASS.
- `node --check tests/smoke/workspace-schedule-delete-cancel-events-smoke.js`: PASS.
- `node tests/smoke/workspace-schedule-delete-cancel-events-smoke.js`: PASS.
- Local resource smoke against `http://127.0.0.1:4193/`: PASS.
- Local browser boot smoke: PASS; `index.html` referenced `src/utils/workspaceScheduleDeleteCancelEvents.js?v=lfes-authority-schedule-delete-request-events-1` and `app.js?v=lfes-authority-schedule-delete-request-events-1`.
- Hosted resource smoke against GitHub Pages: PASS.
- Signed-in live smoke: PASS; disposable PM schedule `LFES disposable schedule delete request 1779827709348` opened Delete warning, Cancel restored Delete, and no permanent delete occurred during the boundary check.
- Cleanup: PASS; manager/admin UI permanently deleted disposable schedule `7369cc0d-6462-4047-8f7e-8930009a7a32`, and data-layer verification returned `remaining: 0`.
- GitHub Actions: DEFERRED until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

## Procedure Delete-Request Events Boundary - 2026-05-26

Risk:

- Medium/high.
- The control is inside an irreversible procedure delete flow with blocker checks, but the selected boundary only opens the app-owned warning state and does not perform the permanent delete.

Intended boundary:

- Move `[data-delete-procedure]` warning-opener binding into `src/utils/workspaceProcedureDeleteCancelEvents.js`.
- Keep `requestDeleteProcedureTemplate` as an app-owned injected callback.
- Keep `[data-confirm-delete-procedure]`, permanent delete, blocker verification, procedure data/steps, render, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.

Blast radius:

- Procedure card Delete Procedure warning opener and cancel behavior.
- No permanent delete ownership, no blocker verification ownership, no Supabase mutation ownership transfer.

Rollback path:

- Restore the original `[data-delete-procedure]` loop in `bindWorkspaceEvents()`.
- Revert `src/utils/workspaceProcedureDeleteCancelEvents.js` to cancel-only ownership.
- Revert cache tags to the previous known-good value.

Implementation result:

- Expanded `src/utils/workspaceProcedureDeleteCancelEvents.js`.
- Expanded `tests/smoke/workspace-procedure-delete-cancel-events-smoke.js`.
- Updated `index.html` and hosted cache tags to `lfes-authority-procedure-delete-request-events-1`.
- App deploy commit: `5f51dc9` (`Extract workspace procedure delete request events`).
- `app.js` line count after extraction: 8,070.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceProcedureDeleteCancelEvents.js`: PASS.
- `node --check tests/smoke/workspace-procedure-delete-cancel-events-smoke.js`: PASS.
- `node tests/smoke/workspace-procedure-delete-cancel-events-smoke.js`: PASS.
- Local resource smoke against `http://127.0.0.1:4193/`: PASS.
- Local browser boot smoke: PASS; `index.html` referenced `src/utils/workspaceProcedureDeleteCancelEvents.js?v=lfes-authority-procedure-delete-request-events-1` and `app.js?v=lfes-authority-procedure-delete-request-events-1`.
- Hosted resource smoke against GitHub Pages: PASS.
- Signed-in live smoke: PASS; disposable procedure `LFES disposable procedure delete request 1779827915362` opened Delete Procedure warning, Cancel restored Delete Procedure, and no permanent delete occurred during the boundary check.
- Cleanup: PASS; manager/admin UI permanently deleted disposable procedure `2be4f6f4-c79c-4d8f-8ae5-d5f3d8a85345`, and data-layer verification returned `remaining: 0`.
- GitHub Actions: DEFERRED until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

## Part Delete-Request Events Boundary - 2026-05-26

Risk:

- Medium/high.
- The control is inside an irreversible part delete flow with inventory and document cleanup, but the selected boundary only opens the app-owned warning state and does not perform the permanent delete.

Intended boundary:

- Move only `[data-delete-part]:not(.permanent-delete-button)` warning-opener binding into `src/utils/workspacePartDeleteCancelEvents.js`.
- Keep `requestDeletePart` as an app-owned injected callback for opener behavior.
- Keep `.permanent-delete-button` binding, permanent delete, permission checks, part data, document cleanup, render, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.

Blast radius:

- Part detail Delete Part warning opener and cancel behavior.
- No permanent delete ownership, no document cleanup ownership, no Supabase mutation ownership transfer.

Rollback path:

- Restore the original non-permanent `[data-delete-part]` opener loop in `bindWorkspaceEvents()`.
- Revert `src/utils/workspacePartDeleteCancelEvents.js` to cancel-only ownership.
- Revert cache tags to the previous known-good value.

Implementation result:

- Expanded `src/utils/workspacePartDeleteCancelEvents.js`.
- Expanded `tests/smoke/workspace-part-delete-cancel-events-smoke.js`.
- Updated `index.html` and hosted cache tags to `lfes-authority-part-delete-request-events-1`.
- App deploy commit: `130b6e6` (`Keep part permanent delete binding in app`), correcting the initial selector split from `38abae3`.
- `app.js` line count after corrected extraction: 8,071.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/workspacePartDeleteCancelEvents.js`: PASS.
- `node --check tests/smoke/workspace-part-delete-cancel-events-smoke.js`: PASS.
- `node tests/smoke/workspace-part-delete-cancel-events-smoke.js`: PASS.
- Local resource smoke against `http://127.0.0.1:4193/`: PASS.
- Local browser boot smoke: PASS; `index.html` referenced `src/utils/workspacePartDeleteCancelEvents.js?v=lfes-authority-part-delete-request-events-1` and `app.js?v=lfes-authority-part-delete-request-events-1`.
- Hosted resource smoke against GitHub Pages: PASS.
- Signed-in live smoke: PASS; disposable part `LFES disposable part delete request 1779828398671 hose` opened Delete Part warning, Cancel restored only the non-permanent Delete Part button, and no permanent delete occurred during the boundary check.
- Cleanup: PASS; manager/admin UI permanently deleted disposable part `b60bc539-c336-4a77-bd6e-df939cc7431b`, and data-layer verification returned `remaining: 0`.
- GitHub Actions: DEFERRED until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

LFES catch:

- Part delete uses `data-delete-part` for both warning opener and permanent delete. The boundary must exclude `.permanent-delete-button`, and `app.js` must retain the permanent delete binding.

## Equipment Confirm-Delete Events Boundary - 2026-05-26

Risk:

- High.
- The control performs an irreversible equipment delete, but the selected boundary only transfers event binding and calls the app-owned delete callback.

Intended boundary:

- Move `[data-confirm-delete-asset]` binding into `src/utils/workspaceAssetDeleteCancelEvents.js`.
- Keep `deleteAsset` as an app-owned injected callback.
- Keep permanent delete implementation, permission checks, link-count guards, equipment data, render, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` in `app.js`.

Blast radius:

- Equipment Detail permanent delete button for disposable/unlinked equipment.
- No Supabase mutation ownership transfer and no storage cleanup ownership transfer.

Rollback path:

- Restore the original `[data-confirm-delete-asset]` loop in `bindWorkspaceEvents()`.
- Revert `src/utils/workspaceAssetDeleteCancelEvents.js` to warning opener/cancel ownership.
- Revert cache tags to the previous known-good value.

Implementation result:

- Expanded `src/utils/workspaceAssetDeleteCancelEvents.js`.
- Expanded `tests/smoke/workspace-asset-delete-cancel-events-smoke.js`.
- Updated `index.html` and hosted cache tags to `lfes-authority-asset-delete-confirm-events-1`.
- App deploy commit: `a08c847` (`Extract workspace asset delete confirm events`).
- `app.js` line count after extraction: 8,066.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceAssetDeleteCancelEvents.js`: PASS.
- `node --check tests/smoke/workspace-asset-delete-cancel-events-smoke.js`: PASS.
- `node tests/smoke/workspace-asset-delete-cancel-events-smoke.js`: PASS.
- Local resource smoke against `http://127.0.0.1:4193/`: PASS.
- Local browser boot smoke: PASS; `index.html` referenced `src/utils/workspaceAssetDeleteCancelEvents.js?v=lfes-authority-asset-delete-confirm-events-1` and `app.js?v=lfes-authority-asset-delete-confirm-events-1`.
- Hosted resource smoke against GitHub Pages: PASS.
- Signed-in live smoke: PASS; disposable equipment `LFES disposable asset delete confirm 1779828673007` opened Delete Equipment warning, Permanently Delete removed the disposable from Equipment, and no unrelated equipment was touched.
- Cleanup/data-layer verification: PASS; disposable equipment `9fb2daa2-1e13-4fbe-8d8d-52a2dd0591e2` returned `remaining: 0`.
- GitHub Actions: DEFERRED until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

## Request Confirm-Delete Events Boundary - 2026-05-26

- Risk: High. The control performs an irreversible request delete, but the boundary only transfers event binding and calls the app-owned `deleteMaintenanceRequest` callback.
- Scope: moved `[data-confirm-delete-request]` into `src/utils/workspaceRequestDeleteCancelEvents.js`; permanent delete implementation, request conversion, request-origin Quick Fix, request data, render, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` remain in `app.js`.
- Verification: static checks passed, targeted mock-DOM Request delete event smoke passed, local resource and local browser boot smokes passed, hosted resource smoke passed, and signed-in live disposable request `LFES disposable request delete confirm 1779829050535` was permanently deleted with data-layer verification for `d5459c21-ce23-4292-a113-87dcb776078a` returning `remaining: 0`.
- App deploy commit: `ee4fd54` (`Extract workspace request delete confirm events`).
- `app.js` line count after extraction: 8,064.

## PM Schedule Confirm-Delete Events Boundary - 2026-05-26

- Risk: High. The control performs an irreversible PM schedule delete, but the boundary only transfers event binding and calls the app-owned `deletePreventiveSchedule` callback.
- Scope: moved `[data-confirm-delete-schedule]` into `src/utils/workspaceScheduleDeleteCancelEvents.js`; permanent delete implementation, PM generation, schedule data, render, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` remain in `app.js`.
- Verification: static checks passed, targeted mock-DOM PM schedule delete event smoke passed, local resource and local browser boot smokes passed, hosted resource smoke passed, and signed-in live disposable PM schedule `LFES disposable schedule delete confirm 1779829718646` was permanently deleted with data-layer verification for `41647041-eeb1-45ad-801d-e8a3431bc842` returning `remaining: 0`.
- App deploy commit: `a192f51` (`Extract workspace schedule delete confirm events`).
- `app.js` line count after extraction: 8,062.

Result:

- Behavior changed: no observed behavior change.
- Continue only with another bounded local UI/read-only event seam unless a separate high-risk plan is written.

## Procedure Confirm-Delete Events Boundary - 2026-05-26

- Risk: High. The control performs an irreversible procedure delete, but the boundary only transfers event binding and calls the app-owned `deleteProcedureTemplate` callback.
- Scope: moved `[data-confirm-delete-procedure]` into `src/utils/workspaceProcedureDeleteCancelEvents.js`; permanent delete implementation, blocker verification, procedure data/steps, render, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` remain in `app.js`.
- Verification: static checks passed, targeted mock-DOM Procedure delete event smoke passed, local resource and local browser boot smokes passed, hosted resource smoke passed, and signed-in live disposable procedure `LFES disposable procedure delete confirm 1779829924465` was permanently deleted with data-layer verification for `ce2d93ad-b88d-46d6-abeb-9ebaaf34ac0e` returning `remaining: 0`.
- App deploy commit: `492d9bb` (`Extract workspace procedure delete confirm events`).
- `app.js` line count after extraction: 8,060.

Result:

- Behavior changed: no observed behavior change.
- Continue only with another bounded local UI/read-only event seam unless a separate high-risk plan is written.

## Team Invite Confirm-Cancel Events Boundary - 2026-05-26

- Risk: High. The control confirms an invite cancellation through an app-owned RPC path, but the boundary only transfers event binding and calls the injected `cancelTeamInvite` callback.
- Scope: moved `[data-confirm-cancel-invite]` into `src/utils/workspaceTeamInviteCancelEvents.js`; invite creation, cancel RPC implementation, team invite data/reload, render, auth/company/location state, Supabase/RLS, broad `renderWorkspace()`, and broad `bindWorkspaceEvents()` remain in `app.js`.
- Verification: static checks passed, targeted mock-DOM Team invite cancel event smoke passed, local resource and local browser boot smokes passed, hosted resource smoke passed, and signed-in live disposable invite `lfes.invite.confirm.1779830518673@maintainops.test` was canceled with data-layer lookup returning `remainingVisible: 0`.
- App deploy commit: `e984132` (`Extract workspace team invite confirm events`).
- `app.js` line count after extraction: 8,058.
- LFES catch: in-app browser virtual clipboard blocked `fill`/`type`, but raw keypress text entry worked after verifying the typed field value.

Result:

- Behavior changed: no observed behavior change.
- Continue only with another bounded local UI/read-only event seam unless a separate high-risk plan is written.

## Public Request Link Copy Button Boundary - 2026-05-26

Hard boundary selected:

- Public request link copy button:
  - `[data-copy-public-request-link]`

Risk:

- Medium risk. It is in the QR/public request settings area and touches clipboard feedback, but the selected boundary only copies an existing URL and resets button text.

Intended boundary:

- Move only the copy-button binding and temporary label feedback to `src/utils/workspacePublicRequestLinkCopyEvents.js`.
- Keep link creation, enable/disable/regeneration, public request link data, clipboard helper implementation, render ownership, auth/company/location, Supabase/RLS, and broad `bindWorkspaceEvents()` in `app.js`.

Rollback path:

- Revert `e38e537` or restore the original `[data-copy-public-request-link]` listener block in `app.js`.

Implementation:

- Added `src/utils/workspacePublicRequestLinkCopyEvents.js`.
- Added `tests/smoke/workspace-public-request-link-copy-events-smoke.js`.
- Updated `index.html` and the hosted cache tags to `lfes-authority-public-request-link-copy-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- App deploy commit: `e38e537` (`Extract workspace public request link copy events`).
- `app.js` line count is 8,079.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/workspacePublicRequestLinkCopyEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-public-request-link-copy-events-smoke.js`: PASS.
- `node tests/smoke/workspace-public-request-link-copy-events-smoke.js`: PASS.
- Local resource smoke against `http://127.0.0.1:4193/`: PASS.
- Local browser boot smoke: PASS with script/cache tags present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Settings had enabled Copy QR Link buttons; clicking one produced `Copy failed` in the clipboard-limited in-app browser and reset to `Copy QR Link`, with no link mutation.
- GitHub Actions verifier: deferred until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

Catch:

- In the in-app browser clipboard-limited environment, `Copy failed` is acceptable for this smoke if the temporary feedback/reset behavior is correct. Clipboard success itself belongs to browser capability, not app data behavior.

Result:

- Behavior changed: no observed behavior change.
- Continue only with another bounded local UI/read-only event seam unless a separate high-risk plan is written.

## Asset-Specific Quick Fix Opener Boundary - 2026-05-26

Hard boundary selected:

- Asset-specific Quick Fix opener:
  - `[data-quick-fix-asset]`

Risk:

- High-risk but contained. It enters a mutation-capable form with an equipment preselected, but the selected boundary only opens that form.

Intended boundary:

- Move only the asset-specific Quick Fix opener to `src/utils/workspaceAssetQuickFixEvents.js`.
- Keep Quick Fix submit, request-specific Quick Fix, validation, created work records, asset data, render ownership, auth/company/location, Supabase/RLS, and broad `bindWorkspaceEvents()` in `app.js`.

Rollback path:

- Revert `73f9246` or restore the original `[data-quick-fix-asset]` listener block in `app.js`.

Implementation:

- Added `src/utils/workspaceAssetQuickFixEvents.js`.
- Added `tests/smoke/workspace-asset-quick-fix-events-smoke.js`.
- Updated `index.html` and the hosted cache tags to `lfes-authority-asset-quick-fix-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- App deploy commit: `73f9246` (`Extract workspace asset quick fix events`).
- `app.js` line count is 8,084.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceAssetQuickFixEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-asset-quick-fix-events-smoke.js`: PASS.
- `node tests/smoke/workspace-asset-quick-fix-events-smoke.js`: PASS.
- Local resource smoke against `http://127.0.0.1:4193/`: PASS.
- Local browser boot smoke: PASS with script/cache tags present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Equipment detail for `New thalmann` opened Quick Fix For This Equipment, rendered `#quick-fix-form` with `New thalmann` selected, and did not render Work Order create or Report Issue forms. No Quick Fix submit occurred.
- GitHub Actions verifier: deferred until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

Catch:

- Equipment list cards open detail through the `.asset-card`/`[data-asset-id]` card itself, not `[data-open-asset]`; open the card before targeting `[data-quick-fix-asset]`.

Result:

- Behavior changed: no observed behavior change.
- Continue only with another bounded local UI/read-only event seam unless a separate high-risk plan is written.

## Quick Fix Command Opener Boundary - 2026-05-26

Hard boundary selected:

- Main Quick Fix command opener:
  - `[data-command-action="quick-fix"]`

Risk:

- High-risk but contained. It enters a mutation-capable form, but the selected boundary only opens that form and clears conflicting UI state.

Intended boundary:

- Move only the main Quick Fix command opener to `src/utils/workspaceQuickFixCommandEvents.js`.
- Keep Quick Fix submit, request-specific Quick Fix, asset-specific Quick Fix, validation, created work records, render ownership, auth/company/location, Supabase/RLS, and broad `bindWorkspaceEvents()` in `app.js`.

Rollback path:

- Revert `fc21d6e` or restore the original `[data-command-action="quick-fix"]` branch in `app.js`.

Implementation:

- Added `src/utils/workspaceQuickFixCommandEvents.js`.
- Added `tests/smoke/workspace-quick-fix-command-events-smoke.js`.
- Updated `index.html` and the hosted cache tags to `lfes-authority-quick-fix-command-events-1`.
- Updated `tests/smoke/resource-load.spec.js`.
- App deploy commit: `fc21d6e` (`Extract workspace quick fix command events`).
- `app.js` line count is 8,084.

Verification:

- `node --check app.js`: PASS.
- `node --check src/utils/workspaceQuickFixCommandEvents.js`: PASS.
- `node --check tests/smoke/resource-load.spec.js`: PASS.
- `node --check tests/smoke/workspace-quick-fix-command-events-smoke.js`: PASS.
- `node tests/smoke/workspace-quick-fix-command-events-smoke.js`: PASS.
- Local resource smoke against `http://127.0.0.1:4193/`: PASS.
- Local browser boot smoke: PASS with script/cache tags present.
- Hosted GitHub Pages resource smoke: PASS.
- Signed-in live smoke: PASS. Main Quick Fix rendered `#quick-fix-form`; Work Order create and Report Issue forms did not render; no Quick Fix submit occurred.
- GitHub Actions verifier: deferred until after the current 21-run because the unauthenticated GitHub API verifier is rate-limited.

Catch:

- Quick Fix command smoke must remain open-form/no-submit unless a separate phase explicitly selects Quick Fix submit/mutation.

Result:

- Behavior changed: no observed behavior change.
- Continue only with another bounded local UI/read-only event seam unless a separate high-risk plan is written.
