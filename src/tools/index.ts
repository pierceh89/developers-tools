import { mountBase64Tool } from './base64-tool';
import { mountCronTool } from './cron-tool';
import { mountDiffChecker } from './diff-checker';
import { mountHashGenerator } from './hash-generator';
import { mountIdGenerator } from './id-generator';
import { mountJsonFormatter } from './json-formatter';
import { mountJwtDecoder } from './jwt-decoder';
import { mountRegexTester } from './regex-tester';
import { mountTimestampTool } from './timestamp-tool';
import { mountUrlTool } from './url-tool';
import type { ToolMount, ToolSlug } from './types';

const renderers: Record<ToolSlug, ToolMount> = {
  'hash-generator': mountHashGenerator,
  'json-formatter': mountJsonFormatter,
  'jwt-decoder': mountJwtDecoder,
  'base64-encode-decode': mountBase64Tool,
  'uuid-ulid-generator': mountIdGenerator,
  'url-encode-decode': mountUrlTool,
  'unix-timestamp-converter': mountTimestampTool,
  'regex-tester': mountRegexTester,
  'cron-expression-builder-parser': mountCronTool,
  'diff-checker': mountDiffChecker,
};

export function mountToolInto(root: HTMLElement, slug: ToolSlug): void {
  root.innerHTML = '';
  renderers[slug](root);
}
