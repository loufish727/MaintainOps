# LFES Core Standard

LFES Core is the daily development standard for MaintainOps. It keeps normal work practical while preserving security awareness, explainable reasoning, traceability, and maintainability.

Core applies to bug fixes, controlled feature work, UI polish that touches behavior, Supabase migration work, GitHub upload packages, and routine QA-driven improvements.

## Core Rules

### LFES-SEC-001: Preserve Company Isolation

Do not weaken tenant isolation. Shared operational records must remain company-scoped, and RLS must continue to enforce company membership. Treat `private.is_company_member(company_id)` as a critical security boundary.

### LFES-SEC-002: Preserve Auth And Permission Boundaries

Protected routes require authentication. Authorization must not rely only on hidden buttons or UI state. Sensitive mutations must be validated by RLS, RPC logic, triggers, or equivalent database-side enforcement.

### LFES-SEC-003: Avoid Secret Exposure

Do not commit service-role keys or private credentials. Frontend config may contain public anon keys only when appropriate for Supabase client use.

### LFES-DB-001: Preserve Data Boundary Visibility

Company-owned tables should include `company_id`. Location-scoped operational records should include `location_id`. Important relationships should remain visible through foreign keys, documented conventions, or explicit audit notes.

### LFES-DB-002: Keep Migrations Explainable

Supabase changes must be captured in a SQL file when they belong in the repo, and exact copy/paste SQL must be provided to the user.

### LFES-REL-001: Handle Loading, Error, And Empty States

When a change touches a user flow, keep loading, error, and empty states understandable. A failed Supabase call should not leave the user with a stuck button or silent failure.

### LFES-MNT-001: Keep Changes Small And Reviewable

Prefer narrowly scoped edits that preserve existing behavior. Avoid unnecessary abstraction. Move repeated logic into helpers only when it reduces real complexity or matches an established local pattern.

### LFES-MNT-002: Preserve Engineering Memory

Important decisions, assumptions, QA evidence, and risks must be documented in project files when they affect future work. Do not leave critical reasoning only in chat.

### LFES-SCL-001: Avoid Unbounded Reads

Large lists should stay paged or filtered. Work lists, parts, equipment, requests, procedures, PM schedules, and other large collections should avoid unnecessary full-table reads.

### LFES-REV-001: Keep Reviewer Entry Points Clear

Project docs should tell a reviewer where to start, where auth/RLS/workflows live, which risks are known, and what has been verified.

### LFES-TRACE-001: State Verification Scope

When a path is tested, record what was actually proven and what remains unproven. Example: manager-session testing does not prove restricted technician RLS behavior.

### LFES-OBS-001: Preserve Operational Visibility

Do not remove useful warnings, errors, status text, audit history, or visible state signals without replacing the visibility they provided.

### LFES-EVOL-001: Preserve Safe Evolution Paths

Before refactoring high-risk areas, write a plan with extraction order, checkpoints, rollback strategy, and debug protocol coverage.

### LFES-EVOL-002: Make Hard-Boundary Dependencies Explicit

When moving code that touches query orchestration, event binding, workflow state, or other hard boundaries, expose its dependencies through a clear dependency object or getter functions. Do not hide app-state coupling inside a new module.

### LFES-VER-001: Match Smoke Method To UI Shape

Responsive app surfaces may render duplicate controls. For dense or duplicated controls, verify the visible DOM before interacting, and target the visible element rather than assuming a label or placeholder is unique.

## Everyday Core Checklist

- Read current handoff, next steps, architecture, QA log, and debug process first.
- Preserve existing app behavior unless the task explicitly changes it.
- Keep Quick Fix central.
- Preserve completed-work defaults and 12-item paging rules.
- Keep warning states visually obvious.
- Do not weaken RLS or company isolation.
- Do not expose secrets.
- Keep public QR flows scoped and controlled.
- Add short comments only where they reduce future risk.
- Run static checks after code edits.
- Use the Debug Protocol after behavior changes.
- Update docs when assumptions, risks, SQL, or QA evidence change.
