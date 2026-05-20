(function () {
  function createSetupStatusDisplayHelpers(deps) {
    function setupItems() {
      return [
        {
          name: "Supabase config",
          ready: Boolean(deps.getSupabaseUrl() && deps.getSupabaseAnonKey()),
          detail: deps.getSupabaseUrl() || "Missing supabase-config.js",
        },
        {
          name: "Company data",
          ready: Boolean(deps.getActiveCompanyId()),
          detail: deps.getActiveCompanyId() ? "Active tenant selected" : "Create or select a company",
        },
        {
          name: "Requests",
          ready: deps.getRequestsReady(),
          detail: deps.getRequestsReady() ? "Stored in maintenance_requests" : "Run step-next-maintenance-requests.sql",
        },
        {
          name: "Public request QR links",
          ready: deps.getPublicRequestLinksReady(),
          detail: deps.getPublicRequestLinksReady() ? "External location intake is available" : "Run step-next-public-request-links.sql",
        },
        {
          name: "Preventive schedules",
          ready: deps.getSchedulesReady(),
          detail: deps.getSchedulesReady() ? "PM schedules available" : "Run step-next-preventive-schedules.sql",
        },
        {
          name: "Procedures",
          ready: deps.getProceduresReady(),
          detail: deps.getProceduresReady() ? "Procedure templates available" : "Run step-next-procedures.sql",
        },
        {
          name: "Part costs",
          ready: deps.getPartCostsReady(),
          detail: deps.getPartCostsReady() ? "Unit costs available" : "Run step-next-part-costs.sql",
        },
        {
          name: "Part sources",
          ready: deps.getPartSuppliersReady(),
          detail: deps.getPartSuppliersReady() ? "Vendor/source names available" : "Run step-next-part-suppliers.sql",
        },
        {
          name: "Part files",
          ready: deps.getPartDocumentsReady(),
          detail: deps.getPartDocumentsReady() ? "Receipts and invoices can be filed with parts" : "Run step-next-part-documents.sql",
        },
        {
          name: "App issue reports",
          ready: deps.getAppIssueReportsReady(),
          detail: deps.getAppIssueReportsReady() ? "Live tester feedback can be captured" : "Run step-next-app-issue-reports.sql",
        },
        {
          name: "Message center",
          ready: deps.getMessagesReady(),
          detail: deps.getMessagesReady() ? "Company, location, and direct message threads available" : "Run step-next-message-center.sql",
        },
        {
          name: "Message work links",
          ready: deps.getMessageWorkOrderLinksReady(),
          detail: deps.getMessageWorkOrderLinksReady() ? "Message threads can link back to work orders" : "Run step-next-message-work-order-links.sql",
        },
        {
          name: "Work outcomes",
          ready: deps.getOutcomesReady(),
          detail: deps.getOutcomesReady() ? "Cause/resolution/follow-up available" : "Run step-next-work-order-outcomes.sql",
        },
        {
          name: "Safety checks",
          ready: deps.getSafetyChecksReady(),
          detail: deps.getSafetyChecksReady() ? "Asset safety check completion available" : "Run step-next-safety-checks.sql",
        },
        {
          name: "Admin delete protection",
          ready: deps.getAdminDeleteSqlConfirmed(),
          detail: deps.getAdminDeleteSqlConfirmed()
            ? "Admin-only delete SQL marked applied"
            : "Run step-next-admin-delete-work-orders.sql, then mark it applied",
          action: deps.getAdminDeleteSqlConfirmed() ? "" : "confirm-admin-delete-sql",
          actionLabel: "Mark SQL Applied",
        },
        {
          name: "Photos",
          ready: deps.getPhotosReady(),
          detail: deps.getPhotosReady() ? "Photo records available" : "Check storage bucket and photo table policies",
        },
      ];
    }

    return { setupItems };
  }

  window.MaintainOpsSetupStatusDisplay = {
    createSetupStatusDisplayHelpers,
  };
})();
