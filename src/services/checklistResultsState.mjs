export function createChecklistResultsState({ getScope, getCompanyId, client, applyResults }) {
  let scope;
  const errors = new Set();
  const requests = new Map();
  function current() {
    const next = getScope();
    if (scope !== next) { scope = next; errors.clear(); requests.clear(); }
    return next;
  }
  async function load(ids) {
    if (!ids.length) return;
    const key = current(), companyId = getCompanyId(), rows = [];
    const request = {}, seen = new Set();
    let total;
    ids.forEach(id => requests.set(id, request));
    const currentIds = () => ids.filter(id => requests.get(id) === request);
    try {
      while (true) {
        const { data, count, error } = await client().from('work_order_step_results')
          .select('*', { count: 'exact' }).eq('company_id', companyId).in('work_order_id', ids)
          .order('id').range(rows.length, rows.length + 999);
        if (key !== current()) return;
        if (error) throw error;
        if (!Number.isInteger(count) || count < 0) throw Error('Checklist result count unavailable.');
        if (total !== undefined && total !== count) throw Error('Checklist results changed while loading.');
        total = count;
        if (!Array.isArray(data) || rows.length + data.length > count) throw Error('Checklist result page invalid.');
        for (const row of data) {
          if (!row.id || seen.has(row.id) || !ids.includes(row.work_order_id)) throw Error('Checklist result page invalid.');
          seen.add(row.id);
        }
        rows.push(...(data || []));
        if (rows.length >= count) break;
        if (!data?.length) throw Error('Checklist results were incomplete.');
      }
      const active = currentIds();
      active.forEach(id => errors.delete(id));
      if (active.length) applyResults(active, rows.filter(row => active.includes(row.work_order_id)));
    } catch (error) {
      if (key === current()) currentIds().forEach(id => errors.add(id));
      throw error;
    }
  }
  return { load, hasError(id) { current(); return errors.has(id); } };
}
