import { test, expect, Locator } from "@playwright/test";
const baseUrl = "https://playwright.dev";

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test(
  "AQA-5 clicking on get started leads to intro",
  { tag: ["@smoke-pw"] },
  async ({ page }) => {
    //selectors
    const getstartedButton: Locator = page.locator("[class*=getSt][href]");
    const header: Locator = page.locator("h1");

    //steps
    await getstartedButton.click();
    await expect(page).toHaveURL(`${baseUrl}/docs/intro`);
    await expect(header).toHaveText("Installation");
  },
);
