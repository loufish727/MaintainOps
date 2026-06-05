(function () {
  function createPartSetupDisplayHelpers({
    getPartCostsReady,
    getPartSuppliersReady,
    getPartMachineNotesReady,
  }) {
    function partSetupMessage() {
      const messages = [];
      if (!getPartCostsReady()) messages.push("Run supabase/step-next-part-costs.sql before saving unit costs.");
      if (!getPartSuppliersReady()) messages.push("Run supabase/step-next-part-suppliers.sql before saving source/vendor names.");
      if (getPartMachineNotesReady && !getPartMachineNotesReady()) messages.push("Run supabase/step-next-part-machine-note.sql before saving machine notes.");
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
