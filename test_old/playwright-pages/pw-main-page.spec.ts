import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://playwright.dev/");
});

test("AQA-1 header is present", { tag: ["@smoke-pw"] }, async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Playwright enables reliable" })).toBeVisible();
});

test("AQA-2 get started button is present ans can be hovered", { tag: ["@smoke-pw"] }, async ({ page }) => {
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("banner")).toContainText("Get started");
  await page.getByRole("link", { name: "Get started" }).hover();
  await expect(page.getByRole("link", { name: "Get started" })).toHaveCSS("background-color", "rgb(69, 186, 75)");
});

test("AQA-3 browser image visibility", { tag: ["@smoke-pw"] }, async ({ page }) => {
  await expect(page.getByRole("img", { name: "Browsers (Chromium, Firefox," })).toBeVisible();
});

test("AQA-4 page headers", { tag: ["@smoke-pw"] }, async ({ page }) => {
  await expect(page.getByRole("main")).toContainText("Any browser • Any platform • One API");
  await expect(page.getByRole("main")).toContainText("Resilient • No flaky tests");
  await expect(page.getByRole("main")).toContainText("No trade-offs • No limits");
  await expect(page.getByRole("main")).toContainText("Full isolation • Fast execution");
  await expect(page.getByRole("main")).toContainText("Powerful Tooling");
});
