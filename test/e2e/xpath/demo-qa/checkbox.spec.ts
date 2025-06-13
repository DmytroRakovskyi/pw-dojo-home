import { expect, Locator, test } from "@playwright/test";
const baseUrl = "https://demoqa.com";

/** 
 Test objective: to verify checkbox elements via xpath

 Test results: elements can be interacted
 */

test.describe("Xpath 002, checkbox functionality", { tag: ["@smoke", "@checkbox"] }, () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/.*ads.*/i, (route) => route.abort());
    await page.goto(`${baseUrl}/checkbox`);
  });

  test(`demoqa-2, checkbox functionality`, { tag: ["@smoke", "@checkbox"] }, async ({ page }) => {
    //headers
    const checkBoxHeader = page.locator("//h1[@class='text-center']");

    //labels and other elements

    const home: Locator = page.locator("//*[contains(text(), 'Home')]");
    const desktop: Locator = page.locator("//*[contains(text(), 'Desktop')]");
    const documents: Locator = page.locator("//*[contains(text(), 'Documents')]");
    const downloads: Locator = page.locator("//*[contains(text(), 'Downloads')]");
    const result: Locator = page.locator("//*[@id='result']");

    //buttons
    const expandButton = page.locator("//button[contains(@aria-label, 'Expand')]");
    const collapseButton = page.locator("//button[contains(@aria-label, 'Collapse')]");
    const homeButton: Locator = page.locator("//*[contains(text(), 'Home')]/../../button");
    const desktopButton: Locator = page.locator("//*[contains(text(), 'Desktop')]/../../button");
    const documentsButton: Locator = page.locator("//*[contains(text(), 'Documents')]/../../button");
    const downloadsButton: Locator = page.locator("//*[contains(text(), 'Downloads')]/../../button");

    //Steps
    await expandButton.click();
    await expect(home).toBeVisible();
    await expect(desktop).toBeVisible();
    await expect(desktopButton).toBeVisible();
    await expect(documents).toBeVisible();
    await expect(documentsButton).toBeVisible();
    await expect(downloads).toBeVisible();
    await expect(downloadsButton).toBeVisible();
    await collapseButton.click();
    await home.click();
    await expect(result).toContainText(
      "homedesktopnotescommandsdocumentsworkspacereactangularveuofficepublicprivateclassifiedgeneraldownloadswordFileexcelFile"
    );
  });
});
