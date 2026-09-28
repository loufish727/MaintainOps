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
      const activeGroup = groups.find(group => group.sections?.includes(activeSection));
      if (previousScope !== scope || previousSection !== activeSection) {
        openGroup = activeGroup?.id || null;
      }
      previousScope = scope;
      previousSection = activeSection;
      const button = id => `<button class="nav-${escapeHtml(id)} ${id === activeSection ? "active" : ""}" data-section="${escapeHtml(id)}" type="button" ${id === activeSection ? 'aria-current="page"' : ""}>${navIcon(id)}<span>${escapeHtml(visible.get(id))}</span>${renderBadge(id)}</button>`;
      const rendered = new Set();
      const markup = groups.map(group => {
        if (!group.sections) {
          if (!visible.has(group.id)) return "";
          rendered.add(group.id);
          return button(group.id);
        }
        const children = group.sections.filter(id => visible.has(id));
        if (!children.length) return "";
        children.forEach(id => rendered.add(id));
        const open = openGroup === group.id;
        return `<details class="nav-group" data-nav-group="${group.id}" ${open ? "open" : ""}>
          <summary class="nav-${group.id} ${children.includes(activeSection) ? "contains-current" : ""}" aria-controls="nav-children-${group.id}" aria-expanded="${open}" ${group.id === "team" && visible.has("messages") ? "data-nav-messages" : ""}>
            ${navIcon(group.id)}<span class="nav-group-label">${group.label}</span><span class="nav-disclosure" aria-hidden="true"></span>${group.id === "team" && visible.has("messages") ? renderBadge("messages") : ""}
          </summary>
          <div class="nav-children" id="nav-children-${group.id}">${children.map(button).join("")}</div>
        </details>`;
      }).join("");
      // Future destinations stay reachable until deliberately assigned to a group.
      return markup + items.filter(([id]) => !rendered.has(id)).map(([id]) => button(id)).join("");
    }

    function bind(doc = document) {
      const disclosures = [...doc.querySelectorAll("[data-nav-group]")];
      disclosures.forEach(group => {
        group.addEventListener("toggle", () => {
          if (!group.isConnected) return;
          group.querySelector("summary").setAttribute("aria-expanded", String(group.open));
          if (group.open) {
            openGroup = group.dataset.navGroup;
            disclosures.forEach(other => {
              if (other !== group && other.open) other.open = false;
            });
          } else if (openGroup === group.dataset.navGroup) {
            openGroup = null;
          }
        });
      });
    }
    return { render, bind };
  }
  window.MaintainOpsWorkspaceNavigation = createWorkspaceNavigation();
  window.MaintainOpsWorkspaceNavigationDisplay = { createWorkspaceNavigation };
})();
