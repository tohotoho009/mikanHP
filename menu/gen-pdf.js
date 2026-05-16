const puppeteer = require('puppeteer-core');
const path = require('path');

const targets = [
  { html: 'menu.html',        pdf: '../menu.pdf' },
  { html: 'menu-plan-a.html', pdf: '../menu-plan-a.pdf' },
  { html: 'menu-plan-b.html', pdf: '../menu-plan-b.pdf' },
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });

  for (const { html, pdf } of targets) {
    const page = await browser.newPage();
    const url = 'file:///' + path.resolve(__dirname, html).replace(/\\/g, '/');
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: path.resolve(__dirname, pdf),
      width: '119mm',
      height: '261mm',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    console.log(`Generated: ${pdf}`);
    await page.close();
  }

  await browser.close();
})();
