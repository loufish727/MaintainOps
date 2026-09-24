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
- a fail-closed allowlist of reviewed first-party `innerHTML` assignment sites
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
- admin, manager, accounting, production, and technician can sign in to the candidate app against the testing platform
- each role receives the expected navigation, Team workload counts, Financial access, and operational read/edit presentation
- each Chromium role completes initial workspace loading within 35 Supabase requests, with core loaders and the scoped work-order count RPC exactly once
- a signed-in Production user can assign, receive, complete, and remove a Production Action without changing work-order ownership; the work order remains blocked from completion while the action is open
- the admin candidate path, including its request budget, also passes in WebKit
- Chromium and WebKit run the reversible equipment archive/restore lifecycle,
  including retained photo bytes, five-role denials, finance editing, paused PM,
  duplicate submissions and complete disposable-fixture cleanup. The narrowly
  scoped QA-only cleanup helper is required; it never grants application users
  equipment DELETE. See `docs/EQUIPMENT_ARCHIVE.md` for setup and evidence.
- Chromium and WebKit sign out an admin who selected a different location, sign in a technician in the same page, and verify the technician's assigned default; legacy preference recovery, fresh-browser behavior, and the admin's own remembered selection after reload are also checked without editing memberships
- a signed-in browser opens App Performance and renders measured gauges through the lazy 3D frame

The GitHub workflow is `Authenticated LFES Proof`. Store its values in the `lfes-qa` environment with these names:

- `LFES_SUPABASE_URL` and `LFES_SUPABASE_ANON_KEY`
- `LFES_ADMIN_EMAIL` and `LFES_ADMIN_PASSWORD`
- `LFES_MANAGER_EMAIL` and `LFES_MANAGER_PASSWORD`
- `LFES_ACCOUNTING_EMAIL` and `LFES_ACCOUNTING_PASSWORD`
- `LFES_PRODUCTION_EMAIL` and `LFES_PRODUCTION_PASSWORD`
- `LFES_TECHNICIAN_EMAIL` and `LFES_TECHNICIAN_PASSWORD`
- `LFES_QA_COMPANY_ID`
- `LFES_FORBIDDEN_COMPANY_ID`
- `LFES_TECH_DELETE_REQUEST_ID`

Use dedicated disposable QA companies and users. Do not store personal or production-company credentials in GitHub.

Latest recorded GitHub proof: run `30933804371` passed the five-role Chromium, signed-in Production Action lifecycle, authenticated boundary, and WebKit admin proof on commit `6b7c71a709ad556245b47d736f9ad4f61691961b` on 2026-08-04.

Local pre-release proof on 2026-09-18 passed Full Strict and all five authenticated
stages at `24632a8`. The candidate was served locally against the testing backend,
not on the production host for those mutation suites. The same executable
candidate was subsequently released through PR #49 (`6ced496`) after production
migrations and the required GitHub Release Gate passed. Pages and Hosted App Smoke
passed; separate signed-in live browsing is read-only for business data. App-wide
and messaging evidence, cleanup and gaps are in `docs/APP_WIDE_VERIFICATION.md`.

## App-Wide Lifecycle Proof

`npm run test:lfes:appwide` is a separate, opt-in mutation suite on the isolated
testing platform. It is not silently added to the fast Release Gate. The suite
creates run-scoped companies, exercises saved workflows and failure recovery,
and checks all permitted tabs for five roles at desktop and phone widths.
Run the same suite with `-- --browser=webkit` for second-engine coverage.

The helper rejects production configuration and requires
`LFES_APPWIDE_MUTATIONS=1`. Private manifests record every temporary company
before mutation. An authorized QA operator must remove only those exact IDs
after verifying ownership and storage cleanup. Archive evidence before another
LFES command replaces `lfes-evidence/`.

See `docs/APP_WIDE_VERIFICATION.md` for the scenario matrix, corrected defects,
reproduction requirements and explicit exclusions. A tab opening is not proof
of all its mutations. Browser viewport emulation is not physical-device proof,
and a passing finite suite is not a claim that every possible flow was tested.

## PM Lifecycle Proof

The local PM candidate completed Full Strict (13 stages) and authenticated proof
(7 stages) at clean commit `fe2ac58` on 2026-09-22 Pacific. Separate opt-in PM
mutation suites passed four cases each in Chromium and WebKit, covering desktop,
phone, 12-item paging, and real PostgreSQL concurrency. They use only the isolated
testing project and run-owned fixtures. Release was authorized on 2026-09-23:
PR #59 is pushed and its production PM integrity migration is applied and verified,
with existing business-record contents unchanged. Frontend merge/deployment still
requires the GitHub Release Gate on the final candidate.

See `docs/PM_LIFECYCLE_VERIFICATION.md` for the tested commit matrix, exact
scenario coverage, cleanup evidence, deployment prerequisite, and remaining
historical-template-versioning and interrupted-network limitations. Local proof
is not a passing GitHub check or a production validation.

## LFES Gold

LFES Gold remains the human, risk-scoped engineering audit. It uses the automated evidence but also covers scope, architecture, live behavior, rollback, operational impact, and findings that cannot be established by one command.

The four results must be reported separately:

1. Required Release Gate: `PASS` or `FAIL`.
2. Full Strict local proof: `PASS`, `FAIL`, or `NOT RUN`.
3. Authenticated Testing-Platform Proof: `PASS`, `FAIL`, or `NOT RUN`.
4. LFES Gold review: completed findings and residual risk.
