import puppeteer from 'puppeteer-core';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--window-size=1440,900']
  });

  // 1. Test front-end homepage
  console.log('Testing homepage http://localhost:3000/zh ...');
  const page1 = await browser.newPage();
  await page1.goto('http://localhost:3000/zh', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const homeWidget = await page1.evaluate(() => {
    const btn = document.querySelector('aside[aria-label="AI 智能客服系统"] button');
    return {
      hasWidget: !!btn,
      btnText: btn ? btn.innerText : null
    };
  });
  console.log('Home Widget:', homeWidget);

  // Click to open chat window!
  if (homeWidget.hasWidget) {
    await page1.click('aside[aria-label="AI 智能客服系统"] button');
    await new Promise(r => setTimeout(r, 1500));
    await page1.screenshot({ path: 'screenshots/home_ai_chat_open.png' });
    console.log('Saved screenshots/home_ai_chat_open.png');
  }

  // 2. Test admin geo page
  console.log('Testing admin geo page http://localhost:3000/zh/admin/geo ...');
  const page2 = await browser.newPage();
  await page2.setCookie({
    name: 'admin_session',
    value: 'authenticated',
    domain: 'localhost',
    path: '/'
  });
  await page2.goto('http://localhost:3000/zh/admin/geo', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const adminWidget = await page2.evaluate(() => {
    const btn = document.querySelector('aside[aria-label="AI 智能客服系统"] button');
    return {
      hasWidget: !!btn,
      btnText: btn ? btn.innerText : null
    };
  });
  console.log('Admin Widget:', adminWidget);

  if (adminWidget.hasWidget) {
    await page2.click('aside[aria-label="AI 智能客服系统"] button');
    await new Promise(r => setTimeout(r, 1500));
    await page2.screenshot({ path: 'screenshots/admin_ai_chat_open.png' });
    console.log('Saved screenshots/admin_ai_chat_open.png');
  }

  await browser.close();
  console.log('All tests completed successfully!');
}

test().catch(e => console.error('Error:', e));
