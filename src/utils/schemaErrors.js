(function () {
  function isColumnSchemaError(error, columns) {
    const message = error?.message || "";
    return columns.some((column) => message.includes(column));
  }

  function isMissingColumnError(error, columnName) {
    const message = error?.message || "";
    return message.includes(columnName) && (message.includes("column") || message.includes("schema cache"));
  }

  function isProfileMissingError(error) {
    const message = error?.message || "";
    return message.includes("work_order_comments_company_author_profile_fkey") || message.includes("profiles");
  }

  function isProcedureSchemaError(error) {
    const message = error?.message || "";
    return Boolean(message.includes("procedure_template_id") || message.includes("procedure_templates") || message.includes("procedure_steps"));
  }

  function isAssetHierarchySchemaError(error) {
    return isColumnSchemaError(error, ["parent_asset_id", "asset_type", "safety_devices_required", "safety_check_required"]);
  }

  window.MaintainOpsSchemaErrors = {
    isColumnSchemaError,
    isMissingColumnError,
    isProfileMissingError,
    isProcedureSchemaError,
    isAssetHierarchySchemaError,
  };
})();
