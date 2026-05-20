# LFES Traceability Matrix

| Area | Boundary | Evidence | Remaining Verification |
|---|---|---|---|
| Company isolation | `private.is_company_member(company_id)` | `supabase/schema.sql`, architecture docs | Full policy inventory against live Supabase |
| Work orders | Company/location scoping, assignment permissions | `app.js`, `supabase/schema.sql`, technician guardrail SQL, QA log | True technician denied-path QA |
| Equipment | Company/location scoping, delete traceability | `app.js` delete guards, QA log | Periodic linked-count regression test |
| Procedures | Company scoping, step relationships, delete traceability | Procedure SQL, `app.js` delete guards | Checklist regression after refactors |
| Requests | Active/converted filters, public QR intake | `app.js`, public request SQL, QA log | Hosted QR smoke after each upload |
| Public QR | Token-scoped anonymous boundary | `get_public_request_intake`, `submit_public_location_request` | Verify printed QR base URL before live use |
| Team invites | Manager/admin creation/cancel, default location | Invite SQL, cancel invite SQL, QA log | Real second-user acceptance QA |
| Location persistence | Per-user/company localStorage key | `app.js`, QA log | More real-device reload/reopen testing |
| Photos | Private buckets and signed URLs | Storage policies, request photo QA | Real file picker QA on desktop/mobile |
| Deployment | GitHub clean package and cache tags | `tools/create-github-upload.ps1`, docs | Hosted debug after each upload |
| Debug Protocol | Functional regression process | `docs/DEBUG_PROCESS.md` | Keep adding misses discovered during QA |
| LFES | Engineering continuity | `docs/LFES` | Re-run Gold after modularization |
