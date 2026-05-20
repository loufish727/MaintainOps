# LFES Phase 2H Mutation Boundary Plan

Planning only. No code, service files, functions, Supabase policies, SQL, rendering, event binding, or business logic changed during this phase.

## Purpose

This plan maps the remaining mutation boundaries in `app.js` before any write-path service extraction. The goal is to avoid moving operational workflow code blindly. A service wrapper is useful only if it preserves company isolation, location assumptions, role assumptions, error visibility, rollback paths, and Debug Protocol coverage.

## Summary

- True remaining Supabase/RPC/storage mutation-boundary call sites found: **69**
- Related storage signed URL read boundaries found but not counted as mutations: **4**
- Risk category counts:
  - Critical: **32**
  - High: **24**
  - Medium: **11**
  - Low: **2**

The lowest-risk mutation candidate is the app issue report mutation pair:

- `createAppIssueReport()` insert into `app_issue_reports`
- `updateAppIssueReportStatus()` update on `app_issue_reports`

Even that should not move until explicitly approved and tested, because it still depends on UI form state and `reloadAppIssueReports()`.

The highest-risk mutation areas are:

- public anonymous QR request submit,
- invite acceptance/default-location onboarding,
- Quick Fix and work-order creation/update/status/assignment,
- request conversion,
- delete workflows,
- PM generation,
- procedure/template delete and checklist behavior,
- comments/photos/parts/step-result relationships,
- storage uploads/removes and photo metadata.

## Risk Definitions

- Low: scoped simple mutation, no workflow branching, easy rollback.
- Medium: mutation with UI state/render coupling.
- High: workflow mutation, company/location dependency, or multi-table relationship.
- Critical: auth, tenant isolation, public anonymous boundary, delete workflow, storage/photo, request conversion, work-order creation/status/assignment.

## All Remaining Mutation-Boundary Call Sites

| # | Line | Function | Mutation | Data/table affected | Risk | Safe to move later? |
|---|---:|---|---|---|---|---|
| 1 | 569 | `renderPublicRequestQrPage` | RPC `get_public_request_intake` | public request intake by token | Critical | No, public boundary plan first |
| 2 | 629 | `renderPublicRequestIntake` | RPC `get_public_request_intake` | public request intake by token | Critical | No, public boundary plan first |
| 3 | 712 | `submitPublicRequest` | RPC `submit_public_location_request` | public request creation | Critical | No, keep until public QR plan |
| 4 | 905 | `createCompany` | RPC `create_company` | company creation | High | Maybe, after company boundary plan |
| 5 | 934 | `ensureProfileForActiveCompany` | RPC `ensure_company_profile` | profile/company setup | High | Maybe, after auth/company plan |
| 6 | 949 | `acceptTeamInvites` | RPC `accept_company_invites` | invite acceptance/default location | Critical | No, real second-user QA first |
| 7 | 958 | `seedStarterAssets` | insert | `assets` seed records | Medium | Maybe, setup-only plan |
| 8 | 3669 | `insertWithOptionalProcedure` | insert | dynamic work-order/procedure path | Critical | No, work-order creation plan first |
| 9 | 3684 | `updateWithOptionalProcedure` | update | dynamic work-order/procedure path | Critical | No, work-order update plan first |
| 10 | 6655 | `createAsset` | insert | `assets` | High | Maybe, after equipment mutation plan |
| 11 | 6706 | `updateAsset` | update | `assets` | High | Maybe, after equipment mutation plan |
| 12 | 6737 | `updateAssetStatus` | update | `assets.status` | High | Maybe, status affects work context |
| 13 | 6844 | `deleteAsset` | delete | `assets` | Critical | No, delete guard workflow |
| 14 | 6881 | `createQuickFixAsset` | insert | `assets` from Quick Fix/work order | Critical | No, Quick Fix boundary |
| 15 | 6968 | `deletePreventiveSchedule` | delete | `preventive_schedules` | Critical | No, delete workflow |
| 16 | 7019 | `createProcedureTemplate` | insert | `procedure_templates` | High | Maybe, procedure plan first |
| 17 | 7057 | `seedSampleProcedure` | insert | sample `procedure_templates` | Medium | Maybe, setup/sample-only |
| 18 | 7082 | `seedSampleProcedure` | insert | sample `procedure_steps` | Medium | Maybe, setup/sample-only |
| 19 | 7114 | `createProcedureStep` | insert | `procedure_steps` | High | Maybe, checklist QA required |
| 20 | 7220 | `deleteProcedureTemplate` | delete | `procedure_templates` | Critical | No, live delete blockers |
| 21 | 7270 | `addCompanyMember` | insert | `company_members` | High | Maybe, team/admin boundary |
| 22 | 7301 | `updateCompanyMemberRole` | RPC `update_company_member_role` | role mutation | Critical | No, role/security boundary |
| 23 | 7348 | `updateMyProfile` | upsert | `profiles.mobile_tech/full_name` | High | Maybe, mobile-tech QA required |
| 24 | 7396 | `createTeamInvite` | RPC `create_company_invite` | invite/default location | Critical | No, invite QA first |
| 25 | 7431 | `cancelTeamInvite` | RPC `cancel_company_invite` | invite cancellation | High | Maybe, team boundary |
| 26 | 7505 | `createMessageThread` | insert | `message_threads` | High | Maybe, message plan first |
| 27 | 7525 | `createMessageThread` | insert | `message_thread_members` | High | Maybe, message plan first |
| 28 | 7597 | `markMessageThreadRead` | upsert | `message_reads` | Medium | Maybe, after message read-state plan |
| 29 | 7608 | `insertThreadMessage` | insert | `messages` | High | Maybe, message plan first |
| 30 | 7623 | `insertThreadMessage` | update | `message_threads.updated_at` | Medium | Maybe, tied to message insert |
| 31 | 7657 | `updateCompanySettings` | update | `companies.name` | Medium | Maybe, simple company setting |
| 32 | 7696 | `uploadCompanyLogo` | storage upload | `company-logos` bucket | Critical | No, storage plan first |
| 33 | 7711 | `uploadCompanyLogo` | RPC `set_company_logo` | company logo metadata | High | No, storage/company combo |
| 34 | 7830 | `createAppIssueReport` | insert | `app_issue_reports` | Low | Yes, lowest-risk candidate |
| 35 | 7866 | `updateAppIssueReportStatus` | update | `app_issue_reports.status` | Low | Yes, lowest-risk candidate |
| 36 | 7901 | `createPublicRequestLink` | RPC `ensure_location_request_link` | `public_request_links` | High | Maybe, QR admin plan first |
| 37 | 7988 | `updatePublicRequestLink` | update | `public_request_links` | High | Maybe, QR admin plan first |
| 38 | 8090 | `createPart` | insert | `parts` | Medium | Maybe, parts mutation plan |
| 39 | 8144 | `restockPart` | update | `parts.quantity_on_hand` | Medium | Maybe, inventory plan |
| 40 | 8182 | `usePartFromInventory` | update | `parts.quantity_on_hand` | Medium | Maybe, inventory plan |
| 41 | 8230 | `updatePart` | update | `parts` | Medium | Maybe, parts mutation plan |
| 42 | 8313 | `deletePart` | storage remove | `part-documents` bucket | Critical | No, delete/storage workflow |
| 43 | 8325 | `deletePart` | delete | `parts` | Critical | No, delete workflow |
| 44 | 8407 | `renamePartSource` | update | `parts.supplier_name` | Medium | Maybe, scoped simple update |
| 45 | 8460 | `uploadPartDocument` | storage upload | `part-documents` bucket | Critical | No, storage/document plan |
| 46 | 8471 | `uploadPartDocument` | insert | `part_documents` metadata | Critical | No, storage/document plan |
| 47 | 8547 | `addPartUsageToWorkOrder` | insert | `work_order_parts` | High | No, work-order relation plan |
| 48 | 8553 | `addPartUsageToWorkOrder` | insert retry | `work_order_parts` | High | No, retry/fallback behavior |
| 49 | 8563 | `addPartUsageToWorkOrder` | update | `parts.quantity_on_hand` | High | No, multi-table inventory relation |
| 50 | 8611 | `generatePreventiveWorkOrder` | update | `preventive_schedules.next_due_at` | Critical | No, PM generation workflow |
| 51 | 8951 | `createQuickFix` | update | source `maintenance_requests` | Critical | No, Quick Fix/request boundary |
| 52 | 9291 | `createRequestFromForm` | insert | `maintenance_requests` | High | Maybe, request plan first |
| 53 | 9359 | `convertRequestToWorkOrder` | update | `maintenance_requests` conversion fields | Critical | No, request conversion |
| 54 | 9418 | `deleteMaintenanceRequest` | storage remove | `maintenance-request-photos` bucket | Critical | No, delete/storage workflow |
| 55 | 9428 | `deleteMaintenanceRequest` | delete | `maintenance_requests` | Critical | No, delete workflow |
| 56 | 9485 | `saveStepResult` | upsert | `work_order_step_results` | High | No, checklist workflow |
| 57 | 9597 | `deleteWorkOrder` | storage remove | `work-order-photos` bucket | Critical | No, delete/storage workflow |
| 58 | 9609 | `deleteWorkOrder` | delete | `work_orders` | Critical | No, delete workflow |
| 59 | 9643 | `assignWorkOrderToMe` | update | `work_orders.assigned_to` | Critical | No, assignment guardrails |
| 60 | 9689 | `assignWorkOrderFromCard` | update | `work_orders.assigned_to` | Critical | No, assignment guardrails |
| 61 | 9774 | `addCommentToWorkOrder` | insert | `work_order_comments` | High | Maybe, relation plan first |
| 62 | 9782 | `addCommentToWorkOrder` | insert retry | `work_order_comments` | High | No, retry/profile fallback |
| 63 | 9830 | `removeUploadedObject` | storage remove | variable bucket | Critical | No, storage cleanup boundary |
| 64 | 9847 | `addPhotoToWorkOrder` | storage upload | `work-order-photos` bucket | Critical | No, storage/photo plan |
| 65 | 9869 | `addPhotoToWorkOrder` | insert | `work_order_photos` metadata | Critical | No, storage/photo plan |
| 66 | 9878 | `addPhotoToWorkOrder` | insert retry | `work_order_photos` metadata | Critical | No, retry/storage cleanup |
| 67 | 9894 | `addPhotoToMaintenanceRequest` | storage upload | `maintenance-request-photos` bucket | Critical | No, storage/public request boundary |
| 68 | 9904 | `addPhotoToMaintenanceRequest` | RPC `attach_maintenance_request_photo` | request photo metadata | Critical | No, storage/public request boundary |
| 69 | 10224 | `recordWorkOrderEvent` | insert | `work_order_events` | High | Maybe, event service after workflow map |

## Related Storage Signed URL Boundaries

These are not write mutations, but they are storage/security boundaries and should stay visible during future storage planning:

| Line | Function | Boundary | Bucket | Risk |
|---:|---|---|---|---|
| 850 | `loadCompanyLogoUrls` | signed URL | `company-logos` | Medium |
| 1894 | `addSignedPhotoUrls` | signed URL | `work-order-photos` | High |
| 1907 | `addSignedRequestPhotoUrls` | signed URL | `maintenance-request-photos` | High |
| 1922 | `addSignedPartDocumentUrls` | signed URL | `part-documents` | High |

## Cross-Cutting Assumptions

### Company/Location Assumptions

- Company-owned rows must include or filter by `activeCompanyId`.
- Location-scoped operational rows must use the active location unless selected equipment intentionally routes the record elsewhere.
- Equipment-driven routing must stay intentional and visible to the user.
- Saved location behavior is sensitive and recently fixed; mutation extraction must not alter location persistence.
- Public QR requests are location-specific and token-scoped.

### Auth/Session Assumptions

- Mutations assume a valid Supabase auth session except public QR submit and public QR intake.
- Team/role mutations assume manager/admin privileges enforced by RLS/RPC.
- Technician assignment behavior is policy-backed and must not be reduced to UI-only logic.
- Public QR submit must continue to work for users outside the company without login.

### UI/Rendering Dependencies

- Most mutations disable/restore submit buttons, display form errors, call `showNotice()`, reload data, and call `renderWorkspace()`.
- Many mutation functions depend on active UI modes:
  - `quickFixMode`
  - `createWorkOrderMode`
  - `reportIssueMode`
  - `activeWorkOrderId`
  - `activeAssetId`
  - `activePartId`
  - pending delete IDs.
- Moving raw DB calls is safer than moving whole workflow functions.

### Event-Binding Dependencies

Most mutations are triggered from `bindWorkspaceEvents()` through:

- form submit listeners,
- `data-*` buttons,
- card click handlers,
- location/team/settings controls,
- status and checklist inputs.

Mutation movement must preserve the rendered `data-*` contract and form names. A service extraction should not change event selectors.

### RLS/Company-Isolation Impact

- RLS remains the real enforcement boundary.
- Service wrappers must require explicit `companyId` when the table is company-owned.
- Public request helpers must stay RPC/token scoped and must not expose direct anonymous table access.
- Delete and assignment workflows must preserve manager/admin/technician guardrails.

## Debug Protocol Requirements By Mutation Domain

### App Issue Reports

- Settings/Admin Setup loads.
- Report Issue opens.
- Submit QA report if cleanup is planned.
- Status update works.
- `appIssueReportsService` read reload still works.

### Company/Team/Invite

- Sign in/out.
- Company loads.
- Team opens.
- Role model still shows Technician/Manager/Admin.
- My Profile Mobile tech persists.
- Invite create/cancel works.
- Real second-user invite acceptance starts in default location.

### Public QR And Requests

- Public QR form opens signed out.
- Public QR request submit works without login.
- Internal request submit works.
- Request photo still attaches.
- Active/Converted/All still separate.
- Request conversion creates work order and removes converted request from Active.
- Request delete removes QA request and photo cleanup still behaves.

### Work Orders

- Quick Fix create/open/delete.
- Full work order create.
- Quick update.
- Complete with and without safety checks.
- Status changes.
- Assign to me and manager assignment.
- Comments.
- Photos.
- Checklist step result.
- Work-order history/events.
- Completed work hidden by default unless selected.

### Equipment

- Equipment create/update/status.
- Cross-location equipment warning.
- Quick Fix new equipment creation.
- Delete unused QA equipment.
- Linked equipment delete remains blocked.

### Parts/Documents

- Part create/update/use/restock/source rename.
- Part document upload.
- Delete unused QA part.
- Linked part delete remains blocked.
- Work-order part usage updates inventory.

### PM/Procedures

- PM create.
- Generate preventive work order.
- Next due updates.
- PM delete.
- Procedure create.
- Step create.
- Linked checklist appears on work order.
- Procedure delete blocked when linked.

### Messages

- Message center opens.
- Thread create.
- Reply create.
- Read state updates.
- Linked work-order thread opens.

### Storage

- Company logo upload and display.
- Work-order photo upload/display/delete cleanup.
- Request photo upload/display/delete cleanup.
- Part document upload/display/delete cleanup.

## Recommended Extraction Order

Do not implement yet. If future mutation extraction is approved, the safest order is:

1. `appIssueReportsService` mutations only:
   - `createAppIssueReportRecord(...)`
   - `updateAppIssueReportStatus(...)`
   - Keep form handling, notices, reloads, and rendering in `app.js`.
2. Simple company settings update:
   - company name update only, not logo.
3. Simple part mutations:
   - create/update/restock/use/source rename only.
   - Keep delete, documents, and work-order part usage blocked.
4. Simple equipment create/update/status:
   - Keep delete and Quick Fix equipment creation blocked.
5. Public request link admin mutations:
   - only after QR admin smoke.
6. PM/procedure simple creates:
   - only after checklist QA.

Blocked until much later:

- auth/session/company switching,
- invite acceptance/default-location onboarding,
- public QR submit,
- request conversion,
- Quick Fix/work-order creation/update/status/assignment,
- delete workflows,
- storage/photo/document uploads and removes,
- work-order relationships,
- PM generation,
- message center mutations.

## Recommended Next Controlled Phase

Recommended next phase:

- LFES Phase 2I app issue report mutation wrapper extraction only.

Scope for that future phase, only after approval:

- Create no new broad service; extend `src/services/appIssueReportsService.js`.
- Move only raw `app_issue_reports` insert/update calls.
- Keep `createAppIssueReport(event)` and `updateAppIssueReportStatus(event)` in `app.js`.
- Keep UI state, error text, submit button behavior, reloads, notices, and rendering in `app.js`.
- Run static checks.
- Verify signed-in Settings/Admin Setup/Report Issue.
- Submit and status-update a clearly named QA issue report only if cleanup is acceptable.

Alternate next phase:

- Pause modularization and run a broader live Debug Protocol before moving any mutation.
