# App Performance Telemetry

MaintainOps measures the parts of app performance that a browser can observe without collecting work-order content, names, email addresses, URLs, query text, error messages, or stack traces.

## What Is Measured

- Core Web Vitals: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).
- MaintainOps workflow timing: authenticated workspace readiness, section navigation, and named data-loader duration.
- Reliability: client error events, including browser exceptions and failed named data loaders, plus offline events and reconnect time.
- Device context: coarse mobile/desktop class, coarse device tier, connection class, Save-Data state, and the browser's estimated downlink and round-trip time when available.
- 3D experience: performance-view entry through first rendered frame, frame rate, slow-frame rate, draw calls, triangles, geometries, textures, selected quality mode, and WebGL context-loss events.
- Capacity: company-linked file usage from the existing storage dashboard compared with the shared project allowance.

The raw telemetry table is not readable through the browser API. Signed-in company members submit an allowlisted sample shape through a membership-checked RPC. The Performance screen reads company-level aggregates only. Telemetry writes purge samples older than 90 days.

Measurement generation 2 excludes automated browsers and does not persist workspace, navigation, or data-loader timings interrupted by a hidden tab. The 3D sampler resets its timing window whenever visibility changes. Generation-1 rows remain retained for audit history but do not drive current gauges.

## Grades And Gauges

The Performance screen uses Good, Watch, Poor, or Collecting. Every measured gauge displays its value, measurement period, target, direction, basis, and sample count. When a 30-day aggregate exists, the card also shows the latest measurement from the current browser visit. An overall grade is withheld until at least three measurements are available.

Scale colors run from the lowest numeric value on the left to the highest on the right. Green is therefore on the left for measurements where lower is better, such as render time and errors, and on the right where higher is better, such as frame rate and connection speed. Each card states the direction in text.

| Metric | Good | Watch | Poor | Basis |
|---|---:|---:|---:|---|
| Page paint (LCP) | 2.5 s or less | 2.5-4 s | over 4 s | Core Web Vitals page paint, company p75 |
| INP | 200 ms or less | 200-500 ms | over 500 ms | Core Web Vitals, company p75 |
| CLS | 0.10 or less | 0.10-0.25 | over 0.25 | Core Web Vitals, company p75 |
| Workspace ready | 3 s or less | 3-6 s | over 6 s | MaintainOps product target, company p75 |
| Section navigation | 500 ms or less | 500-1,500 ms | over 1,500 ms | MaintainOps product target, company p75 |
| Data loader | 500 ms or less | 500-1,500 ms | over 1,500 ms | MaintainOps product target, company p75 |
| Client errors | 1 or fewer per 100 visits | over 1 through 5 | over 5 | Client error events divided by signed-in visits |
| 3D frame rate | 40 FPS or more | 24-40 FPS | below 24 FPS | Mixed-device MaintainOps target, company p50 |
| 3D view ready | 5 s or less | 5-10 s | over 10 s | Performance-view entry through first rendered frame, company p75 |
| Estimated connection | 10 Mbps or more | 2-10 Mbps | below 2 Mbps | Browser connection estimate |
| Company linked files | 70% or less | 70-85% | over 85% | Company-linked objects compared with the shared 100 GB project allowance |

Connection speed is a coarse estimate supplied by compatible browsers, not a speed test of the user's internet provider. LCP is top-level page paint and is intentionally separate from Workspace Ready; a sign-in-screen LCP does not claim that authenticated company data is ready. Core Web Vitals follow Google's published thresholds and use the 75th percentile so a small number of fast devices cannot hide a poor experience for a meaningful share of users: [Web Vitals](https://web.dev/articles/vitals). Each Core Web Vital contributes at most one aggregate reading per signed-in browser visit.

The overall score is a transparent, unweighted average of the measured gauges: Good contributes 100 points, Watch 62, and Poor 24. It is an at-a-glance experience indicator, not an industry benchmark, and remains Collecting until at least three gauges have evidence.

## Adaptive 3D Quality

- `Auto` selects an efficient profile for mobile, Save-Data, slow connections, or lower-memory/lower-core devices. Other devices use the balanced profile.
- `Efficient` reduces render resolution, multisampling, bloom, shadow resolution, and target frame rate.
- `Ultra` raises render resolution, multisampling, bloom, and shadow resolution for capable desktops.
- Background tabs are heavily throttled. Mobile touch-target projection is also throttled while the scene is idle.
- Frame samples restart after every tab visibility change, so hidden time is not reported as low FPS.
- The storage scene remains lazy-loaded, so its Three.js code and visual assets do not enter the normal app startup path.

## Hosted Monitoring

The daily `Performance Monitor` GitHub workflow performs a read-only resource check against the deployed app. It records HTTP status, response time, and payload size for the shell, hashed bundles, Performance page, styles, model, HDR, and texture assets. Its response-time grade is a synthetic server/resource signal, not real-user speed or uptime.

The workflow stores `lfes-evidence/hosted-performance-probe.json` for 90 days. It uses standard GitHub-hosted runners and no application credentials.

## Deliberate Limits

- This instrumentation does not prove Supabase database CPU, memory, connection pool use, or infrastructure uptime.
- Supabase Metrics can later provide authenticated Prometheus-compatible infrastructure metrics, but those credentials must stay in a server-side monitoring system and never be placed in browser code.
- Operational counts such as open work orders or recent intake describe workload, not software performance.
- Data-loader timing combines named application loaders; it is not a direct Supabase infrastructure metric.
- Company file usage omits unlinked objects, other companies' objects, and database bytes. It is not the Supabase project's billing total.
- A metric with no samples is shown as Collecting. It is never silently graded Good.
