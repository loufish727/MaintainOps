# LFES Phase 6C Parts RPC SQL Proposal

Proposal only. Do not run this SQL until it is separately approved.

No app code, Supabase RLS policies, schema, workflows, rendering, event binding, or business logic changed in Phase 6C.

## Purpose

Phase 6A proved the parts workflow works on the happy path, but it also exposed a transaction gap: recording a part on a work order and decrementing `parts.quantity_on_hand` happen as separate Supabase calls.

This proposal prepares one transaction-safe RPC:

- `public.record_work_order_part_usage`

The first implementation target is only work-order part usage. Parts-screen Restock and Inventory Use remain outside this proposal.

## Current Schema Assumptions

Verified from repo SQL:

- `public.parts.quantity_on_hand` is `integer not null default 0`.
- `public.parts.unit_cost` is `numeric(12,2) not null default 0`.
- `public.work_order_parts.quantity_used` is `integer not null check (quantity_used > 0)`.
- `public.work_order_parts.unit_cost_at_use` exists and is `numeric(12,2) not null default 0`.
- Existing RLS policies use `private.is_company_member(company_id)`.

This proposal intentionally does not add notes/source fields because the current `work_order_parts` schema does not support them.

## Proposed Copy/Paste SQL

```sql
-- LFES Phase 6C proposal only.
-- Do not run until approved.
-- Purpose:
--   Record work-order part usage and decrement inventory atomically.
-- Security:
--   Authenticated users only.
--   Company membership is validated through private.is_company_member(p_company_id).
-- Behavior:
--   Preserves current app behavior by flooring stock at zero instead of rejecting
--   insufficient stock. Strict insufficient-stock blocking remains a future decision.

create or replace function public.record_work_order_part_usage(
  p_company_id uuid,
  p_work_order_id uuid,
  p_part_id uuid,
  p_quantity integer
)
returns table (
  work_order_part_id uuid,
  work_order_id uuid,
  part_id uuid,
  quantity_used integer,
  unit_cost_at_use numeric,
  quantity_on_hand integer
)
language plpgsql
security definer
set search_path = public, private, pg_temp
as $$
declare
  v_user_id uuid := auth.uid();
  v_part public.parts%rowtype;
  v_work_order public.work_orders%rowtype;
  v_work_order_part_id uuid;
  v_next_quantity integer;
begin
  if v_user_id is null then
    raise exception 'Authentication required.'
      using errcode = 'P0001';
  end if;

  if p_company_id is null then
    raise exception 'Company is required.'
      using errcode = 'P0001';
  end if;

  if p_work_order_id is null then
    raise exception 'Work order is required.'
      using errcode = 'P0001';
  end if;

  if p_part_id is null then
    raise exception 'Part is required.'
      using errcode = 'P0001';
  end if;

  if coalesce(p_quantity, 0) <= 0 then
    raise exception 'Quantity must be greater than zero.'
      using errcode = 'P0001';
  end if;

  if not private.is_company_member(p_company_id) then
    raise exception 'User is not a member of this company.'
      using errcode = 'P0001';
  end if;

  select *
  into v_work_order
  from public.work_orders
  where id = p_work_order_id
    and company_id = p_company_id
  for share;

  if not found then
    raise exception 'Work order does not belong to this company.'
      using errcode = 'P0001';
  end if;

  select *
  into v_part
  from public.parts
  where id = p_part_id
    and company_id = p_company_id
  for update;

  if not found then
    raise exception 'Part does not belong to this company.'
      using errcode = 'P0001';
  end if;

  insert into public.work_order_parts (
    company_id,
    work_order_id,
    part_id,
    quantity_used,
    unit_cost_at_use
  )
  values (
    p_company_id,
    p_work_order_id,
    p_part_id,
    p_quantity,
    coalesce(v_part.unit_cost, 0)
  )
  returning id into v_work_order_part_id;

  v_next_quantity := greatest(0, coalesce(v_part.quantity_on_hand, 0) - p_quantity);

  update public.parts
  set quantity_on_hand = v_next_quantity
  where id = p_part_id
    and company_id = p_company_id;

  return query
  select
    v_work_order_part_id,
    p_work_order_id,
    p_part_id,
    p_quantity,
    coalesce(v_part.unit_cost, 0),
    v_next_quantity;
end;
$$;

revoke all on function public.record_work_order_part_usage(uuid, uuid, uuid, integer) from public;
grant execute on function public.record_work_order_part_usage(uuid, uuid, uuid, integer) to authenticated;

notify pgrst, 'reload schema';
```

## Validation Rules

The function validates:

- `auth.uid()` is present.
- `p_company_id` is present.
- `p_work_order_id` is present.
- `p_part_id` is present.
- `p_quantity` is positive.
- the caller is a member of `p_company_id` through `private.is_company_member(p_company_id)`.
- the work order belongs to `p_company_id`.
- the part belongs to `p_company_id`.

The function locks the part row with `for update` before calculating the new quantity. This prevents two concurrent part usage calls from both using stale client-side stock values.

## Transaction Behavior

Postgres functions run inside the caller's transaction.

This RPC performs both operations together:

1. Insert one `public.work_order_parts` row.
2. Update `public.parts.quantity_on_hand`.

If either operation fails, the whole RPC fails and neither change commits.

## Security Model

This proposal uses:

- `security definer`
- pinned `search_path`
- explicit authenticated-user check
- explicit company-membership validation through `private.is_company_member(p_company_id)`
- explicit work-order and part company validation
- `grant execute` to `authenticated` only

It does not grant execute to `anon`, because public QR request users should not record inventory usage.

It does not use or assume the frontend has a `service_role` key.

## Stock Behavior Decision

The proposed function preserves current app behavior:

- if quantity used is greater than current stock, `quantity_on_hand` floors at `0`.
- the usage row still records the full quantity used.

This avoids surprising live users during the first transaction-safety change.

Open future decision:

- Should MaintainOps later reject usage when `quantity_on_hand < p_quantity`?

Strict mode would require replacing:

```sql
v_next_quantity := greatest(0, coalesce(v_part.quantity_on_hand, 0) - p_quantity);
```

with:

```sql
if coalesce(v_part.quantity_on_hand, 0) < p_quantity then
  raise exception 'Not enough quantity on hand.'
    using errcode = 'P0001';
end if;

v_next_quantity := coalesce(v_part.quantity_on_hand, 0) - p_quantity;
```

That is not recommended in the first pass unless the business explicitly wants strict stock enforcement.

## Non-Mutating Verification SQL

These checks are safe to run after the RPC is created because they do not mutate app data.

```sql
select
  exists (
    select 1
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname = 'record_work_order_part_usage'
  ) as rpc_exists;

select
  has_function_privilege(
    'authenticated',
    'public.record_work_order_part_usage(uuid, uuid, uuid, integer)',
    'execute'
  ) as authenticated_can_execute;

select
  table_name,
  column_name,
  data_type,
  is_nullable
from information_schema.columns
where table_schema = 'public'
  and (
    (table_name = 'parts' and column_name in ('quantity_on_hand', 'unit_cost'))
    or
    (table_name = 'work_order_parts' and column_name in ('quantity_used', 'unit_cost_at_use'))
  )
order by table_name, column_name;

select
  relname as table_name,
  relrowsecurity as rls_enabled
from pg_class
where oid in ('public.parts'::regclass, 'public.work_order_parts'::regclass)
order by relname;
```

## Later Authenticated App/API Test

The Supabase SQL editor usually runs outside the app user's JWT context, so `auth.uid()` may be null there. The real mutation test should happen through the authenticated app after Phase 6D integration, or through an authenticated API test session.

Expected Phase 6D smoke:

1. Create QA part with quantity `5`.
2. Create QA work order.
3. Record usage quantity `2` through the app path.
4. Verify one `work_order_parts` row exists.
5. Verify `parts.quantity_on_hand` is `3`.
6. Delete QA work order and QA part through normal app paths.

## Rollback SQL

If the function must be removed before app integration:

```sql
drop function if exists public.record_work_order_part_usage(uuid, uuid, uuid, integer);

notify pgrst, 'reload schema';
```

## Risks

### Schema Field Mismatch Risk

The proposal assumes `work_order_parts.unit_cost_at_use` exists. Repo schema confirms it does, so the RPC intentionally does not preserve the current app's missing-column fallback.

### Existing Behavior Mismatch Risk

The proposed function preserves floor-at-zero stock behavior. If the team later wants strict insufficient-stock rejection, that must be approved as a separate behavior change.

### Security Definer Risk

Because this uses `security definer`, the function must keep explicit membership and company-row validation. The function should not be simplified to rely only on UI controls.

### Location Assumption Risk

The function validates same company, not same location. This matches the current broader app behavior where equipment/work routing already has cross-location complexity. A same-location requirement should be added only after the business confirms it.

### Rollout Risk

If app code calls the RPC before SQL is applied and PostgREST reloads, work-order part usage will fail. SQL must be applied and verified before Phase 6D app integration is uploaded.

## Phase 6D Implementation Notes

Phase 6D should change only:

- `addPartUsageToWorkOrder(workOrderId, part, quantity)`

Phase 6D should not move:

- Quick Fix workflow
- full work-order create workflow
- request conversion
- parts screen Restock/Use
- rendering
- event binding
- service-wrapper architecture
- Supabase RLS policies

Recommended app call shape:

```js
await supabaseClient.rpc("record_work_order_part_usage", {
  p_company_id: activeCompanyId,
  p_work_order_id: workOrderId,
  p_part_id: part.id,
  p_quantity: quantity,
});
```

Required smoke after Phase 6D:

- Work Order Detail part usage.
- Quick Fix with part usage.
- Full Work Order creation with part usage.
- Insufficient-stock behavior, preserving floor-at-zero unless separately changed.
- Concurrent/stale quantity simulation if possible.
- Cleanup verification for QA work order, QA part, and `work_order_parts`.

## Current Decision

Phase 6D implementation remains blocked until this SQL proposal is reviewed and the SQL is separately approved/applied.
