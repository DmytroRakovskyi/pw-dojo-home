import { test, expect } from "@playwright/test";


const selectorsPw = {
  'themeToggleWhite': 'button svg.lightToggleIcon_pyhR',
  'themeToggleBlack': 'button[title*=currently]',
  'browserImage': 'img[alt*="Browsers"]',
  'getstartedButton': '.getStarted_Sjon',
  'mainHeader': 'h1[class*="hero__tit"]',
  'gettingStartedHeader' : "[class*='theme'] h1",
}


test.beforeEach(async ({ page }) => {
  await page.goto("https://playwright.dev/");
});

test("AQA-5 clicking on get started leads to intro", { tag: ["@smoke-pw"] }, async ({ page }) => {
  await expect(page.locator(selectorsPw.getstartedButton)).toBeVisible()
  await page.locator(selectorsPw.getstartedButton).click();
  await expect(page).toHaveURL("https://playwright.dev/docs/intro");
  await expect(page.locator(selectorsPw.gettingStartedHeader)).toHaveText('Installation')

});
