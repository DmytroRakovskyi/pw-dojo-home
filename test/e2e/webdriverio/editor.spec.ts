import { test, expect, Locator, Page } from '@playwright/test';
import { dataGenerator } from '../../../utils/data-generator';
import article from '../../../utils/testdata/article.json';
import { goTo } from '../../../utils/navigation';
import { baseUrl } from '../../../utils/constants';

import { RegistrationPage } from '../../../pages/registration-page';
import { LoginPage } from '../../../pages/login-page';
import { EditorPage } from '../../../pages/editor-page';





let registeredUser: any;
registeredUser = dataGenerator();
const { uniqueUser, userEmail, userPassword } = registeredUser;

test.beforeEach(async ({ page }) => {
  const registerPage = new RegistrationPage(page);
  const loginPage = new LoginPage(page);

  await goTo(page, baseUrl, '/register');
  await registerPage.userRegistration(uniqueUser, userEmail, userPassword);
  await expect(page).toHaveURL(baseUrl);
  await registerPage.userLogout();
  await goTo(page, baseUrl, '/login');
  await loginPage.userLogin(userEmail, userPassword);
  await expect(registerPage.userProfileButton).toBeVisible();
});

test.describe('editor page functionality', () => {
  test('AQA-17 fullfilled article creation', { tag: ['@smoke-wb', '@editor'] }, async ({ page }) => {
    const ARTICLES_COUNT = 5;
    const editorPage = new EditorPage(page);
    for (let i: number = 1; i <= ARTICLES_COUNT; i++) {
      await goTo(page, baseUrl, '/editor');
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
