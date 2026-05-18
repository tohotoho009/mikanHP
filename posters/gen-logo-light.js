const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

// Canvas APIでピクセル単位処理:
// 元画像の輝度範囲をレベル補正してから
// 暗部(文字) → インク色 #1a1510, 明部(背景) → キャンバス色 #f7f3ec にマッピング
(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  // Nodeでファイル読み込み→base64で渡す（file://のCORSタント問題を回避）
  const logoBuffer = fs.readFileSync(path.resolve(__dirname, '../images/mikan-logo.jpg'));
  const logoDataUrl = 'data:image/jpeg;base64,' + logoBuffer.toString('base64');

  const pngBase64 = await page.evaluate(async (dataUrl) => {
    const img = await new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error('load failed'));
      i.src = dataUrl;
    });

    const w = img.naturalWidth, h = img.naturalHeight;

    // 元ピクセルを取得
    const tmp = document.createElement('canvas');
    tmp.width = w; tmp.height = h;
    const tctx = tmp.getContext('2d');
    tctx.drawImage(img, 0, 0);
    const src = tctx.getImageData(0, 0, w, h).data;

    // キャンバス色: #f7f3ec = (247,243,236)
    // インク色:     #1a1510 = (26,21,16)
    const [cr, cg, cb] = [247, 243, 236];
    const [ir, ig, ib] = [26, 21, 16];

    // 元画像は「白文字・暗背景」。閾値で背景/文字を分離してマッピング
    // bgThreshold以下 → 確実にキャンバス色, textThreshold以上 → 確実にインク色
    const bgThreshold   = 100;
    const textThreshold = 210;
    const range = textThreshold - bgThreshold;

    const out = document.createElement('canvas');
    out.width = w; out.height = h;
    const octx = out.getContext('2d');
    const od = octx.createImageData(w, h);
    const d = od.data;

    for (let i = 0; i < src.length; i += 4) {
      const L = 0.299 * src[i] + 0.587 * src[i + 1] + 0.114 * src[i + 2];
      // t: 0=背景(暗→キャンバス色), 1=文字(明→インク色)
      const t = Math.max(0, Math.min(1, (L - bgThreshold) / range));
      d[i]     = Math.round(cr + (ir - cr) * t);
      d[i + 1] = Math.round(cg + (ig - cg) * t);
      d[i + 2] = Math.round(cb + (ib - cb) * t);
      d[i + 3] = 255;
    }

    octx.putImageData(od, 0, 0);
    return out.toDataURL('image/png').split(',')[1];
  }, logoDataUrl);

  const output = path.resolve(__dirname, '../images/mikan-logo-light.png');
  fs.writeFileSync(output, Buffer.from(pngBase64, 'base64'));

  await browser.close();
  console.log('Generated: images/mikan-logo-light.png');
})();
