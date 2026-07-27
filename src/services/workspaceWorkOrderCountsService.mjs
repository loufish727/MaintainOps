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

export async function fetchWorkspaceWorkOrderCounts(supabaseClient, parameters) {
  const response = await supabaseClient.rpc("get_workspace_work_order_counts", parameters);
  if (response.error) return response;
  return {
    ...response,
    data: normalizeWorkspaceWorkOrderCounts(response.data),
  };
}
