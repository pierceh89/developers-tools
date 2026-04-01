# Developer Tools

Browser-based utilities for everyday web development work.

Production URL:
`https://pierceh89.github.io/developers-tools/`

This project is a static multi-page Vite app built with client-side TypeScript and deployed to GitHub Pages. It provides a home workspace for quick access to tools while keeping direct per-tool URLs for sharing and indexing.

Planning notes for the next release:

- [Feature and SEO Plan](./docs/feature-and-seo-plan.md)

## Features

Current tools:

- Hash Generator
  - MD5, SHA-1, SHA-256, SHA-512
  - Example vector and copy action
- JSON Formatter / Validator
  - Pretty print and minify modes
  - Parse error feedback
- JWT Decoder
  - Header, payload, signature inspection
  - `exp`, `iat`, `nbf` time claim rendering
- Base64 Encode / Decode
  - UTF-8 input support
  - Encode/decode mode swap
- UUID / ULID Generator
  - Batch generation
  - Per-item and bulk copy
- URL Encode / Decode
  - Encode/decode modes
  - Optional `+` to space decoding
- Unix Timestamp Converter
  - Seconds and milliseconds support
  - UTC/local display toggle
- Regex Tester
  - Pattern and flag testing
  - Match highlighting and capture group report
- Cron Expression Builder / Parser
  - Standard 5-field cron support
  - Presets, builder sync, validation messages
- Diff Checker
  - Line diff and character diff highlighting
  - Whitespace visualization and debounced comparison

## Product Shape

- Home renders a one-page workspace with quick switching between tools.
- Each tool also has its own static entrypoint for direct access.
- All transformations run client-side in the browser.
- The UI prioritizes immediate input, output, copy actions, examples, and explicit error states.

## Tech Stack

- Vite
- TypeScript
- Static multi-page HTML entrypoints
- Playwright for end-to-end checks
- GitHub Pages deployment

## Local Development

Requirements:

- Node.js 20+ recommended
- npm

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Open Playwright UI:

```bash
npm run test:e2e:ui
```

## Project Structure

```text
.
├── index.html
├── hash-generator/index.html
├── json-formatter/index.html
├── jwt-decoder/index.html
├── base64-encode-decode/index.html
├── uuid-ulid-generator/index.html
├── url-encode-decode/index.html
├── unix-timestamp-converter/index.html
├── regex-tester/index.html
├── cron-expression-builder-parser/index.html
├── diff-checker/index.html
├── src/
│   ├── app.ts
│   ├── main.ts
│   ├── style.css
│   ├── vite-env.d.ts
│   └── tools/
│       ├── index.ts
│       ├── definitions.ts
│       ├── shared.ts
│       ├── types.ts
│       └── *.ts
├── tests/
│   └── home.spec.ts
└── vite.config.ts
```

Notes:

- `src/app.ts` handles route normalization, shared page layout, and page rendering.
- `src/tools/definitions.ts` contains tool metadata used by navigation and tool pages.
- `src/tools/index.ts` maps each tool slug to its mount function.
- `src/tools/shared.ts` contains common DOM and utility helpers reused across tools.
- `vite.config.ts` uses the GitHub Pages base path: `/developers-tools/`.

## Routing

The app is built as a multi-page site. These routes are available:

- `/developers-tools/`
- `/developers-tools/hash-generator/`
- `/developers-tools/json-formatter/`
- `/developers-tools/jwt-decoder/`
- `/developers-tools/base64-encode-decode/`
- `/developers-tools/uuid-ulid-generator/`
- `/developers-tools/url-encode-decode/`
- `/developers-tools/unix-timestamp-converter/`
- `/developers-tools/regex-tester/`
- `/developers-tools/cron-expression-builder-parser/`
- `/developers-tools/diff-checker/`

## Deployment

GitHub Pages deployment assumes:

- Repository name: `developers-tools`
- Base path: `/developers-tools/`
- Deploy target: static `dist/` output

Build and deploy flow:

1. Push changes to the deployment branch.
2. Run `npm ci`.
3. Run `npm run build`.
4. Publish `dist/` to GitHub Pages.
