# App Performance Telemetry

MaintainOps measures the parts of app performance that a browser can observe without collecting work-order content, names, email addresses, URLs, query text, error messages, or stack traces.

## What Is Measured

- Core Web Vitals: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).
- MaintainOps workflow timing: workspace ready, section navigation, and named data-query duration.
- Reliability: browser error count, offline events, and reconnect time.
- Device context: coarse mobile/desktop class, coarse device tier, connection class, Save-Data state, and the browser's estimated downlink and round-trip time when available.
- 3D experience: ready time, frame rate, slow-frame rate, draw calls, triangles, geometries, textures, selected quality mode, and WebGL context-loss events.
- Capacity: company storage used and remaining from the existing storage dashboard.

The raw telemetry table is not readable through the browser API. Signed-in company members submit an allowlisted sample shape through a membership-checked RPC. The Performance screen reads company-level aggregates only. Telemetry writes purge samples older than 90 days.

## Grades And Gauges

The Performance screen uses Good, Watch, Poor, or Collecting. Every measured gauge displays its value, measurement period, target, direction, basis, and sample count. When a 30-day aggregate exists, the card also shows the current browser visit separately. An overall grade is withheld until at least three measurements are available.

Scale colors run from the lowest numeric value on the left to the highest on the right. Green is therefore on the left for measurements where lower is better, such as render time and errors, and on the right where higher is better, such as frame rate and connection speed. Each card states the direction in text.

| Metric | Good | Watch | Poor | Basis |
|---|---:|---:|---:|---|
| LCP | 2.5 s or less | 2.5-4 s | over 4 s | Core Web Vitals, company p75 |
| INP | 200 ms or less | 200-500 ms | over 500 ms | Core Web Vitals, company p75 |
| CLS | 0.10 or less | 0.10-0.25 | over 0.25 | Core Web Vitals, company p75 |
| Workspace ready | 3 s or less | 3-6 s | over 6 s | MaintainOps product target, company p75 |
| Section navigation | 500 ms or less | 500-1,500 ms | over 1,500 ms | MaintainOps product target, company p75 |
| Data query | 500 ms or less | 500-1,500 ms | over 1,500 ms | MaintainOps product target, company p75 |
| Browser errors | 1 or fewer per 100 sessions | over 1 through 5 | over 5 | MaintainOps reliability target |
| 3D frame rate, desktop | 50 FPS or more | 30-50 FPS | below 30 FPS | Device-aware MaintainOps target |
| 3D frame rate, mobile | 40 FPS or more | 24-40 FPS | below 24 FPS | Device-aware MaintainOps target |
| 3D ready, standard connection | 5 s or less | 5-10 s | over 10 s | Connection-aware MaintainOps target |
| Estimated connection | 10 Mbps or more | 2-10 Mbps | below 2 Mbps | Browser connection estimate |
| Storage used | 70% or less | 70-85% | over 85% | MaintainOps capacity target |

The 3D ready thresholds expand on connections reported as 3G or 2G. Connection speed is an estimate supplied by compatible browsers, not a test of the user's internet provider. Core Web Vitals follow Google's published thresholds and use the 75th percentile so a small number of fast devices cannot hide a poor experience for a meaningful share of users: [Web Vitals](https://web.dev/articles/vitals). Each Core Web Vital contributes at most one aggregate reading per signed-in browser session. Historical duplicate rows remain intact for auditability but are excluded from the dashboard aggregate.

The overall score is a transparent, unweighted average of the measured gauges: Good contributes 100 points, Watch 62, and Poor 24. It is an at-a-glance experience indicator, not an industry benchmark, and remains Collecting until at least three gauges have evidence.

## Adaptive 3D Quality

- `Auto` selects an efficient profile for mobile, Save-Data, slow connections, or lower-memory/lower-core devices. Other devices use the balanced profile.
- `Efficient` reduces render resolution, multisampling, bloom, shadow resolution, and target frame rate.
- `Ultra` raises render resolution, multisampling, bloom, and shadow resolution for capable desktops.
- Background tabs are heavily throttled. Mobile touch-target projection is also throttled while the scene is idle.
- The storage scene remains lazy-loaded, so its Three.js code and visual assets do not enter the normal app startup path.

## Hosted Monitoring

The daily `Performance Monitor` GitHub workflow performs a read-only resource check against the deployed app. It records HTTP status, response time, and payload size for the shell, hashed bundles, Performance page, styles, model, HDR, and texture assets. Its response-time grade is a synthetic server/resource signal, not real-user speed or uptime.

The workflow stores `lfes-evidence/hosted-performance-probe.json` for 90 days. It uses standard GitHub-hosted runners and no application credentials.

## Deliberate Limits

- This instrumentation does not prove Supabase database CPU, memory, connection pool use, or infrastructure uptime.
- Supabase Metrics can later provide authenticated Prometheus-compatible infrastructure metrics, but those credentials must stay in a server-side monitoring system and never be placed in browser code.
- Operational counts such as open work orders or recent intake describe workload, not software performance.
- A metric with no samples is shown as Collecting. It is never silently graded Good.
