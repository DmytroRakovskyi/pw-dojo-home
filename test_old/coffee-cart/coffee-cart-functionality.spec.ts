import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
});

test("AQA-6 empty cart can be opened", { tag: ["@smoke-coffee"] }, async ({ page }) => {
  await expect(page.locator('a[href="/cart"]')).toHaveText('cart (0)')
  await page.locator('a[href="/cart"]').click();
  await expect(page).toHaveURL("https://coffee-cart.app/cart");
   await expect(page).toHaveURL("https://coffee-cart.app/cart");
  await expect(page.locator('head title')).toHaveText("Coffee cart");
  await expect(page.locator('#app p')).toHaveText("No coffee, go add some.");
});

test("AQA-7 adding one element to the cart", { tag: ["@smoke-coffee"] }, async ({ page }) => {
  await expect(page.locator('[data-test="Espresso"]')).toBeVisible();
  await expect(page.locator('[data-test="Espresso"]')).toContainText("espresso");
  await page.locator('[data-test="Espresso"]').click();
  await expect(page.getByLabel("Cart page")).toContainText("cart (1)");
  await page.locator('[data-test="checkout"]').hover();
  await expect(page.getByRole("list").filter({ hasText: "Espresso x 1+-" })).toBeVisible();
});

test("AQA-8 item presence in the cart", { tag: ["@smoke-coffee"] }, async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.getByRole("link", { name: "Cart page" }).click();
  await expect(page).toHaveURL("https://coffee-cart.app/cart");
  await expect(page).toHaveTitle("Coffee cart");
  await expect(page.locator("div").filter({ hasText: /^Espresso$/ })).toBeVisible();
});

test("AQA-9 increase/decrease element amount via +-", { tag: ["@smoke-coffee"] }, async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.getByRole("link", { name: "Cart page" }).click();
  await expect(page).toHaveURL("https://coffee-cart.app/cart");
  await expect(page).toHaveTitle("Coffee cart");
  await expect(page.locator("div").filter({ hasText: /^Espresso$/ })).toBeVisible();
  await page.getByRole("button", { name: "Add one Espresso" }).click();
  await expect(page.getByLabel("Cart page")).toContainText("cart (2)");
  await page.getByRole("button", { name: "Remove one Espresso" }).click();
  await expect(page.getByLabel("Cart page")).toContainText("cart (1)");
});

test("AQA-10 remove element from cart", { tag: ["@smoke-coffee"] }, async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.getByRole("link", { name: "Cart page" }).click();
  await expect(page).toHaveURL("https://coffee-cart.app/cart");
  await expect(page).toHaveTitle("Coffee cart");
  await expect(page.locator("div").filter({ hasText: /^Espresso$/ })).toBeVisible();
  await page.getByRole("button", { name: "Remove all Espresso" }).click();
  await expect(page.getByRole("paragraph")).toHaveText("No coffee, go add some.");
});
