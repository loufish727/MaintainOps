# LFES Glossary

## Engineering Continuity

The ability for future maintainers, reviewers, and AI-assisted tools to understand why the system works the way it does and how to evolve it without breaking hidden assumptions.

## Debug Protocol

The existing MaintainOps functional verification process in `docs/DEBUG_PROCESS.md`. It proves behavior still works after changes.

## LFES Core

The everyday standard for controlled MaintainOps development. It emphasizes small changes, clear reasoning, tenant isolation, safe workflow mutation, and enough documentation for future continuity.

## LFES Gold

Strict audit mode used before high-risk transitions such as professional review, production launch, app store preparation, major refactors, auth/RLS changes, or onboarding real companies.

## Tenant Isolation

The guarantee that one company's data cannot be read or mutated by another company. In MaintainOps, `private.is_company_member(company_id)` is a critical boundary for this guarantee.

## Verification Boundary

The exact scope of what was proven by a test or review. Example: manager-side invite creation is verified, but true second-user invite acceptance remains a separate boundary.

## Assumption Traceability

Recording assumptions that could become unsafe later, such as "location switching is intentionally simple" or "public QR access happens through scoped RPCs, not direct table grants."

## Operational Visibility

The ability to understand what state the app is in, what failed, what can recover, and what the user or maintainer should do next.

## Controlled Evolution

Changing the system in small, explainable steps with known rollback paths and verification checkpoints.

## Reviewer Cognitive Load

The effort required for a reviewer to find system entry points, security boundaries, data flows, risks, and evidence. LFES aims to reduce this without adding noise.

## Standards Concept

An idea borrowed from established engineering practices because it solves a relevant MaintainOps problem. LFES must not reference standards for prestige or imply certification.
