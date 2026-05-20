# LFES Reviewability Standard

Reviewability means a professional reviewer can understand MaintainOps without guessing where the important boundaries live.

## LFES-REV-001: Keep Start Points Clear

README and docs should direct reviewers to:

- Current handoff.
- Next steps.
- Architecture.
- QA log.
- Debug process.
- LFES overview.

## LFES-REV-002: Make Risk Visible

Known risks should be documented, not hidden in chat. Examples include true technician QA gaps, `app.js` concentration, optional schema fallbacks, and mobile/offline uncertainty.

## LFES-REV-003: Explain Security Boundaries

Reviewers should not have to infer tenant isolation. Docs should name `private.is_company_member(company_id)` and public QR scoped RPCs as critical boundaries.

## LFES-REV-004: Preserve QA Evidence

QA logs should identify tokens, records, browser/device where useful, passed paths, and remaining gaps.

## LFES-REV-005: Keep Comments High Signal

Reviewer tags should mark only high-risk boundaries. Too many tags reduce trust and readability.
