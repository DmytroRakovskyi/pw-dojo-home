import { test, expect, chromium, Locator } from "@playwright/test";
import { dataGenerator } from "../../../utils/utils";
import article from "../../../testdata/article.json";
const baseUrl = "https://demo.learnwebdriverio.com";



let registeredUser: any;
test.beforeAll(async () => {

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
    const emailInput: Locator = page.locator("input[placeholder*='Email']")
    const passwordInput: Locator = page.locator("input[placeholder*='Password']")
    const signInButton: Locator = page.locator("button.btn");


  await page.goto("https://demo.learnwebdriverio.com/login");
  await emailInput.fill(registeredUser.userEmail);
  await passwordInput.fill(registeredUser.userPassword);
  await signInButton.click();
});
// shorter locators
test.describe("home page functionality", () => {






  test("AQA-17 fullfilled article creation", { tag: ["@smoke-wb", "@home"] }, async ({ page }) => {

const editorButton: Locator = page.locator('a[href="/editor"]');
const articleTitle: Locator = page.locator("input[placeholder*='Title']");
const articleAbout: Locator = page.locator("input[placeholder*='about']");
const articleTextArea: Locator = page.locator("textarea[placeholder*='your']");
const articleTextAreaContent: Locator = page.locator("[class*='v-show-content s']");
const publishButton: Locator = page.locator('button[data-qa-id="editor-publish"]');


    await editorButton.click();
    await expect(page).toHaveURL(`${baseUrl}/editor`);
    await articleTitle.fill(article.title);
    await articleAbout.fill(article.about);

    await articleTextArea.fill(article.text);
    await expect(articleTextAreaContent).toContainText(article.text);
    await publishButton.click();
    await expect(page).toHaveURL(/\/articles\/[^\/]+$/);
  });
});
