import { test, expect } from "@playwright/test";
import { validData, invalidData } from "../../utils/utils";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/login");
});

test.describe("login functionality", () => {

  test("AQA-15 valid user login", { tag: ["@smoke-demo", "@login-demo"] }, async ({page}) => {
    const {validEmail, validPassword } = validData;

    await page.locator('input[placeholder="Email"]').fill(validEmail);
    await expect(page.locator('input[placeholder="Email"]')).toHaveValue(validEmail);
    await page.locator('input[placeholder="Password"]').fill(validPassword);
    await expect(page.locator('input[placeholder="Password"]')).toHaveValue(validPassword);
    await page.locator('button[class="btn btn-lg btn-primary pull-xs-right"]').click();
    await page.waitForTimeout(100);
    await expect(page.locator('ul[class="error-messages"] li')).not.toBeVisible();
    await expect(page).toHaveURL("https://demo.learnwebdriverio.com/");
    await expect(page.locator(`a[href*="user12345"]`).first()).toContainText("user12345");
  });

  test("AQA-16 invalid user login attempt", { tag: ["@smoke-demo", "@login-demo"] }, async ({ page }) => {
    const {invalidEmail, invalidPassword } = invalidData;

    await page.locator('input[placeholder="Email"]').fill(invalidEmail);
    await expect(page.locator('input[placeholder="Email"]')).toHaveValue(invalidEmail);
    await page.locator('input[placeholder="Password"]').fill(invalidPassword);
    await expect(page.locator('input[placeholder="Password"]')).toHaveValue(invalidPassword);
    await page.locator('button[class="btn btn-lg btn-primary pull-xs-right"]').click();
    await page.waitForTimeout(100);
    await expect(page.locator('ul[class="error-messages"] li')).toBeVisible();
    await expect(page).toHaveURL("https://demo.learnwebdriverio.com/login");
  });

});
