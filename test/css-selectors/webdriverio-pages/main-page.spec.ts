import { test, expect, Locator, Page } from '@playwright/test';
import { dataGenerator } from '../../../utils/utils';
import article from '../../../testdata/article.json';
import { RegistrationPage, baseUrl } from '../../../pages/registration-page';


const ARTICLES_COUNT = 5;

let registeredUser: any;
registeredUser = dataGenerator();
const { uniqueUser, userEmail, userPassword } = registeredUser;

test.beforeEach(async ({ page }) => {
  const registerPage = new RegistrationPage(page);
  await registerPage.goTo(baseUrl, '/register');
  await registerPage.userRegistration(uniqueUser, userEmail, userPassword);
  await expect(page).toHaveURL(baseUrl);
  await  registerPage.userLogout;
  await  registerPage.goTo(baseUrl, '/login');
  await registerPage.userLogin(userEmail, userPassword);
  await expect(registerPage.userProfileButton).toBeVisible();
});

test.describe('home page functionality', () => {
  test('AQA-17 fullfilled article creation', { tag: ['@smoke-wb', '@home'] }, async ({ page }) => {
      const registerPage = new RegistrationPage(page);
    for (let i: number = 1; i <= ARTICLES_COUNT; i++) {
      await registerPage.goTo(baseUrl, '/editor');
      await registerPage.fillArticle(`${article.title} ${i}`, article.about, article.text);
      await registerPage.verifyArticleText(article.text);
      await registerPage.publishArticle();
      await expect(page).toHaveURL(/\/articles\/[^\/]+$/);
      await registerPage.userProfileButton.click();
      await expect(page.getByTestId('profile-username')).toBeVisible();
    }
    await expect(registerPage.articleFeedContent).toHaveCount(ARTICLES_COUNT);
  });
});
