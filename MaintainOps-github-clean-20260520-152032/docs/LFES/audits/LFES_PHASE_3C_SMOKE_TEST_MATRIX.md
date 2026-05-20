# LFES Phase 3C Smoke-Test Matrix And Contract Guard Plan

Date: 2026-05-19

Scope: planning and documentation only. No app code, rendering, event binding, Supabase SQL/RLS, wrapper extraction, workflow handler movement, or business logic changed.

## Purpose

Phase 3C turns the Phase 3B DOM/event inventory into a reproducible smoke-test matrix before any workflow handlers move out of `app.js`.

The intent is not paperwork. The intent is to make future refactors prove that the same shop-floor workflows still work after a controlled extraction.

## Smoke-Test Rules

Each implementation phase that touches a listed workflow should append results to `docs/QA_LOG.md` using this format:

```text
TEST:
[name]

STEPS:
[exact actions]

EXPECTED:
[specific observable result]

RESULT:
PASS / FAIL

NOTES:
[unexpected behavior, known gaps, or intentionally skipped verification]
```

Use one safe QA token per pass when creating records, then delete the records through the app delete path when possible.

## Smoke-Test Matrix

### 1. Quick Fix Create / Open / Complete / Delete

TEST:
Quick Fix create/open/complete/delete

STEPS:
1. Sign in as a manager/admin.
2. Confirm Taylor Metal Products loads and the active location is the intended test location.
3. Click `Quick Fix`.
4. Create a QA Quick Fix with a unique token in the issue/title.
5. Open the created work order from My Work or Work Orders.
6. Add a short resolution.
7. Complete it with no equipment selected.
8. Reopen the completed filter/gauge if needed and confirm it is completed.
9. Delete the QA work order through the app delete path.

EXPECTED:
Quick Fix opens, creates a work order in the active location, the detail opens cleanly, completion works without an equipment safety-device requirement, completed work does not clutter default active lists, and delete removes only the QA record.

RESULT:
Not run in Phase 3C.

NOTES:
High-risk contracts: `[data-command-action="quick-fix"]`, `#quick-fix-form`, `.work-card`, `#complete-work-order-form`, delete-confirm work-order controls.

### 2. Work Order Create / Edit / Status / Complete / Delete

TEST:
Full work order create/edit/status/complete/delete

STEPS:
1. Sign in as a manager/admin.
2. Open `New Work Order`.
3. Create a QA work order with a unique token, medium priority, and no equipment.
4. Open the new work order detail.
5. Edit at least one field through the full edit form.
6. Change status through the detail status select.
7. Use quick update if visible and save one field.
8. Complete the work order.
9. Delete the QA work order through the app delete path.

EXPECTED:
Full create, detail open, edit, status change, quick update, completion, and delete all work without console errors or wrong-location routing.

RESULT:
Not run in Phase 3C.

NOTES:
High-risk contracts: `[data-command-action="create-work-order"]`, `#create-work-order-form`, `#edit-work-order-form`, `#quick-update-work-order-form`, `#status-select`, `#complete-work-order-form`, `[data-delete-work-order]`, `[data-confirm-delete-work-order]`.

### 3. Request Conversion

TEST:
Signed-in request submit and conversion to work order

STEPS:
1. Sign in as a manager/admin.
2. Open `Submit Request`.
3. Create a signed-in QA request with a unique token.
4. Confirm the request appears in the active requests queue.
5. Click `Convert to Work Order`.
6. Open the converted work order.
7. Confirm the original request is marked converted and not mixed into the active request queue.
8. Delete the QA work order and request if safe through app delete paths.

EXPECTED:
The request saves in the active location, converts to a work order, converted requests stay visually separated from active requests, and cleanup deletes only QA records.

RESULT:
Not run in Phase 3C.

NOTES:
High-risk contracts: document-level `#request-form` submit listener, `[data-convert-request]`, `[data-quick-fix-request]`, `[data-request-filter]`, `[data-delete-request]`, `[data-confirm-delete-request]`.

### 4. Public QR Request Submit And Manager Visibility

TEST:
Public QR anonymous request submit and manager visibility

STEPS:
1. From Settings, copy or open the active location's public request link.
2. Open the link in a signed-out or fresh browser context.
3. Submit a public request with a unique token, requester name, description, and no photo unless photo testing is in scope.
4. Return to the signed-in manager session.
5. Confirm the request appears under the correct location.
6. Convert or delete the QA request through the app if safe.

EXPECTED:
Anonymous request intake loads without app login, saves to the QR link's location, and is visible to the manager in that location only.

RESULT:
Not run in Phase 3C.

NOTES:
High-risk contracts: `#public-request-form`, public request token routing, public request link location scope, `[data-copy-public-request-link]`, `[data-regenerate-public-request-link]`.

### 5. Location Switch And Reload Persistence

TEST:
Location switch and reload persistence

STEPS:
1. Sign in as a manager/admin.
2. Select Salem, OR from the location switcher.
3. Reload the app.
4. Confirm Salem, OR remains active.
5. Switch to another allowed location intentionally.
6. Reload again.
7. Confirm the intentionally selected location remains active.
8. Switch back to Salem, OR before ending the pass if that is the desired working location.

EXPECTED:
The scoped hard-save location wins after reload. The app does not unexpectedly revert to Auburn or another first-location fallback after intentional selection.

RESULT:
Not run in Phase 3C.

NOTES:
High-risk contracts: `#location-select`, `[data-location-select]`, `persistActiveLocationId()`, scoped localStorage key, legacy migration behavior.

### 6. Parts Use / Restock

TEST:
Parts use/restock

STEPS:
1. Sign in as a manager/admin.
2. Open Parts.
3. Create or select a safe QA part.
4. Restock the part by a small quantity.
5. Use the part by a smaller quantity.
6. Confirm the displayed quantity changes correctly.
7. Delete the QA part if it was created for the test.

EXPECTED:
Restock and use submit without saving-state lockups, the inventory quantity updates, and part cleanup works through the app path.

RESULT:
Not run in Phase 3C.

NOTES:
High-risk contracts: `#create-part-form`, `[data-restock-part]`, `[data-use-part]`, `[data-open-part]`, `[data-delete-part]`, `[data-confirm-delete-part]`.

### 7. PM Generation To Work Order

TEST:
PM generation to work order

STEPS:
1. Sign in as a manager/admin.
2. Open Planning or PM area.
3. Create a QA preventive schedule with a unique token.
4. Click generate work order.
5. Open the generated PM work order.
6. Confirm it appears in the correct location with PM context.
7. Delete the generated QA work order and QA schedule if safe.

EXPECTED:
PM schedule creation works, generated work order is created in the expected location, and cleanup does not remove non-QA schedules.

RESULT:
Not run in Phase 3C.

NOTES:
High-risk contracts: `#create-pm-form`, `[data-generate-pm]`, `[data-delete-schedule]`, `[data-confirm-delete-schedule]`.

### 8. Procedure / Checklist Update

TEST:
Procedure template, checklist attach, and checklist result update

STEPS:
1. Sign in as a manager/admin.
2. Create a QA procedure template with a unique token.
3. Add one required QA step.
4. Create or open a safe QA work order.
5. Attach/use the procedure if the current UI path supports it.
6. Confirm the checklist step appears on the work order.
7. Toggle the step result.
8. Delete the QA work order/procedure if safe.

EXPECTED:
Procedure steps persist, linked checklist steps display on the work order, and step result changes save.

RESULT:
Not run in Phase 3C.

NOTES:
High-risk contracts: `#create-procedure-form`, `[data-add-step]`, `[data-step-result]`, `[data-delete-procedure]`, `[data-confirm-delete-procedure]`.

### 9. Issue Report Submit / Update

TEST:
Issue report submit/update

STEPS:
1. Sign in as a manager/admin.
2. Click `Report Issue`.
3. Submit a QA issue report with a unique token.
4. Open Admin Setup issue report area.
5. Confirm the issue appears.
6. Update the issue status if safe.

EXPECTED:
Report Issue opens, submits through the wrapper service, appears in the admin issue list, and status update saves.

RESULT:
Not run in Phase 3C.

NOTES:
High-risk contracts: `[data-command-action="report-issue"]`, `#app-issue-report-form`, `[data-app-issue-status]`, `[data-cancel-app-issue-report]`.

### 10. Team Invite / Member Role Display

TEST:
Team invite/member role display

STEPS:
1. Sign in as a manager/admin.
2. Open Team.
3. Confirm current team members display with role/default location/mobile tech controls.
4. Create a QA invite only if a safe test email/token is available.
5. Confirm invite appears with default location display.
6. Cancel the QA invite through the app if created.
7. Do not modify real teammate roles during smoke unless explicitly approved.

EXPECTED:
Team displays roles, default locations, and invites. Safe QA invite create/cancel works if used. Real role data is not disturbed.

RESULT:
Not run in Phase 3C.

NOTES:
High-risk contracts: `#team-invite-form`, `[data-member-role]`, `[data-cancel-invite]`, `[data-confirm-cancel-invite]`, `#profile-form`.

### 11. Technician Assignment Guardrail

TEST:
Technician assignment guardrail

STEPS:
1. Sign in as a technician or technician-equivalent test user.
2. Open Work Orders.
3. Find an unassigned QA work order.
4. Assign it to self if allowed.
5. Confirm assigning to another user, assigning an outside vendor, clearing assignment, or taking work already assigned to someone else is not allowed.
6. Confirm manager/admin assignment controls still work in a manager/admin session.

EXPECTED:
Technicians can claim allowed unassigned work for themselves but cannot assign work to others or bypass ownership guardrails. Managers/admins retain appropriate assignment controls.

RESULT:
Not run in Phase 3C.

NOTES:
High-risk contracts: `[data-assign-me]`, `[data-card-assign]`, role-aware assignment UI, `assignWorkOrderToMe()`, `assignWorkOrderFromCard()`.

### 12. Photo / Document Upload Path

TEST:
Photo/document upload path

STEPS:
1. Sign in as a manager/admin.
2. Use a safe small image file for work-order photo upload.
3. Attach the photo to a QA work order.
4. Confirm preview/link appears.
5. Submit a request with a photo if safe.
6. Attach a small document/photo to a QA part if safe.
7. Open the uploaded file links where available.
8. Delete QA records if safe; storage object cleanup may require separate handling if app delete does not remove every object.

EXPECTED:
Uploads optimize where expected, metadata saves, previews/links appear, and no size-limit or storage errors occur for safe files.

RESULT:
Not run in Phase 3C.

NOTES:
High-risk contracts: `#photo-form`, `#request-form input[name="photo"]`, `#public-request-form input[name="photo"]`, `[data-part-document]`, storage buckets, signed URL loading, image optimization helper.

## Contract Guard Plan

### High-Risk DOM IDs

Do not rename these without updating handlers and rerunning the relevant smoke tests:

- `#location-select`
- `#company-select`
- `#quick-fix-form`
- `#create-work-order-form`
- `#edit-work-order-form`
- `#quick-update-work-order-form`
- `#complete-work-order-form`
- `#status-select`
- `#comment-form`
- `#photo-form`
- `#parts-used-form`
- `#request-form`
- `#public-request-form`
- `#create-asset-form`
- `#edit-asset-form`
- `#create-part-form`
- `#create-pm-form`
- `#create-procedure-form`
- `#team-invite-form`
- `#profile-form`
- `#app-issue-report-form`
- `#public-app-url-form`
- `#company-settings-form`
- `#company-logo-form`
- `#location-form`

### High-Risk Form IDs

Highest-risk form contracts:

- `#quick-fix-form`
- `#create-work-order-form`
- `#edit-work-order-form`
- `#quick-update-work-order-form`
- `#complete-work-order-form`
- `#request-form`
- `#public-request-form`
- `#photo-form`
- `#parts-used-form`
- `#team-invite-form`
- `#app-issue-report-form`

### High-Risk `data-*` Attributes

Do not rename or repurpose these casually:

- `[data-command-action]`
- `[data-location-select]`
- `[data-location-sensitive-asset]`
- `[data-quick-status]`
- `[data-assign-me]`
- `[data-card-assign]`
- `[data-convert-request]`
- `[data-quick-fix-request]`
- `[data-request-filter]`
- `[data-step-result]`
- `[data-generate-pm]`
- `[data-member-role]`
- `[data-app-issue-status]`
- `[data-restock-part]`
- `[data-use-part]`
- `[data-edit-part]`
- `[data-part-document]`
- `[data-create-public-request-link]`
- `[data-disable-public-request-link]`
- `[data-enable-public-request-link]`
- `[data-regenerate-public-request-link]`
- all delete/cancel/confirm pairs using `[data-delete-*]`, `[data-cancel-delete-*]`, and `[data-confirm-delete-*]`

### Visual Classes Used As Behavior Hooks

These are not purely styling hooks:

- `.work-card`
- `.asset-card`
- `.workspace-search-input`

Changing these classes should be treated as behavior work unless the event binding is moved to a dedicated behavior selector first.

### Workflow Handlers Depending On Global Pending State

These handlers depend on pending global variables and should not move before state ownership is explicit:

- work order delete: `pendingDeleteWorkOrderId`
- equipment delete: `pendingDeleteAssetId`
- part delete: `pendingDeletePartId`
- request delete: `pendingDeleteRequestId`
- PM schedule delete: `pendingDeleteScheduleId`
- procedure delete: `pendingDeleteProcedureId`
- team invite cancellation: `pendingCancelInviteId`
- report issue mode: `reportIssueMode`
- Quick Fix request/equipment routing: `quickFixRequestId`, `quickFixAssetId`
- active detail panels: `activeWorkOrderId`, `activeAssetId`, `activePartId`

### Recommended Future Guard Approach

Before workflow extraction:

1. Keep behavior selectors stable.
2. Prefer adding explicit behavior selectors before removing visual classes as hooks.
3. Add one smoke-test entry per touched workflow.
4. For critical paths, run desktop and mobile viewport smoke.
5. Keep QA record tokens unique and delete QA records through the app.
6. Do not extract handlers that depend on global pending state until state ownership is mapped.

## Recommended Playwright Candidates

Good first automated browser smoke candidates:

1. Session restore and company/location load.
2. Location switch and reload persistence.
3. Quick Fix create/open/delete.
4. Work order create/open/status/delete.
5. Signed-in request submit and conversion.
6. Public QR request submit in anonymous context, then manager visibility.
7. Parts restock/use.
8. Issue report submit/update.
9. Team role display and invite create/cancel with safe QA email.

Use automation only where credentials, file uploads, and cleanup can be handled safely. Photo/document upload may remain manual longer because browser file-pickers and storage cleanup need extra care.

## Recommendation

Workflow extraction remains blocked.

The next controlled phase should be LFES Phase 3D state ownership map, planning only. It should map which global state variables are owned by navigation, detail panels, pending delete guards, workflow forms, persistence/localStorage, and reload queues before any handler or workflow orchestration moves.

