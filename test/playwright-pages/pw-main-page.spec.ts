import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://playwright.dev/");
});

test("AQA-1 header is present", { tag: ["@smoke-pw"] }, async ({ page }) => {
  await expect(page.locator('h1[class="hero__title heroTitle_ohkl"]')).toBeVisible();
  await expect(page.locator('h1[class="hero__title heroTitle_ohkl"]')).toContainText('Playwright');
});

test("AQA-2 get started button is present ans can be hovered", { tag: ["@smoke-pw"] }, async ({ page }) => {
  await expect(page.locator('a[href="/docs/intro"].getStarted_Sjon')).toBeVisible();
  await expect(page.locator('a[href="/docs/intro"].getStarted_Sjon')).toContainText("Get started");
  await page.locator('a[href="/docs/intro"].getStarted_Sjon').hover();
  await expect(page.locator('a[href="/docs/intro"].getStarted_Sjon')).toHaveCSS("background-color", "rgb(69, 186, 75)");
});

test("AQA-3 browser image visibility", { tag: ["@smoke-pw"] }, async ({ page }) => {
  await expect(page.locator('img[alt*="Browsers"]')).toBeVisible();
});

test("AQA-4 page headers", { tag: ["@smoke-pw"] }, async ({ page }) => {
  await expect(page.locator('[class="col col--6"] h3:text("Any browser • Any platform • One API")')).toBeVisible();
  await expect(page.locator('[class="col col--6"] h3:text("Resilient • No flaky tests")')).toBeVisible();
   await expect(page.locator('[class="col col--6"] h3:text("No trade-offs • No limits")')).toBeVisible();
   await expect(page.locator('[class="col col--6"] h3:text("Full isolation • Fast execution")')).toBeVisible();
   await expect(page.locator('[class="col col--6"] h3:text("Powerful Tooling")')).toBeVisible();
});
