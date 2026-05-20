(function () {
  window.MaintainOpsConstants = Object.freeze({
    STATUS_OPTIONS: Object.freeze(["open", "in_progress", "blocked", "completed"]),
    TYPE_OPTIONS: Object.freeze(["request", "reactive", "preventive", "inspection", "corrective"]),
    ASSET_TYPE_OPTIONS: Object.freeze(["machine", "secondary_machine", "component", "shop_item"]),
    WORK_ORDERS_PER_PAGE: 12,
    PARTS_PER_PAGE: 12,
    ASSETS_PER_PAGE: 12,
    LIST_ITEMS_PER_PAGE: 12,
    SEARCH_ID_PAGE_SIZE: 1000,
    SEARCH_ID_CHUNK_SIZE: 100,
    SEARCH_PREVIEW_LIMIT: 6,
    OUTSIDE_VENDOR_VALUE: "__outside_vendor__",
    OUTSIDE_VENDOR_NOTE: "[Assignment: Outside vendor]",
    COMPANY_ROLES: Object.freeze(["technician", "manager", "admin"]),
    ACTIVE_LOCATION_STORAGE_KEY: "maintainops.activeLocationId",
  });
})();
