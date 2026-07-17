(function () {
  /*
   * Module contract: reads an aggregate, company-scoped platform snapshot for the
   * Performance workspace. It never writes records, never changes auth/RLS, and
   * does not claim infrastructure telemetry that MaintainOps does not collect.
   */
  const DAY_MS = 24 * 60 * 60 * 1000;
  const DEFAULT_HISTORY_DAYS = 45;
  const DEFAULT_TIMELINE_DAYS = 14;
  const PAGE_SIZE = 1000;

  function startOfLocalDay(date = new Date()) {
    const next = new Date(date);
    next.setHours(0, 0, 0, 0);
    return next;
  }

  function daysBefore(date, days) {
    return new Date(date.getTime() - (days * DAY_MS));
  }

  function dayKey(value) {
    const date = value ? new Date(value) : null;
    if (!date || Number.isNaN(date.getTime())) return "";
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
  }

  function formatShortDay(value) {
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
  }

  function number(value) {
    return Number(value) || 0;
  }

  async function fetchCompanyRows(supabaseClient, options) {
    const {
      table,
      select,
      fallbackSelect = "",
      companyId,
      cutoffIso,
    } = options;

    async function fetchWithSelect(selectClause) {
      const rows = [];
      let from = 0;
      while (true) {
        const { data, error } = await supabaseClient
          .from(table)
          .select(selectClause)
          .eq("company_id", companyId)
          .gte("created_at", cutoffIso)
          .order("created_at", { ascending: true })
          .range(from, from + PAGE_SIZE - 1);
        if (error) throw error;
        const page = data || [];
        rows.push(...page);
        if (page.length < PAGE_SIZE) return rows;
        from += PAGE_SIZE;
      }
    }

    try {
      return await fetchWithSelect(select);
    } catch (error) {
      const message = String(error?.message || "").toLowerCase();
      const missingLocationColumn = fallbackSelect && message.includes("location_id");
      if (!missingLocationColumn) throw error;
      return fetchWithSelect(fallbackSelect);
    }
  }

  async function readOptional(label, load) {
    try {
      return { label, data: await load(), error: null };
    } catch (error) {
      return { label, data: null, error: error?.message || `Could not read ${label}.` };
    }
  }

  function buildTimeline({ now, days, workOrders, requests }) {
    const start = daysBefore(startOfLocalDay(now), days - 1);
    const rows = Array.from({ length: days }, (_, index) => {
      const date = new Date(start.getTime() + (index * DAY_MS));
      const key = dayKey(date);
      return {
        key,
        label: formatShortDay(key),
        requests: 0,
        ordersReceived: 0,
      };
    });
    const byKey = new Map(rows.map((row) => [row.key, row]));
    requests.forEach((request) => {
      const row = byKey.get(dayKey(request.created_at));
      if (row) row.requests += 1;
    });
    workOrders.forEach((workOrder) => {
      const created = byKey.get(dayKey(workOrder.created_at));
      if (created) created.ordersReceived += 1;
    });
    return rows;
  }

  function buildPlantFootprint({ locations, workOrders, requests }) {
    const names = new Map((locations || []).map((location) => [location.id, location.name || "Unnamed plant"]));
    const activity = new Map();
    function register(locationId, kind) {
      const key = locationId || "unassigned";
      const current = activity.get(key) || { locationId: key, workOrders: 0, requests: 0 };
      current[kind] += 1;
      activity.set(key, current);
    }
    workOrders.forEach((row) => register(row.location_id, "workOrders"));
    requests.forEach((row) => register(row.location_id, "requests"));

    const knownLocations = (locations || []).map((location) => ({
      locationId: location.id,
      name: location.name || "Unnamed plant",
      ...(activity.get(location.id) || { workOrders: 0, requests: 0 }),
    }));
    if (activity.has("unassigned")) {
      knownLocations.push({
        locationId: "unassigned",
        name: "Unassigned location",
        ...activity.get("unassigned"),
      });
    }
    return knownLocations
      .map((row) => ({
        ...row,
        total: number(row.workOrders) + number(row.requests),
      }))
      .sort((left, right) => right.total - left.total || left.name.localeCompare(right.name));
  }

  function buildSignals({ summary, storage }) {
    const signals = [
      {
        kind: "active",
        title: "Public intake total",
        value: `${summary.publicIntakeTotal} total`,
        detail: `${summary.requestsToday} received today`,
        system: "Public Intake",
      },
      {
        kind: "active",
        title: "Orders through system",
        value: `${summary.ordersReceivedTotal} total`,
        detail: `${summary.ordersReceivedToday} received today`,
        system: "Order Throughput",
      },
      {
        kind: "active",
        title: "Process data flow",
        value: `${summary.processEventsToday} events today`,
        detail: "Public intake and order throughput activity",
        system: "Today's Process Flow",
      },
      {
        kind: "stable",
        title: "Platform footprint",
        value: `${summary.totalRecords} records`,
        detail: `${summary.locations} plants across the active company`,
        system: "Platform Footprint",
      },
    ];
    if (storage?.available) {
      signals.push({
        kind: "stable",
        title: "Stored data footprint",
        value: storage.totalBytesText,
        detail: `${storage.fileCount} linked files stored`,
        system: "Data Vault",
      });
    }
    return signals;
  }

  async function loadPlatformPerformanceSnapshot(supabaseClient, options = {}) {
    const companyId = options.companyId;
    if (!companyId) throw new Error("Choose a company before loading platform performance.");

    const now = options.now ? new Date(options.now) : new Date();
    const historyDays = Math.max(14, number(options.historyDays) || DEFAULT_HISTORY_DAYS);
    const timelineDays = Math.max(7, number(options.timelineDays) || DEFAULT_TIMELINE_DAYS);
    const historyCutoff = daysBefore(now, historyDays).toISOString();
    const today = startOfLocalDay(now);
    const canViewStorage = Boolean(options.canViewStorage);

    const [workOrdersResult, requestsResult, ordersReceivedResult, publicIntakeResult, storageResult] = await Promise.all([
      readOptional("work orders", () => fetchCompanyRows(supabaseClient, {
        table: "work_orders",
        select: "id, created_at, location_id",
        companyId,
        cutoffIso: historyCutoff,
      })),
      readOptional("maintenance requests", () => fetchCompanyRows(supabaseClient, {
        table: "maintenance_requests",
        select: "id, created_at, location_id",
        fallbackSelect: "id, created_at",
        companyId,
        cutoffIso: historyCutoff,
      })),
      readOptional("order count", async () => {
        const { count, error } = await supabaseClient
          .from("work_orders")
          .select("id", { count: "exact", head: true })
          .eq("company_id", companyId);
        if (error) throw error;
        return count || 0;
      }),
      readOptional("public intake count", async () => {
        const { count, error } = await supabaseClient
          .from("maintenance_requests")
          .select("id", { count: "exact", head: true })
          .eq("company_id", companyId);
        if (error) throw error;
        return count || 0;
      }),
      canViewStorage
        ? readOptional("storage dashboard", async () => {
          const { data, error } = await supabaseClient.rpc("get_storage_dashboard", { target_company_id: companyId });
          if (error) throw error;
          return data || {};
        })
        : Promise.resolve({ label: "storage dashboard", data: null, error: "Storage detail is available to managers and admins." }),
    ]);

    const workOrders = workOrdersResult.data || [];
    const requests = requestsResult.data || [];
    const storageDashboard = storageResult.data || {};
    const totalBytes = number(storageDashboard.total_bytes);
    const storage = {
      available: Boolean(storageResult.data),
      totalBytes,
      totalBytesText: totalBytes ? formatByteText(totalBytes) : "0 B",
      fileCount: number(storageDashboard.file_count),
      note: storageResult.error || "",
    };
    const ordersReceivedTotal = number(ordersReceivedResult.data);
    const publicIntakeTotal = number(publicIntakeResult.data);
    const members = Array.isArray(options.companyMembers) ? options.companyMembers : [];
    const assets = Array.isArray(options.assets) ? options.assets : [];
    const parts = Array.isArray(options.parts) ? options.parts : [];
    const locations = Array.isArray(options.locations) ? options.locations : [];
    const todayKey = dayKey(today);
    const requestsToday = requests.filter((row) => dayKey(row.created_at) === todayKey).length;
    const ordersReceivedToday = workOrders.filter((row) => dayKey(row.created_at) === todayKey).length;
    const processEventsToday = requestsToday + ordersReceivedToday;
    const recentErrors = [workOrdersResult, requestsResult, ordersReceivedResult, publicIntakeResult]
      .filter((result) => result.error)
      .map((result) => result.label);
    const totalRecords = assets.length + parts.length + ordersReceivedTotal + publicIntakeTotal;

    return {
      sampledAt: now.toISOString(),
      historyDays,
      telemetry: {
        status: "pending",
        message: "Platform instrumentation is not connected yet. Uptime, API latency, sync jobs, and active-login telemetry will appear here once collected.",
      },
      summary: {
        teamSeats: members.length,
        requestsToday,
        ordersReceivedToday,
        processEventsToday,
        publicIntakeTotal,
        ordersReceivedTotal,
        totalRecords,
        assets: assets.length,
        parts: parts.length,
        locations: locations.length,
        storage,
      },
      systems: [
        {
          id: "intake",
          label: "Public Intake",
          value: `${publicIntakeTotal} total`,
          detail: `${requestsToday} received today`,
          tone: "cyan",
        },
        {
          id: "orders",
          label: "Order Throughput",
          value: `${ordersReceivedTotal} total`,
          detail: `${ordersReceivedToday} received today`,
          tone: "cyan",
        },
        {
          id: "flow",
          label: "Today's Process Flow",
          value: `${processEventsToday} events`,
          detail: "Today across public intake and order throughput",
          tone: "cyan",
        },
        {
          id: "vault",
          label: "Data Vault",
          value: storage.available ? storage.totalBytesText : `${totalRecords} records`,
          detail: storage.available ? `${storage.fileCount} linked files` : "Storage detail needs manager access",
          tone: "cyan",
        },
        {
          id: "footprint",
          label: "Platform Footprint",
          value: `${totalRecords} records`,
          detail: `${locations.length} active plant${locations.length === 1 ? "" : "s"} / ${members.length} team members`,
          tone: "cyan",
        },
      ],
      signals: buildSignals({
        summary: {
          requestsToday,
          ordersReceivedToday,
          processEventsToday,
          publicIntakeTotal,
          ordersReceivedTotal,
          totalRecords,
          locations: locations.length,
        },
        storage,
      }),
      timeline: buildTimeline({ now, days: timelineDays, workOrders, requests }),
      plants: buildPlantFootprint({ locations, workOrders, requests }),
      notices: [
        ...recentErrors.map((label) => `${label} could not be sampled.`),
        ...(storage.note ? [storage.note] : []),
      ],
    };
  }

  function formatByteText(bytes) {
    if (!bytes) return "0 B";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${Math.round(bytes / 1024)} KB`;
    if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(bytes >= 10485760 ? 0 : 1)} MB`;
    return `${(bytes / 1073741824).toFixed(bytes >= 10737418240 ? 0 : 1)} GB`;
  }

  const api = { loadPlatformPerformanceSnapshot };
  if (typeof window !== "undefined") window.MaintainOpsPlatformPerformanceService = api;
  if (typeof module !== "undefined") module.exports = api;
})();
