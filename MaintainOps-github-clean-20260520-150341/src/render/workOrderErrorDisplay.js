(function () {
  function createWorkOrderErrorDisplayHelpers() {
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

    return {
      friendlyWorkOrderSaveError,
    };
  }

  window.MaintainOpsWorkOrderErrorDisplay = {
    createWorkOrderErrorDisplayHelpers,
  };
})();
