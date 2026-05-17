const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CANVAS_COLOR = '#f7f3ec';
const INPUT_IMG = 'file:///' + path.resolve(__dirname, '../images/mikan-logo.jpg').replace(/\\/g, '/');
const OUTPUT = path.resolve(__dirname, '../images/mikan-logo-light.png');

const html = `<!DOCTYPE html>
<html><head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: ${CANVAS_COLOR}; display: inline-block; line-height: 0; }
  img {
    display: block;
    filter: invert(1) grayscale(100%) brightness(0.55);
    mix-blend-mode: multiply;
  }
</style>
</head><body>
  <img id="logo" src="${INPUT_IMG}">
</body></html>`;

const tmpHtml = path.resolve(__dirname, '_tmp_logo.html');
fs.writeFileSync(tmpHtml, html, 'utf8');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('file:///' + tmpHtml.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  const el = await page.$('img');
  await el.screenshot({ path: OUTPUT, omitBackground: false });

  await browser.close();
  fs.unlinkSync(tmpHtml);
  console.log('Generated: images/mikan-logo-light.png');
})();
