const puppeteer = require('puppeteer-core');
const path = require('path');

// ポスター本体から直接ロゴ要素をスクリーンショットして背景を完全一致させる
(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  const posterUrl = 'file:///' + path.resolve(__dirname, 'poster-landscape-light.html').replace(/\\/g, '/');
  await page.goto(posterUrl, { waitUntil: 'networkidle0' });

  // 元の mikan-logo.jpg + invert/multiply で描画させてからキャプチャ
  await page.evaluate(() => {
    const img = document.querySelector('.left-logo-img');
    img.src = img.src.replace('mikan-logo-light.png', 'mikan-logo.jpg');
    img.style.filter = 'invert(1) grayscale(100%) brightness(0.55)';
    img.style.mixBlendMode = 'multiply';
  });
  await page.waitForNetworkIdle({ idleTime: 300 }).catch(() => {});

  const el = await page.$('.left-logo-img');
  const output = path.resolve(__dirname, '../images/mikan-logo-light.png');
  await el.screenshot({ path: output });

  await browser.close();
  console.log('Generated: images/mikan-logo-light.png');
})();
