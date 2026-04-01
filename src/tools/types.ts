export type ToolSlug =
  | 'hash-generator'
  | 'json-formatter'
  | 'jwt-decoder'
  | 'base64-encode-decode'
  | 'uuid-ulid-generator'
  | 'url-encode-decode'
  | 'unix-timestamp-converter'
  | 'regex-tester'
  | 'cron-expression-builder-parser'
  | 'diff-checker';

export type ToolDefinition = {
  slug: ToolSlug;
  label: string;
  title: string;
  eyebrow: string;
  description: string;
  summary: string;
  bodyClass?: string;
  faq: Array<{ question: string; answer: string }>;
  details: string[];
  related: ToolSlug[];
};

export type ToolMount = (root: HTMLElement) => void;
