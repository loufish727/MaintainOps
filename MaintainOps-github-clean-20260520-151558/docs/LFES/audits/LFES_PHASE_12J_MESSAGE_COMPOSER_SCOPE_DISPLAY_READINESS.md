# LFES Phase 12J Message Composer Scope Display Readiness

Date: 2026-05-20

## Candidate

Move only the message composer scope note display helper:

- `messageComposerScopeNote`

## Why This Is Safe

This helper returns explanatory text for the selected message thread type. It does not choose recipients, create threads, send replies, link work orders, update active message state, call Supabase, or change message filtering.

## Dependencies To Inject

- `activeLocationName`

## Must Not Move

Do not move recipient selection, thread member payload construction, active thread state updates, mark-read behavior, thread creation, replies, quick replies, work-order linking, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.
