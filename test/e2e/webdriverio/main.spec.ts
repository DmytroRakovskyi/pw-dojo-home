import { Page, test, expect, Locator } from '@playwright/test';
import { MainPage } from '../../../pages/webdriverio/MainPage';
import { RegistrationPage } from '../../../pages/webdriverio/RegisrationPage';
import { dataGenerator } from '../../../utils/data-generator';
import { baseUrlWebDriver } from '../../../utils/constants';
import { goTo } from '../../../utils/navigation';

let registeredUser: any;
registeredUser = dataGenerator();

const { uniqueUser, userEmail, userPassword } = registeredUser;

test.describe('POM-0, main page', { tag: ['@smoke-wb', '@main'] }, () => {
  test.beforeEach(async ({ page }) => {
    let registerPage = new RegistrationPage(page);
    await goTo(page, baseUrlWebDriver, '/register');
    await registerPage.userRegistration(uniqueUser, userEmail, userPassword);
    await expect(page).toHaveURL(baseUrlWebDriver);
  });

  test('POM-1, main page functionality', { tag: ['@smoke-wb', '@main'] }, async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.myFeedButton.click();
    await expect(page).toHaveURL(`${baseUrlWebDriver}/my-feed`);
    await expect(mainPage.articlePreview).toHaveText('No articles are here... yet.');
    await mainPage.globalFeedButton.click();
    await expect(page).toHaveURL(`${baseUrlWebDriver}`);
    const tag: Locator = await mainPage.getByTagBefore('demo');
    await tag.click();
    const tagAfter: Locator = await mainPage.getByTagAfter('demo');
    await expect(tagAfter).toBeVisible();
  });
});
