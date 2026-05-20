# LFES Phase 3D State Ownership Map

Date: 2026-05-19

Scope: planning and documentation only. No app code, rendering, event binding, Supabase SQL/RLS, wrapper extraction, workflow handler movement, or business logic changed.

## Purpose

Phase 3D maps top-level mutable state in `app.js` before any workflow handler or rendering extraction.

The goal is to make future modularization safer by identifying who owns each piece of state, what scope it belongs to, and which values should remain in `app.js` until state ownership is explicit.

## Inventory Counts

- Top-level mutable `let` state variables mapped: 100.
- Primary LFES state categories used:
  - Company-scoped.
  - Location-scoped.
  - User/session-scoped.
  - View/UI-scoped.
  - Workflow-scoped.
  - Pending action / confirmation-scoped.
  - Cache/list-scoped.

## State Ownership Table

| State | LFES Category | Owner / Workflow | Read By | Mutated By | Supabase / Service Dependencies | Scope Notes | Risk |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `supabaseClient` | User/session-scoped | app bootstrap/data layer | all data and auth workflows | startup/init | every Supabase/service call | session runtime | Critical |
| `session` | User/session-scoped | auth/session startup | render, role checks, ownership checks, creates | auth render/startup/reset | auth, profiles, company membership, user-created rows | user/session | Critical |
| `companies` | Company-scoped | company loader | company switcher, role checks, settings | company load/create/switch | company service, companies table | company membership | Critical |
| `activeCompanyId` | Company-scoped | company switch/startup | almost every render/service path | startup, company switch, create company, login reset | all company-scoped queries/mutations | company boundary | Critical |
| `locations` | Company-scoped / Location-scoped | location loader | location switchers, route warnings, request links, filters | location load/create | locations service/table | company plus location boundary | Critical |
| `locationsReady` | Cache/list-scoped | location schema readiness | forms, setup warnings | loaders/fallbacks | locations table availability | feature readiness | Medium |
| `activeLocationId` | Location-scoped | active location persistence | work queues, assets, requests, PM, forms | startup, location switch, company switch, equipment routing | location-scoped queries/mutations | active operational location | Critical |
| `assets` | Location-scoped / Cache-list | equipment loader | equipment render, work/request/PM forms | asset load/create/update/delete | assets service/table | company/location operational data | High |
| `workOrders` | Location-scoped / Cache-list | work order queue loader | My Work, Work Orders, detail, search, relationships | work queue load, create/update/delete/status/PM/request conversion | workOrders service/table | company/location operational data | Critical |
| `workOrderServerTotal` | Cache/list-scoped | work order paging | render pagination/counts | work queue load | work order count query | active filters/location | Medium |
| `workOrderDashboardCounts` | Cache/list-scoped | dashboard counts | Work Orders gauge | work queue load | work order count queries | active company/location | Medium |
| `myWorkDashboardCounts` | Cache/list-scoped | dashboard counts | My Work gauge | work queue load | work order count queries | active user/company/location | Medium |
| `workOrderRelatedSearch` | Cache/list-scoped | search helper | global/work search | search loaders | parts/assets/procedure relationship searches | active company/location | Medium |
| `exactWorkOrderSearchCache` | Cache/list-scoped | exact work order search | search mode | search/load invalidation | work order search service | active search/location | Medium |
| `maintenanceRequests` | Location-scoped / Cache-list | request queue loader | Requests, Work request gauge | request load/create/convert/delete | maintenance_requests table/storage | active company/location | Critical |
| `requestServerTotal` | Cache/list-scoped | request paging | request list pagination | request load | request count query | active company/location/filter | Medium |
| `requestDashboardCounts` | Cache/list-scoped | request dashboard | gauges/filter counts | request load | request count queries | active company/location | Medium |
| `requestsReady` | Cache/list-scoped | request schema readiness | request UI/setup warnings | request loader/fallbacks | maintenance_requests table availability | feature readiness | Medium |
| `publicRequestLinks` | Company/location-scoped | QR request link manager | Settings QR cards | public link load/create/update/regenerate | public_request_links table | company/location public boundary | High |
| `publicRequestLinksReady` | Cache/list-scoped | QR schema readiness | Settings QR UI | public link loaders/fallbacks | public_request_links table availability | feature readiness | Medium |
| `preventiveSchedules` | Company/location-scoped | PM loader | Planning/PM render | PM load/create/delete/generate | preventive_schedules table | company/location | High |
| `companyMembers` | Company-scoped / User-session | Team/member loader | team render, role checks, assignment options | member load/add/update | company_members table | company auth boundary | Critical |
| `teamInvites` | Company-scoped | Team invite loader | Team invite render | invite load/create/cancel | team_invites table | company onboarding | High |
| `teamInvitesReady` | Cache/list-scoped | invite schema readiness | Team UI | invite loaders/fallbacks | team_invites availability | feature readiness | Medium |
| `teamInviteCancelError` | View/UI-scoped | team invite cancel UI | Team render | cancel invite flow | invite cancel mutation | temporary UI | Low |
| `messageThreads` | Company/location/user-scoped | messages loader | Messages render/nav badge | message load/create/open | message_threads table | user/company/location messaging | High |
| `messageThreadMembers` | User/session-scoped | message member loader | message render | message load/create | message_thread_members table | user visibility | High |
| `messagesByThreadId` | Cache/list-scoped | message loader | message detail render | message load/reply | messages table | thread scoped | Medium |
| `messageReadsByThreadId` | User/session-scoped | read receipt loader | badges/read state | message load/open/read | message_reads table | user scoped | Medium |
| `messagesReady` | Cache/list-scoped | message schema readiness | Messages UI | message loader/fallbacks | messages tables availability | feature readiness | Medium |
| `messageWorkOrderLinksReady` | Cache/list-scoped | message link schema readiness | message/work links | message loaders/fallbacks | message/work link tables | feature readiness | Medium |
| `appIssueReports` | Company-scoped / Cache-list | issue report loader | Admin Setup issue panel | issue load/submit/update | appIssueReports service/table | company/internal QA | Medium |
| `appIssueReportsReady` | Cache/list-scoped | issue schema readiness | issue UI | issue loaders/fallbacks | app_issue_reports availability | feature readiness | Low |
| `reportIssueMode` | View/UI-scoped | Report Issue panel | renderWorkspace | command/cancel/submit | app issue submit path | temporary UI mode | Medium |
| `activeMessageThreadId` | User/session-scoped / View | message detail state | Messages render | message open/reply/load | message read/reply | localStorage mirrored | Medium |
| `messageThreadFilter` | View/UI-scoped | messages filter | Messages render | message filter buttons | message list filter | localStorage mirrored | Low |
| `messageSearchQuery` | View/UI-scoped | messages search | Messages render | message search input | none direct | localStorage mirrored | Low |
| `messageComposerWorkOrderId` | Workflow-scoped | work-linked message composer | Messages render | start/clear message link | message create | localStorage mirrored | Medium |
| `messageComposerOpen` | View/UI-scoped | message composer UI | Messages render | start/open thread | message create | temporary UI | Low |
| `parts` | Company/location-scoped / Cache-list | parts loader | Parts, work-order part forms | parts load/create/update/delete/use/restock | parts service/table | company/location inventory | High |
| `partCostsReady` | Cache/list-scoped | parts schema readiness | Parts UI | loaders/fallbacks | parts cost fields | feature readiness | Low |
| `partSuppliersReady` | Cache/list-scoped | parts supplier readiness | Parts UI | loaders/fallbacks | supplier fields | feature readiness | Low |
| `partDocumentsReady` | Cache/list-scoped | part document schema readiness | Part detail | loaders/upload fallback | part_documents/storage | feature readiness | Medium |
| `partDocumentsByPartId` | Cache/list-scoped | part documents loader | Part detail | document load/upload | part_documents/storage | part scoped | Medium |
| `procedureTemplates` | Company/location-scoped / Cache-list | procedure loader | Procedures and work detail | procedure load/create/delete | procedure_templates/steps | company/location workflow | High |
| `proceduresReady` | Cache/list-scoped | procedure schema readiness | Procedures UI | loaders/fallbacks | procedure tables | feature readiness | Medium |
| `schedulesReady` | Cache/list-scoped | PM schema readiness | Planning UI | loaders/fallbacks | preventive_schedules | feature readiness | Medium |
| `outcomesReady` | Cache/list-scoped | outcome schema readiness | Work detail/status | loaders/fallbacks | outcome fields/tables | feature readiness | Medium |
| `safetyChecksReady` | Cache/list-scoped | safety schema readiness | completion/update forms | loaders/fallbacks | safety check fields | safety workflow | High |
| `photosReady` | Cache/list-scoped | work photo readiness | photo UI | photo loaders/fallbacks | storage/photo metadata | storage workflow | Medium |
| `adminDeleteSqlConfirmed` | User/session-scoped / View | Admin Setup guard | setup render | setup action button | none direct | localStorage mirrored | Low |
| `partsUsedByWorkOrder` | Cache/list-scoped | work-order relationship loader | work detail | relationship load/use part | work_order_parts/parts | work order scoped | High |
| `eventsByWorkOrder` | Cache/list-scoped | history loader | work detail history | event load/mutation flows | work_order_events | work order scoped | Medium |
| `commentsByWorkOrder` | Cache/list-scoped | comments loader | work detail | comment load/create | work_order_comments | work order scoped | Medium |
| `photosByWorkOrder` | Cache/list-scoped | photos loader | work detail | photo load/upload | work_order_photos/storage | work order scoped | Medium |
| `stepResultsByWorkOrder` | Cache/list-scoped | checklist result loader | work detail checklist | result load/save | work_order_step_results | work/procedure scoped | High |
| `profilesByUserId` | Company/user-scoped cache | profile loader | names/assignments/messages | profile load | profiles table | user display/roles | High |
| `commentsError` | View/UI-scoped | comment UI error | work detail | comment loader/create | comments query | temporary UI | Low |
| `requestPhotosReady` | Cache/list-scoped | request photo readiness | request cards | request photo loader/fallback | request photo metadata/storage | feature readiness | Medium |
| `activeWorkOrderId` | View/UI-scoped / Workflow | work detail selection | renderWorkspace/work detail | card clicks/search/navigation/create flows | detail loaders/mutations | selected operational record | Critical |
| `activeAssetId` | View/UI-scoped / Workflow | asset detail selection | renderWorkspace/asset detail | asset card/open/navigation/create flows | asset detail/work creation | selected operational record | High |
| `activePartId` | View/UI-scoped | part detail selection | parts render | part open/close/search | part update/delete/document | selected record | Medium |
| `pendingDeleteWorkOrderId` | Pending action | work-order delete guard | work card/detail delete UI | request/cancel/delete work order | deleteWorkOrder | temporary confirmation | Critical |
| `pendingDeletePartId` | Pending action | part delete guard | part detail/card | request/cancel/delete part | delete part | temporary confirmation | High |
| `pendingDeleteAssetId` | Pending action | equipment delete guard | asset detail | request/cancel/delete asset | live count checks/delete asset | temporary confirmation | Critical |
| `pendingDeleteRequestId` | Pending action | request delete guard | request card | request/cancel/delete request | delete maintenance request/storage | temporary confirmation | Critical |
| `pendingDeleteScheduleId` | Pending action | PM schedule delete guard | PM card | request/cancel/delete schedule | delete preventive schedule | temporary confirmation | High |
| `pendingDeleteProcedureId` | Pending action | procedure delete guard | procedure card | request/cancel/delete procedure | delete procedure/steps | temporary confirmation | High |
| `pendingCancelInviteId` | Pending action | invite cancel guard | Team invite row | request/cancel/confirm invite cancel | team_invites update/delete | temporary confirmation | Medium |
| `showPartSourceManager` | View/UI-scoped | parts source manager | parts render | toggle/section reset | part source rename | temporary UI | Low |
| `createWorkOrderMode` | View/UI-scoped / Workflow | work focus panel | renderWorkspace | command/nav/search/back/create | create work order | temporary UI | High |
| `quickFixMode` | View/UI-scoped / Workflow | Quick Fix focus panel | renderWorkspace | command/request/equipment/back/create | Quick Fix create | temporary UI | Critical |
| `quickFixAssetId` | Workflow-scoped | Quick Fix equipment context | Quick Fix render/create | quick-fix asset/open/reset | Quick Fix create/equipment routing | active location/equipment boundary | Critical |
| `quickFixRequestId` | Workflow-scoped | Quick Fix request context | Quick Fix render/create | request quick-fix/open/reset | request conversion/Quick Fix create | request/work boundary | Critical |
| `publicAppUrlOverride` | Company/view-scoped | public QR link manager | settings QR render | settings save/remove | public_request_links URL generation | localStorage mirrored | Medium |
| `activeStatusFilter` | View/UI-scoped | work gauge/filter | render queues | gauge/status buttons | work/request reload | active list mode | Medium |
| `myWorkFilter` | View/UI-scoped | My Work filter | My Work render | filter buttons | work reload/filter | localStorage mirrored | Low |
| `workOrderFilter` | View/UI-scoped | Work Orders filter | Work render | filter buttons | work reload/filter | localStorage mirrored | Low |
| `workOrderAssigneeFilter` | View/UI-scoped | Team-to-work filter | Work render | member view/clear/filter | work reload/filter | localStorage mirrored | Medium |
| `workSort` | View/UI-scoped | work sort | Work render | sort buttons | work reload/query | localStorage mirrored | Low |
| `workOrderPage` | View/UI-scoped | work pagination | Work render | pagination/reset/load | work query range | localStorage mirrored | Medium |
| `partsPage` | View/UI-scoped | parts pagination | Parts render | pagination/reset | parts render slice | localStorage mirrored | Low |
| `assetsPage` | View/UI-scoped | equipment pagination | Assets render | pagination/reset | assets render slice | localStorage mirrored | Low |
| `requestsPage` | View/UI-scoped | request pagination | Request render | pagination/reset | request query range | localStorage mirrored | Medium |
| `requestViewFilter` | View/UI-scoped | request filter | request render | request filter/convert | request reload/filter | localStorage mirrored | Medium |
| `schedulesPage` | View/UI-scoped | PM pagination | PM render | pagination/reset | PM render slice | localStorage mirrored | Low |
| `proceduresPage` | View/UI-scoped | procedure pagination | Procedures render | pagination/reset | procedure render slice | localStorage mirrored | Low |
| `membersPage` | View/UI-scoped | Team pagination | Team render | pagination/reset | member render slice | localStorage mirrored | Low |
| `assetStatusFilter` | View/UI-scoped | asset filter | Assets render | filter buttons | asset render/filter | localStorage mirrored | Low |
| `partInventoryFilter` | View/UI-scoped | parts inventory filter | Parts render | filter buttons | parts render/filter | localStorage mirrored | Low |
| `partSearchQuery` | View/UI-scoped | parts search | Parts render | search form/input/reset | parts render/filter | localStorage mirrored | Low |
| `activeSection` | View/UI-scoped / Workflow | primary navigation | renderWorkspace | nav/commands/deep links | determines loads/renders | localStorage mirrored | Critical |
| `searchQuery` | View/UI-scoped | global search | render/search | search inputs/search result clicks | work/request reload | localStorage mirrored | Medium |
| `workOrderSearchMode` | View/UI-scoped | exact work search mode | work search render | search mode open/close | work query/search cache | localStorage mirrored | Medium |
| `appError` | View/UI-scoped | startup/load error | auth/load render | startup/auth reset | startup data calls | temporary UI | Medium |
| `appNotice` | View/UI-scoped | notice UI | renderWorkspace | showNotice/workflows | none direct | temporary UI | Low |
| `appNoticeTone` | View/UI-scoped | notice UI | renderWorkspace | showNotice/workflows | none direct | temporary UI | Low |
| `noticeTimer` | View/UI-scoped | notice timeout | showNotice | showNotice | none direct | temporary UI | Low |
| `workOrderActionWarningId` | View/UI-scoped | work action warning | work detail/card | set/clear warning | status/assignment guards | temporary UI | Medium |
| `workOrderActionWarning` | View/UI-scoped | work action warning | work detail/card | set/clear warning | status/assignment guards | temporary UI | Medium |

## LocalStorage Mirrors And Influence

LocalStorage keys that mirror or influence state:

- `maintainops.activeCompanyId` -> `activeCompanyId`.
- `ACTIVE_LOCATION_STORAGE_KEY` and scoped `${ACTIVE_LOCATION_STORAGE_KEY}:${userId}:${companyId}` -> `activeLocationId`.
- `maintainops.activeSection` -> `activeSection`.
- `maintainops.sectionSplitDone` -> one-time migration from old Work default to My Work.
- `maintainops.activeMessageThreadId` -> `activeMessageThreadId`.
- `maintainops.messageThreadFilter` -> `messageThreadFilter`.
- `maintainops.messageSearchQuery` -> `messageSearchQuery`.
- `maintainops.messageComposerWorkOrderId` -> `messageComposerWorkOrderId`.
- `maintainops.adminDeleteSqlConfirmed` -> `adminDeleteSqlConfirmed`.
- `maintainops.publicAppUrl` -> `publicAppUrlOverride`.
- `maintainops.myWorkFilter` -> `myWorkFilter`.
- `maintainops.workOrderFilter` -> `workOrderFilter`.
- `maintainops.workOrderAssigneeFilter` -> `workOrderAssigneeFilter`.
- `maintainops.workSort` -> `workSort`.
- `maintainops.workOrderPage` -> `workOrderPage`.
- `maintainops.partsPage` -> `partsPage`.
- `maintainops.assetsPage` -> `assetsPage`.
- `maintainops.requestsPage` -> `requestsPage`.
- `maintainops.requestViewFilter` -> `requestViewFilter`.
- `maintainops.schedulesPage` -> `schedulesPage`.
- `maintainops.proceduresPage` -> `proceduresPage`.
- `maintainops.membersPage` -> `membersPage`.
- `maintainops.assetStatusFilter` -> `assetStatusFilter`.
- `maintainops.partInventoryFilter` -> `partInventoryFilter`.
- `maintainops.partSearchQuery` -> `partSearchQuery`.
- `maintainops.searchQuery` -> `searchQuery`.
- `maintainops.workOrderSearchMode` -> `workOrderSearchMode`.

## Scope Summary

### Company-Scoped

- `companies`
- `activeCompanyId`
- `locations`
- `companyMembers`
- `teamInvites`
- `publicRequestLinks`
- `appIssueReports`
- `profilesByUserId`
- `publicAppUrlOverride`

### Location-Scoped

- `activeLocationId`
- `assets`
- `workOrders`
- `maintenanceRequests`
- `preventiveSchedules`
- `procedureTemplates`
- work order relationship maps when loaded for active work orders
- dashboard/request/work counts

### User / Session-Scoped

- `supabaseClient`
- `session`
- `activeMessageThreadId`
- `messageReadsByThreadId`
- `messageComposerWorkOrderId`
- `adminDeleteSqlConfirmed`
- saved active company/location/section/filter keys

### View / UI-Scoped

- `activeSection`
- `activeWorkOrderId`
- `activeAssetId`
- `activePartId`
- `createWorkOrderMode`
- `quickFixMode`
- `reportIssueMode`
- all filters, pages, search values, notices, and warnings

### Workflow-Scoped

- `quickFixAssetId`
- `quickFixRequestId`
- `messageComposerWorkOrderId`
- `workOrderRelatedSearch`
- `exactWorkOrderSearchCache`
- relationship maps for comments/photos/parts/events/steps

### Pending Action / Confirmation-Scoped

- `pendingDeleteWorkOrderId`
- `pendingDeletePartId`
- `pendingDeleteAssetId`
- `pendingDeleteRequestId`
- `pendingDeleteScheduleId`
- `pendingDeleteProcedureId`
- `pendingCancelInviteId`

### Cache / List-Scoped

- list arrays: `workOrders`, `assets`, `parts`, `maintenanceRequests`, `preventiveSchedules`, `procedureTemplates`, `messageThreads`, `teamInvites`, `appIssueReports`
- readiness flags: `locationsReady`, `requestsReady`, `publicRequestLinksReady`, `teamInvitesReady`, `messagesReady`, `appIssueReportsReady`, `partCostsReady`, `partSuppliersReady`, `partDocumentsReady`, `proceduresReady`, `schedulesReady`, `outcomesReady`, `safetyChecksReady`, `photosReady`, `requestPhotosReady`
- server totals/counts/page state

## Highest-Risk State Variables

Do not move these yet:

- `supabaseClient`
- `session`
- `activeCompanyId`
- `activeLocationId`
- `companies`
- `locations`
- `companyMembers`
- `activeSection`
- `activeWorkOrderId`
- `activeAssetId`
- `activePartId`
- `workOrders`
- `maintenanceRequests`
- `assets`
- `parts`
- `quickFixMode`
- `quickFixAssetId`
- `quickFixRequestId`
- `createWorkOrderMode`
- all pending delete IDs
- `requestViewFilter`
- `workOrderSearchMode`
- relationship maps: `partsUsedByWorkOrder`, `eventsByWorkOrder`, `commentsByWorkOrder`, `photosByWorkOrder`, `stepResultsByWorkOrder`

These variables cross company/location scope, rendering, event binding, localStorage, and mutation workflows.

## State Blocking Workflow Extraction

Workflow extraction remains blocked by:

- company/session/location state used by nearly every mutation.
- active detail state (`activeWorkOrderId`, `activeAssetId`, `activePartId`) determining which renderer and handler path runs.
- Quick Fix routing state (`quickFixMode`, `quickFixAssetId`, `quickFixRequestId`) connecting command buttons, request cards, equipment cards, and work order creation.
- pending delete state that coordinates request/cancel/confirm UI across renders.
- relationship maps that are loaded separately but rendered and mutated from work detail.
- filter/page/search state that controls what reloads after a mutation.
- localStorage mirrored state that must remain consistent after reload.

## State That Could Later Move Safely

These are lower-risk candidates for a future state module after a read-only state helper is introduced:

- notice state: `appNotice`, `appNoticeTone`, `noticeTimer`.
- list page state: `workOrderPage`, `partsPage`, `assetsPage`, `requestsPage`, `schedulesPage`, `proceduresPage`, `membersPage`.
- simple filters: `myWorkFilter`, `workOrderFilter`, `workSort`, `assetStatusFilter`, `partInventoryFilter`, `partSearchQuery`, `messageThreadFilter`, `messageSearchQuery`.
- readiness flags as a grouped feature readiness object, after call sites are mapped.
- `showPartSourceManager` as parts view state.

Move these only after adding smoke coverage for the workflow that reads them.

## Recommended State Module Shape Later

Planning only; do not implement yet.

Possible future modules:

```text
src/state/sessionState.js
src/state/workspaceState.js
src/state/locationState.js
src/state/viewState.js
src/state/listState.js
src/state/pendingActionState.js
src/state/relationshipState.js
```

Recommended order if approved later:

1. Extract pure localStorage key helpers and list page/filter getters/setters.
2. Extract notice state helpers.
3. Extract pending action helper shape without moving delete workflows.
4. Extract relationship state shape after work-detail smoke tests exist.
5. Only then consider moving workflow handlers.

## Recommendation

Workflow extraction remains blocked.

The next controlled phase should be LFES Phase 3E render ownership map, planning only. It should map which render functions read each state category and which screens can be separated later without moving workflow handlers.

