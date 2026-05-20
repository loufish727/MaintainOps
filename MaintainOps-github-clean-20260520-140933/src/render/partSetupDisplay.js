(function () {
  function createPartSetupDisplayHelpers({
    getPartCostsReady,
    getPartSuppliersReady,
  }) {
    function partSetupMessage() {
      const messages = [];
      if (!getPartCostsReady()) messages.push("Run supabase/step-next-part-costs.sql before saving unit costs.");
      if (!getPartSuppliersReady()) messages.push("Run supabase/step-next-part-suppliers.sql before saving source/vendor names.");
      return messages.join(" ");
    }

    return {
      partSetupMessage,
    };
  }

  window.MaintainOpsPartSetupDisplay = {
    createPartSetupDisplayHelpers,
  };
})();
