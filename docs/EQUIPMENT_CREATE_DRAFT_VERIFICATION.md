# Equipment Creation Draft Verification

Local verification: 2026-09-22. Executable checkpoint: `9663564`.
This document records a local candidate, not a production deployment.

## Finding and Change

On the previous build, scrolling a partially completed Add Equipment form down
and back up preserved its values. Triggering a same-page inventory filter redraw
then cleared them. The form was rebuilt by `renderWorkspace()` without preserving
its unfinished input. The user's exact scroll-only trigger was not reproduced.

A separate draft helper now captures the creation form before workspace redraws
and restores its fields afterward. Input changes also save to per-tab browser
session storage, allowing same-tab reload recovery. Drafts are isolated by user,
company and active location, expire after 24 hours, and clear on sign-out/account
change. Invalid or unavailable saved selections require another selection.

Both existing save buttons clear the submitted draft only after a successful
equipment insert. Failed saves retain it; a late save response cannot discard
newer edits or another workspace's draft. Clear Form explicitly discards the
current unfinished entry. No equipment is written merely by typing or navigating.

Focus restoration applies only to an input still visible before redraw. The fix
does not force scrolling back to an off-screen field, add scroll timers, poll,
refresh the page, alter permissions, or introduce a database migration/package.
The creation markup moved to the existing equipment renderer.

## Evidence

| Check | Result and scope |
| --- | --- |
| Baseline reproduction | FAIL as expected: inventory filter redraw emptied the equipment name after the scroll-only phase passed |
| Full Strict LFES | PASS, all 13 stages at clean `9663564`; 182 Node smoke files, 43 targeted browser cases, resource checks and desktop/mobile Performance interactions |
| Focused Chromium | PASS, 7 cases: 5 isolated browser regressions plus 2 signed-in QA flows at 1440px and 390px |
| Focused WebKit | PASS, 7 cases with clean exit on rerun; same scope as Chromium |
| Authenticated LFES | PASS, all 7 stages: database/storage boundaries, five-role navigation and startup budgets, Production Action/Ready lifecycles, WebKit admin and account/location switching in both engines |
| Save behavior | Both Add Equipment and Save Equipment and Continue verified against the isolated QA database; simulated failed insert retained all input; cleanup verified |
| Draft boundaries | User/company/location separation, sign-out clearing, malformed/expired storage, disabled-storage memory fallback, stale selection validation, late-save protection and excluded fields |
| Interaction | Text/select/checkbox values, caret selection, off-screen scroll preservation, page navigation, reload recovery, Clear Form; desktop/mobile screenshots reviewed |
| Regression gate | The 5 draft browser regressions now run in the shared Strict/Release Gate command |
| Bundle budgets | PASS without raising limits: initial JS/CSS 784,739 decoded / 179,118 gzip bytes |
| Startup data requests | Chromium counts unchanged: admin/manager/accounting 31, production 30, technician 35; no optional feature bundles loaded on My Work |

Private logs are under `LFES/private/`:

- `equipment-draft-before.log`: failing baseline.
- `equipment-draft-chromium-final.log`: Chromium completion.
- `equipment-draft-webkit-confirmed.log`: WebKit completion.
- `equipment-draft-strict.log`: Full Strict; summary archived in `proof/1790139871850/`.
- `equipment-draft-authenticated.log`: signed-in shared contracts; summary archived in `proof/1790140103031/`.

An earlier combined WebKit/history run reported all eight assertions successful
but did not exit; it was interrupted and is not counted as a completed suite.
The subsequent focused draft rerun exited successfully with all seven cases.
Private credentials, screenshots and logs are not committed.

## Boundaries

Only the isolated testing platform received disposable test records; exact fixture
cleanup was verified. No live company data was changed and nothing was pushed.
This covers creating equipment, not unsaved edits to an existing equipment record.
Session storage is not server backup or cross-device synchronization. Closing the
tab, clearing browser data, signing out, expiry, or unavailable browser storage
can prevent reload recovery; memory fallback only protects the current page.
Viewport/WebKit checks are not physical-device testing. Automated LFES success
does not establish that every possible browser interruption has been reproduced.
