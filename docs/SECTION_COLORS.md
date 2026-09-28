# Section Colors

Section identity follows the destination through navigation, headings, filters,
cards, forms, and dialogs. The dark theme, layout, dashboard gauges, and the
Performance room are unchanged.

| Area | Accent |
| --- | --- |
| My Work, Work Orders, Planning, Manager | Blue `#9bb9ff` |
| Equipment, Traveling Equipment | Cyan `#77d7ff` |
| Requests | Teal `#6edbc7` |
| PM, Procedure Checklist | Green `#72d39b` |
| Parts | Amber `#f0bc63` |
| Financial | Lavender `#c5b4f5` |
| Messages | Mint `#99dfce` |
| Team | Green `#72d39b` |
| Conversions | Blue `#9bb9ff` |
| Admin Setup, Settings, app issue reporting | Neutral `#c1cbd2` |
| App Performance navigation | Cyan `#6edcff` |

## Ownership

- The late dark-theme block in `styles.css` defines `--section-*` tokens.
- `renderWorkspace()` sets `body[data-ui-section]` after resolving navigation
  permissions. This includes dialogs appended directly to the body.
- Related records override `--section-ink` locally: a Parts panel inside Work
  remains amber; the Financial editor remains lavender instead of Equipment cyan.
- Attachment dialogs explicitly set `data-ui-section` from their record kind.
  Resumed upload dialogs therefore keep the originating record's identity.
- Global shortcuts keep their destination color rather than the active page's.
- Lazy feature styles consume these tokens. No new image, script, dependency,
  data request, or feature-loading trigger is introduced by the palette.
- Superseded button colors are removed. The stylesheet's compressed allowance
  increases by 256 bytes; its decoded cap and the combined startup caps are unchanged.

## Semantic Exceptions

Color also communicates state. State must not be replaced with section identity:

- Existing work-order statuses, priorities, gauges, and low-stock warnings retain
  their own colors.
- Equipment condition is consistent on ordinary and traveling cards: Running
  green, Watch amber, Degraded orange, Offline / Down red.
- Deleted financial records and destructive actions remain red.
- Print QR Code stays green; Regenerate/Replace QR Code stays dark warning red.
- Current-facility lettering remains blue `#8ecbff`.
- Related media chips and small conversion-category icons retain their existing
  category distinction; their enclosing screens use the section palette.

## Verification

`tests/smoke/section-colors-browser.spec.js` checks all 16 section palettes at
390px and 1440px, nested record accents, dialogs, focus/hover/disabled states,
warnings, equipment states, layout overflow, and conversion expansion. Contrast
assertions cover the changed solid/tinted surfaces; they are not a whole-app
accessibility certification. This spec is included in Release Gate and Full
Strict LFES.

`tests/smoke/section-colors-live.spec.js` is a separate signed-in, read-only QA
walkthrough of all 16 destinations, plus Equipment and Financial details. It
requires testing-platform credentials and a local preview configured exclusively
for that backend; production connections are blocked. It is not silently skipped
when credentials are absent and is not part of the anonymous local gate.

No database migration, permission change, or data mutation is part of this work.
