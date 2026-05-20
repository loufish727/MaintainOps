(function () {
  function createWorkRecommendationDisplayHelpers({
    escapeHtml,
    recommendedWorkOrderStep,
  }) {
    function renderWorkOrderRecommendation(workOrder) {
      const recommendation = recommendedWorkOrderStep(workOrder);
      if (!recommendation) return "";

      return `
        <section class="work-recommendation ${recommendation.tone || ""}" aria-label="Recommended next step">
          <div>
            <span>Recommended Next Step</span>
            <strong>${escapeHtml(recommendation.title)}</strong>
            <p>${escapeHtml(recommendation.helper)}</p>
          </div>
          <button class="recommendation-button" data-jump-work-section="${recommendation.target}" type="button">${escapeHtml(recommendation.action)}</button>
        </section>
      `;
    }

    return {
      renderWorkOrderRecommendation,
    };
  }

  window.MaintainOpsWorkRecommendationDisplay = {
    createWorkRecommendationDisplayHelpers,
  };
})();
