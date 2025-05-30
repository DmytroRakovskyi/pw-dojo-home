import { test, expect, Locator, Page } from "@playwright/test";

const baseUrl = "https://coffee-cart.app/";


async function clickOnLocator(page: Page, orderCount: number, selector: string) {
  for (let i: number = 0; i <= orderCount; i++) {
    await page.locator(selector).nth(i).click();
  }
}

async function orderAllCoffee(page: Page) {
  const cups: Locator = page.locator(".cup-body");
  for (let i = 1; i <= 10; i++) {
    await cups.click();
  }
}

test("test1", async ({ page }) => {
  await page.goto(baseUrl);
  // await orderAllCoffee(page);
  for (let i = 0; i <= 8; i++) {
    await page.locator(".cup-body:not(.promo)").nth(i).click();
  }
});

test("test 2", async ({ page }) => {
const checkout:Locator =  page.locator('button[data-test="checkout"]');
await page.goto(baseUrl);
await clickOnLocator(page, 8, '[class="cup-body"]');
await checkout.hover();
await expect(checkout).toContainText('Total: $119.00')
  
});
