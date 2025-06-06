import { test, expect, Locator, Page } from "@playwright/test";

const baseUrl = "https://coffee-cart.app/";


async function clickOnLocator(page: Page, orderCount: number, selector: string) {
  for (let i: number = 0; i <= orderCount; i++) {
    await page.locator(selector).nth(i).click();
  }
}
const cups = (page:Page)  => page.locator(".cup-body:not(.disabled-hover)");

async function orderAllCoffeeViaForOF(page: Page) {
  const allCups = await cups(page).all()
 for ( let el of allCups) {
  await el.click() 
 }

}

async function orderAllCoffeeViaForEach(page: Page) {
  const allCups = await cups(page).all()
 allCups.forEach(async (element, index, coffeArr) => {

console.log(index);
console.log(coffeArr);
await element.click()
 });
 }



test("test2222", async ({ page }) => {
  await page.goto(baseUrl);
  // await orderAllCoffee(page);
 await orderAllCoffeeViaForOF(page)
});

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
