import { copyText, getElement } from './shared';

export function mountUrlTool(root: HTMLElement): void {
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
