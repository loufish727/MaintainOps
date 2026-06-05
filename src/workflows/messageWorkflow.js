(function () {
  function createMessageWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;

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
      const errorElement = documentRef.querySelector("#message-thread-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      const form = new FormDataCtor(formElement);
      if (errorElement) errorElement.textContent = "";
      if (!deps.getMessagesReady()) {
        if (errorElement) errorElement.textContent = "Run supabase/step-next-message-center.sql before creating threads.";
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

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Starting...";
      }

      let threadStarted = false;
      try {
        const workOrderId = form.get("work_order_id") || null;
        const threadPayload = {
          company_id: deps.getActiveCompanyId(),
          location_id: threadType === "location" ? deps.activeLocationDatabaseId() : null,
          thread_type: threadType,
          title,
          created_by: deps.getSession().user.id,
        };
        if (workOrderId && deps.getMessageWorkOrderLinksReady()) {
          threadPayload.work_order_id = workOrderId;
        }

        const { data: thread, error: threadError } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("message_threads")
            .insert(threadPayload)
            .select("*")
            .single(),
          "Message thread save timed out. Check your connection and try again.",
          15000
        );

        if (threadError) {
          if (deps.isMissingColumnError(threadError, "work_order_id")) {
            deps.setMessageWorkOrderLinksReady(false);
          }
          throw threadError;
        }

        const memberRows = [...new Set(memberIds)].map((userId) => ({
          company_id: deps.getActiveCompanyId(),
          thread_id: thread.id,
          user_id: userId,
        }));
        const { error: memberError } = await deps.withOperationTimeout(
          deps.supabaseClient().from("message_thread_members").insert(memberRows),
          "Message member save timed out. Check your connection and try again.",
          15000
        );
        if (memberError) throw memberError;

        const { error: messageError } = await insertThreadMessage(thread.id, body);
        if (messageError) throw messageError;

        deps.setActiveMessageThreadId(thread.id);
        deps.setMessageComposerWorkOrderId("");
        deps.setMessageComposerOpen(false);
        await markMessageThreadRead(thread.id);
        deps.showNotice("Thread started.");
        threadStarted = true;
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = friendlyMessageCenterError(error);
      } finally {
        if (!threadStarted && submitButton?.isConnected) {
          submitButton.disabled = false;
          submitButton.textContent = "Start Thread";
        }
      }
    }

    async function sendThreadReply(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const errorElement = documentRef.querySelector("#message-reply-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      const body = String(new FormDataCtor(formElement).get("body") || "").trim();
      if (!body) return;
      if (errorElement) errorElement.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      let replySent = false;
      try {
        const { error } = await insertThreadMessage(formElement.dataset.threadId, body);
        if (error) throw error;

        deps.showNotice("Message sent.");
        await markMessageThreadRead(formElement.dataset.threadId);
        replySent = true;
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = friendlyMessageCenterError(error);
      } finally {
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
      if (typeof deps.confirmUser === "function" && !deps.confirmUser("Delete this message from the thread? Admins can still review the Supabase transcript if needed.")) {
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
      if (typeof deps.confirmUser === "function" && !deps.confirmUser("Delete this thread from your messages? Admins can still review the Supabase transcript if needed.")) {
        return;
      }
      button.disabled = true;
      button.textContent = "Deleting...";
      try {
        const response = await deps.withOperationTimeout(
          deps.supabaseClient().rpc("soft_delete_own_message_thread", { target_thread_id: threadId }),
          "Message thread delete timed out. Check your connection and try again.",
          10000
        );
        if (response.error) throw response.error;
        deps.setActiveMessageThreadId("");
        deps.showNotice("Thread deleted.");
        await deps.render();
      } catch (error) {
        deps.showNotice(friendlyMessageCenterError(error), "warning");
        if (button.isConnected) {
          button.disabled = false;
          button.textContent = "Delete Thread";
        }
      }
    }


    async function markMessageThreadRead(threadId) {
      if (!deps.getMessagesReady() || !threadId) return;
      const readAt = new Date().toISOString();
      const readRow = {
        company_id: deps.getActiveCompanyId(),
        thread_id: threadId,
        user_id: deps.getSession().user.id,
        last_read_at: readAt,
      };
      deps.setMessageThreadRead(threadId, readRow);
      const { error } = await deps.withOperationTimeout(
        deps.supabaseClient()
          .from("message_reads")
          .upsert(readRow, { onConflict: "thread_id,user_id" }),
        "Message read marker timed out.",
        8000
      ).catch((error) => ({ error }));
      if (error) deps.warn("Could not mark message thread read", error);
    }

    async function insertThreadMessage(threadId, body) {
      const message = await deps.withOperationTimeout(
        deps.supabaseClient()
          .from("messages")
          .insert({
            company_id: deps.getActiveCompanyId(),
            thread_id: threadId,
            sender_id: deps.getSession().user.id,
            body,
          }),
        "Message save timed out. Check your connection and try again.",
        15000
      );

      if (message.error) return { error: message.error };

      const thread = await deps.withOperationTimeout(
        deps.supabaseClient()
          .from("message_threads")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", threadId)
          .eq("company_id", deps.getActiveCompanyId()),
        "Message thread timestamp save timed out.",
        8000
      ).catch((error) => ({ error }));

      return { error: thread.error };
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
