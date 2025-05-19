import { test, expect, chromium } from "@playwright/test";
import { invalidData, dataGenerator } from "../../utils/utils";
let registeredUser:any;
const { uniqueUser, userEmail, userPassword } = dataGenerator();
const { invalidEmail, invalidPassword } = invalidData;
const usernameInput = 'input[placeholder="Username"]';
const emailInput = 'input[placeholder="Email"]';
const passwordInput = 'input[placeholder="Password"]';
const signInBtn = 'button[class*="btn-lg"]';
const userLogged = `a[href*="user"]`;
const errorPanel = 'ul[class="error-messages"] li';

test.beforeAll(async () => {
  registeredUser = dataGenerator();
  const { uniqueUser, userEmail, userPassword } = registeredUser;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://demo.learnwebdriverio.com/register");
  await page.locator(usernameInput).fill(uniqueUser);
  await page.locator(emailInput).fill(userEmail);
  await page.locator(passwordInput).fill(userPassword);
  await page.locator(signInBtn).click();
  await expect(page).toHaveURL("https://demo.learnwebdriverio.com/");
  await browser.close();
});

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/login");
});

test.describe("login functionality", () => {
  test("AQA-15 valid user login", { tag: ["@smoke-wb", "@login"] }, async ({ page }) => {
    await page.locator(emailInput).fill(registeredUser.userEmail);
    await page.locator(passwordInput).fill(registeredUser.userPassword);
    await page.locator(signInBtn).click();
    await page.waitForTimeout(100);
    await expect(page.locator(errorPanel)).not.toBeVisible();
    await expect(page).toHaveURL("https://demo.learnwebdriverio.com/");
    await expect(page.locator(userLogged).first()).toContainText(registeredUser.uniqueUser);
  });

  test("AQA-16 invalid user login attempt", { tag: ["@smoke-wb", "@login"] }, async ({ page }) => {
    await page.locator(emailInput).fill(invalidEmail);
    await expect(page.locator(emailInput)).toHaveValue(invalidEmail);
    await page.locator(passwordInput).fill(invalidPassword);
    await expect(page.locator(passwordInput)).toHaveValue(invalidPassword);
    await page.locator(signInBtn).click();
    await page.waitForTimeout(100);
    await expect(page.locator(errorPanel)).toBeVisible();
    await expect(page).toHaveURL("https://demo.learnwebdriverio.com/login");
  });
});
