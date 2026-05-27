# Public Exposure Review - 2026-05-27

Scope: public GitHub profile, public GitHub Pages front door, MaintainOps public repository, and browser-visible Supabase configuration.

## Public Surfaces Reviewed

- `https://github.com/loufish727`
- `https://github.com/loufish727/MaintainOps`
- `https://loufish727.github.io/`
- `https://loufish727.github.io/MaintainOps/`
- `supabase-config.js`
- public docs linked from `README.md`

## Current Public Positioning

- GitHub Pages root now presents MaintainOps first.
- SimpleCart is still available at `/simplecart/`, but no longer owns the root front door.
- GitHub profile README presents MaintainOps as the main project.
- MaintainOps repo metadata and README use product-focused language.
- Public-facing README/profile/landing copy no longer explains internal engineering process details at length.

## Expected Publicly Visible Technical Details

- Static frontend source.
- Supabase project URL.
- Supabase anon/publishable key.
- SQL migration/source files.
- RLS/security setup docs.
- QA and handoff history.
- Git commit history and GitHub Actions status.

The Supabase URL and anon key are acceptable to expose only because authorization must be enforced by RLS, RPC grants, storage policies, and auth rules.

## Review Findings

- No private service-role key should be present in the repo.
- Public docs now avoid the stale "no formal test runner" statement.
- Review-facing docs no longer expose the previously targeted tester email/company ID in the main review path.
- Root GitHub Pages no longer presents the grocery app first.
- MaintainOps still has deep historical logs and LFES docs. They are not promoted from the front-door layer, but a determined repository reviewer can find them.

## Required Ongoing Checks

Before broader external rollout:

1. Search for committed service-role keys or private Supabase secrets.
2. Search review-path docs for real user emails, sensitive company IDs, and private support details.
3. Confirm all intended-public config values are safe under the RLS model.
4. Confirm no direct anonymous table grants exist for app tables.
5. Confirm storage buckets remain private unless intentionally public.
6. Confirm GitHub Pages root and MaintainOps app load the intended cache tags.
7. Confirm profile pins put MaintainOps first once pinned manually in GitHub UI.

## Current Gaps

- GitHub profile repository pin order still needs manual UI pinning.
- Deep historical docs still contain operational detail; acceptable for review transparency, but not ideal if LFES/process details should become proprietary.
- A private archive strategy for detailed process notes has not been implemented.
