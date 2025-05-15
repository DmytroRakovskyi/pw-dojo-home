import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://playwright.dev/");
});

test("AQA-5 clicking on get started leads to intro", { tag: ["@smoke-pw"] }, async ({ page }) => {
  await expect(page.getByRole("banner")).toBeVisible();
  await page.getByRole("link", { name: "Get started" }).click();
  await expect(page).toHaveURL("https://playwright.dev/docs/intro");
  await expect(page).toHaveTitle("Installation | Playwright");
});
