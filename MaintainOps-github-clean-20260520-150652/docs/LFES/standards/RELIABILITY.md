# LFES Reliability Standard

Reliability means MaintainOps should fail visibly, recover cleanly, and avoid trapping users in stale or unclear states.

## LFES-REL-001: Loading States Must Clear

Buttons and panels should not stay stuck on loading or saving. Submit handlers should restore controls in `finally` when the form still exists.

## LFES-REL-002: Failed Supabase Calls Need Recovery Paths

When Supabase reads/writes fail, users should see understandable guidance. The app should avoid silent failures, especially for Quick Fix, requests, comments, photos, role changes, and deletes.

## LFES-REL-003: Empty States Should Be Intentional

An empty work queue, request list, or parts list should tell the user whether it is truly empty, filtered, blocked by setup, or waiting on data.

## LFES-REL-004: Mobile And Weak Network Awareness

Mobile users may have weak connectivity. Critical flows should not rely on fragile timing assumptions. Request and Quick Fix saves should make success/failure visible after reload.

## LFES-REL-005: Degraded State Must Be Explainable

If a schema feature is missing, a bucket is not ready, or an RPC is unavailable, the UI should state what setup is missing instead of failing as a generic app error.

## Reliability Evidence

The Debug Protocol is the primary behavior proof. LFES adds that the boundary of each proof must be recorded: what role, location, browser, device, and flow was actually tested.
