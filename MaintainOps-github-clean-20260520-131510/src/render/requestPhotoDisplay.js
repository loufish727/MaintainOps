(function () {
  function createRequestPhotoDisplayHelpers({
    escapeHtml,
    requestPhotoMetaText,
    getRequestPhotosReady,
  }) {
    function renderMaintenanceRequestPhoto(request) {
      if (!request.photo_storage_path) return "";
      const fileName = request.photo_file_name || request.photo_original_file_name || "Request photo";
      const meta = requestPhotoMetaText(request);
      return `
        <div class="request-photo-preview">
          ${request.photoSignedUrl && request.photo_content_type?.startsWith("image/")
            ? `<img class="photo-thumb" src="${escapeHtml(request.photoSignedUrl)}" alt="${escapeHtml(fileName)}">`
            : ""}
          <div>
            <strong>${escapeHtml(fileName)}</strong>
            <span>${escapeHtml(meta)}</span>
            ${request.photoSignedUrl ? `<a href="${escapeHtml(request.photoSignedUrl)}" target="_blank" rel="noreferrer">Open photo</a>` : `<span>${getRequestPhotosReady() ? "Photo attached" : "Photo attached - run request photo SQL if links do not open"}</span>`}
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
