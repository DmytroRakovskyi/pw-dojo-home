import { test, expect, Locator } from "@playwright/test";
const baseUrl = "https://playwright.dev";


test.describe("Playwright main page tests", { tag: ["@smoke-pw"] }, () => {

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl)
});

test("AQA-1 header is present", { tag: ["@smoke-pw"] }, async ({ page }) => {
  const header: Locator = page.locator("h1[class*='hero']");

  await expect(header).toBeVisible();
  await expect(header).toContainText('Playwright');
});

test("AQA-2 get started button is present ans can be hovered", { tag: ["@smoke-pw"] }, async ({ page }) => {
  const getstartedButton: Locator = page.locator('[class*=getSt][href]');

  await expect(getstartedButton).toBeVisible();
  await expect(getstartedButton).toContainText("Get started");
  await getstartedButton.hover();
  await expect(getstartedButton).toHaveCSS("background-color", "rgb(69, 186, 75)");
});

test("AQA-3 images visibility", { tag: ["@smoke-pw"] }, async ({ page }) => {
const logoList: Locator = page.locator("ul[class*='logo']");
const browserImages: Locator = page.locator("img[alt*='Browser']");

  await expect(browserImages).toBeVisible();
  await expect(logoList).toBeVisible();

});

test('AQA-4 default theme changing', {tag: ["@smoke-pw"]}, async({page}) => {

const getTheme = async () => {
return await page.evaluate(() => localStorage.getItem('theme')) 
};
;
const themeToggle: Locator = page.locator("button[title*='Switch']");

expect(await getTheme()).toEqual(null);
await themeToggle.click()
expect(await getTheme()).toEqual('dark');
await themeToggle.click()
expect(await getTheme()).toEqual('light');


});
});