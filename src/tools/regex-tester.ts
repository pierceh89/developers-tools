import { copyText, escapeHtml, getElement, highlightMatches, withGlobalFlag } from './shared';

export function mountRegexTester(root: HTMLElement): void {
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
