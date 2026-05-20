# LFES Review Checklist

## Security

- No service-role key in frontend.
- No committed secrets discovered in reviewed files.
- Authenticated workspace requires session.
- Role-sensitive actions are not UI-only.
- Public request intake is token-scoped.
- Company isolation is explicit and preserved.

## Database/RLS

- Shared tables have RLS.
- RLS policies use company membership.
- Mutations use `WITH CHECK` where needed.
- `private.is_company_member(company_id)` remains intact.
- Important relationships have FKs or validation.
- Public access is via narrow RPCs.

## Reliability

- Loading states clear.
- Errors are visible.
- Empty states are understandable.
- Failed Supabase calls do not leave stuck controls.
- Mobile/weak network assumptions are documented.

## Maintainability

- `app.js` responsibility concentration is documented.
- Extraction plan exists before refactor.
- Naming is consistent.
- Critical comments are sparse and useful.

## Scalability

- Large lists are paged.
- Searches are bounded.
- Count queries avoid unnecessary fetches.
- Delete guards check live linked counts when paged data could undercount.

## Reviewability

- README points to docs.
- Current handoff is up to date.
- QA log records evidence and gaps.
- LFES audit report exists for Gold review.
