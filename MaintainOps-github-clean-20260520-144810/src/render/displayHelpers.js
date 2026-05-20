(function () {
  function renderMetric(label, value, tone = "neutral") {
    return `<article class="metric dashboard-card tone-${tone}"><span>${label}</span><strong>${value}</strong></article>`;
  }

  function renderInsight(label, value, description, tone = "neutral") {
    return `
    <article class="insight dashboard-card tone-${tone}">
      <span>${label}</span>
      <strong>${value}</strong>
      <p>${description}</p>
    </article>
  `;
  }

  function renderRoleGuide() {
    const roles = window.MaintainOpsConstants?.COMPANY_ROLES || ["technician", "manager", "admin"];
    const roleLabel = window.MaintainOpsFormatting?.roleLabel || ((role) => String(role || ""));
    const roleDescription = window.MaintainOpsFormatting?.roleDescription || (() => "");
    const escapeHtml = window.MaintainOpsDom?.escapeHtml || ((value) => String(value ?? ""));

    return `
    <section class="team-role-guide">
      ${roles.map((role) => `
        <article>
          <strong>${roleLabel(role)}</strong>
          <span>${escapeHtml(roleDescription(role))}</span>
        </article>
      `).join("")}
    </section>
  `;
  }

  window.MaintainOpsRenderDisplayHelpers = Object.freeze({
    renderMetric,
    renderInsight,
    renderRoleGuide,
  });
})();
