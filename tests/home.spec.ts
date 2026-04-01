import { expect, test } from 'playwright/test';

test('home page renders the hash generator workspace', async ({ page }) => {
  await page.goto('./');

  await expect(page.getByRole('link', { name: /developer tools/i })).toBeVisible();
  await expect(
    page.getByRole('button', { name: /json formatter/i }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Input text' })).toBeVisible();
});
