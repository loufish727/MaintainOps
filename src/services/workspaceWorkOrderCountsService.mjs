const COUNT_KEYS = Object.freeze([
  "activeWork",
  "newWork",
  "inProgress",
  "blocked",
  "overdue",
  "completedAll",
  "completedMonth",
  "completedWeek",
]);

const COUNT_KEY_BY_STATUS = Object.freeze({
  active: "activeWork",
  all: "activeWork",
  open: "newWork",
  in_progress: "inProgress",
  blocked: "blocked",
  overdue: "overdue",
  completed: "completedAll",
  completed_month: "completedMonth",
  completed_week: "completedWeek",
});

function normalizeCountGroup(value) {
  return Object.fromEntries(COUNT_KEYS.map((key) => [key, Math.max(0, Number(value?.[key]) || 0)]));
}

export function normalizeWorkspaceWorkOrderCounts(value) {
  if (!value || typeof value !== "object") return null;
  return {
    workOrders: normalizeCountGroup(value.workOrders),
    myWork: normalizeCountGroup(value.myWork),
  };
}

export function reconcileCountGroupForStatus(counts, statusFilter, exactTotal) {
  const countKey = COUNT_KEY_BY_STATUS[statusFilter];
  const numericTotal = Number(exactTotal);
  if (!counts || !countKey || !Number.isFinite(numericTotal)) return counts;
  return {
    ...counts,
    [countKey]: Math.max(0, Math.trunc(numericTotal)),
  };
}

export async function fetchWorkspaceWorkOrderCounts(supabaseClient, parameters) {
  const response = await supabaseClient.rpc("get_workspace_work_order_counts", parameters);
  if (response.error) return response;
  return {
    ...response,
    data: normalizeWorkspaceWorkOrderCounts(response.data),
  };
}
