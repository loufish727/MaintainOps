(function () {
  function createCompanyLogoWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;
    const cryptoRef = deps.cryptoRef || crypto;
    const URLRef = deps.URLRef || URL;
    const consoleRef = deps.consoleRef || console;
    const createImageBitmapRef = deps.createImageBitmapRef || (typeof createImageBitmap !== "undefined" ? createImageBitmap : null);
    const logoUploadLimitBytes = 25 * 1024 * 1024;
    const logoStoredMimeTypes = new Set(["image/png"]);

    async function uploadCompanyLogo(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const errorElement = documentRef.querySelector("#company-logo-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      const file = new FormDataCtor(formElement).get("logo");
      if (errorElement) errorElement.textContent = "";
      if (!file || !file.name) {
        if (errorElement) errorElement.textContent = "Choose a logo image first.";
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Uploading...";
      }

      try {
        const validationError = validateLogoUpload(file);
        if (validationError) throw new Error(validationError);
        const optimized = await optimizeLogo(file);
        const optimizedError = validateOptimizedLogo(optimized);
        if (optimizedError) throw new Error(optimizedError);
        const path = `${deps.getActiveCompanyId()}/logo-${cryptoRef.randomUUID()}-${optimized.fileName}`;
        const upload = await deps.withOperationTimeout(
          deps.supabaseClient().storage.from("company-logos").upload(path, optimized.blob, {
            contentType: optimized.contentType,
            upsert: false,
          }),
          "Company logo upload timed out. Check your connection and try again.",
          25000
        );

        if (upload.error) {
          throw new Error(upload.error.message.includes("Bucket not found")
            ? "Run supabase/step-next-company-logo.sql before uploading a logo."
            : upload.error.message);
        }

        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient().rpc("set_company_logo", {
            target_company_id: deps.getActiveCompanyId(),
            new_logo_path: path,
          }),
          "Company logo record save timed out. Check your connection and try again.",
          15000
        );

        if (error) {
          await deps.removeUploadedObject("company-logos", path);
          throw new Error(deps.isColumnSchemaError(error, ["logo_path"])
            ? "Run supabase/step-next-company-logo.sql before saving a company logo."
            : error.message.includes("set_company_logo")
            ? "Run supabase/step-next-company-logo.sql, then try uploading the logo again."
            : error.message);
        }

        const activeCompany = deps.getCompanies().find((company) => company.id === deps.getActiveCompanyId());
        if (activeCompany) {
          activeCompany.logo_path = path;
          activeCompany.logoUrl = URLRef.createObjectURL(optimized.blob);
        }

        deps.showNotice("Company logo uploaded.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not upload logo.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Upload Logo";
        }
      }
    }

    async function optimizeLogo(file) {
      if (typeof deps.optimizeLogoOverride === "function") return deps.optimizeLogoOverride(file);
      const contentType = contentTypeForLogo(file);

      try {
        if (!createImageBitmapRef) throw new Error("Browser logo optimization is unavailable.");
        const bitmap = await createImageBitmapRef(file);
        const maxDimension = 1200;
        const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
        const width = Math.max(1, Math.round(bitmap.width * scale));
        const height = Math.max(1, Math.round(bitmap.height * scale));
        const canvas = documentRef.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d", { alpha: true });
        context.clearRect(0, 0, width, height);
        context.drawImage(bitmap, 0, 0, width, height);
        if (bitmap.close) bitmap.close();

        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
        if (!blob) throw new Error("Browser could not optimize this logo.");

        return {
          blob,
          fileName: `${deps.fileBaseName(file.name || "logo")}.png`,
          contentType: "image/png",
        };
      } catch (error) {
        consoleRef.warn("Logo optimization failed.", error);
        throw new Error("This logo image could not be resized by the browser. Try saving it as JPG, PNG, or WebP first.");
      }
    }

    function contentTypeForLogo(file) {
      const explicitType = String(file?.type || "").trim().toLowerCase();
      if (explicitType) return explicitType;
      const name = String(file?.name || "").toLowerCase();
      if (/\.(jpe?g)$/.test(name)) return "image/jpeg";
      if (/\.png$/.test(name)) return "image/png";
      if (/\.webp$/.test(name)) return "image/webp";
      if (/\.gif$/.test(name)) return "image/gif";
      if (/\.heic$/.test(name)) return "image/heic";
      if (/\.heif$/.test(name)) return "image/heif";
      if (/\.avif$/.test(name)) return "image/avif";
      if (/\.bmp$/.test(name)) return "image/bmp";
      if (/\.tiff?$/.test(name)) return "image/tiff";
      return "application/octet-stream";
    }

    function validateLogoUpload(file) {
      const contentType = contentTypeForLogo(file);
      if (!contentType.startsWith("image/")) {
        return "Company logos must be image files.";
      }
      return "";
    }

    function validateOptimizedLogo(optimized) {
      if (!logoStoredMimeTypes.has(String(optimized?.contentType || "").toLowerCase())) {
        return "Company logos must be resized to PNG before upload.";
      }
      if (Number(optimized?.blob?.size || 0) > logoUploadLimitBytes) {
        return "This logo is still over 25 MB after resizing. Try a smaller logo image.";
      }
      return "";
    }

    return {
      optimizeLogo,
      uploadCompanyLogo,
    };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { createCompanyLogoWorkflow };
  }
  window.MaintainOpsCompanyLogoWorkflow = { createCompanyLogoWorkflow };
})();
