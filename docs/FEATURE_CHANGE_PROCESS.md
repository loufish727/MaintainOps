# MaintainOps Feature Change Process

Use this process whenever MaintainOps gets a new feature, UI change, Supabase change, permission change, or production/GitHub upload update. This is the concrete gate that keeps new work from breaking existing app behavior.

## Purpose

Every change should move through the same path:

1. Define the change.
2. Identify affected app areas.
3. Make the smallest correct implementation.
4. Run targeted QA.
5. Run the standard debug smoke pass.
6. Update docs.
7. Prepare GitHub only when local QA passes.

## Step 1: Define The Change

Before editing, write down:

- requested change,
- reason it is needed,
- screens touched,
- Supabase tables/functions/policies touched,
- roles affected,
- locations affected,
- mobile impact,
- GitHub Pages impact,
- rollback concern.

Use this quick note format in chat or `docs/QA_LOG.md`:

```text
Change:
Why:
Touched screens:
Touched tables:
Roles:
Locations:
Mobile risk:
GitHub risk:
```

## Step 2: Classify Risk

### Low Risk

Examples:

- copy change,
- small visual adjustment,
- cache-bust update,
- doc update,
- simple empty state.

Minimum QA:

- syntax check if code changed,
- fresh local URL,
- changed screen,
- one adjacent screen.

### Medium Risk

Examples:

- button behavior,
- form save,
- list filter,
- section navigation,
- detail panel behavior,
- QR URL display,
- role-gated UI visibility.

Minimum QA:

- syntax check,
- changed path,
- adjacent path,
- main navigation smoke,
- console check,
- QA log update.

### High Risk

Examples:

- Supabase schema/RLS,
- auth,
- company/location logic,
- role permissions,
- work order create/update/complete,
- public QR request intake,
- upload/storage,
- search/pagination,
- mobile layout navigation.

Minimum QA:

- exact SQL in chat if Supabase changes are needed,
- syntax check,
- changed path,
- full required smoke pass from `docs/DEBUG_PROCESS.md`,
- role/location check,
- GitHub package if deployment is needed,
- QA log update.

## Step 3: Impact Map

Before coding, mark each affected area:

```text
[ ] Auth/session
[ ] Company load
[ ] Location switching
[ ] Team/roles
[ ] Quick Fix
[ ] Work Orders
[ ] Requests
[ ] Public QR
[ ] Equipment
[ ] Parts
[ ] PM
[ ] Procedures/checklists
[ ] Comments/photos/history
[ ] Messages
[ ] Report Issue
[ ] Search
[ ] Mobile shell
[ ] GitHub Pages
[ ] Supabase schema/RLS
```

Only test the full matrix when the risk or touched areas justify it, but always test every checked area.

## Step 4: Implementation Rules

- Preserve existing behavior unless explicitly changing it.
- Do not rebuild from scratch.
- Keep Quick Fix central.
- Keep completed work hidden by default unless a filter/gauge selects it.
- Keep large lists paged at 12.
- Keep location switching simple and intentional.
- Do not weaken RLS for convenience.
- Avoid broad cleanup scripts.
- For cleanup, target explicit QA tokens/names only.
- Add comments only when they explain non-obvious logic.
- Bump `app.js?v=...` in `index.html` after JavaScript behavior changes.

## Step 5: Supabase Gate

If the change needs Supabase:

1. Write the SQL as a repo file under `supabase/`.
2. Paste the full copy/paste SQL in chat.
3. Include `notify pgrst, 'reload schema';` when schema cache reload is needed.
4. Keep RLS enabled.
5. Test with the affected role.
6. Record the SQL filename and result in `docs/QA_LOG.md`.

Do not say only "update Supabase." Always provide the full SQL.

## Step 6: Local QA Gate

Run:

```powershell
node --check app.js
node --check supabase-config.js
```

Then open:

```text
file:///C:/Users/louie/Documents/Codex/2026-04-28/theres-an-ap-called-maintenance-x/index.html?qa_bust=feature-YYYYMMDD-HHMM
```

Verify:

- app loads past Loading Workspace,
- changed screen works,
- adjacent screen still works,
- no stale detail panel,
- no stuck Saving state,
- no browser console errors.

Use durable verification signals after writes. A submit click is not enough; confirm the created/updated record appears in the correct list, detail panel, or location.

If a write triggers `Loading Workspace`, wait for the workspace to finish loading before judging the result. Scope submit buttons to their form when labels repeat elsewhere in the app.

When desktop and mobile versions of the same action are both present in the DOM, scope to the visible control before clicking. When testing a workflow, use that workflow's actual field and card contracts rather than assuming every form uses the same names. Examples: Quick Fix uses `#quick-fix-form input[name="title"]`, part cards open with `[data-open-part]`, part Use/Restock actions are in Part Detail, and Add Part may verify by opening the new Part Detail immediately after save.

## Step 7: Required Regression By Feature Type

### Work Order Change

Test:

- Quick Fix creates work order.
- Full work order create or edit path still works if touched.
- Status changes still work.
- Quick Update saves.
- Comments still add.
- Completion safety rule still behaves:
  - no equipment means no safety check required,
  - equipment with safety devices requires check before completion.

### Request Or QR Change

Test:

- internal request submit,
- request appears in location,
- request converts to work order,
- public QR form loads anonymously,
- public QR submit succeeds,
- public QR request appears under the exact QR location. Switch the manager app to that location before judging visibility.

### Equipment Change

Test:

- add equipment,
- open equipment from card,
- save equipment detail,
- Quick Fix for equipment,
- equipment appears in work order selector,
- location remains correct.

### Parts Change

Test:

- add part,
- open part detail,
- save part,
- Use part,
- Restock part,
- part appears in work order parts selector.

### PM Or Procedure Change

Test:

- create procedure,
- add step,
- create PM schedule,
- generate PM work,
- linked procedure checklist appears on generated work order.

### Team Or Role Change

Test:

- manager/admin sees management controls,
- technician does not see admin-only actions,
- Mobile tech off/on location switch behavior,
- sign out/in persistence when relevant,
- role selector options match the current supported role model,
- role save reloads durable Team data, not only a success toast,
- if assignment permissions changed, test allowed and denied paths with the actual affected roles.

For technician assignment rules specifically:

- technician can create Quick Fix,
- technician can convert a request to a work order,
- technician can claim unassigned work for self,
- technician cannot assign work to another teammate,
- technician cannot assign outside vendor,
- technician cannot reassign work already assigned to someone else,
- technician cannot clear an existing assignment.

If only a manager/admin session is available, record the technician-denied paths as remaining risk instead of marking the role change fully proven.

### Mobile Layout Change

Test:

- desktop viewport still usable,
- mobile viewport still usable,
- top actions remain reachable,
- text does not overlap or clip,
- nav buttons are tappable,
- Add to Home Screen/Safari behavior gets a real-device check when possible.

## Step 8: GitHub Package Gate

Only prepare GitHub package after local QA passes.

Clean package must contain exactly:

- `assets`
- `docs`
- `supabase`
- `.gitignore`
- `app.js`
- `index.html`
- `README.md`
- `styles.css`
- `supabase-config.example.js`
- `supabase-config.js`

Before telling the user to upload:

```powershell
node --check app.js
Get-ChildItem <package-folder>
Get-ChildItem -Recurse -Directory <package-folder> | Where-Object { $_.Name -like 'MaintainOps-github*' -or $_.Name -like 'github-upload*' }
Select-String -Path <package-folder>\index.html -Pattern "app.js\\?v="
```

The duplicate-folder search must return nothing.

## Step 9: GitHub Pages QA

After upload, test:

```text
https://loufish727.github.io/MaintainOps/?qa_bust=github-YYYYMMDD-HHMM
```

Verify:

- app loads,
- `supabase-config.js` is not blank,
- login/session works,
- one changed path works,
- one adjacent path works,
- public QR URL uses `https://loufish727.github.io/MaintainOps/`.

## Step 10: Documentation Gate

Update docs before closing the work:

- `docs/QA_LOG.md`: what was tested, records/tokens created, pass/fail, remaining risk.
- `docs/CURRENT_HANDOFF.md`: if the project stop point changed.
- `docs/NEXT_STEPS.md`: if priorities changed.
- `docs/SUPABASE_SETUP.md`: if schema/setup changed.
- `docs/ARCHITECTURE.md`: if data model or core app structure changed.

## Stop Conditions

Stop and report clearly if:

- login/company load fails,
- RLS blocks expected role behavior,
- a save button stays stuck,
- a nav item opens the wrong panel,
- work orders appear in the wrong location,
- public QR request cannot be submitted anonymously,
- GitHub Pages is running stale files,
- a destructive cleanup would affect non-QA data.

## Final Response Template

Use this shape when closing a feature/fix:

```text
Done.

Changed:
- file/path: what changed

Verified:
- static checks
- changed path
- adjacent path
- smoke pass items

Still needs:
- any real-device, role, or GitHub follow-up

Fresh local link:
file:///.../index.html?qa_bust=...

GitHub package:
path, if created
```
