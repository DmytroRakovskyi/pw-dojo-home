import { test, expect, Page } from '@playwright/test';
import { dataGenerator, invalidData } from '../../../utils/utils';
import {
  goTo,
  userRegistration,
  errorPanel,
  userProfileButton,
  baseUrl,
} from './helpers/registration-helper';

const { uniqueUser, userEmail, userPassword } = dataGenerator();
const { invalidUser, invalidEmail, invalidPassword } = invalidData;
const responsePromise = (page: Page, response: string) => page.waitForResponse(response);

test.beforeEach(async ({ page }) => {
  await goTo(page, baseUrl, '/register');
});

test.describe('register functionality', () => {
  test(
    'AQA-13 valid user registration',
    { tag: ['@smoke-wb', '@registration-wb'] },
    async ({ page }) => {
      const respPromise: any = responsePromise(
        page,
        'https://conduit-api.learnwebdriverio.com/api/users',
      );
      await userRegistration(page, uniqueUser, userEmail, userPassword);
      const response = await respPromise;
      await expect(errorPanel(page)).not.toBeVisible();
      await expect(page).toHaveURL(baseUrl);
      expect(response.status()).toBe(200);
      await expect(userProfileButton(page)).toBeVisible();
    },
  );

  test(
    'AQA-14 invalid user registration attempt',
    { tag: ['@smoke-wb', '@registration-wb'] },
    async ({ page }) => {
      const respPromise: any = responsePromise(
        page,
        'https://conduit-api.learnwebdriverio.com/api/users',
      );
      await userRegistration(page, invalidUser, invalidEmail, invalidPassword);
      const response = await respPromise;
      expect(response.status()).not.toBe(200);
      await expect(errorPanel(page).getByText('username is invalid')).toBeVisible();
      await expect(errorPanel(page).getByText('email is invalid')).toBeVisible();
      await expect(page).toHaveURL(`${baseUrl}/register`);
    },
  );
});
