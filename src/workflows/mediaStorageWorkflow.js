(function () {
  function createMediaStorageWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;
    const cryptoRef = deps.cryptoRef || crypto;
    const consoleRef = deps.consoleRef || console;
    const createImageBitmapRef = deps.createImageBitmapRef || (typeof createImageBitmap !== "undefined" ? createImageBitmap : null);
    const largeDocumentLimitBytes = 25 * 1024 * 1024;
    const photoUploadLimitBytes = 5 * 1024 * 1024;
    const photoMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif"]);

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
      if (isLargeUnoptimizedDocument(file)) {
        if (errorElement) errorElement.textContent = largeDocumentMessage();
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

    async function uploadAssetDocument(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const assetId = formElement.dataset.assetDocument;
      const errorElement = documentRef.querySelector(`[data-asset-document-error="${assetId}"]`);
      const submitButton = formElement.querySelector("button[type='submit']");
      const formData = new FormDataCtor(formElement);
      const file = formData.get("document");
      const documentType = normalizeAssetDocumentType(formData.get("document_type"));

      if (errorElement) errorElement.textContent = "";
      if (!deps.getAssetDocumentsReady?.()) {
        if (errorElement) errorElement.textContent = "Run supabase/step-next-asset-documents.sql before uploading equipment files.";
        return;
      }
      if (!file || !file.name) {
        if (errorElement) errorElement.textContent = "Choose a machine file first.";
        return;
      }
      if (isLargeUnoptimizedDocument(file)) {
        if (errorElement) errorElement.textContent = largeDocumentMessage();
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Uploading...";
      }

      const optimized = await optimizePhoto(file);
      const path = `${deps.getActiveCompanyId()}/${assetId}/${cryptoRef.randomUUID()}-${optimized.fileName}`;
      try {
        const upload = await deps.withOperationTimeout(
          deps.supabaseClient().storage.from("asset-documents").upload(path, optimized.blob, {
            contentType: optimized.contentType,
            upsert: false,
          }),
          "Equipment file upload timed out. Check your connection and try again.",
          25000
        );
        if (upload.error) throw upload.error;

        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient().from("asset_documents").insert({
            company_id: deps.getActiveCompanyId(),
            asset_id: assetId,
            uploaded_by: deps.getSession().user.id,
            storage_path: path,
            file_name: optimized.fileName,
            content_type: optimized.contentType,
            document_type: documentType,
            file_size_bytes: optimized.blob.size || null,
            original_file_name: deps.safeFileName(file.name || "machine-photo"),
            original_size_bytes: file.size || null,
          }),
          "Equipment file record save timed out. Check your connection and try again.",
          15000
        );

        if (error) {
          await removeUploadedObject("asset-documents", path);
          if (deps.isColumnSchemaError(error, ["asset_documents"])) deps.setAssetDocumentsReady?.(false);
          throw new Error(deps.getAssetDocumentsReady?.()
            ? error.message
            : "Run supabase/step-next-asset-documents.sql before uploading equipment files.");
        }

        deps.showNotice("Machine file attached.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not upload machine file.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Attach Machine File";
        }
      }
    }

    async function deleteAssetDocument(documentId, storagePath) {
      const errorElement = documentRef.querySelector("[data-asset-document-error]");
      if (errorElement) errorElement.textContent = "";
      if (!documentId || !storagePath) {
        const message = "Missing machine file record. Refresh and try again.";
        if (errorElement) errorElement.textContent = message;
        else deps.showNotice(message, "warning");
        return;
      }

      try {
        const storageDelete = await deps.withOperationTimeout(
          deps.supabaseClient().storage.from("asset-documents").remove([storagePath]),
          "Equipment file delete timed out. Check your connection and try again.",
          15000
        );
        if (storageDelete.error) throw storageDelete.error;

        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("asset_documents")
            .delete()
            .eq("id", documentId)
            .eq("company_id", deps.getActiveCompanyId()),
          "Equipment file record delete timed out. Check your connection and try again.",
          15000
        );
        if (error) throw error;

        deps.showNotice("Machine file deleted.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not delete machine file.";
        else deps.showNotice(error.message || "Could not delete machine file.", "warning");
      }
    }

    function normalizeAssetDocumentType(value) {
      const allowed = new Set(["machine_photo", "schematic", "settings", "manual", "nameplate", "inspection", "receipt", "other"]);
      return allowed.has(value) ? value : "other";
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
      const validationError = validatePhotoUpload(file);
      if (validationError) {
        if (errorTarget) errorTarget.textContent = validationError;
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

      const validationError = validatePhotoUpload(file);
      if (validationError) return new Error(validationError);
      const optimized = await optimizePhoto(file);
      const optimizedError = validateOptimizedPhoto(optimized);
      if (optimizedError) return new Error(optimizedError);
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

      const validationError = validatePhotoUpload(file);
      if (validationError) return new Error(validationError);
      const optimized = await optimizePhoto(file);
      const optimizedError = validateOptimizedPhoto(optimized);
      if (optimizedError) return new Error(optimizedError);
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
      const contentType = contentTypeForFile(file);
      if (!imageTypes.includes(contentType)) {
        return {
          blob: file,
          fileName: deps.safeFileName(file.name || "photo"),
          contentType,
        };
      }

      try {
        if (!createImageBitmapRef) throw new Error("Browser image optimization is unavailable.");
        const bitmap = await createImageBitmapRef(file);
        const targetBytes = 1.5 * 1024 * 1024;
        const optimizationPasses = [
          { maxDimension: 2000, quality: 0.82 },
          { maxDimension: 1800, quality: 0.78 },
          { maxDimension: 1600, quality: 0.74 },
        ];
        let optimizedBlob = null;
        for (const pass of optimizationPasses) {
          const optimized = await renderOptimizedImage(bitmap, pass.maxDimension, pass.quality);
          optimizedBlob = optimized;
          if (optimized.size <= targetBytes) break;
        }
        if (bitmap.close) bitmap.close();

        if (!optimizedBlob) throw new Error("Browser could not optimize this image.");

        return {
          blob: optimizedBlob,
          fileName: `${deps.fileBaseName(file.name || "photo")}.jpg`,
          contentType: "image/jpeg",
        };
      } catch (error) {
        consoleRef.warn("Photo optimization failed; uploading original.", error);
        return {
          blob: file,
          fileName: deps.safeFileName(file.name || "photo"),
          contentType,
        };
      }
    }

    function isOptimizableImage(file) {
      return ["image/jpeg", "image/png", "image/webp"].includes(contentTypeForFile(file));
    }

    function isLargeUnoptimizedDocument(file) {
      return !isOptimizableImage(file) && Number(file.size || 0) > largeDocumentLimitBytes;
    }

    function largeDocumentMessage() {
      return "This non-image file is over 25 MB. Compress it or split it before uploading.";
    }

    function contentTypeForFile(file) {
      const explicitType = String(file?.type || "").trim().toLowerCase();
      if (explicitType) return explicitType;
      const name = String(file?.name || "").toLowerCase();
      if (/\.(jpe?g)$/.test(name)) return "image/jpeg";
      if (/\.png$/.test(name)) return "image/png";
      if (/\.webp$/.test(name)) return "image/webp";
      if (/\.gif$/.test(name)) return "image/gif";
      if (/\.heic$/.test(name)) return "image/heic";
      if (/\.heif$/.test(name)) return "image/heif";
      if (/\.pdf$/.test(name)) return "application/pdf";
      if (/\.txt$/.test(name)) return "text/plain";
      if (/\.csv$/.test(name)) return "text/csv";
      if (/\.doc$/.test(name)) return "application/msword";
      if (/\.docx$/.test(name)) return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      if (/\.xls$/.test(name)) return "application/vnd.ms-excel";
      if (/\.xlsx$/.test(name)) return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      return "application/octet-stream";
    }

    function validatePhotoUpload(file) {
      const contentType = contentTypeForFile(file);
      if (!photoMimeTypes.has(contentType)) {
        return "This photo type is not supported. Use JPG, PNG, WEBP, GIF, HEIC, or HEIF.";
      }
      if (!isOptimizableImage(file) && Number(file.size || 0) > photoUploadLimitBytes) {
        return "This photo is over 5 MB and the browser cannot optimize that format. Try a JPG/PNG, screenshot it, or choose a smaller photo.";
      }
      return "";
    }

    function validateOptimizedPhoto(optimized) {
      if (!photoMimeTypes.has(String(optimized?.contentType || "").toLowerCase())) {
        return "This photo type is not supported. Use JPG, PNG, WEBP, GIF, HEIC, or HEIF.";
      }
      if (Number(optimized?.blob?.size || 0) > photoUploadLimitBytes) {
        return "This photo is still over 5 MB after optimization. Try a smaller photo or screenshot it first.";
      }
      return "";
    }

    async function renderOptimizedImage(bitmap, maxDimension, quality) {
      const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
      const width = Math.max(1, Math.round(bitmap.width * scale));
      const height = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = documentRef.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d", { alpha: false });
      context.drawImage(bitmap, 0, 0, width, height);

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
      if (!blob) throw new Error("Browser could not optimize this image.");
      return blob;
    }

    return {
      addPhotoToMaintenanceRequest,
      addPhotoToWorkOrder,
      optimizePhoto,
      removeUploadedObject,
      deleteAssetDocument,
      uploadAssetDocument,
      uploadPartDocument,
      uploadPhoto,
    };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { createMediaStorageWorkflow };
  }
  window.MaintainOpsMediaStorageWorkflow = { createMediaStorageWorkflow };
})();
