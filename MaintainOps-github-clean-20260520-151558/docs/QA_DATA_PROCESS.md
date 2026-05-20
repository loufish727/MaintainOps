# MaintainOps QA Data Process

Use this when creating QA records and when cleaning them up before live testing.

## Goal

QA records should prove the app works without clogging live work queues, parts, equipment, requests, or PM lists.

## Create QA Data

Every QA record must be easy to find and delete later.

Required naming format:

```text
QA <area> <YYYYMMDD-HHMM-or-token> <short purpose>
```

Examples:

```text
QA quick fix 20260513-1430 location persist
QA request 20260513-1430 public QR
QA part 20260513-1430 restock
QA equipment 20260513-1430 PM link
QA procedure 20260513-1430 checklist
QA PM 20260513-1430 generate work
QA app report 20260513-1430 report issue
```

Rules:

- Start QA titles/names with `QA `.
- Use one shared token per debug run.
- Put the same token in related notes, comments, PM titles, part names, equipment names, and procedure names.
- Do not use live-looking names for QA records.
- Do not create huge stress data unless the user explicitly asks for load testing.
- If a QA record must look realistic for a test, still prefix it with `QA `.

## Delete QA Data

Use the app first. This proves the real delete buttons, permissions, reloads, and post-delete visibility.

App cleanup order:

1. Work Orders: open each visible QA work order, use `Delete Work Order`, then `Permanently Delete`.
2. Parts: open each QA part detail, use `Delete Part`, then the permanent delete confirmation.
3. Requests: delete QA requests from Active, Converted, and All filters. Request photo storage must be removed by the app delete flow.
4. PM: delete QA schedules from the PM list before deleting linked QA equipment.
5. Procedures: delete QA procedure templates after QA PM schedules are gone.
6. Equipment: open each QA equipment detail and delete only when the app says it has no linked history.

Rules:

- Never delete live records.
- Never use a broad cleanup while live testing.
- Do not delete live records just because they are linked to QA records.
- If the app blocks deletion because history exists, leave the record and log the blocker.
- If a section has no app delete/archive function, record that as a gap instead of bypassing the app.
- If a delete button says Supabase setup is needed, run the matching SQL step and repeat the app delete path.

## Debug After Deletion

After cleanup, run a focused debug:

- Startup: app loads with correct company/location.
- Work Orders: default list is not clogged with QA records.
- Requests: Active, Converted, and All filters are reviewed for QA records.
- Parts: QA parts are gone or only blocked by usage.
- Equipment: QA equipment is gone or only blocked by linked history.
- PM and Procedures: QA schedules/templates are gone or only blocked by a clearly logged dependency.
- Quick Fix: create one new QA work order with the current token, verify it opens, then delete it or include it in the next cleanup.
- Location: switch locations and confirm lists remain clean.
- Console: no MaintainOps errors.

Log cleanup counts and any blocked leftovers in `docs/QA_LOG.md`.
