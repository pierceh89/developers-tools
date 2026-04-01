import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteOrigin = 'https://pierceh89.github.io';
const basePath = '/developers-tools/';
const repoRoot = process.cwd();
const publicDir = path.join(repoRoot, 'public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

const ignoredDirectories = new Set([
  '.git',
  'dist',
  'node_modules',
  'public',
  'scripts',
  'src',
  'test-results',
  'tests',
]);

const topLevelEntries = await readdir(repoRoot, { withFileTypes: true });
const toolPaths = topLevelEntries
  .filter((entry) => entry.isDirectory())
  .filter((entry) => !ignoredDirectories.has(entry.name))
  .filter((entry) => entry.name !== 'docs')
  .filter((entry) => entry.name !== 'playwright-report')
  .filter((entry) => entry.name !== 'coverage')
  .sort((left, right) => left.name.localeCompare(right.name))
  .map((entry) => `${entry.name}/`);

const urls = [''].concat(toolPaths).map((suffix) => `${siteOrigin}${basePath}${suffix}`);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(
    (url) => `  <url>
    <loc>${url}</loc>
  </url>`,
  ),
  '</urlset>',
  '',
].join('\n');

await writeFile(sitemapPath, xml, 'utf8');
