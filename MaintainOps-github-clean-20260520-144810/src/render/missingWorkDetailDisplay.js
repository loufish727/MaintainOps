(function () {
  function createMissingWorkDetailDisplayHelpers() {
    function renderMissingWorkOrderDetail() {
      return `
        <div class="empty-state warning-state">
          <h3>Work order not loaded</h3>
          <p>This order may be outside the current filter, location, or page. Go back to the work order list and search for it again.</p>
          <button class="secondary-button back-action-button" id="back-to-my-work" type="button">Back to Work Orders</button>
        </div>
      `;
    }

    return {
      renderMissingWorkOrderDetail,
    };
  }

  window.MaintainOpsMissingWorkDetailDisplay = {
    createMissingWorkDetailDisplayHelpers,
  };
})();
