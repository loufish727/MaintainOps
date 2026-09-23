export async function loadCompleteWorkspaceRows(label, createQuery, validateRow = () => "") {
  const rows = [];
  const seenIds = new Set();
  let expectedCount;
  const incomplete = (reason) => ({
    data: [],
    error: { code: "INCOMPLETE_WORKSPACE_DATA", message: `${label} could not be fully loaded: ${reason} Refresh and try again.` },
  });
  try {
    while (true) {
      const response = await createQuery().range(rows.length, rows.length + 999);
      if (response.error) return { ...response, data: [] };
      if (!Number.isSafeInteger(response.count) || response.count < 0) return incomplete("the exact row count is unavailable.");
      if (!Array.isArray(response.data)) return incomplete("the server returned an invalid page.");
      if (expectedCount === undefined) expectedCount = response.count;
      if (response.count !== expectedCount) return incomplete("records changed while loading.");
      if (rows.length + response.data.length > expectedCount || response.data.length > 1000) return incomplete("the page does not match its row count.");
      if (!response.data.length && rows.length < expectedCount) return incomplete(`only ${rows.length} of ${expectedCount} records arrived.`);
      for (const row of response.data) {
        if (!row?.id || seenIds.has(row.id)) return incomplete("a page contained missing or repeated record IDs.");
        const rowError = validateRow(row);
        if (rowError) return incomplete(rowError);
        seenIds.add(row.id);
      }
      rows.push(...response.data);
      if (rows.length === expectedCount) return { ...response, data: rows };
      // Advance by rows received, since the server may cap pages below the requested size.
    }
  } catch (error) {
    return { data: [], error };
  }
}

export function validateProcedureSteps(template) {
  const count = template.procedure_step_count?.[0]?.count;
  const steps = template.procedure_steps;
  // Parent counts do not cover embedded rows. Fail closed at the relation cap rather than
  // treating an incomplete checklist as complete or fetching a huge second set at startup.
  if (!Number.isSafeInteger(count) || count < 0 || !Array.isArray(steps)) {
    return `the step count for procedure ${template.id} is unavailable.`;
  }
  if (steps.length !== count || new Set(steps.map((step) => step?.id)).size !== count || steps.some((step) => !step?.id)) {
    return `procedure ${template.id} returned ${steps.length} of ${count} steps; the embedded checklist may be capped.`;
  }
  return "";
}
