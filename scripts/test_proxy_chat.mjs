import puppeteer from 'puppeteer-core';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  console.log('Navigating to http://localhost:3000/zh ...');
  await page.goto('http://localhost:3000/zh', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  console.log('Clicking AI customer service button...');
  await page.click('button[aria-label="打开 AI 客服"]');

  console.log('Waiting for iframe to load...');
  await new Promise(r => setTimeout(r, 3000));

  const state = await page.evaluate(() => {
    const iframe = document.querySelector('iframe[title="葳澄 AI 智能客服"]');
    return {
      hasIframe: !!iframe,
      iframeSrc: iframe ? iframe.src : null,
    };
  });
  console.log('State:', state);

  await page.screenshot({ path: 'screenshots/chat_loaded_via_proxy.png' });
  console.log('Saved screenshots/chat_loaded_via_proxy.png');

  await browser.close();
  console.log('Verification completed successfully!');
}

test().catch(e => console.error('Error:', e));
