const assert = require("node:assert/strict");

global.window = {};

require("../../src/utils/constants.js");
require("../../src/render/paginationDisplay.js");

const {
  WORK_ORDERS_PER_PAGE,
  PARTS_PER_PAGE,
  ASSETS_PER_PAGE,
  LIST_ITEMS_PER_PAGE,
} = global.window.MaintainOpsConstants;
const { createPaginationDisplayHelpers } = global.window.MaintainOpsPaginationDisplay;

assert.equal(WORK_ORDERS_PER_PAGE, 12);
assert.equal(PARTS_PER_PAGE, 12);
assert.equal(ASSETS_PER_PAGE, 12);
assert.equal(LIST_ITEMS_PER_PAGE, 12);

const helpers = createPaginationDisplayHelpers({
  WORK_ORDERS_PER_PAGE,
  PARTS_PER_PAGE,
  ASSETS_PER_PAGE,
  LIST_ITEMS_PER_PAGE,
  getWorkOrderPage: () => 2,
  getPartsPage: () => 1,
  getAssetsPage: () => 1,
});

assert.equal(helpers.renderAssetsPagination(12, 1), "");
assert.match(helpers.renderAssetsPagination(13, 2), /Showing 1-12 of 13 - Page 1 of 2/);
assert.match(helpers.renderWorkPagination(24, 2), /Showing 13-24 of 24 - Page 2 of 2/);
assert.match(helpers.renderPartsPagination(13, 2), /Showing 1-12 of 13 - Page 1 of 2/);
assert.match(helpers.renderListPagination("procedures", 13, 1, 2), /Showing 1-12 of 13 - Page 1 of 2/);
assert.match(helpers.renderListPagination("messages", 13, 1, 2), /data-list-page="messages"/);

console.log("pagination standard smoke passed");
