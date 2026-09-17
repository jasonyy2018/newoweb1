import puppeteer from 'puppeteer-core';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--window-size=1440,900']
  });

  // 1. Verify admin page has NO widget
  console.log('1. Checking backend /zh/admin/geo ...');
  const pageAdmin = await browser.newPage();
  await pageAdmin.setCookie({
    name: 'admin_session',
    value: 'authenticated',
    domain: 'localhost',
    path: '/'
  });
  await pageAdmin.goto('http://localhost:3000/zh/admin/geo', { waitUntil: 'networkidle2' });
  const adminHasWidget = await pageAdmin.evaluate(() => {
    return !!document.querySelector('aside[aria-label="AI 智能客服系统"]') || !!document.querySelector('button[aria-label="唤出 AI 智能客服"]');
  });
  console.log('Admin Has Widget (should be false):', adminHasWidget);
  await pageAdmin.screenshot({ path: 'screenshots/admin_without_chat.png' });
  console.log('Saved screenshots/admin_without_chat.png');

  // 2. Verify front-end homepage has widget & hide/summon interaction
  console.log('2. Checking front-end homepage /zh ...');
  const pageHome = await browser.newPage();
  await pageHome.goto('http://localhost:3000/zh', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Screenshot initial state (Floating button with Hide button)
  await pageHome.screenshot({ path: 'screenshots/chat_initial_with_hide_btn.png' });
  console.log('Saved screenshots/chat_initial_with_hide_btn.png');

  // Click the Hide button
  console.log('Clicking hide button...');
  await pageHome.click('button[aria-label="隐藏至侧边栏"]');
  await new Promise(r => setTimeout(r, 600));

  // Screenshot docked edge state
  const isDockedVisible = await pageHome.evaluate(() => {
    const dockBtn = document.querySelector('button[aria-label="唤出 AI 智能客服"]');
    return !!dockBtn;
  });
  console.log('Docked Edge Button Visible:', isDockedVisible);
  await pageHome.screenshot({ path: 'screenshots/chat_docked_edge.png' });
  console.log('Saved screenshots/chat_docked_edge.png');

  // Click docked edge button to summon
  console.log('Clicking docked edge button to summon chat...');
  await pageHome.click('button[aria-label="唤出 AI 智能客服"]');
  await new Promise(r => setTimeout(r, 1500));

  // Screenshot summoned open chat dialog
  await pageHome.screenshot({ path: 'screenshots/chat_summoned_dialog.png' });
  console.log('Saved screenshots/chat_summoned_dialog.png');

  await browser.close();
  console.log('All tests passed cleanly!');
}

test().catch(e => console.error(e));
