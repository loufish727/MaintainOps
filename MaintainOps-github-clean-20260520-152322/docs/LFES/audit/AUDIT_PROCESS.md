# LFES Audit Process

Use this process when running LFES Gold or a focused LFES review.

## 1. Read Project Memory

Read:

- `docs/CURRENT_HANDOFF.md`
- `docs/NEXT_STEPS.md`
- `docs/ARCHITECTURE.md`
- `docs/QA_LOG.md`
- `docs/DEBUG_PROCESS.md`
- `docs/LFES/OVERVIEW.md`

## 2. Define Audit Scope

State whether the audit covers:

- Full LFES Gold.
- Security/RLS only.
- Deployment readiness.
- Mobile readiness.
- Refactor readiness.
- A specific workflow.

## 3. Collect Evidence

Use existing files before making assumptions:

- `app.js`
- `supabase-config.js`
- `index.html`
- `README.md`
- `supabase/*.sql`
- Current docs and QA logs.

## 4. Identify Boundaries

Name critical boundaries:

- Auth/session.
- Company membership.
- Location routing.
- Public QR intake.
- Role permissions.
- Deletion/traceability.
- Storage/photo access.
- Deployment package.

## 5. Score Categories

Use `SCORING_MODEL.md`. Record evidence, not impressions.

## 6. Write Findings

Use severity levels from `SEVERITY_LEVELS.md`. Include risk, evidence, recommendation, and verification needed.

## 7. Preserve Assumptions

Document assumptions that future changes must revisit.

## 8. Recommend Fix Order

Order fixes by risk and dependency. Do not refactor before preserving tests and rollback paths.

## 9. Do Not Change Behavior During Audit

Gold audit may recommend changes but should not implement them unless separately approved.
