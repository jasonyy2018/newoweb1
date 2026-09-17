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
  
  // First screenshot: showing the guide tip and button on the bottom right
  await page.screenshot({ path: 'screenshots/ai_chat_initial.png' });

  // Click "我知道了" if present or click the chat button
  await page.evaluate(() => {
    const tipBtn = document.querySelector('.maxkb-tips button');
    if (tipBtn) tipBtn.click();
    const chatBtn = document.querySelector('.maxkb-chat-button');
    if (chatBtn) chatBtn.click();
  });

  await new Promise(r => setTimeout(r, 2000));
  // Second screenshot: showing the actual iframe open!
  await page.screenshot({ path: 'screenshots/ai_chat_dialog_open.png' });
  console.log('Screenshots saved!');

  await browser.close();
}
test();
