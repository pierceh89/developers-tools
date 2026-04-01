import { copyText, digestText, getElement } from './shared';
import type { HashAlgorithm } from './shared';

export function mountHashGenerator(root: HTMLElement): void {
  root.innerHTML = `
    <div class="tool-layout">
      <section class="panel">
        <div class="panel-head">
          <h2>Input text</h2>
          <div class="panel-actions">
            <button class="button button-ghost" data-example>Example</button>
            <button class="button button-ghost" data-clear>Reset</button>
          </div>
        </div>
        <label class="field">
          <span>Algorithm</span>
          <select class="select" data-algorithm>
            <option value="md5">MD5</option>
            <option value="sha-1">SHA-1</option>
            <option value="sha-256" selected>SHA-256</option>
            <option value="sha-512">SHA-512</option>
          </select>
        </label>
        <textarea class="input-area" data-input spellcheck="false" placeholder="Enter text to hash"></textarea>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h2>Hash output</h2>
          <button class="button button-ghost" data-copy>Copy Hash</button>
        </div>
        <p class="status-message" data-status>Enter text to generate a hash.</p>
        <textarea class="output-box" data-output readonly></textarea>
        <p class="notice">Known test vector for <code>abc</code> is available with the Example button.</p>
      </section>
    </div>
  `;

  const input = getElement<HTMLTextAreaElement>(root, '[data-input]');
  const algorithm = getElement<HTMLSelectElement>(root, '[data-algorithm]');
  const output = getElement<HTMLTextAreaElement>(root, '[data-output]');
  const status = getElement<HTMLElement>(root, '[data-status]');
  const copyButton = getElement<HTMLButtonElement>(root, '[data-copy]');
  let syncToken = 0;

  const sync = async (): Promise<void> => {
    const token = ++syncToken;
    const text = input.value;

    if (!text) {
      output.value = '';
      status.textContent = 'Enter text to generate a hash.';
      status.className = 'status-message';
      return;
    }

    try {
      const hashValue = await digestText(text, algorithm.value as HashAlgorithm);
      if (token !== syncToken) {
        return;
      }
      output.value = hashValue;
      status.textContent = `${algorithm.value.toUpperCase()} hash generated successfully.`;
      status.className = 'status-message status-success';
    } catch (error) {
      if (token !== syncToken) {
        return;
      }
      output.value = '';
      status.textContent = error instanceof Error ? error.message : 'Unable to generate hash.';
      status.className = 'status-message status-error';
    }
  };

  input.addEventListener('input', () => {
    void sync();
  });
  algorithm.addEventListener('change', () => {
    void sync();
  });
  getElement<HTMLButtonElement>(root, '[data-example]').addEventListener('click', () => {
    input.value = 'abc';
    void sync();
  });
  getElement<HTMLButtonElement>(root, '[data-clear]').addEventListener('click', () => {
    input.value = '';
    output.value = '';
    void sync();
  });
  copyButton.addEventListener('click', async () => {
    await copyText(output.value, copyButton);
  });
}
