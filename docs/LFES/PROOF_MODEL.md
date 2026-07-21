# LFES Proof Model

LFES separates evidence by what actually ran. A green check must not imply that a skipped or unavailable layer passed.

## Required Release Gate

`npm run test:lfes:strict` is the required GitHub branch-protection check. It proves that the tested commit passed:

- recursive static inspection of every repository SQL file, including dated migrations
- live anonymous Data API, RPC, and storage boundary probes
- a clean in-memory PostgreSQL build of `supabase/schema.sql` and every dated migration
- PostgreSQL catalog checks for RLS and security-definer `search_path`
- seeded cross-company, manager read-only, and accounting write RLS checks
- runtime bundle generation, manifest validation, and committed-output cleanliness
- the broad Node smoke suite and targeted browser regressions
- local application resource loading and mobile Performance interaction

The command writes machine-readable evidence to `lfes-evidence/`. GitHub retains that directory as the `strict-lfes-evidence` artifact for 30 days.

This gate does not claim that authenticated checks against the isolated testing Supabase project ran. Those require dedicated QA users and are a separate proof layer.

## Authenticated Testing-Platform Proof

`npm run test:lfes:authenticated` is fail-closed. It refuses to run without the isolated backend configuration, all required QA credentials, and fixture identifiers. GitHub serves the selected protected-branch commit locally and rewrites only that disposable checkout's `supabase-config.js` to target the testing platform. It never points the proof at Taylor production. The current workflow is manually dispatched and is not a required pre-merge check; the protected `lfes-qa` environment currently limits it to protected branches. When configured, it proves:

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

The three results must be reported separately:

1. Required Release Gate: `PASS` or `FAIL`.
2. Authenticated Hosted Proof: `PASS`, `FAIL`, or `NOT RUN`.
3. LFES Gold review: completed findings and residual risk.
