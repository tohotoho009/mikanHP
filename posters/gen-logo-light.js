const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 280, height: 280 });

  // 一時HTMLファイルに書き出してfile://で開く（setContent+file://はChromeにブロックされる）
  const tmpHtml = path.resolve(__dirname, '_logo-tmp.html');
  fs.writeFileSync(tmpHtml, `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; }
  body {
    background: #f7f3ec;
    width: 280px; height: 280px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 280px;
    height: 280px;
    object-fit: contain;
    filter: invert(1) grayscale(100%);
    mix-blend-mode: multiply;
  }
</style>
</head>
<body><img src="../images/mikan-logo.jpg"></body>
</html>`);

  const url = 'file:///' + tmpHtml.replace(/\\/g, '/');
  await page.goto(url, { waitUntil: 'networkidle0' });

  const output = path.resolve(__dirname, '../images/mikan-logo-light.png');
  await page.screenshot({ path: output, clip: { x: 0, y: 0, width: 280, height: 280 } });

  fs.unlinkSync(tmpHtml);
  await browser.close();
  console.log('Generated: images/mikan-logo-light.png');
})();
