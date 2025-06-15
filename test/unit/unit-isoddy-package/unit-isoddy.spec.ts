import { test, expect } from '@playwright/test';

test('AQA-11 boolean logic', { tag: '@npm-smoke' }, async ({ page }) => {
  const even: number = Math.floor(Math.random() * 50) * 2;
  const odd: number = Math.floor(Math.random() * 50) * 2 + 1;
  const isOddy: any = require('isoddy');
  expect(isOddy(even)).toBeFalsy();
  expect(isOddy(odd)).toBeTruthy();
});
