(function () {
  function createRequestPhotoDisplayHelpers({
    escapeHtml,
    requestPhotoMetaText,
  }) {
    function renderMaintenanceRequestPhoto(request) {
      if (!request.photo_storage_path) return "";
      const fileName = request.photo_file_name || request.photo_original_file_name || "Request photo";
      const meta = requestPhotoMetaText(request);
      return `
        <div class="request-photo-preview">
          ${request.photoSignedUrl && request.photo_content_type?.startsWith("image/")
            ? `<img class="photo-thumb" data-request-photo-image="${escapeHtml(request.id)}" src="${escapeHtml(request.photoSignedUrl)}" alt="${escapeHtml(fileName)}">`
            : ""}
          <div>
            <strong>${escapeHtml(fileName)}</strong>
            <span>${escapeHtml(meta)}</span>
            <button class="text-button" type="button" data-open-request-photo="${escapeHtml(request.id)}">Open photo</button>
            <span data-request-photo-status role="status" hidden></span>
          </div>
        </div>
      `;
    }

    return {
      renderMaintenanceRequestPhoto,
    };
  }

  window.MaintainOpsRequestPhotoDisplay = {
    createRequestPhotoDisplayHelpers,
  };
})();
