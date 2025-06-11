import {expect, Locator, Page, test } from '@playwright/test';
export const baseUrl = 'https://demo.learnwebdriverio.com';



export class RegistrationPage {

page: Page;
userNameInput:Locator;
emailInput: Locator;
passwordInput: Locator;
signInButton:Locator;
articleTitle: Locator;
articleAbout: Locator;
articleTextArea: Locator;
articleFeedContent: Locator;
userProfileButton: Locator;
logOutButton: Locator;
errorPanel: Locator;
articleTextAreaContent:Locator;
publishButton: Locator;

constructor(page: Page) {
this.page = page;
this.userNameInput = page.locator("input[placeholder*='User']");
this.emailInput = page.locator("input[placeholder*='Email']");
this.passwordInput = page.locator("input[placeholder*='Password']");
this.signInButton =page.locator('button.btn');
this.articleTitle =  page.locator("input[placeholder*='Title']");
this.articleAbout = page.locator("input[placeholder*='about']");
this.articleTextArea = page.locator("textarea[placeholder*='your']");
this.articleFeedContent = page.locator('.article-preview');
this.userProfileButton =  page.locator(`a[href*='user'].nav-link`);
this.logOutButton = page.locator("button[class*='danger']");
this.errorPanel = page.locator(".error-messages");
this.articleTextAreaContent = page.locator("[class*='v-show-content s']");
this.publishButton = page.locator('button[data-qa-id="editor-publish"]');
}

 async  goTo(urlDomen: string, urlPath?: string) {
  await this.page.goto(`${urlDomen}${urlPath}`);
}
async  userRegistration(
  userName: string,
  userEmail: string,
  userPassword: string
) {
  await this.userNameInput.fill(userName);
  await this.emailInput.fill(userEmail);
  await this.passwordInput.fill(userPassword);
  await this.signInButton.click();
}
async userLogout () {
   await this.goTo(baseUrl, '/settings');
   await this.logOutButton.click()
   await expect(this.page).toHaveURL(`${baseUrl}/`);
}

 async userLogin(userEmail: string, userPassword: string) {
  await this.emailInput.fill(userEmail);
  await this.passwordInput.fill(userPassword);
  await this.signInButton.click();
}

 async fillArticle(title: string, about: string, text: string) {

  await this.articleTitle.fill(title);
  await this.articleAbout.fill(about);
  await this.articleTextArea.fill(text);
}

async verifyArticleText (text: string) {
 
  await expect(this.articleTextAreaContent).toContainText(text);
};

  async publishArticle () {

  await this.publishButton.click();
};
}





