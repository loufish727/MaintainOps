(function () {
  const boundDocuments = new WeakSet();

  function setEquipmentChoiceMode(group, mode, updateAssetLocationWarning) {
    if (!group) return;
    const existingField = group.querySelector("[data-equipment-choice-existing]");
    const newField = group.querySelector("[data-equipment-choice-new]");
    const useNew = mode === "new";

    group.querySelectorAll("[data-equipment-choice-mode]").forEach((control) => {
      const active = control.value === (useNew ? "new" : "existing");
      control.checked = active;
      control.closest("label")?.classList.toggle("active", active);
    });
    group.querySelectorAll("[data-equipment-choice-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.equipmentChoicePanel !== (useNew ? "new" : "existing");
    });

    if (existingField) {
      existingField.disabled = useNew;
      existingField.required = !useNew && existingField.dataset.equipmentChoiceRequired === "true";
      if (useNew) existingField.value = "";
      if (typeof updateAssetLocationWarning === "function") updateAssetLocationWarning(existingField);
    }
    if (newField) {
      newField.disabled = !useNew;
      newField.required = useNew && newField.dataset.equipmentChoiceRequired === "true";
      if (!useNew) newField.value = "";
    }
  }

  function initializeEquipmentChoices(doc, updateAssetLocationWarning) {
    doc.querySelectorAll("[data-equipment-choice]").forEach((group) => {
      const selectedMode = group.querySelector("[data-equipment-choice-mode]:checked")?.value || "existing";
      setEquipmentChoiceMode(group, selectedMode, updateAssetLocationWarning);
    });
  }

  function bindWorkspaceEquipmentChoiceEvents(options = {}) {
    const doc = options.documentRef || document;
    const updateAssetLocationWarning = options.updateAssetLocationWarning;

    initializeEquipmentChoices(doc, updateAssetLocationWarning);
    if (boundDocuments.has(doc)) return;
    boundDocuments.add(doc);

    doc.addEventListener("change", (event) => {
      const modeControl = event.target.closest?.("[data-equipment-choice-mode]");
      if (modeControl) {
        setEquipmentChoiceMode(modeControl.closest("[data-equipment-choice]"), modeControl.value, updateAssetLocationWarning);
        return;
      }

      const existingField = event.target.closest?.("[data-equipment-choice-existing]");
      if (existingField && typeof updateAssetLocationWarning === "function") {
        updateAssetLocationWarning(existingField);
      }
    });
  }

  window.MaintainOpsWorkspaceEquipmentChoiceEvents = {
    bindWorkspaceEquipmentChoiceEvents,
    initializeEquipmentChoices,
    setEquipmentChoiceMode,
  };

  if (typeof module !== "undefined") {
    module.exports = {
      bindWorkspaceEquipmentChoiceEvents,
      initializeEquipmentChoices,
      setEquipmentChoiceMode,
    };
  }
})();
