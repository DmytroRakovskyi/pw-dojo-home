import { test, expect, Locator, Page } from '@playwright/test';
import { dataGenerator } from '../../../utils/data-generator';
import article from '../../../utils/testdata/article.json';
import { baseUrlWebDriver } from '../../../utils/constants';

import { RegistrationPage } from '../../../pages/webdriverio/RegisrationPage';
import { LoginPage } from '../../../pages/webdriverio/LoginPage';
import { EditorPage } from '../../../pages/webdriverio/EditorPage';

let registeredUser: any;
registeredUser = dataGenerator();
const { uniqueUser, userEmail, userPassword } = registeredUser;

test.beforeEach(async ({ page }) => {
  const registerPage = new RegistrationPage(page);
  const loginPage = new LoginPage(page);

  await registerPage.goToRegisterPage();
  await registerPage.userRegistration(uniqueUser, userEmail, userPassword);
  await expect(page).toHaveURL(baseUrlWebDriver);
  await registerPage.userLogout();
  await loginPage.goToLoginPage();
  await loginPage.userLogin(userEmail, userPassword);
  await expect(registerPage.userProfileButton).toBeVisible();
});

test.describe('editor page functionality', () => {
  test('WB-6, fullfilled article creation', { tag: ['@smoke-wb', '@editor'] }, async ({ page }) => {
    const ARTICLES_COUNT = 5;
    const editorPage = new EditorPage(page);
    for (let i: number = 1; i <= ARTICLES_COUNT; i++) {
      await editorPage.goToEditorPage();
      await editorPage.fillArticle(`${article.title} ${i}`, article.about, article.text);
      await editorPage.verifyArticleText(article.text);
      await editorPage.publishArticle();
      await expect(page).toHaveURL(/\/articles\/[^\/]+$/);
      await editorPage.userProfileButton.click();
      await expect(page.getByTestId('profile-username')).toBeVisible();
    }

    await expect(editorPage.articleFeedContent).toHaveCount(ARTICLES_COUNT);
  });
});
