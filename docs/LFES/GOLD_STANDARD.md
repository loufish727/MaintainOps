# LFES Gold Standard

LFES Gold is strict audit mode. It is used when MaintainOps is about to enter a higher-risk stage or when a change could affect system trust.

Use LFES Gold before:

- Professional coder review.
- Major release.
- Production launch.
- App Store or Play Store preparation.
- Major refactor.
- Security review.
- Onboarding real companies.
- Major architecture evolution.
- Auth/RLS changes.
- Operational workflow automation.

## Gold Review Goals

Gold is not generic linting or scoring theater. It is an engineering continuity inspection:

- Can a reviewer understand the system?
- Are tenant boundaries visible and protected?
- Are assumptions documented?
- Are verification boundaries clear?
- Are operational failure states explainable?
- Are dependencies visible enough to evolve safely?
- Does the Debug Protocol still prove the right things?

## Gold Evidence Expectations

Gold review should collect evidence from:

- Current handoff and next-step docs.
- Architecture and QA logs.
- Supabase SQL files and RLS policies.
- Frontend code paths for auth, data loading, workflow mutation, public intake, and deletion.
- Static checks.
- Recent live or local debug runs.
- Known unverified items and manual QA limitations.

## Gold Category Weights

- Security: 30
- Database Integrity: 20
- Reliability: 15
- Maintainability: 15
- Scalability: 10
- Reviewability: 10

Score bands:

- 90-100 Exceptional
- 80-89 Strong
- 70-79 Acceptable
- 60-69 Needs Improvement
- Below 60 High Risk

## Gold Findings

Every finding should include:

- Severity: Critical, High, Medium, Low, or Informational.
- Affected area.
- Evidence.
- Risk.
- Recommended correction.
- Verification needed.

## Gold Boundaries

Gold must not change app behavior by itself. It documents risks and recommended order. Implementation should happen only after approval, in small steps, with Debug Protocol checkpoints.
