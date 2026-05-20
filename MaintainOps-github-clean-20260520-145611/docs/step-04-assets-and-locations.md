# Step 4: Assets And Locations

## Goal

Make assets operational records instead of static reference cards. A manager should be able to open an asset, understand where it lives, see its maintenance history, and change its current condition.

## Added In This Step

- Clickable asset cards.
- Asset detail panel.
- Editable asset status and criticality.
- Persistent asset changes using `localStorage`.
- Work order history grouped by asset.
- Open/completed work counts per asset.
- Location path display.
- QR-ready asset code block for future scanning flows.

## Current Limits

- The QR block is a readable placeholder pattern, not a real QR image.
- Location hierarchy is derived from the location string.
- Asset attachments, manuals, vendors, serial metadata editing, and downtime logs are not implemented yet.

## Next Build Slice

Step 5 should add procedure and inspection depth:

- Create/edit procedure templates.
- Required checklist fields.
- Pass/fail, numeric, and text step response types.
- Corrective follow-up work orders from failed inspection steps.
