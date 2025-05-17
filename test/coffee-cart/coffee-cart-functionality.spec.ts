import { test, expect } from "@playwright/test";
import { resolve } from "path";

test.beforeEach(async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
});

test("AQA-6 empty cart can be opened", { tag: ["@smoke-coffee"] }, async ({ page }) => {
  await page.locator('[aria-label*="Cart"]').click();
  await expect(page).toHaveURL("https://coffee-cart.app/cart");
  await expect(page.title()).resolves.toContain("Coffee cart");
  await expect(page.locator(".list p")).toHaveText("No coffee, go add some.");
});
// коротше селектори
test("AQA-7 adding one element to the cart", { tag: ["@smoke-coffee"] }, async ({ page }) => {
  await expect(page.locator('[data-test="Espresso"]')).toBeVisible();
  await expect(page.locator('[data-test="Espresso"]')).toContainText("espresso");
  await page.locator('[data-test="Espresso"]').click();
  await expect(page.locator('[aria-label*="Cart"]')).toContainText("cart (1)");
  await page.locator('button[data-test="checkout"].pay').hover();
  await expect(page.locator('[class="cart-preview show"]')).toBeVisible(); //
  await page.locator('button[data-test="checkout"].pay').click();
  await expect(page.locator(".modal .modal-content")).toBeVisible();
  await page.locator('button[class="close"]').click();
  await expect(page.locator(".modal .modal-content")).toBeHidden();
});

test("AQA-8 item presence in the cart", { tag: ["@smoke-coffee"] }, async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[aria-label*="Cart"]').click();
  await expect(page).toHaveURL("https://coffee-cart.app/cart");
  await expect(page.title()).resolves.toContain("Coffee cart"); //поставити евейт

  await expect(page.locator('li[class="list-item"] div').filter({ hasText: /^Espresso$/ })).toBeVisible(); 
});

test("AQA-9 increase/decrease element amount via +-", { tag: ["@smoke-coffee"] }, async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('a[href*="/cart"]').click();
  await expect(page).toHaveURL("https://coffee-cart.app/cart");
  await expect(page.title()).resolves.toContain("Coffee cart");

  await expect(page.locator('li[class="list-item"] div').filter({ hasText: /^Espresso$/ })).toBeVisible();
  await page.locator('button[data-v-8965af83][aria-label="Add one Espresso"]').click();
  await expect(page.locator('a[href*="/cart"]')).toContainText("cart (2)");
  await page.locator('button[data-v-8965af83][aria-label="Remove one Espresso"]').dblclick();
  await expect(page.locator('a[href*="/cart"]')).toContainText("cart (0)");
});

test("AQA-10 remove element from cart", { tag: ["@smoke-coffee"] }, async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('a[href*="/cart"]').click();
  await expect(page).toHaveURL("https://coffee-cart.app/cart");
  await expect(page.title()).resolves.toContain("Coffee cart");

  await expect(page.locator('li[class="list-item"] div').filter({ hasText: /^Espresso$/ })).toBeVisible();
  await page.locator('button[data-v-8965af83][aria-label="Remove all Espresso"]').dblclick(); // to change 
  await expect(page.locator(".list p")).toHaveText("No coffee, go add some.");
});
