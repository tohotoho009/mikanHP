const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  const url = 'file:///' + path.resolve(__dirname, 'menu.html').replace(/\\/g, '/');
  await page.goto(url, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: path.resolve(__dirname, '../menu.pdf'),
    width: '119mm',
    height: '261mm',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  console.log('Generated: menu.pdf');
  await browser.close();
})();
