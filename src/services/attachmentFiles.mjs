import { BlobReader, ZipReader, ERR_INVALID_CRC32, ERR_INVALID_COMPRESSED_DATA } from '@zip.js/zip.js';

export const ATTACHMENT_LIMITS = Object.freeze({ file: 25 * 1024 * 1024, expanded: 100 * 1024 * 1024, files: 50, entries: 200 });
const types = Object.freeze({ jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif', heic: 'image/heic', heif: 'image/heif', pdf: 'application/pdf', txt: 'text/plain', csv: 'text/csv', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', xls: 'application/vnd.ms-excel', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', zip: 'application/zip' });
export const ATTACHMENT_ACCEPT = Object.keys(types).map(type => `.${type}`).join(',');
const zipOptions = Object.freeze({ useWebWorkers: false, strictness: 'strict', checkCrc32: true, checkLocalDirectory: true, checkLocalFilename: true });

export function attachmentType(name) {
  const extension = /\.([^.]+)$/.exec(String(name))?.[1].toLowerCase();
  return Object.hasOwn(types, extension) ? types[extension] : '';
}

export function safeAttachmentName(name) {
  const value = String(name).normalize('NFC');
  if (!value || new TextEncoder().encode(value).length > 240 || /[\x00-\x1f\x7f-\x9f\u202a-\u202e\u2066-\u2069]/.test(value) || /[\\/:<>"|?*]/.test(value) || /[. ]$/.test(value)) throw new Error('Unsafe filename.');
  if (/^(con|prn|aux|nul|com[0-9\u00b9\u00b2\u00b3]|lpt[0-9\u00b9\u00b2\u00b3])(?:\.|$)/i.test(value)) throw new Error('Reserved filename.');
  return value;
}

function archiveName(path, directory) {
  if (path.length > 1024 || /[\\:\x00-\x1f]/.test(path) || path.startsWith('/')) throw new Error('Unsafe archive path.');
  const parts = (directory && path.endsWith('/') ? path.slice(0, -1) : path).split('/');
  if (parts.some(part => !part || part === '.' || part === '..')) throw new Error('Unsafe archive path.');
  return parts.map(safeAttachmentName).at(-1);
}

function checkAbort(signal) {
  if (signal?.aborted) throw new DOMException('Attachment preparation cancelled.', 'AbortError');
}

function openZip(file, signal) {
  // 2.17's directory iterator does not observe signal; guard its bounded Blob reads too.
  const source = new BlobReader(file);
  const read = source.readUint8Array.bind(source);
  source.readUint8Array = async (offset, length) => {
    checkAbort(signal);
    if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(length) || offset < 0 || length < 0 || offset + length > file.size) throw new Error('ZIP data is out of bounds.');
    const bytes = await read(offset, length);
    checkAbort(signal);
    return bytes;
  };
  return new ZipReader(source, zipOptions);
}

async function inspectFile(file, signal) {
  checkAbort(signal);
  const name = safeAttachmentName(file.name);
  const type = attachmentType(name);
  if (!type) throw new Error('Unsupported file type.');
  if (!Number.isSafeInteger(file.size) || file.size <= 0) throw new Error('This file is empty or has an invalid size.');
  if (file.size > (type.startsWith('image/') ? ATTACHMENT_LIMITS.expanded : ATTACHMENT_LIMITS.file)) throw new Error(type.startsWith('image/') ? 'Photos must be 100 MB or smaller before optimization.' : 'Documents and ZIPs must be 25 MB or smaller.');
  const bytes = new Uint8Array(await file.slice(0, 512).arrayBuffer());
  checkAbort(signal);
  const starts = (...values) => values.every((value, i) => bytes[i] === value);
  const ascii = (start, end) => String.fromCharCode(...bytes.subarray(start, end));
  const zip = starts(80, 75, 3, 4) || starts(80, 75, 5, 6) || starts(80, 75, 6, 6);
  if (starts(0x4d, 0x5a) || starts(0x7f, 0x45, 0x4c, 0x46)) throw new Error('Executable files are not supported.');
  if (type === 'image/jpeg' && !starts(0xff, 0xd8, 0xff)) throw new Error('File contents do not match a JPEG photo.');
  if (type === 'image/png' && !starts(137, 80, 78, 71, 13, 10, 26, 10)) throw new Error('File contents do not match a PNG photo.');
  if (type === 'image/gif' && !['GIF87a', 'GIF89a'].includes(ascii(0, 6))) throw new Error('File contents do not match a GIF photo.');
  if (type === 'image/webp' && !(ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP')) throw new Error('File contents do not match a WebP photo.');
  if (type === 'image/heic' || type === 'image/heif') {
    const boxSize = bytes.length >= 16 ? new DataView(bytes.buffer).getUint32(0) : 0;
    const brands = [ascii(8, 12)];
    for (let i = 16; i + 4 <= Math.min(boxSize, bytes.length); i += 4) brands.push(ascii(i, i + 4));
    const allowed = type === 'image/heic' ? ['heic', 'heix', 'hevc', 'hevx'] : ['heic', 'heix', 'hevc', 'hevx', 'mif1', 'msf1'];
    if (ascii(4, 8) !== 'ftyp' || boxSize < 16 || boxSize > file.size || !brands.some(brand => allowed.includes(brand))) throw new Error('File contents do not match a HEIC/HEIF photo.');
  }
  if (type === 'application/pdf' && !starts(37, 80, 68, 70, 45)) throw new Error('File contents do not match a PDF.');
  if (['application/msword', 'application/vnd.ms-excel'].includes(type) && !starts(0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1)) throw new Error('File contents do not match a legacy Office document.');
  if (type === 'application/zip' && !zip) throw new Error('File contents do not match a ZIP archive.');
  if (/openxmlformats/.test(type)) {
    if (!zip) throw new Error('File contents do not match an Office document.');
    const reader = openZip(file, signal);
    try {
      const entries = await inspectEntries(reader, { entries: 0, expanded: 0 }, signal);
      const names = new Set(entries.filter(({ entry }) => !entry.directory && !entry.encrypted).map(({ entry }) => entry.filename));
      const main = type.includes('wordprocessingml') ? 'word/document.xml' : 'xl/workbook.xml';
      if (entries.some(({ entry }) => entry.encrypted) || !names.has('[Content_Types].xml') || !names.has(main)) throw new Error('File contents do not match an unencrypted Office document.');
    } finally { await reader.close(); }
  }
  if (type.startsWith('text/') && (zip || bytes.some(byte => byte === 0 || byte < 9 || (byte > 13 && byte < 32)))) throw new Error('File contents do not match a text document.');
  return { name, type };
}

async function inspectEntries(reader, budget, signal) {
  const entries = [];
  const names = new Set();
  // Reserve declared bytes even for omitted/encrypted files and failed archives. Never refund work.
  for await (const entry of reader.getEntriesGenerator()) {
    checkAbort(signal);
    if (++budget.entries > ATTACHMENT_LIMITS.entries) throw new Error('ZIPs contain too many entries (maximum 200 per batch).');
    const name = archiveName(entry.filename, entry.directory);
    if (entry.extraFieldUnicodePath?.filename !== undefined) archiveName(entry.extraFieldUnicodePath.filename, entry.directory);
    const invalidMode = mode => (mode & 0xf000) && (mode & 0xf000) !== (entry.directory ? 0x4000 : 0x8000);
    if (entry.symlink || invalidMode(entry.unixMode) || invalidMode(entry.unixExternalUpper)) throw new Error('ZIP contains a non-regular file.');
    const path = entry.filename.normalize('NFC').toLowerCase().replace(/\/$/, '');
    if (names.has(path)) throw new Error('ZIP contains duplicate or ambiguous filenames.');
    names.add(path);
    const limit = attachmentType(name).startsWith('image/') ? ATTACHMENT_LIMITS.expanded : ATTACHMENT_LIMITS.file;
    if (!Number.isSafeInteger(entry.uncompressedSize) || entry.uncompressedSize < 0 || entry.uncompressedSize > limit) throw new Error(`A ZIP entry exceeds the ${limit === ATTACHMENT_LIMITS.file ? 25 : 100} MB extraction limit.`);
    if (!Number.isSafeInteger(entry.compressedSize) || entry.compressedSize < 0 || !Number.isSafeInteger(entry.offset) || entry.offset < 0) throw new Error('Invalid ZIP entry size or offset.');
    if (entry.directory && entry.uncompressedSize !== 0) throw new Error('ZIP directory contains file data.');
    if (budget.expanded + entry.uncompressedSize > ATTACHMENT_LIMITS.expanded) throw new Error('ZIP contents exceed the 100 MB batch extraction limit.');
    budget.expanded += entry.uncompressedSize;
    entries.push({ entry, name });
  }
  if (reader.warnings?.some(warning => warning.reason === 'malformed extra field' || warning.reason === 'compressed patched data')) throw new Error('ZIP contains unsupported or malformed metadata.');
  const ranges = [];
  for (const { entry } of entries) {
    checkAbort(signal);
    // passThrough permits the local-header/overlap check even for encrypted or unsupported entries.
    await entry.getData(undefined, { signal, passThrough: true, checkOverlappingEntryOnly: true });
    const local = entry.localDirectory;
    const descriptorSize = local.dataDescriptor ? (entry.extraFieldZip64 || local.extraFieldZip64 ? 20 : 12) + (local.dataDescriptor.signature ? 4 : 0) : 0;
    const end = local.dataOffset + entry.compressedSize + descriptorSize;
    if (end > reader.directoryOffset || entry.offset >= reader.directoryOffset) throw new Error('ZIP entry overlaps the central directory.');
    ranges.push({ start: entry.offset, end });
    if (local.extraFieldUnicodePath?.filename !== undefined) {
      archiveName(local.extraFieldUnicodePath.filename, entry.directory);
      if (local.extraFieldUnicodePath.filename.normalize('NFC') !== entry.filename.normalize('NFC')) throw new Error('ZIP contains ambiguous local filenames.');
    }
    if (local.rawBitFlag !== entry.rawBitFlag || (!local.bitFlag.dataDescriptor && (local.compressedSize !== entry.compressedSize || local.uncompressedSize !== entry.uncompressedSize))) throw new Error('ZIP local flags or sizes do not match its entry.');
    const localModeType = (local.unixMode || 0) & 0xf000;
    if (localModeType && localModeType !== (entry.directory ? 0x4000 : 0x8000)) throw new Error('ZIP contains a non-regular local file.');
    if (local.dataDescriptor && (local.dataDescriptor.compressedSize !== entry.compressedSize || local.dataDescriptor.uncompressedSize !== entry.uncompressedSize || (entry.crc32 !== undefined && local.dataDescriptor.crc32 !== entry.crc32))) throw new Error('ZIP data descriptor does not match its entry.');
    if (entry.warnings?.some(warning => warning.reason === 'malformed extra field')) throw new Error('ZIP contains malformed local metadata.');
  }
  // An original ZIP must not retain hidden local records absent from its central directory.
  let end = 0;
  for (const range of ranges.sort((a, b) => a.start - b.start)) {
    if (range.start !== end) throw new Error('ZIP contains unreferenced or overlapping entry data.');
    end = range.end;
  }
  if (end !== reader.directoryOffset) throw new Error('ZIP contains unreferenced entry data.');
  return entries;
}

const readyItem = (file, name, type, source = '') => ({ file: new File([file], name, { type }), source, type, state: 'ready', id: crypto.randomUUID() });

async function extractEntry(entry, name, signal, budget, checkCrc32 = true) {
  // Reserve each attempt, including CRC verification retries, against actual decoding work.
  if (budget.processed + entry.uncompressedSize > ATTACHMENT_LIMITS.expanded) throw new Error('ZIP contents exceed the 100 MB batch extraction limit.');
  budget.processed += entry.uncompressedSize;
  let size = 0;
  const chunks = [];
  await entry.getData(new WritableStream({ write(chunk) {
    checkAbort(signal);
    size += chunk.byteLength;
    if (size > entry.uncompressedSize || size > ATTACHMENT_LIMITS.expanded) throw new Error('Expanded ZIP exceeds its declared size or extraction limit.');
    // Blob snapshots do not retain decoder-owned backing buffers.
    chunks.push(new Blob([chunk]));
  } }), { signal, checkCrc32, useWebWorkers: false });
  checkAbort(signal);
  if (size !== entry.uncompressedSize) throw new Error('ZIP size verification failed.');
  return new File(chunks, name);
}

export async function prepareAttachments(files, { signal, onProgress = () => {} } = {}) {
  checkAbort(signal);
  files = Array.from(files);
  if (files.length > ATTACHMENT_LIMITS.files) throw new Error('Select up to 50 files at a time.');
  const items = [], issues = [], archives = [];
  const budget = { entries: 0, expanded: 0, processed: 0 };
  const checkCount = (extra = 1) => {
    if (items.length + archives.length + extra > ATTACHMENT_LIMITS.files) throw new Error('A batch can contain up to 50 files, including original ZIP choices.');
  };
  for (const file of files) {
    checkAbort(signal);
    onProgress(`Reading ${file.name}`);
    let reader;
    try {
      const { name, type } = await inspectFile(file, signal);
      if (type !== 'application/zip') {
        checkCount();
        items.push(readyItem(file, name, type));
        continue;
      }
      reader = openZip(file, signal);
      const entries = await inspectEntries(reader, budget, signal);
      const selected = [];
      let fallback = false, fallbackAllowed = true;
      for (const record of entries) {
        const { entry, name } = record;
        if (entry.directory) continue;
        const source = `${file.name} / ${entry.filename}`;
        const type = attachmentType(name);
        let omission = '';
        if (name.startsWith('._') || entry.filename.startsWith('__MACOSX/') || name === '.DS_Store') omission = 'system metadata omitted.';
        else if (type === 'application/zip') omission = 'nested ZIPs are not unpacked.';
        else if (!type) omission = 'unsupported file type.';
        else if (![0, 8].includes(entry.compressionMethod)) omission = 'unsupported ZIP compression method.';
        if (omission) {
          issues.push(`${source}: ${omission}`);
          fallbackAllowed = false;
        } else {
          selected.push({ ...record, source });
          if (entry.encrypted) { issues.push(`${source}: password-protected ZIP entry.`); fallback = true; }
        }
      }
      checkCount(selected.length);
      const prepared = [];
      for (const { entry, name, source } of selected) {
        checkAbort(signal);
        if (entry.encrypted) continue;
        onProgress(`Unpacking ${name}`);
        checkAbort(signal);
        let extracted, corrupt = false;
        try {
          extracted = await extractEntry(entry, name, signal, budget);
        } catch (error) {
          checkAbort(signal);
          // Exact library errors only. Size lies, ambiguous headers, resource failures and aborts never fall back.
          if (error.message !== ERR_INVALID_CRC32 && error.message !== ERR_INVALID_COMPRESSED_DATA) throw error;
          // Native gzip can report size lies as CRC errors. Recheck size and type without CRC before offering the original.
          extracted = await extractEntry(entry, name, signal, budget, false);
          issues.push(`${source}: corrupt ZIP entry (${error.message}).`);
          fallback = true;
          corrupt = true;
        }
        try {
          const detected = await inspectFile(extracted, signal);
          if (!corrupt) prepared.push(readyItem(extracted, detected.name, detected.type, source));
        } catch (error) {
          checkAbort(signal);
          fallbackAllowed = false;
          issues.push(`${source}: ${error.message}`);
        }
      }
      checkAbort(signal);
      if (fallback) {
        issues.push(`${file.name}: no files imported from this encrypted or corrupt ZIP.`);
        if (fallbackAllowed) {
          checkCount();
          archives.push(readyItem(file, name, type, 'Original ZIP (not unpacked; contents unverified)'));
        }
      } else items.push(...prepared);
      if (!entries.some(({ entry }) => !entry.directory)) issues.push(`${file.name}: ZIP is empty.`);
    } catch (error) {
      checkAbort(signal);
      issues.push(`${file.name}: ${error.message}`);
    } finally { if (reader) await reader.close(); }
  }
  checkAbort(signal);
  return { items, issues, archives };
}
