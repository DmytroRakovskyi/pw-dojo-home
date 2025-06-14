import { test, expect, chromium, Locator, BrowserContext } from '@playwright/test';
import { invalidData, dataGenerator } from '../../../utils/data-generator';
import { baseUrlWebDriver } from '../../../utils/constants';
import { RegistrationPage } from '../../../pages/webdriverio/RegisrationPage';
import { LoginPage } from '../../../pages/webdriverio/LoginPage';

let registeredUser: any;
const { invalidEmail, invalidPassword } = invalidData;
registeredUser = dataGenerator();
const { uniqueUser, userEmail, userPassword } = registeredUser;

test.beforeAll(async () => {
  // Register a user before running tests
  const browser = await chromium.launch();
  const context: BrowserContext = await browser.newContext();
  const page = await context.newPage();
  const registerPage = new RegistrationPage(page);
  await registerPage.goToRegisterPage();
  await registerPage.userRegistration(uniqueUser, userEmail, userPassword);
  await expect(page).toHaveURL(baseUrlWebDriver);
  await browser.close();
});

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
});

test.describe('login functionality', { tag: ['@smoke-wb', '@login-wb'] }, () => {
  test('WB-3 valid user login', { tag: ['@smoke-wb', '@login-wb'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.userLogin(userEmail, userPassword);
    await expect(loginPage.errorPanel).not.toBeVisible();
    await expect(loginPage.userProfileButton).toContainText(registeredUser.uniqueUser);
    await expect(page).toHaveURL(baseUrlWebDriver);
  });

  test('WB-4 invalid user login attempt', { tag: ['@smoke-wb', '@login-wb'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.userLogin(invalidEmail, invalidPassword);
    await expect(loginPage.errorPanel).toBeVisible();
    await expect(loginPage.userProfileButton).not.toBeVisible();
    await expect(page).toHaveURL(`${baseUrlWebDriver}/login`);
  });
});
