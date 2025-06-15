import { expect, Locator, Page, test } from '@playwright/test';
import { goTo } from '../../utils/navigation';
import { baseUrlWebDriver } from '../../utils/constants';

export class RegistrationPage {
  page: Page;
  userNameInput: Locator;
  emailInput: Locator;
  passwordInput: Locator;
  signInButton: Locator;
  userProfileButton: Locator;
  logOutButton: Locator;
  errorPanel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator("input[placeholder*='User']");
    this.emailInput = page.locator("input[placeholder*='Email']");
    this.passwordInput = page.locator("input[placeholder*='Password']");
    this.signInButton = page.locator('button.btn');
    this.userProfileButton = page.locator(`a[href*='user'].nav-link`);
    this.logOutButton = page.locator("button[class*='danger']");
    this.errorPanel = page.locator('.error-messages');
  }

  async userRegistration(userName: string, userEmail: string, userPassword: string) {
    await this.userNameInput.fill(userName);
    await this.emailInput.fill(userEmail);
    await this.passwordInput.fill(userPassword);
    await this.signInButton.click();
  }
  async userLogout() {
    await goTo(this.page, baseUrlWebDriver, '/settings');
    await this.logOutButton.click();
    await expect(this.page).toHaveURL(`${baseUrlWebDriver}/`);
  }
}
