(function () {
  function assetTypeLabel(type) {
    const labels = {
      machine: "Primary",
      traveling_machine: "Traveling Primary",
      forklift: "Forklift / Mobile Lift",
      secondary_machine: "Sub Equipment",
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
    if (status === "offline") return "Offline / Down";
    return String(status || "running")
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  window.MaintainOpsEquipmentLabels = Object.freeze({
    assetTypeLabel,
    assetStatusLabel,
  });
})();
