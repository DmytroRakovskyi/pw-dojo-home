import { test, expect, chromium, Locator } from '@playwright/test';
import { invalidData, dataGenerator } from '../../../utils/utils';
import { userLogin, errorPanel, userProfileButton } from './helpers/registration-helper';

let registeredUser: any;
const { invalidEmail, invalidPassword } = invalidData;
const baseUrl = 'https://demo.learnwebdriverio.com';
registeredUser = dataGenerator();
const { uniqueUser, userEmail, userPassword } = registeredUser;

test.beforeAll(async () => {
  // Register a user before running tests
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const userNameInput: Locator = page.locator("input[placeholder*='User']");
  const emailInput: Locator = page.locator("input[placeholder*='Email']");
  const passwordInput: Locator = page.locator("input[placeholder*='Password']");
  const signInButton: Locator = page.locator('button.btn');

  await page.goto(`${baseUrl}/register`);
  await userNameInput.fill(uniqueUser);
  await emailInput.fill(userEmail);
  await passwordInput.fill(userPassword);
  await signInButton.click();
  await expect(page).toHaveURL(baseUrl);
  await browser.close();
});

test.beforeEach(async ({ page }) => {
  await page.goto(`${baseUrl}/login`);
});

test.describe('login functionality', () => {
  test('AQA-15 valid user login', { tag: ['@smoke-wb', '@login'] }, async ({ page }) => {
    userLogin(page, userEmail, userPassword);
    await expect(errorPanel(page)).not.toBeVisible();
    await expect(userProfileButton(page)).toContainText(registeredUser.uniqueUser);
    await expect(page).toHaveURL(baseUrl)
  });

  test('AQA-16 invalid user login attempt', { tag: ['@smoke-wb', '@login'] }, async ({ page }) => {

    userLogin(page, invalidEmail, invalidPassword)
    await expect(errorPanel(page)).toBeVisible();
    await expect(userProfileButton(page)).not.toBeVisible();
    await expect(page).toHaveURL(`${baseUrl}/login`)
  });
});
