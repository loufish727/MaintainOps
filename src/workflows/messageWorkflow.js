(function () {
  function createMessageWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;
    const pendingThreads = new Map();
    const pendingMessages = new Map();
    const busyForms = new Set();
    const readWrites = new Map();

    async function insertOnce(table, payload) {
      let response = await deps.withOperationTimeout(
        deps.supabaseClient().from(table).insert(payload).select("*").single(),
        "Message save timed out. Your draft is kept; retry to check the same send.", 15000
      );
      // A timeout can arrive after the server committed. A retry uses the same ID.
      if (response.error?.code === "23505") {
        response = await deps.withOperationTimeout(deps.supabaseClient().from(table).select("*")
          .eq("id", payload.id).eq("company_id", payload.company_id).single(), "Could not verify the previous send.", 15000);
      }
      return response;
    }

    function messageThreadMembersForType(threadType, directUserId) {
      if (threadType === "direct") return [deps.getSession().user.id, directUserId].filter(Boolean);
      return deps.getCompanyMembers().map((member) => member.user_id);
    }

    function bindMessageWorkflowEvents(root = documentRef) {
      const messageThreadForm = root.querySelector("#message-thread-form");
      if (messageThreadForm) {
        messageThreadForm.addEventListener("submit", createMessageThread);
      }

      const messageReplyForm = root.querySelector("#message-reply-form");
      if (messageReplyForm) {
        messageReplyForm.addEventListener("submit", sendThreadReply);
      }

      root.querySelectorAll("[data-delete-message]").forEach((button) => {
        button.addEventListener("click", deleteOwnMessage);
      });

      root.querySelectorAll("[data-delete-message-thread]").forEach((button) => {
        button.addEventListener("click", deleteMessageThread);
      });
      root.querySelectorAll("[data-archive-message-thread], [data-mute-message-thread]").forEach((button) => {
        button.addEventListener("click", updateConversationPreferences);
      });
      root.querySelectorAll("[data-message-reaction]").forEach((button) => button.addEventListener("click", toggleReaction));
    }

    async function createMessageThread(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      if (busyForms.has("composer")) return;
      const errorElement = documentRef.querySelector("#message-thread-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      const form = new FormDataCtor(formElement);
      if (errorElement) errorElement.textContent = "";
      if (!deps.getMessagesReady()) {
        if (errorElement) errorElement.textContent = "Messages are unavailable. Try again after reconnecting.";
        return;
      }

      const threadType = form.get("thread_type");
      const directUserId = form.get("direct_user_id");
      const memberIds = messageThreadMembersForType(threadType, directUserId);
      const enteredTitle = String(form.get("title") || "").trim();
      const title = enteredTitle || (threadType === "direct" ? "Direct message" : "");
      const body = String(form.get("body") || "").trim();
      if (threadType === "company") {
        if (errorElement) errorElement.textContent = "Company-wide broadcast threads are disabled. Choose location or direct.";
        return;
      }
      if (threadType === "direct" && !directUserId) {
        if (errorElement) errorElement.textContent = "Choose a teammate for a direct message.";
        return;
      }
      if (!title || !body) {
        if (errorElement) errorElement.textContent = "Add a subject and message before starting the thread.";
        return;
      }
      if (!memberIds.includes(deps.getSession().user.id)) memberIds.push(deps.getSession().user.id);
      const companyId = deps.getActiveCompanyId();
      const userId = deps.getSession().user.id;
      const workOrderId = form.get("work_order_id") || null;
      const existing = threadType === "direct" && !enteredTitle && !workOrderId ? deps.findDirectConversation?.(directUserId) : null;
      const locationId = threadType === "location" ? deps.activeLocationDatabaseId() : null;
      const key = JSON.stringify([companyId, userId, threadType, directUserId, title, body, workOrderId, locationId]);
      const pending = pendingThreads.get(key) || { id: crypto.randomUUID() };
      pendingThreads.set(key, pending);
      busyForms.add("composer");

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Starting...";
      }

      let threadStarted = false;
      try {
        const threadPayload = {
          id: pending.id,
          company_id: companyId,
          location_id: locationId,
          thread_type: threadType,
          title,
          created_by: userId,
        };
        if (workOrderId && deps.getMessageWorkOrderLinksReady()) {
          threadPayload.work_order_id = workOrderId;
        }

        const { data: thread, error: threadError } = existing ? { data: existing } : pending.thread
          ? { data: pending.thread } : await insertOnce("message_threads", threadPayload);

        if (threadError) {
          if (deps.isMissingColumnError(threadError, "work_order_id")) {
            deps.setMessageWorkOrderLinksReady(false);
          }
          throw threadError;
        }
        pending.thread = thread;

        const memberRows = [...new Set(memberIds)].map((userId) => ({
          company_id: companyId,
          thread_id: thread.id,
          user_id: userId,
        }));
        const { error: memberError } = existing || pending.membersSaved ? {} : await deps.withOperationTimeout(
          deps.supabaseClient().from("message_thread_members").insert(memberRows),
          "Message member save timed out. Check your connection and try again.",
          15000
        );
        if (memberError) {
          if (memberError.code !== "23505") throw memberError;
          const existing = await deps.withOperationTimeout(deps.supabaseClient().from("message_thread_members")
            .select("user_id").eq("company_id", companyId).eq("thread_id", thread.id), "Could not verify conversation members.", 15000);
          if (existing.error || !memberIds.every((id) => existing.data?.some((row) => row.user_id === id))) throw memberError;
        }
        pending.membersSaved = true;

        const { error: messageError } = await insertThreadMessage(thread.id, body, companyId, userId);
        if (messageError) throw messageError;
        pendingThreads.delete(key);
        threadStarted = true;
        if (companyId !== deps.getActiveCompanyId() || userId !== deps.getSession()?.user.id) return;

        deps.clearDraft?.("composer", { title: enteredTitle, body });
        deps.setActiveMessageThreadId(thread.id);
        deps.setMessageComposerWorkOrderId("");
        deps.setMessageComposerOpen(false);
        await markMessageThreadRead(thread.id);
        deps.showNotice("Message sent.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = friendlyMessageCenterError(error);
      } finally {
        busyForms.delete("composer");
        if (!threadStarted && submitButton?.isConnected) {
          submitButton.disabled = false;
          submitButton.textContent = "Send message";
        }
      }
    }

    async function sendThreadReply(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const threadId = formElement.dataset.threadId;
      if (busyForms.has(threadId)) return;
      const errorElement = documentRef.querySelector("#message-reply-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      const form = new FormDataCtor(formElement);
      const body = String(form.get("body") || "").trim();
      const replyToId = form.get("reply_to_id") || null;
      if (!body) return;
      busyForms.add(threadId);
      const companyId = deps.getActiveCompanyId();
      const userId = deps.getSession().user.id;
      if (errorElement) errorElement.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.setAttribute?.("aria-label", "Sending reply");
      }
      const sendState = formElement.querySelector(".message-send-state");
      if (sendState) sendState.textContent = "Sending...";

      let replySent = false;
      try {
        const { error } = await insertThreadMessage(threadId, body, companyId, userId, replyToId);
        if (error) throw error;

        replySent = true;
        if (companyId !== deps.getActiveCompanyId() || userId !== deps.getSession()?.user.id) return;
        deps.clearDraft?.(threadId, { body });
        deps.clearReplyQuote?.(threadId, replyToId);
        deps.showNotice("Message sent.");
        await markMessageThreadRead(threadId);
        await deps.render();
        const list = documentRef.querySelector(".message-list");
        if (list && documentRef.querySelector(".message-center")?.dataset.threadId === threadId) list.scrollTop = list.scrollHeight;
      } catch (error) {
        if (errorElement) errorElement.textContent = friendlyMessageCenterError(error);
      } finally {
        busyForms.delete(threadId);
        if (!replySent && submitButton?.isConnected) {
          submitButton.disabled = false;
          submitButton.setAttribute?.("aria-label", "Send reply");
          if (sendState) sendState.textContent = "Not sent";
        }
      }
    }

    async function updateConversationPreferences(event) {
      const button = event.currentTarget;
      if (button.disabled) return;
      button.closest?.("details")?.removeAttribute("open");
      button.disabled = true;
      const archive = button.dataset.archiveMessageThread ? button.dataset.archive === "true" : null;
      const mute = button.dataset.muteMessageThread ? button.dataset.mute === "true" : null;
      const threadId = button.dataset.archiveMessageThread || button.dataset.muteMessageThread;
      const companyId = deps.getActiveCompanyId();
      const userId = deps.getSession()?.user.id;
      try {
        const { error } = await deps.withOperationTimeout(deps.supabaseClient().rpc("set_my_message_preferences", {
          target_thread_id: threadId, archive, mute,
        }), "Conversation update timed out. Try again.", 10000);
        if (error) throw error;
        if (companyId !== deps.getActiveCompanyId() || userId !== deps.getSession()?.user.id) return;
        if (archive === true) deps.setActiveMessageThreadId("");
        deps.showNotice(archive === null ? (mute ? "Conversation muted." : "Conversation unmuted.") : (archive ? "Conversation archived." : "Conversation moved to inbox."));
        if (archive === null && deps.reloadPreferences) await deps.reloadPreferences();
        else await deps.render();
      } catch (error) { deps.showNotice(friendlyMessageCenterError(error), "warning"); }
      finally { if (button.isConnected) button.disabled = false; }
    }

    async function toggleReaction(event) {
      const button = event.currentTarget;
      if (button.disabled) return;
      button.closest?.("details")?.removeAttribute("open");
      const message = deps.getMessage?.(button.dataset.messageId);
      if (!message || message.deleted_at) return;
      const reaction = button.dataset.messageReaction;
      if (!["acknowledged", "looking", "thanks", "question"].includes(reaction)) return;
      const userId = deps.getSession().user.id;
      const companyId = deps.getActiveCompanyId();
      const existing = message.message_reactions?.find((row) => row.user_id === userId && row.reaction === reaction);
      button.disabled = true;
      try {
        const query = existing ? deps.supabaseClient().from("message_reactions").update({ active: !existing.active }).eq("id", existing.id).eq("user_id", userId).eq("company_id", companyId)
          : deps.supabaseClient().from("message_reactions").insert({ company_id: companyId, thread_id: message.thread_id, message_id: message.id, user_id: userId, reaction });
        const { error } = await deps.withOperationTimeout(query, "Reaction update timed out. Try again.", 10000);
        if (error && error.code !== "23505") throw error;
        if (companyId === deps.getActiveCompanyId() && userId === deps.getSession()?.user.id) await deps.reloadConversation?.(message.thread_id, message.id);
      } catch (error) { deps.showNotice(friendlyMessageCenterError(error), "warning"); }
      finally { if (button.isConnected) button.disabled = false; }
    }

    async function deleteOwnMessage(event) {
      const button = event.currentTarget;
      const messageId = button?.dataset?.deleteMessage;
      if (!messageId) return;
      if (typeof deps.confirmUser === "function" && !deps.confirmUser("Delete this message for everyone in the conversation? Admins can still review the saved transcript.")) {
        return;
      }
      button.disabled = true;
      button.textContent = "Deleting...";
      try {
        const response = await deps.withOperationTimeout(
          deps.supabaseClient().rpc("soft_delete_own_message", { target_message_id: messageId }),
          "Message delete timed out. Check your connection and try again.",
          10000
        );
        if (response.error) throw response.error;
        deps.showNotice("Message deleted.");
        await deps.render();
      } catch (error) {
        deps.showNotice(friendlyMessageCenterError(error), "warning");
        if (button.isConnected) {
          button.disabled = false;
          button.textContent = "Delete";
        }
      }
    }

    async function deleteMessageThread(event) {
      const button = event.currentTarget;
      const threadId = button?.dataset?.deleteMessageThread;
      if (!threadId) return;
      if (typeof deps.confirmUser === "function" && !deps.confirmUser("Hide this conversation from your inbox, including future replies? Other participants keep their copy.")) {
        return;
      }
      button.disabled = true;
      button.textContent = "Hiding...";
      try {
        const response = await deps.withOperationTimeout(
          deps.supabaseClient().rpc("soft_delete_own_message_thread", { target_thread_id: threadId }),
          "Message thread delete timed out. Check your connection and try again.",
          10000
        );
        if (response.error) throw response.error;
        deps.setActiveMessageThreadId("");
        deps.showNotice("Conversation hidden from your inbox.");
        await deps.render();
      } catch (error) {
        deps.showNotice(friendlyMessageCenterError(error), "warning");
        if (button.isConnected) {
          button.disabled = false;
          button.textContent = "Hide conversation";
        }
      }
    }


    async function markMessageThreadRead(threadId) {
      if (!deps.getMessagesReady() || !threadId) return;
      const readAt = deps.getLatestReadTime ? deps.getLatestReadTime(threadId) : new Date().toISOString();
      if (!readAt) return;
      const readRow = {
        company_id: deps.getActiveCompanyId(),
        thread_id: threadId,
        user_id: deps.getSession().user.id,
        last_read_at: readAt,
      };
      const key = `${readRow.company_id}:${readRow.user_id}:${threadId}`;
      const previous = readWrites.get(key);
      const save = (async () => {
        if (previous) await previous;
        if (readRow.company_id !== deps.getActiveCompanyId() || readRow.user_id !== deps.getSession()?.user.id || deps.getReadTime?.(threadId) >= readAt) return;
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("message_reads")
            .upsert(readRow, { onConflict: "thread_id,user_id" }),
          "Message read marker timed out.",
          8000
        ).catch((error) => ({ error }));
        if (error) deps.warn("Could not mark message thread read", error);
        else if (readRow.company_id === deps.getActiveCompanyId() && readRow.user_id === deps.getSession()?.user.id) deps.setMessageThreadRead(threadId, readRow);
      })();
      readWrites.set(key, save);
      try { await save; } finally { if (readWrites.get(key) === save) readWrites.delete(key); }
    }

    async function insertThreadMessage(threadId, body, companyId = deps.getActiveCompanyId(), userId = deps.getSession().user.id, replyToId = null) {
      const key = JSON.stringify([companyId, userId, threadId, body, replyToId]);
      const id = pendingMessages.get(key) || crypto.randomUUID();
      pendingMessages.set(key, id);
      const message = await insertOnce("messages", { id, company_id: companyId, thread_id: threadId, sender_id: userId, body, ...(replyToId ? { reply_to_id: replyToId } : {}) });

      if (message.error) return { error: message.error };
      pendingMessages.delete(key);

      const thread = await deps.withOperationTimeout(
        deps.supabaseClient()
          .from("message_threads")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", threadId)
          .eq("company_id", companyId),
        "Message thread timestamp save timed out.",
        8000
      ).catch((error) => ({ error }));

      if (thread.error) deps.warn("Message sent; thread timestamp could not be updated", thread.error);
      return { error: null };
    }

    function friendlyMessageCenterError(error) {
      const state = deps.messageCenterErrorState(error);
      if (state.messagesReady === false) deps.setMessagesReady(false);
      return state.message;
    }

    return {
      bindMessageWorkflowEvents,
      createMessageThread,
      sendThreadReply,
      deleteOwnMessage,
      deleteMessageThread,
      markMessageThreadRead,
      insertThreadMessage,
      friendlyMessageCenterError,
      messageThreadMembersForType,
    };
  }

  window.MaintainOpsMessageWorkflow = {
    createMessageWorkflow,
  };

  if (typeof module !== "undefined") {
    module.exports = { createMessageWorkflow };
  }
})();
