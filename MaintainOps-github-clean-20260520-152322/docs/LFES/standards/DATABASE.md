# LFES Database Standard

MaintainOps depends on Supabase, Postgres, RLS, security-definer RPCs, storage buckets, and location-scoped operational records.

## LFES-DB-001: Company-Owned Tables Require Company Context

Operational tables that hold company data should include `company_id`. Location-specific operational tables should also include `location_id`.

Tables to keep under this expectation include:

- `assets`
- `parts`
- `locations`
- `work_orders`
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
- `message_threads` and related message membership tables where applicable

## LFES-DB-002: RLS Must Stay Enabled On Shared Tables

Shared/company tables require RLS. Policies should check company membership, usually through `private.is_company_member(company_id)`.

## LFES-DB-003: Use WITH CHECK For Mutations

INSERT and UPDATE policies should use `WITH CHECK` where records could otherwise be moved across company/location boundaries.

## LFES-DB-004: Preserve Relationship Integrity

Important operational relationships should use foreign keys or explicit validation:

- Work order to equipment.
- Work order to procedure.
- Work order to assigned profile.
- Request to equipment.
- PM schedule to equipment/procedure.
- Procedure step to template.
- Photos/comments/events/parts to work order.

## LFES-DB-005: Index Important Query Fields

Large or frequently filtered fields should be indexed, especially `company_id`, `location_id`, `status`, `asset_id`, `work_order_id`, token fields, and relationship join fields.

## LFES-DB-006: Migrations Must Be Documented

Every schema/RLS/RPC change should have:

- A repo SQL file when appropriate.
- Exact SQL pasted to the user.
- Post-application QA notes.
- Schema reload when PostgREST needs it.

## Database Continuity Risks

- Optional schema fallbacks can keep the app alive but may hide unapplied migrations.
- Security-definer functions must keep pinned `search_path`.
- Cleanup scripts must target explicit QA names/tokens and avoid broad deletes.
