# LFES Phase 6B Parts Transaction RPC Plan

Planning only. No app code, Supabase SQL, RLS, RPC, workflow, rendering, event binding, or business logic changed in this phase.

## Purpose

Phase 6A proved the current parts workflow works on the happy path, but also confirmed that recording work-order part usage and decrementing inventory are separate database operations. This plan defines a transaction-safe direction before implementation.

The goal is not to overbuild inventory. The goal is to protect the operational trust boundary where maintenance users expect "part used on work" and "quantity on hand changed" to stay consistent.

## Current Behavior

### 1. Part Creation

Function:

- `createPart(event)` in `app.js`

Current database behavior:

- Inserts one row into `parts`.
- Payload includes:
  - `company_id`
  - `location_id`
  - `name`
  - `sku`
  - `supplier_name`
  - `quantity_on_hand`
  - `reorder_point`
  - `unit_cost`

Current assumptions:

- `activeCompanyId` is present.
- `activeLocationDatabaseId()` is the intended location.
- RLS/grants allow the signed-in user to insert the part.
- UI handles missing schema columns with setup messages.

Transaction risk:

- Low. This is a single-table insert.
- It does not need the first transaction RPC.

### 2. Part Restock

Function:

- `restockPart(event)` in `app.js`

Current database behavior:

- Reads current quantity from the in-memory `parts` list.
- Updates `parts.quantity_on_hand` to `current quantity + submitted quantity`.
- Filters by `id` and `company_id`.

Current assumptions:

- The client-side `part.quantity_on_hand` value is current enough.
- No other user restocks or uses the part between render and submit.
- A simple additive update is acceptable during low-volume testing.

Transaction/race risk:

- Medium.
- Because the update uses a client-calculated final value, concurrent edits can overwrite each other.
- This can be improved later with an atomic restock RPC using `quantity_on_hand = quantity_on_hand + p_quantity`.

### 3. Inventory Use From Parts Screen

Function:

- `usePartFromInventory(event)` in `app.js`

Current database behavior:

- Reads current quantity from the in-memory `parts` list.
- Updates `parts.quantity_on_hand` to `max(0, current quantity - submitted quantity)`.
- Does not create a `work_order_parts` history row.
- Filters by `id` and `company_id`.

Current assumptions:

- This is an inventory adjustment, not a work-order traceability event.
- The client-side quantity is current enough.
- Going below zero is clamped to zero instead of rejected.

Transaction/race risk:

- Medium.
- Concurrent use can overwrite another user's update.
- Clamping to zero prevents negative stock, but can hide overuse.

### 4. Work-Order Part Usage

Functions:

- `recordPartUsed(event)`
- `addPartUsageToWorkOrder(workOrderId, part, quantity)`
- `createQuickFix(event)` calls `addPartUsageToWorkOrder(...)` after creating the work order.
- Full work-order creation calls `addPartUsageToWorkOrder(...)` after creating the work order.

Current database behavior:

1. Insert into `work_order_parts`.
2. If `unit_cost_at_use` is missing in schema, retry insert without it.
3. Update `parts.quantity_on_hand` to `max(0, in-memory part quantity - quantity used)`.

Current assumptions:

- The work order has already been created successfully.
- The selected part belongs to the same company.
- The in-memory `part.quantity_on_hand` value is current enough.
- If part usage insert succeeds but stock update fails, the UI warning is enough.
- RLS permits both the relationship insert and the stock update.

Transaction/race risk:

- High.
- This is the primary Phase 6A finding.
- The insert and stock decrement are not atomic.
- If the insert succeeds and stock update fails, work history says the part was used but inventory does not move.
- If stock update succeeds after a stale in-memory quantity, it can overwrite another user's change.
- If two users record usage at the same time, final stock can be wrong even though both usage rows exist.

## Operations Currently Separate

| Flow | Current operations | Atomic today? | Risk |
|---|---|---:|---|
| Create part | `parts.insert` | Yes, single row | Low |
| Edit part | `parts.update` | Yes, single row | Low/Medium |
| Restock | client-calculated `parts.update` | No concurrent-safety guarantee | Medium |
| Inventory Use | client-calculated `parts.update` | No concurrent-safety guarantee | Medium |
| Work-order part usage | `work_order_parts.insert` then `parts.update` | No | High |
| Quick Fix with part | work order insert, optional part usage insert, stock update | Part usage/stock not atomic | High |
| Full work order with part | work order insert, optional part usage insert, stock update | Part usage/stock not atomic | High |

## Failure Windows

### Work-Order Usage Insert Succeeds, Stock Update Fails

Result:

- Work order history shows part usage.
- Part quantity stays unchanged.
- User may trust inaccurate inventory.

### Stock Update Uses Stale Quantity

Result:

- User A and User B both see quantity 10.
- User A uses 2 and writes 8.
- User B uses 3 and writes 7.
- Actual expected quantity should be 5.

### Retry/Fallback Insert Behavior

Current behavior:

- If `unit_cost_at_use` column is missing, the insert retries without it.

Risk:

- Useful compatibility behavior, but it should not live inside a transaction RPC long-term unless we intentionally preserve backward compatibility.
- Since this project has already been live-tested with `unit_cost_at_use`, future RPC should require the column rather than keep silent fallback forever.

### Overuse Hidden By `Math.max(0, ...)`

Result:

- A user can record more quantity than exists.
- Inventory becomes zero instead of showing an explicit "not enough stock" condition.

Decision needed:

- For maintenance operations, allowing emergency overuse may be useful if the count was wrong.
- Recommended first RPC should default to allowing zero floor, but include an option to reject insufficient stock later if the business wants strict inventory.

## Flows Needing Transaction Protection

Priority 1:

- Work-order part usage from Work Order Detail.
- Quick Fix part usage.
- Full Create Work Order part usage.

Priority 2:

- Inventory Use from the Parts screen.
- Restock from the Parts screen.

Priority 3:

- Part edit/save and delete remain outside this RPC plan.
- Part documents/storage remain blocked for a separate storage plan.

## Recommended RPC Design

### Primary RPC

Recommended function name:

- `public.record_work_order_part_usage`

Purpose:

- Insert a `work_order_parts` usage row.
- Decrement `parts.quantity_on_hand` atomically in the same database transaction.
- Return the inserted usage row plus updated quantity, or at least return `part_id`, `work_order_id`, `quantity_used`, and `quantity_on_hand`.

Required parameters:

- `p_company_id uuid`
- `p_work_order_id uuid`
- `p_part_id uuid`
- `p_quantity_used numeric`
- `p_actor_id uuid default auth.uid()` or no actor param if using `auth.uid()` internally
- Optional later: `p_allow_negative boolean default false`
- Optional later: `p_note text`

Expected validation:

- Authenticated user is required.
- `auth.uid()` must not be null.
- `p_quantity_used` must be greater than 0.
- `p_company_id`, `p_work_order_id`, and `p_part_id` must not be null.
- Caller must be a member of `p_company_id`.
- Work order must exist in `p_company_id`.
- Part must exist in `p_company_id`.
- If work order and part have location ids, validate or intentionally allow same-company cross-location usage only if the app permits that operationally.
- Lock the part row before calculating stock.
- Insert `work_order_parts` with `unit_cost_at_use` from the locked part row.
- Update part quantity with a database-side expression, not a client-calculated final value.

Recommended stock behavior:

- First implementation should match current app behavior as closely as possible:
  - decrement stock by quantity used.
  - floor at zero.
  - do not fail solely because quantity on hand is lower than usage.
- Add a documented future option for stricter inventory:
  - reject insufficient stock.
  - or allow negative stock if the business wants shortages visible.

Reason:

- Matching current behavior preserves field workflow and avoids surprising users during live testing.
- Atomicity improves reliability without changing shop-floor behavior.

### Optional Secondary RPCs

Recommended after primary RPC is proven:

- `public.restock_part_inventory`
- `public.use_part_inventory`

Purpose:

- Make Parts-screen restock/use database-side arithmetic instead of client-calculated final values.
- Optionally record an inventory adjustment history table in the future.

Recommended order:

1. Implement `record_work_order_part_usage` first.
2. Smoke test Quick Fix, full work order create, and Work Order Detail part usage.
3. Only then decide whether Parts-screen Use/Restock need RPCs immediately.

## Tables Affected

Primary RPC:

- `public.work_order_parts`
- `public.parts`
- Read validation against `public.work_orders`
- Read validation against company membership, ideally through `private.is_company_member(p_company_id)`

Optional future history table:

- Not recommended in first implementation.
- If added later, a `part_inventory_events` table could track manual restocks, manual use, work-order use, actor, quantity delta, and source work order.

## Security And RLS Model

Recommended security posture:

- Keep RLS enabled.
- Do not weaken existing table policies.
- Use a `security definer` RPC only if needed to perform the multi-table transaction consistently.
- Pin `search_path` inside any security-definer function.
- Validate company membership inside the function.
- Preserve `private.is_company_member(p_company_id)` as a critical boundary.
- Grant execute only to `authenticated`, not `anon`.
- Do not expose this RPC to public QR users.

Required authorization behavior:

- Any authenticated company member who can currently record part usage through the app should be able to call the RPC.
- If future role restrictions are desired, add them explicitly after confirming current business rules.
- The RPC should not rely on UI role hiding.

RLS consideration:

- If the RPC uses `security invoker`, both the `work_order_parts` insert policy and `parts` update policy must allow the caller.
- If the RPC uses `security definer`, the function must enforce membership, company matching, and row validation internally because it may bypass some row-level checks depending on ownership and privileges.
- Recommended: security definer with explicit membership validation, because it provides one clear database boundary for the transaction.

## Migration Strategy

Planning-only sequence:

1. Create a SQL migration file in the next implementation phase, not in Phase 6B.
2. Define `public.record_work_order_part_usage`.
3. Grant execute to `authenticated`.
4. Notify PostgREST schema reload.
5. Add a temporary app integration path that calls the RPC from `addPartUsageToWorkOrder(...)`.
6. Preserve the current fallback path only if RPC is missing during rollout, with a clear warning and no silent downgrade after deployment.
7. Run static checks.
8. Run local signed-in smoke.
9. Deploy to GitHub Pages.
10. Run live smoke with QA records.

Recommended rollback:

- If RPC smoke fails before deployment, do not upload the app change.
- If live RPC fails after deployment, revert the app to the prior `addPartUsageToWorkOrder(...)` path and keep the SQL function in place but unused until corrected.
- Do not delete the RPC during emergency rollback unless it creates a security problem.

## App Integration Strategy

First app change should be small:

- Keep `recordPartUsed(event)` in `app.js`.
- Keep Quick Fix and full Work Order creation workflows in place.
- Change only `addPartUsageToWorkOrder(workOrderId, part, quantity)` to call the RPC.
- After RPC returns, show the same user-facing success/warning behavior.
- Reload with `await render()` as today.
- Do not move this function into a service during the same phase.

Why:

- This keeps the workflow/event/render contracts stable.
- It changes the database boundary without moving app architecture.
- It is easier to verify and easier to rollback.

Blocked during first implementation:

- Moving parts mutations into `partsService`.
- Refactoring Quick Fix.
- Refactoring work-order creation.
- Creating a full inventory ledger.
- Changing completed/default filters.
- Changing role permissions.
- Changing public QR flows.

## Smoke Tests Required Before Implementation

Before code/SQL changes:

TEST:
Current parts baseline

STEPS:
Open live app, confirm Parts, Work Orders, Quick Fix, and Settings load.

EXPECTED:
No visible app errors or missing scripts.

RESULT:
NOT RUN IN PHASE 6B

NOTES:
Phase 6B is planning-only.

TEST:
QA cleanup baseline

STEPS:
Confirm no `QA Phase6A` records remain in Work Orders, Parts, Requests, or work-order part relationships.

EXPECTED:
No Phase 6A QA records remain.

RESULT:
NOT RUN IN PHASE 6B

NOTES:
Phase 6A cleanup already verified empty results.

## Smoke Tests Required After Implementation

Use QA prefix:

- `QA Phase6C Parts RPC <token>`

Required tests:

TEST:
RPC work-order part usage from Work Order Detail

STEPS:
Create QA part with quantity 5. Create QA work order. Open work order detail. Record 2 units used. Verify `work_order_parts` row exists and part quantity is 3. Delete QA work order and QA part through normal app paths.

EXPECTED:
Usage row and quantity update commit together. No visible app errors.

RESULT:
PENDING

NOTES:
Must verify cleanup.

TEST:
Quick Fix with part usage

STEPS:
Create QA part with quantity 5. Use Quick Fix with that part and quantity 2. Open created work order. Verify parts used shows quantity 2 and part quantity is 3.

EXPECTED:
Quick Fix still creates work order and records part usage atomically.

RESULT:
PENDING

NOTES:
Do not alter Quick Fix workflow beyond the RPC call.

TEST:
Full Work Order creation with part usage

STEPS:
Create QA part with quantity 5. Create full work order with part quantity 2. Verify work order opens, parts used shows quantity 2, and part quantity is 3.

EXPECTED:
Full work order flow still works and part usage/stock remain consistent.

RESULT:
PENDING

NOTES:
This protects the full create path.

TEST:
Insufficient stock behavior

STEPS:
Create QA part with quantity 1. Record usage quantity 5.

EXPECTED:
Behavior matches the approved policy. If preserving current behavior, quantity floors at 0 and usage row records 5. If strict inventory is approved later, the RPC rejects the operation with a clear message.

RESULT:
PENDING

NOTES:
Decision required before implementation.

TEST:
Concurrent/stale quantity simulation

STEPS:
Use two browser sessions or API calls to attempt two part usage operations from the same starting quantity.

EXPECTED:
Final quantity reflects both decrements because database-side locking/arithmetic is used.

RESULT:
PENDING

NOTES:
This is the key confidence test for the RPC.

TEST:
Technician role compatibility

STEPS:
Use the dedicated QA technician account to record allowed work-order part usage on a QA work order if the UI/workflow permits.

EXPECTED:
No unintended role regression. Assignment guardrails remain unchanged.

RESULT:
PENDING

NOTES:
Do not conflate technician assignment authorization with parts usage authorization.

## Cleanup Strategy

All implementation smoke records must use a unique token:

- QA part: `QA Phase6C Parts RPC <token> Part`
- QA work order: `QA Phase6C Parts RPC <token> Work`

Cleanup order:

1. Delete QA work order through app path.
2. Verify `work_order_parts` rows tied to that work order are removed or no longer block cleanup.
3. Delete QA part through app path.
4. Verify no QA records remain in:
   - `work_orders`
   - `work_order_parts`
   - `parts`
5. Document any cleanup blocker.

## Risks

### Behavior Change Risk

If the RPC rejects insufficient stock but the current app floors to zero, users may see a new blocker. Decide intentionally before implementation.

### Permission Risk

If the RPC is too restrictive, technicians or managers may lose an allowed field workflow. If too permissive, company isolation could weaken. Membership checks must be explicit.

### Location Risk

Parts and work orders are both company-owned and may be location-scoped. The RPC should validate same-company first. A same-location requirement should be added only if business rules require it, because equipment-driven routing and multi-location work already have intentional complexity.

### Rollout Risk

If app code calls an RPC that is not yet deployed, part usage will fail. Implementation should either deploy SQL first or include a temporary missing-RPC message that clearly tells the user what setup is missing.

### Architecture Risk

Do not combine this RPC change with service extraction or render/event movement. The operational boundary is enough change by itself.

## Recommended Implementation Phases

### Phase 6C - SQL Proposal And Review

- Produce exact copy/paste SQL for `record_work_order_part_usage`.
- Include grants, search path, membership validation, and PostgREST schema reload.
- Do not change app code until SQL is approved/applied.

### Phase 6D - App Integration

- Update only `addPartUsageToWorkOrder(...)` to call the RPC.
- Preserve UI behavior and workflow structure.
- Run static checks.
- Run local signed-in smoke.

### Phase 6E - Live Deployment And Smoke

- Package/upload to GitHub Pages.
- Run the full required Phase 6C/6D smoke matrix live.
- Verify cleanup.
- Update docs.

### Phase 6F - Optional Restock/Use RPC Planning

- Decide whether Parts-screen Restock and Use should become RPCs.
- If yes, design simple atomic arithmetic RPCs.
- If no, document why current low-volume behavior is acceptable.

## Current Decision

Implementation should remain blocked until Phase 6C is explicitly approved.

The next best controlled step is:

- create exact copy/paste SQL proposal for `record_work_order_part_usage`;
- do not run it until approved;
- then integrate app code in a separate phase after SQL is applied.

