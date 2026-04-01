import type { ToolDefinition, ToolSlug } from './types';

export const tools: Record<ToolSlug, ToolDefinition> = {
  'hash-generator': {
    slug: 'hash-generator',
    label: 'Hash Generator',
    title: 'Hash Generator',
    eyebrow: 'Integrity checks',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes in your browser.',
    summary:
      'Paste text and switch algorithms to instantly calculate deterministic hash outputs without sending input to a server.',
    details: [
      'Supports MD5, SHA-1, SHA-256, and SHA-512.',
      'Updates hash output immediately when input or algorithm changes.',
      'Includes copy action and known-vector example testing.',
    ],
    faq: [
      {
        question: 'Which hash algorithms are available?',
        answer: 'MD5, SHA-1, SHA-256, and SHA-512 are available.',
      },
      {
        question: 'Does hashing happen on a backend server?',
        answer: 'No. Hash computation runs locally in your browser.',
      },
      {
        question: 'Can I verify known hash vectors quickly?',
        answer: 'Yes. Use the example button to load `abc` and compare expected results.',
      },
    ],
    related: ['json-formatter', 'base64-encode-decode', 'regex-tester'],
  },
  'json-formatter': {
    slug: 'json-formatter',
    label: 'JSON Formatter',
    title: 'JSON Formatter and Validator',
    eyebrow: 'API payloads',
    description: 'Validate, format, and minify API payloads instantly.',
    summary:
      'Paste raw JSON, clean it up, and spot parse issues without leaving the browser.',
    details: [
      'Formats and minifies JSON in real time.',
      'Shows parse errors clearly instead of failing silently.',
      'Runs entirely in the browser for privacy-safe inspection.',
    ],
    faq: [
      {
        question: 'Does this tool send JSON to a server?',
        answer: 'No. Formatting and validation happen in your browser only.',
      },
      {
        question: 'Can I minify JSON here too?',
        answer: 'Yes. Switch between pretty output and minified output instantly.',
      },
      {
        question: 'What happens with invalid JSON?',
        answer: 'You get a readable parse error so you can fix the payload quickly.',
      },
    ],
    related: ['jwt-decoder', 'base64-encode-decode', 'url-encode-decode'],
  },
  'jwt-decoder': {
    slug: 'jwt-decoder',
    label: 'JWT Decoder',
    title: 'JWT Decoder',
    eyebrow: 'Tokens',
    description: 'Inspect token headers and claims instantly.',
    summary:
      'Decode header and payload sections, inspect timestamps, and keep verification concerns separate.',
    details: [
      'Decodes standard three-part JWTs in the browser.',
      'Shows human-readable times for exp, iat, and nbf claims when present.',
      'Inspection only. It does not verify signatures.',
    ],
    faq: [
      {
        question: 'Does this verify a JWT signature?',
        answer: 'No. This page is for decoding and inspection only.',
      },
      {
        question: 'Are claims like exp shown as dates?',
        answer: 'Yes. Numeric time claims are rendered as human-readable timestamps.',
      },
      {
        question: 'Is my token uploaded?',
        answer: 'No. Decoding happens locally in your browser.',
      },
    ],
    related: ['json-formatter', 'base64-encode-decode', 'unix-timestamp-converter'],
  },
  'base64-encode-decode': {
    slug: 'base64-encode-decode',
    label: 'Base64',
    title: 'Base64 Encode and Decode',
    eyebrow: 'String conversion',
    description: 'Encode or decode text safely in your browser.',
    summary:
      'Convert plain text and Base64 strings with UTF-8 support for real-world payloads.',
    details: [
      'Handles UTF-8 text instead of only ASCII.',
      'Supports quick mode switching for encode and decode tasks.',
      'Clear error output for invalid Base64 strings.',
    ],
    faq: [
      {
        question: 'Does this support non-English text?',
        answer: 'Yes. UTF-8 text is encoded and decoded correctly.',
      },
      {
        question: 'What if I paste invalid Base64?',
        answer: 'The tool shows an error instead of producing broken output.',
      },
      {
        question: 'Can I swap the direction quickly?',
        answer: 'Yes. One click swaps encode and decode modes.',
      },
    ],
    related: ['jwt-decoder', 'url-encode-decode', 'json-formatter'],
  },
  'uuid-ulid-generator': {
    slug: 'uuid-ulid-generator',
    label: 'UUID / ULID',
    title: 'UUID and ULID Generator',
    eyebrow: 'Identifiers',
    description: 'Generate IDs for apps, APIs, and testing.',
    summary:
      'Create UUID v4 and ULID values individually or in batches without any backend dependency.',
    details: [
      'Generates UUID v4 with the browser crypto API.',
      'Supports ULID generation for sortable identifiers.',
      'Copy one value or an entire batch with a single click.',
    ],
    faq: [
      {
        question: 'Can I generate more than one ID at once?',
        answer: 'Yes. Choose a batch size and generate multiple values instantly.',
      },
      {
        question: 'What is the difference between UUID and ULID here?',
        answer: 'UUID v4 is random. ULID is lexicographically sortable by time.',
      },
      {
        question: 'Do generated IDs leave the browser?',
        answer: 'No. Generation happens locally.',
      },
    ],
    related: ['json-formatter', 'base64-encode-decode', 'regex-tester'],
  },
  'url-encode-decode': {
    slug: 'url-encode-decode',
    label: 'URL Encode',
    title: 'URL Encode and Decode',
    eyebrow: 'Query strings',
    description: 'Convert strings for query params and URLs.',
    summary:
      'Encode text for URLs, decode percent-encoded strings, and handle plus-space behavior explicitly.',
    details: [
      'Encode values for query strings and path-safe workflows.',
      'Optionally treat plus signs as spaces during decoding.',
      'Gives clear feedback when invalid sequences are pasted.',
    ],
    faq: [
      {
        question: 'Does this decode percent-encoded strings?',
        answer: 'Yes. It decodes common URL-encoded input directly in the browser.',
      },
      {
        question: 'How are plus signs handled?',
        answer: 'You can choose to treat plus signs as spaces while decoding.',
      },
      {
        question: 'Will malformed input be ignored?',
        answer: 'No. Invalid encoded strings show an explicit error.',
      },
    ],
    related: ['base64-encode-decode', 'json-formatter', 'regex-tester'],
  },
  'unix-timestamp-converter': {
    slug: 'unix-timestamp-converter',
    label: 'Timestamp Converter',
    title: 'Unix Timestamp Converter',
    eyebrow: 'Time utilities',
    description: 'Switch between Unix time and readable dates.',
    summary:
      'Convert seconds and milliseconds into readable date-time values and move back the other way.',
    details: [
      'Supports both seconds and milliseconds.',
      'Shows UTC and local display modes.',
      'Lets you jump to the current timestamp with one click.',
    ],
    faq: [
      {
        question: 'Does this support both seconds and milliseconds?',
        answer: 'Yes. The output shows both forms so there is no ambiguity.',
      },
      {
        question: 'Can I convert a date back into Unix time?',
        answer: 'Yes. Use the date-time input and the page calculates both values.',
      },
      {
        question: 'Can I view the result in UTC?',
        answer: 'Yes. Toggle between local time and UTC display.',
      },
    ],
    related: ['jwt-decoder', 'json-formatter', 'regex-tester'],
  },
  'regex-tester': {
    slug: 'regex-tester',
    label: 'Regex Tester',
    title: 'Regex Tester',
    eyebrow: 'Pattern matching',
    description: 'Test patterns, flags, and capture groups fast.',
    summary:
      'Try JavaScript regular expressions against sample text and inspect matches with capture groups.',
    details: [
      'Runs with the JavaScript regex engine.',
      'Highlights matches directly in the test text view.',
      'Shows invalid pattern errors separately from a no-match result.',
    ],
    faq: [
      {
        question: 'Which regex engine does this use?',
        answer: 'It uses the JavaScript regular expression engine in your browser.',
      },
      {
        question: 'Can I test flags like g, i, and m?',
        answer: 'Yes. Enter the flags you want and the result updates immediately.',
      },
      {
        question: 'Will I see capture groups?',
        answer: 'Yes. Each match includes captured group output where available.',
      },
    ],
    related: ['url-encode-decode', 'json-formatter', 'base64-encode-decode'],
  },
  'cron-expression-builder-parser': {
    slug: 'cron-expression-builder-parser',
    label: 'Cron Builder / Parser',
    title: 'Cron Expression Builder and Parser',
    eyebrow: 'Scheduling',
    description: 'Build and parse standard 5-field cron expressions with instant feedback.',
    summary:
      'Write a cron expression or use field controls to generate one. Validation and human-readable summaries are kept in sync.',
    details: [
      'Supports the standard 5-field format: minute hour day-of-month month day-of-week.',
      'Includes quick presets for common schedules like hourly, daily, and weekdays.',
      'Explains parse errors by field so invalid values are easy to fix.',
    ],
    faq: [
      {
        question: 'Does this support Quartz cron with seconds and year?',
        answer: 'Not yet. Version 1 focuses on the standard 5-field cron format only.',
      },
      {
        question: 'Can I edit fields and the cron expression together?',
        answer: 'Yes. Builder controls and expression input stay synchronized.',
      },
      {
        question: 'How are presets handled?',
        answer: 'Presets map to standard 5-field cron expressions that you can modify further.',
      },
    ],
    related: ['regex-tester', 'unix-timestamp-converter', 'json-formatter'],
  },
  'diff-checker': {
    slug: 'diff-checker',
    label: 'Diff Checker',
    title: 'Text Diff Checker',
    eyebrow: 'Change inspection',
    description: 'Compare two text blocks with line and character highlights.',
    summary:
      'Find additions, deletions, and inline edits quickly with a split-style diff view that runs in your browser.',
    details: [
      'Compares text at line level for a readable change overview.',
      'Highlights character-level changes for edited lines.',
      'Includes debounce for larger inputs to keep typing responsive.',
    ],
    faq: [
      {
        question: 'What happens when both inputs are identical?',
        answer: 'The result shows a clear "No differences found" state.',
      },
      {
        question: 'Can I spot whitespace-only changes?',
        answer: 'Yes. Spaces are shown as · and tabs are shown as → in the diff output.',
      },
      {
        question: 'Is this a Git diff?',
        answer: 'No. It is a text comparison utility focused on quick browser-based inspection.',
      },
    ],
    related: ['json-formatter', 'regex-tester', 'base64-encode-decode'],
  },
};

export const toolOrder = Object.values(tools);
