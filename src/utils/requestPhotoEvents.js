(function () {
  // Re-sign only on user intent or a failed thumbnail, without redrawing the workspace.
  function createRequestPhotoEvents(deps = {}) {
    const doc = deps.documentRef || document;
    const win = deps.windowRef || window;
    const bound = new WeakSet();
    const pending = new Map();
    const current = (row, path, scope, node) => Boolean(scope && scope === deps.getScope()
      && deps.getRequest(row.id) === row && row.photo_storage_path === path && node.isConnected);

    function status(node, message = "") {
      const output = node.closest(".request-photo-preview")?.querySelector("[data-request-photo-status]");
      if (output) { output.textContent = message; output.hidden = !message; }
    }

    function sign(row, path, scope) {
      const key = JSON.stringify([scope, row.id, path]);
      if (pending.has(key)) return pending.get(key);
      const promise = deps.withOperationTimeout(
        deps.client().storage.from("maintenance-request-photos").createSignedUrl(path, 600),
        "Photo link timed out.", 10000
      ).then(({ data, error }) => {
        if (error || !data?.signedUrl) throw new Error("Photo link unavailable.");
        if (new URL(data.signedUrl).protocol !== "https:") throw new Error("Invalid photo link.");
        return data.signedUrl;
      }).finally(() => pending.delete(key));
      pending.set(key, promise);
      return promise;
    }

    function update(row, url, node) {
      row.photoSignedUrl = url;
      const image = node.closest(".request-photo-preview")?.querySelector("[data-request-photo-image]");
      if (image && image.src !== url) image.src = url;
      status(node);
    }

    async function open(button) {
      const row = deps.getRequest(button.dataset.openRequestPhoto);
      const path = row?.photo_storage_path;
      const scope = deps.getScope();
      if (!row || !path || !current(row, path, scope, button) || button.disabled) return;
      let viewer;
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      try {
        // Reserve a tab during the tap so Safari does not block an async window.open.
        viewer = win.open("about:blank", "_blank");
        if (!viewer) { status(button, "Allow pop-ups for this app, then try Open photo again."); return; }
        viewer.opener = null;
        viewer.document.title = "Request photo";
        viewer.document.body.textContent = "Opening photo...";
        status(button, "Opening photo...");
        const url = await sign(row, path, scope);
        if (!current(row, path, scope, button)) { viewer.close(); return; }
        update(row, url, button);
        if (!viewer.closed) viewer.location.replace(url);
      } catch {
        if (viewer && !viewer.closed) viewer.close();
        if (current(row, path, scope, button)) status(button, "Could not open photo. Try Open photo again.");
      } finally {
        button.disabled = false;
        button.removeAttribute("aria-busy");
      }
    }

    function bind() {
      doc.querySelectorAll("[data-open-request-photo]").forEach(button => {
        if (bound.has(button)) return;
        bound.add(button);
        button.addEventListener("click", () => { void open(button); });
      });
      doc.querySelectorAll("[data-request-photo-image]").forEach(image => {
        if (bound.has(image)) return;
        bound.add(image);
        let attempted = false;
        let recovering = false;
        const recover = async () => {
          if (recovering) return;
          if (attempted) { status(image, "Preview unavailable. Use Open photo to retry."); return; }
          attempted = true;
          const row = deps.getRequest(image.dataset.requestPhotoImage);
          const path = row?.photo_storage_path;
          const scope = deps.getScope();
          if (!row || !path || !current(row, path, scope, image)) return;
          recovering = true;
          try {
            const url = await sign(row, path, scope);
            if (current(row, path, scope, image)) update(row, url, image);
          } catch {
            if (current(row, path, scope, image)) status(image, "Preview unavailable. Use Open photo to retry.");
          } finally { recovering = false; }
        };
        image.addEventListener("error", () => { void recover(); });
        if (image.complete && !image.naturalWidth) void recover();
      });
    }

    return { bind };
  }
  window.MaintainOpsRequestPhotoEvents = { createRequestPhotoEvents };
})();
