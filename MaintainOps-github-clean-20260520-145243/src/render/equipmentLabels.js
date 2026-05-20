(function () {
  function assetTypeLabel(type) {
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
