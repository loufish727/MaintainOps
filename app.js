const app = document.querySelector("#app");

const STATUS_OPTIONS = ["open", "in_progress", "blocked", "completed"];
const TYPE_OPTIONS = ["request", "reactive", "preventive", "inspection", "corrective"];
const WORK_ORDERS_PER_PAGE = 12;
const PARTS_PER_PAGE = 12;
const OUTSIDE_VENDOR_VALUE = "__outside_vendor__";
const OUTSIDE_VENDOR_NOTE = "[Assignment: Outside vendor]";
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
let partSuppliersReady = true;
let partDocumentsReady = true;
let partDocumentsByPartId = {};
let procedureTemplates = [];
let proceduresReady = false;
let schedulesReady = false;
let outcomesReady = true;
let photosReady = true;
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
let showPartSourceManager = false;
let createWorkOrderMode = false;
let quickFixMode = false;
let quickFixAssetId = null;
let quickFixRequestId = null;
let activeStatusFilter = "all";
let myWorkFilter = localStorage.getItem("maintainops.myWorkFilter") || "assigned";
let workOrderFilter = localStorage.getItem("maintainops.workOrderFilter") || "all";
let workSort = localStorage.getItem("maintainops.workSort") || "newest";
let workOrderPage = Number(localStorage.getItem("maintainops.workOrderPage")) || 1;
let partsPage = Number(localStorage.getItem("maintainops.partsPage")) || 1;
let activeSection = localStorage.getItem("maintainops.activeSection") || "mywork";
if (!localStorage.getItem("maintainops.sectionSplitDone") && activeSection === "work") {
  activeSection = "mywork";
  localStorage.setItem("maintainops.activeSection", activeSection);
  localStorage.setItem("maintainops.sectionSplitDone", "true");
}
let searchQuery = localStorage.getItem("maintainops.searchQuery") || "";
let appError = "";
let appNotice = "";
let noticeTimer;

init();

async function init() {
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
    partSuppliersReady = !parts.length || Object.prototype.hasOwnProperty.call(parts[0], "supplier_name");
    schedulesReady = !scheduleResponse.error;
    outcomesReady = !workOrders.length || Object.prototype.hasOwnProperty.call(workOrders[0], "resolution_summary");
    proceduresReady = !procedureResponse.error;
  procedureTemplates = procedureResponse.error ? [] : (procedureResponse.data || []).map((template) => ({
    ...template,
    procedure_steps: (template.procedure_steps || []).sort((a, b) => Number(a.position) - Number(b.position)),
  }));
  await Promise.all([loadProfiles(), loadMembers(), loadComments(), loadPhotos(), loadPartsUsed(), loadPartDocuments(), loadStepResults(), loadWorkOrderEvents()]);
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
  const isWorkArea = activeSection === "mywork" || activeSection === "work";
  const visibleWorkOrders = filteredWorkOrders();
  const totalWorkOrderPages = Math.max(1, Math.ceil(visibleWorkOrders.length / WORK_ORDERS_PER_PAGE));
  if (workOrderPage > totalWorkOrderPages) workOrderPage = totalWorkOrderPages;
  if (workOrderPage < 1) workOrderPage = 1;
  const pagedWorkOrders = visibleWorkOrders.slice((workOrderPage - 1) * WORK_ORDERS_PER_PAGE, workOrderPage * WORK_ORDERS_PER_PAGE);
  const myWork = workOrders.filter((workOrder) => workOrder.assigned_to === session.user.id);
  const myOpenWork = myWork.filter((workOrder) => workOrder.status !== "completed");
  const createdByMe = workOrders.filter((workOrder) => workOrder.created_by === session.user.id);
  const visibleRequests = filteredRequests();
  const visibleAssets = filteredAssets();
  const visibleSchedules = filteredPreventiveSchedules();
  const visibleProcedures = filteredProcedureTemplates();
  const visibleParts = filteredParts();
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
        <label class="company-switcher">
          Company
          <select id="company-select">
            ${companies.map((company) => `<option value="${company.id}" ${company.id === activeCompanyId ? "selected" : ""}>${company.name}</option>`).join("")}
          </select>
        </label>
        <button class="secondary-button" id="new-company" type="button">New Company</button>
        <button class="text-button inverse" id="sign-out" type="button">Sign out</button>
        <nav class="section-nav" aria-label="Workspace sections">
          ${[
            ["mywork", "My Work"],
            ["work", "Work Orders"],
            ["planning", "Planning"],
            ["requests", "Requests"],
            ["assets", "Assets"],
            ["pm", "PM"],
            ["procedures", "Procedures"],
            ["parts", "Parts"],
            ["team", "Team"],
            ["setup", "Admin Setup"],
            ["settings", "Settings"],
          ].map(([id, label]) => `<button class="nav-${id} ${activeSection === id ? "active" : ""}" data-section="${id}" type="button">${navIcon(id)}${label}</button>`).join("")}
        </nav>
      </aside>

      <main class="workspace">
        <header class="topbar">
          <div class="topbar-main">
            <p class="eyebrow">Authenticated Multi-Tenant MVP</p>
            <h1>${activeCompany?.name || "Company"}</h1>
            <div class="topbar-summary">
              <span>${workOrders.length} work orders</span>
              <span>${assets.length} assets</span>
              <span>${openMaintenanceRequests().length} open requests</span>
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

        ${appNotice ? `<div class="app-notice">${escapeHtml(appNotice)}</div>` : ""}
        ${appNotice ? `<div class="save-overlay" aria-hidden="true">SAVED</div>` : ""}

        ${activeSection === "mywork" ? `
          <section class="tech-focus">
            <div>
              <span class="focus-label">Technician Focus</span>
              <h2>${myWorkFilter === "created" ? "Created By Me" : "Assigned To Me"}</h2>
              <p>${myWorkFilter === "created" ? "Work orders you opened, kept separate from your assigned queue." : "Only work orders assigned to you."}</p>
            </div>
            <div class="focus-stats">
              <article><strong>${myOpenWork.length}</strong><span>active mine</span></article>
              <article><strong>${createdByMe.length}</strong><span>created by me</span></article>
            </div>
          </section>
        ` : ""}

        <label class="search-bar">
          Search workspace
          <input id="workspace-search" type="search" value="${escapeHtml(searchQuery)}" placeholder="Search work, assets, parts, people">
        </label>

        ${isWorkArea ? "" : `
          <section class="metric-grid">
            ${renderMetric("Pending", workOrders.filter((workOrder) => workOrder.status === "open").length, "open")}
            ${renderMetric("In Progress", workOrders.filter((workOrder) => workOrder.status === "in_progress").length, "in_progress")}
            ${renderMetric("Blocked", workOrders.filter((workOrder) => workOrder.status === "blocked").length, "blocked")}
            ${renderMetric("Completed", workOrders.filter((workOrder) => workOrder.status === "completed").length, "completed")}
          </section>

          <section class="insight-grid">
            ${renderInsight("Overdue Work", overdueWorkOrders().length, "Past due and not completed", "overdue")}
            ${renderInsight("Requests", requestsReady ? openMaintenanceRequests().length : workOrders.filter((workOrder) => workOrder.type === "request" && workOrder.status !== "completed").length, "Waiting for review", "request")}
            ${renderInsight("Done This Week", completedThisWeek().length, "Completed in the last 7 days", "completed")}
            ${renderInsight("Avg Completion", `${averageCompletionMinutes()} min`, "Actual minutes on completed work", "neutral")}
          </section>
        `}

        <section class="layout-grid single-column">
          ${isWorkArea ? `
            ${activeAssetId || activeWorkOrderId || quickFixMode || createWorkOrderMode ? `
              <section class="panel full-width focus-panel">
                <div class="panel-header">
                  <h2>${activeAssetId ? "Asset Detail" : activeWorkOrderId ? "Work Order Detail" : quickFixMode ? "Quick Fix" : "Create Work Order"}</h2>
                  <button class="secondary-button back-action-button" id="back-to-my-work" type="button">Back to ${activeSection === "work" ? "Work Orders" : "My Work"}</button>
                </div>
                <div id="detail-panel">${activeAssetId ? renderAssetDetail() : activeWorkOrderId ? renderWorkOrderDetail() : quickFixMode ? renderQuickFixForm() : renderCreateWorkOrder()}</div>
              </section>
            ` : `
              <section class="panel full-width my-work-panel queue-panel">
                <div class="panel-header">
                  <h2>${activeSection === "mywork" ? (myWorkFilter === "created" ? "Created By Me" : "Assigned To Me") : workOrderFilter === "unassigned" ? "Unassigned Work Orders" : workOrderFilter === "vendor" ? "Outside Vendor Work" : workOrderFilter === "assigned" ? "Assigned Work Orders" : "All Work Orders"}</h2>
                  <span>${visibleWorkOrders.length} shown</span>
                </div>
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
                `}
                <div class="segmented-control" aria-label="Work order status filter">
                  ${["all", ...STATUS_OPTIONS].map((status) => `
                    <button class="segment status-segment status-${status} ${activeStatusFilter === status ? "active" : ""}" data-status-filter="${status}" type="button">
                      ${segmentIcon(status)}${statusLabel(status)}
                    </button>
                  `).join("")}
                </div>
                <div class="segmented-control" aria-label="Work order sort">
                  ${[
                    ["newest", "Newest"],
                    ["due", "Due First"],
                    ["priority", "Priority"],
                  ].map(([id, label]) => `
                    <button class="segment ${workSort === id ? "active" : ""}" data-work-sort="${id}" type="button">${segmentIcon(id)}${label}</button>
                  `).join("")}
                </div>
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
              <button class="secondary-button asset-action-button" type="submit">Add Asset</button>
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
    const statusMatch = activeStatusFilter === "all" || workOrder.status === activeStatusFilter;
    const queueMatch = activeSection === "mywork"
      ? (myWorkFilter === "created" ? workOrder.created_by === session.user.id : workOrder.assigned_to === session.user.id)
      : workOrderFilter === "all" ||
        (workOrderFilter === "assigned" && Boolean(workOrder.assigned_to)) ||
        (workOrderFilter === "vendor" && isVendorAssigned(workOrder)) ||
        (workOrderFilter === "unassigned" && !workOrder.assigned_to && !isVendorAssigned(workOrder));
    return statusMatch && queueMatch && matchesSearch([
      workOrder.title,
      workOrder.description,
      workOrder.status,
      workOrder.priority,
      workOrder.type,
      workOrder.assets?.name,
      assignmentLabel(workOrder),
    ]);
  }).sort(compareWorkOrders);
}

function resetWorkOrderPage() {
  workOrderPage = 1;
  localStorage.setItem("maintainops.workOrderPage", String(workOrderPage));
}

function resetPartsPage() {
  partsPage = 1;
  localStorage.setItem("maintainops.partsPage", String(partsPage));
}

function showNotice(message) {
  appNotice = message;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => {
    appNotice = "";
    renderWorkspace();
  }, 2600);
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
    part.supplier_name,
    part.quantity_on_hand,
    part.reorder_point,
  ]));
}

function partSourceOptions() {
  return [...new Set(parts
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

function renderMetric(label, value, tone = "neutral") {
  return `<article class="metric dashboard-card tone-${tone}"><span>${label}</span><strong>${value}</strong></article>`;
}

function segmentIcon(type) {
  const icons = {
    all: `<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>`,
    mine: `<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>`,
    created: `<path d="M5 4h10l4 4v12H5z"></path><path d="M15 4v5h5"></path><path d="M8 14h8"></path><path d="M8 17h5"></path>`,
    vendor: `<path d="M3 16h2l3-7h8l3 7h2"></path><path d="M7 16h10"></path><path d="M8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>`,
    unassigned: `<path d="M12 5v14"></path><path d="M5 12h14"></path>`,
    open: `<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>`,
    in_progress: `<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>`,
    blocked: `<path d="M5 5l14 14"></path><circle cx="12" cy="12" r="8"></circle>`,
    completed: `<path d="M4 12l5 5L20 6"></path>`,
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
        <button class="secondary-button asset-action-button" type="submit">Save Asset</button>
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
      name: "Work outcomes",
      ready: outcomesReady,
      detail: outcomesReady ? "Cause/resolution/follow-up available" : "Run step-next-work-order-outcomes.sql",
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
      <form class="restock-form" data-restock-part="${part.id}">
        <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Restock quantity for ${escapeHtml(part.name)}">
        <button class="secondary-button" type="submit">Restock</button>
      </form>
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
    </section>
  `;
}

function renderPartsHealth() {
  const lowCount = lowStockParts().length;
  const totalUnits = parts.reduce((sum, part) => sum + (Number(part.quantity_on_hand) || 0), 0);
  const reorderTracked = parts.filter((part) => Number(part.reorder_point) > 0).length;
  const costsListed = parts.filter((part) => Number(part.unit_cost) > 0).length;
  return [
    ["Low Stock", lowCount],
    ["Total Units", totalUnits],
    ["Reorder Tracked", reorderTracked],
    ["Costs Listed", costsListed],
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
          <span>${relationshipIcon("asset")}${escapeHtml(workOrder.assets?.name || "No asset")}</span>
          <span>${segmentIcon(isVendorAssigned(workOrder) ? "vendor" : "mine")}${escapeHtml(assignmentLabel(workOrder))}</span>
          ${procedure ? `<span>${relationshipIcon("procedure")}${escapeHtml(procedure.name)}</span>` : ""}
          <span>${segmentIcon("due")}Due ${workOrder.due_at || "unset"}</span>
          ${workOrder.completed_at ? `<span>${segmentIcon("completed")}Completed ${new Date(workOrder.completed_at).toLocaleDateString()}</span>` : ""}
        </div>
        ${renderRelationshipChips(workOrder)}
        <div class="quick-actions work-card-actions">
          ${!workOrder.assigned_to ? `<button class="assign-action" data-assign-me="${workOrder.id}" type="button">Assign to me</button>` : ""}
        ${STATUS_OPTIONS.filter((status) => status !== workOrder.status).slice(0, 3).map((status) => `
          <button data-quick-status="${status}" data-id="${workOrder.id}" type="button">${statusLabel(status)}</button>
        `).join("")}
      </div>
    </article>
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
      <label>Asset
        <select name="asset_id">
          <option value="">No asset / general area</option>
          ${assets.map((asset) => `<option value="${asset.id}">${escapeHtml(asset.name)}</option>`).join("")}
        </select>
      </label>

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
      <label>Asset
        <select name="asset_id">
          <option value="">No asset / general area</option>
          ${assets.map((asset) => `<option value="${asset.id}" ${asset.id === (selectedAssetId || sourceRequest?.asset_id) ? "selected" : ""}>${escapeHtml(asset.name)}</option>`).join("")}
        </select>
        <small>Asset not listed? Add it below.</small>
      </label>
      <label>New asset name<input name="new_asset_name" placeholder="Packaging Line 2"></label>
      <label>Photo<input name="photo" type="file" accept="image/*" capture="environment"><small>Optional. Photos are optimized up to 2400px before upload.</small></label>
      <label class="check-row"><input name="machine_down" type="checkbox"> Machine is down</label>
      <label class="check-row"><input name="mark_completed" type="checkbox"> Already fixed - mark complete now</label>
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
          <span class="chip ${workOrder.status}">${statusLabel(workOrder.status)}</span>
        </div>
        <h2>${escapeHtml(workOrder.title)}</h2>
        <p>${escapeHtml(cleanWorkOrderDescription(workOrder.description) || "No description.")}</p>
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
          ${STATUS_OPTIONS.map((status) => `<option value="${status}" ${status === workOrder.status ? "selected" : ""}>${statusLabel(status)}</option>`).join("")}
        </select>
      </label>

      <div class="quick-actions detail-quick-actions">
        ${workOrder.assigned_to !== session.user.id ? `<button class="assign-action" data-assign-me="${workOrder.id}" type="button">${workOrder.assigned_to ? "Reassign to me" : "Assign to me"}</button>` : ""}
        ${STATUS_OPTIONS.filter((status) => status !== workOrder.status).map((status) => `
          <button data-quick-status="${status}" data-id="${workOrder.id}" type="button">${statusLabel(status)}</button>
        `).join("")}
      </div>

      <details class="quick-update-panel relationship-detail comment" open>
        <summary>Quick Update View</summary>
        <form class="form-grid" id="quick-update-work-order-form">
          <label>Issue<input name="title" required value="${escapeHtml(workOrder.title)}"></label>
          <label>Asset
            <select name="asset_id">
              <option value="">No asset / general area</option>
              ${assets.map((asset) => `<option value="${asset.id}" ${asset.id === workOrder.asset_id ? "selected" : ""}>${escapeHtml(asset.name)}</option>`).join("")}
            </select>
          </label>
          <label>Current update<textarea name="description" rows="2">${escapeHtml(cleanWorkOrderDescription(workOrder.description) || "")}</textarea></label>
          <label>Expected back up / due date<input name="due_at" type="date" value="${workOrder.due_at || ""}"></label>
          <label>Status
            <select name="status">
              ${STATUS_OPTIONS.map((status) => `<option value="${status}" ${status === workOrder.status ? "selected" : ""}>${statusLabel(status)}</option>`).join("")}
            </select>
          </label>
          <label>Priority
            <select name="priority">
              ${["low", "medium", "high", "critical"].map((priority) => `<option value="${priority}" ${priority === workOrder.priority ? "selected" : ""}>${priority}</option>`).join("")}
            </select>
          </label>
          <label>Assign to
            <select name="assigned_to">
              <option value="">Unassigned</option>
              <option value="${OUTSIDE_VENDOR_VALUE}" ${isVendorAssigned(workOrder) ? "selected" : ""}>Outside vendor</option>
              ${Object.entries(profilesByUserId).map(([userId, profile]) => `<option value="${userId}" ${!isVendorAssigned(workOrder) && userId === workOrder.assigned_to ? "selected" : ""}>${escapeHtml(profile.full_name || "Team member")}</option>`).join("")}
            </select>
          </label>
          <label class="check-row"><input name="machine_down" type="checkbox" ${workOrder.assets?.status === "offline" ? "checked" : ""}> Machine is down</label>
          <p class="error-text" id="quick-update-error"></p>
          <button class="primary-button quick-fix-submit" type="submit">Save Quick Update</button>
        </form>
      </details>

      <div class="downtime-copy relationship-detail asset">
        <div>
          <h3>Downtime Email Helper</h3>
          <p class="muted">Copy a human update for email when this asset is down or needs attention.</p>
        </div>
        <div class="quick-actions">
          <button class="secondary-button" data-copy-downtime="subject" data-id="${workOrder.id}" type="button">Copy Subject</button>
          <button class="secondary-button" data-copy-downtime="body" data-id="${workOrder.id}" type="button">Copy Email Body</button>
        </div>
      </div>

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
        <label>Upload photo<input name="photo" type="file" accept="image/*"><small>Photos are optimized up to 2400px before upload.</small></label>
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
    createWorkOrderMode = false;
    localStorage.setItem("maintainops.activeCompanyId", activeCompanyId);
    await render();
  });

  document.querySelector("#sign-out").addEventListener("click", () => supabaseClient.auth.signOut());
  document.querySelector("#new-company").addEventListener("click", renderCompanyCreate);
  document.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => {
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
      activeSection = "work";
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
      localStorage.setItem("maintainops.workOrderFilter", workOrderFilter);
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

async function createQuickFixAsset(name, status = "running") {
  return supabaseClient
    .from("assets")
    .insert({
      company_id: activeCompanyId,
      name,
      status,
    })
    .select()
    .single();
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
  const submitButton = formElement.querySelector("button[type='submit']");
  const form = new FormData(formElement);
  if (errorElement) errorElement.textContent = "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Adding...";
  }
  const payload = {
    company_id: activeCompanyId,
    name: form.get("name"),
    sku: form.get("sku") || null,
    supplier_name: form.get("supplier_name") || null,
    quantity_on_hand: Number(form.get("quantity_on_hand")) || 0,
    reorder_point: Number(form.get("reorder_point")) || 0,
    unit_cost: Number(form.get("unit_cost")) || 0,
  };
  let { data, error } = await supabaseClient.from("parts").insert(payload).select("id").single();
  if (error && isMissingColumnError(error, "supplier_name")) {
    partSuppliersReady = false;
    delete payload.supplier_name;
    const retry = await supabaseClient.from("parts").insert(payload).select("id").single();
    data = retry.data;
    error = retry.error;
  }
  if (error && isMissingColumnError(error, "unit_cost")) {
    partCostsReady = false;
    if (errorElement) {
      errorElement.textContent = "Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.";
    }
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Add Part";
    }
    return;
  }
  if (error) {
    if (errorElement) errorElement.textContent = error.message;
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Add Part";
    }
    return;
  }
  activePartId = data?.id || null;
  resetPartsPage();
  showNotice("Part added.");
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
    supplier_name: form.get("supplier_name") || null,
    quantity_on_hand: Number(form.get("quantity_on_hand")) || 0,
    reorder_point: Number(form.get("reorder_point")) || 0,
    unit_cost: Number(form.get("unit_cost")) || 0,
  };

  let { error } = await supabaseClient
    .from("parts")
    .update(payload)
    .eq("id", partId)
    .eq("company_id", activeCompanyId);

  if (error && isMissingColumnError(error, "supplier_name")) {
    partSuppliersReady = false;
    delete payload.supplier_name;
    const retry = await supabaseClient
      .from("parts")
      .update(payload)
      .eq("id", partId)
      .eq("company_id", activeCompanyId);
    error = retry.error;
  }

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

  activePartId = null;
  showNotice("Part saved.");
  await render();
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

  const { error } = await supabaseClient
    .from("parts")
    .update({ supplier_name: newSource || null })
    .eq("company_id", activeCompanyId)
    .eq("supplier_name", oldSource);

  if (error) {
    if (isMissingColumnError(error, "supplier_name")) partSuppliersReady = false;
    if (errorElement) {
      errorElement.textContent = partSuppliersReady
        ? error.message
        : "Run supabase/step-next-part-suppliers.sql before editing sources.";
    }
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Rename";
    }
    return;
  }

  showNotice("Part source updated.");
  await render();
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
  const upload = await supabaseClient.storage.from("part-documents").upload(path, file, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });

  if (upload.error) {
    if (errorElement) errorElement.textContent = upload.error.message;
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Attach File";
    }
    return;
  }

  const { error } = await supabaseClient.from("part_documents").insert({
    company_id: activeCompanyId,
    part_id: partId,
    uploaded_by: session.user.id,
    storage_path: path,
    file_name: fileName,
    content_type: file.type || null,
  });

  if (error) {
    if (isColumnSchemaError(error, ["part_documents"])) partDocumentsReady = false;
    if (errorElement) {
      errorElement.textContent = partDocumentsReady
        ? error.message
        : "Run supabase/step-next-part-documents.sql before attaching files.";
    }
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Attach File";
    }
    return;
  }

  showNotice("Part file attached.");
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
  const formElement = event.target;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorTarget = document.querySelector("#create-work-order-error");
  submitButton.disabled = true;
  submitButton.textContent = "Creating...";
  if (errorTarget) errorTarget.textContent = "";

  const form = new FormData(formElement);
  const status = form.get("status") || "open";
  const payload = {
    company_id: activeCompanyId,
    title: form.get("title"),
    description: descriptionWithAssignmentNote(form.get("description"), form.get("assigned_to")),
    asset_id: form.get("asset_id") || null,
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
  let { data, error } = await insertWithOptionalProcedure("work_orders", payload, { returnSingle: true });
  if (error && isColumnSchemaError(error, ["actual_minutes", "failure_cause", "resolution_summary", "follow_up_needed"])) {
    const fallbackPayload = { ...payload };
    delete fallbackPayload.actual_minutes;
    delete fallbackPayload.failure_cause;
    delete fallbackPayload.resolution_summary;
    delete fallbackPayload.follow_up_needed;
    delete fallbackPayload.completion_notes;
    delete fallbackPayload.completed_at;
    const retry = await insertWithOptionalProcedure("work_orders", fallbackPayload, { returnSingle: true });
    data = retry.data;
    error = retry.error;
  }
  if (error) {
    submitButton.disabled = false;
    submitButton.textContent = "Create Work Order";
    if (errorTarget) errorTarget.textContent = `Could not create work order: ${friendlyWorkOrderSaveError(error)}`;
    return;
  }
  await recordWorkOrderEvent(data.id, "created", "Work order created.");

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
  showNotice("Work order created.");
  if (warnings.length) alert(`Work order created, but ${warnings.join("; ")}.`);
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
      submitButton.disabled = false;
      submitButton.textContent = "Log Quick Fix";
      if (errorTarget) errorTarget.textContent = assetError.message;
      return;
    }
    assetId = newAsset.id;
  }

  const payload = {
    company_id: activeCompanyId,
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

  let { data, error } = await insertWithOptionalProcedure("work_orders", payload, { returnSingle: true });
  if (error && isColumnSchemaError(error, ["assigned_to", "actual_minutes", "failure_cause", "resolution_summary", "follow_up_needed"])) {
    const fallbackPayload = { ...payload };
    delete fallbackPayload.assigned_to;
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
    submitButton.textContent = "Log Quick Fix";
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

  const assetStatus = machineDown ? "offline" : form.get("asset_status");
  if (payload.asset_id && !newAssetName && (machineDown || (markCompleted && assetStatus))) {
    const assetError = await updateAssetStatus(payload.asset_id, assetStatus);
    if (assetError && errorTarget) {
      errorTarget.textContent = `Quick fix saved, but asset status did not update: ${assetError.message}`;
    } else {
      await recordWorkOrderEvent(data.id, "asset_status_updated", machineDown ? "Asset marked down/offline." : `Asset status set to ${assetStatus}.`);
    }
  }

  await recordWorkOrderEvent(data.id, "quick_fix", markCompleted ? "Quick fix recorded as completed." : "Quick fix logged and assigned to creator.");
  if (newAssetName) {
    await recordWorkOrderEvent(data.id, "asset_created", `Asset created from Quick Fix: ${newAssetName}.`);
  }
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
    await recordWorkOrderEvent(data.id, "request_quick_fixed", markCompleted ? "Request resolved through Quick Fix." : "Request converted to a Quick Fix work order.");
  }
  activeWorkOrderId = data.id;
  activeAssetId = null;
  createWorkOrderMode = false;
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

  try {
    const form = new FormData(event.target);
    const previous = workOrders.find((workOrder) => workOrder.id === activeWorkOrderId);
    const payload = {
      title: form.get("title"),
      description: descriptionWithAssignmentNote(form.get("description"), form.get("assigned_to")),
      due_at: form.get("due_at") || null,
      priority: form.get("priority"),
      type: form.get("type"),
      assigned_to: assignedUserFromForm(form),
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
    const payload = {
      title: form.get("title"),
      description: descriptionWithAssignmentNote(form.get("description"), form.get("assigned_to")),
      asset_id: form.get("asset_id") || null,
      due_at: form.get("due_at") || null,
      status: form.get("status"),
      priority: form.get("priority"),
      assigned_to: assignedUserFromForm(form),
    };
    if (payload.status === "completed" && previous?.status !== "completed") {
      payload.completed_at = new Date().toISOString();
    }
    if (payload.status !== "completed") {
      payload.completed_at = null;
    }

    const { error } = await updateWorkOrderWithFallback(payload, activeWorkOrderId);
    if (error) {
      submitButton.disabled = false;
      submitButton.textContent = "Save Quick Update";
      if (errorTarget) errorTarget.textContent = `Could not save update: ${friendlyWorkOrderSaveError(error)}`;
      return;
    }

    if (payload.asset_id && form.get("machine_down") === "on") {
      const assetError = await updateAssetStatus(payload.asset_id, "offline");
      if (assetError && errorTarget) {
        errorTarget.textContent = `Saved work order, but asset status did not update: ${assetError.message}`;
      } else {
        await recordWorkOrderEvent(activeWorkOrderId, "asset_status_updated", "Asset marked down/offline.");
      }
    }

    await recordWorkOrderEvent(activeWorkOrderId, "quick_update", describeWorkOrderChanges(previous, Object.fromEntries(form.entries())));
    showNotice("Quick update saved.");
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
  await recordWorkOrderEvent(id, "status_changed", `Status changed to ${statusLabel(status)}.`);
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

  const error = await addCommentToWorkOrder(activeWorkOrderId, body);

  if (error) {
    submitButton.disabled = false;
    submitButton.textContent = "Add Comment";
    if (errorTarget) errorTarget.textContent = `Could not add comment: ${error.message || error}`;
    return;
  }

  await recordWorkOrderEvent(activeWorkOrderId, "comment_added", "Comment added.");
  await render();
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
  if (status === "open") return "Pending";
  return String(status || "").replace("_", " ");
}

function assignedUserFromForm(form, defaultUserId = null) {
  const value = form.has("assigned_to") ? form.get("assigned_to") : (defaultUserId || "");
  return value === OUTSIDE_VENDOR_VALUE ? null : value || null;
}

function isVendorAssigned(workOrder) {
  return String(workOrder.description || "").includes(OUTSIDE_VENDOR_NOTE);
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
    `Asset: ${assetName}`,
    `Current update: ${currentUpdate}`,
    `Assigned to: ${assignedTo}`,
    `Priority: ${workOrder.priority || "medium"}`,
    `ETA / due date: ${workOrder.due_at ? formatDate(workOrder.due_at) : "Unknown"}`,
  ].join("\n");
}

function assetNameForWorkOrder(workOrder) {
  return workOrder.assets?.name || "Asset";
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
