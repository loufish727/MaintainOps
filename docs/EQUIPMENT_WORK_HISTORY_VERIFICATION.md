# Equipment Work-History Count Verification

Local verification: 2026-09-22. Executable checkpoint: `5df5fac`.
This document records a local candidate, not a production deployment.

## Finding and Change

Equipment Open Work and Completed History totals came from the shared paged
work-order cache. Completed orders absent from that cache were counted as zero;
expanding history fetched the missing rows and changed the badge.

The equipment detail now requests two exact, company/asset-scoped counts without
fetching work-order bodies. Unknown counts say Loading; failed counts say
Unavailable. Expanding history still loads details on demand and displays 12
per page. History reads traverse server pages in a stable order. The complete
history can recover a failed count; late counts cannot overwrite newer history.

The dedicated state resets on account/company/location/workspace changes and
on equipment re-entry. Count-only updates modify text, not the whole form.
There is no timer, polling, automatic page refresh, schema change, or new package.

## Evidence

| Check | Result and scope |
| --- | --- |
| Full Strict LFES | PASS, 13 stages at a clean `5df5fac` worktree; 182 Node smoke files, 38 targeted browser cases, resource checks and desktop/mobile Performance interactions |
| Authenticated LFES | PASS, all 7 stages: database/storage boundaries, five-role navigation, Production Action/Ready lifecycles, WebKit admin and account/location switching in both engines |
| Focused signed-in regression | PASS in Chromium and WebKit, each at 1440px and 390px; 2 completed orders counted before expansion and the same 2 displayed afterward |
| Lazy loading and editing | No asset-history GET before expansion; exactly 2 HEAD counts; delayed count completion preserves the input node, unsaved value and scroll position |
| Empty/error/paging | Real empty asset shows 0; simulated count failure shows Unavailable; opening recovers 13; Next/Previous displays 12 then 1 then 12 |
| State/service regression | In-flight deduplication, cached reads, invalidation, stale scope responses, history/count races, failures/retry; 1,203 rows with simulated 1,000 and 500 row server limits |
| Startup budgets | Five Chromium roles unchanged: admin/manager/accounting 31, production 30, technician 35; no optional feature bundle on My Work |
| Bundle budgets | PASS without increasing caps; initial JS/CSS 781,635 decoded / 177,821 gzip bytes |

Tests are `asset-work-history-smoke.js`, `asset-detail-display-smoke.js`,
`workspace-detail-navigation-scroll-smoke.js`, and
`equipment-work-history-live.spec.js` under `tests/smoke/`.
The live regression requires `LFES_EQUIPMENT_HISTORY_MUTATIONS=1` plus the
existing isolated-QA environment. It refuses the production project and verifies
cleanup of its exact fixture equipment/work orders and retained financial rows.

Private logs: `LFES/private/equipment-history-{browser,webkit,strict,authenticated}.log`.
The Full Strict summary is archived under `LFES/private/proof/1790138590239/`.
Credentials and screenshots are not committed.

## Boundaries

No production company records were changed. No migration or deployment was run.
Viewport/WebKit checks are not physical-phone testing. The 1,203-row test is a
service simulation; the signed-in paging fixture has 13 work orders. This is
not a large-history attachment/load benchmark or a claim that every LFES human
review obligation is satisfied by the automated suite.
