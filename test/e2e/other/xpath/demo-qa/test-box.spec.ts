import { test, expect } from "@playwright/test";
import article from "../../../../../utils/testdata/article.json";
import { faker } from "@faker-js/faker";
/**
 Test objective: to verify elements presense types via xpath

 Test results: elements can be selected on UI
 */

const baseUrl = "https://demoqa.com";

test.describe(
  "Xpath 001, textbox functionality",
  { tag: ["@smoke", "@test-box"] },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.route(/.*ads.*/i, (route) => route.abort());
      await page.goto(`${baseUrl}/text-box`);
    });

    test(
      `demoqa-1, test-box functionality`,
      { tag: ["@smoke", "@test-box"] },
      async ({ page }) => {
        //headers
        const textBoxHeader = page.locator('//h1[contains(text(), "Text")]');

        //labels
        const fullNameLabel = page.locator(
          "//label[contains(@id, 'userName')]",
        );
        const emailLabel = page.locator("//label[contains(@id, 'Email')]");
        const currentAdressLabel = page.locator(
          "//label[contains(@id, 'current')]",
        );
        const permanentAdressLabel = page.locator(
          "//label[contains(@id, 'permanent')]",
        );

        //p

        const paragraphName = page.locator("//p[contains(@id, 'name')]");
        const paragraphEmail = page.locator("//p[contains(@id, 'email')]");
        const paragraphPermanentAdreess = page.locator(
          "//p[contains(@id, 'permanent')]",
        );
        const paragraphCurrentAdreess = page.locator(
          "//p[contains(@id, 'current')]",
        );

        //inputfields && textarea

        const fullNameInput = page.locator(
          "//input[contains(@placeholder, 'Full')]",
        );
        const emailInput = page.locator("//input[contains(@type, 'email')]");
        const currentAdressTextArea = page.locator(
          "//textarea[contains(@placeholder, 'Current')]",
        );
        const permanentAdressInput = page.locator(
          "//textarea[contains(@id, 'permanent')]",
        );

        //buttons
        const submitButton = page.locator("//button[text()='Submit']");

        //Steps
        await expect(textBoxHeader).toBeVisible();
        await expect(fullNameLabel).toBeVisible();
        await fullNameInput.fill(faker.person.firstName());
        await expect(emailLabel).toBeVisible();
        await emailInput.fill(faker.internet.email());
        await expect(currentAdressLabel).toBeVisible();
        await currentAdressTextArea.fill(faker.location.secondaryAddress());
        await expect(permanentAdressLabel).toBeVisible();
        await permanentAdressInput.fill(faker.location.secondaryAddress());
        await submitButton.click();
        await expect(paragraphName).toBeVisible();
        await expect(paragraphEmail).toBeVisible();
        await expect(paragraphCurrentAdreess).toBeVisible();
        await expect(paragraphPermanentAdreess).toBeVisible();
      },
    );
  },
);
