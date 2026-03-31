# Developer Tools

Browser-based utilities for everyday web development work.

Production URL:
`https://pierceh89.github.io/developers-tools/`

This project is a static multi-page Vite app built with client-side TypeScript and deployed to GitHub Pages. The goal is simple: open the site, pick a tool, and use it immediately without a backend or sign-in flow.

## Current Tools

- JSON Formatter / Validator
- JWT Decoder
- Base64 Encode / Decode
- UUID / ULID Generator
- URL Encode / Decode
- Unix Timestamp Converter
- Regex Tester

## Product Direction

The site is intentionally utility-first.

- Home is a one-page tool workspace.
- Individual tool pages still exist for direct links and search indexing.
- Sensitive transformations are handled client-side in the browser.
- The UX prioritizes immediate input, output, copy actions, and clear error states.

## Tech Stack

- Vite
- TypeScript
- Static multi-page HTML entrypoints
- GitHub Pages deployment via GitHub Actions

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

## Project Structure

```text
.
├── .github/workflows/deploy-pages.yml
├── index.html
├── json-formatter/index.html
├── jwt-decoder/index.html
├── base64-encode-decode/index.html
├── uuid-ulid-generator/index.html
├── url-encode-decode/index.html
├── unix-timestamp-converter/index.html
├── regex-tester/index.html
├── src/
│   ├── app.ts
│   ├── main.ts
│   ├── style.css
│   └── vite-env.d.ts
└── vite.config.ts
```

Notes:

- `src/app.ts` contains routing, shared layout rendering, and tool implementations.
- `vite.config.ts` uses the GitHub Pages base path: `/developers-tools/`.
- Each tool has its own HTML entrypoint for static output and direct page access.

## Deployment

GitHub Pages deployment is configured in:

- [.github/workflows/deploy-pages.yml](./.github/workflows/deploy-pages.yml)

Current deployment assumptions:

- Repository name: `developers-tools`
- GitHub Pages base path: `/developers-tools/`
- Default deploy branch trigger: `main`

Deployment flow:

1. Push to `main`
2. GitHub Actions runs `npm ci`
3. The site is built with `npm run build`
4. The `dist/` directory is uploaded and deployed to GitHub Pages

## Next Tool Roadmap

These are the most useful next additions after the current MVP.

### Tier 1: High-value additions

#### 1. Hash Generator

Why:
- Common for debugging payload integrity and quick verification tasks.
- Easy to keep fully client-side.

Suggested scope:
- MD5
- SHA-1
- SHA-256
- SHA-512
- Text input
- Copy digest output

Implementation note:
- Use the browser Web Crypto API where possible.

#### 2. SQL Formatter

Why:
- Frequently needed during API and database debugging.
- Strong fit with the existing JSON and text tooling.

Suggested scope:
- Paste SQL and format output
- Minify or compact mode
- Copy formatted result

Implementation note:
- Likely best added with a lightweight formatter dependency.

#### 3. Diff Checker

Why:
- Very common debugging workflow for payloads, configs, and generated text.
- Good complement to JSON and Base64 tools.

Suggested scope:
- Side-by-side or inline diff
- Character and line-level diff
- Copy left/right content
- Sample input

Implementation note:
- Keep the first version text-only.

#### 4. Cron Expression Builder / Parser

Why:
- Useful for backend and automation workflows.
- High practical value for developers.

Suggested scope:
- Parse cron expression
- Human-readable explanation
- Common presets
- Validation feedback

Implementation note:
- Start with standard 5-field cron support before adding variants.

### Tier 2: Strong SEO and workflow additions

#### 5. JSON to TypeScript

Why:
- Natural extension of the JSON tool.
- Useful for frontend and API integration work.

Suggested scope:
- Paste JSON
- Generate TypeScript types or interfaces
- Copy output

#### 6. cURL to fetch Converter

Why:
- Very useful for frontend and API debugging.
- Strong direct-use value.

Suggested scope:
- Paste cURL command
- Output `fetch` code
- Optional `axios` output later

#### 7. JSON to Zod / JSON Schema

Why:
- Good fit for modern TypeScript-heavy workflows.
- Strong value for validation-driven development.

Suggested scope:
- Paste JSON
- Generate schema
- Copy output

### Tier 3: Utility expansion

#### 8. HTML / CSS / JS Minifier
#### 9. Color Converter
#### 10. Text Case Converter
#### 11. Query String Parser
#### 12. HTTP Status Code Reference

These are useful, but they are lower priority than the debugging and data-conversion tools above.

## Suggested Next Implementation Order

If development continues from the current codebase, this is the recommended order:

1. Hash Generator
2. SQL Formatter
3. Diff Checker
4. Cron Expression Builder / Parser
5. JSON to TypeScript
6. cURL to fetch Converter
7. JSON to Zod / JSON Schema

## Future UX Improvements

- Remember the last selected tool on the home page
- Add search or command-palette style tool switching
- Reduce duplication between individual tool pages and the home tool runner
- Add lightweight analytics for tool usage patterns
- Improve SEO metadata and add structured data
- Add copy success toasts instead of button text replacement

## Future Engineering Improvements

- Split each tool into smaller modules instead of keeping all logic in `src/app.ts`
- Add tests for path handling and tool transformations
- Add linting and formatting
- Add shared utility helpers for encoding, time conversion, and routing
- Introduce a lightweight component structure if the app grows materially

## License

No license has been added yet.
