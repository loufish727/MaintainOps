(() => {
  // src/render/requestPhotoDisplay.js
  (function() {
    function createRequestPhotoDisplayHelpers({
      escapeHtml,
      requestPhotoMetaText,
      getRequestPhotosReady
    }) {
      function renderMaintenanceRequestPhoto(request) {
        if (!request.photo_storage_path) return "";
        const fileName = request.photo_file_name || request.photo_original_file_name || "Request photo";
        const meta = requestPhotoMetaText(request);
        return `
        <div class="request-photo-preview">
          ${request.photoSignedUrl && request.photo_content_type?.startsWith("image/") ? `<img class="photo-thumb" src="${escapeHtml(request.photoSignedUrl)}" alt="${escapeHtml(fileName)}">` : ""}
          <div>
            <strong>${escapeHtml(fileName)}</strong>
            <span>${escapeHtml(meta)}</span>
            ${request.photoSignedUrl ? `<a href="${escapeHtml(request.photoSignedUrl)}" target="_blank" rel="noreferrer">Open photo</a>` : `<span>${getRequestPhotosReady() ? "Photo attached" : "Photo attached - run request photo SQL if links do not open"}</span>`}
          </div>
        </div>
      `;
      }
      return {
        renderMaintenanceRequestPhoto
      };
    }
    window.MaintainOpsRequestPhotoDisplay = {
      createRequestPhotoDisplayHelpers
    };
  })();

  // src/render/messageBadgeDisplay.js
  (function() {
    function createMessageBadgeDisplayHelpers({
      directUnreadMessages,
      totalUnreadMessages
    }) {
      function renderMessageNavBadge() {
        const directUnread = directUnreadMessages();
        if (directUnread > 0) return `<b class="nav-badge nav-alert-badge">${directUnread}!</b>`;
        const unread = totalUnreadMessages();
        return unread > 0 ? `<b class="nav-badge">${unread}</b>` : "";
      }
      return {
        renderMessageNavBadge
      };
    }
    window.MaintainOpsMessageBadgeDisplay = {
      createMessageBadgeDisplayHelpers
    };
  })();

  // src/render/navBadgeDisplay.js
  (function() {
    function createNavBadgeDisplayHelpers() {
      function normalizedCount(count) {
        const value = Number(count);
        if (!Number.isFinite(value) || value <= 0) return 0;
        return Math.floor(value);
      }
      function navBadgeText(count) {
        const value = normalizedCount(count);
        if (!value) return "";
        return value > 99 ? "99+" : String(value);
      }
      function renderNavCountBadge(count, options = {}) {
        const text = navBadgeText(count);
        if (!text) return "";
        const alertClass = options.alert ? " nav-alert-badge" : "";
        const suffix = options.alertSuffix ? "!" : "";
        return `<b class="nav-badge${alertClass}">${text}${suffix}</b>`;
      }
      return {
        navBadgeText,
        renderNavCountBadge
      };
    }
    window.MaintainOpsNavBadgeDisplay = {
      createNavBadgeDisplayHelpers
    };
  })();

  // src/render/partSourceDisplay.js
  (function() {
    function createPartSourceDisplayHelpers({
      escapeHtml,
      getPartSources,
      getPartSuppliersReady
    }) {
      function renderPartSourceOptions() {
        const options = getPartSources();
        return `
        <datalist id="part-source-options">
          ${options.map((source) => `<option value="${escapeHtml(source)}"></option>`).join("")}
        </datalist>
      `;
      }
      function renderPartSourceManager() {
        const sources = getPartSources();
        return `
        <section class="part-source-manager relationship-detail parts">
          <div class="panel-header compact">
            <h3>Edit Sources</h3>
            <button class="text-button" data-toggle-part-sources type="button">Close</button>
          </div>
          ${getPartSuppliersReady() ? `
            <p class="muted">Rename a source to correct spelling or merge duplicates across every part using that exact name.</p>
            <div class="part-source-list">
              ${sources.map((source) => `
                <form class="part-source-row" data-rename-part-source>
                  <input name="old_source" type="hidden" value="${escapeHtml(source)}">
                  <span>${escapeHtml(source)}</span>
                  <input name="new_source" list="part-source-options" value="${escapeHtml(source)}" aria-label="New source name for ${escapeHtml(source)}">
                  <button class="secondary-button" type="submit">Rename</button>
                </form>
              `).join("") || `<p class="muted">No sources have been added yet.</p>`}
            </div>
            <p class="error-text" id="part-source-error"></p>
          ` : `<p class="error-text">Run supabase/step-next-part-suppliers.sql before editing sources.</p>`}
        </section>
      `;
      }
      return {
        renderPartSourceOptions,
        renderPartSourceManager
      };
    }
    window.MaintainOpsPartSourceDisplay = {
      createPartSourceDisplayHelpers
    };
  })();
})();
