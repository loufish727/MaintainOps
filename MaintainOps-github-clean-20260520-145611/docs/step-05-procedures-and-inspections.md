# Step 5: Procedures And Inspections

## Goal

Turn procedures into structured inspection templates instead of simple checklist text.

## Added In This Step

- Procedure steps now support response types: checkbox, pass/fail, number, and text.
- Work order checklists can record inspection responses.
- Failed pass/fail steps expose a corrective follow-up action.
- Follow-up corrective work orders are generated from failed inspection steps.
- Procedure templates are clickable and editable in the detail panel.
- Procedure names, categories, step text, and response types persist in `localStorage`.

## Current Limits

- Required fields are modeled but not yet enforced.
- Corrective follow-ups use a fixed due date in this prototype.
- Inspection responses are stored directly on the work order, not in a separate normalized result table.
- No photo-required or signature-required step types yet.

## Next Build Slice

Step 6 should add preventive maintenance:

- Recurring schedules.
- Next due dates.
- Generated PM work orders.
- PM compliance metrics.
- Schedule status and pause/resume controls.
