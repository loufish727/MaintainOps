(function () {
  function createSetupErrorDisplayHelpers() {
    function equipmentSchemaMessage(error) {
      const message = error?.message || "";
      if (message.includes("assets_asset_type_check") || message.includes("asset_type")) {
        return "Run supabase/step-next-asset-type-shop-item.sql before saving Shop Item equipment.";
      }
      return "Run supabase/step-next-asset-hierarchy.sql before saving equipment hierarchy.";
    }

    function databaseSetupRequiredMessage(area = "this save") {
      return `Database update required before ${area}. Run the current Supabase SQL steps from docs/supabase-architecture.md, then refresh and try again.`;
    }

    return {
      equipmentSchemaMessage,
      databaseSetupRequiredMessage,
    };
  }

  window.MaintainOpsSetupErrorDisplay = {
    createSetupErrorDisplayHelpers,
  };
})();
