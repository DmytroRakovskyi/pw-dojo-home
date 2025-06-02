import { test, expect, Locator, Page } from '@playwright/test';
import { dataGenerator } from '../../../utils/utils';
import article from '../../../testdata/article.json';
import {
  goTo,
  userRegistration,
  userLogout,
  userLogin,
  userNameInput,
  userProfileButton,
  baseUrl,
  FillArticle,
  verifyArticleText,
  passwordInput,
  publishArticle,
  articleFeedContent,
} from './helpers/registration-helper';
const ARTICLES_COUNT = 5;

let registeredUser: any;
registeredUser = dataGenerator();
const { uniqueUser, userEmail, userPassword } = registeredUser;

test.beforeEach(async ({ page }) => {
  await goTo(page, baseUrl, '/register');
  await userRegistration(page, uniqueUser, userEmail, userPassword);
  await expect(page).toHaveURL(baseUrl);
  await userLogout(page);
  await goTo(page, baseUrl, '/login');
  await userLogin(page, userEmail, userPassword);
  await expect(userProfileButton(page)).toBeVisible();
});

test.describe('home page functionality', () => {
  test('AQA-17 fullfilled article creation', { tag: ['@smoke-wb', '@home'] }, async ({ page }) => {
    for (let i: number = 1; i <= ARTICLES_COUNT; i++) {
      await goTo(page, baseUrl, '/editor');
      await FillArticle(page, `${article.title} ${i}`, article.about, article.text);
      await verifyArticleText(page, article.text);
      await publishArticle(page);
      await expect(page).toHaveURL(/\/articles\/[^\/]+$/);
      (await userProfileButton(page)).click();
      await expect(page.getByTestId('profile-username')).toBeVisible();
    }
    await expect(articleFeedContent(page)).toHaveCount(ARTICLES_COUNT);
  });
});
