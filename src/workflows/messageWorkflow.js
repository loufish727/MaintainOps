(function () {
  function createMessageWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;
    const pendingThreads = new Map();
    const pendingMessages = new Map();
    const busyForms = new Set();

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

    function bindMessageWorkflowEvents() {
      const messageThreadForm = documentRef.querySelector("#message-thread-form");
      if (messageThreadForm) {
        messageThreadForm.addEventListener("submit", createMessageThread);
      }

      const messageReplyForm = documentRef.querySelector("#message-reply-form");
      if (messageReplyForm) {
        messageReplyForm.addEventListener("submit", sendThreadReply);
      }

      documentRef.querySelectorAll("[data-delete-message]").forEach((button) => {
        button.addEventListener("click", deleteOwnMessage);
      });

      documentRef.querySelectorAll("[data-delete-message-thread]").forEach((button) => {
        button.addEventListener("click", deleteMessageThread);
      });
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
      const title = String(form.get("title") || "").trim();
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

        const { data: thread, error: threadError } = pending.thread
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
        const { error: memberError } = pending.membersSaved ? {} : await deps.withOperationTimeout(
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

        deps.clearDraft?.("composer", { title, body });
        deps.setActiveMessageThreadId(thread.id);
        deps.setMessageComposerWorkOrderId("");
        deps.setMessageComposerOpen(false);
        await markMessageThreadRead(thread.id);
        deps.showNotice("Thread started.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = friendlyMessageCenterError(error);
      } finally {
        busyForms.delete("composer");
        if (!threadStarted && submitButton?.isConnected) {
          submitButton.disabled = false;
          submitButton.textContent = "Start Thread";
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
      const body = String(new FormDataCtor(formElement).get("body") || "").trim();
      if (!body) return;
      busyForms.add(threadId);
      const companyId = deps.getActiveCompanyId();
      const userId = deps.getSession().user.id;
      if (errorElement) errorElement.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      let replySent = false;
      try {
        const { error } = await insertThreadMessage(threadId, body, companyId, userId);
        if (error) throw error;

        replySent = true;
        if (companyId !== deps.getActiveCompanyId() || userId !== deps.getSession()?.user.id) return;
        deps.clearDraft?.(threadId, { body });
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
          submitButton.textContent = "Send Reply";
        }
      }
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
      const { error } = await deps.withOperationTimeout(
        deps.supabaseClient()
          .from("message_reads")
          .upsert(readRow, { onConflict: "thread_id,user_id" }),
        "Message read marker timed out.",
        8000
      ).catch((error) => ({ error }));
      if (error) deps.warn("Could not mark message thread read", error);
      else if (readRow.company_id === deps.getActiveCompanyId() && readRow.user_id === deps.getSession()?.user.id) deps.setMessageThreadRead(threadId, readRow);
    }

    async function insertThreadMessage(threadId, body, companyId = deps.getActiveCompanyId(), userId = deps.getSession().user.id) {
      const key = JSON.stringify([companyId, userId, threadId, body]);
      const id = pendingMessages.get(key) || crypto.randomUUID();
      pendingMessages.set(key, id);
      const message = await insertOnce("messages", { id, company_id: companyId, thread_id: threadId, sender_id: userId, body });

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
