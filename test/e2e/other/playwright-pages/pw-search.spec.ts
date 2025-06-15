import { expect, test, Locator } from '@playwright/test';

/* page это фикстура которая создает браузер, контекст и тд
Isolated Page instance, created for each test. Pages are isolated between tests due to fixtures.context isolation.  
This is the most common fixture used in a test. 

const browser = await chromium.launch(); // browser
const context = await browser.newContext() // context
const page = await context.newPage() // opening new tab in browser

await page.goto("https://playwright.dev/");

вместо этого используется async ({page})


*/
const baseUrl = 'https://playwright.dev';

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test.describe('search functionality', () => {
  test(
    'AQA-12, search should be visible, clickable, fillable',
    { tag: '@smoke-pw' },
    async ({ page }) => {
      const searchButton: Locator = page.locator('button.DocSearch');
      const searchModal: Locator = page.locator('.DocSearch-Modal');
      const searchInput: Locator = page.locator('input.DocSearch-Input');

      await expect(searchButton).toBeVisible();
      await page.keyboard.press('Control+K');
      await expect(searchModal).toBeVisible();
      await page.keyboard.press('Control+K');
      await expect(searchModal).toBeVisible({ visible: false });
      await searchButton.click();
      await expect(searchModal).toBeVisible();
      await searchInput.fill('Peter');
      await expect(searchInput).toHaveValue('Peter');
      await searchInput.clear();
      await expect(searchInput).toBeEmpty();
    },
  );
});
