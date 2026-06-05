import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.44.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
}

function cleanText(value: unknown, fallback = "") {
  return String(value || fallback).trim();
}

function appRequestUrl(appUrl: string, requestId: string) {
  const base = appUrl.replace(/\/+$/, "");
  return base ? `${base}/?request_id=${encodeURIComponent(requestId)}` : "";
}

function emailBody(row: Record<string, unknown>, appUrl: string) {
  const link = appRequestUrl(appUrl, cleanText(row.request_id));
  const title = cleanText(row.request_title, "New maintenance request");
  const priority = cleanText(row.request_priority, "medium");
  const requester = cleanText(row.requested_by_name, "Unknown requester");
  const contact = cleanText(row.requested_by_contact);
  const description = cleanText(row.request_description, "No details provided.");
  const lines = [
    `New MaintainOps request: ${title}`,
    "",
    `Priority: ${priority}`,
    `Submitted by: ${requester}`,
    contact ? `Contact: ${contact}` : "",
    "",
    description,
    "",
    link ? `Open MaintainOps: ${link}` : "Open MaintainOps to review the request.",
  ].filter(Boolean);

  const escapedDescription = description
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\n", "<br>");

  return {
    text: lines.join("\n"),
    html: `
      <h2>New MaintainOps request</h2>
      <p><strong>${title}</strong></p>
      <p><strong>Priority:</strong> ${priority}</p>
      <p><strong>Submitted by:</strong> ${requester}</p>
      ${contact ? `<p><strong>Contact:</strong> ${contact}</p>` : ""}
      <p>${escapedDescription}</p>
      ${link ? `<p><a href="${link}">Open MaintainOps</a></p>` : "<p>Open MaintainOps to review the request.</p>"}
    `,
  };
}

async function sendEmail(apiKey: string, from: string, row: Record<string, unknown>, appUrl: string) {
  const { text, html } = emailBody(row, appUrl);
  const subject = `MaintainOps request: ${cleanText(row.request_title, "New request")}`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [cleanText(row.recipient_email)],
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Email provider rejected request (${response.status}): ${detail || response.statusText}`);
  }
}

async function sendGoogleScriptEmail(webhookUrl: string, webhookSecret: string, row: Record<string, unknown>, appUrl: string) {
  const { text, html } = emailBody(row, appUrl);
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      secret: webhookSecret,
      to: cleanText(row.recipient_email),
      subject: `MaintainOps request: ${cleanText(row.request_title, "New request")}`,
      text,
      html,
      request_id: cleanText(row.request_id),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Google Script sender rejected request (${response.status}): ${detail || response.statusText}`);
  }
}

serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return jsonResponse({ error: "POST required" }, 405);

  let body: { request_id?: string } = {};
  try {
    body = await request.json();
  } catch (_error) {
    return jsonResponse({ error: "JSON body required" }, 400);
  }

  const requestId = cleanText(body.request_id);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) {
    return jsonResponse({ error: "Valid request_id required" }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";
  const fromEmail = Deno.env.get("REQUEST_EMAIL_FROM") || "";
  const googleScriptWebhookUrl = Deno.env.get("GOOGLE_SCRIPT_WEBHOOK_URL") || "";
  const googleScriptWebhookSecret = Deno.env.get("GOOGLE_SCRIPT_WEBHOOK_SECRET") || "";
  const appUrl = Deno.env.get("REQUEST_EMAIL_APP_URL") || "";

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: "Supabase service credentials are not configured" }, 500);
  }

  const hasResendSender = Boolean(resendApiKey && fromEmail);
  const hasGoogleScriptSender = Boolean(googleScriptWebhookUrl && googleScriptWebhookSecret);

  if (!hasResendSender && !hasGoogleScriptSender) {
    return jsonResponse({ sent: 0, skipped: true, reason: "email_sender_not_configured" });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { data: pendingRows, error: selectError } = await supabase
    .rpc("claim_request_email_notifications", { p_request_id: requestId });

  if (selectError) return jsonResponse({ error: selectError.message }, 500);
  if (!pendingRows?.length) return jsonResponse({ sent: 0, skipped: false });

  let sent = 0;
  const failed: Array<{ id: string; error: string }> = [];

  for (const row of pendingRows) {
    try {
      if (hasResendSender) {
        await sendEmail(resendApiKey, fromEmail, row, appUrl);
      } else {
        await sendGoogleScriptEmail(googleScriptWebhookUrl, googleScriptWebhookSecret, row, appUrl);
      }
      sent += 1;
      await supabase.rpc("complete_request_email_notification", {
        p_notification_id: row.id,
        p_sent: true,
        p_error: null,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failed.push({ id: row.id, error: message });
      await supabase.rpc("complete_request_email_notification", {
        p_notification_id: row.id,
        p_sent: false,
        p_error: message,
      });
    }
  }

  return jsonResponse({ sent, failed: failed.length, failures: failed });
});
