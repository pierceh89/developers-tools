import { toolOrder, tools } from './tools/definitions';
import { mountToolInto } from './tools';
import type { ToolDefinition, ToolSlug } from './tools/types';

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
  const featuredTool = tools['hash-generator'];
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

function renderFaqItem(item: { question: string; answer: string }): string {
  return `
    <article class="faq-item">
      <h3>${item.question}</h3>
      <p>${item.answer}</p>
    </article>
  `;
}
