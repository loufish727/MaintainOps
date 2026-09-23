export function createAssetWorkHistoryState({ getContext, fetchCounts, fetchHistory, onChange = () => {} }) {
  let scope = "";
  const records = new Map();

  function context() {
    const current = getContext();
    if (current.key !== scope) {
      records.clear();
      scope = current.key;
    }
    return current;
  }

  function recordFor(assetId) {
    context();
    if (!records.has(assetId)) records.set(assetId, { counts: { status: "idle" }, history: { status: "idle" } });
    return records.get(assetId);
  }

  function get(assetId) {
    const record = recordFor(assetId);
    return {
      countsStatus: record.counts.status,
      counts: record.counts.data,
      historyStatus: record.history.status,
      rows: record.history.data || [],
    };
  }

  function load(assetId, kind, fetchRows, retry) {
    const current = context();
    if (!assetId || !current.companyId) return Promise.resolve(null);
    const record = recordFor(assetId);
    const previous = record[kind];
    if (previous.promise) return previous.promise;
    if (previous.status === "ready" || (previous.status === "error" && !retry)) return Promise.resolve(previous);
    const slot = record[kind] = { status: "loading" };
    const isCurrent = () => context().key === current.key && records.get(assetId) === record && record[kind] === slot;
    slot.promise = Promise.resolve().then(() => fetchRows(current, assetId)).then((response) => {
      if (!isCurrent()) return null;
      if (response.error) throw response.error;
      slot.status = "ready";
      slot.data = response.data;
      if (kind === "history") {
        // A complete asset history supersedes any older count request still in flight.
        record.counts = { status: "ready", data: {
          open: slot.data.filter((row) => row.status !== "completed").length,
          completed: slot.data.filter((row) => row.status === "completed").length,
        } };
      }
      return slot;
    }).catch((error) => {
      if (!isCurrent()) return null;
      slot.status = "error";
      slot.error = error;
      return slot;
    }).finally(() => {
      slot.promise = null;
      if (isCurrent()) onChange(assetId, get(assetId));
    });
    onChange(assetId, get(assetId));
    return slot.promise;
  }

  return {
    get,
    invalidate(assetId) { context(); records.delete(assetId); },
    ensureCounts: (assetId) => load(assetId, "counts", fetchCounts, false),
    loadHistory: (assetId) => load(assetId, "history", fetchHistory, true),
  };
}
