const SNAPSHOT_PAGE_SIZE = 500;
export const MESSAGE_HISTORY_PAGE_SIZE = 50;
const HISTORY_SELECT = "id,company_id,thread_id,sender_id,body,created_at,deleted_at,reply_to_id,parent_message_id,reply:message_reply(id, sender_id, body, deleted_at), message_reactions(*),message_files(id,file_name,content_type,byte_size,object_path)";

async function readPages(query) {
  const rows = [];
  for (let offset = 0; ; offset += SNAPSHOT_PAGE_SIZE) {
    const { data, error } = await query().range(offset, offset + SNAPSHOT_PAGE_SIZE - 1);
    if (error) throw error;
    rows.push(...(data || []));
    if (!data || data.length < SNAPSHOT_PAGE_SIZE) return rows;
  }
}

export async function fetchMessageCenter(client, companyId, userId) {
  const threads = await readPages(() => client.from("message_threads")
    .select("*, messages(id, body, sender_id, created_at), message_thread_members(*), message_reads(*)")
    .eq("company_id", companyId).is("messages.deleted_at", null)
    .eq("message_reads.user_id", userId)
    .order("created_at", { referencedTable: "messages", ascending: false })
    .order("id", { referencedTable: "messages", ascending: false })
    .limit(1, { referencedTable: "messages" })
    .limit(SNAPSHOT_PAGE_SIZE, { referencedTable: "message_thread_members" }).order("id"));
  if (!threads.length) return { threads: [], members: [], metadata: [], reads: [] };
  // Bodies stay out of the unread index; only the latest preview and open history load them.
  // Embed the usual small membership/read lists; page unusually large memberships explicitly.
  const [members, metadata] = await Promise.all([
    threads.some((thread) => thread.message_thread_members?.length >= SNAPSHOT_PAGE_SIZE)
      ? readPages(() => client.from("message_thread_members").select("*").eq("company_id", companyId).order("id"))
      : threads.flatMap((thread) => thread.message_thread_members || []),
    readPages(() => client.from("messages").select("id, thread_id, sender_id, created_at, deleted_at, parent_message_id")
      .eq("company_id", companyId).is("deleted_at", null).order("id")),
  ]);
  const reads = threads.flatMap((thread) => thread.message_reads || []);
  const visible = new Set(members.filter((member) => member.user_id === userId)
    .map((member) => member.thread_id));
  return {
    threads: threads.filter((thread) => visible.has(thread.id)).map(({ messages, message_thread_members, message_reads, ...thread }) => ({
      ...thread, latest_message: messages?.[0] || null,
      preferences: members.find((member) => member.thread_id === thread.id && member.user_id === userId) || {},
    })).sort((a, b) => String(b.latest_message?.created_at || b.updated_at)
      .localeCompare(String(a.latest_message?.created_at || a.updated_at)) || a.id.localeCompare(b.id)),
    members, metadata: metadata.filter((message) => visible.has(message.thread_id)), reads,
  };
}

export async function fetchMessageHistory(client, companyId, threadId, before = null) {
  let query = client.from("messages").select(HISTORY_SELECT).eq("company_id", companyId)
    .eq("thread_id", threadId).is("deleted_at", null).is("parent_message_id", null)
    .order("created_at", { ascending: false }).order("id", { ascending: false });
  if (before) query = query.or(`created_at.lt.${before.created_at},and(created_at.eq.${before.created_at},id.lt.${before.id})`);
  const { data, error } = await query.limit(MESSAGE_HISTORY_PAGE_SIZE + 1);
  if (error) throw error;
  return { rows: (data || []).slice(0, MESSAGE_HISTORY_PAGE_SIZE).reverse(),
    hasOlder: (data || []).length > MESSAGE_HISTORY_PAGE_SIZE };
}

export async function fetchMessageRows(client, companyId, threadId, ids) {
  const rows = [];
  for (let offset = 0; offset < ids.length; offset += MESSAGE_HISTORY_PAGE_SIZE) {
    const { data, error } = await client.from("messages").select(HISTORY_SELECT).eq("company_id", companyId)
      .eq("thread_id", threadId).is("deleted_at", null).in("id", ids.slice(offset, offset + MESSAGE_HISTORY_PAGE_SIZE));
    if (error) throw error;
    rows.push(...(data || []));
  }
  return rows;
}

export function isConversationArchived(thread) {
  const archived = thread.preferences?.archived_at || thread.preferences?.deleted_at;
  return Boolean(archived && (!thread.latest_message || thread.latest_message.created_at <= archived));
}
