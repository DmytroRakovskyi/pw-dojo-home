import { Page } from '@playwright/test';

export async function goTo(page: Page, urlDomen: string, urlPath?: string) {
  await page.goto(`${urlDomen}${urlPath}`);
}
