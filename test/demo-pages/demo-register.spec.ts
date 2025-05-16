import { test, expect } from "@playwright/test";
import { dataGenerator, invalidData } from "../../utils/utils";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/register");
});

test.describe("register functionality", () => {
  test("AQA-13 valid user registration", { tag: ['@smoke-demo', '@registration-demo'] }, async ({ page }) => {
    const { uniqueUser, userEmail, userPassword } = dataGenerator();
    await page.locator('input[placeholder="Username"]').fill(uniqueUser);
    await expect(page.locator('input[placeholder="Username"]')).toHaveValue(uniqueUser);
    await page.locator('input[placeholder="Email"]').fill(userEmail);
    await expect(page.locator('input[placeholder="Email"]')).toHaveValue(userEmail);
    await page.locator('input[placeholder="Password"]').fill(userPassword);
    await expect(page.locator('input[placeholder="Password"]')).toHaveValue(userPassword);
    await page.locator('button[class="btn btn-lg btn-primary pull-xs-right"]').click();
    await page.waitForTimeout(100);
    await expect(page.locator('ul[class="error-messages"] li')).not.toBeVisible();
    await expect(page).toHaveURL("https://demo.learnwebdriverio.com/");
    await expect(page.locator(`a[href*="user12345"]`).first()).toBeVisible()
  });

  test("AQA-14 invalid user registration attempt", { tag: ['@smoke-demo', '@registration-demo'] }, async ({ page }) => {
    const { invalidUser, invalidEmail, invalidPassword } = invalidData;

    await page.locator('input[placeholder="Username"]').fill(invalidUser);
    await expect(page.locator('input[placeholder="Username"]')).toHaveValue(invalidUser);
    await page.locator('input[placeholder="Email"]').fill(invalidEmail);
    await expect(page.locator('input[placeholder="Email"]')).toHaveValue(invalidEmail);
    await page.locator('input[placeholder="Password"]').fill(invalidPassword);
    await expect(page.locator('input[placeholder="Password"]')).toHaveValue(invalidPassword);
    await page.locator('button[class="btn btn-lg btn-primary pull-xs-right"]').click();
    await page.waitForTimeout(100);
    await expect(page.locator('ul[class="error-messages"] li')).not.toBeVisible();
    await expect(page).toHaveURL("https://demo.learnwebdriverio.com/register");
  });
});
