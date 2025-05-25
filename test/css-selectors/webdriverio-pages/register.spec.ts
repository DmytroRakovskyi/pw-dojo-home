import { test, expect, Locator } from "@playwright/test";
import { dataGenerator, invalidData } from "../../../utils/utils";

const { uniqueUser, userEmail, userPassword } = dataGenerator();
const { invalidUser, invalidEmail, invalidPassword } = invalidData;
const baseUrl: string = "https://demo.learnwebdriverio.com";

test.beforeEach(async ({ page }) => {
  await page.goto(`${baseUrl}/register`);
});

test.describe("register functionality", () => {
  test("AQA-13 valid user registration", { tag: ["@smoke-wb", "@registration-wb"] }, async ({ page }) => {
    const userNameInput: Locator = page.locator("input[placeholder*='User']");
    const emailInput: Locator = page.locator("input[placeholder*='Email']");
    const passwordInput: Locator = page.locator("input[placeholder*='Password']");
    const signInButton: Locator = page.locator("button.btn");
    const errorPanel: Locator = page.locator(".error-messages");
    const userlLink: Locator = page.locator("a[href*='user']");

    const responsePromise = page.waitForResponse("https://conduit-api.learnwebdriverio.com/api/users");
    await userNameInput.fill(uniqueUser);
    await emailInput.fill(userEmail);
    await passwordInput.fill(userPassword);
    await signInButton.click();
    await expect(errorPanel).not.toBeVisible();
    await expect(page).toHaveURL(baseUrl);
    const response = await responsePromise;
    expect(response.status()).toBe(200);
    await expect(userlLink.first()).toBeVisible();
  });

  test("AQA-14 invalid user registration attempt", { tag: ["@smoke-wb", "@registration-wb"] }, async ({ page }) => {
    const userNameInput: Locator = page.locator("input[placeholder*='User']");
    const emailInput: Locator = page.locator("input[placeholder*='Email']");
    const passwordInput: Locator = page.locator("input[placeholder*='Password']");
    const signInButton: Locator = page.locator("button.btn");
    const errorPanel: Locator = page.locator(".error-messages");

    const responsePromise = page.waitForResponse("https://conduit-api.learnwebdriverio.com/api/users");
    await userNameInput.fill(invalidUser);
    await emailInput.fill(invalidEmail);
    await passwordInput.fill(invalidPassword);
    await signInButton.click();
    const response = await responsePromise;
    expect(response.status()).not.toBe(200);
    await expect(errorPanel.getByText("username is invalid")).toBeVisible();
    await expect(errorPanel.getByText("email is invalid")).toBeVisible();

    await expect(page).toHaveURL(`${baseUrl}/register`);
    });

  });
