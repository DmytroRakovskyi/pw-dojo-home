import { test, expect } from "@playwright/test";
import { validData } from "../../utils/utils";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/login");
  const {validEmail, validPassword } = validData;

  await page.locator('input[type="email"]').fill(validEmail);
  await expect(page.locator('input[type="email"]')).toHaveValue(validEmail);
  await page.locator('input[type="password"]').fill(validPassword);
  await expect(page.locator('input[type="password"]')).toHaveValue(validPassword);
  await page.locator('button[class="btn btn-lg btn-primary pull-xs-right"]').click();
  await expect(page).toHaveURL("https://demo.learnwebdriverio.com");
});

test.describe("home page functionality", () => {
  test("AQA-17 fullfilled article creation", { tag: ["@smoke-demo", "@home-demo"] }, async ({ page }) => {
    await page.locator('a[href="/editor"]').click();
    await expect(page).toHaveURL('https://demo.learnwebdriverio.com/editor')
    await page.locator('input[placeholder="Article Title"]').fill("Article new");
    await expect(page.locator('input[placeholder="Article Title"]')).toHaveValue("Article new");
    await page.locator(`input[placeholder="What's this article about?"]`).fill("Article new text");
    await expect(page.locator(`input[placeholder="What's this article about?"]`)).toHaveValue("Article new text");

    await page.locator('textarea[placeholder="Write your article (in markdown)"]').fill("Article text: thank you for attention!");
    await expect(page.locator('textarea[placeholder="Write your article (in markdown)"]')).toHaveValue("Article text: thank you for attention!");
    await expect(page.locator('[class="v-show-content scroll-style scroll-style-border-radius"]')).toHaveText("Article text: thank you for attention!"); // to fix...
    await page.locator('[data-qa-id="editor-publish"]').click();
    await expect(page).toHaveURL(/\/articles\/[^\/]+$/)
  });
});
