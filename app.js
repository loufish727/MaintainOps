const app = document.querySelector("#app");

const STATUS_OPTIONS = ["open", "in_progress", "blocked", "completed"];
const TYPE_OPTIONS = ["request", "reactive", "preventive", "inspection", "corrective"];
const ASSET_TYPE_OPTIONS = ["machine", "secondary_machine", "component", "shop_item"];
const WORK_ORDERS_PER_PAGE = 12;
const PARTS_PER_PAGE = 12;
const OUTSIDE_VENDOR_VALUE = "__outside_vendor__";
const OUTSIDE_VENDOR_NOTE = "[Assignment: Outside vendor]";
let supabaseClient;
let session;
let companies = [];
let activeCompanyId = localStorage.getItem("maintainops.activeCompanyId");
let locations = [];
let locationsReady = true;
let activeLocationId = localStorage.getItem("maintainops.activeLocationId") || "";
let assets = [];
let workOrders = [];
let maintenanceRequests = [];
let requestsReady = false;
let publicRequestLinks = [];
let publicRequestLinksReady = true;
let preventiveSchedules = [];
let companyMembers = [];
let teamInvites = [];
let teamInvitesReady = true;
let messageThreads = [];
let messageThreadMembers = [];
let messagesByThreadId = {};
let messageReadsByThreadId = {};
let messagesReady = true;
let messageWorkOrderLinksReady = true;
let activeMessageThreadId = localStorage.getItem("maintainops.activeMessageThreadId") || "";
let messageThreadFilter = localStorage.getItem("maintainops.messageThreadFilter") || "all";
let messageSearchQuery = localStorage.getItem("maintainops.messageSearchQuery") || "";
let messageComposerWorkOrderId = localStorage.getItem("maintainops.messageComposerWorkOrderId") || "";
let messageComposerOpen = false;
let parts = [];
let partCostsReady = true;
let partSuppliersReady = true;
let partDocumentsReady = true;
let partDocumentsByPartId = {};
let procedureTemplates = [];
let proceduresReady = false;
let schedulesReady = false;
let outcomesReady = true;
let safetyChecksReady = true;
let photosReady = true;
let adminDeleteSqlConfirmed = localStorage.getItem("maintainops.adminDeleteSqlConfirmed") === "true";
let partsUsedByWorkOrder = {};
let eventsByWorkOrder = {};
let commentsByWorkOrder = {};
let photosByWorkOrder = {};
let stepResultsByWorkOrder = {};
let profilesByUserId = {};
let commentsError = "";
let activeWorkOrderId = null;
let activeAssetId = null;
let activePartId = null;
let pendingDeleteWorkOrderId = null;
let pendingDeletePartId = null;
let pendingDeleteAssetId = null;
let showPartSourceManager = false;
let createWorkOrderMode = false;
let quickFixMode = false;
let quickFixAssetId = null;
let quickFixRequestId = null;
let publicAppUrlOverride = localStorage.getItem("maintainops.publicAppUrl") || "";
let activeStatusFilter = "active";
let myWorkFilter = localStorage.getItem("maintainops.myWorkFilter") || "assigned";
let workOrderFilter = localStorage.getItem("maintainops.workOrderFilter") || "all";
let workOrderAssigneeFilter = localStorage.getItem("maintainops.workOrderAssigneeFilter") || "";
let workSort = localStorage.getItem("maintainops.workSort") || "newest";
let workOrderPage = Number(localStorage.getItem("maintainops.workOrderPage")) || 1;
let partsPage = Number(localStorage.getItem("maintainops.partsPage")) || 1;
let partInventoryFilter = localStorage.getItem("maintainops.partInventoryFilter") || "all";
let activeSection = localStorage.getItem("maintainops.activeSection") || "mywork";
if (!localStorage.getItem("maintainops.sectionSplitDone") && activeSection === "work") {
  activeSection = "mywork";
  localStorage.setItem("maintainops.activeSection", activeSection);
  localStorage.setItem("maintainops.sectionSplitDone", "true");
}
let searchQuery = localStorage.getItem("maintainops.searchQuery") || "";
let appError = "";
let appNotice = "";
let appNoticeTone = "success";
let noticeTimer;

init();

async function init() {
  if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
    renderAuth("login", "Supabase config is missing. Add your project URL and publishable anon key to supabase-config.js.");
    return;
  }

  if (window.SUPABASE_ANON_KEY === "PASTE_MY_PUBLISHABLE_KEY_HERE") {
    renderAuth("login", "Invalid API key: replace PASTE_MY_PUBLISHABLE_KEY_HERE in supabase-config.js with your Supabase publishable anon key.");
    return;
  }

  try {
    supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    const qrToken = publicRequestQrTokenFromUrl();
    if (qrToken) {
      await renderPublicRequestQrPage(qrToken);
      return;
    }
    const requestToken = publicRequestTokenFromUrl();
    if (requestToken) {
      await renderPublicRequestIntake(requestToken);
      return;
    }
    renderAuth("login");
    const { data } = await supabaseClient.auth.getSession();
    session = data.session;
  } catch (error) {
    renderAuth("login", `Supabase initialization failed: ${error.message}`);
    return;
  }

  supabaseClient.auth.onAuthStateChange(async (_event, nextSession) => {
    session = nextSession;
    await render();
  });

  await render();
}

async function render() {
  if (!session) {
    renderAuth("login");
    return;
  }

  await acceptTeamInvites();
  await loadCompanies();

  if (!companies.length || appError) {
    renderCompanyCreate();
    return;
  }

  if (!activeCompanyId || !companies.some((company) => company.id === activeCompanyId)) {
    activeCompanyId = companies[0].id;
    localStorage.setItem("maintainops.activeCompanyId", activeCompanyId);
  }

  await ensureProfileForActiveCompany();
  await loadCompanyData();
  renderWorkspace();
}

function renderAuth(mode, initialError = "") {
  document.body.classList.remove("public-qr-mode");
  const isSignup = mode === "signup";
  app.innerHTML = `
    <section class="auth-shell">
      <form class="auth-card" id="auth-form">
        <div class="brand-row">
          <span class="brand-mark">MO</span>
          <div>
            <h1>${isSignup ? "Create Account" : "Welcome Back"}</h1>
            <p>${isSignup ? "Start with email and password." : "Sign in to your maintenance workspace."}</p>
          </div>
        </div>
        <div class="form-grid">
          ${isSignup ? `<label>Full name<input name="fullName" required autocomplete="name"></label>` : ""}
          <label>Email<input name="email" type="email" required autocomplete="email"></label>
          <label>Password<input name="password" type="password" minlength="6" required autocomplete="${isSignup ? "new-password" : "current-password"}"></label>
        </div>
        <p class="error-text" id="auth-error">${escapeHtml(initialError)}</p>
        <button class="primary-button" type="submit">${isSignup ? "Sign Up" : "Log In"}</button>
        <button class="text-button" id="auth-mode" type="button">${isSignup ? "I already have an account" : "Create an account"}</button>
      </form>
    </section>
  `;

  document.querySelector("#auth-mode").addEventListener("click", () => renderAuth(isSignup ? "login" : "signup"));
  document.querySelector("#auth-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const email = form.get("email");
    const password = form.get("password");
    const fullName = form.get("fullName");
    const errorTarget = document.querySelector("#auth-error");
    errorTarget.textContent = "";

    const response = isSignup
      ? await supabaseClient.auth.signUp({ email, password, options: { data: { full_name: fullName } } })
      : await supabaseClient.auth.signInWithPassword({ email, password });

    if (response.error) {
      errorTarget.textContent = response.error.message;
      return;
    }

    if (isSignup && !response.data.session) {
      errorTarget.textContent = "Check your email to confirm your account, then log in.";
    }
  });
}

function publicRequestTokenFromUrl() {
  const url = new URL(window.location.href);
  return String(url.searchParams.get("request") || url.searchParams.get("public_request") || "").trim();
}

function publicRequestQrTokenFromUrl() {
  const url = new URL(window.location.href);
  return String(url.searchParams.get("qr") || "").trim();
}

async function renderPublicRequestQrPage(token) {
  document.body.classList.add("public-qr-mode");
  app.innerHTML = `
    <section class="auth-shell public-request-shell qr-page-shell">
      <div class="auth-card public-qr-card">
        <div class="brand-row">
          <span class="brand-mark">MO</span>
          <div>
            <h1>Maintenance Request QR</h1>
            <p>Loading QR code...</p>
          </div>
        </div>
      </div>
    </section>
  `;

  const { data, error } = await supabaseClient.rpc("get_public_request_intake", { request_token: token });
  const intake = Array.isArray(data) ? data[0] : data;
  if (error || !intake) {
    renderPublicRequestError("This QR code link is inactive or invalid.");
    return;
  }

  const requestUrl = publicRequestUrl(token);
  app.innerHTML = `
    <section class="auth-shell public-request-shell qr-page-shell">
      <article class="auth-card public-qr-card">
        <div class="public-qr-heading">
          <span class="brand-mark">MO</span>
          <div>
            <h1>${escapeHtml(intake.location_name)}</h1>
            <p>${escapeHtml(intake.company_name)}</p>
          </div>
        </div>
        <div class="public-qr-code">${qrSvgFor(requestUrl, 8)}</div>
        <div class="public-qr-instructions">
          <h2>Scan To Request Maintenance</h2>
          <p>Point your phone camera at this code and describe what needs attention.</p>
        </div>
        <p class="public-qr-url">${escapeHtml(requestUrl)}</p>
        <div class="button-row no-print">
          <button class="primary-button request-action-button" id="print-public-qr" type="button">Print / Save PDF</button>
          <a class="secondary-button" href="${escapeHtml(requestUrl)}" target="_blank" rel="noreferrer">Test Form</a>
        </div>
      </article>
    </section>
  `;

  document.querySelector("#print-public-qr").addEventListener("click", () => window.print());
}

async function renderPublicRequestIntake(token) {
  document.body.classList.remove("public-qr-mode");
  app.innerHTML = `
    <section class="auth-shell public-request-shell">
      <div class="auth-card public-request-card">
        <div class="brand-row">
          <span class="brand-mark">MO</span>
          <div>
            <h1>Maintenance Request</h1>
            <p>Loading request form...</p>
          </div>
        </div>
      </div>
    </section>
  `;

  const { data, error } = await supabaseClient.rpc("get_public_request_intake", { request_token: token });
  const intake = Array.isArray(data) ? data[0] : data;
  if (error) {
    renderPublicRequestError("This request link is not ready yet. The company needs to run the public request link setup in Supabase.");
    return;
  }
  if (!intake) {
    renderPublicRequestError("This request link is inactive or invalid.");
    return;
  }

  app.innerHTML = `
    <section class="auth-shell public-request-shell">
      <form class="auth-card public-request-card" id="public-request-form">
        <div class="brand-row">
          <span class="brand-mark">MO</span>
          <div>
            <h1>${escapeHtml(intake.company_name)}</h1>
            <p>${escapeHtml(intake.location_name)} maintenance request</p>
          </div>
        </div>
        <div class="form-grid">
          <label>What needs attention?<input name="title" required maxlength="140" placeholder="Short issue description"></label>
          <label>Machine / area<input name="equipment_note" maxlength="140" placeholder="Roll former 1, saw area, aisle 3"></label>
          <label>Details<textarea name="description" rows="4" maxlength="1000" placeholder="What is happening? Any noise, leak, jam, alarm, or safety concern?"></textarea></label>
          <label>Your name<input name="requester_name" maxlength="120" placeholder="Optional"></label>
          <label>Contact<input name="requester_contact" maxlength="160" placeholder="Optional phone, radio, or email"></label>
          <label>Urgency
            <select name="priority">
              <option value="medium">Normal</option>
              <option value="high">High</option>
              <option value="critical">Critical / down</option>
              <option value="low">Low</option>
            </select>
          </label>
        </div>
        <p class="error-text" id="public-request-error"></p>
        <button class="primary-button request-action-button" type="submit">Send Request</button>
      </form>
    </section>
  `;

  document.querySelector("#public-request-form").addEventListener("submit", (event) => submitPublicRequest(event, token, intake));
}

function renderPublicRequestError(message) {
  app.innerHTML = `
    <section class="auth-shell public-request-shell">
      <div class="auth-card public-request-card">
        <div class="brand-row">
          <span class="brand-mark">MO</span>
          <div>
            <h1>Request Link Unavailable</h1>
            <p>${escapeHtml(message)}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

async function submitPublicRequest(event, token, intake) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const form = new FormData(formElement);
  const errorElement = document.querySelector("#public-request-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  if (errorElement) errorElement.textContent = "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  }

  try {
    const { error } = await supabaseClient.rpc("submit_public_location_request", {
      request_token: token,
      request_title: String(form.get("title") || "").trim(),
      equipment_note: String(form.get("equipment_note") || "").trim() || null,
      request_description: String(form.get("description") || "").trim() || null,
      requester_name: String(form.get("requester_name") || "").trim() || null,
      requester_contact: String(form.get("requester_contact") || "").trim() || null,
      request_priority: form.get("priority") || "medium",
    });

    if (error) throw error;

    app.innerHTML = `
      <section class="auth-shell public-request-shell">
        <div class="auth-card public-request-card">
          <div class="brand-row">
            <span class="brand-mark">MO</span>
            <div>
              <h1>Request Sent</h1>
              <p>${escapeHtml(intake.location_name)} maintenance has received it.</p>
            </div>
          </div>
          <button class="secondary-button request-action-button" id="public-request-another" type="button">Send Another Request</button>
        </div>
      </section>
    `;
    document.querySelector("#public-request-another").addEventListener("click", () => renderPublicRequestIntake(token));
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not send the request.";
  } finally {
    if (submitButton?.isConnected) {
      submitButton.disabled = false;
      submitButton.textContent = "Send Request";
    }
  }
}

async function loadCompanies() {
  appError = "";
  const { data: memberships, error: membershipError } = await supabaseClient
    .from("company_members")
    .select("company_id, role")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: true });

  if (membershipError) {
    appError = `Could not load company memberships: ${membershipError.message}`;
    companies = [];
    return;
  }

  if (!memberships.length) {
    companies = [];
    return;
  }

  const ids = memberships.map((membership) => membership.company_id);
  let { data: companyRows, error: companyError } = await supabaseClient
    .from("companies")
    .select("id, name, logo_path, created_at")
    .in("id", ids)
    .order("created_at", { ascending: true });

  if (companyError && isColumnSchemaError(companyError, ["logo_path"])) {
    const retry = await supabaseClient
      .from("companies")
      .select("id, name, created_at")
      .in("id", ids)
      .order("created_at", { ascending: true });
    companyRows = retry.data;
    companyError = retry.error;
  }

  if (companyError) {
    appError = `Could not load companies: ${companyError.message}`;
    companies = [];
    return;
  }

  const seenCompanies = new Set();
  companies = companyRows
    .filter((company) => {
      const key = company.name.trim().toLowerCase();
      if (seenCompanies.has(key)) return false;
      seenCompanies.add(key);
      return true;
    })
    .map((company) => ({
      ...company,
      role: memberships.find((membership) => membership.company_id === company.id)?.role || "member",
    }));

  await Promise.all(companies.map(async (company) => {
    company.logoUrl = "";
    company.logoError = "";
    if (!company.logo_path) return;
    const { data, error } = await supabaseClient.storage
      .from("company-logos")
      .createSignedUrl(company.logo_path, 60 * 10);
    if (error) {
      company.logoError = error.message;
      return;
    }
    company.logoUrl = data?.signedUrl || "";
  }));
}

function renderCompanyCreate() {
  app.innerHTML = `
    <section class="auth-shell">
      <form class="auth-card" id="company-form">
        <div class="brand-row">
          <span class="brand-mark">MO</span>
          <div>
            <h1>Create Company</h1>
            <p>Your shared maintenance data will live inside this company.</p>
          </div>
        </div>
        <label>Company name<input name="name" required placeholder="North Plant Operations"></label>
        <p class="error-text" id="company-error">${escapeHtml(appError)}</p>
        <button class="primary-button" type="submit">Create Company</button>
        <button class="text-button" type="button" id="sign-out">Sign out</button>
      </form>
    </section>
  `;

  document.querySelector("#company-form").addEventListener("submit", createCompany);
  document.querySelector("#sign-out").addEventListener("click", () => supabaseClient.auth.signOut());
}

async function createCompany(event) {
  event.preventDefault();
  const formElement = event.target;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorTarget = document.querySelector("#company-error");
  const name = new FormData(formElement).get("name");
  submitButton.disabled = true;
  submitButton.textContent = "Creating...";
  errorTarget.textContent = "";

  const existing = companies.find((company) => company.name.trim().toLowerCase() === name.trim().toLowerCase());
  if (existing) {
    activeCompanyId = existing.id;
    localStorage.setItem("maintainops.activeCompanyId", activeCompanyId);
    await render();
    return;
  }

  const { data, error } = await supabaseClient.rpc("create_company", { company_name: name });

  if (error) {
    submitButton.disabled = false;
    submitButton.textContent = "Create Company";
    errorTarget.textContent = error.message.includes("create_company")
      ? "Database setup is not finished. Run supabase/schema.sql in the Supabase SQL editor, then wait a few seconds and try again."
      : error.message;
    return;
  }

  activeCompanyId = data;
  localStorage.setItem("maintainops.activeCompanyId", activeCompanyId);
  await ensureProfileForActiveCompany(name);
  await seedStarterAssets();
  await render();
}

async function ensureProfileForActiveCompany() {
  const { error } = await supabaseClient.rpc("ensure_company_profile", {
    target_company_id: activeCompanyId,
  });

  if (error) {
    appError = `Could not create your company profile: ${error.message}`;
    return false;
  }
  return true;
}

async function acceptTeamInvites() {
  if (!teamInvitesReady) return;
  const { error } = await supabaseClient.rpc("accept_company_invites");
  if (error && (error.message.includes("accept_company_invites") || isColumnSchemaError(error, ["company_invites"]))) {
    teamInvitesReady = false;
  }
}

async function seedStarterAssets() {
  const locationId = activeLocationDatabaseId();
  await supabaseClient.from("assets").insert([
    { company_id: activeCompanyId, location_id: locationId, name: "Packaging Line 2", asset_code: "PKG-002", location: "Plant A / Floor 1", status: "running" },
    { company_id: activeCompanyId, location_id: locationId, name: "Boiler Room Pump", asset_code: "BLR-P-014", location: "Utilities / Boiler Room", status: "watch" },
  ]);
}

async function loadCompanyData() {
  let [locationResponse, assetResponse, workOrderResponse, requestResponse, scheduleResponse, partsResponse, procedureResponse] = await Promise.all([
    supabaseClient.from("locations").select("*").eq("company_id", activeCompanyId).order("name"),
    supabaseClient.from("assets").select("*").eq("company_id", activeCompanyId).order("name"),
    supabaseClient
      .from("work_orders")
      .select("*, assets(name, location_id), locations(name), assigned_profile:profiles!work_orders_company_assigned_profile_fkey(full_name)")
      .eq("company_id", activeCompanyId)
      .order("created_at", { ascending: false }),
    supabaseClient
      .from("maintenance_requests")
      .select("*, assets(name, location_id), locations(name)")
      .eq("company_id", activeCompanyId)
      .order("created_at", { ascending: false }),
    supabaseClient
      .from("preventive_schedules")
      .select("*, assets(name, location_id)")
      .eq("company_id", activeCompanyId)
      .order("next_due_at", { ascending: true }),
    supabaseClient
      .from("parts")
      .select("*")
      .eq("company_id", activeCompanyId)
      .order("name"),
    supabaseClient
      .from("procedure_templates")
      .select("*, procedure_steps(*)")
      .eq("company_id", activeCompanyId)
      .order("name"),
  ]);

  if (workOrderResponse.error && isColumnSchemaError(workOrderResponse.error, ["location_id", "locations"])) {
    workOrderResponse = await supabaseClient
      .from("work_orders")
      .select("*, assets(name), assigned_profile:profiles!work_orders_company_assigned_profile_fkey(full_name)")
      .eq("company_id", activeCompanyId)
      .order("created_at", { ascending: false });
  }
  if (requestResponse.error && isColumnSchemaError(requestResponse.error, ["location_id", "locations"])) {
    requestResponse = await supabaseClient
      .from("maintenance_requests")
      .select("*, assets(name)")
      .eq("company_id", activeCompanyId)
      .order("created_at", { ascending: false });
  }

  locationsReady = !locationResponse.error;
  locations = locationResponse.error ? [] : (locationResponse.data || []);
  if (!activeLocationId || !locations.some((location) => location.id === activeLocationId)) {
    activeLocationId = locations[0]?.id || "";
    localStorage.setItem("maintainops.activeLocationId", activeLocationId);
  }
  assets = assetResponse.data || [];
  workOrders = workOrderResponse.data || [];
  requestsReady = !requestResponse.error;
  maintenanceRequests = requestResponse.error ? [] : (requestResponse.data || []);
    preventiveSchedules = scheduleResponse.error ? [] : (scheduleResponse.data || []);
    parts = partsResponse.error ? [] : (partsResponse.data || []);
    partCostsReady = !parts.length || Object.prototype.hasOwnProperty.call(parts[0], "unit_cost");
    partSuppliersReady = !parts.length || Object.prototype.hasOwnProperty.call(parts[0], "supplier_name");
    schedulesReady = !scheduleResponse.error;
    outcomesReady = !workOrders.length || Object.prototype.hasOwnProperty.call(workOrders[0], "resolution_summary");
    safetyChecksReady = !workOrders.length || Object.prototype.hasOwnProperty.call(workOrders[0], "safety_devices_checked");
    proceduresReady = !procedureResponse.error;
  procedureTemplates = procedureResponse.error ? [] : (procedureResponse.data || []).map((template) => ({
    ...template,
    procedure_steps: (template.procedure_steps || []).sort((a, b) => Number(a.position) - Number(b.position)),
  }));
  await Promise.all([loadProfiles(), loadMembers(), loadMessageCenter(), loadPublicRequestLinks(), loadComments(), loadPhotos(), loadPartsUsed(), loadPartDocuments(), loadStepResults(), loadWorkOrderEvents()]);
}

async function loadProfiles() {
  const { data } = await supabaseClient
    .from("profiles")
    .select("user_id, full_name")
    .eq("company_id", activeCompanyId);

  profilesByUserId = (data || []).reduce((profiles, profile) => {
    profiles[profile.user_id] = profile;
    return profiles;
  }, {});
}

async function loadMembers() {
  const { data } = await supabaseClient
    .from("company_members")
    .select("*")
    .eq("company_id", activeCompanyId)
    .order("created_at", { ascending: true });

  companyMembers = data || [];
  await loadTeamInvites();
}

async function loadTeamInvites() {
  if (!teamInvitesReady) {
    teamInvites = [];
    return;
  }
  const { data, error } = await supabaseClient
    .from("company_invites")
    .select("id, email, role, invited_by, accepted_at, created_at")
    .eq("company_id", activeCompanyId)
    .order("created_at", { ascending: false });

  if (error) {
    if (isColumnSchemaError(error, ["company_invites"]) || error.message.includes("company_invites")) {
      teamInvitesReady = false;
      teamInvites = [];
      return;
    }
    teamInvites = [];
    return;
  }

  teamInvites = data || [];
}

async function loadMessageCenter() {
  messagesReady = true;
  messageThreads = [];
  messageThreadMembers = [];
  messagesByThreadId = {};
  messageReadsByThreadId = {};

  const { data: threads, error: threadError } = await supabaseClient
    .from("message_threads")
    .select("*")
    .eq("company_id", activeCompanyId)
    .order("updated_at", { ascending: false });

  if (threadError) {
    messagesReady = false;
    return;
  }

  messageThreads = threads || [];
  if (!messageThreads.length) {
    activeMessageThreadId = "";
    localStorage.setItem("maintainops.activeMessageThreadId", activeMessageThreadId);
    return;
  }

  const threadIds = messageThreads.map((thread) => thread.id);
  const [memberResponse, messageResponse, readResponse] = await Promise.all([
    supabaseClient
      .from("message_thread_members")
      .select("*")
      .eq("company_id", activeCompanyId)
      .in("thread_id", threadIds),
    supabaseClient
      .from("messages")
      .select("*")
      .eq("company_id", activeCompanyId)
      .in("thread_id", threadIds)
      .order("created_at", { ascending: true }),
    supabaseClient
      .from("message_reads")
      .select("*")
      .eq("company_id", activeCompanyId)
      .eq("user_id", session.user.id)
      .in("thread_id", threadIds),
  ]);

  if (memberResponse.error || messageResponse.error || readResponse.error) {
    messagesReady = false;
    return;
  }

  messageThreadMembers = memberResponse.data || [];
  messagesByThreadId = (messageResponse.data || []).reduce((groups, message) => {
    if (!groups[message.thread_id]) groups[message.thread_id] = [];
    groups[message.thread_id].push(message);
    return groups;
  }, {});
  messageReadsByThreadId = (readResponse.data || []).reduce((reads, read) => {
    reads[read.thread_id] = read;
    return reads;
  }, {});

  if (!activeMessageThreadId || !messageThreads.some((thread) => thread.id === activeMessageThreadId)) {
    activeMessageThreadId = messageThreads[0]?.id || "";
    localStorage.setItem("maintainops.activeMessageThreadId", activeMessageThreadId);
  }
}

async function loadPublicRequestLinks() {
  publicRequestLinks = [];
  publicRequestLinksReady = true;
  if (!requestsReady || !locationsReady) return;

  const { data, error } = await supabaseClient
    .from("public_request_links")
    .select("*")
    .eq("company_id", activeCompanyId)
    .order("created_at", { ascending: true });

  if (error) {
    publicRequestLinksReady = false;
    publicRequestLinks = [];
    return;
  }

  publicRequestLinks = data || [];
}

async function loadComments() {
  commentsError = "";
  if (!workOrders.length) {
    commentsByWorkOrder = {};
    return;
  }

  const ids = workOrders.map((workOrder) => workOrder.id);
  const { data, error } = await supabaseClient
    .from("work_order_comments")
    .select("*")
    .eq("company_id", activeCompanyId)
    .in("work_order_id", ids)
    .order("created_at", { ascending: true });

  if (error) {
    commentsByWorkOrder = {};
    commentsError = `Could not load comments: ${error.message}`;
    return;
  }

  commentsByWorkOrder = (data || []).reduce((groups, comment) => {
    groups[comment.work_order_id] ||= [];
    groups[comment.work_order_id].push(comment);
    return groups;
  }, {});
}

async function loadPhotos() {
  if (!workOrders.length) {
    photosByWorkOrder = {};
    return;
  }

  const ids = workOrders.map((workOrder) => workOrder.id);
  const { data, error } = await supabaseClient
    .from("work_order_photos")
    .select("*")
    .eq("company_id", activeCompanyId)
    .in("work_order_id", ids)
    .order("created_at", { ascending: false });

  if (error) {
    photosReady = false;
    photosByWorkOrder = {};
    return;
  }
  photosReady = true;

  photosByWorkOrder = (data || []).reduce((groups, photo) => {
    groups[photo.work_order_id] ||= [];
    groups[photo.work_order_id].push(photo);
    return groups;
  }, {});

  await addSignedPhotoUrls();
}

async function loadPartsUsed() {
  if (!workOrders.length) {
    partsUsedByWorkOrder = {};
    return;
  }

  const ids = workOrders.map((workOrder) => workOrder.id);
  const { data } = await supabaseClient
    .from("work_order_parts")
    .select("*, parts(*)")
    .eq("company_id", activeCompanyId)
    .in("work_order_id", ids)
    .order("created_at", { ascending: true });

  partsUsedByWorkOrder = (data || []).reduce((groups, row) => {
    groups[row.work_order_id] ||= [];
    groups[row.work_order_id].push(row);
    return groups;
  }, {});
}

async function loadPartDocuments() {
  if (!parts.length) {
    partDocumentsByPartId = {};
    partDocumentsReady = true;
    return;
  }

  const ids = parts.map((part) => part.id);
  const { data, error } = await supabaseClient
    .from("part_documents")
    .select("*")
    .eq("company_id", activeCompanyId)
    .in("part_id", ids)
    .order("created_at", { ascending: false });

  if (error) {
    partDocumentsReady = false;
    partDocumentsByPartId = {};
    return;
  }

  partDocumentsReady = true;
  partDocumentsByPartId = (data || []).reduce((groups, document) => {
    groups[document.part_id] ||= [];
    groups[document.part_id].push(document);
    return groups;
  }, {});

  await addSignedPartDocumentUrls();
}

async function loadWorkOrderEvents() {
  if (!workOrders.length) {
    eventsByWorkOrder = {};
    return;
  }

  const ids = workOrders.map((workOrder) => workOrder.id);
  const { data } = await supabaseClient
    .from("work_order_events")
    .select("*")
    .eq("company_id", activeCompanyId)
    .in("work_order_id", ids)
    .order("created_at", { ascending: false });

  if (!data) {
    eventsByWorkOrder = {};
    return;
  }

  eventsByWorkOrder = (data || []).reduce((groups, event) => {
    groups[event.work_order_id] ||= [];
    groups[event.work_order_id].push(event);
    return groups;
  }, {});
}

async function loadStepResults() {
  if (!workOrders.length) {
    stepResultsByWorkOrder = {};
    return;
  }

  const ids = workOrders.map((workOrder) => workOrder.id);
  const { data } = await supabaseClient
    .from("work_order_step_results")
    .select("*")
    .eq("company_id", activeCompanyId)
    .in("work_order_id", ids);

  stepResultsByWorkOrder = (data || []).reduce((groups, result) => {
    groups[result.work_order_id] ||= {};
    groups[result.work_order_id][result.procedure_step_id] = result;
    return groups;
  }, {});
}

async function addSignedPhotoUrls() {
  const photos = Object.values(photosByWorkOrder).flat();
  await Promise.all(photos.map(async (photo) => {
    const { data } = await supabaseClient.storage
      .from("work-order-photos")
      .createSignedUrl(photo.storage_path, 60 * 10);
    photo.signedUrl = data?.signedUrl || "";
  }));
}

async function addSignedPartDocumentUrls() {
  const documents = Object.values(partDocumentsByPartId).flat();
  await Promise.all(documents.map(async (document) => {
    const { data } = await supabaseClient.storage
      .from("part-documents")
      .createSignedUrl(document.storage_path, 60 * 10);
    document.signedUrl = data?.signedUrl || "";
  }));
}

function renderWorkspace() {
  const activeCompany = companies.find((company) => company.id === activeCompanyId);
  const navItems = visibleNavItems();
  if (!navItems.some(([id]) => id === activeSection)) {
    activeSection = "mywork";
    localStorage.setItem("maintainops.activeSection", activeSection);
  }
  const isWorkArea = activeSection === "mywork" || activeSection === "work";
  const myWorkGaugeFilters = ["active", "open", "in_progress", "blocked", "overdue", "completed_month", "completed_week"];
  if (activeSection === "mywork" && !myWorkGaugeFilters.includes(activeStatusFilter)) {
    activeStatusFilter = "active";
  }
  const showWorkDashboard = activeSection === "work" && !activeAssetId && !activeWorkOrderId && !quickFixMode && !createWorkOrderMode;
  const visibleWorkOrders = filteredWorkOrders();
  const myWorkGaugeOrders = activeSection === "mywork" ? myWorkQueueOrders() : [];
  const totalWorkOrderPages = Math.max(1, Math.ceil(visibleWorkOrders.length / WORK_ORDERS_PER_PAGE));
  if (workOrderPage > totalWorkOrderPages) workOrderPage = totalWorkOrderPages;
  if (workOrderPage < 1) workOrderPage = 1;
  const pagedWorkOrders = visibleWorkOrders.slice((workOrderPage - 1) * WORK_ORDERS_PER_PAGE, workOrderPage * WORK_ORDERS_PER_PAGE);
  const myWork = workOrders.filter((workOrder) => workOrder.assigned_to === session.user.id);
  const myOpenWork = myWork.filter((workOrder) => workOrder.status !== "completed");
  const createdByMe = workOrders.filter((workOrder) => workOrder.created_by === session.user.id && workOrder.status !== "completed");
  const visibleRequests = filteredRequests();
  const visibleAssets = filteredAssets();
  const visibleSchedules = filteredPreventiveSchedules();
  const visibleProcedures = filteredProcedureTemplates();
  const visibleParts = filteredParts();
  const showGlobalSearch = Boolean(searchQuery.trim()) && !activeAssetId && !activeWorkOrderId && !activePartId && !quickFixMode && !createWorkOrderMode;
  const globalResults = showGlobalSearch ? globalSearchResults() : null;
  const totalPartsPages = Math.max(1, Math.ceil(visibleParts.length / PARTS_PER_PAGE));
  if (partsPage > totalPartsPages) partsPage = totalPartsPages;
  if (partsPage < 1) partsPage = 1;
  const pagedParts = visibleParts.slice((partsPage - 1) * PARTS_PER_PAGE, partsPage * PARTS_PER_PAGE);
  const visibleMembers = filteredMembers();
  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <span class="brand-mark">MO</span>
          <span><strong>MaintainOps</strong><small>Maintenance work, clearly tracked.</small></span>
        </div>
        <details class="sidebar-controls" open>
          <summary>Workspace</summary>
          <label class="company-switcher">
            Company
            <select id="company-select">
              ${companies.map((company) => `<option value="${escapeHtml(company.id)}" ${company.id === activeCompanyId ? "selected" : ""}>${escapeHtml(company.name)}</option>`).join("")}
            </select>
          </label>
          <label class="company-switcher">
            Location
            <select id="location-select" ${locationsReady ? "" : "disabled"}>
              ${locations.length ? "" : `<option value="">Run location setup</option>`}
              ${locations.map((location) => `<option value="${location.id}" ${location.id === activeLocationId ? "selected" : ""}>${escapeHtml(location.name)}</option>`).join("")}
            </select>
          </label>
          ${locationsReady ? "" : `<p class="warning-text">Run supabase/step-next-locations.sql to enable locations.</p>`}
          <button class="secondary-button" id="new-company" type="button">New Company</button>
          <button class="text-button inverse" id="sign-out" type="button">Sign out</button>
        </details>
        <nav class="section-nav" aria-label="Workspace sections">
          ${navItems.map(([id, label]) => `<button class="nav-${id} ${activeSection === id ? "active" : ""}" data-section="${id}" type="button">${navIcon(id)}<span>${label}</span>${id === "messages" && totalUnreadMessages() ? `<b class="nav-badge">${totalUnreadMessages()}</b>` : ""}</button>`).join("")}
        </nav>
      </aside>

      <main class="workspace">
        <div class="command-stack">
          <header class="topbar">
            <div class="topbar-main">
              <p class="eyebrow">Authenticated Multi-Tenant MVP</p>
              <div class="company-banner-title">
                ${activeCompany?.logoUrl ? `<img class="company-banner-logo" src="${escapeHtml(activeCompany.logoUrl)}" alt="${escapeHtml(activeCompany?.name || "Company")} logo">` : ""}
                <div>
                  <h1>${escapeHtml(activeCompany?.name || "Company")}</h1>
                  <p class="company-location-name">${escapeHtml(activeLocationName())}</p>
                </div>
              </div>
            </div>
            <div class="topbar-actions">
              <button class="primary-button quick-fix-button" id="show-quick-fix" type="button">Quick Fix</button>
              <details class="topbar-more">
                <summary>More</summary>
                <div>
                  <button class="primary-button work-action-button" id="show-create-work-order" type="button">New Work Order</button>
                  <button class="secondary-button request-action-button" id="show-request" type="button">Submit Request</button>
                  <button class="secondary-button export-action-button" id="export-csv" type="button">Export CSV</button>
                </div>
              </details>
            </div>
          </header>

          ${appNotice ? `<div class="app-notice ${appNoticeTone}">${escapeHtml(appNotice)}</div>` : ""}
          ${appNotice && appNoticeTone === "success" ? `<div class="save-overlay" aria-hidden="true">SAVED</div>` : ""}
          ${appNotice && appNoticeTone === "warning" ? `<div class="warning-overlay" aria-hidden="true">SAFETY CHECK REQUIRED</div>` : ""}

          <label class="search-bar">
            Search workspace
            <input id="workspace-search" type="search" value="${escapeHtml(searchQuery)}" placeholder="Search work, equipment, parts, people">
          </label>
        </div>

        ${showGlobalSearch ? renderGlobalSearchResults(globalResults) : ""}

        ${showWorkDashboard ? `
          <section class="panel full-width screen-gauge-panel">
            <div class="panel-header">
              <h2>Work Orders</h2>
              <span>${escapeHtml(activeLocationName())}</span>
            </div>
            ${renderWorkOrderGaugeDashboard()}
          </section>
        ` : ""}

        <section class="layout-grid single-column ${showGlobalSearch ? "hidden-section" : ""}">
          ${isWorkArea ? `
            ${activeSection !== "assets" && (activeAssetId || activeWorkOrderId || quickFixMode || createWorkOrderMode) ? `
              <section class="panel full-width focus-panel">
                <div class="panel-header">
                  <h2>${activeAssetId ? "Equipment Detail" : activeWorkOrderId ? "Work Order Detail" : quickFixMode ? "Quick Fix" : "Create Work Order"}</h2>
                  <button class="secondary-button back-action-button" id="back-to-my-work" type="button">Back to ${activeSection === "work" ? "Work Orders" : "My Work"}</button>
                </div>
                <div id="detail-panel">${activeAssetId ? renderAssetDetail() : activeWorkOrderId ? renderWorkOrderDetail() : quickFixMode ? renderQuickFixForm() : renderCreateWorkOrder()}</div>
              </section>
            ` : `
              <section class="panel full-width my-work-panel queue-panel">
                <div class="panel-header">
                  <h2>${workQueuePanelTitle()}</h2>
                  <span>${workQueuePanelSubtitle(visibleWorkOrders.length)}</span>
                </div>
                ${activeSection === "mywork" ? renderWorkloadStrip(myWorkGaugeOrders) : ""}
                ${activeSection === "mywork" ? `
                  <div class="segmented-control" aria-label="My work filter">
                    <button class="segment ${myWorkFilter === "assigned" ? "active" : ""}" data-my-work-filter="assigned" type="button">${segmentIcon("mine")}Assigned To Me</button>
                    <button class="segment ${myWorkFilter === "created" ? "active" : ""}" data-my-work-filter="created" type="button">${segmentIcon("created")}Created By Me</button>
                  </div>
                ` : `
                  <div class="segmented-control" aria-label="Work order filter">
                    <button class="segment ${workOrderFilter === "all" ? "active" : ""}" data-work-order-filter="all" type="button">${segmentIcon("all")}All Work Orders</button>
                    <button class="segment ${workOrderFilter === "assigned" ? "active" : ""}" data-work-order-filter="assigned" type="button">${segmentIcon("mine")}Assigned</button>
                    <button class="segment ${workOrderFilter === "vendor" ? "active" : ""}" data-work-order-filter="vendor" type="button">${segmentIcon("vendor")}Vendor</button>
                    <button class="segment ${workOrderFilter === "unassigned" ? "active" : ""}" data-work-order-filter="unassigned" type="button">${segmentIcon("unassigned")}Unassigned</button>
                  </div>
                  ${workOrderAssigneeFilter ? `
                    <div class="active-team-filter">
                      <span>Assigned to ${escapeHtml(teamMemberName(workOrderAssigneeFilter))}</span>
                      <button class="text-button" data-clear-assignee-filter type="button">Clear</button>
                    </div>
                  ` : ""}
                `}
                <div class="segmented-control" aria-label="Work order sort">
                  ${[
                    ["newest", "Newest"],
                    ["due", "Due First"],
                    ["priority", "Priority"],
                  ].map(([id, label]) => `
                    <button class="segment ${workSort === id ? "active" : ""}" data-work-sort="${id}" type="button">${segmentIcon(id)}${label}</button>
                  `).join("")}
                </div>
                ${["completed", "completed_month", "completed_week"].includes(activeStatusFilter) ? `
                  <p class="completion-note completed-history-note">Completed history is paged ${WORK_ORDERS_PER_PAGE} at a time and sorted by most recently completed.</p>
                ` : ""}
                <div class="work-list" id="work-order-list">
                  ${pagedWorkOrders.map(renderWorkOrderCard).join("") || `<p class="muted">No work orders match this filter.</p>`}
                </div>
                ${renderWorkPagination(visibleWorkOrders.length, totalWorkOrderPages)}
              </section>
            `}
          ` : ""}

          <section class="panel full-width ${activeSection === "planning" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Planning</h2>
              <span>${planningItems().length + followUpItems().length} items</span>
            </div>
            <div class="planning-grid">
              ${renderPlanningGroup("Overdue", planningItems("overdue"), "overdue")}
              ${renderPlanningGroup("Due Today", planningItems("today"), "due_today")}
              ${renderPlanningGroup("Next 7 Days", planningItems("soon"), "in_progress")}
              ${renderPlanningGroup("Follow-up Needed", followUpItems(), "blocked")}
              ${renderPlanningGroup("PM Due Soon", planningPmItems(), "open")}
            </div>
          </section>

          <section class="panel full-width ${activeSection === "requests" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Requests</h2>
              <span>${requestsReady ? `${visibleRequests.length} shown` : "setup needed"}</span>
            </div>
            ${renderRequestFormContent()}
            ${requestsReady ? `
              <div class="request-list">
                ${visibleRequests.map(renderMaintenanceRequest).join("") || `<p class="muted">No requests match this search.</p>`}
              </div>
            ` : `<p class="muted">Run supabase/step-next-maintenance-requests.sql before submitting and reviewing requests.</p>`}
          </section>

          <section class="panel full-width ${activeSection === "assets" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>${activeAssetId ? "Equipment Detail" : "Equipment"}</h2>
              ${activeAssetId ? `<button class="secondary-button back-action-button" id="back-to-equipment" type="button">Back to Equipment</button>` : `<span>${visibleAssets.length} shown</span>`}
            </div>
            ${activeAssetId ? renderAssetDetail() : `
            <form class="inline-form" id="create-asset-form">
              <input name="name" required placeholder="Machine or equipment name">
              <input name="asset_code" placeholder="Equipment ID">
              <input name="location" placeholder="Area / line">
              <select name="asset_type" aria-label="Equipment type">
                ${ASSET_TYPE_OPTIONS.map((type) => `<option value="${type}">${assetTypeLabel(type)}</option>`).join("")}
              </select>
              <select name="parent_asset_id" aria-label="Part of equipment">
                <option value="">Top level equipment</option>
                ${renderParentAssetOptions()}
              </select>
              <select name="location_id" ${locations.length ? "required" : "disabled"}>
                ${renderLocationOptions()}
              </select>
              <label class="check-row compact-check"><input name="safety_devices_required" type="checkbox" checked> Safety devices</label>
              <button class="secondary-button asset-action-button" type="submit">Add Equipment</button>
            </form>
            <p class="error-text" id="asset-create-error"></p>
            <div class="asset-health-grid">
              ${["running", "watch", "degraded", "offline"].map((status) => `
                <article class="asset-health ${status}">
                  <span>${status}</span>
                  <strong>${filteredAssets().filter((asset) => asset.status === status).length}</strong>
                </article>
              `).join("")}
            </div>
            <div class="asset-list">
              ${visibleAssets.map(renderAssetCard).join("") || `<p class="muted">No equipment matches this search.</p>`}
            </div>
            `}
          </section>

          <section class="panel full-width ${activeSection === "pm" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Preventive Maintenance</h2>
              <span>${visibleSchedules.length} shown</span>
            </div>
            <form class="inline-form pm-form" id="create-pm-form">
              <input name="title" required placeholder="Monthly compressor PM">
              <select name="asset_id" required>
                <option value="">Machine / equipment</option>
                ${renderAssetOptions()}
              </select>
              <select name="frequency">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
              <select name="procedure_template_id">
                ${renderProcedureOptions()}
              </select>
              <input name="next_due_at" type="date" required>
              <p class="error-text" id="pm-error"></p>
              <button class="secondary-button" type="submit">Add Schedule</button>
            </form>
            <div class="pm-list">
              ${visibleSchedules.map(renderPreventiveSchedule).join("") || `<p class="muted">No schedules match this search.</p>`}
            </div>
          </section>

          <section class="panel full-width ${activeSection === "procedures" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Procedures</h2>
              <span>${visibleProcedures.length} shown</span>
            </div>
            ${proceduresReady ? `
            <form class="form-grid procedure-form relationship-detail procedure" id="create-procedure-form">
              <label>Procedure name<input name="name" required placeholder="Monthly compressor inspection"></label>
              <label>Description<textarea name="description" rows="3" placeholder="Use this checklist when creating repeat work."></textarea></label>
              <p class="error-text" id="procedure-error"></p>
              <button class="secondary-button" type="submit">Add Procedure</button>
            </form>
            <button class="text-button" id="seed-sample-procedure" type="button">Add sample inspection procedure</button>
            <div class="procedure-list">
              ${visibleProcedures.map(renderProcedureTemplate).join("") || `<p class="muted">No procedures match this search.</p>`}
            </div>
            ` : `<p class="muted">Run supabase/step-next-procedures.sql to turn on procedure templates.</p>`}
          </section>

          <section class="panel full-width ${activeSection === "messages" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Messages</h2>
              <span>${messagesReady ? `${messageThreads.length} threads` : "setup needed"}</span>
            </div>
            ${renderMessageCenter()}
          </section>

          <section class="panel full-width ${activeSection === "team" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Team</h2>
              <span>${visibleMembers.length} shown</span>
            </div>
            ${renderMyProfileForm()}
            ${renderRoleGuide()}
            ${canManageTeam() ? `
              ${renderTeamInviteForm()}
              ${teamInvitesReady ? renderTeamInvites() : `<p class="warning-text">Run supabase/step-next-team-invites.sql to invite teammates by email.</p>`}
              <details class="developer-details">
                <summary>Developer add by User UUID</summary>
                <form class="inline-form team-form" id="add-member-form">
                  <input name="user_id" required placeholder="User UUID">
                  <select name="role">
                    <option value="technician">Technician</option>
                    <option value="manager">Manager</option>
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button class="secondary-button" type="submit">Add Member</button>
                </form>
              </details>
            ` : `<p class="muted team-permission-note">Admins and managers can invite teammates and change roles.</p>`}
            <div class="member-list">
              ${visibleMembers.map(renderMember).join("") || `<p class="muted">No team members match this search.</p>`}
            </div>
          </section>

          <section class="panel full-width ${activeSection === "parts" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>${activePartId ? "Part Detail" : "Parts Inventory"}</h2>
              <span>${activePartId ? "editing" : `${visibleParts.length} shown`}</span>
            </div>
            ${activePartId ? renderPartDetail() : `
              <div class="parts-health-grid">
                ${renderPartsHealth()}
              </div>
              ${renderPartSourceOptions()}
              <form class="inline-form parts-form relationship-detail parts" id="create-part-form">
                <div class="parts-form-header">
                  <h3>Add Part</h3>
                  <button class="text-button danger-link source-edit-button" data-toggle-part-sources type="button">Edit sources</button>
                </div>
                <label>Part name<input name="name" required placeholder="Motor bearing"></label>
                <label>SKU<input name="sku" placeholder="BRG-204"></label>
                <label>Source / vendor<input name="supplier_name" list="part-source-options" placeholder="Grainger, McMaster, local supplier"></label>
                <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="0"></label>
                <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="0"></label>
                <label>Unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="0"></label>
                <p class="error-text" id="part-create-error">${partSetupMessage()}</p>
                <button class="secondary-button add-part-button" type="submit">Add Part</button>
              </form>
              ${showPartSourceManager ? renderPartSourceManager() : ""}
              <div class="parts-list">
                ${pagedParts.map(renderPart).join("") || `<p class="muted">No parts match this search.</p>`}
              </div>
              ${renderPartsPagination(visibleParts.length, totalPartsPages)}
            `}
          </section>

          <section class="panel full-width ${activeSection === "settings" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Company Settings</h2>
              <span>${escapeHtml(activeCompany?.role || "member")}</span>
            </div>
            <form class="form-grid settings-form" id="company-settings-form">
              <label>Company name<input name="name" required value="${escapeHtml(activeCompany?.name || "")}"></label>
              <button class="secondary-button" type="submit">Save Company</button>
            </form>
            <form class="form-grid settings-form logo-form" id="company-logo-form">
              <div class="company-logo-preview">
                ${activeCompany?.logoUrl ? `<img src="${escapeHtml(activeCompany.logoUrl)}" alt="${escapeHtml(activeCompany?.name || "Company")} logo preview">` : `<span>MO</span>`}
              </div>
              <label>Company logo<input name="logo" type="file" accept="image/*"><small>Optional. Logos are optimized before upload.</small></label>
              <p class="error-text" id="company-logo-error">${escapeHtml(activeCompany?.logoError || "")}</p>
              <button class="secondary-button" type="submit">Upload Logo</button>
            </form>
            <div class="settings-summary logo-status">
              <article><strong>Logo status</strong><span>${activeCompany?.logo_path ? (activeCompany?.logoUrl ? "loaded" : "saved, cannot display") : "none uploaded"}</span></article>
              ${activeCompany?.logo_path ? `<article><strong>Logo path</strong><span>${escapeHtml(activeCompany.logo_path)}</span></article>` : ""}
            </div>
            <form class="form-grid settings-form" id="location-form">
              <label>New location<input name="name" required placeholder="North Plant"></label>
              <p class="error-text" id="location-error">${locationsReady ? "" : "Run supabase/step-next-locations.sql before adding locations."}</p>
              <button class="secondary-button" type="submit" ${locationsReady ? "" : "disabled"}>Add Location</button>
            </form>
            <div class="settings-summary">
              ${locations.map((location) => `<article><strong>${escapeHtml(location.name)}</strong><span>${location.id === activeLocationId ? "active location" : "available"}</span></article>`).join("") || `<article><strong>No locations yet</strong><span>Run the location setup SQL</span></article>`}
            </div>
            ${renderPublicRequestLinkManager()}
            <div class="settings-summary">
              <article><strong>Company ID</strong><span>${escapeHtml(activeCompanyId)}</span></article>
              <article><strong>Signed in as</strong><span>${escapeHtml(session.user.email || session.user.id)}</span></article>
              <article><strong>Active section</strong><span>${escapeHtml(activeSection)}</span></article>
            </div>
          </section>

          <section class="panel full-width ${activeSection === "setup" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Admin Setup</h2>
              <span>${setupItems().filter((item) => item.ready).length}/${setupItems().length} ready</span>
            </div>
            <p class="muted setup-note">Builder diagnostic area. Use this to confirm Supabase tables, columns, storage, and config are ready before demos or deployment.</p>
            <div class="setup-list">
              ${setupItems().map(renderSetupItem).join("")}
            </div>
          </section>
        </section>
      </main>
    </div>
  `;

  bindWorkspaceEvents();
}

function filteredWorkOrders() {
  return workOrders.filter((workOrder) => {
    if (!matchesActiveLocation(workOrder)) return false;
    const statusMatch = workOrderMatchesStatusFilter(workOrder);
    const queueMatch = activeSection === "mywork"
      ? (myWorkFilter === "created" ? workOrder.created_by === session.user.id : workOrder.assigned_to === session.user.id)
      : workOrderAssigneeFilter
        ? workOrder.assigned_to === workOrderAssigneeFilter
        : workOrderFilter === "all" ||
          (workOrderFilter === "assigned" && Boolean(workOrder.assigned_to)) ||
          (workOrderFilter === "vendor" && isVendorAssigned(workOrder)) ||
          (workOrderFilter === "unassigned" && !workOrder.assigned_to && !isVendorAssigned(workOrder));
    return statusMatch && queueMatch && matchesSearch(workOrderSearchValues(workOrder));
  }).sort(compareWorkOrders);
}

function workOrderMatchesStatusFilter(workOrder) {
  if (activeStatusFilter === "overdue") return getDueState(workOrder)?.className === "overdue";
  if (activeStatusFilter === "completed_month") return isCompletedThisMonth(workOrder);
  if (activeStatusFilter === "completed_week") return isCompletedThisWeek(workOrder);
  if (activeStatusFilter === "active" || activeStatusFilter === "all") return workOrder.status !== "completed";
  return workOrder.status === activeStatusFilter;
}

function myWorkQueueOrders() {
  return workOrders.filter((workOrder) => {
    if (!matchesActiveLocation(workOrder)) return false;
    const queueMatch = myWorkFilter === "created"
      ? workOrder.created_by === session.user.id
      : workOrder.assigned_to === session.user.id;
    return queueMatch && matchesSearch(workOrderSearchValues(workOrder));
  });
}

function resetWorkOrderPage() {
  workOrderPage = 1;
  localStorage.setItem("maintainops.workOrderPage", String(workOrderPage));
}

function resetPartsPage() {
  partsPage = 1;
  localStorage.setItem("maintainops.partsPage", String(partsPage));
}

function activeLocationDatabaseId() {
  return locationsReady && activeLocationId ? activeLocationId : null;
}

function recordLocationId(record) {
  return record?.location_id || record?.assets?.location_id || null;
}

function locationIdForAsset(assetId) {
  return assets.find((asset) => asset.id === assetId)?.location_id || activeLocationDatabaseId();
}

function matchesActiveLocation(record) {
  if (!locationsReady || !activeLocationId) return true;
  return recordLocationId(record) === activeLocationId;
}

function activeLocationName() {
  return locations.find((location) => location.id === activeLocationId)?.name || "Location";
}

function renderLocationOptions(selectedId = activeLocationId) {
  return locations.map((location) => `<option value="${location.id}" ${location.id === selectedId ? "selected" : ""}>${escapeHtml(location.name)}</option>`).join("");
}

function renderAssetOptions(selectedId = "") {
  const options = filteredAssets();
  const selectedAsset = selectedId ? assets.find((asset) => asset.id === selectedId) : null;
  const list = selectedAsset && !options.some((asset) => asset.id === selectedAsset.id)
    ? [selectedAsset, ...options]
    : options;
  return list.map((asset) => `<option value="${asset.id}" ${asset.id === selectedId ? "selected" : ""}>${escapeHtml(assetOptionLabel(asset))}</option>`).join("");
}

function renderParentAssetOptions(selectedId = "", currentAssetId = "") {
  return assets
    .filter(matchesActiveLocation)
    .filter((asset) => asset.id !== currentAssetId && !isAssetDescendantOf(asset.id, currentAssetId))
    .sort((a, b) => assetOptionLabel(a).localeCompare(assetOptionLabel(b)))
    .map((asset) => `<option value="${asset.id}" ${asset.id === selectedId ? "selected" : ""}>${escapeHtml(assetOptionLabel(asset))}</option>`)
    .join("");
}

function assetOptionLabel(asset) {
  const parent = parentAssetFor(asset);
  return parent ? `${asset.name} - part of ${parent.name}` : asset.name;
}

function showNotice(message, tone = "success") {
  appNotice = message;
  appNoticeTone = tone;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => {
    appNotice = "";
    appNoticeTone = "success";
    renderWorkspace();
  }, tone === "warning" ? 4200 : 2600);
}

function bindAutoGrowTextareas() {
  document.querySelectorAll("textarea").forEach((field) => {
    autoGrowTextarea(field);
    field.addEventListener("input", () => autoGrowTextarea(field));
  });
}

function autoGrowTextarea(field) {
  field.style.height = "auto";
  field.style.height = `${field.scrollHeight}px`;
}

function compareWorkOrders(a, b) {
  if (["completed", "completed_month", "completed_week"].includes(activeStatusFilter)) {
    return completedSortValue(b) - completedSortValue(a) || new Date(b.created_at) - new Date(a.created_at);
  }

  if (workSort === "due") {
    return dueSortValue(a) - dueSortValue(b) || new Date(b.created_at) - new Date(a.created_at);
  }

  if (workSort === "priority") {
    return prioritySortValue(b.priority) - prioritySortValue(a.priority) || dueSortValue(a) - dueSortValue(b);
  }

  return new Date(b.created_at) - new Date(a.created_at);
}

function dueSortValue(workOrder) {
  if (!workOrder.due_at) return Number.MAX_SAFE_INTEGER;
  return new Date(`${workOrder.due_at}T00:00:00`).getTime();
}

function prioritySortValue(priority) {
  return { low: 1, medium: 2, high: 3, critical: 4 }[priority] || 0;
}

function completedSortValue(workOrder) {
  return workOrder.completed_at ? new Date(workOrder.completed_at).getTime() : 0;
}

function filteredRequests() {
  return maintenanceRequests.filter((request) => matchesActiveLocation(request) && matchesSearch([
    request.title,
    request.description,
    request.status,
    request.priority,
    request.assets?.name,
    profilesByUserId[request.requested_by]?.full_name,
  ]));
}

function filteredAssets() {
  return assets.filter((asset) => matchesActiveLocation(asset) && matchesSearch([
    asset.name,
    asset.asset_code,
    asset.location,
    asset.status,
    asset.asset_type,
    parentAssetFor(asset)?.name,
  ]));
}

function parentAssetFor(asset) {
  return assets.find((item) => item.id === asset?.parent_asset_id) || null;
}

function childAssetsFor(assetId) {
  return assets
    .filter((asset) => asset.parent_asset_id === assetId)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function isAssetDescendantOf(assetId, ancestorId) {
  if (!assetId || !ancestorId) return false;
  let current = assets.find((asset) => asset.id === assetId);
  const seen = new Set();
  while (current?.parent_asset_id && !seen.has(current.id)) {
    if (current.parent_asset_id === ancestorId) return true;
    seen.add(current.id);
    current = assets.find((asset) => asset.id === current.parent_asset_id);
  }
  return false;
}

function assetTypeLabel(type) {
  return String(type || "machine")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function filteredPreventiveSchedules() {
  return preventiveSchedules.filter((schedule) => matchesActiveLocation(schedule) && matchesSearch([
    schedule.title,
    schedule.frequency,
    schedule.next_due_at,
    schedule.assets?.name,
  ]));
}

function filteredProcedureTemplates() {
  return procedureTemplates.filter((template) => matchesSearch([
    template.name,
    template.description,
    ...(template.procedure_steps || []).map((step) => step.prompt),
  ]));
}

function filteredParts() {
  return parts.filter((part) => {
    if (!matchesActiveLocation(part)) return false;
    if (partInventoryFilter === "low" && !isLowStockPart(part)) return false;
    return matchesSearch([
      part.name,
      part.sku,
      part.supplier_name,
      part.quantity_on_hand,
      part.reorder_point,
    ]);
  });
}

function partSourceOptions() {
  return [...new Set(parts.filter(matchesActiveLocation)
    .map((part) => String(part.supplier_name || "").trim())
    .filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));
}

function renderPartSourceOptions() {
  const options = partSourceOptions();
  return `
    <datalist id="part-source-options">
      ${options.map((source) => `<option value="${escapeHtml(source)}"></option>`).join("")}
    </datalist>
  `;
}

function renderPartSourceManager() {
  const sources = partSourceOptions();
  return `
    <section class="part-source-manager relationship-detail parts">
      <div class="panel-header compact">
        <h3>Edit Sources</h3>
        <button class="text-button" data-toggle-part-sources type="button">Close</button>
      </div>
      ${partSuppliersReady ? `
        <p class="muted">Rename a source to correct spelling or merge duplicates across every part using that exact name.</p>
        <div class="part-source-list">
          ${sources.map((source) => `
            <form class="part-source-row" data-rename-part-source>
              <input name="old_source" type="hidden" value="${escapeHtml(source)}">
              <span>${escapeHtml(source)}</span>
              <input name="new_source" list="part-source-options" value="${escapeHtml(source)}" aria-label="New source name for ${escapeHtml(source)}">
              <button class="secondary-button" type="submit">Rename</button>
            </form>
          `).join("") || `<p class="muted">No sources have been added yet.</p>`}
        </div>
        <p class="error-text" id="part-source-error"></p>
      ` : `<p class="error-text">Run supabase/step-next-part-suppliers.sql before editing sources.</p>`}
    </section>
  `;
}

function renderGlobalSearchResults(results) {
  const total = globalResultCount(results);
  return `
    <section class="panel full-width global-search-panel">
      <div class="panel-header">
        <h2>Search Results</h2>
        <span>${total} found in ${escapeHtml(activeLocationName())}</span>
      </div>
      <div class="global-search-grid">
        ${renderGlobalResultGroup("Work Orders", results.work, renderGlobalWorkResult, "work")}
        ${renderGlobalResultGroup("Equipment", results.assets, renderGlobalAssetResult, "asset")}
        ${renderGlobalResultGroup("Parts", results.parts, renderGlobalPartResult, "parts")}
        ${renderGlobalResultGroup("Requests", results.requests, renderGlobalRequestResult, "comment")}
        ${renderGlobalResultGroup("PM", results.pm, renderGlobalPmResult, "procedure")}
        ${renderGlobalResultGroup("Procedures", results.procedures, renderGlobalProcedureResult, "procedure")}
      </div>
    </section>
  `;
}

function renderGlobalResultGroup(title, items, renderer, tone) {
  return `
    <section class="global-result-group relationship-detail ${tone}">
      <div class="panel-header compact">
        <h3>${escapeHtml(title)}</h3>
        <span class="chip">${items.length}</span>
      </div>
      <div class="global-result-list">
        ${items.map(renderer).join("") || `<p class="muted">No matches.</p>`}
      </div>
    </section>
  `;
}

function renderGlobalWorkResult(workOrder) {
  return `
    <button class="global-result-item" data-search-work-order="${workOrder.id}" type="button">
      <strong>${escapeHtml(workOrder.title)}</strong>
      <span>${statusLabel(workOrder.status)} - ${escapeHtml(workOrder.assets?.name || "No equipment")} - ${escapeHtml(assignmentLabel(workOrder))}</span>
    </button>
  `;
}

function renderGlobalAssetResult(asset) {
  return `
    <button class="global-result-item" data-search-asset="${asset.id}" type="button">
      <strong>${escapeHtml(asset.name)}</strong>
      <span>${escapeHtml(asset.asset_code || "No ID")} - ${escapeHtml(asset.status)} - ${escapeHtml(asset.location || activeLocationName())}</span>
    </button>
  `;
}

function renderGlobalPartResult(part) {
  const quantity = Number(part.quantity_on_hand) || 0;
  return `
    <button class="global-result-item" data-search-part="${part.id}" type="button">
      <strong>${escapeHtml(part.name)}</strong>
      <span>${escapeHtml(part.sku || "No SKU")} - ${quantity} on hand${part.supplier_name ? ` - ${escapeHtml(part.supplier_name)}` : ""}</span>
    </button>
  `;
}

function renderGlobalRequestResult(request) {
  return `
    <button class="global-result-item" data-search-request="${request.id}" type="button">
      <strong>${escapeHtml(request.title)}</strong>
      <span>${escapeHtml(request.status)} - ${escapeHtml(request.assets?.name || "No equipment")}</span>
    </button>
  `;
}

function renderGlobalPmResult(schedule) {
  return `
    <button class="global-result-item" data-search-section="pm" data-search-label="${escapeHtml(schedule.title)}" type="button">
      <strong>${escapeHtml(schedule.title)}</strong>
      <span>${escapeHtml(schedule.assets?.name || "No equipment")} - due ${escapeHtml(schedule.next_due_at || "unset")}</span>
    </button>
  `;
}

function renderGlobalProcedureResult(template) {
  return `
    <button class="global-result-item" data-search-section="procedures" data-search-label="${escapeHtml(template.name)}" type="button">
      <strong>${escapeHtml(template.name)}</strong>
      <span>${(template.procedure_steps || []).length} steps</span>
    </button>
  `;
}

function partSetupMessage() {
  const messages = [];
  if (!partCostsReady) messages.push("Run supabase/step-next-part-costs.sql before saving unit costs.");
  if (!partSuppliersReady) messages.push("Run supabase/step-next-part-suppliers.sql before saving source/vendor names.");
  return messages.join(" ");
}

function filteredMembers() {
  return companyMembers.filter((member) => matchesSearch([
    member.user_id,
    member.role,
    profilesByUserId[member.user_id]?.full_name,
  ]));
}

function matchesSearch(values) {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return true;
  return values.some((value) => String(value ?? "").toLowerCase().includes(query));
}

function matchesQuery(values, query = searchQuery) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return values.some((value) => String(value ?? "").toLowerCase().includes(normalized));
}

function workOrderSearchValues(workOrder) {
  const usedParts = partsUsedByWorkOrder[workOrder.id] || [];
  const comments = commentsByWorkOrder[workOrder.id] || [];
  const events = eventsByWorkOrder[workOrder.id] || [];
  const photos = photosByWorkOrder[workOrder.id] || [];
  const procedure = procedureTemplates.find((template) => template.id === workOrder.procedure_template_id);
  const stepResults = Object.values(stepResultsByWorkOrder[workOrder.id] || {});

  return [
    workOrder.title,
    workOrder.description,
    workOrder.status,
    statusLabel(workOrder.status),
    workOrder.priority,
    workOrder.type,
    workOrder.assets?.name,
    assignmentLabel(workOrder),
    workOrder.failure_cause,
    workOrder.resolution_summary,
    workOrder.completion_notes,
    workOrder.current_update,
    procedure?.name,
    procedure?.description,
    ...(procedure?.procedure_steps || []).flatMap((step) => [step.prompt, step.step_type]),
    ...usedParts.flatMap((row) => [
      row.parts?.name,
      row.parts?.sku,
      row.parts?.supplier_name,
      row.quantity_used,
      row.unit_cost,
    ]),
    ...comments.flatMap((comment) => [
      comment.body,
      profilesByUserId[comment.author_id]?.full_name,
    ]),
    ...events.flatMap((event) => [
      event.event_type,
      event.summary,
      profilesByUserId[event.actor_id]?.full_name,
    ]),
    ...photos.flatMap((photo) => [
      photo.file_name,
      photo.original_file_name,
      photo.content_type,
    ]),
    ...stepResults.flatMap((result) => [
      result.value,
      result.notes,
    ]),
  ];
}

function globalSearchResults() {
  const query = searchQuery.trim();
  const work = workOrders
    .filter(matchesActiveLocation)
    .filter((workOrder) => matchesQuery(workOrderSearchValues(workOrder), query))
    .sort(compareWorkOrders)
    .slice(0, 6);

  const assetResults = assets
    .filter(matchesActiveLocation)
    .filter((asset) => matchesQuery([asset.name, asset.asset_code, asset.location, asset.status], query))
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 6);

  const partResults = parts
    .filter(matchesActiveLocation)
    .filter((part) => matchesQuery([part.name, part.sku, part.supplier_name, part.quantity_on_hand, part.reorder_point], query))
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 6);

  const requestResults = maintenanceRequests
    .filter(matchesActiveLocation)
    .filter((request) => matchesQuery([
      request.title,
      request.description,
      request.status,
      request.priority,
      request.assets?.name,
      profilesByUserId[request.requested_by]?.full_name,
    ], query))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 6);

  const pmResults = preventiveSchedules
    .filter(matchesActiveLocation)
    .filter((schedule) => matchesQuery([schedule.title, schedule.frequency, schedule.next_due_at, schedule.assets?.name], query))
    .sort((a, b) => String(a.next_due_at || "").localeCompare(String(b.next_due_at || "")))
    .slice(0, 6);

  const procedureResults = procedureTemplates
    .filter((template) => matchesQuery([
      template.name,
      template.description,
      ...(template.procedure_steps || []).map((step) => step.prompt),
    ], query))
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 6);

  return { work, assets: assetResults, parts: partResults, requests: requestResults, pm: pmResults, procedures: procedureResults };
}

function globalResultCount(results) {
  return Object.values(results).reduce((sum, list) => sum + list.length, 0);
}

function renderMetric(label, value, tone = "neutral") {
  return `<article class="metric dashboard-card tone-${tone}"><span>${label}</span><strong>${value}</strong></article>`;
}

function renderGaugeReadout(label, value, tone = "active", options = {}) {
  const isAction = options.filter || options.section;
  const tag = isAction ? "button" : "article";
  const activeClass = options.filter && activeStatusFilter === options.filter ? " selected" : "";
  const attributes = [
    isAction ? `type="button"` : "",
    options.filter ? `data-status-filter="${options.filter}" aria-pressed="${activeStatusFilter === options.filter}"` : "",
    options.section ? `data-section="${options.section}"` : "",
  ].filter(Boolean).join(" ");
  const attrText = attributes ? ` ${attributes}` : "";
  return `
    <${tag} class="gauge-readout ${tone}${activeClass}"${attrText}>
      <div class="gauge-visual" aria-hidden="true">
        <span class="gauge-arc"></span>
        <span class="gauge-cut one"></span>
        <span class="gauge-cut two"></span>
        <span class="gauge-cut three"></span>
        <span class="gauge-cut four"></span>
        <span class="gauge-needle"></span>
        <span class="gauge-hub"></span>
      </div>
      <strong>${value}</strong>
      <span>${escapeHtml(label)}</span>
    </${tag}>
  `;
}

function renderWorkOrderGaugeDashboard() {
  const locationWorkOrders = workOrders.filter(matchesActiveLocation);
  const activeWork = locationWorkOrders.filter((workOrder) => workOrder.status !== "completed").length;
  const newWork = locationWorkOrders.filter((workOrder) => workOrder.status === "open").length;
  const inProgress = locationWorkOrders.filter((workOrder) => workOrder.status === "in_progress").length;
  const blocked = locationWorkOrders.filter((workOrder) => workOrder.status === "blocked").length;
  const overdue = locationWorkOrders.filter((workOrder) => getDueState(workOrder)?.className === "overdue").length;
  const completedMonth = completedThisMonth().filter(matchesActiveLocation).length;
  const completedWeek = completedThisWeek().filter(matchesActiveLocation).length;
  const requestCount = requestsReady
    ? openMaintenanceRequests().filter(matchesActiveLocation).length
    : locationWorkOrders.filter((workOrder) => workOrder.type === "request" && workOrder.status !== "completed").length;
  return `
    <div class="summary-gauge-grid">
      ${renderGaugeReadout("Active Work", activeWork, "active", { filter: "active" })}
      ${renderGaugeReadout("New", newWork, "new", { filter: "open" })}
      ${renderGaugeReadout("In Progress", inProgress, "in_progress", { filter: "in_progress" })}
      ${renderGaugeReadout("Blocked", blocked, "blocked", { filter: "blocked" })}
      ${renderGaugeReadout("Overdue", overdue, "overdue", { filter: "overdue" })}
      ${renderGaugeReadout("Completed Month", completedMonth, "completed", { filter: "completed_month" })}
      ${renderGaugeReadout("Done This Week", completedWeek, "completed", { filter: "completed_week" })}
      ${renderGaugeReadout("Requests", requestCount, "request", { section: "requests" })}
    </div>
  `;
}

function renderWorkloadStrip(items) {
  const newWork = items.filter((workOrder) => workOrder.status === "open").length;
  const inProgress = items.filter((workOrder) => workOrder.status === "in_progress").length;
  const blocked = items.filter((workOrder) => workOrder.status === "blocked").length;
  const active = newWork + inProgress + blocked;
  const overdue = items.filter((workOrder) => getDueState(workOrder)?.className === "overdue").length;
  const completedMonth = items.filter(isCompletedThisMonth).length;
  const completedWeek = items.filter(isCompletedThisWeek).length;
  return `
    <div class="workload-strip" aria-label="Active work summary">
      ${renderGaugeReadout("Active Work", active, "active workload-pill", { filter: "active" })}
      ${renderGaugeReadout("New", newWork, "new workload-pill", { filter: "open" })}
      ${renderGaugeReadout("In Progress", inProgress, "in_progress workload-pill", { filter: "in_progress" })}
      ${renderGaugeReadout("Blocked", blocked, "blocked workload-pill", { filter: "blocked" })}
      ${renderGaugeReadout("Overdue", overdue, "overdue workload-pill", { filter: "overdue" })}
      ${renderGaugeReadout("Completed Month", completedMonth, "completed workload-pill", { filter: "completed_month" })}
      ${renderGaugeReadout("Done This Week", completedWeek, "completed workload-pill", { filter: "completed_week" })}
    </div>
  `;
}

function segmentIcon(type) {
  const icons = {
    active: `<path d="M4 12h5l2-6 4 12 2-6h3"></path>`,
    all: `<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>`,
    mine: `<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>`,
    created: `<path d="M5 4h10l4 4v12H5z"></path><path d="M15 4v5h5"></path><path d="M8 14h8"></path><path d="M8 17h5"></path>`,
    vendor: `<path d="M3 16h2l3-7h8l3 7h2"></path><path d="M7 16h10"></path><path d="M8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>`,
    unassigned: `<path d="M12 5v14"></path><path d="M5 12h14"></path>`,
    open: `<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>`,
    in_progress: `<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>`,
    blocked: `<path d="M5 5l14 14"></path><circle cx="12" cy="12" r="8"></circle>`,
    completed: `<path d="M4 12l5 5L20 6"></path>`,
    overdue: `<path d="M12 8v5"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="9"></circle>`,
    newest: `<path d="M12 5v7l4 2"></path><circle cx="12" cy="12" r="8"></circle>`,
    due: `<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>`,
    priority: `<path d="M12 3l8 18H4z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>`,
  };
  return `<svg class="segment-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[type] || icons.all}</svg>`;
}

function navIcon(type) {
  const icons = {
    mywork: `<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>`,
    work: `<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>`,
    planning: `<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>`,
    requests: `<path d="M5 5h14v10H8l-3 3V5z"></path>`,
    assets: `<path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path>`,
    pm: `<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>`,
    procedures: `<path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path>`,
    parts: `<path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path>`,
    messages: `<path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path>`,
    team: `<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M3 21a5 5 0 0 1 10 0"></path><path d="M11 21a5 5 0 0 1 10 0"></path>`,
    setup: `<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a8 8 0 0 0 .1-2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L4.5 13a8 8 0 0 0 .1 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.3 2.6h4l.3-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5z"></path>`,
    settings: `<path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M8 7v10"></path><path d="M16 7v10"></path>`,
  };
  return `<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[type] || icons.work}</svg>`;
}

function renderInsight(label, value, description, tone = "neutral") {
  return `
    <article class="insight dashboard-card tone-${tone}">
      <span>${label}</span>
      <strong>${value}</strong>
      <p>${description}</p>
    </article>
  `;
}

function workOrdersPanelTitle() {
  const baseTitle = workOrderAssigneeFilter
    ? `${teamMemberName(workOrderAssigneeFilter)} Work`
    : workOrderFilter === "unassigned"
      ? "Unassigned Work Orders"
      : workOrderFilter === "vendor"
        ? "Outside Vendor Work"
        : workOrderFilter === "assigned"
          ? "Assigned Work Orders"
          : "All Work Orders";
  if (activeStatusFilter === "active" || activeStatusFilter === "all") return baseTitle;
  return `${statusLabel(activeStatusFilter)} - ${baseTitle}`;
}

function myWorkPanelTitle() {
  const baseTitle = myWorkFilter === "created" ? "Created By Me" : "Assigned To Me";
  if (activeStatusFilter === "active" || activeStatusFilter === "all") return "My Work";
  return `${statusLabel(activeStatusFilter)} - My Work`;
}

function workQueuePanelTitle() {
  return activeSection === "mywork" ? myWorkPanelTitle() : workOrdersPanelTitle();
}

function workQueuePanelSubtitle(count) {
  const context = activeSection === "mywork"
    ? (myWorkFilter === "created" ? "Created By Me" : "Assigned To Me")
    : "shown";
  return activeSection === "mywork" ? `${count} shown - ${context}` : `${count} shown`;
}

function teamMemberName(userId) {
  const profile = profilesByUserId[userId];
  if (userId === session.user.id) return profile?.full_name || session.user.email || "Me";
  return profile?.full_name || userId;
}

function renderPlanningGroup(title, items, chipClass) {
  return `
    <section class="planning-group">
      <div class="panel-header compact-header">
        <h3>${escapeHtml(title)}</h3>
        <span class="chip ${chipClass}">${items.length}</span>
      </div>
      <div class="planning-list">
        ${items.map(renderPlanningItem).join("") || `<p class="muted">Nothing here.</p>`}
      </div>
    </section>
  `;
}

function renderPlanningItem(item) {
  if (item.kind === "follow_up") {
    return `
      <article class="planning-item follow-up-item">
        <div>
          <span class="eyebrow">Follow-up</span>
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.assetName)} - completed ${escapeHtml(item.completedAt)}</p>
          ${item.resolution ? `<p>${escapeHtml(item.resolution)}</p>` : ""}
        </div>
        <button class="secondary-button" data-create-follow-up="${item.id}" type="button">Create Work</button>
      </article>
    `;
  }

  if (item.kind === "pm") {
    return `
      <article class="planning-item">
        <div>
          <span class="eyebrow">Preventive</span>
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.assetName)} - due ${escapeHtml(item.dueAt)}</p>
        </div>
        <button class="secondary-button" data-generate-pm="${item.id}" type="button">Generate Work</button>
      </article>
    `;
  }

  return `
    <article class="planning-item mini-work-order" data-mini-work-order="${item.id}">
      <div>
        <span class="eyebrow">${escapeHtml(item.priority)} ${escapeHtml(statusLabel(item.status))}</span>
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.assetName)} - due ${escapeHtml(item.dueAt)}</p>
      </div>
      ${renderRelationshipChips(item.workOrder)}
    </article>
  `;
}

function renderAssetCard(asset) {
  const openWork = workOrders.filter((workOrder) => workOrder.asset_id === asset.id && workOrder.status !== "completed").length;
  const parent = parentAssetFor(asset);
  const children = childAssetsFor(asset.id);
  return `
    <article class="asset-card asset-state-${asset.status} ${asset.id === activeAssetId ? "selected" : ""}" data-asset-id="${asset.id}" tabindex="0">
      <div>
        <div class="chip-row">
          <span class="chip asset-${asset.status}">${escapeHtml(asset.status)}</span>
          <span class="chip">${escapeHtml(assetTypeLabel(asset.asset_type))}</span>
          ${asset.asset_code ? `<span class="chip">${escapeHtml(asset.asset_code)}</span>` : ""}
          ${asset.safety_devices_required === false ? `<span class="chip">no safety check</span>` : `<span class="chip overdue">safety check</span>`}
        </div>
        <h3>${escapeHtml(asset.name)}</h3>
        <p>${escapeHtml(asset.location || "No location set")}</p>
        ${parent ? `<p>Part of ${escapeHtml(parent.name)}</p>` : ""}
        ${children.length ? `<p>${children.length} linked item${children.length === 1 ? "" : "s"}</p>` : ""}
      </div>
      <span class="muted">${openWork} open work</span>
    </article>
  `;
}

function renderAssetDetail() {
  const asset = assets.find((item) => item.id === activeAssetId);
  if (!asset) return renderCreateWorkOrder();
  const parent = parentAssetFor(asset);
  const children = childAssetsFor(asset.id);
  const assetWorkOrders = workOrders.filter((workOrder) => workOrder.asset_id === asset.id);
  const openWork = assetWorkOrders.filter((workOrder) => workOrder.status !== "completed");
  const completedWork = assetWorkOrders.filter((workOrder) => workOrder.status === "completed");
  const assetSchedules = preventiveSchedules.filter((schedule) => schedule.asset_id === asset.id);
  const usedParts = Object.values(partsUsedByWorkOrder)
    .flat()
    .filter((row) => assetWorkOrders.some((workOrder) => workOrder.id === row.work_order_id));

  return `
    <div class="detail-stack">
      <div>
        <div class="chip-row">
          <span class="chip asset-${asset.status}">${escapeHtml(asset.status)}</span>
          <span class="chip">${escapeHtml(assetTypeLabel(asset.asset_type))}</span>
          ${asset.asset_code ? `<span class="chip">${escapeHtml(asset.asset_code)}</span>` : ""}
          ${asset.safety_devices_required === false ? `<span class="chip">no safety check</span>` : `<span class="chip overdue">safety check required</span>`}
        </div>
        <h2>${escapeHtml(asset.name)}</h2>
        <p>${escapeHtml(asset.location || "No location set")}</p>
        ${parent ? `<p>Part of <button class="text-button inline-link-button" data-open-asset="${escapeHtml(parent.id)}" type="button">${escapeHtml(parent.name)}</button></p>` : ""}
      </div>

      <div class="quick-actions detail-quick-actions">
        <button class="assign-action" data-quick-fix-asset="${asset.id}" type="button">Quick Fix for this equipment</button>
      </div>

      <form class="form-grid" id="edit-asset-form">
        <label>Equipment name<input name="name" required value="${escapeHtml(asset.name)}"></label>
        <label>Equipment ID<input name="asset_code" value="${escapeHtml(asset.asset_code || "")}"></label>
        <label>Type
          <select name="asset_type">
            ${ASSET_TYPE_OPTIONS.map((type) => `<option value="${type}" ${type === (asset.asset_type || "machine") ? "selected" : ""}>${assetTypeLabel(type)}</option>`).join("")}
          </select>
        </label>
        <label>Part of
          <select name="parent_asset_id">
            <option value="">Top level equipment</option>
            ${renderParentAssetOptions(asset.parent_asset_id || "", asset.id)}
          </select>
        </label>
        <label>Location
          <select name="location_id" ${locations.length ? "" : "disabled"}>
            ${renderLocationOptions(asset.location_id || activeLocationId)}
          </select>
        </label>
        <label>Area / spot<input name="location" value="${escapeHtml(asset.location || "")}"></label>
        <label>Status
          <select name="status">
            ${["running", "watch", "degraded", "offline"].map((status) => `<option value="${status}" ${status === asset.status ? "selected" : ""}>${status}</option>`).join("")}
          </select>
        </label>
        <label class="check-row safety-check-toggle"><input name="safety_devices_required" type="checkbox" ${asset.safety_devices_required === false ? "" : "checked"}> Safety devices required before completion</label>
        <p class="error-text" id="asset-edit-error"></p>
        <button class="secondary-button asset-action-button" type="submit">Save Equipment</button>
      </form>

      <section>
        <h3>Linked Equipment</h3>
        <div class="mini-list asset-link-list">
          ${children.map((child) => `
            <article class="mini-work-order" data-open-asset="${escapeHtml(child.id)}">
              <strong>${escapeHtml(child.name)}</strong>
              <span>${escapeHtml(assetTypeLabel(child.asset_type))} - ${escapeHtml(child.status || "running")}</span>
            </article>
          `).join("") || `<p class="muted">No equipment is linked under this item yet.</p>`}
        </div>
      </section>

      <section>
        <h3>Open Work</h3>
        <div class="mini-list">
          ${openWork.map(renderAssetMiniWorkOrder).join("") || `<p class="muted">No open work for this equipment.</p>`}
        </div>
      </section>

      <section>
        <h3>Completed History</h3>
        <div class="mini-list">
          ${completedWork.map(renderAssetMiniWorkOrder).join("") || `<p class="muted">No completed work yet.</p>`}
        </div>
      </section>

      <section>
        <h3>PM Schedules</h3>
        <div class="mini-list">
          ${assetSchedules.map((schedule) => `<article><strong>${escapeHtml(schedule.title)}</strong><span>${schedule.frequency} - next due ${schedule.next_due_at}</span></article>`).join("") || `<p class="muted">No PM schedules for this equipment.</p>`}
        </div>
      </section>

      <section>
        <h3>Parts Used</h3>
        <div class="mini-list">
          ${usedParts.map((row) => `<article><strong>${escapeHtml(row.parts?.name || "Part")}</strong><span>${row.quantity_used} used</span></article>`).join("") || `<p class="muted">No parts history yet.</p>`}
        </div>
      </section>

      ${renderAssetDangerZone(asset)}
    </div>
  `;
}

function renderAssetDangerZone(asset) {
  const workCount = workOrders.filter((workOrder) => workOrder.asset_id === asset.id).length;
  const childCount = childAssetsFor(asset.id).length;
  const scheduleCount = preventiveSchedules.filter((schedule) => schedule.asset_id === asset.id).length;
  const requestCount = maintenanceRequests.filter((request) => request.asset_id === asset.id).length;
  const blockers = [
    workCount ? `${workCount} work order${workCount === 1 ? "" : "s"}` : "",
    childCount ? `${childCount} linked equipment item${childCount === 1 ? "" : "s"}` : "",
    scheduleCount ? `${scheduleCount} PM schedule${scheduleCount === 1 ? "" : "s"}` : "",
    requestCount ? `${requestCount} request${requestCount === 1 ? "" : "s"}` : "",
  ].filter(Boolean);
  const confirming = pendingDeleteAssetId === asset.id;
  if (!canDeleteEquipment()) {
    return `<p class="muted">Admins and managers can delete unused equipment.</p>`;
  }

  return `
    <section class="delete-zone asset-delete-zone">
      <div>
        <h3>Delete Equipment</h3>
        <p>${blockers.length
          ? `This equipment is kept for traceability because it has ${blockers.join(", ")}.`
          : `This permanently removes "${escapeHtml(asset.name)}" from the equipment list.`}</p>
      </div>
      <p class="error-text" id="asset-delete-error"></p>
      ${blockers.length ? `
        <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
      ` : confirming ? `
        <div class="delete-warning-panel">
          <strong>Permanent Delete Warning</strong>
          <p>You are about to permanently delete "${escapeHtml(asset.name)}". This cannot be undone.</p>
          <div class="button-row">
            <button class="secondary-button" data-cancel-delete-asset type="button">Cancel</button>
            <button class="danger-action-button confirm-delete-button" data-confirm-delete-asset="${escapeHtml(asset.id)}" type="button">Permanently Delete</button>
          </div>
        </div>
      ` : `
        <button class="danger-action-button large-delete-button" data-delete-asset="${escapeHtml(asset.id)}" type="button">Delete Equipment</button>
      `}
    </section>
  `;
}

function renderMiniWorkOrder(workOrder) {
  return `
    <article class="mini-work-order" data-mini-work-order="${workOrder.id}">
      <strong>${escapeHtml(workOrder.title)}</strong>
      <span>${statusLabel(workOrder.status)} · ${workOrder.due_at || "no due date"}</span>
    </article>
  `;
}

function renderAssetMiniWorkOrder(workOrder) {
  const partsCount = (partsUsedByWorkOrder[workOrder.id] || []).length;
  const photosCount = (photosByWorkOrder[workOrder.id] || []).length;
  const completedDate = workOrder.completed_at ? new Date(workOrder.completed_at).toLocaleDateString() : "";
  const outcome = workOrder.resolution_summary || workOrder.completion_notes || "";
  return `
    <article class="mini-work-order ${workOrder.status === "completed" ? "completed-history" : ""}" data-mini-work-order="${workOrder.id}">
      <div class="chip-row">
        <span class="chip ${workOrder.status}">${statusLabel(workOrder.status)}</span>
        ${workOrder.follow_up_needed ? `<span class="chip blocked">follow-up</span>` : ""}
        ${partsCount ? `<span class="relationship-chip parts">${relationshipIcon("parts")}<span>${partsCount}</span></span>` : ""}
        ${photosCount ? `<span class="relationship-chip photo">${relationshipIcon("photo")}<span>${photosCount}</span></span>` : ""}
      </div>
      <strong>${escapeHtml(workOrder.title)}</strong>
      <span>${completedDate ? `Completed ${completedDate}` : `Due ${workOrder.due_at || "unset"}`}</span>
      ${workOrder.failure_cause ? `<p><b>Finding:</b> ${escapeHtml(workOrder.failure_cause)}</p>` : ""}
      ${outcome ? `<p><b>Resolution:</b> ${escapeHtml(outcome)}</p>` : ""}
    </article>
  `;
}

function renderPreventiveSchedule(schedule) {
  const dueState = getDueState({ due_at: schedule.next_due_at, status: "open" });
  return `
    <article class="pm-card">
      <div>
        <div class="chip-row">
          <span class="chip">${escapeHtml(schedule.frequency)}</span>
          ${dueState ? `<span class="chip ${dueState.className}">${dueState.label}</span>` : ""}
        </div>
        <h3>${escapeHtml(schedule.title)}</h3>
        <p>${escapeHtml(schedule.assets?.name || "No equipment")} - Next due ${schedule.next_due_at}</p>
      </div>
      <button class="secondary-button" data-generate-pm="${schedule.id}" type="button">Generate Work</button>
    </article>
  `;
}

function renderProcedureTemplate(template) {
  return `
    <article class="procedure-card">
      <div>
        <div class="chip-row">
          <span class="chip">${template.procedure_steps?.length || 0} steps</span>
          <span class="chip">${workOrders.filter((workOrder) => workOrder.procedure_template_id === template.id).length} linked work orders</span>
        </div>
        <h3>${escapeHtml(template.name)}</h3>
        <p>${escapeHtml(template.description || "No description.")}</p>
      </div>
      <div class="checklist-list">
        ${(template.procedure_steps || []).map((step) => `
          <div class="checklist-step">
            <span>${step.position}. ${escapeHtml(step.prompt)}</span>
            <small>${escapeHtml(step.response_type)} ${step.required ? "- required" : "- optional"}</small>
          </div>
        `).join("") || `<p class="muted">No steps yet.</p>`}
      </div>
      <form class="inline-form add-step-form relationship-detail procedure" data-add-step="${template.id}">
        <input name="prompt" required placeholder="Step prompt">
        <select name="response_type">
          <option value="checkbox">Checkbox</option>
          <option value="pass_fail">Pass / Fail</option>
          <option value="number">Number</option>
          <option value="text">Text</option>
        </select>
        <select name="required">
          <option value="true">Required</option>
          <option value="false">Optional</option>
        </select>
        <p class="error-text" data-step-error="${template.id}"></p>
        <button class="secondary-button" type="submit">Add Step</button>
      </form>
    </article>
  `;
}

function renderProcedureOptions(selectedId = "") {
  if (!proceduresReady) return `<option value="">No procedure</option>`;
  return `
    <option value="">No procedure</option>
    ${procedureTemplates.map((template) => `<option value="${template.id}" ${template.id === selectedId ? "selected" : ""}>${escapeHtml(template.name)}</option>`).join("")}
  `;
}

function procedureColumn(value) {
  return proceduresReady ? { procedure_template_id: value || null } : {};
}

function isProcedureSchemaError(error) {
  const message = error?.message || "";
  return Boolean(message.includes("procedure_template_id") || message.includes("procedure_templates") || message.includes("procedure_steps"));
}

function isAssetHierarchySchemaError(error) {
  return isColumnSchemaError(error, ["parent_asset_id", "asset_type", "safety_devices_required", "safety_check_required"]);
}

function equipmentSchemaMessage(error) {
  const message = error?.message || "";
  if (message.includes("assets_asset_type_check") || message.includes("asset_type")) {
    return "Run supabase/step-next-asset-type-shop-item.sql before saving Shop Item equipment.";
  }
  return "Run supabase/step-next-asset-hierarchy.sql before saving equipment hierarchy.";
}

function isColumnSchemaError(error, columns) {
  const message = error?.message || "";
  return columns.some((column) => message.includes(column));
}

function withSetupError(response, message) {
  return {
    ...response,
    error: {
      ...(response.error || {}),
      message,
      originalMessage: response.error?.message || "",
    },
  };
}

function markSchemaReadiness(error) {
  if (isMissingColumnError(error, "location_id") || error?.message?.includes("locations")) locationsReady = false;
  if (isProcedureSchemaError(error)) proceduresReady = false;
  if (isColumnSchemaError(error, ["safety_devices_checked", "safety_devices_checked_at", "safety_check_required"])) safetyChecksReady = false;
}

function databaseSetupRequiredMessage(area = "this save") {
  return `Database update required before ${area}. Run the current Supabase SQL steps from docs/supabase-architecture.md, then refresh and try again.`;
}

const WORK_ORDER_SCHEMA_FIELDS = [
  "location_id",
  "assigned_to",
  "procedure_template_id",
  "actual_minutes",
  "failure_cause",
  "resolution_summary",
  "follow_up_needed",
  "completion_notes",
  "completed_at",
  "safety_devices_checked",
  "safety_devices_checked_at",
  "safety_check_required",
];

async function insertWithOptionalProcedure(table, payload, options = {}) {
  let query = supabaseClient.from(table).insert(payload);
  if (options.returnSingle) query = query.select().single();
  const response = await query;
  if (!response.error) return response;
  const setupColumns = table === "work_orders" ? WORK_ORDER_SCHEMA_FIELDS : ["location_id", "procedure_template_id"];
  if (isColumnSchemaError(response.error, setupColumns)) {
    markSchemaReadiness(response.error);
    return withSetupError(response, databaseSetupRequiredMessage(`saving ${table.replaceAll("_", " ")}`));
  }
  return response;
}

async function updateWithOptionalProcedure(table, payload, id) {
  const response = await supabaseClient
    .from(table)
    .update(payload)
    .eq("id", id)
    .eq("company_id", activeCompanyId);
  if (response.error && isColumnSchemaError(response.error, ["location_id", "procedure_template_id"])) {
    markSchemaReadiness(response.error);
    return withSetupError(response, databaseSetupRequiredMessage(`saving ${table.replaceAll("_", " ")}`));
  }
  return response;
}

async function updateWorkOrderSafely(payload, id) {
  const response = await updateWithOptionalProcedure("work_orders", payload, id);
  if (response.error && isColumnSchemaError(response.error, WORK_ORDER_SCHEMA_FIELDS)) {
    markSchemaReadiness(response.error);
    return withSetupError(response, databaseSetupRequiredMessage("saving work order details"));
  }
  return response;
}

function renderChecklistStep(workOrder, step) {
  const result = stepResultsByWorkOrder[workOrder.id]?.[step.id];
  const value = result?.value || "";
  const baseAttrs = `data-step-result="${step.id}" data-work-order-id="${workOrder.id}"`;
  let control = `<input ${baseAttrs} value="${escapeHtml(value)}" placeholder="Result">`;

  if (step.response_type === "checkbox") {
    control = `<label class="check-row"><input ${baseAttrs} type="checkbox" ${value === "checked" ? "checked" : ""}> Done</label>`;
  }

  if (step.response_type === "pass_fail") {
    control = `
      <select ${baseAttrs}>
        <option value="">Not checked</option>
        <option value="pass" ${value === "pass" ? "selected" : ""}>Pass</option>
        <option value="fail" ${value === "fail" ? "selected" : ""}>Fail</option>
      </select>
    `;
  }

  if (step.response_type === "number") {
    control = `<input ${baseAttrs} type="number" value="${escapeHtml(value)}" placeholder="Reading">`;
  }

  return `
    <div class="checklist-step relationship-detail procedure">
      <span>${step.position}. ${escapeHtml(step.prompt)} ${step.required ? `<small class="required-mark">Required</small>` : ""}</span>
      ${control}
      ${result?.completed_at ? `<small>Recorded ${new Date(result.completed_at).toLocaleString()}</small>` : ""}
    </div>
  `;
}

function checklistProgress(workOrder, procedure) {
  const steps = procedure.procedure_steps || [];
  const results = stepResultsByWorkOrder[workOrder.id] || {};
  const done = steps.filter((step) => Boolean(results[step.id]?.value)).length;
  return { done, total: steps.length };
}

function requiredChecklistProgress(workOrder, procedure) {
  const steps = (procedure?.procedure_steps || []).filter((step) => step.required);
  const results = stepResultsByWorkOrder[workOrder.id] || {};
  const done = steps.filter((step) => Boolean(results[step.id]?.value)).length;
  return { done, total: steps.length };
}

function renderMember(member) {
  const profile = profilesByUserId[member.user_id];
  const isCurrentUser = member.user_id === session.user.id;
  const canEditRole = canManageTeam() && !isCurrentUser;
  const workload = teamMemberWorkload(member.user_id);
  return `
    <article class="member-card">
      <div>
        <strong>${escapeHtml(profile?.full_name || (isCurrentUser ? session.user.email : member.user_id))}</strong>
        <p>${escapeHtml(roleDescription(member.role))}</p>
        <p>${isCurrentUser ? escapeHtml(session.user.email || member.user_id) : escapeHtml(member.user_id)}</p>
        <div class="member-workload">
          <span class="chip open">${workload.newWork} New</span>
          <span class="chip in_progress">${workload.inProgress} In Progress</span>
          <span class="chip blocked">${workload.blocked} Blocked</span>
          ${workload.overdue ? `<span class="chip overdue">${workload.overdue} Overdue</span>` : ""}
        </div>
      </div>
      <div class="member-card-actions">
        <button class="secondary-button view-member-work-button" data-view-member-work="${member.user_id}" type="button">View Work</button>
        ${canEditRole ? `
          <form class="member-role-form" data-member-role="${member.user_id}">
            <select name="role" aria-label="Role for ${escapeHtml(profile?.full_name || member.user_id)}">
              ${["technician", "manager", "member", "admin"].map((role) => `<option value="${role}" ${role === member.role ? "selected" : ""}>${roleLabel(role)}</option>`).join("")}
            </select>
            <button class="secondary-button" type="submit">Save Role</button>
          </form>
        ` : `<span class="chip">${escapeHtml(roleLabel(member.role))}</span>`}
      </div>
    </article>
  `;
}

function teamMemberWorkload(userId) {
  const assigned = workOrders.filter((workOrder) => matchesActiveLocation(workOrder) && workOrder.assigned_to === userId);
  return {
    newWork: assigned.filter((workOrder) => workOrder.status === "open").length,
    inProgress: assigned.filter((workOrder) => workOrder.status === "in_progress").length,
    blocked: assigned.filter((workOrder) => workOrder.status === "blocked").length,
    overdue: assigned.filter((workOrder) => getDueState(workOrder)?.className === "overdue").length,
  };
}

function renderMyProfileForm() {
  const profile = profilesByUserId[session.user.id] || {};
  return `
    <form class="team-profile-form relationship-detail comment" id="profile-form">
      <div>
        <h3>My Profile</h3>
        <p class="muted">${escapeHtml(session.user.email || "Signed in user")}</p>
      </div>
      <label>Display name<input name="full_name" value="${escapeHtml(profile.full_name || "")}" placeholder="Name shown on work orders"></label>
      <p class="error-text" id="profile-error"></p>
      <button class="secondary-button" type="submit">Save Profile</button>
    </form>
  `;
}

function renderRoleGuide() {
  return `
    <section class="team-role-guide">
      ${["technician", "manager", "member", "admin"].map((role) => `
        <article>
          <strong>${roleLabel(role)}</strong>
          <span>${escapeHtml(roleDescription(role))}</span>
        </article>
      `).join("")}
    </section>
  `;
}

function renderTeamInviteForm() {
  return `
    <form class="team-invite-form relationship-detail comment" id="team-invite-form">
      <div>
        <h3>Invite Teammate</h3>
        <p class="muted">They sign up with this email, then the app adds them to this company automatically.</p>
      </div>
      <label>Email<input name="email" type="email" required placeholder="tech@company.com" ${teamInvitesReady ? "" : "disabled"}></label>
      <label>Role
        <select name="role" ${teamInvitesReady ? "" : "disabled"}>
          <option value="technician">Technician</option>
          <option value="manager">Manager</option>
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <p class="error-text" id="team-invite-error">${teamInvitesReady ? "" : "Run supabase/step-next-team-invites.sql before inviting by email."}</p>
      <button class="secondary-button" type="submit" ${teamInvitesReady ? "" : "disabled"}>Create Invite</button>
    </form>
  `;
}

function renderTeamInvites() {
  const pending = teamInvites.filter((invite) => !invite.accepted_at);
  return `
    <section class="team-invites">
      <div class="panel-header compact">
        <h3>Pending Invites</h3>
        <span>${pending.length}</span>
      </div>
      <div class="member-list">
        ${pending.map((invite) => `
          <article class="member-card invite-card">
            <div>
              <strong>${escapeHtml(invite.email)}</strong>
              <p>Sent ${new Date(invite.created_at).toLocaleString()}</p>
            </div>
            <span class="chip">${escapeHtml(invite.role)}</span>
          </article>
        `).join("") || `<p class="muted">No pending invites.</p>`}
      </div>
    </section>
  `;
}

function renderMessageCenter() {
  if (!messagesReady) {
    return `<p class="muted">Run supabase/step-next-message-center.sql to enable company, location, and direct message threads.</p>`;
  }

  const activeThread = messageThreads.find((thread) => thread.id === activeMessageThreadId) || messageThreads[0];
  const threadMessages = activeThread ? (messagesByThreadId[activeThread.id] || []) : [];
  const visibleThreads = filteredMessageThreads();
  const linkedDraftWorkOrder = workOrders.find((workOrder) => workOrder.id === messageComposerWorkOrderId);

  return `
    <section class="message-center">
      <div class="message-layout">
        <aside class="message-thread-rail">
          <div class="message-rail-header">
            <div>
              <h3>Messages</h3>
              <p>${totalUnreadMessages()} unread</p>
            </div>
          </div>
          <form class="message-thread-form" id="message-thread-form">
            <details ${messageComposerOpen || linkedDraftWorkOrder ? "open" : ""}>
              <summary>New message</summary>
              <div class="message-thread-fields">
                <label>Send to
                  <select name="thread_type" id="message-thread-type">
                    <option value="company">Whole company</option>
                    <option value="location">Current location</option>
                    <option value="direct">Direct message</option>
                  </select>
                </label>
                <label class="message-direct-field">Person
                  <select name="direct_user_id">
                    ${companyMembers.filter((member) => member.user_id !== session.user.id).map((member) => `<option value="${member.user_id}">${escapeHtml(teamMemberName(member.user_id))}</option>`).join("") || `<option value="">No teammates yet</option>`}
                  </select>
                </label>
                <div class="message-scope-note" id="message-scope-note">${messageComposerScopeNote("company")}</div>
                <label>Subject<input name="title" required placeholder="Thread subject" value="${linkedDraftWorkOrder ? `Work order: ${escapeHtml(linkedDraftWorkOrder.title)}` : ""}"></label>
                ${linkedDraftWorkOrder ? `
                  <input name="work_order_id" type="hidden" value="${linkedDraftWorkOrder.id}">
                  <div class="message-linked-draft">
                    <span>Linked work order</span>
                    <strong>${escapeHtml(linkedDraftWorkOrder.title)}</strong>
                    <button class="text-button" data-clear-message-work-link type="button">Clear</button>
                  </div>
                ` : `
                  <label>Recent work order
                    <select name="work_order_id" ${messageWorkOrderLinksReady ? "" : "disabled"}>
                      <option value="">No work order</option>
                      ${recentMessageLinkWorkOrders().map((workOrder) => `<option value="${workOrder.id}">${escapeHtml(workOrder.title)} - ${statusLabel(workOrder.status)}</option>`).join("")}
                    </select>
                  </label>
                `}
                <label>Message<textarea name="body" rows="3" required placeholder="Type the first message..."></textarea></label>
                <p class="error-text" id="message-thread-error">${messageWorkOrderLinksReady ? "" : "Run supabase/step-next-message-work-order-links.sql before linking threads to work orders."}</p>
                <button class="secondary-button message-action-button" type="submit">Start Thread</button>
              </div>
            </details>
          </form>
          <label class="message-search">
            <input id="message-search" type="search" value="${escapeHtml(messageSearchQuery)}" placeholder="Search messages">
          </label>
          <div class="message-filter-bar" aria-label="Message thread filter">
            ${[
              ["all", "All"],
              ["unread", "Unread"],
              ["company", "Company"],
              ["location", "Location"],
              ["direct", "Direct"],
            ].map(([id, label]) => `<button class="${messageThreadFilter === id ? "active" : ""}" data-message-filter="${id}" type="button">${label}</button>`).join("")}
          </div>
          <div class="message-thread-list">
            ${visibleThreads.map(renderMessageThreadButton).join("") || `<p class="muted">No threads match this filter.</p>`}
          </div>
        </aside>
        <section class="message-thread-detail">
          ${activeThread ? `
            <div class="message-chat-header">
              <div>
                <h3>${escapeHtml(activeThread.title)}</h3>
                <p class="muted">${messageThreadScopeLabel(activeThread)}</p>
              </div>
              <div class="message-header-actions">
                ${activeThread.work_order_id ? `<button class="secondary-button message-linked-work-button" data-open-linked-work-order="${activeThread.work_order_id}" type="button">Open Work Order</button>` : ""}
                <span class="chip comment">${threadMessages.length} message${threadMessages.length === 1 ? "" : "s"}</span>
              </div>
            </div>
            <div class="message-list">
              ${renderMessageList(threadMessages)}
            </div>
            <form class="message-reply-form" id="message-reply-form" data-thread-id="${activeThread.id}">
              <div class="message-quick-replies">
                ${["On it", "Need more info", "Waiting on parts", "Complete"].map((reply) => `<button data-quick-reply="${escapeHtml(reply)}" type="button">${escapeHtml(reply)}</button>`).join("")}
              </div>
              <textarea name="body" rows="2" required placeholder="Reply to this thread..."></textarea>
              <p class="error-text" id="message-reply-error"></p>
              <button class="secondary-button message-action-button" type="submit">Send Reply</button>
            </form>
          ` : `<p class="muted">Choose or start a thread.</p>`}
        </section>
      </div>
    </section>
  `;
}

function renderMessageThreadButton(thread) {
  const messages = messagesByThreadId[thread.id] || [];
  const lastMessage = messages[messages.length - 1];
  return `
    <button class="message-thread-button ${thread.id === activeMessageThreadId ? "active" : ""}" data-message-thread="${thread.id}" type="button">
      <strong>${escapeHtml(thread.title)}${unreadMessageCount(thread.id) ? `<span class="message-unread-pill">${unreadMessageCount(thread.id)}</span>` : ""}</strong>
      <span>${escapeHtml(messageThreadScopeLabel(thread))}</span>
      <small>${lastMessage ? `${escapeHtml(teamMemberName(lastMessage.sender_id))}: ${escapeHtml(lastMessage.body)} · ${escapeHtml(formatMessageTime(lastMessage.created_at))}` : "No messages yet"}</small>
    </button>
  `;
}

function renderMessageBubble(message) {
  const mine = message.sender_id === session.user.id;
  const senderName = teamMemberName(message.sender_id);
  return `
    <article class="message-bubble ${mine ? "mine" : ""}">
      <span class="message-avatar" aria-hidden="true">${escapeHtml(initials(senderName))}</span>
      <div>
        <strong>${escapeHtml(senderName)}</strong>
        <span>${escapeHtml(formatMessageTime(message.created_at))}</span>
      </div>
      <p>${escapeHtml(message.body)}</p>
    </article>
  `;
}

function renderMessageList(messages) {
  if (!messages.length) return `<p class="muted">No messages yet.</p>`;
  let lastDay = "";
  return messages.map((message) => {
    const day = formatMessageDay(message.created_at);
    const divider = day !== lastDay ? `<div class="message-day-divider"><span>${escapeHtml(day)}</span></div>` : "";
    lastDay = day;
    return `${divider}${renderMessageBubble(message)}`;
  }).join("");
}

function messageThreadScopeLabel(thread) {
  if (thread.thread_type === "direct") return directThreadNames(thread);
  if (thread.thread_type === "location") return locations.find((location) => location.id === thread.location_id)?.name || "Location thread";
  return "Whole company";
}

function directThreadNames(thread) {
  const members = messageThreadMembers
    .filter((member) => member.thread_id === thread.id)
    .map((member) => teamMemberName(member.user_id));
  return members.length ? members.join(", ") : "Direct message";
}

function messageThreadMembersForType(threadType, directUserId) {
  if (threadType === "direct") return [session.user.id, directUserId].filter(Boolean);
  return companyMembers.map((member) => member.user_id);
}

function recentMessageLinkWorkOrders() {
  return workOrders
    .filter((workOrder) => matchesActiveLocation(workOrder) && workOrder.status !== "completed")
    .slice(0, 8);
}

function filteredMessageThreads() {
  return messageThreads.filter((thread) => {
    const filterMatch =
      messageThreadFilter === "all" ||
      (messageThreadFilter === "unread" && unreadMessageCount(thread.id) > 0) ||
      thread.thread_type === messageThreadFilter;
    return filterMatch && matchesQuery(messageThreadSearchValues(thread), messageSearchQuery);
  });
}

function messageThreadSearchValues(thread) {
  const messages = messagesByThreadId[thread.id] || [];
  const participants = messageThreadMembers
    .filter((member) => member.thread_id === thread.id)
    .map((member) => teamMemberName(member.user_id));
  return [
    thread.title,
    messageThreadScopeLabel(thread),
    ...participants,
    ...messages.map((message) => message.body),
  ];
}

function formatMessageTime(value) {
  if (!value) return "";
  const date = new Date(value);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const messageDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const time = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (messageDay === today) return `Today ${time}`;
  if (messageDay === today - 86400000) return `Yesterday ${time}`;
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function formatMessageDay(value) {
  if (!value) return "";
  const date = new Date(value);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const messageDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  if (messageDay === today) return "Today";
  if (messageDay === today - 86400000) return "Yesterday";
  return date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
}

function initials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "MO";
  return parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function messageComposerScopeNote(threadType) {
  if (threadType === "direct") return "Only you and the selected teammate will see this thread.";
  if (threadType === "location") return `Visible to company members. Tagged to ${activeLocationName()}.`;
  return "Visible to everyone in this company.";
}

function unreadMessageCount(threadId) {
  const lastReadAt = messageReadsByThreadId[threadId]?.last_read_at;
  const lastReadTime = lastReadAt ? new Date(lastReadAt).getTime() : 0;
  return (messagesByThreadId[threadId] || []).filter((message) => {
    if (message.sender_id === session.user.id) return false;
    return new Date(message.created_at).getTime() > lastReadTime;
  }).length;
}

function totalUnreadMessages() {
  return messageThreads.reduce((total, thread) => total + unreadMessageCount(thread.id), 0);
}

function setupItems() {
  return [
    {
      name: "Supabase config",
      ready: Boolean(window.SUPABASE_URL && window.SUPABASE_ANON_KEY),
      detail: window.SUPABASE_URL || "Missing supabase-config.js",
    },
    {
      name: "Company data",
      ready: Boolean(activeCompanyId),
      detail: activeCompanyId ? "Active tenant selected" : "Create or select a company",
    },
    {
      name: "Requests",
      ready: requestsReady,
      detail: requestsReady ? "Stored in maintenance_requests" : "Run step-next-maintenance-requests.sql",
    },
    {
      name: "Public request QR links",
      ready: publicRequestLinksReady,
      detail: publicRequestLinksReady ? "External location intake is available" : "Run step-next-public-request-links.sql",
    },
    {
      name: "Preventive schedules",
      ready: schedulesReady,
      detail: schedulesReady ? "PM schedules available" : "Run step-next-preventive-schedules.sql",
    },
    {
      name: "Procedures",
      ready: proceduresReady,
      detail: proceduresReady ? "Procedure templates available" : "Run step-next-procedures.sql",
    },
    {
      name: "Part costs",
      ready: partCostsReady,
      detail: partCostsReady ? "Unit costs available" : "Run step-next-part-costs.sql",
    },
    {
      name: "Part sources",
      ready: partSuppliersReady,
      detail: partSuppliersReady ? "Vendor/source names available" : "Run step-next-part-suppliers.sql",
    },
    {
      name: "Part files",
      ready: partDocumentsReady,
      detail: partDocumentsReady ? "Receipts and invoices can be filed with parts" : "Run step-next-part-documents.sql",
    },
    {
      name: "Message center",
      ready: messagesReady,
      detail: messagesReady ? "Company, location, and direct message threads available" : "Run step-next-message-center.sql",
    },
    {
      name: "Message work links",
      ready: messageWorkOrderLinksReady,
      detail: messageWorkOrderLinksReady ? "Message threads can link back to work orders" : "Run step-next-message-work-order-links.sql",
    },
    {
      name: "Work outcomes",
      ready: outcomesReady,
      detail: outcomesReady ? "Cause/resolution/follow-up available" : "Run step-next-work-order-outcomes.sql",
    },
    {
      name: "Safety checks",
      ready: safetyChecksReady,
      detail: safetyChecksReady ? "Asset safety check completion available" : "Run step-next-safety-checks.sql",
    },
    {
      name: "Admin delete protection",
      ready: adminDeleteSqlConfirmed,
      detail: adminDeleteSqlConfirmed
        ? "Admin-only delete SQL marked applied"
        : "Run step-next-admin-delete-work-orders.sql, then mark it applied",
      action: adminDeleteSqlConfirmed ? "" : "confirm-admin-delete-sql",
      actionLabel: "Mark SQL Applied",
    },
    {
      name: "Photos",
      ready: photosReady,
      detail: photosReady ? "Photo records available" : "Check storage bucket and photo table policies",
    },
  ];
}

function renderSetupItem(item) {
  return `
    <article class="setup-item ${item.ready ? "ready" : "needs-work"}">
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <span>${escapeHtml(item.detail)}</span>
        ${item.action ? `<button class="secondary-button setup-action-button" data-setup-action="${escapeHtml(item.action)}" type="button">${escapeHtml(item.actionLabel)}</button>` : ""}
      </div>
      <span class="chip ${item.ready ? "completed" : "blocked"}">${item.ready ? "ready" : "setup"}</span>
    </article>
  `;
}

function renderPart(part) {
  const quantity = Number(part.quantity_on_hand) || 0;
  const reorderPoint = Number(part.reorder_point) || 0;
  const unitCost = Number(part.unit_cost) || 0;
  const documents = partDocumentsByPartId[part.id] || [];
  const low = quantity <= reorderPoint;
  const restockNeed = Math.max(0, reorderPoint - quantity);
  return `
    <article class="part-card ${low ? "low-stock" : ""}">
      <div>
        <div class="chip-row">
          ${part.sku ? `<span class="chip">${escapeHtml(part.sku)}</span>` : ""}
          ${part.supplier_name ? `<span class="chip part-source-chip">${escapeHtml(part.supplier_name)}</span>` : ""}
          ${low ? `<span class="chip overdue">low stock</span>` : `<span class="chip open">stocked</span>`}
        </div>
        <h3>${escapeHtml(part.name)}</h3>
        <p>${quantity} on hand - reorder at ${reorderPoint}</p>
        <p>${partCostsReady ? `${money(unitCost)} listed cost` : "Cost reference not active yet"}</p>
        ${low && reorderPoint > 0 ? `<small>Need ${restockNeed} to reach reorder point.</small>` : ""}
      </div>
      <div class="part-card-actions">
        <form class="part-quantity-form use-part-form" data-use-part="${part.id}">
          <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Use quantity for ${escapeHtml(part.name)}">
          <button class="secondary-button use-part-button" type="submit">Use</button>
        </form>
        <form class="part-quantity-form restock-form" data-restock-part="${part.id}">
          <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Restock quantity for ${escapeHtml(part.name)}">
          <button class="secondary-button" type="submit">Restock</button>
        </form>
      </div>
      <p class="part-file-count">${documents.length} filed receipt${documents.length === 1 ? "" : "s"} / invoice${documents.length === 1 ? "" : "s"}</p>
      <button class="secondary-button part-edit-button" data-open-part="${part.id}" type="button">Edit Part</button>
    </article>
  `;
}

function renderPartDetail() {
  const part = parts.find((item) => item.id === activePartId);
  if (!part) {
    activePartId = null;
    return `<p class="muted">Part not found.</p>`;
  }
  const quantity = Number(part.quantity_on_hand) || 0;
  const reorderPoint = Number(part.reorder_point) || 0;
  const unitCost = Number(part.unit_cost) || 0;
  const documents = partDocumentsByPartId[part.id] || [];
  return `
    <section class="part-detail-shell">
      ${renderPartSourceOptions()}
      <div class="part-detail-summary relationship-detail parts">
        <button class="secondary-button part-back-button" data-close-part-detail type="button">Back to parts</button>
        <div>
          <div class="chip-row">
            ${part.sku ? `<span class="chip">${escapeHtml(part.sku)}</span>` : ""}
            ${part.supplier_name ? `<span class="chip part-source-chip">${escapeHtml(part.supplier_name)}</span>` : ""}
            <span class="chip ${quantity <= reorderPoint ? "overdue" : "open"}">${quantity <= reorderPoint ? "low stock" : "stocked"}</span>
          </div>
          <h3>${escapeHtml(part.name)}</h3>
          <p>${quantity} on hand - reorder at ${reorderPoint}</p>
        </div>
      </div>

      <form class="part-detail-form relationship-detail parts" data-edit-part="${part.id}">
        <label>Name<input name="name" required value="${escapeHtml(part.name)}"></label>
        <label>SKU<input name="sku" value="${escapeHtml(part.sku || "")}"></label>
        <label>Source / vendor<input name="supplier_name" list="part-source-options" value="${escapeHtml(part.supplier_name || "")}" placeholder="Where this part usually comes from"><button class="text-button danger-link inline-label-action" data-toggle-part-sources type="button">Edit sources</button></label>
        <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="${quantity}"></label>
        <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="${reorderPoint}"></label>
        <label>Listed unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="${unitCost}"></label>
        <p class="error-text" data-part-edit-error="${part.id}"></p>
        <div class="button-row">
          <button class="secondary-button" type="submit">Save Part</button>
          <button class="text-button" data-close-part-detail type="button">Cancel</button>
        </div>
      </form>

      ${showPartSourceManager ? renderPartSourceManager() : ""}

      <section class="part-detail-files relationship-detail parts">
        <div class="panel-header compact">
          <h3>Filed Receipts / Invoices</h3>
          <span>${documents.length} file${documents.length === 1 ? "" : "s"}</span>
        </div>
        <form class="part-document-form" data-part-document="${part.id}">
          <label>Attach file<input name="document" type="file" accept="image/*,.pdf"></label>
          <p class="error-text" data-part-document-error="${part.id}">${partDocumentsReady ? "" : "Run supabase/step-next-part-documents.sql before attaching files."}</p>
          <button class="secondary-button" type="submit" ${partDocumentsReady ? "" : "disabled"}>Attach File</button>
        </form>
        <div class="mini-list part-document-list">
          ${documents.map((document) => `
            <article>
              <strong>${escapeHtml(document.file_name)}</strong>
              <span>${new Date(document.created_at).toLocaleString()}</span>
              ${document.signedUrl ? `<a href="${document.signedUrl}" target="_blank" rel="noreferrer">Open file</a>` : ""}
            </article>
          `).join("") || `<p class="muted">No receipts or invoices filed with this part.</p>`}
        </div>
      </section>

      ${renderPartDangerZone(part)}
    </section>
  `;
}

function renderPartDangerZone(part) {
  const usageCount = partUsageRows(part.id).length;
  const documents = partDocumentsByPartId[part.id] || [];
  const confirming = pendingDeletePartId === part.id;
  if (!canDeleteParts()) {
    return `<p class="muted">Admins and managers can delete unused parts.</p>`;
  }

  return `
    <section class="delete-zone part-delete-zone">
      <div>
        <h3>Delete Part</h3>
        <p>${usageCount
          ? `This part has ${usageCount} usage record${usageCount === 1 ? "" : "s"} tied to work order history, so it cannot be deleted.`
          : `This permanently removes the part${documents.length ? ` and ${documents.length} filed receipt/invoice record${documents.length === 1 ? "" : "s"}` : ""}.`}</p>
      </div>
      <p class="error-text" id="part-delete-error"></p>
      ${usageCount ? `
        <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
      ` : confirming ? `
        <div class="delete-warning-panel">
          <strong>Permanent Delete Warning</strong>
          <p>You are about to permanently delete "${escapeHtml(part.name)}". This cannot be undone.</p>
          <div class="button-row">
            <button class="secondary-button" data-cancel-delete-part type="button">Cancel</button>
            <button class="danger-action-button confirm-delete-button" data-confirm-delete-part="${escapeHtml(part.id)}" type="button">Permanently Delete</button>
          </div>
        </div>
      ` : `
        <button class="danger-action-button large-delete-button" data-delete-part="${escapeHtml(part.id)}" type="button">Delete Part</button>
      `}
    </section>
  `;
}

function renderPartsHealth() {
  const locationParts = parts.filter(matchesActiveLocation);
  const lowCount = locationParts.filter(isLowStockPart).length;
  return [
    ["All Parts", locationParts.length, "all"],
    ["Low Stock", lowCount, "low"],
  ].map(([label, value, filter]) => `
    <button class="parts-health ${filter === "low" && value ? "attention" : ""} ${partInventoryFilter === filter ? "active" : ""}" data-part-inventory-filter="${filter}" type="button">
      <span>${label}</span>
      <strong>${value}</strong>
    </button>
  `).join("");
}

function renderPublicRequestLinkManager() {
  if (!canManageTeam()) return "";
  const publicBaseUrl = publicAppBaseUrl();
  return `
    <section class="settings-summary public-request-links">
      <div class="settings-section-heading">
        <h3>Location Request QR Links</h3>
        <p class="muted">Post these QR codes so operators can submit a location-specific request without app access.</p>
      </div>
      <form class="form-grid settings-form public-app-url-form" id="public-app-url-form">
        <label>Public MaintainOps URL
          <input name="public_app_url" value="${escapeHtml(publicAppUrlOverride || String(window.PUBLIC_APP_URL || ""))}" placeholder="https://loufish727.github.io/your-maintainops-repo/">
        </label>
        <button class="secondary-button request-action-button" type="submit">Save URL</button>
      </form>
      <p class="muted">Use the exact GitHub Pages URL where MaintainOps opens. Do not use the root URL if that opens another app.</p>
      ${publicBaseUrl ? `<p class="muted">QR codes will point to ${escapeHtml(publicBaseUrl)}</p>` : `<p class="warning-text">Set the public MaintainOps URL before copying or printing QR codes from this local app.</p>`}
      <p class="error-text" id="public-request-link-error">${publicRequestLinksReady ? "" : "Run supabase/step-next-public-request-links.sql before creating QR request links."}</p>
      <div class="public-request-link-grid">
        ${locations.map(renderPublicRequestLocationCard).join("") || `<article><strong>No locations yet</strong><span>Add a location before creating request QR codes.</span></article>`}
      </div>
    </section>
  `;
}

function renderPublicRequestLocationCard(location) {
  const link = publicRequestLinks.find((item) => item.location_id === location.id);
  const linkActive = Boolean(link && link.is_active !== false);
  const requestUrl = linkActive ? publicRequestUrl(link.token) : "";
  const qrUrl = linkActive ? publicRequestQrUrl(link.token) : "";
  const hasUsableUrl = Boolean(requestUrl && qrUrl);
  return `
    <article class="public-request-link-card">
      <div>
        <strong>${escapeHtml(location.name)}</strong>
        <span>${linkActive ? "External request link active" : link ? "Request link disabled" : "No request link yet"}</span>
        ${link?.last_used_at ? `<span>Last used ${new Date(link.last_used_at).toLocaleString()}</span>` : ""}
      </div>
      ${linkActive ? `
        <div class="qr-preview">${hasUsableUrl ? qrSvgFor(requestUrl) : `<div class="qr-fallback">Set URL</div>`}</div>
        <input class="copy-field" value="${escapeHtml(qrUrl || "Set the public MaintainOps URL first")}" readonly>
        <div class="button-row">
          <a class="primary-button request-action-button ${hasUsableUrl ? "" : "disabled-link"}" href="${escapeHtml(qrUrl || "#")}" target="_blank" rel="noreferrer">Open QR Code</a>
          <button class="secondary-button request-action-button" data-copy-public-request-link="${escapeHtml(qrUrl)}" type="button" ${hasUsableUrl ? "" : "disabled"}>Copy QR Link</button>
          <a class="secondary-button ${hasUsableUrl ? "" : "disabled-link"}" href="${escapeHtml(requestUrl || "#")}" target="_blank" rel="noreferrer">Test Form</a>
          <button class="secondary-button request-action-button" data-regenerate-public-request-link="${escapeHtml(link.id)}" type="button">Regenerate QR</button>
          <button class="secondary-button danger-link" data-disable-public-request-link="${escapeHtml(link.id)}" type="button">Disable Link</button>
        </div>
      ` : link ? `
        <div class="qr-preview inactive-qr-preview"><div class="qr-fallback">Off</div></div>
        <div class="button-row">
          <button class="secondary-button request-action-button" data-enable-public-request-link="${escapeHtml(link.id)}" type="button">Reactivate Same QR</button>
          <button class="primary-button request-action-button" data-regenerate-public-request-link="${escapeHtml(link.id)}" type="button">Regenerate QR</button>
        </div>
      ` : `
        <button class="secondary-button request-action-button" data-create-public-request-link="${escapeHtml(location.id)}" type="button" ${publicRequestLinksReady ? "" : "disabled"}>Create QR Link</button>
      `}
    </article>
  `;
}

function publicRequestUrl(token) {
  return publicAppUrlWithSearch(`?request=${encodeURIComponent(token)}`);
}

function publicRequestQrUrl(token) {
  return publicAppUrlWithSearch(`?qr=${encodeURIComponent(token)}`);
}

function publicAppUrlWithSearch(search) {
  const base = publicAppBaseUrl();
  if (!base) return "";
  const url = new URL(base);
  url.search = search;
  url.hash = "";
  return url.toString();
}

function publicAppBaseUrl() {
  const configured = publicAppUrlOverride || String(window.PUBLIC_APP_URL || "").trim();
  const candidate = configured || (["http:", "https:"].includes(window.location.protocol) ? window.location.href : "");
  if (!candidate) return "";
  return normalizePublicAppUrl(candidate);
}

function normalizePublicAppUrl(value) {
  try {
    const url = new URL(String(value || "").trim(), window.location.href);
    if (!["http:", "https:"].includes(url.protocol)) return "";
    url.search = "";
    url.hash = "";
    if (url.pathname && url.pathname !== "/" && !url.pathname.endsWith("/") && !url.pathname.endsWith(".html")) {
      url.pathname = `${url.pathname}/`;
    }
    return url.toString();
  } catch (error) {
    return "";
  }
}

function qrSvgFor(value, cellSize = 4) {
  if (!window.qrcode || !value) return `<div class="qr-fallback">QR</div>`;
  try {
    const qr = window.qrcode(0, "M");
    qr.addData(value);
    qr.make();
    return qr.createSvgTag(cellSize, 0).replace("<svg", "<svg class=\"qr-code\"");
  } catch (error) {
    return `<div class="qr-fallback">QR</div>`;
  }
}

function renderMaintenanceRequest(request) {
  return `
    <article class="request-card">
      <div>
        <div class="chip-row">
          <span class="chip ${request.priority}">${escapeHtml(request.priority)}</span>
          <span class="chip">${escapeHtml(request.status)}</span>
          ${request.converted_work_order_id ? `<span class="chip completed">converted</span>` : ""}
        </div>
        <h3>${escapeHtml(request.title)}</h3>
        <p>${escapeHtml(request.description || "No description.")}</p>
        <div class="meta-row">
          <span>${escapeHtml(request.assets?.name || request.locations?.name || "No equipment")}</span>
          <span>${escapeHtml(request.requested_by_name || profilesByUserId[request.requested_by]?.full_name || "Requester")}</span>
          <span>${new Date(request.created_at).toLocaleString()}</span>
        </div>
      </div>
      ${request.status === "submitted" ? `
        <div class="request-actions">
          <button class="secondary-button request-action-button" data-quick-fix-request="${request.id}" type="button">Quick Fix</button>
          <button class="secondary-button work-action-button" data-convert-request="${request.id}" type="button">Convert to Work Order</button>
        </div>
      ` : ""}
    </article>
  `;
}

function renderRequestFormContent() {
  return `
    <form class="form-grid" id="request-form">
      <label>Request title<input name="title" required placeholder="Cold room door not sealing"></label>
      <label>What is happening?<textarea name="description" rows="4" required></textarea></label>
      <label>Machine / equipment
        <select name="asset_id">
          <option value="">Unknown or general location</option>
          ${renderAssetOptions()}
        </select>
      </label>
      <label>Priority
        <select name="priority">
          <option>medium</option>
          <option>high</option>
          <option>critical</option>
          <option>low</option>
        </select>
      </label>
      <p class="error-text" id="request-error"></p>
      <button class="primary-button request-action-button" type="submit">Submit Request</button>
    </form>
  `;
}

function renderActivityItem(item) {
  if (item.type === "comment") {
    return `
      <article class="relationship-detail comment">
        <strong>${escapeHtml(profilesByUserId[item.author_id]?.full_name || "Team member")}</strong>
        <span>${new Date(item.created_at).toLocaleString()}</span>
        <p>${escapeHtml(item.body)}</p>
      </article>
    `;
  }

  if (item.type === "photo") {
    return `
      <article class="relationship-detail photo">
        <strong>Photo uploaded</strong>
        <span>${photoMetaText(item)}</span>
        <p>${escapeHtml(item.file_name)}</p>
        ${item.signedUrl ? `<a href="${item.signedUrl}" target="_blank" rel="noreferrer">Open photo</a>` : ""}
      </article>
    `;
  }

  if (item.type === "part") {
    const unitCost = partUsageUnitCost(item);
    const totalCost = unitCost * (Number(item.quantity_used) || 0);
    return `
      <article class="relationship-detail parts">
        <strong>Part used</strong>
        <span>${new Date(item.created_at).toLocaleString()}</span>
        <p>${escapeHtml(item.parts?.name || "Part")} - ${Number(item.quantity_used) || 0} used - ${money(totalCost)}</p>
      </article>
    `;
  }

  return `
    <article>
      <strong>${escapeHtml(item.event_type.replaceAll("_", " "))}</strong>
      <span>${new Date(item.created_at).toLocaleString()} · ${escapeHtml(profilesByUserId[item.actor_id]?.full_name || "Team member")}</span>
      <p>${escapeHtml(item.summary)}</p>
    </article>
  `;
}

function renderWorkOrderCard(workOrder) {
    const dueState = getDueState(workOrder);
    const procedure = procedureTemplates.find((template) => template.id === workOrder.procedure_template_id);
    return `
      <article class="work-card status-card status-${workOrder.status} ${workOrder.id === activeWorkOrderId ? "selected" : ""}" data-id="${workOrder.id}" tabindex="0">
        <div class="work-card-header">
          <div class="chip-row">
            <span class="chip ${workOrder.priority}">${workOrder.priority}</span>
            <span class="chip">${escapeHtml(workOrder.type || "reactive")}</span>
            <span class="chip ${workOrder.status}">${statusLabel(workOrder.status)}</span>
            ${dueState ? `<span class="chip ${dueState.className}">${dueState.label}</span>` : ""}
          </div>
        </div>
        <div class="work-card-body">
          <h3>${escapeHtml(workOrder.title)}</h3>
          <p>${escapeHtml(cleanWorkOrderDescription(workOrder.description) || "No description.")}</p>
        </div>
        <div class="work-card-meta meta-row">
          <span>${relationshipIcon("asset")}${escapeHtml(workOrder.assets?.name || "General item / area")}</span>
          <span>${segmentIcon(isVendorAssigned(workOrder) ? "vendor" : "mine")}${escapeHtml(assignmentLabel(workOrder))}</span>
          ${procedure ? `<span>${relationshipIcon("procedure")}${escapeHtml(procedure.name)}</span>` : ""}
          <span>${segmentIcon("due")}Due ${workOrder.due_at || "unset"}</span>
          ${workOrder.completed_at ? `<span>${segmentIcon("completed")}Completed ${new Date(workOrder.completed_at).toLocaleDateString()}</span>` : ""}
        </div>
        ${renderRelationshipChips(workOrder)}
        <div class="quick-actions work-card-actions">
          ${!workOrder.assigned_to ? `<button class="assign-action" data-assign-me="${workOrder.id}" type="button">Assign to me</button>` : ""}
          ${canManageTeam() ? renderCardAssignmentControl(workOrder) : ""}
        ${STATUS_OPTIONS.filter((status) => status !== workOrder.status).slice(0, 3).map((status) => `
          <button data-quick-status="${status}" data-id="${workOrder.id}" type="button">${statusLabel(status)}</button>
        `).join("")}
      </div>
    </article>
  `;
}

function renderCardAssignmentControl(workOrder) {
  return `
    <form class="card-assign-form" data-card-assign="${workOrder.id}">
      <select name="assigned_to" aria-label="Assign ${escapeHtml(workOrder.title)}">
        <option value="">Unassigned</option>
        <option value="${OUTSIDE_VENDOR_VALUE}" ${isVendorAssigned(workOrder) ? "selected" : ""}>Outside vendor</option>
        ${Object.entries(profilesByUserId).map(([userId, profile]) => `<option value="${userId}" ${!isVendorAssigned(workOrder) && userId === workOrder.assigned_to ? "selected" : ""}>${escapeHtml(profile.full_name || teamMemberName(userId))}</option>`).join("")}
      </select>
      <button type="submit">Assign</button>
    </form>
  `;
}

function renderWorkPagination(totalCount, totalPages) {
  if (totalCount <= WORK_ORDERS_PER_PAGE) return "";
  const firstShown = ((workOrderPage - 1) * WORK_ORDERS_PER_PAGE) + 1;
  const lastShown = Math.min(totalCount, workOrderPage * WORK_ORDERS_PER_PAGE);
  return `
    <div class="pagination-bar">
      <button class="secondary-button page-action-button" data-work-page="prev" type="button" ${workOrderPage <= 1 ? "disabled" : ""}>Previous</button>
      <span>Showing ${firstShown}-${lastShown} of ${totalCount} - Page ${workOrderPage} of ${totalPages}</span>
      <button class="secondary-button page-action-button" data-work-page="next" type="button" ${workOrderPage >= totalPages ? "disabled" : ""}>Next</button>
    </div>
  `;
}

function renderPartsPagination(totalCount, totalPages) {
  if (totalCount <= PARTS_PER_PAGE) return "";
  const firstShown = ((partsPage - 1) * PARTS_PER_PAGE) + 1;
  const lastShown = Math.min(totalCount, partsPage * PARTS_PER_PAGE);
  return `
    <div class="pagination-bar">
      <button class="secondary-button page-action-button" data-parts-page="prev" type="button" ${partsPage <= 1 ? "disabled" : ""}>Previous</button>
      <span>Showing ${firstShown}-${lastShown} of ${totalCount} - Page ${partsPage} of ${totalPages}</span>
      <button class="secondary-button page-action-button" data-parts-page="next" type="button" ${partsPage >= totalPages ? "disabled" : ""}>Next</button>
    </div>
  `;
}

function renderCreateWorkOrder() {
  return `
    <form class="form-grid create-work-order-template relationship-detail asset" id="create-work-order-form">
      <div>
        <h3>Create Work Order</h3>
        <p class="muted">Build a complete work order step by step.</p>
      </div>

      <div class="form-section-title">1. What needs attention?</div>
      <label>Title<input name="title" required placeholder="Inspect packaging line sensor"></label>
      <label>Description<textarea name="description" rows="2" placeholder="What is happening, where, and what should be checked?"></textarea></label>
      <div class="equipment-choice">
        <label>Machine / equipment
          <select name="asset_id">
            <option value="">No machine / equipment - general item or area</option>
            ${renderAssetOptions()}
          </select>
        </label>
        <span>or</span>
        <label>New machine / equipment name<input name="new_asset_name" placeholder="Roll Former 3"></label>
      </div>

      <details class="quick-fix-more" open>
        <summary>2. Priority and timing</summary>
        <div class="form-grid">
          <label>Status
            <select name="status">
              ${STATUS_OPTIONS.map((status) => `<option value="${status}" ${status === "open" ? "selected" : ""}>${statusLabel(status)}</option>`).join("")}
            </select>
          </label>
          <label>Priority
            <select name="priority">
              <option>medium</option>
              <option>high</option>
              <option>critical</option>
              <option>low</option>
            </select>
          </label>
          <label>Type
            <select name="type">
              ${TYPE_OPTIONS.filter((type) => type !== "request").map((type) => `<option value="${type}">${type}</option>`).join("")}
            </select>
          </label>
          <label>Expected back up / due date<input name="due_at" type="date"></label>
        </div>
      </details>

      <details class="quick-fix-more">
        <summary>3. People and procedure</summary>
        <div class="form-grid">
          <label>Assign to
            <select name="assigned_to">
              <option value="">Unassigned</option>
              <option value="${OUTSIDE_VENDOR_VALUE}">Outside vendor</option>
              <option value="${session.user.id}">Assign to me</option>
              ${Object.entries(profilesByUserId).filter(([userId]) => userId !== session.user.id).map(([userId, profile]) => `<option value="${userId}">${escapeHtml(profile.full_name || "Team member")}</option>`).join("")}
            </select>
          </label>
          <label>Procedure
            <select name="procedure_template_id">
              ${renderProcedureOptions()}
            </select>
          </label>
        </div>
      </details>

      <details class="quick-fix-more">
        <summary>4. Internal notes and completion</summary>
        <div class="form-grid">
          <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
          <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
          <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
          <label class="check-row safety-check-row"><input name="safety_devices_checked" type="checkbox"> Safety devices checked before completion: E-stops, sensors, guards, and interlocks</label>
          <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="0"></label>
          <label>Completion notes<textarea name="completion_notes" rows="2" placeholder="Final notes if this is already complete."></textarea></label>
        </div>
      </details>

      <details class="quick-fix-more">
        <summary>5. Parts, photo, and first comment</summary>
        <div class="form-grid">
          <label>Part used
            <select name="part_id">
              <option value="">No part used</option>
              ${parts.map((part) => `<option value="${part.id}">${escapeHtml(part.name)} (${part.quantity_on_hand} on hand)</option>`).join("")}
            </select>
          </label>
          <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
          <label>Photo<input name="photo" type="file" accept="image/*" capture="environment"><small>Optional. Photos are optimized up to 2400px before upload.</small></label>
          <label>First comment<textarea name="initial_comment" rows="2" placeholder="Add the first update or note for the record."></textarea></label>
        </div>
      </details>

      <p class="error-text" id="create-work-order-error"></p>
      <button class="primary-button work-action-button quick-fix-submit" type="submit">Create Work Order</button>
    </form>
  `;
}

function renderQuickFixForm() {
  const selectedAssetId = quickFixAssetId || "";
  const sourceRequest = maintenanceRequests.find((request) => request.id === quickFixRequestId);
  return `
    <form class="form-grid quick-fix-form relationship-detail comment" id="quick-fix-form">
      <div>
        <h3>Quick Fix</h3>
        <p class="muted">Log the issue now. Details can be added later.</p>
      </div>
      ${sourceRequest ? `<p class="completion-note">Resolving request: ${escapeHtml(sourceRequest.title)}</p>` : ""}
      <label>Issue<input name="title" required autofocus placeholder="Loose guard switch fixed" value="${escapeHtml(sourceRequest?.title || "")}"></label>
      <label>Machine / equipment
        <select name="asset_id">
          <option value="">No machine / equipment - general item or area</option>
          ${renderAssetOptions(selectedAssetId || sourceRequest?.asset_id || "")}
        </select>
        <small>Machine or equipment not listed? Add it below.</small>
      </label>
      <label>New machine / equipment name<input name="new_asset_name" placeholder="Packaging Line 2"></label>
      <label>Photo<input name="photo" type="file" accept="image/*" capture="environment"><small>Optional. Photos are optimized up to 2400px before upload.</small></label>
      <label class="check-row"><input name="machine_down" type="checkbox"> Machine is down</label>
      <label class="check-row"><input name="mark_completed" type="checkbox"> Already fixed - mark complete now</label>
      <label class="check-row safety-check-row"><input name="safety_devices_checked" type="checkbox"> Safety devices checked if completing equipment work: E-stops, sensors, guards, and interlocks</label>
      <details class="quick-fix-more">
        <summary>Optional details</summary>
        <div class="form-grid">
          <div class="form-section-title">Work Order Info</div>
          <label>Expected back up / due date<input name="due_at" type="date"></label>
          <label>Priority
            <select name="priority">
              ${["medium", "high", "critical", "low"].map((priority) => `<option value="${priority}">${priority}</option>`).join("")}
            </select>
          </label>
          <label>Type
            <select name="type">
              ${TYPE_OPTIONS.filter((type) => type !== "request").map((type) => `<option value="${type}" ${type === "corrective" ? "selected" : ""}>${type}</option>`).join("")}
            </select>
          </label>
          <label>Assign to
            <select name="assigned_to">
              <option value="${session.user.id}">Assign to me</option>
              <option value="${OUTSIDE_VENDOR_VALUE}">Outside vendor</option>
              <option value="">Unassigned</option>
              ${Object.entries(profilesByUserId).filter(([userId]) => userId !== session.user.id).map(([userId, profile]) => `<option value="${userId}">${escapeHtml(profile.full_name || "Team member")}</option>`).join("")}
            </select>
          </label>
          <label>Procedure
            <select name="procedure_template_id">
              ${renderProcedureOptions()}
            </select>
          </label>
          <div class="form-section-title">Outcome / Notes</div>
          <label>What did you do?<textarea name="resolution_summary" rows="2" placeholder="Tightened mount, tested switch, line returned to normal."></textarea></label>
          <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="Loose mount, worn part, operator report, unknown...">${escapeHtml(sourceRequest?.description || "")}</textarea></label>
          <label>Equipment status after fix
            <select name="asset_status">
              <option value="">Leave unchanged</option>
              ${["running", "watch", "degraded", "offline"].map((status) => `<option value="${status}">${status}</option>`).join("")}
            </select>
          </label>
          <label>Part used
            <select name="part_id">
              <option value="">No part used</option>
              ${parts.map((part) => `<option value="${part.id}">${escapeHtml(part.name)} (${part.quantity_on_hand} on hand)</option>`).join("")}
            </select>
          </label>
          <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
          <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
        </div>
      </details>
      <p class="error-text" id="quick-fix-error"></p>
      <button class="primary-button quick-fix-submit" type="submit">Log Quick Fix</button>
    </form>
  `;
}

function renderRelationshipChips(workOrder) {
  const procedure = procedureTemplates.find((template) => template.id === workOrder.procedure_template_id);
  const progress = procedure ? checklistProgress(workOrder, procedure) : null;
  const partsCount = (partsUsedByWorkOrder[workOrder.id] || []).length;
  const commentsCount = (commentsByWorkOrder[workOrder.id] || []).length;
  const photosCount = (photosByWorkOrder[workOrder.id] || []).length;
  const messageCount = messageThreads.filter((thread) => thread.work_order_id === workOrder.id).length;
  const chips = [];

  if (workOrder.asset_id) {
    chips.push(relationshipChip("asset", "Equipment", workOrder.assets?.name || "Linked"));
  }

  if (procedure && progress) {
    chips.push(relationshipChip("procedure", "Procedure", `${progress.done}/${progress.total}`));
  }

  if (partsCount) {
    chips.push(relationshipChip("parts", "Parts", String(partsCount)));
  }

  if (commentsCount) {
    chips.push(relationshipChip("comment", "Comments", String(commentsCount)));
  }

  if (messageCount) {
    chips.push(relationshipChip("message", "Messages", String(messageCount)));
  }

  if (photosCount) {
    chips.push(relationshipChip("photo", "Photos", String(photosCount)));
  }

  return chips.length ? `<div class="relationship-row">${chips.join("")}</div>` : "";
}

function relationshipChip(type, label, value) {
  return `
    <span class="relationship-chip ${type}" title="${escapeHtml(label)}">
      ${relationshipIcon(type)}
      <span>${escapeHtml(value)}</span>
    </span>
  `;
}

function relationshipIcon(type) {
  const icons = {
    asset: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path></svg>`,
    procedure: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path></svg>`,
    parts: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path></svg>`,
    comment: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v10H8l-3 3V5z"></path></svg>`,
    message: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path></svg>`,
    photo: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6z"></path><path d="M8 14l3-3 2 2 2-3 3 4"></path><path d="M8 9h.01"></path></svg>`,
  };
  return icons[type] || "";
}

function renderWorkOrderDetail() {
  const workOrder = workOrders.find((item) => item.id === activeWorkOrderId);
  if (!workOrder) return renderCreateWorkOrder();
  const comments = commentsByWorkOrder[workOrder.id] || [];
  const photos = photosByWorkOrder[workOrder.id] || [];
  const events = eventsByWorkOrder[workOrder.id] || [];
  const usedParts = partsUsedByWorkOrder[workOrder.id] || [];
  const partsCost = usedParts.reduce((sum, row) => sum + ((Number(row.quantity_used) || 0) * partUsageUnitCost(row)), 0);
  const partsQuantity = usedParts.reduce((sum, row) => sum + (Number(row.quantity_used) || 0), 0);
  const activity = buildActivityFeed(comments, photos, events, usedParts);
  const procedure = procedureTemplates.find((template) => template.id === workOrder.procedure_template_id);
  const progress = procedure ? checklistProgress(workOrder, procedure) : null;
  const requiredProgress = procedure ? requiredChecklistProgress(workOrder, procedure) : null;

  return `
    <div class="detail-stack">
      <div>
        <div class="chip-row">
          <span class="chip ${workOrder.priority}">${workOrder.priority}</span>
          <span class="chip">${escapeHtml(workOrder.type || "reactive")}</span>
          <span class="chip ${workOrder.status}">${statusLabel(workOrder.status)}</span>
        </div>
        <h2>${escapeHtml(workOrder.title)}</h2>
        <p>${escapeHtml(cleanWorkOrderDescription(workOrder.description) || "No description.")}</p>
        ${renderRelationshipChips(workOrder)}
        ${workOrder.completed_at ? `<p class="completion-note">Completed ${new Date(workOrder.completed_at).toLocaleString()} · ${workOrder.actual_minutes || 0} min</p>` : ""}
        ${workOrder.asset_id && hasCompletedSafetyDeviceCheck(workOrder) ? `<p class="completion-note">Safety devices checked before completion.</p>` : ""}
        ${workOrder.completion_notes ? `<p>${escapeHtml(workOrder.completion_notes)}</p>` : ""}
      </div>

      ${renderWorkOrderCommandSummary(workOrder)}
      ${renderWorkOrderRecommendation(workOrder)}

      ${workOrder.completed_at && (workOrder.failure_cause || workOrder.resolution_summary || workOrder.follow_up_needed) ? `
        <div class="outcome-summary">
          <h3>Work Outcome</h3>
          ${workOrder.failure_cause ? `<article><span>Cause</span><strong>${escapeHtml(workOrder.failure_cause)}</strong></article>` : ""}
          ${workOrder.resolution_summary ? `<article><span>Resolution</span><strong>${escapeHtml(workOrder.resolution_summary)}</strong></article>` : ""}
          ${workOrder.follow_up_needed ? `<article class="follow-up"><span>Follow-up</span><strong>Needed</strong></article>` : ""}
        </div>
      ` : ""}

      <label>Status
        <select id="status-select">
          ${STATUS_OPTIONS.map((status) => `<option value="${status}" ${status === workOrder.status ? "selected" : ""}>${statusLabel(status)}</option>`).join("")}
        </select>
      </label>

      <div class="quick-actions detail-quick-actions">
        ${workOrder.assigned_to !== session.user.id ? `<button class="assign-action" data-assign-me="${workOrder.id}" type="button">${workOrder.assigned_to ? "Reassign to me" : "Assign to me"}</button>` : ""}
        ${STATUS_OPTIONS.filter((status) => status !== workOrder.status).map((status) => `
          <button data-quick-status="${status}" data-id="${workOrder.id}" type="button">${statusLabel(status)}</button>
        `).join("")}
      </div>

      <details class="quick-update-panel relationship-detail comment work-detail-section" open>
        <summary>Quick Update</summary>
        <form class="form-grid" id="quick-update-work-order-form">
          <label id="quick-update-issue-field">Issue<input name="title" required value="${escapeHtml(workOrder.title)}"></label>
          <div class="equipment-choice" id="quick-update-equipment-field">
            <label>Machine / equipment
              <select name="asset_id">
                <option value="">No machine / equipment - general item or area</option>
                ${renderAssetOptions(workOrder.asset_id || "")}
              </select>
            </label>
            <span>or</span>
            <label>New machine / equipment name<input name="new_asset_name" placeholder="Roll Former 3"></label>
          </div>
          <label id="quick-update-resolution-field">Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${escapeHtml(workOrder.resolution_summary || "")}</textarea></label>
          <label id="quick-update-due-field">Expected back up / due date<input name="due_at" type="date" value="${workOrder.due_at || ""}"></label>
          <label id="quick-update-status-field">Status
            <select name="status">
              ${STATUS_OPTIONS.map((status) => `<option value="${status}" ${status === workOrder.status ? "selected" : ""}>${statusLabel(status)}</option>`).join("")}
            </select>
          </label>
          <label>Priority
            <select name="priority">
              ${["low", "medium", "high", "critical"].map((priority) => `<option value="${priority}" ${priority === workOrder.priority ? "selected" : ""}>${priority}</option>`).join("")}
            </select>
          </label>
          <label id="quick-update-owner-field">Assign to
            <select name="assigned_to">
              <option value="">Unassigned</option>
              <option value="${OUTSIDE_VENDOR_VALUE}" ${isVendorAssigned(workOrder) ? "selected" : ""}>Outside vendor</option>
              ${Object.entries(profilesByUserId).map(([userId, profile]) => `<option value="${userId}" ${!isVendorAssigned(workOrder) && userId === workOrder.assigned_to ? "selected" : ""}>${escapeHtml(profile.full_name || "Team member")}</option>`).join("")}
            </select>
          </label>
          <label class="check-row"><input name="machine_down" type="checkbox" ${workOrder.assets?.status === "offline" ? "checked" : ""}> Machine is down</label>
          ${requiresSafetyDeviceCheck(workOrder) ? (
            workOrder.status === "completed"
              ? `<label class="check-row safety-check-row" id="quick-update-safety-field"><input name="safety_devices_checked" type="checkbox" ${workOrder.safety_devices_checked ? "checked" : ""}> Safety devices checked before completion: E-stops, sensors, guards, and interlocks</label>`
              : `<div class="safety-check-row safety-pending-note" id="quick-update-safety-field"><strong>Safety devices</strong><span>Complete Work will require E-stops, sensors, guards, and interlocks to be checked.</span></div>`
          ) : `<div class="safety-check-row safety-pending-note" id="quick-update-safety-field"><strong>Safety devices</strong><span>No machine / equipment selected, so no equipment safety check is required.</span></div>`}
          <p class="error-text" id="quick-update-error"></p>
          <button class="primary-button quick-fix-submit" type="submit">Save Quick Update</button>
        </form>
      </details>

      <div class="downtime-copy relationship-detail asset" id="work-order-email-helper-target">
        <div>
          <h3>Email Helper</h3>
          <p class="muted">Copy a human update for email when this machine/equipment is down or needs attention.</p>
        </div>
        <div class="quick-actions">
          <button class="secondary-button" data-copy-downtime="subject" data-id="${workOrder.id}" type="button">Copy Subject</button>
          <button class="secondary-button" data-copy-downtime="body" data-id="${workOrder.id}" type="button">Copy Email Body</button>
        </div>
      </div>

      ${renderWorkOrderMessages(workOrder)}

      <details class="work-detail-section relationship-detail asset">
        <summary>Full Work Order Details</summary>
      <form class="form-grid" id="edit-work-order-form">
        <label>Title<input name="title" required value="${escapeHtml(workOrder.title)}"></label>
        <label>Description<textarea name="description" rows="3">${escapeHtml(cleanWorkOrderDescription(workOrder.description) || "")}</textarea></label>
        <label>Due date<input name="due_at" type="date" value="${workOrder.due_at || ""}"></label>
        <label>Priority
          <select name="priority">
            ${["low", "medium", "high", "critical"].map((priority) => `<option value="${priority}" ${priority === workOrder.priority ? "selected" : ""}>${priority}</option>`).join("")}
          </select>
        </label>
        <label>Type
          <select name="type">
            ${TYPE_OPTIONS.map((type) => `<option value="${type}" ${type === (workOrder.type || "reactive") ? "selected" : ""}>${type}</option>`).join("")}
          </select>
        </label>
        <label>Assign to
          <select name="assigned_to">
            <option value="">Unassigned</option>
            <option value="${OUTSIDE_VENDOR_VALUE}" ${isVendorAssigned(workOrder) ? "selected" : ""}>Outside vendor</option>
            ${Object.entries(profilesByUserId).map(([userId, profile]) => `<option value="${userId}" ${!isVendorAssigned(workOrder) && userId === workOrder.assigned_to ? "selected" : ""}>${escapeHtml(profile.full_name || "Team member")}</option>`).join("")}
          </select>
        </label>
        <label>Procedure
          <select name="procedure_template_id">
            ${renderProcedureOptions(workOrder.procedure_template_id || "")}
          </select>
        </label>
        <div class="form-section-title">Internal Record</div>
        <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?">${escapeHtml(workOrder.failure_cause || "")}</textarea></label>
        <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${escapeHtml(workOrder.resolution_summary || "")}</textarea></label>
        <label class="check-row"><input name="follow_up_needed" type="checkbox" ${workOrder.follow_up_needed ? "checked" : ""}> Follow-up needed</label>
        ${workOrder.status === "completed" && requiresSafetyDeviceCheck(workOrder) ? `
          <label class="check-row safety-check-row">
            <input name="safety_devices_checked" type="checkbox" ${workOrder.safety_devices_checked ? "checked" : ""}>
            Safety devices checked: E-stops, sensors, guards, and interlocks
          </label>
        ` : ""}
        <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${workOrder.actual_minutes || 0}"></label>
        <p class="error-text" id="work-order-save-error"></p>
        <button class="secondary-button save-work-button" type="submit">Save Work Order</button>
      </form>
      </details>

      ${procedure ? `
        <details class="work-detail-section relationship-detail procedure" open>
          <summary>Procedure Checklist</summary>
          <div class="panel-header compact-header">
            <h3>${escapeHtml(procedure.name)}</h3>
            <span>${progress.done} of ${progress.total} complete · required ${requiredProgress.done}/${requiredProgress.total}</span>
          </div>
          <div class="checklist-list">
            ${procedure.procedure_steps.map((step) => renderChecklistStep(workOrder, step)).join("") || `<p class="muted">This procedure has no steps yet.</p>`}
          </div>
        </details>
      ` : ""}

      ${workOrder.status !== "completed" ? `
        <details class="work-detail-section completion-section" id="work-order-complete-target" open>
          <summary>Complete Work</summary>
        <form class="completion-box" id="complete-work-order-form">
          <h3>Complete Work</h3>
          ${requiredProgress?.total ? `<p class="${requiredProgress.done === requiredProgress.total ? "completion-note" : "warning-text"}">Required checklist: ${requiredProgress.done}/${requiredProgress.total}</p>` : ""}
          <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
          <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
          <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
          <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${workOrder.actual_minutes || 0}"></label>
          <label>Completion notes<textarea name="completion_notes" rows="3" placeholder="What was fixed? Any follow-up needed?"></textarea></label>
          ${requiresSafetyDeviceCheck(workOrder) ? `
            <label class="check-row safety-check-row">
              <input name="safety_devices_checked" type="checkbox" required ${hasCompletedSafetyDeviceCheck(workOrder) ? "checked" : ""}>
              Safety devices checked and functioning: E-stops, sensors, guards, and interlocks
            </label>
          ` : ""}
          <p class="error-text" id="completion-error"></p>
          <button class="primary-button" type="submit">Complete Work Order</button>
        </form>
        </details>
      ` : ""}

      <details class="work-detail-section relationship-detail parts" id="work-order-parts-target">
        <summary>Parts Used</summary>
      <form class="form-grid relationship-detail parts" id="parts-used-form">
        <h3>Parts Used</h3>
        <label>Part
          <select name="part_id" required>
            <option value="">Select part</option>
            ${parts.map((part) => `<option value="${part.id}">${escapeHtml(part.name)} (${part.quantity_on_hand} on hand)</option>`).join("")}
          </select>
        </label>
        <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
        <p class="error-text" id="parts-used-error"></p>
        <button class="secondary-button" type="submit">Record Part Used</button>
      </form>

      <div class="parts-used-list">
        ${usedParts.length ? `<article class="parts-used-summary"><strong>Parts estimate</strong><span>${money(partsCost)}</span></article>` : ""}
        ${usedParts.map((row) => `
          <article class="relationship-detail parts">
            <strong>${escapeHtml(row.parts?.name || "Part")}</strong>
            <span>${row.quantity_used} used - ${money((Number(row.quantity_used) || 0) * partUsageUnitCost(row))}</span>
          </article>
        `).join("") || `<p class="muted">No parts used yet.</p>`}
      </div>
      </details>

      <details class="work-detail-section relationship-detail photo" id="work-order-photos-target">
        <summary>Photos</summary>
      <form class="form-grid relationship-detail photo" id="photo-form">
        <label>Upload photo<input name="photo" type="file" accept="image/*"><small>Photos are optimized up to 2400px before upload.</small></label>
        <p class="error-text" id="photo-error"></p>
        <button class="secondary-button" type="submit">Upload Photo</button>
      </form>

      <div>
        <h3>Photos</h3>
        <div class="photo-list">
          ${photos.map((photo) => `
            <article class="relationship-detail photo">
              ${photo.signedUrl && photo.content_type?.startsWith("image/")
                ? `<img class="photo-thumb" src="${photo.signedUrl}" alt="${escapeHtml(photo.file_name)}">`
                : ""}
              <strong>${escapeHtml(photo.file_name)}</strong>
              <span>${photoMetaText(photo)}</span>
              ${photo.signedUrl ? `<a href="${photo.signedUrl}" target="_blank" rel="noreferrer">Open photo</a>` : ""}
            </article>
          `).join("") || `<p class="muted">No photos uploaded yet.</p>`}
        </div>
      </div>
      </details>

      <details class="work-detail-section relationship-detail comment" id="work-order-comments-target">
        <summary>Comments</summary>
      <form class="form-grid relationship-detail comment" id="comment-form">
        <label>Comment<textarea name="body" rows="3" required></textarea></label>
        <p class="error-text" id="comment-error"></p>
        <button class="primary-button" type="submit">Add Comment</button>
      </form>
      </details>

      <details class="work-detail-section" id="work-order-history-target" open>
        <summary>History</summary>
      <div class="timeline">
        ${commentsError ? `<p class="error-text">${escapeHtml(commentsError)}</p>` : ""}
        ${activity.map(renderActivityItem).join("") || `<p class="muted">No activity yet.</p>`}
      </div>
      </details>

      ${canDeleteWorkOrders() ? renderWorkOrderDangerZone(workOrder) : ""}
    </div>
  `;
}

function renderWorkOrderDangerZone(workOrder) {
  const confirming = pendingDeleteWorkOrderId === workOrder.id;
  return `
    <section class="delete-zone">
      <div>
        <h3>Delete Work Order</h3>
        <p>This removes the work order and its linked comments, history, parts used, and photo records.</p>
      </div>
      ${confirming ? `
        <div class="delete-warning-panel">
          <strong>Permanent Delete Warning</strong>
          <p>You are about to permanently delete "${escapeHtml(workOrder.title)}". This cannot be undone.</p>
          <div class="button-row">
            <button class="secondary-button" data-cancel-delete-work-order type="button">Cancel</button>
            <button class="danger-action-button confirm-delete-button" data-confirm-delete-work-order="${workOrder.id}" type="button">Permanently Delete</button>
          </div>
        </div>
      ` : `
        <button class="danger-action-button large-delete-button" data-delete-work-order="${workOrder.id}" type="button">Delete Work Order</button>
      `}
    </section>
  `;
}

function renderWorkOrderMessages(workOrder) {
  const linkedThreads = messageThreads.filter((thread) => thread.work_order_id === workOrder.id);
  return `
    <details class="work-detail-section relationship-detail comment work-message-section" id="work-order-messages-target" open>
      <summary>Messages</summary>
      <div class="work-message-panel">
        <div>
          <h3>Work Order Conversation</h3>
          <p class="muted">Start or open team conversations tied to this work order.</p>
        </div>
        <button class="secondary-button message-action-button" data-start-work-message="${workOrder.id}" type="button">Message Team</button>
        ${messageWorkOrderLinksReady ? `
          <div class="work-linked-thread-list">
            ${linkedThreads.map(renderLinkedWorkMessageThread).join("") || `<p class="muted">No message threads linked yet.</p>`}
          </div>
        ` : `<p class="error-text">Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.</p>`}
      </div>
    </details>
  `;
}

function renderWorkOrderRecommendation(workOrder) {
  const recommendation = recommendedWorkOrderStep(workOrder);
  if (!recommendation) return "";

  return `
    <section class="work-recommendation ${recommendation.tone || ""}" aria-label="Recommended next step">
      <div>
        <span>Recommended Next Step</span>
        <strong>${escapeHtml(recommendation.title)}</strong>
        <p>${escapeHtml(recommendation.helper)}</p>
      </div>
      <button class="recommendation-button" data-jump-work-section="${recommendation.target}" type="button">${escapeHtml(recommendation.action)}</button>
    </section>
  `;
}

function recommendedWorkOrderStep(workOrder) {
  const orderedFields = [
    {
      isMissing: () => !String(workOrder.title || "").trim(),
      title: "Issue",
      target: "quick-update-issue-field",
    },
    {
      isMissing: () => !workOrder.asset_id,
      title: "Machine / Equipment",
      target: "quick-update-equipment-field",
    },
    {
      isMissing: () => !workOrder.assigned_to && !isVendorAssigned(workOrder),
      title: "Assign To",
      target: "quick-update-owner-field",
    },
    {
      isMissing: () => !workOrder.due_at,
      title: "Expected Back Up / Due Date",
      target: "quick-update-due-field",
    },
    {
      isMissing: () => !String(workOrder.resolution_summary || workOrder.completion_notes || "").trim(),
      title: "Resolution",
      target: "quick-update-resolution-field",
    },
    {
      isMissing: () => workOrder.status === "completed" && requiresSafetyDeviceCheck(workOrder) && !hasCompletedSafetyDeviceCheck(workOrder),
      title: "Safety Devices",
      target: "quick-update-safety-field",
      tone: "warning",
    },
  ];
  const nextField = orderedFields.find((field) => field.isMissing());
  if (nextField) {
    return {
      title: nextField.title,
      helper: "Want to update this next? Skip it if it does not apply.",
      action: "Go To Field",
      target: nextField.target,
      tone: nextField.tone || "",
    };
  }

  if (workOrder.status !== "completed") {
    return {
      title: "Complete Work",
      helper: "The quick update fields are filled in. When the work is done, complete the order.",
      action: "Go To Completion",
      target: "work-order-complete-target",
    };
  }

  return "";
}

function renderWorkOrderCommandSummary(workOrder) {
  const linkedMessages = messageThreads.filter((thread) => thread.work_order_id === workOrder.id).length;
  const partsCount = (partsUsedByWorkOrder[workOrder.id] || []).reduce((sum, row) => sum + (Number(row.quantity_used) || 0), 0);
  const safetyState = !workOrder.asset_id
    ? ["General", "No equipment safety check required", "neutral"]
    : hasCompletedSafetyDeviceCheck(workOrder)
      ? ["Checked", "Safety devices confirmed", "safe"]
      : ["Required", "Check E-stops, sensors, guards, and interlocks before completion", "danger"];
  const nextAction = workOrder.status === "completed"
    ? "Review history or create follow-up if needed"
    : workOrder.status === "blocked"
      ? "Resolve blocker or add current update"
      : workOrder.status === "in_progress"
        ? "Add update, parts, photos, or complete work"
        : "Assign owner or start work";

  return `
    <section class="work-command-summary">
      <button class="command-card status-${workOrder.status}" data-jump-work-section="quick-update-status-field" type="button">
        <span>Status</span>
        <strong>${statusLabel(workOrder.status)}</strong>
        <small>${escapeHtml(nextAction)}</small>
      </button>
      <button class="command-card command-equipment" data-jump-work-section="quick-update-equipment-field" type="button">
        <span>Equipment</span>
        <strong>${escapeHtml(workOrder.assets?.name || "General item / area")}</strong>
        <small>${escapeHtml(workOrder.due_at ? `Due ${workOrder.due_at}` : "Due date unset")}</small>
      </button>
      <button class="command-card command-owner" data-jump-work-section="quick-update-owner-field" type="button">
        <span>Owner</span>
        <strong>${escapeHtml(assignmentLabel(workOrder))}</strong>
        <small>${isVendorAssigned(workOrder) ? "Outside vendor" : "Internal assignment"}</small>
      </button>
      <button class="command-card safety-${safetyState[2]}" data-jump-work-section="quick-update-safety-field" type="button">
        <span>Safety</span>
        <strong>${safetyState[0]}</strong>
        <small>${escapeHtml(safetyState[1])}</small>
      </button>
      ${renderEmailHelperCommandCard(workOrder)}
    </section>
  `;
}

function renderEmailHelperCommandCard(workOrder) {
  if (!workOrder.asset_id) return "";
  return commandShortcut("Email Helper", "Copy", "work-order-email-helper-target", "Copy to paste an email update", "email");
}

function commandShortcut(label, count, targetId, helper, tone) {
  return `
    <button class="command-card command-${tone} ${count ? "" : "empty"}" data-jump-work-section="${targetId}" type="button">
      <span>${escapeHtml(label)}</span>
      <strong>${count}</strong>
      <small>${escapeHtml(helper)}</small>
    </button>
  `;
}

function renderLinkedWorkMessageThread(thread) {
  const messages = messagesByThreadId[thread.id] || [];
  const lastMessage = messages[messages.length - 1];
  return `
    <article class="work-linked-thread">
      <div>
        <strong>${escapeHtml(thread.title)}</strong>
        <span>${escapeHtml(messageThreadScopeLabel(thread))}${lastMessage ? ` - ${escapeHtml(formatMessageTime(lastMessage.created_at))}` : ""}</span>
      </div>
      <button class="secondary-button" data-open-work-message-thread="${thread.id}" type="button">Open Thread</button>
    </article>
  `;
}

function bindWorkspaceEvents() {
  document.querySelector("#company-select").addEventListener("change", async (event) => {
    activeCompanyId = event.target.value;
    activeLocationId = "";
    activeWorkOrderId = null;
    createWorkOrderMode = false;
    localStorage.setItem("maintainops.activeCompanyId", activeCompanyId);
    localStorage.setItem("maintainops.activeLocationId", activeLocationId);
    await render();
  });

  const locationSelect = document.querySelector("#location-select");
  if (locationSelect) {
    locationSelect.addEventListener("change", () => {
      activeLocationId = locationSelect.value;
      activeWorkOrderId = null;
      activeAssetId = null;
      activePartId = null;
      resetWorkOrderPage();
      resetPartsPage();
      localStorage.setItem("maintainops.activeLocationId", activeLocationId);
      renderWorkspace();
    });
  }

  document.querySelector("#sign-out").addEventListener("click", () => supabaseClient.auth.signOut());
  document.querySelector("#new-company").addEventListener("click", renderCompanyCreate);
  document.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!visibleNavItems().some(([id]) => id === button.dataset.section)) return;
      activeSection = button.dataset.section;
      activeWorkOrderId = null;
      activeAssetId = null;
      activePartId = null;
      showPartSourceManager = false;
      createWorkOrderMode = false;
      quickFixMode = false;
      quickFixAssetId = null;
      quickFixRequestId = null;
      resetWorkOrderPage();
      localStorage.setItem("maintainops.activeSection", activeSection);
      renderWorkspace();
    });
  });
  document.querySelector("#show-quick-fix").addEventListener("click", () => {
    activeWorkOrderId = null;
    activeAssetId = null;
    createWorkOrderMode = false;
    quickFixMode = true;
    quickFixAssetId = null;
    quickFixRequestId = null;
    activeSection = "mywork";
    localStorage.setItem("maintainops.activeSection", activeSection);
    renderWorkspace();
  });
  document.querySelector("#show-create-work-order").addEventListener("click", () => {
    activeWorkOrderId = null;
    activeAssetId = null;
    createWorkOrderMode = true;
    quickFixMode = false;
    quickFixAssetId = null;
    quickFixRequestId = null;
    activeSection = "work";
    localStorage.setItem("maintainops.activeSection", activeSection);
    renderWorkspace();
  });
  document.querySelector("#show-request").addEventListener("click", () => {
    activeWorkOrderId = null;
    activeAssetId = null;
    createWorkOrderMode = false;
    quickFixMode = false;
    quickFixAssetId = null;
    quickFixRequestId = null;
    activeSection = "requests";
    localStorage.setItem("maintainops.activeSection", activeSection);
    renderWorkspace();
  });
  document.querySelector("#export-csv").addEventListener("click", exportActiveSectionCsv);

  document.querySelectorAll("[data-setup-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.setupAction !== "confirm-admin-delete-sql") return;
      adminDeleteSqlConfirmed = true;
      localStorage.setItem("maintainops.adminDeleteSqlConfirmed", "true");
      showNotice("Admin delete SQL marked as applied.");
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-message-thread]").forEach((button) => {
    button.addEventListener("click", async () => {
      activeMessageThreadId = button.dataset.messageThread;
      localStorage.setItem("maintainops.activeMessageThreadId", activeMessageThreadId);
      await markMessageThreadRead(activeMessageThreadId);
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-message-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      messageThreadFilter = button.dataset.messageFilter;
      localStorage.setItem("maintainops.messageThreadFilter", messageThreadFilter);
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-open-linked-work-order]").forEach((button) => {
    button.addEventListener("click", () => {
      activeWorkOrderId = button.dataset.openLinkedWorkOrder;
      activeAssetId = null;
      activePartId = null;
      quickFixMode = false;
      createWorkOrderMode = false;
      activeSection = "work";
      localStorage.setItem("maintainops.activeSection", activeSection);
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-jump-work-section]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.jumpWorkSection}`);
      if (!target) return;
      const detailSection = target.closest("details");
      if (detailSection) detailSection.open = true;
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      const highlightTarget = target;
      highlightTarget.classList.add("jump-highlight", "field-jump-highlight");
      setTimeout(() => highlightTarget.classList.remove("jump-highlight"), 1400);
      setTimeout(() => highlightTarget.classList.remove("field-jump-highlight"), 1400);
    });
  });

  document.querySelectorAll("[data-start-work-message]").forEach((button) => {
    button.addEventListener("click", () => {
      messageComposerWorkOrderId = button.dataset.startWorkMessage;
      messageComposerOpen = true;
      activeMessageThreadId = "";
      activeSection = "messages";
      localStorage.setItem("maintainops.messageComposerWorkOrderId", messageComposerWorkOrderId);
      localStorage.setItem("maintainops.activeSection", activeSection);
      localStorage.setItem("maintainops.activeMessageThreadId", activeMessageThreadId);
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-open-work-message-thread]").forEach((button) => {
    button.addEventListener("click", async () => {
      activeMessageThreadId = button.dataset.openWorkMessageThread;
      messageComposerOpen = false;
      activeSection = "messages";
      localStorage.setItem("maintainops.activeMessageThreadId", activeMessageThreadId);
      localStorage.setItem("maintainops.activeSection", activeSection);
      await markMessageThreadRead(activeMessageThreadId);
      renderWorkspace();
    });
  });

  const clearMessageWorkLink = document.querySelector("[data-clear-message-work-link]");
  if (clearMessageWorkLink) {
    clearMessageWorkLink.addEventListener("click", () => {
      messageComposerWorkOrderId = "";
      localStorage.setItem("maintainops.messageComposerWorkOrderId", messageComposerWorkOrderId);
      renderWorkspace();
    });
  }

  const messageSearch = document.querySelector("#message-search");
  if (messageSearch) {
    messageSearch.addEventListener("input", () => {
      messageSearchQuery = messageSearch.value;
      localStorage.setItem("maintainops.messageSearchQuery", messageSearchQuery);
      renderWorkspace();
      const nextSearch = document.querySelector("#message-search");
      nextSearch.focus();
      nextSearch.setSelectionRange(messageSearchQuery.length, messageSearchQuery.length);
    });
  }

  const messageThreadForm = document.querySelector("#message-thread-form");
  if (messageThreadForm) {
    messageThreadForm.addEventListener("submit", createMessageThread);
    const typeSelect = messageThreadForm.querySelector("#message-thread-type");
    const directField = messageThreadForm.querySelector(".message-direct-field");
    const scopeNote = messageThreadForm.querySelector("#message-scope-note");
    const syncMessageComposer = () => {
      const isDirect = typeSelect.value === "direct";
      directField.classList.toggle("hidden-section", !isDirect);
      directField.querySelector("select").disabled = !isDirect;
      scopeNote.textContent = messageComposerScopeNote(typeSelect.value);
    };
    typeSelect.addEventListener("change", syncMessageComposer);
    syncMessageComposer();
  }

  const messageReplyForm = document.querySelector("#message-reply-form");
  if (messageReplyForm) {
    messageReplyForm.addEventListener("submit", sendThreadReply);
  }

  document.querySelectorAll("[data-quick-reply]").forEach((button) => {
    button.addEventListener("click", () => {
      const replyForm = document.querySelector("#message-reply-form");
      const field = replyForm?.querySelector("textarea[name='body']");
      if (!field) return;
      const prefix = field.value.trim();
      field.value = prefix ? `${prefix}\n${button.dataset.quickReply}` : button.dataset.quickReply;
      field.focus();
      autoGrowTextarea(field);
    });
  });

  const backToMyWork = document.querySelector("#back-to-my-work");
  if (backToMyWork) {
    backToMyWork.addEventListener("click", () => {
      activeWorkOrderId = null;
      activeAssetId = null;
      createWorkOrderMode = false;
      quickFixMode = false;
      quickFixAssetId = null;
      quickFixRequestId = null;
      renderWorkspace();
    });
  }

  const backToEquipment = document.querySelector("#back-to-equipment");
  if (backToEquipment) {
    backToEquipment.addEventListener("click", () => {
      activeAssetId = null;
      pendingDeleteAssetId = null;
      renderWorkspace();
    });
  }

  const searchInput = document.querySelector("#workspace-search");
  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value;
    localStorage.setItem("maintainops.searchQuery", searchQuery);
    resetWorkOrderPage();
    resetPartsPage();
    renderWorkspace();
    const nextSearchInput = document.querySelector("#workspace-search");
    nextSearchInput.focus();
    nextSearchInput.setSelectionRange(searchQuery.length, searchQuery.length);
  });

  document.querySelectorAll(".work-card").forEach((card) => {
    card.addEventListener("click", () => {
      activeWorkOrderId = card.dataset.id;
      activeAssetId = null;
      createWorkOrderMode = false;
      quickFixMode = false;
      quickFixAssetId = null;
      quickFixRequestId = null;
      renderWorkspace();
    });
  });

  document.querySelectorAll(".asset-card").forEach((card) => {
    card.addEventListener("click", () => {
      activeAssetId = card.dataset.assetId;
      activeWorkOrderId = null;
      createWorkOrderMode = false;
      quickFixMode = false;
      quickFixAssetId = null;
      quickFixRequestId = null;
      activeSection = "assets";
      localStorage.setItem("maintainops.activeSection", activeSection);
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-open-asset]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      activeAssetId = button.dataset.openAsset;
      activeWorkOrderId = null;
      createWorkOrderMode = false;
      quickFixMode = false;
      quickFixAssetId = null;
      quickFixRequestId = null;
      if (activeSection !== "assets") activeSection = "work";
      localStorage.setItem("maintainops.activeSection", activeSection);
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-mini-work-order]").forEach((item) => {
    item.addEventListener("click", () => {
      activeWorkOrderId = item.dataset.miniWorkOrder;
      activeAssetId = null;
      createWorkOrderMode = false;
      quickFixMode = false;
      quickFixAssetId = null;
      quickFixRequestId = null;
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-search-work-order]").forEach((button) => {
    button.addEventListener("click", () => {
      activeWorkOrderId = button.dataset.searchWorkOrder;
      activeAssetId = null;
      activePartId = null;
      activeSection = "work";
      searchQuery = "";
      localStorage.setItem("maintainops.searchQuery", searchQuery);
      localStorage.setItem("maintainops.activeSection", activeSection);
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-search-asset]").forEach((button) => {
    button.addEventListener("click", () => {
      activeAssetId = button.dataset.searchAsset;
      activeWorkOrderId = null;
      activePartId = null;
      activeSection = "assets";
      searchQuery = "";
      localStorage.setItem("maintainops.searchQuery", searchQuery);
      localStorage.setItem("maintainops.activeSection", activeSection);
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-search-part]").forEach((button) => {
    button.addEventListener("click", () => {
      activePartId = button.dataset.searchPart;
      activeAssetId = null;
      activeWorkOrderId = null;
      activeSection = "parts";
      searchQuery = "";
      localStorage.setItem("maintainops.searchQuery", searchQuery);
      localStorage.setItem("maintainops.activeSection", activeSection);
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-search-request]").forEach((button) => {
    button.addEventListener("click", () => {
      activeSection = "requests";
      const request = maintenanceRequests.find((item) => item.id === button.dataset.searchRequest);
      searchQuery = request?.title || "";
      localStorage.setItem("maintainops.searchQuery", searchQuery);
      localStorage.setItem("maintainops.activeSection", activeSection);
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-search-section]").forEach((button) => {
    button.addEventListener("click", () => {
      activeSection = button.dataset.searchSection;
      searchQuery = button.dataset.searchLabel || "";
      localStorage.setItem("maintainops.searchQuery", searchQuery);
      localStorage.setItem("maintainops.activeSection", activeSection);
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-quick-fix-asset]").forEach((button) => {
    button.addEventListener("click", () => {
      quickFixAssetId = button.dataset.quickFixAsset;
      quickFixRequestId = null;
      activeAssetId = null;
      activeWorkOrderId = null;
      createWorkOrderMode = false;
      quickFixMode = true;
      activeSection = "mywork";
      localStorage.setItem("maintainops.activeSection", activeSection);
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-quick-status]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      const originalText = button.textContent;
      button.disabled = true;
      button.textContent = "Saving...";
      const saved = await setWorkOrderStatus(button.dataset.id, button.dataset.quickStatus);
      if (!saved) {
        button.disabled = false;
        button.textContent = originalText;
      }
    });
  });

  document.querySelectorAll("[data-assign-me]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      await assignWorkOrderToMe(button.dataset.assignMe);
    });
  });

  document.querySelectorAll("[data-delete-work-order]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      requestDeleteWorkOrder(button.dataset.deleteWorkOrder);
    });
  });

  document.querySelectorAll("[data-cancel-delete-work-order]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      pendingDeleteWorkOrderId = null;
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-confirm-delete-work-order]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      await deleteWorkOrder(button.dataset.confirmDeleteWorkOrder);
    });
  });

  document.querySelectorAll("[data-delete-asset]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      requestDeleteAsset(button.dataset.deleteAsset);
    });
  });

  document.querySelectorAll("[data-cancel-delete-asset]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      pendingDeleteAssetId = null;
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-confirm-delete-asset]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      await deleteAsset(button.dataset.confirmDeleteAsset);
    });
  });

  document.querySelectorAll("[data-card-assign]").forEach((form) => {
    form.addEventListener("submit", assignWorkOrderFromCard);
    form.addEventListener("click", (event) => event.stopPropagation());
  });

  document.querySelectorAll("[data-status-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeStatusFilter = button.dataset.statusFilter;
      resetWorkOrderPage();
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-my-work-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      myWorkFilter = button.dataset.myWorkFilter;
      localStorage.setItem("maintainops.myWorkFilter", myWorkFilter);
      resetWorkOrderPage();
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-work-order-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      workOrderFilter = button.dataset.workOrderFilter;
      workOrderAssigneeFilter = "";
      localStorage.setItem("maintainops.workOrderFilter", workOrderFilter);
      localStorage.removeItem("maintainops.workOrderAssigneeFilter");
      resetWorkOrderPage();
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-clear-assignee-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      workOrderAssigneeFilter = "";
      localStorage.removeItem("maintainops.workOrderAssigneeFilter");
      resetWorkOrderPage();
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-work-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      workSort = button.dataset.workSort;
      localStorage.setItem("maintainops.workSort", workSort);
      resetWorkOrderPage();
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-work-page]").forEach((button) => {
    button.addEventListener("click", () => {
      workOrderPage += button.dataset.workPage === "next" ? 1 : -1;
      localStorage.setItem("maintainops.workOrderPage", String(workOrderPage));
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-parts-page]").forEach((button) => {
    button.addEventListener("click", () => {
      partsPage += button.dataset.partsPage === "next" ? 1 : -1;
      localStorage.setItem("maintainops.partsPage", String(partsPage));
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-copy-downtime]").forEach((button) => {
    button.addEventListener("click", async () => {
      const workOrder = workOrders.find((item) => item.id === button.dataset.id);
      if (!workOrder) return;
      const text = button.dataset.copyDowntime === "subject"
        ? downtimeEmailSubject(workOrder)
        : downtimeEmailBody(workOrder);
      const copied = await copyTextToClipboard(text);
      button.textContent = copied ? "Copied" : "Copy failed";
      setTimeout(() => {
        button.textContent = button.dataset.copyDowntime === "subject" ? "Copy Subject" : "Copy Email Body";
      }, 1600);
    });
  });

  bindAutoGrowTextareas();

  const createForm = document.querySelector("#create-work-order-form");
  if (createForm) createForm.addEventListener("submit", createWorkOrder);

  const quickFixForm = document.querySelector("#quick-fix-form");
  if (quickFixForm) quickFixForm.addEventListener("submit", createQuickFix);

  const requestForm = document.querySelector("#request-form");
  if (requestForm) requestForm.addEventListener("submit", createRequest);

  document.querySelectorAll("[data-create-public-request-link]").forEach((button) => {
    button.addEventListener("click", () => createPublicRequestLink(button.dataset.createPublicRequestLink));
  });

  document.querySelectorAll("[data-disable-public-request-link]").forEach((button) => {
    button.addEventListener("click", () => disablePublicRequestLink(button.dataset.disablePublicRequestLink));
  });

  document.querySelectorAll("[data-enable-public-request-link]").forEach((button) => {
    button.addEventListener("click", () => setPublicRequestLinkActive(button.dataset.enablePublicRequestLink, true));
  });

  document.querySelectorAll("[data-regenerate-public-request-link]").forEach((button) => {
    button.addEventListener("click", () => regeneratePublicRequestLink(button.dataset.regeneratePublicRequestLink));
  });

  document.querySelectorAll("[data-copy-public-request-link]").forEach((button) => {
    button.addEventListener("click", async () => {
      const copied = await copyTextToClipboard(button.dataset.copyPublicRequestLink);
      button.textContent = copied ? "Copied" : "Copy failed";
      setTimeout(() => {
        button.textContent = "Copy QR Link";
      }, 1600);
    });
  });

  document.querySelectorAll("[data-convert-request]").forEach((button) => {
    button.addEventListener("click", () => convertRequestToWorkOrder(button.dataset.convertRequest));
  });

  document.querySelectorAll("[data-quick-fix-request]").forEach((button) => {
    button.addEventListener("click", () => openQuickFixForRequest(button.dataset.quickFixRequest));
  });

  const editForm = document.querySelector("#edit-work-order-form");
  if (editForm) editForm.addEventListener("submit", updateWorkOrderDetails);

  const quickUpdateForm = document.querySelector("#quick-update-work-order-form");
  if (quickUpdateForm) quickUpdateForm.addEventListener("submit", updateWorkOrderQuickView);

  const completionForm = document.querySelector("#complete-work-order-form");
  if (completionForm) completionForm.addEventListener("submit", completeWorkOrder);

  document.querySelectorAll('input[name="safety_devices_checked"]').forEach((field) => {
    field.addEventListener("change", syncSafetyDeviceChecks);
  });

  const statusSelect = document.querySelector("#status-select");
  if (statusSelect) statusSelect.addEventListener("change", updateWorkOrderStatus);

  const commentForm = document.querySelector("#comment-form");
  if (commentForm) commentForm.addEventListener("submit", createComment);

  const photoForm = document.querySelector("#photo-form");
  if (photoForm) photoForm.addEventListener("submit", uploadPhoto);

  const assetForm = document.querySelector("#create-asset-form");
  if (assetForm) assetForm.addEventListener("submit", createAsset);

  const editAssetForm = document.querySelector("#edit-asset-form");
  if (editAssetForm) editAssetForm.addEventListener("submit", updateAsset);

  const pmForm = document.querySelector("#create-pm-form");
  if (pmForm) pmForm.addEventListener("submit", createPreventiveSchedule);

  document.querySelectorAll("[data-generate-pm]").forEach((button) => {
    button.addEventListener("click", () => generatePreventiveWorkOrder(button.dataset.generatePm));
  });

  document.querySelectorAll("[data-create-follow-up]").forEach((button) => {
    button.addEventListener("click", () => createFollowUpWorkOrder(button.dataset.createFollowUp));
  });

  const procedureForm = document.querySelector("#create-procedure-form");
  if (procedureForm) procedureForm.addEventListener("submit", createProcedureTemplate);

  const sampleProcedureButton = document.querySelector("#seed-sample-procedure");
  if (sampleProcedureButton) sampleProcedureButton.addEventListener("click", seedSampleProcedure);

  document.querySelectorAll("[data-add-step]").forEach((form) => {
    form.addEventListener("submit", createProcedureStep);
  });

  document.querySelectorAll("[data-step-result]").forEach((field) => {
    field.addEventListener("change", saveStepResult);
  });

  const memberForm = document.querySelector("#add-member-form");
  if (memberForm) memberForm.addEventListener("submit", addCompanyMember);

  document.querySelectorAll("[data-member-role]").forEach((form) => {
    form.addEventListener("submit", updateCompanyMemberRole);
  });

  document.querySelectorAll("[data-view-member-work]").forEach((button) => {
    button.addEventListener("click", () => {
      workOrderAssigneeFilter = button.dataset.viewMemberWork;
      activeSection = "work";
      activeStatusFilter = "active";
      activeWorkOrderId = null;
      activeAssetId = null;
      createWorkOrderMode = false;
      quickFixMode = false;
      localStorage.setItem("maintainops.activeSection", activeSection);
      localStorage.setItem("maintainops.workOrderAssigneeFilter", workOrderAssigneeFilter);
      resetWorkOrderPage();
      renderWorkspace();
    });
  });

  const profileForm = document.querySelector("#profile-form");
  if (profileForm) profileForm.addEventListener("submit", updateMyProfile);

  const inviteForm = document.querySelector("#team-invite-form");
  if (inviteForm) inviteForm.addEventListener("submit", createTeamInvite);

  const partForm = document.querySelector("#create-part-form");
  if (partForm) partForm.addEventListener("submit", createPart);

  document.querySelectorAll("[data-part-inventory-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      partInventoryFilter = button.dataset.partInventoryFilter;
      localStorage.setItem("maintainops.partInventoryFilter", partInventoryFilter);
      resetPartsPage();
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-restock-part]").forEach((form) => {
    form.addEventListener("submit", restockPart);
  });

  document.querySelectorAll("[data-use-part]").forEach((form) => {
    form.addEventListener("submit", usePartFromInventory);
  });

  document.querySelectorAll("[data-edit-part]").forEach((form) => {
    form.addEventListener("submit", updatePart);
  });

  document.querySelectorAll("[data-delete-part]").forEach((button) => {
    button.addEventListener("click", () => requestDeletePart(button.dataset.deletePart));
  });

  document.querySelectorAll("[data-cancel-delete-part]").forEach((button) => {
    button.addEventListener("click", () => {
      pendingDeletePartId = null;
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-confirm-delete-part]").forEach((button) => {
    button.addEventListener("click", () => deletePart(button.dataset.confirmDeletePart));
  });

  document.querySelectorAll("[data-open-part]").forEach((button) => {
    button.addEventListener("click", () => {
      activePartId = button.dataset.openPart;
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-close-part-detail]").forEach((button) => {
    button.addEventListener("click", () => {
      activePartId = null;
      showPartSourceManager = false;
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-toggle-part-sources]").forEach((button) => {
    button.addEventListener("click", () => {
      showPartSourceManager = !showPartSourceManager;
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-rename-part-source]").forEach((form) => {
    form.addEventListener("submit", renamePartSource);
  });

  document.querySelectorAll("[data-part-document]").forEach((form) => {
    form.addEventListener("submit", uploadPartDocument);
  });

  const partsUsedForm = document.querySelector("#parts-used-form");
  if (partsUsedForm) partsUsedForm.addEventListener("submit", recordPartUsed);

  const settingsForm = document.querySelector("#company-settings-form");
  if (settingsForm) settingsForm.addEventListener("submit", updateCompanySettings);

  const logoForm = document.querySelector("#company-logo-form");
  if (logoForm) logoForm.addEventListener("submit", uploadCompanyLogo);

  const locationForm = document.querySelector("#location-form");
  if (locationForm) locationForm.addEventListener("submit", createLocation);

  const publicAppUrlForm = document.querySelector("#public-app-url-form");
  if (publicAppUrlForm) publicAppUrlForm.addEventListener("submit", savePublicAppUrl);
}

async function createAsset(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#asset-create-error");
  if (errorElement) errorElement.textContent = "";
  const submitButton = formElement.querySelector("button[type='submit']");
  const originalButtonText = submitButton?.textContent || "Add Equipment";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
  }
  const form = new FormData(formElement);
  const payload = {
    company_id: activeCompanyId,
    location_id: form.get("location_id") || activeLocationDatabaseId(),
    name: form.get("name"),
    asset_code: form.get("asset_code") || null,
    location: form.get("location") || null,
    parent_asset_id: form.get("parent_asset_id") || null,
    asset_type: form.get("asset_type") || "machine",
    safety_devices_required: form.get("safety_devices_required") === "on",
    status: "running",
  };
  try {
    const { error } = await supabaseClient.from("assets").insert(payload);
    if (error && isMissingColumnError(error, "location_id")) {
      locationsReady = false;
      throw new Error(databaseSetupRequiredMessage("saving equipment locations"));
    }
    if (error && isAssetHierarchySchemaError(error)) {
      throw new Error(equipmentSchemaMessage(error));
    }
    if (error) throw error;
    showNotice("Equipment added.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message;
    else alert(error.message);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  }
}

async function updateAsset(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#asset-edit-error");
  if (errorElement) errorElement.textContent = "";
  const submitButton = formElement.querySelector("button[type='submit']");
  const originalButtonText = submitButton?.textContent || "Save Equipment";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
  }
  const form = new FormData(formElement);
  const payload = {
    name: form.get("name"),
    asset_code: form.get("asset_code") || null,
    location_id: form.get("location_id") || activeLocationDatabaseId(),
    location: form.get("location") || null,
    parent_asset_id: form.get("parent_asset_id") || null,
    asset_type: form.get("asset_type") || "machine",
    safety_devices_required: form.get("safety_devices_required") === "on",
    status: form.get("status"),
  };
  try {
    const { error } = await supabaseClient
      .from("assets")
      .update(payload)
      .eq("id", activeAssetId)
      .eq("company_id", activeCompanyId);
    if (error && isMissingColumnError(error, "location_id")) {
      locationsReady = false;
      throw new Error(databaseSetupRequiredMessage("saving equipment locations"));
    }
    if (error && isAssetHierarchySchemaError(error)) {
      throw new Error(equipmentSchemaMessage(error));
    }
    if (error) throw error;
    showNotice("Equipment saved.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message;
    else alert(error.message);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  }
}

async function updateAssetStatus(assetId, status) {
  const { error } = await supabaseClient
    .from("assets")
    .update({ status })
    .eq("id", assetId)
    .eq("company_id", activeCompanyId);
  return error || null;
}

function assetDeleteBlockers(assetId) {
  return {
    workOrders: workOrders.filter((workOrder) => workOrder.asset_id === assetId).length,
    children: childAssetsFor(assetId).length,
    schedules: preventiveSchedules.filter((schedule) => schedule.asset_id === assetId).length,
    requests: maintenanceRequests.filter((request) => request.asset_id === assetId).length,
  };
}

function assetHasDeleteBlockers(assetId) {
  const blockers = assetDeleteBlockers(assetId);
  return Object.values(blockers).some(Boolean);
}

function requestDeleteAsset(id) {
  if (!canDeleteEquipment()) {
    alert("Only company admins and managers can delete equipment.");
    return;
  }
  if (assetHasDeleteBlockers(id)) {
    const errorElement = document.querySelector("#asset-delete-error");
    if (errorElement) errorElement.textContent = "This equipment has history or linked records and is kept for traceability.";
    return;
  }
  pendingDeleteAssetId = id;
  renderWorkspace();
}

async function deleteAsset(id) {
  if (!canDeleteEquipment()) {
    alert("Only company admins and managers can delete equipment.");
    return;
  }
  const errorElement = document.querySelector("#asset-delete-error");
  if (errorElement) errorElement.textContent = "";
  if (assetHasDeleteBlockers(id)) {
    if (errorElement) errorElement.textContent = "This equipment has history or linked records and is kept for traceability.";
    return;
  }
  const confirmButton = document.querySelector(`[data-confirm-delete-asset="${CSS.escape(id)}"]`);
  if (confirmButton) {
    confirmButton.disabled = true;
    confirmButton.textContent = "Deleting...";
  }

  try {
    const { error } = await supabaseClient
      .from("assets")
      .delete()
      .eq("id", id)
      .eq("company_id", activeCompanyId);
    if (error) {
      throw new Error(error.message.includes("violates foreign key constraint")
        ? "This equipment is linked to records and cannot be deleted."
        : error.message);
    }
    activeAssetId = null;
    pendingDeleteAssetId = null;
    activeSection = "assets";
    showNotice("Equipment deleted.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not delete equipment.";
    if (confirmButton) {
      confirmButton.disabled = false;
      confirmButton.textContent = "Permanently Delete";
    }
  }
}

async function createQuickFixAsset(name, status = "running") {
  const payload = {
    company_id: activeCompanyId,
    location_id: activeLocationDatabaseId(),
    name,
    asset_type: "machine",
    safety_devices_required: true,
    status,
  };
  let response = await supabaseClient
    .from("assets")
    .insert(payload)
    .select()
    .single();
  if (response.error && isMissingColumnError(response.error, "location_id")) {
    locationsReady = false;
    return withSetupError(response, databaseSetupRequiredMessage("adding equipment in this location"));
  }
  if (response.error && isAssetHierarchySchemaError(response.error)) {
    return withSetupError(response, equipmentSchemaMessage(response.error).replace("saving", "adding"));
  }
  return response;
}

async function createPreventiveSchedule(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorElement = document.querySelector("#pm-error");
  if (errorElement) errorElement.textContent = "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Adding...";
  }

  try {
    const form = new FormData(formElement);
    const { error } = await insertWithOptionalProcedure("preventive_schedules", {
      company_id: activeCompanyId,
      location_id: locationIdForAsset(form.get("asset_id")),
      asset_id: form.get("asset_id"),
      title: form.get("title"),
      frequency: form.get("frequency"),
      next_due_at: form.get("next_due_at"),
      ...procedureColumn(form.get("procedure_template_id")),
      active: true,
      created_by: session.user.id,
    });
    if (error) throw error;
    showNotice("PM schedule added.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not add PM schedule.";
    else alert(error.message || error);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Add Schedule";
    }
  }
}

async function createProcedureTemplate(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorElement = document.querySelector("#procedure-error");
  if (errorElement) errorElement.textContent = "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Adding...";
  }

  try {
    const form = new FormData(formElement);
    const { error } = await supabaseClient.from("procedure_templates").insert({
      company_id: activeCompanyId,
      name: form.get("name"),
      description: form.get("description") || null,
      created_by: session.user.id,
    });
    if (error) throw error;
    showNotice("Procedure added.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not add procedure.";
    else alert(error.message || error);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Add Procedure";
    }
  }
}

async function seedSampleProcedure() {
  const button = document.querySelector("#seed-sample-procedure");
  const existing = procedureTemplates.find((template) => template.name.toLowerCase() === "basic equipment inspection");
  if (existing) {
    showNotice("Sample inspection procedure already exists.", "warning");
    return;
  }
  if (button) {
    button.disabled = true;
    button.textContent = "Adding sample...";
  }

  try {
    const { data: template, error: templateError } = await supabaseClient
      .from("procedure_templates")
      .insert({
        company_id: activeCompanyId,
        name: "Basic Equipment Inspection",
        description: "A simple starter checklist for visual checks, readings, and final pass/fail.",
        created_by: session.user.id,
      })
      .select()
      .single();

    if (templateError) throw templateError;

    const steps = [
      { position: 1, prompt: "Confirm lockout or safe operating condition", response_type: "checkbox", required: true },
      { position: 2, prompt: "Inspect for leaks, loose guards, or visible damage", response_type: "pass_fail", required: true },
      { position: 3, prompt: "Record operating reading", response_type: "number", required: false },
      { position: 4, prompt: "Add technician notes", response_type: "text", required: false },
    ].map((step) => ({
      ...step,
      company_id: activeCompanyId,
      procedure_template_id: template.id,
    }));

    const { error: stepsError } = await supabaseClient.from("procedure_steps").insert(steps);
    if (stepsError) throw stepsError;
    showNotice("Sample procedure added.");
    await render();
  } catch (error) {
    showNotice(`Could not add sample procedure: ${error.message || error}`, "warning");
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = "Add sample inspection procedure";
    }
  }
}

async function createProcedureStep(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorElement = document.querySelector(`[data-step-error="${formElement.dataset.addStep}"]`);
  if (errorElement) errorElement.textContent = "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Adding...";
  }

  try {
    const form = new FormData(formElement);
    const template = procedureTemplates.find((item) => item.id === formElement.dataset.addStep);
    const nextPosition = (template?.procedure_steps?.length || 0) + 1;
    const { error } = await supabaseClient.from("procedure_steps").insert({
      company_id: activeCompanyId,
      procedure_template_id: formElement.dataset.addStep,
      position: nextPosition,
      prompt: form.get("prompt"),
      response_type: form.get("response_type"),
      required: form.get("required") === "true",
    });
    if (error) throw error;
    showNotice("Procedure step added.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not add procedure step.";
    else alert(error.message || error);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Add Step";
    }
  }
}

async function addCompanyMember(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const { error } = await supabaseClient.from("company_members").insert({
    company_id: activeCompanyId,
    user_id: form.get("user_id"),
    role: form.get("role"),
  });
  if (error) return alert(error.message);
  await render();
}

async function updateCompanyMemberRole(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const form = new FormData(formElement);
  const submitButton = formElement.querySelector("button[type='submit']");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
  }

  const { error } = await supabaseClient.rpc("update_company_member_role", {
    target_company_id: activeCompanyId,
    target_user_id: formElement.dataset.memberRole,
    new_role: form.get("role"),
  });

  if (error) {
    alert(error.message.includes("update_company_member_role")
      ? "Run supabase/step-next-team-roles.sql before editing roles."
      : error.message);
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Save Role";
    }
    return;
  }

  showNotice("Role saved.");
  await render();
}

async function updateMyProfile(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#profile-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  const form = new FormData(formElement);
  const fullName = String(form.get("full_name") || "").trim();
  if (errorElement) errorElement.textContent = "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
  }

  try {
    const { error } = await supabaseClient
      .from("profiles")
      .upsert({
        company_id: activeCompanyId,
        user_id: session.user.id,
        full_name: fullName,
      }, { onConflict: "company_id,user_id" });

    if (error) throw error;

    showNotice("Profile saved.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not save profile.";
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Save Profile";
    }
  }
}

async function createTeamInvite(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#team-invite-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  const form = new FormData(formElement);
  if (errorElement) errorElement.textContent = "";
  if (!teamInvitesReady) {
    if (errorElement) errorElement.textContent = "Run supabase/step-next-team-invites.sql before inviting by email.";
    return;
  }
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Inviting...";
  }

  try {
    const { error } = await supabaseClient.rpc("create_company_invite", {
      target_company_id: activeCompanyId,
      invite_email: String(form.get("email") || "").trim(),
      invite_role: form.get("role"),
    });

    if (error) {
      if (error.message.includes("create_company_invite") || isColumnSchemaError(error, ["company_invites"])) {
        teamInvitesReady = false;
        throw new Error("Run supabase/step-next-team-invites.sql before inviting by email.");
      }
      throw error;
    }

    showNotice("Invite created.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not create invite.";
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Create Invite";
    }
  }
}

async function createMessageThread(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#message-thread-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  const form = new FormData(formElement);
  if (errorElement) errorElement.textContent = "";
  if (!messagesReady) {
    if (errorElement) errorElement.textContent = "Run supabase/step-next-message-center.sql before creating threads.";
    return;
  }

  const threadType = form.get("thread_type");
  const directUserId = form.get("direct_user_id");
  const memberIds = messageThreadMembersForType(threadType, directUserId);
  const title = String(form.get("title") || "").trim();
  const body = String(form.get("body") || "").trim();
  if (threadType === "direct" && !directUserId) {
    if (errorElement) errorElement.textContent = "Choose a teammate for a direct message.";
    return;
  }
  if (!title || !body) {
    if (errorElement) errorElement.textContent = "Add a subject and message before starting the thread.";
    return;
  }
  if (!memberIds.includes(session.user.id)) memberIds.push(session.user.id);

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Starting...";
  }

  let threadStarted = false;
  try {
    const workOrderId = form.get("work_order_id") || null;
    const threadPayload = {
      company_id: activeCompanyId,
      location_id: threadType === "location" ? activeLocationDatabaseId() : null,
      thread_type: threadType,
      title,
      created_by: session.user.id,
    };
    if (workOrderId && messageWorkOrderLinksReady) {
      threadPayload.work_order_id = workOrderId;
    }

    const { data: thread, error: threadError } = await supabaseClient
      .from("message_threads")
      .insert(threadPayload)
      .select("*")
      .single();

    if (threadError) {
      if (isMissingColumnError(threadError, "work_order_id")) {
        messageWorkOrderLinksReady = false;
      }
      throw threadError;
    }

    const memberRows = [...new Set(memberIds)].map((userId) => ({
      company_id: activeCompanyId,
      thread_id: thread.id,
      user_id: userId,
    }));
    const { error: memberError } = await supabaseClient.from("message_thread_members").insert(memberRows);
    if (memberError) throw memberError;

    const { error: messageError } = await insertThreadMessage(thread.id, body);
    if (messageError) throw messageError;

    activeMessageThreadId = thread.id;
    messageComposerWorkOrderId = "";
    messageComposerOpen = false;
    localStorage.setItem("maintainops.activeMessageThreadId", activeMessageThreadId);
    localStorage.setItem("maintainops.messageComposerWorkOrderId", messageComposerWorkOrderId);
    await markMessageThreadRead(thread.id);
    showNotice("Thread started.");
    threadStarted = true;
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = friendlyMessageCenterError(error);
  } finally {
    if (!threadStarted && submitButton?.isConnected) {
      submitButton.disabled = false;
      submitButton.textContent = "Start Thread";
    }
  }
}

async function sendThreadReply(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#message-reply-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  const body = String(new FormData(formElement).get("body") || "").trim();
  if (!body) return;
  if (errorElement) errorElement.textContent = "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  }

  let replySent = false;
  try {
    const { error } = await insertThreadMessage(formElement.dataset.threadId, body);
    if (error) throw error;

    showNotice("Message sent.");
    await markMessageThreadRead(formElement.dataset.threadId);
    replySent = true;
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = friendlyMessageCenterError(error);
  } finally {
    if (!replySent && submitButton?.isConnected) {
      submitButton.disabled = false;
      submitButton.textContent = "Send Reply";
    }
  }
}

async function markMessageThreadRead(threadId) {
  if (!messagesReady || !threadId) return;
  const readAt = new Date().toISOString();
  messageReadsByThreadId[threadId] = {
    company_id: activeCompanyId,
    thread_id: threadId,
    user_id: session.user.id,
    last_read_at: readAt,
  };
  const { error } = await supabaseClient
    .from("message_reads")
    .upsert(messageReadsByThreadId[threadId], { onConflict: "thread_id,user_id" });
  if (error) console.warn("Could not mark message thread read", error);
}

async function insertThreadMessage(threadId, body) {
  const message = await supabaseClient
    .from("messages")
    .insert({
      company_id: activeCompanyId,
      thread_id: threadId,
      sender_id: session.user.id,
      body,
    });

  if (message.error) return { error: message.error };

  const thread = await supabaseClient
    .from("message_threads")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", threadId)
    .eq("company_id", activeCompanyId);

  return { error: thread.error };
}

function friendlyMessageCenterError(error) {
  if (isMissingColumnError(error, "work_order_id")) {
    return "Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.";
  }
  if (isColumnSchemaError(error, ["message_threads", "message_thread_members", "messages"]) || error.message.includes("message_threads")) {
    messagesReady = false;
    return "Run supabase/step-next-message-center.sql before using Messages.";
  }
  return error.message;
}

async function updateCompanySettings(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const submitButton = formElement.querySelector("button[type='submit']");
  const form = new FormData(formElement);
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
  }
  try {
    const { error } = await supabaseClient
      .from("companies")
      .update({ name: form.get("name") })
      .eq("id", activeCompanyId);
    if (error) throw error;
    showNotice("Company saved.");
    await render();
  } catch (error) {
    showNotice(`Could not save company: ${error.message || error}`, "warning");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Save Company";
    }
  }
}

async function uploadCompanyLogo(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#company-logo-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  const file = new FormData(formElement).get("logo");
  if (errorElement) errorElement.textContent = "";
  if (!file || !file.name) {
    if (errorElement) errorElement.textContent = "Choose a logo image first.";
    return;
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Uploading...";
  }

  try {
    const optimized = await optimizeLogo(file);
    const path = `${activeCompanyId}/logo-${crypto.randomUUID()}-${optimized.fileName}`;
    const upload = await supabaseClient.storage.from("company-logos").upload(path, optimized.blob, {
      contentType: optimized.contentType,
      upsert: false,
    });

    if (upload.error) {
      throw new Error(upload.error.message.includes("Bucket not found")
        ? "Run supabase/step-next-company-logo.sql before uploading a logo."
        : upload.error.message);
    }

    const { error } = await supabaseClient.rpc("set_company_logo", {
      target_company_id: activeCompanyId,
      new_logo_path: path,
    });

    if (error) {
      await removeUploadedObject("company-logos", path);
      throw new Error(isColumnSchemaError(error, ["logo_path"])
        ? "Run supabase/step-next-company-logo.sql before saving a company logo."
        : error.message.includes("set_company_logo")
        ? "Run supabase/step-next-company-logo.sql, then try uploading the logo again."
        : error.message);
    }

    const activeCompany = companies.find((company) => company.id === activeCompanyId);
    if (activeCompany) {
      activeCompany.logo_path = path;
      activeCompany.logoUrl = URL.createObjectURL(optimized.blob);
    }

    showNotice("Company logo uploaded.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not upload logo.";
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Upload Logo";
    }
  }
}

async function createLocation(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#location-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  const name = String(new FormData(formElement).get("name") || "").trim();
  if (!name) return;
  if (errorElement) errorElement.textContent = "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Adding...";
  }

  try {
    const { data, error } = await supabaseClient
      .from("locations")
      .insert({ company_id: activeCompanyId, name })
      .select("id")
      .single();

    if (error) {
      if (isColumnSchemaError(error, ["locations"])) locationsReady = false;
      throw new Error(locationsReady ? error.message : "Run supabase/step-next-locations.sql before adding locations.");
    }

    activeLocationId = data.id;
    localStorage.setItem("maintainops.activeLocationId", activeLocationId);
    showNotice("Location added.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not add location.";
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Add Location";
    }
  }
}

async function createPublicRequestLink(locationId) {
  const errorElement = document.querySelector("#public-request-link-error");
  const button = document.querySelector(`[data-create-public-request-link="${CSS.escape(locationId)}"]`);
  if (errorElement) errorElement.textContent = "";
  if (button) {
    button.disabled = true;
    button.textContent = "Creating...";
  }

  try {
    const { error } = await supabaseClient.rpc("ensure_location_request_link", {
      target_location_id: locationId,
    });

    if (error) {
      publicRequestLinksReady = false;
      throw new Error(error.message.includes("ensure_location_request_link")
        ? "Run supabase/step-next-public-request-links.sql before creating QR request links."
        : error.message);
    }

    showNotice("Location request QR link ready.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not create QR request link.";
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = "Create QR Link";
    }
  }
}

async function disablePublicRequestLink(linkId) {
  const confirmed = window.confirm("Disable this public request QR link? Posted codes for this location will stop accepting requests until you reactivate it.");
  if (!confirmed) return;
  await setPublicRequestLinkActive(linkId, false);
}

async function setPublicRequestLinkActive(linkId, isActive) {
  await updatePublicRequestLink(
    linkId,
    { is_active: Boolean(isActive) },
    isActive ? "Request link reactivated." : "Request link disabled.",
  );
}

async function regeneratePublicRequestLink(linkId) {
  const confirmed = window.confirm("Regenerate this QR code? Any QR codes already printed or shared for this location will stop working.");
  if (!confirmed) return;

  await updatePublicRequestLink(
    linkId,
    {
      token: generatePublicRequestToken(),
      is_active: true,
    },
    "Request QR regenerated.",
  );
}

async function updatePublicRequestLink(linkId, patch, successMessage) {
  const errorElement = document.querySelector("#public-request-link-error");
  if (errorElement) errorElement.textContent = "";

  if (!linkId || !activeCompanyId) {
    if (errorElement) errorElement.textContent = "Select a company before updating request links.";
    return;
  }

  const { data, error } = await supabaseClient
    .from("public_request_links")
    .update({
      ...patch,
      updated_at: new Date().toISOString(),
    })
    .eq("id", linkId)
    .eq("company_id", activeCompanyId)
    .select("id");

  if (error) {
    if (errorElement) errorElement.textContent = error.message;
    return;
  }

  if (!data?.length) {
    if (errorElement) {
      errorElement.textContent = "Could not update the request link. Check that your company role is admin or manager.";
    }
    return;
  }

  showNotice(successMessage);
  await render();
}

function generatePublicRequestToken() {
  if (window.crypto?.getRandomValues) {
    const bytes = new Uint8Array(18);
    window.crypto.getRandomValues(bytes);
    return btoa(String.fromCharCode(...bytes)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
  }

  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
}

function savePublicAppUrl(event) {
  event.preventDefault();
  const errorElement = document.querySelector("#public-request-link-error");
  const rawUrl = String(new FormData(event.currentTarget).get("public_app_url") || "").trim();
  if (errorElement) errorElement.textContent = "";

  if (!rawUrl) {
    publicAppUrlOverride = "";
    localStorage.removeItem("maintainops.publicAppUrl");
    showNotice("Public app URL cleared.");
    renderWorkspace();
    return;
  }

  const normalizedUrl = normalizePublicAppUrl(rawUrl);
  if (!normalizedUrl) {
    if (errorElement) errorElement.textContent = "Enter the full https:// GitHub Pages URL where MaintainOps opens.";
    return;
  }

  publicAppUrlOverride = normalizedUrl;
  localStorage.setItem("maintainops.publicAppUrl", publicAppUrlOverride);
  showNotice("Public app URL saved.");
  renderWorkspace();
}

async function createPart(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#part-create-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  const form = new FormData(formElement);
  if (errorElement) errorElement.textContent = "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Adding...";
  }
  let saveTimeoutId;

  try {
    const payload = {
      company_id: activeCompanyId,
      location_id: activeLocationDatabaseId(),
      name: String(form.get("name") || "").trim(),
      sku: String(form.get("sku") || "").trim() || null,
      supplier_name: String(form.get("supplier_name") || "").trim() || null,
      quantity_on_hand: Number(form.get("quantity_on_hand")) || 0,
      reorder_point: Number(form.get("reorder_point")) || 0,
      unit_cost: Number(form.get("unit_cost")) || 0,
    };

    if (!payload.company_id) {
      throw new Error("Choose a company before adding parts.");
    }
    if (!payload.name) {
      throw new Error("Part name is required.");
    }

    const saveTimeout = new Promise((_, reject) => {
      saveTimeoutId = setTimeout(() => reject(new Error("Part save timed out. Check your connection and try again.")), 20000);
    });
    const { data, error } = await Promise.race([
      supabaseClient.from("parts").insert(payload).select("id").single(),
      saveTimeout,
    ]);
    clearTimeout(saveTimeoutId);

    if (error && isMissingColumnError(error, "location_id")) {
      locationsReady = false;
      throw new Error(databaseSetupRequiredMessage("saving parts by location"));
    }
    if (error && isMissingColumnError(error, "supplier_name")) {
      partSuppliersReady = false;
      throw new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then add the part again.");
    }
    if (error && isMissingColumnError(error, "unit_cost")) {
      partCostsReady = false;
      throw new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.");
    }
    if (error) {
      throw error;
    }

    activePartId = data?.id || null;
    resetPartsPage();
    showNotice("Part added.");
    formElement.reset();
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not add part.";
  } finally {
    if (saveTimeoutId) clearTimeout(saveTimeoutId);
    if (submitButton && submitButton.isConnected) {
      submitButton.disabled = false;
      submitButton.textContent = "Add Part";
    }
  }
}

async function restockPart(event) {
  event.preventDefault();
  const formElement = event.target;
  const submitButton = formElement.querySelector("button[type='submit']");
  const part = parts.find((item) => item.id === formElement.dataset.restockPart);
  const quantity = Number(new FormData(formElement).get("quantity")) || 0;
  if (!part || quantity <= 0) return;
  const originalText = submitButton?.textContent || "Restock";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
  }

  try {
    const { error } = await supabaseClient
      .from("parts")
      .update({ quantity_on_hand: (Number(part.quantity_on_hand) || 0) + quantity })
      .eq("id", part.id)
      .eq("company_id", activeCompanyId);
    if (error) throw error;
    showNotice("Part restocked.");
    await render();
  } catch (error) {
    showNotice(`Could not restock part: ${error.message || error}`, "warning");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }
}

async function usePartFromInventory(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const submitButton = formElement.querySelector("button[type='submit']");
  const part = parts.find((item) => item.id === formElement.dataset.usePart);
  const quantity = Number(new FormData(formElement).get("quantity")) || 0;
  if (!part || quantity <= 0) return;
  const originalText = submitButton?.textContent || "Use";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
  }

  try {
    const currentQuantity = Number(part.quantity_on_hand) || 0;
    const nextQuantity = Math.max(0, currentQuantity - quantity);
    const { error } = await supabaseClient
      .from("parts")
      .update({ quantity_on_hand: nextQuantity })
      .eq("id", part.id)
      .eq("company_id", activeCompanyId);
    if (error) throw error;
    showNotice("Part used.");
    await render();
  } catch (error) {
    showNotice(`Could not use part: ${error.message || error}`, "warning");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }
}

async function updatePart(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const partId = formElement.dataset.editPart;
  const errorElement = document.querySelector(`[data-part-edit-error="${partId}"]`);
  const submitButton = formElement.querySelector("button[type='submit']");
  const form = new FormData(formElement);
  if (errorElement) errorElement.textContent = "";
  const originalText = submitButton?.textContent || "Save Part";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
  }

  const payload = {
    name: form.get("name"),
    sku: form.get("sku") || null,
    supplier_name: form.get("supplier_name") || null,
    quantity_on_hand: Number(form.get("quantity_on_hand")) || 0,
    reorder_point: Number(form.get("reorder_point")) || 0,
    unit_cost: Number(form.get("unit_cost")) || 0,
  };

  try {
    const { error } = await supabaseClient
      .from("parts")
      .update(payload)
      .eq("id", partId)
      .eq("company_id", activeCompanyId);

    if (error && isMissingColumnError(error, "supplier_name")) {
      partSuppliersReady = false;
      throw new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then save again.");
    }

    if (error && isMissingColumnError(error, "unit_cost")) {
      partCostsReady = false;
      throw new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then save again.");
    }

    if (error) throw error;

    activePartId = null;
    showNotice("Part saved.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not save part.";
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }
}

function requestDeletePart(id) {
  if (!canDeleteParts()) {
    alert("Only company admins and managers can delete parts.");
    return;
  }

  const part = parts.find((item) => item.id === id);
  if (!part) return;
  if (partUsageRows(id).length) {
    alert("This part has work order usage history and is kept for traceability.");
    return;
  }

  pendingDeletePartId = id;
  renderWorkspace();
}

async function deletePart(id) {
  if (!canDeleteParts()) {
    alert("Only company admins and managers can delete parts.");
    return;
  }

  const part = parts.find((item) => item.id === id);
  const errorElement = document.querySelector("#part-delete-error");
  if (errorElement) errorElement.textContent = "";
  if (!part) return;

  if (partUsageRows(id).length) {
    if (errorElement) errorElement.textContent = "This part has work order usage history and is kept for traceability.";
    return;
  }
  const confirmButton = document.querySelector(`[data-confirm-delete-part="${CSS.escape(id)}"]`);
  if (confirmButton) {
    confirmButton.disabled = true;
    confirmButton.textContent = "Deleting...";
  }

  try {
    const documentPaths = (partDocumentsByPartId[id] || [])
      .map((document) => document.storage_path)
      .filter(Boolean);
    if (documentPaths.length) {
      const storageDelete = await supabaseClient.storage.from("part-documents").remove(documentPaths);
      if (storageDelete.error) {
        throw new Error(`Could not remove filed receipts/invoices: ${storageDelete.error.message}`);
      }
    }

    const { error } = await supabaseClient
      .from("parts")
      .delete()
      .eq("id", id)
      .eq("company_id", activeCompanyId);

    if (error) {
      throw new Error(error.message.includes("violates foreign key constraint")
        ? "This part is used on a work order and cannot be deleted."
        : error.message);
    }

    activePartId = null;
    pendingDeletePartId = null;
    showNotice("Part deleted.");
    await render();
  } catch (error) {
    if (errorElement) {
      errorElement.textContent = error.message || "Could not delete part.";
    }
    if (confirmButton) {
      confirmButton.disabled = false;
      confirmButton.textContent = "Permanently Delete";
    }
  }
}

async function renamePartSource(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#part-source-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  const form = new FormData(formElement);
  const oldSource = String(form.get("old_source") || "").trim();
  const newSource = String(form.get("new_source") || "").trim();

  if (errorElement) errorElement.textContent = "";
  if (!oldSource) return;
  if (!partSuppliersReady) {
    if (errorElement) errorElement.textContent = "Run supabase/step-next-part-suppliers.sql before editing sources.";
    return;
  }
  if (oldSource === newSource) {
    if (errorElement) errorElement.textContent = "Change the source name before saving.";
    return;
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Renaming...";
  }

  try {
    const { error } = await supabaseClient
      .from("parts")
      .update({ supplier_name: newSource || null })
      .eq("company_id", activeCompanyId)
      .eq("supplier_name", oldSource);

    if (error) {
      if (isMissingColumnError(error, "supplier_name")) partSuppliersReady = false;
      throw new Error(partSuppliersReady
        ? error.message
        : "Run supabase/step-next-part-suppliers.sql before editing sources.");
    }

    showNotice("Part source updated.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not update part source.";
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Rename";
    }
  }
}

async function uploadPartDocument(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const partId = formElement.dataset.partDocument;
  const errorElement = document.querySelector(`[data-part-document-error="${partId}"]`);
  const submitButton = formElement.querySelector("button[type='submit']");
  const file = new FormData(formElement).get("document");

  if (errorElement) errorElement.textContent = "";
  if (!partDocumentsReady) {
    if (errorElement) errorElement.textContent = "Run supabase/step-next-part-documents.sql before attaching files.";
    return;
  }
  if (!file || !file.name) {
    if (errorElement) errorElement.textContent = "Choose a receipt, invoice, photo, or PDF first.";
    return;
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Attaching...";
  }

  const fileName = safeFileName(file.name || "part-file");
  const path = `${activeCompanyId}/${partId}/${crypto.randomUUID()}-${fileName}`;
  try {
    const upload = await supabaseClient.storage.from("part-documents").upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

    if (upload.error) throw upload.error;

    const { error } = await supabaseClient.from("part_documents").insert({
      company_id: activeCompanyId,
      part_id: partId,
      uploaded_by: session.user.id,
      storage_path: path,
      file_name: fileName,
      content_type: file.type || null,
    });

    if (error) {
      await removeUploadedObject("part-documents", path);
      if (isColumnSchemaError(error, ["part_documents"])) partDocumentsReady = false;
      throw new Error(partDocumentsReady
        ? error.message
        : "Run supabase/step-next-part-documents.sql before attaching files.");
    }

    showNotice("Part file attached.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not attach file.";
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Attach File";
    }
  }
}

async function recordPartUsed(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#parts-used-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  if (errorElement) errorElement.textContent = "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Recording...";
  }

  try {
    const form = new FormData(formElement);
    const partId = form.get("part_id");
    const quantity = Number(form.get("quantity_used")) || 1;
    const part = parts.find((item) => item.id === partId);
    if (!activeWorkOrderId) throw new Error("Open a work order before recording parts.");
    if (!part) throw new Error("Choose a part first.");

    const usageError = await addPartUsageToWorkOrder(activeWorkOrderId, part, quantity);
    if (usageError) throw usageError;

    showNotice("Part recorded on work order.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not record part used.";
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Record Part Used";
    }
  }
}
async function addPartUsageToWorkOrder(workOrderId, part, quantity) {
  if (!part) return new Error("Choose a part first.");

  const usagePayload = {
    company_id: activeCompanyId,
    work_order_id: workOrderId,
    part_id: part.id,
    quantity_used: quantity,
    unit_cost_at_use: Number(part.unit_cost) || 0,
  };
  let { error: usageError } = await supabaseClient.from("work_order_parts").insert(usagePayload);
  if (usageError && isMissingColumnError(usageError, "unit_cost_at_use")) {
    delete usagePayload.unit_cost_at_use;
    const retry = await supabaseClient.from("work_order_parts").insert(usagePayload);
    usageError = retry.error;
  }
  if (usageError) return usageError;

  const { error: stockError } = await supabaseClient
    .from("parts")
    .update({ quantity_on_hand: Math.max(0, Number(part.quantity_on_hand) - quantity) })
    .eq("id", part.id)
    .eq("company_id", activeCompanyId);
  if (stockError) return new Error(`Part was recorded, but stock did not update: ${stockError.message}`);
  return null;
}

async function generatePreventiveWorkOrder(scheduleId) {
  const schedule = preventiveSchedules.find((item) => item.id === scheduleId);
  if (!schedule) return;
  const button = document.querySelector(`[data-generate-pm="${CSS.escape(scheduleId)}"]`);
  if (button) {
    button.disabled = true;
    button.textContent = "Generating...";
  }

  try {
    const payload = {
      company_id: activeCompanyId,
      location_id: locationIdForAsset(schedule.asset_id),
      asset_id: schedule.asset_id,
      title: schedule.title,
      description: `Generated from preventive schedule: ${schedule.frequency}.`,
      priority: "medium",
      type: "preventive",
      status: "open",
      due_at: schedule.next_due_at,
      ...procedureColumn(schedule.procedure_template_id),
      created_by: session.user.id,
    };
    applySafetyRequirementPayload(payload);
    applySafetyCheckPayload(payload, false);
    const { data, error } = await insertWithOptionalProcedure("work_orders", payload, { returnSingle: true });

    if (error) throw error;

    const scheduleUpdate = await supabaseClient
      .from("preventive_schedules")
      .update({ next_due_at: nextDueDate(schedule.next_due_at, schedule.frequency) })
      .eq("id", schedule.id)
      .eq("company_id", activeCompanyId);

    activeWorkOrderId = data.id;
    activeSection = "work";
    if (scheduleUpdate.error) {
      showNotice(`PM work generated, but next due date did not update: ${scheduleUpdate.error.message}`, "warning");
    } else {
      showNotice("PM work order generated.");
    }
    await render();
  } catch (error) {
    showNotice(`Could not generate PM work: ${error.message || error}`, "warning");
    if (button) {
      button.disabled = false;
      button.textContent = "Generate Work";
    }
  }
}

async function createFollowUpWorkOrder(sourceId) {
  const source = workOrders.find((item) => item.id === sourceId);
  if (!source) return;

  const payload = {
    company_id: activeCompanyId,
    location_id: source.location_id || locationIdForAsset(source.asset_id),
    asset_id: source.asset_id || null,
    assigned_to: source.assigned_to || null,
    title: `Follow-up: ${source.title}`,
    description: [
      source.resolution_summary ? `Prior resolution: ${source.resolution_summary}` : "",
      source.completion_notes ? `Prior notes: ${source.completion_notes}` : "",
      `Created from completed work order ${source.title}.`,
    ].filter(Boolean).join("\n\n"),
    priority: source.priority || "medium",
    type: "corrective",
    status: "open",
    due_at: null,
    created_by: session.user.id,
  };
  applySafetyRequirementPayload(payload);
  applySafetyCheckPayload(payload, false);
  const { data, error } = await insertWithOptionalProcedure("work_orders", payload, { returnSingle: true });
  if (error) return alert(error.message);

  await updateWorkOrderSafely({ follow_up_needed: false }, source.id);
  await recordWorkOrderEvent(source.id, "follow_up_created", `Follow-up work order created: ${data.title}.`);
  await recordWorkOrderEvent(data.id, "created", `Created as follow-up from ${source.title}.`);
  activeSection = "work";
  activeWorkOrderId = data.id;
  localStorage.setItem("maintainops.activeSection", activeSection);
  await render();
}

function nextDueDate(value, frequency) {
  const date = new Date(`${value}T00:00:00`);
  if (frequency === "weekly") date.setDate(date.getDate() + 7);
  if (frequency === "monthly") date.setMonth(date.getMonth() + 1);
  if (frequency === "quarterly") date.setMonth(date.getMonth() + 3);
  return date.toISOString().slice(0, 10);
}

async function createWorkOrder(event) {
  event.preventDefault();
  const formElement = event.target;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorTarget = document.querySelector("#create-work-order-error");
  submitButton.disabled = true;
  submitButton.textContent = "Creating...";
  if (errorTarget) errorTarget.textContent = "";

  try {
    const form = new FormData(formElement);
    const status = form.get("status") || "open";
    let assetId = form.get("asset_id") || null;
    const newAssetName = String(form.get("new_asset_name") || "").trim();
    if (newAssetName) {
      const { data: newAsset, error: assetError } = await createQuickFixAsset(newAssetName, "running");
      if (assetError) {
        if (errorTarget) errorTarget.textContent = `Could not add equipment: ${assetError.message}`;
        return;
      }
      assetId = newAsset.id;
    }
    if (status === "completed" && assetRequiresSafety(assetId) && form.get("safety_devices_checked") !== "on") {
      if (errorTarget) errorTarget.textContent = "Check safety devices before creating completed work tied to equipment.";
      return;
    }
    const payload = {
      company_id: activeCompanyId,
      location_id: locationIdForAsset(assetId),
      title: form.get("title"),
      description: descriptionWithAssignmentNote(form.get("description"), form.get("assigned_to")),
      asset_id: assetId,
      priority: form.get("priority"),
      type: form.get("type") || "reactive",
      due_at: form.get("due_at") || null,
      assigned_to: assignedUserFromForm(form),
      ...procedureColumn(form.get("procedure_template_id")),
      status,
      created_by: session.user.id,
      actual_minutes: Number(form.get("actual_minutes")) || 0,
      failure_cause: form.get("failure_cause") || null,
      resolution_summary: form.get("resolution_summary") || null,
      follow_up_needed: form.get("follow_up_needed") === "on",
      completion_notes: form.get("completion_notes") || null,
      completed_at: status === "completed" ? new Date().toISOString() : null,
    };
    applySafetyRequirementPayload(payload);
    applySafetyCheckPayload(payload, status === "completed" && payload.safety_check_required && form.get("safety_devices_checked") === "on");
    const { data, error } = await insertWithOptionalProcedure("work_orders", payload, { returnSingle: true });
    if (error) {
      if (errorTarget) errorTarget.textContent = `Could not create work order: ${friendlyWorkOrderSaveError(error)}`;
      return;
    }
    await recordWorkOrderEvent(data.id, "created", "Work order created.");
    if (newAssetName) {
      await recordWorkOrderEvent(data.id, "equipment_created", `Equipment created from work order: ${newAssetName}.`);
    }

    const warnings = [];
    const partId = form.get("part_id");
    if (partId) {
      const part = parts.find((item) => item.id === partId);
      const partError = await addPartUsageToWorkOrder(data.id, part, Number(form.get("quantity_used")) || 1);
      if (partError) warnings.push(`part usage failed: ${partError.message}`);
      else await recordWorkOrderEvent(data.id, "part_used", `Part recorded: ${part?.name || "Part"}.`);
    }

    const photo = form.get("photo");
    if (photo && photo.name) {
      const photoError = await addPhotoToWorkOrder(data.id, photo);
      if (photoError) warnings.push(`photo upload failed: ${photoError.message}`);
      else await recordWorkOrderEvent(data.id, "photo_uploaded", `Photo uploaded: ${photo.name}.`);
    }

    const initialComment = String(form.get("initial_comment") || "").trim();
    if (initialComment) {
      const commentError = await addCommentToWorkOrder(data.id, initialComment);
      if (commentError) warnings.push(`comment failed: ${commentError.message}`);
      else await recordWorkOrderEvent(data.id, "comment_added", "Initial comment added.");
    }

    activeWorkOrderId = data.id;
    createWorkOrderMode = false;
    showNotice(warnings.length ? `Work order created with warning: ${warnings[0]}` : "Work order created.", warnings.length ? "warning" : "success");
    await render();
  } catch (error) {
    if (errorTarget) errorTarget.textContent = `Could not create work order: ${error.message || error}`;
    else alert(error.message || error);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Create Work Order";
  }
}

function openQuickFixForRequest(requestId) {
  const request = maintenanceRequests.find((item) => item.id === requestId);
  if (!request) return;
  quickFixRequestId = requestId;
  quickFixAssetId = request.asset_id || null;
  quickFixMode = true;
  activeWorkOrderId = null;
  activeAssetId = null;
  createWorkOrderMode = false;
  activeSection = "mywork";
  localStorage.setItem("maintainops.activeSection", activeSection);
  renderWorkspace();
}

async function createQuickFix(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorTarget = document.querySelector("#quick-fix-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  if (errorTarget) errorTarget.textContent = "";
  submitButton.disabled = true;
  submitButton.textContent = "Saving...";

  try {
    const form = new FormData(formElement);
    const title = String(form.get("title") || "").trim();
    const resolutionSummary = String(form.get("resolution_summary") || "").trim();
    const quickFixSummary = resolutionSummary || title;
    const markCompleted = form.get("mark_completed") === "on";
    const machineDown = form.get("machine_down") === "on";
    let assetId = form.get("asset_id") || null;
    const newAssetName = String(form.get("new_asset_name") || "").trim();
    if (newAssetName) {
      const { data: newAsset, error: assetError } = await createQuickFixAsset(newAssetName, machineDown ? "offline" : "running");
      if (assetError) {
        if (errorTarget) errorTarget.textContent = assetError.message;
        return;
      }
      assetId = newAsset.id;
    }
    if (markCompleted && assetRequiresSafety(assetId) && form.get("safety_devices_checked") !== "on") {
      if (errorTarget) errorTarget.textContent = "Check safety devices before marking equipment work complete.";
      return;
    }

    const payload = {
      company_id: activeCompanyId,
      location_id: locationIdForAsset(assetId),
      title,
      description: descriptionWithAssignmentNote(quickFixSummary, form.get("assigned_to")),
      asset_id: assetId,
      assigned_to: assignedUserFromForm(form, session.user.id),
      priority: form.get("priority") || "medium",
      type: form.get("type") || "corrective",
      status: markCompleted ? "completed" : "open",
      due_at: form.get("due_at") || null,
      created_by: session.user.id,
      ...procedureColumn(form.get("procedure_template_id")),
      actual_minutes: 0,
      failure_cause: form.get("failure_cause") || null,
      resolution_summary: markCompleted ? quickFixSummary : (resolutionSummary || null),
      follow_up_needed: form.get("follow_up_needed") === "on",
      completion_notes: markCompleted ? quickFixSummary : null,
      completed_at: markCompleted ? new Date().toISOString() : null,
    };
    applySafetyRequirementPayload(payload);
    applySafetyCheckPayload(payload, markCompleted && payload.safety_check_required && form.get("safety_devices_checked") === "on");

    const { data, error } = await insertWithOptionalProcedure("work_orders", payload, { returnSingle: true });

    if (error) {
      if (errorTarget) errorTarget.textContent = `Could not log quick fix: ${friendlyWorkOrderSaveError(error)}`;
      return;
    }

    const warnings = [];
    const partId = form.get("part_id");
    const quantity = Number(form.get("quantity_used")) || 1;
    if (partId) {
      const part = parts.find((item) => item.id === partId);
      const partError = await addPartUsageToWorkOrder(data.id, part, quantity);
      if (partError) warnings.push(`part usage failed: ${partError.message}`);
    }

    const photo = form.get("photo");
    if (photo && photo.name) {
      const photoError = await addPhotoToWorkOrder(data.id, photo);
      if (photoError) warnings.push(`photo upload failed: ${photoError.message}`);
    }

    const assetStatus = machineDown ? "offline" : form.get("asset_status");
    if (payload.asset_id && !newAssetName && (machineDown || (markCompleted && assetStatus))) {
      const assetError = await updateAssetStatus(payload.asset_id, assetStatus);
      if (assetError) {
        warnings.push(`equipment status did not update: ${assetError.message}`);
      } else {
        await recordWorkOrderEvent(data.id, "asset_status_updated", machineDown ? "Equipment marked down/offline." : `Equipment status set to ${assetStatus}.`);
      }
    }

    await recordWorkOrderEvent(data.id, "quick_fix", markCompleted ? "Quick fix recorded as completed." : "Quick fix logged and assigned to creator.");
    if (newAssetName) {
      await recordWorkOrderEvent(data.id, "equipment_created", `Equipment created from Quick Fix: ${newAssetName}.`);
    }
    if (quickFixRequestId && requestsReady) {
      const requestUpdate = await supabaseClient
        .from("maintenance_requests")
        .update({
          status: "converted",
          reviewed_by: session.user.id,
          reviewed_at: new Date().toISOString(),
          converted_work_order_id: data.id,
        })
        .eq("id", quickFixRequestId)
        .eq("company_id", activeCompanyId);
      if (requestUpdate.error) {
        warnings.push(`request status did not update: ${requestUpdate.error.message}`);
      } else {
        await recordWorkOrderEvent(data.id, "request_quick_fixed", markCompleted ? "Request resolved through Quick Fix." : "Request converted to a Quick Fix work order.");
      }
    }
    activeWorkOrderId = data.id;
    activeAssetId = null;
    createWorkOrderMode = false;
    quickFixMode = false;
    quickFixAssetId = null;
    quickFixRequestId = null;
    showNotice(warnings.length ? `Quick Fix saved with warning: ${warnings[0]}` : "Quick Fix saved.", warnings.length ? "warning" : "success");
    await render();
  } catch (error) {
    if (errorTarget) errorTarget.textContent = `Could not log quick fix: ${error.message || error}`;
    else alert(error.message || error);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Log Quick Fix";
  }
}

async function updateWorkOrderDetails(event) {
  event.preventDefault();
  const formElement = event.target;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorTarget = document.querySelector("#work-order-save-error");
  submitButton.disabled = true;
  submitButton.textContent = "Saving...";
  if (errorTarget) errorTarget.textContent = "";

  try {
    const form = new FormData(event.target);
    const previous = workOrders.find((workOrder) => workOrder.id === activeWorkOrderId);
    const payload = {
      title: form.get("title"),
      description: descriptionWithAssignmentNote(form.get("description"), form.get("assigned_to")),
      due_at: form.get("due_at") || null,
      location_id: locationIdForAsset(previous?.asset_id || null),
      priority: form.get("priority"),
      type: form.get("type"),
      assigned_to: assignedUserFromForm(form),
      ...procedureColumn(form.get("procedure_template_id")),
      failure_cause: form.get("failure_cause") || null,
      resolution_summary: form.get("resolution_summary") || null,
      follow_up_needed: form.get("follow_up_needed") === "on",
      actual_minutes: Number(form.get("actual_minutes")) || 0,
    };
    payload.safety_check_required = assetRequiresSafety(previous?.asset_id || null);
    if (previous?.status === "completed" && payload.safety_check_required && form.has("safety_devices_checked")) {
      applySafetyCheckPayload(payload, form.get("safety_devices_checked") === "on" || hasCompletedSafetyDeviceCheck(previous));
    } else if (previous?.status === "completed" && !payload.safety_check_required) {
      applySafetyCheckPayload(payload, false);
    } else if (previous?.status !== "completed") {
      applySafetyCheckPayload(payload, false);
    }
    const { error } = await updateWorkOrderSafely(payload, activeWorkOrderId);
    if (error) {
      submitButton.disabled = false;
      submitButton.textContent = "Save Work Order";
      if (errorTarget) errorTarget.textContent = `Could not save work order: ${friendlyWorkOrderSaveError(error)}`;
      return;
    }
    await recordWorkOrderEvent(activeWorkOrderId, "updated", describeWorkOrderChanges(previous, Object.fromEntries(form.entries())));
    showNotice("Work order saved.");
    await render();
  } catch (error) {
    console.error("Work order save failed", error);
    submitButton.disabled = false;
    submitButton.textContent = "Save Work Order";
    if (errorTarget) errorTarget.textContent = `Could not save work order: ${error.message || error}`;
  }
}

async function updateWorkOrderQuickView(event) {
  event.preventDefault();
  const formElement = event.target;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorTarget = document.querySelector("#quick-update-error");
  const previous = workOrders.find((workOrder) => workOrder.id === activeWorkOrderId);
  const form = new FormData(formElement);
  submitButton.disabled = true;
  submitButton.textContent = "Saving...";
  if (errorTarget) errorTarget.textContent = "";

  try {
    let assetId = form.get("asset_id") || null;
    const newAssetName = String(form.get("new_asset_name") || "").trim();
    if (newAssetName) {
      const { data: newAsset, error: assetError } = await createQuickFixAsset(newAssetName, "running");
      if (assetError) {
        submitButton.disabled = false;
        submitButton.textContent = "Save Quick Update";
        if (errorTarget) errorTarget.textContent = `Could not add equipment: ${assetError.message}`;
        return;
      }
      assetId = newAsset.id;
    }
    const payload = {
      title: form.get("title"),
      description: descriptionWithAssignmentNote(previous?.description || "", form.get("assigned_to")),
      asset_id: assetId,
      location_id: locationIdForAsset(assetId),
      due_at: form.get("due_at") || null,
      status: form.get("status"),
      priority: form.get("priority"),
      assigned_to: assignedUserFromForm(form),
      resolution_summary: form.get("resolution_summary") || null,
    };
    applySafetyRequirementPayload(payload);
    if (payload.status === "completed" && previous?.status !== "completed") {
      applySafetyCheckPayload(payload, form.get("safety_devices_checked") === "on");
      if (requiresSafetyDeviceCheck(payload) && !payload.safety_devices_checked) {
        submitButton.disabled = false;
        submitButton.textContent = "Save Quick Update";
        if (errorTarget) errorTarget.textContent = "Check safety devices before completing work tied to equipment.";
        return;
      }
      payload.completed_at = new Date().toISOString();
    }
    if (payload.status !== "completed") {
      payload.completed_at = null;
      applySafetyCheckPayload(payload, false);
    } else if (previous?.status === "completed") {
      applySafetyCheckPayload(payload, payload.safety_check_required && (form.get("safety_devices_checked") === "on" || hasCompletedSafetyDeviceCheck(previous)));
    }

    const { error } = await updateWorkOrderSafely(payload, activeWorkOrderId);
    if (error) {
      submitButton.disabled = false;
      submitButton.textContent = "Save Quick Update";
      if (errorTarget) errorTarget.textContent = `Could not save update: ${friendlyWorkOrderSaveError(error)}`;
      return;
    }

    const warnings = [];
    if (payload.asset_id && form.get("machine_down") === "on") {
      const assetError = await updateAssetStatus(payload.asset_id, "offline");
      if (assetError) {
        warnings.push(`equipment status did not update: ${assetError.message}`);
      } else {
        await recordWorkOrderEvent(activeWorkOrderId, "asset_status_updated", "Equipment marked down/offline.");
      }
    }

    await recordWorkOrderEvent(activeWorkOrderId, "quick_update", describeWorkOrderChanges(previous, Object.fromEntries(form.entries())));
    if (newAssetName) {
      await recordWorkOrderEvent(activeWorkOrderId, "equipment_created", `Equipment created from work order: ${newAssetName}.`);
    }
    showNotice(warnings.length ? `Quick update saved with warning: ${warnings[0]}` : "Quick update saved.", warnings.length ? "warning" : "success");
    await render();
  } catch (error) {
    console.error("Quick update save failed", error);
    submitButton.disabled = false;
    submitButton.textContent = "Save Quick Update";
    if (errorTarget) errorTarget.textContent = `Could not save update: ${error.message || error}`;
  }
}

async function completeWorkOrder(event) {
  event.preventDefault();
  const formElement = event.target;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorTarget = document.querySelector("#completion-error");
  const workOrder = workOrders.find((item) => item.id === activeWorkOrderId);
  const procedure = procedureTemplates.find((template) => template.id === workOrder?.procedure_template_id);
  const requiredProgress = procedure ? requiredChecklistProgress(workOrder, procedure) : { done: 0, total: 0 };
  if (requiredProgress.done < requiredProgress.total) {
    if (errorTarget) errorTarget.textContent = `Complete required checklist steps first (${requiredProgress.done}/${requiredProgress.total}).`;
    return;
  }
  const form = new FormData(event.target);
  const safetyChecked = form.get("safety_devices_checked") === "on" || currentSafetyCheckboxCheckedForWorkOrder(activeWorkOrderId) || hasCompletedSafetyDeviceCheck(workOrder);
  if (requiresSafetyDeviceCheck(workOrder) && !safetyChecked) {
    if (errorTarget) errorTarget.textContent = "Check safety devices before completing equipment work.";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Completing...";
  if (errorTarget) errorTarget.textContent = "";

  try {
    const payload = {
      status: "completed",
      asset_id: workOrder?.asset_id || null,
      actual_minutes: Number(form.get("actual_minutes")) || 0,
      failure_cause: form.get("failure_cause") || null,
      resolution_summary: form.get("resolution_summary") || null,
      follow_up_needed: form.get("follow_up_needed") === "on",
      completion_notes: form.get("completion_notes") || null,
      completed_at: new Date().toISOString(),
    };
    applySafetyRequirementPayload(payload);
    applySafetyCheckPayload(payload, payload.safety_check_required && safetyChecked);
    delete payload.asset_id;
    const { error } = await updateWorkOrderSafely(payload, activeWorkOrderId);
    if (error) {
      if (errorTarget) errorTarget.textContent = `Could not complete work order: ${friendlyWorkOrderSaveError(error)}`;
      return;
    }
    await recordWorkOrderEvent(activeWorkOrderId, "completed", form.get("resolution_summary") || form.get("completion_notes") || "Work order completed.");
    showNotice("Work order completed.");
    await render();
  } catch (error) {
    if (errorTarget) errorTarget.textContent = `Could not complete work order: ${error.message || error}`;
    else alert(error.message || error);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Complete Work Order";
  }
}

function renderRequestForm() {
  const detailPanel = document.querySelector("#detail-panel");
  detailPanel.innerHTML = renderRequestFormContent();
  document.querySelector("#request-form").addEventListener("submit", createRequest);
}

async function createRequest(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#request-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  if (errorElement) errorElement.textContent = "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";
  }

  try {
    const form = new FormData(formElement);
    const requestPayload = {
      company_id: activeCompanyId,
      location_id: locationIdForAsset(form.get("asset_id") || null),
      title: form.get("title"),
      description: form.get("description"),
      asset_id: form.get("asset_id") || null,
      priority: form.get("priority"),
      status: "submitted",
      requested_by: session.user.id,
    };

    if (!requestsReady) {
      throw new Error("Run supabase/step-next-maintenance-requests.sql before submitting requests.");
    }
    const { error } = await supabaseClient.from("maintenance_requests").insert(requestPayload);
    if (error && isMissingColumnError(error, "location_id")) {
      locationsReady = false;
      throw new Error(databaseSetupRequiredMessage("saving requests by location"));
    }
    if (error) throw error;
    activeSection = "requests";
    localStorage.setItem("maintainops.activeSection", activeSection);
    showNotice("Request submitted.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not submit request.";
    else alert(error.message || error);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Submit Request";
    }
  }
}

async function convertRequestToWorkOrder(requestId) {
  const request = maintenanceRequests.find((item) => item.id === requestId);
  if (!request) return;
  const button = document.querySelector(`[data-convert-request="${CSS.escape(requestId)}"]`);
  if (button) {
    button.disabled = true;
    button.textContent = "Converting...";
  }

  try {
    const payload = {
      company_id: activeCompanyId,
      location_id: request.location_id || locationIdForAsset(request.asset_id),
      title: request.title,
      description: request.description,
      asset_id: request.asset_id || null,
      priority: request.priority || "medium",
      type: "reactive",
      status: "open",
      created_by: session.user.id,
    };
    applySafetyRequirementPayload(payload);
    applySafetyCheckPayload(payload, false);
    const { data, error } = await insertWithOptionalProcedure("work_orders", payload, { returnSingle: true });
    if (error) throw error;

    const { error: updateError } = await supabaseClient
      .from("maintenance_requests")
      .update({
        status: "converted",
        reviewed_by: session.user.id,
        reviewed_at: new Date().toISOString(),
        converted_work_order_id: data.id,
      })
      .eq("id", requestId)
      .eq("company_id", activeCompanyId);
    if (updateError) throw updateError;

    activeSection = "work";
    activeWorkOrderId = data.id;
    localStorage.setItem("maintainops.activeSection", activeSection);
    await recordWorkOrderEvent(data.id, "request_converted", "Request converted to work order.");
    showNotice("Request converted to work order.");
    await render();
  } catch (error) {
    showNotice(`Could not convert request: ${error.message || error}`, "warning");
    if (button) {
      button.disabled = false;
      button.textContent = "Convert to Work Order";
    }
  }
}

async function updateWorkOrderStatus(event) {
  const previous = workOrders.find((item) => item.id === activeWorkOrderId);
  event.target.disabled = true;
  const saved = await setWorkOrderStatus(activeWorkOrderId, event.target.value);
  if (!saved) event.target.value = previous?.status || "open";
  event.target.disabled = false;
}

async function saveStepResult(event) {
  const field = event.target;
  const value = field.type === "checkbox" ? (field.checked ? "checked" : "") : field.value;
  field.disabled = true;
  try {
    const { error } = await supabaseClient.from("work_order_step_results").upsert({
      company_id: activeCompanyId,
      work_order_id: field.dataset.workOrderId,
      procedure_step_id: field.dataset.stepResult,
      completed_by: value ? session.user.id : null,
      value,
      completed_at: value ? new Date().toISOString() : null,
    }, { onConflict: "work_order_id,procedure_step_id" });

    if (error) throw error;
    await recordWorkOrderEvent(field.dataset.workOrderId, "checklist_updated", "Procedure checklist updated.");
    await loadStepResults();
    renderWorkspace();
  } catch (error) {
    showNotice(`Could not save checklist step: ${error.message || error}`, "warning");
    field.disabled = false;
  }
}

async function setWorkOrderStatus(id, status) {
  const workOrder = workOrders.find((item) => item.id === id);
  const safetyCheckedNow = currentSafetyCheckboxCheckedForWorkOrder(id);
  const hasSafetyCheck = hasCompletedSafetyDeviceCheck(workOrder) || safetyCheckedNow;
  if (status === "completed" && requiresSafetyDeviceCheck(workOrder) && !hasSafetyCheck) {
    activeWorkOrderId = id;
    showNotice("Safety devices must be checked before completing equipment work. Open the work order and use Complete Work.", "warning");
    await render();
    return false;
  }
  const payload = {
    status,
    asset_id: workOrder?.asset_id || null,
    completed_at: status === "completed" ? new Date().toISOString() : null,
  };
  applySafetyRequirementPayload(payload);
  if (status === "completed") {
    applySafetyCheckPayload(payload, payload.safety_check_required && hasSafetyCheck);
  } else if (status !== "completed") {
    applySafetyCheckPayload(payload, false);
  }
  delete payload.asset_id;
  const { error } = await updateWorkOrderSafely(payload, id);
  if (error) {
    showNotice(`Could not update status: ${friendlyWorkOrderSaveError(error)}`, "warning");
    return false;
  }
  activeWorkOrderId = id;
  await recordWorkOrderEvent(id, "status_changed", `Status changed to ${statusLabel(status)}.`);
  showNotice(`Status changed to ${statusLabel(status)}.`);
  await render();
  return true;
}

function requestDeleteWorkOrder(id) {
  if (!canDeleteWorkOrders()) {
    alert("Only company admins can delete work orders.");
    return;
  }

  pendingDeleteWorkOrderId = id;
  renderWorkspace();
}

async function deleteWorkOrder(id) {
  if (!canDeleteWorkOrders()) {
    alert("Only company admins can delete work orders.");
    return;
  }

  const photoPaths = (photosByWorkOrder[id] || [])
    .map((photo) => photo.storage_path)
    .filter(Boolean);
  if (photoPaths.length) {
    const storageDelete = await supabaseClient.storage.from("work-order-photos").remove(photoPaths);
    if (storageDelete.error) {
      console.warn("Work order photo storage cleanup failed", storageDelete.error);
    }
  }

  const { error } = await supabaseClient
    .from("work_orders")
    .delete()
    .eq("id", id)
    .eq("company_id", activeCompanyId);

  if (error) {
    alert(`Could not delete work order: ${friendlyWorkOrderSaveError(error)}`);
    return;
  }

  activeWorkOrderId = null;
  activeAssetId = null;
  pendingDeleteWorkOrderId = null;
  showNotice("Work order deleted.");
  await render();
}

async function assignWorkOrderToMe(id) {
  const hasProfile = await ensureProfileForActiveCompany();
  if (!hasProfile) return alert(appError);
  const workOrder = workOrders.find((item) => item.id === id);

  const { error } = await supabaseClient
    .from("work_orders")
    .update({
      assigned_to: session.user.id,
      description: cleanWorkOrderDescription(workOrder?.description) || null,
    })
    .eq("id", id)
    .eq("company_id", activeCompanyId);

  if (error) return alert(friendlyWorkOrderSaveError(error));
  activeWorkOrderId = id;
  activeAssetId = null;
  await recordWorkOrderEvent(id, "assigned", "Assigned to self.");
  await render();
}

async function assignWorkOrderFromCard(event) {
  event.preventDefault();
  event.stopPropagation();
  const formElement = event.currentTarget;
  const workOrder = workOrders.find((item) => item.id === formElement.dataset.cardAssign);
  const form = new FormData(formElement);
  if (!workOrder) return;

  const assignmentValue = form.get("assigned_to") || "";
  const { error } = await supabaseClient
    .from("work_orders")
    .update({
      assigned_to: assignmentValue === OUTSIDE_VENDOR_VALUE ? null : assignmentValue || null,
      description: descriptionWithAssignmentNote(workOrder.description, assignmentValue),
    })
    .eq("id", workOrder.id)
    .eq("company_id", activeCompanyId);

  if (error) return alert(friendlyWorkOrderSaveError(error));
  const summary = assignmentValue === OUTSIDE_VENDOR_VALUE
    ? "Assigned to outside vendor."
    : assignmentValue
      ? `Assigned to ${teamMemberName(assignmentValue)}.`
      : "Assignment cleared.";
  await recordWorkOrderEvent(workOrder.id, "assigned", summary);
  showNotice("Assignment saved.");
  await render();
}

async function createComment(event) {
  event.preventDefault();
  const formElement = event.target;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorTarget = document.querySelector("#comment-error");
  const body = new FormData(formElement).get("body")?.trim();
  if (!body) return;

  submitButton.disabled = true;
  submitButton.textContent = "Adding...";
  if (errorTarget) errorTarget.textContent = "";

  try {
    const error = await addCommentToWorkOrder(activeWorkOrderId, body);

    if (error) {
      if (errorTarget) errorTarget.textContent = `Could not add comment: ${error.message || error}`;
      return;
    }

    await recordWorkOrderEvent(activeWorkOrderId, "comment_added", "Comment added.");
    showNotice("Comment added.");
    await render();
  } catch (error) {
    if (errorTarget) errorTarget.textContent = `Could not add comment: ${error.message || error}`;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Add Comment";
  }
}

async function addCommentToWorkOrder(workOrderId, body) {
  const hasProfile = await ensureProfileForActiveCompany();
  if (!hasProfile) return new Error(appError);

  const payload = {
    company_id: activeCompanyId,
    work_order_id: workOrderId,
    author_id: session.user.id,
    body,
  };
  let { error } = await supabaseClient.from("work_order_comments").insert(payload);

  if (error && isProfileMissingError(error)) {
    await ensureProfileForActiveCompany();
    const retry = await supabaseClient.from("work_order_comments").insert(payload);
    error = retry.error;
  }
  return error || null;
}

async function uploadPhoto(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorTarget = document.querySelector("#photo-error");
  if (errorTarget) errorTarget.textContent = "";
  const file = new FormData(formElement).get("photo");
  if (!file || !file.name) {
    if (errorTarget) errorTarget.textContent = "Choose a photo first.";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Uploading...";
  try {
    const hasProfile = await ensureProfileForActiveCompany();
    if (!hasProfile) throw new Error(appError);

    const error = await addPhotoToWorkOrder(activeWorkOrderId, file);
    if (error) throw error;
    await recordWorkOrderEvent(activeWorkOrderId, "photo_uploaded", `Photo uploaded: ${file.name}.`);
    showNotice("Photo uploaded.");
    await render();
  } catch (error) {
    if (errorTarget) errorTarget.textContent = `Could not upload photo: ${error.message || error}`;
    else alert(error.message || error);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Upload Photo";
  }
}

async function removeUploadedObject(bucket, path) {
  try {
    const { error } = await supabaseClient.storage.from(bucket).remove([path]);
    if (error) console.warn(`Could not remove uploaded ${bucket} object`, error);
  } catch (error) {
    console.warn(`Could not remove uploaded ${bucket} object`, error);
  }
}

async function addPhotoToWorkOrder(workOrderId, file) {
  const hasProfile = await ensureProfileForActiveCompany();
  if (!hasProfile) return new Error(appError);

  const optimized = await optimizePhoto(file);
  const path = `${activeCompanyId}/${workOrderId}/${crypto.randomUUID()}-${optimized.fileName}`;
  const upload = await supabaseClient.storage.from("work-order-photos").upload(path, optimized.blob, {
    contentType: optimized.contentType,
    upsert: false,
  });
  if (upload.error) return upload.error;

  const photoRecord = {
    company_id: activeCompanyId,
    work_order_id: workOrderId,
    uploaded_by: session.user.id,
    storage_path: path,
    file_name: optimized.fileName,
    content_type: optimized.contentType,
    file_size_bytes: optimized.blob.size || null,
    original_file_name: safeFileName(file.name || "photo"),
    original_size_bytes: file.size || null,
  };

  let { error } = await supabaseClient.from("work_order_photos").insert(photoRecord);
  if (error && isColumnSchemaError(error, ["file_size_bytes", "original_file_name", "original_size_bytes"])) {
    delete photoRecord.file_size_bytes;
    delete photoRecord.original_file_name;
    delete photoRecord.original_size_bytes;
    const retry = await supabaseClient.from("work_order_photos").insert(photoRecord);
    error = retry.error;
  }
  if (error) await removeUploadedObject("work-order-photos", path);
  return error || null;
}

async function optimizePhoto(file) {
  const imageTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!imageTypes.includes(file.type)) {
    return {
      blob: file,
      fileName: safeFileName(file.name || "photo"),
      contentType: file.type || "application/octet-stream",
    };
  }

  try {
    const bitmap = await createImageBitmap(file);
    const maxDimension = 2400;
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d", { alpha: false });
    context.drawImage(bitmap, 0, 0, width, height);
    if (bitmap.close) bitmap.close();

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.88));
    if (!blob) throw new Error("Browser could not optimize this image.");

    return {
      blob,
      fileName: `${fileBaseName(file.name || "photo")}.jpg`,
      contentType: "image/jpeg",
    };
  } catch (error) {
    console.warn("Photo optimization failed; uploading original.", error);
    return {
      blob: file,
      fileName: safeFileName(file.name || "photo"),
      contentType: file.type || "application/octet-stream",
    };
  }
}

async function optimizeLogo(file) {
  const imageTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!imageTypes.includes(file.type)) {
    return {
      blob: file,
      fileName: safeFileName(file.name || "logo"),
      contentType: file.type || "application/octet-stream",
    };
  }

  try {
    const bitmap = await createImageBitmap(file);
    const maxDimension = 1200;
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d", { alpha: true });
    context.clearRect(0, 0, width, height);
    context.drawImage(bitmap, 0, 0, width, height);
    if (bitmap.close) bitmap.close();

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) throw new Error("Browser could not optimize this logo.");

    return {
      blob,
      fileName: `${fileBaseName(file.name || "logo")}.png`,
      contentType: "image/png",
    };
  } catch (error) {
    console.warn("Logo optimization failed; uploading original.", error);
    return {
      blob: file,
      fileName: safeFileName(file.name || "logo"),
      contentType: file.type || "application/octet-stream",
    };
  }
}

function fileBaseName(fileName) {
  return safeFileName(fileName).replace(/\.[^/.]+$/, "") || "photo";
}

function safeFileName(fileName) {
  return String(fileName || "photo")
    .replace(/[^a-z0-9._-]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || "photo";
}

function statusLabel(status) {
  if (status === "active" || status === "all") return "Active";
  if (status === "overdue") return "Overdue";
  if (status === "completed_month") return "Completed Month";
  if (status === "completed_week") return "Done This Week";
  if (status === "open") return "New";
  return String(status || "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function activeCompanyRole() {
  return companies.find((company) => company.id === activeCompanyId)?.role || "member";
}

function canManageTeam() {
  return ["admin", "manager"].includes(activeCompanyRole());
}

function canDeleteWorkOrders() {
  return activeCompanyRole() === "admin";
}

function canDeleteParts() {
  return ["admin", "manager"].includes(activeCompanyRole());
}

function canDeleteEquipment() {
  return ["admin", "manager"].includes(activeCompanyRole());
}

function visibleNavItems() {
  const items = [
    ["mywork", "My Work"],
    ["work", "Work Orders"],
    ["planning", "Planning"],
    ["requests", "Requests"],
    ["assets", "Equipment"],
    ["pm", "PM"],
    ["procedures", "Procedures"],
    ["parts", "Parts"],
    ["messages", "Messages"],
    ["team", "Team"],
  ];
  if (canManageTeam()) {
    items.push(["setup", "Admin Setup"], ["settings", "Settings"]);
  }
  return items;
}

function roleLabel(role) {
  const labels = {
    admin: "Admin",
    manager: "Manager",
    technician: "Technician",
    member: "Member",
  };
  return labels[role] || String(role || "Member");
}

function roleDescription(role) {
  const descriptions = {
    admin: "Full company setup, team, and work access.",
    manager: "Can manage work, settings, and teammates.",
    technician: "Focused on assigned work, Quick Fix, and updates.",
    member: "General company access.",
  };
  return descriptions[role] || "General company access.";
}

function assignedUserFromForm(form, defaultUserId = null) {
  const value = form.has("assigned_to") ? form.get("assigned_to") : (defaultUserId || "");
  return value === OUTSIDE_VENDOR_VALUE ? null : value || null;
}

function isVendorAssigned(workOrder) {
  return String(workOrder.description || "").includes(OUTSIDE_VENDOR_NOTE);
}

function requiresSafetyDeviceCheck(workOrderOrPayload) {
  if (!workOrderOrPayload) return false;
  if (Object.prototype.hasOwnProperty.call(workOrderOrPayload, "safety_check_required")) {
    return Boolean(workOrderOrPayload.safety_check_required);
  }
  if (workOrderOrPayload.asset_id) return assetRequiresSafety(workOrderOrPayload.asset_id);
  if (Object.prototype.hasOwnProperty.call(workOrderOrPayload.assets || {}, "safety_devices_required")) {
    return workOrderOrPayload.assets.safety_devices_required !== false;
  }
  return Boolean(workOrderOrPayload.assets?.name);
}

function hasCompletedSafetyDeviceCheck(workOrderOrPayload) {
  return workOrderOrPayload?.status === "completed" && Boolean(workOrderOrPayload?.safety_devices_checked);
}

function currentSafetyCheckboxCheckedForWorkOrder(id) {
  if (activeWorkOrderId !== id) return false;
  return Array.from(document.querySelectorAll('#complete-work-order-form input[name="safety_devices_checked"], #quick-update-work-order-form input[name="safety_devices_checked"]')).some((field) => field.checked);
}

function syncSafetyDeviceChecks(event) {
  document.querySelectorAll('input[name="safety_devices_checked"]').forEach((field) => {
    field.checked = event.target.checked;
  });
}

function applySafetyCheckPayload(payload, checked) {
  payload.safety_devices_checked = Boolean(checked);
  payload.safety_devices_checked_at = checked ? new Date().toISOString() : null;
  return payload;
}

function assetRequiresSafety(assetId) {
  if (!assetId) return false;
  const asset = assets.find((item) => item.id === assetId);
  return asset ? asset.safety_devices_required !== false : true;
}

function applySafetyRequirementPayload(payload) {
  payload.safety_check_required = assetRequiresSafety(payload.asset_id);
  return payload;
}

function assignmentLabel(workOrder) {
  if (isVendorAssigned(workOrder)) return "Outside vendor";
  return workOrder.assigned_profile?.full_name || "Unassigned";
}

function cleanWorkOrderDescription(description) {
  return String(description || "")
    .replace(OUTSIDE_VENDOR_NOTE, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function descriptionWithAssignmentNote(description, assignmentValue) {
  const cleanDescription = cleanWorkOrderDescription(description);
  if (assignmentValue !== OUTSIDE_VENDOR_VALUE) return cleanDescription || null;
  return [cleanDescription, OUTSIDE_VENDOR_NOTE].filter(Boolean).join("\n\n");
}

function downtimeEmailSubject(workOrder) {
  return `Machine Down Update - ${assetNameForWorkOrder(workOrder)} - ${new Date().toLocaleString()}`;
}

function downtimeEmailBody(workOrder) {
  const assetName = assetNameForWorkOrder(workOrder);
  const eta = workOrder.due_at ? `known, target ${formatDate(workOrder.due_at)}` : "unknown at this time";
  const assignedTo = assignmentLabel(workOrder);
  const issue = cleanWorkOrderDescription(workOrder.description) || workOrder.title;
  const currentUpdate = workOrder.resolution_summary || workOrder.failure_cause || workOrder.completion_notes || "No additional update has been entered yet.";

  return [
    `${assetName} is down or needs maintenance attention. At this time, the expected downtime is ${eta}. We will update the team as more information becomes available.`,
    "",
    "Technical details:",
    `Issue: ${issue}`,
    `Work order: ${workOrder.title}`,
    `Equipment: ${assetName}`,
    `Current update: ${currentUpdate}`,
    `Assigned to: ${assignedTo}`,
    `Priority: ${workOrder.priority || "medium"}`,
    `ETA / due date: ${workOrder.due_at ? formatDate(workOrder.due_at) : "Unknown"}`,
  ].join("\n");
}

function assetNameForWorkOrder(workOrder) {
  return workOrder.assets?.name || "Equipment";
}

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString();
}

async function copyTextToClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    console.warn("Clipboard API failed; using fallback.", error);
  }

  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.left = "-9999px";
  document.body.appendChild(field);
  field.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch (error) {
    console.warn("Clipboard fallback failed.", error);
  }
  field.remove();
  return copied;
}

function photoMetaText(photo) {
  const parts = [new Date(photo.created_at).toLocaleString()];
  if (photo.file_size_bytes) parts.push(formatBytes(photo.file_size_bytes));
  if (photo.original_size_bytes && photo.file_size_bytes && photo.original_size_bytes !== photo.file_size_bytes) {
    parts.push(`optimized from ${formatBytes(photo.original_size_bytes)}`);
  }
  return parts.join(" - ");
}

function formatBytes(bytes) {
  const value = Number(bytes) || 0;
  if (!value) return "";
  if (value < 1024) return `${value} B`;
  if (value < 1048576) return `${Math.round(value / 1024)} KB`;
  return `${(value / 1048576).toFixed(value >= 10485760 ? 0 : 1)} MB`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}

function partUsageUnitCost(row) {
  return Number(row.unit_cost_at_use ?? row.parts?.unit_cost ?? 0) || 0;
}

function getDueState(workOrder) {
  if (!workOrder.due_at || workOrder.status === "completed") return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(`${workOrder.due_at}T00:00:00`);
  const diffDays = Math.round((due - today) / 86400000);
  if (diffDays < 0) return { label: "overdue", className: "overdue" };
  if (diffDays === 0) return { label: "due today", className: "due_today" };
  return null;
}

function isProfileMissingError(error) {
  const message = error?.message || "";
  return message.includes("work_order_comments_company_author_profile_fkey") || message.includes("profiles");
}

function isMissingColumnError(error, columnName) {
  const message = error?.message || "";
  return message.includes(columnName) && (message.includes("column") || message.includes("schema cache"));
}

function friendlyWorkOrderSaveError(error) {
  const message = error?.message || "Unknown error";
  if (message.includes("work_orders_company_assigned_profile_fkey")) {
    return "The assigned user needs a company profile before they can be assigned. Try saving as Unassigned, or open Team/Company once for that user.";
  }
  if (message.includes("row-level security")) {
    return "Supabase permissions rejected this update. Make sure you are still a member of this company.";
  }
  return message;
}

async function recordWorkOrderEvent(workOrderId, eventType, summary) {
  try {
    await supabaseClient.from("work_order_events").insert({
      company_id: activeCompanyId,
      work_order_id: workOrderId,
      actor_id: session.user.id,
      event_type: eventType,
      summary,
    });
  } catch (error) {
    console.warn("Could not record work order event", error);
  }
}

function describeWorkOrderChanges(previous, next) {
  if (!previous) return "Work order updated.";
  const changes = [];
  if (previous.title !== next.title) changes.push("title");
  if ((previous.description || "") !== (next.description || "")) changes.push("description");
  if ((previous.due_at || "") !== (next.due_at || "")) changes.push("due date");
  if (previous.priority !== next.priority) changes.push("priority");
  if ((previous.type || "reactive") !== next.type) changes.push("type");
  if ((previous.assigned_to || "") !== (next.assigned_to || "")) changes.push("assignment");
  if ((previous.procedure_template_id || "") !== (next.procedure_template_id || "")) changes.push("procedure");
  if (String(previous.actual_minutes || 0) !== String(next.actual_minutes || 0)) changes.push("actual minutes");
  return changes.length ? `Updated ${changes.join(", ")}.` : "Work order saved.";
}

function buildActivityFeed(comments, photos, events, usedParts = []) {
  return [
    ...comments.map((comment) => ({ ...comment, type: "comment" })),
    ...photos.map((photo) => ({ ...photo, type: "photo" })),
    ...usedParts.map((part) => ({ ...part, type: "part" })),
    ...events.map((event) => ({ ...event, type: "event" })),
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function overdueWorkOrders() {
  return workOrders.filter((workOrder) => getDueState(workOrder)?.className === "overdue");
}

function completedThisWeek() {
  return workOrders.filter(isCompletedThisWeek);
}

function isCompletedThisWeek(workOrder) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  return Boolean(workOrder.completed_at && new Date(workOrder.completed_at) >= cutoff);
}

function completedThisMonth() {
  return workOrders.filter(isCompletedThisMonth);
}

function isCompletedThisMonth(workOrder) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  return Boolean(workOrder.completed_at && new Date(workOrder.completed_at) >= monthStart);
}

function averageCompletionMinutes(source = workOrders) {
  const completed = source.filter((workOrder) => workOrder.status === "completed" && Number(workOrder.actual_minutes) > 0);
  if (!completed.length) return 0;
  const total = completed.reduce((sum, workOrder) => sum + Number(workOrder.actual_minutes || 0), 0);
  return Math.round(total / completed.length);
}

function preventiveDueSoon() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const soon = new Date(today);
  soon.setDate(soon.getDate() + 7);
  return preventiveSchedules.filter((schedule) => {
    const due = new Date(`${schedule.next_due_at}T00:00:00`);
    return due >= today && due <= soon;
  });
}

function planningItems(bucket = "all") {
  const today = startOfToday();
  const soon = new Date(today);
  soon.setDate(soon.getDate() + 7);

  return workOrders
    .filter(matchesActiveLocation)
    .filter((workOrder) => workOrder.status !== "completed" && workOrder.due_at)
    .filter((workOrder) => matchesSearch([
      workOrder.title,
      workOrder.description,
      workOrder.priority,
      workOrder.status,
      workOrder.assets?.name,
      assignmentLabel(workOrder),
    ]))
    .map((workOrder) => {
      const due = new Date(`${workOrder.due_at}T00:00:00`);
      return {
        kind: "work",
        id: workOrder.id,
        title: workOrder.title,
        priority: workOrder.priority,
        status: workOrder.status,
        assetName: workOrder.assets?.name || "No equipment",
        dueAt: workOrder.due_at,
        due,
        workOrder,
      };
    })
    .filter((item) => {
      if (bucket === "overdue") return item.due < today;
      if (bucket === "today") return item.due.getTime() === today.getTime();
      if (bucket === "soon") return item.due > today && item.due <= soon;
      return true;
    })
    .sort((a, b) => a.due - b.due);
}

function planningPmItems() {
  const today = startOfToday();
  const soon = new Date(today);
  soon.setDate(soon.getDate() + 7);

  return preventiveSchedules
    .filter(matchesActiveLocation)
    .filter((schedule) => {
      const due = new Date(`${schedule.next_due_at}T00:00:00`);
      return due >= today && due <= soon;
    })
    .filter((schedule) => matchesSearch([
      schedule.title,
      schedule.frequency,
      schedule.next_due_at,
      schedule.assets?.name,
    ]))
    .map((schedule) => ({
      kind: "pm",
      id: schedule.id,
      title: schedule.title,
      assetName: schedule.assets?.name || "No equipment",
      dueAt: schedule.next_due_at,
      due: new Date(`${schedule.next_due_at}T00:00:00`),
    }))
    .sort((a, b) => a.due - b.due);
}

function followUpItems() {
  return workOrders
    .filter(matchesActiveLocation)
    .filter((workOrder) => workOrder.follow_up_needed)
    .filter((workOrder) => matchesSearch([
      workOrder.title,
      workOrder.description,
      workOrder.failure_cause,
      workOrder.resolution_summary,
      workOrder.assets?.name,
      workOrder.assigned_profile?.full_name,
    ]))
    .map((workOrder) => ({
      kind: "follow_up",
      id: workOrder.id,
      title: workOrder.title,
      assetName: workOrder.assets?.name || "No equipment",
      completedAt: workOrder.completed_at ? new Date(workOrder.completed_at).toLocaleDateString() : "not completed",
      resolution: workOrder.resolution_summary || workOrder.completion_notes || "",
      workOrder,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function lowStockParts() {
  return parts.filter(isLowStockPart);
}

function partUsageRows(partId) {
  return Object.values(partsUsedByWorkOrder)
    .flat()
    .filter((row) => row.part_id === partId);
}

function isLowStockPart(part) {
  return Number(part.quantity_on_hand) <= Number(part.reorder_point);
}

function openMaintenanceRequests() {
  return maintenanceRequests.filter((request) => request.status === "submitted");
}

function exportActiveSectionCsv() {
  const exports = {
    work: {
      filename: "work-orders.csv",
      rows: workOrders.map((workOrder) => ({
        title: workOrder.title,
        status: workOrder.status,
        priority: workOrder.priority,
        type: workOrder.type || "reactive",
        equipment: workOrder.assets?.name || "",
        assigned_to: assignmentLabel(workOrder),
        due_at: workOrder.due_at || "",
        completed_at: workOrder.completed_at || "",
        actual_minutes: workOrder.actual_minutes || 0,
        failure_cause: workOrder.failure_cause || "",
        resolution_summary: workOrder.resolution_summary || "",
        follow_up_needed: Boolean(workOrder.follow_up_needed),
      })),
    },
    assets: {
      filename: "equipment.csv",
      rows: assets.map((asset) => ({
        name: asset.name,
        equipment_id: asset.asset_code || "",
        location: asset.location || "",
        status: asset.status,
      })),
    },
    requests: {
      filename: "maintenance-requests.csv",
      rows: maintenanceRequests.map((request) => ({
        title: request.title,
        status: request.status,
        priority: request.priority,
        equipment: request.assets?.name || "",
        requested_by: profilesByUserId[request.requested_by]?.full_name || "",
        created_at: request.created_at || "",
        converted_work_order_id: request.converted_work_order_id || "",
      })),
    },
    pm: {
      filename: "preventive-schedules.csv",
      rows: preventiveSchedules.map((schedule) => ({
        title: schedule.title,
        equipment: schedule.assets?.name || "",
        frequency: schedule.frequency,
        next_due_at: schedule.next_due_at,
        active: schedule.active,
      })),
    },
    parts: {
      filename: "parts.csv",
      rows: parts.map((part) => ({
        name: part.name,
        sku: part.sku || "",
        supplier_name: part.supplier_name || "",
        quantity_on_hand: part.quantity_on_hand,
        reorder_point: part.reorder_point,
        unit_cost: part.unit_cost || 0,
      })),
    },
    procedures: {
      filename: "procedures.csv",
      rows: procedureTemplates.map((template) => ({
        name: template.name,
        description: template.description || "",
        steps: template.procedure_steps?.length || 0,
      })),
    },
    team: {
      filename: "team.csv",
      rows: companyMembers.map((member) => ({
        user_id: member.user_id,
        name: profilesByUserId[member.user_id]?.full_name || "",
        role: member.role,
      })),
    },
  };

  const selected = exports[activeSection] || exports.work;
  if (!selected.rows.length) return alert("Nothing to export in this section yet.");
  downloadCsv(selected.filename, selected.rows);
}

function downloadCsv(filename, rows) {
  const headers = Object.keys(rows[0]);
  const lines = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(",")),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}
