# Step 3: Work Orders MVP

## Goal

Make work orders the operational center of the prototype. A manager or technician should be able to triage, update, document, and complete a job from the work order detail panel.

## Added In This Step

- Persistent work order state using `localStorage`.
- Checklist progress on work order cards and detail views.
- Status actions: open, in progress, blocked, completed.
- Editable priority, assignee, actual minutes, and parts used.
- Technician comments.
- Activity timeline for status, assignment, priority, checklist, parts, and comments.
- New work orders now include initial activity records.

## Current Limits

- Data is still local to the browser.
- Comments use the assigned technician as the author.
- No validation for completing a work order before checklist completion.
- No requester approval flow.
- No file/photo uploads yet.

## Next Build Slice

Step 4 should deepen assets and locations:

- Asset detail views.
- Work order history per asset.
- Location hierarchy.
- Asset status changes.
- QR-ready asset codes.
