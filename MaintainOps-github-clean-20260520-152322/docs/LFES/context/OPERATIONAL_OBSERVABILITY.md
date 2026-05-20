# Operational Observability

Operational observability means users and maintainers can tell what the app is doing, what failed, what state changed, and how to recover.

## LFES Observability Expectations

- Loading states should be visible and clear.
- Errors should explain the next useful action without exposing secrets.
- Empty states should distinguish empty, filtered, missing setup, and failed load.
- Destructive actions should be intentional and traceable.
- Public QR request success should be visible to the anonymous user and verifiable by the manager.
- Location state should be visible because wrong-location work is an operational risk.
- Degraded schema/storage states should say which SQL/setup step is missing.

## Cascading Dependency Awareness

High-risk dependencies include:

- Auth session to company loading.
- Company loading to active location.
- Active location to work/request/equipment scope.
- Equipment location to work/request/PM routing.
- Public request token to company/location.
- Storage bucket policies to photo/document rendering.
- RLS policies to every shared table read/write.

## Recovery Continuity

Each high-risk operational path should preserve a recovery idea:

- Failed save: show error and re-enable button.
- Wrong location: show selected location and warn before cross-location equipment routing.
- Missing SQL: show setup-needed text and keep app usable where possible.
- Old GitHub version: verify cache tag and upload package.
- QA data clutter: clean through app delete paths when possible.
