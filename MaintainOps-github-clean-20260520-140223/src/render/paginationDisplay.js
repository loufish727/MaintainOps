(function () {
  function createPaginationDisplayHelpers({
    WORK_ORDERS_PER_PAGE,
    PARTS_PER_PAGE,
    ASSETS_PER_PAGE,
    LIST_ITEMS_PER_PAGE,
    getWorkOrderPage,
    getPartsPage,
    getAssetsPage,
  }) {
    function renderWorkPagination(totalCount, totalPages) {
      if (totalCount <= WORK_ORDERS_PER_PAGE) return "";
      const workOrderPage = getWorkOrderPage();
      const firstShown = ((workOrderPage - 1) * WORK_ORDERS_PER_PAGE) + 1;
      const lastShown = Math.min(totalCount, workOrderPage * WORK_ORDERS_PER_PAGE);
      return `
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-work-page="prev" type="button" ${workOrderPage <= 1 ? "disabled" : ""}>Previous</button>
          <span>Showing ${firstShown}-${lastShown} of ${totalCount} - Page ${workOrderPage} of ${totalPages}</span>
          <button class="secondary-button page-action-button" data-work-page="next" type="button" ${workOrderPage >= totalPages ? "disabled" : ""}>Next</button>
        </div>
      `;
    }

    function renderPartsPagination(totalCount, totalPages) {
      if (totalCount <= PARTS_PER_PAGE) return "";
      const partsPage = getPartsPage();
      const firstShown = ((partsPage - 1) * PARTS_PER_PAGE) + 1;
      const lastShown = Math.min(totalCount, partsPage * PARTS_PER_PAGE);
      return `
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-parts-page="prev" type="button" ${partsPage <= 1 ? "disabled" : ""}>Previous</button>
          <span>Showing ${firstShown}-${lastShown} of ${totalCount} - Page ${partsPage} of ${totalPages}</span>
          <button class="secondary-button page-action-button" data-parts-page="next" type="button" ${partsPage >= totalPages ? "disabled" : ""}>Next</button>
        </div>
      `;
    }

    function renderAssetsPagination(totalCount, totalPages) {
      if (totalCount <= ASSETS_PER_PAGE) return "";
      const assetsPage = getAssetsPage();
      const firstShown = ((assetsPage - 1) * ASSETS_PER_PAGE) + 1;
      const lastShown = Math.min(totalCount, assetsPage * ASSETS_PER_PAGE);
      return `
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-assets-page="prev" type="button" ${assetsPage <= 1 ? "disabled" : ""}>Previous</button>
          <span>Showing ${firstShown}-${lastShown} of ${totalCount} - Page ${assetsPage} of ${totalPages}</span>
          <button class="secondary-button page-action-button" data-assets-page="next" type="button" ${assetsPage >= totalPages ? "disabled" : ""}>Next</button>
        </div>
      `;
    }

    function renderListPagination(kind, totalCount, currentPage, totalPages) {
      if (totalCount <= LIST_ITEMS_PER_PAGE) return "";
      const firstShown = ((currentPage - 1) * LIST_ITEMS_PER_PAGE) + 1;
      const lastShown = Math.min(totalCount, currentPage * LIST_ITEMS_PER_PAGE);
      return `
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-list-page="${kind}" data-page-direction="prev" type="button" ${currentPage <= 1 ? "disabled" : ""}>Previous</button>
          <span>Showing ${firstShown}-${lastShown} of ${totalCount} - Page ${currentPage} of ${totalPages}</span>
          <button class="secondary-button page-action-button" data-list-page="${kind}" data-page-direction="next" type="button" ${currentPage >= totalPages ? "disabled" : ""}>Next</button>
        </div>
      `;
    }

    return {
      renderWorkPagination,
      renderPartsPagination,
      renderAssetsPagination,
      renderListPagination,
    };
  }

  window.MaintainOpsPaginationDisplay = {
    createPaginationDisplayHelpers,
  };
})();
