const app = document.querySelector("#app");

const STATUS_OPTIONS = ["open", "in_progress", "blocked", "completed"];
const TYPE_OPTIONS = ["request", "reactive", "preventive", "inspection", "corrective"];
let supabaseClient;
let session;
let companies = [];
let activeCompanyId = localStorage.getItem("maintainops.activeCompanyId");
let assets = [];
let workOrders = [];
let maintenanceRequests = [];
let requestsReady = false;
let preventiveSchedules = [];
let companyMembers = [];
let parts = [];
let partCostsReady = true;
let procedureTemplates = [];
let proceduresReady = false;
let partsUsedByWorkOrder = {};
let eventsByWorkOrder = {};
let commentsByWorkOrder = {};
let photosByWorkOrder = {};
let stepResultsByWorkOrder = {};
let profilesByUserId = {};
let commentsError = "";
let activeWorkOrderId = null;
let activeAssetId = null;
let quickFixMode = false;
let quickFixAssetId = null;
let quickFixRequestId = null;
let activeStatusFilter = "all";
let queueFilter = "all";
let workSort = localStorage.getItem("maintainops.workSort") || "newest";
let activeSection = localStorage.getItem("maintainops.activeSection") || "work";
let theme = localStorage.getItem("maintainops.theme") || "light";
let searchQuery = localStorage.getItem("maintainops.searchQuery") || "";
let appError = "";

init();

async function init() {
  applyTheme();
  console.log("SUPABASE URL:", window.SUPABASE_URL);
  console.log("SUPABASE KEY:", window.SUPABASE_ANON_KEY);

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
  const { data: companyRows, error: companyError } = await supabaseClient
    .from("companies")
    .select("id, name")
    .in("id", ids)
    .order("created_at", { ascending: true });

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

async function seedStarterAssets() {
  await supabaseClient.from("assets").insert([
    { company_id: activeCompanyId, name: "Packaging Line 2", asset_code: "PKG-002", location: "Plant A / Floor 1", status: "running" },
    { company_id: activeCompanyId, name: "Boiler Room Pump", asset_code: "BLR-P-014", location: "Utilities / Boiler Room", status: "watch" },
  ]);
}

async function loadCompanyData() {
  const [assetResponse, workOrderResponse, requestResponse, scheduleResponse, partsResponse, procedureResponse] = await Promise.all([
    supabaseClient.from("assets").select("*").eq("company_id", activeCompanyId).order("name"),
    supabaseClient
      .from("work_orders")
      .select("*, assets(name), assigned_profile:profiles!work_orders_company_assigned_profile_fkey(full_name)")
      .eq("company_id", activeCompanyId)
      .order("created_at", { ascending: false }),
    supabaseClient
      .from("maintenance_requests")
      .select("*, assets(name)")
      .eq("company_id", activeCompanyId)
      .order("created_at", { ascending: false }),
    supabaseClient
      .from("preventive_schedules")
      .select("*, assets(name)")
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

  assets = assetResponse.data || [];
  workOrders = workOrderResponse.data || [];
  requestsReady = !requestResponse.error;
  maintenanceRequests = requestResponse.error ? [] : (requestResponse.data || []);
  preventiveSchedules = scheduleResponse.error ? [] : (scheduleResponse.data || []);
  parts = partsResponse.error ? [] : (partsResponse.data || []);
  partCostsReady = !parts.length || Object.prototype.hasOwnProperty.call(parts[0], "unit_cost");
  proceduresReady = !procedureResponse.error;
  procedureTemplates = procedureResponse.error ? [] : (procedureResponse.data || []).map((template) => ({
    ...template,
    procedure_steps: (template.procedure_steps || []).sort((a, b) => Number(a.position) - Number(b.position)),
  }));
  await Promise.all([loadProfiles(), loadMembers(), loadComments(), loadPhotos(), loadPartsUsed(), loadStepResults(), loadWorkOrderEvents()]);
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
  const { data } = await supabaseClient
    .from("work_order_photos")
    .select("*")
    .eq("company_id", activeCompanyId)
    .in("work_order_id", ids)
    .order("created_at", { ascending: false });

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

function renderWorkspace() {
  applyTheme();
  const activeCompany = companies.find((company) => company.id === activeCompanyId);
  const visibleWorkOrders = filteredWorkOrders();
  const visibleRequests = filteredRequests();
  const visibleAssets = filteredAssets();
  const visibleSchedules = filteredPreventiveSchedules();
  const visibleProcedures = filteredProcedureTemplates();
  const visibleParts = filteredParts();
  const visibleMembers = filteredMembers();
  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <span class="brand-mark">MO</span>
          <span><strong>MaintainOps</strong><small>Supabase MVP</small></span>
        </div>
        <label class="company-switcher">
          Company
          <select id="company-select">
            ${companies.map((company) => `<option value="${company.id}" ${company.id === activeCompanyId ? "selected" : ""}>${company.name}</option>`).join("")}
          </select>
        </label>
        <button class="secondary-button" id="new-company" type="button">New Company</button>
        <button class="secondary-button theme-toggle" id="theme-toggle" type="button">${theme === "dark" ? "Light Mode" : "Dark Mode"}</button>
        <button class="text-button inverse" id="sign-out" type="button">Sign out</button>
        <nav class="section-nav" aria-label="Workspace sections">
          ${[
            ["work", "Work"],
            ["planning", "Planning"],
            ["requests", "Requests"],
            ["assets", "Assets"],
            ["pm", "PM"],
            ["procedures", "Procedures"],
            ["parts", "Parts"],
            ["team", "Team"],
            ["settings", "Settings"],
          ].map(([id, label]) => `<button class="${activeSection === id ? "active" : ""}" data-section="${id}" type="button">${label}</button>`).join("")}
        </nav>
      </aside>

      <main class="workspace">
        <header class="topbar">
          <div>
            <p class="eyebrow">Authenticated Multi-Tenant MVP</p>
            <h1>${activeCompany?.name || "Company"}</h1>
          </div>
          <button class="primary-button quick-fix-button" id="show-quick-fix" type="button">Quick Fix</button>
          <button class="primary-button" id="show-create-work-order" type="button">New Work Order</button>
          <button class="secondary-button" id="show-request" type="button">Submit Request</button>
          <button class="secondary-button" id="export-csv" type="button">Export CSV</button>
        </header>

        <label class="search-bar">
          Search workspace
          <input id="workspace-search" type="search" value="${escapeHtml(searchQuery)}" placeholder="Search work, assets, parts, people">
        </label>

        <section class="metric-grid">
          ${renderMetric("Open", workOrders.filter((workOrder) => workOrder.status === "open").length)}
          ${renderMetric("In Progress", workOrders.filter((workOrder) => workOrder.status === "in_progress").length)}
          ${renderMetric("Blocked", workOrders.filter((workOrder) => workOrder.status === "blocked").length)}
          ${renderMetric("Completed", workOrders.filter((workOrder) => workOrder.status === "completed").length)}
        </section>

        <section class="insight-grid">
          ${renderInsight("Overdue Work", overdueWorkOrders().length, "Past due and not completed")}
          ${renderInsight("Requests", requestsReady ? openMaintenanceRequests().length : workOrders.filter((workOrder) => workOrder.type === "request" && workOrder.status !== "completed").length, "Waiting for review")}
          ${renderInsight("Done This Week", completedThisWeek().length, "Completed in the last 7 days")}
          ${renderInsight("Avg Completion", `${averageCompletionMinutes()} min`, "Actual minutes on completed work")}
        </section>

        <section class="layout-grid ${activeSection === "work" ? "" : "single-column"}">
          ${activeSection === "work" ? `
          <section class="panel">
            <div class="panel-header">
              <h2>Work Orders</h2>
              <span>${visibleWorkOrders.length} shown</span>
            </div>
            <div class="segmented-control" aria-label="Queue filter">
              <button class="segment ${queueFilter === "all" ? "active" : ""}" data-queue-filter="all" type="button">All Work</button>
              <button class="segment ${queueFilter === "mine" ? "active" : ""}" data-queue-filter="mine" type="button">My Queue</button>
              <button class="segment ${queueFilter === "unassigned" ? "active" : ""}" data-queue-filter="unassigned" type="button">Unassigned</button>
            </div>
            <div class="segmented-control" aria-label="Work order status filter">
              ${["all", ...STATUS_OPTIONS].map((status) => `
                <button class="segment ${activeStatusFilter === status ? "active" : ""}" data-status-filter="${status}" type="button">
                  ${status.replace("_", " ")}
                </button>
              `).join("")}
            </div>
            <div class="segmented-control" aria-label="Work order sort">
              ${[
                ["newest", "Newest"],
                ["due", "Due First"],
                ["priority", "Priority"],
              ].map(([id, label]) => `
                <button class="segment ${workSort === id ? "active" : ""}" data-work-sort="${id}" type="button">${label}</button>
              `).join("")}
            </div>
            <div class="work-list" id="work-order-list">
              ${visibleWorkOrders.map(renderWorkOrderCard).join("") || `<p class="muted">No work orders match this filter.</p>`}
            </div>
          </section>

          <section class="panel">
            <div class="panel-header">
              <h2>${activeAssetId ? "Asset Detail" : activeWorkOrderId ? "Work Order Detail" : quickFixMode ? "Quick Fix" : "Create Work Order"}</h2>
            </div>
            <div id="detail-panel">${activeAssetId ? renderAssetDetail() : activeWorkOrderId ? renderWorkOrderDetail() : quickFixMode ? renderQuickFixForm() : renderCreateWorkOrder()}</div>
          </section>
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
            ` : `<p class="muted">Run supabase/step-next-maintenance-requests.sql to store requests separately from work orders. Until then, submitted requests will use the old work order fallback.</p>`}
          </section>

          <section class="panel full-width ${activeSection === "assets" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Assets</h2>
              <span>${visibleAssets.length} shown</span>
            </div>
            <form class="inline-form" id="create-asset-form">
              <input name="name" required placeholder="Asset name">
              <input name="asset_code" placeholder="Asset code">
              <input name="location" placeholder="Location">
              <button class="secondary-button" type="submit">Add Asset</button>
            </form>
            <div class="asset-health-grid">
              ${["running", "watch", "degraded", "offline"].map((status) => `
                <article class="asset-health ${status}">
                  <span>${status}</span>
                  <strong>${assets.filter((asset) => asset.status === status).length}</strong>
                </article>
              `).join("")}
            </div>
            <div class="asset-list">
              ${visibleAssets.map(renderAssetCard).join("") || `<p class="muted">No assets match this search.</p>`}
            </div>
          </section>

          <section class="panel full-width ${activeSection === "pm" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Preventive Maintenance</h2>
              <span>${visibleSchedules.length} shown</span>
            </div>
            <form class="inline-form pm-form" id="create-pm-form">
              <input name="title" required placeholder="Monthly compressor PM">
              <select name="asset_id" required>
                <option value="">Asset</option>
                ${assets.map((asset) => `<option value="${asset.id}">${escapeHtml(asset.name)}</option>`).join("")}
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
              <button class="secondary-button" type="submit">Add Procedure</button>
            </form>
            <button class="text-button" id="seed-sample-procedure" type="button">Add sample inspection procedure</button>
            <div class="procedure-list">
              ${visibleProcedures.map(renderProcedureTemplate).join("") || `<p class="muted">No procedures match this search.</p>`}
            </div>
            ` : `<p class="muted">Run supabase/step-next-procedures.sql to turn on procedure templates.</p>`}
          </section>

          <section class="panel full-width ${activeSection === "team" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Team</h2>
              <span>${visibleMembers.length} shown</span>
            </div>
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
            <div class="member-list">
              ${visibleMembers.map(renderMember).join("") || `<p class="muted">No team members match this search.</p>`}
            </div>
          </section>

          <section class="panel full-width ${activeSection === "parts" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Parts Inventory</h2>
              <span>${visibleParts.length} shown</span>
            </div>
            <div class="parts-health-grid">
              ${renderPartsHealth()}
            </div>
            <form class="inline-form parts-form relationship-detail parts" id="create-part-form">
              <label>Part name<input name="name" required placeholder="Motor bearing"></label>
              <label>SKU<input name="sku" placeholder="BRG-204"></label>
              <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="0"></label>
              <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="0"></label>
              <label>Unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="0"></label>
              <p class="error-text" id="part-create-error">${partCostsReady ? "" : "Run supabase/step-next-part-costs.sql before saving unit costs."}</p>
              <button class="secondary-button" type="submit">Add Part</button>
            </form>
            <div class="parts-list">
              ${visibleParts.map(renderPart).join("") || `<p class="muted">No parts match this search.</p>`}
            </div>
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
            <div class="settings-summary">
              <article><strong>Company ID</strong><span>${escapeHtml(activeCompanyId)}</span></article>
              <article><strong>Signed in as</strong><span>${escapeHtml(session.user.email || session.user.id)}</span></article>
              <article><strong>Active section</strong><span>${escapeHtml(activeSection)}</span></article>
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
    const statusMatch = activeStatusFilter === "all" || workOrder.status === activeStatusFilter;
    const queueMatch =
      queueFilter === "all" ||
      (queueFilter === "mine" && workOrder.assigned_to === session.user.id) ||
      (queueFilter === "unassigned" && !workOrder.assigned_to);
    return statusMatch && queueMatch && matchesSearch([
      workOrder.title,
      workOrder.description,
      workOrder.status,
      workOrder.priority,
      workOrder.type,
      workOrder.assets?.name,
      workOrder.assigned_profile?.full_name,
    ]);
  }).sort(compareWorkOrders);
}

function compareWorkOrders(a, b) {
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

function filteredRequests() {
  return maintenanceRequests.filter((request) => matchesSearch([
    request.title,
    request.description,
    request.status,
    request.priority,
    request.assets?.name,
    profilesByUserId[request.requested_by]?.full_name,
  ]));
}

function filteredAssets() {
  return assets.filter((asset) => matchesSearch([
    asset.name,
    asset.asset_code,
    asset.location,
    asset.status,
  ]));
}

function filteredPreventiveSchedules() {
  return preventiveSchedules.filter((schedule) => matchesSearch([
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
  return parts.filter((part) => matchesSearch([
    part.name,
    part.sku,
    part.quantity_on_hand,
    part.reorder_point,
  ]));
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

function renderMetric(label, value) {
  return `<article class="metric"><span>${label}</span><strong>${value}</strong></article>`;
}

function renderInsight(label, value, description) {
  return `
    <article class="insight">
      <span>${label}</span>
      <strong>${value}</strong>
      <p>${description}</p>
    </article>
  `;
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
        <span class="eyebrow">${escapeHtml(item.priority)} ${escapeHtml(item.status.replace("_", " "))}</span>
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.assetName)} - due ${escapeHtml(item.dueAt)}</p>
      </div>
      ${renderRelationshipChips(item.workOrder)}
    </article>
  `;
}

function renderAssetCard(asset) {
  const openWork = workOrders.filter((workOrder) => workOrder.asset_id === asset.id && workOrder.status !== "completed").length;
  return `
    <article class="asset-card asset-state-${asset.status} ${asset.id === activeAssetId ? "selected" : ""}" data-asset-id="${asset.id}" tabindex="0">
      <div>
        <div class="chip-row">
          <span class="chip asset-${asset.status}">${escapeHtml(asset.status)}</span>
          ${asset.asset_code ? `<span class="chip">${escapeHtml(asset.asset_code)}</span>` : ""}
        </div>
        <h3>${escapeHtml(asset.name)}</h3>
        <p>${escapeHtml(asset.location || "No location set")}</p>
      </div>
      <span class="muted">${openWork} open work</span>
    </article>
  `;
}

function renderAssetDetail() {
  const asset = assets.find((item) => item.id === activeAssetId);
  if (!asset) return renderCreateWorkOrder();
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
          ${asset.asset_code ? `<span class="chip">${escapeHtml(asset.asset_code)}</span>` : ""}
        </div>
        <h2>${escapeHtml(asset.name)}</h2>
        <p>${escapeHtml(asset.location || "No location set")}</p>
      </div>

      <div class="quick-actions detail-quick-actions">
        <button class="assign-action" data-quick-fix-asset="${asset.id}" type="button">Quick Fix for this asset</button>
      </div>

      <form class="form-grid" id="edit-asset-form">
        <label>Asset name<input name="name" required value="${escapeHtml(asset.name)}"></label>
        <label>Asset code<input name="asset_code" value="${escapeHtml(asset.asset_code || "")}"></label>
        <label>Location<input name="location" value="${escapeHtml(asset.location || "")}"></label>
        <label>Status
          <select name="status">
            ${["running", "watch", "degraded", "offline"].map((status) => `<option value="${status}" ${status === asset.status ? "selected" : ""}>${status}</option>`).join("")}
          </select>
        </label>
        <button class="secondary-button" type="submit">Save Asset</button>
      </form>

      <section>
        <h3>Open Work</h3>
        <div class="mini-list">
          ${openWork.map(renderAssetMiniWorkOrder).join("") || `<p class="muted">No open work for this asset.</p>`}
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
          ${assetSchedules.map((schedule) => `<article><strong>${escapeHtml(schedule.title)}</strong><span>${schedule.frequency} - next due ${schedule.next_due_at}</span></article>`).join("") || `<p class="muted">No PM schedules for this asset.</p>`}
        </div>
      </section>

      <section>
        <h3>Parts Used</h3>
        <div class="mini-list">
          ${usedParts.map((row) => `<article><strong>${escapeHtml(row.parts?.name || "Part")}</strong><span>${row.quantity_used} used</span></article>`).join("") || `<p class="muted">No parts history yet.</p>`}
        </div>
      </section>
    </div>
  `;
}

function renderMiniWorkOrder(workOrder) {
  return `
    <article class="mini-work-order" data-mini-work-order="${workOrder.id}">
      <strong>${escapeHtml(workOrder.title)}</strong>
      <span>${workOrder.status.replace("_", " ")} · ${workOrder.due_at || "no due date"}</span>
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
        <span class="chip ${workOrder.status}">${workOrder.status.replace("_", " ")}</span>
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
        <p>${escapeHtml(schedule.assets?.name || "No asset")} - Next due ${schedule.next_due_at}</p>
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
  return Boolean(error?.message?.includes("procedure_template_id") || error?.message?.includes("schema cache"));
}

function isColumnSchemaError(error, columns) {
  const message = error?.message || "";
  return message.includes("schema cache") || columns.some((column) => message.includes(column));
}

async function insertWithOptionalProcedure(table, payload, options = {}) {
  let query = supabaseClient.from(table).insert(payload);
  if (options.returnSingle) query = query.select().single();
  const response = await query;
  if (!response.error || !("procedure_template_id" in payload) || !isProcedureSchemaError(response.error)) return response;

  proceduresReady = false;
  const fallbackPayload = { ...payload };
  delete fallbackPayload.procedure_template_id;
  query = supabaseClient.from(table).insert(fallbackPayload);
  if (options.returnSingle) query = query.select().single();
  return query;
}

async function updateWithOptionalProcedure(table, payload, id) {
  let response = await supabaseClient
    .from(table)
    .update(payload)
    .eq("id", id)
    .eq("company_id", activeCompanyId);
  if (!response.error || !("procedure_template_id" in payload) || !isProcedureSchemaError(response.error)) return response;

  proceduresReady = false;
  const fallbackPayload = { ...payload };
  delete fallbackPayload.procedure_template_id;
  return supabaseClient
    .from(table)
    .update(fallbackPayload)
    .eq("id", id)
    .eq("company_id", activeCompanyId);
}

async function updateWorkOrderWithFallback(payload, id) {
  let response = await updateWithOptionalProcedure("work_orders", payload, id);
  if (!response.error || !isColumnSchemaError(response.error, ["procedure_template_id", "actual_minutes", "failure_cause", "resolution_summary", "follow_up_needed"])) {
    return response;
  }

  const fallbackPayload = { ...payload };
  delete fallbackPayload.procedure_template_id;
  delete fallbackPayload.actual_minutes;
  delete fallbackPayload.failure_cause;
  delete fallbackPayload.resolution_summary;
  delete fallbackPayload.follow_up_needed;
  return supabaseClient
    .from("work_orders")
    .update(fallbackPayload)
    .eq("id", id)
    .eq("company_id", activeCompanyId);
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
  return `
    <article class="member-card">
      <div>
        <strong>${escapeHtml(profile?.full_name || member.user_id)}</strong>
        <p>${escapeHtml(member.user_id)}</p>
      </div>
      <span class="chip">${escapeHtml(member.role)}</span>
    </article>
  `;
}

function renderPart(part) {
  const quantity = Number(part.quantity_on_hand) || 0;
  const reorderPoint = Number(part.reorder_point) || 0;
  const unitCost = Number(part.unit_cost) || 0;
  const low = quantity <= reorderPoint;
  const restockNeed = Math.max(0, reorderPoint - quantity);
  return `
    <article class="part-card ${low ? "low-stock" : ""}">
      <div>
        <div class="chip-row">
          ${part.sku ? `<span class="chip">${escapeHtml(part.sku)}</span>` : ""}
          ${low ? `<span class="chip overdue">low stock</span>` : `<span class="chip open">stocked</span>`}
        </div>
        <h3>${escapeHtml(part.name)}</h3>
        <p>${quantity} on hand - reorder at ${reorderPoint}</p>
        <p>${money(unitCost)} each - ${money(quantity * unitCost)} stocked value</p>
        ${low && reorderPoint > 0 ? `<small>Need ${restockNeed} to reach reorder point.</small>` : ""}
      </div>
      <form class="restock-form" data-restock-part="${part.id}">
        <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Restock quantity for ${escapeHtml(part.name)}">
        <button class="secondary-button" type="submit">Restock</button>
      </form>
      <details class="part-edit">
        <summary>Edit part</summary>
        <form class="part-edit-form" data-edit-part="${part.id}">
          <label>Name<input name="name" required value="${escapeHtml(part.name)}"></label>
          <label>SKU<input name="sku" value="${escapeHtml(part.sku || "")}"></label>
          <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="${quantity}"></label>
          <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="${reorderPoint}"></label>
          <label>Unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="${unitCost}"></label>
          <p class="error-text" data-part-edit-error="${part.id}"></p>
          <button class="secondary-button" type="submit">Save Part</button>
        </form>
      </details>
    </article>
  `;
}

function renderPartsHealth() {
  const lowCount = lowStockParts().length;
  const totalUnits = parts.reduce((sum, part) => sum + (Number(part.quantity_on_hand) || 0), 0);
  const stockedValue = parts.reduce((sum, part) => sum + ((Number(part.quantity_on_hand) || 0) * (Number(part.unit_cost) || 0)), 0);
  const reorderTracked = parts.filter((part) => Number(part.reorder_point) > 0).length;
  return [
    ["Low Stock", lowCount],
    ["Total Units", totalUnits],
    ["Stock Value", money(stockedValue)],
    ["Part Types", parts.length],
  ].map(([label, value]) => `
    <article class="parts-health ${label === "Low Stock" && value ? "attention" : ""}">
      <span>${label}</span>
      <strong>${value}</strong>
    </article>
  `).join("");
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
          <span>${escapeHtml(request.assets?.name || "No asset")}</span>
          <span>${escapeHtml(profilesByUserId[request.requested_by]?.full_name || "Requester")}</span>
          <span>${new Date(request.created_at).toLocaleString()}</span>
        </div>
      </div>
      ${request.status === "submitted" ? `
        <div class="request-actions">
          <button class="secondary-button" data-quick-fix-request="${request.id}" type="button">Quick Fix</button>
          <button class="secondary-button" data-convert-request="${request.id}" type="button">Convert to Work Order</button>
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
      <label>Asset
        <select name="asset_id">
          <option value="">Unknown or general location</option>
          ${assets.map((asset) => `<option value="${asset.id}">${escapeHtml(asset.name)}</option>`).join("")}
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
      <button class="primary-button" type="submit">Submit Request</button>
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
        <span>${new Date(item.created_at).toLocaleString()}</span>
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
    <article class="work-card ${workOrder.id === activeWorkOrderId ? "selected" : ""}" data-id="${workOrder.id}" tabindex="0">
      <div class="chip-row">
        <span class="chip ${workOrder.priority}">${workOrder.priority}</span>
        <span class="chip">${escapeHtml(workOrder.type || "reactive")}</span>
        <span class="chip ${workOrder.status}">${workOrder.status.replace("_", " ")}</span>
        ${dueState ? `<span class="chip ${dueState.className}">${dueState.label}</span>` : ""}
      </div>
      <h3>${escapeHtml(workOrder.title)}</h3>
      <p>${escapeHtml(workOrder.description || "No description.")}</p>
      <div class="meta-row">
        <span>${escapeHtml(workOrder.assets?.name || "No asset")}</span>
        <span>${escapeHtml(workOrder.assigned_profile?.full_name || "Unassigned")}</span>
        ${procedure ? `<span>${escapeHtml(procedure.name)}</span>` : ""}
        <span>Due ${workOrder.due_at || "unset"}</span>
        ${workOrder.completed_at ? `<span>Completed ${new Date(workOrder.completed_at).toLocaleDateString()}</span>` : ""}
      </div>
      ${renderRelationshipChips(workOrder)}
      <div class="quick-actions">
        ${!workOrder.assigned_to ? `<button class="assign-action" data-assign-me="${workOrder.id}" type="button">Assign to me</button>` : ""}
        ${STATUS_OPTIONS.filter((status) => status !== workOrder.status).slice(0, 3).map((status) => `
          <button data-quick-status="${status}" data-id="${workOrder.id}" type="button">${status.replace("_", " ")}</button>
        `).join("")}
      </div>
    </article>
  `;
}

function renderCreateWorkOrder() {
  return `
    <form class="form-grid" id="create-work-order-form">
      <label>Title<input name="title" required placeholder="Inspect packaging line sensor"></label>
      <label>Description<textarea name="description" rows="3"></textarea></label>
      <label>Asset
        <select name="asset_id">
          <option value="">No asset</option>
          ${assets.map((asset) => `<option value="${asset.id}">${escapeHtml(asset.name)}</option>`).join("")}
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
      <label>Due date<input name="due_at" type="date"></label>
      <label>Assign to
        <select name="assigned_to">
          <option value="">Unassigned</option>
          ${Object.entries(profilesByUserId).map(([userId, profile]) => `<option value="${userId}">${escapeHtml(profile.full_name || "Team member")}</option>`).join("")}
        </select>
      </label>
      <label>Procedure
        <select name="procedure_template_id">
          ${renderProcedureOptions()}
        </select>
      </label>
      <button class="primary-button" type="submit">Create Work Order</button>
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
        <p class="muted">Fast record for work already handled.</p>
      </div>
      ${sourceRequest ? `<p class="completion-note">Resolving request: ${escapeHtml(sourceRequest.title)}</p>` : ""}
      <label>What happened?<input name="title" required placeholder="Replaced loose guard switch" value="${escapeHtml(sourceRequest?.title || "")}"></label>
      <label>Asset
        <select name="asset_id">
          <option value="">No asset / general area</option>
          ${assets.map((asset) => `<option value="${asset.id}" ${asset.id === (selectedAssetId || sourceRequest?.asset_id) ? "selected" : ""}>${escapeHtml(asset.name)}</option>`).join("")}
        </select>
      </label>
      <label>What did you do?<textarea name="resolution_summary" rows="3" required placeholder="Tightened mount, tested switch, line returned to normal."></textarea></label>
      <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="Loose mount, worn part, operator report, unknown...">${escapeHtml(sourceRequest?.description || "")}</textarea></label>
      <label>Asset status after fix
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
      <label>Photo<input name="photo" type="file" accept="image/*"></label>
      <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
      <p class="error-text" id="quick-fix-error"></p>
      <button class="primary-button" type="submit">Save Quick Fix</button>
    </form>
  `;
}

function renderRelationshipChips(workOrder) {
  const procedure = procedureTemplates.find((template) => template.id === workOrder.procedure_template_id);
  const progress = procedure ? checklistProgress(workOrder, procedure) : null;
  const partsCount = (partsUsedByWorkOrder[workOrder.id] || []).length;
  const commentsCount = (commentsByWorkOrder[workOrder.id] || []).length;
  const photosCount = (photosByWorkOrder[workOrder.id] || []).length;
  const chips = [];

  if (workOrder.asset_id) {
    chips.push(relationshipChip("asset", "Asset", workOrder.assets?.name || "Linked"));
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
          <span class="chip ${workOrder.status}">${workOrder.status.replace("_", " ")}</span>
        </div>
        <h2>${escapeHtml(workOrder.title)}</h2>
        <p>${escapeHtml(workOrder.description || "No description.")}</p>
        ${renderRelationshipChips(workOrder)}
        ${workOrder.completed_at ? `<p class="completion-note">Completed ${new Date(workOrder.completed_at).toLocaleString()} · ${workOrder.actual_minutes || 0} min</p>` : ""}
        ${workOrder.completion_notes ? `<p>${escapeHtml(workOrder.completion_notes)}</p>` : ""}
      </div>

      ${workOrder.completed_at && (workOrder.failure_cause || workOrder.resolution_summary || workOrder.follow_up_needed) ? `
        <div class="outcome-summary">
          <h3>Work Outcome</h3>
          ${workOrder.failure_cause ? `<article><span>Cause</span><strong>${escapeHtml(workOrder.failure_cause)}</strong></article>` : ""}
          ${workOrder.resolution_summary ? `<article><span>Resolution</span><strong>${escapeHtml(workOrder.resolution_summary)}</strong></article>` : ""}
          ${workOrder.follow_up_needed ? `<article class="follow-up"><span>Follow-up</span><strong>Needed</strong></article>` : ""}
        </div>
      ` : ""}

      <div class="work-cost-grid">
        <article class="work-cost-card labor">
          <span>Labor time</span>
          <strong>${Number(workOrder.actual_minutes) || 0} min</strong>
        </article>
        <article class="work-cost-card parts">
          <span>Parts estimate</span>
          <strong>${money(partsCost)}</strong>
        </article>
        <article class="work-cost-card parts">
          <span>Parts used</span>
          <strong>${partsQuantity}</strong>
        </article>
      </div>

      <label>Status
        <select id="status-select">
          ${STATUS_OPTIONS.map((status) => `<option value="${status}" ${status === workOrder.status ? "selected" : ""}>${status.replace("_", " ")}</option>`).join("")}
        </select>
      </label>

      <div class="quick-actions detail-quick-actions">
        ${workOrder.assigned_to !== session.user.id ? `<button class="assign-action" data-assign-me="${workOrder.id}" type="button">${workOrder.assigned_to ? "Reassign to me" : "Assign to me"}</button>` : ""}
        ${STATUS_OPTIONS.filter((status) => status !== workOrder.status).map((status) => `
          <button data-quick-status="${status}" data-id="${workOrder.id}" type="button">${status.replace("_", " ")}</button>
        `).join("")}
      </div>

      <form class="form-grid" id="edit-work-order-form">
        <label>Title<input name="title" required value="${escapeHtml(workOrder.title)}"></label>
        <label>Description<textarea name="description" rows="3">${escapeHtml(workOrder.description || "")}</textarea></label>
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
            ${Object.entries(profilesByUserId).map(([userId, profile]) => `<option value="${userId}" ${userId === workOrder.assigned_to ? "selected" : ""}>${escapeHtml(profile.full_name || "Team member")}</option>`).join("")}
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
        <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${workOrder.actual_minutes || 0}"></label>
        <p class="error-text" id="work-order-save-error"></p>
        <button class="secondary-button save-work-button" type="submit">Save Work Order</button>
      </form>

      ${procedure ? `
        <section>
          <div class="panel-header compact-header">
            <h3>${escapeHtml(procedure.name)}</h3>
            <span>${progress.done} of ${progress.total} complete · required ${requiredProgress.done}/${requiredProgress.total}</span>
          </div>
          <div class="checklist-list">
            ${procedure.procedure_steps.map((step) => renderChecklistStep(workOrder, step)).join("") || `<p class="muted">This procedure has no steps yet.</p>`}
          </div>
        </section>
      ` : ""}

      ${workOrder.status !== "completed" ? `
        <form class="completion-box" id="complete-work-order-form">
          <h3>Complete Work</h3>
          ${requiredProgress?.total ? `<p class="${requiredProgress.done === requiredProgress.total ? "completion-note" : "warning-text"}">Required checklist: ${requiredProgress.done}/${requiredProgress.total}</p>` : ""}
          <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
          <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
          <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
          <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${workOrder.actual_minutes || 0}"></label>
          <label>Completion notes<textarea name="completion_notes" rows="3" placeholder="What was fixed? Any follow-up needed?"></textarea></label>
          <p class="error-text" id="completion-error"></p>
          <button class="primary-button" type="submit">Complete Work Order</button>
        </form>
      ` : ""}

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

      <form class="form-grid relationship-detail photo" id="photo-form">
        <label>Upload photo<input name="photo" type="file" accept="image/*"></label>
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
              <span>${new Date(photo.created_at).toLocaleString()}</span>
              ${photo.signedUrl ? `<a href="${photo.signedUrl}" target="_blank" rel="noreferrer">Open photo</a>` : ""}
            </article>
          `).join("") || `<p class="muted">No photos uploaded yet.</p>`}
        </div>
      </div>

      <form class="form-grid relationship-detail comment" id="comment-form">
        <label>Comment<textarea name="body" rows="3" required></textarea></label>
        <p class="error-text" id="comment-error"></p>
        <button class="primary-button" type="submit">Add Comment</button>
      </form>

      <div class="timeline">
        ${commentsError ? `<p class="error-text">${escapeHtml(commentsError)}</p>` : ""}
        ${activity.map(renderActivityItem).join("") || `<p class="muted">No activity yet.</p>`}
      </div>
    </div>
  `;
}

function bindWorkspaceEvents() {
  document.querySelector("#company-select").addEventListener("change", async (event) => {
    activeCompanyId = event.target.value;
    activeWorkOrderId = null;
    localStorage.setItem("maintainops.activeCompanyId", activeCompanyId);
    await render();
  });

  document.querySelector("#sign-out").addEventListener("click", () => supabaseClient.auth.signOut());
  document.querySelector("#new-company").addEventListener("click", renderCompanyCreate);
  document.querySelector("#theme-toggle").addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("maintainops.theme", theme);
    applyTheme();
    renderWorkspace();
  });
  document.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => {
      activeSection = button.dataset.section;
      activeWorkOrderId = null;
      activeAssetId = null;
      quickFixMode = false;
      quickFixAssetId = null;
      quickFixRequestId = null;
      localStorage.setItem("maintainops.activeSection", activeSection);
      renderWorkspace();
    });
  });
  document.querySelector("#show-quick-fix").addEventListener("click", () => {
    activeWorkOrderId = null;
    activeAssetId = null;
    quickFixMode = true;
    quickFixAssetId = null;
    quickFixRequestId = null;
    activeSection = "work";
    localStorage.setItem("maintainops.activeSection", activeSection);
    renderWorkspace();
  });
  document.querySelector("#show-create-work-order").addEventListener("click", () => {
    activeWorkOrderId = null;
    activeAssetId = null;
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
    quickFixMode = false;
    quickFixAssetId = null;
    quickFixRequestId = null;
    activeSection = "requests";
    localStorage.setItem("maintainops.activeSection", activeSection);
    renderWorkspace();
  });
  document.querySelector("#export-csv").addEventListener("click", exportActiveSectionCsv);

  const searchInput = document.querySelector("#workspace-search");
  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value;
    localStorage.setItem("maintainops.searchQuery", searchQuery);
    renderWorkspace();
    const nextSearchInput = document.querySelector("#workspace-search");
    nextSearchInput.focus();
    nextSearchInput.setSelectionRange(searchQuery.length, searchQuery.length);
  });

  document.querySelectorAll(".work-card").forEach((card) => {
    card.addEventListener("click", () => {
      activeWorkOrderId = card.dataset.id;
      activeAssetId = null;
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
      quickFixMode = false;
      quickFixAssetId = null;
      quickFixRequestId = null;
      activeSection = "work";
      localStorage.setItem("maintainops.activeSection", activeSection);
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-mini-work-order]").forEach((item) => {
    item.addEventListener("click", () => {
      activeWorkOrderId = item.dataset.miniWorkOrder;
      activeAssetId = null;
      quickFixMode = false;
      quickFixAssetId = null;
      quickFixRequestId = null;
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-quick-fix-asset]").forEach((button) => {
    button.addEventListener("click", () => {
      quickFixAssetId = button.dataset.quickFixAsset;
      quickFixRequestId = null;
      activeAssetId = null;
      activeWorkOrderId = null;
      quickFixMode = true;
      activeSection = "work";
      localStorage.setItem("maintainops.activeSection", activeSection);
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-quick-status]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      await setWorkOrderStatus(button.dataset.id, button.dataset.quickStatus);
    });
  });

  document.querySelectorAll("[data-assign-me]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      await assignWorkOrderToMe(button.dataset.assignMe);
    });
  });

  document.querySelectorAll("[data-status-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeStatusFilter = button.dataset.statusFilter;
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-queue-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      queueFilter = button.dataset.queueFilter;
      renderWorkspace();
    });
  });

  document.querySelectorAll("[data-work-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      workSort = button.dataset.workSort;
      localStorage.setItem("maintainops.workSort", workSort);
      renderWorkspace();
    });
  });

  const createForm = document.querySelector("#create-work-order-form");
  if (createForm) createForm.addEventListener("submit", createWorkOrder);

  const quickFixForm = document.querySelector("#quick-fix-form");
  if (quickFixForm) quickFixForm.addEventListener("submit", createQuickFix);

  const requestForm = document.querySelector("#request-form");
  if (requestForm) requestForm.addEventListener("submit", createRequest);

  document.querySelectorAll("[data-convert-request]").forEach((button) => {
    button.addEventListener("click", () => convertRequestToWorkOrder(button.dataset.convertRequest));
  });

  document.querySelectorAll("[data-quick-fix-request]").forEach((button) => {
    button.addEventListener("click", () => openQuickFixForRequest(button.dataset.quickFixRequest));
  });

  const editForm = document.querySelector("#edit-work-order-form");
  if (editForm) editForm.addEventListener("submit", updateWorkOrderDetails);

  const completionForm = document.querySelector("#complete-work-order-form");
  if (completionForm) completionForm.addEventListener("submit", completeWorkOrder);

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

  const partForm = document.querySelector("#create-part-form");
  if (partForm) partForm.addEventListener("submit", createPart);

  document.querySelectorAll("[data-restock-part]").forEach((form) => {
    form.addEventListener("submit", restockPart);
  });

  document.querySelectorAll("[data-edit-part]").forEach((form) => {
    form.addEventListener("submit", updatePart);
  });

  const partsUsedForm = document.querySelector("#parts-used-form");
  if (partsUsedForm) partsUsedForm.addEventListener("submit", recordPartUsed);

  const settingsForm = document.querySelector("#company-settings-form");
  if (settingsForm) settingsForm.addEventListener("submit", updateCompanySettings);
}

async function createAsset(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const { error } = await supabaseClient.from("assets").insert({
    company_id: activeCompanyId,
    name: form.get("name"),
    asset_code: form.get("asset_code") || null,
    location: form.get("location") || null,
    status: "running",
  });
  if (error) return alert(error.message);
  await render();
}

async function updateAsset(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const { error } = await supabaseClient
    .from("assets")
    .update({
      name: form.get("name"),
      asset_code: form.get("asset_code") || null,
      location: form.get("location") || null,
      status: form.get("status"),
    })
    .eq("id", activeAssetId)
    .eq("company_id", activeCompanyId);
  if (error) return alert(error.message);
  await render();
}

async function updateAssetStatus(assetId, status) {
  const { error } = await supabaseClient
    .from("assets")
    .update({ status })
    .eq("id", assetId)
    .eq("company_id", activeCompanyId);
  return error || null;
}

async function createPreventiveSchedule(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const { error } = await insertWithOptionalProcedure("preventive_schedules", {
    company_id: activeCompanyId,
    asset_id: form.get("asset_id"),
    title: form.get("title"),
    frequency: form.get("frequency"),
    next_due_at: form.get("next_due_at"),
    ...procedureColumn(form.get("procedure_template_id")),
    active: true,
    created_by: session.user.id,
  });
  if (error) return alert(error.message);
  await render();
}

async function createProcedureTemplate(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const { error } = await supabaseClient.from("procedure_templates").insert({
    company_id: activeCompanyId,
    name: form.get("name"),
    description: form.get("description") || null,
    created_by: session.user.id,
  });
  if (error) return alert(error.message);
  await render();
}

async function seedSampleProcedure() {
  const existing = procedureTemplates.find((template) => template.name.toLowerCase() === "basic equipment inspection");
  if (existing) {
    alert("Sample inspection procedure already exists.");
    return;
  }

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

  if (templateError) return alert(templateError.message);

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
  if (stepsError) return alert(stepsError.message);
  await render();
}

async function createProcedureStep(event) {
  event.preventDefault();
  const formElement = event.target;
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
  if (error) return alert(error.message);
  await render();
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

async function updateCompanySettings(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const { error } = await supabaseClient
    .from("companies")
    .update({ name: form.get("name") })
    .eq("id", activeCompanyId);
  if (error) return alert(error.message);
  await render();
}

async function createPart(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#part-create-error");
  const form = new FormData(formElement);
  if (errorElement) errorElement.textContent = "";
  const payload = {
    company_id: activeCompanyId,
    name: form.get("name"),
    sku: form.get("sku") || null,
    quantity_on_hand: Number(form.get("quantity_on_hand")) || 0,
    reorder_point: Number(form.get("reorder_point")) || 0,
    unit_cost: Number(form.get("unit_cost")) || 0,
  };
  let { error } = await supabaseClient.from("parts").insert(payload);
  if (error && isMissingColumnError(error, "unit_cost")) {
    partCostsReady = false;
    if (errorElement) {
      errorElement.textContent = "Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.";
    }
    return;
  }
  if (error) {
    if (errorElement) errorElement.textContent = error.message;
    return;
  }
  await render();
}

async function restockPart(event) {
  event.preventDefault();
  const formElement = event.target;
  const part = parts.find((item) => item.id === formElement.dataset.restockPart);
  const quantity = Number(new FormData(formElement).get("quantity")) || 0;
  if (!part || quantity <= 0) return;

  const { error } = await supabaseClient
    .from("parts")
    .update({ quantity_on_hand: (Number(part.quantity_on_hand) || 0) + quantity })
    .eq("id", part.id)
    .eq("company_id", activeCompanyId);
  if (error) return alert(error.message);
  await render();
}

async function updatePart(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const partId = formElement.dataset.editPart;
  const errorElement = document.querySelector(`[data-part-edit-error="${partId}"]`);
  const form = new FormData(formElement);
  if (errorElement) errorElement.textContent = "";

  const payload = {
    name: form.get("name"),
    sku: form.get("sku") || null,
    quantity_on_hand: Number(form.get("quantity_on_hand")) || 0,
    reorder_point: Number(form.get("reorder_point")) || 0,
    unit_cost: Number(form.get("unit_cost")) || 0,
  };

  let { error } = await supabaseClient
    .from("parts")
    .update(payload)
    .eq("id", partId)
    .eq("company_id", activeCompanyId);

  if (error && isMissingColumnError(error, "unit_cost")) {
    partCostsReady = false;
    if (errorElement) {
      errorElement.textContent = "Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then save again.";
    }
    return;
  }

  if (error) {
    if (errorElement) errorElement.textContent = error.message;
    return;
  }

  await render();
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

  const form = new FormData(formElement);
  const partId = form.get("part_id");
  const quantity = Number(form.get("quantity_used")) || 1;
  const part = parts.find((item) => item.id === partId);
  if (!activeWorkOrderId) {
    if (errorElement) errorElement.textContent = "Open a work order before recording parts.";
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Record Part Used";
    }
    return;
  }
  if (!part) {
    if (errorElement) errorElement.textContent = "Choose a part first.";
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Record Part Used";
    }
    return;
  }

  const usageError = await addPartUsageToWorkOrder(activeWorkOrderId, part, quantity);
  if (usageError) {
    if (errorElement) errorElement.textContent = usageError.message;
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Record Part Used";
    }
    return;
  }

  await render();
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

  const { data, error } = await insertWithOptionalProcedure("work_orders", {
    company_id: activeCompanyId,
    asset_id: schedule.asset_id,
    title: schedule.title,
    description: `Generated from preventive schedule: ${schedule.frequency}.`,
    priority: "medium",
    type: "preventive",
    status: "open",
    due_at: schedule.next_due_at,
    ...procedureColumn(schedule.procedure_template_id),
    created_by: session.user.id,
  }, { returnSingle: true });

  if (error) return alert(error.message);

  await supabaseClient
    .from("preventive_schedules")
    .update({ next_due_at: nextDueDate(schedule.next_due_at, schedule.frequency) })
    .eq("id", schedule.id)
    .eq("company_id", activeCompanyId);

  activeWorkOrderId = data.id;
  await render();
}

async function createFollowUpWorkOrder(sourceId) {
  const source = workOrders.find((item) => item.id === sourceId);
  if (!source) return;

  const { data, error } = await insertWithOptionalProcedure("work_orders", {
    company_id: activeCompanyId,
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
  }, { returnSingle: true });
  if (error) return alert(error.message);

  await updateWorkOrderWithFallback({ follow_up_needed: false }, source.id);
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
  const form = new FormData(event.target);
  const payload = {
    company_id: activeCompanyId,
    title: form.get("title"),
    description: form.get("description"),
    asset_id: form.get("asset_id") || null,
    priority: form.get("priority"),
    type: form.get("type") || "reactive",
    due_at: form.get("due_at") || null,
    assigned_to: form.get("assigned_to") || null,
    ...procedureColumn(form.get("procedure_template_id")),
    status: "open",
    created_by: session.user.id,
  };
  const { data, error } = await insertWithOptionalProcedure("work_orders", payload, { returnSingle: true });
  if (error) return alert(error.message);
  activeWorkOrderId = data.id;
  await render();
}

function openQuickFixForRequest(requestId) {
  const request = maintenanceRequests.find((item) => item.id === requestId);
  if (!request) return;
  quickFixRequestId = requestId;
  quickFixAssetId = request.asset_id || null;
  quickFixMode = true;
  activeWorkOrderId = null;
  activeAssetId = null;
  activeSection = "work";
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

  const form = new FormData(formElement);
  const payload = {
    company_id: activeCompanyId,
    title: form.get("title"),
    description: form.get("resolution_summary"),
    asset_id: form.get("asset_id") || null,
    priority: "medium",
    type: "corrective",
    status: "completed",
    created_by: session.user.id,
    actual_minutes: 0,
    failure_cause: form.get("failure_cause") || null,
    resolution_summary: form.get("resolution_summary"),
    follow_up_needed: form.get("follow_up_needed") === "on",
    completion_notes: form.get("resolution_summary"),
    completed_at: new Date().toISOString(),
  };

  let { data, error } = await insertWithOptionalProcedure("work_orders", payload, { returnSingle: true });
  if (error && isColumnSchemaError(error, ["actual_minutes", "failure_cause", "resolution_summary", "follow_up_needed"])) {
    const fallbackPayload = { ...payload };
    delete fallbackPayload.actual_minutes;
    delete fallbackPayload.failure_cause;
    delete fallbackPayload.resolution_summary;
    delete fallbackPayload.follow_up_needed;
    const retry = await insertWithOptionalProcedure("work_orders", fallbackPayload, { returnSingle: true });
    data = retry.data;
    error = retry.error;
  }

  if (error) {
    submitButton.disabled = false;
    submitButton.textContent = "Save Quick Fix";
    if (errorTarget) errorTarget.textContent = error.message;
    return;
  }

  const partId = form.get("part_id");
  const quantity = Number(form.get("quantity_used")) || 1;
  if (partId) {
    const part = parts.find((item) => item.id === partId);
    const partError = await addPartUsageToWorkOrder(data.id, part, quantity);
    if (partError && errorTarget) {
      errorTarget.textContent = `Quick fix saved, but part usage failed: ${partError.message}`;
    }
  }

  const photo = form.get("photo");
  if (photo && photo.name) {
    const photoError = await addPhotoToWorkOrder(data.id, photo);
    if (photoError && errorTarget) {
      errorTarget.textContent = `Quick fix saved, but photo upload failed: ${photoError.message}`;
    }
  }

  const assetStatus = form.get("asset_status");
  if (payload.asset_id && assetStatus) {
    const assetError = await updateAssetStatus(payload.asset_id, assetStatus);
    if (assetError && errorTarget) {
      errorTarget.textContent = `Quick fix saved, but asset status did not update: ${assetError.message}`;
    } else {
      await recordWorkOrderEvent(data.id, "asset_status_updated", `Asset status set to ${assetStatus}.`);
    }
  }

  await recordWorkOrderEvent(data.id, "quick_fix", "Quick fix recorded.");
  if (quickFixRequestId && requestsReady) {
    await supabaseClient
      .from("maintenance_requests")
      .update({
        status: "converted",
        reviewed_by: session.user.id,
        reviewed_at: new Date().toISOString(),
        converted_work_order_id: data.id,
      })
      .eq("id", quickFixRequestId)
      .eq("company_id", activeCompanyId);
    await recordWorkOrderEvent(data.id, "request_quick_fixed", "Request resolved through Quick Fix.");
  }
  activeWorkOrderId = data.id;
  activeAssetId = null;
  quickFixMode = false;
  quickFixAssetId = null;
  quickFixRequestId = null;
  await render();
}

async function updateWorkOrderDetails(event) {
  event.preventDefault();
  const formElement = event.target;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorTarget = document.querySelector("#work-order-save-error");
  submitButton.disabled = true;
  submitButton.textContent = "Saving...";
  if (errorTarget) errorTarget.textContent = "";

  const form = new FormData(event.target);
  const previous = workOrders.find((workOrder) => workOrder.id === activeWorkOrderId);
  const payload = {
    title: form.get("title"),
    description: form.get("description"),
    due_at: form.get("due_at") || null,
    priority: form.get("priority"),
    type: form.get("type"),
    assigned_to: form.get("assigned_to") || null,
    ...procedureColumn(form.get("procedure_template_id")),
    failure_cause: form.get("failure_cause") || null,
    resolution_summary: form.get("resolution_summary") || null,
    follow_up_needed: form.get("follow_up_needed") === "on",
    actual_minutes: Number(form.get("actual_minutes")) || 0,
  };
  const { error } = await updateWorkOrderWithFallback(payload, activeWorkOrderId);
  if (error) {
    submitButton.disabled = false;
    submitButton.textContent = "Save Work Order";
    if (errorTarget) errorTarget.textContent = `Could not save work order: ${friendlyWorkOrderSaveError(error)}`;
    return;
  }
  await recordWorkOrderEvent(activeWorkOrderId, "updated", describeWorkOrderChanges(previous, Object.fromEntries(form.entries())));
  await render();
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

  submitButton.disabled = true;
  submitButton.textContent = "Completing...";
  if (errorTarget) errorTarget.textContent = "";

  const form = new FormData(event.target);
  const payload = {
    status: "completed",
    actual_minutes: Number(form.get("actual_minutes")) || 0,
    failure_cause: form.get("failure_cause") || null,
    resolution_summary: form.get("resolution_summary") || null,
    follow_up_needed: form.get("follow_up_needed") === "on",
    completion_notes: form.get("completion_notes") || null,
    completed_at: new Date().toISOString(),
  };
  let { error } = await supabaseClient
    .from("work_orders")
    .update(payload)
    .eq("id", activeWorkOrderId)
    .eq("company_id", activeCompanyId);
  if (error && isColumnSchemaError(error, ["failure_cause", "resolution_summary", "follow_up_needed"])) {
    delete payload.failure_cause;
    delete payload.resolution_summary;
    delete payload.follow_up_needed;
    const retry = await supabaseClient
      .from("work_orders")
      .update(payload)
      .eq("id", activeWorkOrderId)
      .eq("company_id", activeCompanyId);
    error = retry.error;
  }
  if (error) {
    submitButton.disabled = false;
    submitButton.textContent = "Complete Work Order";
    if (errorTarget) errorTarget.textContent = `Could not complete work order: ${friendlyWorkOrderSaveError(error)}`;
    return;
  }
  await recordWorkOrderEvent(activeWorkOrderId, "completed", form.get("resolution_summary") || form.get("completion_notes") || "Work order completed.");
  await render();
}

function renderRequestForm() {
  const detailPanel = document.querySelector("#detail-panel");
  detailPanel.innerHTML = renderRequestFormContent();
  document.querySelector("#request-form").addEventListener("submit", createRequest);
}

async function createRequest(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const requestPayload = {
    company_id: activeCompanyId,
    title: form.get("title"),
    description: form.get("description"),
    asset_id: form.get("asset_id") || null,
    priority: form.get("priority"),
    status: "submitted",
    requested_by: session.user.id,
  };

  if (requestsReady) {
    const { error } = await supabaseClient.from("maintenance_requests").insert(requestPayload);
    if (error) return alert(error.message);
    activeSection = "requests";
    localStorage.setItem("maintainops.activeSection", activeSection);
    await render();
    return;
  }

  const fallbackPayload = {
    ...requestPayload,
    type: "request",
    status: "open",
    created_by: session.user.id,
  };
  delete fallbackPayload.requested_by;
  const { data, error } = await supabaseClient.from("work_orders").insert(fallbackPayload).select().single();
  if (error) return alert(error.message);
  activeWorkOrderId = data.id;
  await recordWorkOrderEvent(data.id, "request_created", "Request submitted.");
  await render();
}

async function convertRequestToWorkOrder(requestId) {
  const request = maintenanceRequests.find((item) => item.id === requestId);
  if (!request) return;

  const { data, error } = await insertWithOptionalProcedure("work_orders", {
    company_id: activeCompanyId,
    title: request.title,
    description: request.description,
    asset_id: request.asset_id || null,
    priority: request.priority || "medium",
    type: "reactive",
    status: "open",
    created_by: session.user.id,
  }, { returnSingle: true });
  if (error) return alert(error.message);

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
  if (updateError) return alert(updateError.message);

  activeSection = "work";
  activeWorkOrderId = data.id;
  localStorage.setItem("maintainops.activeSection", activeSection);
  await recordWorkOrderEvent(data.id, "request_converted", "Request converted to work order.");
  await render();
}

async function updateWorkOrderStatus(event) {
  await setWorkOrderStatus(activeWorkOrderId, event.target.value);
}

async function saveStepResult(event) {
  const field = event.target;
  const value = field.type === "checkbox" ? (field.checked ? "checked" : "") : field.value;
  const { error } = await supabaseClient.from("work_order_step_results").upsert({
    company_id: activeCompanyId,
    work_order_id: field.dataset.workOrderId,
    procedure_step_id: field.dataset.stepResult,
    completed_by: value ? session.user.id : null,
    value,
    completed_at: value ? new Date().toISOString() : null,
  }, { onConflict: "work_order_id,procedure_step_id" });

  if (error) return alert(error.message);
  await recordWorkOrderEvent(field.dataset.workOrderId, "checklist_updated", "Procedure checklist updated.");
  await loadStepResults();
  renderWorkspace();
}

async function setWorkOrderStatus(id, status) {
  const { error } = await supabaseClient
    .from("work_orders")
    .update({ status })
    .eq("id", id)
    .eq("company_id", activeCompanyId);
  if (error) return alert(error.message);
  activeWorkOrderId = id;
  await recordWorkOrderEvent(id, "status_changed", `Status changed to ${status.replace("_", " ")}.`);
  await render();
}

async function assignWorkOrderToMe(id) {
  const hasProfile = await ensureProfileForActiveCompany();
  if (!hasProfile) return alert(appError);

  const { error } = await supabaseClient
    .from("work_orders")
    .update({ assigned_to: session.user.id })
    .eq("id", id)
    .eq("company_id", activeCompanyId);

  if (error) return alert(friendlyWorkOrderSaveError(error));
  activeWorkOrderId = id;
  activeAssetId = null;
  await recordWorkOrderEvent(id, "assigned", "Assigned to self.");
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

  const hasProfile = await ensureProfileForActiveCompany();
  if (!hasProfile) {
    submitButton.disabled = false;
    submitButton.textContent = "Add Comment";
    if (errorTarget) errorTarget.textContent = appError;
    return;
  }

  const payload = {
    company_id: activeCompanyId,
    work_order_id: activeWorkOrderId,
    author_id: session.user.id,
    body,
  };
  let { error } = await supabaseClient.from("work_order_comments").insert(payload);

  if (error && isProfileMissingError(error)) {
    await ensureProfileForActiveCompany();
    const retry = await supabaseClient.from("work_order_comments").insert(payload);
    error = retry.error;
  }

  if (error) {
    submitButton.disabled = false;
    submitButton.textContent = "Add Comment";
    if (errorTarget) errorTarget.textContent = `Could not add comment: ${error.message}`;
    return;
  }

  await recordWorkOrderEvent(activeWorkOrderId, "comment_added", "Comment added.");
  await render();
}

async function uploadPhoto(event) {
  event.preventDefault();
  const hasProfile = await ensureProfileForActiveCompany();
  if (!hasProfile) return alert(appError);
  const file = new FormData(event.target).get("photo");
  if (!file || !file.name) return;

  const error = await addPhotoToWorkOrder(activeWorkOrderId, file);
  if (error) return alert(error.message);
  await recordWorkOrderEvent(activeWorkOrderId, "photo_uploaded", `Photo uploaded: ${file.name}.`);
  await render();
}

async function addPhotoToWorkOrder(workOrderId, file) {
  const hasProfile = await ensureProfileForActiveCompany();
  if (!hasProfile) return new Error(appError);

  const path = `${activeCompanyId}/${workOrderId}/${crypto.randomUUID()}-${file.name}`;
  const upload = await supabaseClient.storage.from("work-order-photos").upload(path, file);
  if (upload.error) return upload.error;

  const { error } = await supabaseClient.from("work_order_photos").insert({
    company_id: activeCompanyId,
    work_order_id: workOrderId,
    uploaded_by: session.user.id,
    storage_path: path,
    file_name: file.name,
    content_type: file.type,
  });
  return error || null;
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
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  return workOrders.filter((workOrder) => workOrder.completed_at && new Date(workOrder.completed_at) >= cutoff);
}

function averageCompletionMinutes() {
  const completed = workOrders.filter((workOrder) => workOrder.status === "completed" && Number(workOrder.actual_minutes) > 0);
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
    .filter((workOrder) => workOrder.status !== "completed" && workOrder.due_at)
    .filter((workOrder) => matchesSearch([
      workOrder.title,
      workOrder.description,
      workOrder.priority,
      workOrder.status,
      workOrder.assets?.name,
      workOrder.assigned_profile?.full_name,
    ]))
    .map((workOrder) => {
      const due = new Date(`${workOrder.due_at}T00:00:00`);
      return {
        kind: "work",
        id: workOrder.id,
        title: workOrder.title,
        priority: workOrder.priority,
        status: workOrder.status,
        assetName: workOrder.assets?.name || "No asset",
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
      assetName: schedule.assets?.name || "No asset",
      dueAt: schedule.next_due_at,
      due: new Date(`${schedule.next_due_at}T00:00:00`),
    }))
    .sort((a, b) => a.due - b.due);
}

function followUpItems() {
  return workOrders
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
      assetName: workOrder.assets?.name || "No asset",
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
  return parts.filter((part) => Number(part.quantity_on_hand) <= Number(part.reorder_point));
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
        asset: workOrder.assets?.name || "",
        assigned_to: workOrder.assigned_profile?.full_name || "",
        due_at: workOrder.due_at || "",
        completed_at: workOrder.completed_at || "",
        actual_minutes: workOrder.actual_minutes || 0,
        failure_cause: workOrder.failure_cause || "",
        resolution_summary: workOrder.resolution_summary || "",
        follow_up_needed: Boolean(workOrder.follow_up_needed),
      })),
    },
    assets: {
      filename: "assets.csv",
      rows: assets.map((asset) => ({
        name: asset.name,
        asset_code: asset.asset_code || "",
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
        asset: request.assets?.name || "",
        requested_by: profilesByUserId[request.requested_by]?.full_name || "",
        created_at: request.created_at || "",
        converted_work_order_id: request.converted_work_order_id || "",
      })),
    },
    pm: {
      filename: "preventive-schedules.csv",
      rows: preventiveSchedules.map((schedule) => ({
        title: schedule.title,
        asset: schedule.assets?.name || "",
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
        quantity_on_hand: part.quantity_on_hand,
        reorder_point: part.reorder_point,
        unit_cost: part.unit_cost || 0,
        stocked_value: (Number(part.quantity_on_hand) || 0) * (Number(part.unit_cost) || 0),
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

function applyTheme() {
  document.documentElement.dataset.theme = theme;
}
