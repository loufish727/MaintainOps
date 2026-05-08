# Current Handoff

Use this file first when starting a new chat.

## Current Goal

Pause feature expansion and preserve project memory so future work can start from docs instead of relying on one long chat thread.

## Current App State

The app is a working Supabase-backed MaintainOps prototype with:

- Auth
- Companies
- Locations
- Team roles
- Quick Fix
- Work Orders
- Equipment
- Parts
- PM
- Procedures
- Requests
- Messages
- Photos
- Comments
- History
- Mobile and desktop layouts
- Large-data stress test improvements

## Most Recent Change

Requests flow was cleaned up so converted requests do not clutter the active request queue.

Implementation:

- Requests now default to an Active filter for submitted, unconverted requests.
- Added Active, Converted, and All request filters.
- Work Orders request gauge/queue stays focused on Active requests.
- Converted request cards are visually quieter and no longer show conversion actions.
- Mobile request card layout was tightened.
- Local password login QA has a timeout fallback that retries through Supabase's auth token endpoint and sets the returned session.
- Request loading has a safe no-join fallback for `maintenance_requests` so the Requests panel can still load if relationship metadata is unavailable in a test origin.
- Internal request submit now returns the Requests screen to Active page 1 so newly submitted requests are immediately visible even if the user was reviewing Converted history.
- Bumped `index.html` to `styles.css?v=request-flow-clean-1` and `app.js?v=request-flow-clean-auth-3`.

Verified:

- Static checks passed.
- Public QR request smoke passed with `QA request flow public 1778270000000`.
- Authenticated localhost app loaded after login fallback with Taylor Metal Products visible.
- Requests panel loaded without setup-needed warning.
- Active / Converted / All request filters worked; Active excluded converted cards and Converted removed conversion actions.
- Submitted `QA request active reset 177827-active-reset` while viewing Converted; the app returned to Active and showed the new request.
- Converted `QA request active reset 177827-active-reset` to a work order; Work Order Detail opened, Active no longer showed it, and Converted showed it as converted.
- Main navigation passed for My Work, Work Orders, Planning, Requests, Equipment, PM, Procedures, Parts, Messages, Team, Admin Setup, and Settings.
- Manager location switching passed across all five configured locations.
- No MaintainOps console errors were observed in the final request, navigation, and location checks.

## Prior Recent Change

Technician assignment guardrails were added.

Implementation:

- Technicians can still create work orders and convert maintenance requests into work orders.
- Technicians can claim unassigned work for themselves.
- Technicians cannot assign work to other users, assign outside vendors, clear assignments, or reassign work already assigned to someone else.
- Managers/admins keep full assignment and reassignment controls.
- Assignment dropdowns now show manager-level choices only to managers/admins.
- Added `supabase/step-next-technician-assignment-guardrails.sql` with a work-order trigger and tightened work-order insert/update policies.
- Bumped `index.html` to `app.js?v=tech-assignment-guardrails-1`.

Still needs:

- Re-test with a real technician login to prove forbidden technician assignment paths are blocked under a true technician session.
- If preparing GitHub, include the updated `app.js`, `index.html`, docs, and `supabase/step-next-technician-assignment-guardrails.sql`.

Verified:

- Supabase assignment guardrail SQL was applied by the user.
- Debug protocol ran with fresh local token `1778195748451`.
- Static checks passed.
- Main navigation and manager location switching passed.
- Team role UI shows only Technician, Manager, Admin.
- Quick Fix save passed with `QA assignment guard quick fix 1778195839716`.
- Internal request conversion passed with `QA assignment guard request 1778195863991`.
- Assign to me and Quick Update passed on the converted work order.
- Public QR request submit passed with `QA assignment public request 1778195925580`.
- No MaintainOps console errors were observed.

Most recent full debug:

- Full debug ran with fresh local token `1778196110830`.
- Static checks passed: `node --check app.js` and `node --check supabase-config.js`.
- Verified Quick Fix, Quick Update, comments, parts Use/Restock, equipment create/save, internal request conversion, procedure step creation, PM schedule generation, app issue report, public Spokane QR request, and Team role UI.
- Team still shows only Technician, Manager, Admin; Member is absent.
- No MaintainOps console errors were observed.
- `docs/DEBUG_PROCESS.md` was updated with lessons from this run: open collapsed Comments before targeting `#comment-form`, verify PM title fill/refreshed DOM, and reopen the manager app after anonymous QR tests if the in-app browser replaces the manager tab.
- `docs/QA_LOG.md` has the full record names and token details.

## Prior Recent Change

Team roles were simplified to the real working model: Technician, Manager, Admin.

Implementation:

- Removed Member from role selectors, invite role selector, and the role guide.
- Legacy `member` values are normalized as Technician in the app.
- Role save now reloads `company_members` after the Supabase RPC succeeds, so a changed role does not redraw from stale in-memory data.
- Added `supabase/step-next-role-model-technician-manager-admin.sql` to convert existing `member` rows/invites to `technician`, tighten role checks, and update role/invite RPC validation.
- Bumped `index.html` to `app.js?v=roles-three-role-model-1`.

Still needs:

- Run the new role-model SQL in Supabase.
- Re-test role change from Team after SQL is applied.

## Prior Recent Change

QR and internal maintenance requests now have an optional photo field.

Implementation:

- Public QR request form and internal Request form include a photo upload input.
- Request photos reuse the same `optimizePhoto()` behavior as work-order photos: 2400px max dimension, JPEG quality 0.88 for supported image types.
- `supabase/step-next-maintenance-request-photos.sql` adds request photo metadata columns, a private `maintenance-request-photos` bucket, storage policies, and the attach RPC.
- Request cards show the attached photo thumbnail and signed authenticated open link after SQL is applied.

Verified:

- Syntax checks passed.
- Internal and public request forms show the photo input and optimization copy.
- Public and internal request submit still work without a photo.
- After SQL was applied, a QR request with `logo.png` attached showed a manager-side thumbnail and `Open photo` link.
- The post-feature debug protocol caught and fixed a Quick Fix regression (`sourceRequest is not defined`).
- Quick Fix was re-tested after the fix and saved `QA qf fixed 1778194725490` successfully.
- Public QR request submit was re-tested after the fix and manager-side verification found `QA protocol public request 1778194843081` under the QR link's Auburn, WA location.

Still needs:

- Re-test with a real selected file from the browser file picker on desktop and mobile.

## Prior Recent Change

The repeatable debug process was tested against the live local app until it stopped finding new misses in the tested areas.

Implementation:

- `docs/DEBUG_PROCESS.md` and `docs/FEATURE_CHANGE_PROCESS.md` now include visible/scoped selector rules for desktop/mobile duplicate controls.
- Internal request submit now uses the submitted form (`event.target`) from the document-level submit listener.
- The temporary click-submit workaround was removed so the native form submit path owns request creation.
- The cache tag was bumped to `app.js?v=request-submit-form-target-1`.

Verified:

- Navigation smoke.
- Manager location switching.
- Quick Fix create.
- Internal request submit.
- Equipment and part detail stale-panel clearing.
- Part create, search, Use, and Restock.
- Public QR anonymous submit and manager-side visibility.

## Prior Recent Change

Location switching was made intentional.

Implementation:

- Top banner has a location dropdown.
- Managers/admins can switch.
- Regular technicians cannot switch unless they enable `Mobile tech`.
- `Mobile tech` is set in Team under My Profile.
- Required SQL adds `profiles.mobile_tech`.

## Next Action

Run QA on the Mobile tech location lock flow.

Before and after any new feature or fix, use `docs/FEATURE_CHANGE_PROCESS.md` and `docs/DEBUG_PROCESS.md` so changes are scoped, tested, documented, and packaged the same way every time.

See `docs/QA_LOG.md`, `docs/NEXT_STEPS.md`, `docs/FEATURE_CHANGE_PROCESS.md`, and `docs/DEBUG_PROCESS.md`.

## Important User Preferences

- Always provide Supabase copy-paste SQL when Supabase changes are required.
- Do not overbuild location permissions.
- Keep location switching simple but intentional.
- Keep Quick Fix central.
- Prefer practical shop-floor use over accounting/billing depth.
- Mobile matters heavily, but do not break desktop.
- Completed work should not clutter default screens.
- Warnings should be visually obvious.

## Project Docs

Read these in order:

1. `docs/PROJECT_OVERVIEW.md`
2. `docs/ARCHITECTURE.md`
3. `docs/FEATURE_STATUS.md`
4. `docs/QA_LOG.md`
5. `docs/NEXT_STEPS.md`
6. `docs/FEATURE_CHANGE_PROCESS.md`
7. `docs/DEBUG_PROCESS.md`
8. `docs/SUPABASE_SETUP.md`
