# Messaging Verification

## Release State

The 2026-09-17 redesign is on the isolated messaging review branch. Its additive migration is verified in isolated PostgreSQL and applied to the testing platform, not production. Deploy the migration before the matching frontend. Do not publish the frontend alone: quoted history and preferences require the new database contract.

## Current Contract

- Desktop has a conversation rail and bounded history; mobile shows the inbox or one conversation. Back preserves the inbox position. Conversations and work-order Activity are separate views.
- The inbox displays 12 conversations per page, with All, Unread, Favorites, Direct, Team and Archived filters. Personal sections can be assigned or cleared in conversation options. The rail search covers subjects/people; the separate content search covers the complete accessible history with sender/conversation/date filters and 12-result pages.
- History opens with 50 non-deleted messages. Earlier messages load in 50-message batches with stable timestamp/ID cursors. Incoming replies preserve a draft and a reader's position; a New messages control returns to the latest reply.
- Direct messages require a teammate, not a subject. An existing generic two-person conversation is reused. Subject-specific conversations and linked work-order discussions remain separate.
- A company-team/location topic includes the company team, not just people at that location. It is not location-private. Direct conversations remain participant-only under RLS.
- Archive is recoverable and personal. A newer reply returns an archived conversation to the inbox. Mute is independent and suppresses the conversation's unread badge, not its delivery. Legacy hidden conversations can be restored from Archived.
- The navigation badge combines unread, unmuted, unarchived conversations with unread work-order alerts. Individual thread pills count unread messages; the Activity tab also shows its own alert count.
- Quoted replies stay within the same thread/company; deleted originals display as unavailable. Four optional reactions mean acknowledged, looking, thanks or question. They never complete work, change assignment, or alter Production Actions.
- True reply threads stay under a root message in the same conversation/company; nested reply trees are disallowed. A thread dialog pages replies 50 at a time, preserves its local draft, supports files and reactions, and links back to its conversation. Consecutive messages share a sender label; secondary actions use one overflow menu.
- Photos optimize automatically to 768px with a 256 KB target. PDF/text/Office documents and audio allow up to 25 MiB per file, 20 attachments per message. Voice recording requires an explicit click and browser microphone permission, stops after five minutes, and creates an unsent attachment draft. No microphone starts on navigation. Unsupported audio previews retain a download option.
- The microphone control has a visible "Send voice message" label. Sending audio from a new conversation, reply or reply thread opens a review dialog with playback/download, Keep editing and a separate Send voice message confirmation. Cancel/Escape keeps the draft and performs no send/upload/thread creation. A changed draft or workspace invalidates confirmation. Every retry asks again. Transcription is not enabled; no recording is sent to an additional speech-to-text provider.
- Voice controls follow one state at a time: Send voice message; Waiting for microphone with Cancel; Recording with timer/Stop/Cancel; Review voice message when an audio draft is ready. The normal send control is disabled during recording and quick replies are hidden while recording or reviewing an audio draft. Review never starts another recording. Leaving that composer or opening another message tool stops capture; a late permission response cannot restart it or cancel a newer recording. Downloads appear in review only if browser playback is unavailable.
- Files use the private `message-files` bucket and authenticated downloads, never public or signed sharing links. Upload reservations are owner-only; an atomic RPC validates Storage metadata before publishing the message. Interrupted sends retain selected files and retry the same message ID. Own abandoned reservations older than 24 hours are cleaned on the next Messages visit. Soft-deleted message files are inaccessible to recipients; their original author retains access needed for cleanup. Deletion is not an automatic document-retention purge.
- Storage totals, months and photo counts include message attachments. Managers outside a private conversation receive aggregate sizes but masked names/paths/titles and no conversation link. The storage mirror already discovers all buckets, including the new bucket; this change does not schedule that mirror.
- Delete removes one's own message from visible conversation history. Accounting is read-only for conversations, enforced in both UI and database; Accounting may still mark messages read.
- Drafts survive local filtering, paging and conversation changes in memory, scoped to user/company/conversation. They do not survive a browser reload and are not an offline queue.
- Sends retry the same generated ID after an ambiguous timeout. A secondary thread-timestamp failure does not turn a committed send into a failed send. Read-marker writes are serialized and deduplicated.

## Loading And Live Updates

### Visual Polish

#### Matte Reading Surfaces

The approved local preview direction is now adapted to the working Messages UI:
matte eggshell (`#f3f3ee`) conversation/dialog surfaces, a slightly deeper neutral
inbox, dark sender names and headings, pastel initials avatars, and pale green
outgoing messages. The field background is `#f8f8f3`, not pure white. Menus,
search results, Activity, quoted replies, attachment trays, recording states,
errors and native select controls use the same scoped light palette. The rest
of MaintainOps retains its existing theme. No theme preference is added.

This is a presentation adaptation, not the standalone demo's data model. No
fictional equipment, generated photos, synthetic voice, brand render, participant
data or demo-only workflow ships in the working app. Existing permissions,
12-conversation paging, private media lifecycle, realtime, recording confirmation
and the lazy feature boundary remain unchanged. Audio waveform ink comes from
the scoped CSS palette, so played/unplayed samples remain visible on light panels.

Focused browser regressions assert the matte surface, native light controls,
sampled text contrast of at least 4.5:1, waveform ink, menu geometry and draft/
confirmation protection at 1440/768/390/320px. This is targeted contrast evidence,
not a claim of complete WCAG certification. Physical-device checks remain open.

The build measures 773,382 decoded / 174,704 gzip startup bytes (same decoded
size; one gzip byte above the preceding content-hash build). Lazy Messages is
62,113 JS decoded / 19,615 gzip and 31,729 CSS decoded / 6,480 gzip: 26,095 gzip
bytes combined, 50 fewer than the preceding graphite build. Existing budgets
are unchanged. `app.js`, global CSS, SQL and backend contracts are untouched.

#### Industrial Visual Study

At 420px and below, Quick replies uses an accessible, tooltip-labeled icon to keep the attachment and visibly named voice controls on one row.

The earlier industrial study used graphite panel surfaces, restrained edge lighting, recessed fields and mint send controls. It is superseded by the matte reading treatment above. The even two-row filter grid and already-loaded work-order context are retained. No extra query or equipment-photo download is added. The earlier study screenshots are historical comparisons, not theme preferences.

Audio review and opened voice attachments progressively enhance native playback with a waveform sampled from the actual decoded audio, keyboard-operable seeking, elapsed/duration and speed selection. The player is in `messageAudioPlayer.mjs`, inside the lazy Messages bundle. Decoding is local, only after an explicit review/open, for files at most 5 MiB with a known duration of at most five minutes. Large files, unknown/infinite duration, unsupported codecs and decoder failures keep native playback/download. There is no waveform fabrication, autoplay, speech provider or transcription. Closing, changing scope or leaving Messages stops playback and releases URLs; late decoding cannot recreate a closed player.

`message-audio-player.spec.js` covers actual PCM decoding in Chromium, deterministic waveform pixels, seeking, rate, disposal races, native fallback and no remote decoding requests. WebKit tests cover the controller and fallback; they do not prove physical iPhone microphone/codec support. Initial loading limits remain unchanged. Lazy Messages budgets are 61/20 KiB JS and 31/7 KiB CSS decoded/gzip to accommodate the player and material treatment. No new dependency, live database migration or production deployment is involved.

- The Messages-only design uses matte neutral surfaces, dark green actions, pale outgoing bubbles and six deterministic initials-avatar colors. These colors identify conversations, not availability or presence.
- The inbox, chat header, file cards, search, reply threads and voice review share spacing and type rules. Mobile has compact navigation and 48px primary touch controls. Short histories sit next to the composer; longer history remains independently scrollable.
- Message/conversation menus are clamped to the viewport and support outside-click/Escape dismissal. Quick replies open above the composer without changing its height. Linked-work-order controls remain accessible at 320px.
- Inline photos use participant-authorized private downloads only when entering the viewport. At most two downloads run concurrently; the temporary cache is limited to 12 photos / 12 MiB. Photos above 5 MiB retain the explicit open action instead of automatic preview. URLs are revoked on scope changes or leaving Messages. No audio autoplays and no document downloads occur merely to draw a file card.
- `messagePresentation.mjs` owns thumbnail lifecycle and popup positioning; `messageAudioPlayer.mjs` owns progressive audio presentation inside the existing lazy Messages bundle. `app.js` is unchanged. Startup budgets are unchanged. The lazy feature budgets are 61/20 KiB JS and 31/7 KiB CSS (decoded/gzip), reflecting bounded media controllers and presentation styling.
- `message-polish.spec.js` uses clearly fictional local conversations at 1440/768/390/320px. It checks draft stability, keyboard dismissal, menu bounds, quick-reply layout, linked orders, viewport-triggered private previews, concurrency and revoked URLs. It is included in the release/strict browser stage. These fixtures are not production data.

- Messages presentation, workflow, live DOM updates and its new CSS are content-hashed lazy resources. My Work does not request them. Lightweight inbox metadata, badge helpers and realtime coordination remain in the startup path.
- One authenticated realtime channel per company/user watches messages, membership preferences and reactions. No polling or workspace refresh is added. The connection label waits for the database subscription acknowledgement, not just a joined socket.
- Reconnect reconciles inbox metadata and opened history, including older loaded messages. A local reaction write re-reads the affected message, including when it is outside the latest 50. Realtime batches reconcile the messaging snapshot and opened history; they never reload operational workspace data. Coalesced reloads await the newest queued read so an older response cannot hide a just-completed mutation.
- Only latest previews and opened history load message bodies. Inbox metadata and read markers still grow with accessible message volume; this is not a server-side unread aggregate.
- Cross-device read-marker changes and work-order Activity are not subscribed live. Browser push notifications, email, presence, typing indicators and durable offline delivery are not added.

At expanded-feature checkpoint `f32c5e7`, initial first-party JS/CSS measured 772,829 decoded / 174,518 gzip bytes versus 770,853 / 173,767 for the earlier revamp. The change is 751 additional gzip bytes at startup. Messages JS/CSS adds about 20 KB gzip only when opened. Initial limits are unchanged. The expanded lazy feature has separate 54/17 KiB JS and 23/6 KiB CSS decoded/gzip budgets. This is a payload measurement, not a real-world latency claim; final build evidence is authoritative.

## Automated Evidence

Matte-surface code checkpoint `35562c5` passed all 13 Full Strict LFES stages on
2026-09-17 with a clean worktree. Focused presentation, waveform and voice checks
passed Chromium and WebKit; separate signed-in messaging lifecycle and expanded
tools suites passed both browsers. Sampled text contrast checks cover the scoped
palette, not complete WCAG conformance. The current payload figures are recorded
under Matte Reading Surfaces above; no budget was increased for this change.

The initial signed-in run encountered a local preview server whose startup-only
tracked-file allowlist did not include newly rebuilt bundle filenames. Restarting
that server resolved the resource failures; no application startup or auth logic
was changed. Fourteen fixtures from the failed attempt and 33 from the successful
runs were removed. The latter cleanup verified zero stored objects before deleting
the exact run-scoped threads and zero remaining fixtures afterward. The manual
`new` and `test` conversations were preserved. No push, production deployment or
production data change occurred. Physical-phone microphone, codec and virtual
keyboard checks remain outstanding.

Industrial-design code checkpoint `a0442ac` passed all 13 Full Strict LFES stages with a clean worktree, including the added waveform regressions and compact-composer checks. Focused Chromium/WebKit tests cover 1440/768/390/320px, recorded-sample waveform pixels, native fallback, seeking/speed, no autoplay, disposal races, menu bounds and draft/confirmation protection. Signed-in attachment/search/reply-thread/voice workflows passed Chromium and WebKit at `2213ab1`; the subsequent narrow-composer-only refinement passed the full Chromium gate and focused WebKit presentation tests.

The signed-in resize assertion initially sampled the old 899px desktop height immediately after switching to an 844px viewport. Evidence showed it settling to exactly 844px on the resize event. The test now waits for the expected height and still asserts no horizontal or vertical document overflow; no application resize logic was weakened. Native select color-scheme and narrow composer wrapping were corrected after visual inspection.

Initial first-party JS/CSS remains 773,382 decoded / 174,703 gzip bytes, unchanged from the preceding visual-polish checkpoint. Lazy Messages is 61,974 JS decoded / 19,558 gzip and 31,259 CSS decoded / 6,587 gzip: 26,145 gzip total, 2,193 bytes more than the preceding design. No engine, font, texture download or new dependency was added. Material surfaces are CSS; photo previews retain their existing private, viewport-only loading contract.

All three generated testing conversations and their uploads were removed after signed-in proof; the manual `new` conversation was retained. The local preview was visually checked after restoring it. Screenshot studies use fictional content and are saved under the ignored `LFES/private/messaging-art-direction-2026-09-17/` folder. There was no push, production deployment or production data change. Physical-phone microphone, codec and virtual-keyboard verification remains outstanding.

Local code checkpoint `ffaf0da` passed all 13 Full Strict LFES stages on 2026-09-17 with a clean worktree. Separate signed-in Chromium/WebKit messaging lifecycles and five-role Chromium navigation/permission proof passed. The five-role test measured 30-35 startup requests against the unchanged 35-request budget and no optional feature bundles on My Work. These are testing-platform measurements, not production latency claims. All disposable messaging fixtures were removed afterward; no production deployment or hosted-release check was performed.

Expanded-feature checkpoint `f32c5e7` passed all 13 Full Strict LFES stages on 2026-09-17 with a clean worktree. Separate signed-in messaging lifecycle and expanded-tools suites passed in Chromium and WebKit. `message-tools-live.spec.js` covers content search pagination, personal organization, 51+ replies, draft retention, photo resizing, voice start/cancel, private downloads, forced attachment-commit failure/retry, storage masking and 320/390px mobile layouts. Recording uses a deterministic microphone double, not a physical microphone. Chromium decoded the WAV fixture; Windows WebKit exercised the unavailable-decoder download fallback. Physical iOS/Android microphone, codec interoperability and virtual-keyboard behavior still require device verification.

The final five-role Chromium proof passed: admin 33, manager 31, accounting 31, production 32 and technician 35 startup data requests, against the unchanged 35-request budget. No optional feature bundle loaded on My Work. Local testing-platform workspace visibility measured 1.85-1.89 seconds; this is not a production/mobile-network benchmark. An earlier run with 82 accumulated disposable test conversations exceeded the technician budget at 39 requests. Cleaning the generated fixtures restored the baseline; it did not eliminate the known volume-dependent metadata cost. The more-than-1,000-row loader test proves pagination correctness, not constant-cost startup at that volume.

Generated conversations and uploaded objects were removed after proof. The user's manually created `new` conversation was retained. All changes remain local/testing-only: no production migration, push, deployment or hosted-release validation occurred. Evidence is in ignored `lfes-evidence/` and timestamped private proof snapshots.

Voice-confirmation checkpoint `442de54` passed all 13 Full Strict stages with a clean worktree, including the three new composer confirmation regressions. Focused confirmation checks also passed WebKit; signed-in expanded-tools proof passed Chromium and WebKit with cancel-before-upload and confirmed failure/retry assertions. Startup decoded JS/CSS remains 772,829 bytes; Messages-only JS/CSS totals 20,882 gzip bytes, within the existing limits. No additional provider, schema migration or production deployment was needed. Generated QA conversations/files were removed and the manual conversation retained.

Voice-flow cleanup checkpoint `7ae129b` passed the 12-stage Release Gate on a clean worktree, focused Chromium/WebKit recorder lifecycle/confirmation tests, and signed-in expanded-tools proof in both browsers. The gate's current evidence is `release-gate-summary.json`; the unrelated full 3D interaction stage was not rerun for this voice-only change. Startup remains 772,829 decoded bytes; Messages-only JS/CSS is 21,329 gzip bytes within unchanged budgets. Generated QA fixtures were cleaned; the manual conversation remains. Physical microphone verification is still outstanding.

Visual-polish checkpoint `5323073` passed all 13 Full Strict LFES stages with a clean worktree. Separate signed-in lifecycle/tools suites passed in Chromium and WebKit; five-role Chromium navigation/permission proof passed with startup request counts admin 33, manager 31, accounting 31, production 32 and technician 35. No optional bundle loaded on My Work. These are testing-platform observations, not production latency measurements.

Verification found and corrected an older-message menu closing during scroll, a WebKit quick-reply width shift at 320px, and the surrounding shell's extra mobile bottom padding. Focused Chromium/WebKit presentation regressions cover the final layout; the restored in-app preview also measured document and viewport dimensions identically at 340 x 818. Short and long histories, private thumbnails, fixed photo dimensions, long linked-order titles, keyboard dismissal and voice draft protection remain covered. Physical phone microphone/keyboard behavior is still unverified.

Final initial first-party JS/CSS is 773,382 decoded / 174,703 gzip bytes: 185 additional gzip bytes versus the preceding voice-flow build. Lazy Messages JS/CSS is 23,952 gzip bytes, 2,623 more than that checkpoint. No new UI dependencies, fonts, production schema changes or polling were added; `app.js` is unchanged. All generated QA conversations and uploads were removed; the user's `new` conversation remains. No push, production deployment or hosted-release validation was performed.

- `message-center-loader-boundary-smoke.js`: more than 1,000 metadata rows, more than 500 memberships, recoverable legacy archive, bounded history and timestamp tie-breaker.
- `message-retry-smoke.js` and `message-workflow-smoke.js`: ambiguous send retries, partial creation recovery, timestamp/read-marker failures and mutation contracts.
- `message-live-smoke.js`: authenticated channel setup, actual database subscription status, event coalescing, serial flush, reconnect and scope teardown.
- `message-reload-queue-smoke.js`: mutations queued behind an in-flight read await a fresh snapshot.
- `message-style-loader-smoke.js`, bundle manifest/runtime/budget checks: lazy CSS/JS, shared loading, bounded failure and retry, and startup payload budgets.
- `messaging-browser.spec.js`: desktop/mobile scrolling, draft retention, scope reset, search focus and escaping.
- `isolated-messaging-check.js`: personal archive/mute, quote boundaries, own-user reactions, immutable audience, read-marker membership, Production access, Accounting write denial, private-thread and cross-company denial, deletion cascade.
- `isolated-message-tools-check.js`: organization ownership, parent-thread constraints, indexed search RLS, pending-file privacy, atomic commit/idempotence, missing/mismatched upload denial, file limits, Accounting/nonparticipant/cross-company denial and author-only deleted-file cleanup.
- `message-media-smoke.js`: optimization options, limits, ambiguous upload retry, lazy microphone access, format selection and cancellation.
- `message-voice-confirm.spec.js`: all three composers, permission-pending/cancel races, microphone stop on conversation changes, timer preservation, recording/ready controls, text-only bypass, keyboard submission, cancel/Escape, audio-only sends, stale-draft refusal, scope reset and temporary audio URL cleanup at 320px. Microphone behavior uses a test double. Included in the automated release/strict browser stage.
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

Apply the three dated messaging migrations (`202609171659`, `202609171801`, `202609171830`) in order before the frontend release, verify grants/RLS and all three realtime publication members, then run a signed-in Messages smoke. These migrations preserve existing conversations and messages. The final migration includes message attachments in storage accounting without exposing private conversation metadata to nonparticipants.

The testing platform received incremental verification migrations as the contract was refined; the checked-in file is the consolidated fresh-application migration and also passes isolated schema proof. Production application remains a separate release step.

If the UI must be rolled back, restore the previous frontend while retaining the additive database schema and permission restrictions. Do not drop messages/reactions to roll back UI. The legacy hide RPC now archives recoverably; old clients do not expose the restore interface. Re-test that compatibility path before selecting a prolonged frontend rollback.
