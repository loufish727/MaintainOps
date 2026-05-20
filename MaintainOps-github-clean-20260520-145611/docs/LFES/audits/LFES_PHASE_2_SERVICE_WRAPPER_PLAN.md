# LFES Phase 2 Service Wrapper Extraction Plan

Planning only. Do not extract service wrappers until this plan is approved.

## Scope

This plan identifies the safest Supabase/database calls to move later from `app.js` into small service wrapper files. It does not change app behavior, business logic, Supabase policies, RLS, UI, or workflow rules.

The goal is engineering continuity:

- make database boundaries easier to review,
- keep company isolation visible,
- reduce `app.js` responsibility concentration,
- preserve existing Debug Protocol behavior,
- avoid hiding location and role assumptions during refactor.

## Non-Negotiable Boundaries

- Every service wrapper must receive `companyId` explicitly for company-owned records.
- Location-scoped queries must receive `locationId` explicitly when the current behavior uses active location filtering.
- Service wrappers must not bypass RLS, use service-role keys, or weaken `private.is_company_member(company_id)`.
- Service wrappers must preserve current query shapes, fallback behavior, timeout behavior, and error messages unless a later behavior-change phase explicitly approves a change.
- Public QR request service wrappers must continue using scoped RPCs, not direct anonymous table access.
- Auth/session and app startup should not move in Phase 2.

## Candidate Service Files

Recommended future files:

- `src/services/workOrdersService.js`
- `src/services/assetsService.js`
- `src/services/partsService.js`
- `src/services/locationsService.js`
- `src/services/companyService.js`
- `src/services/profilesService.js`
- `src/services/publicRequestsService.js`
- `src/services/storageService.js` only as a later support module, not first.

For Phase 2 implementation, create services one at a time and load them before `app.js` in `index.html`, matching the existing non-module script pattern used by `src/utils`.

## Recommended Extraction Order

1. `locationsService` read-only functions.
2. `profilesService` read-only profile/member/invite loaders.
3. `partsService` read-only and simple scoped part mutations.
4. `assetsService` read-only/simple mutations, excluding delete guards at first.
5. `workOrdersService` read-only list/count/search helpers only.
6. `companyService` simple company/member RPC wrappers.
7. `publicRequestsService` only after request flow has a fresh debug pass.
8. Storage wrappers last.

This order starts with lower-risk reads and simple updates, then approaches operational workflow mutations after service boundaries are proven.

## 1. locationsService

Candidate file:

- `src/services/locationsService.js`

Exact functions/queries that could move:

- From `loadCompanyData()`:
  - `supabaseClient.from("locations").select("*").eq("company_id", activeCompanyId).order("name")`
- From `createLocation()`:
  - `supabaseClient.from("locations").insert(...)`
- Later, public-link location support may use the same read function, but do not combine admin public-link behavior yet.

Suggested wrapper names:

- `MaintainOpsLocationsService.listLocations(companyId)`
- `MaintainOpsLocationsService.createLocation(companyId, payload)`

Dependencies:

- `supabaseClient`
- `companyId`
- current location schema readiness behavior in `app.js`
- existing `locationsReady` flag remains in `app.js`

Risks:

- If the wrapper hides `company_id`, reviewer visibility drops.
- If ordering changes, location selector and default active location behavior can drift.
- If `createLocation` error handling moves too much, setup warnings could change.

Required Debug Protocol checks:

- Signed-in startup loads company and locations.
- Active location selector lists Auburn, Riverside, Sacramento, Salem, Spokane.
- Switch location, reload, confirm recent location persists.
- Add a temporary QA location only if safe, then delete manually only if a delete path exists. Otherwise skip location write smoke.
- Confirm Work Orders/Equipment/Parts reload after location switch.

Company isolation notes:

- `company_id` must stay explicit in every call.
- Do not introduce an all-locations default work queue.

## 2. profilesService and company/team read wrappers

Candidate files:

- `src/services/profilesService.js`
- `src/services/companyService.js`

Exact functions/queries that could move:

- `loadProfiles()`:
  - `supabaseClient.from("profiles").select("user_id, full_name, mobile_tech").eq("company_id", activeCompanyId)`
- `loadMembers()`:
  - `supabaseClient.from("company_members").select("*").eq("company_id", activeCompanyId).order("created_at", { ascending: true })`
- `loadTeamInvites()`:
  - first query with `default_location_id`
  - retry query without `default_location_id`
- `loadCompanies()`:
  - `supabaseClient.rpc("get_my_companies")`
- Later simple RPC wrappers:
  - `update_company_member_role`
  - `create_company_invite`
  - `cancel_company_invite`
  - `accept_company_invites`
  - `ensure_company_profile`

Suggested wrapper names:

- `MaintainOpsProfilesService.listProfiles(companyId)`
- `MaintainOpsProfilesService.listMembers(companyId)`
- `MaintainOpsProfilesService.listTeamInvites(companyId, options)`
- `MaintainOpsCompanyService.getMyCompanies()`
- `MaintainOpsCompanyService.acceptInvites()`

Dependencies:

- `supabaseClient`
- `activeCompanyId`
- `session.user.id` for some later mutations
- `teamInvitesReady` fallback behavior remains in `app.js` initially
- `normalizeRole()` remains in `app.js` or utility layer

Risks:

- Invite/default-location behavior is still a known real-user QA gap.
- Team invite fallback for missing `default_location_id` must be preserved exactly.
- Role mutation wrappers can accidentally hide permission errors that managers/admins need to see.

Required Debug Protocol checks:

- Signed-in startup company load.
- Team page opens.
- My Profile shows Mobile tech.
- Team role UI shows only Technician, Manager, Admin.
- Pending Invites load without setup warning.
- Manager role-change smoke only if safe.
- Invite default location real-user QA remains required before deeper team refactor.

Company isolation notes:

- `get_my_companies` and `private.is_company_member(company_id)` remain the core SaaS boundary.
- Do not infer company access from UI-selected company alone.

## 3. partsService

Candidate file:

- `src/services/partsService.js`

Exact functions/queries that could move:

- From `loadCompanyData()`:
  - `supabaseClient.from("parts").select("*").eq("company_id", activeCompanyId).order("name")`
- `createPart()` insert:
  - `supabaseClient.from("parts").insert(payload).select("id").single()`
- `restockPart()` update:
  - `.from("parts").update({ quantity_on_hand }).eq("id", part.id).eq("company_id", activeCompanyId)`
- `usePartFromInventory()` update:
  - `.from("parts").update({ quantity_on_hand: nextQuantity }).eq("id", part.id).eq("company_id", activeCompanyId)`
- `updatePart()` update:
  - `.from("parts").update(payload).eq("id", partId).eq("company_id", activeCompanyId)`
- `renamePartSource()` update:
  - `.from("parts").update({ supplier_name }).eq("company_id", activeCompanyId).eq("supplier_name", oldSource)`
- `deletePart()` delete and verification select:
  - delete by `id` and `company_id`
  - verification `select("id").eq("id", id).eq("company_id", activeCompanyId).maybeSingle()`
- Later:
  - `uploadPartDocument()` storage and `part_documents` insert should not move in the first parts extraction.

Suggested wrapper names:

- `MaintainOpsPartsService.listParts(companyId)`
- `MaintainOpsPartsService.createPart(payload)`
- `MaintainOpsPartsService.updatePart(companyId, partId, payload)`
- `MaintainOpsPartsService.updatePartQuantity(companyId, partId, quantityOnHand)`
- `MaintainOpsPartsService.renameSource(companyId, oldSource, newSource)`
- `MaintainOpsPartsService.deletePart(companyId, partId)`
- `MaintainOpsPartsService.findPartById(companyId, partId)`

Dependencies:

- `withOperationTimeout`
- optional schema detection:
  - `location_id`
  - `supplier_name`
  - `unit_cost`
- `partCostsReady`, `partSuppliersReady`, `locationsReady` remain in `app.js`
- `partDocumentsByPartId` and usage history stay in `app.js`

Risks:

- Part save has a history of getting stuck on "Saving"; timeout behavior must remain visible.
- Optional schema fallbacks are fragile and must not be dropped.
- Delete behavior includes traceability protection and verification; moving only the raw DB calls first is safer than moving the full delete workflow.
- Parts are location-scoped in display, but list query currently loads by company and filters in the browser; changing this would be a behavior change.

Required Debug Protocol checks:

- Parts page opens.
- Add Part creates and opens Part Detail.
- Edit Part saves.
- Use Part reduces stock.
- Restock increases stock.
- Delete a QA-only unused part through app path.
- Search finds the part by name/SKU.
- Confirm no parts setup warning appears.

Company isolation notes:

- All part writes must keep `.eq("company_id", companyId)`.
- Inserts must include `company_id` and current `location_id` behavior unchanged.

## 4. assetsService

Candidate file:

- `src/services/assetsService.js`

Exact functions/queries that could move:

- From `loadCompanyData()`:
  - `supabaseClient.from("assets").select("*").eq("company_id", activeCompanyId).order("name")`
- `createAsset()` insert:
  - `supabaseClient.from("assets").insert(payload)`
- `updateAsset()` update:
  - `.from("assets").update(payload).eq("id", activeAssetId).eq("company_id", activeCompanyId)`
- `updateAssetStatus()` update:
  - `.from("assets").update({ status }).eq("id", assetId).eq("company_id", activeCompanyId)`
- `createQuickFixAsset()` insert/select:
  - `.from("assets").insert(payload).select().single()`
- `countAssetLinkedRows()`:
  - count queries on `work_orders`, `preventive_schedules`, `maintenance_requests`
- `deleteAsset()` raw delete:
  - `.from("assets").delete().eq("id", id).eq("company_id", activeCompanyId)`

Suggested wrapper names:

- `MaintainOpsAssetsService.listAssets(companyId)`
- `MaintainOpsAssetsService.createAsset(payload)`
- `MaintainOpsAssetsService.updateAsset(companyId, assetId, payload)`
- `MaintainOpsAssetsService.updateStatus(companyId, assetId, status)`
- `MaintainOpsAssetsService.countLinkedRows(companyId, tableName, assetId)`
- `MaintainOpsAssetsService.deleteAsset(companyId, assetId)`

Dependencies:

- `withOperationTimeout`
- `activeLocationDatabaseId()`
- equipment hierarchy schema handling:
  - `isAssetHierarchySchemaError`
  - `equipmentSchemaMessage`
- location schema readiness
- delete blocker messaging remains in `app.js`

Risks:

- Equipment location drives where work/request/PM records land.
- Delete guards depend on live counts because client lists are paged.
- `createQuickFixAsset()` is part of work order creation and Quick Fix flows; it should move after basic asset CRUD wrappers prove stable.
- Asset hierarchy optional schema errors are easy to flatten accidentally.

Required Debug Protocol checks:

- Equipment page opens.
- Add QA equipment.
- Edit QA equipment name/status.
- Quick Fix with new equipment still creates equipment and work order.
- Attempt delete with linked records remains blocked.
- Delete unused QA equipment through app path.
- Cross-location equipment warning remains visible before work/request/PM saves.

Company isolation notes:

- `company_id` must be explicit on list/count/write/delete.
- Do not change the equipment-driven location routing rule.

## 5. workOrdersService

Candidate file:

- `src/services/workOrdersService.js`

Safest first extraction:

- Read-only list/count/search helpers only.

Exact functions/queries that could move first:

- `fetchPagedSearchRows(buildQuery, onRows, maxRows)`
- `scopedWorkOrderSearchQuery()` as a service query builder only if all inputs are passed:
  - `companyId`
  - `locationId`
  - `locationsReady`
- `fetchWorkOrderPage(options)` raw query portions:
  - `.from("work_orders").select(selectClause, { count: "exact" })`
  - `.range(from, to)`
- `fetchExactSearchedWorkOrderPage(options)` raw query portions.
- `addRelatedWorkOrderIdsFromParts()` raw `work_order_parts` query.
- `addRelatedWorkOrderIdsFromTable()` raw relation table query.
- `countWorkOrders()` raw count query, after current filter logic is parameterized.
- `loadComments()`, `loadPhotos()`, `loadPartsUsed()`, `loadWorkOrderEvents()`, `loadStepResults()` can become relationship service reads after list reads are stable.

Move later, not in first work-order service pass:

- `insertWithOptionalProcedure()`
- `updateWithOptionalProcedure()`
- `updateWorkOrderSafely()`
- `createWorkOrder()`
- `createQuickFix()`
- `generatePreventiveWorkOrder()`
- `convertRequestToWorkOrder()`
- `setWorkOrderStatus()`
- delete work order flow
- comments/photos/checklist mutations

Suggested wrapper names:

- `MaintainOpsWorkOrdersService.fetchPage(params)`
- `MaintainOpsWorkOrdersService.fetchByIds(params)`
- `MaintainOpsWorkOrdersService.count(params)`
- `MaintainOpsWorkOrdersService.searchDirect(params)`
- `MaintainOpsWorkOrdersService.findRelatedIdsFromParts(companyId, partIds, options)`
- `MaintainOpsWorkOrdersService.findRelatedIdsFromTable(companyId, tableName, columns, query, options)`
- `MaintainOpsWorkOrdersService.listComments(companyId, workOrderIds)`
- `MaintainOpsWorkOrdersService.listPhotos(companyId, workOrderIds)`
- `MaintainOpsWorkOrdersService.listPartsUsed(companyId, workOrderIds)`
- `MaintainOpsWorkOrdersService.listEvents(companyId, workOrderIds)`
- `MaintainOpsWorkOrdersService.listStepResults(companyId, workOrderIds)`

Dependencies:

- `WORK_ORDER_RELATION_SELECT`
- `WORK_ORDER_FALLBACK_SELECT`
- `WORK_ORDERS_PER_PAGE`
- `SEARCH_ID_PAGE_SIZE`
- `SEARCH_ID_CHUNK_SIZE`
- `activeCompanyId`
- `activeLocationId`
- `locationsReady`
- `workSort`
- `searchQuery`
- work-order filters and gauge state
- optional schema readiness flags:
  - `outcomesReady`
  - `safetyChecksReady`
  - `proceduresReady`

Risks:

- Work Orders are the core workflow surface.
- Search follows related parts/comments/photos/events/checklist results; moving this too aggressively can silently shrink search results.
- Server paging and count behavior was added to prevent large-data freezes; never change full-table read boundaries during extraction.
- Work order relation select has a fallback path for missing relationship metadata.
- Completed work should remain hidden by default unless a filter/gauge asks for it.

Required Debug Protocol checks:

- My Work loads.
- Work Orders loads.
- Gauges filter New, In Progress, Blocked, Overdue, Completed.
- Completed work remains hidden by default.
- Search finds work by title.
- Search finds work by related part/comment where test data exists.
- Location switching reloads work queues.
- Quick Fix create/open/delete still passes, even if mutation code was not moved.
- No full-table freeze or unpaged work order dump.

Company isolation notes:

- Every query must keep `company_id`.
- Location scoping must remain active for default work views.
- RLS remains the server-side authority; service wrappers only organize calls.

## 6. companyService

Candidate file:

- `src/services/companyService.js`

Exact functions/queries that could move:

- `loadCompanies()` RPC:
  - `supabaseClient.rpc("get_my_companies")`
- `createCompany()` RPC:
  - `supabaseClient.rpc("create_company", { company_name: name })`
- `ensureProfileForActiveCompany()` RPC:
  - `supabaseClient.rpc("ensure_company_profile", ...)`
- `acceptTeamInvites()` RPC:
  - `supabaseClient.rpc("accept_company_invites")`
- `updateCompanySettings()` later, if simple.
- `uploadCompanyLogo()` should not move early because it mixes storage, optimization, RPC, and UI state.

Suggested wrapper names:

- `MaintainOpsCompanyService.getMyCompanies()`
- `MaintainOpsCompanyService.createCompany(companyName)`
- `MaintainOpsCompanyService.ensureProfile(params)`
- `MaintainOpsCompanyService.acceptInvites()`
- `MaintainOpsCompanyService.setCompanyLogo(companyId, logoPath)` later.

Dependencies:

- `normalizeRole()` stays outside service.
- company logo URL signing is storage-dependent.
- app startup and active company selection remain in `app.js`.

Risks:

- Startup/company selection is a high-impact area.
- Multiple historical duplicate Taylor companies exist in the user's account; current dedupe behavior must remain in `app.js`.
- Invite acceptance/default-location startup remains under-tested with a true second user.

Required Debug Protocol checks:

- Sign out/sign in.
- Company list loads.
- Taylor Metal Products selected.
- Active company persists.
- Team page still loads.
- Invite acceptance QA with a real second user before deeper company service extraction.

Company isolation notes:

- `get_my_companies` remains the authoritative membership boundary.
- Do not trust localStorage company ID without server membership confirmation.

## 7. publicRequestsService

Candidate file:

- `src/services/publicRequestsService.js`

Low-risk enough for planning, but not recommended early.

Exact functions/queries that could move later:

- `renderPublicRequestQrPage()` RPC lookup:
  - `supabaseClient.rpc("get_public_request_intake", { request_token: token })`
- `renderPublicRequestIntake()` RPC lookup:
  - same `get_public_request_intake`
- `submitPublicRequest()` RPC submit:
  - `supabaseClient.rpc("submit_public_location_request", { ... })`
- Authenticated admin links:
  - `loadPublicRequestLinks()`
  - `ensure_location_request_link`
- Request photo attachment:
  - `attach_maintenance_request_photo` should move later with storage support.

Suggested wrapper names:

- `MaintainOpsPublicRequestsService.getIntake(token)`
- `MaintainOpsPublicRequestsService.submit(token, payload)`
- `MaintainOpsPublicRequestsService.listLinks(companyId)`
- `MaintainOpsPublicRequestsService.ensureLink(companyId, locationId)`

Dependencies:

- anonymous public route can run before authenticated app state exists.
- `withOperationTimeout`
- request photo upload/storage behavior
- public app URL generation stays in UI layer.

Risks:

- Public QR is an external-user path and must keep working without login.
- Anonymous access must stay RPC-scoped.
- Request photos combine public submit, storage, and authenticated manager visibility.
- Breaking QR intake would affect real outside-the-company users.

Required Debug Protocol checks:

- Open QR form while signed out.
- Submit public request without photo.
- Submit public request with photo on desktop and mobile if possible.
- Confirm manager sees request in correct location.
- Confirm converted requests stay out of Active queue.
- Regenerate/deactivate link still admin-only.

Company isolation notes:

- Do not expose `maintenance_requests` directly to `anon`.
- The request token remains the only public scoping mechanism.

## Items That Should NOT Be Moved Yet

Do not move these during the first Phase 2 extraction:

- Auth/session initialization:
  - `init()`
  - `supabaseClient.auth.getSession()`
  - `onAuthStateChange`
  - login fallback token path
- Active company and active location selection/persistence.
- `renderWorkspace()` and large render functions.
- `bindWorkspaceEvents()`.
- `createQuickFix()`.
- `createWorkOrder()`.
- `convertRequestToWorkOrder()`.
- `generatePreventiveWorkOrder()`.
- `insertWithOptionalProcedure()`, `updateWithOptionalProcedure()`, `updateWorkOrderSafely()`.
- Safety-device completion logic.
- Equipment-driven cross-location warning and routing confirmation.
- Technician assignment guardrails.
- Delete guard workflows as whole workflows.
- Photo/storage upload flows.
- Message center services.
- Procedure/PM services.
- Optional schema fallback logic, until the wrappers prove they can return enough detail for `app.js` to preserve the same warnings.

Reason: these are not just database calls. They encode operational workflow transitions, user intent, traceability guards, permissions, location routing, or setup-fallback behavior.

## Required Debug Protocol After Each Extraction

Minimum after every service extraction:

- `node --check app.js`
- `node --check` for the new service file.
- Hosted or local signed-in startup.
- Company loads.
- Active location loads and switches.
- Work Orders open.
- Equipment opens.
- Parts open.
- Console scan for MaintainOps errors.
- Update `docs/QA_LOG.md` and `docs/CURRENT_HANDOFF.md`.

Additional checks by service:

- `locationsService`: reload/reopen location persistence and location-scoped queues.
- `profiles/companyService`: sign in/out, Team, roles, Mobile tech visibility, invite list.
- `partsService`: add/edit/use/restock/delete QA-only part.
- `assetsService`: add/edit/delete unused QA equipment and verify linked-delete guard.
- `workOrdersService`: paging, gauges, search, Quick Fix smoke, completed hidden by default.
- `publicRequestsService`: anonymous QR submit and manager-side visibility.

## Company Isolation/RLS Preservation Notes

- The service layer is an organization boundary, not a security boundary.
- RLS remains the enforcement boundary.
- `private.is_company_member(company_id)` remains critical and must not be weakened or bypassed.
- Service wrappers should make tenant boundaries more visible by requiring `companyId` arguments.
- Do not create helpers that silently read `activeCompanyId` from global state; pass it explicitly from `app.js`.
- Do not create broad helpers such as `selectAll(table)` because they hide tenant and location scope.
- Destructive operations must require both `id` and `companyId`.
- Public request helpers must stay token/RPC scoped.

## Recommended Phase 2 Implementation Prompt

When approved, the safest next implementation prompt is:

```text
Implement LFES Phase 2A service-wrapper extraction only.

Create src/services/locationsService.js and extract only location read/create database calls.
Do not change behavior, auth, Supabase policies, rendering, or workflow logic.
Pass companyId explicitly into every service function.
Keep active location persistence in app.js.
Run node --check app.js and node --check src/services/locationsService.js.
Run signed-in Debug Protocol checkpoint for startup, company load, location switch/reload, Work Orders, Equipment, Parts, and console errors.
Update docs/QA_LOG.md and docs/CURRENT_HANDOFF.md.
Stop after Phase 2A.
```

