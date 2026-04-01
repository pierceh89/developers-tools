import { expect, test } from 'playwright/test';

test('home page exposes SEO metadata and direct tool links', async ({ page }) => {
  await page.goto('./');

  await expect(page).toHaveTitle(/Developer Tools Hub/i);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://pierceh89.github.io/developers-tools/',
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    /Developer Tools Hub/i,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary');
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 2, name: /Direct links for everyday workflows/i })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Hash Generator', exact: true })).toBeVisible();
});

test('tool page exposes breadcrumb and structured SEO tags', async ({ page }) => {
  await page.goto('regex-tester/');

  await expect(page).toHaveTitle(/Regex Tester \| Developer Tools/i);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://pierceh89.github.io/developers-tools/regex-tester/',
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    'https://pierceh89.github.io/developers-tools/regex-tester/',
  );
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  await expect(page.getByRole('navigation', { name: /Breadcrumb/i })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: /Where this tool helps most/i })).toBeVisible();
});

test('robots.txt is served with sitemap reference', async ({ page }) => {
  await page.goto('robots.txt');

  await expect(page.locator('body')).toContainText('User-agent: *');
  await expect(page.locator('body')).toContainText(
    'Sitemap: https://pierceh89.github.io/developers-tools/sitemap.xml',
  );
});
