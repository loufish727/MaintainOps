(function () {
  function bindQrHistory(root, deps) {
    if (!root || root.dataset.qrHistoryBound || !deps.canRead()) return;
    root.dataset.qrHistoryBound = "true";
    const doc = root.ownerDocument;
    const company = deps.getCompanyId(), scope = deps.getScope();
    const current = () => root.isConnected && deps.canRead() && company === deps.getCompanyId() && scope === deps.getScope();
    const summaries = [...root.querySelectorAll("[data-qr-last-replaced]")];
    const refreshedLinks = new Set();
    const empty = "No replacements recorded. Earlier changes are not tracked.";
    const validRow = (row) => row && typeof row.actor_name === "string" && row.actor_name.length > 0 && Number.isFinite(Date.parse(row.replaced_at));
    const time = (value) => new Date(value).toLocaleString();
    const setSummary = (linkId, row) => {
      const node = summaries.find((item) => item.dataset.qrLastReplaced === linkId);
      if (node) node.textContent = row ? `Last replaced by ${row.actor_name} on ${time(row.replaced_at)}` : empty;
    };
    const element = (tag, text, className) => {
      const node = doc.createElement(tag);
      if (text) node.textContent = text;
      if (className) node.className = className;
      return node;
    };
    const button = (label, click) => {
      const node = element("button", label, "secondary-button request-action-button");
      node.type = "button";
      node.addEventListener("click", click);
      return node;
    };
    let activeDialog = null;

    async function loadSummaries() {
      try {
        const { data, error } = await deps.withTimeout(deps.client().rpc("get_qr_replacement_summaries", { target_company_id: company }), "QR history timed out.", 15000);
        if (!current()) return;
        if (error || !Array.isArray(data) || data.some((row) => !validRow(row))) throw new Error("History unavailable");
        for (const node of summaries) if (!refreshedLinks.has(node.dataset.qrLastReplaced)) setSummary(node.dataset.qrLastReplaced, data.find((row) => row.link_id === node.dataset.qrLastReplaced));
      } catch {
        if (current()) for (const node of summaries) if (!refreshedLinks.has(node.dataset.qrLastReplaced)) node.textContent = "Replacement history unavailable. Open history to retry.";
      }
    }

    function openHistory(trigger) {
      if (!current() || activeDialog) return;
      const linkId = trigger.dataset.qrHistory;
      const dialog = element("dialog", "", "production-action-dialog qr-history-dialog");
      dialog.setAttribute("aria-labelledby", "qr-history-title");
      const shell = element("div", "", "production-action-dialog-shell");
      const heading = element("div", "", "production-action-dialog-header");
      const title = element("h3", "QR Replacement History");
      title.id = "qr-history-title";
      const body = element("div", "", "production-action-dialog-body");
      const facility = element("p", trigger.dataset.locationName);
      const status = element("p");
      status.setAttribute("role", "status");
      const rows = element("div");
      const paging = element("div", "", "button-row");
      const earlier = element("p", "Records begin when tracking was enabled. Older replacements cannot be attributed.", "muted");
      let closed = false, sequence = 0;
      const close = () => {
        if (closed) return;
        closed = true;
        observer.disconnect();
        if (dialog.open) dialog.close();
        dialog.remove();
        activeDialog = null;
        if (current() && trigger.isConnected) trigger.focus({ preventScroll: true });
      };
      const observer = new MutationObserver(() => { if (!current()) close(); });
      const closeButton = button("Close", close);
      heading.append(title, closeButton);
      body.append(facility, status, rows, paging, earlier);
      shell.append(heading, body);
      dialog.append(shell);
      dialog.addEventListener("cancel", (event) => { event.preventDefault(); close(); });
      dialog.addEventListener("close", close);

      async function loadPage(page = 0) {
        if (!current()) { close(); return; }
        const request = ++sequence;
        status.textContent = "Loading replacement history...";
        rows.replaceChildren();
        paging.replaceChildren();
        try {
          const { data, count, error } = await deps.withTimeout(deps.client().from("qr_replacement_history")
            .select("id,link_id,company_id,actor_name,facility_name,replaced_at", { count: "exact" })
            .eq("company_id", company).eq("link_id", linkId)
            .order("replaced_at", { ascending: false }).order("id", { ascending: false })
            .range(page * 12, page * 12 + 11), "QR history timed out.", 15000);
          if (!current()) { close(); return; }
          if (closed || request !== sequence) return;
          if (error || !Array.isArray(data) || !Number.isSafeInteger(count) || count < 0
            || data.some((row) => !validRow(row) || row.company_id !== company || row.link_id !== linkId || typeof row.facility_name !== "string")) throw new Error("History unavailable");
          const lastPage = Math.max(0, Math.ceil(count / 12) - 1);
          if (page > lastPage) return loadPage(lastPage);
          if (data.length !== Math.min(12, Math.max(0, count - page * 12))) throw new Error("History incomplete");
          status.textContent = count ? `Page ${page + 1} of ${lastPage + 1} - ${count} replacements` : empty;
          if (page === 0) { refreshedLinks.add(linkId); setSummary(linkId, data[0]); }
          for (const row of data) {
            const item = element("div", "", "qr-history-row");
            item.append(element("strong", row.actor_name), element("p", `Replaced QR code - ${row.facility_name}`), element("p", time(row.replaced_at)));
            rows.append(item);
          }
          if (lastPage > 0) {
            const prev = button("Previous", () => loadPage(page - 1));
            const next = button("Next", () => loadPage(page + 1));
            prev.disabled = page === 0;
            next.disabled = page === lastPage;
            paging.append(prev, next);
          }
        } catch {
          if (!current()) { close(); return; }
          if (closed || request !== sequence) return;
          status.textContent = "Replacement history unavailable. Please retry.";
          paging.replaceChildren(button("Retry", () => loadPage(page)));
        }
      }
      try {
        doc.body.append(dialog);
        dialog.showModal();
        closeButton.focus({ preventScroll: true });
        activeDialog = dialog;
        observer.observe(doc.body, { childList: true, subtree: true });
        void loadPage();
      } catch {
        close();
        deps.showNotice("Could not open replacement history. Please retry.", "warning");
      }
    }
    root.querySelectorAll("[data-qr-history]").forEach((trigger) => trigger.addEventListener("click", () => openHistory(trigger)));
    if (summaries.length) void loadSummaries();
  }
  window.MaintainOpsQrHistory = { bindQrHistory };
})();
