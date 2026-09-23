(function () {
  function normalizeChecklistResponseValue(step, value) {
    if (step?.response_type === "checkbox") return value === true || value === "checked" ? "checked" : "";
    return String(value ?? "").trim();
  }
  function isChecklistStepAnswered(step, value) {
    const normalized = normalizeChecklistResponseValue(step, value);
    if (!normalized) return false;
    if (step?.response_type === "checkbox") return normalized === "checked";
    if (step?.response_type === "pass_fail") return normalized === "pass" || normalized === "fail";
    if (step?.response_type === "number") return Number.isFinite(Number(normalized));
    return true;
  }
  const helpers = { normalizeChecklistResponseValue, isChecklistStepAnswered };
  if (typeof window !== "undefined") window.MaintainOpsChecklistResponseValues = helpers;
  if (typeof module !== "undefined") module.exports = helpers;
})();
