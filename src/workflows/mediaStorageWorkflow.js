(function () {
  function createMediaStorageWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;
    const cryptoRef = deps.cryptoRef || crypto;
    const consoleRef = deps.consoleRef || console;
    const createImageBitmapRef = deps.createImageBitmapRef || (typeof createImageBitmap !== "undefined" ? createImageBitmap : null);

    async function uploadPartDocument(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const partId = formElement.dataset.partDocument;
      const errorElement = documentRef.querySelector(`[data-part-document-error="${partId}"]`);
      const submitButton = formElement.querySelector("button[type='submit']");
      const formData = new FormDataCtor(formElement);
      const file = formData.get("document");
      const documentType = normalizePartDocumentType(formData.get("document_type"));

      if (errorElement) errorElement.textContent = "";
      if (!deps.getPartDocumentsReady()) {
        if (errorElement) errorElement.textContent = "Run supabase/step-next-part-documents.sql before attaching files.";
        return;
      }
      if (!file || !file.name) {
        if (errorElement) errorElement.textContent = "Choose a receipt, invoice, photo, or PDF first.";
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Attaching...";
      }

      const optimized = await optimizePhoto(file);
      const fileName = optimized.fileName || deps.safeFileName(file.name || "part-file");
      const path = `${deps.getActiveCompanyId()}/${partId}/${cryptoRef.randomUUID()}-${fileName}`;
      try {
        const upload = await deps.withOperationTimeout(
          deps.supabaseClient().storage.from("part-documents").upload(path, optimized.blob, {
            contentType: optimized.contentType,
            upsert: false,
          }),
          "Part file upload timed out. Check your connection and try again.",
          25000
        );

        if (upload.error) throw upload.error;

        const documentRecord = {
          company_id: deps.getActiveCompanyId(),
          part_id: partId,
          uploaded_by: deps.getSession().user.id,
          storage_path: path,
          file_name: fileName,
          content_type: optimized.contentType,
          document_type: documentType,
          file_size_bytes: optimized.blob.size || null,
          original_file_name: deps.safeFileName(file.name || "part-file"),
          original_size_bytes: file.size || null,
        };

        let { error } = await deps.withOperationTimeout(
          deps.supabaseClient().from("part_documents").insert(documentRecord),
          "Part file record save timed out. Check your connection and try again.",
          15000
        );

        if (error && deps.isColumnSchemaError(error, ["document_type", "file_size_bytes", "original_file_name", "original_size_bytes"])) {
          delete documentRecord.document_type;
          delete documentRecord.file_size_bytes;
          delete documentRecord.original_file_name;
          delete documentRecord.original_size_bytes;
          const retry = await deps.withOperationTimeout(
            deps.supabaseClient().from("part_documents").insert(documentRecord),
            "Part file record retry timed out. Check your connection and try again.",
            15000
          );
          error = retry.error;
        }

        if (error) {
          await removeUploadedObject("part-documents", path);
          if (deps.isColumnSchemaError(error, ["part_documents"])) deps.setPartDocumentsReady(false);
          throw new Error(deps.getPartDocumentsReady()
            ? error.message
            : "Run supabase/step-next-part-documents.sql before attaching files.");
        }

        deps.showNotice("Part file attached.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not attach file.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Attach File";
        }
      }
    }

    function normalizePartDocumentType(value) {
      const allowed = new Set(["part_photo", "receipt", "invoice", "part_print", "schematic", "manual", "spec_sheet", "warranty", "other"]);
      return allowed.has(value) ? value : "other";
    }

    async function uploadPhoto(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const submitButton = formElement.querySelector("button[type='submit']");
      const errorTarget = documentRef.querySelector("#photo-error");
      if (errorTarget) errorTarget.textContent = "";
      const file = new FormDataCtor(formElement).get("photo");
      if (!file || !file.name) {
        if (errorTarget) errorTarget.textContent = "Choose a photo first.";
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = "Uploading...";
      try {
        const hasProfile = await deps.ensureProfileForActiveCompany();
        if (!hasProfile) throw new Error(deps.getAppError());

        const error = await addPhotoToWorkOrder(deps.getActiveWorkOrderId(), file);
        if (error) throw error;
        await deps.withOperationTimeout(
          deps.recordWorkOrderEvent(deps.getActiveWorkOrderId(), "photo_uploaded", `Photo uploaded: ${file.name}.`),
          "Activity log timed out.",
          8000
        ).catch(() => null);
        deps.showNotice("Photo uploaded.");
        await deps.render();
      } catch (error) {
        if (errorTarget) errorTarget.textContent = `Could not upload photo: ${error.message || error}`;
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Upload Photo";
      }
    }

    async function removeUploadedObject(bucket, path) {
      try {
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient().storage.from(bucket).remove([path]),
          "Uploaded file cleanup timed out.",
          10000
        );
        if (error) consoleRef.warn(`Could not remove uploaded ${bucket} object`, error);
      } catch (error) {
        consoleRef.warn(`Could not remove uploaded ${bucket} object`, error);
      }
    }

    async function addPhotoToWorkOrder(workOrderId, file) {
      const hasProfile = await deps.ensureProfileForActiveCompany();
      if (!hasProfile) return new Error(deps.getAppError());

      const optimized = await optimizePhoto(file);
      const path = `${deps.getActiveCompanyId()}/${workOrderId}/${cryptoRef.randomUUID()}-${optimized.fileName}`;
      const upload = await deps.withOperationTimeout(
        deps.supabaseClient().storage.from("work-order-photos").upload(path, optimized.blob, {
          contentType: optimized.contentType,
          upsert: false,
        }),
        "Photo upload timed out. Check your connection and try again.",
        25000
      );
      if (upload.error) return upload.error;

      const photoRecord = {
        company_id: deps.getActiveCompanyId(),
        work_order_id: workOrderId,
        uploaded_by: deps.getSession().user.id,
        storage_path: path,
        file_name: optimized.fileName,
        content_type: optimized.contentType,
        file_size_bytes: optimized.blob.size || null,
        original_file_name: deps.safeFileName(file.name || "photo"),
        original_size_bytes: file.size || null,
      };

      let { error } = await deps.withOperationTimeout(
        deps.supabaseClient().from("work_order_photos").insert(photoRecord),
        "Photo record save timed out. Check your connection and try again.",
        15000
      );
      if (error && deps.isColumnSchemaError(error, ["file_size_bytes", "original_file_name", "original_size_bytes"])) {
        delete photoRecord.file_size_bytes;
        delete photoRecord.original_file_name;
        delete photoRecord.original_size_bytes;
        const retry = await deps.withOperationTimeout(
          deps.supabaseClient().from("work_order_photos").insert(photoRecord),
          "Photo record retry timed out. Check your connection and try again.",
          15000
        );
        error = retry.error;
      }
      if (error) await removeUploadedObject("work-order-photos", path);
      return error || null;
    }

    async function addPhotoToMaintenanceRequest(requestId, file) {
      if (!requestId) return new Error("Request was not saved before photo upload.");

      const optimized = await optimizePhoto(file);
      const path = `${requestId}/${cryptoRef.randomUUID()}-${optimized.fileName}`;
      const upload = await deps.withOperationTimeout(
        deps.supabaseClient().storage.from("maintenance-request-photos").upload(path, optimized.blob, {
          contentType: optimized.contentType,
          upsert: false,
        }),
        "Request photo upload timed out. Check your connection and try again.",
        25000
      );
      if (upload.error) return upload.error;

      const { error } = await deps.withOperationTimeout(
        deps.supabaseClient().rpc("attach_maintenance_request_photo", {
          target_request_id: requestId,
          p_photo_storage_path: path,
          p_photo_file_name: optimized.fileName,
          p_photo_content_type: optimized.contentType,
          p_photo_file_size_bytes: optimized.blob.size || null,
          p_photo_original_file_name: deps.safeFileName(file.name || "photo"),
          p_photo_original_size_bytes: file.size || null,
        }),
        "Request photo record save timed out. Check your connection and try again.",
        15000
      );
      if (error) {
        await removeUploadedObject("maintenance-request-photos", path);
      }
      return error || null;
    }

    async function optimizePhoto(file) {
      if (typeof deps.optimizePhotoOverride === "function") return deps.optimizePhotoOverride(file);
      const imageTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!imageTypes.includes(file.type)) {
        return {
          blob: file,
          fileName: deps.safeFileName(file.name || "photo"),
          contentType: file.type || "application/octet-stream",
        };
      }

      try {
        if (!createImageBitmapRef) throw new Error("Browser image optimization is unavailable.");
        const bitmap = await createImageBitmapRef(file);
        const maxDimension = 2400;
        const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
        const width = Math.max(1, Math.round(bitmap.width * scale));
        const height = Math.max(1, Math.round(bitmap.height * scale));
        const canvas = documentRef.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d", { alpha: false });
        context.drawImage(bitmap, 0, 0, width, height);
        if (bitmap.close) bitmap.close();

        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.88));
        if (!blob) throw new Error("Browser could not optimize this image.");

        return {
          blob,
          fileName: `${deps.fileBaseName(file.name || "photo")}.jpg`,
          contentType: "image/jpeg",
        };
      } catch (error) {
        consoleRef.warn("Photo optimization failed; uploading original.", error);
        return {
          blob: file,
          fileName: deps.safeFileName(file.name || "photo"),
          contentType: file.type || "application/octet-stream",
        };
      }
    }

    return {
      addPhotoToMaintenanceRequest,
      addPhotoToWorkOrder,
      optimizePhoto,
      removeUploadedObject,
      uploadPartDocument,
      uploadPhoto,
    };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { createMediaStorageWorkflow };
  }
  window.MaintainOpsMediaStorageWorkflow = { createMediaStorageWorkflow };
})();
