# MaintainOps Debug Process

Use this process after every new feature, fix, Supabase change, or GitHub upload package. The goal is to avoid rediscovering the same checks and to catch broken buttons, stale panels, failed saves, and Supabase connectivity issues before live users hit them.

## Ground Rules

- Read `docs/CURRENT_HANDOFF.md`, `docs/NEXT_STEPS.md`, `docs/ARCHITECTURE.md`, and `docs/QA_LOG.md` before debugging.
- Use `docs/FEATURE_CHANGE_PROCESS.md` before and after feature work so the change is scoped, tested, documented, and packaged consistently.
- Do not rebuild from scratch.
- Preserve existing app behavior unless the bug requires a root-cause fix.
- If Supabase changes are needed, provide exact copy/paste SQL in chat and save the SQL file if it belongs in the repo.
- If cleanup is needed, target explicit QA names/tokens only. Do not run broad cleanup deletes.
- Test with a fresh cache-bust URL after changing `app.js`, `styles.css`, `index.html`, or config.
- Log meaningful QA passes and blockers in `docs/QA_LOG.md`.

## Before Changing Code

1. Reproduce the issue in the browser.
2. Note the exact screen, location, role, and record name/token involved.
3. Check browser console warnings/errors.
4. Check whether the issue is:
   - visible UI only,
   - stale navigation/detail state,
   - event handler not bound,
   - Supabase read/write failure,
   - RLS/permission failure,
   - missing schema/migration,
   - cached GitHub/local file.
5. Prefer root-cause fixes over one-off workarounds.

## Hard-Boundary Smoke Notes

- On dense responsive screens, the same control may exist more than once. Before clicking, filling, or asserting a control by label, inspect the visible DOM and use the visible target when generic locators are ambiguous.
- For hard-boundary extractions, make hidden global dependencies explicit through small dependency objects or getter functions. Do not move code into a module while leaving important app state reads invisible.
- A hard-boundary smoke should prove the behavior surface that owns the moved contract, not only that the page loaded.
- For role-gated controls, define the smoke role before implementation. Use manager/admin sessions for allowed mutation or management paths, and use restricted-role accounts for hidden/denied controls. If either side cannot be verified, mark that side NOT VERIFIED instead of treating the boundary as fully proven.
- Copied-browser-profile auth is environment-dependent. If a copied profile has a stale Supabase refresh token, switch to another valid copied profile or report verification as blocked; do not treat copied-profile auth failure alone as a product regression.

## Debug Packet

Start every bug/debug run by collecting this packet. Keep it short, but do not skip it.

```text
Date/time:
Tester/account:
Role:
Company:
Location:
URL:
Browser/device:
Screen/section:
Record name/token:
Expected:
Actual:
Console errors:
Supabase change involved:
GitHub Pages involved:
```

This packet should be included in `docs/QA_LOG.md` when the bug is meaningful or when a fix is made.

## Debug Decision Tree

Use this order when a feature or button is broken:

1. Does the app load?
   - If no, check config, auth/session, Supabase availability, and console errors.
2. Is the right section visible?
   - If no, check `activeSection` and stale detail state.
3. Is the button/form present and enabled?
   - If no, check role gating, missing schema readiness flags, and render conditions.
4. Does the click/submit handler run?
   - If no, check `bindWorkspaceEvents()` and stable `data-*` selectors.
5. Does Supabase accept the request?
   - If no, check payload, table/column existence, RLS, and RPC errors.
   - For role/security changes, an allowed-path pass under a manager/admin session is not enough. Also run a denied-path pass under the restricted role, such as a technician session, or record that as remaining risk.
6. Does the UI reload the changed data?
   - If no, check the success path reload functions and render timing.
7. Does GitHub behave differently?
   - If yes, check upload package, cache tags, public URL config, and GitHub cache.

## Static Checks

Run these before browser QA after code edits:

```powershell
node --check app.js
node --check supabase-config.js
```

If `index.html` was changed, confirm the app script cache tag was bumped:

```powershell
Select-String -Path index.html -Pattern "app.js\\?v="
```

## Fresh Local URL

Use a fresh cache-bust URL for every verification pass:

```text
file:///C:/Users/louie/Documents/Codex/2026-04-28/theres-an-ap-called-maintenance-x/index.html?qa_bust=debug-YYYYMMDD-HHMM
```

After a JavaScript change, update the `app.js?v=...` tag in `index.html` and then use a fresh `?qa_bust=...` URL.

## Required Smoke Pass

Run this pass after any feature or bug fix that touches app behavior.

## QA Data Lifecycle

Use `docs/QA_DATA_PROCESS.md` before creating cleanup-sensitive test data.

- Prefix every QA record with `QA ` and one shared token.
- Do not create live-looking QA records.
- After large debug passes, clean QA records through the app first so the real delete functions are tested.
- After deletion, verify Work Orders, Requests, Parts, Equipment, PM, and Procedures are no longer clogged by QA records.
- Run a focused post-delete smoke: startup, main navigation, location switching, one Quick Fix create/open, and console check.
- Cleanup delete paths now include Requests, PM schedules, and Procedure templates. Verify delete confirmation, permanent delete, reload, and absence from the relevant filter/list.

### Startup

- App loads past `Loading Workspace`.
- No browser console errors.
- Correct company appears.
- Correct active location appears.

### Main Navigation

Click every main nav item and confirm the visible main panel matches the active nav:

- My Work
- Work Orders
- Planning
- Requests
- Equipment
- PM
- Procedures
- Parts
- Messages
- Team
- Admin Setup
- Settings

Use the visible screen heading or another visible section-specific control. Some nav labels intentionally open panels with different headings, such as `Settings` opening `Company Settings`.

Also test leaving a detail view:

- Open a work order detail, then click Requests.
- Open an equipment detail, then click PM or Parts.
- Open a part detail, then click Equipment.
- The old detail panel must not remain visible under the new active nav.

When automating this check, use visible, section-scoped selectors and known QA records. Avoid broad selectors such as all `article` elements because hidden inactive panels can still exist in the DOM.
Desktop and mobile controls can both be rendered at the same time. A stable attribute like `[data-command-action="quick-fix"]` is useful, but still scope it to the visible topbar/shell or filter to the visible button before clicking.

### Location Connectivity

As manager/admin:

- Switch Salem, OR.
- Switch Riverside, CA.
- Switch Spokane, WA.
- Confirm work/orders/equipment/parts reload for the selected location.
- After a location switch, navigate to another app section, reload or reopen the app, and confirm the same location is still selected.
- Switch to a second location and reload again so persistence is proven in both directions, not just by defaulting to the first location.

As technician:

- Mobile tech off: location switcher stays locked.
- Mobile tech on: location switcher unlocks.
- Quick Fix lands in the selected location.
- Mobile tech off again: location switcher locks.

### Role And Assignment Permissions

After role or assignment changes, verify both the allowed and forbidden paths.

As manager/admin:

- Team role controls are visible.
- Role selectors include only active supported roles.
- Saving a role reloads the Team list; do not rely only on a short-lived success notice.
- Assignment controls can assign to self, another teammate, outside vendor, or unassigned when those options are expected.

As technician:

- Admin Setup and Settings are hidden.
- Team role controls are hidden.
- Quick Fix and request conversion still create work.
- Unassigned work can be claimed with Assign to me.
- Work already assigned to another user cannot be reassigned to self.
- Work cannot be assigned to another teammate.
- Work cannot be assigned to outside vendor.
- Assignment cannot be cleared from someone else or from a vendor assignment.

If a true technician login is not available, log this explicitly in `docs/QA_LOG.md` as unproven risk. Manager-session testing can prove manager flows, but it cannot prove restricted-role database enforcement.

### Core Write Paths

Use QA names with a clear token, such as:

```text
QA smoke <area> YYYYMMDD-HHMM
```

Test:

- Quick Fix create.
- Work order status change.
- Quick Update save for due date, resolution, assignment, status.
- Add comment.
- Add part.
- Use part.
- Restock part.
- Add equipment.
- Open equipment detail from card.
- Save equipment detail.
- Submit internal request.
- Convert request to work order.
- Create procedure.
- Add procedure step.
- Create PM schedule.
- Generate work from PM.
- Submit Report Issue.

For write-path verification, confirm success from the durable result, not only the immediate post-click screen. Examples:

- Quick Fix: verify the new work order appears in Work Orders or Work Order Detail.
- Request submit: verify the request appears in Requests for the active location.
- Public QR submit: `Request Sent` is the primary success signal, then verify the request appears in the manager app.
- Saves: verify the updated value appears after the data reload.
- Role saves: verify the Team data reloaded and the selected role persisted. A transient `Role saved` notice may disappear before automation sees it.
- Anonymous QR testing can replace the manager browser tab in the in-app browser. If that happens, reopen the manager app with a fresh cache-bust URL and verify the public request under the QR link's exact location.

After submit/save actions, wait for any `Loading Workspace` state to clear before deciding the write failed. Some successful writes trigger a full workspace reload before the updated list appears.

When a page has repeated button names, scope actions to the form or panel first. Examples:

- use `#request-form button[type='submit']` for internal request submit,
- use `#quick-fix-form button[type='submit']` for Quick Fix,
- use `#quick-update-work-order-form` for Quick Update fields.
- use `#work-order-comments-target summary` before targeting `#comment-form`; the comment form is inside a collapsed details panel and hidden form controls can exist in the DOM.
- use stable command attributes such as `[data-command-action='quick-fix']` for top-level actions when card buttons reuse the same visible label, then scope to the visible instance if desktop/mobile duplicates are present.

Match each smoke test to the actual workflow contract:

- Quick Fix requires `#quick-fix-form input[name="title"]`; notes live in optional fields such as `resolution_summary` and `failure_cause`.
- Quick Fix's submit button is labeled `Log Quick Fix`; scope to `#quick-fix-form` and do not assume the label is `Save Quick Fix`.
- Parts list cards open from `[data-open-part]`.
- Part Use and Restock controls live inside Part Detail under `[data-use-part]` and `[data-restock-part]`, not on the list card.
- Add Part can open the new Part Detail immediately after save; treat that as a durable success signal before searching the parts list.
- PM schedule creation should verify the title, equipment, and next due date are actually filled before submit, then verify the saved schedule or generated Work Order Detail from the refreshed DOM. A fast re-render can make a visible-text wait look like a failure even when the record saved.
- Requests can be submitted while the user is looking at Active, Converted, or All. After creating an internal request, verify the app returns to the Active request queue and the new unconverted request is visible there.
- When testing request cleanup, verify converted requests in both directions: Active must not show converted cards or conversion-history clutter, and Converted must show converted cards without `Convert to Work Order` or `Quick Fix` actions.
- Location selectors can exist in both desktop and mobile shells at the same time. Scope automated location switching to `[data-location-select]` filtered to the visible select before changing locations.

### Public QR Request

Use a known active public request token or a newly generated location QR link.

Verify:

- Anonymous request URL loads without company login.
- Location/company text is correct. The public form may use the company heading and location subtitle instead of a generic `Submit Maintenance Request` heading.
- Submit request shows success.
- Manager can see the request under that exact QR location. If the manager app is on another active location, switch to the QR location or search after switching.
- Convert/Quick Fix actions are present.

## Common Root Causes To Check

### Button Click Does Nothing

Check:

- Rendered element has a stable `data-*` attribute or clear selector.
- `bindWorkspaceEvents()` binds a listener after every render.
- Detail cards and list cards have both click and keyboard handlers when they are interactive.
- Handler clears unrelated state before rendering:
  - `activeWorkOrderId`
  - `activeAssetId`
  - `activePartId`
  - `quickFixMode`
  - `createWorkOrderMode`
  - `reportIssueMode`

### Wrong Panel Stays Visible

Check section-change logic:

- `activeSection` is updated.
- detail/edit mode state is cleared.
- `renderWorkspace()` runs immediately after state is cleared.
- async reloads do not leave stale detail content visible.

### Save Button Stays On Saving

Check:

- submit button is restored in `finally`.
- success path reloads the needed data.
- error path shows the error and re-enables the button.
- form still exists before trying to update button text.

### Submit Button Appears To Do Nothing

Check:

- Native form validation first:
  - required fields,
  - `type="number"` min/max/step,
  - date format.
- Whether the submit handler actually ran:
  - button text changes,
  - error target changes,
  - network/write side effect,
  - render or notice occurs.
- For completion smoke, use `actual_minutes` values compatible with `step="5"` such as `5`, `10`, or `15`.
- If automation click stalls on a lower-page button, record DOM/rect evidence, scroll the target into view, and retry through a visible coordinate click only for an authorized disposable smoke path.

### Browser Text Entry Fails During Smoke

Check:

- The field is visible/focused and the page has no app warning/error logs.
- The failure is from browser automation setup, such as unavailable virtual clipboard, not native form validation or app code.
- If the workflow under test is delete-only or another non-creation boundary, create disposable setup data through an authenticated API path only when:
  - the changed behavior is still verified through the app UI,
  - cleanup is completed through the intended app path,
  - data-layer proof confirms no disposable row remains.

### Supabase Write Fails

Check:

- table exists.
- column exists.
- RLS allows the current role/company member.
- `company_id` and `location_id` are included when required.
- security-definer functions use a pinned `search_path`.

If schema/RLS changes are required, provide exact SQL.

### GitHub Pages Works Differently Than Local

Check:

- `supabase-config.js` is included in the upload package.
- `window.PUBLIC_APP_URL` points to `https://loufish727.github.io/MaintainOps/`.
- `index.html` has the latest `app.js?v=...`.
- GitHub cache has had time to update.
- The test URL has a fresh cache-bust query.

## After Fixing

1. Run static checks.
2. Reopen with a fresh local cache-bust URL.
3. Re-test the exact failed path.
4. Re-test one adjacent path that could have been affected.
5. Check browser console errors.
6. Update `docs/QA_LOG.md` with:
   - date,
   - bug found,
   - root cause,
   - fix,
   - records/tokens created,
   - remaining risk.
7. If GitHub/mobile testing is needed, create a clean GitHub upload folder/zip with only required files.

## Clean GitHub Package Checklist

Include exactly:

- `assets`
- `docs`
- `supabase`
- `.gitignore`
- `app.js`
- `index.html`
- `README.md`
- `styles.css`
- `supabase-config.example.js`
- `supabase-config.js`

Do not include old `github-upload-*` folders, old `MaintainOps-github-clean-*` folders, screenshots, or duplicate exports.

## Minimum Done Definition

A feature or fix is not done until:

- syntax checks pass,
- fresh local URL loads,
- changed path works,
- adjacent path works,
- no console errors appear,
- QA log is updated,
- GitHub package is prepared if the user asks for GitHub info.
