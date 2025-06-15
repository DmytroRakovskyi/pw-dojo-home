import { Page, Locator, test } from '@playwright/test';

export class MainPage {
  page: Page;
  myFeedButton: Locator;
  globalFeedButton: Locator;
  tagList: Locator;
  articlePreview: Locator;
  articleFavorite: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myFeedButton = page.locator("a[href*='my-feed']");
    this.globalFeedButton = page.locator("//a[contains(text(), 'Global Feed')]");
    this.tagList = page.locator('.sidebar .tag-list');
    this.articlePreview = page.locator('.article-preview');
    this.articleFavorite = page.locator('button[data-qa-type*="fav"]');
  }
  async getByTagBefore(tagName: string) {
    return this.page.locator(`a[href="/tag/${tagName}"]`);
  }
  async getByTagAfter(text: string) {
    return this.page.locator(`//li[span[text()='${text}']]`);
  }

  async addFirstToFavorite() {
    await this.articleFavorite.first().click();
  }
}
