import { expect, test } from "@playwright/test";

/* page это фикстура которая создает браузер, контекст и тд
Isolated Page instance, created for each test. Pages are isolated between tests due to fixtures.context isolation.  
This is the most common fixture used in a test. 

const browser = await chromium.launch(); // browser
const context = await browser.newContext() // context
const page = await context.newPage() // opening new tab in browser

await page.goto("https://playwright.dev/");

вместо этого используется async ({page})


*/

test.beforeEach(async ({ page }) => {
  await page.goto("https://playwright.dev/");
});

test.describe('search functionality', () => {



test('AQA-12, search should be visible, clickable, fillable', {tag: '@smoke-pw'}, async ({page}) => {



await expect(page.locator('.navbarSearchContainer_Bca1')).toBeVisible();
await page.keyboard.press('Control+K');
await expect(page.locator('.DocSearch-Modal')).toBeVisible();
await page.keyboard.press('Control+K');
await expect(page.locator('.DocSearch-Modal')).toBeVisible({visible: false});
await page.locator('.navbarSearchContainer_Bca1').click()
await expect(page.locator('.DocSearch-Modal')).toBeVisible();
await page.locator('.DocSearch-Input').fill('Peter')
await expect(page.locator('.DocSearch-Input')).toHaveValue('Peter')
await page.locator('.DocSearch-Input').clear()
await expect(page.locator('.DocSearch-Input')).toBeEmpty()

})
});