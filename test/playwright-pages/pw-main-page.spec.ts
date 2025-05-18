import { test, expect } from "@playwright/test";

const selectorsPw = {
  'themeToggleWhite': 'button svg.lightToggleIcon_pyhR',
  'themeToggleBlack': 'button[title*=currently]',
  'browserImage': 'img[alt*="Browsers"]',
  'getstartedButton': '.getStarted_Sjon',
  'mainHeader': 'h1[class*="hero__tit"]',
  'logoList' : '.logosList_zAAF',
  'logoListItems' : '.logosList_zAAF > li'
}

test.beforeEach(async ({ page }) => {
  await page.goto("https://playwright.dev/");
});

test("AQA-1 header is present", { tag: ["@smoke-pw"] }, async ({ page }) => {
  await expect(page.locator(selectorsPw.mainHeader)).toBeVisible();
  await expect(page.locator(selectorsPw.mainHeader)).toContainText('Playwright');
});

test("AQA-2 get started button is present ans can be hovered", { tag: ["@smoke-pw"] }, async ({ page }) => {
  await expect(page.locator(selectorsPw.getstartedButton)).toBeVisible();
  await expect(page.locator(selectorsPw.getstartedButton)).toContainText("Get started");
  await page.locator(selectorsPw.getstartedButton).hover();
  await expect(page.locator(selectorsPw.getstartedButton)).toHaveCSS("background-color", "rgb(69, 186, 75)");
});

test("AQA-3 images visibility", { tag: ["@smoke-pw"] }, async ({ page }) => {
  await expect(page.locator(selectorsPw.browserImage)).toBeVisible();
  await expect(page.locator(selectorsPw.logoList)).toBeVisible()
  await expect(page.locator(selectorsPw.logoListItems)).toHaveCount(9)
});


test('AQA-4 default theme changing', {tag: ["@smoke-pw"]}, async({page}) => {

const getTheme = async () => {
return await page.evaluate(() => localStorage.getItem('theme')) 
};
;

expect(await getTheme()).toEqual(null);
await page.locator(selectorsPw.themeToggleWhite).click()
expect(await getTheme()).toEqual('dark');
await page.locator(selectorsPw.themeToggleBlack).click()
expect(await getTheme()).toEqual('light');


});