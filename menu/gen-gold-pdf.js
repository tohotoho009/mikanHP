/**
 * E案: Canvas ピクセル描画で金箔和紙テクスチャを生成 → PDF出力
 *
 * 値ノイズ（Value Noise）+ FBM で有機的な金色パッチを描画。
 * 外部画像不要・完全自己完結。
 */
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// カードサイズ 119mm x 261mm を 150dpi 相当で
const TEX_W = 500;
const TEX_H = 1100;

async function generateTexture(browser) {
  const page = await browser.newPage();
  await page.setContent('<html><body></body></html>');

  const dataUrl = await page.evaluate((W, H) => {
    /* ── ノイズ関数 ── */
    function hash(x, y, s) {
      const n = Math.sin(x * 127.1 + y * 311.7 + s * 74.9) * 43758.5453;
      return n - Math.floor(n);
    }
    function lerp(a, b, t) { return a + (b - a) * t; }
    function smooth(t) { return t * t * (3 - 2 * t); }
    function vnoise(x, y, s) {
      const ix = Math.floor(x), iy = Math.floor(y);
      const fx = smooth(x - ix), fy = smooth(y - iy);
      return lerp(
        lerp(hash(ix, iy, s),     hash(ix + 1, iy, s),     fx),
        lerp(hash(ix, iy + 1, s), hash(ix + 1, iy + 1, s), fx),
        fy
      );
    }
    function fbm(x, y, oct, s) {
      let v = 0, a = 0.5, f = 1;
      for (let i = 0; i < oct; i++) { v += a * vnoise(x * f, y * f, s + i); a *= 0.5; f *= 2; }
      return v;
    }

    /* ── Canvas 描画 ── */
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    const img = ctx.createImageData(W, H);
    const d = img.data;

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const nx = x / W;
        const ny = y / H;

        // ノイズ座標（縦長カードに合わせ Y を引き伸ばす）
        const sx = nx * 3.2;
        const sy = ny * 6.8;

        // 金箔エリアを決める大きなノイズ
        const gold = fbm(sx, sy, 4, 42);

        // 右上に金を集める位置バイアス
        const bias = nx * 0.13 + (1 - ny) * 0.11;
        const thr  = 0.46 - bias;

        const i = (y * W + x) * 4;

        if (gold > thr) {
          /* ── 金箔エリア ── */
          // 二次ノイズで金属光沢の明暗変化
          const shine = fbm(sx * 6, sy * 5, 3, 17);
          const bri   = 0.58 + shine * 0.58; // 0.58 〜 1.16

          // 金色 base: R=215 G=168 B=46 (bri=1.0 時)
          d[i]     = Math.min(255, Math.round(215 * bri));
          d[i + 1] = Math.min(255, Math.round(168 * bri));
          d[i + 2] = Math.min(255, Math.round(46  * bri));

          // 境界をなだらかに
          const fade = Math.min(1, (gold - thr) / 0.05);
          d[i + 3] = Math.round(fade * 255);

        } else {
          /* ── 和紙エリア ── */
          // 細かい繊維感ノイズ
          const grain = fbm(sx * 24, sy * 22, 2, 7);
          const p     = 0.966 + grain * 0.034;

          // 白地に散らばる金の微粒子（金砂子）
          const speck = fbm(sx * 11, sy * 10, 2, 63);
          if (speck > 0.608) {
            const si  = Math.min(1, (speck - 0.608) / 0.07);
            const sbr = 0.72 + fbm(sx * 28, sy * 28, 1, 55) * 0.28;
            d[i]     = Math.round(lerp(245 * p, Math.min(255, 215 * sbr), si));
            d[i + 1] = Math.round(lerp(240 * p, Math.min(255, 168 * sbr), si));
            d[i + 2] = Math.round(lerp(229 * p, Math.min(255, 46  * sbr), si));
          } else {
            d[i]     = Math.round(245 * p);
            d[i + 1] = Math.round(240 * p);
            d[i + 2] = Math.round(229 * p);
          }
          d[i + 3] = 255;
        }
      }
    }

    ctx.putImageData(img, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.88);
  }, TEX_W, TEX_H);

  await page.close();
  return dataUrl;
}

function buildMenuHtml(textureDataUrl) {
  // 和紙ノイズ（細粒）を texture の上に重ねる
  const grainSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9 0.35' numOctaves='4' seed='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23g)' opacity='0.07'/%3E%3C/svg%3E";

  const pageStyle = `
    .page {
      width: 119mm;
      height: 261mm;
      background-color: #f5f0e5;
      background-image:
        url("${grainSvg}"),
        url("${textureDataUrl}");
      background-size: 180px 180px, 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      page-break-after: always;
      position: relative;
      overflow: hidden;
    }
    .page:last-child { page-break-after: avoid; }
    .card {
      width: 105mm;
      height: 247mm;
      border: 1px solid rgba(110,75,20,0.55);
      position: relative;
      padding: 12mm 10mm 12mm;
      display: flex;
      flex-direction: column;
      background: rgba(245,240,229,0.48);
    }`;

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
    @page { size: 119mm 261mm; margin: 0; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Noto Serif JP','游明朝','Yu Mincho',serif; -webkit-font-smoothing: antialiased; color: #1a1510; background: #f5f0e6; }
    ${pageStyle}
    .corner { position:absolute; width:9px; height:9px; border:1px solid rgba(110,75,20,0.65); transform:rotate(45deg); background:transparent; }
    .corner-tl{top:-5px;left:-5px} .corner-tr{top:-5px;right:-5px} .corner-bl{bottom:-5px;left:-5px} .corner-br{bottom:-5px;right:-5px}
    .page-heading{font-size:20px;font-weight:400;letter-spacing:0.55em;text-align:center;color:#1a1510;margin-bottom:3mm}
    .heading-rule{display:flex;align-items:center;gap:6px;margin-bottom:6mm}
    .heading-rule-line{flex:1;height:1px;background:rgba(140,100,50,0.4)}
    .heading-rule-diamond{font-size:7px;color:rgba(140,100,50,0.65)}
    .section-divider{display:flex;align-items:center;gap:6px;margin:3mm 0}
    .section-divider-line{flex:1;height:1px;background:rgba(140,100,50,0.35)}
    .section-divider-label{font-size:11px;letter-spacing:0.3em;color:#5a4830;white-space:nowrap}
    .course-name{font-size:15px;font-weight:400;letter-spacing:0.45em;text-align:center;margin-bottom:3mm}
    .course-price-main{font-size:18px;font-weight:300;letter-spacing:0.3em;text-align:center;color:#1a1510;margin-bottom:1mm}
    .course-count{font-size:11px;letter-spacing:0.2em;text-align:center;color:#5a4830;margin-bottom:1mm}
    .course-price-note{font-size:10px;letter-spacing:0.1em;text-align:center;color:#8a7a68;margin-bottom:7mm}
    .course-dishes{display:flex;flex-direction:column;align-items:center;gap:4mm;margin-top:1mm}
    .course-dish{font-size:16px;font-weight:300;letter-spacing:0.45em}
    .stamp{position:absolute;bottom:10mm;left:50%;transform:translateX(-50%);width:34px;height:38px;border:2px solid #b03030;display:flex;align-items:center;justify-content:center}
    .stamp-text{font-size:9px;line-height:1.4;text-align:center;color:#b03030;letter-spacing:0.05em}
    .tax-note{font-size:9px;color:#8a7a68;text-align:right;letter-spacing:0.08em;margin-bottom:3mm}
    .drink-section{margin-bottom:3.5mm}
    .drink-item{display:flex;justify-content:space-between;align-items:baseline;padding:1.8mm 0;border-bottom:1px solid rgba(26,21,16,0.08)}
    .drink-item:last-child{border-bottom:none}
    .drink-item-left{display:flex;flex-direction:column;gap:1px}
    .drink-item-name{font-size:13px;font-weight:400;letter-spacing:0.06em}
    .drink-item-sub{font-size:9px;color:#7a6858;letter-spacing:0.04em}
    .drink-item-price{font-size:12px;letter-spacing:0.04em;white-space:nowrap}
  </style>
</head>
<body>

<div class="page">
  <div class="card">
    <span class="corner corner-tl"></span><span class="corner corner-tr"></span>
    <span class="corner corner-bl"></span><span class="corner corner-br"></span>
    <div class="page-heading">品　書　き</div>
    <div class="heading-rule"><div class="heading-rule-line"></div><span class="heading-rule-diamond">◇</span><div class="heading-rule-line"></div></div>
    <div class="course-name">コ　ー　ス</div>
    <div class="course-price-main">¥ 3,850</div>
    <div class="course-count">全　十　二　品</div>
    <div class="course-price-note">税込 ／ 税抜 ¥3,500</div>
    <div class="section-divider"><div class="section-divider-line"></div><span class="section-divider-label">献　立</span><div class="section-divider-line"></div></div>
    <div class="course-dishes">
      <div class="course-dish">前　菜</div>
      <div class="course-dish">焼　物</div>
      <div class="course-dish">一 品 料 理</div>
      <div class="course-dish">季節の土鍋御飯</div>
    </div>
    <div class="stamp"><span class="stamp-text">品<br>書</span></div>
  </div>
</div>

<div class="page">
  <div class="card">
    <span class="corner corner-tl"></span><span class="corner corner-tr"></span>
    <span class="corner corner-bl"></span><span class="corner corner-br"></span>
    <div class="page-heading">ド　リ　ン　ク</div>
    <div class="heading-rule"><div class="heading-rule-line"></div><span class="heading-rule-diamond">◇</span><div class="heading-rule-line"></div></div>
    <div class="tax-note">表示価格はすべて税込です</div>
    <div class="drink-section">
      <div class="section-divider"><div class="section-divider-line"></div><span class="section-divider-label">ビ　ー　ル</span><div class="section-divider-line"></div></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">生ビール</span><span class="drink-item-sub">サッポロ黒ラベル</span></div><span class="drink-item-price">550円</span></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">瓶ビール</span><span class="drink-item-sub">サッポロ赤星 中ビン</span></div><span class="drink-item-price">700円</span></div>
    </div>
    <div class="drink-section">
      <div class="section-divider"><div class="section-divider-line"></div><span class="section-divider-label">焼　酎</span><div class="section-divider-line"></div></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">緑茶ハイ</span></div><span class="drink-item-price">480円</span></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">ウーロンハイ</span></div><span class="drink-item-price">480円</span></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">レモンサワー</span></div><span class="drink-item-price">580円</span></div>
    </div>
    <div class="drink-section">
      <div class="section-divider"><div class="section-divider-line"></div><span class="section-divider-label">焼酎　麦</span><div class="section-divider-line"></div></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">佐藤</span></div><span class="drink-item-price">680円</span></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">兼人</span></div><span class="drink-item-price">680円</span></div>
    </div>
    <div class="drink-section">
      <div class="section-divider"><div class="section-divider-line"></div><span class="section-divider-label">焼酎　芋</span><div class="section-divider-line"></div></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">赤兎馬</span></div><span class="drink-item-price">600円</span></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">侍士の門</span></div><span class="drink-item-price">650円</span></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name" style="font-weight:500">魔王</span></div><span class="drink-item-price">900円</span></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">森伊蔵</span></div><span class="drink-item-price">1,500円</span></div>
    </div>
  </div>
</div>

<div class="page">
  <div class="card">
    <span class="corner corner-tl"></span><span class="corner corner-tr"></span>
    <span class="corner corner-bl"></span><span class="corner corner-br"></span>
    <div class="page-heading">ド　リ　ン　ク</div>
    <div class="heading-rule"><div class="heading-rule-line"></div><span class="heading-rule-diamond">◇</span><div class="heading-rule-line"></div></div>
    <div class="tax-note">表示価格はすべて税込です</div>
    <div class="drink-section">
      <div class="section-divider"><div class="section-divider-line"></div><span class="section-divider-label">日　本　酒</span><div class="section-divider-line"></div></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">東洋美人</span><span class="drink-item-sub">山口　純米吟醸 大辛口</span></div><span class="drink-item-price">850円</span></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">星自慢</span><span class="drink-item-sub">福島　純米</span></div><span class="drink-item-price">1,000円</span></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">田光</span><span class="drink-item-sub">三重　純米吟醸</span></div><span class="drink-item-price">1,200円</span></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">飛露喜</span><span class="drink-item-sub">福島　特別純米</span></div><span class="drink-item-price">1,200円</span></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">花邑</span><span class="drink-item-sub">秋田　純米吟醸</span></div><span class="drink-item-price">1,300円</span></div>
    </div>
  </div>
</div>

<div class="page">
  <div class="card">
    <span class="corner corner-tl"></span><span class="corner corner-tr"></span>
    <span class="corner corner-bl"></span><span class="corner corner-br"></span>
    <div class="page-heading">ド　リ　ン　ク</div>
    <div class="heading-rule"><div class="heading-rule-line"></div><span class="heading-rule-diamond">◇</span><div class="heading-rule-line"></div></div>
    <div class="tax-note">表示価格はすべて税込です</div>
    <div class="drink-section">
      <div class="section-divider"><div class="section-divider-line"></div><span class="section-divider-label">ワ　イ　ン</span><div class="section-divider-line"></div></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">グラスワイン 白</span></div><span class="drink-item-price">700円</span></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">グラスワイン 赤</span></div><span class="drink-item-price">700円</span></div>
    </div>
    <div class="drink-section">
      <div class="section-divider"><div class="section-divider-line"></div><span class="section-divider-label">ボトル　白</span><div class="section-divider-line"></div></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">プレン・シュッド 2024</span><span class="drink-item-sub">フランス</span></div><span class="drink-item-price">5,800円</span></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">ルネ・ド・ラ・クレイ 2022</span><span class="drink-item-sub">シャブリ　フランス</span></div><span class="drink-item-price">8,000円</span></div>
    </div>
    <div class="drink-section">
      <div class="section-divider"><div class="section-divider-line"></div><span class="section-divider-label">ボトル　赤</span><div class="section-divider-line"></div></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">オリゾン・ド・ビジョー</span><span class="drink-item-sub">ピノ・ワール　フランス</span></div><span class="drink-item-price">5,500円</span></div>
    </div>
    <div class="drink-section">
      <div class="section-divider"><div class="section-divider-line"></div><span class="section-divider-label">スピリッツ</span><div class="section-divider-line"></div></div>
      <div class="drink-item"><div class="drink-item-left"><span class="drink-item-name">AKAYANE</span><span class="drink-item-sub">山椒</span></div><span class="drink-item-price">680円</span></div>
    </div>
  </div>
</div>

</body>
</html>`;
}

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox']
  });

  console.log('Generating gold foil texture via Canvas...');
  const textureDataUrl = await generateTexture(browser);
  console.log(`Texture generated (${Math.round(textureDataUrl.length / 1024)}KB)`);

  const html = buildMenuHtml(textureDataUrl);

  const menuPage = await browser.newPage();
  await menuPage.setContent(html, { waitUntil: 'networkidle0' });
  await menuPage.pdf({
    path: path.resolve(__dirname, '../menu-plan-e.pdf'),
    width: '119mm',
    height: '261mm',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  console.log('Generated: menu-plan-e.pdf');
  await menuPage.close();
  await browser.close();
})();
