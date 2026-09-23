// On-demand relationship reads update their own text/list nodes, never an editable workspace.
export function createMaintenanceRelations({ documentRef: doc, getScope, getCompanyId, client, withOperationTimeout, openWorkOrder }) {
  let scope;
  const counts = new Map(), histories = new Map();
  function current() {
    const next = getScope();
    if (scope !== next) { scope = next; counts.clear(); histories.clear(); }
    return next;
  }
  function getProcedureCounts(id) { current(); return counts.get(id); }
  function updateCountNodes() {
    for (const node of doc.querySelectorAll('[data-procedure-links]')) {
      const value = getProcedureCounts(node.dataset.procedureLinks);
      node.textContent = value?.status === 'ready' ? `${value.work_order_count} linked work orders` : value?.status === 'error' ? 'Work links unavailable' : 'Loading work links...';
      const card = node.closest('.procedure-card');
      const schedules = card?.querySelector('[data-procedure-schedules]');
      if (schedules) schedules.textContent = value?.status === 'ready' ? `${value.schedule_count} PM schedules` : value?.status === 'error' ? 'PM links unavailable' : 'Loading PM links...';
      const button = card?.querySelector('[data-delete-procedure]');
      if (button) {
        const blocked = value?.status === 'ready' && (value.work_order_count > 0 || value.schedule_count > 0);
        button.disabled = value?.status !== 'ready' || blocked;
        button.textContent = blocked ? 'Kept For Traceability' : value?.status === 'ready' ? 'Delete Checklist' : 'Checking Links...';
      }
    }
  }
  async function loadCounts(ids) {
    const key = current(), companyId = getCompanyId();
    const missing = [...new Set(ids)].filter(id => !counts.has(id));
    if (!missing.length) return updateCountNodes();
    missing.forEach(id => counts.set(id, { status: 'loading' }));
    updateCountNodes();
    try {
      const { data, error } = await withOperationTimeout(client().rpc('get_procedure_link_counts', { p_company_id: companyId, p_template_ids: missing }), 'Procedure links timed out.', 12000);
      if (key !== current()) return;
      if (error) throw error;
      for (const id of missing) {
        const row = data?.find(row => row.procedure_template_id === id);
        if (!row || ![row.work_order_count, row.schedule_count].every(value =>
          (typeof value === 'number' || typeof value === 'string' && /^\d+$/.test(value)) && Number.isSafeInteger(Number(value)) && Number(value) >= 0)) {
          counts.set(id, { status: 'error' });
        } else counts.set(id, { ...row, status: 'ready' });
      }
    } catch {
      if (key === current()) missing.forEach(id => counts.set(id, { status: 'error' }));
    }
    if (key === current()) updateCountNodes();
  }
  function element(tag, text, className) {
    const node = doc.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  async function loadHistory(panel, page = 1) {
    const key = current(), companyId = getCompanyId(), id = panel.dataset.pmHistory;
    const content = panel.querySelector('[data-pm-history-content]');
    if (!content) return;
    const request = {};
    histories.set(id, request);
    const visible = () => key === current() && histories.get(id) === request && panel.isConnected;
    content.textContent = 'Loading work history...';
    try {
      const { data, count, error } = await withOperationTimeout(client().from('work_orders')
        .select('id,title,status,due_at,completed_at,preventive_due_at', { count: 'exact' })
        .eq('company_id', companyId).eq('preventive_source_id', id)
        .order('created_at', { ascending: false }).order('id').range((page - 1) * 12, page * 12 - 1), 'PM work history timed out.', 12000);
      if (!visible()) return;
      if (error) throw error;
      if (!Number.isInteger(count) || count < 0) throw Error('PM history count unavailable.');
      if (page > 1 && (page - 1) * 12 >= count) return loadHistory(panel, Math.max(1, Math.ceil(count / 12)));
      if (!Array.isArray(data) || data.length !== Math.min(12, count - (page - 1) * 12)
        || new Set(data.map(row => row.id)).size !== data.length || data.some(row => !row.id || typeof row.status !== 'string')) {
        throw Error('PM work history was incomplete. Try again.');
      }
      content.replaceChildren();
      for (const row of data || []) {
        const article = element('article', undefined, 'mini-work-order');
        article.dataset.miniWorkOrder = row.id;
        const button = element('button', row.title, 'text-button');
        button.type = 'button';
        button.addEventListener('click', async () => {
          button.disabled = true;
          try { await openWorkOrder(row.id); }
          catch { content.append(element('p', 'Could not open this work order. Try again.', 'error-text')); }
          finally { button.disabled = false; }
        });
        article.append(button, element('span', `${row.status.replaceAll('_', ' ')} - Due ${row.due_at || row.preventive_due_at || 'unset'}`));
        content.append(article);
      }
      if (!count) content.append(element('p', 'No linked generated work orders.', 'muted'));
      const pagination = element('div', undefined, 'list-pagination');
      pagination.append(element('span', count ? `Showing ${(page - 1) * 12 + 1}-${Math.min(page * 12, count)} of ${count}` : '0 work orders'));
      for (const [direction, label, next, disabled] of [['prev', 'Previous', page - 1, page === 1], ['next', 'Next', page + 1, page * 12 >= count]]) {
        const button = element('button', label, 'secondary-button');
        button.type = 'button'; button.dataset.pmHistoryPage = direction; button.disabled = disabled;
        button.addEventListener('click', () => loadHistory(panel, next)); pagination.append(button);
      }
      content.append(pagination);
    } catch (error) {
      if (!visible()) return;
      content.replaceChildren(element('p', error.message || 'PM work history unavailable.', 'error-text'));
      const retry = element('button', 'Retry', 'secondary-button'); retry.type = 'button';
      retry.addEventListener('click', () => loadHistory(panel, page)); content.append(retry);
    }
  }
  function bind() {
    current();
    void loadCounts([...doc.querySelectorAll('[data-procedure-links]')].map(node => node.dataset.procedureLinks));
    for (const panel of doc.querySelectorAll('[data-pm-history]')) {
      if (panel.dataset.pmBound) continue;
      panel.dataset.pmBound = 'true';
      panel.addEventListener('toggle', () => { if (panel.open) void loadHistory(panel); });
    }
  }
  return { bind, getProcedureCounts, loadCounts, loadHistory };
}
