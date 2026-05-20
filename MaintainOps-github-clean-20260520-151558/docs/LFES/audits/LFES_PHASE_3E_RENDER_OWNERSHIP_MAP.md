# LFES Phase 3E Render Ownership Map

Date: 2026-05-19

Scope: planning and documentation only. No app code, rendering, event binding, Supabase SQL/RLS, wrapper extraction, workflow handler movement, or business logic changed.

## Purpose

Phase 3E maps rendering ownership before any render extraction or workflow handler movement.

Rendering in MaintainOps is not just display. Many render functions create the IDs, forms, classes, and `data-*` attributes consumed by event handlers and mutation workflows. This map separates low-risk display helpers from renderers that create operational contracts.

## Inventory Counts

- Major `render*` functions mapped: 83.
- Risk categories:
  - Low: pure display helper, no workflow dependency.
  - Medium: display with filters, pagination, or navigation state.
  - High: rendering creates forms/buttons used by mutations.
  - Critical: rendering creates workflow mutation, delete, public/auth, or storage contracts.

## Render Ownership Table

| Render Function | Screen / Section Owned | Key State Read | DOM Contracts Created | Dependent Handlers / Workflows | Risk |
| --- | --- | --- | --- | --- | --- |
| `renderWorkspaceLoading` | startup loading screen | `appError` only by caller | loading shell classes | none | Low |
| `renderWorkspaceLoadError` | startup failure | `appError` | `#retry-workspace-load`, `#auth-reset` | retry render, reset login | High |
| `renderAuth` | login/signup | auth mode, initial error | `#auth-form`, `#auth-mode`, `#auth-reset` | auth submit/toggle/reset | Critical |
| `renderPublicRequestQrPage` | public QR printable page | public link token/load result | `#print-public-qr` | print QR | High |
| `renderPublicRequestIntake` | anonymous public request form | public request link/intake data | `#public-request-form`, `#public-request-error` | public QR request submit/photo upload | Critical |
| `renderPublicRequestError` | public request error | error message | public error shell | none | Low |
| `renderCompanyCreate` | create company fallback | session/company error | `#company-form`, `#company-error`, `#sign-out` | company create/sign out | Critical |
| `renderWorkspace` | authenticated app shell and all main sections | most global state: company, location, section, lists, filters, pages, detail IDs, modes | `#company-select`, `#location-select`, command IDs, `data-section`, `data-command-action`, `#detail-panel`, section forms | `bindWorkspaceEvents()` and almost all authenticated workflows | Critical |
| `renderLocationOptions` | location selects | `locations`, `activeLocationId` | option list | location-aware forms | Medium |
| `renderAssetOptions` | equipment selects | `assets`, `activeLocationId` | equipment option list | work/request/PM/equipment routing | High |
| `renderParentAssetOptions` | equipment hierarchy selects | `assets` | parent option list | asset create/update | Medium |
| `renderRequestFilterBar` | request filter controls | request counts/filter | `[data-request-filter]` | request queue filtering | Medium |
| `renderPartSourceOptions` | parts source datalist | `parts` | `#part-source-options` | part create/update/source manager | Low |
| `renderPartSourceManager` | parts source manager | `showPartSourceManager`, parts | `[data-toggle-part-sources]`, `[data-rename-part-source]` | source rename/toggle | High |
| `renderGlobalSearchResults` | global search shell | search results | result group containers | search navigation | Medium |
| `renderGlobalResultGroup` | global result group | search result arrays | `[data-view-work-search]` | jump to exact work search | Medium |
| `renderGlobalWorkResult` | global work result row | work result | `[data-search-work-order]` | open searched work order | Medium |
| `renderGlobalAssetResult` | global equipment result row | asset result | `[data-search-asset]` | open searched equipment | Medium |
| `renderGlobalPartResult` | global part result row | part result | `[data-search-part]` | open searched part | Medium |
| `renderGlobalRequestResult` | global request result row | request result | `[data-search-request]` | jump to requests | Medium |
| `renderGlobalPmResult` | global PM result row | PM result | `[data-search-section]` | jump to planning | Low |
| `renderGlobalProcedureResult` | global procedure result row | procedure result | `[data-search-section]` | jump to procedures | Low |
| `renderMetric` | metric tile | passed values | display classes | none | Low |
| `renderGaugeReadout` | gauge/filter button | `activeStatusFilter`, counts | `[data-status-filter]`, `[data-section]` | work/request filtering/navigation | High |
| `renderWorkOrderGaugeDashboard` | Work Orders dashboard gauges | dashboard counts | gauge controls through child renderers | work filters | Medium |
| `renderWorkloadStrip` | My Work workload strip | my work counts | display classes | none | Low |
| `renderInsight` | dashboard insight card | passed values | display classes | none | Low |
| `renderPlanningGroup` | planning group | planning lists | planning item containers | child planning handlers | Medium |
| `renderPlanningItem` | planning item/action row | work/PM/follow-up item | `[data-create-follow-up]`, `[data-generate-pm]`, `[data-mini-work-order]` | follow-up create, PM generate, open work order | High |
| `renderAssetCard` | equipment card | asset, active asset | `.asset-card`, `[data-asset-id]` | open equipment detail | High |
| `renderAssetDetail` | equipment detail/edit | `activeAssetId`, assets, work orders | `#edit-asset-form`, `[data-open-asset]`, `[data-quick-fix-asset]` | asset update, asset navigation, Quick Fix from equipment | Critical |
| `renderAssetDangerZone` | equipment delete UI | `pendingDeleteAssetId` | `[data-delete-asset]`, `[data-cancel-delete-asset]`, `[data-confirm-delete-asset]` | asset delete guard/live count/delete | Critical |
| `renderMiniWorkOrder` | mini work link | work order | `[data-mini-work-order]` | open work order | Medium |
| `renderAssetMiniWorkOrder` | equipment linked work row | work order | `[data-mini-work-order]` | open work order | Medium |
| `renderPreventiveSchedule` | PM schedule card | schedule, pending delete | `[data-generate-pm]`, schedule delete controls | PM generate/delete | Critical |
| `renderProcedureTemplate` | procedure card/steps/add/delete | templates, pending delete | `[data-add-step]`, `[data-delete-procedure]`, `[data-confirm-delete-procedure]` | step create, procedure delete | Critical |
| `renderProcedureOptions` | procedure select options | `procedureTemplates` | option list | work create/update/quick fix | Medium |
| `renderChecklistStep` | work order checklist step | step results, work order | `[data-step-result]`, `[data-work-order-id]` | checklist result save | Critical |
| `renderMember` | team member card | member, roles, workloads | `[data-view-member-work]`, `[data-member-role]` | view member work, role/default/mobile tech update | Critical |
| `renderMyProfileForm` | Team profile form | profile/session | `#profile-form` | profile/mobile tech update | High |
| `renderRoleGuide` | role explanation | roles | display classes | none | Low |
| `renderTeamInviteForm` | invite form | locations/roles | `#team-invite-form` | invite create/default location | Critical |
| `renderTeamInvites` | pending invites list | `teamInvites`, `pendingCancelInviteId` | invite cancel controls | invite cancel guard | High |
| `renderMessageCenter` | message inbox/detail/composer | message state, profiles, threads | `#message-thread-form`, `#message-reply-form`, `#message-search`, filters/reply buttons | message create/reply/open/search | Critical |
| `renderMessageThreadButton` | message thread button | active thread/read state | `[data-message-thread]` | open/read thread | Medium |
| `renderMessageBubble` | chat bubble | message/session | display classes | none | Low |
| `renderMessageList` | chat message list | messages | display classes | none | Low |
| `renderMessageNavBadge` | nav badge | unread counts | display classes | none | Low |
| `renderAppIssueReportForm` | Report Issue panel | report mode | `#app-issue-report-form`, `[data-cancel-app-issue-report]` | app issue submit/cancel | High |
| `renderAppIssueReportsPanel` | Admin issue list | appIssueReports | child issue forms | issue status update | Medium |
| `renderAppIssueReport` | issue report card | report | `[data-app-issue-status]` | issue status update | High |
| `renderSetupItem` | Admin Setup item | setup state | `[data-setup-action]` | admin setup confirmation | Medium |
| `renderPart` | part tile | part, active part | `[data-open-part]` | open part detail | Medium |
| `renderPartDetail` | part detail/forms/docs | active part, docs, source state | `[data-use-part]`, `[data-restock-part]`, `[data-edit-part]`, `[data-part-document]` | use/restock/update/document upload | Critical |
| `renderPartDangerZone` | part delete UI | `pendingDeletePartId` | `[data-delete-part]`, cancel/delete controls | part delete guard | Critical |
| `renderPartsHealth` | parts filter tiles | parts/filter | `[data-part-inventory-filter]` | parts filter | Medium |
| `renderPartSearch` | parts search form | `partSearchQuery` | `#part-search-form`, `#part-search` | parts search | Medium |
| `renderPublicRequestLinkManager` | Settings QR link manager | public links, locations, URL override | `#public-app-url-form`, `#public-request-link-error` | save public URL, child QR controls | Critical |
| `renderPublicRequestLocationCard` | per-location QR card | public link/location | public link data controls | QR create/copy/disable/reactivate/regenerate | Critical |
| `renderMaintenanceRequest` | request card | request, pending delete | `[data-convert-request]`, `[data-quick-fix-request]`, request delete controls | request conversion, Quick Fix from request, request delete | Critical |
| `renderMaintenanceRequestPhoto` | request photo preview | request photo metadata | photo link/preview classes | signed URL viewing | Medium |
| `renderRequestFormContent` | signed-in request form | assets/location readiness | `#request-form`, `#request-error` | document-level signed-in request submit/photo upload | Critical |
| `renderActivityItem` | work history/activity row | comments/photos/parts/events | display classes | none | Low |
| `renderWorkOrderCard` | work order card/list item | work order, active detail, permissions | `.work-card`, `[data-id]`, `[data-assign-me]`, `[data-quick-status]` | open work, assign self, quick status | Critical |
| `renderCardAssignmentControl` | work card assignment form | permissions/member state | `[data-card-assign]` | card assignment update | Critical |
| `renderAssignmentSelect` | assignment select options | members/permissions | select options | work assignment forms | High |
| `renderWorkOrderAssignmentField` | work order assignment field | work order/members | assignment field IDs | edit/quick update | High |
| `renderWorkPagination` | work paging | page/total | `[data-work-page]` | work page reload | Medium |
| `renderPartsPagination` | parts paging | page/total | `[data-parts-page]` | parts page render | Low |
| `renderAssetsPagination` | asset paging | page/total | `[data-assets-page]` | asset page render | Low |
| `renderListPagination` | generic paging | list/page | `[data-list-page]`, `[data-page-direction]` | request/PM/procedure/member paging | Medium |
| `renderCreateWorkOrder` | full work order create form | locations/assets/procedures/members | `#create-work-order-form`, `#create-work-order-error` | work order create | Critical |
| `renderMissingWorkOrderDetail` | missing work detail fallback | active selection | `#back-to-my-work` | back/reset detail | Medium |
| `renderQuickFixForm` | Quick Fix create form | quickFix IDs, request/asset context | `#quick-fix-form`, `#quick-fix-error` | Quick Fix create/request conversion path | Critical |
| `renderRelationshipChips` | work relationship chips | work order relationships | display classes | none | Low |
| `renderWorkOrderDetail` | work order detail, update, completion, relationships | active work order, relationship maps, permissions | `#status-select`, update/complete/comment/photo/parts forms, `data-quick-status`, `data-assign-me` | status/update/complete/comment/photo/part/checklist/delete | Critical |
| `renderWorkOrderDangerZone` | work order delete UI | `pendingDeleteWorkOrderId` | work order delete controls | work order delete guard | Critical |
| `renderWorkOrderMessages` | linked message panel | linked threads | `[data-start-work-message]` | message composer link | High |
| `renderWorkOrderRecommendation` | work detail recommendation | work order state | `[data-jump-work-section]` | jump to form field | Medium |
| `renderWorkOrderCommandSummary` | work detail command cards | work order state/safety | `[data-jump-work-section]` | jump to form field | Medium |
| `renderEmailHelperCommandCard` | downtime email helper | work order downtime | display only | none | Low |
| `renderLinkedWorkMessageThread` | linked thread row | thread data | `[data-open-work-message-thread]` | open message thread | Medium |
| `renderRequestForm` | legacy/detail panel request render | detail panel | injects `renderRequestFormContent()` | request submit through document handler | High |

## Highest-Risk Render Functions

Do not move yet:

- `renderWorkspace`
- `renderAuth`
- `renderPublicRequestIntake`
- `renderCompanyCreate`
- `renderAssetDetail`
- `renderAssetDangerZone`
- `renderPreventiveSchedule`
- `renderProcedureTemplate`
- `renderChecklistStep`
- `renderMember`
- `renderTeamInviteForm`
- `renderMessageCenter`
- `renderPartDetail`
- `renderPartDangerZone`
- `renderPublicRequestLinkManager`
- `renderPublicRequestLocationCard`
- `renderMaintenanceRequest`
- `renderRequestFormContent`
- `renderWorkOrderCard`
- `renderCardAssignmentControl`
- `renderCreateWorkOrder`
- `renderQuickFixForm`
- `renderWorkOrderDetail`
- `renderWorkOrderDangerZone`

These functions create mutation, delete, public/auth, assignment, storage, or cross-location contracts.

## Render Contracts Blocking Extraction

Rendering extraction remains blocked by:

- `renderWorkspace()` creates the full authenticated shell and calls `bindWorkspaceEvents()` after replacing `app.innerHTML`.
- desktop/mobile command controls are duplicated by `renderCommandStack()` inside `renderWorkspace()` and share `data-command-action`.
- `.work-card`, `.asset-card`, and `.workspace-search-input` are behavior hooks as well as CSS classes.
- delete confirmation renderers coordinate with pending global state and confirm/cancel data attributes.
- Quick Fix and request renderers share request/equipment/location context.
- work order detail renders several independent mutation forms in one output: quick update, full edit, complete, parts used, photo, comment, status, checklist.
- public QR renderers create anonymous/public boundary forms and admin QR management controls.
- storage upload contracts are created by work order photo, request photo, part document, and company logo render paths.

## Low-Risk Render Helper Candidates Later

Potential render-only extraction candidates after call sites are checked:

- `renderMetric`
- `renderInsight`
- `renderWorkloadStrip`
- `renderMessageBubble`
- `renderMessageList`
- `renderMessageNavBadge`
- `renderActivityItem`
- `renderRelationshipChips`
- `renderEmailHelperCommandCard`
- `renderMaintenanceRequestPhoto`
- simple option helpers such as `renderLocationOptions`, once location state ownership remains unchanged
- pagination helpers, after Phase 3C paging smoke tests exist

These are lower risk because they mostly return display HTML and do not directly create mutation forms. They still need static checks and focused smoke tests if moved.

## Duplicated Desktop / Mobile Contracts

`renderWorkspace()` owns duplicated command rendering through an inner `renderCommandStack(variant)` helper:

- `#show-quick-fix${suffix}`
- `#show-report-issue${suffix}`
- `#show-create-work-order${suffix}`
- `#show-request${suffix}`
- `#export-csv${suffix}`
- `#workspace-search${suffix}`
- shared `[data-command-action]`
- shared `.workspace-search-input`
- shared `[data-location-select]`

The IDs differ by suffix, but behavior is intentionally keyed mostly by data attributes and classes. Any extraction must preserve both desktop and mobile controls.

## Visual Classes That Act As Behavior Hooks

- `.work-card`
- `.asset-card`
- `.workspace-search-input`

These should not be treated as styling-only selectors until behavior hooks are separated.

## Recommended Render Extraction Approach Later

Planning only; do not implement yet.

1. Start with pure display helpers that do not create forms or mutation buttons.
2. Keep `renderWorkspace()` in `app.js` until screen ownership and event binding ownership are separated.
3. Keep work order detail, Quick Fix, public QR intake, request conversion, delete zones, storage upload forms, Team/admin, PM/procedure/checklist renderers in `app.js`.
4. If a render helper moves, run static checks plus the relevant Phase 3C smoke tests.
5. Do not move renderers that depend on pending delete state until pending action state has an explicit module or adapter.

## Recommendation

Workflow and render extraction remain blocked.

The next controlled phase should be LFES Phase 3F implementation-readiness decision, planning only. It should decide whether the first safe implementation should be:

- pure display render-helper extraction,
- localStorage/list state helper extraction,
- or stopping modularization and running a live full debug pass first.

