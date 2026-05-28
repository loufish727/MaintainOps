# Security Verification

MaintainOps uses Supabase Auth, Postgres RLS, scoped RPCs, and private storage buckets. This file records the repeatable security checks that can be run from the repository without exposing service-role credentials.

## Current Verification Commands

Static SQL/RPC audit:

```bash
npm run test:security:static
```

Live anonymous and optional authenticated boundary probe:

```bash
npm run test:security:boundary
```

Authenticated cross-company probing requires environment variables. Do not commit credentials.

```bash
MAINTAINOPS_PROBE_EMAIL="tester@example.com" \
MAINTAINOPS_PROBE_PASSWORD="..." \
MAINTAINOPS_FORBIDDEN_COMPANY_ID="00000000-0000-0000-0000-000000000000" \
npm run test:security:boundary
```

## Latest Local Results

Last checked: 2026-05-28.

Static SQL audit:

- security-definer functions: PASS; all detected security-definer function blocks include `search_path`.
- anonymous grant surface: PASS; anon grants match the intended public request/storage intake allowlist.
- destructive/admin RPC language: PASS; detected destructive/admin function blocks include membership or role-check language.

Live anonymous boundary probe:

- anonymous direct table reads: PASS across the app-used table set; requests returned HTTP 401.
- public request intake invalid-token probe: PASS.
- public request submission invalid-token probe: PASS.

Live authenticated cross-company probe:

- a signed-in QA user was tested against a separate forbidden QA company id.
- `work_orders`: PASS; zero forbidden-company rows visible.
- `assets`: PASS; zero forbidden-company rows visible.
- `parts`: PASS; zero forbidden-company rows visible.
- `maintenance_requests`: PASS; zero forbidden-company rows visible.
- `public_request_links`: PASS; zero forbidden-company rows visible.

## What This Does And Does Not Prove

These checks prove the current public Data API surface rejects anonymous table reads and that the tested authenticated user could not read rows for the tested forbidden company across the selected high-value tables.

These checks do not replace:

- a full Supabase dashboard RLS policy review
- role-by-role destructive mutation attempts
- storage object path abuse tests
- broad end-to-end browser tests
- service-role backup/restore verification

## Review Focus Still Recommended

- Verify every destructive RPC/action has explicit database-side membership or role enforcement.
- Keep anonymous grants limited to intended public request RPCs and storage intake paths.
- Expand authenticated probes to include technician-vs-manager/admin mutation attempts.
- Add storage policy probes for signed URL and delete behavior.
- Repeat this verification after new tables, RPCs, storage buckets, or public intake changes.
