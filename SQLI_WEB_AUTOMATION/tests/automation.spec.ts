import { test, chromium } from '@playwright/test';

test('Automation Wikipedia Search and Screenshot', async () => {
  const browser = await chromium.launch({
  headless: false,
  slowMo: 300,
});

 const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114 Safari/537.36',
  viewport: { width: 1280, height: 720 },
});


  const page = await context.newPage();
  await page.goto('https://www.google.com');

  const agreeButton = page.locator('button:has-text("I agree"), button:has-text("Aceptar todo")');
  if (await agreeButton.isVisible()) {
    await page.mouse.move(Math.random() * 800, Math.random() * 800);
    await agreeButton.click();
  }

  await page.mouse.move(Math.random() * 800, Math.random() * 800);
  await page.click('textarea[name="q"]');
  await page.keyboard.type('automation', { delay: 150 });
  await page.keyboard.press('Enter');

  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000); 

  const wikiLink = page.locator('a:has-text("Wikipedia")');
  await wikiLink.first().waitFor({ timeout: 10000 });

  const href = await wikiLink.first().getAttribute('href');
  if (!href) throw new Error("Wikipedia link not found");

  await page.goto(href);

  const bodyText = await page.locator('body').innerText();
  const yearMatch = bodyText.match(/\b17\d{2}\b/);
  const year = yearMatch?.[0] ?? 'Not found';
  console.log('Year of first automatic process:', year);

  await page.screenshot({ path: 'wikipedia_automation.png', fullPage: true });

  await browser.close();
});