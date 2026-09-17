import puppeteer from 'puppeteer-core';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--window-size=1440,900']
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('CONSOLE ERROR:', msg.text());
      errors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.message);
    errors.push(err.message);
  });

  await page.setCookie({
    name: 'admin_session',
    value: 'authenticated',
    domain: 'localhost',
    path: '/'
  });

  const res = await page.goto('http://localhost:3000/zh/admin/geo', { waitUntil: 'networkidle2' });
  console.log('STATUS:', res.status());
  console.log('TOTAL CLIENT/CONSOLE ERRORS:', errors.length);
  const text = await page.evaluate(() => document.body.innerText);
  console.log('HAS ERROR 3837761569:', text.includes('3837761569') || text.includes('Application error'));
  
  await page.screenshot({ path: 'screenshots/admin_geo_verified.png' });
  console.log('Saved screenshots/admin_geo_verified.png');
  await browser.close();
}

test().catch(e => console.error(e));
