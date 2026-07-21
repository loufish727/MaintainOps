# LFES Proof Model

LFES separates evidence by what actually ran. A green check must not imply that a skipped or unavailable layer passed.

## Required Release Gate

`npm run test:release:gate` is the fast GitHub branch-protection check. It proves that the tested commit passed:

- recursive static inspection of every repository SQL file, including dated migrations
- live anonymous Data API, RPC, and storage boundary probes
- a clean in-memory PostgreSQL build of `supabase/schema.sql` and every dated migration
- PostgreSQL catalog checks for RLS and security-definer `search_path`
- seeded cross-company, manager read-only, and accounting write RLS checks
- runtime bundle generation, manifest validation, and committed-output cleanliness
- the broad Node smoke suite and targeted browser regressions
- local application resource loading

The command writes machine-readable evidence to `lfes-evidence/release-gate-summary.json`. GitHub retains the `release-gate-evidence` artifact for 30 days. Pull requests that change only Markdown files still report a successful required check but skip executable app tests because no executable input changed.

This gate does not claim that the expensive desktop/mobile 3D Performance interaction or authenticated checks against the isolated testing Supabase project ran. Those are Full Strict LFES layers.

## Full Strict LFES

`npm run test:lfes:strict` runs every Release Gate stage plus the serial desktop/mobile Performance interaction. The manually dispatched `Full Strict LFES` workflow then runs the authenticated testing-platform proof after the local suite passes. It is used before major releases or new work cycles and after security, database, authentication, permissions, storage, or Performance/3D changes.

Full Strict is intentionally not a required check on every pull request. Its evidence is stronger and slower; a passing Release Gate must not be reported as a Full Strict pass.

The separate `Hosted App Smoke` workflow runs the resource-load browser smoke after a successful `main` Pages deployment. It verifies the deployed shell and required resources without rerunning either local LFES tier.

## Authenticated Testing-Platform Proof

`npm run test:lfes:authenticated` is fail-closed. It refuses to run without the isolated backend configuration, all required QA credentials, and fixture identifiers. GitHub serves the selected protected-branch commit locally and rewrites only that disposable checkout's `supabase-config.js` to target the testing platform. It never points the proof at Taylor production. The proof can be dispatched directly or called by `Full Strict LFES`; the protected `lfes-qa` environment limits it to approved refs. When configured, it proves:

- a technician cannot see another QA company's rows
- technician manager/admin RPC attempts are rejected
- forbidden-company storage upload is rejected
- technician request deletion and internal-request photo attachment are rejected
- raw performance samples are not directly readable, malformed samples are rejected, own-company aggregate access works, and cross-company telemetry RPC access is denied
- admin, manager, accounting, and technician can sign in to the candidate app against the testing platform
- each role receives the expected navigation, Team workload counts, Financial access, and operational read/edit presentation
- a signed-in browser opens App Performance and renders measured gauges through the lazy 3D frame

The GitHub workflow is `Authenticated LFES Proof`. Store its values in the `lfes-qa` environment with these names:

- `LFES_SUPABASE_URL` and `LFES_SUPABASE_ANON_KEY`
- `LFES_ADMIN_EMAIL` and `LFES_ADMIN_PASSWORD`
- `LFES_MANAGER_EMAIL` and `LFES_MANAGER_PASSWORD`
- `LFES_ACCOUNTING_EMAIL` and `LFES_ACCOUNTING_PASSWORD`
- `LFES_TECHNICIAN_EMAIL` and `LFES_TECHNICIAN_PASSWORD`
- `LFES_QA_COMPANY_ID`
- `LFES_FORBIDDEN_COMPANY_ID`
- `LFES_TECH_DELETE_REQUEST_ID`

Use dedicated disposable QA companies and users. Do not store personal or production-company credentials in GitHub.

Latest verified proof: GitHub run `29871957982` passed on commit `457ed4fe7e087998dec40baae88baed71bd83e6e` on 2026-07-21.

## LFES Gold

LFES Gold remains the human, risk-scoped engineering audit. It uses the automated evidence but also covers scope, architecture, live behavior, rollback, operational impact, and findings that cannot be established by one command.

The four results must be reported separately:

1. Required Release Gate: `PASS` or `FAIL`.
2. Full Strict local proof: `PASS`, `FAIL`, or `NOT RUN`.
3. Authenticated Testing-Platform Proof: `PASS`, `FAIL`, or `NOT RUN`.
4. LFES Gold review: completed findings and residual risk.
