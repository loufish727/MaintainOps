export const MESSAGE_FILE_LIMIT = 25 * 1024 * 1024;
export const MESSAGE_FILE_TYPES = new Set(['image/jpeg','image/png','image/webp','application/pdf','text/plain','text/csv','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','audio/webm','audio/mp4','audio/ogg','audio/mpeg','audio/wav']);

export async function prepareMessageFile(file, optimizePhoto) {
  let blob = file, name = file.name, type = file.type.split(';')[0].toLowerCase();
  if (type.startsWith('image/')) {
    const optimized = await optimizePhoto(file, { acceptAnyImage: true, targetBytes: 256 * 1024,
      passes: [0.86,0.8,0.74,0.68].map(quality => ({ maxDimension: 768, quality })) });
    blob = optimized.blob; name = optimized.fileName; type = optimized.contentType;
  }
  if (!MESSAGE_FILE_TYPES.has(type)) throw new Error('Choose a supported photo, PDF, text, Office document or audio file. Convert unsupported images to JPEG first.');
  if (!blob.size || blob.size > MESSAGE_FILE_LIMIT || (type.startsWith('image/') && blob.size > 5 * 1024 * 1024)) throw new Error('This file exceeds the upload limit after photo optimization. Documents and audio can be up to 25 MB.');
  return { id: crypto.randomUUID(), blob, name: String(name || 'attachment').replace(/[\x00-\x1f/\\]/g, '_').slice(0,180), type, saved: false, uploaded: false };
}

export async function sendMessageFiles({ client, companyId, userId, threadId, messageId, body, quoteId = null, parentId = null, files, progress = () => {}, current = () => true }) {
  if (!files.length || files.length > 20) throw new Error('Choose between 1 and 20 attachments.');
  for (let index = 0; index < files.length; index++) {
    if (!current()) throw new Error('Workspace changed. Return to the original conversation to retry.');
    const file = files[index];
    if (file.messageId && file.messageId !== messageId) throw new Error('Retry the original message before changing its attachments.');
    file.messageId = messageId;
    file.path = `${companyId}/${threadId}/${userId}/${file.id}`;
    progress(`Uploading ${index + 1} of ${files.length}`);
    if (!file.saved) {
      const { error } = await client.from('message_files').insert({ id: file.id, company_id: companyId, thread_id: threadId,
        draft_id: messageId, user_id: userId, file_name: file.name, content_type: file.type, byte_size: file.blob.size, object_path: file.path });
      if (error && error.code !== '23505') throw error;
      file.saved = true;
    }
    if (!file.uploaded) {
      const { error } = await client.storage.from('message-files').upload(file.path, file.blob, { contentType: file.type, upsert: false });
      // A lost response can follow a successful upload. The commit RPC verifies actual Storage size/type.
      if (error && !['409','Duplicate'].includes(String(error.statusCode || error.error))) throw error;
      file.uploaded = true;
    }
  }
  if (!current()) throw new Error('Workspace changed before sending.');
  progress('Sending...');
  const { error } = await client.rpc('send_message_with_files', { message_key: messageId, target_thread: threadId,
    message_body: body, upload_ids: files.map(file => file.id), quote_id: quoteId, parent_id: parentId });
  if (error) throw error;
}

export async function removePendingFile(client, file) {
  if (!file.saved) return;
  const { error } = await client.storage.from('message-files').remove([file.path]);
  if (error) throw error;
  const result = await client.from('message_files').delete().eq('id', file.id).is('message_id', null);
  if (result.error) throw result.error;
}

export function createVoiceRecorder({ mediaDevices = navigator.mediaDevices, Recorder = globalThis.MediaRecorder, onTime = () => {}, onComplete, onError }) {
  let stream, recorder, timer, chunks = [], cancelled = false, generation = 0;
  function release() { clearInterval(timer); stream?.getTracks().forEach(track => track.stop()); stream = null; }
  async function start() {
    const version = ++generation;
    if (!Recorder || !mediaDevices?.getUserMedia) throw new Error('Voice recording is unavailable in this browser. You can attach an audio file instead.');
    cancelled = false;
    stream = await mediaDevices.getUserMedia({ audio: true });
    if (generation !== version) { release(); return; }
    try {
      const mimeType = ['audio/webm;codecs=opus','audio/mp4','audio/ogg;codecs=opus'].find(type => Recorder.isTypeSupported(type));
      if (!mimeType) throw new Error('No supported audio recording format is available.');
      recorder = new Recorder(stream, { mimeType, audioBitsPerSecond: 64000 });
      chunks = [];
      recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
      recorder.onerror = event => { cancelled = true; release(); onError(event.error || new Error('Recording failed.')); };
      recorder.onstop = () => {
        release();
        if (cancelled || generation !== version) return;
        const type = recorder.mimeType.split(';')[0], ext = type.split('/')[1];
        onComplete(new File(chunks, `Voice message.${ext}`, { type }));
      };
      recorder.start(1000);
      const started = Date.now();
      timer = setInterval(() => { const seconds = Math.floor((Date.now() - started) / 1000); onTime(seconds); if (seconds >= 300) stop(); }, 500);
    } catch (error) { release(); throw error; }
  }
  function stop() { if (recorder?.state === 'recording') recorder.stop(); else { generation++; cancelled = true; release(); } }
  function cancel() { cancelled = true; generation++; stop(); }
  return { start, stop, cancel };
}
