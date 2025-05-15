import { test, expect } from "@playwright/test";
import { dataGenerator, invalidData } from "../../utils/utils";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/register");
});

test.describe("register functionality", () => {
  test("AQA-13 valid user registration", { tag: ['@smoke-demo', '@registration-demo'] }, async ({ page }) => {
    const { uniqueUser, userEmail, userPassword } = dataGenerator();
    await page.getByRole("textbox", { name: "Username" }).fill(uniqueUser);
    await expect(page.getByRole("textbox", { name: "Username" })).toHaveValue(uniqueUser);
    await page.getByRole("textbox", { name: "Email" }).fill(userEmail);
    await expect(page.getByRole("textbox", { name: "Email" })).toHaveValue(userEmail);
    await page.getByRole("textbox", { name: "Password" }).fill(userPassword);
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(userPassword);
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.waitForTimeout(100);
    await expect(page.getByText("username is invalid")).not.toBeVisible();
    await expect(page).toHaveURL("https://demo.learnwebdriverio.com/");
    await expect(page.getByRole("link", { name: uniqueUser })).toBeVisible();
  });

  test("AQA-14 invalid user registration attempt", { tag: ['@smoke-demo', '@registration-demo'] }, async ({ page }) => {
    const { invalidUser, invalidEmail, invalidPassword } = invalidData;

    await page.getByRole("textbox", { name: "Username" }).fill(invalidUser);
    await expect(page.getByRole("textbox", { name: "Username" })).toHaveValue(invalidUser);
    await page.getByRole("textbox", { name: "Email" }).fill(invalidEmail);
    await expect(page.getByRole("textbox", { name: "Email" })).toHaveValue(invalidEmail);
    await page.getByRole("textbox", { name: "Password" }).fill(invalidPassword);
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(invalidPassword);
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.waitForTimeout(100);
    await expect(page.locator('.error-messages')).toContainText('username is invalidemail is invalid')
    await expect(page.getByText("email is invalid")).toBeVisible();
    await expect(page).toHaveURL("https://demo.learnwebdriverio.com/register");
  });
});
