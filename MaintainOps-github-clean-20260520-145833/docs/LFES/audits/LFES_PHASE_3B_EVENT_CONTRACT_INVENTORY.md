# LFES Phase 3B Event Contract Inventory

Date: 2026-05-19

Scope: planning and documentation only. No app code, rendering, event binding, Supabase SQL/RLS, wrapper extraction, or business logic changed.

## Purpose

Phase 3B maps the DOM/event contract between `renderWorkspace()`, `bindWorkspaceEvents()`, top-level public/auth event handlers, and workflow mutations before any deeper workflow extraction.

The goal is operational continuity. A future extraction should know which IDs, classes, names, and `data-*` attributes are behavior contracts, not casual markup.

## Inventory Method

Scanned `app.js` for:

- `bindWorkspaceEvents()` listener registrations and selectors.
- rendered `id="..."` attributes.
- rendered and consumed `data-*` attributes.
- top-level auth/public request listeners outside `bindWorkspaceEvents()`.
- workflow handlers reached from submit/click/change/input/keydown events.

## Counts

- Event listeners mapped in `bindWorkspaceEvents()`: 126.
- Event listener types:
  - `click`: 79.
  - `submit`: 33.
  - `change`: 9.
  - `input`: 3.
  - `keydown`: 2.
- DOM selectors consumed inside `bindWorkspaceEvents()`: 126 raw selectors, 124 unique selectors.
- Rendered ID references found in `app.js`: 112 raw ID references, 102 unique ID references.
- `data-*` attribute references found in `app.js`: 143 raw references, 91 unique data attributes.
- DOM contract references mapped for this phase: 381 raw references across listener selectors, rendered IDs, and `data-*` attributes.

These counts are static inventory counts, not automated test coverage counts.

## Top-Level Event Contracts Outside Workspace Binding

These contracts are not owned by `bindWorkspaceEvents()` and must be handled separately in any future extraction:

| Contract | Event | Renderer/Section | Consumer | Workflow |
| --- | --- | --- | --- | --- |
| `document` click with `#public-request-another` follow-up | click | `submitPublicRequest()` success state | inline top-level handler | reload public request intake |
| `document` submit filtered to `#request-form` | submit | `renderRequestFormContent()` | `createRequest(event)` | signed-in internal maintenance request submit |
| `#auth-form` | submit | `renderAuth()` | inline auth handler | login/signup |
| `#auth-mode` | click | `renderAuth()` | inline auth handler | toggle login/signup |
| `#auth-reset` | click | `renderAuth()` / load error | `resetLoginState()` | reset login state |
| `#retry-workspace-load` | click | `renderWorkspaceLoadError()` | `render()` | retry startup |
| `#company-form` | submit | company create screen | `createCompany()` | create company |
| `#sign-out` | click | company create screen | `supabaseClient.auth.signOut()` | sign out |
| `#print-public-qr` | click | `renderPublicRequestQrPage()` | inline print handler | print public QR page |
| `#public-request-form` | submit | `renderPublicRequestIntake()` | `submitPublicRequest(event, token, intake)` | anonymous public QR request submit |

## Major Form Contracts

| Form/Selector | Rendered By | Consumed By | Event | Workflow/Mutation Boundary |
| --- | --- | --- | --- | --- |
| `#quick-fix-form` | `renderQuickFixForm()` inside work focus panel | `createQuickFix()` | submit | critical work order creation path, optional request conversion, asset, parts, photo, events |
| `#create-work-order-form` | `renderCreateWorkOrder()` inside work focus panel | `createWorkOrder()` | submit | critical full work order create path |
| `#edit-work-order-form` | `renderWorkOrderDetail()` | `updateWorkOrderDetails()` | submit | work order update |
| `#quick-update-work-order-form` | `renderWorkOrderDetail()` | `updateWorkOrderQuickView()` | submit | work order quick update |
| `#complete-work-order-form` | `renderWorkOrderDetail()` | `completeWorkOrder()` | submit | completion, safety check, operational state transition |
| `#comment-form` | `renderWorkOrderDetail()` | `createComment()` | submit | work order comment insert |
| `#photo-form` | `renderWorkOrderDetail()` | `uploadPhoto()` | submit | storage/photo upload and metadata insert |
| `#parts-used-form` | `renderWorkOrderDetail()` | `recordPartUsed()` | submit | work-order parts relationship and inventory movement |
| `#request-form` | `renderRequestFormContent()` | document-level `createRequest(event)` filter | submit | signed-in maintenance request insert and optional photo upload |
| `#public-request-form` | `renderPublicRequestIntake()` | `submitPublicRequest()` | submit | anonymous public QR request insert and optional photo upload |
| `#create-asset-form` | asset section/detail | `createAsset()` | submit | equipment create |
| `#edit-asset-form` | `renderAssetDetail()` | `updateAsset()` | submit | equipment update |
| `#create-part-form` | parts section | `createPart()` | submit | part create |
| `[data-restock-part]` | `renderPart()` / part detail | `restockPart()` | submit | inventory restock |
| `[data-use-part]` | `renderPart()` / part detail | `usePartFromInventory()` | submit | inventory use |
| `[data-edit-part]` | part detail | `updatePart()` | submit | part update |
| `[data-rename-part-source]` | part source manager | `renamePartSource()` | submit | part source rename |
| `[data-part-document]` | part detail | `uploadPartDocument()` | submit | storage/document upload |
| `#create-pm-form` | planning/PM section | `createPreventiveSchedule()` | submit | PM schedule create |
| `#create-procedure-form` | procedure section | `createProcedureTemplate()` | submit | procedure template create |
| `[data-add-step]` | procedure detail/list | `createProcedureStep()` | submit | procedure step create |
| `#add-member-form` | team section | `addCompanyMember()` | submit | direct team member add |
| `[data-member-role]` | team member rows | `updateCompanyMemberRole()` | submit | role/default/mobile tech update |
| `#profile-form` | team profile card | `updateMyProfile()` | submit | profile and mobile tech update |
| `#team-invite-form` | team section | `createTeamInvite()` | submit | invite create and default-location onboarding path |
| `#message-thread-form` | messages section | `createMessageThread()` | submit | message thread create |
| `#message-reply-form` | messages section | `sendThreadReply()` | submit | message reply insert |
| `#app-issue-report-form` | report issue mode | `createAppIssueReport()` | submit | app issue report insert |
| `[data-app-issue-status]` | Admin Setup issue report panel | `updateAppIssueReportStatus()` | submit | app issue report status update |
| `#company-settings-form` | settings section | `updateCompanySettings()` | submit | company settings update |
| `#company-logo-form` | settings section | `uploadCompanyLogo()` | submit | storage/logo upload and company update |
| `#location-form` | settings section | `createLocation()` | submit | location create |
| `#public-app-url-form` | public request link manager | `savePublicAppUrl()` | submit | public app URL setting |

## Major Button Contracts

| Selector | Rendered By | Consumed By | Workflow |
| --- | --- | --- | --- |
| `#new-company` | sidebar workspace controls | `renderCompanyCreate()` | show create company screen |
| `[data-sign-out]` | sidebar/desktop sign out | Supabase auth sign out | sign out |
| `[data-section]` | section nav | section-switch handler | navigation, active section localStorage |
| `[data-command-action="quick-fix"]` | command stack | command action handler | open Quick Fix |
| `[data-command-action="create-work-order"]` | command stack | command action handler | open full work order create |
| `[data-command-action="request"]` | command stack | command action handler | open requests and reload queue |
| `[data-command-action="report-issue"]` | command stack | command action handler | open report issue |
| `[data-command-action="export-csv"]` | command stack | `exportActiveSectionCsv()` | CSV export |
| `#back-to-my-work` | work focus panel | local handler | clear active work/asset/create/quick fix state |
| `#back-to-equipment` | asset detail | local handler | clear active asset and pending delete state |
| `[data-quick-status]` | work cards/detail actions | `setWorkOrderStatus()` | fast status update |
| `[data-assign-me]` | work cards/detail actions | `assignWorkOrderToMe()` | technician self-assignment |
| `[data-card-assign]` | work card assignment form | `assignWorkOrderFromCard()` | assignment update |
| `[data-delete-work-order]` / `[data-confirm-delete-work-order]` | work detail/card | delete guard handlers | work order delete |
| `[data-delete-asset]` / `[data-confirm-delete-asset]` | asset detail/card | delete guard handlers | equipment delete |
| `[data-convert-request]` | request card | `convertRequestToWorkOrder()` | request conversion |
| `[data-quick-fix-request]` | request card | `openQuickFixForRequest()` | request to Quick Fix path |
| `[data-delete-request]` / `[data-confirm-delete-request]` | request card | delete guard handlers | maintenance request delete |
| `[data-create-public-request-link]` | public link manager | `createPublicRequestLink()` | create QR link |
| `[data-disable-public-request-link]` | public link manager | `disablePublicRequestLink()` | disable QR link |
| `[data-enable-public-request-link]` | public link manager | `setPublicRequestLinkActive()` | reactivate QR link |
| `[data-regenerate-public-request-link]` | public link manager | `regeneratePublicRequestLink()` | regenerate QR link |
| `[data-copy-public-request-link]` | public link manager | clipboard helper | copy QR link |
| `[data-generate-pm]` | PM schedule card | `generatePreventiveWorkOrder()` | PM to work order |
| `[data-delete-schedule]` / `[data-confirm-delete-schedule]` | PM schedule card | delete guard handlers | PM schedule delete |
| `[data-create-follow-up]` | work detail/planning | `createFollowUpWorkOrder()` | follow-up work order create |
| `#seed-sample-procedure` | procedure section | `seedSampleProcedure()` | sample procedure seed |
| `[data-delete-procedure]` / `[data-confirm-delete-procedure]` | procedure card | delete guard handlers | procedure delete |
| `[data-cancel-invite]` / `[data-confirm-cancel-invite]` | team invite list | invite cancel handlers | invite cancellation |
| `[data-open-part]` / `[data-close-part-detail]` | parts list/detail | part detail handlers | part detail navigation |
| `[data-toggle-part-sources]` | parts section | source manager toggle | show/hide source manager |

## Major Input, Select, Textarea, And Name Contracts

| Selector/Name | Rendered By | Consumed By | Risk |
| --- | --- | --- | --- |
| `#company-select` | sidebar controls | company change handler | high: reloads app company context |
| `#location-select` | sidebar controls | location switch handler | critical: active location persistence and reload |
| `[data-location-select]` | mobile/desktop command stack | location switch handler | critical: active location persistence and reload |
| `[data-location-sensitive-asset]` | request/work/equipment forms | `updateAssetLocationWarning()` | high: prevents confusing cross-location equipment selection |
| `.workspace-search-input` | command stack search | search input handler | medium: global search, request reload, work-order search mode |
| `#message-search` | messages section | message search handler | low/medium |
| `#message-thread-type` | message thread form | message composer sync | medium: direct/company/location field behavior |
| `#status-select` | work order detail | `updateWorkOrderStatus()` | critical: status mutation |
| `input[name="safety_devices_checked"]` | quick update/completion forms | `syncSafetyDeviceChecks()` | critical: completion safety gate consistency |
| `#part-search` inside `#part-search-form` | parts search | part search handlers | low/medium |
| `#quick-update-*` field IDs | work detail jump links | `[data-jump-work-section]` | medium: field focus/jump behavior |

## Major Data Attribute Contracts By Workflow Area

### Navigation, Search, Paging, And State

- `[data-section]`
- `[data-command-action]`
- `[data-location-select]`
- `[data-location-sensitive-asset]`
- `[data-search-work-order]`
- `[data-search-asset]`
- `[data-search-part]`
- `[data-search-request]`
- `[data-search-section]`
- `[data-view-work-search]`
- `[data-close-work-search]`
- `[data-status-filter]`
- `[data-my-work-filter]`
- `[data-work-order-filter]`
- `[data-clear-assignee-filter]`
- `[data-work-sort]`
- `[data-work-page]`
- `[data-parts-page]`
- `[data-assets-page]`
- `[data-list-page]`
- `[data-page-direction]`

### Work Orders And Quick Fix

- `[data-quick-status]`
- `[data-id]`
- `[data-assign-me]`
- `[data-card-assign]`
- `[data-delete-work-order]`
- `[data-cancel-delete-work-order]`
- `[data-confirm-delete-work-order]`
- `[data-mini-work-order]`
- `[data-open-linked-work-order]`
- `[data-create-follow-up]`
- `[data-copy-downtime]`
- `[data-jump-work-section]`
- `[data-step-result]`
- `[data-work-order-id]`

### Requests And Public QR

- `[data-request-filter]`
- `[data-convert-request]`
- `[data-quick-fix-request]`
- `[data-delete-request]`
- `[data-cancel-delete-request]`
- `[data-confirm-delete-request]`
- `[data-create-public-request-link]`
- `[data-copy-public-request-link]`
- `[data-disable-public-request-link]`
- `[data-enable-public-request-link]`
- `[data-regenerate-public-request-link]`

### Equipment

- `[data-asset-id]`
- `[data-open-asset]`
- `[data-quick-fix-asset]`
- `[data-delete-asset]`
- `[data-cancel-delete-asset]`
- `[data-confirm-delete-asset]`
- `[data-asset-status-filter]`

### Parts

- `[data-open-part]`
- `[data-close-part-detail]`
- `[data-part-inventory-filter]`
- `[data-restock-part]`
- `[data-use-part]`
- `[data-edit-part]`
- `[data-delete-part]`
- `[data-cancel-delete-part]`
- `[data-toggle-part-sources]`
- `[data-rename-part-source]`
- `[data-part-document]`

### PM, Procedures, And Checklist Results

- `[data-generate-pm]`
- `[data-delete-schedule]`
- `[data-cancel-delete-schedule]`
- `[data-confirm-delete-schedule]`
- `[data-add-step]`
- `[data-delete-procedure]`
- `[data-cancel-delete-procedure]`
- `[data-confirm-delete-procedure]`
- `[data-step-result]`

### Messages, Team, Settings, And Issue Reports

- `[data-message-thread]`
- `[data-message-filter]`
- `[data-start-work-message]`
- `[data-open-work-message-thread]`
- `[data-clear-message-work-link]`
- `[data-quick-reply]`
- `[data-member-role]`
- `[data-view-member-work]`
- `[data-cancel-invite]`
- `[data-cancel-invite-cancel]`
- `[data-confirm-cancel-invite]`
- `[data-setup-action]`
- `[data-app-issue-status]`
- `[data-cancel-app-issue-report]`

## Event Listener Inventory By Area

| Area | Main Listener Contracts | Consuming Handlers | Eventual Workflow |
| --- | --- | --- | --- |
| Company/location | `#company-select`, `#location-select`, `[data-location-select]` | inline handlers, `persistActiveLocationId()`, `reloadWorkOrderQueue()`, `reloadRequestQueue()` | company switch, active location hard-save, queue reload |
| Section navigation | `[data-section]`, `[data-command-action]` | inline handlers | section, Quick Fix, new work order, request panel, report issue, export |
| App issue reports | `#app-issue-report-form`, `[data-app-issue-status]`, `[data-cancel-app-issue-report]` | `createAppIssueReport()`, `updateAppIssueReportStatus()` | issue submit/update |
| Messages | `[data-message-thread]`, `[data-message-filter]`, `[data-open-linked-work-order]`, `[data-start-work-message]`, `[data-open-work-message-thread]`, `#message-search`, `#message-thread-form`, `#message-reply-form`, `[data-quick-reply]` | message handlers and inline state setters | thread open/read, filtering, work link, reply/create |
| Search and list navigation | `.workspace-search-input`, `[data-view-work-search]`, `[data-close-work-search]`, `[data-search-*]`, `[data-work-page]`, `[data-parts-page]`, `[data-assets-page]`, `[data-list-page]` | reload/render handlers | paged search and list continuity |
| Work cards/detail | `.work-card`, `[data-mini-work-order]`, `[data-quick-status]`, `[data-assign-me]`, `[data-card-assign]`, `#status-select`, `#edit-work-order-form`, `#quick-update-work-order-form`, `#complete-work-order-form` | work-order handlers | open/update/status/assign/complete |
| Work relationships | `#comment-form`, `#photo-form`, `#parts-used-form`, `[data-step-result]`, `[data-create-follow-up]` | comment/photo/part/checklist/follow-up handlers | relationship mutations |
| Requests | `[data-request-filter]`, `[data-convert-request]`, `[data-quick-fix-request]`, delete request controls, `#request-form` top-level submit filter | request handlers | request filter/create/convert/delete |
| Public QR links | QR link data buttons, `#public-app-url-form` | public link handlers | QR link create/copy/disable/reactivate/regenerate |
| Equipment | `.asset-card`, `[data-asset-id]`, `[data-open-asset]`, `[data-quick-fix-asset]`, `#create-asset-form`, `#edit-asset-form`, delete asset controls | asset handlers | open/create/update/delete/quick fix from equipment |
| Parts | `#create-part-form`, `#part-search-form`, part data forms/buttons | part handlers | create/search/detail/restock/use/update/delete/source/document |
| PM/procedure | `#create-pm-form`, `[data-generate-pm]`, schedule delete controls, `#create-procedure-form`, `#seed-sample-procedure`, `[data-add-step]`, procedure delete controls | PM/procedure handlers | schedule create/generate/delete, template/step/checklist |
| Team/settings | `#add-member-form`, `[data-member-role]`, `[data-view-member-work]`, `#profile-form`, `#team-invite-form`, invite cancel controls, settings forms | team/settings handlers | member add/update, role/default/mobile tech, invite, company/logo/location |

## Highest-Risk Contracts Not To Rename Casually

These selectors are operational contracts. Renaming or moving them without handler updates and smoke tests can break workflows silently:

- `#quick-fix-form`
- `#create-work-order-form`
- `#edit-work-order-form`
- `#quick-update-work-order-form`
- `#complete-work-order-form`
- `#status-select`
- `input[name="safety_devices_checked"]`
- `#request-form`
- `#public-request-form`
- `[data-command-action]` and its values: `quick-fix`, `create-work-order`, `request`, `report-issue`, `export-csv`
- `[data-location-select]` and `#location-select`
- `[data-convert-request]`
- `[data-quick-fix-request]`
- `[data-step-result]`
- `[data-card-assign]`
- delete-confirm pairs: `[data-delete-*]`, `[data-cancel-delete-*]`, `[data-confirm-delete-*]`
- `.work-card` / `.asset-card` with `data-id` or `data-asset-id`
- `[data-create-public-request-link]`, `[data-disable-public-request-link]`, `[data-enable-public-request-link]`, `[data-regenerate-public-request-link]`
- `[data-member-role]`
- `#team-invite-form`

## Missing Or Implicit Contracts Discovered

1. `renderWorkspace()` and `bindWorkspaceEvents()` rely on a full re-render, then immediate rebinding. There is no central contract map between emitted markup and consumed selectors.
2. `#request-form` is submitted through a top-level document submit listener, not `bindWorkspaceEvents()`. This was a deliberate prior fix, but it is easy to miss during extraction.
3. Auth and public QR intake have separate renderer-local listeners outside workspace binding. They need a separate extraction boundary from signed-in workspace flows.
4. Dynamic IDs such as `#workspace-search${suffix}`, `#show-quick-fix${suffix}`, `#show-create-work-order${suffix}`, `#show-request${suffix}`, `#show-report-issue${suffix}`, and `#export-csv${suffix}` are rendered for desktop/mobile variants, but behavior mostly relies on shared `data-command-action` contracts.
5. `[data-jump-work-section]` builds a selector dynamically from the data value. The target ID must exist in the detail form or the field-jump experience quietly does nothing.
6. `.work-card` and `.asset-card` are both visual classes and behavior hooks. They are not purely CSS classes.
7. Delete workflows rely on global pending IDs plus `data-confirm-*` buttons. This coupling should remain untouched until delete guards are isolated and smoke-tested.
8. Safety check sync uses `input[name="safety_devices_checked"]`, not a single ID. Future render changes must preserve the shared name contract.
9. File upload forms rely on implicit input names and browser file-picker behavior. They need dedicated smoke tests before any extraction touching photos/documents.
10. Many handlers mutate global state and then call `renderWorkspace()`. The visual result depends on state reset order, localStorage writes, and reload timing.

## Required Smoke Tests Before Future Workflow Extraction

Any phase that changes event contracts, workflow handlers, or render ownership should append explicit TEST/STEPS/EXPECTED/RESULT/NOTES entries to `docs/QA_LOG.md`.

Minimum high-priority smoke paths:

- Quick Fix create/open/complete.
- Full work order create/open/edit/status/complete/delete.
- Request submit, request conversion, request delete.
- Public QR anonymous submit.
- Location switch and reload persistence.
- Equipment open/create/edit/delete guard.
- Parts create/search/restock/use/update/delete.
- PM create/generate/delete.
- Procedure create/add step/checklist result/delete.
- Comment/photo/parts/steps relationship actions.
- Issue report submit/update.
- Team role/default/mobile tech/invite paths.

## Recommendation

Workflow extraction should remain blocked for now.

The next controlled phase should be LFES Phase 3C smoke-test matrix and contract guard planning. That phase should define reproducible smoke tests for the highest-risk contracts before moving Quick Fix, work-order mutations, request conversion, public QR submit, delete workflows, storage/photo/document flows, PM/procedure/checklist flows, Team/admin flows, or active-location persistence.

