(function () {
  function bindWorkSectionJumpEvents(options = {}) {
    const doc = options.documentRef || document;
    const setTimeoutFn = options.setTimeoutFn || setTimeout;

    doc.querySelectorAll("[data-jump-work-section]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = doc.querySelector(`#${button.dataset.jumpWorkSection}`);
        if (!target) return;
        const detailSection = target.closest("details");
        if (detailSection) detailSection.open = true;
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        const highlightTarget = target;
        highlightTarget.classList.add("jump-highlight", "field-jump-highlight");
        setTimeoutFn(() => highlightTarget.classList.remove("jump-highlight"), 1400);
        setTimeoutFn(() => highlightTarget.classList.remove("field-jump-highlight"), 1400);
      });
    });
  }

  window.MaintainOpsWorkSectionJumpEvents = {
    bindWorkSectionJumpEvents,
  };
})();
