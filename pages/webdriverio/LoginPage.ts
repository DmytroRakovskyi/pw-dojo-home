import { Page, Locator } from '@playwright/test';
import { baseUrlWebDriver } from '../../utils/constants';

export class LoginPage {
  page: Page;
  userNameInput: Locator;
  emailInput: Locator;
  passwordInput: Locator;
  needAnAccount: Locator;
  userProfileButton: Locator;
  errorPanel: Locator;
  signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator("input[placeholder*='User']");
    this.emailInput = page.locator("input[placeholder*='Email']");
    this.passwordInput = page.locator("input[placeholder*='Password']");
    this.userProfileButton = page.locator(`a[href*='user'].nav-link`);
    this.needAnAccount = page.locator("//a[contains(text(), 'Need')]");
    this.errorPanel = page.locator('.error-messages');
    this.signInButton = page.locator('button.btn');
  }

  async userLogin(userEmail: string, userPassword: string) {
    await this.emailInput.fill(userEmail);
    await this.passwordInput.fill(userPassword);
    await this.signInButton.click();
  }

  async goToLoginPage() {
    await this.page.goto(`${baseUrlWebDriver}/login`);
  }
}
