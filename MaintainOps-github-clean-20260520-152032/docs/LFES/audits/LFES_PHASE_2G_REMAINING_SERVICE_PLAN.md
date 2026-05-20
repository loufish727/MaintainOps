# LFES Phase 2G Remaining Service Wrapper Plan

Planning only. No app behavior, Supabase policies, SQL, rendering, workflow logic, or service files were changed for this pass.

## Scope

This plan reviews the remaining direct Supabase calls in `app.js` after LFES Phase 2F. The purpose is to choose the next safest service-wrapper extraction while preserving:

- working app behavior,
- company isolation,
- location persistence,
- public QR request intake,
- existing Debug Protocol coverage,
- reviewability and engineering continuity.

Service wrappers are an organization boundary, not a security boundary. RLS and `private.is_company_member(company_id)` remain the enforcement boundary.

## Current Service Coverage

Already extracted:

- `src/services/locationsService.js`
- `src/services/profilesService.js`
- `src/services/partsService.js`
- `src/services/assetsService.js`
- `src/services/workOrdersService.js`
- `src/services/companyService.js`

Remaining Supabase access in `app.js` is now mostly in:

- request queues and request conversion,
- preventive schedules,
- procedure templates and procedure steps,
- public QR request intake and public request link management,
- app issue reports,
- messages and message threads,
- work-order detail relationship loaders,
- storage signed URLs and uploads,
- workflow mutations and delete guards.

## 1. Remaining Supabase Read Calls In `app.js`

### Public QR intake reads

- `get_public_request_intake` RPC in public QR display/intake flows.
- Reads public request metadata by token through scoped RPCs.

Notes:

- This route runs before signed-in app state exists.
- Anonymous access must remain RPC-scoped.
- Do not replace this with direct table reads.

### Company logo signed URL read

- Private storage signed URL for `company-logos`.

Notes:

- Storage behavior should not be moved until storage boundaries are mapped separately.

### Maintenance request reads

- `maintenance_requests` page/list read.
- `maintenance_requests` count queries for Active, Converted, and All request filters.
- Request search/location/equipment filtering support.

Notes:

- The request screen has recent live fixes around Active/Converted separation.
- Query fallbacks for relationship metadata must remain intact.

### Work-order related search reads

- `work_order_parts` related search lookup.
- Generic relation-table search helper for work-order related comments/photos/events/checklist matches.

Notes:

- These affect global search and should remain stable until search behavior has dedicated verification.

### Preventive schedule reads

- `preventive_schedules` list with linked asset data.

Notes:

- Low-to-medium risk as a future read-only extraction.
- PM generation and schedule mutations must remain in `app.js`.

### Procedure template and step reads

- `procedure_templates` with `procedure_steps(*)`.

Notes:

- Medium risk because procedure steps feed PM/work-order checklist behavior.
- Read-only extraction is possible later, but checklist verification is required.

### App issue report reads

- `app_issue_reports` list in main company load.
- `app_issue_reports` reload path after issue report changes.

Notes:

- Safest remaining read-only extraction candidate because the surface is isolated and company-scoped.
- Create/update issue report mutations should stay in `app.js`.

### Message center reads

- `message_threads`
- `message_thread_members`
- `messages`
- `message_reads`

Notes:

- Higher risk because the message center depends on multi-table state, active thread selection, unread/read state, and setup fallbacks.

### Public request link reads

- `public_request_links` list for company/location QR management.

Notes:

- Read-only extraction is possible, but link ensure/regenerate/deactivate controls should stay in `app.js`.

### Work-order detail relationship reads

- `work_order_comments`
- `work_order_photos`
- `work_order_parts` with linked `parts`
- `part_documents`
- `work_order_events`
- `work_order_step_results`

Notes:

- These support work-order detail, history, parts used, photos, checklist state, and search.
- They are read-only candidates, but cross-cutting and should not be moved until work-order detail QA is planned.

### Storage signed URL reads

- `work-order-photos`
- `maintenance-request-photos`
- `part-documents`

Notes:

- Signed URL reads are lower risk than uploads/deletes, but still storage-boundary sensitive.
- Keep storage wrappers for a later dedicated storage phase.

## 2. Remaining Supabase Mutation Calls In `app.js`

The following mutation categories remain in `app.js` and should not move in Phase 2G:

- Public QR request submit through `submit_public_location_request`.
- Company create/profile/invite RPCs:
  - `create_company`
  - `ensure_company_profile`
  - `accept_company_invites`
  - `update_company_member_role`
  - `create_company_invite`
  - `cancel_company_invite`
- Starter asset seed insert during setup.
- Asset create/update/status/delete and Quick Fix asset creation.
- Preventive schedule create/update/delete/generate-work updates.
- Procedure template and step create/delete.
- Team/profile/mobile-tech updates.
- Message thread create, member insert, read receipt upsert, message insert, thread timestamp update.
- Company settings update and logo upload/set RPC.
- App issue report insert/update.
- Public request link ensure/update/regenerate/deactivate.
- Part create/update/use/restock/delete/source rename.
- Part document storage upload/delete and metadata insert.
- Work-order part usage insert and part quantity update.
- Maintenance request create/convert/delete/photo attach.
- Work-order step result upsert.
- Work-order delete/assign/update workflow mutations.
- Work-order comment insert.
- Work-order photo storage upload/delete and metadata insert.
- Work-order event insert.

## 3. High-Risk Workflow Calls That Should NOT Move Yet

Keep these in `app.js` until architecture boundaries and test coverage are stronger:

- Auth/session startup and login fallback.
- Active company selection.
- Active location persistence and hard-save precedence.
- Invite acceptance and default location onboarding.
- Public QR submit and request photo attach.
- Request conversion to work order.
- Quick Fix creation.
- Full work-order creation and edit/update flows.
- PM generation.
- Work-order status/completion/safety-device logic.
- Technician assignment guardrails.
- Equipment-driven location routing warnings.
- Delete guards and live delete verification.
- Storage uploads/removes.
- Message mutations and read-state updates.
- Work-order events/history recording.

Reason:

These are operational transitions, not just database calls. Moving them too early could hide assumptions around role permissions, location routing, history, cleanup, or company isolation.

## 4. Candidate Next Read-Only Extraction, Safest To Riskiest

### 1. `appIssueReportsService` read-only

Candidate functions:

- `listAppIssueReports(supabaseClient, companyId)`

Possible moved reads:

- company-scoped `app_issue_reports` list from company load.
- company-scoped `app_issue_reports` reload after status changes.

Dependencies:

- `supabaseClient`
- explicit `companyId`
- existing report rendering and status mutation remain in `app.js`

Risks:

- Low. The issue-report list is isolated compared with work orders, requests, PM, procedures, and messages.
- Do not move insert/update status workflows in this phase.

Required Debug Protocol:

- Static checks for `app.js` and all service files.
- Signed-in startup.
- Taylor Metal Products loads.
- Salem remains active.
- Settings/Admin Setup area opens where issue reports are visible.
- Submit an app issue report only if safe QA data cleanup is planned.
- Work Orders, Equipment, Parts, Team, and Settings still load.
- No missing script errors or visible app errors.

### 2. `preventiveSchedulesService` read-only

Candidate functions:

- `listPreventiveSchedules(supabaseClient, companyId)`

Dependencies:

- explicit `companyId`
- current select shape with linked asset data
- PM rendering remains in `app.js`

Risks:

- Medium-low. The list read is simple, but PM generation is operationally important.
- Do not move create/delete/generate/update-next-due workflows.

Required Debug Protocol:

- PM page loads.
- Existing PM schedules render.
- Create/generate/delete PM smoke only if using safe QA data and mutation code was untouched.
- Work Orders remain normal after PM page load.

### 3. `proceduresService` read-only

Candidate functions:

- `listProcedureTemplatesWithSteps(supabaseClient, companyId)`

Dependencies:

- explicit `companyId`
- current `procedure_steps(*)` relationship shape
- checklist rendering and procedure assignment remain in `app.js`

Risks:

- Medium. Procedure steps feed work-order checklist behavior.
- A small query-shape change could break checklist population.

Required Debug Protocol:

- Procedures page loads.
- Procedure detail/steps render.
- Work order with linked procedure still shows checklist steps.
- Step-result check/uncheck still works if safe QA data exists.

### 4. `publicRequestLinksService` read-only

Candidate functions:

- `listPublicRequestLinks(supabaseClient, companyId)`

Dependencies:

- explicit `companyId`
- QR link rendering stays in `app.js`

Risks:

- Medium. The read is simple, but QR links affect outside-company users.
- Do not move link ensure/regenerate/deactivate.

Required Debug Protocol:

- Settings/Admin QR area loads.
- Existing QR links render for each location.
- Public QR form loads from a known token.
- Manager can still see submitted public request.

### 5. `maintenanceRequestsService` read-only

Candidate functions:

- `fetchRequestPage(supabaseClient, params)`
- `countRequests(supabaseClient, params)`

Dependencies:

- explicit `companyId`
- explicit `locationId` when location scope is active
- request status/filter state
- `REQUEST_RELATION_SELECT`
- fallback select path
- Active/Converted/All logic
- request search text and equipment matching

Risks:

- Medium-high. Request flow was recently cleaned up and is central to live testing.
- Active requests must not mix with converted requests again.
- Public/internal request visibility must remain location-correct.

Required Debug Protocol:

- Requests Active/Converted/All filters.
- Internal request submit from non-Active filter returns to Active.
- Convert request to work order.
- Public QR submit and manager visibility.
- Converted requests remain out of Active.

### 6. `workOrderRelationsService` read-only

Candidate functions:

- `listWorkOrderComments(supabaseClient, companyId, workOrderIds)`
- `listWorkOrderPhotos(supabaseClient, companyId, workOrderIds)`
- `listWorkOrderParts(supabaseClient, companyId, workOrderIds)`
- `listPartDocuments(supabaseClient, companyId, partIds)`
- `listWorkOrderEvents(supabaseClient, companyId, workOrderIds)`
- `listWorkOrderStepResults(supabaseClient, companyId, workOrderIds)`

Dependencies:

- explicit `companyId`
- current visible/paged work-order IDs
- storage signed URL helpers
- work-order detail rendering
- search relation behavior

Risks:

- High. These reads cross work-order detail, history, comments, parts, photos, checklist, and search.
- Do not start here unless the team wants a work-order-detail-focused QA pass.

Required Debug Protocol:

- Open work-order detail.
- Comments load and add still works.
- Photos load and upload still works if safe.
- Parts used load and Use Part still works.
- History/events load.
- Checklist results load and toggle.
- Search finds related comments/parts/history where test data exists.

### 7. `messagesService` read-only

Candidate functions:

- `listMessageThreads(supabaseClient, companyId, userId)`
- `listMessageThreadMembers(supabaseClient, threadIds)`
- `listMessages(supabaseClient, threadIds)`
- `listMessageReads(supabaseClient, threadIds, userId)`

Dependencies:

- explicit `companyId`
- signed-in user ID
- active thread state
- message setup fallback behavior
- unread/read logic

Risks:

- High. Multi-table read state is easy to regress without automated tests.
- Message mutations should not move yet.

Required Debug Protocol:

- Messages page loads.
- Existing threads load.
- Active thread selection persists.
- Send/reply still works if safe.
- Read/unread state does not break visible behavior.

### 8. Storage signed URL helper

Candidate functions:

- signed URL helpers for company logos, work-order photos, request photos, and part documents.

Dependencies:

- bucket names
- storage paths
- error tolerance
- photo/document rendering

Risks:

- Medium-high. Signed URLs are read-only, but storage privacy boundaries matter.
- Storage upload/delete should remain blocked until a dedicated storage phase.

Required Debug Protocol:

- Company logo displays.
- Work-order photo thumbnails/open links display.
- Request photo thumbnails/open links display.
- Part document links display.

## 5. Dependencies For Each Candidate

General dependencies all future service wrappers must preserve:

- `supabaseClient` passed explicitly.
- `companyId` passed explicitly for company-owned tables.
- `locationId` passed explicitly when the current behavior scopes by location.
- Current select strings and relationship fallbacks preserved.
- Current order/range/count behavior preserved.
- Current user-facing error handling remains in `app.js` unless a later phase explicitly approves moving it.

Specific dependency notes:

- Requests depend on Active/Converted/All state and location filtering.
- PM depends on assets and next-due workflow state.
- Procedures depend on nested steps and work-order checklist behavior.
- Public QR links depend on location records and outside-user token flow.
- App issue reports depend mainly on company scope and admin/settings rendering.
- Messages depend on user ID, active thread, members, messages, reads, and setup fallbacks.
- Work-order relationships depend on currently loaded work-order IDs and signed URL generation.

## 6. Risks For Each Candidate

- `appIssueReportsService`: low risk, isolated read surface.
- `preventiveSchedulesService`: medium-low risk, simple read but PM workflow is important.
- `proceduresService`: medium risk, nested steps can affect checklists.
- `publicRequestLinksService`: medium risk, QR link visibility affects public request entry.
- `maintenanceRequestsService`: medium-high risk, request queue behavior is recently stabilized.
- `workOrderRelationsService`: high risk, cross-cuts detail/history/search.
- `messagesService`: high risk, multi-table user/read state.
- storage helpers: medium-high risk, private bucket and signed URL boundaries.

## 7. Required Debug Protocol Checks For Each Candidate

Every extraction requires:

- `node --check app.js`
- `node --check supabase-config.js`
- `node --check` all `src/utils` files
- `node --check` all existing `src/services` files
- signed-in app load
- Taylor Metal Products load
- Salem remains active after reload
- Work Orders, Equipment, Parts, Team, and Settings load
- no missing script errors
- no visible app errors
- docs updated in `docs/QA_LOG.md`, `docs/CURRENT_HANDOFF.md`, and `docs/NEXT_STEPS.md`

Candidate-specific checks:

- Issue reports: Settings/Admin issue report list and optional QA report create/status if safe.
- PM: PM page list, generate path if safe, no work-order disruption.
- Procedures: procedure list, step display, linked work-order checklist.
- Public links: QR links render, known public link opens, QR submit remains functional.
- Requests: Active/Converted/All, internal submit, public submit, convert request.
- Work-order relations: detail comments/photos/parts/history/checklist/search.
- Messages: message list/thread/reply/read state.
- Storage: thumbnails/open links for every bucket touched.

## 8. Should Extraction Pause?

Yes for workflow-heavy areas.

Continue only with narrow read-only extractions that have simple company-scoped query shapes. Pause before moving:

- request conversion,
- public QR submit,
- work-order creation/update/status/assignment/delete,
- PM generation,
- procedure mutations,
- storage upload/delete,
- comments/photos/checklist mutations,
- message mutations,
- company/team/invite mutations,
- active location persistence.

These areas should wait until app.js architecture and current workflow dependencies are documented more deeply or covered by stronger browser smoke automation.

## 9. Recommended Next Single Extraction

Recommended Phase 2G implementation target:

- `src/services/appIssueReportsService.js`
- read-only only
- one wrapper:
  - `listAppIssueReports(supabaseClient, companyId)`

Why this is safest:

- It is company-scoped and simple.
- It has a low number of dependencies.
- It is not part of Quick Fix, request conversion, PM generation, work-order status, or public QR submit.
- It gives the team another low-risk service extraction checkpoint before touching requests, PM, procedures, messages, or storage.

Implementation boundaries for the next approved phase:

- Move only app issue report reads.
- Do not move app issue report create/update.
- Do not move rendering or event binding.
- Do not change SQL/RLS.
- Preserve current ordering and error behavior.
- Run full static checks and a signed-in checkpoint afterward.

Recommended next prompt after approval:

```text
Begin LFES Phase 2G service-wrapper extraction only.

Scope:
- Create appIssueReportsService only.
- Move only low-risk app_issue_reports read/list helpers from app.js into src/services/appIssueReportsService.js.
- Do not move app issue report create/update mutations.
- Do not move rendering.
- Do not move event binding.
- Do not change Supabase policies or SQL.
- Preserve behavior exactly.

After extraction, update index.html script loading, run static checks, verify signed-in app behavior, update QA_LOG.md, CURRENT_HANDOFF.md, and NEXT_STEPS.md, and stop.
```

## What Remains Blocked

Blocked until separately approved and debug-planned:

- `maintenanceRequestsService` read/count extraction.
- Public QR intake/submit service extraction.
- Public request photo/storage service extraction.
- `preventiveSchedulesService` mutations or PM generation.
- `proceduresService` mutations or checklist workflow movement.
- `messagesService`.
- Work-order relationship service extraction.
- Storage service extraction.
- Any workflow mutation service.
- Any auth/session/company switching/default location movement.
- Any Supabase SQL/RLS changes.
