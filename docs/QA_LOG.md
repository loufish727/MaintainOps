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

- Team join-link frontend shipped with targeted display/workflow smokes.
- The live browser check caught and fixed a false successful-team-access warning after join-link acceptance was paired with legacy invite acceptance.
- Request-emailer remains public-request-only; team invite email support was reverted.

## QA Rule

A resource-load smoke proves assets load. It does not prove user workflow behavior. Any changed workflow still needs a targeted behavior smoke.
