import { test, expect, selectors } from "@playwright/test";
const article = require("../../testdata/article.json");

const universalXpath = {
  fullname: "//label[contains(text(),'Full')]",
  "fullname-input": "//label[contains(text(),'Full')]/following::input[1]",
  email: "//label[contains(text(),'Email')]",
  "email-input": "//label[contains(text(),'Email')]/following::input[1]",
  adress: "//label[contains(text(),'Current')]",
  "adress-input": "//label[contains(text(),'Current')]/following::textarea[1]",
  permanentAdress: "//label[contains(text(),'Permanent')]",
  "permanentAdress-input": "//label[contains(text(),'Permanent')]/following::textarea[1]",
  textbox: "//span[text() = 'Text Box']",
  textboxHeader: "//h1[text() = 'Text Box']",
  submit: "//button[contains(text(), 'Submit')]",
  output: "//div[@id='output']",
};

test.beforeEach(async ({ page }) => {
  await page.route(/.*ads.*/i, (route) => route.abort());
  await page.goto("https://demoqa.com/elements");
});

test("test-box functionality", { tag: ["@smoke", "@test-box"] }, async ({ page }) => {
  await page.locator(universalXpath.textbox).click();
  await expect(page.locator(universalXpath.textboxHeader)).toBeVisible();
  await expect(page.locator(universalXpath.fullname)).toBeVisible();
  await page.locator(universalXpath["fullname-input"]).fill("Adam");
  await expect(page.locator(universalXpath.email)).toBeVisible();
  await page.locator(universalXpath["email-input"]).fill("Adam@test.com");
  await expect(page.locator(universalXpath.adress)).toBeVisible();
  await page.locator(universalXpath["adress-input"]).fill(article.about);
  await expect(page.locator(universalXpath.permanentAdress)).toBeVisible();
  await page.locator(universalXpath["permanentAdress-input"]).fill(article.text);
  await page.locator(universalXpath.submit).click();
  await expect(page.locator(universalXpath.output)).toBeVisible()
});
