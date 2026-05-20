# LFES Deployment Standard

Deployment readiness means another engineer can understand how the app is configured, uploaded, verified, and recovered.

## LFES-DEP-001: Deployment Must Be Understandable

Document what files are needed for GitHub Pages and how cache tags work. Keep clean upload packages free of old exports and duplicate folders.

## LFES-DEP-002: Environment Config Must Be Visible

Document required Supabase config fields and distinguish public anon config from secrets that must not ship.

## LFES-DEP-003: No Secrets In Repo

Do not commit service-role credentials or private tokens. If any secret-like value appears, treat it as a review finding.

## LFES-DEP-004: Rollback Considerations

High-risk changes should have a rollback path:

- Prior GitHub package or commit.
- SQL rollback or targeted correction plan where possible.
- Data-preserving safety checks for live records.

## LFES-DEP-005: Deployment Verification

After GitHub upload, verify hosted URL with a cache-bust query and compare expected cache tags. Public QR links should point at the deployed URL before printed codes are used.
