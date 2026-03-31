type ToolSlug =
  | 'json-formatter'
  | 'jwt-decoder'
  | 'base64-encode-decode'
  | 'uuid-ulid-generator'
  | 'url-encode-decode'
  | 'unix-timestamp-converter'
  | 'regex-tester'
  | 'diff-checker';

type ToolDefinition = {
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

const tools: Record<ToolSlug, ToolDefinition> = {
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

const toolOrder = Object.values(tools);
const baseUrl = withTrailingSlash(import.meta.env.BASE_URL);
const basePathWithoutTrailingSlash = baseUrl.replace(/\/$/, '');

export function renderApp(app: HTMLDivElement, pathname: string): void {
  const normalized = normalizePath(pathname);

  if (normalized === '/') {
    renderHome(app);
    return;
  }

  const slug = normalized.slice(1).replace(/\/$/, '') as ToolSlug;
  const tool = tools[slug];

  if (!tool) {
    renderNotFound(app);
    return;
  }

  renderToolPage(app, tool);
}

function normalizePath(pathname: string): string {
  let trimmed = pathname;

  if (pathname === basePathWithoutTrailingSlash) {
    trimmed = '/';
  } else if (pathname.startsWith(baseUrl)) {
    trimmed = pathname.slice(baseUrl.length - 1);
  }

  if (trimmed === '' || trimmed === '/') {
    return '/';
  }

  return trimmed.endsWith('/') ? trimmed : `${trimmed}/`;
}

function renderHome(app: HTMLDivElement): void {
  const featuredTool = tools['json-formatter'];
  app.innerHTML = `
    <div class="page-shell">
      ${renderHomeHeader()}
      <main class="page page-home">
        <section class="section tool-section">
          <div class="home-toolbar">
            <div class="quick-links">
              ${toolOrder
                .map(
                  (tool) => `
                    <button class="quick-tool ${tool.slug === featuredTool.slug ? 'is-active' : ''}" data-home-tool="${tool.slug}">
                      <strong>${tool.label}</strong>
                      <span>${tool.description}</span>
                    </button>
                  `,
                )
                .join('')}
            </div>
            <div class="home-toolbar-meta">
              <strong data-home-title>${featuredTool.label}</strong>
              <span data-home-description>${featuredTool.description}</span>
              <a class="button button-primary" data-home-link href="${routeForTool(featuredTool.slug)}">Open page</a>
            </div>
          </div>
          <div class="tool-frame tool-frame-home" data-home-tool-root></div>
        </section>
      </main>
      ${renderFooter()}
    </div>
  `;

  const root = app.querySelector<HTMLElement>('[data-home-tool-root]');
  const title = app.querySelector<HTMLElement>('[data-home-title]');
  const description = app.querySelector<HTMLElement>('[data-home-description]');
  const link = app.querySelector<HTMLAnchorElement>('[data-home-link]');
  const switches = Array.from(app.querySelectorAll<HTMLButtonElement>('[data-home-tool]'));

  if (!root || !title || !description || !link) {
    throw new Error('Home tool controls not found.');
  }

  let activeTool: ToolSlug = featuredTool.slug;

  const syncHomeTool = (): void => {
    const tool = tools[activeTool];
    title.textContent = tool.label;
    description.textContent = tool.summary;
    link.href = routeForTool(tool.slug);
    switches.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.homeTool === activeTool);
    });
    mountToolInto(root, activeTool);
  };

  switches.forEach((button) => {
    button.addEventListener('click', () => {
      const slug = button.dataset.homeTool as ToolSlug | undefined;
      if (!slug || slug === activeTool) {
        return;
      }
      activeTool = slug;
      syncHomeTool();
    });
  });

  syncHomeTool();
}

function renderToolPage(app: HTMLDivElement, tool: ToolDefinition): void {
  app.innerHTML = `
    <div class="page-shell ${tool.bodyClass ?? ''}">
      ${renderSiteHeader(tool.slug)}
      <main class="page">
        <section class="tool-intro">
          <p class="eyebrow">${tool.eyebrow}</p>
          <h1>${tool.title}</h1>
          <p class="hero-lede">${tool.description}</p>
          <div class="tool-aside">
            <p>${tool.summary}</p>
          </div>
        </section>
        <section class="section tool-section">
          <div class="tool-frame" data-tool-root></div>
        </section>
        <section class="section section-columns">
          <div>
            <p class="eyebrow">FAQ</p>
            <h2>What developers usually ask</h2>
            <div class="faq-list">
              ${tool.faq.map(renderFaqItem).join('')}
            </div>
          </div>
          <aside class="related-card">
            <p class="panel-kicker">Related tools</p>
            <div class="related-links">
              ${tool.related
                .map((slug) => {
                  const related = tools[slug];
                  return `<a class="related-link" href="${routeForTool(related.slug)}">${related.label}</a>`;
                })
                .join('')}
            </div>
          </aside>
        </section>
      </main>
      ${renderFooter()}
    </div>
  `;

  const root = app.querySelector<HTMLElement>('[data-tool-root]');

  if (!root) {
    throw new Error('Tool root not found.');
  }

  mountToolInto(root, tool.slug);
}

function renderNotFound(app: HTMLDivElement): void {
  app.innerHTML = `
    <div class="page-shell">
      ${renderSiteHeader()}
      <main class="page page-home">
        <section class="hero">
          <div class="hero-copy">
            <p class="eyebrow">Not found</p>
            <h1>This page is not part of the tools hub.</h1>
            <p class="hero-lede">Use the home page to jump into one of the developer utilities.</p>
            <div class="hero-actions">
              <a class="button button-primary" href="${routeForHome()}">Back Home</a>
            </div>
          </div>
        </section>
      </main>
      ${renderFooter()}
    </div>
  `;
}

function renderHomeHeader(): string {
  return `
    <header class="site-header site-header-minimal">
      <a class="brand" href="${routeForHome()}">
        <span class="brand-mark">DT</span>
        <span class="brand-copy">
          <strong>Developer Tools</strong>
          <small>One-page workspace</small>
        </span>
      </a>
    </header>
  `;
}

function renderSiteHeader(active?: ToolSlug): string {
  return `
    <header class="site-header">
      <a class="brand" href="${routeForHome()}">
        <span class="brand-mark">DT</span>
        <span class="brand-copy">
          <strong>Developer Tools</strong>
          <small>Client-side utility hub</small>
        </span>
      </a>
      <nav class="main-nav" aria-label="Primary">
        <a href="${routeForHome()}">Home</a>
        ${toolOrder
          .map(
            (tool) =>
              `<a class="${active === tool.slug ? 'is-active' : ''}" href="${routeForTool(tool.slug)}">${tool.label}</a>`,
          )
          .join('')}
      </nav>
    </header>
  `;
}

function renderFooter(): string {
  return `
    <footer class="site-footer">
      <div>
        <p class="footer-title">Developer Tools Hub</p>
        <p class="footer-copy">Fast, browser-based utilities for everyday web development work.</p>
      </div>
      <div>
        <p class="footer-title">Privacy note</p>
        <p class="footer-copy">Sensitive transformations in this MVP run on the client side.</p>
      </div>
    </footer>
  `;
}

function routeForHome(): string {
  return baseUrl;
}

function routeForTool(slug: ToolSlug): string {
  return `${baseUrl}${slug}/`;
}

function withTrailingSlash(value: string): string {
  return value.endsWith('/') ? value : `${value}/`;
}

function mountToolInto(root: HTMLElement, slug: ToolSlug): void {
  root.innerHTML = '';

  const renderers: Record<ToolSlug, (element: HTMLElement) => void> = {
    'json-formatter': mountJsonFormatter,
    'jwt-decoder': mountJwtDecoder,
    'base64-encode-decode': mountBase64Tool,
    'uuid-ulid-generator': mountIdGenerator,
    'url-encode-decode': mountUrlTool,
    'unix-timestamp-converter': mountTimestampTool,
    'regex-tester': mountRegexTester,
    'diff-checker': mountDiffChecker,
  };

  renderers[slug](root);
}

function renderFaqItem(item: { question: string; answer: string }): string {
  return `
    <article class="faq-item">
      <h3>${item.question}</h3>
      <p>${item.answer}</p>
    </article>
  `;
}

function mountJsonFormatter(root: HTMLElement): void {
  root.innerHTML = `
    <div class="tool-layout">
      <section class="panel">
        <div class="panel-head">
          <h2>Input JSON</h2>
          <div class="panel-actions">
            <button class="button button-ghost" data-example>Example</button>
            <button class="button button-ghost" data-clear>Reset</button>
          </div>
        </div>
        <textarea class="input-area" data-input spellcheck="false" placeholder='{"message":"hello"}'></textarea>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h2>Output</h2>
          <div class="segmented">
            <button class="segment is-active" data-mode="pretty">Format</button>
            <button class="segment" data-mode="minified">Minify</button>
          </div>
        </div>
        <div class="status-row">
          <p class="status-message" data-status>Paste JSON to format and validate it.</p>
          <button class="button button-ghost" data-copy>Copy Output</button>
        </div>
        <pre class="output-area" data-output></pre>
      </section>
    </div>
  `;

  const input = getElement<HTMLTextAreaElement>(root, '[data-input]');
  const output = getElement<HTMLElement>(root, '[data-output]');
  const status = getElement<HTMLElement>(root, '[data-status]');
  const copyButton = getElement<HTMLButtonElement>(root, '[data-copy]');
  const modeButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-mode]'));
  let mode: 'pretty' | 'minified' = 'pretty';

  const example = `{
  "user": {
    "id": 42,
    "name": "Avery Stone",
    "roles": ["admin", "editor"]
  },
  "featureFlags": {
    "betaAccess": true,
    "newDashboard": false
  }
}`;

  const sync = (): void => {
    const raw = input.value.trim();

    if (!raw) {
      output.textContent = '';
      status.textContent = 'Paste JSON to format and validate it.';
      status.className = 'status-message';
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      output.textContent =
        mode === 'pretty' ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed);
      status.textContent =
        mode === 'pretty' ? 'Valid JSON formatted successfully.' : 'Valid JSON minified successfully.';
      status.className = 'status-message status-success';
    } catch (error) {
      output.textContent = '';
      status.textContent = error instanceof Error ? error.message : 'Invalid JSON.';
      status.className = 'status-message status-error';
    }
  };

  input.addEventListener('input', sync);
  getElement<HTMLButtonElement>(root, '[data-example]').addEventListener('click', () => {
    input.value = example;
    sync();
  });
  getElement<HTMLButtonElement>(root, '[data-clear]').addEventListener('click', () => {
    input.value = '';
    sync();
  });
  copyButton.addEventListener('click', async () => {
    await copyText(output.textContent ?? '', copyButton);
  });
  modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      mode = button.dataset.mode === 'minified' ? 'minified' : 'pretty';
      modeButtons.forEach((candidate) => {
        candidate.classList.toggle('is-active', candidate === button);
      });
      sync();
    });
  });
}

function mountJwtDecoder(root: HTMLElement): void {
  root.innerHTML = `
    <div class="tool-layout">
      <section class="panel">
        <div class="panel-head">
          <h2>JWT</h2>
          <div class="panel-actions">
            <button class="button button-ghost" data-example>Example</button>
            <button class="button button-ghost" data-clear>Reset</button>
          </div>
        </div>
        <textarea class="input-area" data-input spellcheck="false" placeholder="Paste a JWT token"></textarea>
        <p class="notice">Decode and inspect only. Signature verification is out of scope for this page.</p>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h2>Decoded output</h2>
          <button class="button button-ghost" data-copy>Copy Payload</button>
        </div>
        <p class="status-message" data-status>Paste a standard three-part JWT to inspect it.</p>
        <div class="stack">
          <div class="mini-panel">
            <h3>Header</h3>
            <pre class="output-area" data-header></pre>
          </div>
          <div class="mini-panel">
            <h3>Payload</h3>
            <pre class="output-area" data-payload></pre>
          </div>
          <div class="mini-panel">
            <h3>Signature</h3>
            <pre class="output-area" data-signature></pre>
          </div>
          <div class="mini-panel">
            <h3>Time claims</h3>
            <dl class="claim-list" data-claims></dl>
          </div>
        </div>
      </section>
    </div>
  `;

  const input = getElement<HTMLTextAreaElement>(root, '[data-input]');
  const status = getElement<HTMLElement>(root, '[data-status]');
  const header = getElement<HTMLElement>(root, '[data-header]');
  const payload = getElement<HTMLElement>(root, '[data-payload]');
  const signature = getElement<HTMLElement>(root, '[data-signature]');
  const claims = getElement<HTMLElement>(root, '[data-claims]');
  const copyButton = getElement<HTMLButtonElement>(root, '[data-copy]');
  const example =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkF2ZXJ5IFN0b25lIiwiaWF0IjoxNzA0MDY3MjAwLCJleHAiOjE3MDQwNzA4MDB9.signature';

  const sync = (): void => {
    const token = input.value.trim();
    header.textContent = '';
    payload.textContent = '';
    signature.textContent = '';
    claims.innerHTML = '';

    if (!token) {
      status.textContent = 'Paste a standard three-part JWT to inspect it.';
      status.className = 'status-message';
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('A JWT must contain exactly three dot-separated parts.');
      }

      const decodedHeader = JSON.parse(base64UrlDecode(parts[0]));
      const decodedPayload = JSON.parse(base64UrlDecode(parts[1]));
      header.textContent = JSON.stringify(decodedHeader, null, 2);
      payload.textContent = JSON.stringify(decodedPayload, null, 2);
      signature.textContent = parts[2] || '(empty signature segment)';
      claims.innerHTML = renderClaimItems(decodedPayload);
      status.textContent = 'JWT decoded successfully. Remember: the signature is not verified here.';
      status.className = 'status-message status-success';
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : 'Invalid JWT.';
      status.className = 'status-message status-error';
    }
  };

  input.addEventListener('input', sync);
  getElement<HTMLButtonElement>(root, '[data-example]').addEventListener('click', () => {
    input.value = example;
    sync();
  });
  getElement<HTMLButtonElement>(root, '[data-clear]').addEventListener('click', () => {
    input.value = '';
    sync();
  });
  copyButton.addEventListener('click', async () => {
    await copyText(payload.textContent ?? '', copyButton);
  });
}

function mountBase64Tool(root: HTMLElement): void {
  root.innerHTML = `
    <div class="tool-layout">
      <section class="panel">
        <div class="panel-head">
          <h2>Input</h2>
          <div class="panel-actions">
            <button class="button button-ghost" data-swap>Swap mode</button>
            <button class="button button-ghost" data-example>Example</button>
            <button class="button button-ghost" data-clear>Reset</button>
          </div>
        </div>
        <div class="segmented">
          <button class="segment is-active" data-mode="encode">Encode</button>
          <button class="segment" data-mode="decode">Decode</button>
        </div>
        <textarea class="input-area" data-input spellcheck="false" placeholder="Enter plain text or Base64"></textarea>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h2>Output</h2>
          <button class="button button-ghost" data-copy>Copy Output</button>
        </div>
        <p class="status-message" data-status>Choose a mode and paste a value to convert it.</p>
        <textarea class="output-box" data-output readonly></textarea>
      </section>
    </div>
  `;

  const input = getElement<HTMLTextAreaElement>(root, '[data-input]');
  const output = getElement<HTMLTextAreaElement>(root, '[data-output]');
  const status = getElement<HTMLElement>(root, '[data-status]');
  const copyButton = getElement<HTMLButtonElement>(root, '[data-copy]');
  const modeButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-mode]'));
  let mode: 'encode' | 'decode' = 'encode';

  const sync = (): void => {
    const raw = input.value;

    if (!raw) {
      output.value = '';
      status.textContent = 'Choose a mode and paste a value to convert it.';
      status.className = 'status-message';
      return;
    }

    try {
      output.value = mode === 'encode' ? utf8ToBase64(raw) : base64ToUtf8(raw.trim());
      status.textContent =
        mode === 'encode' ? 'Text encoded as Base64.' : 'Base64 decoded as UTF-8 text.';
      status.className = 'status-message status-success';
    } catch (error) {
      output.value = '';
      status.textContent = error instanceof Error ? error.message : 'Unable to convert this value.';
      status.className = 'status-message status-error';
    }
  };

  input.addEventListener('input', sync);
  getElement<HTMLButtonElement>(root, '[data-example]').addEventListener('click', () => {
    input.value = mode === 'encode' ? 'Seoul -> 서울 -> 개발자 도구' : utf8ToBase64('Seoul -> 서울 -> 개발자 도구');
    sync();
  });
  getElement<HTMLButtonElement>(root, '[data-clear]').addEventListener('click', () => {
    input.value = '';
    output.value = '';
    sync();
  });
  getElement<HTMLButtonElement>(root, '[data-swap]').addEventListener('click', () => {
    mode = mode === 'encode' ? 'decode' : 'encode';
    modeButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.mode === mode);
    });
    input.value = output.value || input.value;
    sync();
  });
  copyButton.addEventListener('click', async () => {
    await copyText(output.value, copyButton);
  });
  modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      mode = button.dataset.mode === 'decode' ? 'decode' : 'encode';
      modeButtons.forEach((candidate) => {
        candidate.classList.toggle('is-active', candidate === button);
      });
      sync();
    });
  });
}

function mountIdGenerator(root: HTMLElement): void {
  root.innerHTML = `
    <div class="tool-layout">
      <section class="panel">
        <div class="panel-head">
          <h2>Generator</h2>
          <div class="panel-actions">
            <button class="button button-ghost" data-generate>Generate</button>
            <button class="button button-ghost" data-clear>Reset</button>
          </div>
        </div>
        <label class="field">
          <span>Identifier type</span>
          <select class="select" data-kind>
            <option value="uuid">UUID v4</option>
            <option value="ulid">ULID</option>
          </select>
        </label>
        <label class="field">
          <span>Count</span>
          <input class="text-input" data-count type="number" min="1" max="20" value="5" />
        </label>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h2>Generated values</h2>
          <button class="button button-ghost" data-copy>Copy All</button>
        </div>
        <p class="status-message" data-status>Choose the type and generate a batch.</p>
        <ol class="generated-list" data-output></ol>
      </section>
    </div>
  `;

  const kind = getElement<HTMLSelectElement>(root, '[data-kind]');
  const count = getElement<HTMLInputElement>(root, '[data-count]');
  const output = getElement<HTMLOListElement>(root, '[data-output]');
  const status = getElement<HTMLElement>(root, '[data-status]');
  const copyButton = getElement<HTMLButtonElement>(root, '[data-copy]');

  const render = (): string[] => {
    const batchSize = clampNumber(Number(count.value), 1, 20);
    count.value = String(batchSize);
    const items = Array.from({ length: batchSize }, () =>
      kind.value === 'ulid' ? generateUlid() : crypto.randomUUID(),
    );
    output.innerHTML = items
      .map(
        (item) => `
          <li>
            <code>${item}</code>
            <button class="button button-ghost button-tiny" data-copy-one="${item}">Copy</button>
          </li>
        `,
      )
      .join('');
    status.textContent = `${items.length} ${kind.value === 'ulid' ? 'ULID values' : 'UUID values'} generated.`;
    status.className = 'status-message status-success';
    output.querySelectorAll<HTMLButtonElement>('[data-copy-one]').forEach((button) => {
      button.addEventListener('click', async () => {
        await copyText(button.dataset.copyOne ?? '', button);
      });
    });
    return items;
  };

  let current = render();

  getElement<HTMLButtonElement>(root, '[data-generate]').addEventListener('click', () => {
    current = render();
  });
  getElement<HTMLButtonElement>(root, '[data-clear]').addEventListener('click', () => {
    output.innerHTML = '';
    status.textContent = 'Choose the type and generate a batch.';
    status.className = 'status-message';
    current = [];
  });
  copyButton.addEventListener('click', async () => {
    await copyText(current.join('\n'), copyButton);
  });
}

function mountUrlTool(root: HTMLElement): void {
  root.innerHTML = `
    <div class="tool-layout">
      <section class="panel">
        <div class="panel-head">
          <h2>Input</h2>
          <div class="panel-actions">
            <button class="button button-ghost" data-example>Example</button>
            <button class="button button-ghost" data-clear>Reset</button>
          </div>
        </div>
        <div class="segmented">
          <button class="segment is-active" data-mode="encode">Encode</button>
          <button class="segment" data-mode="decode">Decode</button>
        </div>
        <label class="checkbox">
          <input data-plus type="checkbox" />
          <span>Treat <code>+</code> as a space when decoding</span>
        </label>
        <textarea class="input-area" data-input spellcheck="false" placeholder="email=hello@example.com&city=New York"></textarea>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h2>Output</h2>
          <button class="button button-ghost" data-copy>Copy Output</button>
        </div>
        <p class="status-message" data-status>Choose a mode and paste a value to convert it.</p>
        <textarea class="output-box" data-output readonly></textarea>
      </section>
    </div>
  `;

  const input = getElement<HTMLTextAreaElement>(root, '[data-input]');
  const output = getElement<HTMLTextAreaElement>(root, '[data-output]');
  const status = getElement<HTMLElement>(root, '[data-status]');
  const plus = getElement<HTMLInputElement>(root, '[data-plus]');
  const copyButton = getElement<HTMLButtonElement>(root, '[data-copy]');
  const modeButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-mode]'));
  let mode: 'encode' | 'decode' = 'encode';

  const sync = (): void => {
    const raw = input.value;

    if (!raw) {
      output.value = '';
      status.textContent = 'Choose a mode and paste a value to convert it.';
      status.className = 'status-message';
      return;
    }

    try {
      if (mode === 'encode') {
        output.value = encodeURIComponent(raw);
      } else {
        const prepared = plus.checked ? raw.replace(/\+/g, ' ') : raw;
        output.value = decodeURIComponent(prepared);
      }
      status.textContent = mode === 'encode' ? 'Text encoded for URL usage.' : 'URL-encoded text decoded successfully.';
      status.className = 'status-message status-success';
    } catch (error) {
      output.value = '';
      status.textContent = error instanceof Error ? error.message : 'Unable to convert this value.';
      status.className = 'status-message status-error';
    }
  };

  input.addEventListener('input', sync);
  plus.addEventListener('change', sync);
  getElement<HTMLButtonElement>(root, '[data-example]').addEventListener('click', () => {
    input.value =
      mode === 'encode'
        ? 'redirect=/settings/billing plan=pro plus bonus'
        : 'redirect%3D%2Fsettings%2Fbilling+plan%3Dpro+plus+bonus';
    sync();
  });
  getElement<HTMLButtonElement>(root, '[data-clear]').addEventListener('click', () => {
    input.value = '';
    output.value = '';
    sync();
  });
  copyButton.addEventListener('click', async () => {
    await copyText(output.value, copyButton);
  });
  modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      mode = button.dataset.mode === 'decode' ? 'decode' : 'encode';
      modeButtons.forEach((candidate) => {
        candidate.classList.toggle('is-active', candidate === button);
      });
      sync();
    });
  });
}

function mountTimestampTool(root: HTMLElement): void {
  root.innerHTML = `
    <div class="tool-layout">
      <section class="panel">
        <div class="panel-head">
          <h2>Timestamp to date</h2>
          <div class="panel-actions">
            <button class="button button-ghost" data-now>Use current time</button>
            <button class="button button-ghost" data-clear>Reset</button>
          </div>
        </div>
        <label class="field">
          <span>Unix timestamp</span>
          <input class="text-input" data-timestamp type="text" inputmode="numeric" placeholder="1711845600" />
        </label>
        <label class="checkbox">
          <input data-utc type="checkbox" />
          <span>Display results in UTC</span>
        </label>
        <div class="stack">
          <div class="mini-panel">
            <h3>Readable date</h3>
            <p class="output-copy" data-readable></p>
          </div>
          <div class="mini-panel">
            <h3>Detected input</h3>
            <p class="output-copy" data-detected></p>
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h2>Date to timestamp</h2>
          <button class="button button-ghost" data-copy>Copy seconds</button>
        </div>
        <label class="field">
          <span>Date and time</span>
          <input class="text-input" data-datetime type="datetime-local" />
        </label>
        <p class="status-message" data-status>Use either side. The values update in place.</p>
        <div class="stack">
          <div class="mini-panel">
            <h3>Unix seconds</h3>
            <p class="output-copy" data-seconds></p>
          </div>
          <div class="mini-panel">
            <h3>Unix milliseconds</h3>
            <p class="output-copy" data-milliseconds></p>
          </div>
        </div>
      </section>
    </div>
  `;

  const timestampInput = getElement<HTMLInputElement>(root, '[data-timestamp]');
  const datetimeInput = getElement<HTMLInputElement>(root, '[data-datetime]');
  const utcToggle = getElement<HTMLInputElement>(root, '[data-utc]');
  const readable = getElement<HTMLElement>(root, '[data-readable]');
  const detected = getElement<HTMLElement>(root, '[data-detected]');
  const seconds = getElement<HTMLElement>(root, '[data-seconds]');
  const milliseconds = getElement<HTMLElement>(root, '[data-milliseconds]');
  const status = getElement<HTMLElement>(root, '[data-status]');
  const copyButton = getElement<HTMLButtonElement>(root, '[data-copy]');

  const updateFromTimestamp = (): void => {
    const raw = timestampInput.value.trim();
    if (!raw) {
      readable.textContent = '';
      detected.textContent = '';
      seconds.textContent = '';
      milliseconds.textContent = '';
      status.textContent = 'Use either side. The values update in place.';
      status.className = 'status-message';
      return;
    }

    try {
      if (!/^-?\d+$/.test(raw)) {
        throw new Error('Timestamp input must be an integer.');
      }

      const timestamp = Number(raw);
      const useMilliseconds = raw.length > 10;
      const date = new Date(useMilliseconds ? timestamp : timestamp * 1000);

      if (Number.isNaN(date.getTime())) {
        throw new Error('Timestamp is out of range.');
      }

      readable.textContent = formatDate(date, utcToggle.checked);
      detected.textContent = useMilliseconds ? 'Milliseconds input detected' : 'Seconds input detected';
      seconds.textContent = String(Math.floor(date.getTime() / 1000));
      milliseconds.textContent = String(date.getTime());
      datetimeInput.value = toDatetimeLocalValue(date);
      status.textContent = 'Timestamp converted successfully.';
      status.className = 'status-message status-success';
    } catch (error) {
      readable.textContent = '';
      detected.textContent = '';
      seconds.textContent = '';
      milliseconds.textContent = '';
      status.textContent = error instanceof Error ? error.message : 'Unable to parse the timestamp.';
      status.className = 'status-message status-error';
    }
  };

  const updateFromDatetime = (): void => {
    const raw = datetimeInput.value;
    if (!raw) {
      status.textContent = 'Use either side. The values update in place.';
      status.className = 'status-message';
      return;
    }

    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) {
      status.textContent = 'Please provide a valid date and time.';
      status.className = 'status-message status-error';
      return;
    }

    timestampInput.value = String(Math.floor(date.getTime() / 1000));
    readable.textContent = formatDate(date, utcToggle.checked);
    detected.textContent = 'Date input converted';
    seconds.textContent = String(Math.floor(date.getTime() / 1000));
    milliseconds.textContent = String(date.getTime());
    status.textContent = 'Date converted to Unix time successfully.';
    status.className = 'status-message status-success';
  };

  timestampInput.addEventListener('input', updateFromTimestamp);
  datetimeInput.addEventListener('input', updateFromDatetime);
  utcToggle.addEventListener('change', () => {
    if (timestampInput.value.trim()) {
      updateFromTimestamp();
      return;
    }
    if (datetimeInput.value) {
      updateFromDatetime();
    }
  });
  getElement<HTMLButtonElement>(root, '[data-now]').addEventListener('click', () => {
    const now = new Date();
    timestampInput.value = String(Math.floor(now.getTime() / 1000));
    updateFromTimestamp();
  });
  getElement<HTMLButtonElement>(root, '[data-clear]').addEventListener('click', () => {
    timestampInput.value = '';
    datetimeInput.value = '';
    updateFromTimestamp();
  });
  copyButton.addEventListener('click', async () => {
    await copyText(seconds.textContent ?? '', copyButton);
  });

  const initial = new Date();
  timestampInput.value = String(Math.floor(initial.getTime() / 1000));
  updateFromTimestamp();
}

function mountRegexTester(root: HTMLElement): void {
  root.innerHTML = `
    <div class="tool-layout">
      <section class="panel">
        <div class="panel-head">
          <h2>Pattern setup</h2>
          <div class="panel-actions">
            <button class="button button-ghost" data-example>Example</button>
            <button class="button button-ghost" data-clear>Reset</button>
          </div>
        </div>
        <label class="field">
          <span>Pattern</span>
          <input class="text-input" data-pattern type="text" placeholder="\\b[a-z]+@[a-z]+\\.com\\b" />
        </label>
        <label class="field">
          <span>Flags</span>
          <input class="text-input" data-flags type="text" placeholder="gi" />
        </label>
        <label class="field">
          <span>Test text</span>
          <textarea class="input-area" data-input spellcheck="false" placeholder="Paste text to test"></textarea>
        </label>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h2>Matches</h2>
          <button class="button button-ghost" data-copy>Copy Match Report</button>
        </div>
        <p class="status-message" data-status>Enter a JavaScript regex pattern and test text.</p>
        <div class="mini-panel">
          <h3>Highlighted text</h3>
          <pre class="output-area output-rich" data-highlighted></pre>
        </div>
        <div class="mini-panel">
          <h3>Capture groups</h3>
          <div class="match-list" data-matches></div>
        </div>
      </section>
    </div>
  `;

  const pattern = getElement<HTMLInputElement>(root, '[data-pattern]');
  const flags = getElement<HTMLInputElement>(root, '[data-flags]');
  const input = getElement<HTMLTextAreaElement>(root, '[data-input]');
  const highlighted = getElement<HTMLElement>(root, '[data-highlighted]');
  const matches = getElement<HTMLElement>(root, '[data-matches]');
  const status = getElement<HTMLElement>(root, '[data-status]');
  const copyButton = getElement<HTMLButtonElement>(root, '[data-copy]');
  let report = '';

  const sync = (): void => {
    report = '';
    matches.innerHTML = '';
    highlighted.innerHTML = '';

    if (!pattern.value && !input.value) {
      status.textContent = 'Enter a JavaScript regex pattern and test text.';
      status.className = 'status-message';
      return;
    }

    try {
      const regex = new RegExp(pattern.value, flags.value);
      const text = input.value;
      const result = Array.from(text.matchAll(withGlobalFlag(regex)));

      highlighted.innerHTML = highlightMatches(text, result);

      if (result.length === 0) {
        status.textContent = 'The regex is valid, but no matches were found.';
        status.className = 'status-message';
        matches.innerHTML = '<p class="empty-copy">No matches yet.</p>';
        report = 'No matches found.';
        return;
      }

      matches.innerHTML = result
        .map((match, index) => {
          const groups = match
            .slice(1)
            .map((group, groupIndex) => `<li>Group ${groupIndex + 1}: <code>${escapeHtml(group ?? '(empty)')}</code></li>`)
            .join('');
          return `
            <article class="match-item">
              <h4>Match ${index + 1}</h4>
              <p><strong>Value:</strong> <code>${escapeHtml(match[0])}</code></p>
              <p><strong>Index:</strong> ${match.index ?? 0}</p>
              <ul>${groups || '<li>No capture groups.</li>'}</ul>
            </article>
          `;
        })
        .join('');
      report = result
        .map((match, index) => {
          const groups = match.slice(1).map((group, groupIndex) => `  Group ${groupIndex + 1}: ${group ?? '(empty)'}`);
          return [`Match ${index + 1}: ${match[0]}`, `Index: ${match.index ?? 0}`, ...groups].join('\n');
        })
        .join('\n\n');
      status.textContent = `${result.length} match${result.length === 1 ? '' : 'es'} found.`;
      status.className = 'status-message status-success';
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : 'Invalid regular expression.';
      status.className = 'status-message status-error';
      matches.innerHTML = '<p class="empty-copy">Fix the regex to inspect matches.</p>';
      highlighted.textContent = input.value;
    }
  };

  pattern.addEventListener('input', sync);
  flags.addEventListener('input', sync);
  input.addEventListener('input', sync);
  getElement<HTMLButtonElement>(root, '[data-example]').addEventListener('click', () => {
    pattern.value = '\\b([a-z0-9._%+-]+)@([a-z0-9.-]+\\.[a-z]{2,})\\b';
    flags.value = 'gi';
    input.value = 'Emails: ops@example.com, hello@tools.dev, nope@invalid';
    sync();
  });
  getElement<HTMLButtonElement>(root, '[data-clear]').addEventListener('click', () => {
    pattern.value = '';
    flags.value = '';
    input.value = '';
    sync();
  });
  copyButton.addEventListener('click', async () => {
    await copyText(report, copyButton);
  });
}

type DiffOp = { type: 'equal' | 'insert' | 'delete'; value: string };

type LineDiffRow =
  | { kind: 'equal'; left: string; right: string }
  | { kind: 'insert'; right: string }
  | { kind: 'delete'; left: string }
  | { kind: 'replace'; left: string; right: string };

function mountDiffChecker(root: HTMLElement): void {
  root.innerHTML = `
    <div class="tool-layout">
      <section class="panel">
        <div class="panel-head">
          <h2>Input text</h2>
          <div class="panel-actions">
            <button class="button button-ghost" data-example>Load Sample</button>
            <button class="button button-ghost" data-clear>Reset</button>
            <button class="button button-ghost" data-copy-left>Copy Left</button>
            <button class="button button-ghost" data-copy-right>Copy Right</button>
          </div>
        </div>
        <div class="diff-input-grid">
          <label class="field">
            <span>Left text</span>
            <textarea class="input-area diff-input" data-left spellcheck="false" placeholder="Original text"></textarea>
          </label>
          <label class="field">
            <span>Right text</span>
            <textarea class="input-area diff-input" data-right spellcheck="false" placeholder="Updated text"></textarea>
          </label>
        </div>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h2>Diff result</h2>
          <button class="button button-ghost" data-copy-result>Copy Result</button>
        </div>
        <p class="status-message" data-status>Paste text on both sides to compare.</p>
        <div class="diff-result" data-result></div>
      </section>
    </div>
  `;

  const left = getElement<HTMLTextAreaElement>(root, '[data-left]');
  const right = getElement<HTMLTextAreaElement>(root, '[data-right]');
  const status = getElement<HTMLElement>(root, '[data-status]');
  const result = getElement<HTMLElement>(root, '[data-result]');
  const copyLeft = getElement<HTMLButtonElement>(root, '[data-copy-left]');
  const copyRight = getElement<HTMLButtonElement>(root, '[data-copy-right]');
  const copyResult = getElement<HTMLButtonElement>(root, '[data-copy-result]');
  let latestReport = '';
  let debounceTimer = 0;

  const sync = (): void => {
    const leftText = left.value;
    const rightText = right.value;

    if (!leftText && !rightText) {
      result.innerHTML = '<p class="empty-copy">Paste text on both sides to compare.</p>';
      status.textContent = 'Paste text on both sides to compare.';
      status.className = 'status-message';
      latestReport = '';
      return;
    }

    const rows = buildLineDiffRows(splitLines(leftText), splitLines(rightText));
    const changedRows = rows.filter((row) => row.kind !== 'equal').length;

    if (changedRows === 0) {
      result.innerHTML = '<p class="empty-copy">No differences found.</p>';
      status.textContent = 'No differences found.';
      status.className = 'status-message status-success';
      latestReport = 'No differences found.';
      return;
    }

    result.innerHTML = rows.map(renderDiffRow).join('');
    status.textContent = `${changedRows} changed line${changedRows === 1 ? '' : 's'} found.`;
    status.className = 'status-message status-success';
    latestReport = renderDiffReport(rows);
  };

  const scheduleSync = (): void => {
    const lineCount = Math.max(splitLines(left.value).length, splitLines(right.value).length);
    const delay = lineCount > 400 ? 180 : 0;
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(sync, delay);
  };

  left.addEventListener('input', scheduleSync);
  right.addEventListener('input', scheduleSync);
  getElement<HTMLButtonElement>(root, '[data-example]').addEventListener('click', () => {
    left.value = `name: developer-tools
version: 1.0.0
features:
  - json-formatter
  - regex-tester
  - unix-timestamp-converter`;
    right.value = `name: developer-tools
version: 1.1.0
features:
  - json-formatter
  - diff-checker
  - regex-tester
  - unix-timestamp-converter`;
    sync();
  });
  getElement<HTMLButtonElement>(root, '[data-clear]').addEventListener('click', () => {
    left.value = '';
    right.value = '';
    sync();
  });
  copyLeft.addEventListener('click', async () => copyText(left.value, copyLeft));
  copyRight.addEventListener('click', async () => copyText(right.value, copyRight));
  copyResult.addEventListener('click', async () => copyText(latestReport, copyResult));

  sync();
}

function splitLines(value: string): string[] {
  return value.replace(/\r\n/g, '\n').split('\n');
}

function buildLineDiffRows(left: string[], right: string[]): LineDiffRow[] {
  const ops = diffSequence(left, right);
  const rows: LineDiffRow[] = [];

  for (let index = 0; index < ops.length; index += 1) {
    const current = ops[index];
    const next = ops[index + 1];

    if (current.type === 'delete' && next?.type === 'insert') {
      rows.push({ kind: 'replace', left: current.value, right: next.value });
      index += 1;
      continue;
    }

    if (current.type === 'insert' && next?.type === 'delete') {
      rows.push({ kind: 'replace', left: next.value, right: current.value });
      index += 1;
      continue;
    }

    if (current.type === 'equal') {
      rows.push({ kind: 'equal', left: current.value, right: current.value });
    } else if (current.type === 'delete') {
      rows.push({ kind: 'delete', left: current.value });
    } else {
      rows.push({ kind: 'insert', right: current.value });
    }
  }

  return rows;
}

function diffSequence(left: string[], right: string[]): DiffOp[] {
  const leftLength = left.length;
  const rightLength = right.length;
  const table = Array.from({ length: leftLength + 1 }, () => Array<number>(rightLength + 1).fill(0));

  for (let i = leftLength - 1; i >= 0; i -= 1) {
    for (let j = rightLength - 1; j >= 0; j -= 1) {
      table[i][j] =
        left[i] === right[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }

  const ops: DiffOp[] = [];
  let i = 0;
  let j = 0;

  while (i < leftLength && j < rightLength) {
    if (left[i] === right[j]) {
      ops.push({ type: 'equal', value: left[i] });
      i += 1;
      j += 1;
      continue;
    }

    if (table[i + 1][j] >= table[i][j + 1]) {
      ops.push({ type: 'delete', value: left[i] });
      i += 1;
    } else {
      ops.push({ type: 'insert', value: right[j] });
      j += 1;
    }
  }

  while (i < leftLength) {
    ops.push({ type: 'delete', value: left[i] });
    i += 1;
  }

  while (j < rightLength) {
    ops.push({ type: 'insert', value: right[j] });
    j += 1;
  }

  return ops;
}

function renderDiffRow(row: LineDiffRow): string {
  if (row.kind === 'equal') {
    return `
      <div class="diff-row">
        <div class="diff-cell">${visualizeWhitespace(escapeHtml(row.left))}</div>
        <div class="diff-cell">${visualizeWhitespace(escapeHtml(row.right))}</div>
      </div>
    `;
  }

  if (row.kind === 'delete') {
    return `
      <div class="diff-row">
        <div class="diff-cell diff-cell-delete">${visualizeWhitespace(escapeHtml(row.left))}</div>
        <div class="diff-cell diff-cell-empty">∅</div>
      </div>
    `;
  }

  if (row.kind === 'insert') {
    return `
      <div class="diff-row">
        <div class="diff-cell diff-cell-empty">∅</div>
        <div class="diff-cell diff-cell-insert">${visualizeWhitespace(escapeHtml(row.right))}</div>
      </div>
    `;
  }

  const leftParts = diffChars(row.left, row.right)
    .filter((part) => part.type !== 'insert')
    .map((part) =>
      part.type === 'delete'
        ? `<mark class="diff-char-delete">${visualizeWhitespace(escapeHtml(part.value))}</mark>`
        : visualizeWhitespace(escapeHtml(part.value)),
    )
    .join('');
  const rightParts = diffChars(row.left, row.right)
    .filter((part) => part.type !== 'delete')
    .map((part) =>
      part.type === 'insert'
        ? `<mark class="diff-char-insert">${visualizeWhitespace(escapeHtml(part.value))}</mark>`
        : visualizeWhitespace(escapeHtml(part.value)),
    )
    .join('');

  return `
    <div class="diff-row">
      <div class="diff-cell diff-cell-delete">${leftParts || '&nbsp;'}</div>
      <div class="diff-cell diff-cell-insert">${rightParts || '&nbsp;'}</div>
    </div>
  `;
}

function diffChars(left: string, right: string): DiffOp[] {
  return diffSequence(Array.from(left), Array.from(right));
}

function visualizeWhitespace(value: string): string {
  return value.replaceAll(' ', '<span class="ws-marker">·</span>').replaceAll('\t', '<span class="ws-marker">→</span>');
}

function renderDiffReport(rows: LineDiffRow[]): string {
  return rows
    .filter((row) => row.kind !== 'equal')
    .map((row) => {
      if (row.kind === 'delete') {
        return `- ${row.left}`;
      }
      if (row.kind === 'insert') {
        return `+ ${row.right}`;
      }
      return `- ${row.left}\n+ ${row.right}`;
    })
    .join('\n');
}

function getElement<T extends Element>(root: ParentNode, selector: string): T {
  const element = root.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Missing element for selector: ${selector}`);
  }
  return element;
}

async function copyText(value: string, trigger: HTMLButtonElement): Promise<void> {
  if (!value) {
    return;
  }

  const label = trigger.textContent ?? 'Copy';

  try {
    await navigator.clipboard.writeText(value);
    trigger.textContent = 'Copied';
  } catch {
    trigger.textContent = 'Copy failed';
  }

  window.setTimeout(() => {
    trigger.textContent = label;
  }, 1200);
}

function utf8ToBase64(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function base64ToUtf8(value: string): string {
  try {
    const binary = atob(value);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    throw new Error('Input is not valid Base64.');
  }
}

function base64UrlDecode(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
  return base64ToUtf8(`${normalized}${padding}`);
}

function renderClaimItems(payload: Record<string, unknown>): string {
  const keys: Array<'exp' | 'iat' | 'nbf'> = ['exp', 'iat', 'nbf'];
  const items = keys
    .filter((key) => typeof payload[key] === 'number')
    .map((key) => {
      const value = payload[key] as number;
      return `<div><dt>${key}</dt><dd>${value} -> ${formatDate(new Date(value * 1000), true)}</dd></div>`;
    });

  return items.length > 0 ? items.join('') : '<div><dt>Time claims</dt><dd>No exp, iat, or nbf claims found.</dd></div>';
}

function formatDate(date: Date, utc: boolean): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: utc ? 'UTC' : undefined,
  });
  return `${formatter.format(date)}${utc ? ' (UTC)' : ' (local)'}`;
}

function toDatetimeLocalValue(date: Date): string {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

function clampNumber(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) {
    return min;
  }
  return Math.min(Math.max(value, min), max);
}

function generateUlid(): string {
  const encoding = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  let timestamp = Date.now();
  let output = '';

  for (let index = 0; index < 10; index += 1) {
    output = encoding[timestamp % 32] + output;
    timestamp = Math.floor(timestamp / 32);
  }

  const random = crypto.getRandomValues(new Uint8Array(16));
  for (let index = 0; index < 16; index += 1) {
    output += encoding[random[index] % 32];
  }

  return output;
}

function withGlobalFlag(regex: RegExp): RegExp {
  const flags = regex.flags.includes('g') ? regex.flags : `${regex.flags}g`;
  return new RegExp(regex.source, flags);
}

function highlightMatches(text: string, matches: RegExpMatchArray[]): string {
  if (matches.length === 0) {
    return escapeHtml(text);
  }

  let cursor = 0;
  let output = '';

  matches.forEach((match) => {
    const start = match.index ?? 0;
    const value = match[0];
    const end = start + value.length;
    output += escapeHtml(text.slice(cursor, start));
    output += `<mark>${escapeHtml(value)}</mark>`;
    cursor = end;
  });
  output += escapeHtml(text.slice(cursor));
  return output;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
