(function () {
  function segmentIcon(type) {
    const icons = {
      active: `<path d="M4 12h5l2-6 4 12 2-6h3"></path>`,
      all: `<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>`,
      mine: `<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>`,
      created: `<path d="M5 4h10l4 4v12H5z"></path><path d="M15 4v5h5"></path><path d="M8 14h8"></path><path d="M8 17h5"></path>`,
      vendor: `<path d="M3 16h2l3-7h8l3 7h2"></path><path d="M7 16h10"></path><path d="M8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>`,
      unassigned: `<path d="M12 5v14"></path><path d="M5 12h14"></path>`,
      open: `<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>`,
      in_progress: `<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>`,
      blocked: `<path d="M5 5l14 14"></path><circle cx="12" cy="12" r="8"></circle>`,
      completed: `<path d="M4 12l5 5L20 6"></path>`,
      overdue: `<path d="M12 8v5"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="9"></circle>`,
      newest: `<path d="M12 5v7l4 2"></path><circle cx="12" cy="12" r="8"></circle>`,
      due: `<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>`,
      priority: `<path d="M12 3l8 18H4z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>`,
    };
    return `<svg class="segment-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[type] || icons.all}</svg>`;
  }

  function navIcon(type) {
    const icons = {
      mywork: `<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>`,
      work: `<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>`,
      planning: `<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>`,
      requests: `<path d="M5 5h14v10H8l-3 3V5z"></path>`,
      assets: `<path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path>`,
      financial: `<path d="M4 19h16"></path><path d="M6 19V8"></path><path d="M12 19V5"></path><path d="M18 19v-9"></path><path d="M8 11h8"></path><path d="M10 8h4"></path>`,
      pm: `<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>`,
      procedures: `<path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path>`,
      parts: `<path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path>`,
      conversions: `<path d="M7 7h10"></path><path d="M14 4l3 3-3 3"></path><path d="M17 17H7"></path><path d="M10 14l-3 3 3 3"></path><path d="M5 12h14"></path>`,
      messages: `<path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path>`,
      team: `<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M3 21a5 5 0 0 1 10 0"></path><path d="M11 21a5 5 0 0 1 10 0"></path>`,
      manager: `<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15v-4"></path><path d="M12 15V8"></path><path d="M16 15v-6"></path><path d="M19 6l-4 4-3-2-4 4"></path>`,
      setup: `<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a8 8 0 0 0 .1-2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L4.5 13a8 8 0 0 0 .1 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.3 2.6h4l.3-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5z"></path>`,
      settings: `<path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M8 7v10"></path><path d="M16 7v10"></path>`,
    };
    return `<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[type] || icons.work}</svg>`;
  }

  window.MaintainOpsIconDisplay = Object.freeze({
    segmentIcon,
    navIcon,
  });
})();
