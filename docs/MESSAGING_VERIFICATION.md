# Messaging Verification

## Current Contract

- The inbox displays 12 conversations per page. Search covers subjects, people and scope labels, not a partial search of whichever message bodies happen to be loaded.
- Conversations open with the latest 50 non-deleted messages. Earlier messages load in 50-message batches with stable timestamp/ID cursors.
- Only the latest preview and opened history load message bodies. The unread index is paged metadata; it still grows with accessible message volume and is not a server-side count aggregate.
- Direct conversations include the sender and selected teammate. A location topic includes the company team and is tagged to a location; it is not location-private.
- Accounting retains its existing read-only interface. This change does not modify database grants or role policies.
- Delete removes one's own message from the visible conversation for participants. Hide conversation hides one's own inbox membership, including future replies. It does not delete other participants' copies. There is no restore-hidden interface yet.
- Drafts survive local filtering, paging and conversation changes in memory, scoped to user/company/conversation. They are not durable offline drafts and do not survive a browser reload.
- Sending reloads messaging data only, not the whole workspace. Ambiguous sends retry the same generated ID within the session. Completed sends remain successful if the secondary thread timestamp write fails.
- Messages are retrieved when entering Messages, opening a conversation and after messaging actions. This change does not add realtime delivery, polling, push notifications or email. An already-open conversation does not continuously receive remote replies.

## Automated Evidence

- `message-center-loader-boundary-smoke.js`: metadata exceeding 1,000 rows; hidden membership filtering; bounded history and timestamp tie-breaker; errors propagated.
- `message-workflow-smoke.js`: creation, reply, deletion, hiding and read-marker contracts.
- `messaging-browser.spec.js`: desktop/mobile scrolling, draft retention, company-scope reset, search focus and escaping of text into markup. Included in Release Gate and Strict LFES.
- Existing message display and event tests retain their assertions for pagination and read-only controls.
- `messaging-live.spec.js`: explicit opt-in isolated testing-platform lifecycle using authenticated admin/technician/accounting accounts. Covers 13-thread pagination, 55-message history, partial creation failure/retry, timestamp failure, reply/delete, hide isolation, direct-thread privacy, linked work-order navigation and accounting's read-only interface. Supports Chromium and WebKit.

## Running The Signed-In Check

Provide testing-only values via environment variables, never commit credentials:
`LFES_SUPABASE_URL`, `LFES_SUPABASE_ANON_KEY`, `LFES_QA_COMPANY_ID`, `LFES_ADMIN_EMAIL`, `LFES_ADMIN_PASSWORD`, `LFES_TECHNICIAN_EMAIL`, `LFES_TECHNICIAN_PASSWORD`, `LFES_ACCOUNTING_EMAIL`, `LFES_ACCOUNTING_PASSWORD`, `MAINTAINOPS_BASE_URL`.

The served build must use the testing-platform configuration and CSP host. The test refuses any other backend/company. Set `LFES_MESSAGING_MUTATIONS=1` only when prepared to create and clean up disposable QA conversations.

Run `npx playwright test tests/smoke/messaging-live.spec.js --workers=1`, optionally adding `--browser=webkit`.

The check records its unique fixture prefix, company and seeded IDs in `lfes-evidence/messaging-fixtures.json` before writing fixtures. Browser-created threads share that prefix. An authorized testing-platform operator must remove exactly those QA threads afterward; membership, messages and reads cascade. The client has no hard-delete policy, so this suite is not automatically included in unattended authenticated CI. A failed attempt also requires cleanup. Never use a broad production deletion or weaken RLS to make cleanup pass.

Screenshots and result evidence remain in ignored `lfes-evidence/`. Viewport/touch emulation and WebKit do not prove physical-device behavior.
