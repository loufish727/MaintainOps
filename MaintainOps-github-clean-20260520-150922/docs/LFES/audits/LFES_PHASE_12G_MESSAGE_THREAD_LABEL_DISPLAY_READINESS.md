# LFES Phase 12G Message Thread Label Display Readiness

Date: 2026-05-20

## Candidate

Move only the message thread label display helpers:

- `messageThreadScopeLabel`
- `directThreadNames`

## Why This Is Safe

These helpers format thread scope labels from already-loaded locations, thread members, and profile names. They do not choose recipients, create threads, open threads, mark reads, send replies, link work orders, call Supabase, or change filtering.

## Dependencies To Inject

- `getLocations`
- `getMessageThreadMembers`
- `teamMemberName`

## Must Not Move

Do not move message recipient selection, thread member payload construction, active thread state updates, mark-read behavior, thread creation, replies, quick replies, work-order linking, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.
