const assert = require('node:assert/strict');
(async () => {
  const { prepareMessageFile, sendMessageFiles, createVoiceRecorder } = await import('../../src/services/messageMedia.mjs');
  let optimized = false;
  const photo = await prepareMessageFile(new File(['raw'],'photo.png',{type:'image/png'}),async (file,options) => {
    assert.equal(options.passes[0].maxDimension,768); assert.equal(options.targetBytes,262144); optimized=true;
    return {blob:new Blob(['jpeg'],{type:'image/jpeg'}),fileName:'photo.jpg',contentType:'image/jpeg'};
  });
  assert.ok(optimized); assert.equal(photo.name,'photo.jpg');
  await assert.rejects(()=>prepareMessageFile(new File(['x'],'bad.html',{type:'text/html'})),/supported/);
  await assert.rejects(()=>prepareMessageFile(new File([new Uint8Array(26214401)],'big.pdf',{type:'application/pdf'})),/upload limit/);
  const calls=[]; let fail=true;
  const client={from:()=>({insert:async()=>{calls.push('reserve');return {};}}),storage:{from:()=>({upload:async()=>{calls.push('upload');return {};}})},rpc:async()=>{calls.push('commit');return fail?{error:new Error('lost response')}:{}}};
  const args={client,companyId:'company',userId:'user',threadId:'thread',messageId:'message',body:'photo',files:[photo]};
  await assert.rejects(()=>sendMessageFiles(args),/lost response/); fail=false; await sendMessageFiles(args);
  assert.deepEqual(calls,['reserve','upload','commit','commit']);
  await assert.rejects(()=>sendMessageFiles({...args,messageId:'changed'}),/Retry the original/);
  let stopped=0, completed=0, requested=0;
  class Recorder {
    static isTypeSupported(type){return type==='audio/mp4';}
    constructor(stream,options){this.mimeType=options.mimeType;this.state='inactive';}
    start(){this.state='recording';}
    stop(){this.state='inactive';this.ondataavailable({data:new Blob(['sound'])});this.onstop();}
  }
  const voice=createVoiceRecorder({mediaDevices:{getUserMedia:async()=>{requested++;return {getTracks:()=>[{stop:()=>stopped++}]};}},Recorder,onComplete:file=>{completed++;assert.equal(file.type,'audio/mp4');},onError:error=>{throw error;}});
  assert.equal(requested,0); await voice.start(); voice.stop(); assert.equal(completed,1);assert.equal(stopped,1);
  await voice.start(); voice.cancel(); assert.equal(completed,1);assert.equal(stopped,2);
  console.log('Message media PASS: optimization, limits, upload retry, lazy mic permission, MIME choice and cancellation.');
})().catch(error=>{console.error(error);process.exitCode=1;});
