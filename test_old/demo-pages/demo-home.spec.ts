import { test, expect } from "@playwright/test";
import { validData, invalidData } from "../../utils/utils";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.learnwebdriverio.com/login");
  const { validUser, validEmail, validPassword } = validData;

  await page.getByRole("textbox", { name: "Email" }).fill(validEmail);
  await expect(page.getByRole("textbox", { name: "Email" })).toHaveValue(validEmail);
  await page.getByRole("textbox", { name: "Password" }).fill(validPassword);
  await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(validPassword);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL("https://demo.learnwebdriverio.com");
});

test.describe("home page functionality", () => {
  test("AQA-17 fullfilled article creation", { tag: ["@smoke-demo", "@home-demo"] }, async ({ page }) => {
    await page.getByRole("link", { name: '  New Article' }).first().click();
    await expect(page.getByRole("group").first()).toBeVisible();
    await page.getByRole("textbox", { name: "Article Title" }).fill("Article new");
    await expect(page.getByRole("textbox", { name: "Article Title" })).toHaveValue("Article new");
    await page.getByRole("textbox", { name: "What's this article about?" }).fill("Article new text");
    await expect(page.getByRole("textbox", { name: "What's this article about?" })).toHaveValue("Article new text");

    await page.getByRole('textbox', { name: 'Write your article (in' }).fill("Article text: thank you for attention!");
    await expect(page.getByRole('textbox', { name: 'Write your article (in' })).toHaveValue("Article text: thank you for attention!");
    await expect(page.getByRole('paragraph')).toHaveText("Article text: thank you for attention!"); // to fix...
    await page.getByTestId("editor-publish").click();
    await expect(page).toHaveURL(/\/articles\/[^\/]+$/)
  });
});
