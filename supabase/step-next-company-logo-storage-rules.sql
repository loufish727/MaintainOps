-- Keep company logo storage aligned with the browser upload workflow.
-- Logos are private, image-only, and resized client-side before upload.

update storage.buckets
set file_size_limit = 26214400,
    allowed_mime_types = array[
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/heic',
      'image/heif'
    ]
where id = 'company-logos';

notify pgrst, 'reload schema';
