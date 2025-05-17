import { test, expect, chromium } from "@playwright/test";
import {dataGenerator } from "../../utils/utils";
const article = require('../../testdata/article.json')
  const usernameInput = 'input[placeholder="Username"]';
  const emailInput = 'input[placeholder="Email"]';
  const passwordInput = 'input[placeholder="Password"]';
  const signInBtn = 'button[class*="btn-lg"]';
  const editorButton = 'a[href="/editor"]';
  const articleTitle = 'input[placeholder*="Art"]';
  const articleAbout = `input[placeholder*="Wh"]`
  const articleText = 'textarea[placeholder*="Wr"]';
  const publishButton = '[data-qa-id="editor-publish"]';

let registeredUser:any;
test.beforeAll( async() => {
registeredUser = dataGenerator();
const { uniqueUser, userEmail, userPassword } = registeredUser;  
  const browser = await chromium.launch();
  const page = await browser.newPage();
   await page.goto("https://demo.learnwebdriverio.com/register")
    await page.locator(usernameInput).fill(uniqueUser);
    await page.locator(emailInput).fill(userEmail);
    await page.locator(passwordInput).fill(userPassword);
    await page.locator(signInBtn).click();
    await expect(page).toHaveURL("https://demo.learnwebdriverio.com/");
    await browser.close()

})

test.beforeEach(async ({ page }) => {


    await page.goto("https://demo.learnwebdriverio.com/login");
    await page.locator(emailInput).fill(registeredUser.userEmail);
    await page.locator(passwordInput).fill(registeredUser.userPassword);
    await page.locator(signInBtn).click();
});
// shorter locators 
test.describe("home page functionality", () => {
  test("AQA-17 fullfilled article creation", { tag: ["@smoke-wb", "@home"] }, async ({ page }) => {
    await page.locator(editorButton).click();
    await expect(page).toHaveURL('https://demo.learnwebdriverio.com/editor')
    await page.locator(articleTitle).fill(article.title);
    await page.locator(articleAbout).fill(article.about);
  

    await page.locator(articleText).fill(article.text);
    await expect(page.getByRole('paragraph')).toContainText(article.text); // to fix...
    await page.locator(publishButton).click();
    await expect(page).toHaveURL(/\/articles\/[^\/]+$/)
  });
});
