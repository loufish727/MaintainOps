# Package Artifact Policy

MaintainOps clean packages are delivery artifacts, not source files.

## Rule

Do not commit `MaintainOps-github-clean-*` folders or `.zip` files to the publish repo.

## Current Package Location

Use the external package folder:

```text
C:\Users\louie\Documents\Codex\2026-05-20\3-maintain-ops-continuation-build\packages
```

## Reason

Committing package snapshots creates duplicate historical copies of app code, docs, SQL, tests, and LFES standards. That makes GitHub review noisy and can hide the current source of truth.

## Closeout Check

Before committing any phase:

```text
git status --short
git ls-files "MaintainOps-github-clean-*"
```

Expected result:

- no package folders staged.
- no package zips staged.
- no tracked package snapshots.
