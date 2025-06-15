import { test, expect, Page } from '@playwright/test';
import { dataGenerator, invalidData } from '../../../utils/data-generator';
import { goTo } from '../../../utils/navigation';
import { baseUrlWebDriver } from '../../../utils/constants';
import { RegistrationPage } from '../../../pages/webdriverio/RegisrationPage';

const { uniqueUser, userEmail, userPassword } = dataGenerator();
const { invalidUser, invalidEmail, invalidPassword } = invalidData;
const responsePromise = (page: Page, response: string) => page.waitForResponse(response);

test.beforeEach(async ({ page }) => {
  const registerPage = new RegistrationPage(page);
  await goTo(page, baseUrlWebDriver, '/register');
});

test.describe('register functionality', () => {
  test(
    'AQA-13 valid user registration',
    { tag: ['@smoke-wb', '@registration-wb'] },
    async ({ page }) => {
      const registerPage = new RegistrationPage(page);
      const respPromise: any = responsePromise(
        page,
        'https://conduit-api.learnwebdriverio.com/api/users',
      );
      await registerPage.userRegistration(uniqueUser, userEmail, userPassword);
      const response = await respPromise;
      await expect(registerPage.errorPanel).not.toBeVisible();
      await expect(page).toHaveURL(baseUrlWebDriver);
      expect(response.status()).toBe(200);
      await expect(registerPage.userProfileButton).toBeVisible();
    },
  );

  test(
    'AQA-14 invalid user registration attempt',
    { tag: ['@smoke-wb', '@registration-wb'] },
    async ({ page }) => {
      const registerPage = new RegistrationPage(page);
      const respPromise: any = responsePromise(
        page,
        'https://conduit-api.learnwebdriverio.com/api/users',
      );
      await registerPage.userRegistration(invalidUser, invalidEmail, invalidPassword);
      const response = await respPromise;
      expect(response.status()).not.toBe(200);
      await expect(registerPage.errorPanel.getByText('username is invalid')).toBeVisible();
      await expect(registerPage.errorPanel.getByText('email is invalid')).toBeVisible();
      await expect(page).toHaveURL(`${baseUrlWebDriver}/register`);
    },
  );
});
