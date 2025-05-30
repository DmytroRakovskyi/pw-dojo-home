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

async function userRegistration(
  page: Page,
  uniqueUser: string,
  userEmail: string,
  userPassword: string,
) {
  const userNameInput: Locator = page.locator("input[placeholder*='User']");
  const emailInput: Locator = page.locator("input[placeholder*='Email']");
  const passwordInput: Locator = page.locator("input[placeholder*='Password']");
  const signInButton: Locator = page.locator('button.btn');

  await goTo(page, baseUrl, '/register');
  await userNameInput.fill(uniqueUser);
  await emailInput.fill(userEmail);
  await passwordInput.fill(userPassword);
  await signInButton.click();
  await expect(page).toHaveURL(baseUrl);
}

async function userLogin(page: Page, userEmail: string, userPassword: string) {
  const emailInput: Locator = page.locator("input[placeholder*='Email']");
  const passwordInput: Locator = page.locator("input[placeholder*='Password']");
  const signInButton: Locator = page.locator('button.btn');
  await goTo(page, baseUrl, '/login');
  await emailInput.fill(userEmail);
  await passwordInput.fill(userPassword);
  await signInButton.click();
  await expect(page).toHaveURL(baseUrl);
}

async function toFillArticle(page: Page, title: string, about: string, text: string) {
  const articleTitle: Locator = page.locator("input[placeholder*='Title']");
  const articleAbout: Locator = page.locator("input[placeholder*='about']");

  const articleTextArea: Locator = page.locator("textarea[placeholder*='your']");

  await articleTitle.fill(title);
  await articleAbout.fill(about);
  await articleTextArea.fill(text);
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
  await userRegistration(page, uniqueUser, userEmail, userPassword);
  await userLogin(page, userEmail, userPassword);
});

test.describe('home page functionality', () => {
  test('AQA-17 fullfilled article creation', { tag: ['@smoke-wb', '@home'] }, async ({ page }) => {
    const editorButton: Locator = page.locator('a[href="/editor"]');
    const userProfileButton: Locator = page.locator(`a[href*='user'].nav-link`);
    const articleFeedContent: Locator = page.locator('.article-preview');
    const acticlesCount = 3;

    for (let i: number = 0; i < acticlesCount; i++) {
      await editorButton.click();
      await goTo(page, baseUrl, '/editor')
      await toFillArticle(page, article.title, article.about, article.text);
      await verifyArticleText(page, article.text);
      await publishArticle(page);
      await expect(page).toHaveURL(/\/articles\/[^\/]+$/);
      await userProfileButton.click();
      await expect(page.getByTestId('profile-username')).toBeVisible();
    }
    await expect(articleFeedContent).toHaveCount(3);
  });
});
