import { test, expect } from "@playwright/test";



test.describe('main functionality', () =>{

  test.beforeEach(async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
});

test("AQA-6 empty cart can be opened", { tag: ["@smoke-coffee"] }, async ({ page }) => {
  await page.locator('//a[@href="/cart"]').click();
  await expect(page).toHaveURL("https://coffee-cart.app/cart");
  await expect(await page.title()).toContain("cart");
  await expect(page.locator("//p")).toBeVisible()
});

// коротше селектори
test("AQA-7 adding one element to the cart", { tag: ["@smoke-coffee"] }, async ({ page }) => {
  await expect(page.locator('[data-test="Espresso"]')).toBeVisible();
  await page.locator('[data-test="Espresso"]').click();
  await expect(page.locator('[aria-label*="Cart"]')).toContainText("cart (1)");
  await page.locator('button[data-test="checkout"]').hover();
  await expect(page.locator('[class*="cart-pr"]')).toBeVisible();
  await page.locator('button[data-test="checkout"]').click();
  await expect(page.locator(".modal .modal-content")).toBeVisible();
  await page.locator('button[class="close"]').click();
  await expect(page.locator(".modal .modal-content")).toBeHidden();
});


test("AQA-111 adding all elements to the cart", { tag: ["@smoke-coffee"] }, async ({ page }) => {
const elements = page.locator('//div[@class="cup-body"]');
const countCoffee = await elements.count();
for (let i = 0; i< countCoffee; i++) {
  await elements.nth(i).click()
};
await expect(page.locator('[aria-label*="Cart"]')).toContainText("cart (9)");
await expect(page.locator('//div[@class="promo"]'))
});

test("AQA-8 item presence in the cart", { tag: ["@smoke-coffee"] }, async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[aria-label*="Cart"]').click();
  await expect(page).toHaveURL("https://coffee-cart.app/cart");
  await expect(await page.title()).toContain("cart");

  await expect(page.locator('li[class="list-item"] div').filter({ hasText: /^Espresso$/ })).toBeVisible(); 
});

test("AQA-9 increase/decrease element amount via +-", { tag: ["@smoke-coffee"] }, async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('a[href*="/cart"]').click();
  await expect(page).toHaveURL("https://coffee-cart.app/cart");
  await expect(page.title()).resolves.toContain("Coffee cart");
  await page.locator('button', {hasText: '+'}).filter({visible: true}).click();
  await expect(page.locator('a[href*="/cart"]')).toContainText("cart (2)");
  await page.getByRole('button', { name: 'Remove all' }).click()
  await expect(page.locator('a[href*="/cart"]')).toContainText("cart (0)");
});

test("AQA-10 remove element from cart", { tag: ["@smoke-coffee"] }, async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('a[href*="/cart"]').click();
  await expect(page).toHaveURL("https://coffee-cart.app/cart");
  await expect(page.title()).resolves.toContain("Coffee cart");
 await page.getByRole('button', { name: 'Remove all' }).click()
  await expect(page.locator(".list p")).toContainText("No coffee");
});
});