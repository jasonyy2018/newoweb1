import puppeteer from 'puppeteer-core';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--window-size=1440,900']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/zh', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  
  const result = await page.evaluate(() => {
    const btn = document.querySelector('.maxkb-chat-button');
    const container = document.querySelector('#maxkb-chat-container');
    const iframe = document.querySelector('#maxkb-chat');
    return {
      hasBtn: !!btn,
      btnVisible: btn ? window.getComputedStyle(btn).display !== 'none' : false,
      hasContainer: !!container,
      hasIframe: !!iframe,
      iframeSrc: iframe ? iframe.src : null
    };
  });
  console.log('VERIFY WIDGET RESULT:', JSON.stringify(result, null, 2));

  // Now simulate clicking the button to open the iframe!
  if (result.hasBtn) {
    await page.click('.maxkb-chat-button');
    await new Promise(r => setTimeout(r, 1000));
    const openedResult = await page.evaluate(() => {
      const container = document.querySelector('#maxkb-chat-container');
      const iframe = document.querySelector('#maxkb-chat');
      return {
        containerDisplay: container ? window.getComputedStyle(container).display : 'null',
        iframeSrc: iframe ? iframe.src : null
      };
    });
    console.log('AFTER CLICK RESULT:', JSON.stringify(openedResult, null, 2));
    await page.screenshot({ path: 'screenshots/ai_chat_opened.png' });
    console.log('Saved screenshots/ai_chat_opened.png');
  }

  await browser.close();
}
test().catch(e => console.error(e));
