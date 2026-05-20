(function () {
  function createWorkOrderDescriptionDisplayHelpers(deps) {
    function cleanWorkOrderDescription(description) {
      return String(description || "")
        .replace(deps.OUTSIDE_VENDOR_NOTE, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
    }

    function descriptionWithAssignmentNote(description, assignmentValue) {
      const cleanDescription = cleanWorkOrderDescription(description);
      if (assignmentValue !== deps.OUTSIDE_VENDOR_VALUE) return cleanDescription || null;
      return [cleanDescription, deps.OUTSIDE_VENDOR_NOTE].filter(Boolean).join("\n\n");
    }

    function descriptionWithRequestPhotoNote(description, request) {
      const cleanDescription = String(description || "").trim();
      if (!request?.photo_storage_path) return cleanDescription || null;
      const note = "[Request photo attached to original request]";
      return cleanDescription ? `${cleanDescription}\n\n${note}` : note;
    }

    return {
      cleanWorkOrderDescription,
      descriptionWithAssignmentNote,
      descriptionWithRequestPhotoNote,
    };
  }

  window.MaintainOpsWorkOrderDescriptionDisplay = {
    createWorkOrderDescriptionDisplayHelpers,
  };
})();
