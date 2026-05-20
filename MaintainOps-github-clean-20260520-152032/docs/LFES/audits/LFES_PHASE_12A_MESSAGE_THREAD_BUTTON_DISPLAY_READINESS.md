# LFES Phase 12A Message Thread Button Display Readiness

Date: 2026-05-20

## Candidate

Move only the message thread rail button display helper:

- `renderMessageThreadButton`

## Why This Is Safe

This helper renders one message thread selector button from already-loaded thread/message state. It does not open threads, mark messages read, create threads, send replies, link work orders, call Supabase, or change message filtering.

## Dependencies To Inject

- `escapeHtml`
- `formatMessageTime`
- `teamMemberName`
- `messageThreadScopeLabel`
- `unreadMessageCount`
- `getMessagesByThreadId`
- `getActiveMessageThreadId`

## Must Not Move

Do not move message filters, active thread state updates, mark-read behavior, thread creation, replies, quick replies, work-order linking, event handlers, mutations, Supabase SQL/RLS, auth/session/company/location logic, `renderWorkspace()`, or `bindWorkspaceEvents()`.
