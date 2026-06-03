# Google Apps Script Request Emailer

This is the no-new-paid-provider beta path for Taylor-specific request notifications.

## Apps Script Code

Create a Google Apps Script web app and paste this code:

```javascript
const MAINTAINOPS_SECRET = 'PASTE_SHARED_SECRET_HERE';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    if (payload.secret !== MAINTAINOPS_SECRET) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const to = String(payload.to || '').trim();
    const subject = String(payload.subject || 'MaintainOps request').trim();
    const text = String(payload.text || '').trim();
    const html = String(payload.html || '').trim();

    if (!to || !to.includes('@')) throw new Error('Valid recipient required');
    if (!text && !html) throw new Error('Message body required');

    MailApp.sendEmail({
      to,
      subject,
      body: text || subject,
      htmlBody: html || undefined,
      name: 'MaintainOps'
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error.message || error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Deploy Settings

Deploy as a web app:

- Execute as: `Me`
- Who has access: `Anyone`

Copy the web app URL.

## Supabase Secrets

Set these after the web app exists:

```powershell
npx supabase secrets set GOOGLE_SCRIPT_WEBHOOK_URL="paste-google-script-web-app-url" GOOGLE_SCRIPT_WEBHOOK_SECRET="paste-the-same-shared-secret" REQUEST_EMAIL_APP_URL="https://loufish727.github.io/MaintainOps" --project-ref lbphkzznvvumemdkqoay
```

The script URL is public, but the shared secret prevents casual external calls from sending email. Keep the shared secret out of GitHub.
