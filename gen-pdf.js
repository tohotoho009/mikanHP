const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });

  const files = [
    { html: 'poster-landscape-light.html', pdf: 'poster-landscape-light.pdf', landscape: true }
  ];

  for (const f of files) {
    const page = await browser.newPage();
    const url = 'file:///C:/project/mikanHP/' + f.html;
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: f.pdf,
      format: 'A4',
      landscape: f.landscape,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    console.log('Generated: ' + f.pdf);
    await page.close();
  }

  await browser.close();
  console.log('All done.');
})();
