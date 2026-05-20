# LFES Phase 11L Work Command Summary Display Readiness

Date: 2026-05-20

## Candidate

Move only the work order command summary display helper:

- `renderWorkOrderCommandSummary`

## Why This Is Safe

This helper renders command cards from already-loaded work order state. It does not bind jump behavior, save updates, assign work, complete work, mutate records, or call Supabase.

## Dependencies To Inject

- `escapeHtml`
- `statusLabel`
- `assignmentLabel`
- `isVendorAssigned`
- `hasCompletedSafetyDeviceCheck`
- `renderEmailHelperCommandCard`
- `getMessageThreads`
- `getPartsUsedByWorkOrder`

## Must Not Move

Do not move quick update behavior, jump behavior, assignment/completion mutations, safety check logic, parts usage mutations, event handlers, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.
