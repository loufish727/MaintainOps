# LF Engineering Standard Overview

LF Engineering Standard, or LFES, is MaintainOps' internal engineering review framework. It exists to preserve engineering understanding as the app evolves through live testing, Supabase changes, mobile polish, GitHub Pages deployments, and future production preparation.

LFES does not replace the existing Debug Protocol. The Debug Protocol proves the app still works after a change. LFES sits above it and asks whether the work remains explainable, traceable, maintainable, reviewable, and safe to evolve.

LFES is not a legal compliance framework and does not certify MaintainOps against any external standard. It is inspired by useful engineering principles from security, reliability, operations, database design, incident analysis, and software maintainability, but every referenced concept must solve a real MaintainOps engineering problem.

The core purpose is continuity. Important reasoning should live in project files, not only in chat history. Future maintainers and reviewers should be able to understand why a boundary exists, what risk it controls, how it was verified, and what assumptions must be revisited when the system changes.

## How LFES Supports MaintainOps

MaintainOps is a maintenance operations app where a broken workflow can send work to the wrong location, expose company data, hide overdue work, or confuse field technicians. The app is already useful, but its current architecture concentrates many responsibilities in `app.js`. LFES gives the project a disciplined way to improve without breaking the working app.

LFES supports:

- Company isolation through documented tenant-boundary expectations.
- Traceability for work orders, equipment, procedures, requests, photos, messages, and history.
- Controlled evolution before refactors, mobile releases, production launches, or onboarding real companies.
- Reviewability so a professional reviewer does not have to guess where auth, RLS, data loading, workflow mutation, deployment, or QA evidence lives.
- Operational continuity by preserving failure states, recovery paths, deployment assumptions, and verification boundaries.

## LFES Layers

1. Existing Debug Protocol
   - Verifies functional behavior after changes.
   - Confirms the app still loads, navigates, writes data, and handles key workflows.

2. LFES Core
   - Everyday engineering standard.
   - Used during normal fixes, small features, and controlled polish.
   - Keeps changes small, reviewable, secure-aware, and documented enough for continuity.

3. LFES Gold
   - Strict audit mode.
   - Used before professional review, production launch, App Store or Play Store preparation, major refactors, auth/RLS changes, major architecture evolution, onboarding real companies, or operational workflow automation.

## Proportional Rigor

LFES should not apply maximum process to every change. UI spacing, colors, typography, and other low-risk styling should stay lightweight. High-risk systems need deeper traceability and evidence:

- Authentication.
- Authorization.
- Tenant isolation.
- Workflow mutation logic.
- Operational state synchronization.
- Deployment and recovery paths.
- Critical automation boundaries.
- Public request intake.

## Rule ID Families

- `LFES-SEC-*`: Security and tenant isolation.
- `LFES-DB-*`: Database integrity and RLS.
- `LFES-REL-*`: Reliability and failure handling.
- `LFES-MNT-*`: Maintainability and code organization.
- `LFES-SCL-*`: Scalability and performance.
- `LFES-REV-*`: Reviewability and engineering explanation.
- `LFES-DEP-*`: Deployment and recovery.
- `LFES-MOB-*`: Mobile and app store readiness.
- `LFES-TRACE-*`: Assumption and decision traceability.
- `LFES-OBS-*`: Operational observability.
- `LFES-EVOL-*`: Controlled evolution.

## Non-Goals

LFES does not primarily solve formal mathematical correctness, compiler correctness, low-level memory safety, hardware defects, physics-model correctness, or real-time scheduling correctness. It focuses on engineering continuity failures: hidden assumptions, lost context, unsafe evolution, unverified security boundaries, operational invisibility, and architecture drift.
