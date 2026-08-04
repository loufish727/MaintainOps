(function () {
  function postgrestSearchTerm(value) {
    return String(value || "")
      .trim()
      .replace(/[,%()]/g, " ")
      .replace(/\s+/g, " ")
      .slice(0, 80);
  }

  function isoDate(date) {
    return date.toISOString().slice(0, 10);
  }

  function isoDateTime(date) {
    return date.toISOString();
  }

  function daysAgoDate(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }

  function monthStartDate() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  function sundayWeekRange(referenceDate = new Date()) {
    const start = new Date(referenceDate);
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    return { start, end };
  }

  function chunkArray(items, size) {
    const chunks = [];
    for (let index = 0; index < items.length; index += size) {
      chunks.push(items.slice(index, index + size));
    }
    return chunks;
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
    if (status === "completed") return "All Completed";
    if (status === "completed_month") return "Completed Month";
    if (status === "completed_week") return "Done This Week";
    if (status === "open") return "New";
    return String(status || "")
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function normalizeWorkOrderType(type) {
    const normalized = String(type || "corrective").trim().toLowerCase();
    if (normalized === "inspection") return "preventive";
    if (normalized === "reactive" || normalized === "request") return "corrective";
    return ["corrective", "preventive", "fabrication"].includes(normalized) ? normalized : "corrective";
  }

  function workOrderTypeLabel(type) {
    const labels = {
      corrective: "Corrective",
      preventive: "Preventive",
      fabrication: "Fabrication",
    };
    return labels[normalizeWorkOrderType(type)];
  }

  function normalizeRole(role) {
    const roles = window.MaintainOpsConstants?.COMPANY_ROLES || ["technician", "production", "accounting", "manager", "admin"];
    const normalized = String(role || "technician").trim().toLowerCase();
    if (normalized === "member") return "technician";
    return roles.includes(normalized) ? normalized : "technician";
  }

  function roleLabel(role) {
    const labels = {
      admin: "Admin",
      manager: "Manager",
      accounting: "Accounting",
      production: "Production",
      technician: "Technician",
    };
    return labels[normalizeRole(role)] || "Technician";
  }

  function roleDescription(role) {
    const descriptions = {
      admin: "Full company setup, team, and work access.",
      manager: "Can manage work, settings, and teammates.",
      accounting: "Can review equipment financial records without changing operations.",
      production: "Technician access plus production action items assigned from work orders.",
      technician: "Can create work, convert requests, and claim unassigned work.",
    };
    return descriptions[normalizeRole(role)] || descriptions.technician;
  }

  function formatDate(value) {
    return new Date(`${value}T00:00:00`).toLocaleDateString();
  }

  function photoMetaText(photo) {
    const parts = [new Date(photo.created_at).toLocaleString()];
    if (photo.file_size_bytes) parts.push(formatBytes(photo.file_size_bytes));
    if (photo.original_size_bytes && photo.file_size_bytes && photo.original_size_bytes !== photo.file_size_bytes) {
      parts.push(`optimized from ${formatBytes(photo.original_size_bytes)}`);
    }
    return parts.join(" - ");
  }

  function requestPhotoMetaText(request) {
    const parts = [];
    if (request.photo_uploaded_at || request.updated_at || request.created_at) {
      parts.push(new Date(request.photo_uploaded_at || request.updated_at || request.created_at).toLocaleString());
    }
    if (request.photo_file_size_bytes) parts.push(formatBytes(request.photo_file_size_bytes));
    if (request.photo_original_size_bytes && request.photo_file_size_bytes && request.photo_original_size_bytes !== request.photo_file_size_bytes) {
      parts.push(`optimized from ${formatBytes(request.photo_original_size_bytes)}`);
    }
    return parts.join(" - ") || "Photo attached";
  }

  function formatBytes(bytes) {
    const value = Number(bytes) || 0;
    if (!value) return "";
    if (value < 1024) return `${value} B`;
    if (value < 1048576) return `${Math.round(value / 1024)} KB`;
    return `${(value / 1048576).toFixed(value >= 10485760 ? 0 : 1)} MB`;
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

  function startOfToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  function csvCell(value) {
    const text = String(value ?? "");
    return `"${text.replaceAll('"', '""')}"`;
  }

  window.MaintainOpsFormatting = Object.freeze({
    postgrestSearchTerm,
    isoDate,
    isoDateTime,
    daysAgoDate,
    monthStartDate,
    sundayWeekRange,
    chunkArray,
    fileBaseName,
    safeFileName,
    statusLabel,
    normalizeWorkOrderType,
    workOrderTypeLabel,
    normalizeRole,
    roleLabel,
    roleDescription,
    formatDate,
    photoMetaText,
    requestPhotoMetaText,
    formatBytes,
    money,
    partUsageUnitCost,
    getDueState,
    startOfToday,
    csvCell,
  });
})();
