# QA Log

This public QA log intentionally stays high-level. Detailed phase logs, user-specific context, and internal LFES catch history live in private/local handoff files.

## Current Verification Baseline

- Static JavaScript syntax checks for touched files.
- Targeted smoke tests for touched workflows.
- Hosted resource smoke for GitHub Pages.
- GitHub Actions Resource Load Smoke after deploy.
- Static SQL security audit for Supabase SQL/RPC surface.
- Security boundary probes when auth/test credentials and live setup are available.

## Recent Verification Notes

- 2026-07-06: Accounting read-only boundary hardening applied to live Supabase. Financial records now read through admin/manager/accounting RLS and write through admin/accounting RLS; operational mutations use `private.is_company_operational_editor(company_id)` so accounting remains view-only outside Financial. Verified with SQL policy catalog query, static security audit, security boundary probe, broad non-live Node smokes, local resource smoke, work-attach browser smoke, and targeted Setup storage navigation smoke.
- Team join-link frontend shipped with targeted display/workflow smokes.
- The live browser check caught and fixed a false successful-team-access warning after join-link acceptance was paired with legacy invite acceptance.
- Request-emailer remains public-request-only; team invite email support was reverted.

## QA Rule

A resource-load smoke proves assets load. It does not prove user workflow behavior. Any changed workflow still needs a targeted behavior smoke.
