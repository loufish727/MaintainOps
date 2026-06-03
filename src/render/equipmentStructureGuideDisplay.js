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
              <span>Forklift</span>
              <strong>Mobile powered equipment</strong>
              <p>Use for lift trucks that need repairs, inspections, battery/propane notes, attachments, PM, or recurring issue history.</p>
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
              <span>Component</span>
              <strong>Machine sub-history</strong>
              <p>Use when a piece of the machine needs its own repairs, PM, adjustments, serial, or recurring issue history.</p>
            </article>
            <article>
              <span>Part</span>
              <strong>Inventory item</strong>
              <p>Use for stocked, purchased, or consumed items like bearings, belts, sensors, fuses, filters, bolts, seals, and common spares.</p>
            </article>
            <article>
              <span>Shop Item</span>
              <strong>Standalone support asset</strong>
              <p>Use for tools or support equipment worth tracking, like welders, test meters, portable pumps, ladders, and tool carts.</p>
            </article>
          </div>
          <p class="guide-note"><strong>Quick rule:</strong> part = inventory. Component = machine sub-history. Shop item = standalone support asset.</p>
          <p class="guide-note"><strong>Roll former rule:</strong> station = position on the machine. Track it separately only if it needs its own maintenance history.</p>
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
