(function () {
  function createEquipmentStructureGuideDisplayHelpers() {
    function renderEquipmentStructureGuide() {
      return `
        <section class="equipment-structure-guide" aria-label="Equipment structure guide">
          <div class="guide-header">
            <span class="guide-kicker">Structure Guide</span>
            <strong>How to model a line, sub-assembly, tooling, and parts</strong>
          </div>
          <div class="equipment-structure-grid">
            <article>
              <span>Machine / Line</span>
              <strong>Whole operational asset</strong>
              <p>Use for the progressive roll former, ASC line, folder, press, or machine people open work against.</p>
            </article>
            <article>
              <span>Sub-assembly</span>
              <strong>Major functional section</strong>
              <p>Use for uncoiler, forming section, shear, HPU, controls cabinet, conveyor, or safety circuit.</p>
            </article>
            <article>
              <span>Tooling / Setup</span>
              <strong>Swappable profile or station setup</strong>
              <p>Use for roll tooling sets, die sets, profile setups, or station tooling worth tracking separately.</p>
            </article>
            <article>
              <span>Component / Part</span>
              <strong>Replaceable item</strong>
              <p>Use linked parts for bearings, sensors, VFDs, cylinders, valves, spacers, and common spares.</p>
            </article>
          </div>
          <p class="guide-note"><strong>Roll former rule:</strong> a station is usually a position. Track it as tooling/setup only when the roll set, adjustment, serial, PM, or recurring defect needs its own history.</p>
        </section>
      `;
    }

    return { renderEquipmentStructureGuide };
  }

  window.MaintainOpsEquipmentStructureGuideDisplay = {
    createEquipmentStructureGuideDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createEquipmentStructureGuideDisplayHelpers };
  }
})();
