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
  const appUrl = Deno.env.get("REQUEST_EMAIL_APP_URL") || "";

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: "Supabase service credentials are not configured" }, 500);
  }

  if (!resendApiKey || !fromEmail) {
    return jsonResponse({ sent: 0, skipped: true, reason: "email_sender_not_configured" });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { data: pendingRows, error: selectError } = await supabase
    .schema("private")
    .from("request_email_notifications")
    .select("*")
    .eq("request_id", requestId)
    .in("status", ["queued", "failed"])
    .lt("attempt_count", 3)
    .order("created_at", { ascending: true });

  if (selectError) return jsonResponse({ error: selectError.message }, 500);
  if (!pendingRows?.length) return jsonResponse({ sent: 0, skipped: false });

  let sent = 0;
  const failed: Array<{ id: string; error: string }> = [];

  for (const row of pendingRows) {
    const { error: lockError } = await supabase
      .schema("private")
      .from("request_email_notifications")
      .update({
        status: "sending",
        attempt_count: Number(row.attempt_count || 0) + 1,
        locked_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", row.id)
      .in("status", ["queued", "failed"]);

    if (lockError) {
      failed.push({ id: row.id, error: lockError.message });
      continue;
    }

    try {
      await sendEmail(resendApiKey, fromEmail, row, appUrl);
      sent += 1;
      await supabase
        .schema("private")
        .from("request_email_notifications")
        .update({
          status: "sent",
          sent_at: new Date().toISOString(),
          last_error: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", row.id);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failed.push({ id: row.id, error: message });
      await supabase
        .schema("private")
        .from("request_email_notifications")
        .update({
          status: "failed",
          last_error: message.slice(0, 1000),
          updated_at: new Date().toISOString(),
        })
        .eq("id", row.id);
    }
  }

  return jsonResponse({ sent, failed: failed.length, failures: failed });
});
