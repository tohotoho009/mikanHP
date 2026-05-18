const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });

  const files = [
    { html: 'poster.html',                 pdf: 'poster-dark.pdf',            landscape: false },
    { html: 'poster-light.html',           pdf: 'poster-light.pdf',           landscape: false },
    { html: 'poster-landscape.html',       pdf: 'poster-landscape.pdf',       landscape: true  },
    { html: 'poster-landscape-light.html', pdf: 'poster-landscape-light.pdf', landscape: true  },
  ];

  for (const f of files) {
    const page = await browser.newPage();
    const url = 'file:///' + path.resolve(__dirname, f.html).replace(/\\/g, '/');
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: path.resolve(__dirname, f.pdf),
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
