const { test, expect } = require('@playwright/test');
const { createQa, nav, expandFor } = require('../helpers/appwide-qa');
test.setTimeout(240000);

for (const width of [1440, 390]) test(`automatic attachments and ZIP lifecycle at ${width}px`, async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser, request, testInfo);
  try {
    const asset = await qa.seed('assets', { location_id: qa.location, name: 'QA ZIP Press', created_by: qa.sessions.admin.user.id });
    const work = await qa.seed('work_orders', { location_id: qa.location, asset_id: asset.id, title: 'QA ZIP Work', created_by: qa.sessions.admin.user.id });
    const page = await qa.open('admin', 'work', width);
    expect(await page.evaluate(() => performance.getEntriesByType('resource').some(x => x.name.includes('attachmentFeature.')))).toBe(false);
    await page.getByRole('heading', { name: work.title, exact: true }).click();
    const form = page.locator('#photo-form'); await expandFor(form);
    const png = await page.evaluate(() => {
      const c = document.createElement('canvas'); c.width = 2048; c.height = 1024;
      const g = c.getContext('2d'); g.fillStyle = '#287557'; g.fillRect(0,0,c.width,c.height); g.fillStyle = '#fff'; g.font = '100px sans-serif'; g.fillText('ZIP QA',100,300);
      return c.toDataURL('image/png').split(',')[1];
    });
    const { ZipWriter, BlobWriter, BlobReader, TextReader } = await import('@zip.js/zip.js');
    const writer = new ZipWriter(new BlobWriter('application/zip'), { useWebWorkers: false });
    await writer.add('mandrel/slide.png', new BlobReader(new Blob([Buffer.from(png,'base64')])));
    for (let i = 0; i < 13; i++) await writer.add(`notes/manual-${i}.txt`,new TextReader(`Maintenance instructions ${i}`));
    const archive = Buffer.from(await (await writer.close()).arrayBuffer());
    await form.locator('[name=photo]').setInputFiles({ name:'slit1mandrel.zip',mimeType:'application/x-zip-compressed',buffer:archive });
    await form.locator('button[type=submit]').click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('button',{name:'Attach 14 files',exact:true})).toBeEnabled();
    await expect(dialog.locator('li')).toHaveCount(14);
    expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
    expect(await dialog.evaluate(el => el.matches(':modal'))).toBe(true);
    const bounds = await dialog.boundingBox();
    expect(bounds.y).toBeGreaterThanOrEqual(0);
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(page.viewportSize().height);
    const actions = await dialog.getByRole('button',{name:'Attach 14 files',exact:true}).boundingBox();
    expect(actions.y + actions.height).toBeLessThanOrEqual(page.viewportSize().height);
    await page.screenshot({path:require('path').join('lfes-evidence','appwide',`${qa.company}-review-viewport-${width}.png`)});
    await qa.shot(page,`zip-review-${width}`);
    // Fail one upload exactly once. The second click must not re-upload successful files.
    let failures = 0;
    await page.route('**/storage/v1/object/work-order-documents/**manual-1.txt', async route => {
      if (route.request().method() === 'POST' && failures++ === 0) return route.fulfill({ status:500,contentType:'application/json',body:'{"message":"QA one-shot upload failure"}' });
      return route.continue();
    });
    await dialog.getByRole('button',{name:'Attach 14 files',exact:true}).click();
    await expect(dialog.getByRole('status')).toContainText('13 of 14 attached.',{timeout:60000});
    await dialog.getByRole('button',{name:'Attach 1 file',exact:true}).click();
    await expect(dialog.getByRole('status')).toContainText('14 of 14 attached.',{timeout:30000});
    await dialog.getByRole('button',{name:'Done',exact:true}).click();
    await page.qaSettle();
    const docs = () => qa.api('admin','GET',`work_order_documents?company_id=eq.${qa.company}&work_order_id=eq.${work.id}&select=*`);
    const photos = await qa.api('admin','GET',`work_order_photos?company_id=eq.${qa.company}&work_order_id=eq.${work.id}&select=*`);
    expect(photos).toHaveLength(1); expect(photos[0].file_size_bytes).toBeLessThan(256 * 1024);
    await expandFor(page.locator('[data-work-order-documents]'));
    await expect(page.locator('#work-order-photos-target img')).toBeVisible();
    await expect.poll(() => page.locator('#work-order-photos-target img').evaluate(img => img.naturalWidth)).toBe(768);
    expect(await docs()).toHaveLength(13);
    const documentPanel = page.locator('[data-work-order-documents]');
    await expect(documentPanel.locator('article')).toHaveCount(12);
    await documentPanel.getByRole('button',{name:'Next',exact:true}).click();
    await expect(documentPanel.locator('article')).toHaveCount(1);
    const downloadPromise = page.waitForEvent('download');
    await documentPanel.getByRole('button',{name:'Download file',exact:true}).click();
    const downloaded = await downloadPromise; expect(downloaded.suggestedFilename()).toMatch(/manual-\d+\.txt/);
    await documentPanel.getByRole('button',{name:'Delete file',exact:true}).click();
    await expect.poll(async () => (await docs()).length).toBe(12);
    const history = await qa.api('admin','GET',`work_order_events?company_id=eq.${qa.company}&work_order_id=eq.${work.id}&select=event_type`);
    expect(history.filter(x=>x.event_type==='file_uploaded')).toHaveLength(13);
    expect(history.filter(x=>x.event_type==='file_deleted')).toHaveLength(1);
    const usage = await qa.api('admin','POST','rpc/get_storage_dashboard',{target_company_id:qa.company});
    expect(usage.bucket_totals.some(x => x.bucket_id === 'work-order-documents' && x.file_count === 12)).toBe(true);
    expect(usage.photo_count).toBe(1);
    await qa.shot(page,`zip-attached-${width}`);

    await nav(page,'assets'); await page.locator(`[data-asset-id="${asset.id}"]`).click();
    const assetForm = page.locator(`[data-asset-document="${asset.id}"]`); await expandFor(assetForm);
    await expect(assetForm.locator('[name=document_type]')).toHaveCount(0);
    await assetForm.locator('[name=document]').setInputFiles([{name:'manual.pdf',mimeType:'',buffer:Buffer.from('%PDF-1.4\nQA manual')},{name:'front.png',mimeType:'image/png',buffer:Buffer.from(png,'base64')}]);
    await assetForm.locator('button[type=submit]').click();
    await page.getByRole('button',{name:'Attach 2 files',exact:true}).click();
    await expect(page.getByRole('dialog').getByRole('status')).toHaveText('2 of 2 attached.',{timeout:30000});
    await page.getByRole('button',{name:'Done',exact:true}).click();
    const assetDocs = await qa.api('admin','GET',`asset_documents?company_id=eq.${qa.company}&asset_id=eq.${asset.id}&select=document_type,content_type`);
    expect(assetDocs.some(x=>x.content_type==='application/pdf'&&x.document_type==='other')).toBe(true);
    expect(assetDocs.some(x=>x.content_type==='image/jpeg'&&x.document_type==='machine_photo')).toBe(true);

    const accounting = await qa.open('accounting','work',width);
    await accounting.getByRole('heading',{name:work.title,exact:true}).click();
    await expandFor(accounting.locator('[data-work-order-documents]'));
    await expect(accounting.locator('[data-work-order-documents] article')).toHaveCount(12);
    await expect(accounting.locator('#photo-form')).toHaveCount(0);
    await expect(accounting.locator('[data-work-order-documents]').getByRole('button',{name:'Delete file'})).toHaveCount(0);
    const denied = await qa.raw('accounting','POST','work_order_documents',{id:crypto.randomUUID(),company_id:qa.company,work_order_id:work.id,uploaded_by:qa.sessions.accounting.user.id,storage_path:'bad',file_name:'bad.txt',content_type:'text/plain',file_size_bytes:3});
    expect(denied.ok()).toBe(false);

    await nav(page,'work'); await page.getByRole('heading',{name:work.title,exact:true}).click();
    await expandFor(page.locator('[data-delete-work-order]'));
    await page.locator('[data-delete-work-order]').click();
    await page.locator('[data-confirm-delete-work-order]').click();
    await expect.poll(async () => (await docs()).length).toBe(0);
    await expect.poll(async () => {
      const objects = await request.post('https://fsxqrngpaseqdxijggcm.supabase.co/storage/v1/object/list/work-order-documents',{ headers:{apikey:process.env.LFES_SUPABASE_ANON_KEY,Authorization:`Bearer ${qa.sessions.admin.access_token}`},data:{prefix:`${qa.company}/${work.id}`,limit:100}});
      expect(objects.ok()).toBe(true);
      return objects.json();
    },{timeout:30000}).toEqual([]);
  } finally { await qa.finish(); }
});

test('new work, Quick Fix and Parts share automatic file handling', async ({ browser, request }, testInfo) => {
  const qa = await createQa(browser,request,testInfo);
  try {
    const part = await qa.seed('parts',{location_id:qa.location,name:'QA Auto Files Part',quantity_on_hand:1});
    const page = await qa.open('admin','work',390);
    await page.locator('.topbar-more:visible > summary').click();
    await page.locator('[data-command-action=create-work-order]:visible').click();
    const create = page.locator('#create-work-order-form');
    await create.locator('[name=title]').fill('QA New Files');
    await expandFor(create.locator('[name=photo]'));
    await create.locator('[name=photo]').setInputFiles({name:'work.pdf',mimeType:'application/pdf',buffer:Buffer.from('%PDF-1.4\nQA work')});
    await create.locator('button[type=submit]').click();
    await page.getByRole('button',{name:'Attach 1 file',exact:true}).click();
    await expect(page.getByRole('dialog').getByRole('status')).toHaveText('1 of 1 attached.',{timeout:30000});
    await page.getByRole('button',{name:'Done',exact:true}).click();
    await page.qaSettle();
    await page.locator('[data-command-action=quick-fix]:visible').click();
    const quick = page.locator('#quick-fix-form');
    await quick.locator('[name=title]').fill('QA Quick Files');
    const { ZipWriter,BlobWriter,TextReader } = await import('@zip.js/zip.js');
    const writer = new ZipWriter(new BlobWriter('application/zip'),{useWebWorkers:false});
    await writer.add('notes.txt',new TextReader('QA Quick notes'));
    await quick.locator('[name=photo]').setInputFiles({name:'quick.zip',mimeType:'application/zip',buffer:Buffer.from(await (await writer.close()).arrayBuffer())});
    await quick.locator('button[type=submit]').click();
    await page.getByRole('button',{name:'Attach 1 file',exact:true}).click();
    await expect(page.getByRole('dialog').getByRole('status')).toHaveText('1 of 1 attached.',{timeout:30000});
    await page.getByRole('button',{name:'Done',exact:true}).click();
    const records = await qa.api('admin','GET',`work_orders?company_id=eq.${qa.company}&select=id,title`);
    expect(records).toHaveLength(2);
    const documents = await qa.api('admin','GET',`work_order_documents?company_id=eq.${qa.company}&select=work_order_id,file_name`);
    expect(documents).toHaveLength(2);
    expect(new Set(documents.map(x=>x.work_order_id)).size).toBe(2);
    await nav(page,'parts'); await page.locator(`[data-open-part="${part.id}"]`).click();
    const partForm = page.locator(`[data-part-document="${part.id}"]`); await expandFor(partForm);
    await expect(partForm.locator('[name=document_type]')).toHaveCount(0);
    await partForm.locator('[name=document]').setInputFiles({name:'part.pdf',mimeType:'application/octet-stream',buffer:Buffer.from('%PDF-1.4\nQA part')});
    await partForm.locator('button[type=submit]').click();
    await page.getByRole('button',{name:'Attach 1 file',exact:true}).click();
    await expect(page.getByRole('dialog').getByRole('status')).toHaveText('1 of 1 attached.',{timeout:30000});
    await page.getByRole('button',{name:'Done',exact:true}).click();
    const files = await qa.api('admin','GET',`part_documents?company_id=eq.${qa.company}&part_id=eq.${part.id}&select=content_type,document_type`);
    expect(files).toEqual([{content_type:'application/pdf',document_type:'other'}]);
  } finally { await qa.finish(); }
});
