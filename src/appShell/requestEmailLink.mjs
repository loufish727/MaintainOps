const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const UNAVAILABLE = "This request is unavailable or your account does not have access to it.";

export function createRequestEmailLink(windowRef) {
  let target = null;
  let revision = 0;

  function clear() {
    revision += 1;
    target = null;
    const url = new URL(windowRef.location.href);
    if (!url.searchParams.has("request_id")) return;
    url.searchParams.delete("request_id");
    windowRef.history.replaceState(windowRef.history.state, "", url.href);
  }

  async function prepare({ client, userId, companies, readStoredLocation, isCurrent }) {
    const id = new URL(windowRef.location.href).searchParams.get("request_id");
    if (!id || !userId) return null;
    if (target?.userId === userId && target.id === id) return target;
    target = null;
    if (!UUID.test(id)) throw new Error("This request link is invalid.");
    const started = revision;
    const current = () => started === revision && isCurrent();
    // Resolve through the signed-in client. Email links confer no additional access.
    const response = await client.from("maintenance_requests")
      .select("id, company_id, location_id").eq("id", id).maybeSingle();
    if (!current()) return null;
    if (response.error) throw new Error("Could not open the request. Please try the email link again.");
    const row = response.data;
    const membership = companies.find(company => company.id === row?.company_id);
    if (!row || !membership) throw new Error(UNAVAILABLE);
    const usualLocation = readStoredLocation(membership.id, userId) || membership.default_location_id;
    if (row.location_id && row.location_id !== usualLocation && !["admin", "manager"].includes(membership.role)) {
      const profile = await client.from("profiles").select("mobile_tech")
        .eq("company_id", membership.id).eq("user_id", userId).maybeSingle();
      if (!current()) return null;
      if (profile.error || !profile.data?.mobile_tech) {
        throw new Error("This request is in another facility. Ask your manager for access to that facility.");
      }
    }
    target = { id: row.id, companyId: row.company_id, locationId: row.location_id || "", userId };
    return target;
  }

  function forCompany(userId, companyId) {
    return target?.userId === userId && target.companyId === companyId ? target : null;
  }

  function forWorkspace(userId, companyId, locationId) {
    const match = forCompany(userId, companyId);
    return match && (!match.locationId || match.locationId === locationId) ? match : null;
  }

  return { prepare, clear, forCompany, forWorkspace };
}

export async function fetchLinkedRequest(client, target, selects, isColumnSchemaError) {
  for (let i = 0; i < selects.length; i += 1) {
    let query = client.from("maintenance_requests").select(selects[i])
      .eq("company_id", target.companyId).eq("id", target.id);
    if (target.locationId) query = query.eq("location_id", target.locationId);
    const response = await query.maybeSingle();
    if (!response.error || !isColumnSchemaError(response.error, ["location_id", "locations", "assets"]) || i === selects.length - 1) {
      return { ...response, data: response.data ? [response.data] : [], count: response.data ? 1 : 0 };
    }
  }
}
