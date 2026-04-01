import { copyText, getElement } from './shared';

export function mountJsonFormatter(root: HTMLElement): void {
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
