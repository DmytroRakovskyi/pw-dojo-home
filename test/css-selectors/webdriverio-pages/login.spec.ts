import { test, expect, chromium, Locator } from "@playwright/test";
import { invalidData, dataGenerator } from "../../../utils/utils";

let registeredUser:any;
const { uniqueUser, userEmail, userPassword } = dataGenerator();
const { invalidEmail, invalidPassword } = invalidData;
const baseUrl = "https://demo.learnwebdriverio.com";


test.beforeAll(async () => {



  // Register a user before running tests
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const userNameInput: Locator = page.locator("input[placeholder*='User']")
  const emailInput: Locator = page.locator("input[placeholder*='Email']")
  const passwordInput: Locator = page.locator("input[placeholder*='Password']")
  const signInButton: Locator = page.locator("button.btn");

  registeredUser = dataGenerator();
  const { uniqueUser, userEmail, userPassword } = registeredUser;

  await page.goto(`${baseUrl}/register`);
  await userNameInput.fill(uniqueUser);
  await emailInput.fill(userEmail);
  await passwordInput.fill(userPassword);
  await signInButton.click();
  await expect(page).toHaveURL(baseUrl);
  await browser.close()



});

test.beforeEach(async ({ page }) => {
  await page.goto(`${baseUrl}/login`);
});

test.describe("login functionality", () => {
  test("AQA-15 valid user login", { tag: ["@smoke-wb", "@login"] }, async ({ page }) => {
    const emailInput: Locator = page.locator("input[placeholder*='Email']");
  const passwordInput: Locator = page.locator("input[placeholder*='Password']");
    const signInButton: Locator = page.locator("button.btn");
    const errorPanel: Locator = page.locator('.error-messages');
    const userlLink: Locator = page.locator("a[href*='user']");
  
    await emailInput.fill(registeredUser.userEmail);
    await passwordInput.fill(registeredUser.userPassword);
    await signInButton.click();
    await expect(errorPanel).not.toBeVisible();
    await expect(page).toHaveURL(baseUrl);
    await expect(userlLink.first()).toContainText(registeredUser.uniqueUser);
  });

  test("AQA-16 invalid user login attempt", { tag: ["@smoke-wb", "@login"] }, async ({ page }) => {
    const emailInput: Locator = page.locator("input[placeholder*='Email']");
  const passwordInput: Locator = page.locator("input[placeholder*='Password']");
    const signInButton: Locator = page.locator("button.btn");
    const errorPanel: Locator = page.locator('.error-messages');
    const userlLink: Locator = page.locator("a[href*='user']");
    
  

    await emailInput.fill(invalidEmail);
    await expect(emailInput).toHaveValue(invalidEmail);
    await passwordInput.fill(invalidPassword);
    await expect(passwordInput).toHaveValue(invalidPassword);
    await signInButton.click();
    await expect(errorPanel).toBeVisible();
    await expect(page).toHaveURL(`${baseUrl}/login`);
    await expect(userlLink).not.toBeVisible();
  });
});
