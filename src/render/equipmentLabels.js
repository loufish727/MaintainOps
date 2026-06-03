(function () {
  function assetTypeLabel(type) {
    const labels = {
      machine: "Machine / Line",
      secondary_machine: "Sub-assembly",
      tooling: "Tooling / Setup",
      component: "Component",
      shop_item: "Shop Item",
    };
    if (labels[type]) return labels[type];
    return String(type || "machine")
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function assetStatusLabel(status) {
    return String(status || "running")
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  window.MaintainOpsEquipmentLabels = Object.freeze({
    assetTypeLabel,
    assetStatusLabel,
  });
})();
