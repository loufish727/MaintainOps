const assert = require('node:assert/strict');
const { crc32 } = require('node:zlib');

(async () => {
  const { prepareAttachments, ATTACHMENT_LIMITS: limits, safeAttachmentName, attachmentType } = await import('../../src/services/attachmentFiles.mjs');
  const { ZipWriter, BlobWriter, BlobReader } = await import('@zip.js/zip.js');
  assert.equal(require('@zip.js/zip.js/package.json').version, '2.17.0', 'Re-audit the ZIP API when upgrading');
  let passed = 0;
  async function test(name, run) {
    try { await run(); passed++; }
    catch (error) { error.message = `${name}: ${error.message}`; throw error; }
  }
  async function zip(entries, options = {}) {
    const writer = new ZipWriter(new BlobWriter('application/zip'), { useWebWorkers: false });
    for (const [name, body = '', extra = {}] of entries) {
      await writer.add(name, new BlobReader(new Blob([body])), { level: 6, dataDescriptor: false, ...options, ...extra });
    }
    return new File([await writer.close()], 'photos.zip', { type: 'application/x-zip-compressed' });
  }
  // Mutate only generated fixtures; offsets follow the ZIP central/local header layouts.
  async function mutate(file, change) {
    const bytes = Buffer.from(await file.arrayBuffer());
    const end = bytes.lastIndexOf(Buffer.from([80, 75, 5, 6]));
    assert.ok(end >= 0);
    const records = [];
    let central = bytes.readUInt32LE(end + 16);
    for (let i = 0; i < bytes.readUInt16LE(end + 10); i++) {
      assert.equal(bytes.readUInt32LE(central), 0x02014b50);
      const local = bytes.readUInt32LE(central + 42);
      records.push({ central, local, data: local + 30 + bytes.readUInt16LE(local + 26) + bytes.readUInt16LE(local + 28) });
      central += 46 + bytes.readUInt16LE(central + 28) + bytes.readUInt16LE(central + 30) + bytes.readUInt16LE(central + 32);
    }
    change(bytes, records, end);
    return new File([bytes], file.name);
  }
  const setSize = (bytes, record, value) => {
    bytes.writeUInt32LE(value, record.local + 22);
    bytes.writeUInt32LE(value, record.central + 24);
  };
  const raw = new File(['%PDF-1.4\nmanual'], 'manual.PDF', { type: 'application/octet-stream' });
  const textFile = name => new File(['service notes'], name);
  const rejectZip = async (file, message) => {
    const result = await prepareAttachments([file]);
    assert.equal(result.items.length, 0, JSON.stringify(result.issues));
    assert.equal(result.archives.length, 0, 'unsafe ZIP must not be offered intact');
    assert.match(result.issues.join('\n'), message);
    return result;
  };

  await test('extension and filename handling', async () => {
    for (const name of ['constructor', 'a.constructor', 'a.__proto__', 'toString', 'pdf', 'a.pdf.exe']) assert.equal(attachmentType(name), '');
    assert.equal(attachmentType('MANUAL.PDF'), 'application/pdf');
    for (const name of ['../a.txt', 'a\\b.txt', 'CON.txt', 'a.txt ', 'a\u202etxt.exe', 'C:a.txt', 'a?.txt', 'a|b.txt', 'LPT\u00b9.txt', 'a\0.txt', 'x'.repeat(241), '']) assert.throws(() => safeAttachmentName(name), undefined, name);
    const result = await prepareAttachments([raw, textFile('cafe\u0301.txt')]);
    assert.equal(result.items[0].type, 'application/pdf');
    assert.equal(result.items[0].file.name, 'manual.PDF');
    assert.equal(result.items[1].file.name, 'caf\u00e9.txt');
    assert.deepEqual(result.issues, []);
  });
  await test('type spoofing is explicit', async () => {
    for (const [name, body] of [['bad.heic', 'garbage'], ['bad.heif', 'garbage'], ['bad.doc', 'garbage'], ['bad.xls', 'garbage'], ['bad.gif', 'GIF8xx'], ['bad.webp', 'RIFFnotwebp'], ['bad.png', 'bad'], ['bad.jpg', 'bad'], ['bad.pdf', 'bad'], ['bad.txt', 'MZ executable'], ['bad.csv', '\0binary'], ['bad.zip', 'garbage'], ['bad.zip', 'MZ executable']]) {
      const result = await prepareAttachments([new File([body], name)]);
      assert.equal(result.items.length + result.archives.length, 0, name);
      assert.ok(result.issues.length, name);
    }
    const result = await prepareAttachments([new File(['<script>bad</script>'], 'attack.html'), new File([], 'empty.txt')]);
    assert.equal(result.items.length, 0);
    assert.match(result.issues.join(), /Unsupported.*empty/i);
  });
  await test('image routing preserves originals for downstream optimization', async () => {
    const heic = Buffer.alloc(24); heic.writeUInt32BE(24); heic.write('ftyp', 4); heic.write('mif1', 8); heic.write('heic', 16);
    const image = new File([Buffer.from([255, 216, 255]), new Uint8Array(limits.file)], 'large.jpg');
    const result = await prepareAttachments([image, new File([heic], 'photo.heic')]);
    assert.deepEqual(result.issues, []);
    assert.equal(result.items[0].file.size, limits.file + 3);
    assert.equal(result.items[1].type, 'image/heic');
    const archived = await prepareAttachments([await zip([['large.jpg', image]])]);
    assert.equal(archived.items[0].file.size, image.size);
    assert.deepEqual(archived.issues, []);
  });
  await test('documents retain the exact 25 MB boundary', async () => {
    const document = new File([new Uint8Array(limits.file).fill(65)], 'notes.txt');
    const result = await prepareAttachments([document, new File([document, 'x'], 'too-large.txt')]);
    assert.equal(result.items[0].file.size, limits.file);
    assert.equal(result.items.length, 1);
    assert.match(result.issues.join(), /25 MB/);
  });
  await test('stored, deflated, descriptor and ZIP64 archives', async () => {
    for (const options of [{ level: 0 }, { level: 6 }, { dataDescriptor: true }, { zip64: true }]) {
      const result = await prepareAttachments([await zip([['folder/', '', { directory: true }], ['folder/manual.pdf', '%PDF-1.4\nmanual'], ['notes.txt', 'service notes']], options)]);
      assert.deepEqual(result.issues, [], JSON.stringify(options));
      assert.equal(result.items.length, 2);
      assert.equal(await result.items[1].file.text(), 'service notes');
      assert.equal(result.archives.length, 0);
    }
  });
  await test('Office containers cannot be arbitrary renamed ZIPs', async () => {
    for (const [extension, main] of [['docx', 'word/document.xml'], ['xlsx', 'xl/workbook.xml']]) {
      const content = await zip([['[Content_Types].xml', '<Types/>'], [main, '<root/>']]);
      const result = await prepareAttachments([new File([content], `document.${extension}`)]);
      assert.equal(result.items.length, 1, result.issues.join());
      assert.match(result.items[0].type, /openxmlformats/);
    }
    const disguised = new File([await zip([['ordinary.txt', 'no Office content']])], 'fake.docx');
    const result = await prepareAttachments([disguised, new File([await zip([['plain.txt', 'x']])], 'fake.txt')]);
    assert.equal(result.items.length, 0);
    assert.match(result.issues.join(), /Office.*text/);
  });
  await test('unsupported, nested and system files are reported', async () => {
    const result = await prepareAttachments([await zip([['bad.exe', 'MZ...'], ['nested.zip', await zip([])], ['__MACOSX/._photo.jpg', 'metadata'], ['good.txt', 'hello'], ['fake.jpg', 'not an image']])]);
    assert.equal(result.items.length, 1);
    assert.equal(result.archives.length, 0);
    assert.match(result.issues.join(), /unsupported.*nested ZIP.*metadata omitted.*JPEG/);
  });
  await test('AES and ZipCrypto fallback is an opt-in candidate only', async () => {
    for (const options of [{ password: 'fixture-password' }, { password: 'fixture-password', zipCrypto: true }, { password: 'fixture-password', dataDescriptor: true }]) {
      const result = await prepareAttachments([await zip([['secret.txt', 'hello']], options)]);
      assert.equal(result.items.length, 0);
      assert.equal(result.archives.length, 1, result.issues.join());
      assert.match(result.archives[0].source, /unverified/);
      assert.match(result.issues.join(), /password-protected/i);
    }
  });
  await test('encryption does not hide later unsafe entries', async () => {
    for (const name of ['../outside.txt', 'a\\bad.txt', 'CON.txt', '/root.txt', 'bad./entry.txt']) {
      await rejectZip(await zip([['secret.txt', 'hello', { password: 'fixture-password' }], [name, 'bad']]), /Unsafe|Reserved/i);
    }
    await rejectZip(await zip([['secret.txt', 'x', { password: 'fixture-password' }], ['bad.exe', 'MZ']]), /unsupported/);
    await rejectZip(await zip([['secret.txt', 'x', { password: 'fixture-password' }], ['nested.zip', 'PK']]), /nested ZIP/);
  });
  await test('directory traversal and symlinks cannot be skipped', async () => {
    await rejectZip(await zip([['../', '', { directory: true }], ['good.txt', 'hello']]), /Unsafe/);
    for (const [name, options] of [['link.txt', { unixMode: 0o120777 }], ['pipe.txt', { unixMode: 0o010644 }]]) {
      await rejectZip(await zip([[name, 'target', options], ['normal.txt', 'ok']]), /non-regular/);
    }
    await rejectZip(await mutate(await zip([['link/', '', { directory: true }]]), (bytes, [record]) => {
      bytes.writeUInt32LE((0o120777 * 65536) + 16, record.central + 38);
    }), /non-regular/);
    const result = await prepareAttachments([await zip([['permission-only.txt', 'okay', { unixMode: 0o644 }]])]);
    assert.equal(result.items.length, 1, result.issues.join());
  });
  await test('duplicate and Unicode-equivalent paths are rejected', async () => {
    for (const names of [['A.txt', 'a.txt'], ['cafe\u0301.txt', 'caf\u00e9.txt']]) await rejectZip(await zip(names.map(name => [name, 'hello'])), /duplicate|ambiguous/i);
  });
  await test('corrupt CRC discards the archive atomically', async () => {
    const corrupt = await mutate(await zip([['first.txt', 'good'], ['bad.txt', 'bad payload']], { level: 0 }), (bytes, entries) => { bytes[entries[1].data] ^= 1; });
    const result = await prepareAttachments([corrupt, raw]);
    assert.equal(result.items.length, 1);
    assert.equal(result.items[0].file.name, raw.name);
    assert.equal(result.archives.length, 1, result.issues.join());
    assert.match(result.issues.join(), /CRC32/);
    const unsafe = await mutate(await zip([['bad.txt', 'ordinary text'], ['fake.jpg', 'not a photo']], { level: 0 }), (bytes, [record]) => { bytes[record.data] ^= 1; });
    await rejectZip(unsafe, /CRC32.*JPEG/s);
  });
  await test('size lies never qualify as corrupt-original fallback', async () => {
    for (const level of [0, 6]) {
      const original = await zip([['bomb.txt', 'x'.repeat(128 * 1024)]], { level });
      for (const declared of [0, 1, 128 * 1024 - 1, 128 * 1024 + 1]) {
        await rejectZip(await mutate(original, (bytes, [record]) => setSize(bytes, record, declared)), /size|CRC|compressed/i);
      }
    }
  });
  await test('declared per-file and expanded-batch limits fail closed', async () => {
    const seed = await zip([['huge.txt', 'x']]);
    await rejectZip(await mutate(seed, (bytes, [record]) => setSize(bytes, record, limits.file + 1)), /25 MB/);
    const declared = await mutate(await zip([['big.txt', 'x']], { password: 'fixture-password' }), (bytes, [record]) => setSize(bytes, record, limits.file));
    const result = await prepareAttachments(Array(5).fill(declared));
    assert.equal(result.items.length, 0);
    assert.equal(result.archives.length, 4, result.issues.join());
    assert.match(result.issues.join(), /100 MB/);
  });
  await test('local header contradictions and directory overlap fail closed', async () => {
    const seed = await zip([['good.txt', 'hello']], { level: 0 });
    await rejectZip(await mutate(seed, (bytes, [record]) => { bytes[record.local + 30] = 88; }), /Ambiguous|filename/i);
    await rejectZip(await mutate(seed, (bytes, [record]) => { bytes.writeUInt32LE(6, record.central + 24); }), /Ambiguous|size/i);
    await rejectZip(await mutate(seed, (bytes, [record]) => {
      bytes.writeUInt32LE(64, record.local + 18); bytes.writeUInt32LE(64, record.central + 20);
      setSize(bytes, record, 64);
    }), /overlap|bounds/i);
    await rejectZip(await mutate(seed, (bytes, records, end) => { bytes.writeUInt32LE(0xffffffff, end + 12); }), /bounds|format|central|Zip64/i);
  });
  await test('overlapping entries are rejected before extraction', async () => {
    const inner = await zip([['other.txt', 'hello']], { level: 0 });
    const seed = await zip([['first.bin', inner], ['other.txt', 'hello']], { level: 0 });
    await rejectZip(await mutate(seed, (bytes, [first, second]) => {
      // A valid local header embedded in an omitted entry must still count as overlap.
      bytes.writeUInt32LE(first.data, second.central + 42);
    }), /overlap/i);
  });
  await test('hidden local records cannot survive in an original fallback', async () => {
    const seed = await zip([['secret.txt', 'hello', { password: 'fixture-password' }], ['hidden.txt', 'do not retain']]);
    const bytes = Buffer.from(await seed.arrayBuffer());
    const end = bytes.lastIndexOf(Buffer.from([80, 75, 5, 6]));
    const central = bytes.readUInt32LE(end + 16);
    const firstLength = 46 + bytes.readUInt16LE(central + 28) + bytes.readUInt16LE(central + 30) + bytes.readUInt16LE(central + 32);
    const shortened = Buffer.concat([bytes.subarray(0, central + firstLength), bytes.subarray(end)]);
    const newEnd = central + firstLength;
    shortened.writeUInt16LE(1, newEnd + 8); shortened.writeUInt16LE(1, newEnd + 10);
    shortened.writeUInt32LE(firstLength, newEnd + 12);
    await rejectZip(new File([shortened], 'hidden.zip'), /unreferenced/);
  });
  await test('local Unicode extra fields cannot hide traversal', async () => {
    const unicodePath = Buffer.concat([Buffer.alloc(5), Buffer.from('../bad.txt')]);
    unicodePath[0] = 1; unicodePath.writeUInt32LE(crc32(Buffer.from('secret.txt')), 1);
    const seed = await zip([['secret.txt', 'hello']], { password: 'fixture-password', extraField: new Map([[0xffff, unicodePath]]) });
    const file = await mutate(seed, (bytes, [record]) => {
      for (const offset of [record.local + 6, record.central + 8]) bytes.writeUInt16LE(bytes.readUInt16LE(offset) & ~0x800, offset);
      const end = record.data;
      let extra = record.local + 30 + bytes.readUInt16LE(record.local + 26);
      while (extra + 4 <= end && bytes.readUInt16LE(extra) !== 0xffff) extra += 4 + bytes.readUInt16LE(extra + 2);
      assert.ok(extra + 4 <= end);
      bytes.writeUInt16LE(0x7075, extra);
    });
    await rejectZip(file, /Unsafe/);
  });
  await test('malformed extra fields and data descriptors fail closed', async () => {
    const extra = await zip([['secret.txt', 'hello']], { password: 'fixture-password', extraField: new Map([[0xffff, new Uint8Array(1)]]) });
    await rejectZip(await mutate(extra, (bytes, [record]) => {
      const end = record.central + 46 + bytes.readUInt16LE(record.central + 28) + bytes.readUInt16LE(record.central + 30);
      bytes.writeUInt16LE(0xffff, end - 3);
    }), /malformed/i);
    const descriptor = await zip([['secret.txt', 'hello']], { password: 'fixture-password', dataDescriptor: true });
    await rejectZip(await mutate(descriptor, (bytes, [record]) => {
      const offset = record.data + bytes.readUInt32LE(record.central + 20);
      assert.equal(bytes.readUInt32LE(offset), 0x08074b50);
      bytes.writeUInt32LE(999, offset + 12);
    }), /descriptor|overlap/);
  });
  await test('unsupported compression is explicit, never passed through', async () => {
    const result = await prepareAttachments([await mutate(await zip([['notes.txt', 'text']]), (bytes, [record]) => {
      bytes.writeUInt16LE(12, record.local + 8); bytes.writeUInt16LE(12, record.central + 10);
    })]);
    assert.equal(result.items.length + result.archives.length, 0);
    assert.match(result.issues.join(), /unsupported ZIP compression/);
  });
  await test('unreadable directories and appended content cannot bypass safety', async () => {
    const valid = await zip([['good.txt', 'hello']]);
    await rejectZip(new File([valid.slice(0, valid.size - 22)], 'truncated.zip'), /central directory/i);
    await rejectZip(new File([valid, 'payload'], 'appended.zip'), /Ambiguous|appended/i);
    await rejectZip(new File(['MZ', valid], 'executable.zip'), /Executable/);
  });
  await test('50-file cap includes opt-in originals and rolls back rejected archives', async () => {
    await assert.rejects(prepareAttachments(Array(51).fill(raw)), /50 files/);
    const fifty = await zip(Array.from({ length: 50 }, (_, i) => [`${i}.txt`, 'x']));
    const encrypted = await zip([['secret.txt', 'x']], { password: 'fixture-password' });
    const result = await prepareAttachments([encrypted, fifty, raw]);
    assert.equal(result.archives.length, 1);
    assert.equal(result.items.length, 1);
    assert.equal(result.items[0].file.name, raw.name);
    assert.match(result.issues.join(), /50 files/);
    await rejectZip(await zip(Array.from({ length: 51 }, (_, i) => [`${i}.txt`, 'x'])), /50 files/);
    const accepted = await prepareAttachments([fifty, encrypted]);
    assert.equal(accepted.items.length, 50);
    assert.equal(accepted.archives.length, 0);
  });
  await test('200-entry cap includes directories and all archives', async () => {
    const dirs = length => Array.from({ length }, (_, i) => [`dir${i}/`, '', { directory: true }]);
    const atLimit = await prepareAttachments([await zip(dirs(200))]);
    assert.match(atLimit.issues.join(), /empty/);
    await rejectZip(await zip(dirs(201)), /200/);
    const result = await prepareAttachments([await zip(dirs(101)), await zip(dirs(100))]);
    assert.equal(result.items.length + result.archives.length, 0);
    assert.match(result.issues.join(), /200/);
  });
  await test('empty ZIP reports its outcome', async () => {
    const result = await prepareAttachments([await zip([])]);
    assert.equal(result.items.length + result.archives.length, 0);
    assert.match(result.issues.join(), /empty/);
  });
  await test('100 MB actual expansion is allowed, the next byte is not', async () => {
    const block = new Blob([new Uint8Array(1024 * 1024)]);
    const photo = new Blob([Buffer.from([255, 216, 255]), ...Array(99).fill(block), block.slice(0, block.size - 3)]);
    assert.equal(photo.size, limits.expanded);
    const seed = await zip([['large.jpg', photo]]);
    const result = await prepareAttachments([seed]);
    assert.equal(result.items.length, 1, result.issues.join());
    assert.equal(result.items[0].file.size, limits.expanded);
    assert.deepEqual(result.issues, []);
    await rejectZip(await mutate(seed, (bytes, [record]) => setSize(bytes, record, limits.expanded + 1)), /100 MB/);
    const combined = await prepareAttachments([seed, await zip([['next.txt', 'x']])]);
    assert.equal(combined.items.length, 1);
    assert.match(combined.issues.join(), /100 MB/);
  });
  await test('cancellation propagates instead of becoming an issue or fallback', async () => {
    await assert.rejects(prepareAttachments([raw], { signal: AbortSignal.abort() }), { name: 'AbortError' });
    const seed = await zip([['large.txt', 'x'.repeat(2 * 1024 * 1024)]]);
    for (const stage of ['Reading', 'Unpacking']) {
      const controller = new AbortController();
      await assert.rejects(prepareAttachments([seed, raw], { signal: controller.signal, onProgress: message => { if (message.startsWith(stage)) controller.abort(); } }), { name: 'AbortError' });
    }
    const controller = new AbortController();
    let timer;
    try {
      await assert.rejects(prepareAttachments([seed], { signal: controller.signal, onProgress: message => {
        if (message.startsWith('Unpacking')) timer = setTimeout(() => controller.abort(), 0);
      } }), { name: 'AbortError' });
    } finally { clearTimeout(timer); }
    const duringRead = new AbortController();
    let reads = 0;
    class AbortingFile extends File {
      async arrayBuffer() {
        const bytes = await super.arrayBuffer();
        if (++reads === 2) duringRead.abort();
        return bytes;
      }
      slice(...args) {
        const blob = super.slice(...args);
        const read = blob.arrayBuffer.bind(blob);
        blob.arrayBuffer = async () => {
          const bytes = await read();
          if (++reads === 2) duringRead.abort();
          return bytes;
        };
        return blob;
      }
    }
    await assert.rejects(prepareAttachments([new AbortingFile([seed], 'reading.zip')], { signal: duringRead.signal }), { name: 'AbortError' });
    assert.equal(reads, 2, 'metadata enumeration stops immediately after an aborted read');
  });
  console.log(`attachment files smoke passed: ${passed} generated-fixture groups (zip.js 2.17.0, no live data)`);
})().catch(error => { console.error(error); process.exitCode = 1; });
