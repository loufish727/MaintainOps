const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');

async function setup(page) {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.setContent('<div class="message-tool-dialog"><h2>Voice message</h2><audio controls></audio></div>');
  await page.addStyleTag({path:path.join(root,'styles.css')});
  for (const file of ['messageStyles.css','messageTools.css']) await page.addStyleTag({ path:path.join(root,'src/render',file) });
  await page.addScriptTag({content:fs.readFileSync(path.join(root,'src/workflows/messageAudioPlayer.mjs'),'utf8').replace('export function','function')});
}

test('waveform transport uses decoded samples, supports seeking and disposes pending work', async ({page}) => {
  await setup(page);
  await page.evaluate(() => {
    const audio = document.querySelector('audio');
    const proof = window.audioProof = { decodes:0, plays:0, paused:true };
    Object.defineProperties(audio,{duration:{value:10},paused:{get:()=>proof.paused}});
    audio.play=async()=>{proof.paused=false;proof.plays++;audio.dispatchEvent(new Event('play'));};
    audio.pause=()=>{proof.paused=true;audio.dispatchEvent(new Event('pause'));};
    const samples=new Float32Array(8000); samples.fill(.8,4000);
    window.OfflineAudioContext=class { async decodeAudioData(){proof.decodes++;return {duration:10,length:samples.length,numberOfChannels:1,getChannelData:()=>samples};} };
    proof.dispose=enhanceMessageAudio({audio,blob:new Blob(['test']),documentRef:document});
  });
  await expect(page.locator('.message-audio-player')).toBeVisible();
  expect(await page.evaluate(()=>audioProof.plays)).toBe(0);
  const pixels=await page.locator('canvas').evaluate(canvas=>{
    const ctx=canvas.getContext('2d');
    return {silent:ctx.getImageData(2,10,1,1).data[3],loud:ctx.getImageData(762,20,1,1).data[3]};
  });
  expect(pixels).toEqual({silent:0,loud:255});
  await page.getByRole('button',{name:'Play recording'}).click();
  await expect(page.getByRole('button',{name:'Pause recording'})).toBeVisible();
  await page.getByRole('slider',{name:'Audio position'}).fill('5');
  await expect(page.locator('.message-audio-time')).toHaveText('0:05 / 0:10');
  await page.getByLabel('Playback speed').selectOption('1.5');
  expect(await page.locator('audio').evaluate(audio=>audio.playbackRate)).toBe(1.5);
  expect(await page.getByLabel('Playback speed').evaluate(node=>getComputedStyle(node).colorScheme)).toBe('light');
  const colors = await page.locator('canvas').evaluate(canvas => {
    const ctx = canvas.getContext('2d');
    return { played: [...ctx.getImageData(2,47,1,1).data], unplayed: [...ctx.getImageData(762,20,1,1).data] };
  });
  expect(colors).toEqual({played:[39,101,75,255],unplayed:[113,139,124,255]});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  fs.mkdirSync(path.join(root,'lfes-evidence'),{recursive:true});
  await page.screenshot({path:path.join(root,'lfes-evidence','messages-audio-320.png')});
  await page.evaluate(()=>audioProof.dispose());
  await expect(page.locator('.message-audio-player')).toHaveCount(0);
  expect(await page.evaluate(()=>audioProof.paused)).toBe(true);
  expect(await page.locator('audio').getAttribute('src')).toBeNull();
  await page.evaluate(()=>{
    window.OfflineAudioContext=class { decodeAudioData(){return new Promise(resolve=>audioProof.finish=resolve);} };
    audioProof.dispose=enhanceMessageAudio({audio:document.querySelector('audio'),blob:new Blob(['test']),documentRef:document});
  });
  await expect.poll(()=>page.evaluate(()=>Boolean(audioProof.finish))).toBe(true);
  await page.evaluate(()=>{audioProof.dispose();audioProof.finish({duration:10});});
  await expect(page.locator('.message-audio-player')).toHaveCount(0);
});

test('large, long and undecodable audio retain native controls', async ({page}) => {
  await setup(page);
  const result=await page.evaluate(async()=>{
    let decodes=0;
    window.OfflineAudioContext=class {async decodeAudioData(){decodes++;throw new Error('unsupported');}};
    const run=async(duration,size)=>{
      const audio=document.createElement('audio');audio.controls=true;document.body.append(audio);
      Object.defineProperty(audio,'duration',{value:duration});
      const dispose=enhanceMessageAudio({audio,blob:new Blob([new Uint8Array(size)]),documentRef:document});
      await new Promise(resolve=>setTimeout(resolve,20));
      const visible=!audio.hidden&&audio.controls;dispose();audio.remove();return visible;
    };
    const visible=[await run(301,100),await run(2,5*1024*1024+1),await run(2,100)];
    return {visible,decodes};
  });
  expect(result).toEqual({visible:[true,true,true],decodes:1});
});

test('real local PCM decoding never needs a remote service', async ({page,browserName}) => {
  await setup(page);
  const requests=[];page.on('request',request=>requests.push(request.url()));
  await page.evaluate(()=>{
    const frames=8000, data=new ArrayBuffer(44+frames*2),v=new DataView(data);
    const text=(offset,s)=>{for(let i=0;i<s.length;i++)v.setUint8(offset+i,s.charCodeAt(i));};
    text(0,'RIFF');v.setUint32(4,36+frames*2,true);text(8,'WAVE');text(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,8000,true);v.setUint32(28,16000,true);v.setUint16(32,2,true);v.setUint16(34,16,true);text(36,'data');v.setUint32(40,frames*2,true);
    for(let i=0;i<frames;i++)v.setInt16(44+i*2,Math.sin(i*.25)*12000*(i/frames),true);
    const blob=new Blob([data],{type:'audio/wav'}),audio=document.querySelector('audio');
    const url=URL.createObjectURL(blob);audio.src=url;
    const dispose=enhanceMessageAudio({audio,blob,documentRef:document});
    window.disposePCM=()=>{dispose();URL.revokeObjectURL(url);};
  });
  if(browserName==='chromium') await expect(page.locator('.message-audio-player')).toBeVisible();
  else await expect.poll(()=>page.locator('audio').evaluate(audio=>Boolean(audio.error)||audio.readyState>0)).toBe(true);
  expect(requests.filter(url=>/^https?:/.test(url))).toEqual([]);
  await page.evaluate(()=>disposePCM());
});
