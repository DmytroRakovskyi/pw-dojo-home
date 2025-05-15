import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://playwright.dev/");
});

test("AQA-5 clicking on get started leads to intro", { tag: ["@smoke-pw"] }, async ({ page }) => {
  await expect(page.locator('a[class*="getStarted"][href="/docs/intro"]')).toBeVisible()
  await page.locator('a[class*="getStarted"][href="/docs/intro"]').click();
  await expect(page).toHaveURL("https://playwright.dev/docs/intro");
  await expect(page.locator('[class="theme-doc-markdown markdown"] h1')).toHaveText('Installation')

});
