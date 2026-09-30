(function () {
  const groups = [
    { id: "work", label: "Work", sections: ["mywork", "work", "planning"] },
    { id: "requests" },
    { id: "assets", label: "Equipment", sections: ["assets", "pm", "procedures", "financial"] },
    { id: "parts" },
    { id: "team", label: "Team", sections: ["team", "messages", "conversions", "manager"] },
    { id: "settings", label: "Settings", sections: ["settings", "setup", "performance"] },
  ];

  // Presentation only: the caller supplies the already-authorized destinations.
  // Menu disclosure never renders the workspace, fetches data, or changes a form.
  function createWorkspaceNavigation() {
    let openGroup = null;
    let previousSection;
    let previousScope;
    function render({ items, activeSection, scope, escapeHtml, navIcon, renderBadge }) {
      const visible = new Map(items);
      if (previousScope !== scope || previousSection !== activeSection) {
        openGroup = null;
      }
      previousScope = scope;
      previousSection = activeSection;
      const emblem = id => `<span class="nav-emblem" aria-hidden="true">${navIcon(id)}</span>`;
      const button = (id, topLevel = false) => `<button class="nav-${escapeHtml(id)} ${id === activeSection ? "active" : ""}" data-section="${escapeHtml(id)}" type="button" ${id === activeSection ? 'aria-current="page"' : ""}>${topLevel ? emblem(id) : navIcon(id)}<span class="nav-label">${escapeHtml(visible.get(id))}</span>${renderBadge(id)}</button>`;
      const rendered = new Set();
      const markup = groups.map(group => {
        if (!group.sections) {
          if (!visible.has(group.id)) return "";
          rendered.add(group.id);
          return button(group.id, true);
        }
        const children = group.sections.filter(id => visible.has(id));
        if (!children.length) return "";
        children.forEach(id => rendered.add(id));
        const open = openGroup === group.id;
        return `<details class="nav-group" data-nav-group="${group.id}" ${open ? "open" : ""}>
          <summary class="nav-${group.id} ${children.includes(activeSection) ? "contains-current" : ""}" aria-controls="nav-children-${group.id}" aria-expanded="${open}" ${group.id === "team" && visible.has("messages") ? "data-nav-messages" : ""}>
            ${emblem(group.id)}<span class="nav-group-label">${group.label}</span><span class="nav-disclosure" aria-hidden="true"></span>${group.id === "team" && visible.has("messages") ? renderBadge("messages") : ""}
          </summary>
          <div class="nav-children" id="nav-children-${group.id}">${children.map(id => button(id)).join("")}</div>
        </details>`;
      }).join("");
      // Future destinations stay reachable until deliberately assigned to a group.
      return markup + items.filter(([id]) => !rendered.has(id)).map(([id]) => button(id, true)).join("");
    }

    function bind(doc = document) {
      const disclosures = [...doc.querySelectorAll("[data-nav-group]")];
      const selectGroup = id => {
        openGroup = id;
        disclosures.forEach(group => {
          group.open = group.dataset.navGroup === id;
          group.querySelector("summary").setAttribute("aria-expanded", String(group.open));
        });
      };
      disclosures.forEach(group => {
        // Native toggle events are queued. Switch atomically before another tap or
        // a workspace redraw can observe two open groups and choose the wrong one.
        group.querySelector("summary").addEventListener("click", event => {
          event.preventDefault();
          selectGroup(group.open ? null : group.dataset.navGroup);
        });
        group.addEventListener("toggle", () => {
          if (!group.isConnected) return;
          selectGroup(group.open ? group.dataset.navGroup : disclosures.find(item => item.open)?.dataset.navGroup || null);
        });
      });
    }
    return { render, bind };
  }
  window.MaintainOpsWorkspaceNavigation = createWorkspaceNavigation();
  window.MaintainOpsWorkspaceNavigationDisplay = { createWorkspaceNavigation };
})();
