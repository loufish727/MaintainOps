# LFES Gold Audit Report

Audit date: 2026-05-18

Mode: Documentation/audit only. No behavior changes, no Supabase policy changes, and no `app.js` modularization were performed as part of this audit.

## Overall Score

Overall: 78 / 100, Acceptable

| Category | Score | Weight | Weighted |
|---|---:|---:|---:|
| Security | 25 / 30 | 30 | 25 |
| Database Integrity | 16 / 20 | 20 | 16 |
| Reliability | 12 / 15 | 15 | 12 |
| Maintainability | 8 / 15 | 15 | 8 |
| Scalability | 8 / 10 | 10 | 8 |
| Reviewability | 9 / 10 | 10 | 9 |

MaintainOps is unusually well documented and QA-aware for its stage. The largest gap is maintainability risk from `app.js` responsibility concentration. The highest-risk unverified behavior remains true technician-session validation and real second-user invite acceptance.

## Critical Findings

None identified in this documentation/audit pass.

## High Findings

### H-001: True Restricted-Role QA Still Needs Completion

Evidence: QA log repeatedly notes that manager/admin sessions cannot prove true technician denied paths for assignment and Mobile tech location switching.

Risk: UI and manager-session tests can miss RLS/trigger gaps that only appear under a real technician account.

Recommendation: Run true technician QA for location lock, Mobile tech on/off, assignment denied paths, and request conversion.

Verification needed: QA log entry with technician account, role, company, location, allowed paths, denied paths, and console/error observations.

### H-002: app.js Responsibility Concentration

Evidence: `app.js` is about 435 KB and owns state, auth, rendering, event binding, Supabase data access, public intake, workflow mutation, storage, and utilities.

Risk: Future changes become hard to review, high coupling stays hidden, and AI-assisted work can break unrelated flows.

Recommendation: Follow `APP_JS_MODULARIZATION_PLAN.md`, starting with pure utilities only after approval.

Verification needed: Debug Protocol after every extraction and LFES Gold rerun afterward.

## Medium Findings

### M-001: Invite Acceptance Needs Real Second-User Proof

Evidence: Manager-side invite creation/cancellation passed. Real invite acceptance with default location remains unverified.

Risk: New users may not start in intended location if acceptance/default-location path has an untested edge.

Recommendation: Test with a real second user email and document startup location.

### M-002: Optional Schema Fallbacks Can Hide Missing Migrations

Evidence: App contains readiness flags and fallback query paths for optional schema features.

Risk: Fallbacks protect demos but can obscure unapplied migrations.

Recommendation: Keep setup diagnostics and QA log notes current. During production prep, audit which fallbacks are still necessary.

### M-003: Mobile/File Picker QA Is Incomplete

Evidence: Request photo upload was tested with `logo.png`, but physical browser file picker testing remains manual.

Risk: Mobile photo workflows could fail despite storage/RPC logic working.

Recommendation: Run real desktop and mobile photo upload QA before app store preparation.

### M-004: Deployment Cache/Package Drift Risk

Evidence: Prior GitHub Pages issue showed old app version on hosted URL; clean package process now exists.

Risk: Live testers may hit stale files if cache tags/packages drift.

Recommendation: Use clean package script and hosted cache-bust verification after upload.

## Low Findings

### L-001: README Was Behind Current Engineering Process

Evidence: README described the app but did not yet mention LFES or reviewer start paths.

Recommendation: Light README update in LFES v1.

### L-002: LFES Is New And Needs Future Calibration

Evidence: LFES v1 created the framework.

Recommendation: Update LFES through real QA findings and operational incidents, not process expansion for its own sake.

## Passed Areas

- Existing Debug Protocol is strong and specific.
- QA log contains unusually detailed evidence and record tokens.
- Work orders include `company_id`.
- `private.is_company_member(company_id)` is documented and used as the core tenant boundary.
- RLS is enabled across major schema files.
- Public QR intake uses scoped RPCs.
- Request lists and work-order lists have moved toward server paging.
- Equipment/procedure delete guards use live linked-count checks.
- GitHub Pages clean packaging process exists.
- Explicit Data API grants were addressed for Supabase's public schema change.

## Company Isolation Review

Evidence reviewed from docs and SQL shows company isolation patterns for:

- `assets`
- `parts`
- `locations`
- `maintenance_requests`
- `preventive_schedules`
- `procedure_templates`
- `procedure_steps`
- `work_order_comments`
- `work_order_events`
- `work_order_parts`
- `work_order_photos`
- `work_order_step_results`
- `part_documents`
- `public_request_links`
- `app_issue_reports`
- `message_threads` and message-related tables where applicable

Still needs verification:

- Compare live Supabase schema/policies to repo SQL to catch dashboard-only drift.
- Run role-specific denied-path QA under true technician account.

## Security Assessment

Strengths:

- Tenant isolation concept is correctly centered on company membership.
- Public QR access is narrow and RPC-based.
- Team invite/cancel RPCs are manager/admin scoped.
- Storage policies use company-folder membership checks in schema files.

Gaps:

- Live policy inventory has not been fully compared against repo SQL during this LFES pass.
- True restricted-role QA remains incomplete.

## Production Readiness Assessment

Not production-ready for onboarding real companies yet. It is strong for live pilot testing with known users. Before production:

- Complete technician denied-path QA.
- Complete real second-user invite acceptance QA.
- Run live Supabase policy inventory.
- Complete mobile photo/file picker QA.
- Create release/rollback checklist.
- Begin modularization only after utility-first plan approval.

## Mobile Readiness Assessment

Mobile UX has been actively polished, and Quick Fix/request flows have mobile awareness. App Store/Play Store readiness is not yet complete because offline/reconnect behavior, mobile auth persistence, real device file picker/photo behavior, and release/version discipline need more evidence.

## Operational Continuity Assessment

Strong for current stage. The docs, QA log, Debug Protocol, and LFES v1 preserve much of the operational memory. The main continuity risk is still that `app.js` has too many hidden dependencies.

## Engineering Continuity Assessment

Good and improving. LFES v1 turns a lot of reasoning into durable project files. The next improvement should be safe modularization with evidence after every extraction.

## Recommended Fix Order

1. Complete real second-user invite acceptance QA.
2. Complete true technician Mobile tech and assignment denied-path QA.
3. Run live Supabase policy inventory/audit against repo expectations.
4. Run mobile photo/file picker QA.
5. Prepare a release/rollback checklist.
6. Start app.js utilities-only extraction after approval.
7. Run Debug Protocol and LFES Gold after each modularization phase.
