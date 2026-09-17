# Messaging Verification

## Release State

The 2026-09-17 redesign is on the isolated messaging review branch. Its additive migration is verified in isolated PostgreSQL and applied to the testing platform, not production. Deploy the migration before the matching frontend. Do not publish the frontend alone: quoted history and preferences require the new database contract.

## Current Contract

- Desktop has a conversation rail and bounded history; mobile shows the inbox or one conversation. Back preserves the inbox position. Conversations and work-order Activity are separate views.
- The inbox displays 12 conversations per page, with All, Unread, Direct, Team and Archived filters. Search covers subjects, people and scope labels, not partially loaded message bodies.
- History opens with 50 non-deleted messages. Earlier messages load in 50-message batches with stable timestamp/ID cursors. Incoming replies preserve a draft and a reader's position; a New messages control returns to the latest reply.
- Direct messages require a teammate, not a subject. An existing generic two-person conversation is reused. Subject-specific conversations and linked work-order discussions remain separate.
- A company-team/location topic includes the company team, not just people at that location. It is not location-private. Direct conversations remain participant-only under RLS.
- Archive is recoverable and personal. A newer reply returns an archived conversation to the inbox. Mute is independent and suppresses the conversation's unread badge, not its delivery. Legacy hidden conversations can be restored from Archived.
- The navigation badge counts unread, unmuted, unarchived conversations. Individual thread pills count unread messages. Work-order Activity keeps its own count.
- Quoted replies reference a non-deleted message in the same thread/company. Four optional reactions mean acknowledged, looking, thanks or question. They never complete work, change assignment, or alter Production Actions.
- Delete removes one's own message from visible conversation history. Accounting is read-only for conversations, enforced in both UI and database; Accounting may still mark messages read.
- Drafts survive local filtering, paging and conversation changes in memory, scoped to user/company/conversation. They do not survive a browser reload and are not an offline queue.
- Sends retry the same generated ID after an ambiguous timeout. A secondary thread-timestamp failure does not turn a committed send into a failed send. Read-marker writes are serialized and deduplicated.

## Loading And Live Updates

- Messages presentation, workflow, live DOM updates and its new CSS are content-hashed lazy resources. My Work does not request them. Lightweight inbox metadata, badge helpers and realtime coordination remain in the startup path.
- One authenticated realtime channel per company/user watches messages, membership preferences and reactions. No polling or workspace refresh is added. The connection label waits for the database subscription acknowledgement, not just a joined socket.
- Reconnect reconciles inbox metadata and opened history, including older loaded messages. Normal reaction updates fetch the affected message only. Coalesced reloads await the newest queued read so an older response cannot hide a just-completed mutation.
- Only latest previews and opened history load message bodies. Inbox metadata and read markers still grow with accessible message volume; this is not a server-side unread aggregate.
- Cross-device read-marker changes and work-order Activity are not subscribed live. Browser notifications, email, attachments, presence, typing indicators and durable offline delivery are not added.

Measured initial first-party JS/CSS decreased from 776,429 to 770,853 decoded bytes and from 174,117 to 173,767 gzip bytes. The on-demand Messages bundle and CSS add 11,701 gzip bytes only when opened. This is a payload measurement, not a claim of faster real-world latency. The total startup budget remains unchanged. The app-shell sub-budget was reallocated from 160/44 KiB decoded/gzip to 170/46 KiB for scope/realtime coordination while the eager runtime shrank; the new lazy resources have separate 32/9 KiB JS and 18/4 KiB CSS limits.

## Automated Evidence

- `message-center-loader-boundary-smoke.js`: more than 1,000 metadata rows, more than 500 memberships, recoverable legacy archive, bounded history and timestamp tie-breaker.
- `message-retry-smoke.js` and `message-workflow-smoke.js`: ambiguous send retries, partial creation recovery, timestamp/read-marker failures and mutation contracts.
- `message-live-smoke.js`: authenticated channel setup, actual database subscription status, event coalescing, serial flush, reconnect and scope teardown.
- `message-reload-queue-smoke.js`: mutations queued behind an in-flight read await a fresh snapshot.
- `message-style-loader-smoke.js`, bundle manifest/runtime/budget checks: lazy CSS/JS, shared loading, bounded failure and retry, and startup payload budgets.
- `messaging-browser.spec.js`: desktop/mobile scrolling, draft retention, scope reset, search focus and escaping.
- `isolated-messaging-check.js`: personal archive/mute, quote boundaries, own-user reactions, immutable audience, read-marker membership, Production access, Accounting write denial, private-thread and cross-company denial, deletion cascade.
- `messaging-live.spec.js`: opt-in admin/technician/accounting lifecycle on the isolated testing platform. Covers 13-thread pagination, 55-message history, retries, reply/delete, real incoming delivery while typing/reading, quotes, reaction toggles on recent and older messages, archive/restore/new-reply resurfacing, mute, direct-thread reuse, work-order links and Accounting API denial. Chromium and WebKit were exercised.
- `role-access-live.spec.js`: all five roles open the lazy Messages screen, check connection and compose permission, and retain existing startup request/DOM budgets and navigation/permission coverage.

## Running Signed-In Proof

Provide testing-only environment values, never commit credentials:
`LFES_SUPABASE_URL`, `LFES_SUPABASE_ANON_KEY`, `LFES_QA_COMPANY_ID`, `LFES_ADMIN_EMAIL`, `LFES_ADMIN_PASSWORD`, `LFES_TECHNICIAN_EMAIL`, `LFES_TECHNICIAN_PASSWORD`, `LFES_ACCOUNTING_EMAIL`, `LFES_ACCOUNTING_PASSWORD`, `MAINTAINOPS_BASE_URL`.

The served build must use the testing configuration and CSP hosts, including WSS for realtime. The mutation test refuses any other backend/company. Set `LFES_MESSAGING_MUTATIONS=1` only when prepared to create and clean up disposable QA conversations.

Run `npx playwright test tests/smoke/messaging-live.spec.js --workers=1`, optionally adding `--browser=webkit`. The separate five-role proof also needs manager and production credentials.

The lifecycle records its unique fixture prefix, company and IDs in ignored `lfes-evidence/messaging-fixtures.json`. Subjectful browser-created threads share the prefix; generic direct-thread IDs are recorded separately. An authorized testing-platform operator must remove exactly those QA threads afterward; memberships, messages, reads and reactions cascade. Failed attempts also require cleanup. There is no authenticated hard-delete policy, so this mutation suite is not silently added to unattended CI.

Full Strict LFES does not substitute for the separate signed-in proof. Screenshots and evidence remain in ignored `lfes-evidence/` or private handoff folders. Desktop/mobile viewport and WebKit checks do not prove physical-device camera or keyboard behavior. No production company rows were changed for this verification.

## Deployment And Recovery

Apply `supabase/migrations/202609171659_messaging_experience.sql` before the frontend release, verify grants/RLS and all three realtime publication members, then run a signed-in Messages smoke. The migration preserves existing conversations and messages.

The testing platform received incremental verification migrations as the contract was refined; the checked-in file is the consolidated fresh-application migration and also passes isolated schema proof. Production application remains a separate release step.

If the UI must be rolled back, restore the previous frontend while retaining the additive database schema and permission restrictions. Do not drop messages/reactions to roll back UI. The legacy hide RPC now archives recoverably; old clients do not expose the restore interface. Re-test that compatibility path before selecting a prolonged frontend rollback.
