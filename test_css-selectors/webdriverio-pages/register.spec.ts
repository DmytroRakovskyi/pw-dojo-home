import { test, expect } from "@playwright/test";
import { dataGenerator, invalidData } from "../../utils/utils";


  const { uniqueUser, userEmail, userPassword } = dataGenerator();
  const { invalidUser, invalidEmail, invalidPassword } = invalidData;
  const usernameInput = 'input[placeholder="Username"]';
  const emailInput = 'input[placeholder="Email"]';
  const passwordInput = 'input[placeholder="Password"]';
  const signInBtn = 'button[class*="btn-lg"]';
  const userLogged = `a[href*="${uniqueUser}"]`;
  const errorPanel = 'ul[class="error-messages"] li';

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/register");
});

test.describe("register functionality", () => {


  test("AQA-13 valid user registration", { tag: ['@smoke-wb', '@registration-wb'] }, async ({ page }) => {

   
    const responsePromise = page.waitForResponse('https://conduit-api.learnwebdriverio.com/api/users');
    await page.locator(usernameInput).fill(uniqueUser);
    await page.locator(emailInput).fill(userEmail);
    await page.locator(passwordInput).fill(userPassword);
    await page.locator(signInBtn).click();
    await expect(page.locator(errorPanel)).not.toBeVisible();
    await expect(page).toHaveURL("https://demo.learnwebdriverio.com/");
    const response = await responsePromise;
    expect(response.status()).toBe(200);
    await expect(page.locator(userLogged).first()).toBeVisible()
  });

  test("AQA-14 invalid user registration attempt", { tag: ['@smoke-wb', '@registration-wb'] }, async ({ page }) => {
    const responsePromise = page.waitForResponse('https://conduit-api.learnwebdriverio.com/api/users');
    await page.locator(usernameInput).fill(invalidUser);
    await page.locator(emailInput).fill(invalidEmail);
    await page.locator(passwordInput).fill(invalidPassword);
    await page.locator(signInBtn).click();
    const response = await responsePromise;
    expect(response.status()).not.toBe(200);
    await expect(page.locator(errorPanel).getByText('username is invalid')).toBeVisible();
    await expect(page.locator(errorPanel).getByText('email is invalid')).toBeVisible();

    await expect(page).toHaveURL("https://demo.learnwebdriverio.com/register");
  });
});