# LFES Phase 11C Work Message Display Readiness

Date: 2026-05-20

## Candidate

Move only work-order message display helpers:

- `renderWorkOrderMessages`
- `renderLinkedWorkMessageThread`

## Why This Is Safe

These helpers only render existing linked message thread markup and buttons. They do not create threads, open threads, clear links, update message reads, call Supabase, or bind events.

## Dependencies To Inject

- `escapeHtml`
- `formatMessageTime`
- `messageThreadScopeLabel`
- `getMessageThreads`
- `getMessagesByThreadId`
- `getMessageWorkOrderLinksReady`

## Must Not Move

Do not move message composer behavior, thread open behavior, work-order linking mutations, message read tracking, event handlers, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.
