import { test, expect, chromium, Locator, BrowserContext } from '@playwright/test';
import { invalidData, dataGenerator } from '../../../utils/utils';
import { RegistrationPage } from '../../../pages/registration-page';

let registeredUser: any;
const { invalidEmail, invalidPassword } = invalidData;
const baseUrl = 'https://demo.learnwebdriverio.com';
registeredUser = dataGenerator();
const { uniqueUser, userEmail, userPassword } = registeredUser;

test.beforeAll(async () => {
  // Register a user before running tests
  const browser = await chromium.launch();
  const context: BrowserContext = await browser.newContext();
  const page = await context.newPage();
  const registerPage = new RegistrationPage(page);
  await page.goto(`${baseUrl}/register`);
  await registerPage.userRegistration(uniqueUser, userEmail, userPassword)
  await expect(page).toHaveURL(baseUrl);
  await browser.close();
});

test.beforeEach(async ({ page }) => {
  await page.goto(`${baseUrl}/login`);
});

test.describe('login functionality', () => {
  test('AQA-15 valid user login', { tag: ['@smoke-wb', '@login'] }, async ({ page }) => {

    const registerPage = new RegistrationPage(page);
    registerPage.userLogin(userEmail, userPassword);
    await expect(registerPage.errorPanel).not.toBeVisible();
    await expect(registerPage.userProfileButton).toContainText(registeredUser.uniqueUser);
    await expect(page).toHaveURL(baseUrl)
  });

  test('AQA-16 invalid user login attempt', { tag: ['@smoke-wb', '@login'] }, async ({ page }) => {
    const registerPage = new RegistrationPage(page);
    registerPage.userLogin(invalidEmail, invalidPassword)
    await expect(registerPage.errorPanel).toBeVisible();
    await expect(registerPage.userProfileButton).not.toBeVisible();
    await expect(page).toHaveURL(`${baseUrl}/login`)
  });
});
