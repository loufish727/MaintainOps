# MaintainOps Next Steps

This is the recommended restart point for the next session.

## Immediate Next Step

LFES Phase 9N equipment label helper extraction is complete locally. The next controlled phase is package/upload plus live verification.

Current status:

- Phase 9M planning/readiness:
  - PASS.
  - approved only `assetTypeLabel` and `assetStatusLabel` for movement.
- Phase 9N local implementation:
  - created `src/render/equipmentLabels.js`.
  - moved only the approved pure equipment label helpers.
  - updated `index.html` and Resource Load Smoke.
  - app.js line count changed from 10,487 to 10,476.
  - static checks: PASS.
  - local resource smoke: PASS.
  - local signed-in equipment/core-section smoke: PASS.
  - behavior changed: no observed behavior change.

Recommended immediate next controlled phase:

- Phase 9O package/upload and live verification:
  - package includes `src/render/equipmentLabels.js`.
  - live `index.html` includes `src/render/equipmentLabels.js?v=lfes-phase-9n-equipment-labels-1`.
  - live `index.html` includes `app.js?v=lfes-phase-9n-equipment-labels-1`.
  - live helper script returns HTTP 200.
  - hosted Resource Load Smoke passes.
  - GitHub Actions Resource Load Smoke passes.
  - signed-in live smoke verifies Taylor Metal Products, Salem, Equipment labels, Work Orders, My Work, Parts, Team, Settings, Messages, no missing scripts, and no visible app errors.

Keep blocked until Phase 9O passes:

- Phase 9P planning/implementation.
- additional display extraction.
- equipment cards/details/forms.
- event handlers.
- mutations.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

Prior immediate step:

LFES Phase 9L package/upload and live verification is complete. Phase 9K/9L message formatting extraction is fully closed.

Current status:

- Package:
  - `MaintainOps-github-clean-20260520-082153`
  - `MaintainOps-github-clean-20260520-082153.zip`
- GitHub commit:
  - `989ac29b6a9c13df0143756ab74184c421572455`
- Live resource verification:
  - live `index.html` references `src/render/messageFormatting.js?v=lfes-phase-9k-message-format-1`.
  - live `index.html` references `app.js?v=lfes-phase-9k-message-format-1`.
  - live `src/render/messageFormatting.js?v=lfes-phase-9k-message-format-1`: HTTP 200.
  - live `app.js?v=lfes-phase-9k-message-format-1`: HTTP 200.
- Hosted Resource Load Smoke:
  - PASS.
- GitHub Actions:
  - Resource Load Smoke PASS: `https://github.com/loufish727/MaintainOps/actions/runs/26172273053`
  - Pages build/deployment PASS: `https://github.com/loufish727/MaintainOps/actions/runs/26172272050`
- Authenticated live UI smoke:
  - PASS on `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9l-live-20260520`.
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR stayed selected.
  - Messages loaded with the Phase 9I QA thread.
  - message thread button, message bubble, sender initials `LF`, and `Today` day divider rendered.
  - My Work, Work Orders, Equipment, Parts, Team, Settings, and Messages loaded.
  - no visible app errors.
  - no browser warning/error logs captured.
- Behavior changed:
  - no observed behavior change.

Recommended immediate next controlled phase:

- Choose one:
  - LFES Phase 9M planning/readiness before any additional extraction.
  - Pause code movement and continue live pilot monitoring.

Keep blocked until explicitly approved:

- Phase 9M implementation.
- additional display extraction.
- message workflow movement.
- event handlers.
- mutations.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

Prior immediate step:

LFES Phase 9K message formatting helper extraction is complete locally. The next controlled phase is package/upload plus live verification.

Current status:

- Phase 9J planning/readiness:
  - PASS.
  - approved only `formatMessageTime`, `formatMessageDay`, and `initials` for movement.
- Phase 9K local implementation:
  - created `src/render/messageFormatting.js`.
  - moved only the approved pure message formatting helpers.
  - updated `index.html` and Resource Load Smoke.
  - app.js line count changed from 10,511 to 10,487.
  - static checks: PASS.
  - local resource smoke: PASS.
  - local signed-in message/core-section smoke: PASS.
  - behavior changed: no observed behavior change.

Recommended immediate next controlled phase:

- Phase 9L package/upload and live verification:
  - package includes `src/render/messageFormatting.js`.
  - live `index.html` includes `src/render/messageFormatting.js?v=lfes-phase-9k-message-format-1`.
  - live `index.html` includes `app.js?v=lfes-phase-9k-message-format-1`.
  - live helper script returns HTTP 200.
  - hosted Resource Load Smoke passes.
  - GitHub Actions Resource Load Smoke passes.
  - signed-in live smoke verifies Taylor Metal Products, Salem, Messages with the Phase 9I QA thread, My Work, Work Orders, Equipment, Parts, Team, Settings, no missing scripts, and no visible app errors.

Keep blocked until Phase 9L passes:

- Phase 9M planning/implementation.
- additional display extraction.
- message workflow movement.
- event handlers.
- mutations.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

Prior immediate step:

LFES Phase 9I non-empty Messages smoke is complete. The Phase 9G message display-helper extraction now has both empty-state and non-empty message-bubble runtime evidence.

Current status:

- Phase 9I:
  - live signed-in smoke: PASS.
  - created one minimal direct QA thread as evidence.
  - no app code changed.
  - no Supabase SQL/RLS changed.
  - no workflows/business logic changed.
- QA thread retained as evidence:
  - `QA Phase 9I message smoke 20260520-9I-1779288774749`
  - direct participants: `Louie Fisher, loufish727`
- Verified:
  - Taylor Metal Products loaded.
  - Salem, OR stayed active.
  - message thread button rendered.
  - message bubble rendered.
  - sender initials `LF` rendered.
  - `Today` day divider rendered.
  - My Work, Work Orders, Equipment, Parts, Team, Settings, and Messages loaded afterward.
  - no visible app errors.
  - no browser warning/error logs captured.

Recommended immediate next controlled phase:

- Choose one:
  - LFES Phase 9J planning/readiness before any additional helper extraction.
  - Pause code movement and continue live pilot monitoring.

Keep blocked until explicitly approved:

- Phase 9J implementation.
- additional display extraction.
- message workflow movement.
- event handlers.
- mutations.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

Prior immediate step:

LFES Phase 9H planning/readiness is complete. The next recommended controlled phase is non-empty Messages smoke, not more code extraction.

Current status:

- Phase 9G:
  - fully closed.
  - signed-in live UI smoke passed.
  - Messages loaded with `0 threads`, so non-empty message bubbles remain not data-exercised.
- Phase 9H:
  - planning/documentation only: PASS.
  - no app code changed.
  - no Supabase SQL/RLS changed.
  - no workflows/business logic changed.
  - decision: do not recommend immediate Phase 9I code extraction yet.

Recommended immediate next controlled phase:

- LFES Phase 9I non-empty Messages smoke, if explicitly approved:
  - use an existing safe message thread if one exists, or create a minimal safe message thread only with explicit approval.
  - verify message list, message bubble, sender initials, timestamp/day divider, thread button summary, and core sections afterward.
  - document any live data created and whether cleanup is available.

If live message mutation is not approved:

- keep non-empty message bubble rendering as `NOT VERIFIED`.
- continue live pilot monitoring.
- defer additional `app.js` extraction.

Keep blocked until explicitly approved:

- Phase 9I code implementation.
- additional display extraction.
- message workflow movement.
- event handlers.
- mutations except a manually approved non-empty Messages smoke using safe owned accounts.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

Prior immediate step:

LFES Phase 9G is fully closed. Package/upload, live resource verification, GitHub Actions, Pages deployment, and signed-in live UI smoke are complete.

Current status:

- Package:
  - `MaintainOps-github-clean-20260520-072736`
  - `MaintainOps-github-clean-20260520-072736.zip`
- GitHub commit:
  - `26b3d1615b03a7f125ec0a32a8bc784a3f92f082`
- Live resource verification:
  - live `index.html` references `src/render/messageDisplay.js?v=lfes-phase-9g-message-1`.
  - live `index.html` references `app.js?v=lfes-phase-9g-message-1`.
  - live `src/render/messageDisplay.js?v=lfes-phase-9g-message-1`: HTTP 200.
  - live `app.js?v=lfes-phase-9g-message-1`: HTTP 200.
- Hosted Resource Load Smoke:
  - PASS.
- GitHub Actions:
  - Resource Load Smoke PASS: `https://github.com/loufish727/MaintainOps/actions/runs/26169188200`
  - Pages build/deployment PASS: `https://github.com/loufish727/MaintainOps/actions/runs/26169169535`
- Authenticated live UI smoke:
  - PASS on `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9g-live-20260520-072736`
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR was selected in `location-select`.
  - Messages loaded and rendered the 0-thread empty state.
  - My Work, Work Orders, Equipment, Parts, Team, and Settings loaded.
  - no visible app errors.
  - no browser warning/error logs captured.
- Behavior changed:
  - no observed behavior change.
- Smoke caveat:
  - non-empty message bubbles remain not data-exercised because the live Messages screen had 0 threads.

Recommended immediate next controlled phase:

- Choose one:
  - LFES Phase 9H planning/readiness only before any further extraction.
  - Continue live pilot monitoring if operational usage is the priority.

Keep blocked until explicitly approved after Phase 9H readiness:

- Phase 9H implementation.
- additional display extraction.
- message workflow movement.
- event handlers.
- mutations.
- Supabase SQL/RLS.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.

Prior immediate step:

LFES Phase 9G message display-helper extraction is complete locally. No app behavior changed.

Current status:

- Created:
  - `src/render/messageDisplay.js`
- Modified:
  - `app.js`
  - `index.html`
  - `tests/smoke/resource-load.spec.js`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- Helpers moved:
  - `renderMessageBubble`
  - `renderMessageList`
- Cache tags:
  - `src/render/messageDisplay.js?v=lfes-phase-9g-message-1`
  - `app.js?v=lfes-phase-9g-message-1`
- Resource Load Smoke:
  - updated to include `src/render/messageDisplay.js`.
  - local HTTP resource smoke passed with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`.
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, `tests/smoke/resource-load.spec.js`, all `src/utils`, all `src/services`, and all `src/render` files.
- Local signed-in smoke:
  - PASS on `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9g-message-20260520`.
  - Taylor Metal Products loaded.
  - Salem, OR was selected.
  - Messages loaded and rendered the empty no-thread state.
  - My Work, Work Orders, Equipment, Parts, Team, and Settings loaded.
  - no visible app errors.
  - no actionable browser console warning/error logs captured.
- App.js line reduction:
  - 10,524 lines to 10,511 lines.
  - reduction: 13 lines.
- Smoke caveat:
  - current pilot data had 0 message threads, so non-empty message bubbles were not data-exercised.
  - user confirmed QA and Louie Fisher accounts are both safe owned accounts for a later non-empty Messages smoke if needed.
- Phase 9G status:
  - local implementation/smoke PASS.
  - package/upload blocked until explicitly requested.

Recommended immediate next controlled phase:

- Package/upload LFES Phase 9G to GitHub Pages, then live verify:
  - package includes `src/render/messageDisplay.js`.
  - live `index.html` includes `src/render/messageDisplay.js?v=lfes-phase-9g-message-1`.
  - live `index.html` includes `app.js?v=lfes-phase-9g-message-1`.
  - live helper script returns HTTP 200.
  - signed-in live smoke verifies Taylor Metal Products, Salem, Messages, My Work, Work Orders, Equipment, Parts, Team, Settings, no missing scripts, and no visible app errors.
  - GitHub Actions Resource Load Smoke should pass with the updated resource list after upload.

Keep blocked until explicitly approved:

- Phase 9H planning/implementation.
- additional display extraction.
- `renderMessageCenter`
- `renderMessageThreadButton`
- `renderLinkedWorkMessageThread`
- message composer forms.
- thread creation/send/read mutations.
- event handlers.
- Supabase calls.
- auth/session/company/location logic.
- `renderWorkspace()`.
- `bindWorkspaceEvents()`.
- Supabase SQL/RLS.
- workflow/mutation extraction.

Prior immediate step:

LFES Phase 9F app.js cleanup readiness decision is complete. No app behavior changed.

Current status:

- Created:
  - `docs/LFES/audits/LFES_PHASE_9F_APP_JS_CLEANUP_READINESS.md`
- Updated:
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- Recommended next implementation target:
  - message bubble/list display only.
- Suggested future file:
  - `src/render/messageDisplay.js`
- Allowed helpers:
  - `renderMessageBubble`
  - `renderMessageList`
- Phase 9F status:
  - PASS.

Recommended immediate next controlled phase:

- LFES Phase 9G message bubble/list display-helper extraction only.

Phase 9G should:

- create `src/render/messageDisplay.js`.
- move only `renderMessageBubble` and `renderMessageList`.
- pass dependencies explicitly from `app.js`.
- update `index.html` script loading.
- bump `app.js` cache tag.
- update Resource Load Smoke required resources.
- run static checks.
- run local signed-in smoke including Messages and core sections.
- stop before package/upload unless explicitly instructed.

Keep blocked until explicitly approved:

- `renderMessageCenter`
- `renderMessageThreadButton`
- `renderLinkedWorkMessageThread`
- message composer forms
- thread creation/send/read mutations
- event handlers
- Supabase calls
- auth/session/company/location logic
- `renderWorkspace()`
- `bindWorkspaceEvents()`
- Supabase SQL/RLS
- notice/status/toast helper movement
- admin readiness display movement
- issue report display movement
- parts/equipment render movement
- public QR rendering
- Team invite/default-location rendering

Prior immediate step:

LFES Phase 9E package/upload and live verification is complete. Phase 9E is fully closed.

Current status:

- Package:
  - `MaintainOps-github-clean-20260520-070853`
- Commits:
  - app deploy: `0ce9a80`
  - resource-smoke stabilization/docs: `4ba4e99`
- Live URL verified:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9e-live-20260520-0714`
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, `tests/smoke/resource-load.spec.js`, all `src/utils`, all `src/services`, and all `src/render` files.
- Live resource checks:
  - live `index.html` includes `src/render/iconDisplay.js?v=lfes-phase-9e-icons-1`.
  - live `index.html` includes `app.js?v=lfes-phase-9e-icons-1`.
  - live `src/render/iconDisplay.js`: HTTP 200.
  - live `app.js`: HTTP 200.
- Live smoke:
  - PASS.
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR was selected.
  - My Work, Work Orders, Equipment, Parts, Team, and Settings loaded.
  - nav icons and segment icons rendered.
  - no visible app errors.
  - no actionable browser console warning/error logs captured.
- GitHub Actions:
  - Resource Load Smoke passed after retry stabilization.
  - Pages build/deployment passed.
- Behavior changed:
  - no observed behavior change beyond intended icon display-helper extraction.
- Phase status:
  - Phase 9E is fully closed.

Recommended immediate next controlled phase:

- Choose one:
  - LFES Phase 9F planning/readiness only before any additional extraction.
  - Continue live pilot monitoring if operational usage is the priority.

Keep blocked until explicitly approved:

- Phase 9F implementation.
- additional helper extraction.
- notice/status/toast helper movement.
- admin readiness display movement.
- issue report display movement.
- parts/equipment render movement.
- public QR rendering.
- Team invite/default-location rendering.
- workflow/mutation/event binding extraction.
- broad `renderWorkspace()` movement.
- Supabase SQL/RLS changes.

Prior immediate step:

Codex LFES execution ownership is now documented in:

- `docs/LFES/context/CODEX_LFES_EXECUTION_HANDOFF.md`

Codex can determine the next LFES phase inside the established constraints. The external planning chat is now reserved for higher-risk architecture judgment, second opinions, external critique, difficult risk tradeoffs, or major product direction.

Current immediate next step remains:

- package/upload LFES Phase 9E to GitHub Pages, then live verify.

Prior immediate step:

LFES Phase 9E batched low-risk display-helper cleanup is complete locally and passed signed-in local smoke. It has not been packaged/uploaded yet.

Current status:

- Created:
  - `src/render/iconDisplay.js`
- Modified:
  - `app.js`
  - `index.html`
  - `tests/smoke/resource-load.spec.js`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
- Helpers moved:
  - `segmentIcon`
  - `navIcon`
- App.js line reduction:
  - 10,561 lines to 10,524 lines.
  - reduction: 37 lines.
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, all `src/utils`, all `src/services`, all `src/render` files, and `tests/smoke/resource-load.spec.js`.
- Local Playwright resource smoke:
  - PASS with `MAINTAINOPS_BASE_URL=http://127.0.0.1:4294/`.
  - resource list now includes `src/render/relationshipDisplay.js`, `src/render/dashboardDisplay.js`, and `src/render/iconDisplay.js`.
- Local smoke:
  - PASS.
  - Taylor Metal Products loaded.
  - Salem, OR was selected.
  - My Work, Work Orders, Equipment, Parts, Team, and Settings loaded.
  - nav icons and segment icons rendered.
  - no visible app errors.
  - no actionable browser console warning/error logs captured.
- Behavior changed:
  - no observed behavior change.
- Package/upload:
  - blocked until explicitly requested.

Recommended immediate next controlled phase:

- Package/upload LFES Phase 9E to GitHub Pages, then live verify:
  - package includes `src/render/iconDisplay.js`.
  - live `index.html` includes `src/render/iconDisplay.js?v=lfes-phase-9e-icons-1`.
  - live `index.html` includes `app.js?v=lfes-phase-9e-icons-1`.
  - live helper script returns HTTP 200.
  - signed-in live smoke verifies Taylor Metal Products, Salem, My Work, Work Orders, Equipment, Parts, Team, Settings, nav icons, segment icons, no missing scripts, and no visible app errors.
  - GitHub Actions Resource Load Smoke should pass with the updated resource list after upload.

Keep blocked until explicitly approved:

- Phase 9F planning/implementation.
- additional helper extraction.
- notice/status/toast helper movement.
- admin readiness display movement.
- issue report display movement.
- parts/equipment render movement.
- public QR rendering.
- Team invite/default-location rendering.
- workflow/mutation/event binding extraction.
- broad `renderWorkspace()` movement.
- Supabase SQL/RLS changes.

Prior immediate step:

LFES Phase 9D package/upload and live verification is complete. Phase 9D is fully closed.

Current status:

- Final deployed commit:
  - `0fc2083`
- Package:
  - `MaintainOps-github-clean-20260520-065324`
- Live URL verified:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9d-live-20260520-0656`
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, all `src/utils`, all `src/services`, `src/render/displayHelpers.js`, `src/render/relationshipDisplay.js`, and `src/render/dashboardDisplay.js`.
- Live smoke:
  - PASS.
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - My Work dashboard/workload metrics rendered.
  - Active Work gauge filter responded.
  - Work Orders, Equipment, Parts, Team, and Settings loaded.
  - no visible app errors.
  - no actionable browser console warning/error logs captured.
- GitHub Actions:
  - Resource Load Smoke passed.
  - Pages build/deployment passed.
- Phase status:
  - Phase 9D is fully closed.

Recommended immediate next controlled phase:

- Choose one:
  - LFES Phase 9E readiness/planning only before any further extraction.
  - Continue live pilot monitoring if operational usage is the priority.

Keep blocked until explicitly approved:

- Phase 9E implementation.
- additional helper extraction.
- issue report display movement.
- parts/equipment render movement.
- public QR rendering.
- Team invite/default-location rendering.
- workflow/mutation/event binding extraction.
- broad `renderWorkspace()` movement.
- Supabase SQL/RLS changes.

Prior immediate step:

LFES Phase 9D dashboard display-helper extraction is complete locally and passed signed-in local smoke.

Current status:

- Phase 9D created:
  - `src/render/dashboardDisplay.js`
- Phase 9D modified:
  - `app.js`
  - `index.html`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Helpers moved:
  - `renderGaugeReadout`
  - `renderWorkOrderGaugeDashboard`
  - `renderWorkloadStrip`
- App.js line reduction:
  - 10,625 lines to 10,561 lines.
  - reduction: 64 lines.
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, all `src/utils`, all `src/services`, `src/render/displayHelpers.js`, `src/render/relationshipDisplay.js`, and `src/render/dashboardDisplay.js`.
- Local smoke:
  - PASS.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - dashboard/gauge/workload metrics rendered.
  - gauge filter click responded.
  - Work Orders, Equipment, Parts, Team, and Settings loaded.
  - no visible app errors.
  - no actionable browser console warning/error logs captured.
- Package/upload:
  - blocked until explicitly requested.

Recommended immediate next controlled phase:

- Package/upload LFES Phase 9D to GitHub Pages, then live verify:
  - package includes `src/render/dashboardDisplay.js`.
  - live `index.html` includes `src/render/dashboardDisplay.js?v=lfes-phase-9d-dashboard-1`.
  - live `index.html` includes `app.js?v=lfes-phase-9d-dashboard-1`.
  - live helper script returns HTTP 200.
  - signed-in live smoke verifies dashboard/gauge/workload metrics, Work Orders, Equipment, Parts, Team, Settings, no missing scripts, and no visible app errors.
  - GitHub Actions Resource Load Smoke passes after push.

Keep blocked until explicitly approved:

- Phase 9E planning/implementation.
- additional helper extraction.
- issue report display movement.
- parts/equipment render movement.
- public QR rendering.
- Team invite/default-location rendering.
- workflow/mutation/event binding extraction.
- broad `renderWorkspace()` movement.
- Supabase SQL/RLS changes.

Prior immediate step:

LFES Phase 9C app.js cleanup readiness decision is complete. No app code changed.

Current status:

- Phase 9C created:
  - `docs/LFES/audits/LFES_PHASE_9C_APP_JS_CLEANUP_READINESS.md`
- Phase 9C updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
  - `docs/NEXT_STEPS.md`
- Recommended next extraction target:
  - dashboard / metrics display cluster.
- Suggested future file:
  - `src/render/dashboardDisplay.js`
- Suggested future helpers:
  - `renderGaugeReadout`
  - `renderWorkOrderGaugeDashboard`
  - `renderWorkloadStrip`
- Estimated app.js reduction:
  - approximately 55-85 lines.
- Implementation status:
  - still blocked until explicitly approved.

Recommended immediate next controlled phase:

- If app.js cleanup continues:
  - LFES Phase 9D dashboard/metrics display-helper extraction only.
  - preserve exact gauge markup and `data-status-filter` / `data-section` attributes.
  - update `index.html` script loading and `app.js` cache tag together.
  - run static checks.
  - run local signed-in smoke.
  - verify dashboard/gauge filters, Work Orders, Requests gauge, Equipment, Parts, Team, Settings, and relationship display.
  - package/upload and live verify only after local smoke passes.
- If pilot operation is priority:
  - pause code movement and continue live pilot monitoring.

Keep blocked until explicitly approved:

- Phase 9D implementation.
- issue report display movement.
- parts/equipment render movement.
- public QR rendering.
- Team invite/default-location rendering.
- workflow/mutation/event binding extraction.
- broad `renderWorkspace()` movement.
- Supabase SQL/RLS changes.

Prior immediate step:

LFES Phase 9B package/upload and live verification is complete. Phase 9B is fully closed.

Current status:

- Final deployed commit:
  - `209dce9`
- Package:
  - `MaintainOps-github-clean-20260520-063612`
- Live URL verified:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-9b-live-cachefix-20260520-0640`
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, all `src/utils`, all `src/services`, `src/render/displayHelpers.js`, and `src/render/relationshipDisplay.js`.
- Live smoke:
  - PASS.
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - Work Orders loaded.
  - `Hydralic Leak` detail opened.
  - relationship chips rendered normally.
  - History activity entries rendered normally.
  - Equipment, Parts, Team, and Settings loaded.
  - no visible app errors.
  - no actionable browser console warning/error logs captured.
- GitHub Actions:
  - Resource Load Smoke passed.
  - Pages build/deployment passed.
- Cache-tag correction:
  - fixed `index.html` so live deploy uses `app.js?v=lfes-phase-9b-relationship-1`.

Recommended immediate next controlled phase:

- Choose one:
  - LFES Phase 9C readiness/planning only before any further extraction.
  - Continue live pilot monitoring if operational usage is the priority.
- Keep blocked until explicitly approved:
  - additional helper extraction.
  - workflow extraction.
  - mutation extraction.
  - event binding extraction.
  - Supabase SQL/RLS changes.

Prior immediate step:

LFES Phase 9B-M manager/admin local Settings smoke confirmation rerun passed. The stable Phase 9B relationship display extraction remains approved for package/upload.

Current status:

- Phase 9B-M confirmation updated:
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
- Phase 9B-M confirmation result:
  - PASS.
  - no app code changed during smoke.
  - no Supabase SQL/RLS changed.
  - no package/upload performed yet.
  - no Phase 9C started.
- Verified in manager/admin-capable local session:
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - Settings loaded.
  - Team loaded.
  - Work Orders loaded.
  - `Hydralic Leak` detail opened.
  - relationship chips rendered normally.
  - History activity entries rendered normally.
  - Equipment loaded.
  - Parts loaded.
  - no visible app errors.
  - no actionable browser console warning/error logs captured.
- Package/upload:
  - approved for the stable Phase 9B build.

Recommended immediate next controlled phase:

- Package/upload stable LFES Phase 9B build to GitHub Pages, then live verify:
  - scripts load including `src/render/relationshipDisplay.js`.
  - signed-in session restores.
  - Taylor Metal Products loads.
  - Salem, OR active.
  - Settings, Team, Work Orders, Equipment, and Parts load.
  - `Hydralic Leak` detail opens.
  - relationship chips/activity items render normally.
  - no visible app errors or missing scripts.

Prior immediate step:

LFES Phase 9B-M manager/admin local Settings smoke checkpoint passed. The stable Phase 9B relationship display extraction is approved for package/upload.

Current status:

- Phase 9B-M updated:
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
- Phase 9B-M result:
  - PASS.
  - no app code changed during smoke.
  - no Supabase SQL/RLS changed.
  - no package/upload performed yet.
  - no Phase 9C started.
- Verified in manager/admin-capable local session:
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - Settings loaded.
  - Team loaded.
  - Work Orders loaded.
  - `Hydralic Leak` detail opened.
  - relationship chips rendered normally.
  - activity items rendered normally.
  - Equipment loaded.
  - Parts loaded.
  - no visible app errors.
  - no actionable browser console warning/error logs captured.
- Package/upload:
  - approved for the stable Phase 9B build.

Recommended immediate next controlled phase:

- Package/upload stable LFES Phase 9B build to GitHub Pages, then live verify:
  - scripts load including `src/render/relationshipDisplay.js`.
  - signed-in session restores.
  - Taylor Metal Products loads.
  - Salem, OR active.
  - Settings, Team, Work Orders, Equipment, and Parts load.
  - `Hydralic Leak` detail opens.
  - relationship chips/activity items render normally.
  - no visible app errors or missing scripts.

Prior immediate step:

LFES Phase 9B-M manager/admin local Settings smoke was attempted but is NOT VERIFIED because no manager/admin-capable local session was available.

Current status:

- Phase 9B-M updated:
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
- Phase 9B-M result:
  - NOT VERIFIED.
  - no app code changed.
  - no Supabase SQL/RLS changed.
  - no package/upload.
  - no Phase 9C started.
- Reason:
  - local in-app browser remained at login.
  - previous Playwright smoke account did not expose Settings nav.
  - Settings must be verified from a manager/admin-capable account before upload.
- Package/upload:
  - blocked pending manager/admin Settings smoke.

Recommended immediate next controlled phase:

- Rerun LFES Phase 9B-M after signing into the local app with a manager/admin-capable account:
  - `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9b-relationship-20260519`
- Verify:
  - Taylor Metal Products loads.
  - Salem, OR active.
  - Settings loads.
  - Team loads.
  - Work Orders load.
  - `Hydralic Leak` detail opens if safe.
  - relationship chips/activity items render normally.
  - no visible app errors or missing scripts.
  - no actionable console errors.

Prior immediate step:

LFES Phase 9B-S signed-in local smoke checkpoint is complete. Relationship display passed signed-in local smoke, but package/upload remains blocked until Settings is verified under a manager/admin local session.

Current status:

- Phase 9B-S updated:
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
- Phase 9B-S result:
  - PASS WITH SETTINGS NOT VERIFIED.
  - no app code changed.
  - no Supabase SQL/RLS changed.
  - no package/upload.
  - no Phase 9C started.
- Verified:
  - sign-in succeeded.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - Work Orders loaded.
  - `Hydralic Leak` detail opened.
  - relationship chips rendered normally.
  - activity items rendered normally.
  - Equipment, Parts, and Team loaded.
  - no visible app errors.
  - no actionable console messages captured.
- Not verified:
  - Settings load under manager/admin.
  - the smoke account/session used for Playwright did not expose Settings nav.
- Notes:
  - in-app browser text entry remained blocked by the browser automation virtual clipboard issue, so Playwright Chromium was used for the signed-in local smoke.
  - aborted Supabase HEAD requests were observed during rapid navigation, but the UI loaded and no console errors appeared; this was treated as non-actionable test-navigation noise.
- Package/upload:
  - blocked pending manager/admin Settings smoke.

Recommended immediate next controlled phase:

- LFES Phase 9B-M manager/admin Settings smoke checkpoint.
- Use a manager/admin local session and verify:
  - Taylor Metal Products loads.
  - Salem, OR active.
  - Settings loads.
  - Work Orders/Equipment/Parts/Team still load.
  - no visible app errors or missing scripts.
- After this passes, package/upload can be approved for the stable Phase 9B build.

Prior immediate step:

LFES Phase 9B relationship display-helper extraction is complete, but package/upload is blocked until the signed-in local smoke checkpoint is completed.

Current status:

- Phase 9B created:
  - `src/render/relationshipDisplay.js`
- Phase 9B modified:
  - `app.js`
  - `index.html`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
- Helpers moved:
  - `renderActivityItem`
  - `renderRelationshipChips`
  - `relationshipChip`
  - `relationshipIcon`
- Static checks:
  - PASS for `app.js`, `supabase-config.js`, all utils, all services, `src/render/displayHelpers.js`, and `src/render/relationshipDisplay.js`.
- Local resource/load smoke:
  - `index.html` served HTTP 200.
  - `app.js` served HTTP 200.
  - `src/render/relationshipDisplay.js` served HTTP 200.
  - local app reached the login screen with no browser warning/error logs captured.
- Signed-in local smoke:
  - NOT VERIFIED.
  - local origin did not have a restored session.
  - browser text entry failed in the current automation environment, so sign-in could not be completed from Codex.
- Package/upload:
  - blocked pending signed-in local smoke.

Recommended immediate next controlled phase:

- LFES Phase 9B-S signed-in local smoke checkpoint.
- Open local app:
  - `http://127.0.0.1:4294/index.html?qa_bust=lfes-phase-9b-relationship-20260519`
- Sign in normally if needed.
- Verify:
  - session restore/sign-in works.
  - Salem, OR active.
  - Work Orders load.
  - `Hydralic Leak` detail opens if safe.
  - relationship chips/activity feed render normally.
  - Equipment, Parts, Team, Settings load.
  - no missing-script errors.
  - no visible app errors.

Prior immediate step:

LFES Phase 9A app.js subsystem extraction strategy is complete. The next safest cleanup step is a narrow read-only relationship display extraction, not broad workflow movement.

Current status:

- Phase 9A created:
  - `docs/LFES/audits/LFES_PHASE_9A_SUBSYSTEM_EXTRACTION_STRATEGY.md`
- Phase 9A updated:
  - `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
- Phase 9A result:
  - planning only.
  - no app code changed.
  - no Supabase SQL/RLS changed.
  - no workflows/business logic changed.
- Recommended Phase 9B implementation:
  - create `src/render/relationshipDisplay.js`.
  - move only:
    - `renderActivityItem`
    - `renderRelationshipChips`
    - `relationshipChip`
    - `relationshipIcon`
  - preserve exact markup.
  - keep work-order card/detail renderers in `app.js`.
  - pass dependencies explicitly or through a small adapter.
- Estimated line reduction:
  - approximately 110-140 lines from `app.js`.
- Required Phase 9B smoke:
  - static checks.
  - signed-in app load.
  - Taylor Metal Products and Salem active.
  - Work Orders load.
  - work-order detail opens.
  - relationship chips/activity feed render.
  - Equipment, Parts, Team, Settings load.
  - no missing script or visible app errors.
- Still blocked:
  - workflow extraction.
  - mutation extraction.
  - event binding extraction.
  - public QR movement.
  - Team invite/default-location movement.
  - parts/equipment detail movement.
  - Supabase SQL/RLS changes.

Prior immediate step:

LFES Phase 8H invite acceptance / first-login verification was attempted as a checkpoint but is NOT VERIFIED because no real invite recipient or owner-approved QA recipient completed the invite flow in the current session.

Current status:

- Phase 8H created:
  - `docs/LFES/audits/LFES_PHASE_8H_INVITE_ACCEPTANCE_VERIFICATION.md`
- Phase 8H updated:
  - `docs/QA_LOG.md`
  - `docs/CURRENT_HANDOFF.md`
- Phase 8H result:
  - NOT VERIFIED.
  - no app code changed.
  - no Supabase SQL/RLS changed.
  - no broader rollout started.
- Reason:
  - current live browser session was already signed in to the established Taylor Metal Products workspace.
  - current session showed Salem, OR selected and owner/admin-style navigation available.
  - this does not prove invite acceptance or first-login behavior for `jeffrey.kinkaid@taylormetal.com`.
- Corrected invite from Phase 8G remains the onboarding item to verify:
  - email: `jeffrey.kinkaid@taylormetal.com`
  - role: Manager
  - default location: Salem, OR
- Recommended next controlled phase:
  - rerun LFES Phase 8H after Jeffrey or an owner-approved QA recipient accepts the invite and signs in.
  - verify Taylor Metal Products membership, Manager role visibility, Salem, OR active on first login, no Auburn fallback, reload persistence, and Work Orders/Equipment/Parts/Team loading.

Prior immediate step:

LFES Phase 8G onboarding action decision and invite correction is complete. MaintainOps can continue the supervised Taylor Metal Products / Salem, OR pilot with the pending invite now corrected to Salem, OR.

Current status:

- Phase 8G created:
  - `docs/LFES/audits/LFES_PHASE_8G_ONBOARDING_ACTION.md`
- Phase 8G updated:
  - `docs/QA_LOG.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- Phase 8G result:
  - PASS / ACCEPTANCE NOT VERIFIED.
  - no app code changed.
  - no Supabase SQL/RLS changed.
  - no broader rollout started.
- Invite action taken:
  - old pending invite for `jeffrey.kinkaid@taylormetal.com` was canceled through Team UI.
  - old invite default location was `first available`.
  - corrected invite was created through Team UI:
    - email: `jeffrey.kinkaid@taylormetal.com`
    - role: Manager
    - default location: Salem, OR
    - sent: 2026-05-19, 4:05:43 PM
- Phase 8G smoke passed:
  - Salem remained selected.
  - Work Orders loaded with `Hydralic Leak` visible and `Test 1` absent.
  - Equipment loaded with `New thalmann` visible and `Test 1` absent.
  - Parts loaded with 0 shown.
  - Requests loaded with 0 active.
  - Team loaded with corrected invite visible.
  - Admin Setup loaded and still showed 15/16 ready.
  - no browser warning/error logs were captured.
- Remaining onboarding verification:
  - actual invite acceptance.
  - first login for the invited account.
  - confirm Taylor Metal Products membership as Manager.
  - confirm Salem, OR becomes active on first load.
  - confirm the app does not fall back to Auburn.
- Recommended next controlled phase:
  - LFES Phase 8H invite acceptance / first-login verification.

Prior status:

- Phase 8F created:
  - `docs/LFES/audits/LFES_PHASE_8F_PILOT_FOLLOWUP.md`
- Phase 8F updated:
  - `docs/QA_LOG.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- Phase 8F result:
  - PASS WITH ONBOARDING DECISIONS REMAINING.
  - no app code changed.
  - no Supabase SQL/RLS changed.
  - no broader rollout started.
- Phase 8F smoke passed:
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - Work Orders loaded with `Hydralic Leak` visible and `Test 1` absent.
  - Equipment loaded with `New thalmann` visible and `Test 1` absent.
  - Requests loaded with 0 active.
  - Parts loaded with 0 shown.
  - Team, Settings, and Admin Setup loaded.
  - no visible app errors or browser warning/error logs were captured.
- Invite/default-location finding:
  - pending invite `jeffrey.kinkaid@taylormetal.com` remains unchanged.
  - role: Manager.
  - default location: `first available`.
  - `first available` is not recommended for Taylor Metal Products Salem-first pilot onboarding.
  - recommended action is to cancel/reissue or otherwise correct the invite with Salem, OR as explicit default before the invitee joins.
- Historical QA issue-report visibility:
  - Admin Setup still shows 9 captured historical QA/smoke reports.
  - recommendation: keep as evidence for now, but consider a future Live / QA / Archived distinction or filter.
- Admin Setup:
  - still 15/16 ready.
  - Admin delete protection warning documented only; no SQL run.
- Recommended next controlled phase:
  - LFES Phase 8G onboarding action decision.
  - decide whether to cancel/reissue `jeffrey.kinkaid@taylormetal.com` with Salem, OR as default.
  - if approved, use Team UI only and run invite/default-location smoke afterward.

Prior status:

- Phase 8E created:
  - `docs/LFES/audits/LFES_PHASE_8E_APPROVED_PILOT_CLEANUP.md`
- Phase 8E updated:
  - `docs/QA_LOG.md`
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- Phase 8E result:
  - PASS.
  - no app code changed.
  - no Supabase SQL/RLS changed.
  - no broader rollout started.
  - cleanup used normal app UI paths only.
- Phase 8E cleanup performed:
  - `Test 1` work order deleted through Work Order Detail.
  - `Test 1` equipment reviewed and deleted through Equipment Detail after the app showed no linked equipment, open work, completed history, PM schedules, or parts history.
- Current active Salem Work Orders:
  - only `Hydralic Leak` remains visible.
  - `Hydralic Leak` was not touched.
- Current Equipment:
  - only `New thalmann` remains visible.
  - `New thalmann` was not touched.
- Current Requests:
  - 0 active.
  - 0 converted.
  - 0 all.
- Current Parts:
  - 0 shown.
- Current Team/invite:
  - pending invite `jeffrey.kinkaid@taylormetal.com` remains unchanged.
  - role: Manager.
  - default location: `first available`.
  - decision needed before onboarding because Salem, OR is the supervised pilot default.
- Current Issue Reports:
  - Admin Setup still shows 9 captured historical QA/smoke reports.
  - no delete/archive action was performed.
- Admin Setup:
  - still 15/16 ready.
  - Admin delete protection warning documented only; no SQL run.
- Phase 8E smoke passed:
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - Work Orders, Requests, Equipment, Parts, Team, Settings, and Admin Setup loaded.
  - Salem public QR request page loaded.
  - no visible app errors or browser warning/error logs were captured.
- Pilot confidence:
  - improved because the stale `Test 1` work/equipment records no longer pollute pilot queues.
  - still supervised/limited because invite onboarding, historical issue report cleanup, technician guardrail rerun, password recovery round trip, photo upload, and broad rollout remain limited.
- Recommended next controlled phase:
  - LFES Phase 8F pilot follow-up / invite and admin issue-queue decision.
  - decide whether to cancel/reissue `jeffrey.kinkaid@taylormetal.com` with Salem, OR as default.
  - decide whether historical QA issue reports should remain as evidence, be marked resolved, archived, or cleaned through an approved path.
  - continue daily light pilot smoke.

Prior status:

- Phase 8D created:
  - `docs/LFES/audits/LFES_PHASE_8D_PILOT_ISSUE_REVIEW.md`
- Phase 8D updated:
  - `docs/LFES/evidence/LFES_REAL_WORLD_CATCHES.md`
- Phase 8D result:
  - PASS WITH CLEANUP CANDIDATES.
  - no app defect was found.
  - no cleanup was performed.
  - app surfaces loaded cleanly, but stale/setup records can confuse pilot users.
- Phase 8D active Work Orders review:
  - `Hydralic Leak`: likely real operational work; keep unless owner says otherwise.
  - `Test 1`: likely setup/demo or leftover test data; cleanup candidate.
- Phase 8D Requests review:
  - 0 active.
  - 0 converted.
  - 0 all.
  - clean starting state for QR intake.
- Phase 8D Parts review:
  - 0 shown.
  - no stale QA parts visible.
- Phase 8D Team/invite review:
  - Team loads with 5 members shown.
  - pending invite `jeffrey.kinkaid@taylormetal.com` from 5/6/2026 has `Default location: first available`; review before pilot onboarding.
- Phase 8D Issue Reports review:
  - Admin Setup shows 9 captured issue reports, mostly historical QA/smoke records.
  - Report Issue works, but the admin issue queue is cluttered for pilot use.
- Phase 8D Admin Setup review:
  - 15/16 ready.
  - missing readiness item shown as `Admin delete protection`; reconcile before broader rollout.
- LFES catch added:
  - Pilot queue trust risk from stale setup / QA data.
- Phase 8C created:
  - `docs/LFES/audits/LFES_PHASE_8C_DAY_ONE_MONITORING.md`
- Phase 8C result:
  - no Critical, High, or Medium defects were found.
  - pilot confidence improved slightly.
  - controlled pilot can continue under Phase 8B supervised limits.
- Phase 8C day-one smoke passed:
  - signed-in workspace restored.
  - Taylor Metal Products loaded.
  - Salem, OR remained active.
  - Work Orders loaded.
  - Requests loaded.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - Admin Setup loaded.
  - Report Issue modal opened and was canceled without submitting.
  - Salem public QR request page loaded.
  - no visible app errors or missing-script failures observed.
- Phase 8C observations:
  - Salem currently shows 2 active work orders, including `Test 1` and `Hydralic Leak`.
  - confirm whether `Test 1` is intentional live/pilot data or leftover setup/test data before treating the active queue as live-only.
  - Parts showed `0 shown`, so the parts RPC path was not re-mutated in the monitoring-only pass.
  - Requests showed `0 active`, `0 converted`, and `0 all`, which is a clean starting state for controlled QR intake.
  - Admin Setup showed `15/16 ready`; review before broader rollout if the missing readiness item matters operationally.
- Phase 8B created:
  - `docs/LFES/audits/LFES_PHASE_8B_PILOT_LAUNCH_CHECKLIST.md`
- Phase 8B result:
  - PASS WITH SUPERVISED LIMITS.
  - controlled Taylor Metal Products / Salem pilot can begin.
  - broad rollout remains blocked.
- Latest observed deploy/repo hash:
  - `4b6185e`
- Latest Resource Load Smoke:
  - `Resource Load Smoke #5` / `Hosted resource-load smoke`.
  - PASS / succeeded.
  - no CI errors observed.
- Phase 8B light live smoke passed:
  - signed-in session restored.
  - Taylor Metal Products loaded.
  - Salem, OR selected and active.
  - Work Orders loaded.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - Salem public QR request page loaded to the Taylor Metal Products / Salem, OR form.
  - no visible app errors or missing-script failures observed.
- `public.record_work_order_part_usage` exists.
- `authenticated` can execute the function.
- `anon` cannot execute the function.
- function search path is pinned to `public, private, pg_temp`.
- expected schema columns are present.
- RLS remains enabled on `parts` and `work_order_parts`.
- app integration is complete locally:
  - `addPartUsageToWorkOrder(...)` now calls `supabaseClient.rpc("record_work_order_part_usage", ...)`.
  - old separate `work_order_parts` insert + `parts.quantity_on_hand` update was removed from that function.
- GitHub Pages deployment is complete:
  - package: `MaintainOps-github-clean-20260519-112043`.
  - commit: `9b3ba40`.
  - live URL tested: `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-6d-live-20260519-1121`.
- static checks passed.
- live smoke passed for Work Order Detail part usage and stock decrement through the RPC.
- Phase 6D QA work order and QA part were cleaned up through the live admin UI.
- post-Phase-6D live sanity checkpoint passed:
  - session restore,
  - Taylor Metal Products,
  - Salem, OR active,
  - Work Orders,
  - Equipment,
  - Parts,
  - Team,
  - Settings,
  - no visible `QA Phase6D RPC` records,
  - no missing-script or visible app errors.
- `docs/SMOKE_TESTS.md` now documents reusable manual smoke tests for:
  - session restore,
  - location persistence,
  - manager/admin work order lifecycle,
  - technician assignment guardrail,
  - public QR request,
  - parts restock/use/work-order part usage,
  - issue reports,
  - Team/invite/role visibility,
  - password recovery,
  - required script/resource load checks.
- Phase 7B live smoke run passed for:
  - live signed-in session restore,
  - Salem, OR active location persistence,
  - manager/admin Quick Fix work order create/open/delete,
  - public QR request submit and manager visibility,
  - parts restock/use/work-order part usage through the RPC-backed path,
  - issue report submit and status update,
  - Team/role/invite visibility in manager/admin session,
  - required hosted script/resource loading.
- Phase 7B cleanup completed for:
  - QA work orders,
  - QA part,
  - QA public request.
- Phase 7B left one resolved historical QA app issue report:
  - `QA Phase7B Issue Report 20260519-7B-1779225564137`
- Phase 7B NOT VERIFIED items:
  - technician assignment guardrail in this specific run, because no isolated technician-role session was used and the result was not faked with admin credentials.
  - password reset email/recovery-link round trip, because earlier Supabase email rate limits made it unsafe to trigger more email during the run.
- Phase 7C automation planning created:
  - `docs/LFES/audits/LFES_PHASE_7C_PLAYWRIGHT_AUTOMATION_PLAN.md`
- Phase 7C decision:
  - Playwright implementation is still blocked until explicitly approved.
  - First safe automation target is the required hosted resource-load smoke check.
  - The first automated test should require no login, no live data mutation, and no cleanup.
- Phase 7D implemented:
  - `.gitignore` now ignores `node_modules/`.
  - `package.json`
  - `package-lock.json`
  - `playwright.config.js`
  - `tests/smoke/resource-load.spec.js`
- Phase 7D command:
  - `npm run test:smoke:resources`
- Phase 7D test result:
  - PASS, `1 passed`.
- Phase 7D test scope:
  - fetch live GitHub Pages `index.html`.
  - assert current required script references are present.
  - assert HTTP 200 for `app.js`, `styles.css`, `supabase-config.js`, all `src/utils`, all `src/services`, and `src/render/displayHelpers.js`.
- Phase 7D static checks passed for:
  - `app.js`
  - `supabase-config.js`
  - all `src/utils`
  - all `src/services`
  - `src/render/displayHelpers.js`
  - `playwright.config.js`
  - `tests/smoke/resource-load.spec.js`
- Phase 7E decision:
  - GitHub Actions resource-load smoke is the recommended next phase.
  - It is safe because it needs no secrets, no login, no live data mutation, and no cleanup.
  - It should run the existing `npm run test:smoke:resources` command.
  - credentialed and mutating automation remain blocked.
- Phase 7F implemented:
  - `.github/workflows/resource-load-smoke.yml`
- Phase 7F workflow:
  - triggers on `push`, `pull_request`, and `workflow_dispatch`.
  - checks out the repo.
  - sets up Node `24`.
  - runs `npm ci`.
  - runs `npm run test:smoke:resources`.
  - requires no GitHub secrets.
  - does not log in.
  - does not mutate Supabase.
  - does not create, edit, or delete app records.
- Phase 7F verification:
  - workflow sanity check passed.
  - `npm ci` passed.
  - `npm run test:smoke:resources` passed with `1 passed`.
- Phase 7F GitHub verification:
  - final workflow commit tested: `b84fc41`.
  - `Resource Load Smoke #4` completed successfully.
  - `Hosted resource-load smoke` completed successfully.
  - no CI errors observed.
  - workflow now uses `actions/checkout@v6`, `actions/setup-node@v6`, and Node `24`.
- Phase 8A created:
  - `docs/LFES/audits/LFES_PHASE_8A_CONTROLLED_PILOT_READINESS.md`
- Phase 8A decision:
  - controlled pilot readiness: CONDITIONAL YES.
  - safe for a small supervised Taylor Metal Products / Salem, OR pilot.
  - not ready for broad rollout.

Recommended next controlled phase:

**LFES Phase 8E approved pilot cleanup pass.**

Recommended focus:

1. Ask for explicit approval before deleting or canceling anything.
2. Use normal app UI paths only unless a separate SQL fix is approved.
3. Cleanup `Test 1` work order if approved.
4. Cleanup `Test 1` equipment only if safe after dependency checks.
5. Review/cancel pending invite `jeffrey.kinkaid@taylormetal.com` if approved.
6. Decide whether historical QA issue reports should remain as evidence, be marked resolved, archived, or cleaned through approved paths.
7. Rerun light pilot smoke after cleanup.
8. Keep technician assignment, password recovery, invite acceptance, photo upload, authoritative inventory, and multi-company rollout limited until focused verification passes.

Keep blocked for now:

- more `app.js` extraction.
- work-order workflow handler movement.
- rendering/event-binding movement.
- new Supabase SQL/RLS.
- restock/inventory-only Use transaction changes unless specifically approved.
- credentialed Playwright tests until test credentials, cleanup rules, and expected records are stable.
- technician automation.
- password reset automation.
- public QR automation.
- mutating work-order/parts automation.

Suggested next prompt:

```text
Begin LFES Phase 8E approved pilot cleanup pass.

Do not change app code.
Do not change Supabase SQL/RLS.
Do not refactor app.js.
Do not extract helpers/services.
Do not change workflows/business logic.
Do not add tests.
Do not add automation.

Goal:
Perform only the explicitly approved pilot cleanup through normal app UI paths, then rerun light pilot smoke.

Approved cleanup candidates to decide before acting:
- `Test 1` work order
- `Test 1` equipment, only if safe after dependency checks
- pending invite `jeffrey.kinkaid@taylormetal.com`
- historical QA issue reports, only through approved app/admin paths

Update QA_LOG.md, CURRENT_HANDOFF.md, and NEXT_STEPS.md.
Stop after approved cleanup and light smoke verification only.
```

## Prior Immediate Step

LFES Phase 8C pilot day-one monitoring and issue triage is complete. MaintainOps can continue the small supervised Taylor Metal Products / Salem, OR pilot with limits.

Recommended next controlled phase:

LFES Phase 8D pilot issue-review and limited cleanup decision.

## Prior Immediate Step

LFES Phase 8B controlled pilot launch checklist execution is complete. MaintainOps is ready to begin a small supervised Taylor Metal Products / Salem, OR pilot with limits, not a broad rollout.

Recommended next controlled phase:

LFES Phase 8C pilot day-one monitoring and issue triage.

## Prior Immediate Step

LFES Phase 8A controlled pilot readiness review is complete. MaintainOps is conditionally ready for a small supervised pilot, not a broad rollout.

Recommended next controlled phase:

LFES Phase 8B pilot launch checklist execution.

## Prior Immediate Step

LFES Phase 7F GitHub Actions resource-load smoke implementation is complete. The workflow is uploaded and verified.

Recommended next controlled phase:

Controlled pilot readiness review.

## Prior Immediate Step

LFES Phase 7E automation readiness decision checkpoint is complete. The next recommended controlled phase is adding the existing resource-load smoke to GitHub Actions.

Recommended next controlled phase:

LFES Phase 7F GitHub Actions resource-load smoke implementation only.

## Prior Immediate Step

LFES Phase 7D Playwright resource-load smoke implementation is complete. The first automated smoke test now verifies hosted resource loading only.

Recommended next controlled phase:

LFES Phase 7E automation readiness decision checkpoint.

## Prior Immediate Step

LFES Phase 7C Playwright automation planning is complete. Use `docs/LFES/audits/LFES_PHASE_7C_PLAYWRIGHT_AUTOMATION_PLAN.md` as the source of truth before adding any automated tests.

Recommended next controlled phase:

LFES Phase 7D Playwright resource-load smoke implementation only.

## Prior Immediate Step

LFES Phase 7B live manual smoke-suite run is complete. Use `docs/SMOKE_TESTS.md` plus the Phase 7B results in `docs/QA_LOG.md` as the current smoke-test baseline before future controlled changes.

Recommended next controlled phase:

LFES Phase 7C Playwright/manual automation planning only.

## Prior Immediate Step

LFES Phase 7A smoke-test formalization is complete. Use `docs/SMOKE_TESTS.md` as the manual smoke-test playbook before future controlled changes.

Recommended next controlled phase:

Run the manual smoke suite once end to end and log results.

## Prior Immediate Step

LFES Phase 6C-R parts RPC SQL review checkpoint is complete.

Decision:

- `APPROVED TO RUN`

Approved SQL source:

- `docs/LFES/audits/LFES_PHASE_6C_PARTS_RPC_SQL_PROPOSAL.md`

Next controlled phase:

**Apply the approved Phase 6C SQL only, then run the verification SELECTs. Do not change app code in the same step.**

Required boundaries:

- Do not refactor `app.js`.
- Do not change app workflows.
- Do not change RLS policies beyond creating the approved function and grant.
- Do not start Phase 6D until the SQL apply and verification step passes.

Suggested next prompt:

```text
Run the approved LFES Phase 6C SQL for public.record_work_order_part_usage in Supabase only.

Do not change app code.
Do not refactor app.js.
Do not change Supabase RLS/policies beyond creating the approved function/grant.
Run the verification SELECTs from docs/LFES/audits/LFES_PHASE_6C_PARTS_RPC_SQL_PROPOSAL.md.
Report the SQL run, verification SELECT results, and whether Phase 6D app integration is unblocked.
Update QA_LOG.md, CURRENT_HANDOFF.md, and NEXT_STEPS.md.
Stop after SQL apply/verification only.
```

After SQL is applied and verified, the next separate implementation phase is Phase 6D: update only `addPartUsageToWorkOrder(...)` to call the RPC and run the parts smoke matrix.

## Prior Immediate Step

LFES Phase 6C parts transaction RPC SQL proposal is complete.

Created:

- `docs/LFES/audits/LFES_PHASE_6C_PARTS_RPC_SQL_PROPOSAL.md`

Decision:

- Do not continue architecture extraction yet.
- Do not refactor parts workflows yet.
- Do not change app code yet.
- Do not run SQL unless explicitly approved.
- Phase 6D implementation remains blocked until the SQL is reviewed, applied, and verified.

Proposed RPC:

- `public.record_work_order_part_usage(p_company_id uuid, p_work_order_id uuid, p_part_id uuid, p_quantity integer)`

Proposed behavior:

- authenticated users only.
- company membership validated through `private.is_company_member(p_company_id)`.
- work order and part must belong to the company.
- quantity must be positive.
- part row is locked before quantity calculation.
- `work_order_parts` insert and `parts.quantity_on_hand` decrement happen in one transaction.
- current floor-at-zero behavior is preserved unless strict insufficient-stock blocking is separately approved.
- execute is granted to `authenticated` only.

Recommended next controlled phase:

**Review/apply Phase 6C SQL only, then verify non-mutating SELECT checks. Do not change app code in the same step.**

Suggested next prompt:

```text
Run the approved LFES Phase 6C SQL for public.record_work_order_part_usage in Supabase only.

Do not change app code yet.
Do not refactor app.js.
Do not change Supabase RLS/policies beyond creating the approved function/grant.
Run the verification SELECTs from docs/LFES/audits/LFES_PHASE_6C_PARTS_RPC_SQL_PROPOSAL.md.
Update QA_LOG.md, CURRENT_HANDOFF.md, and NEXT_STEPS.md.
Stop after SQL apply/verification only.
```

After SQL is applied and verified, the next separate implementation phase is Phase 6D: update only `addPartUsageToWorkOrder(...)` to call the RPC and run the parts smoke matrix.

Implementation remains blocked until SQL is reviewed/applied and then a separate app integration phase is approved.

## Prior Immediate Step

LFES Phase 6B parts transaction/RPC planning is complete.

Created:

- `docs/LFES/audits/LFES_PHASE_6B_PARTS_TRANSACTION_RPC_PLAN.md`

Phase 6B mapped the current transaction gap:

- Work-order part usage currently inserts `work_order_parts` and then separately updates `parts.quantity_on_hand`.
- Restock and inventory Use still use client-calculated final quantities.
- The first recommended transaction target is work-order part usage because it creates both operational history and inventory movement.

Phase 6B recommended:

- create a future RPC named `public.record_work_order_part_usage`;
- preserve `private.is_company_member(company_id)` as the security boundary;
- keep app integration separate from SQL creation;
- keep architecture extraction paused until the parts transaction boundary is handled.

## Prior Immediate Step

LFES Phase 6A operational smoke hardening is complete.

Results:

- Live signed-in manager/admin session restored.
- Taylor Metal Products loaded.
- Salem, OR remained active.
- Work Orders, Equipment, Parts, Team, and Settings loaded cleanly.
- No missing-script or visible app errors were observed.
- Technician assignment guardrail is now DB-trigger proven:
  - dedicated QA technician could self-claim unassigned work.
  - assigning another user was blocked.
  - clearing assignment was blocked.
  - vendor-style assignment was blocked.
  - exact DB error: `Technicians can only claim unassigned work for themselves.`
- Public Salem QR request passed end to end:
  - public form loaded.
  - disposable request submitted.
  - manager/admin Requests view showed it under Active.
  - cleanup through app delete passed.
- Parts use/restock/work-order-part smoke passed:
  - disposable QA part created.
  - restock and use changed quantity as expected.
  - work-order-part usage recorded.
  - final QA cleanup removed the request, work order, work_order_parts row, and part.

Important operational finding:

- Parts usage is still not transaction-safe.
- Current behavior is separate operations:
  - insert `work_order_parts`
  - update `parts.quantity_on_hand`
- The smoke path passed, but a partial failure or concurrent use could create inventory drift.

Recommended next controlled phase:

**LFES Phase 6B parts transaction/RPC planning only.**

Recommended Phase 6B scope:

1. Do not change app behavior yet.
2. Map the current parts mutation paths:
   - inventory Use
   - Restock
   - work-order part record
   - Quick Fix part usage
   - full work-order part usage
3. Design one Supabase RPC transaction for recording work-order part usage and decrementing stock atomically.
4. Decide whether inventory-only Use and Restock should also become RPCs or remain simple updates.
5. Provide exact copy/paste SQL only if a fix is approved.
6. Keep architecture extraction paused until the parts transaction boundary is clear.

Suggested next prompt:

```text
Begin LFES Phase 6B parts transaction/RPC planning only.

Do not change code yet.
Do not run SQL.
Map current inventory Use, Restock, Quick Fix part usage, full work-order part usage, and work_order_parts mutation paths.
Design the safest Supabase RPC transaction for recording work-order part usage and decrementing stock atomically.
Provide exact SQL proposal but do not run it.
Update QA_LOG.md, CURRENT_HANDOFF.md, NEXT_STEPS.md, and LFES evidence if needed.
Stop after planning.
```

Architecture extraction remains blocked until this operational inventory boundary is planned or explicitly deferred.

## Prior Immediate Step

LFES Phase 5C readiness decision is complete.

Decision:

- Pause further display-helper extraction.
- Do not start Phase 5C implementation now.
- Do not move additional render helpers yet.

Why:

- Phase 5B proved tiny render helper extraction can be done safely.
- The next display candidates are more coupled than the Phase 5B helpers.
- Current live-testing risk is better reduced by proving operational guardrails and customer-facing flows.

Recommended next controlled phase:

**LFES Phase 6A operational smoke hardening: technician assignment DB-layer guardrail proof first.**

Required Phase 6A smoke path:

1. Use a dedicated QA technician session.
2. Use a disposable QA work order prefixed `QA Phase6A Tech Guardrail <token>`.
3. Prove technician can claim allowed unassigned work for self if intended.
4. Prove technician cannot assign another user.
5. Prove technician cannot assign outside vendor.
6. Prove technician cannot clear or steal another assignment.
7. Capture exact visible/app/DB/RLS/trigger result.
8. Clean up QA work order through normal app flow with manager/admin if needed.
9. Confirm no missing-script or visible app errors.

Next recommended prompt:

```text
Begin LFES Phase 6A operational smoke hardening: technician assignment DB-layer guardrail proof.

Do not change code unless a real defect is found.
Do not refactor app.js.
Do not move render helpers.
Do not change Supabase SQL/RLS.
Use a dedicated QA technician session and disposable QA work order prefixed QA Phase6A Tech Guardrail <token>.
Verify technician self-claim if allowed, forbidden assignment to others/vendor/clear/steal paths, exact DB/app denial if available, and cleanup through normal app flow.
Update QA_LOG.md, CURRENT_HANDOFF.md, and NEXT_STEPS.md.
```

After Phase 6A:

1. Run live public QR request end-to-end validation.
2. Run parts use/restock/work-order part usage smoke.
3. Plan parts transaction RPC only if the parts smoke confirms the need.

Code extraction remains blocked until these operational blockers are addressed or explicitly waived.

## Prior Immediate Step

LFES Phase 5B is packaged, uploaded, and live-verified.

Current stable live build:

- Live URL:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-5b-live-20260519-100842`
- Package:
  - `MaintainOps-github-clean-20260519-100842`
  - `MaintainOps-github-clean-20260519-100842.zip`
- GitHub commit:
  - `3439f56`

Verified live:

- session restore.
- Taylor Metal Products load.
- Salem, OR selected.
- `src/render/displayHelpers.js?v=lfes-phase-5b-display-1` loads.
- `app.js?v=password-recovery-1` loads.
- Settings loads.
- Team loads.
- Team role guide renders.
- My Work loads.
- Work Orders loads.
- Equipment loads.
- Parts loads.
- no visible app errors.
- no browser warning/error logs.

Recommended next controlled options:

1. Continue live QA / technician assignment DB-layer proof if operational testing is the priority.
2. Begin a planning-only Phase 5C if the next render-helper extraction needs to be evaluated.
3. Stop modularization for now and keep live testing stable.

Phase 5C remains blocked until explicitly approved.

Suggested next prompt if continuing modularization:

```text
Begin LFES Phase 5C planning only.

Do not change code.
Review what render helper, if any, is safe after Phase 5B.
Keep workflow renderers, event handlers, mutations, storage/photo, request conversion, and Supabase SQL/RLS blocked.
Update QA_LOG.md, CURRENT_HANDOFF.md, and NEXT_STEPS.md.
```

## Prior Immediate Step

LFES Phase 5B signed-in smoke is complete and packaging/upload is approved.

Completed verification:

- technician session smoke:
  - Taylor Metal Products loaded.
  - Salem, OR selected.
  - Work Orders, Equipment, Parts, and Team loaded.
  - Team role guide rendered.
  - no visible app or console errors.
- manager/admin session smoke:
  - Taylor Metal Products loaded.
  - Salem, OR selected.
  - Admin Setup and Settings were visible.
  - Settings loaded.
  - Team loaded.
  - Team role guide rendered.
  - My Work and Work Orders loaded.
  - no visible app or console errors.

Recommended next controlled step:

1. Package/upload the stable LFES Phase 5B build.
2. Confirm package includes:
   - `assets`
   - `src`
   - `src/render/displayHelpers.js`
   - `app.js`
   - `index.html`
   - `README.md`
   - `styles.css`
   - `supabase-config.js`
3. Confirm live GitHub Pages loads:
   - `src/render/displayHelpers.js?v=lfes-phase-5b-display-1`
   - `app.js?v=password-recovery-1`
4. Verify live signed-in smoke after upload.

Suggested next prompt:

```text
Package/upload the stable LFES Phase 5B build to GitHub Pages, then verify live.

Do not start Phase 5C.
Do not move more render helpers.
Do not refactor app.js.
Do not change Supabase SQL/RLS.
Confirm the package includes src/render/displayHelpers.js.
Verify live signed-in behavior after upload.
Update QA_LOG.md, CURRENT_HANDOFF.md, and NEXT_STEPS.md.
```

Phase 5C remains blocked pending separate approval.

## Prior Immediate Step

LFES Phase 5B manager/admin Settings smoke remains NOT VERIFIED because the browser was logged out.

Current browser state:

- URL: `http://localhost:4294/index.html?qa_bust=lfes-phase-5b-smoke-20260519`
- Screen: `Welcome Back`
- Active session: none
- `src/render/displayHelpers.js?v=lfes-phase-5b-display-1` is present.
- No console warning/error logs were observed while logged out.

Required next step:

1. Sign in as a manager/admin user.
2. Say `in`.
3. Run the manager/admin Settings smoke:
   - session restore.
   - Taylor Metal Products loads.
   - Salem, OR remains active.
   - Settings loads.
   - Team loads.
   - Team role guide renders.
   - no missing-script errors.
   - no visible app errors.
   - no actionable console errors.

Suggested next prompt:

```text
I am signed in as manager/admin. Continue the LFES Phase 5B manager/admin Settings smoke checkpoint.
```

Packaging/upload remains blocked until this manager/admin smoke passes or is explicitly waived.

## Prior Immediate Step

LFES Phase 5B signed-in smoke checkpoint is complete for the active technician session.

Verified:

- session restore.
- Taylor Metal Products load.
- Salem, OR selected.
- `src/render/displayHelpers.js?v=lfes-phase-5b-display-1` loaded.
- My Work loaded.
- Work Orders loaded.
- Equipment loaded.
- Parts loaded.
- Team loaded.
- Team role guide rendered normally.
- no visible app errors.
- no browser error/warning logs.

Still required before packaging/upload unless explicitly waived:

1. Sign in as a manager/admin session.
2. Open Settings.
3. Confirm Settings loads cleanly after Phase 5B.
4. Confirm no missing-script errors or visible app errors.

Suggested next prompt:

```text
Run the manager/admin Settings smoke for LFES Phase 5B.

Do not change code unless a real defect is found.
Verify Settings loads cleanly in a manager/admin session, no missing-script errors, and no visible app errors.
Update QA_LOG.md, CURRENT_HANDOFF.md, and NEXT_STEPS.md.
Report whether Phase 5B packaging/upload is approved.
```

Phase 5C remains blocked. Packaging/upload is blocked only by the unverified manager/admin Settings smoke item, unless we decide the technician-session smoke is enough for this tiny display-helper extraction.

## Prior Immediate Step

LFES Phase 5B render display-helper extraction is complete locally, but signed-in browser smoke remains required before packaging/upload.

Completed:

- Created `src/render/displayHelpers.js`.
- Moved only:
  - `renderMetric`
  - `renderInsight`
  - `renderRoleGuide`
- Updated `index.html` to load `src/render/displayHelpers.js?v=lfes-phase-5b-display-1` before `app.js`.
- Static checks passed for app/config/utils/services/render helper.
- Local HTTP resource check passed.

Required next verification:

1. Open:
   - `http://localhost:4294/index.html?qa_bust=lfes-phase-5b-display-2`
2. Sign in or restore the existing signed-in session.
3. Confirm:
   - Taylor Metal Products loads.
   - Salem, OR remains active.
   - dashboard metrics render normally.
   - Team role guide renders normally.
   - Work Orders, Equipment, Parts, Team, and Settings load.
   - no missing script errors.
   - no visible app errors.

Suggested next prompt:

```text
Run the signed-in LFES Phase 5B browser smoke checkpoint.

Do not change code unless a real defect is found.
Verify session restore, Taylor Metal Products, Salem active location, dashboard metrics, Team role guide, Work Orders, Equipment, Parts, Team, Settings, no missing script errors, and no visible app errors.
Update QA_LOG.md, CURRENT_HANDOFF.md, and NEXT_STEPS.md.
Report whether Phase 5B is ready for packaging/upload.
```

Phase 5C and any further render/helper extraction remain blocked until Phase 5B signed-in smoke passes.

## Prior Immediate Step

LFES Phase 5A render-helper extraction planning is complete.

Recommended next controlled implementation, only if approved:

1. Begin LFES Phase 5B render display-helper extraction only.
2. Create a small render helper module such as `src/render/displayHelpers.js`.
3. Move only:
   - `renderMetric`
   - `renderInsight`
   - `renderRoleGuide`
4. Preserve exact markup and function availability.
5. Do not move:
   - `renderWorkloadStrip`
   - `renderGaugeReadout`
   - pagination renderers
   - relationship chips
   - request photo preview
   - any forms/buttons/delete/storage/public/auth/workflow renderers
6. Run static checks.
7. Run signed-in smoke verification:
   - session restore
   - Taylor Metal Products loads
   - active location remains correct
   - My Work / Work Orders load
   - Team page role guide displays
   - no missing-script errors
   - no visible app errors

Still open from the live testing track:

- LFES Phase 4B technician-role guardrail verification is partially complete.
- DB/RLS/trigger denial for unauthorized technician assignment remains unproven.

Suggested next prompt for render extraction:

```text
Begin LFES Phase 5B render display-helper extraction only.

Move only renderMetric, renderInsight, and renderRoleGuide into src/render/displayHelpers.js.
Preserve exact markup and behavior.
Do not move gauge helpers, workflow renderers, forms, event handlers, mutations, Supabase calls, or business logic.
Run static checks and signed-in smoke verification.
Update QA_LOG.md, CURRENT_HANDOFF.md, and NEXT_STEPS.md.
Stop after this narrow extraction.
```

## Prior Immediate Step

LFES Phase 4B technician-role guardrail verification is partially complete.

Verified in the signed-in QA technician session:

- Taylor Metal Products loads.
- Salem, OR is active.
- location selector is disabled while Mobile tech is off.
- Team shows the signed-in QA account as Technician.
- Team invite/add-member/role-save controls are hidden.
- Work Orders load for Salem, OR.
- Work Orders show no visible assignment dropdowns.
- no missing-script or visible app errors were observed.

Still required:

1. Prove DB/RLS/trigger assignment denial with a disposable QA work order.
2. Use a QA record prefixed `QA Phase4B Tech Guardrail <token>`.
3. Attempt assigning another user, clearing assignment, and/or stealing another assignment.
4. Record exact DB/app error.
5. Clean up the QA record through a manager/admin session if technician delete is blocked.

Reason this remains open:

- Browser automation could not type into the local Quick Fix form because the virtual clipboard was unavailable.
- The browser tool also could not read local Supabase auth storage for a safe direct REST denial probe.

## Prior Immediate Step

Password reset/recovery UI has been added locally and needs controlled live deployment/verification.

Result:

- `app.js` now supports:
  - `Forgot password?` from the login screen.
  - sending a Supabase reset email through `resetPasswordForEmail`.
  - handling Supabase recovery links.
  - setting a new password through `updateUser`.
  - clearing recovery tokens from the URL after update/back/new-reset actions.
- `index.html` now points to `app.js?v=password-recovery-1`.
- No Supabase SQL/RLS/policies changed.
- No work-order/request/assignment/company/location/business workflow changed.
- Static checks passed for app/config/utils/services.
- Local HTTP preview verified:
  - login screen exposes `Forgot password?`.
  - `#type=recovery` routes to `Set New Password`.
  - missing-token recovery links show a clear invalid-link message and disabled update.
  - users can move from invalid recovery link to the reset-email request screen.
- Clean GitHub Pages package is ready:
  - `MaintainOps-github-clean-20260519-093021`
  - `MaintainOps-github-clean-20260519-093021.zip`

Required next controlled step:

1. Upload/deploy package `MaintainOps-github-clean-20260519-093021` to GitHub Pages.
2. Confirm live `index.html` serves `app.js?v=password-recovery-1`.
3. In Supabase Auth settings, confirm the Site URL / Redirect URLs include:
   - `https://loufish727.github.io/MaintainOps/`
4. From the live login screen, use `Forgot password?` for the approved QA/test account.
5. Open the emailed reset link.
6. Confirm the app shows `Set New Password`.
7. Set a new private password.
8. Confirm the app loads normally afterward.
9. Continue Phase 4B technician-role guardrail verification using the approved technician test account.

Important:

- Do not paste reset links, access tokens, refresh tokens, or passwords into chat or docs.
- Treat any pasted recovery link as compromised and send a fresh reset link.

## Prior Immediate Step

LFES Phase 4C technician test-account setup planning is complete.

Result:

- No code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No rendering or event binding changed.
- No Supabase SQL/RLS/policies changed.
- No workflows or business logic changed.

Technician account status:

- Existing real technician:
  - `Lee Gaede` appears as Technician.
  - Do not use this live account for QA unless Lee is intentionally participating.
- Existing possible test account:
  - `Louie Technician Test` appears in Team.
  - Its current visible role was Manager, so it is not currently valid for technician guardrail verification.
  - It may be usable if the user explicitly approves temporarily setting it to Technician and credentials are available.
- Dedicated QA technician:
  - Preferred clean path for repeatable testing.
  - Use a clear QA/test email and name.

Recommended safe setup path:

1. In the manager/admin session, open Team.
2. Create a new invite for a dedicated QA technician account.
3. Set Role to `Technician`.
4. Set Default location to `Salem, OR`.
5. Use a user-controlled QA email if email delivery/confirmation matters.
6. Sign up/sign in as that QA technician.
7. Keep the password out of chat/docs.
8. Rerun Phase 4B from the technician session.

Alternative safe setup path:

1. If `Louie Technician Test` is truly a test account and credentials are known, explicitly approve changing its Team role from Manager to Technician.
2. Sign in as `Louie Technician Test`.
3. Rerun Phase 4B.
4. Restore role only if that account must remain Manager.

No SQL/admin database action is required for the preferred app-based path.

Supabase Auth/admin action may be needed only if a new QA auth user cannot be created through the normal app invite/sign-up path. Do not run SQL for this planning phase.

Test work-order strategy:

1. Use Salem, OR.
2. Prefix every QA work order with `QA Phase4B Tech Guardrail <token>`.
3. Create one unassigned QA work order to verify technician can claim allowed work for self.
4. Create or use one disposable QA work order assigned to another user only if needed to verify forbidden reassignment.
5. Delete QA work orders through the normal app path after testing.

Exact next prompt:

```text
Begin LFES Phase 4B technician-role guardrail verification using the approved technician test account.

Do not change code or SQL.
Sign in as the approved technician test user.
Verify Taylor Metal Products loads, Salem, OR is active, Work Orders load, allowed self-claim works on an unassigned QA work order, forbidden assignment/reassignment/vendor/clear paths are hidden or blocked, and document whether DB/RLS/trigger enforcement was proven.
Use QA records prefixed `QA Phase4B Tech Guardrail <token>` and clean them up through the app.
Update QA_LOG.md, CURRENT_HANDOFF.md, and NEXT_STEPS.md.
```

## Prior Immediate Step

LFES Phase 4B technician-role guardrail verification was attempted but remains NOT VERIFIED.

Result:

- No code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No rendering or event binding changed.
- No Supabase SQL/RLS/policies changed.
- No workflows or business logic changed.
- Active live browser session was checked.
- The active signed-in session showed manager/admin capabilities:
  - Admin Setup visible.
  - Settings visible.
  - Team role editors visible.
  - Save Role controls visible.
  - Create Invite/Add Member controls visible.
- Because this was not a real technician-role session, no technician assignment denial attempt was made.
- No missing-script errors, visible app errors, or actionable MaintainOps console errors were observed during the session check.

Required next controlled step:

1. Sign into the live app as a real technician-role user.
2. Confirm Taylor Metal Products loads.
3. Confirm active location behavior.
4. Open Work Orders.
5. Document which assignment controls are visible or hidden.
6. If a safe app-level path exists, attempt assigning work to another user.
7. Verify whether DB/RLS/trigger enforcement blocks the unauthorized assignment.
8. Record exact visible error/result.

Still unproven:

- technician cannot assign work to another user under a true technician session,
- technician cannot assign outside vendor under a true technician session,
- technician cannot clear or steal someone else's assignment under a true technician session,
- DB/RLS/trigger enforcement for unauthorized technician assignment.

## Prior Immediate Step

LFES Phase 4A live smoke and technician assignment guardrail verification is complete.

Result:

- No code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No rendering or event binding changed.
- No Supabase SQL/RLS/policies changed.
- No workflows or business logic changed.
- Static checks passed for `app.js`, `supabase-config.js`, all current `src/utils/*.js`, and all current `src/services/*.js`.
- Live GitHub Pages URL tested:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=phase-4a-live-smoke-20260519`
- Verified live:
  - signed-in session restore.
  - Taylor Metal Products load.
  - Salem, OR reload persistence.
  - no Auburn fallback.
  - Work Orders, Equipment, Parts, Team, and Settings load.
  - manager/admin safe QA work order create/open/delete.
  - manager/admin assignment control save.
  - no missing-script errors.
  - no visible app errors.
  - no actionable MaintainOps console errors.

Important remaining gap:

- Technician assignment guardrail is still NOT VERIFIED under a real technician-role session.
- The current signed-in session has manager/admin capabilities, so it cannot prove technician denial at the UI or database/RLS/trigger boundary.

Recommended next controlled step:

1. Run a real technician-role verification checkpoint before claiming assignment guardrails are fully proven.
2. Use a real technician login/session.
3. Verify technician can claim unassigned work for self if allowed.
4. Verify technician cannot assign to another user, assign outside vendor, clear assignment, or reassign someone else's work.
5. If the UI hides forbidden paths, document that separately from DB/RLS/trigger denial.
6. Only after that, decide whether architecture work can resume.

Still blocked:

- deeper workflow extraction until explicitly approved,
- additional mutation extraction,
- public QR submit,
- request conversion,
- Quick Fix/work-order mutations,
- assignment/status/completion movement,
- delete workflows,
- storage/photo/document uploads/removes,
- PM generation,
- procedure checklist behavior,
- messages,
- auth/session/company/location workflow movement,
- Supabase SQL/RLS changes.

## Prior Immediate Step

LFES Phase 3F implementation-readiness decision is complete.

Result:

- No code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No rendering or event binding changed.
- No Supabase SQL/RLS/policies changed.
- No workflows or business logic changed.
- Created `docs/LFES/audits/LFES_PHASE_3F_IMPLEMENTATION_READINESS_DECISION.md`.
- Updated the app modularization plan with the Phase 3F decision.
- Updated QA log with a documentation-only Phase 3F checkpoint.
- Added a real-world LFES catch that code movement was technically possible but not highest value.

Current implementation-readiness conclusion:

- no code extraction is approved yet.
- low-risk render helper extraction is technically possible later, but not the next highest-value move.
- live smoke coverage and technician assignment guardrail verification should happen before more code movement.
- workflow, mutation, render, event binding, auth/session/company/location, public QR, delete/storage/photo/document, and Supabase SQL/RLS changes remain blocked.

Recommended next controlled step:

1. Begin LFES Phase 4A live smoke and technician assignment guardrail verification.
2. Do not change code unless a real defect is found.
3. Verify session restore, company/location load, location reload persistence, Work Orders load, safe manager/admin QA work-order create/open/delete, technician assignment guardrails, manager/admin assignment controls, and console/missing script status.
4. Keep real second-user invite/default-location QA on the live-testing list.

Still blocked:

- deeper workflow extraction until explicitly approved,
- additional mutation extraction,
- public QR submit,
- request conversion,
- Quick Fix/work-order mutations,
- assignment/status/completion,
- delete workflows,
- storage/photo/document uploads/removes,
- PM generation,
- procedure checklist behavior,
- messages,
- auth/session/company/location workflow movement,
- Supabase SQL/RLS changes beyond the separately approved default-location data fix.

## Prior Immediate Step

LFES Phase 2K default-location/onboarding verification checkpoint is complete.

Result:

- No code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No Supabase SQL/RLS/policies changed.
- No location logic changed.
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md` now includes the Phase 2K default-location review.

Root cause of Auburn first-load behavior:

- Active-location precedence is:
  1. scoped saved user/company key,
  2. legacy saved key,
  3. in-memory `activeLocationId`,
  4. `company_members.default_location_id`,
  5. first loaded location.
- The current signed-in admin membership has `default_location_id: null`.
- With no scoped or legacy saved location, the app reaches first-location fallback.
- `locationsService.listLocations(...)` orders locations by name.
- Auburn, WA is first alphabetically, so it becomes the first-load fallback and is persisted into the scoped key.

Verification results:

- fresh/no saved location keys -> Auburn, WA.
- legacy Salem only -> Salem, OR and migrated to scoped key.
- scoped Salem -> Salem, OR.
- conflicting legacy Auburn + scoped Salem -> Salem, OR.
- legacy Auburn only -> Auburn, WA and migrated to scoped key.
- intentional Salem restore + reload -> Salem, OR.

Conclusion:

- Salem hard-save works after intentional selection.
- Auburn first-load is technically expected under the current code.
- Operationally, it is a default-location/onboarding bug risk if Salem should be Taylor's default branch for this user or new invited users.

Recommended next controlled phase:

- Decide and approve the default-location policy before deeper workflow extraction.
- Safest immediate data fix if Salem should be the no-saved-location default:
  - set intended Taylor users' `company_members.default_location_id` to Salem, OR.
- Safer product fix:
  - add explicit company/onboarding default-location behavior rather than relying on alphabetical first-location fallback.
- Also run real second-user invite/default-location QA when safe.

Still blocked:

- deeper workflow extraction,
- additional mutation extraction,
- public QR submit,
- request conversion,
- Quick Fix/work-order mutations,
- assignment/status/completion,
- delete workflows,
- storage/photo/document uploads/removes,
- PM generation,
- procedure checklist behavior,
- messages,
- auth/session/company/location workflow movement,
- Supabase SQL/RLS changes.

## Prior Immediate Step

LFES Phase 2J mutation-boundary review checkpoint is complete.

Result:

- No code changed.
- No wrappers were extracted.
- No `app.js` refactor was performed.
- No Supabase SQL/RLS/policies changed.
- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md` now includes the Phase 2J architecture review.

Current architectural state:

- Utility and read-wrapper extraction improved reviewability.
- App issue report insert/update wrappers are safely separated.
- `app.js` still owns operational workflow behavior:
  - auth/session,
  - active company/location,
  - rendering,
  - event binding,
  - permissions,
  - validation,
  - notices,
  - reloads,
  - most mutations.
- Based on Phase 2H plus Phase 2I, about 67 true mutation-boundary call sites remain in `app.js`.

Main conclusion:

- LFES extraction is still useful, but the pace should slow.
- Do not keep extracting mutation wrappers just because another wrapper is possible.
- Without a state/event/render boundary map, more wrappers may fragment the architecture while hiding workflow assumptions.

Recommended next controlled phase:

- LFES Phase 2K default-location/onboarding verification checkpoint, analysis/QA only.

Phase 2K should verify:

- why fresh debug/live profiles initially select Auburn, WA,
- whether this is expected default membership behavior or an onboarding/default-location defect,
- Salem scoped hard-save after intentional selection/reload,
- legacy active-location key migration,
- invite/default-location behavior if a safe second-user test path is available,
- technician/mobile-tech location switching assumptions.

Still blocked:

- additional mutation extraction,
- public QR submit,
- request conversion,
- Quick Fix/work-order mutations,
- assignment/status/completion,
- delete workflows,
- storage/photo/document uploads/removes,
- PM generation,
- procedure checklist behavior,
- messages,
- auth/session/company/location workflow movement,
- Supabase SQL/RLS changes.

## Prior Immediate Step

Stable LFES Phase 2I is packaged, uploaded to GitHub Pages, and live verified.

Current hosted build:

- Package:
  - `MaintainOps-github-clean-20260518-142305`
  - `MaintainOps-github-clean-20260518-142305.zip`
- Commit:
  - `efd31566b4179d295ccdc4dee73636d033f01d49`
- Live URL:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-2i-live-20260518-1429`

Verified:

- Package includes `assets`, `src`, `app.js`, `index.html`, `README.md`, `styles.css`, and `supabase-config.js`.
- Package includes all `src/utils` files and all `src/services` files.
- Updated `src/services/appIssueReportsService.js` is included.
- Live `index.html` serves `appIssueReportsService.js?v=lfes-phase-2i-issue-report-mutations-1`.
- Live `index.html` serves `app.js?v=lfes-phase-2i-issue-report-mutations-1`.
- Static checks passed for source and package JavaScript files.
- Signed-in live verification passed after user signed in.
- Taylor Metal Products loaded.
- Salem, OR persisted after intentional selection and reload.
- Work Orders, Equipment, Parts, Team, Settings, and Admin Setup opened.
- Report Issue opened.
- Existing reported issues loaded.
- Safe live test issue report was submitted:
  - `LFES Phase 2I live wrapper smoke 1779139666427`
- Safe live test issue report status update to `reviewing` succeeded.
- No missing-script errors or visible app errors were found.

Location note:

- Fresh live debug profile initially selected Auburn, WA.
- After intentionally selecting Salem, OR, reload preserved Salem, OR through the scoped hard-save key.
- Unexpected first-load Auburn default should be treated as a separate default-location/onboarding data verification item.

Recommended next controlled phase:

- Blocked pending explicit approval.
- Do not continue mutation extraction by momentum.
- Suggested next work is either:
  - default-location/onboarding verification for the Auburn first-load finding, or
  - plan the next low-risk mutation wrapper candidate from the Phase 2H mutation-boundary plan.

Still blocked:

- public QR submit,
- request conversion,
- Quick Fix/work-order mutations,
- assignment/status/completion,
- delete workflows,
- storage/photo/document uploads/removes,
- PM generation,
- procedure checklist behavior,
- messages,
- auth/session/company/location workflows,
- Supabase SQL/RLS changes.

## Prior Immediate Step

LFES Phase 2I app issue report mutation-wrapper extraction is complete.

Result:

- `src/services/appIssueReportsService.js` now includes:
  - `createAppIssueReportRecord(supabaseClient, payload)`
  - `updateAppIssueReportStatusRecord(supabaseClient, companyId, reportId, nextStatus)`
- `app.js` now calls those wrappers.
- UI form handling, submit-button state, notices, reloads, rendering, and permission checks stayed in `app.js`.
- No Supabase SQL/RLS/policies changed.
- No public QR, Quick Fix, work-order, request-conversion, delete, storage/photo, PM/procedure, message, auth/session/company/location workflows moved.

Verified:

- static checks passed for all app/config/utils/service JavaScript files.
- local signed-in browser checkpoint passed.
- Report Issue opened.
- existing reported issues list loaded.
- safe test issue report was submitted:
  - `LFES Phase 2I wrapper smoke 1779139232957`
- safe test issue report status update to `reviewing` succeeded.
- no missing script errors or actionable console/page errors.

Location note:

- Fresh debug profile initially selected Auburn, WA.
- After intentionally selecting Salem, OR, reload preserved Salem, OR through the scoped hard-save key.
- Unexpected first-load Auburn default should be treated as a separate default-location/onboarding data verification item.

Recommended next controlled phase:

- Blocked pending explicit approval.
- Do not continue mutation extraction by momentum.
- Suggested next work is either:
  - package/upload Phase 2I and verify live, or
  - plan the next low-risk mutation wrapper candidate from the Phase 2H mutation-boundary plan.

Still blocked:

- public QR submit,
- request conversion,
- Quick Fix/work-order mutations,
- assignment/status/completion,
- delete workflows,
- storage/photo/document uploads/removes,
- PM generation,
- procedure checklist behavior,
- messages,
- auth/session/company/location workflows,
- Supabase SQL/RLS changes.

## Prior Immediate Step

LFES Phase 2H mutation-boundary planning is complete.

Read before implementing any mutation extraction:

- `docs/LFES/audits/LFES_PHASE_2H_MUTATION_BOUNDARY_PLAN.md`

Planning result:

- No code changed.
- No functions were moved.
- No service files were created.
- No `app.js` refactor was performed.
- No Supabase policies or SQL changed.

Mutation-boundary summary:

- True remaining Supabase/RPC/storage mutation-boundary call sites: 69.
- Related storage signed URL read boundaries tracked separately: 4.
- Risk counts:
  - Critical: 32
  - High: 24
  - Medium: 11
  - Low: 2

Lowest-risk future mutation candidate:

- app issue report insert/update wrappers.

Recommended next controlled phase, only after approval:

- LFES Phase 2I app issue report mutation wrapper extraction only.

Phase 2I should:

- extend `src/services/appIssueReportsService.js`,
- move only raw `app_issue_reports` insert/update calls,
- keep UI form handlers, submit-button state, notices, reloads, and rendering in `app.js`,
- run static checks and a signed-in Settings/Admin Setup/Report Issue checkpoint.

Still blocked:

- public QR submit,
- request conversion,
- Quick Fix/work-order mutations,
- assignment/status/completion,
- delete workflows,
- storage/photo/document uploads/removes,
- PM generation,
- procedure checklist behavior,
- messages,
- auth/session/company/location workflows,
- Supabase SQL/RLS changes.

## Prior Immediate Step

LFES post-Phase-2G remaining `app.js` risk review is complete.

Read before deciding the next phase:

- `docs/LFES/audits/APP_JS_MODULARIZATION_PLAN.md`

Review result:

- No code changed.
- No service extraction was started.
- No `app.js` refactor was performed.
- No Supabase policies or SQL changed.
- No auth, workflow, rendering, event binding, or business logic changed.

Key finding:

- After Phase 2G, the main remaining risk is no longer low-risk read queries.
- The main remaining risk is workflow mutation mixed with rendering, event binding, global state, storage, and location/company assumptions.

Recommended next single controlled phase at that time:

- LFES Phase 2H mutation-boundary planning only.

Status:

- Completed by the current Phase 2H mutation-boundary plan above.

Phase 2H should:

- map every remaining mutation in `app.js`,
- classify raw DB wrapper candidates versus workflow-owned mutations,
- identify storage/security/delete/traceability-sensitive mutations,
- recommend one future implementation target only after the mutation map exists.

Do not implement yet:

- mutation wrappers,
- request/public QR service work,
- PM/procedure service work,
- message service work,
- work-order relationship service work,
- storage/photo service work,
- auth/session/company/location movement,
- rendering/event extraction,
- Supabase SQL/RLS changes.

## Prior Immediate Step

Stable LFES Phase 2G is packaged, uploaded to GitHub Pages, and live verified.

Current hosted build:

- Package:
  - `MaintainOps-github-clean-20260518-135557`
  - `MaintainOps-github-clean-20260518-135557.zip`
- Commit:
  - `62d368c0ca27c4b2ab82d6710ad1aeee5ed69d83`
- Live URL:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-2g-live-20260518-1359`

Verified:

- Package includes `assets`, `src`, `app.js`, `index.html`, `README.md`, `styles.css`, and `supabase-config.js`.
- Package includes all `src/utils` files and all current `src/services` files, including `appIssueReportsService.js`.
- Live GitHub Pages serves:
  - `src/services/appIssueReportsService.js?v=lfes-phase-2g-issue-reports-1`
  - `app.js?v=lfes-phase-2g-issue-reports-1`
- Static checks passed for `app.js`, `supabase-config.js`, all utils, and all service files in source and package.
- Signed-in live verification confirmed:
  - Taylor Metal Products loaded.
  - Salem, OR remained active after switching to Salem and reloading the live app.
  - Work Orders, Equipment, Parts, Team, Settings, and Admin Setup loaded.
  - Issue report area loaded.
  - Report Issue form opened.
  - No missing script errors or visible app errors were found.
- Console/runtime note:
  - GitHub Pages returned a non-actionable `favicon.ico` 404.
  - No MaintainOps script/runtime error was captured.

Next phase remains blocked until explicit approval.

Recommended next choices:

1. Approve the next narrow LFES planning or extraction phase.
2. Or pause modularization and run a broader live QA/debug pass.
3. Do not move requests, public QR submit, request conversion, PM/procedure logic, messages, work-order relationship loaders, storage/photo logic, auth/session/company/location workflows, or Supabase SQL/RLS without separate approval.

## Prior Immediate Step

LFES Phase 2G `appIssueReportsService` read-only extraction is complete locally.

Completed:

- Created `src/services/appIssueReportsService.js`.
- Moved only:
  - `listAppIssueReports(supabaseClient, companyId)`.
- Updated `index.html` to load:
  - `src/services/appIssueReportsService.js?v=lfes-phase-2g-issue-reports-1`
  - `app.js?v=lfes-phase-2g-issue-reports-1`
- Static checks passed for `app.js`, `supabase-config.js`, all utils, and all service files.
- Local HTTP resource checks confirmed the new service script and updated `app.js` load with HTTP 200.

Signed-in browser checkpoint is complete:

- Tested local URL:
  - `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=lfes-phase-2g-issue-reports-accessible`
- Taylor Metal Products loaded.
- `appIssueReportsService` and updated `app.js` loaded.
- The fresh debug profile initially had Auburn saved; after switching to Salem, OR and reloading, Salem remained active.
- Work Orders, Equipment, Parts, Team, Settings, and Admin Setup loaded.
- App issue report area loaded:
  - `App issue reports` ready,
  - Report Issue form opened,
  - reported issue list rendered existing records.
- No missing-script errors or visible app errors were found.

Blocked until explicit approval:

- packaging/upload,
- Phase 2H,
- maintenance request reads/counts,
- public QR intake/submit,
- request conversion,
- PM/procedure movement,
- messages,
- work-order relationship loaders,
- storage/photo logic,
- auth/session/company/location workflows,
- Supabase SQL/RLS changes.

## Prior Immediate Step

LFES Phase 2G remaining service-wrapper planning is complete.

Read before implementing:

- `docs/LFES/audits/LFES_PHASE_2G_REMAINING_SERVICE_PLAN.md`

Planning result:

- No app behavior changed.
- No new service files were created.
- No `app.js` refactor was performed.
- No Supabase policies or SQL changed.
- No functions were moved.

Safest recommended next implementation target:

- Create `src/services/appIssueReportsService.js`.
- Move only app issue report read/list behavior into:
  - `listAppIssueReports(supabaseClient, companyId)`.
- Leave app issue report create/update mutations in `app.js`.

Still blocked until separately approved:

- maintenance request reads/counts,
- public QR intake/submit,
- request conversion,
- PM generation/mutations,
- procedure mutations/checklist movement,
- messages,
- work-order relationship loaders,
- storage helpers/uploads/deletes,
- auth/session/company/location workflows,
- any Supabase SQL/RLS changes.

Recommended next choices:

1. Approve Phase 2G implementation as `appIssueReportsService` read-only only.
2. Or pause modularization and run a broader live QA/debug pass.
3. Do not move mutations, auth/session startup, rendering, event binding, Quick Fix, request conversion, status changes, delete workflows, public QR submit, storage, or Supabase policies without separate approval.

## Prior Immediate Step

Stable LFES Phase 2F is packaged, uploaded to GitHub Pages, and live verified.

Current hosted build:

- Package:
  - `MaintainOps-github-clean-20260518-132834`
  - `MaintainOps-github-clean-20260518-132834.zip`
- Commit:
  - `5e79f64d4fc1aa12cd952d9d291bff1fa19209c2`
- Live URL:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=lfes-phase-2f-live-20260518-1329`

Verified:

- Package includes `assets`, `src`, `app.js`, `index.html`, `README.md`, `styles.css`, and `supabase-config.js`.
- Package includes all `src/utils` files and all current `src/services` files, including `companyService.js`.
- Live GitHub Pages serves:
  - `src/services/companyService.js?v=lfes-phase-2f-company-1`
  - `app.js?v=lfes-phase-2f-company-1`
- Static checks passed for `app.js`, `supabase-config.js`, all utils, and all service files.
- Live HTTP 200 checks passed for all utility/service scripts and `app.js`.
- Signed-in live verification confirmed Taylor Metal Products loaded.
- Salem, OR remained active after reload.
- Settings loaded and showed Company Settings.
- Work Orders, Equipment, Parts, Team, and Settings navigation buttons were visible and responsive in the mobile-width live pane.
- No missing-script failure or visible app error was observed.

Phase 2G / any next extraction remains blocked until the user explicitly approves it.

Recommended next choices:

1. Approve the next narrow LFES service-wrapper phase.
2. Or pause modularization and run a broader live QA/debug pass.
3. Do not move mutations, auth/session startup, rendering, event binding, Quick Fix, request conversion, status changes, delete workflows, or Supabase policies without separate approval.

## Prior Immediate Step

Short LFES post-fix checkpoint is complete. Phase 2F can proceed only if explicitly approved.

Checkpoint verified:

- Static checks passed for `app.js`, `supabase-config.js`, all utils, and all service files.
- Live GitHub Pages serves the current cache tags:
  - `src/services/workOrdersService.js?v=lfes-phase-2e-work-orders-1`
  - `app.js?v=location-hard-save-1`
- All utility/service scripts and `app.js?v=location-hard-save-1` returned HTTP 200.
- Signed-in live visual verification confirmed:
  - Taylor Metal Products loaded.
  - Location selector showed `Salem, OR`.
  - Work Orders loaded and showed Salem in the Work Orders header.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - App did not visually revert to Auburn.
- No missing-script failure was found.
- No obvious app error screen appeared.
- Direct browser dev-console logs were not available through the current tool bridge.

Recommended next action:

1. Approve or defer Phase 2F.
2. If approved, keep Phase 2F narrow and run the Debug Protocol immediately afterward.
3. Do not move mutations, auth/session startup, rendering, event binding, Quick Fix, request conversion, status changes, delete workflows, or Supabase policies without separate approval.

## Prior Immediate Step

Location hard-save deployed build is now live verified in the signed-in in-app browser.

Current hosted build:

- Package:
  - `MaintainOps-github-clean-20260518-094217`
  - `MaintainOps-github-clean-20260518-094217.zip`
- Commit:
  - `70d01e5c0051cc1ed40352c18c75f0553b170657`
- Live URL:
  - `https://loufish727.github.io/MaintainOps/?qa_bust=location-hard-save-live-20260518-0943`

Verified:

- Static checks pass for `app.js`, `supabase-config.js`, all utils, and all service files.
- Clean package includes `assets`, `src`, `app.js`, `index.html`, `README.md`, `styles.css`, and `supabase-config.js`.
- Live GitHub Pages serves:
  - `src/services/workOrdersService.js?v=lfes-phase-2e-work-orders-1`
  - `app.js?v=location-hard-save-1`
  - all utility and service scripts with HTTP 200.
- Signed-in in-app browser verification:
  - Taylor Metal Products loaded.
  - Location selector showed `Salem, OR`.
  - Work Orders loaded and continued to show Salem in the Work Orders header.
  - Equipment loaded.
  - Parts loaded.
  - Team loaded.
  - Settings loaded.
  - App did not visually switch back to Auburn.
  - No obvious error screen or missing-script failure was visible.

Phase 2F remains blocked pending explicit approval.

## Prior Immediate Step

Location hard-save precedence fix is complete.

Verified:

- Saved user/company location now wins over invite/member default location.
- Legacy saved location now migrates into the scoped per-user/company key before the app falls back to default.
- Focused browser verification used Salem, OR and confirmed the app reopened into Salem.
- No console errors.

Fresh local refresh link:

- `file:///C:/Users/louie/Documents/Codex/2026-04-28/MaintainOps/index.html?qa_bust=location-hard-save-1779127000000`

Recommended next choices:

1. Run a short signed-in checkpoint around location switching and reload persistence.
2. Package/upload the location hard-save fix to GitHub Pages and verify hosted behavior.
3. Continue LFES only after the location behavior is confirmed on the user's normal browser.

## Prior Immediate Step

LFES Phase 2E work order read/count/search service extraction is complete.

Completed:

- Created `src/services/workOrdersService.js`.
- Moved only raw work-order read/count/search query helpers into:
  - `selectWorkOrders(supabaseClient, selectClause, options)`
  - `countWorkOrdersQuery(supabaseClient)`
  - `fetchWorkOrderById(supabaseClient, companyId, workOrderId, selectClause)`
  - `fetchWorkOrdersByIds(supabaseClient, params)`
  - `scopedWorkOrderSearchQuery(supabaseClient, params)`
  - `fetchPagedSearchRows(buildQuery, onRows, maxRows, pageSizeLimit)`
- Updated `index.html` to load:
  - `src/services/workOrdersService.js?v=lfes-phase-2e-work-orders-1`
  - `app.js?v=lfes-phase-2e-work-orders-1`
- Static checks passed for `app.js`, `supabase-config.js`, all utils, and all service files.
- Local signed-in browser/debug passed:
  - session restore,
  - Taylor Metal Products,
  - Auburn active location,
  - Work Orders,
  - Work Order Detail via temporary QA Quick Fix,
  - Equipment,
  - Parts,
  - Settings,
  - Team,
  - no console errors,
  - no missing script errors.

Next phase remains blocked until the user explicitly approves continuing.

Recommended next choices:

1. Run a Phase 2E checkpoint.
2. Package/upload the Phase 2E build to GitHub Pages and run the hosted signed-in checkpoint.
3. Approve the next narrow read-only service extraction.
4. Do not move work-order mutations, Quick Fix, request conversion, status changes, assignment guardrails, delete workflows, relationship mutations, rendering, event binding, auth/session startup, or Supabase policies without separate approval.

## Prior Immediate Step

Stable LFES Phase 2D build is packaged, uploaded to GitHub Pages, and live verified.

Deployed package:

- folder: `MaintainOps-github-clean-20260518-092721`
- zip: `MaintainOps-github-clean-20260518-092721.zip`
- GitHub Pages commit: `692d50c98d4fe27519a9390868b8bbf077131f06`

Live verification passed:

- `src/utils/constants.js` loaded.
- `src/utils/dom.js` loaded.
- `src/utils/formatting.js` loaded.
- `src/services/locationsService.js` loaded.
- `src/services/profilesService.js` loaded.
- `src/services/partsService.js` loaded.
- `src/services/assetsService.js` loaded.
- `app.js?v=lfes-phase-2d-assets-1` loaded.
- Signed-in session restored.
- Taylor Metal Products loaded.
- Auburn active location loaded.
- Equipment, Work Orders, Parts, Settings, and Team opened cleanly.
- No missing script errors were found.
- No actionable MaintainOps console error was found.

Phase 2E remains blocked until the user explicitly approves continuing.

Recommended next choices:

1. Run a post-upload Phase 2D checkpoint if desired.
2. Or approve Phase 2E as another narrow read-only service extraction.
3. Do not move workflow mutations, rendering, event binding, auth/session startup, location persistence, equipment routing, delete guards, or Supabase policies without separate approval.

## Prior Immediate Step

LFES Phase 2D assets read service extraction is complete.

Completed:

- Created `src/services/assetsService.js`.
- Moved only the company-scoped Equipment/assets list read into:
  - `listAssets(supabaseClient, companyId)`.
- Updated `index.html` to load:
  - `src/services/assetsService.js?v=lfes-phase-2d-assets-1`
  - `app.js?v=lfes-phase-2d-assets-1`
- Static checks passed for `app.js`, `supabase-config.js`, all utils, `locationsService`, `profilesService`, `partsService`, and `assetsService`.
- Local signed-in browser/debug passed:
  - session restore,
  - Taylor Metal Products,
  - Auburn active location,
  - Equipment,
  - Work Orders,
  - Parts,
  - Settings,
  - Team,
  - no console errors,
  - no missing script errors.

Phase 2E remains blocked until the user explicitly approves continuing.

Recommended next choices:

1. Run a Phase 2D checkpoint or package/upload the Phase 2D build to GitHub Pages and run the hosted signed-in checkpoint.
2. Or approve Phase 2E as another narrow read-only service extraction.
3. Do not move asset mutations, equipment delete guards, equipment-driven routing, location persistence, rendering, event binding, auth/session startup, or Supabase policies without a separate approval.

## Prior Immediate Step

LFES checkpoint after Phase 2C parts read extraction is complete.

Verified:

- Static checks still pass for:
  - `app.js`
  - `supabase-config.js`
  - all `src/utils`
  - `src/services/locationsService.js`
  - `src/services/profilesService.js`
  - `src/services/partsService.js`
- Signed-in local browser/debug passed:
  - session restore,
  - Taylor Metal Products,
  - Auburn active location,
  - Parts,
  - Work Orders,
  - Equipment,
  - Settings,
  - Team,
  - no missing script errors,
  - no console errors.

Phase 2D `assetsService` reads-only remains blocked until the user explicitly approves continuing.

Recommended next choices:

1. Package/upload the Phase 2C build to GitHub Pages and run the hosted signed-in checkpoint.
2. Or approve Phase 2D as a narrow `assetsService` read-only extraction.
3. Do not move asset mutations, equipment delete guards, equipment-driven routing, rendering, event binding, auth/session startup, or Supabase policies without separate approval.

## Prior Immediate Step

LFES Phase 2C parts read service extraction is complete.

Completed:

- Created `src/services/partsService.js`.
- Moved only the company-scoped Parts list read into:
  - `listParts(supabaseClient, companyId)`.
- Updated `index.html` to load:
  - `src/services/partsService.js?v=lfes-phase-2c-parts-1`
  - `app.js?v=lfes-phase-2c-parts-1`
- Static checks passed for `app.js`, `supabase-config.js`, all utils, `locationsService`, `profilesService`, and `partsService`.
- Local signed-in browser/debug passed:
  - session restore,
  - Taylor Metal Products,
  - Auburn active location,
  - Parts,
  - Work Orders,
  - Equipment,
  - Settings,
  - Team,
  - no console errors,
  - no missing script errors.

Phase 2D remains blocked until the user explicitly approves continuing.

Recommended next choices:

1. Package/upload the Phase 2C build to GitHub Pages and run the hosted signed-in checkpoint.
2. Or approve Phase 2D as another narrow read-only service extraction.
3. Do not move parts mutations, inventory business rules, `work_order_parts`, `part_documents`, rendering, event binding, auth/session startup, or Supabase policies without a separate approval.

## Prior Immediate Step

Stable LFES Phase 2A/2B build is uploaded to GitHub Pages and live verified.

Deployed package:

- folder: `MaintainOps-github-clean-20260518-090136`
- zip: `MaintainOps-github-clean-20260518-090136.zip`
- GitHub Pages commit: `2310126d934e836a0fea2b08fc95374e934aea4b`

Live verification passed:

- `src/utils/constants.js` loaded.
- `src/utils/dom.js` loaded.
- `src/utils/formatting.js` loaded.
- `src/services/locationsService.js` loaded.
- `src/services/profilesService.js` loaded.
- `app.js?v=lfes-phase-2b-profiles-1` loaded.
- Signed-in session restored.
- Taylor Metal Products loaded.
- Auburn active location loaded.
- Work Orders, Equipment, Parts, Settings, and Team opened cleanly.
- Safe Quick Fix create/open/delete smoke passed on live GitHub Pages.
- No actionable MaintainOps console error was found.

Phase 2C remains blocked until the user explicitly approves continuing.

Recommended next phase, only after approval:

1. Begin LFES Phase 2C as a narrow `partsService` read/simple scoped mutation extraction only.
2. Do not move part document storage, work-order part usage, workflow mutations, rendering, event binding, auth/session startup, or Supabase policies.
3. Run static checks after extraction.
4. Run signed-in Debug Protocol focused on Parts add/edit/use/restock/delete QA-only part, Work Orders, Equipment, Team, active location, and console errors.

## Prior Immediate Step

Stable LFES Phase 2A/2B build was packaged and ready for GitHub Pages upload.

Clean package:

- folder: `MaintainOps-github-clean-20260518-090136`
- zip: `MaintainOps-github-clean-20260518-090136.zip`

## Prior Immediate Step

Full LFES Debug Protocol checkpoint after Phase 2A/2B is complete.

Recommended next sequence:

1. Decide whether to upload/package the current Phase 2A/2B service-wrapper build for GitHub Pages.
2. If uploaded, run the same signed-in GitHub Pages checkpoint before starting Phase 2C.
3. If continuing locally, approve Phase 2C only as a narrow `partsService` extraction for read/simple scoped mutations.
4. Do not move part document storage, work-order part usage, workflow mutations, rendering, event binding, auth/session startup, or Supabase policies in Phase 2C.
5. After Phase 2C, run static checks plus signed-in Debug Protocol focused on Parts add/edit/use/restock/delete QA-only part, Work Orders, Equipment, Team, active location, and console errors.

Phase 2C remains blocked until explicitly approved.

## Prior Immediate Step

LFES Phase 2B profile/member read service extraction is complete.

Recommended next sequence:

1. Review the Phase 2B result in `docs/QA_LOG.md` and `docs/CURRENT_HANDOFF.md`.
2. Either run a full Debug Protocol checkpoint now, or approve Phase 2C.
3. If Phase 2C is approved, keep it narrow: `partsService` for read/simple scoped mutations only.
4. Do not move part document storage, work-order part usage, workflow mutations, rendering, event binding, auth/session startup, or Supabase policies.
5. After Phase 2C, run static checks plus signed-in Debug Protocol focused on Parts add/edit/use/restock/delete QA-only part, Work Orders, Equipment, active location, and console errors.

Phase 2C remains blocked until explicitly approved.

## Prior Immediate Step

LFES Phase 2A `locationsService` extraction is complete.

Recommended next sequence:

1. Review the Phase 2A result in `docs/QA_LOG.md` and `docs/CURRENT_HANDOFF.md`.
2. If approved, begin Phase 2B only: profile/member/team read wrappers.
3. Do not move role mutation workflows, invite acceptance behavior, auth/session startup, active location persistence, rendering, or event binding.
4. After Phase 2B, run static checks and signed-in Debug Protocol focused on startup, Team, Mobile tech visibility, role surface, pending invites, location switch, Work Orders, Equipment, Parts, and console errors.

Phase 2B remains blocked until explicitly approved.

## Prior Immediate Step

LFES Phase 2 service-wrapper extraction planning is complete.

Read before implementing:

- `docs/LFES/audits/LFES_PHASE_2_SERVICE_WRAPPER_PLAN.md`

Recommended next sequence:

1. Review and approve the Phase 2 service-wrapper plan.
2. If approved, implement Phase 2A only: create `src/services/locationsService.js` and extract only location read/create database calls.
3. Do not move auth, active location persistence, rendering, workflow logic, Quick Fix, request conversion, storage, or Supabase policies.
4. Run static checks and signed-in Debug Protocol after Phase 2A.
5. Update `docs/QA_LOG.md` and `docs/CURRENT_HANDOFF.md`.

## Prior Immediate Step

LFES-approved `app.js` modularization Phase 1 is complete.

Recommended next sequence:

1. Run authenticated Debug Protocol in the signed-in browser: startup, login/session persistence, Work Orders load, location switch, Quick Fix smoke, and console scan.
2. Complete real second-user invite acceptance QA.
3. Complete true technician QA for Mobile tech lock and assignment denied paths.
4. Run live Supabase policy inventory against repo expectations.
5. Phase 2 service-wrapper planning is now complete. Do not extract Supabase services yet without explicit approval and a fresh checkpoint.

## Prior Immediate Step

LFES v1 documentation/audit pass is complete.

Recommended next sequence:

1. Review `docs/LFES/audits/LFES_GOLD_AUDIT_REPORT.md`.
2. Complete real second-user invite acceptance QA.
3. Complete true technician QA for Mobile tech lock and assignment denied paths.
4. Run live Supabase policy inventory against repo expectations.
5. Only after approval, start `app.js` modularization with utilities-only extraction and run Debug Protocol after the extraction.

## Prior Immediate Step

The first high-level-code-review corrections are in progress:

1. Equipment-driven cross-location saves now warn before saving.
2. Active location persistence now migrates away from the old global localStorage key after a scoped user/company key exists.
3. A clean GitHub Pages package process and script now exist in `docs/GITHUB_PAGES_PROCESS.md` and `tools/create-github-upload.ps1`.
4. Old GitHub/export packages are archived under `_archive/github-packages`.
5. Read-only location audit SQL exists at `supabase/step-next-location-integrity-audit.sql`.

Still verify in a signed-in browser:

1. Cross-location equipment warning on Quick Fix, Work Order, Quick Update, Request, and PM forms.
2. Location switch and reopen/reload persistence after the legacy key migration.
3. New clean GitHub package upload on GitHub Pages.
4. Run the location audit SQL in Supabase if another location routing issue appears or before validating the not-valid location constraints.

QA-only app cleanup is complete:

1. Requests are clean across all locations.
2. PM schedules are clean across all locations.
3. Procedures are clean.
4. Equipment and Parts show no visible QA headings.
5. Post-delete Quick Fix create/delete smoke passed.
6. Final hosted console check found no MaintainOps errors.

Then continue:

Finish QA for the Mobile tech location lock.

Use `docs/FEATURE_CHANGE_PROCESS.md` and `docs/DEBUG_PROCESS.md` for the standard scope, debug, and smoke workflow before and after this QA pass.

Test:

1. Manager account can switch locations.
2. Technician account cannot switch locations with Mobile tech off.
3. Technician can enable Mobile tech in Team.
4. Technician can then switch locations.
5. Quick Fix lands in the selected location.
6. Technician can turn Mobile tech off and location switch locks again.

## Then Build

Invite default location is now built, SQL-applied, and manager-side smoke tested.

Desired behavior:

1. Manager opens Team.
2. Manager invites a teammate.
3. Invite form includes Role and Default location.
4. New user signs up with invited email.
5. App accepts invite.
6. New member starts in the invite's default location.

Simple schema direction:

- Add `location_id` or `default_location_id` to `team_invites`.
- Add `default_location_id` to `company_members`.
- During invite acceptance, copy invite location to member default.
- During company load, if no active location is set, choose member default location first.

Do not add per-location permission restrictions unless explicitly requested.

Current status:

1. `supabase/step-next-invite-default-location.sql` has been run in Supabase.
2. Manager invite creation with Default location selected passed.
3. `supabase/step-next-cancel-team-invites.sql` has been run in Supabase.
4. Pending QA invite `qa.invite.default.location@maintainops.test` was canceled through Team and no longer appears.
5. Re-test invite acceptance with a real second user.
6. Confirm the new invited user starts in the invite's default location.

## After That

Recommended QA work:

- Re-run role matrix: admin, manager, technician.
- Re-run location matrix: Salem, Riverside, Spokane.
- Re-run work creation matrix across Quick Fix, full work order, PM, and request conversion.
- Re-run procedure checklist matrix.
- Re-run comments/photos/parts/history matrix.

For each feature or fix, follow `docs/FEATURE_CHANGE_PROCESS.md` and run the required smoke pass in `docs/DEBUG_PROCESS.md` before creating a GitHub upload package.

## Short-Term Improvements

- Keep polishing mobile layout based on actual phone screenshots.
- Improve large search result navigation with a "view all matching work orders" path.
- Add clearer empty states where a filtered location has no work.
- Make invite status clearer.
- Review app startup if memberships timeout again.

## Bigger Future Work

- Split `app.js` into modules.
- Add automated browser smoke tests.
- Add seed/test scripts for predictable QA data.
- Add formal deployment checklist.
- Add production hosting path and QR request routing.
- Add backup/export strategy.

## Current Stop Point

Last active development topic before handoff:

Location switching was made intentional with `profiles.mobile_tech`. User suggested the setting belongs in Team, not Settings. The UI was adjusted so Team profile owns Mobile tech, while manager/admin Company Settings stay separate.

Required SQL for that change:

```sql
alter table public.profiles
add column if not exists mobile_tech boolean not null default false;

notify pgrst, 'reload schema';
```
