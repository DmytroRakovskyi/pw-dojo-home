import { test, expect, Locator } from '@playwright/test';
const baseUrl: string = 'https://coffee-cart.app';

test.describe('Coffee-cart 001, main functionality', { tag: ['@smoke', '@smoke-coffee'] }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('AQA-6 empty cart can be opened', { tag: ['@smoke-coffee'] }, async ({ page }) => {
    //locators

    const cartLink: Locator = page.locator("a[href*='cart']");
    const title = await page.title();

    //tests
    await cartLink.click();
    await expect(page).toHaveURL(`${baseUrl}/cart`);
    await expect(title).toContain('Coffee cart');
  });

  test('AQA-7 adding one element to the cart', { tag: ['@smoke-coffee'] }, async ({ page }) => {
    const espresso: Locator = page.locator('[data-test="Espresso"]');
    const cartLink: Locator = page.locator("a[href*='cart']");
    const checkoutButton: Locator = page.locator("button[data-test='checkout']");
    const cartPreview: Locator = page.locator('.cart-preview');
    const paymentForm: Locator = page.locator('form[aria-label*="Payment"]');
    const closeButton: Locator = page.locator('button.close');

    await espresso.click();
    await expect(espresso).toContainText('espresso');
    await expect(cartLink).toContainText('cart (1)');
    await checkoutButton.hover();
    await expect(cartPreview).toBeVisible();
    await checkoutButton.click();
    await expect(paymentForm).toBeVisible();
    await closeButton.click();
    await expect(paymentForm).toBeHidden();
  });

  test('AQA-111 adding all elements to the cart', { tag: ['@smoke-coffee'] }, async ({ page }) => {
    const allCoffeeCups: Locator = page.locator('.cup-body');
    const countCoffee: number = await allCoffeeCups.count();
    for (let i = 0; i < countCoffee; i++) {
      await allCoffeeCups.nth(i).click();
    }
    const cartLink: Locator = page.locator("a[href*='cart']");
    const promoBanner: Locator = page.locator('.promo');

    await expect(cartLink).toContainText('cart (9)');
    await expect(promoBanner).toBeVisible();
  });

  test('AQA-8 item presence in the cart', { tag: ['@smoke-coffee'] }, async ({ page }) => {
    const espresso: Locator = page.locator('[data-test="Espresso"]');
    const cartLink: Locator = page.locator("a[href*='cart']");
    const title: string = await page.title();
    const listItem: Locator = page.locator('li[class="list-item"] div');

    await espresso.click();
    await cartLink.click();
    await expect(page).toHaveURL(`${baseUrl}/cart`);
    await expect(title).toContain('cart');
    await expect(listItem.filter({ hasText: /^Espresso$/ })).toBeVisible();
  });

  test(
    'AQA-9 increase/decrease element amount via +-',
    { tag: ['@smoke-coffee'] },
    async ({ page }) => {
      const espresso: Locator = page.locator('[data-test="Espresso"]');
      const cartLink: Locator = page.locator("a[href*='cart']");
      const plusButton: Locator = page
        .locator('button', { hasText: '+' })
        .filter({ visible: true });
      const removeAllButton: Locator = page.getByRole('button', { name: 'Remove all' });

      await espresso.click();
      await cartLink.click();
      await expect(page).toHaveURL(`${baseUrl}/cart`);
      await plusButton.click();
      await expect(cartLink).toContainText('cart (2)');
      await removeAllButton.click();
      await expect(cartLink).toContainText('cart (0)');
    },
  );

  test('AQA-10 remove element from cart', { tag: ['@smoke-coffee'] }, async ({ page }) => {
    const espresso: Locator = page.locator('[data-test="Espresso"]');
    const cartLink: Locator = page.locator("a[href*='cart']");
    const removeAllButton: Locator = page.getByRole('button', { name: 'Remove all' });
    const noCoffee: Locator = page.locator('.list p');

    await espresso.click();
    await cartLink.click();
    await expect(page).toHaveURL(`${baseUrl}/cart`);
    await expect(page.title()).resolves.toContain('Coffee cart');
    await removeAllButton.click();
    await expect(noCoffee).toContainText('No coffee');
  });
});
