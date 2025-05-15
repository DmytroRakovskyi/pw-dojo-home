import { test, expect } from "@playwright/test";
import { validData, invalidData } from "../../utils/utils";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/login");
});

test.describe("login functionality", () => {

  test("AQA-15 valid user login", { tag: ["@smoke-demo", "@login-demo"] }, async ({page}) => {
    const { validUser, validEmail, validPassword } = validData;

    await page.getByRole("textbox", { name: "Email" }).fill(validEmail);
    await expect(page.getByRole("textbox", { name: "Email" })).toHaveValue(validEmail);
    await page.getByRole("textbox", { name: "Password" }).fill(validPassword);
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(validPassword);
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.waitForTimeout(100);
    await expect(page.getByText("username is invalid")).not.toBeVisible();
    await expect(page).toHaveURL("https://demo.learnwebdriverio.com/");
    await expect(page.getByTestId("site-nav")).toContainText("user12345");
  });

  test("AQA-16 invalid user login attempt", { tag: ["@smoke-demo", "@login-demo"] }, async ({ page }) => {
    const { invalidUser, invalidEmail, invalidPassword } = invalidData;

    await page.getByRole("textbox", { name: "Email" }).fill(invalidEmail);
    await expect(page.getByRole("textbox", { name: "Email" })).toHaveValue(invalidEmail);
    await page.getByRole("textbox", { name: "Password" }).fill(invalidPassword);
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(invalidPassword);
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.waitForTimeout(100);
    await expect(page.getByText("email or password is invalid")).toBeVisible();
    await expect(page).toHaveURL("https://demo.learnwebdriverio.com/login");
  });

});
