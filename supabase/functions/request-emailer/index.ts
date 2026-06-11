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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function displayLabel(value: string) {
  return value
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1).toLowerCase()}`)
    .join(" ");
}

function appRequestUrl(appUrl: string, requestId: string) {
  const base = appUrl.replace(/\/+$/, "");
  return base ? `${base}/?request_id=${encodeURIComponent(requestId)}` : "";
}

function appSignupUrl(appUrl: string) {
  const base = appUrl.replace(/\/+$/, "");
  return base ? `${base}/` : "";
}

function requestSummaryFromDescription(description: string) {
  const lines = description.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  let machineArea = "";
  const detailLines: string[] = [];

  for (const line of lines) {
    const machineMatch = line.match(/^machine\s*\/\s*area:\s*(.+)$/i);
    if (machineMatch) {
      machineArea = machineMatch[1].trim();
      continue;
    }
    if (/^submitted by:/i.test(line) || /^contact:/i.test(line)) continue;
    detailLines.push(line);
  }

  return {
    machineArea,
    details: detailLines.join("\n") || "No details provided.",
  };
}

function emailBody(row: Record<string, unknown>, appUrl: string) {
  const link = appRequestUrl(appUrl, cleanText(row.request_id));
  const title = cleanText(row.request_title, "New Maintenance Request");
  const priority = displayLabel(cleanText(row.request_priority, "medium"));
  const requester = cleanText(row.requested_by_name, "Unknown requester");
  const contact = cleanText(row.requested_by_contact);
  const { machineArea, details } = requestSummaryFromDescription(cleanText(row.request_description, "No details provided."));
  const lines = [
    "New MaintainOps Request",
    "",
    title,
    "",
    `Priority: ${priority}`,
    machineArea ? `Machine / Area: ${machineArea}` : "",
    `Submitted by: ${requester}`,
    contact ? `Contact: ${contact}` : "",
    "",
    "Details:",
    details,
    "",
    link ? `Open MaintainOps: ${link}` : "Open MaintainOps to review the request.",
  ].filter(Boolean);

  const escapedDetails = escapeHtml(details).replaceAll("\n", "<br>");

  return {
    text: lines.join("\n"),
    html: `
      <h2>New MaintainOps Request</h2>
      <p><strong>${escapeHtml(title)}</strong></p>
      <p><strong>Priority:</strong> ${escapeHtml(priority)}</p>
      ${machineArea ? `<p><strong>Machine / Area:</strong> ${escapeHtml(machineArea)}</p>` : ""}
      <p><strong>Submitted by:</strong> ${escapeHtml(requester)}</p>
      ${contact ? `<p><strong>Contact:</strong> ${escapeHtml(contact)}</p>` : ""}
      <p><strong>Details:</strong></p>
      <p>${escapedDetails}</p>
      ${link ? `<p><a href="${link}">Open MaintainOps</a></p>` : "<p>Open MaintainOps to review the request.</p>"}
    `,
  };
}

function inviteEmailBody(row: Record<string, unknown>, appUrl: string) {
  const link = appSignupUrl(appUrl);
  const company = cleanText(row.company_name, "MaintainOps");
  const role = displayLabel(cleanText(row.invite_role, "technician"));
  const location = cleanText(row.location_name);
  const inviter = cleanText(row.inviter_name, "Your manager");
  const lines = [
    `You have a MaintainOps invite for ${company}.`,
    "",
    `Role: ${role}`,
    location ? `Default location: ${location}` : "",
    `Invited by: ${inviter}`,
    "",
    link ? `Open MaintainOps: ${link}` : "Open MaintainOps and sign up with this email address.",
    "",
    "Use the same email address this message was sent to. MaintainOps will add you to the company after signup or sign-in.",
  ].filter(Boolean);

  return {
    subject: `MaintainOps Invite: ${company}`,
    text: lines.join("\n"),
    html: `
      <h2>MaintainOps Invite</h2>
      <p>You have been invited to <strong>${escapeHtml(company)}</strong>.</p>
      <p><strong>Role:</strong> ${escapeHtml(role)}</p>
      ${location ? `<p><strong>Default location:</strong> ${escapeHtml(location)}</p>` : ""}
      <p><strong>Invited by:</strong> ${escapeHtml(inviter)}</p>
      ${link ? `<p><a href="${link}">Open MaintainOps</a></p>` : "<p>Open MaintainOps and sign up with this email address.</p>"}
      <p>Use the same email address this message was sent to. MaintainOps will add you to the company after signup or sign-in.</p>
    `,
  };
}

async function sendEmail(apiKey: string, from: string, row: Record<string, unknown>, appUrl: string) {
  const { text, html } = emailBody(row, appUrl);
  const subject = `MaintainOps Request: ${cleanText(row.request_title, "New Request")}`;
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

async function sendGoogleScriptPayload(
  webhookUrl: string,
  webhookSecret: string,
  payload: { to: string; subject: string; text: string; html: string; request_id?: string; invite_id?: string },
) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      secret: webhookSecret,
      ...payload,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Google Script sender rejected request (${response.status}): ${detail || response.statusText}`);
  }
}

async function sendGoogleScriptEmail(webhookUrl: string, webhookSecret: string, row: Record<string, unknown>, appUrl: string) {
  const { text, html } = emailBody(row, appUrl);
  await sendGoogleScriptPayload(webhookUrl, webhookSecret, {
    to: cleanText(row.recipient_email),
    subject: `MaintainOps Request: ${cleanText(row.request_title, "New Request")}`,
    text,
    html,
    request_id: cleanText(row.request_id),
  });
}

async function sendGoogleScriptInviteEmail(webhookUrl: string, webhookSecret: string, row: Record<string, unknown>, appUrl: string) {
  const { subject, text, html } = inviteEmailBody(row, appUrl);
  await sendGoogleScriptPayload(webhookUrl, webhookSecret, {
    to: cleanText(row.invite_email),
    subject,
    text,
    html,
    invite_id: cleanText(row.invite_id),
  });
}

function bearerToken(request: Request) {
  const header = request.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return jsonResponse({ error: "POST required" }, 405);

  let body: { request_id?: string; invite_id?: string } = {};
  try {
    body = await request.json();
  } catch (_error) {
    return jsonResponse({ error: "JSON body required" }, 400);
  }

  const requestId = cleanText(body.request_id);
  const inviteId = cleanText(body.invite_id);
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidPattern.test(requestId) && !uuidPattern.test(inviteId)) {
    return jsonResponse({ error: "Valid request_id or invite_id required" }, 400);
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

  if (inviteId) {
    if (!hasGoogleScriptSender) {
      return jsonResponse({ sent: 0, skipped: true, reason: "invite_email_sender_not_configured" });
    }

    const token = bearerToken(request);
    if (!token) return jsonResponse({ error: "Signed-in user token required" }, 401);

    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authData?.user?.id) return jsonResponse({ error: "Invalid user token" }, 401);

    const { data: invite, error: inviteError } = await supabase
      .from("company_invites")
      .select("id, company_id, email, role, default_location_id, invited_by, companies(name), locations(name)")
      .eq("id", inviteId)
      .maybeSingle();

    if (inviteError) return jsonResponse({ error: inviteError.message }, 500);
    if (!invite) return jsonResponse({ error: "Invite not found" }, 404);

    const { data: membership, error: membershipError } = await supabase
      .from("company_members")
      .select("role")
      .eq("company_id", invite.company_id)
      .eq("user_id", authData.user.id)
      .maybeSingle();

    if (membershipError) return jsonResponse({ error: membershipError.message }, 500);
    if (!["admin", "manager"].includes(cleanText(membership?.role))) {
      return jsonResponse({ error: "Only admins or managers can send invite emails" }, 403);
    }
    if (cleanText(membership?.role) !== "admin" && cleanText(invite.role) !== "technician") {
      return jsonResponse({ error: "Only admins can send manager or admin invites" }, 403);
    }

    const { data: inviterProfile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("company_id", invite.company_id)
      .eq("user_id", authData.user.id)
      .maybeSingle();

    const companyRelation = invite.companies as Record<string, unknown> | null;
    const locationRelation = invite.locations as Record<string, unknown> | null;
    const row = {
      invite_id: invite.id,
      invite_email: invite.email,
      invite_role: invite.role,
      company_name: cleanText(companyRelation?.name, "MaintainOps"),
      location_name: cleanText(locationRelation?.name),
      inviter_name: cleanText(inviterProfile?.full_name, authData.user.email || "Your manager"),
    };

    await sendGoogleScriptInviteEmail(googleScriptWebhookUrl, googleScriptWebhookSecret, row, appUrl);
    return jsonResponse({ sent: 1, invite_id: invite.id });
  }

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
