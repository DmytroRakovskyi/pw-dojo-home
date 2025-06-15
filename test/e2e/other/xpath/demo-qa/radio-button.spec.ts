import { test, expect, Locator } from "@playwright/test";

/**
 Test obective: to verify radiobutton elements via xpath
 Test result: elemets can be selected on UI
 */

const baseUrl = "https://demoqa.com";

test.describe("Xpath 003", { tag: ["@smoke", "@radio-buttons"] }, () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/.*ads.*/i, (route) => route.abort());
    await page.goto(`${baseUrl}/radio-button`);
  });

  test("demoqa-3", { tag: ["@smoke", "@radio-button"] }, async ({ page }) => {
    //headlines
    const radioButtonHeader: Locator = page.locator(
      "//h1[contains(text(), 'Radio')]",
    );
    const question: Locator = page.locator("//*[@class='mb-3']");

    //labels and other
    const yesRadioLabel: Locator = page.locator(
      "//label[contains(@for, 'yes')]",
    );
    const noRadioLabel: Locator = page.locator("//label[contains(@for, 'no')]");
    const impresRadioLabel: Locator = page.locator(
      "//label[contains(@for, 'impressive')]",
    );
    const textSuccess: Locator = page.locator("//*[@class='text-success']");

    await expect(radioButtonHeader).toBeVisible();
    await expect(question).toBeVisible();
    await yesRadioLabel.check();
    await expect(yesRadioLabel).toBeChecked();
    await expect(textSuccess).toHaveText("Yes");
    await impresRadioLabel.click();
    await expect(textSuccess).toHaveText("Impressive");
    await expect(impresRadioLabel).toBeChecked();
    await expect(noRadioLabel).toBeDisabled();
  });
});
