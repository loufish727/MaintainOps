# MaintainOps GitHub Pages Process

Use this process whenever the user asks for "GitHub info", "GitHub files", or a new GitHub upload package.

## Goal

Create one clean upload folder that contains only the files GitHub Pages needs to run the current app. Do not drag old export folders, old zip files, screenshots, or duplicate package folders into GitHub.

## Upload Files

For GitHub Pages testing, upload these from the clean package root:

- `index.html`
- `app.js`
- `styles.css`
- `supabase-config.js`
- `README.md`
- `assets/`
- `src/`

Do not upload:

- Old `github-upload-*` folders.
- Old `MaintainOps-github-*` folders.
- Old `.zip` files.
- `_archive/`
- QA screenshots.
- Temporary local files.

## Package Command

From the project root, run:

```powershell
powershell -ExecutionPolicy Bypass -File tools\create-github-upload.ps1
```

The script creates a timestamped folder named like:

```text
MaintainOps-github-clean-YYYYMMDD-HHMMSS
```

It also creates a matching `.zip` file.

## Drag And Drop

In GitHub, drag and drop only the contents of the new clean package folder:

- `index.html`
- `app.js`
- `styles.css`
- `supabase-config.js`
- `README.md`
- `assets`
- `src`

If GitHub asks to replace files, replace the existing root files.

## After Upload

Open the hosted app with a fresh cache bust:

```text
https://loufish727.github.io/MaintainOps/?qa_bust=github-YYYYMMDD-HHMM
```

Then run the hosted smoke:

- Startup.
- Main navigation.
- Location switch and reload persistence.
- One Quick Fix create/open/delete.
- Public QR request submit/manager visibility/delete.
- Console check.

Log the result in `docs/QA_LOG.md`.
