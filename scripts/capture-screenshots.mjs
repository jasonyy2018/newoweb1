import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const browserPath = fs.existsSync(EDGE_PATH) ? EDGE_PATH : CHROME_PATH;
const outputDir = 'C:\\Users\\jason\\.gemini\\antigravity\\brain\\fea75e2f-1594-4fe1-bc92-21cb94df4bc6';

async function capture() {
  console.log('Launching browser from:', browserPath);
  const browser = await puppeteer.launch({
    executablePath: browserPath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  console.log('1. Navigating to login page...');
  await page.goto('http://localhost:3000/zh/admin/login', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(outputDir, 'admin_login_real.png'), fullPage: false });
  console.log('Saved admin_login_real.png');

  await page.setCookie({
    name: 'admin_session',
    value: 'authenticated',
    domain: 'localhost',
    path: '/'
  });

  console.log('2. Navigating to GEO Dashboard...');
  await page.goto('http://localhost:3000/zh/admin/geo', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, 'admin_geo_real.png'), fullPage: true });
  console.log('Saved admin_geo_real.png');

  console.log('3. Navigating to Article CMS...');
  await page.goto('http://localhost:3000/zh/admin/articles', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, 'admin_articles_real.png'), fullPage: true });
  console.log('Saved admin_articles_real.png');

  console.log('4. Navigating to Image Diagnosis...');
  await page.goto('http://localhost:3000/zh/admin/images', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, 'admin_images_real.png'), fullPage: true });
  console.log('Saved admin_images_real.png');

  console.log('5. Navigating to Consultations...');
  await page.goto('http://localhost:3000/zh/admin/consultations', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, 'admin_consultations_real.png'), fullPage: true });
  console.log('Saved admin_consultations_real.png');

  await browser.close();
  console.log('All real screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
