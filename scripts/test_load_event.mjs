import puppeteer from 'puppeteer-core';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--window-size=1440,900']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/zh', { waitUntil: 'networkidle2' });
  const result = await page.evaluate(() => {
    const script = document.querySelector('script[src*="156.238.249.149"]');
    const before = !!document.querySelector('.maxkb-chat-button');
    window.dispatchEvent(new Event('load'));
    const after = !!document.querySelector('.maxkb-chat-button');
    return { hasScript: !!script, before, after };
  });
  console.log('TEST RESULT:', result);
  await browser.close();
}
test();
