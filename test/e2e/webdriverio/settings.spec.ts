import { test, Page, expect } from '@playwright/test';
import { RegistrationPage } from '../../../pages/webdriverio/RegisrationPage';
import { SettingsPage } from '../../../pages/webdriverio/SettingsPage';
import { baseUrlWebDriver } from '../../../utils/constants';
import { dataGenerator, userData } from '../../../utils/data-generator';
import { HomePage } from '../../../pages/webdriverio/HomePage';
import { th } from '@faker-js/faker/.';

const { uniqueUser, userEmail, userPassword } = dataGenerator();

test.describe('Settings page', { tag: ['@smoke-wb', '@settings-wb'] }, () => {
  test.beforeEach(async ({ page }) => {
    const registerPage = new RegistrationPage(page);
    await registerPage.goToRegisterPage();
    await registerPage.userRegistration(uniqueUser, userEmail, userPassword);
    await expect(page).toHaveURL(baseUrlWebDriver);
  });

  //test fails due to the issue with the settings page
  test('settings can be updated', { tag: ['@smoke-wb', '@settings-wb'] }, async ({ page }) => {
    const settingsPage = new SettingsPage(page);
    const homePage = new HomePage(page);
    const responsePromise: Promise<any> = page.waitForResponse('**/api/user');
    await homePage.settingsButton.click();
    await settingsPage.updateSettings(userData);
    if (userData.username === undefined) throw new Error('Username is not defined');
    await expect(settingsPage.userNameInput).toHaveValue(userData.username);
    if (userData.bio === undefined) throw new Error('Bio is not defined');
    await expect(settingsPage.bioInput).toHaveValue(userData.bio);
    await settingsPage.updateSettingsButton.click();
    const response = await responsePromise;
    expect(response.status()).toEqual(200);
    await expect(page).toHaveURL(baseUrlWebDriver);
  });
});
