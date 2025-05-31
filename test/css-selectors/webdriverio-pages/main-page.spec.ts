import { test, expect, Locator, Page } from '@playwright/test';
import { dataGenerator } from '../../../utils/utils';
import article from '../../../testdata/article.json';


const baseUrl = 'https://demo.learnwebdriverio.com';
let registeredUser: any;
registeredUser = dataGenerator();
const { uniqueUser, userEmail, userPassword } = registeredUser;

async function goTo(page: Page, urlDomen: string, urlPath?: string) {
  await page.goto(`${urlDomen}${urlPath}`);
}

const userNameInput = (page: Page) => page.locator("input[placeholder*='User']");
const emailInput = (page: Page) => page.locator("input[placeholder*='Email']");
const passwordInput = (page: Page) => page.locator("input[placeholder*='Password']");
const signInButton = (page: Page) => page.locator('button.btn');
const articleTitle = (page:Page) => page.locator("input[placeholder*='Title']");
const articleAbout = (page:Page) => page.locator("input[placeholder*='about']");
const articleTextArea = (page:Page) => page.locator("textarea[placeholder*='your']");
const articleFeedContent = (page:Page) => page.locator('.article-preview');
const userProfileButton = async (page: Page) => page.locator(`a[href*='user'].nav-link`);
const ARTICLES_COUNT = 5
const logOutButton = (page:Page) => page.locator("button[class*='danger']");


async function userRegistration(
  page: Page,
  userName: string,
  userEmail: string,
  userPassword: string,
) {
  await userNameInput(page).fill(userName);
  await emailInput(page).fill(userEmail);
  await passwordInput(page).fill(userPassword);
  await signInButton(page).click();
  await expect(page).toHaveURL(baseUrl);
}

async function userLogout (page:Page) {
   await goTo(page, baseUrl, '/settings');
   await logOutButton(page).click()
   await expect(page).toHaveURL(`${baseUrl}/`);
}

async function userLogin(page: Page, userEmail: string, userPassword: string) {
  await emailInput(page).fill(userEmail);
  await passwordInput(page).fill(userPassword);
  await signInButton(page).click();
  await expect(page).toHaveURL(baseUrl);
}

async function FillArticle(page: Page, title: string, about: string, text: string) {

  await articleTitle(page).fill(title);
  await articleAbout(page).fill(about);
  await articleTextArea(page).fill(text);
}

const verifyArticleText = async (page: Page, text: string) => {
  const articleTextAreaContent: Locator = page.locator("[class*='v-show-content s']");
  await expect(articleTextAreaContent).toContainText(text);
};

const publishArticle = async (page: Page) => {
  const publishButton: Locator = page.locator('button[data-qa-id="editor-publish"]');
  await publishButton.click();
};



test.beforeEach(async ({ page }) => {
  await goTo(page, baseUrl, '/register');
  await userRegistration(page, uniqueUser, userEmail, userPassword);
  await userLogout(page)
  await goTo(page, baseUrl, '/login')
  await userLogin(page, userEmail, userPassword);
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
