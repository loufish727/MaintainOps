# Performance Motion Verification

## Scope

The September 23, 2026 update retains the existing room artwork, models, access
rules and telemetry definitions. It adds illuminated core-ring segments, inset
floor guide lights, wider silo doors, a separate inspection panel, signal-cube
selection outlines, and a 12-day activity timeline with actual sampled counts.
The floor lights are ambient animation, not a network-transfer measurement.

Refresh now updates the existing room snapshot rather than reloading its iframe.
Motion can be paused, follows the device's reduced-motion setting, and does not
advance or render while the document is hidden. Closing an inspection disposes
its owned GPU resources. No database migration, production-record change,
dependency, image, model or texture was added.

## Candidate Evidence

Baseline: `89b9ab67b41425ab91376e7121fd445eda48fb78`.
Application/test candidate: `00a8a0d67fc7c105c48210914aa6ac148ac32088`.
Runner correction: `de35896` limits the local Chrome-channel override to Chromium
instead of passing it into WebKit launches. Application output is unchanged.

- Full Strict passed all 13 stages on the clean candidate, including 198 Node
  smokes, 81 targeted browser cases, resource checks, and four Performance cases.
- The new motion/refresh/inspection cases separately passed in WebKit at
  1440x900 and 390x844. Chromium used the installed Chrome channel on this PC.
- Canvas-pixel checks found nonblank output; screenshots changed during motion
  and remained identical while paused. Screenshots were visually reviewed at
  desktop and phone widths. The opened silo remains above the mobile inspector.
- Exact timeline counts, zero-height quiet days, snapshot updates without new
  scene requests, camera/selection retention, repeated-inspection resource use,
  paused controls, reduced motion, and page overflow are asserted.
- Existing tests still cover mobile silo/cube taps, empty-space reset, Back
  placement, adaptive quality, and measured health gauges.
- The signed-in admin contract now clicks the real Refresh button and checks
  that the iframe time origin and selected view remain unchanged.
- Authenticated proof passed all seven stages at `de35896` against the isolated
  testing platform: five Chromium roles, WebKit admin, both account/location
  switching paths, authenticated boundaries, and both Production Action and
  Production Ready lifecycles. Disposable fixtures were removed. Startup stayed
  within the existing 35-request budget (30-35 requests by role); no lazy feature
  bundle was loaded in those initial workspace captures.

GitHub release results must still be checked separately; standalone synthetic
snapshots do not prove signed-in data loading.
Local private evidence is retained under `LFES/private/proof/`, with motion
screenshots and the baseline comparison under `LFES/private/`.

## Weight And Runtime Comparison

Gzip level 9, using the existing bundle-budget measurement:

| Payload | Baseline bytes | Candidate bytes | Change |
| --- | ---: | ---: | ---: |
| Initial first-party JS/CSS | 176,787 | 176,694 | -93 |
| Lazy spatial JS | 185,864 | 188,651 | +2,787 |
| Lazy spatial CSS | 9,499 | 10,351 | +852 |

The lazy-only addition is 3,639 compressed bytes. Existing budget limits were
not raised. Initial runtime and main stylesheet are unchanged; the app-shell
refresh handler is smaller.

A sequential local Chrome comparison against the exact baseline, with a
one-second warmup and five-second observation per view, measured browser
requestAnimationFrame rates of 60.16/60.13 FPS on desktop and 60.16/60.06 FPS at
phone width (baseline/candidate). All four p95 frame gaps were 16.8 ms. The sampled
overview render calls increased from 1,275 to 1,299 on desktop and 1,100 to 1,119
at phone width. These are browser-frame observations on this PC, not a claim of
identical GPU cost, actual 3D-render FPS, Internet speed or phone battery use.

## Limits And Rollback

- No physical iPhone/Android, throttled-network, battery or long-duration soak
  measurement was performed. Browser phone emulation is not physical-device proof.
- Hidden-time behavior is unit-tested through the motion clock; the browser
  suite proves pause/reduced-motion behavior, not background OS scheduling.
- Refresh requests a new sample on demand; ambient motion does not add polling
  or imply continuously updated telemetry.
- Reverting this release's source and matching generated bundles restores the
  previous presentation. No database or company-data rollback is necessary.

These results are scoped automated and visual evidence, not a claim that every
possible workflow or all LFES Gold concerns have been proven.
