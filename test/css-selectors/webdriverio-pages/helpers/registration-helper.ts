import {expect, Locator, Page } from '@playwright/test';
export const baseUrl = 'https://demo.learnwebdriverio.com';
export const userNameInput = (page: Page) => page.locator("input[placeholder*='User']");
export const emailInput = (page: Page) => page.locator("input[placeholder*='Email']");
export const passwordInput = (page: Page) => page.locator("input[placeholder*='Password']");
export const signInButton = (page: Page) => page.locator('button.btn');
export const articleTitle = (page:Page) => page.locator("input[placeholder*='Title']");
export const articleAbout = (page:Page) => page.locator("input[placeholder*='about']");
export const articleTextArea = (page:Page) => page.locator("textarea[placeholder*='your']");
export const articleFeedContent = (page:Page) => page.locator('.article-preview');
export const userProfileButton = (page: Page) => page.locator(`a[href*='user'].nav-link`);
export const logOutButton = (page:Page) => page.locator("button[class*='danger']");
export const errorPanel =(page: Page)  => page.locator(".error-messages");

export async function goTo(page: Page, urlDomen: string, urlPath?: string) {
  await page.goto(`${urlDomen}${urlPath}`);
}



export async function userRegistration(
  page: Page,
  userName: string,
  userEmail: string,
  userPassword: string
) {
  await userNameInput(page).fill(userName);
  await emailInput(page).fill(userEmail);
  await passwordInput(page).fill(userPassword);
  await signInButton(page).click();
}



export async function userLogout (page:Page) {
   await goTo(page, baseUrl, '/settings');
   await logOutButton(page).click()
   await expect(page).toHaveURL(`${baseUrl}/`);
}

export async function userLogin(page: Page, userEmail: string, userPassword: string) {
  await emailInput(page).fill(userEmail);
  await passwordInput(page).fill(userPassword);
  await signInButton(page).click();
}

export async function FillArticle(page: Page, title: string, about: string, text: string) {

  await articleTitle(page).fill(title);
  await articleAbout(page).fill(about);
  await articleTextArea(page).fill(text);
}

export const verifyArticleText = async (page: Page, text: string) => {
  const articleTextAreaContent: Locator = page.locator("[class*='v-show-content s']");
  await expect(articleTextAreaContent).toContainText(text);
};

export const publishArticle = async (page: Page) => {
  const publishButton: Locator = page.locator('button[data-qa-id="editor-publish"]');
  await publishButton.click();
};

